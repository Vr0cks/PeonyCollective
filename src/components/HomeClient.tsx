'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import ProductCard from '@/src/components/ProductCard'

export default function HomeClient({ products, brands, brand }: { products: any[], brands: string[], brand?: string }) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -200])

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
              <Link href="#collection" className="sans-detail border-b-2 border-black pb-2 hover:text-[#AF9164] hover:border-[#AF9164] transition-all">
                Koleksiyonu Keşfet
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Sağ Taraf: Parallax Görsel */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute right-0 top-20 w-1/2 h-[120%] z-10 hidden lg:block"
        >
          <img 
            src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover grayscale-[20%] brightness-90"
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

      {/* SECTION 2: THE "LAB" EXPERIENCE (GÜVEN BLOĞU) */}
      <section className="py-40 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl serif-display italic">Peony Lab™</h2>
            <p className="text-gray-400 font-light leading-relaxed text-lg">
              Yarım milyonluk bir yatırımı şansa bırakamazsınız. Her çanta, 3D Spektral Analiz ve 
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
            Sadece bir çanta değil, <br /> bir <span className="not-italic font-light">miras devrediyorsunuz.</span>
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
                <Link href="/" className={`transition-all whitespace-nowrap ${!brand ? 'text-black border-b border-black' : 'hover:text-black'}`}>Tümü</Link>
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
    </main>
  )
}
