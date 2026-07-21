import { createClient } from '@/src/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { updateProductStatus, triggerVisionAnalysisAction } from '../actions'
import { Product, Profile } from '@/src/types'

export default async function AdminPendingPage() {
  const supabase = await createClient()

  const { data: pendingProductsRaw } = await supabase
    .from('products')
    .select(`*, profiles:seller_id (first_name, last_name), ai_authentication_logs (claude_verdict, claude_confidence, claude_raw_response)`)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  const pendingProducts: Product[] = (pendingProductsRaw || []) as Product[]

  return (
    <div className="p-8 min-h-full">
      {/* Header Section: Component Title and Context */}
      <div className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-2">Admin Panel</p>
        <h1 className="text-3xl font-bold text-white tracking-tight">Onay Kuyruğu</h1>
        <p className="text-white/40 text-sm mt-1">Satıcıların yüklediği, ekspertiz bekleyen ürünler.</p>
      </div>

      {/* Metrics Section: Dynamic Pending Item Counter */}
      <div className="mb-8 flex items-center gap-3">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${
          pendingProducts.length > 0
            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
          {pendingProducts.length > 0 ? (
            <><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />{pendingProducts.length} ürün bekliyor</>
          ) : (
            <><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Kuyruk boş — her şey temiz!</>
          )}
        </div>
      </div>

      {pendingProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Kuyruk Boş</h3>
          <p className="text-white/30 text-sm">Şu an onay bekleyen ürün yok. Harika gidiyorsunuz.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {pendingProducts.map((product) => {
            const approveAction = updateProductStatus.bind(null, product.id, 'approved')
            const rejectAction = updateProductStatus.bind(null, product.id, 'rejected')
            const sellerName = product.profiles
              ? `${(product.profiles as Profile).first_name || ''} ${(product.profiles as Profile).last_name || ''}`.trim()
              : 'Anonim Satıcı'
            const images = Array.isArray(product.public_images) ? product.public_images : []

            return (
              <div
                key={product.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                {/* Visual Representation: Image Carousel */}
                <div className="relative h-56 bg-black overflow-hidden">
                  {images[0] ? (
                    <Image
                      src={images[0]}
                      alt={product.model_name || ''}
                      fill
                      sizes="(max-width: 1280px) 100vw, 50vw"
                      className="object-cover opacity-90"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/20 text-sm">Görsel yüklenmemiş</span>
                    </div>
                  )}

                  {/* Secondary Images: Miniature Preview Strip */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {images.slice(0, 5).map((img, i) => (
                        <div key={i} className="w-10 h-10 rounded-md overflow-hidden border border-white/30 relative">
                          <Image src={img} alt="" fill sizes="40px" className="object-cover" />
                        </div>
                      ))}
                      {images.length > 5 && (
                        <div className="w-10 h-10 rounded-md bg-black/60 border border-white/30 flex items-center justify-center">
                          <span className="text-white text-[9px] font-bold">+{images.length - 5}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Status Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                    <span className="bg-amber-500/90 backdrop-blur text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      Onay Bekliyor
                    </span>
                    <span className="bg-black/70 backdrop-blur text-white/70 text-[9px] font-bold px-2.5 py-1 rounded-full">
                      {images.length} fotoğraf
                    </span>
                  </div>

                  {/* Interaction Overlay: Link to Detailed Product View */}
                  <Link
                    href={`/admin/product/${product.id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 backdrop-blur-sm transition-all duration-300"
                  >
                    <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/50 px-5 py-2.5 rounded-full">
                      Tüm Fotoğrafları Gör →
                    </span>
                  </Link>
                </div>

                {/* Product Metadata and Action Area */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#AF9164] mb-1">{product.brand}</p>
                      <h2 className="text-lg font-semibold text-white leading-tight">{product.model_name}</h2>
                      <p className="text-white/40 text-xs mt-1">{product.category} • {product.condition}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{(product.price || 0).toLocaleString('tr-TR')} ₺</p>
                    </div>
                  </div>

                  {product.description && (
                    <p className="text-white/40 text-xs leading-relaxed line-clamp-2 border-t border-white/5 pt-4">
                      {product.description}
                    </p>
                  )}

                  {/* ✦ PEONY LAB GÖRSEL KONTROL ANALİZ RAPORU */}
                  {(() => {
                    const aiLogs = (product as any).ai_authentication_logs
                    const latestLog = Array.isArray(aiLogs) && aiLogs.length > 0 ? aiLogs[aiLogs.length - 1] : null
                    const triggerAction = triggerVisionAnalysisAction.bind(null, product.id)

                    return (
                      <div className="bg-[#18191E] border border-[#AF9164]/30 rounded-xl p-4 mt-2 shadow-lg relative z-30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#AF9164] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#AF9164] animate-pulse" /> ✦ PEONY LAB GÖRSEL ANALİZ RAPORU
                          </span>
                          <span className="text-[9.5px] bg-[#AF9164]/10 text-[#AF9164] px-2.5 py-1 rounded border border-[#AF9164]/30 font-semibold tracking-wider">
                            {latestLog ? `Güven Skoru: %${latestLog.claude_confidence || 95}` : 'Bekliyor'}
                          </span>
                        </div>
                        
                        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                          {latestLog ? latestLog.claude_raw_response : 'Fotoğraflar yüklendi. Claude Vision ön inceleme raporu oluşturulmaya hazır.'}
                        </p>

                        {!latestLog && (
                          <form action={triggerAction} className="mt-3 relative z-40">
                            <button 
                              type="submit"
                              className="w-full py-2.5 bg-[#AF9164] hover:bg-[#96794F] text-white rounded-lg text-[10px] font-bold uppercase tracking-[1.5px] transition-all cursor-pointer shadow-md"
                            >
                              ⚡ CLAUDE VISION ANALİZİNİ BAŞLAT (3 SN)
                            </button>
                          </form>
                        )}
                      </div>
                    )
                  })()}

                  {/* Seller Context Information */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white/50">{sellerName[0] || '?'}</span>
                      </div>
                      <div>
                        <p className="text-[9px] text-white/30 uppercase tracking-widest">Satıcı</p>
                        <p className="text-xs font-semibold text-white/70">{sellerName}</p>
                      </div>
                    </div>
                    <p className="text-[9px] text-white/20">
                      {product.created_at ? new Date(product.created_at).toLocaleDateString('tr-TR') : ''}
                    </p>
                  </div>

                  {/* Administrative Action Controls (Approve / Reject) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <form action={approveAction}>
                      <button className="w-full py-3 h-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 hover:border-emerald-500 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer">
                        ✓ Onayla ve Satışa Çıkar
                      </button>
                    </form>
                    <form action={rejectAction} className="flex flex-col gap-2">
                      <input 
                        type="text" 
                        name="reason" 
                        placeholder="Reddetme sebebi (opsiyonel)" 
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                      <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer">
                        ✕ Reddet
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
