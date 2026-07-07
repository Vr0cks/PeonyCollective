import { createClient } from '@/src/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Product, Profile } from '@/src/types'
import MagnifierImage from '@/src/components/MagnifierImage'
import EntrupyModal from '@/src/components/EntrupyModal'
import VirtualTryOnButton from '@/src/components/VirtualTryOnButton'
import ProductGallery from '@/src/components/ProductGallery'
import FadeIn from '@/src/components/animations/FadeIn'
import ProductActionButtons from '@/src/components/ProductActionButtons'

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

  if (product.status !== 'approved' && product.status !== 'sold') {
    if (!isOwnerOrAdmin) return notFound()
  }

  const sellerProfile = product.profiles as Profile

  return (
    <main className="min-h-screen bg-white text-[#1A1A1A]">
      <div className="max-w-[1600px] mx-auto px-6 py-12 lg:px-12">
        
        {/* Breadcrumb - Sleek */}
        <nav className="flex text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-12 gap-3 items-center">
          <Link href="/#collection" className="hover:text-black transition-colors">THE EDIT</Link>
          <span className="w-4 h-[1px] bg-gray-300"></span>
          <span className="text-black font-bold">{product.brand}</span>
        </nav>

        {searchError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-800 text-[10px] uppercase tracking-widest font-bold">
            ✕ {searchError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* SOL: GÖRSEL GALERİSİ */}
          <div className="lg:col-span-7 flex flex-col gap-2">
            {/* FOTOĞRAF GALERİSİ */}
            <FadeIn delay={0.1}>
              <ProductGallery 
                images={product.public_images || []} 
                brand={product.brand}
                videoUrl={product.video_url}
              />
            </FadeIn>

            {/* KUSUR VE DEFO GALERİSİ (Varsa) */}
            {product.flaw_images && product.flaw_images.length > 0 && (
              <FadeIn delay={0.2} className="mt-20 p-8 border border-gray-200">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">CONDITION REPORT: IMPERFECTIONS</h3>
                <p className="text-[11px] text-gray-500 mb-8 font-light uppercase tracking-widest leading-loose">
                  Transparent review of confirmed wear and tear by Peony Lab.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {product.flaw_images.map((img: string, idx: number) => (
                    <div key={`flaw-${idx}`} className="relative aspect-square overflow-hidden bg-gray-50">
                      <Image src={img} alt={`Kusur Detayı ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>

          {/* SAĞ: STICKY ÜRÜN BİLGİLERİ */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 space-y-10 pb-20">
              
              {/* Başlık ve Fiyat */}
              <FadeIn delay={0.2} direction="left" className="border-b border-gray-200 pb-10">
                <h1 className="text-4xl lg:text-5xl font-playfair tracking-[0.1em] uppercase mb-4">
                  {product.brand}
                </h1>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">
                  {product.model_name}
                </h2>
                <div className="text-3xl font-light tracking-widest text-[#AF9164]">
                  {product.price.toLocaleString('tr-TR')} ₺
                </div>
              </FadeIn>

              {/* Teknik Detaylar Özeti */}
              <FadeIn delay={0.3} direction="left" className="grid grid-cols-2 gap-y-8 pt-4">
                <div>
                  <h4 className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">KONDİSYON</h4>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-black">{product.condition}</p>
                </div>
                <div>
                  <h4 className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">SATIN ALINDIĞI YIL</h4>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-black">{product.purchase_year || 'BİLİNMİYOR'}</p>
                </div>
                {product.dimensions && (
                  <div className="col-span-2">
                    <h4 className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">BOYUTLAR</h4>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-black">{product.dimensions}</p>
                  </div>
                )}
              </FadeIn>

              {/* UZMAN RAPORU */}
              <FadeIn delay={0.4} direction="left" className="border border-gray-200 p-8 glass">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black mb-6">
                  PEONY UZMAN RAPORU
                </h4>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">KOKU SKORU</span>
                      <span className="text-[10px] font-bold tracking-widest text-black">{product.odor_score || 10}/10</span>
                    </div>
                    <div className="w-full bg-gray-100 h-[1px]">
                      <div className="bg-black h-[2px] -mt-[0.5px]" style={{ width: `${(product.odor_score || 10) * 10}%` }}></div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] block mb-2">BAKIM GEÇMİŞİ</span>
                    {product.has_spa_treatment ? (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-800">
                        ORİJİNAL DIŞI MÜDAHALE/BOYA
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                        %100 FABRİKA KONDİSYONU
                      </span>
                    )}
                  </div>

                  <div className="pt-4">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] block mb-3">İÇERİK (FULL SET)</span>
                    <div className="flex flex-wrap gap-2">
                      {product.full_set_items && product.full_set_items.length > 0 ? (
                        product.full_set_items.map((item: string, i: number) => (
                          <span key={i} className="text-[9px] font-bold px-3 py-1.5 border border-gray-200 text-black uppercase tracking-[0.2em]">
                            {item}
                          </span>
                        ))
                      ) : (
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                          SADECE ÜRÜN
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Açıklama */}
              <FadeIn delay={0.5} direction="left" className="text-[12px] leading-loose text-gray-600 font-light italic font-playfair border-l-2 border-[#AF9164] pl-6 my-10">
                "{product.description}"
              </FadeIn>

              {/* Butonlar & AR */}
              <FadeIn delay={0.6} direction="left" className="flex flex-col gap-3 pt-6 border-t border-gray-200">
                <ProductActionButtons 
                  productId={product.id}
                  productPrice={product.price}
                  isOwner={isOwnerOrAdmin}
                  isSold={product.status === 'sold'}
                />
              </FadeIn>

              {/* Lüks Güvenlik Detayları */}
              <FadeIn delay={0.7} direction="up" className="pt-10">
                <p className="text-[9px] text-center text-gray-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <span className="w-8 h-[1px] bg-gray-200"></span>
                  COMPLIMENTARY SECURE SHIPPING & AUTHENTICITY GUARANTEED
                  <span className="w-8 h-[1px] bg-gray-200"></span>
                </p>
              </FadeIn>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
