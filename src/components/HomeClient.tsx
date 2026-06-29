'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ProductCard from '@/src/components/ProductCard'
import SellPopup from '@/src/components/SellPopup'
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
  const router = useRouter()
  const hasFilter = brand || category || gender

  return (
    <main className="relative overflow-hidden bg-[#F9F9F8]">
      <SellPopup />
      
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
            <h1 className="text-[clamp(3rem,12vw,10rem)] leading-[0.8] text-white serif-display tracking-tight">
              Arzunun <br /> <span className="italic font-light">Objeleri</span>
            </h1>
            <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-sm md:max-w-none mx-auto">
              <Link href="#collection" className="w-full md:w-auto text-center sans-detail border border-white/30 px-6 md:px-10 py-4 text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-[10px] md:text-xs">
                Koleksiyonu Keşfet
              </Link>
              <Link href="/sell" className="w-full md:w-auto text-center sans-detail bg-[#AF9164] border border-[#AF9164] px-6 md:px-10 py-4 text-white hover:bg-transparent hover:text-[#AF9164] transition-all duration-500 uppercase tracking-widest text-[10px] md:text-xs">
                Lüksü Nakde Çevir
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

      {/* PEONY VIP - CONCIERGE / WHITE GLOVE SERVICE */}
      <section className="py-24 bg-[#1A1A1A] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-[#AF9164]">
              <span className="w-2 h-2 rounded-full bg-[#AF9164] animate-pulse"></span>
              <p className="sans-detail uppercase tracking-widest">White Glove Service</p>
            </div>
            <h2 className="text-4xl md:text-6xl serif-display leading-tight">
              Peony VIP ile <br /> <span className="italic font-light">Zahmetsiz Satış</span>
            </h2>
            <p className="text-gray-400 font-light leading-relaxed max-w-md text-lg">
              Siz lüksün tadını çıkarın, geri kalan her şeyi biz halledelim. Ürünlerinizi evinizden teslim alıyoruz; profesyonel fotoğraf çekimi, fiyatlandırma, ekspertiz ve alıcı ile olan tüm iletişimi biz yönetiyoruz. Ürün satıldığında tutar doğrudan hesabınıza yatıyor.
            </p>
            
            <a 
              href="https://wa.me/905555555555?text=Merhaba, Peony VIP satış hizmetiniz hakkında bilgi almak istiyorum." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#AF9164] text-[#AF9164] px-8 py-4 hover:bg-[#AF9164] hover:text-white transition-all duration-500 sans-detail group mt-4"
            >
              WhatsApp'tan İletişime Geçin
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
          <div className="relative aspect-video lg:aspect-square overflow-hidden luxury-img-wrapper">
             <Image 
                src="https://images.unsplash.com/photo-1575203091586-611ffa505bfc?auto=format&fit=crop&q=80&w=1000" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                alt="Peony VIP Delivery"
              />
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
             
             {/* Filtreler Sağda - Yeni Select Tasarımı */}
             <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                <div className="relative">
                  <select 
                    value={gender || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if(val) {
                        router.push(`/?gender=${val}${brand ? `&brand=${brand}` : ''}#collection`)
                      } else {
                        router.push(`/?${brand ? `brand=${brand}` : ''}#collection`)
                      }
                    }}
                    className="appearance-none bg-transparent border border-gray-300 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] py-3 pl-4 pr-10 focus:outline-none focus:border-[#AF9164] transition-colors cursor-pointer"
                  >
                    <option value="">Tüm Cinsiyetler</option>
                    {genderFilters.map(g => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select 
                    value={brand || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if(val) {
                        router.push(`/?brand=${encodeURIComponent(val)}${gender ? `&gender=${gender}` : ''}#collection`)
                      } else {
                        router.push(`/?${gender ? `gender=${gender}` : ''}#collection`)
                      }
                    }}
                    className="appearance-none bg-transparent border border-gray-300 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] py-3 pl-4 pr-10 focus:outline-none focus:border-[#AF9164] transition-colors cursor-pointer"
                  >
                    <option value="">Tüm Markalar</option>
                    {brands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#AF9164]">
                    <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
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

      {/* ENTRUPY PARTNERSHIP — TECHNOLOGY TRUST LAYER */}
      <section className="py-32 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* Üst: Başlık + Entrupy Logo Alanı */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 pb-12 border-b border-gray-100">
            <div className="max-w-2xl space-y-6">
              <p className="sans-detail text-[#AF9164]">TECHNOLOGY PARTNERSHIP</p>
              <h2 className="text-4xl md:text-6xl serif-display leading-tight text-[#1A1A1A]">
                Dünya standartlarında<br />
                <span className="italic font-light">doğrulama altyapısı.</span>
              </h2>
              <p className="text-gray-400 font-light leading-relaxed max-w-lg text-base">
                Peony Collective, küresel lüks perakende devleriyle çalışan bağımsız doğrulama 
                teknolojisi Entrupy ile ortaklık kurmuştur. Her ürün, insan gözünün göremeyeceği 
                mikroskobik düzeyde fiber analiz ve frekans taramasından geçirilmektedir.
              </p>
            </div>
            {/* Entrupy Partnership Badge */}
            <div className="flex flex-col items-center lg:items-end gap-3 shrink-0">
              <div className="border border-gray-200 px-8 py-6 rounded-2xl flex flex-col items-center gap-3 hover:border-[#AF9164] transition-all duration-500 group">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Verified Technology Partner</span>
                </div>
                <p className="text-2xl font-bold tracking-wider text-[#1A1A1A] group-hover:text-[#AF9164] transition-colors">ENTRUPY™</p>
                <p className="text-[9px] uppercase tracking-widest text-gray-400">Authentication Infrastructure</p>
              </div>
            </div>
          </div>

          {/* Alt: 3 Teknoloji Kartı */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100">
            {[
              {
                label: 'FİBER ANALİZİ',
                title: 'Mikroskobik Doku Taraması',
                desc: 'Deri veya kumaşın gözenek yapısı, örme sıklığı ve lif yoğunluğu her ürün için benzersizdir. Entrupy bu imzayı milyonlarca referansla karşılaştırır.',
                stat: '10M+',
                statLabel: 'Referans Görüntü',
              },
              {
                label: 'FREKANS ANALİZİ',
                title: 'Işık Spektrum Taraması',
                desc: 'Özel kamera sistemi, malzemenin ışık absorbsiyon ve yansıma spektrumunu ölçer. Sahte materyaller bu testten geçemez.',
                stat: '99.1%',
                statLabel: 'Tespit Doğruluğu',
              },
              {
                label: 'DİJİTAL SERTIFIKA',
                title: 'Blockchain Destekli Kayıt',
                desc: 'Orijinal bulunan her ürün için değiştirilemez dijital kimlik oluşturulur. Bu kimlik ürünün ömrü boyunca takip edilebilir.',
                stat: '100%',
                statLabel: 'Sertifika Güvencesi',
              },
            ].map((item) => (
              <div key={item.label} className="bg-white p-10 md:p-12 group hover:bg-[#1A1A1A] transition-all duration-700 cursor-default">
                <p className="sans-detail text-[#AF9164] mb-6">{item.label}</p>
                <h3 className="text-xl md:text-2xl serif-display text-[#1A1A1A] group-hover:text-white transition-colors leading-snug mb-4">{item.title}</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-500 transition-colors mb-8">{item.desc}</p>
                <div className="border-t border-gray-100 group-hover:border-white/10 pt-6 transition-colors">
                  <p className="text-4xl serif-display text-[#AF9164]">{item.stat}</p>
                  <p className="sans-detail text-gray-400 group-hover:text-gray-500 mt-1 transition-colors">{item.statLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACTION — INVESTOR METRICS */}
      <section className="py-32 bg-[#F9F9F8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Sol: Metrikler */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-px bg-gray-200">
              {[
                { value: '1.2B', unit: '₺', label: 'Platforma Giren Portföy Değeri', sub: 'Onaylı & Bekleyen' },
                { value: '%0', unit: '', label: 'Sahte Ürün Teslimatı', sub: 'Kuruluşumuzdan Bugüne' },
                { value: '32', unit: '', label: 'Fiziksel Kontrol Noktası', sub: 'Her Ürün İçin' },
                { value: '72', unit: 'SA', label: 'Ortalama Onay Süresi', sub: 'Teslimat Dahil' },
              ].map((m) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-10 md:p-12 flex flex-col justify-between min-h-[200px]"
                >
                  <div>
                    <p className="text-5xl md:text-6xl serif-display text-[#1A1A1A] leading-none">
                      {m.value}<span className="text-[#AF9164] text-3xl ml-1">{m.unit}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A] mt-4 leading-snug">{m.label}</p>
                    <p className="sans-detail text-gray-400 mt-1">{m.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sağ: Metin */}
            <div className="lg:col-span-5 space-y-8">
              <p className="sans-detail text-[#AF9164]">THE OPPORTUNITY</p>
              <h2 className="text-4xl md:text-5xl serif-display leading-tight text-[#1A1A1A]">
                Türkiye&apos;nin lüks<br />
                <span className="italic font-light">ikinci el pazarı büyüyor.</span>
              </h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Global ikinci el lüks pazar büyüklüğü 2030&apos;a kadar 350 milyar dolara ulaşacak. 
                Türkiye bu büyümede ciddi bir pay almaya hazır — ancak güven altyapısı eksik.
                Peony Collective bu boşluğu kapatıyor.
              </p>
              <div className="space-y-4 pt-4">
                {[
                  'Türkiye\'de ilk sertifikalı lüks ikinci el platformu',
                  'Entrupy teknolojisi ile uluslararası standart',
                  'Escrow modeli ile alıcı-satıcı güvencesi',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border border-[#AF9164] flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#AF9164]" />
                    </div>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <Link href="/how-it-works" className="inline-block mt-8 sans-detail border-b border-[#1A1A1A] pb-1 hover:text-[#AF9164] hover:border-[#AF9164] transition-all">
                Modeli İncele
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* EDITORIAL STORIES — PRODUCT JOURNEYS */}
      <section className="py-32 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 pb-12 border-b border-white/10">
            <div className="space-y-4">
              <p className="sans-detail text-[#AF9164]">OBJECT HISTORIES</p>
              <h2 className="text-4xl md:text-6xl serif-display leading-tight">
                Her parçanın bir<br /><span className="italic font-light">hikâyesi var.</span>
              </h2>
            </div>
            <p className="text-gray-400 font-light max-w-sm text-sm leading-relaxed">
              Müşterilerimiz kimliğini paylaşmaz — lüksün doğası gereği. 
              Ama her işlem, bir güven anlaşmasıdır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                brand: 'Hermès',
                item: 'Birkin 35 — Togo Deri',
                price: '₺ 480.000',
                year: '2019 üretim',
                quote: 'Dokuz yıl önce Paris\'ten alınan bir çanta, bugün İstanbul\'da yeni sahibini buldu. Orijinalliği, değerini korudu.',
                condition: 'Mükemmel',
                image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
              },
              {
                brand: 'Chanel',
                item: 'Classic Flap — Siyah Kaviyer',
                price: '₺ 265.000',
                year: '2021 üretim',
                quote: 'Alıcı dört farklı platformda aradı, güven bulamadı. Peony\'de aldı — üç gün içinde teslimde.',
                condition: 'Çok İyi',
                image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600',
              },
              {
                brand: 'Louis Vuitton',
                item: 'Neverfull MM — Monogram',
                price: '₺ 68.000',
                year: '2020 üretim',
                quote: 'Satıcı, kurye koldan aldı ve ödeme T+5 günde hesabına geçti. Tek soru bile sormadı.',
                condition: 'İyi',
                image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600',
              },
            ].map((story, i) => (
              <motion.div
                key={story.item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group border border-white/10 hover:border-[#AF9164]/50 transition-all duration-700 overflow-hidden"
              >
                {/* Görsel */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.item}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 backdrop-blur-sm px-3 py-1.5 text-white border border-white/20">
                      {story.condition}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-emerald-500/20 backdrop-blur-sm px-3 py-1.5 text-emerald-300 border border-emerald-500/30">
                      ✓ Onaylı
                    </span>
                  </div>
                </div>

                {/* İçerik */}
                <div className="p-8 space-y-5">
                  <div>
                    <p className="sans-detail text-[#AF9164] mb-1">{story.brand}</p>
                    <h3 className="text-lg serif-display italic text-white">{story.item}</h3>
                    <p className="text-xs text-gray-500 mt-1">{story.year}</p>
                  </div>
                  <p className="text-sm text-gray-400 font-light leading-relaxed italic border-l border-[#AF9164]/30 pl-4">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="sans-detail text-gray-500">İşlem Bedeli</span>
                    <span className="text-xl serif-display text-white">{story.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST FLOW — HOW IT WORKS MINI */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-20 space-y-4">
            <p className="sans-detail text-[#AF9164]">THE PROCESS</p>
            <h2 className="text-4xl md:text-6xl serif-display leading-tight text-[#1A1A1A]">
              Nasıl <span className="italic font-light">çalışır?</span>
            </h2>
          </div>

          <div className="relative">
            {/* Bağlantı çizgisi */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[1px] bg-gray-100 z-0" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { step: '01', title: 'Satıcı Başvurur', desc: 'Ürününü fotoğraflayıp platforma yükler. Fiyat önerisi alır.', icon: '↑' },
                { step: '02', title: 'Escrow & Kurye', desc: 'Alıcı ödemesi bloke edilir. Özel kurye ürünü satıcıdan alır.', icon: '⟳' },
                { step: '03', title: 'Lab Ekspertizi', desc: '32 nokta fiziksel + Entrupy teknoloji doğrulaması yapılır.', icon: '⊕' },
                { step: '04', title: 'Teslimat & Ödeme', desc: 'Onaylı ürün alıcıya gider, satıcı ödemesini alır.', icon: '✓' },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center mx-auto mb-6 group-hover:border-[#AF9164] group-hover:bg-[#AF9164]/5 transition-all duration-500">
                    <span className="text-2xl text-gray-400 group-hover:text-[#AF9164] transition-colors">{item.icon}</span>
                  </div>
                  <p className="sans-detail text-[#AF9164] mb-3">{item.step}</p>
                  <h3 className="text-lg serif-display text-[#1A1A1A] mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-20">
            <Link href="/how-it-works" className="inline-flex items-center gap-3 border border-[#1A1A1A] px-10 py-4 hover:bg-[#1A1A1A] hover:text-white transition-all duration-500 sans-detail group">
              Tüm Süreci Gör
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* MASSIVE FINAL SELL CTA */}
      <section className="relative py-40 bg-black flex flex-col items-center text-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1596854273338-cbf078ec7071?auto=format&fit=crop&q=80&w=2000" 
          fill
          sizes="100vw"
          className="object-cover opacity-40 grayscale-[50%]"
          alt="Sell Your Luxury"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="relative z-10 max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="sans-detail text-[#AF9164] mb-6 tracking-[0.4em]">UNLOCK YOUR WARDROBE'S VALUE</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl serif-display text-white leading-[1.1] mb-8">
              Kullanmadığınız lüks, <br/> <span className="italic font-light">başkası için bir hazine.</span>
            </h2>
            <p className="text-gray-400 font-light text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Peony Collective ayrıcalığıyla anında fiyat teklifi alın, ürünlerinizi güvenle satın ve hiç vakit kaybetmeden nakde çevirin.
            </p>
            <Link href="/sell" className="inline-flex items-center justify-center px-14 py-6 bg-white text-black hover:bg-[#AF9164] hover:text-white transition-all duration-500 sans-detail tracking-[0.3em] uppercase text-sm font-bold shadow-2xl hover:scale-105">
              HEMEN SATIŞ YAP
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
