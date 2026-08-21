'use client'

import Link from 'next/link'
import { ChevronDown, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react'
import { useSettings } from '@/src/context/SettingsContext'

export default function CategoryNav() {
  const { t } = useSettings()

  const categories = [
    {
      name: t('nav.newArrivals', 'YENİ GELENLER'),
      href: '/#collection',
      badge: t('nav.newBadge', 'YENİ'),
    },
    {
      name: t('nav.bags', 'ÇANTA'),
      href: '/?category=Çanta#collection',
      subcategories: [
        { name: t('category.shoulderBag', 'Omuz Çantası'), href: '/?category=Çanta&subcategory=Omuz Çantası#collection' },
        { name: t('category.handBag', 'El Çantası / Top Handle'), href: '/?category=Çanta&subcategory=El Çantası#collection' },
        { name: t('category.crossbody', 'Çapraz Çanta (Crossbody)'), href: '/?category=Çanta&subcategory=Crossbody#collection' },
        { name: t('category.clutch', 'Clutch & Gece Çantası'), href: '/?category=Çanta&subcategory=Clutch#collection' },
        { name: t('category.miniBag', 'Mini Çanta Koleksiyonu'), href: '/?category=Çanta&subcategory=Mini Çanta#collection' },
        { name: t('category.backpack', 'Lüks Sırt Çantası'), href: '/?category=Çanta&subcategory=Sırt Çantası#collection' },
      ],
      featured: [
        { name: 'Hermès Birkin & Kelly', href: '/?brand=Hermès#collection' },
        { name: 'Chanel Classic Flap', href: '/?brand=Chanel#collection' },
        { name: 'Louis Vuitton Arşiv', href: '/?brand=Louis Vuitton#collection' },
      ]
    },
    {
      name: t('nav.women', 'KADIN'),
      href: '/?gender=Kadın#collection',
      subcategories: [
        { name: t('category.allWomen', 'Tüm Kadın Koleksiyonu'), href: '/?gender=Kadın#collection' },
        { name: t('category.womenBags', 'Kadın Çanta Seçkisi'), href: '/?gender=Kadın&category=Çanta#collection' },
        { name: t('category.heels', 'Topuklu & Şık Ayakkabılar'), href: '/?gender=Kadın&category=Ayakkabı&subcategory=Topuklu#collection' },
        { name: t('category.loafers', 'Loafer & Babet Modelleri'), href: '/?gender=Kadın&category=Ayakkabı&subcategory=Loafer / Babet#collection' },
        { name: t('category.sneakers', 'Lüks Sneaker & Terlik'), href: '/?gender=Kadın&category=Ayakkabı&subcategory=Sneaker#collection' },
      ]
    },
    {
      name: t('nav.men', 'ERKEK'),
      href: '/?gender=Erkek#collection',
      subcategories: [
        { name: t('category.allMen', 'Tüm Erkek Koleksiyonu'), href: '/?gender=Erkek#collection' },
        { name: t('category.menWatches', 'Lüks Saat & Kronograf'), href: '/?gender=Erkek&category=watches#collection' },
        { name: t('category.menBags', 'Evrak & Seyahat Çantaları'), href: '/?gender=Erkek&category=Çanta#collection' },
        { name: t('category.menShoes', 'Erkek Loafer & Sneaker'), href: '/?gender=Erkek&category=Ayakkabı#collection' },
      ]
    },
    {
      name: t('nav.watchesJewelry', 'SAAT & MÜCEVHER'),
      href: '/?category=watches#collection',
      subcategories: [
        { name: t('category.allWatches', 'Tüm Saat Koleksiyonu'), href: '/?category=watches#collection' },
        { name: t('category.rolexIconic', 'Rolex İkonik Modeller'), href: '/?brand=Rolex#collection' },
        { name: t('category.cartierArchive', 'Cartier Arşiv Parçaları'), href: '/?brand=Cartier#collection' },
        { name: t('category.patekAudemars', 'Patek Philippe & Audemars'), href: '/?category=watches#collection' },
      ]
    },
    {
      name: t('nav.accessories', 'AYAKKABI & AKSESUAR'),
      href: '/catalog?category=Ayakkabı',
      subcategories: [
        { name: t('category.allShoes', 'Tüm Ayakkabı Koleksiyonu'), href: '/catalog?category=Ayakkabı' },
        { name: t('category.heels', 'Topuklu Ayakkabılar'), href: '/catalog?category=Ayakkabı&subcategory=Topuklu' },
        { name: t('category.loafers', 'Loafer & Babet'), href: '/catalog?category=Ayakkabı&subcategory=Loafer / Babet' },
        { name: t('category.sneakers', 'Sneaker Koleksiyonu'), href: '/catalog?category=Ayakkabı&subcategory=Sneaker' },
        { name: t('category.sandals', 'Terlik & Sandalet'), href: '/catalog?category=Ayakkabı&subcategory=Terlik / Sandalet' },
      ]
    },
    {
      name: t('nav.designers', 'LÜKS MARKALAR'),
      href: '/catalog',
      isMega: true,
      designers: [
        'Hermès', 'Chanel', 'Louis Vuitton', 'Dior', 
        'Bottega Veneta', 'Celine', 'Saint Laurent', 'Cartier', 
        'Rolex', 'Goyard', 'Prada', 'Gucci',
        'Loro Piana', 'Brunello Cucinelli', 'Fendi', 'Valentino'
      ]
    },
    {
      name: 'PEONY GAZETTE',
      href: '/magazine',
      badge: 'Nº 01',
    }
  ]

  return (
    <div className="hidden lg:flex max-w-[1600px] mx-auto px-6 lg:px-12 h-13 items-center justify-center gap-10 xl:gap-14 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A] border-t border-stone-200/50">
      {categories.map((cat) => (
        <div key={cat.name} className="group relative h-full flex items-center">
          <Link 
            href={cat.href} 
            className="flex items-center gap-1.5 hover:text-[#9E7D4E] transition-colors duration-200 h-full relative py-2"
          >
            <span>{cat.name}</span>
            {cat.badge && (
              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#9E7D4E]/15 text-[#9E7D4E] font-bold font-mono tracking-normal">
                {cat.badge}
              </span>
            )}
            {(cat.subcategories || cat.isMega) && (
              <ChevronDown size={12} className="opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-200" />
            )}
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9E7D4E] scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </Link>

          {/* ─── Standard Category Floating Glass Menu ─── */}
          {cat.subcategories && !cat.isMega && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 pt-1 z-50">
              <div className="w-[280px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-200/80 p-3 space-y-1">
                {cat.subcategories.map((sub, idx) => (
                  <Link 
                    key={idx}
                    href={sub.href} 
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[12px] font-medium normal-case tracking-normal text-stone-700 hover:text-[#9E7D4E] hover:bg-[#F8F6F1] transition-all"
                  >
                    <span>{sub.name}</span>
                    <ChevronRight size={13} className="opacity-30 text-[#9E7D4E]" />
                  </Link>
                ))}

                {cat.featured && (
                  <div className="pt-2 mt-2 border-t border-stone-100 px-2 space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400 block px-1.5">
                      {t('nav.featuredArchives', 'ÖNE ÇIKAN ARŞİVLER')}
                    </span>
                    {cat.featured.map((feat, fIdx) => (
                      <Link
                        key={fIdx}
                        href={feat.href}
                        className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold text-[#9E7D4E] hover:underline"
                      >
                        <Sparkles size={10} />
                        <span>{feat.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── Luxury Designers Mega Grid Menu ─── */}
          {cat.isMega && cat.designers && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 pt-1 z-50">
              <div className="w-[520px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-stone-200/80 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#9E7D4E]" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 font-mono">
                      {t('nav.discoverHouses', 'DISCOVER THE HOUSES')}
                    </span>
                  </div>
                  <Link href="/catalog" className="text-[10px] uppercase font-bold text-[#9E7D4E] hover:underline">
                    {t('nav.allBrands', 'Tüm Markalar →')}
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {cat.designers.map((brand) => (
                    <Link
                      key={brand}
                      href={`/?brand=${encodeURIComponent(brand)}#collection`}
                      className="px-3.5 py-2.5 rounded-xl text-[12px] font-semibold normal-case tracking-normal text-stone-800 hover:text-[#9E7D4E] hover:bg-[#F8F6F1] transition-all flex items-center justify-between"
                    >
                      <span>{brand}</span>
                      <ChevronRight size={12} className="opacity-20 text-[#9E7D4E]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
