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
    .select('*')
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

  const { data: productsData } = await query
  const products: Product[] = (productsData || []) as Product[]

  // 2. Filtreleme için benzersiz markaları çekiyoruz
  const { data: allProducts } = await supabase
    .from('products')
    .select('brand, category, gender')
    .eq('status', 'approved')

  const brands = Array.from(new Set(allProducts?.map(p => p.brand))).filter(Boolean) as string[]

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