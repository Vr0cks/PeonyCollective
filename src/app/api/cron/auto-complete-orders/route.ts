import { NextResponse } from 'next/server'
import { createAdminClient } from '@/src/utils/supabase/admin'
import { approvePayTRPayment } from '@/src/lib/paytr'

/**
 * GET /api/cron/auto-complete-orders
 *
 * 3 günlük yasal onay süreci dolan siparişleri otomatik onaylar,
 * PayTR Approve API'sini çağırarak escrow ödemesini satıcıya aktarır.
 */
export async function GET(request: Request) {
  // Güvenlik kontrolü
  const authHeader = request.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  try {
    // 3 gün önceki tarih
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()

    // 3 gündür 'delivered' durumunda olan siparişleri bul
    const { data: orders, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_status', 'delivered')
      .lte('delivered_at', threeDaysAgo)

    if (fetchError) throw fetchError

    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: 'Otomatik onaylanacak sipariş bulunamadı.' })
    }

    const completedOrders: string[] = []
    const failedOrders: any[] = []

    for (const order of orders) {
      // PayTR Escrow Onay / Para Dağıtımı API'sini tetikle
      const paytrResult = await approvePayTRPayment(order.id)

      if (paytrResult.status === 'success') {
        // Siparişi tamamlandı durumuna güncelle
        const { error: updateErr } = await supabase
          .from('orders')
          .update({ order_status: 'completed' })
          .eq('id', order.id)

        if (updateErr) {
          failedOrders.push({ orderId: order.id, error: `Sipariş durumu güncellenemedi: ${updateErr.message}` })
        } else {
          completedOrders.push(order.id)
          
          // Alıcı ve satıcıya bildirimleri gönder
          await supabase.from('notifications').insert([
            {
              user_id: order.buyer_id,
              type: 'order_completed',
              title: 'Siparişiniz Otomatik Onaylandı',
              message: `Teslimat sonrası 3 günlük yasal onay süreci dolduğundan siparişiniz sistem tarafından otomatik onaylanarak tamamlanmıştır.`,
              is_read: false,
              metadata: { order_id: order.id }
            },
            {
              user_id: order.seller_id,
              type: 'payment_received',
              title: 'Satış Hakedişiniz Aktarıldı',
              message: `Teslim edilen siparişinizin 3 günlük yasal süreci tamamlandı ve hakediş tutarınız (${order.seller_amount} TL) hesabınıza aktarıldı.`,
              is_read: false,
              metadata: { order_id: order.id }
            }
          ])
        }
      } else {
        failedOrders.push({ orderId: order.id, error: `PayTR Escrow onay hatası: ${paytrResult.err_msg}` })
      }
    }

    // Log the operations
    await supabase.from('system_logs').insert({
      level: failedOrders.length > 0 ? 'warn' : 'info',
      source: 'cron_auto_approve',
      message: `${completedOrders.length} sipariş otomatik onaylandı. ${failedOrders.length} siparişte hata oluştu.`,
      metadata: { completedOrders, failedOrders }
    })

    return NextResponse.json({
      success: true,
      completedOrdersCount: completedOrders.length,
      failedOrdersCount: failedOrders.length,
      failedOrders
    })

  } catch (error: any) {
    console.error('Cron Auto Approval Error:', error)
    return NextResponse.json({ error: 'Otomatik onay sırasında hata oluştu' }, { status: 500 })
  }
}
