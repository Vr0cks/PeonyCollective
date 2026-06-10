'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/src/components/ProductCard'
import { Product } from '@/src/types'

// Kategori kartları için veri
const categoryCards = [
  {
    title: 'Çanta',
    subtitle: 'Bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    href: '/?category=Çanta#collection',
    span: 'col-span-2 row-span-2',
  },
  {
    title: 'Kıyafet',
    subtitle: 'Ready-to-Wear',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800',
    href: '/?category=Kıyafet#collection',
    span: 'col-span-1',
  },
  {
    title: 'Ayakkabı',
    subtitle: 'Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    href: '/?category=Ayakkabı#collection',
    span: 'col-span-1',
  },
  {
    title: 'Aksesuar',
    subtitle: 'Accessories',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    href: '/?category=Aksesuar#collection',
    span: 'col-span-2',
  },
]

const genderFilters = [
  { label: 'Kadın', value: 'Kadın' },
  { label: 'Erkek', value: 'Erkek' },
  { label: 'Çocuk', value: 'Çocuk' },
]

interface HomeClientProps {
  products: Product[]
  brands: string[]
  brand?: string
  category?: string
  gender?: string
}

export default function HomeClient({ products, brands, brand, category, gender }: HomeClientProps) {
  const hasFilter = brand || category || gender

  return (
    <main className="relative overflow-hidden bg-[#F9F9F8]">
      
      {/* FULL BLEED HERO - CELINE / BOTTEGA VIBE */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end">
        <Image 
          src="https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=2000" 
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.7] grayscale-[15%]"
          alt="Luxury Fashion Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        
        <div className="relative z-20 w-full px-6 md:px-12 pb-24 md:pb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className="sans-detail text-white/70 mb-6 tracking-[0.4em]">MİRASIN YENİ SAHİBİ</p>
            <h1 className="text-[clamp(4rem,15vw,10rem)] leading-[0.8] text-white serif-display tracking-tight">
              Arzunun <br /> <span className="italic font-light">Objeleri</span>
            </h1>
            <div className="mt-16">
              <Link href="#collection" className="sans-detail border-b border-white/50 pb-2 text-white hover:border-white transition-all">
                Koleksiyonu Keşfet
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EDITORIAL MANIFESTO (Two-column layout to fill space beautifully) */}
      <section className="py-24 md:py-32 bg-white border-y border-gray-100 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Sol: Manifesto Metni */}
          <div className="space-y-10 order-2 lg:order-1">
            <p className="sans-detail text-[#AF9164]">THE MANIFESTO</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] serif-display text-[#1A1A1A]">
              Sadece bir ürün değil, bir <span className="italic font-light">miras devrediyorsunuz.</span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed max-w-md">
              Peony Collective'de lüks sadece bir etiket değil, bir güvencedir. 
              Uzman küratörlerimiz ve laboratuvar hassasiyetindeki ekspertiz sürecimizle, 
              orijinallik artık bir soru işareti değil, garantidir. Güven, bizim en değerli materyalimizdir.
            </p>
            
            <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-10 opacity-80 border-t border-gray-100 mt-8">
              <div>
                <p className="sans-detail mb-2 text-gray-400">PORTFÖY DEĞERİ</p>
                <p className="text-2xl md:text-3xl serif-display">1.2B ₺</p>
              </div>
              <div>
                <p className="sans-detail mb-2 text-gray-400">FİZİKSEL ONAY</p>
                <p className="text-2xl md:text-3xl serif-display">32 Nokta</p>
              </div>
              <div>
                <p className="sans-detail mb-2 text-gray-400">HATA PAYI</p>
                <p className="text-2xl md:text-3xl serif-display">0%</p>
              </div>
            </div>
          </div>

          {/* Sağ: Editorial Görsel */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden luxury-img-wrapper">
              <Image 
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1000" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale-[10%]"
                alt="Editorial Details"
              />
            </div>
          </div>
          
        </div>
      </section>

      {/* CATEGORIES GRID - MINIMAL, NO GAPS, FULL WIDTH */}
      <section id="categories" className="py-0 bg-black text-white">
        {/* Category Grid is now gapless and huge */}
        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-[60vh] md:auto-rows-[80vh]">
          {categoryCards.map((cat, index) => (
            <Link 
              key={cat.title}
              href={gender ? `/?gender=${gender}&category=${cat.title}#collection` : cat.href} 
              className="group relative overflow-hidden block w-full h-full"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700" />
              <div className="absolute bottom-12 left-12 md:bottom-16 md:left-16 z-10">
                <p className="sans-detail text-white/70 mb-2">{cat.subtitle}</p>
                <h3 className="text-5xl md:text-7xl serif-display italic text-white group-hover:-translate-y-2 transition-transform duration-500">{cat.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* THE EDIT - CURATED COLLECTION */}
      <section id="collection" className="py-40 bg-[#F9F9F8] min-h-screen">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-gray-200 pb-8">
             <div>
               <h2 className="text-5xl md:text-7xl serif-display tracking-tight text-[#1A1A1A]">
                 The <span className="italic">Edit</span>
               </h2>
             </div>
             
             {/* Filtreler Sağda */}
             <div className="flex flex-col items-end gap-4">
                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 overflow-x-auto no-scrollbar max-w-full pb-2">
                  <Link href="/#collection" className={`transition-colors whitespace-nowrap ${!gender ? 'text-black' : 'hover:text-black'}`}>Tüm Cinsiyetler</Link>
                  {genderFilters.map(g => (
                    <Link 
                      key={g.value} 
                      href={`/?gender=${g.value}#collection`} 
                      className={`transition-colors whitespace-nowrap ${gender === g.value ? 'text-black' : 'hover:text-black'}`}
                    >
                      {g.label}
                    </Link>
                  ))}
                </div>
                
                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 overflow-x-auto no-scrollbar max-w-full">
                  <Link href={gender ? `/?gender=${gender}#collection` : '/#collection'} className={`transition-colors whitespace-nowrap ${!brand ? 'text-[#AF9164]' : 'hover:text-black'}`}>Tüm Markalar</Link>
                  {brands.map((b) => (
                    <Link 
                      key={b} 
                      href={`/?brand=${b}${gender ? `&gender=${gender}` : ''}#collection`} 
                      className={`transition-colors whitespace-nowrap ${brand === b ? 'text-[#AF9164]' : 'hover:text-black'}`}
                    >
                      {b}
                    </Link>
                  ))}
                </div>
             </div>
          </div>

          {hasFilter && (
            <div className="mb-16 flex items-center gap-3">
              <span className="sans-detail text-gray-400">Aktif Seçimler:</span>
              <div className="flex gap-2">
                {gender && <span className="sans-detail bg-white px-3 py-1 border border-gray-200">{gender}</span>}
                {category && <span className="sans-detail bg-white px-3 py-1 border border-gray-200">{category}</span>}
                {brand && <span className="sans-detail bg-white px-3 py-1 border border-gray-200 text-[#AF9164]">{brand}</span>}
              </div>
              <Link href="/#collection" className="sans-detail text-gray-400 hover:text-black border-b border-transparent hover:border-black ml-4">Temizle</Link>
            </div>
          )}

          {!products || products.length === 0 ? (
            <div className="py-32 text-center">
              <p className="text-gray-400 italic serif-display text-3xl">Bu seçki için parça bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-24">
              {products.map((p, i) => (
                <motion.div 
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i % 4 * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PEONY LAB - THE ART OF AUTHENTICATION */}
      <section className="py-40 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
          <div className="lg:col-span-5 space-y-10">
            <p className="sans-detail text-[#AF9164]">EXPERT AUTHENTICATION</p>
            <h2 className="text-5xl md:text-7xl serif-display leading-tight">
              Peony <br /><span className="italic font-light">Lab™</span>
            </h2>
            <p className="text-gray-400 font-light leading-relaxed text-lg max-w-md">
              Yarım milyonluk bir yatırımı şansa bırakamazsınız. Her ürün, 3D Spektral Analiz ve 
              32 noktalı fiziksel ekspertizden geçerek onaylanır.
            </p>
            <Link href="/how-it-works" className="sans-detail text-white border-b border-[#AF9164] pb-1 hover:text-[#AF9164] transition-colors inline-block mt-8">
              Süreci İncele
            </Link>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-8 relative">
             <div className="relative aspect-[3/4] overflow-hidden luxury-img-wrapper mt-20 md:mt-32">
                <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" fill sizes="50vw" className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" alt="Micro Stitching" />
             </div>
             <div className="relative aspect-[3/4] overflow-hidden luxury-img-wrapper">
                <Image src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800" fill sizes="50vw" className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" alt="Serial Check" />
             </div>
          </div>
        </div>
      </section>

    </main>
  )
}
