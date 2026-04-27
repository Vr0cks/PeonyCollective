import { createClient } from '@/src/utils/supabase/server'
import HomeClient from '@/src/components/HomeClient'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams
  const brand = (params.brand as string) || undefined
  
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

  const { data: products } = await query

  // 2. Filtreleme için benzersiz markaları çekiyoruz
  const { data: allProducts } = await supabase
    .from('products')
    .select('brand')
    .eq('status', 'approved')

  const brands = Array.from(new Set(allProducts?.map(p => p.brand))).filter(Boolean) as string[]

  return (
    <HomeClient 
      products={products || []} 
      brands={brands} 
      brand={brand} 
    />
  )
}