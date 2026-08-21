'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, ChevronRight, BookOpen, Sparkles, 
  ArrowRight, Share2, Download, Check, ShoppingBag, Eye,
  Maximize2, Minimize2, RotateCcw
} from 'lucide-react'
import { useSettings } from '@/src/context/SettingsContext'
import { Product } from '@/src/types'

interface MagazineClientProps {
  products: Product[]
}

export default function MagazineClient({ products }: MagazineClientProps) {
  const { language } = useSettings()
  const [currentPage, setCurrentPage] = useState(0)
  const [copied, setCopied] = useState(false)
  const [emailSubscribed, setEmailSubscribed] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isZenMode, setIsZenMode] = useState(false)

  // Filter out invalid items
  const validProducts = useMemo(() => {
    return products.filter(p => p.id !== '86886062-b2ed-4654-8c41-ec6f3c966331' && Array.isArray(p.public_images) && p.public_images.length > 0)
  }, [products])

  const bagItem = useMemo(() => {
    return validProducts.find(p => p.category === 'Çanta') || validProducts[0]
  }, [validProducts])

  const dressItem = useMemo(() => {
    return validProducts.find(p => p.category === 'Kıyafet' && p.id !== bagItem?.id) || validProducts[1]
  }, [validProducts, bagItem])

  const watchItem = useMemo(() => {
    const citizen = validProducts.find(p => 
      p.model_name?.includes('AT2520') || 
      p.brand?.toLowerCase() === 'citizen' || 
      p.model_name?.toLowerCase().includes('citizen')
    )
    if (citizen) return citizen
    return validProducts.find(p => (p.category === 'Aksesuar' || p.category === 'watches') && p.id !== bagItem?.id && p.id !== dressItem?.id) || validProducts[2]
  }, [validProducts, bagItem, dressItem])

  const shoeItem = useMemo(() => {
    return validProducts.find(p => p.category === 'Ayakkabı' && p.id !== bagItem?.id && p.id !== dressItem?.id && p.id !== watchItem?.id) || validProducts[3]
  }, [validProducts, bagItem, dressItem, watchItem])

  // Total pages: 10 pages (0 to 9)
  const totalPages = 10

  const pages = [
    // ─── SAYFA 0: KAPAK (COVER) ───
    {
      type: 'cover',
      title: "L'ÉDITION GENÈSE",
      subtitle: language === 'en' ? 'GENESIS ISSUE Nº 01 • İSTANBUL • 2026' : 'TANITIM & MANİFESTO • SAYI 01 • İSTANBUL',
      headline: language === 'en' ? 'THE GENESIS OF PEONY' : 'MİRASIN YENİ SAHİBİ',
      tagline: language === 'en' ? 'Who We Are, What We Stand For, and Why Archival Luxury Matters' : 'Peony Nedir, Biz Kimiz ve Neden Arşiv Lüksü?',
      image: '/hero_banner.png',
      issueDate: language === 'en' ? 'SEPTEMBER 2026' : 'EYLÜL 2026',
      editorNote: language === 'en' 
        ? 'An intimate manifesto introducing İstanbul’s premier authenticated luxury vault, our curatorial standards, and the philosophy of timeless circular heritage.'
        : 'İstanbul’un tescilli lüks arşivini, 32 noktalı ekspertiz standartlarımızı ve ebedi döngüsel lüks felsefemizi anlatan özel tanıtım sayısı.'
    },

    // ─── SAYFA 1: PEONY NEDİR? (WHAT IS PEONY) ───
    {
      type: 'editorial',
      pageNumber: '01',
      category: language === 'en' ? 'THE MAISON IDENTITY' : 'PEONY NEDİR?',
      title: language === 'en' ? 'What is Peony Collective?' : 'Peony Collective Nedir?',
      author: language === 'en' ? 'Curatorial Manifesto' : 'Kürasyon Manifestosu',
      date: 'İstanbul Atelier',
      content: language === 'en' ? [
        'Peony Collective is not an ordinary second-hand marketplace; it is Turkey’s premier authenticated circular luxury house and private archives vault.',
        'We bridge the historical craftsmanship of İstanbul with the haute couture heritage of Paris, Milan, and Geneva. Every single handbag, timepiece, and couture garment in our collection is curated with the precision of an art gallery.',
        'We believe true luxury never expires. A masterpiece crafted three decades ago carries a soul and value that mass-produced modern luxury simply cannot replicate.'
      ] : [
        'Peony Collective, sıradan bir ikinci el alışveriş platformu değil; İstanbul merkezli, %100 tescilli bir lüks arşiv ve koleksiyon evidir.',
        'İstanbul’un köklü estetik mirası ile Paris, Milano ve Cenevre’nin haute-couture moda evlerini aynı çatı altında buluşturuyoruz. Vitrinimizdeki her çanta, saat ve haute couture parça bir sanat eseri titizliğiyle seçilir.',
        'İnanıyoruz ki gerçek lüksün miadı dolmaz. 30 yıl önce elle dikilen bir başyapıt, bugünün seri üretim lüksünün asla ulaşamayacağı bir ruha ve kalıcı yatırım değerine sahiptir.'
      ],
      quote: language === 'en' ? '“We do not sell pre-owned items; we pass down living heirlooms.”' : '“Biz ikinci el eşya satmıyoruz; yaşayan lüks mirasları sonraki sahiplerine emanet ediyoruz.”',
      image: '/manifesto_detail.png'
    },

    // ─── SAYFA 2: BİZ KİMİZ? (WHO WE ARE) ───
    {
      type: 'editorial',
      pageNumber: '02',
      category: language === 'en' ? 'OUR TEAM & HERITAGE' : 'BİZ KİMİZ?',
      title: language === 'en' ? 'The Specialists Behind the Vault' : 'Küratörler, Eksperler ve Koleksiyonerler',
      author: language === 'en' ? 'Peony Founders' : 'Peony Kurucu Heyeti',
      date: 'Atelier İstanbul',
      content: language === 'en' ? [
        'We are a collective of horology specialists, master leather artisans, certified appraisers, and passionate fashion archivists.',
        'Our mission was born from a singular conviction: buying or selling pre-loved luxury in Turkey required an absolute trust foundation—uncompromising verification, zero ambiguity, and white-glove private client care.',
        'Every object that enters our atelier undergoes rigorous physical and optical scrutiny before it is deemed worthy of the Peony seal.'
      ] : [
        'Bizler; lüks saat eksperleri, usta deri zanaatkarları, uluslararası sertifikalı denetçiler ve tutkulu arşiv koleksiyonerlerinden oluşan bağımsız bir kürasyon heyetiyiz.',
        'Peony Collective, tek bir inançla kuruldu: Türkiye’de lüks parça alıp satarken şüpheye, sahteciliğe ve güvensizliğe yer olmamalıdır. Müşterilerimiz yarım milyonluk bir yatırımı şansa bırakamaz.',
        'Atölyemize giren her bir parça, mikroskobik düzeyde incelenip Peony Lab onay mührünü alana kadar titizlikle denetlenir.'
      ],
      quote: language === 'en' ? '“Trust is not a marketing promise; it is an optical and metallurgical science.”' : '“Güven bir pazarlama vaadi değil; optik, mikroskobik ve fiziksel bir bilimdir.”',
      image: '/luxury_wardrobe_bg.png'
    },

    // ─── SAYFA 3: NEDEN ARŞİV & DÖNGÜSEL LÜKS? ───
    {
      type: 'article',
      pageNumber: '03',
      category: language === 'en' ? 'THE INVESTMENT LOGIC' : 'NEDEN ARŞİV LÜKSÜ?',
      title: language === 'en' ? 'Why Archival Luxury is the Future' : 'Neden Arşiv Lüksü En Değerli Yatırımdır?',
      image: '/hero_banner.png',
      stats: [
        { label: language === 'en' ? 'Hermès Value Growth' : 'Hermès Değer Artışı', value: '+14.2%/Yıl' },
        { label: language === 'en' ? 'Authenticity Guarantee' : 'Orijinallik Güvencesi', value: '100%' },
        { label: language === 'en' ? 'Sustainability Impact' : 'Döngüsel Tasarruf', value: 'Zero-Waste' },
      ],
      content: language === 'en' ? [
        'Archival pieces from Maisons like Hermès, Chanel, and Cartier represent the ultimate intersection of sustainable consumption and capital preservation.',
        'By recirculating verified pre-loved pieces, we extend the lifecycle of extraordinary craftsmanship while offering collectors access to impossible-to-find archival Grails.'
      ] : [
        'Hermès, Chanel ve Cartier gibi köklü evlerin el yapımı arşiv parçaları, sürdürülebilir lüks bilinci ile finansal değer korumanın en asil kesişim noktasıdır.',
        'Döngüsel lüks modeliyle hem doğaya saygılı bir zarafet döngüsü kuruyor hem de koleksiyonerlere butiklerde bulunması imkansız arşiv parçalarına anında erişim sağlıyoruz.'
      ]
    },

    // ─── SAYFA 4: NEDEN BİZ? / 4 TEMEL SÜTUN ───
    {
      type: 'style_dossier',
      pageNumber: '04',
      category: language === 'en' ? 'THE PEONY PILLARS' : 'NEDEN BİZ?',
      title: language === 'en' ? 'Why Choose Peony Collective?' : 'Peony’yi Eşsiz Kılan 3 Temel Güvence',
      image: '/manifesto_detail.png',
      rules: [
        { title: language === 'en' ? 'I. 32-Point Entrupy Verification' : 'I. 32 Noktalı Entrupy & Lab Tescili', desc: language === 'en' ? 'Microscopic pore mapping and physical audit backed by lifetime authenticity guarantee.' : 'İnsan gözünün göremediği mikroskobik lif analizi ve ömür boyu geçerli tescil sertifikası.' },
        { title: language === 'en' ? 'II. White-Glove VIP Delivery' : 'II. 4 Saatte VIP Beyaz Eldiven Teslimat', desc: language === 'en' ? 'Direct private courier delivery across İstanbul with tutelage protocol.' : 'İstanbul genelinde 4 saatte özel sigortalı kuryemizle adrese teslim tutanağı.' },
        { title: language === 'en' ? 'III. Zero-Risk Escrow Protection' : 'III. Sıfır Risk Escrow & 14 Gün İade', desc: language === 'en' ? '100% insured escrow payment and unconditional 14-day return privilege.' : 'Ödemeniz bloke altında güvencede; 14 gün boyunca koşulsuz iade özgürlüğü.' },
      ]
    },

    // ─── SAYFA 4: PEONY LAB™ & 32 NOKTALI EKSPERTİZ DOSYASI ───
    {
      type: 'trust_dossier',
      pageNumber: '04',
      category: language === 'en' ? 'LABORATORY REPORT' : 'LABORATUVAR DOSYASI',
      title: language === 'en' ? 'Under the Microscope: 32-Point Authentication' : 'Mikroskobun Altında: 32 Noktalı Kusursuzluk',
      image: '/manifesto_detail.png',
      badge: language === 'en' ? 'ENTRUPY™ AUDITED' : 'ENTRUPY™ TESCİLLİ',
      bulletPoints: language === 'en' ? [
        'Dermal pore alignment analysis at 260x optical magnification.',
        'Metallurgical XRF scan on hardware, zippers, and locks.',
        'Stitch cadence, angle uniformity, and wax thread audit.',
        'UV fluorescence verification of hidden serial foils.'
      ] : [
        '260 kat optik büyütmeyle mikroskobik deri gözenek haritalaması.',
        'Fermuar, toka ve kilit mekanizmalarında metalurjik spektrogram.',
        'El dikişlerinin açı, milimetre sıklığı ve mumlu ip analizi.',
        'Gizli seri tescillerinin UV ışık spektrumunda doğrulanması.'
      ]
    },

    // ─── SAYFA 5: EDİTÖRÜN ÇANTA SEÇKİSİ (SHOPPABLE) ───
    {
      type: 'shoppable',
      pageNumber: '05',
      category: language === 'en' ? 'THE VAULT SELECTION • BAGS' : 'EDİTÖRÜN SEÇKİSİ • ÇANTA',
      title: bagItem?.model_name || 'Bottega Veneta Cassette',
      brand: bagItem?.brand || 'Bottega Veneta',
      price: bagItem?.price || 115000,
      image: bagItem?.public_images?.[0] || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=85&w=900',
      productId: bagItem?.id || '',
      story: language === 'en' 
        ? 'A masterclass in modern artisanal leatherwork. Hand-woven intreccio construction meeting timeless minimalist silhouette.'
        : 'İtalyan usta zanaatkarlarının elinden çıkan ikonik örgü mimarisi. Kusursuz kondisyonda, ömür boyu saklanacak bir yatırım parçası.'
    },

    // ─── SAYFA 6: EDİTÖRÜN KIYAFET SEÇKİSİ (SHOPPABLE) ───
    {
      type: 'shoppable',
      pageNumber: '06',
      category: language === 'en' ? 'THE VAULT SELECTION • HAUTE COUTURE' : 'EDİTÖRÜN SEÇKİSİ • HAUTE COUTURE',
      title: dressItem?.model_name || 'Özgür Mansur Couture Dress',
      brand: dressItem?.brand || 'Özgür Mansur',
      price: dressItem?.price || 48000,
      image: dressItem?.public_images?.[0] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=900',
      productId: dressItem?.id || '',
      story: language === 'en'
        ? 'Dramatic silhouette and bespoke draping from İstanbul atelier archives. Designed for gala evenings and collectors of modern haute couture.'
        : 'İstanbul atelier arşivlerinden çıkan heykelsi drape kesimi ve özel kumaş işçiliği. Davetler ve özel geceler için eşsiz bir zarafet.'
    },

    // ─── SAYFA 7: HOROLOGY & HIGH JEWELRY (SHOPPABLE) ───
    {
      type: 'shoppable',
      pageNumber: '07',
      category: language === 'en' ? 'THE VAULT SELECTION • HOROLOGY' : 'EDİTÖRÜN SEÇKİSİ • SAAT & AKSESUAR',
      title: watchItem?.model_name || 'Citizen AT2520 Chronograph',
      brand: watchItem?.brand || 'Citizen',
      price: watchItem?.price || 24500,
      image: watchItem?.public_images?.[0] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=85&w=900',
      productId: watchItem?.id || '',
      story: language === 'en'
        ? 'Precision engineering and commanding wrist presence. Fully serviced and authenticated with official Peony Lab passport.'
        : 'Yüksek hassasiyetli mekanizma ve zamansız kasa tasarımı. Tüm bakımları tamamlanmış, Peony Lab sertifikası ile teslim edilir.'
    },

    // ─── SAYFA 8: DESIGNER FOOTWEAR (SHOPPABLE) ───
    {
      type: 'shoppable',
      pageNumber: '08',
      category: language === 'en' ? 'THE VAULT SELECTION • FOOTWEAR' : 'EDİTÖRÜN SEÇKİSİ • AYAKKABI',
      title: shoeItem?.model_name || 'Designer Archive Pumps',
      brand: shoeItem?.brand || 'Gianvito Rossi',
      price: shoeItem?.price || 32000,
      image: shoeItem?.public_images?.[0] || 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=900',
      productId: shoeItem?.id || '',
      story: language === 'en'
        ? 'Flawless proportions sculpted for timeless evening elegance. Handcrafted in Italy with genuine leather soles.'
        : 'İtalyan işçiliği ve kusursuz topuk geometrisi. Gece davetleri ve şık kombinler için gardırobun en asil tamamlayıcısı.'
    },

    // ─── SAYFA 9: ARKA KAPAK & GELECEK SAYI ÖN İZLEMESİ (BACK COVER) ───
    {
      type: 'back_cover',
      pageNumber: '09',
      category: language === 'en' ? 'NEXT ISSUE PREVIEW' : 'GELECEK SAYI ÖN İZLEMESİ',
      title: language === 'en' ? "ÉDITION Nº 02: WINTER HOROLOGY" : "SAYI Nº 02: KIŞ SAATÇİLİĞİ & ARŞİV",
      releaseDate: language === 'en' ? 'OCTOBER 2026' : 'EKİM 2026',
      previewText: language === 'en'
        ? 'Next month in Peony Magazine: The secret world of Swiss watch collectors, Patek Philippe archive histories, and winter cashmere guides.'
        : 'Gelecek ay Peony Magazine’de: İsviçre saat koleksiyonerliğinin bilinmeyenleri, Patek Philippe arşiv hikayeleri ve kışlık kaşmir kılavuzu.'
    }
  ]

  const activePage = pages[currentPage]

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage])

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="min-h-screen bg-[#0C0D10] text-white selection:bg-[#9E7D4E] selection:text-white py-4 sm:py-8 px-3 sm:px-8 transition-all">
      
      {/* ─── Top Magazine Master Header (Collapsible with Zen Mode) ─── */}
      {!isZenMode && (
        <div className="max-w-[1300px] mx-auto mb-6 flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#C2A676] bg-[#C2A676]/10 px-2.5 py-0.5 rounded-full border border-[#C2A676]/30">
                {language === 'en' ? 'PEONY GAZETTE • ISSUE 01' : 'PEONY GAZETTE • SAYI 01'}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-[10px] font-mono text-zinc-400">
                {language === 'en' ? 'SEPTEMBER 2026' : 'EYLÜL 2026'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-playfair tracking-tight text-white mt-1">
              Peony <span className="italic text-[#C2A676]">Magazine</span>
            </h1>
            <p className="text-xs text-zinc-400 font-light mt-0.5 max-w-lg">
              {language === 'en'
                ? 'Istanbul & Paris luxury archives, editorial fashion analyses, and verified curations.'
                : 'İstanbul ve Paris lüks arşivleri, editoryal moda analizleri ve doğrulanmış parça seçkileri.'
              }
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsZenMode(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-all cursor-pointer"
              title={language === 'en' ? 'Zen Reading Mode' : 'Tam Ekran Okuma Modu'}
            >
              <Maximize2 size={13} />
              <span className="hidden sm:inline">{language === 'en' ? 'Zen Mode' : 'Genişlet'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-all cursor-pointer"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
              <span>{copied ? (language === 'en' ? 'Copied' : 'Kopyalandı') : (language === 'en' ? 'Share' : 'Paylaş')}</span>
            </button>

            <Link
              href="/#collection"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9E7D4E] hover:bg-[#B38F5A] text-black font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-md shadow-[#9E7D4E]/20"
            >
              <ShoppingBag size={13} />
              <span>{language === 'en' ? 'Store' : 'Koleksiyon'}</span>
            </Link>
          </div>
        </div>
      )}

      {/* Zen Mode Close Floating Button */}
      {isZenMode && (
        <div className="max-w-[1300px] mx-auto mb-3 flex justify-end">
          <button
            onClick={() => setIsZenMode(false)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
          >
            <Minimize2 size={13} />
            <span>{language === 'en' ? 'Exit Zen Mode' : 'Daralt'}</span>
          </button>
        </div>
      )}

      {/* ─── Main Magazine Spread Container (Compact Luxury Sizing) ─── */}
      <div className="max-w-[1150px] mx-auto">
        
        {/* Magazine Flip Frame */}
        <div className="relative bg-[#14161C] border border-white/15 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden min-h-[520px] md:min-h-[580px] flex flex-col justify-between">
          
          {/* Top Page Header Bar */}
          <div className="px-5 sm:px-8 py-3 border-b border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-zinc-400 tracking-widest uppercase bg-white/[0.02]">
            <span className="text-[#C2A676] font-bold">PEONY GAZETTE • VOL. I</span>
            <div className="flex items-center gap-2">
              <span>{language === 'en' ? 'PAGE' : 'SAYFA'} {String(currentPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</span>
            </div>
            <span className="hidden sm:inline text-zinc-500">THE HERITAGE VAULT</span>
          </div>

          {/* Page Animated Content */}
          <div className="p-5 sm:p-9 flex-1 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full"
              >
                
                {/* ── 0. KAPAK SAYFASI ── */}
                {activePage.type === 'cover' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                      <span className="text-[10px] font-mono font-bold text-[#E2C79E] uppercase tracking-[0.3em] block">
                        {activePage.subtitle}
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-playfair tracking-tight text-white leading-tight">
                        {activePage.headline}
                      </h2>
                      <p className="font-serif italic text-[#C2A676] text-base sm:text-lg">
                        {activePage.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed border-l border-[#C2A676]/40 pl-3.5">
                        {activePage.editorNote}
                      </p>
                      <div className="pt-2">
                        <button
                          onClick={handleNext}
                          className="px-7 py-3 bg-[#C2A676] hover:bg-[#D4B98A] text-black font-bold text-xs tracking-[0.2em] uppercase font-mono rounded-full transition-all shadow-lg shadow-[#C2A676]/20 flex items-center gap-2 cursor-pointer"
                        >
                          <span>{language === 'en' ? 'Read Journal' : 'Dergiyi Oku'}</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-6 relative aspect-[4/5] max-w-sm mx-auto w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                      <Image
                        src={activePage.image || '/hero_banner.png'}
                        alt="Magazine Cover"
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
                      <div className="absolute bottom-5 left-5 right-5 text-white space-y-0.5">
                        <span className="text-[8px] font-mono tracking-widest text-[#E2C79E]">PEONY ÉDITION SPÉCIALE</span>
                        <h3 className="text-xl font-playfair italic">L&apos;Automne &amp; İstanbul</h3>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── 1. BAŞYAZI / EDITORIAL ── */}
                {activePage.type === 'editorial' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <span className="text-[9px] font-mono text-[#C2A676] uppercase tracking-widest font-bold">
                        {activePage.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-playfair text-white">
                        {activePage.title}
                      </h2>
                      <div className="space-y-2.5 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                        {activePage.content?.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                      <blockquote className="border-l-2 border-[#C2A676] pl-3.5 py-0.5 text-xs sm:text-sm font-playfair italic text-[#E2C79E]">
                        {activePage.quote}
                      </blockquote>
                      <p className="text-[10px] font-mono text-zinc-500">{activePage.author} • {activePage.date}</p>
                    </div>

                    <div className="lg:col-span-5 relative aspect-[4/5] max-w-xs mx-auto w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                      <Image
                        src={activePage.image || '/manifesto_detail.png'}
                        alt="Editorial Atelier"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* ── 2. PAZAR RAPORU / ARTICLE ── */}
                {activePage.type === 'article' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <span className="text-[9px] font-mono text-[#C2A676] uppercase tracking-widest font-bold">
                        {activePage.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-playfair text-white">
                        {activePage.title}
                      </h2>
                      
                      {/* Metric Badges */}
                      <div className="grid grid-cols-3 gap-2.5 py-1">
                        {activePage.stats?.map((s, idx) => (
                          <div key={idx} className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-center">
                            <p className="text-base sm:text-lg font-mono font-bold text-[#E2C79E]">{s.value}</p>
                            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider">{s.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2.5 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                        {activePage.content?.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 relative aspect-[4/5] max-w-xs mx-auto w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                      <Image
                        src={activePage.image || '/luxury_wardrobe_bg.png'}
                        alt="Market Report"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* ── 3. STİL DOSYASI ── */}
                {activePage.type === 'style_dossier' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <span className="text-[9px] font-mono text-[#C2A676] uppercase tracking-widest font-bold">
                        {activePage.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-playfair text-white">
                        {activePage.title}
                      </h2>
                      <div className="space-y-3">
                        {activePage.rules?.map((r, idx) => (
                          <div key={idx} className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-0.5">
                            <h4 className="text-xs font-mono font-bold text-[#E2C79E] uppercase tracking-wider">{r.title}</h4>
                            <p className="text-xs text-zinc-300 font-light leading-relaxed">{r.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 relative aspect-[4/5] max-w-xs mx-auto w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                      <Image
                        src={activePage.image || '/hero_banner.png'}
                        alt="Style Dossier"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* ── 4. PEONY LAB DOSYASI ── */}
                {activePage.type === 'trust_dossier' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-[#C2A676] uppercase tracking-widest font-bold">
                          {activePage.category}
                        </span>
                        <span className="text-[8px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                          {activePage.badge}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-playfair text-white">
                        {activePage.title}
                      </h2>
                      <div className="space-y-2 pt-1">
                        {activePage.bulletPoints?.map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-light">
                            <span className="text-[#C2A676] font-bold font-mono">0{idx + 1}.</span>
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 relative aspect-[4/5] max-w-xs mx-auto w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                      <Image
                        src={activePage.image || '/manifesto_detail.png'}
                        alt="Microscopic Lab"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* ── 5, 6, 7, 8. SHOPPABLE LOOKBOOK SAYFALARI ── */}
                {activePage.type === 'shoppable' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    <div className="lg:col-span-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-[#C2A676] uppercase tracking-widest font-bold">
                          {activePage.category}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-mono text-zinc-400">
                          {language === 'en' ? 'IN VAULT • AVAILABLE' : 'VİTRİNDE AKTİF'}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs font-mono font-bold text-[#E2C79E] uppercase tracking-widest">{activePage.brand}</p>
                        <h2 className="text-xl sm:text-3xl font-playfair text-white mt-0.5 leading-tight">
                          {activePage.title}
                        </h2>
                      </div>

                      <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                          {language === 'en' ? 'CURATOR NOTE' : 'KÜRATÖR GÖRÜŞÜ'}
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 font-light italic leading-relaxed">
                          &ldquo;{activePage.story}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                            {language === 'en' ? 'APPRAISED VALUE' : 'KORUMALI FİYAT'}
                          </span>
                          <span className="text-xl sm:text-2xl font-mono font-bold text-white">
                            {(Number(activePage.price) || 0).toLocaleString('tr-TR')} ₺
                          </span>
                        </div>

                        {activePage.productId && (
                          <Link
                            href={`/product/${activePage.productId}`}
                            className="px-5 py-2.5 bg-[#C2A676] hover:bg-[#D4B98A] text-black font-bold text-xs tracking-wider uppercase font-mono rounded-xl transition-all shadow-md flex items-center gap-2"
                          >
                            <Eye size={13} />
                            <span>{language === 'en' ? 'Inspect Piece' : 'Parçayı İncele'}</span>
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-6 relative aspect-[4/5] max-w-sm mx-auto w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                      <Image
                        src={activePage.image || '/hero_banner.png'}
                        alt={activePage.title || 'Product'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[8px] font-mono uppercase tracking-widest text-[#E2C79E]">
                        {language === 'en' ? '32-POINT AUDITED' : '32 NOKTA ONAYLI'}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── 9. ARKA KAPAK / NEXT ISSUE ── */}
                {activePage.type === 'back_cover' && (
                  <div className="max-w-xl mx-auto text-center space-y-5 py-4">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#C2A676] bg-[#C2A676]/10 px-3.5 py-1 rounded-full border border-[#C2A676]/30 inline-block">
                      {activePage.category}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-playfair text-white">
                      {activePage.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-md mx-auto">
                      {activePage.previewText}
                    </p>

                    {/* Newsletter Subscription Box */}
                    <div className="p-5 bg-white/5 rounded-3xl border border-white/10 max-w-md mx-auto space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E2C79E]">
                        {language === 'en' ? 'BE THE FIRST TO READ WHEN ISSUE 02 DROPS' : 'YENİ SAYI YAYINLANDIĞINDA İLK SİZ OKUYUN'}
                      </h4>
                      {emailSubscribed ? (
                        <p className="text-xs text-emerald-400 font-mono">
                          {language === 'en' ? '✓ You are on the private list! Issue 02 will be sent to your email.' : '✓ Özel listemize kaydoldunuz! Sayı 02 e-postanıza gelecek.'}
                        </p>
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            if (newsletterEmail) setEmailSubscribed(true)
                          }}
                          className="flex gap-2"
                        >
                          <input
                            type="email"
                            required
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder={language === 'en' ? 'YOUR EMAIL ADDRESS' : 'E-POSTA ADRESİNİZ'}
                            className="bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-zinc-600 flex-1 outline-none focus:border-[#C2A676]"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#C2A676] hover:bg-[#D4B98A] text-black font-bold text-xs rounded-xl font-mono tracking-wider cursor-pointer"
                          >
                            {language === 'en' ? 'Subscribe' : 'Kaydol'}
                          </button>
                        </form>
                      )}
                    </div>

                    <div className="pt-2 flex justify-center gap-3">
                      <button
                        onClick={() => setCurrentPage(0)}
                        className="px-5 py-2 rounded-xl border border-white/20 hover:border-white text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw size={13} />
                        <span>{language === 'en' ? 'Back to Cover' : 'Kapağa Dön'}</span>
                      </button>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Reader Navigation Controls */}
          <div className="px-5 sm:px-8 py-3.5 border-t border-white/[0.08] bg-black/40 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                currentPage === 0
                  ? 'opacity-30 cursor-not-allowed text-zinc-600'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <ChevronLeft size={15} />
              <span className="hidden sm:inline">{language === 'en' ? 'Previous' : 'Önceki Sayfa'}</span>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentPage === idx
                      ? 'w-5 bg-[#C2A676]'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Sayfa ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                currentPage === totalPages - 1
                  ? 'opacity-30 cursor-not-allowed text-zinc-600'
                  : 'bg-[#C2A676] hover:bg-[#D4B98A] text-black font-bold'
              }`}
            >
              <span className="hidden sm:inline">{language === 'en' ? 'Next' : 'Sonraki Sayfa'}</span>
              <ChevronRight size={15} />
            </button>
          </div>

        </div>

      </div>

      {/* ─── Archive Issues Grid ─── */}
      <div className="max-w-[1150px] mx-auto mt-16 pt-12 border-t border-white/10 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#C2A676]">
            {language === 'en' ? 'EDITORIAL ARCHIVES' : 'EDİTORYAL ARŞİV'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-playfair text-white">
            Peony Magazine <span className="italic text-[#C2A676]">{language === 'en' ? 'Issue Collection' : 'Sayı Koleksiyonu'}</span>
          </h3>
          <p className="text-xs text-zinc-400 font-light">
            {language === 'en' ? 'Our monthly digital luxury and curation journal.' : 'Her ay yayınlanan dijital lüks ve koleksiyon bültenimiz.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Issue 1 (Current) */}
          <div className="p-5 rounded-3xl bg-[#14161C] border border-[#C2A676]/40 space-y-3 shadow-xl relative overflow-hidden">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#E2C79E] bg-[#C2A676]/20 px-2.5 py-0.5 rounded-full inline-block font-bold">
              {language === 'en' ? 'CURRENT ISSUE • Nº 01' : 'AKTİF SAYI • Nº 01'}
            </span>
            <h4 className="text-lg font-playfair text-white">The Heritage Vault</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              {language === 'en'
                ? 'The rise of circular luxury, 32-point Entrupy valuation guide, and archive bag market analysis.'
                : 'Döngüsel lüksün yükselişi, 32 noktalı Entrupy ekspertiz kılavuzu ve arşiv çanta değerleme raporu.'}
            </p>
            <button
              onClick={() => {
                setCurrentPage(0)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-xs font-mono text-[#C2A676] font-bold tracking-wider hover:underline flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>{language === 'en' ? 'Read Now →' : 'Şimdi Oku →'}</span>
            </button>
          </div>

          {/* Issue 2 (Coming Soon) */}
          <div className="p-5 rounded-3xl bg-[#14161C]/50 border border-white/10 space-y-3 opacity-75">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 bg-white/5 px-2.5 py-0.5 rounded-full inline-block font-bold">
              {language === 'en' ? 'OCTOBER 2026 • Nº 02' : 'EKİM 2026 • Nº 02'}
            </span>
            <h4 className="text-lg font-playfair text-zinc-300">Winter Haute Horology</h4>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              {language === 'en'
                ? 'Swiss watch collecting secrets, rare dials, and winter cashmere guides.'
                : 'İsviçre lüks saatçilik mirası, nadir kadranlar ve kışlık kaşmir gardırop kılavuzu.'}
            </p>
            <span className="text-xs font-mono text-zinc-600 block pt-1">
              {language === 'en' ? 'Coming Soon' : 'Yakında Yayında'}
            </span>
          </div>

          {/* Issue 3 (In Production) */}
          <div className="p-5 rounded-3xl bg-[#14161C]/50 border border-white/10 space-y-3 opacity-75">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 bg-white/5 px-2.5 py-0.5 rounded-full inline-block font-bold">
              {language === 'en' ? 'NOVEMBER 2026 • Nº 03' : 'KASIM 2026 • Nº 03'}
            </span>
            <h4 className="text-lg font-playfair text-zinc-300">Riviera &amp; Archival Silks</h4>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              {language === 'en'
                ? 'History of vintage archival silks, French Riviera elegance, and gala styling.'
                : 'Vintage ipek eşarpların tarihi, Fransız Rivierası zarafeti ve kış davet stilleri.'}
            </p>
            <span className="text-xs font-mono text-zinc-600 block pt-1">
              {language === 'en' ? 'In Production' : 'Hazırlanıyor'}
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}
