import { createClient } from '@/src/utils/supabase/server'
import HomeClient from '@/src/components/HomeClient'

import { Product } from '@/src/types'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams
  const brand = (params.brand as string) || undefined
  const category = (params.category as string) || undefined
  const gender = (params.gender as string) || undefined
  
  const supabase = await createClient()

  // 1. Tüm onaylı ürünleri çekiyoruz
  let query = supabase
    .from('products')
    .select('id, brand, model_name, price, condition, public_images, category, gender, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (brand) {
    const uppercaseBrand = brand.toLocaleUpperCase('tr-TR')
    const uppercaseEn = brand.toUpperCase()
    query = query.in('brand', [brand, uppercaseBrand, uppercaseEn])
  }
  if (category) {
    const uppercaseCat = category.toLocaleUpperCase('tr-TR')
    const uppercaseEn = category.toUpperCase()
    query = query.in('category', [category, uppercaseCat, uppercaseEn])
  }
  if (gender) {
    // Handle Turkish character case matching manually
    const uppercaseGender = gender.toLocaleUpperCase('tr-TR')
    const uppercaseEn = gender.toUpperCase()
    query = query.in('gender', [gender, uppercaseGender, uppercaseEn])
  }

  const { data: productsData } = await query.returns<Product[]>()
  const products: Product[] = productsData || []

  // 2. Veritabanından doğrudan tekilleştirilmiş (DISTINCT) markaları RPC ile ışık hızında çekiyoruz
  const { data: brandData } = await supabase.rpc('get_unique_approved_brands')
  const brands = brandData?.map((row: { brand: string }) => row.brand).filter(Boolean) || []

  return (
    <HomeClient 
      products={products || []} 
      brands={brands} 
      brand={brand}
      category={category}
      gender={gender}
    />
  )
}