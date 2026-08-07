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
  const subcategory = (params.subcategory as string) || undefined
  const gender = (params.gender as string) || undefined
  
  const supabase = await createClient()

  // 1. Tüm onaylı ürünleri çekiyoruz
  let query = supabase
    .from('products')
    .select('id, brand, model_name, price, condition, public_images, category, subcategory, gender, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (brand) {
    const uppercaseBrand = brand.toLocaleUpperCase('tr-TR')
    const uppercaseEn = brand.toUpperCase()
    const lowercaseBrand = brand.toLocaleLowerCase('tr-TR')
    const titleBrand = brand.charAt(0).toLocaleUpperCase('tr-TR') + brand.slice(1).toLocaleLowerCase('tr-TR')
    query = query.in('brand', Array.from(new Set([brand, uppercaseBrand, uppercaseEn, lowercaseBrand, titleBrand])))
  }
  if (category) {
    const uppercaseCat = category.toLocaleUpperCase('tr-TR')
    const uppercaseEn = category.toUpperCase()
    const lowercaseCat = category.toLocaleLowerCase('tr-TR')
    const titleCat = category.charAt(0).toLocaleUpperCase('tr-TR') + category.slice(1).toLocaleLowerCase('tr-TR')
    query = query.in('category', Array.from(new Set([category, uppercaseCat, uppercaseEn, lowercaseCat, titleCat])))
  }
  if (subcategory) {
    const uppercaseSub = subcategory.toLocaleUpperCase('tr-TR')
    const uppercaseEn = subcategory.toUpperCase()
    const lowercaseSub = subcategory.toLocaleLowerCase('tr-TR')
    const titleSub = subcategory.charAt(0).toLocaleUpperCase('tr-TR') + subcategory.slice(1).toLocaleLowerCase('tr-TR')
    query = query.in('subcategory', Array.from(new Set([subcategory, uppercaseSub, uppercaseEn, lowercaseSub, titleSub])))
  }
  if (gender) {
    // Handle Turkish character case matching: KADIN -> Kadın, ERKEK -> Erkek, KIZ ÇOCUK -> Kız Çocuk, ERKEK ÇOCUK -> Erkek Çocuk
    const uppercaseGender = gender.toLocaleUpperCase('tr-TR')
    const uppercaseEn = gender.toUpperCase()
    const lowercaseGender = gender.toLocaleLowerCase('tr-TR')
    const titleGender = gender
      .toLocaleLowerCase('tr-TR')
      .split(' ')
      .map(word => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1))
      .join(' ')
    query = query.in('gender', Array.from(new Set([gender, uppercaseGender, uppercaseEn, lowercaseGender, titleGender])))
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