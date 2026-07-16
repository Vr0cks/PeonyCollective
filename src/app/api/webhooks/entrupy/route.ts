import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/src/utils/supabase/admin';

const WEBHOOK_SECRET = process.env.ENTRUPY_WEBHOOK_SECRET;

function verifySignature(payload: string, signature: string | null): boolean {
  console.log('[ENTRUPY DEBUG] WEBHOOK_SECRET Var mı:', !!WEBHOOK_SECRET, 'Uzunluk:', WEBHOOK_SECRET?.length);
  console.log('[ENTRUPY DEBUG] Gelen İmza (Signature):', signature);
  console.log('[ENTRUPY DEBUG] Gelen Ham Body:', payload);

  if (!WEBHOOK_SECRET || !signature) return false;

  try {
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const digestHex = hmac.update(payload).digest('hex');
    const digestBase64 = crypto.createHmac('sha256', WEBHOOK_SECRET).update(payload).digest('base64');
    
    console.log('[ENTRUPY DEBUG] Hesaplanan Hex Digest:', digestHex);
    console.log('[ENTRUPY DEBUG] Hesaplanan Base64 Digest:', digestBase64);

    const digestBuffer = Buffer.from(digestHex);
    const signatureBuffer = Buffer.from(signature);
    
    if (digestBuffer.length === signatureBuffer.length && crypto.timingSafeEqual(digestBuffer, signatureBuffer)) {
      return true;
    }

    // Base64 kontrolü
    const digestBase64Buffer = Buffer.from(digestBase64);
    if (digestBase64Buffer.length === signatureBuffer.length && crypto.timingSafeEqual(digestBase64Buffer, signatureBuffer)) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('[ENTRUPY WEBHOOK] İmza doğrulama hatası:', error);
    return false;
  }
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

    const supabase = createAdminClient();

    const payload = JSON.parse(rawBody);
    console.log('[ENTRUPY WEBHOOK] Gelen olay:', payload.event);

    // Olay tipi: 'session.completed' vb.
    if (payload.event === 'session.completed' || payload.event === 'status_changed') { // Entrupy API'ye göre değişebilir
      
      const entrupyId = payload.data?.id; // veya customer_item_id
      const customerItemId = payload.data?.customer_item_id; // Bizim product.id'miz
      const rawStatus = payload.data?.status; // 'verified', 'rejected' vs.
      const certificateUrl = payload.data?.certificate_url; 

      if (customerItemId) {
        // SQL CHECK constraint: CHECK (entrupy_status IN ('pending', 'analyzing', 'verified', 'rejected'))
        const allowedStatuses = ['pending', 'analyzing', 'verified', 'rejected'];
        let status = 'pending';
        
        if (allowedStatuses.includes(rawStatus)) {
          status = rawStatus;
        } else {
          console.warn(`[ENTRUPY WEBHOOK] Beklenmeyen status değeri alındı: "${rawStatus}". "pending" olarak kaydediliyor.`);
        }

        // Ürün durumunu otomatik onayla
        const productStatus = status === 'verified' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending';
        
        const { error } = await supabase.from('products').update({
          entrupy_status: status,
          entrupy_certificate_url: certificateUrl,
          ...(productStatus !== 'pending' && { status: productStatus }) // Durum belli ise otomatik yayınla veya reddet
        }).eq('id', customerItemId);

        if (error) {
          console.error('[ENTRUPY WEBHOOK] Veritabanı güncelleme hatası:', error);
          await supabase.from('system_logs').insert({
            level: 'error',
            source: 'entrupy_webhook',
            message: 'Ürün Entrupy durumu güncellenemedi',
            metadata: { error: String(error), customerItemId, payload }
          });
          return NextResponse.json({ error: 'DB Update Failed' }, { status: 500 });
        }

        // Update associated order status based on Entrupy result
        const { data: assocOrder } = await supabase
          .from('orders')
          .select('order_status')
          .eq('product_id', customerItemId)
          .maybeSingle();

        if (assocOrder) {
          const allowedStatusesToProgress = ['pending_payment', 'paid', 'shipped_to_lab', 'inspecting'];
          
          if (allowedStatusesToProgress.includes(assocOrder.order_status)) {
            if (status === 'verified') {
              await supabase.from('orders').update({
                order_status: 'lab_approved'
              }).eq('product_id', customerItemId);
            } else if (status === 'rejected') {
              await supabase.from('orders').update({
                order_status: 'cancelled'
              }).eq('product_id', customerItemId);
            }
          }
        }

        // Başarı logu
        await supabase.from('system_logs').insert({
          level: 'info',
          source: 'entrupy_webhook',
          message: `Ürün Entrupy analizi tamamlandı: ${status}, Sipariş durumu güncellendi.`,
          metadata: { customerItemId, entrupyId, status }
        });
      }
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('[ENTRUPY WEBHOOK] Hata:', error);
    try {
       const supabase = createAdminClient();
       await supabase.from('system_logs').insert({
          level: 'error',
          source: 'entrupy_webhook',
          message: 'Webhook işlem hatası',
          metadata: { error: String(error) }
       });
    } catch (e) {} // Ignore secondary errors
    return NextResponse.json({ error: 'Webhook işlem hatası' }, { status: 400 });
  }
}
