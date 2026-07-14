'use client'

import { useState } from 'react'
import CuratorView from '@/src/components/CuratorView'
import CollectorView from '@/src/components/CollectorView'
import { LayoutGrid, ShoppingBag } from 'lucide-react'
import { Product, Order } from '@/src/types'

interface DashboardClientProps {
  myProducts: Product[]
  totalEarnings: number
  activeSales: number
  pendingApproval: number
  myOrders: Order[]
  reservedOffers: any[]
  conciergeRequests: any[]
}

export default function DashboardClient({
  myProducts,
  totalEarnings,
  activeSales,
  pendingApproval,
  myOrders,
  reservedOffers,
  conciergeRequests
}: DashboardClientProps) {
  const [currentView, setCurrentView] = useState<'curator' | 'collector'>('curator')

  return (
    <div>
      {/* Switcher */}
      <div className="flex items-center p-1 bg-gray-100 rounded-2xl w-fit mb-12">
        <button
          onClick={() => setCurrentView('curator')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
            currentView === 'curator'
              ? 'bg-white text-black shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <LayoutGrid size={14} />
          Küratör
        </button>
        <button
          onClick={() => setCurrentView('collector')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
            currentView === 'collector'
              ? 'bg-white text-black shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <ShoppingBag size={14} />
          Koleksiyoner
        </button>
      </div>

      {/* View Render */}
      {currentView === 'curator' ? (
        <CuratorView
          myProducts={myProducts}
          totalEarnings={totalEarnings}
          activeSales={activeSales}
          pendingApproval={pendingApproval}
        />
      ) : (
        <CollectorView
          orders={myOrders}
          reservedOffers={reservedOffers}
          conciergeRequests={conciergeRequests}
        />
      )}
    </div>
  )
}
