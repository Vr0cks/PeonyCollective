'use server'

import { createClient } from '@/src/utils/supabase/server'
import { createAdminClient } from '@/src/utils/supabase/admin'
import { approvePayTRPayment } from '@/src/lib/paytr'
import { revalidatePath } from 'next/cache'

export async function approveOrder(orderId: string) {
  const supabase = await createClient()

  // 1. Authenticate user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Bu işlemi gerçekleştirmek için giriş yapmalısınız.')
  }

  // 2. Fetch order to verify details
  const { data: order, error: fetchError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (fetchError || !order) {
    throw new Error('Sipariş bulunamadı.')
  }

  // 3. Authorization check: must be the buyer
  if (order.buyer_id !== user.id) {
    throw new Error('Bu siparişi onaylama yetkiniz bulunmamaktadır.')
  }

  // 4. Status check: must not be already completed, cancelled, or refunded
  if (['completed', 'cancelled', 'refunded'].includes(order.order_status)) {
    throw new Error(`Bu sipariş zaten '${order.order_status}' durumunda.`)
  }

  // 5. Update order status to completed in database
  const adminClient = createAdminClient()
  const { error: updateError } = await adminClient
    .from('orders')
    .update({ order_status: 'completed' })
    .eq('id', orderId)

  if (updateError) {
    console.error('Order approval db update error:', updateError)
    throw new Error('Sipariş durumu güncellenirken bir hata oluştu.')
  }

  // 6. Release blocked payment in PayTR
  const merchantOid = order.payment_id || order.id
  try {
    const paytrResult = await approvePayTRPayment(merchantOid)
    
    if (paytrResult.status !== 'success') {
      // Log the warning but keep the order completed on our end (or rollback depending on business preference)
      console.warn(`[PAYTR ESCROW RELEASE WARNING] Order approved in DB but PayTR API failed: ${paytrResult.err_msg}`)
      await adminClient.from('system_logs').insert({
        level: 'warn',
        source: 'paytr_escrow_release',
        message: `Sipariş veritabanında onaylandı fakat PayTR ödeme çözme servisi başarısız yanıt döndü.`,
        metadata: { orderId, merchantOid, error: paytrResult.err_msg }
      })
    } else {
      await adminClient.from('system_logs').insert({
        level: 'info',
        source: 'paytr_escrow_release',
        message: `Sipariş başarıyla onaylandı ve PayTR escrow bloke çözüldü.`,
        metadata: { orderId, merchantOid }
      })
    }
  } catch (err: any) {
    console.error('[PAYTR APPROVAL ERROR]', err)
  }

  revalidatePath('/orders')
  return { success: true }
}
