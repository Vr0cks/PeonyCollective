import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import CuratorView from '@/src/components/CuratorView'
import CollectorView from '@/src/components/CollectorView'
import DashboardSwitcher from '@/src/components/DashboardSwitcher'
import { Product, Order } from '@/src/types'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Dashboard({ searchParams }: PageProps) {
  const params = await searchParams
  const currentView = (params.view as string) || 'curator'
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Initialize default variables to hold results
  let myProducts: Product[] = []
  let totalEarnings = 0
  let pendingApproval = 0
  let activeSales = 0
  let myOrders: Order[] = []
  let reservedOffers: any[] = []

  if (currentView === 'curator') {
    // Satıcı Verileri (Küratör) - Sadece küratör görünümünde çekilir
    const { data } = await supabase
      .from('products')
      .select('*, orders(total_price)')
      .eq('seller_id', user.id)

    myProducts = data || []
    totalEarnings = myProducts
      ?.filter(p => p.status === 'sold')
      .reduce((sum, p) => sum + (p.price || 0), 0) || 0

    pendingApproval = myProducts?.filter(p => p.status === 'pending').length || 0
    activeSales = myProducts?.filter(p => p.status === 'approved').length || 0
  } else {
    // Alıcı Verileri (Koleksiyoner) - Sadece koleksiyoner görünümünde çekilir
    const { data } = await supabase
      .from('orders')
      .select('*, products(*)')
      .eq('buyer_id', user.id)
    myOrders = data || []

    const { data: offersData } = await supabase
      .from('offers')
      .select('*, product:products(*)')
      .eq('buyer_id', user.id)
      .eq('status', 'accepted')
      .order('created_at', { ascending: false })

    const now = new Date()
    reservedOffers = (offersData || []).filter(off => 
      off.product && 
      off.product.status === 'approved' &&
      off.product.locked_by === user.id &&
      off.product.locked_until && 
      new Date(off.product.locked_until) > now
    )
  }

  // Her zaman veya sadece collector'de concierge taleplerini çek (koleksiyoncu teklifleri olarak)
  const { data: conciergeRequests } = await supabase
    .from('concierge_requests')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-[#FCFCFB] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        <DashboardSwitcher />

        {currentView === 'curator' ? (
          <CuratorView 
            myProducts={myProducts || []} 
            totalEarnings={totalEarnings} 
            activeSales={activeSales} 
            pendingApproval={pendingApproval} 
          />
        ) : (
          <CollectorView orders={myOrders || []} reservedOffers={reservedOffers} conciergeRequests={conciergeRequests || []} />
        )}
      </div>
    </main>
  )
}

