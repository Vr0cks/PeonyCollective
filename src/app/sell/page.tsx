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

  const isAdmin = profile?.role === 'admin'

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 px-4 sm:px-6 lg:px-8 selection:bg-[#AF9164] selection:text-white">
      <div className="max-w-4xl mx-auto mb-10 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] bg-[#AF9164]/10 text-[#AF9164] border border-[#AF9164]/20 shadow-sm">
          {isAdmin ? '⚡ PEONY VIP & KONSİNYE MERKEZİ' : '💎 LÜKS PARÇANIZI SATIŞA ÇIKARIN'}
        </span>
        <h1 className="text-4xl md:text-5xl serif-display italic text-black">
          {isAdmin ? 'Yeni Ürün Ekle & Konsinye Kaydı' : 'Dolabınızdaki Lüks Parçaları Satışa Sunun'}
        </h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto font-light leading-relaxed">
          {isAdmin
            ? 'Yönetici hesabı ile detaylı ürün yükleme, 32 noktalı ekspertiz belgeleri, tedarikçi eşleştirmesi ve fiyatlandırma.'
            : 'Peony Collective ayrıcalığıyla lüks çanta, ayakkabı ve kıyafetlerinizi güvenle satışa sunun. Uzman ekibimiz 24 saat içinde inceleyip vitrine alsın.'}
        </p>
      </div>

      <SellForm userEmail={user.email} userRole={profile?.role} />
    </div>
  )
}