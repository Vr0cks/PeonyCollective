import { Metadata } from 'next'
import { createClient } from '@/src/utils/supabase/server'
import CatalogClient from './CatalogClient'
import { Product } from '@/src/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Lüks Arşiv Koleksiyonu | Peony Collective',
  description: 'Uzman onaylı, %100 orijinal ve sertifikalı ikinci el lüks çanta, saat, mücevher, ayakkabı ve kıyafet koleksiyonu.',
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const params = await searchParams
  const brand = (params.brand as string) || undefined
  const category = (params.category as string) || undefined
  const subcategory = (params.subcategory as string) || undefined
  const gender = (params.gender as string) || undefined

  const supabase = await createClient()

  // 1. Tüm onaylı ürünleri (katalog havuzunu) çekiyoruz
  const { data: productsData } = await supabase
    .from('products')
    .select('id, brand, model_name, price, condition, public_images, category, subcategory, gender, created_at, is_peony_vip')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .returns<Product[]>()

  const products: Product[] = productsData || []

  // 2. Tekilleştirilmiş marka listesi
  const { data: brandData } = await supabase.rpc('get_unique_approved_brands')
  const brands = brandData?.map((row: { brand: string }) => row.brand).filter(Boolean) || []

  return (
    <CatalogClient 
      initialProducts={products}
      brands={brands}
      initialBrand={brand}
      initialCategory={category}
      initialSubcategory={subcategory}
      initialGender={gender}
    />
  )
}
