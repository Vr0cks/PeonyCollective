import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import { CreditCard, Package, Clock, TrendingUp } from 'lucide-react'

export default async function SellerDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Satıcının ürünlerini ve bu ürünlere bağlı siparişleri çekiyoruz
  const { data: myProducts } = await supabase
    .from('products')
    .select('*, orders(total_price)')
    .eq('seller_id', user.id)

  const totalEarnings = myProducts
    ?.filter(p => p.status === 'sold')
    .reduce((sum, p) => sum + (p.price || 0), 0)

  const pendingApproval = myProducts?.filter(p => p.status === 'pending').length;
  const activeSales = myProducts?.filter(p => p.status === 'approved').length;

  return (
    <main className="min-h-screen bg-[#FCFCFB] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h1 className="text-4xl font-playfair italic mb-2 text-gray-900">Mağaza Terminali</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Business Management System</p>
          </div>
          <div className="bg-zinc-900 text-white px-6 py-3 rounded-full flex items-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Canlı Piyasa Verisi Bağlı</span>
          </div>
        </div>

        {/* 1. FINANCE SUMMARY - Borsa Terminali Görünümü */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
               <TrendingUp size={120} />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Toplam Kazanç</p>
            <h3 className="text-5xl font-playfair tracking-tighter">{totalEarnings?.toLocaleString('tr-TR')} ₺</h3>
            <p className="text-[10px] text-green-500 mt-4 font-bold uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={12} />
              Büyüme Aktif
            </p>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
               <Package size={120} />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Aktif Listelemeler</p>
            <h3 className="text-5xl font-playfair tracking-tighter">{activeSales} Ürün</h3>
            <p className="text-[10px] text-blue-500 mt-4 font-bold uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              Yayında
            </p>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
               <Clock size={120} />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Onay Bekleyen</p>
            <h3 className="text-5xl font-playfair tracking-tighter text-orange-500">{pendingApproval}</h3>
            <p className="text-[10px] text-orange-500 mt-4 font-bold uppercase tracking-widest">
              Peony Lab İnceliyor
            </p>
          </div>
        </div>

        {/* 2. INVENTORY MANAGEMENT */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-500/5 overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Envanter Detayları</h2>
            <button className="text-[10px] font-bold uppercase tracking-widest border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all">Yeni Ürün Ekle</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Asset</th>
                  <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Piyasa Durumu</th>
                  <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Değer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {myProducts?.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-10 py-8">
                      <p className="text-xs font-bold uppercase tracking-widest mb-1">{p.brand}</p>
                      <p className="text-sm font-playfair italic text-gray-500">{p.model_name}</p>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          p.status === 'sold' ? 'bg-green-500' : 
                          p.status === 'pending' ? 'bg-orange-500' : 'bg-blue-500'
                        }`} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                          {p.status === 'sold' ? 'Tasfiye Edildi (Satıldı)' : p.status === 'pending' ? 'Ekspertiz Aşamasında' : 'Piyasada Aktif'}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 font-mono text-sm font-bold">{p.price.toLocaleString('tr-TR')} ₺</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
