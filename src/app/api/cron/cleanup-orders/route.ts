import { NextResponse } from 'next/server'
import { createAdminClient } from '@/src/utils/supabase/admin'

export async function GET(request: Request) {
  // Basit bir güvenlik önlemi: Vercel Cron dışından gelenleri engellemek için
  // Eğer özel bir secret kullanıyorsanız kontrol edebilirsiniz:
  const authHeader = request.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  
  try {
    // 15 dakikadan eski olan ve hala 'pending_payment' durumunda olan siparişleri bul
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60000).toISOString()
    
    const { data: oldOrders, error: fetchError } = await supabase
      .from('orders')
      .select('id, product_id')
      .eq('order_status', 'pending_payment')
      .lte('created_at', thirtyMinutesAgo)

    if (fetchError) throw fetchError

    if (!oldOrders || oldOrders.length === 0) {
      return NextResponse.json({ message: 'Temizlenecek sipariş bulunamadı.' })
    }

    const orderIds = oldOrders.map(o => o.id)

    // Siparişleri iptal et
    const { error: cancelError } = await supabase
      .from('orders')
      .update({ order_status: 'cancelled' })
      .in('id', orderIds)

    if (cancelError) throw cancelError

    // Opsiyonel: Ürün kilitlerini (locked_until) kaldır (Eğer hala geçerliyse)
    // Zaten 15 dakika geçtiği için kilitler doğal olarak açılmıştır, ama yine de null yapabiliriz.
    const productIds = oldOrders.map(o => o.product_id)
    await supabase
      .from('products')
      .update({ locked_until: null })
      .in('id', productIds)

    // Log the cleanup
    await supabase.from('system_logs').insert({
      level: 'info',
      source: 'cron_cleanup',
      message: `${orderIds.length} adet asılı sipariş iptal edildi.`,
      metadata: { orderIds }
    })

    return NextResponse.json({
      message: 'Başarılı',
      cancelledCount: orderIds.length
    })

  } catch (error) {
    console.error('Cron Cleanup Error:', error)
    return NextResponse.json({ error: 'Temizlik sırasında hata oluştu' }, { status: 500 })
  }
}
