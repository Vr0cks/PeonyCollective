import { createClient } from '@/src/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createOrder } from './actions'
import { Metadata } from 'next'

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
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Sadece 'approved' (onaylı) olan ürünleri çekiyoruz
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      profiles:seller_id (first_name, last_name, rating, sales_count)
    `)
    .eq('id', id)
    .eq('status', 'approved') // Güvenlik: Onaylanmamış ürün linkle bile açılmasın
    .single()

  if (error || !product) return notFound()

  // Action Binding
  const orderAction = createOrder.bind(null, product.id, product.price)

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        
        {/* Breadcrumb - Navigasyon yolu */}
        <nav className="flex text-xs uppercase tracking-widest text-gray-400 mb-8 gap-2">
          <Link href="/" className="hover:text-black">Koleksiyon</Link>
          <span>/</span>
          <span className="text-black font-bold">{product.brand}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* SOL: GÖRSEL GALERİSİ (Lüks hissi için büyük ve alt alta) */}
          <div className="lg:col-span-7 space-y-4">
            {product.public_images?.map((img: string, idx: number) => (
              <div key={idx} className="aspect-[4/5] bg-gray-50 overflow-hidden">
                <img 
                  src={img} 
                  alt={`${product.brand} ${idx + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
            ))}
          </div>

          {/* SAĞ: ÜRÜN BİLGİLERİ (Sticky - Sayfayı kaydırırken sabit kalacak) */}
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
                  <p className="text-gray-400 mb-1">Dönem</p>
                  <p className="font-bold">{product.production_year || 'Modern'}</p>
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

              {/* 1. INVESTMENT INSIGHTS CARD */}
              <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-2xl border border-[#AF9164]/30 my-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#AF9164] mb-1">Asset Grade</p>
                    <h4 className="text-2xl font-playfair italic">Investment Grade {product.investment_rating || 'A+'}</h4>
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

              {/* 2. AUTHENTICATION PROOF OF WORK (STEPPER) */}
              <div className="py-8 border-t border-gray-100">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Ekspertiz Süreci (Verified)</h3>
                <div className="relative space-y-6">
                  {(product.authentication_steps || [
                    "Materyal Analizi",
                    "Dikiş ve Donanım Kontrolü",
                    "Seri Numarası Doğrulama",
                    "Fatura ve Provenans Onayı"
                  ]).map((step: string, i: number, arr: any[]) => (
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

              {/* Satıcı Kartı - Müşteri için güven odaklı */}
              <div className="bg-gray-50 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Satıcı</p>
                  <h4 className="text-sm font-bold text-black">
                    {product.profiles.first_name} {product.profiles.last_name[0]}.
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-black font-bold">{product.profiles.rating} ⭐</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-tighter">({product.profiles.sales_count} Başarılı Satış)</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold">
                  {product.profiles.first_name[0]}
                </div>
              </div>

              {/* Satın Al Butonu */}
              <form action={orderAction}>
                <button className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-all shadow-xl active:scale-95">
                  Satın Almayı Başlat
                </button>
              </form>

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
