'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '@/src/context/SettingsContext'
import { User, MessageSquare, Sparkles, PhoneCall, LayoutDashboard, Package, Settings, LogOut } from 'lucide-react'
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
  const [announcementIndex, setAnnouncementIndex] = useState(0)

  const announcements = [
    t('topbar.announcement1', '✦ %100 FİZİKSEL EKSPERTİZ & 3D SPEKTRAL ANALİZ GARANTİSİ'),
    t('topbar.announcement2', '⚡ İSTANBUL İÇİ 4 SAATTE ÖZEL VIP KURYE İLE MASAÜSTÜ TESLİMAT'),
    t('topbar.announcement3', '🛡️ PEONY LAB™ SERTİFİKALI VE HUKUKİ GARANTİLİ ARŞİV KOLEKSİYONU')
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [announcements.length])

  return (
    <nav className="w-full bg-white/75 backdrop-blur-lg border-b border-gray-200/40 shadow-sm sticky top-0 z-50">
      
      {/* Üst Lüks Duyuru & Hizmet Barı (Top Utility Bar) */}
      <div className="w-full bg-[#0D0D0D] text-zinc-300 text-[10px] sm:text-[11px] py-2 px-6 lg:px-12 flex items-center justify-between font-medium tracking-[0.15em] relative border-b border-zinc-800/80 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-[#AF9164]/40 after:to-transparent z-10">
        
        {/* Sol: VIP Rozet & Hızlı Panel/Sipariş Linkleri */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1.5 bg-[#AF9164]/15 border border-[#AF9164]/30 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-[#D4B78F] tracking-widest uppercase shadow-[0_0_12px_rgba(175,145,100,0.15)]">
            <Sparkles size={10} className="text-[#AF9164] animate-pulse" />
            {t('topbar.vipBadge', 'PEONY CONCIERGE™')}
          </span>

          <span className="text-zinc-700">|</span>

          <Link href={user ? "/dashboard" : "/login"} className="text-zinc-300 hover:text-[#AF9164] transition-colors text-[10px] font-bold tracking-widest uppercase">
            {t('nav.myPanel', 'PANELİM')}
          </Link>
          <span className="text-zinc-700">•</span>
          <Link href={user ? "/orders" : "/login"} className="text-zinc-300 hover:text-[#AF9164] transition-colors text-[10px] font-bold tracking-widest uppercase">
            {t('nav.myOrders', 'SİPARİŞLERİM')}
          </Link>
        </div>

        {/* Orta: Kayan / Dönen Duyuru Ticker */}
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
              <span className="w-1.5 h-1.5 rounded-full bg-[#AF9164] animate-pulse shrink-0" />
              <span className="truncate uppercase text-zinc-200 font-semibold tracking-[0.15em] text-[10px] sm:text-[11px]">
                {announcements[announcementIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sağ: VIP Whatsapp & Dil / Para Birimi Seçici */}
        <div className="flex items-center gap-4 shrink-0">
          <a 
            href="https://wa.me/908508854110" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-zinc-400 hover:text-[#AF9164] transition-colors text-[9px] font-bold tracking-wider uppercase"
          >
            <PhoneCall size={10} className="text-[#AF9164]" />
            <span>{t('topbar.whatsapp', 'VIP DESTEK HATTI')}</span>
          </a>
          
          <div className="hidden md:block h-3 w-[1px] bg-zinc-800" />

          <CurrencyLanguageSelector variant="topbar" align="right" />
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between relative">
        
        {/* Sol: Hamburger Mobil Menü ve Masaüstü 2 Temel Link */}
        <div className="flex items-center">
          {/* Mobil Hamburger Çekmecesi */}
          <MobileMenu user={user} profile={profile} />

          {/* Masaüstü Ekstra Linkler (Logo ile asıl geniş alan bırakan sade 2 link) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A] ml-6">
            <Link href="/how-it-works" className="hover:text-[#AF9164] transition-colors duration-300 whitespace-nowrap">
              {t('nav.howItWorks', 'NASIL ÇALIŞIR?')}
            </Link>

            <Link href="/sell-with-us" className="text-[#AF9164] hover:text-black transition-colors duration-300 relative whitespace-nowrap after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-[#AF9164] after:-bottom-1 after:left-0 after:scale-x-100 hover:after:scale-x-0 after:transition-transform after:duration-300">
              {t('nav.sell', 'SATIŞ YAP')}
            </Link>
          </div>
        </div>

        {/* Orta: Logo (Masaüstü ve Mobilde Mükemmel Ortalı ve Taşmayan Yapı) */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-2xl lg:text-3xl font-playfair tracking-[0.15em] sm:tracking-[0.35em] uppercase whitespace-nowrap text-[#1A1A1A] transition-all hover:opacity-80">
          PEONY<span className="italic font-light lowercase text-base sm:text-3xl lg:text-4xl ml-1 text-[#AF9164]">collective</span>
        </Link>

        {/* Sağ: İkonlar, Arama ve Profil */}
        <div className="flex items-center gap-3 lg:gap-6">
          <SearchTrigger />
          <CartTrigger />
          
          {user ? (
            <div className="flex items-center gap-4 lg:gap-6">
              <Link href="/messages" className="text-[#1A1A1A] hover:text-[#AF9164] transition-colors relative" title="Mesajlarım">
                <MessageSquare size={18} strokeWidth={1.5} />
              </Link>
              <NotificationBell userId={user.id} />
              
              {/* Profil & Hesap Açılır Menüsü (Dropdown) */}
              <div className="relative group">
                <Link href="/settings" className="flex items-center gap-3 py-1 group/btn cursor-pointer" title="Hesap Ayarlarım">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none mb-1 text-[#1A1A1A]">{t('nav.myAccount', 'HESABIM')}</p>
                    <p className="text-xs font-playfair italic text-gray-500 group-hover/btn:text-[#AF9164] transition-colors duration-300">{profile?.first_name}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center bg-transparent group-hover/btn:border-[#AF9164] group-hover/btn:bg-[#F9F9F8] transition-all duration-300 text-[#1A1A1A] group-hover/btn:text-[#AF9164] overflow-hidden">
                    {profile?.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={15} strokeWidth={1.5} />
                    )}
                  </div>
                </Link>

                {/* Account Dropdown */}
                <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <div className="w-56 bg-[#0D0D0D] border border-zinc-800 rounded-2xl shadow-2xl p-2 text-zinc-300 text-xs">
                    <div className="px-3 py-2 border-b border-zinc-800/80 mb-1">
                      <p className="font-bold text-white text-[11px] truncate">{profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : user.email}</p>
                      <p className="text-[9px] text-[#AF9164] uppercase tracking-wider font-bold">PEONY VIP MEMBER</p>
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-zinc-800/80 hover:text-white transition-colors text-[11px] font-semibold">
                      <LayoutDashboard size={14} className="text-[#AF9164]" />
                      {t('nav.myPanel', 'PANELİM')}
                    </Link>
                    <Link href="/orders" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-zinc-800/80 hover:text-white transition-colors text-[11px] font-semibold">
                      <Package size={14} className="text-[#AF9164]" />
                      {t('nav.myOrders', 'SİPARİŞLERİM')}
                    </Link>
                    <Link href="/messages" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-zinc-800/80 hover:text-white transition-colors text-[11px] font-semibold">
                      <MessageSquare size={14} className="text-[#AF9164]" />
                      {t('nav.messages', 'MESAJLARIM')}
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-zinc-800/80 hover:text-white transition-colors text-[11px] font-semibold border-b border-zinc-800/80 mb-1">
                      <Settings size={14} className="text-[#AF9164]" />
                      {t('nav.settings', 'HESAP AYARLARIM')}
                    </Link>
                    <form action={logoutAction}>
                      <button className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 transition-colors text-[11px] font-semibold cursor-pointer">
                        <LogOut size={14} />
                        {t('nav.logout', 'ÇIKIŞ')}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Masaüstünde Giriş Butonu */
            <Link href="/login" className="hidden sm:block text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#AF9164] transition-colors duration-300">
              {t('nav.login', 'GİRİŞ')}
            </Link>
          )}
        </div>
      </div>
      <CategoryNav />
    </nav>
  )
}
