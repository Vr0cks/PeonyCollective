import { ShoppingBag, Star, Package, MapPin } from 'lucide-react'
import Image from 'next/image'

interface CollectorViewProps {
  orders: any[]
}

export default function CollectorView({ orders }: CollectorViewProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div>
          <h1 className="text-4xl font-playfair italic mb-2 text-gray-900">Koleksiyon Panelim</h1>
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
          <h3 className="text-5xl font-playfair tracking-tighter">
            {orders.reduce((sum, o) => sum + (o.total_price || 0), 0).toLocaleString('tr-TR')} ₺
          </h3>
          <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest flex items-center gap-2">
            Asset Değerleme Aktif
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 relative overflow-hidden group">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Sahip Olunan Ürünler</p>
          <h3 className="text-5xl font-playfair tracking-tighter">{orders.length} Adet</h3>
          <p className="text-[10px] text-blue-500 mt-4 font-bold uppercase tracking-widest flex items-center gap-2">
            Koleksiyon Genişliyor
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 relative overflow-hidden group">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Aktif Siparişler</p>
          <h3 className="text-5xl font-playfair tracking-tighter text-orange-500">
            {orders.filter(o => o.order_status !== 'completed' && o.order_status !== 'delivered').length}
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
            <p className="text-sm font-playfair italic text-gray-400">Henüz bir ürün satın almadınız.</p>
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
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        {order.products?.image_url && (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative">
                            <Image src={order.products.image_url} alt="" fill className="object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest mb-1">{order.products?.brand}</p>
                          <p className="text-sm font-playfair italic text-gray-500">{order.products?.model_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          order.order_status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                        }`} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                          {order.order_status === 'completed' ? 'Tamamlandı' : 'İşleniyor'}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 font-mono text-sm font-bold">{order.total_price.toLocaleString('tr-TR')} ₺</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
