import { NextResponse } from 'next/server'
import { createAdminClient } from '@/src/utils/supabase/admin'

/**
 * POST /api/oto/webhook
 * Body: { event: string, trackingNumber?: string, orderId?: string }
 *
 * OTO Kargo firmasından gelen teslimat webhook'u.
 * Alıcının kargosu teslim edildiğinde çalıştırılır.
 */
export async function POST(request: Request) {
  const supabase = createAdminClient()
  let body: any
  
  try {
    body = await request.json()
  } catch (parseErr) {
    return NextResponse.json({ error: 'Geçersiz JSON gövdesi' }, { status: 400 })
  }

  const { event, trackingNumber, orderId } = body

  // Log webhook invocation
  await supabase.from('system_logs').insert({
    level: 'info',
    source: 'oto_cargo_webhook',
    message: `OTO Kargo Webhook tetiklendi: Olay: ${event || 'Bilinmiyor'}`,
    metadata: body
  })

  // Sadece teslim edildi olaylarını işle
  if (event !== 'shipment_delivered' && event !== 'delivered') {
    return NextResponse.json({ message: 'Olay atlandı (Sadece teslimat webhookları işlenir)' })
  }

  if (!trackingNumber && !orderId) {
    return NextResponse.json({ error: 'trackingNumber veya orderId parametresi eksik' }, { status: 400 })
  }

  try {
    // Siparişi bul
    let query = supabase.from('orders').select('*, products(*)')
    if (orderId) {
      query = query.eq('id', orderId)
    } else {
      query = query.eq('shipping_tracking_buyer', trackingNumber)
    }

    const { data: order, error: orderError } = await query.single()

    if (orderError || !order) {
      console.error('Sipariş bulunamadı:', orderError)
      return NextResponse.json({ error: 'Eşleşen sipariş bulunamadı' }, { status: 404 })
    }

    // Idempotency: Zaten teslim alınmış/tamamlanmış ise işlem yapma
    if (order.order_status === 'delivered' || order.order_status === 'completed') {
      return NextResponse.json({ message: 'Sipariş zaten teslim edilmiş veya tamamlanmış durumda.', orderId: order.id })
    }

    const now = new Date().toISOString()

    // Sipariş durumunu güncelle ve teslimat saatini yaz
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        order_status: 'delivered',
        delivered_at: now
      })
      .eq('id', order.id)

    if (updateError) {
      throw new Error(`Sipariş güncellenemedi: ${updateError.message}`)
    }

    const product = order.products as any

    // Alıcıya "Ürünü onaylayın" bildirimi gönder
    await supabase.from('notifications').insert({
      user_id: order.buyer_id,
      type: 'order_delivered',
      title: 'Ürününüz Teslim Edildi!',
      message: `Satın aldığınız ${product?.brand} ${product?.model_name} ürünü teslim edilmiştir. Lütfen 3 gün (72 saat) içinde ürünü inceleyip onaylayın. Onaylanmayan siparişler süre sonunda otomatik onaylanacaktır.`,
      is_read: false,
      metadata: { order_id: order.id, delivered_at: now }
    })

    await supabase.from('system_logs').insert({
      level: 'info',
      source: 'oto_cargo_webhook',
      message: `Sipariş teslim edildi olarak işaretlendi ve 3 günlük onay süreci başlatıldı. Sipariş ID: ${order.id}`,
      metadata: { orderId: order.id, trackingNumber }
    })

    return NextResponse.json({ success: true, message: 'Sipariş teslim edildi olarak işaretlendi, süreç başlatıldı.', orderId: order.id })

  } catch (error: any) {
    console.error('OTO Webhook Error:', error)
    await supabase.from('system_logs').insert({
      level: 'error',
      source: 'oto_cargo_webhook',
      message: 'Webhook işleme sırasında hata oluştu',
      metadata: { error: error.message, body }
    })
    return NextResponse.json({ error: 'Sunucu hatası: ' + error.message }, { status: 500 })
  }
}
