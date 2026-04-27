import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import CuratorView from '@/src/components/CuratorView'
import CollectorView from '@/src/components/CollectorView'
import DashboardSwitcher from '@/src/components/DashboardSwitcher'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Dashboard({ searchParams }: PageProps) {
  const params = await searchParams
  const currentView = (params.view as string) || 'curator'
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Satıcı Verileri (Küratör)
  const { data: myProducts } = await supabase
    .from('products')
    .select('*, orders(total_price)')
    .eq('seller_id', user.id)

  const totalEarnings = myProducts
    ?.filter(p => p.status === 'sold')
    .reduce((sum, p) => sum + (p.price || 0), 0) || 0

  const pendingApproval = myProducts?.filter(p => p.status === 'pending').length || 0
  const activeSales = myProducts?.filter(p => p.status === 'approved').length || 0

  // Alıcı Verileri (Koleksiyoner)
  const { data: myOrders } = await supabase
    .from('orders')
    .select('*, products(*)')
    .eq('buyer_id', user.id)

  return (
    <main className="min-h-screen bg-[#FCFCFB] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <DashboardSwitcher />

        {currentView === 'curator' ? (
          <CuratorView 
            myProducts={myProducts || []} 
            totalEarnings={totalEarnings} 
            activeSales={activeSales} 
            pendingApproval={pendingApproval} 
          />
        ) : (
          <CollectorView orders={myOrders || []} />
        )}
      </div>
    </main>
  )
}

