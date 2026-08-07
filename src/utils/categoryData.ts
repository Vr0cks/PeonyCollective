// Peony Collective — Kategori Ağacı ve Marka/Model Verileri
// Dolap benzeri hiyerarşik kategori sistemi

export type Gender = 'Kadın' | 'Erkek' | 'Kız Çocuk' | 'Erkek Çocuk'

export type MainCategory = 'Çanta' | 'Kıyafet' | 'Ayakkabı' | 'Aksesuar'

export interface SubcategoryData {
  name: string
  sizes?: string[]
}

export interface CategoryNode {
  subcategories: SubcategoryData[]
  hasSizes: boolean
}

// ─── Cinsiyet Seçenekleri ───
export const genders: { value: Gender; label: string; icon: string }[] = [
  { value: 'Kadın', label: 'Kadın', icon: '👩' },
  { value: 'Erkek', label: 'Erkek', icon: '👨' },
  { value: 'Kız Çocuk', label: 'Kız Çocuk', icon: '👧' },
  { value: 'Erkek Çocuk', label: 'Erkek Çocuk', icon: '👦' },
]

// ─── Ana Kategori Seçenekleri ───
export const mainCategories: { value: MainCategory; label: string; icon: string }[] = [
  { value: 'Çanta', label: 'Çanta', icon: '👜' },
  { value: 'Kıyafet', label: 'Kıyafet', icon: '👗' },
  { value: 'Ayakkabı', label: 'Ayakkabı', icon: '👠' },
  { value: 'Aksesuar', label: 'Aksesuar', icon: '💎' },
]

