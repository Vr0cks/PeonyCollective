import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { transitionOrderToInspecting, approveOrderInLab, rejectOrderInLab } from '../actions'

export default async function AuthenticationLabPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>
}) {
  const { orderId } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Admin kontrolü
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white border border-red-100 rounded-3xl text-center">
        <h1 className="text-red-500 text-xl font-semibold mb-2">Yetkisiz Erişim</h1>
        <p className="text-sm text-gray-500">Bu sayfayı görüntüleme yetkiniz bulunmamaktadır.</p>
      </div>
    )
  }

  // Lab inceleme kuyruğundaki aktif siparişleri çek (Yolda veya İnceleniyor durumunda olanlar)
  const { data: orders } = await supabase
    .from('orders')
    .select('*, products(*), buyer:profiles!buyer_id(*), seller:profiles!seller_id(*)')
    .in('order_status', ['shipped_to_lab', 'inspecting'])
    .order('created_at', { ascending: true })

  const activeOrders = orders || []

  // Seçili siparişi bul veya kuyruktaki ilk siparişi seç
  const currentOrder = activeOrders.find(o => o.id === orderId) || activeOrders[0] || null

  const product = currentOrder?.products as any
  const seller = currentOrder?.seller as any

  const masterReference = {
    stitching_angle: '18 derece Hermès klasik eğik dikiş kalıbı',
    stamp_depth: '0.2mm pres sıcak baskı, lazer döküm izi yok'
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 animate-fade-in text-[#1A1A1A]">
      {/* BAŞLIK VE KONTROLLER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-gray-200 pb-6 gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
            GİZLİ LABORATUVAR EKRANI
          </span>
          <h1 className="serif-display text-3xl font-light tracking-wide text-black mb-2">A/B Orijinallik Karşılaştırma Labı</h1>
          <p className="text-gray-500 font-light text-sm">Gelen fiziki lüks çantayı, Peony Orijinallik Veritabanı referansıyla yan yana doğrulayın.</p>
        </div>

        {currentOrder && (
          <div className="flex flex-wrap items-center gap-3">
            {currentOrder.order_status === 'shipped_to_lab' ? (
              <form action={async () => {
                'use server'
                await transitionOrderToInspecting(currentOrder.id)
              }}>
                <button type="submit" className="bg-[#AF9164] hover:bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                  İncelemeyi Başlat (Yolda → İnceleniyor)
                </button>
              </form>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <form action={async (formData) => {
                  'use server'
                  const reason = formData.get('reason') as string
                  await rejectOrderInLab(currentOrder.id, reason || 'Dikiş/Logo kalıpları referans standartlara uymuyor.')
                }} className="flex items-center gap-2">
                  <input
                    type="text"
                    name="reason"
                    placeholder="Ret Nedeni (örn: Dikiş hatası)"
                    className="border border-gray-200 px-3 py-2 text-xs rounded-xl focus:outline-none focus:border-red-400 bg-white"
                    required
                  />
                  <button type="submit" className="bg-red-50 text-red-600 hover:bg-red-100 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                    Sahte (Reddet)
                  </button>
                </form>

                <form action={async () => {
                  'use server'
                  await approveOrderInLab(currentOrder.id)
                }}>
                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                    Orijinal (Onayla & 2. Kargoyu Çıkar)
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ANA PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SOL: Sipariş Listesi Kuyruğu */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">İnceleme Bekleyenler ({activeOrders.length})</h2>
          {activeOrders.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center text-xs text-gray-400 font-light shadow-sm">
              Kuyrukta bekleyen sipariş bulunmuyor.
            </div>
          ) : (
            <div className="space-y-2">
              {activeOrders.map((o) => {
                const p = o.products as any
                const active = o.id === currentOrder?.id
                return (
                  <Link
                    key={o.id}
                    href={`/admin/lab?orderId=${o.id}`}
                    className={`block p-4 rounded-2xl border text-left transition-all ${
                      active
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                        : 'bg-white border-gray-100 hover:border-[#AF9164] text-gray-800'
                    }`}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#AF9164]">
                      {p.brand}
                    </p>
                    <h4 className="text-xs font-semibold truncate mt-0.5">{p.model_name}</h4>
                    <div className="flex justify-between items-center mt-3">
                      <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        o.order_status === 'inspecting'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {o.order_status === 'inspecting' ? 'İnceleniyor' : 'Yolda'}
                      </span>
                      <span className="text-[8px] opacity-60">#{o.id.substring(0, 8)}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* SAĞ: A/B Kıyaslama */}
        {currentOrder ? (
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            {/* İncelenen Ürün Detayları */}
            <div className="space-y-6">
              <div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">İNCELENEN FİZİKİ ESER</span>
                <h3 className="serif-display text-2xl text-black mt-1 font-normal">{product?.brand} - {product?.model_name}</h3>
                <p className="text-xs text-gray-400 mt-1 font-light">
                  Satıcı: {seller?.first_name} {seller?.last_name} | Durum: {product?.condition}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Grup A Yakın Çekimleri</h4>
                <div className="grid grid-cols-2 gap-2">
                  {product?.public_images?.slice(0, 4).map((imgUrl: string, idx: number) => (
                    <div key={idx} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100 group">
                      <Image src={imgUrl} alt="" fill sizes="200px" className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                  )) || (
                    <div className="col-span-2 py-10 bg-gray-50 rounded-2xl text-center text-xs text-gray-400">Görsel bulunamadı</div>
                  )}
                </div>
              </div>

              <div className="bg-[#AF9164]/10 p-4 rounded-2xl border border-[#AF9164]/20 text-xs space-y-1.5">
                <p className="text-[#AF9164] font-bold uppercase tracking-wider text-[9px] mb-1">Satıcı Ekspertiz Beyanı</p>
                <p><strong>Koku Skoru:</strong> {product?.odor_score || 9}/10</p>
                <p><strong>Spa Tedavisi:</strong> {product?.has_spa_treatment ? 'Uygulandı (Fiziki yapısı korunmuş)' : 'Uygulanmadı'}</p>
                <p className="text-gray-500 font-light italic mt-1">"{product?.description}"</p>
              </div>
            </div>

            {/* Referans Master Eser Veritabanı */}
            <div className="space-y-6 border-t md:border-t-0 md:border-l border-gray-100 md:pl-8">
              <div>
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">PEONY MASTER REFERENCE DB</span>
                <h3 className="serif-display text-2xl text-black mt-1 font-normal">%100 Doğrulanmış Örnek</h3>
                <p className="text-xs text-gray-400 mt-1 font-light">Aşağıdaki resmi sertifikalı üretim referanslarıyla karşılaştırın.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Referans Dikiş Kalıbı (Stitching)</span>
                  <div className="aspect-video bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100">
                    <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80" alt="" className="w-full h-full object-cover grayscale" />
                    <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-sm p-3 rounded-xl text-white">
                      <p className="text-[8px] font-bold text-[#AF9164] uppercase tracking-wider">UZMAN LAB DEĞERLENDİRMESİ</p>
                      <p className="text-[10px] mt-0.5 font-light">{masterReference.stitching_angle}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Referans Logo Baskısı (Stamp)</span>
                  <div className="aspect-video bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100">
                    <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80" alt="" className="w-full h-full object-cover grayscale" />
                    <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-sm p-3 rounded-xl text-white">
                      <p className="text-[8px] font-bold text-[#AF9164] uppercase tracking-wider">UZMAN LAB DEĞERLENDİRMESİ</p>
                      <p className="text-[10px] mt-0.5 font-light">{masterReference.stamp_depth}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-9 bg-white border border-gray-100 rounded-3xl p-24 text-center space-y-4 shadow-sm">
            <h3 className="serif-display text-2xl text-black italic">Laboratuvar İnceleme Kuyruğu Temiz</h3>
            <p className="text-sm text-gray-400 font-light max-w-sm mx-auto">
              Onay bekleyen veya incelemesi devam eden lüks C2C siparişi bulunmamaktadır.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
