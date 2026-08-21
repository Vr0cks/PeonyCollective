'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '@/src/context/SettingsContext'
import { User, MessageSquare, Sparkles, PhoneCall, LayoutDashboard, Package, Settings, LogOut, ArrowUpRight } from 'lucide-react'
import { Profile } from '@/src/types'
import NotificationBell from './NotificationBell'
import MobileMenu from './MobileMenu'
import SearchTrigger from './SearchTrigger'
import CartTrigger from './CartTrigger'
import CategoryNav from './CategoryNav'
import CurrencyLanguageSelector from './CurrencyLanguageSelector'

interface NavbarClientProps {
  user: any
  profile: Profile | null
  logoutAction: () => Promise<void>
}

export default function NavbarClient({ user, profile, logoutAction }: NavbarClientProps) {
  const { t } = useSettings()
  const pathname = usePathname()
  const [announcementIndex, setAnnouncementIndex] = useState(0)

  // Auto-hide is strictly restricted to /catalog and /magazine pages only
  const isAutoHidePage = pathname?.startsWith('/catalog') || pathname?.startsWith('/magazine')

  const announcements = [
    t('topbar.announcement1', '100% FİZİKSEL EKSPERTİZ & ENTRUPY AI ORİJİNALLİK GARANTİSİ'),
    t('topbar.announcement2', 'İSTANBUL İÇİ 4 SAATTE ÖZEL VIP KURYE İLE MASAÜSTÜ TESLİMAT'),
    t('topbar.announcement3', 'SIFIR RİSK: 14 GÜN KOŞULSUZ İADE & GÜVENLİ ESCROW ÖDEME')
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [announcements.length])

  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    if (!isAutoHidePage) {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 90 && currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isAutoHidePage, lastScrollY])

  return (
    <nav className={`w-full bg-white/85 backdrop-blur-xl border-b border-stone-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)] sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
      (!isAutoHidePage || isVisible) ? 'translate-y-0' : '-translate-y-full'
    }`}>
      
      {/* ─── Top Utility Announcement Bar ─── */}
      <div className="w-full bg-[#0C0D10] text-zinc-300 text-[10px] sm:text-[11px] py-2 px-6 lg:px-12 flex items-center justify-between font-medium tracking-[0.14em] relative border-b border-white/[0.06] z-10">
        
        {/* Sol: VIP Rozet & Hızlı Panel/Sipariş Linkleri */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1.5 bg-[#9E7D4E]/15 border border-[#9E7D4E]/30 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-[#E2C79E] tracking-widest uppercase shadow-[0_0_12px_rgba(158,125,78,0.15)]">
            <Sparkles size={10} className="text-[#E2C79E] animate-pulse" />
            {t('topbar.vipBadge', 'PEONY CONCIERGE')}
          </span>

          <span className="text-zinc-700">|</span>

          <Link href={user ? "/dashboard" : "/login"} className="text-zinc-400 hover:text-[#E2C79E] transition-colors text-[10px] font-semibold tracking-widest uppercase">
            {t('nav.myPanel', 'PANELİM')}
          </Link>
          <span className="text-zinc-700">•</span>
          <Link href={user ? "/orders" : "/login"} className="text-zinc-400 hover:text-[#E2C79E] transition-colors text-[10px] font-semibold tracking-widest uppercase">
            {t('nav.myOrders', 'SİPARİŞLERİM')}
          </Link>
        </div>

        {/* Orta: Dönen Lüks Duyuru Ticker */}
        <div className="flex-1 flex justify-center items-center px-4 overflow-hidden h-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={announcementIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex items-center gap-2 truncate text-center"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E7D4E] animate-pulse shrink-0" />
              <span className="truncate uppercase text-zinc-200 font-semibold tracking-[0.14em] text-[10px] sm:text-[11px]">
                {announcements[announcementIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sağ: VIP Whatsapp & Dil / Para Birimi Seçici */}
        <div className="flex items-center gap-4 shrink-0">
          <a 
            href={`https://wa.me/905523652093?text=${encodeURIComponent(
              t('topbar.whatsappDraft', 'Merhaba, Peony VIP Concierge masası ile iletişime geçmek istiyorum.')
            )}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-zinc-400 hover:text-[#E2C79E] transition-colors text-[9px] font-bold tracking-wider uppercase"
          >
            <PhoneCall size={10} className="text-[#9E7D4E]" />
            <span>{t('topbar.whatsapp', 'VIP CONCIERGE HATTI')}</span>
          </a>
          
          <div className="hidden md:block h-3 w-[1px] bg-zinc-800" />

          <CurrencyLanguageSelector variant="topbar" align="right" />
        </div>
      </div>

      {/* ─── Main Navbar Header ─── */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between relative">
        
        {/* Sol: Hamburger Mobil Menü ve Temel Editoryal Linkler */}
        <div className="flex items-center">
          <MobileMenu user={user} profile={profile} />

          {/* Masaüstü Sol Linkler */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A1D24] ml-6">
            <Link 
              href="/how-it-works" 
              className="text-stone-600 hover:text-[#9E7D4E] transition-colors duration-200 whitespace-nowrap"
            >
              {t('nav.howItWorks', 'NASIL ÇALIŞIR?')}
            </Link>

            <Link 
              href="/how-it-works#authenticity" 
              className="text-stone-600 hover:text-[#9E7D4E] transition-colors duration-200 whitespace-nowrap"
            >
              {t('nav.authenticity', 'ORİJİNALLİK GARANTİSİ')}
            </Link>
          </div>
        </div>

        {/* Orta: Majestic Serif Logo */}
        <Link 
          href="/" 
          className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-2xl lg:text-3xl font-playfair tracking-[0.15em] sm:tracking-[0.25em] uppercase whitespace-nowrap text-[#1A1D24] transition-all hover:opacity-85"
        >
          PEONY<span className="italic font-light lowercase text-xs sm:text-2xl lg:text-3xl ml-1 text-[#9E7D4E]">collective</span>
        </Link>

        {/* Sağ: İkonlar, Arama, Sepet, VIP Satış Yap & Profil */}
        <div className="flex items-center gap-3 lg:gap-5">
          
          {/* Lüks Vurgulu Konsinye Satış Butonu */}
          <Link 
            href="/sell-with-us" 
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#9E7D4E]/80 bg-[#9E7D4E]/10 hover:bg-[#9E7D4E] text-[#9E7D4E] hover:text-white font-bold text-[10px] tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_2px_12px_rgba(158,125,78,0.1)] hover:shadow-[0_4px_20px_rgba(158,125,78,0.25)] group cursor-pointer"
          >
            <span>{t('nav.sell', 'LÜKSÜNÜ SAT')}</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <SearchTrigger />
          <CartTrigger />
          
          {user ? (
            <div className="hidden sm:flex items-center gap-3 lg:gap-4">
              <Link href="/messages" className="text-[#1A1D24] hover:text-[#9E7D4E] transition-colors p-1" title="Mesajlarım">
                <MessageSquare size={19} strokeWidth={1.5} />
              </Link>
              <NotificationBell userId={user.id} />
              
              {/* Profil & Hesap Açılır Menüsü */}
              <div className="relative group">
                <Link href="/settings" className="flex items-center gap-2.5 py-1 group/btn cursor-pointer" title="Hesap Ayarlarım">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none mb-1 text-[#1A1D24]">{t('nav.myAccount', 'HESABIM')}</p>
                    <p className="text-xs font-playfair italic text-stone-500 group-hover/btn:text-[#9E7D4E] transition-colors duration-300">{profile?.first_name || 'Üye'}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center bg-transparent group-hover/btn:border-[#9E7D4E] group-hover/btn:bg-[#F9F7F2] transition-all duration-300 text-[#1A1D24] group-hover/btn:text-[#9E7D4E] overflow-hidden">
                    {profile?.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} strokeWidth={1.5} />
                    )}
                  </div>
                </Link>

                {/* Account Dropdown */}
                <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <div className="w-60 bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-2xl shadow-2xl p-2 text-stone-700 text-xs">
                    <div className="px-3.5 py-2.5 border-b border-stone-100 mb-1">
                      <p className="font-bold text-stone-900 text-[12px] truncate">{profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : user.email}</p>
                      <p className="text-[9px] text-[#9E7D4E] uppercase tracking-wider font-bold">PEONY VIP MEMBER</p>
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F6F1] hover:text-[#9E7D4E] transition-colors text-[11px] font-semibold">
                      <LayoutDashboard size={14} className="text-[#9E7D4E]" />
                      {t('nav.myPanel', 'PANELİM')}
                    </Link>
                    <Link href="/orders" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F6F1] hover:text-[#9E7D4E] transition-colors text-[11px] font-semibold">
                      <Package size={14} className="text-[#9E7D4E]" />
                      {t('nav.myOrders', 'SİPARİŞLERİM')}
                    </Link>
                    <Link href="/messages" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F6F1] hover:text-[#9E7D4E] transition-colors text-[11px] font-semibold">
                      <MessageSquare size={14} className="text-[#9E7D4E]" />
                      {t('nav.messages', 'MESAJLARIM')}
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F6F1] hover:text-[#9E7D4E] transition-colors text-[11px] font-semibold border-b border-stone-100 mb-1">
                      <Settings size={14} className="text-[#9E7D4E]" />
                      {t('nav.settings', 'HESAP AYARLARIM')}
                    </Link>
                    <form action={logoutAction}>
                      <button className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-[11px] font-semibold cursor-pointer">
                        <LogOut size={14} />
                        {t('nav.logout', 'ÇIKIŞ')}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full border border-stone-300 hover:border-[#9E7D4E] text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A1D24] hover:text-[#9E7D4E] hover:bg-[#F8F6F1] transition-all duration-200"
            >
              {t('nav.login', 'GİRİŞ')}
            </Link>
          )}
        </div>
      </div>

      {/* ─── Kategori & Markalar Mega Menüsü ─── */}
      <CategoryNav />
    </nav>
  )
}
