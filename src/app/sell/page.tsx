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

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-20 px-4 sm:px-6 lg:px-8 selection:bg-[#AF9164] selection:text-white">
      
      <div className="max-w-4xl mx-auto mb-16 text-center space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#AF9164]">PEONY CONCIERGE</p>
        <h1 className="text-4xl md:text-5xl serif-display italic text-black">Emanet & Satış Terminali</h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto font-light leading-relaxed">
          Koleksiyonunuzdaki seçkin parçaları Peony ekosistemine dahil edin. Aşağıdaki adımları tamamlayarak ürününüzü uzman laboratuvarımızın onayına sunabilirsiniz.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {resolvedParams?.message && (
          <div className="mb-10 p-5 bg-[#AF9164]/10 border border-[#AF9164]/20 text-center text-xs font-bold uppercase tracking-widest text-[#AF9164] rounded-xl animate-fade-in">
            {resolvedParams.message}
          </div>
        )}

        <SellForm />
      </div>
      
    </div>
  )
}