'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut } from 'lucide-react'
import { logout } from '@/src/app/login/actions'

import type { User as SupabaseUser } from '@supabase/supabase-js'
import { Profile } from '@/src/types'

interface MobileMenuProps {
  user: SupabaseUser | null
  profile: Profile | null
}

export default function MobileMenu({ user, profile }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  // Drawer Animasyonu (Farklı yönlerden kayma)
  const drawerVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 35
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30
      }
    }
  }

  // Karartı Arka Plan Animasyonu (Overlay)
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 0.4 }
  }

  return (
    <div className="lg:hidden flex items-center">
      
      {/* Hamburger Butonu */}
      <button
        onClick={toggleMenu}
        className="text-[#1A1A1A] p-2 hover:text-[#AF9164] transition-colors focus:outline-none cursor-pointer"
        aria-label="Menüyü Aç"
      >
        <Menu size={24} strokeWidth={1.5} />
      </button>

      {/* Drawer ve Arka Plan (AnimatePresence ile) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Arka Plan Karartısı (Overlay) */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
              transition={{ duration: 0.3 }}
            />

            {/* Çekmece Menü İçeriği (Drawer) */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[360px] bg-white/95 backdrop-blur-2xl z-50 flex flex-col shadow-2xl overflow-y-auto"
            >
              
              {/* Çekmece Header (Logo ve Kapat Butonu) */}
              <div className="h-24 px-6 flex items-center justify-between border-b border-gray-100">
                <Link href="/" onClick={toggleMenu} className="text-lg font-playfair tracking-[0.2em] uppercase">
                  PEONY<span className="italic font-light text-[#AF9164]">C.</span>
                </Link>
                <button
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-black transition-colors focus:outline-none cursor-pointer"
                  aria-label="Menüyü Kapat"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Menü Linkleri */}
              <div className="flex-grow py-8 px-6 space-y-8 flex flex-col justify-start">
                
                {/* 1. Markalar */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Markalar</p>
                  <div className="flex flex-col gap-4 text-sm font-medium uppercase tracking-[0.15em] text-gray-800">
                    <Link href="/?brand=Hermès#collection" onClick={toggleMenu} className="hover:text-[#AF9164] transition-colors">Hermès</Link>
                    <Link href="/?brand=Chanel#collection" onClick={toggleMenu} className="hover:text-[#AF9164] transition-colors">Chanel</Link>
                    <Link href="/?brand=Dior#collection" onClick={toggleMenu} className="hover:text-[#AF9164] transition-colors">Dior</Link>
                  </div>
                </div>

                <div className="h-[1px] bg-gray-100" />

                {/* 2. Concierge & Satış */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Kullanıcı Servisleri</p>
                  <div className="flex flex-col gap-4 text-sm font-medium uppercase tracking-[0.15em] text-gray-800">
                    {user ? (
                      <Link href="/dashboard" onClick={toggleMenu} className="hover:text-[#AF9164] transition-colors flex items-center gap-2">
                        <User size={16} strokeWidth={1.5} />
                        Panelim
                      </Link>
                    ) : (
                      <Link href="/sell" onClick={toggleMenu} className="hover:text-[#AF9164] transition-colors">Satış Yap</Link>
                    )}
                    <Link href="/how-it-works" onClick={toggleMenu} className="hover:text-[#AF9164] transition-colors">Nasıl Çalışır?</Link>
                  </div>
                </div>

                <div className="h-[1px] bg-gray-100" />

                {/* 3. Hesap Bilgileri */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Hesap</p>
                  {user ? (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white text-xs font-bold text-gray-700">
                          {profile?.first_name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 leading-none mb-1">
                            {profile?.first_name} {profile?.last_name}
                          </p>
                          <p className="text-[10px] font-medium text-gray-400 leading-none">
                            {profile?.role === 'admin' ? 'Yönetici' : 'Üye'}
                          </p>
                        </div>
                      </div>
                      <form action={logout} onSubmit={toggleMenu}>
                        <button
                          type="submit"
                          className="w-full text-left text-xs font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-widest flex items-center gap-2 px-1 cursor-pointer"
                        >
                          <LogOut size={14} strokeWidth={1.5} />
                          Çıkış Yap
                        </button>
                      </form>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={toggleMenu}
                      className="inline-block text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors"
                    >
                      Üye Girişi / Kayıt
                    </Link>
                  )}
                </div>

              </div>

              {/* Çekmece Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 text-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">PEONY COLLECTIVE</p>
                <p className="text-[8px] italic font-light text-[#AF9164]">Mirasın Yeni Sahibi</p>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
