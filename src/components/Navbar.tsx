import Link from 'next/link'
import { createClient } from '@/src/utils/supabase/server'
import { logout } from '@/src/app/login/actions'
import NotificationBell from './NotificationBell'
import MobileMenu from './MobileMenu'
import SearchTrigger from './SearchTrigger'
import CartTrigger from './CartTrigger'
import CategoryNav from './CategoryNav'
import { User, MessageSquare } from 'lucide-react'
import { Profile } from '@/src/types'

export default async function Navbar() {
  const supabase = await createClient()
  
  // Aktif kullanıcıyı alıyoruz
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile: Profile | null = null;
  
  // Eğer kullanıcı varsa, adını ve rolünü göstermek için profiles tablosuna bakıyoruz
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
      
    profile = data as Profile;
  }

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between relative">
        
        {/* Sol: Hamburger Mobil Menü ve Masaüstü Linkleri */}
        <div className="flex items-center">
          {/* Mobil Hamburger Çekmecesi */}
          <MobileMenu user={user} profile={profile} />

          {/* Masaüstü Ekstra Linkler */}
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] ml-6">
            <Link href="/how-it-works" className="hover:text-[#AF9164] transition-colors duration-300">NASIL ÇALIŞIR?</Link>
            
            {user ? (
              <div className="flex items-center gap-6">
                <Link href="/dashboard" className="bg-black text-white px-8 py-3 rounded-none hover:bg-[#AF9164] transition-colors duration-300 text-[11px] font-bold uppercase tracking-widest border border-black hover:border-[#AF9164]">
                  PANELİM
                </Link>
                <Link href="/orders" className="hover:text-[#AF9164] transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
                  SİPARİŞLERİM
                </Link>
              </div>
            ) : (
              <Link href="/sell-with-us" className="text-[#AF9164] hover:text-black transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-[#AF9164] after:-bottom-1 after:left-0 after:scale-x-100 hover:after:scale-x-0 after:transition-transform after:duration-300">
                SATIŞ YAP
              </Link>
            )}
          </div>
        </div>

        {/* Orta: Logo (Masaüstü ve Mobilde Mükemmel Ortalı ve Taşmayan Yapı) */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-base sm:text-2xl lg:text-3xl font-playfair tracking-[0.15em] sm:tracking-[0.35em] uppercase whitespace-nowrap text-[#1A1A1A] transition-all">
          PEONY<span className="hidden sm:inline italic font-light lowercase text-xl sm:text-3xl lg:text-4xl">collective</span>
        </Link>

        {/* Sağ: İkonlar, Arama ve Profil */}
        <div className="flex items-center gap-6 lg:gap-10">
          <SearchTrigger />
          <CartTrigger />
          
          {user ? (
            <div className="flex items-center gap-6 lg:gap-8">
              <Link href="/messages" className="text-[#1A1A1A] hover:text-[#AF9164] transition-colors relative" title="Mesajlarım">
                <MessageSquare size={18} strokeWidth={1.5} />
              </Link>
              <NotificationBell userId={user.id} />
              
              <Link href="/settings" className="flex items-center gap-4 group" title="Hesap Ayarlarım">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none mb-1.5 text-[#1A1A1A]">HESABIM</p>
                  <p className="text-sm font-playfair italic text-gray-500 group-hover:text-[#AF9164] transition-colors duration-300">{profile?.first_name}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-transparent group-hover:border-[#AF9164] group-hover:bg-[#F9F9F8] transition-all duration-300 text-[#1A1A1A] group-hover:text-[#AF9164] overflow-hidden">
                  {profile?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={16} strokeWidth={1} />
                  )}
                </div>
              </Link>

              {/* Masaüstünde Çıkış Butonu */}
              <form action={logout} className="hidden md:block">
                <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#1A1A1A] transition-colors duration-300 cursor-pointer">
                  ÇIKIŞ
                </button>
              </form>
            </div>
          ) : (
            /* Masaüstünde Giriş Butonu */
            <Link href="/login" className="hidden sm:block text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#AF9164] transition-colors duration-300">
              GİRİŞ
            </Link>
          )}
        </div>
      </div>
      <CategoryNav />
    </nav>
  )
}
