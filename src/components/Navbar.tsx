import Link from 'next/link'
import { createClient } from '@/src/utils/supabase/server'
import { logout } from '@/src/app/login/actions'
import NotificationBell from './NotificationBell'
import { Search, User } from 'lucide-react'

export default async function Navbar() {
  const supabase = await createClient()
  
  // Aktif kullanıcıyı alıyoruz
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile = null;
  
  // Eğer kullanıcı varsa, adını ve rolünü göstermek için profiles tablosuna bakıyoruz
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('first_name, last_name, role')
      .eq('id', user.id)
      .single()
      
    profile = data;
  }

  return (
    <nav className="w-full bg-white/70 backdrop-blur-xl border-b border-gray-50 sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-8 h-24 flex items-center justify-between relative">
        
        {/* Sol: Menü Linkleri */}
        <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <Link href="/?brand=Hermès" className="hover:text-black transition-colors">Hermès</Link>
          <Link href="/?brand=Chanel" className="hover:text-black transition-colors">Chanel</Link>
          <Link href="/?brand=Dior" className="hover:text-black transition-colors">Dior</Link>
          
          {user ? (
            <Link href="/dashboard" className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-[#AF9164] transition-all text-[10px] font-bold uppercase tracking-widest">
              Panelim
            </Link>
          ) : (
            <Link href="/sell" className="hover:text-black transition-colors">
              Satış Yap
            </Link>
          )}
        </div>

        {/* Orta: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-2xl font-playfair tracking-[0.3em] uppercase">
          Peony<span className="italic font-light">Collective</span>
        </Link>

        {/* Sağ: İkonlar ve Profil */}
        <div className="flex items-center gap-8">
          <button className="text-gray-400 hover:text-black transition-colors cursor-pointer">
            <Search size={18} strokeWidth={1.5} />
          </button>
          
          {user ? (
            <div className="flex items-center gap-6">
              <NotificationBell userId={user.id} />
              
              <Link href="/dashboard" className="flex items-center gap-3 group">
                <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-bold uppercase tracking-widest leading-none mb-1">Hesabım</p>
                  <p className="text-xs font-playfair italic text-gray-500">{profile?.first_name}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center bg-gray-50 group-hover:border-black transition-all">
                  <User size={16} strokeWidth={1.5} />
                </div>
              </Link>

              <form action={logout}>
                <button className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors cursor-pointer">
                  Çıkış
                </button>
              </form>
            </div>
          ) : (
            <Link href="/login" className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">
              Giriş
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}