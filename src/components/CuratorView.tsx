import { Package, Clock, TrendingUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/src/types'

interface CuratorViewProps {
  myProducts: Product[]
  totalEarnings: number
  activeSales: number
  pendingApproval: number
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: 'Ekspertiz Aşamasında', color: 'bg-amber-500' },
  approved: { label: 'Piyasada Aktif', color: 'bg-emerald-500' },
  rejected: { label: 'Reddedildi', color: 'bg-red-500' },
  sold: { label: 'Satıldı', color: 'bg-zinc-500' },
}

export default function CuratorView({ myProducts, totalEarnings, activeSales, pendingApproval }: CuratorViewProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div>
          <h1 className="text-4xl serif-display italic mb-2 text-gray-900">Mağaza Terminali</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Business Management System</p>
        </div>
        <div className="bg-zinc-900 text-white px-6 py-3 rounded-full flex items-center gap-3">
           <div className="w-2 h-2 bg-[#AF9164] rounded-full animate-pulse" />
           <span className="text-[10px] font-bold uppercase tracking-widest">Canlı Piyasa Verisi Bağlı</span>
        </div>
      </div>

      {/* 1. FINANCE SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
             <TrendingUp size={120} />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Toplam Kazanç</p>
          <h3 className="text-5xl serif-display tracking-tighter">{(totalEarnings ?? 0).toLocaleString('tr-TR')} ₺</h3>
          <p className="text-[10px] text-[#AF9164] mt-4 font-bold uppercase tracking-widest flex items-center gap-2">
            <TrendingUp size={12} />
            Büyüme Aktif
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
             <Package size={120} />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Aktif Listelemeler</p>
          <h3 className="text-5xl serif-display tracking-tighter">{activeSales} Ürün</h3>
          <p className="text-[10px] text-blue-500 mt-4 font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            Yayında
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
             <Clock size={120} />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Onay Bekleyen</p>
          <h3 className="text-5xl serif-display tracking-tighter text-amber-500">{pendingApproval}</h3>
          <p className="text-[10px] text-amber-500 mt-4 font-bold uppercase tracking-widest">
            Peony Lab İnceliyor
          </p>
        </div>
      </div>

      {/* 2. INVENTORY MANAGEMENT */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-500/5 overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Envanter Detayları</h2>
          <Link href="/sell" className="text-[10px] font-bold uppercase tracking-widest border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all">Yeni Ürün Ekle</Link>
        </div>
        <div className="overflow-x-auto">
          {myProducts?.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                <Sparkles size={32} strokeWidth={1} />
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-xl serif-display italic mb-3">Küratör Yolculuğuna Başla</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-relaxed mb-8">
                  Henüz listelenmiş bir ürünün yok. Koleksiyonundaki parçaları Peony ekosistemine dahil etmeye ne dersin?
                </p>
                <Link href="/sell" className="bg-black text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all inline-block">
                  İlk Ürününü Yükle
                </Link>
              </div>
            </div>
          ) : (
            <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Asset</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Piyasa Durumu</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Değer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {myProducts?.map((p) => {
                const statusInfo = statusMap[p.status] || { label: p.status, color: 'bg-zinc-400' }
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-10 py-8">
                      <p className="text-xs font-bold uppercase tracking-widest mb-1">{p.brand}</p>
                      <p className="text-sm serif-display italic text-gray-500">{p.model_name}</p>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                          {statusInfo.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 font-mono text-sm font-bold text-gray-900">
                      {(p.price ?? 0).toLocaleString('tr-TR')} ₺
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </>
  )
}
