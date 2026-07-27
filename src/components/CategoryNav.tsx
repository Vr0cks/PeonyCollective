'use client'

import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useSettings } from '@/src/context/SettingsContext'

export default function CategoryNav() {
  const { t } = useSettings()

  const categories = [
    {
      name: t('nav.allProducts', 'TÜM ÜRÜNLER'),
      href: '/#collection',
    },
    {
      name: t('nav.women', 'KADIN'),
      href: '/?gender=KADIN#collection',
      subcategories: [
        { name: t('category.bags', 'Çanta'), href: '/?gender=KADIN&category=Çanta#collection' },
        { name: t('category.shoes', 'Ayakkabı'), href: '/?gender=KADIN&category=Ayakkabı#collection' },
        { name: t('category.outerwear', 'Dış Giyim'), href: '/?gender=KADIN&category=Dış Giyim#collection' },
        { name: t('category.topwear', 'Üst Giyim'), href: '/?gender=KADIN&category=Üst Giyim#collection' },
        { name: t('category.bottomwear', 'Alt Giyim'), href: '/?gender=KADIN&category=Alt Giyim#collection' },
        { name: t('category.dress', 'Elbise'), href: '/?gender=KADIN&category=Kıyafet&subcategory=Elbise#collection' },
      ]
    },
    {
      name: t('nav.men', 'ERKEK'),
      href: '/?gender=ERKEK#collection',
      subcategories: [
        { name: t('category.bottomwear', 'Alt Giyim'), href: '/?gender=ERKEK&category=Alt Giyim#collection' },
        { name: t('category.outerwear', 'Dış Giyim'), href: '/?gender=ERKEK&category=Dış Giyim#collection' },
        { name: t('category.topwear', 'Üst Giyim'), href: '/?gender=ERKEK&category=Üst Giyim#collection' },
        { name: t('category.shoes', 'Ayakkabı'), href: '/?gender=ERKEK&category=Ayakkabı#collection' },
      ]
    },
    {
      name: t('nav.kids', 'ÇOCUK'),
      href: '/?gender=KIZ ÇOCUK#collection',
      subcategories: [
        { name: t('category.girls', 'Kız Çocuk'), href: '/?gender=KIZ ÇOCUK#collection' },
        { name: t('category.boys', 'Erkek Çocuk'), href: '/?gender=ERKEK ÇOCUK#collection' },
      ]
    },
    {
      name: t('nav.accessories', 'AKSESUAR'),
      href: '/?category=Aksesuar#collection',
      subcategories: [
        { name: t('category.scarf', 'Eşarp'), href: '/?category=Aksesuar&subcategory=Eşarp#collection' },
        { name: t('category.bracelet', 'Bileklik'), href: '/?category=Aksesuar&subcategory=Bileklik#collection' },
        { name: t('category.foulard', 'Fular'), href: '/?category=Aksesuar&subcategory=Fular#collection' },
        { name: t('category.hat', 'Şapka'), href: '/?category=Aksesuar&subcategory=Şapka#collection' },
        { name: t('category.belt', 'Kemer'), href: '/?category=Aksesuar&subcategory=Kemer#collection' },
        { name: t('category.glasses', 'Gözlük'), href: '/?category=Aksesuar&subcategory=Gözlük#collection' },
        { name: t('category.wallet', 'Cüzdan'), href: '/?category=Aksesuar&subcategory=Cüzdan#collection' },
        { name: t('category.jewelry', 'Takı'), href: '/?category=Aksesuar&subcategory=Takı#collection' },
      ]
    },
    {
      name: t('nav.newArrivals', 'YENİ GELENLER'),
      href: '/#collection',
    }
  ]

  return (
    <div className="hidden lg:flex max-w-[1600px] mx-auto px-6 lg:px-12 h-14 items-center justify-center gap-14 text-[12px] font-bold uppercase tracking-[0.1em] text-[#1A1A1A] border-t border-gray-100">
      {categories.map((cat) => (
        <div key={cat.name} className="group relative h-full flex items-center">
          <Link 
            href={cat.href} 
            className="flex items-center gap-1 hover:text-[#AF9164] transition-colors h-full"
          >
            {cat.name}
            {cat.subcategories && <ChevronDown size={14} className="opacity-50" />}
          </Link>

          {cat.subcategories && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block w-[220px] bg-[#E2E4E9] rounded-md shadow-2xl border border-gray-300 py-3 z-50">
              {cat.subcategories.map((sub, idx) => (
                <Link 
                  key={idx}
                  href={sub.href} 
                  className="flex items-center justify-between px-5 py-2.5 text-[13px] font-medium normal-case tracking-normal text-gray-800 hover:bg-[#D1D5DB] transition-colors"
                >
                  {sub.name}
                  <ChevronRight size={14} className="opacity-50" />
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
