'use client'

import { ShoppingBag, Star, Package, CheckCircle2, Truck, FlaskConical, CreditCard, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Order } from '@/src/types'
import { useState } from 'react'
import { approveOrder } from '@/src/app/orders/actions'

interface CollectorViewProps {
  orders: Order[]
  reservedOffers?: any[]
}

// Sipariş adımları
const orderSteps = [
  { key: 'paid',              label: 'Ödeme Alındı',   icon: CreditCard },
  { key: 'shipped_to_lab',   label: "Lab'a Yolda",     icon: Truck },
  { key: 'inspecting',       label: 'İnceleniyor',      icon: FlaskConical },
  { key: 'lab_approved',     label: 'Onaylandı',        icon: CheckCircle2 },
  { key: 'shipped_to_buyer', label: 'Kargoda',          icon: Package },
  { key: 'delivered',        label: 'Teslim Edildi',    icon: MapPin },
]

// Hangi adıma kadar tamamlanmış?
const stepOrder = ['pending_payment', 'paid', 'shipped_to_lab', 'inspecting', 'lab_approved', 'shipped_to_buyer', 'delivered', 'completed']

function getCurrentStepIndex(status: string): number {
  const idx = stepOrder.indexOf(status)
  return idx < 0 ? 0 : idx
}

