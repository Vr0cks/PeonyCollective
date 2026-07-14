import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'
import { Product, Order } from '@/src/types'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Tüm sorguları paralel şekilde çağırarak sayfa açılış hızını maksimuma çıkartıyoruz
  const [
    productsRes,
    ordersRes,
    offersRes,
    conciergeRes
  ] = await Promise.all([
    supabase.from('products').select('*, orders(total_price)').eq('seller_id', user.id),
    supabase.from('orders').select('*, products(*)').eq('buyer_id', user.id),
    supabase.from('offers').select('*, product:products(*)').eq('buyer_id', user.id).eq('status', 'accepted').order('created_at', { ascending: false }),
    supabase.from('concierge_requests').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
  ])

  // Küratör (Satıcı) verileri hesabı
  const myProducts: Product[] = productsRes.data || []
  const totalEarnings = myProducts
    ?.filter(p => p.status === 'sold')
    .reduce((sum, p) => sum + (p.price || 0), 0) || 0

  const pendingApproval = myProducts?.filter(p => p.status === 'pending').length || 0
  const activeSales = myProducts?.filter(p => p.status === 'approved').length || 0

  // Koleksiyoner (Alıcı) verileri hesabı
  const myOrders: Order[] = ordersRes.data || []
  const now = new Date()
  const reservedOffers = (offersRes.data || []).filter(off => 
    off.product && 
    off.product.status === 'approved' &&
    off.product.locked_by === user.id &&
    off.product.locked_until && 
    new Date(off.product.locked_until) > now
  )

  const conciergeRequests = conciergeRes.data || []

  return (
    <main className="min-h-screen bg-[#FCFCFB] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <DashboardClient
          myProducts={myProducts}
          totalEarnings={totalEarnings}
          activeSales={activeSales}
          pendingApproval={pendingApproval}
          myOrders={myOrders}
          reservedOffers={reservedOffers}
          conciergeRequests={conciergeRequests}
        />
      </div>
    </main>
  )
}
