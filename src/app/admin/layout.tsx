import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Clock, Package, FlaskConical, LogOut, ShieldCheck, ShoppingCart, ShieldAlert, Users, Crown } from 'lucide-react'
import { logout } from '@/src/app/login/actions'

const navLinks = [
  { href: '/admin', label: 'Genel Bakış', icon: LayoutDashboard, exact: true },
  { href: '/admin/pending', label: 'Onay Kuyruğu', icon: Clock },
  { href: '/admin/products', label: 'Tüm Ürünler', icon: Package },
  { href: '/admin/lab', label: 'Lab — A/B İnceleme', icon: FlaskConical },
  { href: '/admin/orders', label: 'Sipariş Yönetimi', icon: ShoppingCart },
  { href: '/admin/suppliers', label: 'Tedarikçiler', icon: Users },
  { href: '/admin/concierge', label: 'VIP Teklifler', icon: Crown },
  { href: '/admin/test-suite', label: 'Entegrasyon Testi', icon: ShieldAlert },
]

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/admin')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/')
  }

  // Onay bekleyen ürün sayısı — sidebar badge için
  const { count: pendingCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  return (
    <div className="fixed inset-0 flex bg-[#0F0F0F] z-[100] overflow-hidden">

      {/* SOL SİDEBAR */}
      <aside className="w-64 shrink-0 flex flex-col bg-[#111111] border-r border-white/5 h-full overflow-y-auto">

        {/* Logo */}
        <div className="px-6 py-8 border-b border-white/5">
          <Link href="/" className="block">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 mb-1.5">Peony Collective</p>
            <p className="text-sm font-bold tracking-widest text-white uppercase">Admin Panel</p>
          </Link>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Sistem Aktif</span>
          </div>
        </div>

        {/* Navigasyon */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isPending = link.href === '/admin/pending'
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Icon size={15} strokeWidth={1.5} />
                  <span className="text-xs font-semibold tracking-wide">{link.label}</span>
                </div>
                {isPending && (pendingCount ?? 0) > 0 && (
                  <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {pendingCount}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Alt: Ayarlar + Çıkış */}
        <div className="px-3 py-6 border-t border-white/5 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/30 hover:text-white/60 transition-all"
          >
            <ShieldCheck size={15} strokeWidth={1.5} />
            <span className="text-xs font-semibold tracking-wide">Siteye Dön</span>
          </Link>
          <form action={logout}>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all cursor-pointer">
              <LogOut size={15} strokeWidth={1.5} />
              <span className="text-xs font-semibold tracking-wide">Çıkış Yap</span>
            </button>
          </form>
        </div>
      </aside>

      {/* SAĞ İÇERİK ALANI */}
      <main className="flex-1 overflow-y-auto bg-[#0F0F0F]">
        {children}
      </main>

    </div>
  )
}
