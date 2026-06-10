import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function WalletPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Örnek hakediş verisi
  const balance = 125000;
  const pendingBalance = 45000;
  const isSubMerchantApproved = false; // MASAK/Vergi altyapısı için onay durumu

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="serif-display text-3xl font-light tracking-wide text-black mb-2">Pazaryeri Cüzdanım</h1>
        <p className="text-gray-500 font-light text-sm">Satış gelirleriniz, vergisel yükümlülükler (Split Payment) kapsamında doğrudan banka hesabınıza aktarılır.</p>
      </div>

      {!isSubMerchantApproved && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl flex items-start gap-4">
          <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <div>
            <h3 className="text-sm font-bold text-red-800 uppercase tracking-widest mb-1">YASAL ZORUNLULUK: Alt Üye İşyeri Onayı Bekleniyor</h3>
            <p className="text-xs text-red-700 mb-3">Kara Para Aklamayı Önleme (MASAK) yasaları gereğince, ödemelerinizi alabilmeniz için TC Kimlik / Vergi Numaranızın ödeme kuruluşu (PayTR) tarafından onaylanması gerekmektedir.</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">
              Sözleşmeyi Onayla ve KYC Başlat
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between h-48 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-[100px]" />
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Çekilebilir Bakiye</h3>
            <div className="text-4xl font-light serif-display">{balance.toLocaleString('tr-TR')} ₺</div>
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest w-max hover:bg-gray-200 transition-all">
            Para Çek
          </button>
        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-2xl flex flex-col justify-between h-48">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Bekleyen Bakiye (Blokaj)</h3>
            <div className="text-4xl font-light serif-display text-gray-400">{pendingBalance.toLocaleString('tr-TR')} ₺</div>
            <p className="text-[10px] text-gray-400 mt-2">Alıcı onayı bekleyen satışlarınızın tutarı.</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-8 rounded-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-sm uppercase tracking-widest font-bold">Kayıtlı IBAN Bilgileri</h2>
          <button className="text-[10px] text-[#AF9164] font-bold uppercase border border-[#AF9164] px-4 py-2 rounded-full hover:bg-[#AF9164] hover:text-white transition-all">
            Yeni IBAN Ekle
          </button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-100">
          <div>
            <p className="text-xs font-bold text-black uppercase">Garanti BBVA</p>
            <p className="text-xs text-gray-500 font-mono mt-1">TR00 0000 0000 0000 0000 0000 00</p>
          </div>
          <span className="bg-green-100 text-green-700 text-[10px] px-3 py-1 rounded-full font-bold uppercase">Varsayılan</span>
        </div>
      </div>
    </div>
  )
}
