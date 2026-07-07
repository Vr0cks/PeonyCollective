'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Play, CheckCircle2, XCircle, RefreshCw, Truck } from 'lucide-react'

interface TestSuiteClientProps {
  initialOrders: any[]
}

export default function TestSuiteClient({ initialOrders }: TestSuiteClientProps) {
  const router = useRouter()
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function triggerOtoWebhook(orderId: string) {
    try {
      setLoadingOrderId(orderId)
      setStatusMessage(null)
      const response = await fetch('/api/oto/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'shipment_delivered',
          orderId,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setStatusMessage({ type: 'success', text: `OTO Kargo Webhook Başarılı! Sipariş teslim edildi olarak işaretlendi.` })
        router.refresh()
      } else {
        setStatusMessage({ type: 'error', text: `Hata: ${data.error || 'Webhook başarısız oldu.'}` })
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Bağlantı hatası: ${err.message}` })
    } finally {
      setLoadingOrderId(null)
    }
  }

  async function triggerEntrupyWebhook(productId: string, isAuthentic: boolean) {
    try {
      setLoadingOrderId(productId)
      setStatusMessage(null)
      const response = await fetch('/api/webhooks/entrupy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'entrupy-signature': 'peony_ent_sec_9x8a7b6c5d4e3f2g1h',
        },
        body: JSON.stringify({
          event: 'session.completed',
          data: {
            customer_item_id: productId,
            status: isAuthentic ? 'verified' : 'rejected',
            certificate_url: isAuthentic ? 'https://example.com/mock-certificate.pdf' : null,
          },
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setStatusMessage({ 
          type: 'success', 
          text: `Entrupy Webhook Başarılı! Ürün doğrulama durumu: ${isAuthentic ? 'Orijinal (verified)' : 'Sahte (rejected)'}.` 
        })
        router.refresh()
      } else {
        setStatusMessage({ type: 'error', text: `Hata: ${data.error || 'Webhook başarısız oldu.'}` })
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Bağlantı hatası: ${err.message}` })
    } finally {
      setLoadingOrderId(null)
    }
  }

  // Debug: Direct payment status simulator (sets order to paid)
  async function forcePayOrder(orderId: string) {
    try {
      setLoadingOrderId(orderId)
      setStatusMessage(null)
      
      const response = await fetch('/api/cargo/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, action: 'mark_as_paid' }),
      })

      const data = await response.json()
      if (response.ok) {
        setStatusMessage({ type: 'success', text: `Sipariş ödemesi manuel olarak tamamlandı (Paid durumuna geçirildi) ve OTO kargosu tetiklendi!` })
        router.refresh()
      } else {
        setStatusMessage({ type: 'error', text: `Hata: ${data.error || 'İşlem başarısız.'}` })
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Bağlantı hatası: ${err.message}` })
    } finally {
      setLoadingOrderId(null)
    }
  }

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div className={`p-4 rounded-xl border text-sm flex items-center gap-3 transition-all animate-fade-in ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-300' 
            : 'bg-red-950/40 border-red-500/20 text-red-300'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <div className="flex justify-between items-center bg-zinc-900/60 p-4 border border-white/5 rounded-2xl">
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Aktif Siparişler Listesi</span>
        <button 
          onClick={() => { router.refresh(); setStatusMessage({ type: 'success', text: 'Sipariş listesi güncellendi.' }) }}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest border border-white/10 px-4 py-2 hover:bg-white/5 rounded-xl transition-all"
        >
          <RefreshCw size={12} className={loadingOrderId ? 'animate-spin' : ''} /> Listeyi Yenile
        </button>
      </div>

      <div className="bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-900 border-b border-white/5 text-zinc-400 uppercase tracking-widest font-bold text-[9px]">
                <th className="p-4">Sipariş ID / Ürün</th>
                <th className="p-4">Alıcı Detayları</th>
                <th className="p-4">Tutar</th>
                <th className="p-4">Mevcut Durum</th>
                <th className="p-4 text-right">Simülasyon İşlemleri</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {initialOrders.map((order) => {
                const product = order.products
                return (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 space-y-1 max-w-[200px]">
                      <p className="font-mono text-white/50 text-[10px]">#{order.id.substring(0, 8)}</p>
                      <p className="font-bold text-white uppercase truncate">{product?.brand} - {product?.model_name}</p>
                    </td>
                    <td className="p-4 space-y-0.5">
                      <p className="text-white font-medium">{order.buyer_name || 'Bilinmiyor'}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{order.buyer_phone}</p>
                    </td>
                    <td className="p-4 font-bold text-[#AF9164]">
                      {order.total_price.toLocaleString('tr-TR')} ₺
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase font-bold border ${
                        order.order_status === 'pending_payment' 
                          ? 'bg-amber-950/40 border-amber-500/20 text-amber-400'
                          : order.order_status === 'paid'
                          ? 'bg-blue-950/40 border-blue-500/20 text-blue-400'
                          : order.order_status === 'delivered'
                          ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                      }`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2 space-y-2">
                      {order.order_status === 'pending_payment' && (
                        <button
                          disabled={!!loadingOrderId}
                          onClick={() => forcePayOrder(order.id)}
                          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg transition-all"
                        >
                          <Play size={10} /> Ödendi Yap (PayTR Simüle Et)
                        </button>
                      )}

                      <button
                        disabled={!!loadingOrderId}
                        onClick={() => triggerEntrupyWebhook(order.product_id, true)}
                        className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg transition-all"
                      >
                        <CheckCircle2 size={10} /> Entrupy Orijinal
                      </button>

                      <button
                        disabled={!!loadingOrderId}
                        onClick={() => triggerEntrupyWebhook(order.product_id, false)}
                        className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg transition-all"
                      >
                        <XCircle size={10} /> Entrupy Sahte
                      </button>

                      <button
                        disabled={!!loadingOrderId}
                        onClick={() => triggerOtoWebhook(order.id)}
                        className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg transition-all"
                      >
                        <Truck size={10} /> OTO Kargo Teslim Et
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
