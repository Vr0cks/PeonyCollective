'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  LayoutGrid, 
  Grid2X2, 
  Grid3X3, 
  ShieldCheck, 
  Sparkles, 
  Filter 
} from 'lucide-react'
import ProductCard from '@/src/components/ProductCard'
import CustomSelect from '@/src/components/CustomSelect'
import FadeIn from '@/src/components/animations/FadeIn'
import { useSettings } from '@/src/context/SettingsContext'
import { Product } from '@/src/types'

interface CatalogClientProps {
  initialProducts: Product[]
  brands: string[]
  initialBrand?: string
  initialCategory?: string
  initialSubcategory?: string
  initialGender?: string
}

const subcategoryTranslationMap: Record<string, { tr: string; en: string }> = {
  'El Çantası': { tr: 'El Çantası', en: 'Handbags & Top Handles' },
  'Crossbody': { tr: 'Çapraz Çanta (Crossbody)', en: 'Crossbody Bags' },
  'Omuz Çantası': { tr: 'Omuz Çantası', en: 'Shoulder Bags' },
  'Clutch': { tr: 'Clutch & Gece Çantası', en: 'Clutches & Evening' },
  'Sırt Çantası': { tr: 'Sırt Çantası', en: 'Backpacks' },
  'Mini Çanta': { tr: 'Mini Çanta', en: 'Mini Bags' },
  'Topuklu': { tr: 'Topuklu', en: 'Heels & Pumps' },
  'Loafer / Babet': { tr: 'Loafer / Babet', en: 'Loafers & Flats' },
  'Loafer': { tr: 'Loafer', en: 'Loafers' },
  'Babet': { tr: 'Babet', en: 'Flats' },
  'Sneaker': { tr: 'Sneaker', en: 'Luxury Sneakers' },
  'Terlik / Sandalet': { tr: 'Terlik / Sandalet', en: 'Slides & Sandals' },
  'Bot / Çizme': { tr: 'Bot / Çizme', en: 'Boots' },
  'Blazer / Ceket': { tr: 'Blazer / Ceket', en: 'Blazers & Jackets' },
  'Triko / Kazak': { tr: 'Triko / Kazak', en: 'Knitwear & Sweaters' },
  'Gömlek': { tr: 'Gömlek', en: 'Shirts & Blouses' },
  'T-Shirt / Bluz': { tr: 'T-Shirt / Bluz', en: 'Tops & T-Shirts' },
  'Mont / Kaban': { tr: 'Mont / Kaban', en: 'Coats & Outerwear' },
  'Elbise': { tr: 'Elbise', en: 'Dresses' },
  'Etek': { tr: 'Etek', en: 'Skirts' },
  'Saat': { tr: 'Saat', en: 'Timepieces' },
  'Kemer': { tr: 'Kemer', en: 'Belts' },
  'Cüzdan': { tr: 'Cüzdan', en: 'Wallets & SLG' },
  'Şal / Eşarp': { tr: 'Şal / Eşarp', en: 'Scarves & Silk' },
  'Takı': { tr: 'Takı & Mücevher', en: 'Fine Jewelry' }
}

