import { NextResponse } from 'next/server'
import { createAdminClient } from '@/src/utils/supabase/admin'
import { approvePayTRPayment } from '@/src/lib/paytr'

export async function GET(request: Request) {
  // Vercel Cron Security check
  const authHeader = request.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  
  try {
    // 3 günden eski ve 'delivered' durumundaki siparişleri bul
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    
    const { data: ordersToApprove, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_status', 'delivered')
      .lte('created_at', threeDaysAgo)

    if (fetchError) throw fetchError

    if (!ordersToApprove || ordersToApprove.length === 0) {
      return NextResponse.json({ message: 'Otomatik onaylanacak sipariş bulunamadı.' })
    }

    const results = []

    for (const order of ordersToApprove) {
      // Siparişi tamamlandı olarak güncelle
      const { error: updateError } = await supabase
        .from('orders')
        .update({ order_status: 'completed' })
        .eq('id', order.id)

      if (updateError) {
        console.error(`Sipariş güncellenemedi: ${order.id}`, updateError)
        results.push({ orderId: order.id, status: 'failed_db_update', error: updateError.message })
        continue
      }

      // PayTR ödemesini çöz
      const merchantOid = order.payment_id || order.id
      try {
        const paytrResult = await approvePayTRPayment(merchantOid)
        if (paytrResult.status !== 'success') {
          console.warn(`[PAYTR AUTO APPROVE WARNING] Order ${order.id} approved but PayTR failed: ${paytrResult.err_msg}`)
          await supabase.from('system_logs').insert({
            level: 'warn',
            source: 'cron_auto_approve',
            message: `Sipariş ${order.id} otomatik onaylandı fakat PayTR ödeme çözme başarısız.`,
            metadata: { orderId: order.id, error: paytrResult.err_msg }
          })
          results.push({ orderId: order.id, status: 'success_db_warn_paytr', error: paytrResult.err_msg })
        } else {
          await supabase.from('system_logs').insert({
            level: 'info',
            source: 'cron_auto_approve',
            message: `Sipariş ${order.id} 3 günlük süre dolduğu için otomatik onaylandı ve PayTR escrow bloke çözüldü.`,
            metadata: { orderId: order.id }
          })
          results.push({ orderId: order.id, status: 'success' })
        }
      } catch (paytrErr: any) {
        console.error(`PayTR approve hatası: ${order.id}`, paytrErr)
        results.push({ orderId: order.id, status: 'success_db_fail_paytr_api', error: paytrErr.message })
      }
    }

    return NextResponse.json({
      message: 'Otomatik onaylama işlemi tamamlandı.',
      processedCount: ordersToApprove.length,
      results
    })

  } catch (error: any) {
    console.error('Cron Auto Approve Error:', error)
    return NextResponse.json({ error: 'Otomatik onaylama sırasında hata oluştu: ' + error.message }, { status: 500 })
  }
}
