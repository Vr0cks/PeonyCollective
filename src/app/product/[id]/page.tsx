import { createClient } from '@/src/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Product, Profile } from '@/src/types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: product } = await supabase.from('products').select('brand, model_name').eq('id', id).single()

  if (!product) return { title: 'Ürün Bulunamadı | Peony' }

  return {
    title: `${product.brand} ${product.model_name} | Peony Collective`,
    description: `${product.brand} markasına ait ${product.model_name} model lüks çanta. Orijinalliği onaylanmış, yatırım değeri taşıyan arşiv parçası.`,
  }
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error: searchError } = await searchParams
  const supabase = await createClient()

  // Sadece 'approved' veya 'sold' olan ürünleri çekiyoruz
  const { data: productData, error } = await supabase
    .from('products')
    .select(`
      *,
      profiles:seller_id (first_name, last_name, rating, sales_count)
    `)
    .eq('id', id)
    .single()

  if (error || !productData) return notFound()
  const product = productData as Product

  // Security check: Only approved or sold products can be viewed by public
  if (product.status !== 'approved' && product.status !== 'sold') {
    // If not approved/sold, verify if it's the seller or admin
    const { data: { user } } = await supabase.auth.getUser()
    let isOwnerOrAdmin = false
    if (user) {
      if (user.id === product.seller_id) {
        isOwnerOrAdmin = true
      } else {
        const { data: adminProf } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        if (adminProf?.role === 'admin') isOwnerOrAdmin = true
      }
    }
    if (!isOwnerOrAdmin) return notFound()
  }

  const sellerProfile = product.profiles as Profile

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        
        {/* Breadcrumb */}
        <nav className="flex text-xs uppercase tracking-widest text-gray-400 mb-8 gap-2">
          <Link href="/" className="hover:text-black">Koleksiyon</Link>
          <span>/</span>
          <span className="text-black font-bold">{product.brand}</span>
        </nav>

        {searchError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-800 text-xs uppercase tracking-widest rounded-xl font-medium">
            ✕ {searchError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* SOL: GÖRSEL GALERİSİ */}
          <div className="lg:col-span-7 space-y-4">
            {product.public_images?.map((img: string, idx: number) => (
              <div key={idx} className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                <Image 
                  src={img} 
                  alt={`${product.brand} ${idx + 1}`} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={idx === 0}
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
            ))}
          </div>

          {/* SAĞ: ÜRÜN BİLGİLERİ */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              
              {/* Başlık ve Fiyat */}
              <div className="border-b border-gray-100 pb-8">
                <h1 className="text-4xl font-light tracking-tighter text-gray-900 uppercase mb-2">
                  {product.brand}
                </h1>
                <h2 className="text-lg text-gray-500 font-light mb-6">
                  {product.model_name}
                </h2>
                <div className="text-3xl font-medium tracking-tight">
                  {product.price.toLocaleString('tr-TR')} ₺
                </div>
              </div>

              {/* Teknik Detaylar Özeti */}
              <div className="grid grid-cols-2 gap-y-4 text-xs uppercase tracking-widest border-b border-gray-100 pb-8">
                <div>
                  <p className="text-gray-400 mb-1">Kondisyon</p>
                  <p className="font-bold">{product.condition}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Materyal</p>
                  <p className="font-bold">{product.material || 'Deri'}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Satın Alındığı Yıl</p>
                  <p className="font-bold">{product.purchase_year || 'Bilinmiyor'}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Boyut</p>
                  <p className="font-bold">{product.dimensions || 'Standart'}</p>
                </div>
              </div>

              {/* Açıklama */}
              <div className="text-sm leading-relaxed text-gray-600 font-light">
                <p className="text-xs font-bold text-black uppercase mb-3 tracking-widest">Editörün Notu</p>
                {product.description}
              </div>

              {/* INVESTMENT INSIGHTS CARD */}
              <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-2xl border border-[#AF9164]/30 my-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#AF9164] mb-1">Asset Grade</p>
                    <h4 className="text-2xl font-playfair italic">Investment Grade A+</h4>
                  </div>
                  <div className="bg-[#AF9164] text-black text-[10px] font-bold px-2 py-1 rounded">PRO ANALYTICS</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                    <span className="text-gray-400">Yıllık Ortalama Artış</span>
                    <span className="text-green-400 font-bold">+%18.4</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Piyasa Likiditesi</span>
                    <span className="font-bold uppercase tracking-widest text-[9px]">Yüksek</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href={`/passport/${product.id}`} className="block w-full text-center border border-[#AF9164] text-[#AF9164] py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#AF9164] hover:text-black transition-all">
                    Dijital Pasaportu Görüntüle
                  </Link>
                </div>
              </div>

              {/* EXPERT CHECK */}
              <div className="py-8 border-t border-gray-100">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Ekspertiz Süreci (Verified)</h3>
                <div className="relative space-y-6">
                  {[
                    "Materyal Analizi",
                    "Dikiş ve Donanım Kontrolü",
                    "Seri Numarası Doğrulama",
                    "Fatura ve Provenans Onayı"
                  ].map((step: string, i: number, arr: string[]) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="relative">
                        <div className="w-2 h-2 bg-black rounded-full z-10 relative" />
                        {i !== arr.length - 1 && (
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-gray-200" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-gray-500 group-hover:text-black transition-colors">
                        {step} <span className="ml-2 text-[8px] text-green-500">✓</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Satıcı Kartı */}
              {sellerProfile && (
                <div className="bg-gray-50 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Satıcı</p>
                    <h4 className="text-sm font-bold text-black">
                      {sellerProfile.first_name} {sellerProfile.last_name ? sellerProfile.last_name[0] : ''}.
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-black font-bold">{sellerProfile.rating || '5.0'} ⭐</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-tighter">({sellerProfile.sales_count || '0'} Başarılı Satış)</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {sellerProfile.first_name ? sellerProfile.first_name[0] : 'S'}
                  </div>
                </div>
              )}

              {/* Butonlar */}
              <div className="flex flex-col gap-3">
                {product.status === 'sold' ? (
                  <button disabled className="w-full bg-gray-100 text-gray-400 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs text-center cursor-not-allowed">
                    BU PARÇA SATILMIŞTIR
                  </button>
                ) : (
                  <>
                    <Link href={`/checkout/${product.id}`} className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs text-center hover:bg-gray-800 transition-all shadow-xl active:scale-95 block">
                      Satın Almayı Başlat
                    </Link>
                    <Link href={`/messages?new=true&seller=${product.seller_id}&product=${product.id}`} className="w-full border border-black/20 text-black py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs text-center hover:bg-gray-50 transition-all active:scale-95 block">
                      Satıcıya Soru Sor
                    </Link>
                  </>
                )}
              </div>

              <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                ✓ %100 Orijinallik Garantisi & Ücretsiz Sigortalı Kargo
              </p>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
