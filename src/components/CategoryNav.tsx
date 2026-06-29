import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'

const categories = [
  {
    name: 'TÜM ÜRÜNLER',
    href: '/#collection',
  },
  {
    name: 'KADIN',
    href: '/?gender=KADIN#collection',
    subcategories: [
      { name: 'Çanta', href: '/?gender=KADIN&category=Çanta#collection' },
      { name: 'Ayakkabı', href: '/?gender=KADIN&category=Ayakkabı#collection' },
      { name: 'Dış Giyim', href: '/?gender=KADIN&category=Dış Giyim#collection' },
      { name: 'Üst Giyim', href: '/?gender=KADIN&category=Üst Giyim#collection' },
      { name: 'Alt Giyim', href: '/?gender=KADIN&category=Alt Giyim#collection' },
      { name: 'Elbise', href: '/?gender=KADIN&category=Kıyafet&subcategory=Elbise#collection' },
    ]
  },
  {
    name: 'ERKEK',
    href: '/?gender=ERKEK#collection',
    subcategories: [
      { name: 'Alt Giyim', href: '/?gender=ERKEK&category=Alt Giyim#collection' },
      { name: 'Dış Giyim', href: '/?gender=ERKEK&category=Dış Giyim#collection' },
      { name: 'Üst Giyim', href: '/?gender=ERKEK&category=Üst Giyim#collection' },
      { name: 'Ayakkabı', href: '/?gender=ERKEK&category=Ayakkabı#collection' },
    ]
  },
  {
    name: 'ÇOCUK',
    href: '/?gender=KIZ ÇOCUK#collection', // Defaulting to one, or maybe just remove href and let them select
    subcategories: [
      { name: 'Kız Çocuk', href: '/?gender=KIZ ÇOCUK#collection' },
      { name: 'Erkek Çocuk', href: '/?gender=ERKEK ÇOCUK#collection' },
    ]
  },
  {
    name: 'AKSESUAR',
    href: '/?category=Aksesuar#collection',
    subcategories: [
      { name: 'Eşarp', href: '/?category=Aksesuar&subcategory=Eşarp#collection' },
      { name: 'Bileklik', href: '/?category=Aksesuar&subcategory=Bileklik#collection' },
      { name: 'Fular', href: '/?category=Aksesuar&subcategory=Fular#collection' },
      { name: 'Şapka', href: '/?category=Aksesuar&subcategory=Şapka#collection' },
      { name: 'Kemer', href: '/?category=Aksesuar&subcategory=Kemer#collection' },
      { name: 'Gözlük', href: '/?category=Aksesuar&subcategory=Gözlük#collection' },
      { name: 'Cüzdan', href: '/?category=Aksesuar&subcategory=Cüzdan#collection' },
      { name: 'Takı', href: '/?category=Aksesuar&subcategory=Takı#collection' },
    ]
  },
  {
    name: 'YENİ GELENLER',
    href: '/#collection',
  }
]

export default function CategoryNav() {
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
