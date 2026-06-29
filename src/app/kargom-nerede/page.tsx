  'use client'

import { useState } from 'react'
import { Package, Search, Truck } from 'lucide-react'

export default function KargomNerede() {
  const [orderId, setOrderId] = useState('')
  const [trackingData, setTrackingData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim()) return

    setLoading(true)
    setError('')
    setTrackingData(null)

    try {
      const res = await fetch(`/api/oto/tracking?orderId=${encodeURIComponent(orderId.trim())}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Bilinmeyen bir hata oluştu.')
      if (!data.success) throw new Error('Kargo bulunamadı veya sipariş numarası hatalı.')

      setTrackingData(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F9F8] pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Truck size={48} className="mx-auto mb-6 text-black" strokeWidth={1} />
          <h1 className="text-4xl md:text-5xl serif-display mb-4">Kargom Nerede?</h1>
          <p className="text-gray-500 font-light max-w-lg mx-auto">
            Peony siparişinizin anlık kargo durumunu öğrenmek için sipariş numaranızı veya kargo takip kodunuzu giriniz.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-xl shadow-black/5 rounded-lg mb-12">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Sipariş Numaranız (Örn: PO_12345)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 px-6 py-4 focus:outline-none focus:border-black transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-4 uppercase tracking-widest text-xs font-bold transition-all flex justify-center items-center gap-2 ${loading ? 'bg-gray-200 text-gray-500' : 'bg-black text-white hover:bg-[#AF9164]'}`}
            >
              <Search size={16} />
              {loading ? 'SORGULANIYOR...' : 'SORGULA'}
            </button>
          </form>

          {error && (
            <div className="mt-8 p-6 bg-red-50 text-red-600 rounded-lg text-sm">
              <p><strong>Hata:</strong> {error}</p>
            </div>
          )}

          {trackingData && (
            <div className="mt-12 border-t border-gray-100 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-[#AF9164]/10 flex items-center justify-center shrink-0">
                  <Package className="text-[#AF9164]" size={32} strokeWidth={1.5} />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Durum</h3>
                    <p className="text-2xl serif-display capitalize">{trackingData.status || 'İşleniyor'}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Takip Numarası</h3>
                      <p className="font-medium">{trackingData.trackingNumber || '-'}</p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Kargo Firması</h3>
                      <p className="font-medium">{trackingData.carrier || 'Atanıyor'}</p>
                    </div>
                    {trackingData.estimatedDeliveryTime && (
                      <div className="md:col-span-2">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Tahmini Teslimat</h3>
                        <p className="font-medium">{trackingData.estimatedDeliveryTime}</p>
                      </div>
                    )}
                  </div>

                  {trackingData.printAWBURL && (
                    <div className="pt-6">
                      <a href={trackingData.printAWBURL} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#AF9164] hover:underline flex items-center gap-2">
                        Kargo Etiketini (Waybill) Görüntüle
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
