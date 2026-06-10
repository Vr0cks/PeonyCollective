import { createClient } from '@/src/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Sipariş Başarılı | Peony Collective',
  description: 'Siparişiniz başarıyla alındı. Teşekkür ederiz.',
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string; productId?: string }>
}) {
  const { order_id } = await searchParams
  const supabase = await createClient()
  
  let order = null
  if (order_id) {
    const { data } = await supabase
      .from('orders')
      .select('*, products(*)')
      .eq('id', order_id)
      .single()
    order = data
  }

  const product = order?.products

  return (
    <div className="min-h-screen bg-[#FCFCFB] text-[#1A1A1A] flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-500/5 text-center space-y-8 relative overflow-hidden">
        {/* Subtle decorative gold line at top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#AF9164]" />
        
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-[#AF9164]">
          <span className="text-3xl">✨</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="serif-display text-3xl font-light uppercase tracking-wide">Siparişiniz Alındı!</h1>
          <p className="sans-detail text-[9px] uppercase tracking-widest text-[#AF9164] font-bold">Peony Collective Escrow Koruması Etkin</p>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto font-light">
          Tebrikler! Seçkin parçanız için ödemeniz güvenli havuz hesabımıza aktarılmıştır. Ürün öncelikle Peony Lab&apos;e sevk edilecek ve 32 noktalı denetim sonrası size kargolanacaktır.
        </p>

        {/* Dynamic Order Details Box */}
        {order && product && (
          <div className="border border-gray-100 bg-gray-50/50 p-6 rounded-2xl text-left space-y-4 max-w-md mx-auto">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">
              SİPARİŞ DETAYLARI
            </h3>
            
            <div className="flex gap-4">
              <div className="relative w-16 h-20 bg-white border border-gray-100 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={product.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=150'}
                  alt={product.brand}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-black">
                    {product.brand}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-light italic">
                    {product.model_name}
                  </p>
                </div>
                <div className="text-xs font-bold text-gray-900">
                  {order.total_price.toLocaleString('tr-TR')} ₺
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>Referans No:</span>
                <span className="font-mono font-bold text-black">#{order.id.substring(0, 8)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ödeme Durumu:</span>
                <span className="text-emerald-600 font-bold uppercase">Başarılı (PayTR)</span>
              </div>
              <div className="flex justify-between">
                <span>Lojistik Durumu:</span>
                <span className="text-[#AF9164] font-bold uppercase">Lab Gönderimi Bekleniyor</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
          <Link 
            href="/orders" 
            className="w-full sm:w-auto text-center bg-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-md active:scale-95"
          >
            Siparişi Takip Et
          </Link>
          <Link 
            href="/" 
            className="w-full sm:w-auto text-center border border-black/20 text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
