'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, MessageSquare, Settings, Sparkles, BookOpen, ShieldCheck, Crown, ShoppingBag, ArrowUpRight, Compass } from 'lucide-react'
import { logout } from '@/src/app/login/actions'
import { useSettings } from '@/src/context/SettingsContext'
import CurrencyLanguageSelector from './CurrencyLanguageSelector'

import type { User as SupabaseUser } from '@supabase/supabase-js'
import { Profile } from '@/src/types'

interface MobileMenuProps {
  user: SupabaseUser | null
  profile: Profile | null
}

export default function MobileMenu({ user, profile }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t, language } = useSettings()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const drawerVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring' as const,
        stiffness: 320,
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

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 0.6 }
  }

  const featuredBrands = [
    'Hermès', 'Chanel', 'Louis Vuitton', 'Bottega Veneta', 
    'Cartier', 'Rolex', 'Dior', 'Prada'
  ]

  const categoryShortcuts = [
    { title: language === 'en' ? 'Bags' : 'Çanta', href: '/catalog?category=Çanta', icon: '👜' },
    { title: language === 'en' ? 'Shoes' : 'Ayakkabı', href: '/catalog?category=Ayakkabı', icon: '👠' },
    { title: language === 'en' ? 'Clothing' : 'Kıyafet', href: '/catalog?category=Kıyafet', icon: '👗' },
    { title: language === 'en' ? 'Watches & Jewelry' : 'Saat & Mücevher', href: '/catalog?category=Aksesuar', icon: '⌚' }
  ]

  return (
    <div className="lg:hidden flex items-center">
      
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="text-[#1A1A1A] p-2 hover:text-[#AF9164] transition-colors focus:outline-none cursor-pointer"
        aria-label="Menüyü Aç"
      >
        <Menu size={24} strokeWidth={1.5} />
      </button>

      {/* Drawer & Portal Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={overlayVariants}
                onClick={toggleMenu}
                className="fixed inset-0 bg-black/70 z-[9999] cursor-pointer backdrop-blur-sm"
                transition={{ duration: 0.3 }}
              />

              {/* Drawer Container */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={drawerVariants}
                className="fixed top-0 left-0 bottom-0 w-[88%] max-w-[380px] bg-[#0E1015] text-white z-[10000] flex flex-col shadow-2xl overflow-y-auto border-r border-white/10"
              >
                
                {/* Header: PEONY COLLECTIVE Full Name */}
                <div className="h-20 px-6 flex items-center justify-between border-b border-white/10 bg-[#12141C]/80 backdrop-blur-md shrink-0">
                  <Link href="/" onClick={toggleMenu} className="flex items-baseline gap-1.5 group">
                    <span className="font-playfair tracking-[0.25em] text-lg font-bold text-white group-hover:text-[#E2C79E] transition-colors">
                      PEONY
                    </span>
                    <span className="font-playfair italic text-lg font-normal text-[#AF9164] tracking-[0.15em]">
                      collective
                    </span>
                  </Link>
                  <button
                    onClick={toggleMenu}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="flex-grow py-5 px-6 space-y-6 flex flex-col justify-start">
                  
                  {/* Language & Currency Selector Bar */}
                  <div className="bg-white/5 p-3 rounded-2xl flex items-center justify-between border border-white/10 shadow-inner">
                    <span className="text-[9.5px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                      {t('footer.languageCurrency', 'DİL VE PARA BİRİMİ')}
                    </span>
                    <CurrencyLanguageSelector dropUp={false} variant="dark" />
                  </div>

                  {/* 1. Explore All Catalog Banner */}
                  <Link
                    href="/catalog"
                    onClick={toggleMenu}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-[#AF9164]/20 via-[#AF9164]/10 to-transparent border border-[#AF9164]/40 flex items-center justify-between group hover:border-[#AF9164] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#AF9164] text-black flex items-center justify-center shadow-md">
                        <Compass size={16} strokeWidth={2} />
                      </div>
                      <div>
                        <span className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-[#E2C79E] font-bold block">
                          {language === 'en' ? 'CURATED VAULT' : 'KÜRASYON ARŞİVİ'}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          {t('nav.allArchive', 'TÜM ARŞİVİ KEŞFET')}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#AF9164] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>

                  {/* 2. Main Categories Grid */}
                  <div className="space-y-2.5">
                    <span className="text-[9.5px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] block">
                      {t('nav.categories', 'KATEGORİLER')}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {categoryShortcuts.map((cat) => (
                        <Link
                          key={cat.title}
                          href={cat.href}
                          onClick={toggleMenu}
                          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all flex items-center gap-2"
                        >
                          <span className="text-sm">{cat.icon}</span>
                          <span className="text-xs font-semibold text-zinc-200 tracking-wide">{cat.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* 3. Featured Maisons / Brands */}
                  <div className="space-y-2.5">
                    <span className="text-[9.5px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] block">
                      {t('nav.brands', 'LÜKS TASARIMCILAR')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {featuredBrands.map((b) => (
                        <Link
                          key={b}
                          href={`/catalog?brand=${encodeURIComponent(b)}`}
                          onClick={toggleMenu}
                          className="px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 hover:bg-[#AF9164]/20 border border-white/10 hover:border-[#AF9164]/50 text-zinc-300 hover:text-[#E2C79E] transition-all"
                        >
                          {b}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* 4. Services & Editorial */}
                  <div className="space-y-2.5 pt-1">
                    <span className="text-[9.5px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] block">
                      {t('nav.services', 'HİZMETLER & KONSİNYE')}
                    </span>
                    <div className="space-y-2 text-xs font-semibold">
                      <Link 
                        href="/magazine" 
                        onClick={toggleMenu} 
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1D26] border border-[#AF9164]/30 hover:border-[#AF9164] transition-all"
                      >
                        <span className="text-[#E2C79E] flex items-center gap-2">
                          <BookOpen size={14} className="text-[#AF9164]" />
                          <span>{t('nav.magazine', 'Peony Magazine (Nº 01)')}</span>
                        </span>
                        <span className="text-[8px] font-mono bg-[#AF9164] text-black font-bold px-1.5 py-0.5 rounded">
                          {language === 'en' ? 'READ' : 'OKU'}
                        </span>
                      </Link>

                      <Link 
                        href="/sell" 
                        onClick={toggleMenu} 
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-zinc-200 hover:text-white transition-all"
                      >
                        <Crown size={14} className="text-[#AF9164]" />
                        <span>{t('nav.sell', 'VIP Konsinye Masası')}</span>
                      </Link>

                      <Link 
                        href="/#trust" 
                        onClick={toggleMenu} 
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-zinc-200 hover:text-white transition-all"
                      >
                        <ShieldCheck size={14} className="text-[#AF9164]" />
                        <span>{t('nav.trust', 'Entrupy & Orijinallik Güvencesi')}</span>
                      </Link>
                    </div>
                  </div>

                  {/* 5. Account & Auth Section */}
                  <div className="pt-2">
                    {user ? (
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#AF9164]/20 border border-[#AF9164]/40 flex items-center justify-center text-[#E2C79E]">
                            <User size={16} strokeWidth={1.5} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-wider text-white truncate">
                              {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : 'VIP Member'}
                            </p>
                            <p className="text-[10px] text-zinc-400 font-mono truncate">{user.email}</p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                          <Link
                            href="/dashboard"
                            onClick={toggleMenu}
                            className="text-xs font-semibold text-zinc-300 hover:text-white py-1 flex items-center gap-2"
                          >
                            <User size={13} className="text-[#AF9164]" />
                            <span>{t('nav.myPanel', 'Hesap Panelim')}</span>
                          </Link>
                          <Link
                            href="/orders"
                            onClick={toggleMenu}
                            className="text-xs font-semibold text-zinc-300 hover:text-white py-1 flex items-center gap-2"
                          >
                            <Settings size={13} className="text-[#AF9164]" />
                            <span>{t('nav.myOrders', 'Siparişlerim')}</span>
                          </Link>
                        </div>

                        <form action={logout} className="pt-2 border-t border-white/10">
                          <button
                            type="submit"
                            className="w-full text-left text-[11px] font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                          >
                            <LogOut size={13} />
                            <span>{t('nav.logout', 'ÇIKIŞ')}</span>
                          </button>
                        </form>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        onClick={toggleMenu}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#AF9164] to-[#96794F] text-black font-bold text-xs uppercase tracking-[0.2em] text-center block shadow-lg hover:brightness-110 transition-all"
                      >
                        {t('nav.login', 'ÜYE GİRİŞİ / KAYIT')}
                      </Link>
                    )}
                  </div>

                </div>

                {/* Footer Quote */}
                <div className="p-5 border-t border-white/10 bg-[#12141C] text-center shrink-0 space-y-1">
                  <p className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-[0.25em]">PEONY COLLECTIVE</p>
                  <p className="text-[9px] italic font-light text-[#AF9164]">{t('hero.tagline', 'Mirasın Yeni Sahibi')}</p>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  )
}
