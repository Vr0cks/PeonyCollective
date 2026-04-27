'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { LayoutGrid, ShoppingBag } from 'lucide-react'

export default function DashboardSwitcher() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentView = searchParams.get('view') || 'curator'

  const handleSwitch = (view: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('view', view)
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <div className="flex items-center p-1 bg-gray-100 rounded-2xl w-fit mb-12">
      <button
        onClick={() => handleSwitch('curator')}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
          currentView === 'curator'
            ? 'bg-white text-black shadow-sm'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <LayoutGrid size={14} />
        Küratör
      </button>
      <button
        onClick={() => handleSwitch('collector')}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
          currentView === 'collector'
            ? 'bg-white text-black shadow-sm'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <ShoppingBag size={14} />
        Koleksiyoner
      </button>
    </div>
  )
}
