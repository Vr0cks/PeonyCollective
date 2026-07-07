'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { updateOrderStatus } from '../actions'
import { Truck, Check, Eye, Loader2, AlertCircle } from 'lucide-react'

interface OrdersAdminClientProps {
  initialOrders: any[]
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending_payment: { label: 'Ödeme Bekleniyor', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  paid: { label: 'Ödendi / Lab Gönderimi Bekliyor', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  shipped_to_lab: { label: "Lab'a Gönderildi", color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  inspecting: { label: 'Ekspertiz İncelemesinde', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  lab_approved: { label: 'Ekspertiz Onaylandı', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  shipped_to_buyer: { label: 'Alıcıya Sevk Edildi', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  delivered: { label: 'Teslim Edildi', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  completed: { label: 'Tamamlandı', color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' },
  cancelled: { label: 'İptal Edildi', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  refunded: { label: 'İade Edildi', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
}

export default function OrdersAdminClient({ initialOrders }: OrdersAdminClientProps) {
  const router = useRouter()
  const [orders, setOrders] = useState(initialOrders)
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpdateStatus = async (orderId: string, currentStatus: string) => {
    try {
      setLoadingOrderId(orderId)
      setError(null)

      if (currentStatus === 'shipped_to_lab') {
        // Shipped to Lab -> Inspecting
        await updateOrderStatus(orderId, 'inspecting')
      } else if (currentStatus === 'inspecting') {
        // Inspecting -> Lab Approved
        await updateOrderStatus(orderId, 'lab_approved')
      } else if (currentStatus === 'lab_approved') {
        // Lab Approved -> Shipped to Buyer (Triggers cargo generation API)
        const res = await fetch('/api/admin/ship-to-buyer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId }),
        })

        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Kargo oluşturulurken bir hata oluştu.')
        }
      } else if (currentStatus === 'shipped_to_buyer') {
        // Shipped to Buyer -> Delivered
        await updateOrderStatus(orderId, 'delivered')
      } else if (currentStatus === 'delivered') {
        // Delivered -> Completed
        await updateOrderStatus(orderId, 'completed')
      }

      router.refresh()
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Bir hata oluştu.')
    } finally {
      setLoadingOrderId(null)
    }
  }

  const getNextAction = (status: string) => {
    switch (status) {
      case 'shipped_to_lab':
        return { label: 'Ekspertize Al', nextStatus: 'inspecting' }
      case 'inspecting':
        return { label: 'Ekspertizi Onayla', nextStatus: 'lab_approved' }
      case 'lab_approved':
        return { label: 'Alıcıya Kargola', nextStatus: 'shipped_to_buyer', isCargo: true }
      case 'shipped_to_buyer':
        return { label: 'Teslim Edildi İşaretle', nextStatus: 'delivered' }
      case 'delivered':
        return { label: 'Tamamlandı İşaretle', nextStatus: 'completed' }
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle size={16} />
          <span className="text-xs font-semibold uppercase tracking-wider">{error}</span>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        {orders.length === 0 ? (
          <div className="p-20 text-center text-white/30 text-xs font-light uppercase tracking-wider">
            Sipariş bulunamadı.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 text-white/40 uppercase tracking-widest font-bold border-b border-white/5">
                  <th className="px-6 py-4">Ürün Bilgisi</th>
                  <th className="px-6 py-4">Satıcı & Alıcı</th>
                  <th className="px-6 py-4">Kargo Durumu</th>
                  <th className="px-6 py-4">Durum</th>
                  <th className="px-6 py-4 text-right">İşlem / Aksiyon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => {
                  const product = order.products
                  const buyer = order.buyer
                  const seller = order.seller
                  const statusInfo = statusMap[order.order_status] || { label: order.order_status, color: 'bg-white/10 text-white/70' }
                  const action = getNextAction(order.order_status)
                  const loading = loadingOrderId === order.id

                  return (
                    <tr key={order.id} className="hover:bg-white/3 transition-colors">
                      {/* Ürün */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-14 bg-white/5 rounded-lg overflow-hidden relative border border-white/5">
                            {product?.public_images?.[0] ? (
                              <Image src={product.public_images[0]} alt="" fill sizes="48px" className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/20">—</div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-[#AF9164] uppercase tracking-wider">{product?.brand}</p>
                            <p className="text-white/80 mt-0.5">{product?.model_name}</p>
                            <p className="text-[10px] text-white/30 mt-1 font-mono">ID: #{order.id.substring(0, 8)}</p>
                          </div>
                        </div>
                      </td>

                      {/* Satıcı & Alıcı */}
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div>
                            <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest block">Satıcı</span>
                            <span className="font-semibold text-white/80">{seller?.first_name} {seller?.last_name}</span>
                            <span className="text-[10px] text-white/40 block font-mono">{seller?.phone_number}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest block">Alıcı</span>
                            <span className="font-semibold text-white/80">{buyer?.first_name} {buyer?.last_name}</span>
                            <span className="text-[10px] text-white/40 block font-mono">{buyer?.phone_number}</span>
                          </div>
                        </div>
                      </td>

                      {/* Kargo Bilgileri */}
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-white/70">
                          {order.shipping_tracking_seller && (
                            <div>
                              <span className="text-white/30 font-medium">Satıcı → Lab:</span>{' '}
                              <span className="font-mono text-white/90 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                {order.shipping_tracking_seller}
                              </span>
                            </div>
                          )}
                          {order.shipping_tracking_buyer && (
                            <div>
                              <span className="text-white/30 font-medium">Lab → Alıcı:</span>{' '}
                              <span className="font-mono text-white/90 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                {order.shipping_tracking_buyer}
                              </span>
                            </div>
                          )}
                          {!order.shipping_tracking_seller && !order.shipping_tracking_buyer && (
                            <span className="text-white/20 italic">Kargo bilgisi yok</span>
                          )}
                        </div>
                      </td>

                      {/* Durum */}
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 text-[9px] uppercase font-bold tracking-wider rounded-full border ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Aksiyon */}
                      <td className="px-6 py-4 text-right">
                        {action ? (
                          <button
                            onClick={() => handleUpdateStatus(order.id, order.order_status)}
                            disabled={loading}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 ${
                              action.isCargo
                                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/10'
                                : 'bg-[#AF9164] hover:bg-[#AF9164]/80 text-white'
                            }`}
                          >
                            {loading ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : action.isCargo ? (
                              <Truck size={12} />
                            ) : (
                              <Check size={12} />
                            )}
                            {action.label}
                          </button>
                        ) : (
                          <span className="text-white/20 italic">Süreç tamamlandı</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
