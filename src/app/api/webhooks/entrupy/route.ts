import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/src/utils/supabase/admin';
import { sendEntrupyApprovedEmail, sendEntrupyRejectedEmail } from '@/src/lib/resend';

const WEBHOOK_SECRET = process.env.ENTRUPY_WEBHOOK_SECRET;

function verifySignature(payload: string, signature: string | null): boolean {
  console.log('[ENTRUPY DEBUG] WEBHOOK_SECRET Var mı:', !!WEBHOOK_SECRET, 'Uzunluk:', WEBHOOK_SECRET?.length);
  console.log('[ENTRUPY DEBUG] Gelen İmza (Signature):', signature);
  console.log('[ENTRUPY DEBUG] Gelen Ham Body:', payload);

  if (!WEBHOOK_SECRET || !signature) return false;

  // Entrupy imzayı "SHA256:" prefix'i ile gönderiyor. Onu temizleyelim.
  let cleanSignature = signature;
  if (signature.startsWith('SHA256:')) {
    cleanSignature = signature.substring(7);
  }

  try {
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const digestHex = hmac.update(payload).digest('hex');
    const digestBase64 = crypto.createHmac('sha256', WEBHOOK_SECRET).update(payload).digest('base64');
    
    console.log('[ENTRUPY DEBUG] Hesaplanan Hex Digest:', digestHex);
    console.log('[ENTRUPY DEBUG] Hesaplanan Base64 Digest:', digestBase64);

    const digestBuffer = Buffer.from(digestHex);
    const signatureBuffer = Buffer.from(cleanSignature);
    
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
    console.log('[ENTRUPY WEBHOOK] Gelen Payload:', JSON.stringify(payload));

    const items = payload.items || [];
    
    for (const item of items) {
      const entrupyId = item.entrupy_id;
      const customerItemId = item.text_fields?.customer_item_id || item.text_fields?.identifier;
      const rawStatus = item.status?.result?.id; // 'authentic', 'invalid', 'unidentified' vs.
      const certificateUrl = item.certificate?.site || item.certificate?.preview || null;

      console.log('[ENTRUPY WEBHOOK] Ayrıştırılan Bilgiler:', { entrupyId, customerItemId, rawStatus, certificateUrl });

      if (customerItemId) {
        // Entrupy durumlarını veritabanımızdaki CHECK constraint'e göre eşleyelim:
        // CHECK (entrupy_status IN ('pending', 'analyzing', 'verified', 'rejected'))
        let status = 'pending';
        
        if (rawStatus === 'authentic') {
          status = 'verified';
        } else if (rawStatus === 'invalid' || rawStatus === 'unidentified') {
          status = 'rejected';
        } else if (rawStatus === 'analyzing') {
          status = 'analyzing';
        }

        // Ürün durumunu otomatik onayla veya reddet
        const productStatus = status === 'verified' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending';
        
        console.log(`[ENTRUPY WEBHOOK] DB Güncelleniyor. Ürün ID: ${customerItemId}, Status: ${status}, Ürün Statü: ${productStatus}`);

        const { error } = await supabase.from('products').update({
          entrupy_status: status,
          entrupy_certificate_url: certificateUrl,
          ...(productStatus !== 'pending' && { status: productStatus })
        }).eq('id', customerItemId);

        if (error) {
          console.error('[ENTRUPY WEBHOOK] Veritabanı güncelleme hatası:', error);
          await supabase.from('system_logs').insert({
            level: 'error',
            source: 'entrupy_webhook',
            message: 'Ürün Entrupy durumu güncellenemedi',
            metadata: { error: String(error), customerItemId, payload }
          });
          continue;
        }

        // Kullanıcıya onay/red e-postası gönder
        try {
          const { data: productData } = await supabase
            .from('products')
            .select('brand, model_name, seller_id, profiles(email, first_name, last_name)')
            .eq('id', customerItemId)
            .maybeSingle();

          if (productData && productData.profiles) {
            const profile = productData.profiles as any;
            const sellerEmail = profile.email;
            const sellerName = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || 'Değerli Üyemiz';
            const fullProductName = `${productData.brand} ${productData.model_name}`;

            if (status === 'verified') {
              await sendEntrupyApprovedEmail({
                sellerEmail,
                sellerName,
                productName: fullProductName,
                certificateUrl
              });
            } else if (status === 'rejected') {
              await sendEntrupyRejectedEmail({
                sellerEmail,
                sellerName,
                productName: fullProductName
              });
            }
          }
        } catch (emailErr) {
          console.error('[ENTRUPY WEBHOOK] E-posta gönderme hatası:', emailErr);
        }

        // Sipariş durumunu güncelle
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
    } catch (e) {}
    return NextResponse.json({ error: 'Webhook işlem hatası' }, { status: 400 });
  }
}
