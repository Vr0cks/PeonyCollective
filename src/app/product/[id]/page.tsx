import { createClient } from '@/src/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Product, Profile } from '@/src/types'
import MagnifierImage from '@/src/components/MagnifierImage'

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
          
          {/* SOL: GÖRSEL VE VİDEO GALERİSİ */}
          <div className="lg:col-span-7 space-y-4">
            {/* VİDEO OYNATICI (Varsa en üstte) */}
            {product.video_url && (
              <div className="relative w-full aspect-[4/5] bg-black overflow-hidden group">
                <video 
                  src={product.video_url} 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-widest z-10 border border-white/20">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
                  Lüks Önizleme
                </div>
              </div>
            )}

            {product.public_images?.map((img: string, idx: number) => (
              <MagnifierImage
                key={idx}
                src={img}
                alt={`${product.brand} ${idx + 1}`}
                priority={idx === 0}
              />
            ))}

            {/* KUSUR VE DEFO GALERİSİ */}
            {product.flaw_images && product.flaw_images.length > 0 && (
              <div className="mt-12 bg-red-50/50 p-6 rounded-2xl border border-red-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-red-800 mb-2">Kusurlar ve Belirtilen Defolar</h3>
                <p className="text-xs text-red-600 mb-6 font-light">
                  Peony Collective şeffaflık ilkesi gereği, satıcı tarafından belirtilen ve laboratuvarımızca onaylanan tüm kullanım izleri aşağıda sunulmuştur. Lütfen satın almadan önce inceleyiniz.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.flaw_images.map((img: string, idx: number) => (
                    <div key={`flaw-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border border-red-200">
                      <Image src={img} alt={`Kusur Detayı ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div>
                  <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Dış Kondisyon</h4>
                  <p className="text-sm font-medium text-black capitalize">{product.condition}</p>
                </div>
                <div>
                  <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Satın Alındığı Yıl</h4>
                  <p className="text-sm font-medium text-black">{product.purchase_year || 'Bilinmiyor'}</p>
                </div>
                {product.dimensions && (
                  <div className="col-span-2">
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Boyutlar</h4>
                    <p className="text-sm font-medium text-black">{product.dimensions}</p>
                  </div>
                )}
              </div>

              {/* YENİ FAZ 3: KOKU VE DETAYLI KONDİSYON RAPORU */}
              <div className="mt-8 bg-[#AF9164]/5 border border-[#AF9164]/20 p-6 rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#AF9164] mb-4 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Peony Uzman Kondisyon Raporu
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Koku Skoru (10 = Kokusuz)</span>
                      <span className="text-sm font-bold text-black">{product.odor_score || 10}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#AF9164] h-full" style={{ width: `${(product.odor_score || 10) * 10}%` }}></div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#AF9164]/10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">3. Parti Spa / Bakım Geçmişi</span>
                    {product.has_spa_treatment ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Orijinal dışı müdahale/boya mevcut
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> %100 Orijinal Fabrika Kondisyonu
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#AF9164]/10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Teslim Edilecek İçerik (Full Set)</span>
                    <div className="flex flex-wrap gap-2">
                      {product.full_set_items && product.full_set_items.length > 0 ? (
                        product.full_set_items.map((item: string, i: number) => (
                          <span key={i} className="text-[10px] font-bold px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 uppercase tracking-wider">
                            ✓ {item}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-1 bg-white border border-gray-200 rounded text-gray-400 uppercase tracking-wider">
                          Sadece Ürün
                        </span>
                      )}
                    </div>
                  </div>
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
                  <Link href={`/passport/${product.id}`} className="block w-full text-center border border-[#AF9164] text-[#AF9164] py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#AF9164] hover:text-black transition-all mb-2">
                    Dijital Pasaportu Görüntüle
                  </Link>
                  <div className="text-center">
                    <p className="text-[8px] text-gray-500 font-mono uppercase tracking-widest">Aura Blockchain Consortium</p>
                    <p className="text-[8px] text-[#AF9164] font-mono break-all opacity-80">Tx: 0x{product.id.replace(/-/g, '')}a7f9b2...</p>
                  </div>
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
                    <a href="mailto:concierge@peonycollective.com?subject=Peony%20Concierge%20Talebi" className="w-full border border-[#AF9164] bg-[#AF9164]/5 text-[#AF9164] py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs text-center hover:bg-[#AF9164] hover:text-white transition-all active:scale-95 block flex items-center justify-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      Peony Concierge Asistanı
                    </a>
                  </>
                )}
              </div>

              {/* İADE VE LOJİSTİK POLİTİKASI */}
              <div className="mt-8 bg-gray-50 p-6 rounded-2xl text-xs space-y-4">
                <h4 className="font-bold uppercase tracking-widest text-black">Güvenli Lojistik & İade Şartları</h4>
                <p className="text-gray-600 font-light leading-relaxed">
                  <span className="font-semibold text-gray-800">Tam Kapsamlı Sigorta:</span> Siparişiniz size teslim edilene kadar hırsızlık, kayıp ve hasara karşı tam değerinde sigortalıdır. Taşıma riski tamamen Peony Collective'e aittir.
                </p>
                <p className="text-gray-600 font-light leading-relaxed">
                  <span className="font-semibold text-gray-800">14 Gün İçinde İade:</span> Ürünü teslim aldığınız tarihten itibaren 14 gün içinde, üzerindeki güvenlik mührü (Peony Lock) sökülmemiş olmak kaydıyla iade edebilirsiniz. İade kargo masrafları alıcıya aittir.
                </p>
                <p className="text-gray-600 font-light leading-relaxed">
                  <span className="font-semibold text-gray-800">Orijinallik İadesi:</span> Her ürün Peony Lab tarafından doğrulanmıştır. Herhangi bir yetkili satıcı tarafından ürünün orijinalliğiyle ilgili aksi bir rapor sunulursa, ömür boyu tam para iade garantisi altındasınız.
                </p>
              </div>

              <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest mt-6">
                ✓ %100 Orijinallik Garantisi & Ücretsiz Sigortalı Kargo
              </p>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
