import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/src/utils/supabase/server';

const WEBHOOK_SECRET = process.env.ENTRUPY_WEBHOOK_SECRET;

function verifySignature(payload: string, signature: string | null): boolean {
  if (!WEBHOOK_SECRET || !signature) return false;

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest('hex');
  
  // Entrupy-Signature genellikle 'hex' formatında gönderilir. 
  // Gerçek API ile test edildiğinde karşılaştırma mantığı (timingSafeEqual vs) gerekebilir.
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('entrupy-signature') || req.headers.get('Entrupy-Signature');

    // Güvenlik doğrulaması (Gerçek ortamda WEBHOOK_SECRET boş olamaz)
    if (WEBHOOK_SECRET) {
      const isValid = verifySignature(rawBody, signature);
      if (!isValid) {
        console.error('[ENTRUPY WEBHOOK] Geçersiz imza!');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    } else {
      console.warn('[ENTRUPY WEBHOOK] WEBHOOK_SECRET eksik, imza atlandı! Lütfen yapılandırın.');
    }

    const payload = JSON.parse(rawBody);
    console.log('[ENTRUPY WEBHOOK] Gelen olay:', payload.event);

    // Olay tipi: 'session.completed' vb.
    if (payload.event === 'session.completed' || payload.event === 'status_changed') { // Entrupy API'ye göre değişebilir
      const supabase = await createClient();
      
      const entrupyId = payload.data?.id; // veya customer_item_id
      const customerItemId = payload.data?.customer_item_id; // Bizim product.id'miz
      const status = payload.data?.status; // 'verified', 'rejected' vs.
      const certificateUrl = payload.data?.certificate_url; 

      if (customerItemId) {
        // Ürün durumunu güncelle
        const { error } = await supabase.from('products').update({
          entrupy_status: status,
          entrupy_certificate_url: certificateUrl
        }).eq('id', customerItemId);

        if (error) {
          console.error('[ENTRUPY WEBHOOK] Veritabanı güncelleme hatası:', error);
          return NextResponse.json({ error: 'DB Update Failed' }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('[ENTRUPY WEBHOOK] Hata:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
