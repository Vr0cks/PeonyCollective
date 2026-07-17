'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProductCard from '@/src/components/ProductCard'
import SellPopup from '@/src/components/SellPopup'
import CustomSelect from '@/src/components/CustomSelect'
import FadeIn from '@/src/components/animations/FadeIn'
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
  { label: 'Kadın', value: 'KADIN' },
  { label: 'Erkek', value: 'ERKEK' },
  { label: 'Kız Çocuk', value: 'KIZ ÇOCUK' },
  { label: 'Erkek Çocuk', value: 'ERKEK ÇOCUK' },
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
  const [visibleCount, setVisibleCount] = useState(24)
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)

  // Peony Weather Concierge States
  const [locationName, setLocationName] = useState('Bodrum')
  const [temp, setTemp] = useState(32)
  const [weatherDesc, setWeatherDesc] = useState('Güneşli Esinti')
  const [curationVibe, setCurationVibe] = useState('Plaj Şıklığı & Akşamüstü Kokteyl Kombinleri')

  // Chatbot (Peony Muse) States
  const [isMuseOpen, setIsMuseOpen] = useState(false)
  const [museInput, setMuseInput] = useState('')
  const [museMessages, setMuseMessages] = useState<Array<{
    id: string
    sender: 'user' | 'muse'
    text: string
    products?: Array<{
      id: string
      brand: string
      model_name: string
      price: number
      image: string
    }>
  }>>([
    {
      id: 'welcome',
      sender: 'muse',
      text: 'Merhaba ben Peony stil küratörünüz Muse. Bugün nereyi ziyaret edeceksiniz veya nasıl bir davete katılacaksınız? Size oranın havasına ve dokusuna en uygun lüks parçaları önereyim.'
    }
  ])

  useEffect(() => {
    // Geolocation simulation
    const locations = [
      { name: 'Bodrum', temp: 32, desc: 'Güneşli Esinti', vibe: 'Plaj Şıklığı & Akşamüstü Kokteyl Kombinleri' },
      { name: 'İstanbul', temp: 26, desc: 'Hafif Bulutlu', vibe: 'Boğaz Havası & Nişantaşı Sokak Şıklığı' },
      { name: 'Çeşme', temp: 30, desc: 'Rüzgarlı Güneşli', vibe: 'Alaçatı Esintisi & Keten Rahatlığı' },
      { name: 'Londra', temp: 19, desc: 'Hafif Yağmurlu', vibe: 'Trençkot & Luxury Deri Çanta Kombinleri' }
    ]
    const randomLoc = locations[Math.floor(Math.random() * locations.length)]
    setLocationName(randomLoc.name)
    setTemp(randomLoc.temp)
    setWeatherDesc(randomLoc.desc)
    setCurationVibe(randomLoc.vibe)
  }, [])

  function handleSendMuseMessage() {
    if (!museInput.trim()) return
    const text = museInput.trim()
    const msgId = Date.now().toString()
    setMuseMessages(prev => [...prev, { id: msgId, sender: 'user', text }])
    setMuseInput('')

    setTimeout(() => {
      let reply = ''
      let recs: any[] = []
      const query = text.toLowerCase()

      if (query.includes('tekne') || query.includes('yat') || query.includes('deniz') || query.includes('yacht') || query.includes('plaj') || query.includes('beach') || query.includes('bodrum') || query.includes('çeşme')) {
        reply = 'Harika bir yaz planı! Deniz havası ve yat davetlerinin o rahat ama göz alıcı şıklığı için Loewe\'nin hasır detaylı ikonik el çantasını ve gün ışığında parlayacak Rolex altın saatini öneriyorum.'
        recs = [
          { id: 'loewe-tote', brand: 'LOEWE', model_name: 'Basket Raffia Bag Medium', price: 24500, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' },
          { id: 'rolex-sub', brand: 'ROLEX', model_name: 'Submariner Date Gold', price: 685000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' }
        ]
      } else if (query.includes('akşam') || query.includes('yemek') || query.includes('davet') || query.includes('düğün') || query.includes('gece') || query.includes('party') || query.includes('dinner')) {
        reply = 'Şık bir gece daveti! Gecenin tüm bakışlarını üzerinizde toplamak için siyah deri Chanel Flap bag ve altın detaylı Cartier kolyeyi öneriyorum. Bu klasik şıklık asla modası geçmeyen bir yatırımdır.'
        recs = [
          { id: 'chanel-flap', brand: 'CHANEL', model_name: 'Classic Double Flap Black', price: 345000, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' },
          { id: 'cartier-love', brand: 'CARTIER', model_name: 'Love Necklace Gold', price: 92000, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300' }
        ]
      } else {
        reply = 'Her ortama uyum sağlayacak "Quiet Luxury" (Sessiz Lüks) stilini öneriyorum. Logolar yerine mükemmel dikişleri ve deri kalitesini öne çıkaran Bottega Veneta örgü deri çanta ve Loro Piana keten şıklığı bugün harika duracaktır.'
        recs = [
          { id: 'bottega-cassette', brand: 'BOTTEGA VENETA', model_name: 'Padded Cassette Bag', price: 145000, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' }
        ]
      }

      setMuseMessages(prev => [
        ...prev,
        {
          id: `muse-${Date.now()}`,
          sender: 'muse',
          text: reply,
          products: recs
        }
      ])
    }, 800)
  }

  // Interactive Tabs State
  const [curatedTab, setCuratedTab] = useState<'seasonal' | 'smart'>('seasonal')
  const [trustTab, setTrustTab] = useState<'how' | 'lab' | 'certificate' | 'stories'>('how')
  const [sellTab, setSellTab] = useState<'founder' | 'vip'>('founder')

  useEffect(() => {
    setVisibleCount(24)
  }, [brand, category, gender, selectedPeriod])

  // Filter products by selected period
  let displayProducts = products || []
  if (selectedPeriod === 'Plaj Şıklığı') {
    displayProducts = displayProducts.filter(p => p.category === 'Ayakkabı' || p.category === 'Aksesuar')
  } else if (selectedPeriod === 'Şehir Esintisi') {
    displayProducts = displayProducts.filter(p => p.category === 'Kıyafet' || p.category === 'Çanta')
  } else if (selectedPeriod === 'Gece Daveti') {
    displayProducts = displayProducts.filter(p => p.category === 'Kıyafet' || p.category === 'Aksesuar')
  } else if (selectedPeriod === 'WeatherConcierge') {
    if (locationName === 'Bodrum' || locationName === 'Çeşme') {
      displayProducts = displayProducts.filter(p => p.category === 'Aksesuar' || p.category === 'Ayakkabı' || p.category === 'Çanta')
    } else {
      displayProducts = displayProducts.filter(p => p.category === 'Çanta' || p.category === 'Kıyafet')
    }
  }

  // Bags under 15k selector
  const bagsUnder15k = (products || []).filter(p => p.category === 'Çanta' && (p.price ?? 0) <= 15000)
  const fallbackBags: Product[] = [
    {
      id: 'mock-bag-1',
      seller_id: 'mock-seller',
      gender: 'KADIN',
      category: 'Çanta',
      subcategory: 'El Çantası',
      size: 'Medium',
      brand: 'Prada',
      model_name: 'Nylon Pochette',
      description: 'Prada Nylon Pochette mock description',
      price: 12500,
      condition: 'Yeni Gibi',
      material: 'Nylon',
      dimensions: '20x15cm',
      purchase_year: 2022,
      serial_number: '123456',
      public_images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600'],
      authenticity_docs: [],
      status: 'approved',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-bag-2',
      seller_id: 'mock-seller',
      gender: 'KADIN',
      category: 'Çanta',
      subcategory: 'Omuz Çantası',
      size: 'Small',
      brand: 'Gucci',
      model_name: 'Supreme Canvas Pouch',
      description: 'Gucci Canvas Pouch mock description',
      price: 14800,
      condition: 'Çok İyi',
      material: 'Canvas',
      dimensions: '18x12cm',
      purchase_year: 2021,
      serial_number: '654321',
      public_images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600'],
      authenticity_docs: [],
      status: 'approved',
      created_at: new Date().toISOString()
    }
  ]
  const displayBagsUnder15k = bagsUnder15k.length > 0 ? bagsUnder15k : fallbackBags

  return (
    <main className="relative overflow-hidden bg-[#F9F9F8]">
      <SellPopup />
      
      {/* FULL BLEED HERO - CELINE / BOTTEGA VIBE WITH APPLE BENT */}
      <section className="relative h-[85vh] md:h-screen w-full overflow-hidden flex flex-col justify-end rounded-b-[2.5rem] lg:rounded-b-none shadow-2xl">
        <Image 
          src="/hero_banner.png" 
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.7] grayscale-[15%]"
          alt="Luxury Fashion Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        
        <div className="relative z-20 w-full px-6 md:px-12 pb-24 md:pb-32 flex flex-col items-center text-center">
          <FadeIn delay={0.2} direction="up">
            <p className="sans-detail text-white/70 mb-6 tracking-[0.4em]">MİRASIN YENİ SAHİBİ</p>
            <h1 className="text-[clamp(3rem,12vw,10rem)] leading-[0.8] text-white serif-display tracking-tight">
              Arzunun <br /> <span className="italic font-light">Objeleri</span>
            </h1>
            <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-sm md:max-w-none mx-auto">
              <Link href="#collection" className="w-full md:w-auto text-center sans-detail border border-white/30 px-6 md:px-10 py-4 text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-[10px] md:text-xs backdrop-blur-sm">
                Koleksiyonu Keşfet
              </Link>
              <Link href="/sell" className="w-full md:w-auto text-center sans-detail bg-[#AF9164] border border-[#AF9164] px-6 md:px-10 py-4 text-white hover:bg-transparent hover:text-[#AF9164] transition-all duration-500 uppercase tracking-widest text-[10px] md:text-xs">
                Lüksü Nakde Çevir
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EDITORIAL MANIFESTO & METRICS (Merged & Compacted) */}
      <section className="py-20 md:py-28 bg-white border-y border-gray-100 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Sol: Manifesto Metni ve Görsel */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="sans-detail text-[#AF9164]">THE MANIFESTO</p>
              <h2 className="text-3xl md:text-4xl serif-display text-[#1A1A1A] leading-tight">
                Sadece bir ürün değil, bir <span className="italic font-light">miras devrediyorsunuz.</span>
              </h2>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Peony Collective'de lüks sadece bir etiket değil, bir güvencedir. 
                Uzman küratörlerimiz ve laboratuvar hassasiyetindeki ekspertiz sürecimizle, 
                orijinallik artık bir soru işareti değil, garantidir.
              </p>
            </div>
            <FadeIn delay={0.4} direction="left">
              <div className="relative aspect-[4/5] overflow-hidden luxury-img-wrapper max-h-[300px] md:max-h-none">
                <Image 
                  src="/manifesto_detail.png" 
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover grayscale-[10%]"
                  alt="Editorial Details"
                />
              </div>
            </FadeIn>
          </div>

          {/* Sağ: Kompakt Metrikler */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100">
            {[
              { value: '1.2B', unit: '₺', label: 'Portföy Değeri', sub: 'Onaylı & Bekleyen' },
              { value: '%0', unit: '', label: 'Sahte Ürün', sub: 'Kuruluşumuzdan Bugüne' },
              { value: '32', unit: '', label: 'Kontrol Noktası', sub: 'Fiziksel Ekspertiz' },
              { value: '72', unit: 'SA', label: 'Ortalama Onay', sub: 'Hızlı İşlem Süresi' },
            ].map((m) => (
              <div key={m.label} className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[110px]">
                <p className="text-2xl md:text-3xl serif-display text-[#1A1A1A] leading-none">
                  {m.value}<span className="text-[#AF9164] text-lg ml-0.5">{m.unit}</span>
                </p>
                <div>
                  <p className="text-xs font-semibold text-[#1A1A1A] mt-2 leading-tight">{m.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{m.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURATED FOCUS: TABBED SEASONAL & SMART LUXURY SELECTIONS */}
      <section className="py-20 bg-[#F9F9F8] border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* Tab Selector */}
          <div className="flex justify-center mb-12 border-b border-gray-200">
            <div className="flex gap-8">
              <button 
                onClick={() => setCuratedTab('seasonal')}
                className={`pb-4 text-xs tracking-widest uppercase sans-detail transition-all border-b-2 ${
                  curatedTab === 'seasonal' 
                    ? 'border-[#AF9164] text-black font-bold' 
                    : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                Mevsimsel Seçki
              </button>
              <button 
                onClick={() => setCuratedTab('smart')}
                className={`pb-4 text-xs tracking-widest uppercase sans-detail transition-all border-b-2 ${
                  curatedTab === 'smart' 
                    ? 'border-[#AF9164] text-black font-bold' 
                    : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                Akıllı Lüks (15.000 ₺ Altı)
              </button>
            </div>
          </div>

          {/* Tab 1: Seasonal Curation (Yaz İndirimi) */}
          {curatedTab === 'seasonal' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#AF9164] bg-[#AF9164]/10 px-3.5 py-1.5 rounded-full inline-block">Mevsimsel Seçki</span>
                <h2 className="text-3xl md:text-5xl serif-display leading-tight text-gray-900">
                  Yaz İndirimi: <br />
                  <span className="italic font-light">Zıtlıkların Uyumu</span>
                </h2>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  Lüks, gündelik konfor ile arzunun en üst zirvesini buluşturur. Sahilde adımlarınıza eşlik edecek en şık terliklerden, davetlerin en sofistike yıldızı Kelly çantalara uzanan zıt kutuplar bir arada.
                </p>
                <Link href="#collection" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-[#AF9164] transition-all duration-500 sans-detail text-[10px] tracking-widest uppercase font-bold">
                  Seçkiyi İncele →
                </Link>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white border border-gray-100 group rounded-2xl">
                    <Image 
                      src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800"
                      fill
                      sizes="30vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                      alt="Hermès Kelly"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold tracking-wider text-[#AF9164] uppercase">Hermès</p>
                    <p className="text-xs serif-display italic text-gray-900">Kelly 28 Togo</p>
                  </div>
                </div>
                <div className="space-y-3 mt-8">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white border border-gray-100 group rounded-2xl">
                    <Image 
                      src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800"
                      fill
                      sizes="30vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                      alt="Luxury Sandals"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold tracking-wider text-[#AF9164] uppercase">Chanel</p>
                    <p className="text-xs serif-display italic text-gray-900">Leather Sandals</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Smart Luxury (<15k Bags) */}
          {curatedTab === 'smart' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 bg-[#F9F9F8] p-8 border border-gray-200/60 rounded-3xl flex flex-col justify-between min-h-[300px]">
                <div className="space-y-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#AF9164]">CURATOR&apos;S NOTE</span>
                  <h3 className="text-2xl serif-display italic text-gray-900 leading-tight">
                    Akıllı Lüks: <br />
                    15.000 ₺ Altı Çantalar
                  </h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    Küratörlerimizin seçtiği, günlük kullanıma uygun ve değerini kaybetmeyen, 15.000 ₺ altındaki akıllı çanta seçeneklerini derledik.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <Link href="#collection" className="text-[9px] font-bold tracking-widest uppercase text-gray-900 border-b border-black pb-1 hover:text-[#AF9164] hover:border-[#AF9164] transition-all">
                    TÜMÜNÜ İNCELE
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-8 flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
                {displayBagsUnder15k.slice(0, 3).map((bag) => (
                  <div key={bag.id} className="group relative border border-gray-100 p-4 bg-white hover:shadow-xl transition-all duration-500 rounded-3xl w-[70vw] sm:w-[250px] shrink-0 snap-start">
                    <Link href={`/product/${bag.id}`} className="block relative aspect-square w-full overflow-hidden bg-gray-50 rounded-2xl mb-4">
                      <Image 
                        src={bag.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600'}
                        alt={bag.brand}
                        fill
                        sizes="200px"
                        className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                      />
                    </Link>
                    <div className="text-center space-y-0.5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AF9164]">{bag.brand}</p>
                      <h4 className="text-xs serif-display italic text-gray-950 truncate">{bag.model_name}</h4>
                      <p className="text-[11px] text-gray-500 font-light">{(bag.price ?? 0).toLocaleString('tr-TR')} ₺</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#AF9164]">SHOP BY CATEGORY</span>
            <h2 className="text-3xl md:text-4xl serif-display text-gray-900">
              Kategorilere Göre <span className="italic font-light">Alışveriş Yapın</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryCards.map((cat) => (
              <Link 
                key={cat.title}
                href={gender ? `/?gender=${gender}&category=${cat.title}#collection` : cat.href} 
                className="group relative overflow-hidden block w-full aspect-[4/5] bg-zinc-900 rounded-2xl"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-all duration-700" />
                <div className="absolute bottom-6 left-6 z-10">
                  <p className="sans-detail text-white/70 mb-0.5 text-[9px] tracking-widest">{cat.subtitle}</p>
                  <h3 className="text-xl md:text-2xl serif-display italic text-white group-hover:-translate-y-0.5 transition-transform duration-500">{cat.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THE EDIT - CURATED COLLECTION */}
      <section id="collection" className="py-24 bg-[#F9F9F8] min-h-screen">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          
          <div className="mb-16 space-y-6 border-b border-gray-200 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#AF9164]">CURATED COLLECTION</span>
                <h2 className="text-4xl md:text-6xl serif-display tracking-tight text-[#1A1A1A] mt-2">
                  The <span className="italic">Edit</span>
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                <CustomSelect
                  value={gender || ''}
                  placeholder="Tüm Cinsiyetler"
                  options={genderFilters.map(g => ({ value: g.value, label: g.label }))}
                  onChange={(val) => {
                    if (val) {
                      router.push(`/?gender=${val}${brand ? `&brand=${brand}` : ''}#collection`)
                    } else {
                      router.push(`/?${brand ? `brand=${brand}` : ''}#collection`)
                    }
                  }}
                />
                
                <CustomSelect
                  value={brand || ''}
                  placeholder="Tüm Markalar"
                  options={brands.map(b => ({ value: b, label: b }))}
                  onChange={(val) => {
                    if (val) {
                      router.push(`/?brand=${encodeURIComponent(val)}${gender ? `&gender=${gender}` : ''}#collection`)
                    } else {
                      router.push(`/?${gender ? `gender=${gender}` : ''}#collection`)
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 pb-2">
              {[
                { id: null, label: 'Tüm Koleksiyon' },
                { id: 'Plaj Şıklığı', label: 'Plaj Şıklığı 🏖️' },
                { id: 'Şehir Esintisi', label: 'Şehir Esintisi 🏙️' },
                { id: 'Gece Daveti', label: 'Gece Daveti 🌌' },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => setSelectedPeriod(p.id)}
                  className={`sans-detail px-5 py-2.5 text-[9px] tracking-widest uppercase border transition-all duration-300 rounded-full cursor-pointer shrink-0 ${
                    selectedPeriod === p.id
                      ? 'bg-black text-white border-black font-bold shadow-sm'
                      : 'bg-white text-gray-500 border-gray-200 hover:text-black hover:border-black'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Geolocation & Weather Concierge Widget */}
          <div className="mb-12 bg-[#F3ECE0]/60 border border-[#AF9164]/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AF9164]">📍 PEONY WEATHER CONCIERGE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                <span className="text-xs text-gray-500 font-medium">{locationName}, {temp}°C • {weatherDesc}</span>
              </div>
              <h3 className="text-xl md:text-2xl serif-display text-gray-950">{locationName} Havasına Özel Stil Kürasyonu</h3>
              <p className="text-sm text-gray-500 font-light max-w-xl">{curationVibe}</p>
            </div>
            <button 
              onClick={() => setSelectedPeriod(selectedPeriod === 'WeatherConcierge' ? null : 'WeatherConcierge')}
              className={`sans-detail px-8 py-3.5 text-[10px] tracking-widest uppercase transition-all duration-300 rounded-lg shrink-0 cursor-pointer ${
                selectedPeriod === 'WeatherConcierge'
                  ? 'bg-black text-white hover:bg-gray-900'
                  : 'bg-transparent text-black border border-black hover:bg-black hover:text-white'
              }`}
            >
              {selectedPeriod === 'WeatherConcierge' ? '✓ GÖRÜNÜMÜ SIFIRLA' : 'GÖRÜNÜMÜ KEŞFET →'}
            </button>
          </div>

          {(hasFilter || selectedPeriod) && (
            <div className="mb-12 flex items-center gap-3">
              <span className="sans-detail text-gray-400 text-xs">Aktif Seçimler:</span>
              <div className="flex gap-2">
                {gender && <span className="sans-detail text-xs bg-white px-3 py-1 border border-gray-200">{gender}</span>}
                {category && <span className="sans-detail text-xs bg-white px-3 py-1 border border-gray-200">{category}</span>}
                {brand && <span className="sans-detail text-xs bg-white px-3 py-1 border border-gray-200 text-[#AF9164]">{brand}</span>}
                {selectedPeriod && <span className="sans-detail text-xs bg-white px-3 py-1 border border-gray-200 text-[#AF9164]">{selectedPeriod}</span>}
              </div>
              <button 
                onClick={() => {
                  setSelectedPeriod(null)
                  router.push('/#collection')
                }} 
                className="sans-detail text-xs text-gray-400 hover:text-black border-b border-transparent hover:border-black ml-4"
              >
                Temizle
              </button>
            </div>
          )}

          {!displayProducts || displayProducts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gray-400 italic serif-display text-2xl">Bu seçki için parça bulunmuyor.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-16">
                {displayProducts.slice(0, visibleCount).map((p, i) => (
                  <FadeIn key={p.id} delay={i % 4 * 0.1} direction="up">
                    <ProductCard product={p} />
                  </FadeIn>
                ))}
              </div>
              
              {displayProducts.length > visibleCount && (
                <div className="mt-16 flex justify-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 24)}
                    className="sans-detail px-10 py-3.5 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-500 text-xs tracking-[0.2em] uppercase font-bold"
                  >
                    Daha Fazla Ürün Göster
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* THE TRUST HUB: MERGED TABBED SYSTEM FOR LAB, ENTRUPY, CERTIFICATE, STORIES, AND PROCESS */}
      <section className="py-20 md:py-28 bg-[#1A1A1A] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#AF9164]">PEONY STANDARDS</span>
            <h2 className="text-3xl md:text-5xl serif-display leading-tight">
              Güven Zinciri & <span className="italic font-light text-[#AF9164]">Ekspertiz</span>
            </h2>
            
            {/* Trust Tabs Selector */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 pt-6">
              {[
                { id: 'how', label: 'Nasıl Çalışır?' },
                { id: 'lab', label: 'Peony Lab & Entrupy' },
                { id: 'certificate', label: 'Orijinallik Sertifikası' },
                { id: 'stories', label: 'Objelerin Hikayesi' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTrustTab(t.id as any)}
                  className={`sans-detail px-5 py-2 text-[9px] md:text-[10px] tracking-widest uppercase border transition-all duration-300 ${
                    trustTab === t.id
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-transparent text-gray-400 border-white/20 hover:text-white hover:border-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content: How It Works */}
          {trustTab === 'how' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Satıcı Başvurur', desc: 'Ürününü fotoğraflayıp platforma yükler. Fiyat önerisi alır.', icon: '↑' },
                { step: '02', title: 'Escrow & Kurye', desc: 'Alıcı ödemesi bloke edilir. Özel kurye ürünü satıcıdan alır.', icon: '⟳' },
                { step: '03', title: 'Lab Ekspertizi', desc: '32 nokta fiziksel + Entrupy teknoloji doğrulaması yapılır.', icon: '⊕' },
                { step: '04', title: 'Teslimat & Ödeme', desc: 'Onaylı ürün alıcıya gider, satıcı ödemesini alır.', icon: '✓' },
              ].map((item) => (
                <div key={item.step} className="text-center group bg-white/5 p-6 rounded-2xl border border-white/10">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl text-gray-300">{item.icon}</span>
                  </div>
                  <p className="sans-detail text-[#AF9164] mb-1 text-xs">{item.step}</p>
                  <h3 className="text-base serif-display text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Peony Lab & Entrupy */}
          {trustTab === 'lab' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <p className="text-2xl serif-display">Peony <span className="italic font-light text-[#AF9164]">Lab™ & Entrupy™</span></p>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">
                    Her ürün, insan gözünün göremediği mikroskobik düzeyde fiber analiz, ışık spektrum taraması ve 32 noktalı fiziksel ekspertizden geçirilmektedir. Küresel iş ortağımız Entrupy altyapısı ile doğruluk payımız %99.1'dir.
                  </p>
                  <div className="border border-white/10 px-6 py-4 rounded-xl inline-flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300">Resmi Teknoloji Ortağı</span>
                  </div>
                </div>
                <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden luxury-img-wrapper rounded-xl">
                    <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600" fill sizes="30vw" className="object-cover opacity-60" alt="Micro Stitching" />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden luxury-img-wrapper rounded-xl">
                    <Image src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600" fill sizes="30vw" className="object-cover opacity-60" alt="Serial Check" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                {[
                  { title: 'Mikroskobik Doku Taraması', desc: 'Gözenek yapısı ve lif yoğunluğu referanslarla karşılaştırılır.', stat: '10M+' },
                  { title: 'Işık Spektrum Taraması', desc: 'Malzemenin absorbsiyon ve yansıma spektrumu ölçülür.', stat: '99.1%' },
                  { title: 'Blockchain Destekli Kayıt', desc: 'Orijinal bulunan her ürüne değiştirilemez dijital kimlik.', stat: '100%' },
                ].map((tech) => (
                  <div key={tech.title} className="bg-white/5 p-6 rounded-xl border border-white/5">
                    <h4 className="text-sm font-semibold text-white mb-2">{tech.title}</h4>
                    <p className="text-xs text-gray-400 mb-4">{tech.desc}</p>
                    <p className="text-2xl font-bold text-[#AF9164]">{tech.stat}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Certificate */}
          {trustTab === 'certificate' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <h3 className="text-2xl sm:text-3xl serif-display">
                  Fiziksel <span className="italic text-[#AF9164] font-light">Orijinallik Sertifikası</span>
                </h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">
                  Peony Lab™ tarafından onaylanan tüm ürünler, alıcıya özel tescillenmiş fiziki Orijinallik Sertifikası ile gönderilir. Bu sertifika, ürünün orijinalliğini ömür boyu garanti altına alır ve değer koruma sağlar.
                </p>
                <div className="flex gap-2">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-white bg-white/10 px-3 py-1.5 rounded">✓ QR Kodlu Takip</span>
                  <span className="text-[8px] font-bold uppercase tracking-wider text-white bg-white/10 px-3 py-1.5 rounded">✓ Islak İmzalı</span>
                </div>
              </div>
              
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-64 aspect-[1/1.4] bg-white border-4 border-double border-zinc-200 p-5 flex flex-col justify-between shadow-2xl rounded text-black">
                  <div className="text-center space-y-2">
                    <p className="text-[7px] tracking-[0.3em] text-[#AF9164] font-bold">PEONY COLLECTIVE</p>
                    <h4 className="text-[9px] serif-display italic border-b border-gray-100 pb-1">Certificate of Authenticity</h4>
                  </div>
                  
                  <div className="space-y-2 my-4 text-[7px] tracking-wider text-gray-600">
                    <div className="flex justify-between border-b border-gray-50 pb-0.5">
                      <span>MARKA:</span>
                      <span className="font-bold text-gray-900">HERMÈS</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-0.5">
                      <span>MODEL:</span>
                      <span className="font-bold text-gray-900">Kelly 28 Togo</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-0.5">
                      <span>METOD:</span>
                      <span className="font-bold text-gray-900">32-Point & Entrupy™</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end border-t border-gray-100 pt-2 text-[6px]">
                    <div className="text-gray-400">
                      <p>PEONY LAB™ APPROVED</p>
                      <p className="font-mono">ID: #920-XF8</p>
                    </div>
                    <div className="text-gray-800 italic font-serif">Küratör İmzası</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Stories */}
          {trustTab === 'stories' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  brand: 'Hermès',
                  item: 'Birkin 35 — Togo Deri',
                  price: '₺ 480.000',
                  quote: 'Dokuz yıl önce Paris\'ten alınan bir çanta, bugün İstanbul\'da yeni sahibini buldu. Orijinalliği, değerini korudu.',
                  image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
                },
                {
                  brand: 'Chanel',
                  item: 'Classic Flap — Siyah Kaviyer',
                  price: '₺ 265.000',
                  quote: 'Alıcı dört farklı platformda aradı, güven bulamadı. Peony\'de aldı — üç gün içinde teslimde.',
                  image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600',
                },
                {
                  brand: 'Louis Vuitton',
                  item: 'Neverfull MM — Monogram',
                  price: '₺ 68.000',
                  quote: 'Satıcı, kurye koldan aldı ve ödeme T+5 günde hesabına geçti. Tek soru bile sormadı.',
                  image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600',
                },
              ].map((story) => (
                <div key={story.item} className="group border border-white/10 bg-white/5 rounded-2xl overflow-hidden hover:border-[#AF9164]/50 transition-all duration-500">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={story.image} alt={story.item} fill sizes="25vw" className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <div className="p-5 space-y-3">
                    <div>
                      <p className="text-[10px] font-bold text-[#AF9164] uppercase">{story.brand}</p>
                      <h4 className="text-sm serif-display italic text-white">{story.item}</h4>
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed italic border-l border-[#AF9164]/30 pl-3">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                    <div className="flex justify-between items-center text-[11px] pt-3 border-t border-white/5">
                      <span className="text-gray-500">İşlem Bedeli</span>
                      <span className="font-bold text-white">{story.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* SELL WITH US: COMPACT TOGGLE FOR VIP SERVICE & FOUNDER PROGRAM */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="text-center mb-12">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#AF9164] mb-2 block">PARTNER WITH PEONY</span>
            <h2 className="text-3xl md:text-4xl serif-display leading-tight text-gray-900">
              Lüksü Nakde <span className="italic font-light">Çevirin</span>
            </h2>
            
            {/* Sell Option Toggles */}
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={() => setSellTab('founder')}
                className={`sans-detail px-5 py-2 text-[10px] tracking-widest uppercase border transition-all duration-300 rounded-full ${
                  sellTab === 'founder'
                    ? 'bg-black text-white border-black font-bold'
                    : 'bg-white text-gray-500 border-gray-200 hover:text-black hover:border-black'
                }`}
              >
                Kurucu Tedarikçi Programı (%0)
              </button>
              <button 
                onClick={() => setSellTab('vip')}
                className={`sans-detail px-5 py-2 text-[10px] tracking-widest uppercase border transition-all duration-300 rounded-full ${
                  sellTab === 'vip'
                    ? 'bg-black text-white border-black font-bold'
                    : 'bg-white text-gray-500 border-gray-200 hover:text-black hover:border-black'
                }`}
              >
                Peony VIP (Concierge)
              </button>
            </div>
          </div>

          {sellTab === 'founder' && (
            <div className="bg-[#1A1A1A] text-white p-8 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-[#AF9164]/10 blur-3xl" />
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AF9164] bg-[#AF9164]/10 px-3 py-1 rounded">Özel Lansman Avantajı</span>
                <h3 className="text-2xl md:text-3xl serif-display">%0&apos;dan Başlayan Komisyon Oranları</h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                  Peony lansman dönemine özel sınırlı sayıdaki kurucu tedarikçiden biri olun, lüks parçalarınızı en yüksek değerle ve komisyonsuz avantajlarla nakde çevirin.
                </p>
              </div>
              <div className="lg:col-span-4 text-center lg:text-right shrink-0">
                <Link href="/sell" className="inline-block bg-[#AF9164] px-8 py-3 text-white hover:bg-white hover:text-black transition-all text-xs tracking-wider uppercase font-bold rounded-lg shadow-lg">
                  Hemen Başvur
                </Link>
              </div>
            </div>
          )}

          {sellTab === 'vip' && (
            <div className="bg-zinc-50 border border-gray-200 p-8 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AF9164] bg-[#AF9164]/10 px-3 py-1 rounded">White Glove Service</span>
                <h3 className="text-2xl md:text-3xl serif-display text-gray-900">Peony VIP ile Zahmetsiz Satış</h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light">
                  Ürünlerinizi evinizden teslim alıyoruz; profesyonel fotoğraf çekimi, fiyatlandırma, ekspertiz ve alıcı iletişimini tamamen biz yönetiyoruz. Ürün satıldığında tutar doğrudan hesabınızda.
                </p>
              </div>
              <div className="lg:col-span-4 text-center lg:text-right shrink-0">
                <a 
                  href="https://wa.me/905555555555?text=Merhaba, Peony VIP satış hizmetiniz hakkında bilgi almak istiyorum." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#AF9164] text-[#AF9164] px-6 py-3 hover:bg-[#AF9164] hover:text-white transition-all duration-300 text-xs tracking-wider uppercase font-bold rounded-lg"
                >
                  WhatsApp'tan Yazın →
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* COMPACT FINAL SELL CTA */}
      <section className="relative py-28 bg-black flex flex-col items-center text-center justify-center overflow-hidden">
        <Image 
          src="/luxury_wardrobe_bg.png" 
          fill
          sizes="100vw"
          className="object-cover opacity-30 grayscale-[50%]"
          alt="Sell Your Luxury"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="relative z-10 max-w-2xl px-6 space-y-6">
          <p className="sans-detail text-[#AF9164] tracking-[0.3em] text-[10px]">UNLOCK YOUR WARDROBE'S VALUE</p>
          <h2 className="text-3xl md:text-5xl serif-display text-white leading-tight">
            Kullanmadığınız lüks, <br/> <span className="italic font-light text-[#AF9164]">başkası için bir hazine.</span>
          </h2>
          <Link href="/sell" className="inline-block px-10 py-4 bg-white text-black hover:bg-[#AF9164] hover:text-white transition-all text-xs tracking-widest uppercase font-bold shadow-2xl rounded-full">
            HEMEN SATIŞ YAP
          </Link>
        </div>
      </section>

    </main>
  )
}
