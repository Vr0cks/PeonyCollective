import { createClient } from '@/src/utils/supabase/server'
import TestSuiteClient from './TestSuiteClient'

export const metadata = {
  title: 'Entegrasyon Test Paneli | Admin',
  description: 'OTO Kargo ve Entrupy webhook simülasyon araçları.',
}

export default async function TestSuitePage() {
  const supabase = await createClient()

  // Son 8 siparişi çekiyoruz
  const { data: orders } = await supabase
    .from('orders')
    .select('*, products(*)')
    .order('created_at', { ascending: false })
    .limit(8)

  return (
    <div className="p-8 space-y-8 text-white">
      <div>
        <h1 className="text-2xl font-bold uppercase tracking-wider text-[#AF9164]">
          Entegrasyon Test Paneli
        </h1>
        <p className="text-xs text-zinc-400 font-light mt-1">
          Kod çalıştırmadan veya terminale girmeden PayTR, OTO Kargo ve Entrupy süreçlerini canlı simüle edin.
        </p>
      </div>

      <TestSuiteClient initialOrders={orders || []} />
    </div>
  )
}
