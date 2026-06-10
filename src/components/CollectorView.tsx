import { ShoppingBag, Star } from 'lucide-react'
import Image from 'next/image'
import { Order } from '@/src/types'

interface CollectorViewProps {
  orders: Order[]
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending_payment: { label: 'Ödeme Bekleniyor', color: 'bg-amber-500' },
  paid: { label: 'Ödendi / Beklemede', color: 'bg-blue-500' },
  shipped_to_lab: { label: 'Lab\'a Yolda', color: 'bg-sky-500' },
  inspecting: { label: 'İnceleniyor', color: 'bg-orange-500' },
  lab_approved: { label: 'Onaylandı', color: 'bg-emerald-500' },
  shipped_to_buyer: { label: 'Kargoda', color: 'bg-purple-500' },
  delivered: { label: 'Teslim Edildi', color: 'bg-green-500' },
  completed: { label: 'Tamamlandı', color: 'bg-zinc-500' },
  cancelled: { label: 'İptal Edildi', color: 'bg-red-500' },
  refunded: { label: 'İade Edildi', color: 'bg-rose-500' },
}

export default function CollectorView({ orders }: CollectorViewProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div>
          <h1 className="text-4xl serif-display italic mb-2 text-gray-900">Koleksiyon Panelim</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Personal Luxury Portfolio</p>
        </div>
        <div className="bg-zinc-900 text-white px-6 py-3 rounded-full flex items-center gap-3">
           <Star size={12} className="text-yellow-500 fill-yellow-500" />
           <span className="text-[10px] font-bold uppercase tracking-widest">Koleksiyoner Üyeliği Aktif</span>
        </div>
      </div>

      {/* 1. PORTFOLIO SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 relative overflow-hidden group">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Toplam Harcama</p>
          <h3 className="text-5xl serif-display tracking-tighter">
            {orders.reduce((sum, o) => sum + (o.total_price || 0), 0).toLocaleString('tr-TR')} ₺
          </h3>
          <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest flex items-center gap-2">
            Asset Değerleme Aktif
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 relative overflow-hidden group">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Sahip Olunan Ürünler</p>
          <h3 className="text-5xl serif-display tracking-tighter">{orders.length} Adet</h3>
          <p className="text-[10px] text-blue-500 mt-4 font-bold uppercase tracking-widest flex items-center gap-2">
            Koleksiyon Genişliyor
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 relative overflow-hidden group">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Aktif Siparişler</p>
          <h3 className="text-5xl serif-display tracking-tighter text-orange-500">
            {orders.filter(o => o.order_status !== 'completed' && o.order_status !== 'delivered' && o.order_status !== 'cancelled').length}
          </h3>
          <p className="text-[10px] text-orange-500 mt-4 font-bold uppercase tracking-widest">
            Kargoya Hazırlanıyor
          </p>
        </div>
      </div>

      {/* 2. ORDER HISTORY */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-500/5 overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Sipariş Geçmişi</h2>
        </div>
        
        {orders.length === 0 ? (
          <div className="p-20 text-center">
            <ShoppingBag size={48} className="mx-auto text-gray-200 mb-6" />
            <p className="text-sm serif-display italic text-gray-400">Henüz bir ürün satın almadınız.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Ürün</th>
                  <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Durum</th>
                  <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Tutar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => {
                  const product = order.products
                  const imageUrl = product?.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=120'
                  const statusInfo = statusMap[order.order_status] || { label: order.order_status, color: 'bg-zinc-400' }

                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-15 rounded bg-gray-50 overflow-hidden relative flex-shrink-0 border border-gray-100">
                            <Image src={imageUrl} alt="" fill className="object-cover" sizes="48px" />
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-1">{product?.brand || 'Bilinmeyen Marka'}</p>
                            <p className="text-xs serif-display italic text-gray-500">{product?.model_name || 'Bilinmeyen Model'}</p>
                          </div>
                        </div>
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
                        {(order.total_price ?? 0).toLocaleString('tr-TR')} ₺
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