export default function CollectorView({ orders, reservedOffers }: CollectorViewProps) {
  const totalSpend = orders.reduce((s, o) => s + (o.total_price || 0), 0)
  const activeOrders = orders.filter(o => !['completed', 'delivered', 'cancelled', 'refunded'].includes(o.order_status))
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null)

  const handleApprove = async (orderId: string) => {
    if (!confirm('Siparişi teslim aldığınızı onaylıyor musunuz? Bu işlem geri alınamaz ve satıcı payı havuzdan serbest bırakılacaktır.')) {
      return
    }
    setLoadingOrderId(orderId)
    try {
      await approveOrder(orderId)
      alert('Sipariş başarıyla onaylandı ve satıcı hak edişi serbest bırakıldı!')
    } catch (err: any) {
      alert(err.message || 'Sipariş onaylanırken bir hata oluştu.')
    } finally {
      setLoadingOrderId(null)
    }
  }

  return (
    <div className="space-y-10">

      {/* BAŞLIK */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">COLLECTOR DASHBOARD</p>
          <h1 className="text-4xl serif-display italic text-gray-900">Koleksiyon Panelim</h1>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-full">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Koleksiyoner Üyeliği Aktif</span>
        </div>
      </div>

      {/* METRİKLER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Toplam Harcama',
            value: `${totalSpend.toLocaleString('tr-TR')} ₺`,
            sub: 'Tüm zamanlar',
            color: 'text-gray-900',
          },
          {
            label: 'Sahip Olunan Parça',
            value: `${orders.length}`,
            sub: 'Koleksiyonunuzda',
            color: 'text-gray-900',
          },
          {
            label: 'Aktif Sipariş',
            value: `${activeOrders.length}`,
            sub: 'İşlem devam ediyor',
            color: activeOrders.length > 0 ? 'text-amber-500' : 'text-emerald-500',
          },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{m.label}</p>
            <p className={`text-3xl font-bold ${m.color}`}>{m.value}</p>
            <p className="text-xs text-gray-400 font-light mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* REZERVE PARÇALAR */}
      {reservedOffers && reservedOffers.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">REZERVE EDİLEN PARÇALARIM</h2>
          <div className="grid grid-cols-1 gap-4">
            {reservedOffers.map((off) => {
              const product = off.product
              const imageUrl = product?.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=200'
              
              const diffMs = new Date(product.locked_until).getTime() - Date.now()
              const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)))
              const diffMins = Math.max(0, Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)))
              const remainingText = `${diffHours} sa ${diffMins} dk kaldı`

              return (
                <div key={off.id} className="bg-white rounded-3xl border border-[#AF9164]/30 shadow-sm overflow-hidden p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-100">
                      <Image src={imageUrl} alt="" fill sizes="80px" className="object-cover" />
                    </div>
                    <div>
                      <span className="inline-block bg-[#AF9164]/10 text-[#AF9164] text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-1">
                        SİZE ÖZEL REZERVE
                      </span>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{product?.brand || '—'}</p>
                      <h3 className="text-base font-semibold text-gray-900">{product?.model_name || 'Ürün'}</h3>
                      <p className="text-xs text-gray-400 font-light mt-0.5">
                        Rezervasyon Süresi: <span className="text-amber-600 font-semibold">{remainingText}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-gray-400 line-through">{(product.price ?? 0).toLocaleString('tr-TR')} ₺</p>
                      <p className="text-xl font-bold text-emerald-600">{(off.offered_price ?? 0).toLocaleString('tr-TR')} ₺</p>
                    </div>
                    <Link
                      href={`/checkout/${product.id}`}
                      className="bg-black hover:bg-[#AF9164] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-black/10 hover:shadow-none"
                    >
                      Satın Al
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* SİPARİŞ LİSTESİ */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Sipariş Geçmişi</h2>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-24 flex flex-col items-center gap-5 text-center px-8">
            <ShoppingBag size={40} className="text-gray-200" />
            <div>
              <h3 className="text-xl serif-display italic text-gray-600 mb-2">Henüz alışveriş yapmadınız</h3>
              <p className="text-sm text-gray-400 font-light max-w-xs">
                Onaylanmış lüks parçaları koleksiyonunuza katmaya hazır mısınız?
              </p>
            </div>
            <Link href="/#collection" className="mt-2 bg-black text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#AF9164] transition-all">
              Koleksiyona Bak
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const product = order.products
              const imageUrl = product?.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=200'
              const currentIdx = getCurrentStepIndex(order.order_status)
              const isCancelled = ['cancelled', 'refunded'].includes(order.order_status)
              const isCompleted = ['completed', 'delivered'].includes(order.order_status)
              const hasPassport = order.order_status === 'lab_approved' || order.order_status === 'shipped_to_buyer' || isCompleted

              return (
                <div key={order.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Üst: Ürün Bilgisi */}
                  <div className="p-6 flex items-center gap-5">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-100">
                      <Image src={imageUrl} alt="" fill sizes="80px" className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#AF9164]">{product?.brand || '—'}</p>
                      <h3 className="text-base font-semibold text-gray-900 truncate">{product?.model_name || 'Ürün'}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{product?.category} · {product?.condition}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-gray-900">{(order.total_price ?? 0).toLocaleString('tr-TR')} ₺</p>
                      {isCancelled && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">İptal Edildi</span>
                      )}
                      {isCompleted && !isCancelled && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-500">Tamamlandı</span>
                      )}
                    </div>
                  </div>

                  {/* Durum Takip Şeridi */}
                  {!isCancelled && (
                    <div className="px-6 pb-6">
                      <div className="relative">
                        {/* Arka plan çizgisi */}
                        <div className="absolute top-4 left-4 right-4 h-[1px] bg-gray-100" />
                        {/* İlerleme çizgisi */}
                        <div
                          className="absolute top-4 left-4 h-[1px] bg-[#AF9164] transition-all duration-1000"
                          style={{ width: `${Math.min(((currentIdx - 1) / (orderSteps.length - 1)) * 100, 100)}%` }}
                        />

                        <div className="relative grid grid-cols-6 gap-1">
                          {orderSteps.map((step, i) => {
                            const stepIdx = stepOrder.indexOf(step.key)
                            const done = currentIdx > stepIdx
                            const active = currentIdx === stepIdx
                            const Icon = step.icon

                            return (
                              <div key={step.key} className="flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                                  done
                                    ? 'bg-[#AF9164] border-[#AF9164]'
                                    : active
                                    ? 'bg-white border-[#AF9164] shadow-md shadow-[#AF9164]/20'
                                    : 'bg-white border-gray-200'
                                }`}>
                                  <Icon size={13} className={done ? 'text-white' : active ? 'text-[#AF9164]' : 'text-gray-300'} strokeWidth={2} />
                                </div>
                                <p className={`text-[8px] font-bold uppercase tracking-wide text-center leading-tight ${
                                  done ? 'text-[#AF9164]' : active ? 'text-gray-700' : 'text-gray-300'
                                }`}>
                                  {step.label}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Lojistik ve Kargo Bilgileri */}
                      {(order.shipping_tracking_seller || order.shipping_tracking_buyer) && (
                        <div className="mt-4 bg-gray-50 p-4 rounded-xl text-xs space-y-2 text-left">
                          <p className="font-medium text-gray-800 uppercase tracking-widest text-[9px]">
                            Lojistik ve Kargo Bilgileri
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {order.shipping_tracking_seller && (
                              <div>
                                <span className="text-gray-400">Satıcı → Peony Lab: </span>
                                <span className="font-semibold text-black">
                                  {order.shipping_tracking_seller} (Yurtiçi Kargo)
                                </span>
                              </div>
                            )}
                            {order.shipping_tracking_buyer && (
                              <div>
                                <span className="text-gray-400">Peony Lab → Alıcı: </span>
                                <span className="font-semibold text-black">
                                  {order.shipping_tracking_buyer} (Yurtiçi Kargo)
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Onay ve Pasaport Butonları */}
                      {(hasPassport || order.order_status === 'delivered') && (
                        <div className="mt-5 flex justify-end gap-3">
                          {order.order_status === 'delivered' && (
                            <button
                              onClick={() => handleApprove(order.id)}
                              disabled={loadingOrderId === order.id}
                              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-emerald-600 text-white px-5 py-2.5 rounded-full hover:bg-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {loadingOrderId === order.id ? 'Onaylanıyor...' : '✓ Siparişi Onayla (Escrow)'}
                            </button>
                          )}
                          {hasPassport && (
                            <Link
                              href={`/passport/${order.product_id}`}
                              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border border-[#AF9164] text-[#AF9164] px-5 py-2 rounded-full hover:bg-[#AF9164] hover:text-white transition-all duration-300"
                            >
                              ✦ Dijital Pasaportu Görüntüle
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* İptal durumu */}
                  {isCancelled && (
                    <div className="px-6 pb-5">
                      <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-xs text-red-400 font-medium">
                        Bu sipariş iptal edilmiş veya iade edilmiştir.
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
