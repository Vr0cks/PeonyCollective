import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import SellForm from '@/src/components/SellForm'

export default async function SellPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const resolvedParams = await searchParams;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-20 px-4 sm:px-6 lg:px-8 selection:bg-[#AF9164] selection:text-white">
      
      <div className="max-w-3xl mx-auto mb-16 text-center space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#AF9164]">PEONY VIP CONCIERGE</p>
        <h1 className="text-4xl md:text-5xl serif-display italic text-black">Satış & Ekspertiz İşlemleri Mobil Uygulamamızda</h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto font-light leading-relaxed">
          Peony AI görsel rehber kamerası ve mikroskobik doğrulama teknolojileri gereği, ürün satış ve ekspertiz başvuruları <strong>sadece Peony Mobil Uygulaması</strong> üzerinden kabul edilmektedir.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-10 shadow-xl text-center space-y-8">
        <div className="w-20 h-20 bg-[#FAF7F2] border border-[#AF9164]/30 rounded-2xl flex items-center justify-center mx-auto text-3xl">
          📱
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl serif-display italic text-black">Peony VIP Seller App'i İndirin</h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
            Telefon kameranız ile rehberli 4 açı fotoğraf çekin, Peony AI 10 saniyede değerlemeyi ve ön onayı tamamlasın. Ürününüz hemen vitrine çıkarılsın.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-left space-y-1">
            <span className="text-[10px] font-bold text-[#AF9164] uppercase tracking-wider">iOS App Store</span>
            <p className="text-xs font-bold text-black">Peony Collective App</p>
            <p className="text-[11px] text-gray-400">iPhone & iPad ile Tam Uyumlu</p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-left space-y-1">
            <span className="text-[10px] font-bold text-[#AF9164] uppercase tracking-wider">Android Google Play</span>
            <p className="text-xs font-bold text-black">Peony Collective App</p>
            <p className="text-[11px] text-gray-400">Xiaomi, Samsung & Tümü</p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <span>Sorularınız mı var?</span>
          <a href="mailto:concierge@peony-collective.com" className="text-[#AF9164] font-bold underline hover:text-black transition">
            concierge@peony-collective.com
          </a>
        </div>
      </div>
      
    </div>
  )
}