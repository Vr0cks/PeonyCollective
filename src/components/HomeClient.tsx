'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import ProductCard from '@/src/components/ProductCard'
import Footer from '@/src/components/Footer'

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
    subtitle: 'Clothing',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
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
  products: any[]
  brands: string[]
  brand?: string
  category?: string
  gender?: string
}

export default function HomeClient({ products, brands, brand, category, gender }: HomeClientProps) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -200])

  // Aktif filtre var mı?
  const hasFilter = brand || category || gender

  return (
    <main className="relative overflow-hidden bg-[#F9F9F8]">
      
      {/* SECTION 1: ASYMMETRIC HERO */}
      <section className="relative h-screen flex items-center px-6 lg:px-20 overflow-hidden">
        {/* Sol Taraf: Büyük Tipografi */}
        <div className="z-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="sans-detail text-[#AF9164] mb-4">Mirasın Yeni Sahibi</p>
            <h1 className="text-[12vw] leading-[0.85] serif-display italic text-[#1A1A1A]">
              Arzunun <br /> <span className="not-italic">Objeleri</span>
            </h1>
            <div className="mt-12">
              <Link href="#categories" className="sans-detail border-b-2 border-black pb-2 hover:text-[#AF9164] hover:border-[#AF9164] transition-all">
                Koleksiyonu Keşfet
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Parallax Görsel - Masaüstünde Yarı Ekran, Mobilde Şık Arka Plan */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 lg:inset-auto lg:right-0 lg:top-20 lg:w-1/2 lg:h-[120%] z-10 opacity-15 lg:opacity-100 pointer-events-none"
        >
          <img 
            src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover grayscale-[20%] brightness-95 lg:brightness-90"
            alt="Lüks Çanta Detayı"
          />
        </motion.div>
      </section>

      {/* SECTION 1.5: SOCIAL PROOF STATS */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          <div>
            <h4 className="text-3xl font-playfair mb-1 tracking-tighter">1.2B ₺</h4>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Yönetilen Portföy Değeri</p>
          </div>
          <div>
            <h4 className="text-3xl font-playfair mb-1 tracking-tighter">32 Nokta</h4>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Fiziksel Ekspertiz Kontrolü</p>
          </div>
          <div>
            <h4 className="text-3xl font-playfair mb-1 tracking-tighter">0%</h4>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Hata Payı / Orijinallik Garantisi</p>
          </div>
          <div>
            <h4 className="text-3xl font-playfair mb-1 tracking-tighter">24 Saat</h4>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">VIP Sigortalı Teslimat</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION: KATEGORİLER (YENİ)
          ═══════════════════════════════════════════ */}
      <section id="categories" className="py-32 bg-[#FCFCFB]">
        <div className="max-w-luxury mx-auto px-8">
          {/* Başlık */}
          <div className="mb-16 text-center space-y-4">
            <h3 className="text-[#AF9164] font-bold text-[10px] uppercase tracking-[0.5em]">Explore</h3>
            <h2 className="text-4xl md:text-6xl font-playfair italic text-gray-900">Kategoriler</h2>
          </div>

          {/* Cinsiyet Filtreleri */}
          <div className="flex justify-center gap-4 mb-12">
            <Link
              href="/#categories"
              className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                !gender ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'
              }`}
            >
              Tümü
            </Link>
            {genderFilters.map(g => (
              <Link
                key={g.value}
                href={`/?gender=${g.value}#categories`}
                className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border flex items-center gap-2 ${
                  gender === g.value ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'
                }`}
              >
                {g.label}
              </Link>
            ))}
          </div>

          {/* Kategori Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
            {categoryCards.map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cat.span}
              >
                <Link href={gender ? `/?gender=${gender}&category=${cat.title}#collection` : cat.href} className="block relative h-full group overflow-hidden rounded-2xl">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 mb-1">{cat.subtitle}</p>
                    <h3 className="text-xl md:text-3xl font-playfair italic text-white">{cat.title}</h3>
                  </div>
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-[#AF9164]/0 group-hover:bg-[#AF9164]/10 transition-colors duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: THE "LAB" EXPERIENCE (GÜVEN BLOĞU) */}
      <section className="py-40 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl serif-display italic">Peony Lab™</h2>
            <p className="text-gray-400 font-light leading-relaxed text-lg">
              Yarım milyonluk bir yatırımı şansa bırakamazsınız. Her ürün, 3D Spektral Analiz ve 
              32 noktalı fiziksel ekspertizden geçerek dijital kimliğine kavuşur.
            </p>
            <Link href="/how-it-works" className="sans-detail border-b-2 border-[#AF9164] pb-2 hover:text-[#AF9164] transition-colors inline-block">
              Denetim Sürecini Gör
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
             {/* Mikroskobik detay simülasyonu */}
             <div className="aspect-square bg-zinc-800 rounded-sm overflow-hidden border border-white/5 luxury-img-wrapper">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" className="w-full h-full object-cover opacity-50 grayscale" alt="Micro Stitching" />
             </div>
             <div className="aspect-square bg-zinc-800 rounded-sm overflow-hidden border border-white/5 mt-12 luxury-img-wrapper">
                <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800" className="w-full h-full object-cover opacity-50 grayscale" alt="Serial Check" />
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 2.5: EDITORIAL STORYTELLING */}
      <section className="py-40 bg-[#FCFCFB]">
        <div className="max-w-6xl mx-auto px-8 text-center space-y-12">
          <h3 className="text-[#AF9164] font-bold text-[10px] uppercase tracking-[0.5em]">The Philosophy</h3>
          <h2 className="text-5xl md:text-7xl font-playfair italic leading-tight text-gray-900">
            Sadece bir ürün değil, <br />bir <span className="not-italic font-light">miras devrediyorsunuz.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-left pt-12">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-black">Alıcılar İçin</p>
              <p className="text-sm font-light leading-loose text-gray-500">
                Peony'den alınan her parça, uzman küratörlerimiz tarafından onaylanmış bir yatırım aracıdır. 
                Dijital Pasaport teknolojimiz sayesinde aldığınız ürünün geçmişini, kondisyon raporunu ve 
                piyasa değer artışını anlık olarak takip edebilirsiniz. Güven, bizim en değerli materyalimizdir.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-black">Satıcılar İçin</p>
              <p className="text-sm font-light leading-loose text-gray-500">
                Arşivinizdeki nadide parçaları doğru değerinde ve doğru kitleyle buluşturuyoruz. 
                Peony, satıcılarına sadece bir pazar yeri değil; profesyonel fotoğrafçılık, 
                sigortalı lojistik ve anonim işlem garantisi sunan bir Concierge hizmeti sağlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE EDIT (Ürünler) */}
      <section id="collection" className="py-40">
        <div className="max-w-luxury mx-auto px-8">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-6 border-b border-gray-100">
             <h2 className="text-4xl serif-display tracking-tighter uppercase">The <span className="italic">Edit</span></h2>
             
             <div className="flex gap-6 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 overflow-x-auto no-scrollbar w-full md:w-auto pb-4 md:pb-0">
                <Link href="/" className={`transition-all whitespace-nowrap ${!brand && !category && !gender ? 'text-black border-b border-black' : 'hover:text-black'}`}>Tümü</Link>
                {brands.map((b) => (
                  <Link 
                    key={b} 
                    href={`/?brand=${b}#collection`} 
                    className={`transition-all whitespace-nowrap ${brand === b ? 'text-black border-b border-black' : 'hover:text-black'}`}
                  >
                    {b}
                  </Link>
                ))}
             </div>
          </div>

          {/* Aktif Filtre Göstergesi */}
          {hasFilter && (
            <div className="mb-12 flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Aktif Filtreler:</span>
              {gender && (
                <Link href={brand ? `/?brand=${brand}#collection` : category ? `/?category=${category}#collection` : '/#collection'} className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors">
                  {gender}
                  <span className="text-white/50">✕</span>
                </Link>
              )}
              {category && (
                <Link href={gender ? `/?gender=${gender}#collection` : brand ? `/?brand=${brand}#collection` : '/#collection'} className="inline-flex items-center gap-1.5 bg-[#AF9164] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full hover:bg-[#96794F] transition-colors">
                  {category}
                  <span className="text-white/50">✕</span>
                </Link>
              )}
              {brand && (
                <Link href={gender ? `/?gender=${gender}#collection` : category ? `/?category=${category}#collection` : '/#collection'} className="inline-flex items-center gap-1.5 bg-gray-800 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors">
                  {brand}
                  <span className="text-white/50">✕</span>
                </Link>
              )}
              <Link href="/" className="text-[10px] font-bold uppercase tracking-wider text-red-400 hover:text-red-600 transition-colors ml-2">
                Tümünü Temizle
              </Link>
            </div>
          )}

          {!products || products.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-400 italic serif-display text-2xl">Bu koleksiyonda henüz parça bulunmuyor.</p>
              <Link href="/" className="sans-detail border-b border-black mt-8 inline-block pb-1 text-gray-900">Tüm Koleksiyona Dön</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: TRUST BANNER */}
      <section className="bg-black py-24 text-center text-white">
        <div className="max-w-2xl mx-auto space-y-8 px-6">
          <h2 className="sans-detail text-gray-500">Güvenli Pazar Yeri</h2>
          <h3 className="text-4xl serif-display italic">Eski Aşkınızı Yeni Bir Tutkuya Dönüştürün.</h3>
          <p className="text-sm font-light text-gray-400 leading-relaxed">
            Satış yapmak hiç bu kadar prestijli olmamıştı. Siz sadece formunuzu doldurun, 
            gerisini global ekspertiz ağımıza bırakın.
          </p>
          <div className="pt-6">
            <Link href="/sell" className="inline-block border border-white/30 px-10 py-4 sans-detail hover:bg-white hover:text-black transition-all">
              Satışa Başla
            </Link>
          </div>

          {/* SECTION 5: TRUST BADGES */}
          <div className="flex flex-wrap justify-center gap-10 py-10 border-t border-white/10 mt-20 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center text-[8px] font-bold text-white">100%</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Orijinallik Sertifikası</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center text-[8px] font-bold italic text-white">L</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Peony Lab™ Onaylı</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center text-[8px] font-bold text-white">SEC</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Güvenli Emanet Havuzu (Escrow)</span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