// ─── Alt Kategori Haritası ───
export const categoryTree: Record<MainCategory, CategoryNode> = {
  'Çanta': {
    hasSizes: false,
    subcategories: [
      { name: 'El Çantası' },
      { name: 'Omuz Çantası' },
      { name: 'Sırt Çantası' },
      { name: 'Clutch' },
      { name: 'Tote' },
      { name: 'Crossbody' },
      { name: 'Mini Çanta' },
      { name: 'Cüzdan' },
    ],
  },
  'Kıyafet': {
    hasSizes: true,
    subcategories: [
      { name: 'Elbise', sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '34', '36', '38', '40', '42', '44', '46'] },
      { name: 'Mont / Kaban', sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Blazer / Ceket', sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '34', '36', '38', '40', '42', '44', '46'] },
      { name: 'T-Shirt / Bluz', sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Gömlek', sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Pantolon', sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '26', '27', '28', '29', '30', '31', '32', '34', '36'] },
      { name: 'Etek', sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '34', '36', '38', '40', '42'] },
      { name: 'Triko / Kazak', sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Şort', sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Takım Elbise', sizes: ['44', '46', '48', '50', '52', '54', '56'] },
    ],
  },
  'Ayakkabı': {
    hasSizes: true,
    subcategories: [
      { name: 'Topuklu', sizes: ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42'] },
      { name: 'Sneaker', sizes: ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45'] },
      { name: 'Bot / Çizme', sizes: ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45'] },
      { name: 'Terlik / Sandalet', sizes: ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42'] },
      { name: 'Loafer', sizes: ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42'] },
      { name: 'Oxford / Derby', sizes: ['38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45'] },
    ],
  },
  'Aksesuar': {
    hasSizes: false,
    subcategories: [
      { name: 'Kemer', sizes: ['75', '80', '85', '90', '95', '100', '105', '110'] },
      { name: 'Şal / Eşarp' },
      { name: 'Güneş Gözlüğü' },
      { name: 'Takı' },
      { name: 'Saat' },
      { name: 'Şapka' },
      { name: 'Anahtarlık' },
    ],
  },
}

// ─── Marka Veritabanı (Akıllı Default'lar için) ───
export interface BrandModels {
  name: string
  models: string[]
  materials?: string[]
}

export const brands: BrandModels[] = [
  {
    name: 'Hermès',
    models: ['Birkin 25', 'Birkin 30', 'Birkin 35', 'Kelly 25', 'Kelly 28', 'Kelly 32', 'Constance', 'Lindy', 'Picotin', 'Garden Party', 'Evelyne', 'Bolide', 'Halzan'],
    materials: ['Togo Deri', 'Epsom Deri', 'Clemence Deri', 'Swift Deri', 'Box Calf', 'Barenia', 'Ostrich (Devekuşu)', 'Crocodile (Timsah)'],
  },
  {
    name: 'Chanel',
    models: ['Classic Flap Small', 'Classic Flap Medium', 'Classic Flap Jumbo', 'Boy Bag', '2.55 Reissue', 'Gabrielle', 'Deauville', 'Grand Shopping Tote', 'WOC (Wallet on Chain)', '19 Bag', 'Coco Handle'],
    materials: ['Caviar Deri', 'Kuzu Derisi (Lambskin)', 'Tweed', 'Kanvas', 'Patent Deri'],
  },
  {
    name: 'Louis Vuitton',
    models: ['Neverfull MM', 'Neverfull GM', 'Speedy 25', 'Speedy 30', 'Alma BB', 'Alma PM', 'Pochette Métis', 'Capucines', 'Twist', 'Dauphine', 'OnTheGo', 'Multi Pochette', 'Keepall'],
    materials: ['Monogram Kanvas', 'Damier Ebene', 'Damier Azur', 'Epi Deri', 'Empreinte Deri', 'Mahina Deri'],
  },
  {
    name: 'Dior',
    models: ['Lady Dior Mini', 'Lady Dior Medium', 'Lady Dior Large', 'Saddle Bag', 'Book Tote Small', 'Book Tote Medium', 'Bobby Bag', '30 Montaigne', 'Dior Caro', 'Diorama'],
    materials: ['Cannage Deri', 'Kuzu Derisi', 'Oblique Kanvas', 'Patent Deri'],
  },
  {
    name: 'Gucci',
    models: ['Dionysus', 'Marmont Small', 'Marmont Medium', 'Jackie 1961', 'Bamboo', 'Horsebit 1955', 'GG Supreme Tote', 'Ophidia', 'Blondie'],
    materials: ['GG Supreme Kanvas', 'Matelassé Deri', 'Bambu Saplı Deri', 'Deri'],
  },
  {
    name: 'Prada',
    models: ['Re-Edition 2005', 'Re-Edition 2000', 'Galleria', 'Cleo', 'Cahier', 'Saffiano Tote', 'Nylon Backpack'],
    materials: ['Saffiano Deri', 'Naylon (Re-Nylon)', 'Vitello Deri', 'Patent Deri'],
  },
  {
    name: 'Bottega Veneta',
    models: ['Cassette', 'Jodie', 'Pouch', 'Arco', 'Padded Cassette', 'Point', 'Teen Jodie', 'Andiamo'],
    materials: ['Intrecciato Deri', 'Nappa Deri', 'Kuzu Derisi'],
  },
  {
    name: 'Celine',
    models: ['Luggage Nano', 'Luggage Micro', 'Belt Bag', 'Classic Box', 'Sangle', 'Triomphe', 'Ava', '16 Bag'],
    materials: ['Drummed Calfskin', 'Smooth Calfskin', 'Triomphe Kanvas', 'Kuzu Derisi'],
  },
  {
    name: 'Saint Laurent',
    models: ['Sac de Jour', 'Loulou', 'Kate', 'Sunset', 'College', 'Niki', 'Le 5 à 7', 'Solferino'],
    materials: ['Matelassé Deri', 'Smooth Deri', 'Grain de Poudre Deri', 'Patent Deri'],
  },
  {
    name: 'Balenciaga',
    models: ['City', 'Le Cagole', 'Hourglass', 'Neo Classic', 'Everyday Tote', 'Track', 'Triple S'],
    materials: ['Arena Deri', 'Smooth Deri', 'Croc-Embossed Deri'],
  },
  {
    name: 'Fendi',
    models: ['Baguette', 'Peekaboo', 'Kan I', 'Mon Trésor', 'First', 'Sunshine Shopper', 'By The Way'],
    materials: ['FF Kanvas', 'Nappa Deri', 'Selleria Deri', 'Kuzu Derisi'],
  },
  {
    name: 'Loewe',
    models: ['Puzzle', 'Gate', 'Hammock', 'Balloon', 'Flamenco', 'Basket', 'Amazona'],
    materials: ['Classic Calfskin', 'Soft Grained Calfskin', 'Nappa Deri', 'Anagram Kanvas'],
  },
  {
    name: 'Burberry',
    models: ['TB Bag', 'Lola', 'Note', 'Pocket', 'Frances', 'Knight'],
    materials: ['Vintage Check Kanvas', 'Deri', 'Naylon'],
  },
  {
    name: 'Valentino',
    models: ['Rockstud', 'VSLING', 'One Stud', 'Roman Stud', 'Supervee'],
    materials: ['Smooth Deri', 'Nappa Deri', 'Patent Deri'],
  },
  {
    name: 'Miu Miu',
    models: ['Wander', 'Arcadie', 'Matelassé', 'Madras'],
    materials: ['Matelassé Deri', 'Nappa Deri', 'Woven Deri'],
  },
]

// ─── Materyal Listeleri (Kategoriye Özel) ───
export const shoeMaterials = [
  'Hakiki Deri',
  'Süet',
  'Rugan (Patent Deri)',
  'Kumaş / Kanvas',
  'File / Mesh',
  'Saten',
  'Kadife',
  'Nubuk',
  'Kürk / Peluş',
  'Sentetik / Naylon',
  'Diğer',
]

export const clothingMaterials = [
  'Pamuk',
  'İpek',
  'Yün / Kaşmir',
  'Keten',
  'Deri',
  'Denim (Kot)',
  'Triko',
  'Kadife',
  'Tweed',
  'Polyester / Sentetik',
  'Dantel',
  'Süet',
  'Diğer',
]

export const accessoryMaterials = [
  'Deri',
  'Altın Kaplama',
  'Gümüş',
  'Pirinç / Metal',
  'İpek',
  'Plastik / Asetat',
  'Kristal / Taşlı',
  'Diğer',
]

export const generalMaterials = [
  'Togo Deri',
  'Epsom Deri',
  'Caviar Deri',
  'Kuzu Derisi (Lambskin)',
  'Saffiano Deri',
  'Nappa Deri',
  'Patent Deri',
  'Süet',
  'Kanvas',
  'Naylon',
  'Tweed',
  'Denim',
  'Kadife',
  'İpek',
  'Diğer',
]

// ─── Kondisyon Seçenekleri ───
export const conditions = [
  'Sıfır/Etiketli',
  'Yeni Gibi',
  'Çok İyi',
  'Temiz',
  'Yıpranmış',
]

// ─── Helper: Marka adına göre modelleri bul ───
export function getModelsForBrand(brandName: string): string[] {
  const found = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase())
  return found?.models || []
}

// ─── Helper: Kategori ve Markaya göre materyalleri bul ───
export function getMaterialsForCategoryAndBrand(category: string, brandName: string): string[] {
  if (category === 'Ayakkabı') return shoeMaterials
  if (category === 'Kıyafet') return clothingMaterials
  if (category === 'Aksesuar') return accessoryMaterials
  
  const found = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase())
  return found?.materials || generalMaterials
}

export function getMaterialsForBrand(brandName: string): string[] {
  const found = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase())
  return found?.materials || generalMaterials
}

// ─── Helper: Alt kategori ve beden bilgisini çek ───
export function getSubcategories(category: MainCategory, gender?: string): SubcategoryData[] {
  let list = categoryTree[category]?.subcategories || []
  if (gender && (gender.toUpperCase() === 'ERKEK' || gender === 'Erkek')) {
    if (category === 'Ayakkabı') {
      list = list.filter(sub => sub.name !== 'Topuklu' && sub.name !== 'Babet')
    }
  }
  return list
}

export function getSizesForSubcategory(category: MainCategory, subcategoryName: string, gender?: string): string[] {
  const node = categoryTree[category]
  if (!node) return []
  const sub = node.subcategories.find(s => s.name === subcategoryName)

  if (category === 'Ayakkabı' && gender && (gender.toUpperCase() === 'ERKEK' || gender === 'Erkek')) {
    return ['39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45', '45.5', '46', '46.5', '47']
  }

  return sub?.sizes || []
}
