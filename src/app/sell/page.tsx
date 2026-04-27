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

  // Profil bilgisini çekiyoruz ama hata verse bile sayfayı çökertmiyoruz
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()
    
  // Herhangi bir giriş yapmış kullanıcı artık ürün yükleyebilir (Birleşik Panel mantığı)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 border border-gray-100 rounded-2xl shadow-sm">
        
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-light tracking-widest uppercase mb-2">Çanta Yükle</h1>
          <p className="text-gray-500 text-sm">Satmak istediğiniz lüks çantanızın detaylarını ve fotoğraflarını girin.</p>
        </div>

        {resolvedParams?.message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-center text-sm font-medium text-green-800 rounded-lg">
            {resolvedParams.message}
          </div>
        )}

        {/* Yeni, okunaklı ve önizlemeli form bileşenimizi çağırıyoruz */}
        <SellForm />
        
      </div>
    </div>
  )
}