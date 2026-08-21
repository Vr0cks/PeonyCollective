import { createClient } from '@/src/utils/supabase/server'
import MagazineClient from '@/src/components/MagazineClient'

export const metadata = {
  title: 'Peony Magazine • Édition Nº 01 | İstanbul Luxury Journal',
  description: 'Peony Collective resmi dijital lüks dergisi. Sayı 01: Döngüsel lüks mirası, arşiv çanta değerleme raporları, editörün seçtikleri ve interaktif lookbook.',
}

export default async function MagazinePage() {
  const supabase = await createClient()

  // Fetch approved products for the shoppable lookbook pages
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(40)

  return <MagazineClient products={products || []} />
}
