import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Siparişlerim | Peony Collective',
  description: 'Satın aldığınız veya sattığınız lüks ürünlerin sipariş ve kargo süreçlerini takip edin.',
}

const statusMap: Record<string, { label: string; color: string; step: number }> = {
  pending_payment: { label: 'Ödeme Bekleniyor', color: 'bg-amber-100 text-amber-800 border-amber-200', step: 0 },
  paid: { label: 'Ödendi / Lab\'a Gönderim Bekliyor', color: 'bg-blue-100 text-blue-800 border-blue-200', step: 1 },
  shipped_to_lab: { label: 'Lab\'a Gönderildi', color: 'bg-sky-100 text-sky-800 border-sky-200', step: 2 },
  inspecting: { label: 'Ekspertiz İncelemesinde', color: 'bg-orange-100 text-orange-800 border-orange-200', step: 3 },
  lab_approved: { label: 'Ekspertiz Onaylandı', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', step: 4 },
  shipped_to_buyer: { label: 'Alıcıya Kargolandı', color: 'bg-purple-100 text-purple-800 border-purple-200', step: 5 },
  delivered: { label: 'Teslim Edildi', color: 'bg-green-100 text-green-800 border-green-200', step: 6 },
  completed: { label: 'Tamamlandı', color: 'bg-zinc-100 text-zinc-800 border-zinc-200', step: 6 },
  cancelled: { label: 'İptal Edildi', color: 'bg-red-100 text-red-800 border-red-200', step: -1 },
  refunded: { label: 'İade Edildi', color: 'bg-rose-100 text-rose-800 border-rose-200', step: -1 },
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab = 'purchases' } = await searchParams
  const supabase = await createClient()

  // 1. Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Fetch buyer orders (purchases)
  const { data: purchases } = await supabase
    .from('orders')
    .select('*, products(*)')
    .eq('buyer_id', user.id)
    .order('created_at', { ascending: false })

  // 3. Fetch seller orders (sales)
  const { data: sales } = await supabase
    .from('orders')
    .select('*, products!inner(*)')
    .eq('products.seller_id', user.id)
    .order('created_at', { ascending: false })

  const activeOrders = tab === 'sales' ? sales || [] : purchases || []

  return (
    <main className="min-h-screen bg-[#FCFCFB] text-[#1A1A1A]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
        {/* Title */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="serif-display text-3xl font-light text-[#AF9164] uppercase tracking-wide">
            Siparişlerim & Satışlarım
          </h1>
          <p className="text-xs text-gray-400 font-light uppercase tracking-widest mt-1">
            İşlem ve Kargo Durumu Takibi
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 mb-10">
          <Link
            href="/orders?tab=purchases"
            className={`px-6 py-3 text-xs uppercase tracking-widest transition-all ${
              tab !== 'sales'
                ? 'border-b-2 border-[#AF9164] text-[#1A1A1A] font-bold'
                : 'text-gray-400 hover:text-black font-light'
            }`}
          >
            Satın Aldıklarım ({purchases?.length || 0})
          </Link>
          <Link
            href="/orders?tab=sales"
            className={`px-6 py-3 text-xs uppercase tracking-widest transition-all ${
              tab === 'sales'
                ? 'border-b-2 border-[#AF9164] text-[#1A1A1A] font-bold'
                : 'text-gray-400 hover:text-black font-light'
            }`}
          >
            Sattıklarım ({sales?.length || 0})
          </Link>
        </div>

        {/* Orders list */}
        {activeOrders.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl p-8">
            <p className="text-sm text-gray-400 font-light">Henüz bir kayıt bulunmuyor.</p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-[#1A1A1A] text-white hover:bg-[#AF9164] transition-all font-light tracking-wider text-xs uppercase"
              >
                Koleksiyonu Keşfet
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {activeOrders.map((order) => {
              const product = order.products
              const statusInfo = statusMap[order.order_status] || {
                label: order.order_status,
                color: 'bg-gray-100 text-gray-800 border-gray-200',
                step: 0,
              }

              // Timeline steps definition
              const steps = [
                'Ödeme',
                'Lab Gönderimi',
                'Ekspertiz',
                'Alıcı Sevkiyatı',
                'Teslimat',
              ]

              // Calculate active progress step (mapped to the 5 timeline categories)
              let currentTimelineStep = 0
              if (statusInfo.step >= 1) currentTimelineStep = 1 // paid
              if (statusInfo.step >= 2) currentTimelineStep = 2 // shipped_to_lab
              if (statusInfo.step >= 3) currentTimelineStep = 3 // inspecting or lab_approved
              if (statusInfo.step >= 5) currentTimelineStep = 4 // shipped_to_buyer
              if (statusInfo.step >= 6) currentTimelineStep = 5 // delivered/completed

              return (
                <div
                  key={order.id}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                        Sipariş ID: #{order.id.substring(0, 8)}
                      </p>
                      <p className="text-[10px] text-gray-500 font-light">
                        Tarih: {new Date(order.created_at).toLocaleDateString('tr-TR')}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full border ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>

                  {/* Order Details and Visual Timeline */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Product visual info */}
                    <div className="lg:col-span-4 flex gap-4">
                      <div className="relative w-16 h-20 bg-gray-50 flex-shrink-0">
                        {product?.public_images?.[0] ? (
                          <Image
                            src={product.public_images[0]}
                            alt={product.brand}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-[10px] text-gray-400">
                            No Img
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-between py-1">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-black">
                            {product?.brand || 'Bilinmeyen Marka'}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-light italic">
                            {product?.model_name || 'Bilinmeyen Model'}
                          </p>
                        </div>
                        <div className="text-xs font-medium text-black">
                          {order.total_price.toLocaleString('tr-TR')} ₺
                        </div>
                      </div>
                    </div>

                    {/* Timeline stepper */}
                    {statusInfo.step >= 0 && (
                      <div className="lg:col-span-8 w-full py-2">
                        <div className="relative flex justify-between items-center w-full">
                          {/* Progress Line background */}
                          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
                          {/* Progress Line active fill */}
                          <div
                            className="absolute top-1/2 left-0 h-0.5 bg-[#AF9164] -translate-y-1/2 z-0 transition-all duration-500"
                            style={{
                              width: `${((currentTimelineStep - 1) / (steps.length - 1)) * 100}%`,
                            }}
                          />

                          {/* Step circles */}
                          {steps.map((stepText, idx) => {
                            const isCompleted = idx < currentTimelineStep
                            const isActive = idx === currentTimelineStep - 1

                            return (
                              <div
                                key={idx}
                                className="flex flex-col items-center justify-center relative z-10"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] font-bold transition-all duration-300 ${
                                    isCompleted
                                      ? 'bg-[#AF9164] border-[#AF9164] text-white'
                                      : isActive
                                        ? 'bg-black border-black text-white ring-4 ring-black/10'
                                        : 'bg-white border-gray-200 text-gray-300'
                                  }`}
                                >
                                  {isCompleted ? '✓' : idx + 1}
                                </div>
                                <span
                                  className={`text-[8px] uppercase tracking-widest mt-2 whitespace-nowrap hidden sm:block ${
                                    isActive || isCompleted
                                      ? 'text-black font-bold'
                                      : 'text-gray-400 font-light'
                                  }`}
                                >
                                  {stepText}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions / Kargo Takip Bilgileri */}
                  {(order.shipping_tracking_seller || order.shipping_tracking_buyer) && (
                    <div className="bg-gray-50 p-4 rounded-xl text-xs space-y-2">
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
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
