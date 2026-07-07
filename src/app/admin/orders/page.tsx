import { createClient } from '@/src/utils/supabase/server'
import OrdersAdminClient from './OrdersAdminClient'

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      products (brand, model_name, public_images),
      buyer:profiles!orders_buyer_id_fkey (first_name, last_name, phone_number, address),
      seller:profiles!seller_id (first_name, last_name, phone_number, address)
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 min-h-screen text-white">
      <div className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-2">Admin Panel</p>
        <h1 className="text-3xl font-bold tracking-tight">Sipariş Yönetimi</h1>
        <p className="text-white/40 text-sm mt-1">Lab inceleme ve fiziksel doğrulama süreçleri takip ekranı</p>
      </div>

      <OrdersAdminClient initialOrders={orders || []} />
    </div>
  )
}
