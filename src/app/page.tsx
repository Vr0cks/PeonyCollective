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
    query = query.eq('brand', brand)
  }
  if (category) {
    query = query.eq('category', category)
  }
  if (gender) {
    query = query.eq('gender', gender)
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