import { createClient } from '@/src/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Product, Profile } from '@/src/types'

interface PageProps {
  searchParams: Promise<{ status?: string }>
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const statusFilter = params.status || 'all'

  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select(`*, profiles:seller_id (first_name, last_name)`)
    .order('created_at', { ascending: false })

  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }

  const { data: productsRaw } = await query
  const products: Product[] = (productsRaw || []) as Product[]

  const filters = [
    { value: 'all', label: 'Tümü' },
    { value: 'pending', label: 'Bekliyor' },
    { value: 'approved', label: 'Onaylı' },
    { value: 'sold', label: 'Satıldı' },
    { value: 'rejected', label: 'Reddedildi' },
  ]

  const statusStyle: Record<string, { label: string; cls: string }> = {
    pending: { label: 'Bekliyor', cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    approved: { label: 'Onaylı', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    rejected: { label: 'Reddedildi', cls: 'bg-red-500/10 text-red-400 border-red-500/20' },
    sold: { label: 'Satıldı', cls: 'bg-[#AF9164]/10 text-[#AF9164] border-[#AF9164]/20' },
  }

  return (
    <div className="p-8 min-h-full">
      <div className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-2">Admin Panel</p>
        <h1 className="text-3xl font-bold text-white tracking-tight">Tüm Ürünler</h1>
        <p className="text-white/40 text-sm mt-1">{products.length} ürün listeleniyor</p>
      </div>

      {/* Filtre Sekmeleri */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {filters.map((f) => (
          <Link
            key={f.value}
            href={f.value === 'all' ? '/admin/products' : `/admin/products?status=${f.value}`}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
              statusFilter === f.value
                ? 'bg-white text-black border-white'
                : 'bg-white/5 text-white/40 border-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {/* Ürün Listesi */}
      <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {products.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-white/20 text-sm">Bu kategoride ürün yok.</p>
            </div>
          ) : (
            products.map((product) => {
              const firstImage = product.public_images?.[0]
              const sellerName = product.profiles
                ? `${(product.profiles as Profile).first_name || ''} ${(product.profiles as Profile).last_name || ''}`.trim() || 'Anonim'
                : 'Anonim'
              const st = statusStyle[product.status] || { label: product.status, cls: 'bg-white/10 text-white/50 border-white/10' }

              return (
                <div key={product.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 relative">
                    {firstImage ? (
                      <Image src={firstImage} alt="" fill sizes="56px" className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 text-[10px]">—</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-[#AF9164] uppercase tracking-wider">{product.brand}</p>
                    <p className="text-sm text-white/80 truncate">{product.model_name}</p>
                    <p className="text-[10px] text-white/20 mt-0.5">{product.category} · {product.condition}</p>
                  </div>

                  <div className="hidden lg:block w-32 shrink-0">
                    <p className="text-xs text-white/30">{sellerName}</p>
                  </div>

                  <div className="hidden md:block w-24 shrink-0 text-right">
                    <p className="text-xs text-white/20">
                      {product.created_at ? new Date(product.created_at).toLocaleDateString('tr-TR') : ''}
                    </p>
                  </div>

                  <div className="w-28 text-right shrink-0">
                    <p className="text-sm font-bold text-white">{(product.price || 0).toLocaleString('tr-TR')} ₺</p>
                  </div>

                  <div className="shrink-0">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>

                  {product.status === 'pending' && (
                    <Link
                      href="/admin/pending"
                      className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-400/60 hover:text-amber-400 transition-colors"
                    >
                      İncele →
                    </Link>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
