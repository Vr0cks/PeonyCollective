import { createClient } from '@/src/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Product, Profile } from '@/src/types'
import FadeIn from '@/src/components/animations/FadeIn'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // İstatistikler
  const [
    { count: totalCount },
    { count: pendingCount },
    { count: approvedCount },
    { count: rejectedCount },
    { count: soldCount },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'rejected'),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'sold'),
  ])

  // Son 8 ürün
  const { data: recentRaw } = await supabase
    .from('products')
    .select(`*, profiles:seller_id (first_name, last_name)`)
    .order('created_at', { ascending: false })
    .limit(8)

  const recentProducts: Product[] = (recentRaw || []) as Product[]

  const stats = [
    { label: 'Toplam Ürün', value: totalCount ?? 0, color: 'text-white', bg: 'bg-white/5', border: 'border-white/10' },
    { label: 'Onay Bekliyor', value: pendingCount ?? 0, color: 'text-amber-400', bg: 'bg-amber-500/5', border: 'border-amber-500/20', href: '/admin/pending', pulse: (pendingCount ?? 0) > 0 },
    { label: 'Aktif / Onaylı', value: approvedCount ?? 0, color: 'text-emerald-400', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20' },
    { label: 'Satıldı', value: soldCount ?? 0, color: 'text-[#AF9164]', bg: 'bg-[#AF9164]/5', border: 'border-[#AF9164]/20' },
    { label: 'Reddedildi', value: rejectedCount ?? 0, color: 'text-red-400', bg: 'bg-red-500/5', border: 'border-red-500/20' },
  ]

  const statusStyle: Record<string, { label: string; cls: string }> = {
    pending: { label: 'Bekliyor', cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    approved: { label: 'Onaylı', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    rejected: { label: 'Reddedildi', cls: 'bg-red-500/10 text-red-400 border-red-500/20' },
    sold: { label: 'Satıldı', cls: 'bg-[#AF9164]/10 text-[#AF9164] border-[#AF9164]/20' },
  }

  return (
    <div className="p-8 min-h-full">

      {/* Başlık */}
      <FadeIn delay={0.1} direction="down" className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-2">Admin Panel</p>
        <h1 className="text-3xl font-bold text-white tracking-tight">Genel Bakış</h1>
        <p className="text-white/40 text-sm mt-1">
          {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </FadeIn>

      {/* İSTATİSTİK KARTLARI */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {stats.map((s, idx) => (
          <FadeIn key={s.label} delay={0.2 + (idx * 0.1)} direction="up">
            <div
              className={`relative h-full ${s.bg} border ${s.border} rounded-2xl p-6 backdrop-blur-md ${s.href ? 'cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300' : ''}`}
            >
            {s.href ? (
              <Link href={s.href} className="absolute inset-0 rounded-2xl" />
            ) : null}
            {s.pulse && (
              <div className="absolute top-4 right-4">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
            )}
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-3">{s.label}</p>
            <p className={`text-4xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* HIZLI ERİŞİM */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { href: '/admin/pending', label: 'Onay Kuyruğu', desc: 'Bekleyen ürünleri incele ve onayla', count: pendingCount ?? 0, accent: 'amber' },
          { href: '/admin/products', label: 'Tüm Ürünler', desc: 'Tüm statüslerdeki ürünleri listele', count: totalCount ?? 0, accent: 'blue' },
          { href: '/admin/lab', label: 'Lab — A/B', desc: 'Orijinallik karşılaştırma ekranı', count: null, accent: 'purple' },
        ].map((item, idx) => (
          <FadeIn key={item.href} delay={0.4 + (idx * 0.1)} direction="left">
            <Link
              href={item.href}
              className="block h-full bg-white/5 hover:bg-white/8 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-2 h-2 rounded-full ${item.accent === 'amber' ? 'bg-amber-400' : item.accent === 'blue' ? 'bg-blue-400' : 'bg-purple-400'}`} />
                {item.count !== null && (
                  <span className="text-xs font-bold text-white/20">{item.count}</span>
                )}
              </div>
              <h3 className="text-sm font-bold text-white mb-1 group-hover:text-white transition-colors">{item.label}</h3>
              <p className="text-xs text-white/30">{item.desc}</p>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* SON ÜRÜNLER */}
      <FadeIn delay={0.6} direction="up" className="bg-white/3 backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/8 flex justify-between items-center">
          <h2 className="text-sm font-bold text-white">Son Eklenen Ürünler</h2>
          <Link href="/admin/products" className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors">
            Tümünü Gör →
          </Link>
        </div>

        <div className="divide-y divide-white/5">
          {recentProducts.map((product) => {
            const firstImage = product.public_images?.[0]
            const sellerName = product.profiles
              ? `${(product.profiles as Profile).first_name || ''} ${(product.profiles as Profile).last_name || ''}`.trim() || 'Anonim'
              : 'Anonim'
            const st = statusStyle[product.status] || { label: product.status, cls: 'bg-white/10 text-white/50 border-white/10' }

            return (
              <div key={product.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors">
                {/* Küçük görsel */}
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 flex-shrink-0 relative">
                  {firstImage ? (
                    <Image src={firstImage} alt="" fill sizes="48px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-[10px]">—</div>
                  )}
                </div>

                {/* Bilgi */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#AF9164] uppercase tracking-wider truncate">{product.brand}</p>
                  <p className="text-sm text-white/70 truncate">{product.model_name}</p>
                </div>

                {/* Satıcı */}
                <div className="hidden md:block w-32 shrink-0">
                  <p className="text-xs text-white/30 truncate">{sellerName}</p>
                </div>

                {/* Fiyat */}
                <div className="w-28 text-right shrink-0">
                  <p className="text-sm font-bold text-white">{(product.price || 0).toLocaleString('tr-TR')} ₺</p>
                </div>

                {/* Durum */}
                <div className="shrink-0">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${st.cls}`}>
                    {st.label}
                  </span>
                </div>

                {/* Onay kuyruğuna git (sadece pending) */}
                {product.status === 'pending' && (
                  <Link
                    href="/admin/pending"
                    className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-400 hover:text-white transition-colors"
                  >
                    İncele →
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </FadeIn>

    </div>
  )
}