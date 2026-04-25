import { createClient } from '@/src/utils/supabase/server';
import HomeClient from '@/src/components/HomeClient';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand } = await searchParams;
  const supabase = await createClient();

  // Temel sorgu: Sadece onaylıları getir
  let query = supabase
    .from('products')
    .select('*')
    .eq('status', 'approved');

  // Marka seçilmişse filtrele
  if (brand) {
    query = query.eq('brand', brand);
  }

  const { data: products } = await query.order('created_at', { ascending: false });

  const brands = ['Hermès', 'Chanel', 'Louis Vuitton', 'Dior', 'Prada', 'Gucci'];

  return <HomeClient products={products || []} brands={brands} brand={brand} />;
}