export default function CatalogClient({
  initialProducts,
  brands,
  initialBrand,
  initialCategory,
  initialSubcategory,
  initialGender,
}: CatalogClientProps) {
  const router = useRouter()
  const { t, language } = useSettings()

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(initialSubcategory || null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialBrand || null)
  const [selectedGender, setSelectedGender] = useState<string | null>(initialGender || null)
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)
  const [brandSearchQuery, setBrandSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<'featured' | 'price_asc' | 'price_desc' | 'newest'>('featured')
  
  // UI States
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(24)

  // Sync with URL props
  useEffect(() => {
    if (initialCategory !== undefined) setSelectedCategory(initialCategory || null)
  }, [initialCategory])
  useEffect(() => {
    if (initialSubcategory !== undefined) setSelectedSubcategory(initialSubcategory || null)
  }, [initialSubcategory])
  useEffect(() => {
    if (initialBrand !== undefined) setSelectedBrand(initialBrand || null)
  }, [initialBrand])
  useEffect(() => {
    if (initialGender !== undefined) setSelectedGender(initialGender || null)
  }, [initialGender])

  // Filtered Brands for sidebar search
  const filteredBrandList = useMemo(() => {
    if (!brandSearchQuery.trim()) return brands
    return brands.filter(b => b.toLowerCase().includes(brandSearchQuery.toLowerCase().trim()))
  }, [brands, brandSearchQuery])

  // Options Definitions
  const categoriesList = useMemo(() => [
    { id: 'Çanta', label: t('category.bags', 'Çanta') },
    { id: 'Ayakkabı', label: t('category.shoes', 'Ayakkabı') },
    { id: 'Kıyafet', label: t('category.clothing', 'Kıyafet') },
    { id: 'watches', label: t('nav.watchesJewelry', 'Saat & Mücevher') },
    { id: 'Aksesuar', label: t('category.accessories', 'Aksesuar') },
  ], [t])

  const subcategoryMap: Record<string, string[]> = {
    'Ayakkabı': ['Topuklu', 'Loafer / Babet', 'Sneaker', 'Terlik / Sandalet', 'Babet', 'Bot / Çizme'],
    'Çanta': ['El Çantası', 'Crossbody', 'Omuz Çantası', 'Clutch', 'Sırt Çantası', 'Mini Çanta'],
    'Kıyafet': ['Blazer / Ceket', 'Triko / Kazak', 'Gömlek', 'T-Shirt / Bluz', 'Mont / Kaban', 'Elbise', 'Etek'],
    'watches': ['Saat'],
    'Aksesuar': ['Saat', 'Kemer', 'Cüzdan', 'Şal / Eşarp', 'Takı']
  }

  const genderList = useMemo(() => [
    { id: 'Kadın', label: language === 'en' ? 'WOMEN' : 'KADIN' },
    { id: 'Erkek', label: language === 'en' ? 'MEN' : 'ERKEK' },
    { id: 'unisex', label: language === 'en' ? 'UNISEX' : 'UNİSEX' },
  ], [language])

  const conditionList = useMemo(() => [
    { id: 'Kusursuz', label: language === 'en' ? 'Pristine / Flawless' : 'Kusursuz' },
    { id: 'Çok İyi', label: language === 'en' ? 'Excellent' : 'Çok İyi' },
    { id: 'Temiz', label: language === 'en' ? 'Great' : 'Temiz' },
    { id: 'Etiketli / Sıfır', label: language === 'en' ? 'New with Tags' : 'Etiketli / Sıfır' },
  ], [language])

  const priceRanges = useMemo(() => [
    { id: 'all', label: t('price.all', 'Tüm Fiyatlar') },
    { id: 'under15k', label: t('price.under15k', '15.000 ₺ Altı') },
    { id: '15k_35k', label: t('price.15k35k', '15.000 ₺ - 35.000 ₺') },
    { id: '35k_75k', label: t('price.35k75k', '35.000 ₺ - 75.000 ₺') },
    { id: '75k_plus', label: t('price.75kPlus', '75.000 ₺ ve Üzeri') },
  ], [t])

  const sortOptions = useMemo(() => [
    { value: 'featured', label: t('sort.featured', 'Öne Çıkanlar') },
    { value: 'price_asc', label: t('sort.priceAsc', 'Fiyat: Düşükten Yükseğe') },
    { value: 'price_desc', label: t('sort.priceDesc', 'Fiyat: Yüksekten Düşüğe') },
    { value: 'newest', label: t('sort.newest', 'En Yeniler') },
  ], [t])

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = initialProducts.filter((p) => {
      // Category
      if (selectedCategory) {
        if (selectedCategory === 'watches') {
          if (p.category !== 'watches' && p.category !== 'Saat') return false
        } else {
          if (p.category?.toLowerCase() !== selectedCategory.toLowerCase()) return false
        }
      }

      // Subcategory
      if (selectedSubcategory) {
        if (p.subcategory?.toLowerCase() !== selectedSubcategory.toLowerCase()) return false
      }

      // Brand
      if (selectedBrand) {
        if (p.brand?.toLowerCase() !== selectedBrand.toLowerCase()) return false
      }

      // Gender
      if (selectedGender) {
        if (p.gender?.toLowerCase() !== selectedGender.toLowerCase()) return false
      }

      // Condition
      if (selectedCondition) {
        if (!p.condition?.toLowerCase().includes(selectedCondition.toLowerCase())) return false
      }

      // Price Range
      if (selectedPriceRange && selectedPriceRange !== 'all') {
        const price = Number(p.price || 0)
        if (selectedPriceRange === 'under15k' && price > 15000) return false
        if (selectedPriceRange === '15k_35k' && (price <= 15000 || price > 35000)) return false
        if (selectedPriceRange === '35k_75k' && (price <= 35000 || price > 75000)) return false
        if (selectedPriceRange === '75k_plus' && price <= 75000) return false
      }

      return true
    })

    // Sort
    const sorted = [...list]
    if (sortOption === 'price_asc') {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0))
    } else if (sortOption === 'price_desc') {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0))
    } else if (sortOption === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    }

    return sorted
  }, [initialProducts, selectedCategory, selectedSubcategory, selectedBrand, selectedGender, selectedCondition, selectedPriceRange, sortOption])

  const hasActiveFilters = Boolean(
    selectedCategory ||
    selectedSubcategory ||
    selectedBrand ||
    selectedGender ||
    selectedCondition ||
    (selectedPriceRange && selectedPriceRange !== 'all')
  )

  function clearAllFilters() {
    setSelectedCategory(null)
    setSelectedSubcategory(null)
    setSelectedBrand(null)
    setSelectedGender(null)
    setSelectedCondition(null)
    setSelectedPriceRange(null)
    setBrandSearchQuery('')
    setSortOption('featured')
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/catalog')
    }
  }

  const pageMainTitle = useMemo(() => {
    if (selectedCategory) {
      const catObj = categoriesList.find(c => c.id.toLowerCase() === selectedCategory.toLowerCase())
      const catLabel = catObj ? catObj.label : selectedCategory
      return language === 'en' ? `${catLabel} Collection` : `${catLabel} Koleksiyonu`
    }
    if (selectedBrand) {
      return language === 'en' ? `${selectedBrand} Archive` : `${selectedBrand} Arşivi`
    }
    return t('catalog.title', 'Küratörlü Lüks Arşiv Kataloğu')
  }, [selectedCategory, selectedBrand, categoriesList, language, t])

  return (
    <main className="min-h-screen bg-[#FBF9F6] text-[#1A1D24]">
      
      {/* ─── Breadcrumbs & Header ─── */}
      <div className="border-b border-stone-200/70 bg-white/70 backdrop-blur-md">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-12 py-8 lg:py-12 space-y-4">
          
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">
            <Link href="/" className="hover:text-stone-900 transition-colors">PEONY</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-stone-900 transition-colors">
              {t('catalog.allProducts', 'KATALOG')}
            </Link>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-[#9E7D4E]">
                  {categoriesList.find(c => c.id.toLowerCase() === selectedCategory.toLowerCase())?.label.toUpperCase() || selectedCategory.toUpperCase()}
                </span>
              </>
            )}
            {selectedBrand && (
              <>
                <span>/</span>
                <span className="text-[#9E7D4E]">{selectedBrand.toUpperCase()}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl font-playfair tracking-tight text-[#1A1D24]">
                {pageMainTitle}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 font-light max-w-2xl leading-relaxed">
                {t('catalog.subtitle', 'Uzman onaylı, %100 orijinal ve sertifikalı ikinci el lüks arşiv koleksiyonu.')}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
              <strong className="text-stone-900 font-bold text-sm">{filteredProducts.length}</strong> {t('catalog.resultsCount', 'Seçkin Parça')}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Control Bar (Filters Button, Grid Switcher, Sort) ─── */}
      <div className="relative z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
          
          {/* Left: Mobile Filter Trigger & Active Chips */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-stone-300 text-xs font-bold uppercase tracking-wider text-stone-800"
            >
              <SlidersHorizontal size={14} />
              <span>{t('catalog.filters', 'Filtreler')}</span>
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[#9E7D4E]" />}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors"
              >
                <RotateCcw size={12} />
                <span>{t('catalog.clearAll', 'Filtreleri Sıfırla')}</span>
              </button>
            )}
          </div>

          {/* Right: Grid Switcher & Sort */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Grid Column Switcher (Desktop only) */}
            <div className="hidden lg:flex items-center gap-1 border border-stone-200 rounded-full p-1 bg-stone-50">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 rounded-full transition-all ${gridCols === 2 ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-700'}`}
                title="2 Columns"
              >
                <Grid2X2 size={15} />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-full transition-all ${gridCols === 3 ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-700'}`}
                title="3 Columns"
              >
                <Grid3X3 size={15} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-full transition-all ${gridCols === 4 ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-700'}`}
                title="4 Columns"
              >
                <LayoutGrid size={15} />
              </button>
            </div>

            {/* Sort Select */}
            <CustomSelect
              value={sortOption}
              placeholder={t('edit.sort', 'Sıralama')}
              options={sortOptions}
              onChange={(val) => setSortOption(val as any)}
            />
          </div>
        </div>
      </div>

      {/* ─── Main Catalog Content: Sidebar + Grid ─── */}
      <div className="max-w-[1700px] mx-auto px-6 lg:px-12 py-10">
        <div className="flex gap-12 items-start">
          
          {/* ─── DESKTOP STICKY SIDEBAR FILTER PANEL ─── */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-8 space-y-8 max-h-[calc(100vh-100px)] overflow-y-auto pr-3 scrollbar-none pb-12">
            
            {/* 1. Categories Accordion */}
            <div className="space-y-3 border-b border-stone-200/80 pb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 block font-mono">
                {t('catalog.categoryUpper', 'KATEGORİ')}
              </span>
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedSubcategory(null)
                  }}
                  className={`w-full text-left text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                    !selectedCategory ? 'bg-[#1A1D24] text-white' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{t('catalog.allProducts', 'Tüm Ürünler')}</span>
                  <span className="text-[10px] opacity-60 font-mono">{initialProducts.length}</span>
                </button>

                {categoriesList.map((cat) => {
                  const isCatSelected = selectedCategory?.toLowerCase() === cat.id.toLowerCase()
                  const catCount = initialProducts.filter(p => p.category?.toLowerCase() === cat.id.toLowerCase()).length
                  return (
                    <div key={cat.id} className="space-y-1">
                      <button
                        onClick={() => {
                          setSelectedCategory(isCatSelected ? null : cat.id)
                          setSelectedSubcategory(null)
                        }}
                        className={`w-full text-left text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                          isCatSelected ? 'bg-[#9E7D4E] text-white' : 'text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className="text-[10px] opacity-70 font-mono">{catCount}</span>
                      </button>

                      {/* Subcategories */}
                      {isCatSelected && subcategoryMap[cat.id] && (
                        <div className="pl-4 space-y-1 pt-1">
                          {subcategoryMap[cat.id].map((sub) => {
                            const isSubSelected = selectedSubcategory === sub
                            const displaySub = subcategoryTranslationMap[sub] 
                              ? (language === 'en' ? subcategoryTranslationMap[sub].en : subcategoryTranslationMap[sub].tr)
                              : sub
                            return (
                              <button
                                key={sub}
                                onClick={() => setSelectedSubcategory(isSubSelected ? null : sub)}
                                className={`w-full text-left text-[11px] px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                                  isSubSelected ? 'text-[#9E7D4E] font-bold bg-[#9E7D4E]/10' : 'text-stone-500 hover:text-stone-900'
                                }`}
                              >
                                <span>{displaySub}</span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 2. Gender Selection */}
            <div className="space-y-3 border-b border-stone-200/80 pb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 block font-mono">
                {t('catalog.genderUpper', 'CİNSİYET')}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {genderList.map((g) => {
                  const isSelected = selectedGender?.toLowerCase() === g.id.toLowerCase()
                  return (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGender(isSelected ? null : g.id)}
                      className={`text-xs py-2 px-1 rounded-xl text-center font-bold tracking-wider uppercase border transition-all ${
                        isSelected ? 'bg-[#1A1D24] text-white border-[#1A1D24]' : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {g.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. Brand Search & Filter */}
            <div className="space-y-3 border-b border-stone-200/80 pb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 block font-mono">
                {t('catalog.brandUpper', 'LÜKS TASARIMCILAR')}
              </span>

              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder={t('catalog.brandSearch', 'Marka ara...')}
                  value={brandSearchQuery}
                  onChange={(e) => setBrandSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#9E7D4E] transition-colors"
                />
              </div>

              <div className="space-y-1 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                {filteredBrandList.map((b) => {
                  const isSelected = selectedBrand?.toLowerCase() === b.toLowerCase()
                  const bCount = initialProducts.filter(p => p.brand?.toLowerCase() === b.toLowerCase()).length
                  return (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(isSelected ? null : b)}
                      className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                        isSelected ? 'bg-[#9E7D4E]/15 text-[#9E7D4E] font-bold' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      <span className="truncate">{b}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{bCount}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 4. Condition Filter */}
            <div className="space-y-3 border-b border-stone-200/80 pb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 block font-mono">
                {t('catalog.conditionUpper', 'KONDİSYON')}
              </span>
              <div className="space-y-1">
                {conditionList.map((cond) => {
                  const isSelected = selectedCondition?.toLowerCase() === cond.id.toLowerCase()
                  return (
                    <button
                      key={cond.id}
                      onClick={() => setSelectedCondition(isSelected ? null : cond.id)}
                      className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                        isSelected ? 'bg-[#1A1D24] text-white font-bold' : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <span>{cond.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 5. Price Range */}
            <div className="space-y-3 pb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 block font-mono">
                {t('catalog.priceRangeUpper', 'FİYAT ARALIĞI')}
              </span>
              <div className="space-y-1">
                {priceRanges.map((pr) => {
                  const isSelected = (selectedPriceRange || 'all') === pr.id
                  return (
                    <button
                      key={pr.id}
                      onClick={() => setSelectedPriceRange(pr.id === 'all' ? null : pr.id)}
                      className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                        isSelected ? 'text-[#9E7D4E] font-bold bg-[#9E7D4E]/10' : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <span>{pr.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* ─── MAIN PRODUCT GRID ─── */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center bg-white border border-stone-200/80 rounded-3xl p-12 max-w-xl mx-auto space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <Filter size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-playfair text-stone-900">
                  {t('catalog.noResults', 'Aramanıza uygun parça bulunamadı.')}
                </h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  {t('catalog.noResultsDesc', 'Filtre seçimlerinizi genişleterek diğer arşiv parçalarını inceleyebilirsiniz.')}
                </p>
                <div className="pt-4">
                  <button
                    onClick={clearAllFilters}
                    className="px-8 py-3 bg-[#1A1D24] text-white hover:bg-[#9E7D4E] transition-all text-[10px] tracking-widest uppercase font-bold rounded-full cursor-pointer"
                  >
                    {t('catalog.clearAll', 'Filtreleri Sıfırla')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-16">
                <div className={`grid gap-x-6 gap-y-14 ${
                  gridCols === 2 ? 'grid-cols-1 sm:grid-cols-2' : gridCols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                }`}>
                  {filteredProducts.slice(0, visibleCount).map((p, i) => (
                    <FadeIn key={p.id} delay={i % 4 * 0.05} direction="up">
                      <ProductCard product={p} />
                    </FadeIn>
                  ))}
                </div>

                {/* Load More Trigger */}
                {filteredProducts.length > visibleCount && (
                  <div className="flex flex-col items-center gap-3 pt-6 border-t border-stone-200">
                    <p className="text-xs text-stone-400 font-mono">
                      {Math.min(visibleCount, filteredProducts.length)} / {filteredProducts.length} {t('filter.showingItems', 'parça gösteriliyor')}
                    </p>
                    <button
                      onClick={() => setVisibleCount(prev => prev + 24)}
                      className="px-10 py-4 border border-stone-900 bg-white hover:bg-[#1A1D24] hover:text-white transition-all duration-300 text-[10px] tracking-[0.25em] uppercase font-bold shadow-sm rounded-full cursor-pointer"
                    >
                      {t('filter.loadMore', 'Daha Fazla Parça Keşfet (+24)')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── MOBILE FILTER DRAWER ─── */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-[85vw] max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <span className="font-playfair text-lg font-bold">{t('catalog.filters', 'Filtreler')}</span>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-stone-400 hover:text-stone-900">
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Categories */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 font-mono">
                    {t('catalog.categoryUpper', 'KATEGORİ')}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {categoriesList.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                        className={`text-xs py-2 px-3 rounded-xl border text-left truncate font-medium ${
                          selectedCategory === cat.id ? 'bg-[#9E7D4E] text-white border-[#9E7D4E]' : 'border-stone-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Gender */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 font-mono">
                    {t('catalog.genderUpper', 'CİNSİYET')}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {genderList.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGender(selectedGender === g.id ? null : g.id)}
                        className={`text-xs py-2 rounded-xl border font-bold uppercase ${
                          selectedGender === g.id ? 'bg-[#1A1D24] text-white border-[#1A1D24]' : 'border-stone-200'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Price Range */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 font-mono">
                    {t('catalog.priceRangeUpper', 'FİYAT ARALIĞI')}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {priceRanges.map((pr) => (
                      <button
                        key={pr.id}
                        onClick={() => setSelectedPriceRange((selectedPriceRange || 'all') === pr.id ? null : pr.id)}
                        className={`text-[11px] py-2 px-2.5 rounded-xl border text-left truncate ${
                          (selectedPriceRange || 'all') === pr.id ? 'bg-[#1A1D24] text-white border-[#1A1D24]' : 'border-stone-200'
                        }`}
                      >
                        {pr.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Top Brands */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 font-mono">
                    {t('catalog.brandUpper', 'POPÜLER MARKALAR')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Hermès', 'Chanel', 'Louis Vuitton', 'Bottega Veneta', 'Cartier', 'Dior', 'Prada', 'Rolex'].map((b) => (
                      <button
                        key={b}
                        onClick={() => setSelectedBrand(selectedBrand === b ? null : b)}
                        className={`text-[10px] py-1.5 px-3 rounded-full border transition-all ${
                          selectedBrand === b ? 'bg-[#9E7D4E] text-white border-[#9E7D4E] font-bold' : 'border-stone-200 text-stone-700'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-200 space-y-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3.5 bg-[#1A1D24] text-white rounded-full font-bold text-xs uppercase tracking-widest cursor-pointer"
                >
                  {language === 'en' ? `Show Results (${filteredProducts.length})` : `Sonuçları Gör (${filteredProducts.length})`}
                </button>
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2.5 text-xs text-stone-500 font-bold uppercase tracking-wider cursor-pointer"
                >
                  {t('catalog.clearAll', 'Filtreleri Sıfırla')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
