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
    <div className="md:hidden fixed bottom-5 left-4 right-4 z-40 bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
      <div className="flex items-center justify-around h-14 px-2">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href))
          
          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-[#AF9164]' : 'text-zinc-400/80 hover:text-white'} transition-colors relative`}
            >
              <div className="relative flex flex-col items-center">
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.5} />
                {mounted && tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#AF9164] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[8px] uppercase tracking-[0.12em] font-bold ${isActive ? 'text-[#AF9164]' : 'text-zinc-500'}`}>
                {tab.name}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#AF9164]" />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
