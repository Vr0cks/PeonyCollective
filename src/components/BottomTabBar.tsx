'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Compass, PlusSquare, UserCircle, ShoppingBag } from 'lucide-react'
import { useCart } from '@/src/context/CartContext'
import { useEffect, useState } from 'react'

/**
 * Provides persistent bottom navigation specifically designed for mobile devices.
 * Implements iOS Safe Area insets and dynamic rendering based on the active route.
 */
export default function BottomTabBar() {
  const pathname = usePathname()
  const { cartItems } = useCart()
  const cartCount = cartItems?.length || 0
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * Conditionally suppresses the bottom navigation bar on specific routes.
   * - /checkout: Enforces a distraction-free environment to optimize conversion rates.
   * - /admin: Prevents viewport conflicts with administrative layout structures.
   */
  if (pathname?.startsWith('/checkout') || pathname?.startsWith('/admin')) {
    return null;
  }

  const TABS = [
    { name: 'Keşfet', icon: Compass, href: '/' },
    { name: 'Arama', icon: Search, href: '/#collection' },
    { name: 'Sat', icon: PlusSquare, href: '/sell' },
    { name: 'Sepet', icon: ShoppingBag, href: '/checkout', badge: cartCount },
    { name: 'Hesap', icon: UserCircle, href: '/dashboard' }
  ]

  // Enforces visibility exclusively on viewports matching the 'md:hidden' tailwind directive.
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-gray-100 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_40px_rgba(0,0,0,0.03)] transition-transform duration-300">
      <div className="flex items-center justify-around h-16 px-2">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href))
          
          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-[#AF9164]' : 'text-gray-400 hover:text-black'} transition-colors relative`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                {mounted && tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-[#AF9164] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[9px] uppercase tracking-wider font-bold ${isActive ? 'text-[#AF9164]' : 'text-gray-400'}`}>
                {tab.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
