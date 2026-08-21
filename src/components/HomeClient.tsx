/**
 * @file HomeClient.tsx
 * @description Peony Collective İstemci Tarafı Ana Sayfa Bileşeni (Client-Side Master Page).
 * 
 * Bu bileşen ana sayfanın dinamik vitrinini, filtreleme mekanizmalarını, hero bölümünü ve
 * ürün koleksiyon listelemesini yönetir.
 * 
 * Temel Modüller:
 * 1. Hero Vitrini (Marka hikayesi ve ana eylem butonları)
 * 2. Kategori Kartları Grid'i (Çanta, Kıyafet, Ayakkabı, Aksesuar yönlendirmeleri)
 * 3. Dinamik Ürün Filtreleme & Arama (Cinsiyet, Kategori, Fiyat Sıralama, Marka Filtreleri)
 * 4. Konsinye/Satış Pop-up Girişi ve VIP Hizmet Tanıtımları
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, SlidersHorizontal, ArrowUpDown, X, RotateCcw, Filter, Check, ChevronRight, ChevronLeft, ArrowUpRight, ArrowRight, ShieldCheck } from 'lucide-react'
import ProductCard from '@/src/components/ProductCard'
import SellPopup from '@/src/components/SellPopup'
import CustomSelect from '@/src/components/CustomSelect'
import FadeIn from '@/src/components/animations/FadeIn'
import PeonyWeatherConcierge from '@/src/components/PeonyWeatherConcierge'
import PeonyMagazineCover from '@/src/components/PeonyMagazineCover'
import { useSettings } from '@/src/context/SettingsContext'
import { Product } from '@/src/types'

// Subcategory mappings

const subcategoryMap: Record<string, string[]> = {
  'Ayakkabı': ['Topuklu', 'Loafer', 'Sneaker', 'Terlik / Sandalet', 'Babet', 'Bot / Çizme'],
  'Çanta': ['El Çantası', 'Crossbody', 'Omuz Çantası', 'Clutch', 'Sırt Çantası', 'Mini Çanta'],
  'Kıyafet': ['Blazer / Ceket', 'Triko / Kazak', 'Gömlek', 'T-Shirt / Bluz', 'Mont / Kaban', 'Elbise', 'Etek'],
  'Aksesuar': ['Saat', 'Kemer', 'Cüzdan', 'Şal / Eşarp', 'Takı']
}

interface HomeClientProps {
  products: Product[]
  totalCatalogCount?: number
  brands: string[]
  brand?: string
  category?: string
  subcategory?: string
  gender?: string
}

export default function HomeClient({ products, totalCatalogCount = 298, brands, brand, category, subcategory, gender }: HomeClientProps) {
  const router = useRouter()
  const { language, t, formatPrice } = useSettings()
  const [visibleCount, setVisibleCount] = useState(24)

  const genderFilters = useMemo(() => [
    { label: t('filter.women', 'Kadın'), value: 'Kadın' },
    { label: t('filter.men', 'Erkek'), value: 'Erkek' },
    { label: t('filter.unisex', 'Unisex'), value: 'unisex' },
  ], [t])

  const curationThemes = useMemo(() => [
    { 
      id: null, 
      label: t('edit.allCollection', 'Tüm Koleksiyon'), 
      desc: 'Peony Collective küratörlü lüks arşivinin tamamı.' 
    },
    { 
      id: 'evening', 
      label: t('edit.themeEvening', 'Gece & Davet'), 
      desc: 'Topuklu silüetler, clutch\'lar, saten/rugan dokular ve gece ışıltısı taşıyan lüks parçalar.' 
    },
    { 
      id: 'office', 
      label: t('edit.themeOffice', 'Şehir & Ofis'), 
      desc: 'Loafer\'lar, keskin blazer ceketler, ipek gömlekler ve ikonik iş/omuz çantaları.' 
    },
    { 
      id: 'resort', 
      label: t('edit.themeResort', 'Resort & Hafta Sonu'), 
      desc: 'Lüks sandaletler, sneaker\'lar, keten rahatlığı ve crossbody çantalar.' 
    },
    { 
      id: 'quiet_luxury', 
      label: t('edit.themeQuietLuxury', 'Sessiz Lüks'), 
      desc: 'Bottega Veneta, The Row, Loro Piana, Hermès ve logosuz saf işçilik temsilcileri.' 
    },
    { 
      id: 'investment', 
      label: t('edit.themeInvestment', 'Yatırım Parçaları'), 
      desc: 'Chanel, Hermès, Louis Vuitton ve Rolex gibi değerini katlayan arşiv klasikleri.' 
    },
    { 
      id: 'under15k', 
      label: t('edit.themeUnder15k', '15.000 ₺ Altı'), 
      desc: 'Peony Lab onaylı, erişilebilir lüks seçkisi.' 
    },
  ], [t])

  const mainCategoryTabs = useMemo(() => [
    { id: null, label: t('category.all', 'Tüm Kategoriler') },
    { id: 'Çanta', label: t('category.bags', 'Çanta') },
    { id: 'Ayakkabı', label: t('category.shoes', 'Ayakkabı') },
    { id: 'Kıyafet', label: t('category.clothing', 'Kıyafet') },
    { id: 'Aksesuar', label: t('category.accessories', 'Saat & Aksesuar') },
  ], [t, language])

  const sortOptions = useMemo(() => [
    { value: 'featured', label: t('sort.featured', 'Öne Çıkanlar') },
    { value: 'price_asc', label: t('sort.priceAsc', 'Fiyat: Düşükten Yükseğe') },
    { value: 'price_desc', label: t('sort.priceDesc', 'Fiyat: Yüksekten Düşüğe') },
    { value: 'newest', label: t('sort.newest', 'En Yeniler') },
  ], [t])

  const priceRangeOptions = useMemo(() => [
    { value: 'all', label: t('price.all', 'Tüm Fiyatlar') },
    { value: 'under15k', label: t('price.under15k', '15.000 ₺ Altı') },
    { value: '15k_35k', label: t('price.15k35k', '15.000 ₺ - 35.000 ₺') },
    { value: '35k_75k', label: t('price.35k75k', '35.000 ₺ - 75.000 ₺') },
    { value: '75k_plus', label: t('price.75kPlus', '75.000 ₺ ve Üzeri') },
  ], [t])

  // The Edit: Curation & Multi-Filter States
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(subcategory || null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(brand || null)
  const [selectedGender, setSelectedGender] = useState<string | null>(gender || null)
  const [sortOption, setSortOption] = useState<'featured' | 'price_asc' | 'price_desc' | 'newest'>('featured')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)

  // Sync props when URL parameters change
  useEffect(() => {
    if (category !== undefined) setSelectedCategory(category || null)
  }, [category])
  useEffect(() => {
    if (subcategory !== undefined) setSelectedSubcategory(subcategory || null)
  }, [subcategory])
  useEffect(() => {
    if (brand !== undefined) setSelectedBrand(brand || null)
  }, [brand])
  useEffect(() => {
    if (gender !== undefined) setSelectedGender(gender || null)
  }, [gender])

  // Reset subcategory if category changes and doesn't match
  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      const validSubcats = subcategoryMap[selectedCategory] || []
      if (!validSubcats.includes(selectedSubcategory)) {
        setSelectedSubcategory(null)
      }
    }
  }, [selectedCategory])

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

  const [isMuseLoading, setIsMuseLoading] = useState(false)

  async function handleSendMuseMessage() {
    if (!museInput.trim() || isMuseLoading) return
    const text = museInput.trim()
    const msgId = Date.now().toString()
    setMuseMessages(prev => [...prev, { id: msgId, sender: 'user', text }])
    setMuseInput('')
    setIsMuseLoading(true)

    try {
      const { createClient } = await import('@/src/utils/supabase/client')
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.access_token) {
        setMuseMessages(prev => [
          ...prev,
          {
            id: `muse-${Date.now()}`,
            sender: 'muse',
            text: language === 'tr'
              ? 'Muse ile sohbet etmek için lütfen giriş yapın.'
              : 'Please log in to chat with Muse.'
          }
        ])
        setIsMuseLoading(false)
        return
      }

      const response = await fetch('/api/muse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ message: text, locale: language })
      })

      const data = await response.json()

      if (!response.ok) {
        setMuseMessages(prev => [
          ...prev,
          {
            id: `muse-${Date.now()}`,
            sender: 'muse',
            text: data.error || (language === 'tr' ? 'Bir hata oluştu, lütfen tekrar deneyin.' : 'An error occurred, please try again.')
          }
        ])
        setIsMuseLoading(false)
        return
      }

      setMuseMessages(prev => [
        ...prev,
        {
          id: `muse-${Date.now()}`,
          sender: 'muse',
          text: data.text,
          products: data.products
        }
      ])
    } catch {
      setMuseMessages(prev => [
        ...prev,
        {
          id: `muse-${Date.now()}`,
          sender: 'muse',
          text: language === 'tr'
            ? 'Bağlantı hatası oluştu, lütfen tekrar deneyin.'
            : 'Connection error, please try again.'
        }
      ])
    } finally {
      setIsMuseLoading(false)
    }
  }

  // Interactive Tabs State
  const [curatedTab, setCuratedTab] = useState<'seasonal' | 'smart'>('seasonal')
  const [trustTab, setTrustTab] = useState<'how' | 'lab' | 'certificate' | 'stories'>('how')
  const [sellTab, setSellTab] = useState<'founder' | 'vip'>('founder')

  useEffect(() => {
    setVisibleCount(24)
  }, [selectedBrand, selectedCategory, selectedSubcategory, selectedGender, selectedTheme, selectedPriceRange, sortOption])

  // Filter and Sort Engine (High Performance)
  const displayProducts = useMemo(() => {
    let list = (products || []).filter((p) => {
      // Geçersiz ahşap test ürününü filtrele
      if (p.id === '86886062-b2ed-4654-8c41-ec6f3c966331') return false

      // 1. Gender Filter
      if (selectedGender) {
        if (p.gender && p.gender.toUpperCase() !== selectedGender.toUpperCase()) return false
      }

      // 2. Category Filter
      if (selectedCategory) {
        if (selectedCategory === 'Aksesuar') {
          if (p.category !== 'Aksesuar' && p.category !== 'watches') return false
        } else {
          if (p.category !== selectedCategory) return false
        }
      }

      // 3. Subcategory Filter
      if (selectedSubcategory) {
        if (selectedSubcategory === 'Loafer' && p.subcategory === 'Loafer / Babet') {
          // match
        } else if (selectedSubcategory === 'Babet' && p.subcategory === 'Loafer / Babet') {
          // match
        } else if (p.subcategory !== selectedSubcategory) {
          return false
        }
      }

      // 4. Brand Filter
      if (selectedBrand) {
        if (p.brand?.trim().toLowerCase() !== selectedBrand.trim().toLowerCase()) return false
      }

      // 5. Price Range Filter
      if (selectedPriceRange && selectedPriceRange !== 'all') {
        const price = Number(p.price || 0)
        if (selectedPriceRange === 'under15k' && price > 15000) return false
        if (selectedPriceRange === '15k_35k' && (price <= 15000 || price > 35000)) return false
        if (selectedPriceRange === '35k_75k' && (price <= 35000 || price > 75000)) return false
        if (selectedPriceRange === '75k_plus' && price <= 75000) return false
      }

      // 6. Curation Theme Filter
      if (selectedTheme === 'evening') {
        const isEveningSubcat = ['Topuklu', 'Clutch', 'Elbise', 'Mini Çanta'].includes(p.subcategory || '')
        const descLower = (p.description || '').toLowerCase()
        const modelLower = (p.model_name || '').toLowerCase()
        const isEveningKeyword = /rugan|saten|glitter|altın|gold|silver|gümüş|kristal|davet|gece|evening|stiletto|kokteyl/i.test(descLower + ' ' + modelLower)
        const isEveningBrand = ['Christian Louboutin', 'Sergio Rossi', 'Gianvito Rossi', 'Jimmy Choo', 'Valentino'].some(b => p.brand?.toLowerCase().includes(b.toLowerCase()))
        if (!isEveningSubcat && !isEveningKeyword && !isEveningBrand) return false
      } else if (selectedTheme === 'office') {
        const isOfficeSubcat = ['Loafer', 'Blazer / Ceket', 'Gömlek', 'Triko / Kazak', 'El Çantası', 'Omuz Çantası', 'Babet', 'Loafer / Babet', 'Saat'].includes(p.subcategory || '')
        if (!isOfficeSubcat) return false
      } else if (selectedTheme === 'resort') {
        const isResortSubcat = ['Terlik / Sandalet', 'Sneaker', 'T-Shirt / Bluz', 'Crossbody', 'Sırt Çantası'].includes(p.subcategory || '')
        const descLower = (p.description || '').toLowerCase()
        const isResortKeyword = /keten|hasır|canvas|sandalet|terlik|yaz|beach|resort|raffia/i.test(descLower)
        if (!isResortSubcat && !isResortKeyword) return false
      } else if (selectedTheme === 'quiet_luxury') {
        const quietBrands = ['Bottega Veneta', 'The Row', 'Loro Piana', 'Brunello Cucinelli', 'Hermès', 'Hermes', 'Céline', 'Celine', 'Loewe', 'Goyard', 'Max Mara']
        const isQuietBrand = quietBrands.some(b => p.brand?.toLowerCase().includes(b.toLowerCase()))
        const descLower = (p.description || '').toLowerCase()
        const isQuietKeyword = /kaşmir|cashmere|intrecciato|deri|minimal|sade|quiet/i.test(descLower)
        if (!isQuietBrand && !isQuietKeyword) return false
      } else if (selectedTheme === 'investment') {
        const investmentBrands = ['Hermès', 'Hermes', 'Chanel', 'Louis Vuitton', 'Christian Dior', 'Dior', 'Rolex', 'Cartier']
        const isInvestBrand = investmentBrands.some(b => p.brand?.toLowerCase().includes(b.toLowerCase()))
        const isHighValue = (p.price || 0) >= 35000
        if (!isInvestBrand && !isHighValue) return false
      } else if (selectedTheme === 'under15k') {
        if ((p.price || 0) > 15000) return false
      }

      return true
    })

    // Sorting
    const sorted = [...list]
    if (sortOption === 'price_asc') {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0))
    } else if (sortOption === 'price_desc') {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0))
    } else if (sortOption === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    }

    return sorted
  }, [products, selectedGender, selectedCategory, selectedSubcategory, selectedBrand, selectedPriceRange, selectedTheme, sortOption])

  const hasActiveFilters = Boolean(
    selectedTheme ||
    selectedCategory ||
    selectedSubcategory ||
    selectedBrand ||
    selectedGender ||
    (selectedPriceRange && selectedPriceRange !== 'all') ||
    sortOption !== 'featured'
  )

  function clearAllFilters() {
    setSelectedTheme(null)
    setSelectedCategory(null)
    setSelectedSubcategory(null)
    setSelectedBrand(null)
    setSelectedGender(null)
    setSelectedPriceRange(null)
    setSortOption('featured')
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/#collection')
    }
  }

  // Active theme info
  const currentThemeObj = curationThemes.find(t => t.id === selectedTheme)

  const displayBagsUnder15k = useMemo(() => {
    return (products || []).filter(p => p.category === 'Çanta' && (p.price ?? 0) <= 15000)
  }, [products])

  const provenanceStories = useMemo(() => {
    const p1 = (products || []).find(p => p.brand?.toLowerCase() === 'bottega veneta' && p.model_name?.toLowerCase().includes('andiamo')) || 
               (products || []).find(p => (p.price ?? 0) >= 100000) || products?.[0]
               
    const p2 = (products || []).find(p => p.brand?.toLowerCase() === 'prada' && p.model_name?.toLowerCase().includes('saffiano')) || 
               (products || []).find(p => p.brand?.toLowerCase() === 'givenchy') || products?.[1]
               
    const p3 = (products || []).find(p => p.brand?.toLowerCase() === 'louis vuitton' || p.model_name?.toLowerCase().includes('cassette')) || products?.[2]

    const list = [
      {
        product: p1,
        quoteTr: 'Orijinalliği Peony Lab ve Entrupy AI mikroskobik analiziyle %100 doğrulandı, değerini kusursuz koruyan zamansız arşiv parçası.',
        quoteEn: '100% verified authentic by Peony Lab and Entrupy AI microscopic analysis. A timeless investment piece.'
      },
      {
        product: p2,
        quoteTr: 'Eksper onaylı kondisyon raporu ile İstanbul içi aynı gün 4 saatte VIP kurye teslimatıyla yeni sahibine ulaştı.',
        quoteEn: 'Appraised with full condition report and delivered within 4 hours by VIP white-glove courier.'
      },
      {
        product: p3,
        quoteTr: 'Satıcıdan doğrudan konsinye teslim alınıp T+1 iş gününde hakedişi aktarılan güvenli lüks döngü örneği.',
        quoteEn: 'Consigned seamlessly with guaranteed payout within T+1 days, setting the standard for circular luxury.'
      }
    ].filter(s => Boolean(s.product))

    return list
  }, [products])

  const editorialHeroItems = useMemo(() => {
    const valid = (products || []).filter(p => Array.isArray(p.public_images) && p.public_images.length > 0)
    
    if (valid.length >= 3) {
      return valid.slice(0, 3).map((p, idx) => ({
        id: p.id,
        categoryLabel: p.category || (language === 'en' ? 'CURATED ARCHIVE' : 'ÖZEL KÜRASYON'),
        brand: p.brand,
        model: p.model_name,
        price: p.price || 0,
        image: p.public_images[0],
        href: `/product/${p.id}`,
        storyTag: idx === 0 
          ? (language === 'en' ? 'HANDCRAFTED HERITAGE' : 'ÖZGÜN İŞÇİLİK MİRASI')
          : idx === 1 
            ? (language === 'en' ? 'VERIFIED TIMELESS ICON' : 'ONAYLI ZAMANSIZ İKON')
            : (language === 'en' ? 'AUTHENTIC LUXURY VAULT' : 'DOĞRULANMIŞ LÜKS ARŞİV')
      }))
    }

    // Fallback if DB is loading
    return [
      {
        id: '1',
        categoryLabel: language === 'en' ? 'COUTURE & BAGS' : 'İKONİK ÇANTA',
        brand: 'Bottega Veneta',
        model: 'Andiamo Medium Tote',
        price: 163000,
        image: '/hero_banner.png',
        href: '/catalog?category=Çanta',
        storyTag: language === 'en' ? 'INTRECCIATO LEATHER CRAFT' : 'SAF İTALYAN DERİ İŞÇİLİĞİ'
      },
      {
        id: '2',
        categoryLabel: language === 'en' ? 'CIRCULAR HERITAGE' : 'HAUTE COUTURE',
        brand: 'Chanel',
        model: 'Classic Double Flap Caviar',
        price: 245000,
        image: '/luxury_wardrobe_bg.png',
        href: '/catalog?category=Çanta',
        storyTag: language === 'en' ? 'TIMELESS INVESTMENT PIECE' : 'ZAMANSIZ YATIRIM PARÇASI'
      }
    ]
  }, [products, language])

  // ─── DİNAMİK KATEGORİ KARTLARI (GERÇEK VERİTABANI ÜRÜNLERİ) ───
  const dynamicCategoryCards = useMemo(() => {
    // Ahşap test ürününü filtrele
    const validProducts = (products || []).filter(p => p.id !== '86886062-b2ed-4654-8c41-ec6f3c966331')

    const bagItem = validProducts.find(p => p.category === 'Çanta' && Array.isArray(p.public_images) && p.public_images.length > 0)
    const bagImage = bagItem?.public_images[0] || '/hero_banner.png'
    const bagCount = validProducts.filter(p => p.category === 'Çanta').length

    const clothingItem = validProducts.find(p => p.category === 'Kıyafet' && Array.isArray(p.public_images) && p.public_images.length > 0)
    const clothingImage = clothingItem?.public_images[0] || bagImage
    const clothingCount = validProducts.filter(p => p.category === 'Kıyafet').length

    const shoeItem = validProducts.find(p => p.category === 'Ayakkabı' && Array.isArray(p.public_images) && p.public_images.length > 0)
    const shoeImage = shoeItem?.public_images[0] || bagImage
    const shoeCount = validProducts.filter(p => p.category === 'Ayakkabı').length

    // Citizen AT2520-89L saatini veya en iyi lüks aksesuarı bul
    const citizenWatch = validProducts.find(p => 
      (p.model_name?.includes('AT2520') || p.brand?.toLowerCase() === 'citizen' || p.model_name?.toLowerCase().includes('citizen')) && 
      Array.isArray(p.public_images) && p.public_images.length > 0
    )
    const accItem = citizenWatch || validProducts.find(p => 
      (p.category === 'Aksesuar' || p.category === 'watches') && 
      Array.isArray(p.public_images) && p.public_images.length > 0
    )
    const accImage = accItem?.public_images[0] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=85&w=900'
    const accCount = validProducts.filter(p => p.category === 'Aksesuar' || p.category === 'watches').length

    return [
      {
        title: 'Çanta',
        subtitle: language === 'en' ? `Bags (${bagCount} Pieces)` : `Çanta (${bagCount} Parça)`,
        featuredBrand: bagItem?.brand || 'Bottega Veneta',
        image: bagImage,
        href: '/?category=Çanta#collection',
      },
      {
        title: 'Kıyafet',
        subtitle: language === 'en' ? `Ready-to-Wear (${clothingCount} Pieces)` : `Kıyafet (${clothingCount} Parça)`,
        featuredBrand: clothingItem?.brand || 'Özgür Mansur',
        image: clothingImage,
        href: '/?category=Kıyafet#collection',
      },
      {
        title: 'Ayakkabı',
        subtitle: language === 'en' ? `Footwear (${shoeCount} Pieces)` : `Ayakkabı (${shoeCount} Parça)`,
        featuredBrand: shoeItem?.brand || 'Designer Shoes',
        image: shoeImage,
        href: '/?category=Ayakkabı#collection',
      },
      {
        title: 'Aksesuar',
        subtitle: language === 'en' ? `Accessories & Watches (${accCount} Pieces)` : `Aksesuar & Saat (${accCount} Parça)`,
        featuredBrand: accItem?.brand || 'Citizen',
        image: accImage,
        href: '/?category=Aksesuar#collection',
      },
    ]
  }, [products, language])

  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [isHeroHovered, setIsHeroHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const homeDisplayLimit = isMobile ? 6 : 12

  useEffect(() => {
    if (isHeroHovered) return
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % editorialHeroItems.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isHeroHovered, editorialHeroItems.length])

  const activeItem = editorialHeroItems[activeHeroSlide]

  return (
    <main className="relative overflow-hidden bg-[#F9F9F8]">
      <SellPopup />

      {/* ─── HERO: BALANCED QUIET LUXURY EDITORIAL COVER (ROTA 1) ─── */}
      <section 
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        className="relative w-full overflow-hidden bg-gradient-to-br from-[#161820] via-[#0E0F13] to-[#08090C] text-white flex items-center py-12 lg:py-16 border-b border-stone-800 shadow-2xl"
      >
        {/* Subtle Ambient Luxury Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(158,125,78,0.22),transparent_70%)] pointer-events-none" />
        <div className="absolute -left-20 top-1/3 w-96 h-96 bg-[#9E7D4E]/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#9E7D4E]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
          
          {/* ─── SOL SÜTUN: ASİL VE DENGELİ TİPOGRAFİ ─── */}
          <div className="lg:col-span-7 space-y-5 lg:space-y-6">
            
            {/* Minimalist Issue Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#9E7D4E]/30 text-[#E2C79E] text-[9px] font-bold tracking-[0.25em] uppercase font-mono shadow-sm">
              <Sparkles size={10} className="text-[#E2C79E]" />
              <span>{language === 'en' ? 'CURATED ARCHIVE • VOL. IV • İSTANBUL' : 'KÜRASYON ARŞİVİ • CİLT IV • İSTANBUL'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-playfair tracking-tight leading-[1.02] text-white">
              {language === 'en' ? (
                <>The Art of <br /><span className="italic font-light text-[#E2C79E]">Timeless Luxury.</span></>
              ) : (
                <>Zamansız Lüksün <br /><span className="italic font-light text-[#E2C79E]">Arşiv Sanatı.</span></>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-stone-300 font-light max-w-lg leading-relaxed">
              {language === 'en'
                ? 'Curated pre-loved icons from Bottega Veneta, Hermès, Chanel, and Cartier. Handcrafted excellence, verified authenticity, and circular heritage.'
                : 'Bottega Veneta, Hermès, Chanel ve Cartier arşivlerinden seçkin tasarımcı parçaları. El işçiliği zarafet, ekspertiz güvencesi ve döngüsel miras.'
              }
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link 
                href="/catalog"
                className="px-8 py-3.5 bg-[#9E7D4E] hover:bg-[#B38F5A] text-white transition-all duration-300 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full shadow-xl shadow-[#9E7D4E]/20 cursor-pointer inline-flex items-center gap-2"
              >
                <span>{language === 'en' ? 'EXPLORE ARCHIVE →' : 'ARŞİVİ KEŞFET →'}</span>
              </Link>

              <Link 
                href="/sell"
                className="px-8 py-3.5 bg-white/5 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md text-white transition-all duration-300 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full cursor-pointer"
              >
                <span>{language === 'en' ? 'CONSIGN WITH US ↗' : 'LÜKSÜNÜ SAT ↗'}</span>
              </Link>
            </div>

          </div>

          {/* ─── SAĞ SÜTUN: KOMPAKT 3'LÜ EDİTORYAL VİTRİN ─── */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-center">
            
            <Link 
              href={activeItem.href}
              className="relative w-full max-w-[360px] sm:max-w-[390px] aspect-[4/4.6] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group block cursor-pointer bg-black/40"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={activeItem.image} 
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover brightness-[0.82] group-hover:scale-105 transition-all duration-700 ease-out"
                    alt={activeItem.model}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent z-10" />
                </motion.div>
              </AnimatePresence>

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[8px] font-bold uppercase tracking-widest bg-black/70 backdrop-blur-md px-2.5 py-0.5 text-[#E2C79E] rounded-full border border-white/15">
                  {activeItem.categoryLabel}
                </span>
              </div>

              {/* Bottom Frame Label */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end text-white">
                <div className="space-y-0.5">
                  <p className="text-[8px] font-mono uppercase tracking-widest text-stone-400">{activeItem.brand}</p>
                  <h4 className="text-base font-playfair italic text-white truncate max-w-[190px]">{activeItem.model}</h4>
                  <p className="text-[7px] text-[#E2C79E] tracking-wider uppercase font-mono">{activeItem.storyTag}</p>
                </div>
                <span className="text-[11px] font-mono font-bold bg-black/60 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-md text-white">
                  {formatPrice(activeItem.price)}
                </span>
              </div>
            </Link>

            {/* ─── Mini Story Switcher Tabs Below Frame ─── */}
            <div className="w-full max-w-[360px] sm:max-w-[390px] pt-3 flex items-center justify-between gap-2">
              {editorialHeroItems.map((item, idx) => {
                const isActive = activeHeroSlide === idx
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveHeroSlide(idx)}
                    className={`flex-1 text-left py-1.5 px-2.5 rounded-xl transition-all cursor-pointer border ${
                      isActive 
                        ? 'bg-white/10 border-[#9E7D4E]/60 text-white shadow-sm' 
                        : 'bg-white/[0.03] border-white/5 text-stone-500 hover:text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-mono text-[#E2C79E]">0{idx + 1}</span>
                      <span className="text-[7px] uppercase tracking-wider font-semibold truncate">{item.brand}</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                      {isActive && (
                        <motion.div 
                          layoutId="quietHeroProgress"
                          className="h-full bg-[#E2C79E] w-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: isHeroHovered ? 0 : 4, ease: 'linear' }}
                        />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

          </div>

        </div>

      </section>

      {/* ─── UNIFIED MAISON MANIFESTO & STYLE CONCIERGE ─── */}
      <section className="py-16 md:py-24 bg-[#FAF9F7] border-b border-stone-200/80 text-stone-900">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-12">
          
          {/* Integrated Style Concierge Card */}
          <PeonyWeatherConcierge />

          {/* Maison Manifesto Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-4">
            
            {/* Left Column: Timeless Manifesto Typography */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#9E7D4E] uppercase font-bold block">
                {language === 'en' ? 'THE MAISON MANIFESTO' : 'PEONY MANİFESTOSU'}
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair tracking-tight leading-[1.1] text-stone-900">
                {language === 'en'
                  ? 'You are passing on a heritage, not just a product.'
                  : 'Sadece bir ürün değil, bir miras devrediyorsunuz.'
                }
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-lg">
                {language === 'en'
                  ? 'At Peony Collective, luxury is not merely a brand tag — it is a commitment to timeless craftsmanship. Through 32-point physical auditing and Entrupy AI microscopic verification, authenticity is forever guaranteed.'
                  : 'Peony Collective\'de lüks sadece bir etiket değil, zamansız işçiliğe duyulan saygıdır. 32 noktalı fiziksel ekspertiz ve Entrupy AI mikroskobik doğrulama ile orijinallik artık bir soru işareti değil, daimi garantidir.'
                }
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-[9px] font-mono tracking-widest text-[#9E7D4E] uppercase font-bold">
                  <span>✦</span>
                  <span>{language === 'en' ? 'CIRCULAR LUXURY INITIATIVE' : 'DÖNGÜSEL LÜKS STANDARDI'}</span>
                </span>
              </div>
            </div>

            {/* Right Column: Editorial Craft Photograph Frame */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-stone-300/60 group">
                <Image 
                  src="/manifesto_detail.png" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                  alt="Maison Craftsmanship"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                
                <div className="absolute bottom-5 left-5 right-5 z-20 text-white flex justify-between items-end">
                  <div>
                    <p className="text-[8px] font-mono uppercase tracking-widest text-[#E2C79E]">PEONY LAB & APPRAISAL</p>
                    <h4 className="text-sm font-playfair italic">Provenance & Authenticity</h4>
                  </div>
                  <span className="text-[9px] font-mono font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    100% VERIFIED
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── CURATED FOCUS: TABBED SEASONAL & SMART LUXURY SELECTIONS (REAL PRODUCTS) ─── */}
      <section className="py-20 lg:py-28 bg-[#FAF9F7] border-b border-stone-200/80">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* Tab Selector */}
          <div className="flex justify-center mb-14 border-b border-stone-200">
            <div className="flex gap-8 sm:gap-12">
              <button 
                onClick={() => setCuratedTab('seasonal')}
                className={`pb-4 text-xs tracking-[0.25em] uppercase font-mono transition-all border-b-2 cursor-pointer ${
                  curatedTab === 'seasonal' 
                    ? 'border-[#9E7D4E] text-stone-900 font-bold' 
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                {language === 'en' ? 'SEASONAL EDITORIAL CURATION' : 'MEVSİMSEL EDİTORYAL SEÇKİ'}
              </button>
              <button 
                onClick={() => setCuratedTab('smart')}
                className={`pb-4 text-xs tracking-[0.25em] uppercase font-mono transition-all border-b-2 cursor-pointer ${
                  curatedTab === 'smart' 
                    ? 'border-[#9E7D4E] text-stone-900 font-bold' 
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                {language === 'en' ? 'SMART LUXURY VAULT' : 'AKILLI LÜKS & YATIRIM SEÇKİSİ'}
              </button>
            </div>
          </div>

          {/* Tab 1: Seasonal Curation (Real DB Items) */}
          {curatedTab === 'seasonal' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#9E7D4E] bg-[#9E7D4E]/10 px-3.5 py-1.5 rounded-full inline-block">
                  {language === 'en' ? 'EDITORIAL SPOTLIGHT' : 'EDİTÖRÜN MERCEĞİ'}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair tracking-tight leading-[1.1] text-stone-900">
                  {language === 'en'
                    ? 'Timeless Icons: Balance of Desire & Heritage'
                    : 'Zamansız İkonlar: Zarafet ve Arzunun Dengesi'
                  }
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  {language === 'en'
                    ? 'Handcrafted leather heritage meets verified horological mastery. Explore the most coveted circular archive pieces authenticated by 32-point microscopic AI standards.'
                    : 'Usta deri işçiliği, onaylı saatçilik mirasıyla buluşuyor. 32 noktalı mikroskobik yapay zeka standartlarıyla güvenceye alınan en seçkin arşiv parçalarını keşfedin.'
                  }
                </p>
                <div className="pt-2">
                  <Link 
                    href="#collection" 
                    className="inline-flex items-center gap-2 bg-stone-900 text-white px-7 py-3.5 hover:bg-[#9E7D4E] rounded-full transition-all text-[10px] font-mono tracking-widest uppercase font-bold shadow-lg"
                  >
                    <span>{language === 'en' ? 'EXPLORE CURATED ARCHIVE →' : 'SEÇKİYİ İNCELE →'}</span>
                  </Link>
                </div>
              </div>

              {/* Real Database Products in Editorial Frame */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.filter(p => Array.isArray(p.public_images) && p.public_images.length > 0).slice(0, 2).map((prod, idx) => (
                  <div key={prod.id} className={`space-y-3 ${idx === 1 ? 'sm:mt-8' : ''}`}>
                    <Link href={`/product/${prod.id}`} className="block group">
                      <div className="relative aspect-[3/4] overflow-hidden bg-white border border-stone-300/80 group-hover:border-[#9E7D4E]/50 rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-500">
                        <Image 
                          src={prod.public_images[0]}
                          fill
                          sizes="(max-width: 640px) 100vw, 30vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          alt={prod.model_name}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="text-[8px] font-mono uppercase tracking-widest bg-stone-900/80 backdrop-blur-md px-2.5 py-1 text-[#E2C79E] rounded-full">
                            {prod.category || 'ARCHIVE'}
                          </span>
                        </div>
                      </div>
                      <div className="text-center pt-3 space-y-0.5">
                        <p className="text-[9px] font-mono font-bold tracking-widest text-[#9E7D4E] uppercase">{prod.brand}</p>
                        <h4 className="text-sm font-playfair italic text-stone-900 group-hover:text-[#9E7D4E] transition-colors truncate">{prod.model_name}</h4>
                        <p className="text-xs font-mono font-bold text-stone-900">{formatPrice(prod.price || 0)}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Smart Luxury (Real Bags/Items Under 25k) */}
          {curatedTab === 'smart' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 bg-white p-8 border border-stone-200 rounded-3xl shadow-sm flex flex-col justify-between min-h-[320px]">
                <div className="space-y-4">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#9E7D4E]">CURATOR&apos;S VAULT NOTE</span>
                  <h3 className="text-2xl font-playfair italic text-stone-900 leading-tight">
                    {language === 'en' ? 'Smart Luxury: Accessible Value & Icons' : 'Akıllı Lüks: Ulaşılabilir İkonlar'}
                  </h3>
                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {language === 'en'
                      ? 'Pre-loved designer pieces curated for timeless daily elegance, retaining strong long-term circular investment value.'
                      : 'Küratörlerimizin seçtiği, günlük kullanıma uygun ve döngüsel değerini daima koruyan ulaşılabilir tasarımcı parçaları.'
                    }
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200">
                  <Link href="#collection" className="text-[9px] font-mono font-bold tracking-widest uppercase text-stone-900 hover:text-[#9E7D4E] inline-flex items-center gap-1.5 transition-colors">
                    <span>{language === 'en' ? 'VIEW ALL SMART LUXURY →' : 'TÜM SEÇKİYİ İNCELE →'}</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {(displayBagsUnder15k.length > 0 ? displayBagsUnder15k.slice(0, 3) : products.slice(2, 5)).map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ─── SHOP BY CATEGORY: HIGH-FASHION MOODBOARDS ─── */}
      <section id="categories" className="py-20 lg:py-28 bg-white border-b border-stone-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-14 space-y-2">
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#9E7D4E]">MAISON ARCHIVES</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair text-stone-900 tracking-tight">
              {language === 'en' ? 'Shop by Category' : 'Kategorilere Göre Keşfedin'}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {dynamicCategoryCards.map((cat) => (
              <Link 
                key={cat.title}
                href={gender ? `/?gender=${gender}&category=${cat.title}#collection` : cat.href} 
                className="group relative overflow-hidden block w-full aspect-[4/5] bg-stone-900 rounded-3xl shadow-lg border border-stone-200/80 hover:border-[#9E7D4E]/60 transition-all duration-500"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-all duration-500" />
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#E2C79E]">{cat.subtitle}</p>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-playfair italic text-white group-hover:-translate-y-0.5 transition-transform duration-300">
                    {cat.title === 'Çanta' ? t('category.bags', 'Çanta') : cat.title === 'Kıyafet' ? t('category.clothing', 'Kıyafet') : cat.title === 'Ayakkabı' ? t('category.shoes', 'Ayakkabı') : t('category.accessories', 'Aksesuar & Saat')}
                  </h3>
                  <p className="text-[8px] text-stone-300 font-mono tracking-wider">{cat.featuredBrand}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THE EDIT - CURATED COLLECTION */}
      <section id="collection" className="py-24 bg-[#F9F9F8] min-h-screen scroll-mt-12">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          
          {/* Header & Main Dropdowns */}
          <div className="mb-10 space-y-8 border-b border-gray-200/80 pb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
              <div className="w-full lg:w-auto">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#AF9164]">CURATED COLLECTION</span>
                  <span className="w-8 h-[1px] bg-[#AF9164]/40" />
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl serif-display tracking-tight text-[#1A1A1A] mt-1 sm:mt-2">
                  The <span className="italic">Edit</span>
                </h2>
              </div>
              
              {/* Quick Selectors Toolbar (Compact on Mobile: 2x2 grid on mobile, inline on desktop) */}
              <div className="grid grid-cols-2 lg:flex lg:flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
                {/* Gender Selector */}
                <CustomSelect
                  value={selectedGender || ''}
                  placeholder={t('edit.allGenders', 'Cinsiyet')}
                  options={genderFilters.map(g => ({ value: g.value, label: g.label }))}
                  onChange={(val) => {
                    setSelectedGender(val || null)
                  }}
                />
                
                {/* Brand Selector */}
                <CustomSelect
                  value={selectedBrand || ''}
                  placeholder={t('edit.allBrands', 'Marka')}
                  options={brands.map(b => ({ value: b, label: b }))}
                  onChange={(val) => {
                    setSelectedBrand(val || null)
                  }}
                />

                {/* Price Range Selector */}
                <CustomSelect
                  value={selectedPriceRange || 'all'}
                  placeholder={t('edit.priceRange', 'Fiyat')}
                  options={priceRangeOptions}
                  onChange={(val) => {
                    setSelectedPriceRange(val === 'all' ? null : val)
                  }}
                />

                {/* Sort Option Selector */}
                <CustomSelect
                  value={sortOption}
                  placeholder={t('edit.sort', 'Sıralama')}
                  options={sortOptions}
                  onChange={(val) => {
                    setSortOption(val as any)
                  }}
                />
              </div>
            </div>

            {/* 1. AKILLI KÜRASYON TEMALARI (Peony Muse Curated Edits) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-stone-500 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#9E7D4E]" /> {language === 'en' ? 'CURATOR EDITS & THEMES' : 'KÜRATÖR TEMALARI & STİLLER'}
                </span>
                {selectedTheme && (
                  <button
                    onClick={() => setSelectedTheme(null)}
                    className="text-[10px] font-mono text-stone-400 hover:text-stone-900 transition-colors underline cursor-pointer"
                  >
                    {language === 'en' ? 'Reset Theme' : 'Temayı Kaldır'}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-1">
                {curationThemes.map((theme) => {
                  const isSelected = selectedTheme === theme.id
                  return (
                    <button
                      key={theme.label}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[8.5px] sm:text-[9px] font-mono tracking-wider uppercase border transition-all duration-300 rounded-full cursor-pointer shrink-0 flex items-center gap-1.5 sm:gap-2 ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 font-bold shadow-md shadow-black/10 scale-[1.02]'
                          : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900 hover:border-stone-900'
                      }`}
                    >
                      <span>{theme.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 1.5. HIZLI MARKA HAPLARI (Quick Brand Pills) */}
            <div className="space-y-2 pt-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-1">
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`px-3 sm:px-3.5 py-1 sm:py-1.5 text-[8px] sm:text-[8.5px] font-mono tracking-widest uppercase border rounded-full transition-all cursor-pointer shrink-0 ${
                    !selectedBrand
                      ? 'bg-[#9E7D4E] text-white border-[#9E7D4E] font-bold shadow-sm'
                      : 'bg-stone-100 text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {language === 'en' ? 'ALL HOUSES' : 'TÜM MARKALAR'}
                </button>
                {['Hermès', 'Chanel', 'Louis Vuitton', 'Bottega Veneta', 'Cartier', 'Prada', 'Dior', 'Goyard'].map((b) => {
                  const isSelected = selectedBrand === b
                  return (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(isSelected ? null : b)}
                      className={`px-3 sm:px-3.5 py-1 sm:py-1.5 text-[8px] sm:text-[8.5px] font-mono tracking-widest uppercase border rounded-full transition-all cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-[#9E7D4E] text-white border-[#9E7D4E] font-bold shadow-sm'
                          : 'bg-white text-stone-700 border-stone-200/80 hover:border-[#9E7D4E] hover:text-[#9E7D4E]'
                      }`}
                    >
                      {b}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. KATEGORİ & DİNAMİK ALT KATEGORİ SEÇİCİ */}
            <div className="pt-2 space-y-4">
              {/* Ana Kategori Sekmeleri */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200/60 pb-3">
                {mainCategoryTabs.map((cat) => {
                  const isSelected = selectedCategory === cat.id
                  return (
                    <button
                      key={cat.label}
                      onClick={() => {
                        setSelectedCategory(cat.id)
                        setSelectedSubcategory(null)
                        if (typeof window !== 'undefined') {
                          if (cat.id) {
                            window.history.replaceState(null, '', `/?category=${encodeURIComponent(cat.id)}#collection`)
                          } else {
                            window.history.replaceState(null, '', '/#collection')
                          }
                        }
                      }}
                      className={`text-xs tracking-widest uppercase pb-2 px-3 transition-all relative font-medium ${
                        isSelected
                          ? 'text-black font-bold'
                          : 'text-gray-400 hover:text-black'
                      }`}
                    >
                      {cat.label}
                      {isSelected && (
                        <motion.div
                          layoutId="categoryIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#AF9164]"
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Dinamik Alt Kategoriler (Sadece Kategori Seçiliyse veya Tümü ise) */}
              <AnimatePresence mode="wait">
                {selectedCategory && subcategoryMap[selectedCategory] && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-wrap items-center gap-2 pt-1"
                  >
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 mr-2 font-semibold">
                      {t('filter.subCategory', 'Alt Kategori:')}
                    </span>
                    <button
                      onClick={() => setSelectedSubcategory(null)}
                      className={`text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-md border transition-all ${
                        !selectedSubcategory
                          ? 'bg-[#AF9164]/15 border-[#AF9164] text-[#AF9164] font-bold'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {t('filter.all', 'Tümü')}
                    </button>
                    {subcategoryMap[selectedCategory].map((subcat) => {
                      const isSubSelected = selectedSubcategory === subcat
                      return (
                        <button
                          key={subcat}
                          onClick={() => setSelectedSubcategory(isSubSelected ? null : subcat)}
                          className={`text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-md border transition-all ${
                            isSubSelected
                              ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white font-bold'
                              : 'bg-white text-gray-600 border-gray-200 hover:text-black hover:border-black'
                          }`}
                        >
                          {subcat}
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* MUSE STİL & KÜRASYON BİLGİ KARTI (Aktif Tema Varsa) */}
          {currentThemeObj && currentThemeObj.id && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 bg-gradient-to-r from-[#FAF6F0] via-[#FAF8F5] to-white border border-[#AF9164]/30 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#AF9164]/10 border border-[#AF9164]/30 flex items-center justify-center text-xs font-bold text-[#AF9164] shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AF9164]">PEONY MUSE KÜRASYONU</span>
                    <span className="text-xs text-gray-400">•</span>
                    <h4 className="text-sm font-bold text-gray-900">{currentThemeObj.label}</h4>
                  </div>
                  <p className="text-xs text-gray-600 font-light mt-0.5 max-w-2xl leading-relaxed">
                    {currentThemeObj.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setMuseInput(`Bana ${currentThemeObj.label} için bu seçkiden en uygun kombin önerilerini yapar mısın?`)
                  setIsMuseOpen(true)
                }}
                className="sans-detail shrink-0 flex items-center gap-2 text-[9px] tracking-widest uppercase bg-[#1A1A1A] text-white px-5 py-2.5 rounded-full hover:bg-[#AF9164] transition-all font-bold"
              >
                <Sparkles size={12} className="text-[#AF9164]" />
                Muse ile Kombinle
              </button>
            </motion.div>
          )}

          {/* AKTİF FİLTRELER & CANLI SAYAÇ BARI */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-light text-xs">
                {t('filter.totalCount', 'Toplam')}{' '}
                <strong className="font-semibold text-black">{totalCatalogCount}</strong>{' '}
                {t('filter.archivePieces', 'arşiv parçasından')}{' '}
                <strong className="font-bold text-[#AF9164]">{displayProducts.length}</strong>{' '}
                {t('filter.piecesListed', 'tanesi listeleniyor')}
              </span>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t('filter.active', 'Aktif:')}</span>
                
                {selectedTheme && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-[#AF9164] text-[#AF9164] text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
                    {currentThemeObj?.label}
                    <button onClick={() => setSelectedTheme(null)} className="hover:text-black">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedCategory && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-gray-300 text-black text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full">
                    {selectedCategory}
                    <button onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedSubcategory && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-gray-300 text-black text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full">
                    {selectedSubcategory}
                    <button onClick={() => setSelectedSubcategory(null)} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedBrand && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-[#AF9164] text-[#AF9164] text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
                    {selectedBrand}
                    <button onClick={() => setSelectedBrand(null)} className="hover:text-black">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedGender && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-gray-300 text-black text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full">
                    {selectedGender}
                    <button onClick={() => setSelectedGender(null)} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedPriceRange && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-gray-300 text-black text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full">
                    {priceRangeOptions.find(p => p.value === selectedPriceRange)?.label}
                    <button onClick={() => setSelectedPriceRange(null)} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {sortOption !== 'featured' && (
                  <span className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-700 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {sortOptions.find(s => s.value === sortOption)?.label}
                    <button onClick={() => setSortOption('featured')} className="hover:text-black">
                      <X size={12} />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-black uppercase tracking-widest font-semibold ml-2 underline transition-colors"
                >
                  <RotateCcw size={11} /> {t('filter.clearAll', 'Sıfırla')}
                </button>
              </div>
            )}
          </div>

          {/* ÜRÜN LİSTESİ VEYA BOŞ DURUM */}
          {!displayProducts || displayProducts.length === 0 ? (
            <div className="py-24 text-center bg-white border border-gray-100 rounded-3xl p-12 max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
                <Filter size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl serif-display italic text-gray-900">Bu filtre kombinasyonuna uygun parça bulunamadı.</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Filtrelerinizi genişleterek veya temayı değiştirerek 270+ parçalık koleksiyonumuzdaki diğer lüks tasarımları keşfedebilirsiniz.
              </p>
              <div className="pt-4">
                <button
                  onClick={clearAllFilters}
                  className="sans-detail px-8 py-3 bg-[#1A1A1A] text-white hover:bg-[#AF9164] transition-all text-[10px] tracking-widest uppercase font-bold rounded-full"
                >
                  {t('filter.clearFilters', 'Filtreleri Temizle')}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-10 sm:gap-y-14">
                {displayProducts.slice(0, homeDisplayLimit).map((p, i) => (
                  <FadeIn key={p.id} delay={i % 4 * 0.08} direction="up">
                    <ProductCard product={p} />
                  </FadeIn>
                ))}
              </div>
              
              <div className="mt-14 sm:mt-20 flex flex-col items-center gap-4">
                <Link 
                  href={selectedCategory ? `/catalog?category=${encodeURIComponent(selectedCategory)}` : '/catalog'}
                  className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#1A1D24] hover:bg-[#9E7D4E] text-white text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-md hover:shadow-xl group cursor-pointer"
                >
                  <span>{t('home.exploreAllCatalog', `TÜM ARŞİVİ KEŞFET (${totalCatalogCount} PARÇA)`)}</span>
                  <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
                
                <p className="text-xs text-stone-400 font-light">
                  {Math.min(homeDisplayLimit, displayProducts.length)} / {totalCatalogCount} {t('filter.showingItems', 'parça gösteriliyor')}
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ─── PEONY GAZETTE & EDITORIAL MAGAZINE TEASER SECTION ─── */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-[#F9F9F8] to-[#14161C] border-t border-stone-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="bg-[#121318] text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-[#C2A676]/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#C2A676] bg-[#C2A676]/15 border border-[#C2A676]/30 px-3 py-1 rounded-full">
                    ÉDITION SPÉCIALE • SAYI 01
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-[10px] font-mono text-zinc-400">10 SAYFALIK İNTERAKTİF DERGİ</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-playfair tracking-tight text-white leading-tight">
                  Peony <span className="italic text-[#C2A676]">Gazette</span>
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-xl">
                  {language === 'en'
                    ? 'Explore our monthly curated luxury journal: archival Hermès & Cartier valuation reports, haute horology guides, and exclusive shoppable lookbooks.'
                    : 'Aylık dijital lüks ve koleksiyon dergimiz yayında: Arşiv Hermès ve Cartier değerleme raporları, lüks saatçilik kılavuzu ve doğrudan satın alınabilir editoryal lookbook sayfaları.'
                  }
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/magazine"
                    className="px-8 py-4 bg-[#C2A676] hover:bg-[#D4B98A] text-black font-bold text-xs font-mono uppercase tracking-[0.2em] rounded-full transition-all shadow-xl shadow-[#C2A676]/20 flex items-center gap-2"
                  >
                    <span>{language === 'en' ? 'READ ISSUE Nº 01' : 'SAYI 01’İ ŞİMDİ OKU'}</span>
                    <ArrowRight size={14} />
                  </Link>

                  <span className="text-[10px] font-mono text-zinc-500">
                    {language === 'en' ? 'Interactive Page Reader' : 'İnteraktif Sayfa Çevirme Deneyimi'}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[4/5] max-w-sm mx-auto w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
                <Image
                  src="/hero_banner.png"
                  alt="Peony Gazette Cover"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[8px] font-mono tracking-widest text-[#E2C79E]">THE HERITAGE VAULT</span>
                  <h3 className="text-2xl font-playfair italic">Peony Magazine Vol. I</h3>
                  <p className="text-[10px] text-zinc-400 font-mono">Eylül 2026 • 10 Sayfa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE TRUST HUB: MERGED TABBED SYSTEM FOR LAB, ENTRUPY, CERTIFICATE, STORIES, AND PROCESS */}
      <section className="py-20 md:py-28 bg-[#1A1A1A] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#AF9164]">PEONY STANDARDS</span>
            <h2 className="text-3xl md:text-5xl serif-display leading-tight">
              {t('trust.title', 'Güven Zinciri & Ekspertiz')}
            </h2>
            
            {/* Trust Tabs Selector */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-6">
              {[
                { id: 'how', label: language === 'en' ? 'HOW IT WORKS' : 'NASIL ÇALIŞIR?' },
                { id: 'lab', label: language === 'en' ? 'PEONY LAB & ENTRUPY AI' : 'PEONY LAB & ENTRUPY AI' },
                { id: 'certificate', label: language === 'en' ? 'CERTIFICATE OF AUTHENTICITY' : 'ORİJİNALLİK SERTİFİKASI' },
                { id: 'stories', label: language === 'en' ? 'PROVENANCE STORIES' : 'OBJELERİN HİKAYESİ' },
              ].map((tItem) => (
                <button
                  key={tItem.id}
                  onClick={() => setTrustTab(tItem.id as any)}
                  className={`px-5 py-2.5 text-[9px] md:text-[10px] font-mono tracking-widest uppercase border rounded-full transition-all duration-300 cursor-pointer ${
                    trustTab === tItem.id
                      ? 'bg-[#9E7D4E] text-white border-[#9E7D4E] font-bold shadow-md shadow-[#9E7D4E]/20'
                      : 'bg-white/5 text-stone-400 border-white/15 hover:text-white hover:border-white/40'
                  }`}
                >
                  {tItem.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content: How It Works */}
          {trustTab === 'how' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: language === 'en' ? 'Consignor Application' : 'Satıcı Başvurusu', desc: language === 'en' ? 'Upload photos through our 4-step concierge wizard. Receive estimated appraisal within 24h.' : '4 adımlı konsinye formumuzdan parçanızı yükleyin; 24 saatte ön ekspertiz değerlemesini alın.', icon: '↑' },
                { step: '02', title: language === 'en' ? 'VIP White-Glove Courier' : 'VIP Sigortalı Kurye', desc: language === 'en' ? 'Buyer payment secured in escrow. VIP private courier collects item from your doorstep in İstanbul.' : 'Alıcı ödemesi güvenceye alınır. Özel kuryemiz parçayı İstanbul içi adresinizden tutanakla teslim alır.', icon: '⟳' },
                { step: '03', title: language === 'en' ? '32-Point AI Audit' : '32 Nokta Lab Ekspertizi', desc: language === 'en' ? 'Microscopic texture analysis & Entrupy AI validation verified by certified specialists.' : 'Mikroskobik lif analizi ve Entrupy AI optik taraması uzman eksperlerimizce tamamlanır.', icon: '⊕' },
                { step: '04', title: language === 'en' ? 'Delivery & Payout' : 'Teslimat & Hakediş', desc: language === 'en' ? 'Authenticated luxury piece delivered with embossed certificate. Payout wired on T+1.' : 'Sertifikalı parça alıcıya ulaştırılır; hakedişiniz T+1 iş gününde doğrudan banka hesabınıza geçer.', icon: '✓' },
              ].map((item) => (
                <div key={item.step} className="text-center group bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#9E7D4E]/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4 bg-white/5 text-[#E2C79E]">
                    <span className="text-lg font-mono">{item.icon}</span>
                  </div>
                  <p className="font-mono text-[#E2C79E] mb-1 text-xs font-bold">{item.step}</p>
                  <h3 className="text-base font-playfair italic text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-stone-300 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Peony Lab & Entrupy */}
          {trustTab === 'lab' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-[#E2C79E] block">
                    {language === 'en' ? 'MICROSCOPIC VERIFICATION LAB' : 'MİKROSKOBİK EKSPERTİZ LABORATUVARI'}
                  </span>
                  <h3 className="text-3xl font-playfair italic text-white">
                    Peony <span className="text-[#E2C79E]">Lab™ & Entrupy™</span>
                  </h3>
                  <p className="text-stone-300 font-light text-xs sm:text-sm leading-relaxed">
                    {language === 'en' 
                      ? 'Every luxury piece undergoes microscopic fiber analysis, hardware metallurgical scanning, and a 32-point physical audit backed by certified Entrupy technology.'
                      : 'Her lüks parça; insan gözünün göremediği mikroskobik düzeyde deri gözenek analizi, dikiş geometrisi, metalurji spektrogramı ve 32 noktalı fiziksel ekspertizden geçirilir.'
                    }
                  </p>
                  <div className="border border-white/15 px-5 py-3 rounded-xl inline-flex items-center gap-3 bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-white">
                      {language === 'en' ? 'OFFICIAL ENTRUPY™ VERIFICATION' : 'RESMİ ENTRUPY™ & 32 NOKTALI EKSPERTİZ STANDARDI'}
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 shadow-xl">
                    <Image src="/manifesto_detail.png" fill sizes="30vw" className="object-cover opacity-85" alt="Micro Stitching" />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 shadow-xl">
                    <Image src="/hero_banner.png" fill sizes="30vw" className="object-cover opacity-85" alt="Serial Check" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                {[
                  { title: language === 'en' ? 'Microscopic Texture Scan' : 'Mikroskobik Doku Taraması', desc: language === 'en' ? 'Pore pattern and grain alignment matched against global reference databases.' : 'Deri gözenek yapısı ve lif yoğunluğu küresel arşiv referanslarıyla eşleştirilir.', stat: '32 NOKTA' },
                  { title: language === 'en' ? 'Hardware & Engraving Analysis' : 'Metalurji & Damga Analizi', desc: language === 'en' ? 'Font depth, metallurgical weight, and zipper engravings verified under macro optics.' : 'Fermuar, toka ve seri damgalarının mikron hassasiyetinde lazer analizi yapılır.', stat: 'ENTRUPY' },
                  { title: language === 'en' ? 'Embossed Physical Passport' : 'Fiziksel Tescilli Sertifika', desc: language === 'en' ? 'Official Certificate of Authenticity issued for every verified circular archive piece.' : 'Onaylanan her parçaya ömür boyu orijinallik garantisi sağlayan ıslak imzalı tescil belgesi.', stat: '100% GARANTİ' },
                ].map((tech) => (
                  <div key={tech.title} className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-2">
                    <span className="text-[9px] font-mono font-bold text-[#E2C79E] tracking-widest">{tech.stat}</span>
                    <h4 className="text-sm font-playfair italic text-white">{tech.title}</h4>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">{tech.desc}</p>
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
                  {language === 'en' ? 'Physical Certificate of Authenticity' : 'Fiziksel Orijinallik Sertifikası'}
                </h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">
                  {language === 'en'
                    ? 'All items verified by Peony Lab™ are delivered with an embossed physical Certificate of Authenticity. This document guarantees genuine luxury heritage for life.'
                    : 'Peony Lab™ tarafından onaylanan tüm ürünler, alıcıya özel tescillenmiş fiziki Orijinallik Sertifikası ile gönderilir. Bu sertifika, ürünün orijinalliğini ömür boyu garanti altına alır ve değer koruma sağlar.'
                  }
                </p>
                <div className="flex gap-2">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-white bg-white/10 px-3 py-1.5 rounded">
                    {language === 'en' ? '✓ QR Tracking' : '✓ QR Kodlu Takip'}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-wider text-white bg-white/10 px-3 py-1.5 rounded">
                    {language === 'en' ? '✓ Hand-Signed' : '✓ Islak İmzalı'}
                  </span>
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
                      <span>{language === 'en' ? 'BRAND:' : 'MARKA:'}</span>
                      <span className="font-bold text-gray-900">HERMÈS</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-0.5">
                      <span>MODEL:</span>
                      <span className="font-bold text-gray-900">Kelly 28 Togo</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-0.5">
                      <span>{language === 'en' ? 'METHOD:' : 'METOD:'}</span>
                      <span className="font-bold text-gray-900">32-Point & Entrupy™</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end border-t border-gray-100 pt-2 text-[6px]">
                    <div className="text-gray-400">
                      <p>PEONY LAB™ APPROVED</p>
                      <p className="font-mono">ID: #920-XF8</p>
                    </div>
                    <div className="text-gray-800 italic font-serif">{language === 'en' ? 'Curator Signature' : 'Küratör İmzası'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Stories */}
          {trustTab === 'stories' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {provenanceStories.map((item, idx) => {
                const p = item.product
                const firstImg = Array.isArray(p.public_images) && p.public_images.length > 0 
                  ? p.public_images[0] 
                  : 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600'
                
                return (
                  <Link 
                    key={p.id || idx} 
                    href={`/product/${p.id}`}
                    className="group border border-white/10 bg-white/5 rounded-2xl overflow-hidden hover:border-[#AF9164]/60 transition-all duration-500 flex flex-col justify-between block"
                  >
                    <div>
                      <div className="relative aspect-[16/11] overflow-hidden bg-white/10">
                        <Image 
                          src={firstImg} 
                          alt={p.model_name} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 33vw" 
                          className="object-cover group-hover:scale-105 transition-all duration-700" 
                        />
                        <div className="absolute top-3 right-3">
                          <span className="text-[8px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-1 text-white rounded-full border border-white/10">
                            {language === 'en' ? 'VERIFIED' : 'DOĞRULANDI'}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div>
                          <p className="text-[10px] font-bold text-[#AF9164] uppercase tracking-widest">{p.brand}</p>
                          <h4 className="text-sm serif-display italic text-white truncate">{p.model_name}</h4>
                        </div>
                        <p className="text-xs text-stone-300 font-light leading-relaxed italic border-l border-[#AF9164]/40 pl-3">
                          &ldquo;{language === 'en' ? item.quoteEn : item.quoteTr}&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2">
                      <div className="flex justify-between items-center text-[11px] pt-3 border-t border-white/10">
                        <span className="text-stone-400 font-mono text-[10px] uppercase">{language === 'en' ? 'Appraised Price' : 'Eksper Bedeli'}</span>
                        <span className="font-bold text-white tracking-wide">{formatPrice(p.price || 0)}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

        </div>
      </section>

      {/* SELL WITH US: PREMIER LUXURY CONCIERGE & FOUNDER PROGRAM */}
      <section className="py-24 bg-[#0F1014] text-white relative overflow-hidden border-t border-stone-800">
        {/* Subtle Luxury Ambient Glow */}
        <div className="absolute -left-32 top-0 w-96 h-96 bg-[#9E7D4E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-32 bottom-0 w-96 h-96 bg-[#9E7D4E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center mb-14 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#AF9164] block font-mono">
              {language === 'en' ? 'PARTNER WITH PEONY' : 'PEONY İLE İŞ BİRLİĞİ'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-playfair tracking-tight text-white leading-tight">
              {language === 'en' ? 'Turn Luxury Into Liquidity' : 'Lüksünüzü Likiditeye Dönüştürün'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Consign your pre-loved luxury timepieces, designer bags, and archive pieces through our private VIP client desk.'
                : 'Kullanmadığınız lüks çantalarınızı, mücevher ve saatlerinizi kurucu tedarikçi avantajlarıyla en yüksek piyasa değerinde değerlendirin.'
              }
            </p>
            
            {/* Sell Option Toggles */}
            <div className="flex justify-center gap-3 pt-6">
              <button 
                onClick={() => setSellTab('founder')}
                className={`px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 rounded-full border cursor-pointer font-bold ${
                  sellTab === 'founder'
                    ? 'bg-[#9E7D4E] text-white border-[#9E7D4E] shadow-lg shadow-[#9E7D4E]/20'
                    : 'bg-white/5 text-stone-400 border-white/10 hover:border-white/40 hover:text-white'
                }`}
              >
                {language === 'en' ? 'FOUNDING SUPPLIER (0%)' : 'KURUCU TEDARİKÇİ (%0)'}
              </button>
              <button 
                onClick={() => setSellTab('vip')}
                className={`px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 rounded-full border cursor-pointer font-bold ${
                  sellTab === 'vip'
                    ? 'bg-[#9E7D4E] text-white border-[#9E7D4E] shadow-lg shadow-[#9E7D4E]/20'
                    : 'bg-white/5 text-stone-400 border-white/10 hover:border-white/40 hover:text-white'
                }`}
              >
                {language === 'en' ? 'PEONY VIP CONCIERGE' : 'PEONY VIP CONCIERGE'}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {sellTab === 'founder' ? (
              <motion.div 
                key="founder"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-stone-900/90 via-[#181A20] to-[#121318] border border-stone-700/60 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E7D4E]/20 border border-[#9E7D4E]/40 text-[#D4AF37] text-[9px] font-bold tracking-widest uppercase">
                      <Sparkles size={11} />
                      <span>{language === 'en' ? 'SPECIAL LAUNCH PRIVILEGE' : 'ÖZEL LANSMAN AVANTAJI'}</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-playfair text-white leading-tight">
                      {language === 'en' ? '0% Commission Rates for Founding Consignors' : '%0\'dan Başlayan Lansman Komisyon Oranları'}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-2xl">
                      {language === 'en'
                        ? 'Join our select founding supplier circle during the launch window. Maximize the return on your luxury assets with priority appraisal and zero hidden fees.'
                        : 'Peony lansman dönemine özel sınırlı sayıdaki kurucu tedarikçiden biri olun; lüks arşiv parçalarınızı en yüksek eksper değeriyle ve sıfır komisyon avantajıyla nakde dönüştürün.'
                      }
                    </p>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                        <span className="text-xs font-bold text-[#D4AF37] font-mono">%0</span>
                        <h5 className="text-xs font-semibold text-white">{language === 'en' ? 'Zero Platform Fee' : 'Sıfır Platform Kesintisi'}</h5>
                        <p className="text-[10px] text-stone-400">{language === 'en' ? 'First 50 items' : 'İlk 50 ürüne özel'}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                        <span className="text-xs font-bold text-[#D4AF37] font-mono">T+1</span>
                        <h5 className="text-xs font-semibold text-white">{language === 'en' ? 'Fast Payout' : 'Hızlı Hakediş'}</h5>
                        <p className="text-[10px] text-stone-400">{language === 'en' ? 'Direct bank wire' : 'Doğrudan hesaba transfer'}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                        <span className="text-xs font-bold text-[#D4AF37] font-mono">100%</span>
                        <h5 className="text-xs font-semibold text-white">{language === 'en' ? 'Insured Escrow' : 'Sigortalı Güvence'}</h5>
                        <p className="text-[10px] text-stone-400">{language === 'en' ? 'Doorstep courier' : 'Sigortalı kurye koruması'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-4">
                    <Link 
                      href="/sell" 
                      className="w-full sm:w-auto px-10 py-4 bg-[#9E7D4E] hover:bg-[#B38F5A] text-white transition-all text-xs tracking-[0.2em] uppercase font-bold rounded-full shadow-xl shadow-[#9E7D4E]/25 text-center cursor-pointer"
                    >
                      {language === 'en' ? 'APPLY AS FOUNDER' : 'HEMEN BAŞVURUN'}
                    </Link>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {language === 'en' ? 'Instant appraisal in 24 hours' : '24 saatte eksper değerlemesi'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="vip"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-stone-900/90 via-[#181A20] to-[#121318] border border-[#9E7D4E]/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E7D4E]/20 border border-[#9E7D4E]/40 text-[#D4AF37] text-[9px] font-bold tracking-widest uppercase">
                      <ShieldCheck size={11} />
                      <span>{language === 'en' ? 'WHITE GLOVE CONCIERGE' : 'VIP KAPIYA TESLİM HİZMETİ'}</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-playfair text-white leading-tight">
                      {language === 'en' ? 'Effortless Selling with Peony VIP' : 'Peony VIP ile Uçtan Uca Zahmetsiz Satış'}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-2xl">
                      {language === 'en'
                        ? 'We pick up your pieces from your doorstep via white-glove courier, handle high-resolution studio photography, expert authentication, and buyer negotiations. Once sold, funds are wired immediately to your account.'
                        : 'Ürünlerinizi evinizden özel sigortalı kuryemizle teslim alıyoruz; stüdyo fotoğraf çekimi, Entrupy ekspertizi, fiyatlandırma ve alıcı yönetimini tamamen biz üstleniyoruz.'
                      }
                    </p>

                    {/* VIP Perks */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                        <span className="text-xs font-bold text-[#D4AF37]">01</span>
                        <h5 className="text-xs font-semibold text-white">{language === 'en' ? 'White Glove Pickup' : 'Kapıdan Teslim Alma'}</h5>
                        <p className="text-[10px] text-stone-400">{language === 'en' ? 'Exclusive courier across İstanbul' : 'İstanbul genelinde özel kurye'}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                        <span className="text-xs font-bold text-[#D4AF37]">02</span>
                        <h5 className="text-xs font-semibold text-white">{language === 'en' ? 'Studio Showcase' : 'Stüdyo Çekimleri'}</h5>
                        <p className="text-[10px] text-stone-400">{language === 'en' ? 'Editorial grade' : 'Editoryal katalog çekimi'}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                        <span className="text-xs font-bold text-[#D4AF37]">03</span>
                        <h5 className="text-xs font-semibold text-white">{language === 'en' ? 'VIP Advisor' : 'Kişisel Danışman'}</h5>
                        <p className="text-[10px] text-stone-400">{language === 'en' ? 'Dedicated portfolio manager' : '7/24 birebir portföy takibi'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-4">
                    <a 
                      href={`https://wa.me/905523652093?text=${encodeURIComponent(
                        language === 'en'
                          ? 'Hello, I would like to inquire about Peony VIP Consignment and Private Client services.'
                          : 'Merhaba, Peony VIP konsinye ve satış hizmetiniz hakkında bilgi almak istiyorum.'
                      )}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-10 py-4 bg-[#9E7D4E] hover:bg-[#B38F5A] text-white transition-all text-xs tracking-[0.2em] uppercase font-bold rounded-full shadow-xl shadow-[#9E7D4E]/25 text-center cursor-pointer"
                    >
                      {language === 'en' ? 'WHATSAPP ADVISOR →' : 'WHATSAPP DANIŞMANI →'}
                    </a>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {language === 'en' ? 'Direct line to Private Client desk' : 'Özel Müşteri Masası ile doğrudan iletişim'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
          <p className="sans-detail text-[#AF9164] tracking-[0.3em] text-[10px]">
            {t('partner.treasureTag', 'UNLOCK YOUR WARDROBE\'S VALUE')}
          </p>
          <h2 className="text-3xl md:text-5xl serif-display text-white leading-tight">
            {t('partner.treasureTitle', 'Kullanmadığınız lüks, başkası için bir hazine.')}
          </h2>
          <Link href="/sell" className="inline-block px-10 py-4 bg-white text-black hover:bg-[#AF9164] hover:text-white transition-all text-xs tracking-widest uppercase font-bold shadow-2xl rounded-full">
            {t('partner.sellNowBtn', 'HEMEN SATIŞ YAP')}
          </Link>
        </div>
      </section>

    </main>
  )
}
