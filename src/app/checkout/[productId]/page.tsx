import { createClient } from '@/src/utils/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import CheckoutForm from './CheckoutForm'
import Image from 'next/image'

export const metadata = {
  title: 'Güvenli Ödeme | Peony Collective',
  description: 'Peony Collective üzerinden lüks ürün alım işlemlerinizi 3D Secure ile güvenle tamamlayın.',
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  const supabase = await createClient()

  // 1. Check user authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect(`/login?redirect=/checkout/${productId}`)
  }

  // 2. Fetch product details
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .eq('status', 'approved')
    .single()

  if (!product) return notFound()

  // 2.5 Check if there is an active accepted offer for this buyer and product
  const { data: activeOffer } = await supabase
    .from('offers')
    .select('*')
    .eq('product_id', productId)
    .eq('buyer_id', user.id)
    .eq('status', 'accepted')
    .limit(1)
    .maybeSingle()

  const isReserved = product.locked_by === user.id && product.locked_until && new Date(product.locked_until) > new Date()
  const currentPrice = (isReserved && activeOffer) ? activeOffer.offered_price : product.price

  // 3. Fetch buyer profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  const hasDeliveryInfo = profile.address && profile.phone_number

  return (
    <main className="min-h-screen bg-[#FCFCFB] text-[#1A1A1A]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="serif-display text-3xl font-light text-[#AF9164] uppercase tracking-wide">
              Güvenli Ödeme
            </h1>
            <p className="text-xs text-gray-400 font-light uppercase tracking-widest mt-1">
              Peony Collective Lab Onaylı Alışveriş
            </p>
          </div>
          <Link
            href={`/product/${product.id}`}
            className="text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-[#AF9164] font-medium transition-colors"
          >
            ← Alışverişe Geri Dön
          </Link>
        </div>

        {hasDeliveryInfo ? (
          <CheckoutForm 
            productId={product.id} 
            product={product} 
            currentPrice={currentPrice} 
            profile={profile}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sol: Adres Kontrolü ve Ödeme Formu */}
            <div className="lg:col-span-7 space-y-8">
              {/* Teslimat ve Fatura Adresi */}
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-gray-800">
                    1. Teslimat & Fatura Bilgileri
                  </h3>
                  <Link
                    href="/settings"
                    className="text-[10px] uppercase tracking-wider text-[#AF9164] hover:underline"
                  >
                    Düzenle
                  </Link>
                </div>
                <div className="text-center py-4 space-y-3">
                  <p className="text-sm text-red-500 font-light">
                    Kargo gönderimi yapılabilmesi için adres ve telefon bilgilerinizi girmelisiniz.
                  </p>
                  <Link
                    href="/settings"
                    className="inline-block text-xs uppercase tracking-widest bg-[#1A1A1A] text-white px-6 py-2.5 hover:bg-[#AF9164] transition-colors"
                  >
                    Profil Bilgilerini Doldur
                  </Link>
                </div>
              </div>

              {/* Ödeme iframe alanı */}
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                <h3 className="text-xs uppercase tracking-widest font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">
                  2. Ödeme Yöntemi
                </h3>
                <p className="text-sm text-gray-400 font-light text-center py-8">
                  Lütfen yukarıdaki teslimat bilgilerini tamamlayın.
                </p>
              </div>
            </div>

            {/* Sağ: Ürün Özeti & Güvenlik Kartları */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
              {/* Ürün Kartı */}
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-bold text-gray-800 border-b border-gray-100 pb-3">
                  Sipariş Özeti
                </h3>
                <div className="flex gap-4">
                  <div className="relative w-20 h-24 bg-gray-50 flex-shrink-0">
                    <Image
                      src={product.public_images?.[0] || '/placeholder.svg'}
                      alt={`${product.brand} ${product.model_name}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-black">
                        {product.brand}
                      </h4>
                      <p className="text-xs text-gray-500 font-light italic mt-0.5">
                        {product.model_name}
                      </p>
                    </div>
                    <div className="text-sm font-semibold tracking-tight text-gray-900 mt-2">
                      {currentPrice.toLocaleString('tr-TR')} ₺
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Ara Toplam</span>
                    <span>{currentPrice.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Sigortalı Lüks Kargo</span>
                    <span className="text-[#AF9164] uppercase tracking-widest font-bold">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Peony Lab™ Doğrulama</span>
                    <span className="text-[#AF9164] uppercase tracking-widest font-bold">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-gray-100">
                    <span>Toplam</span>
                    <span>{currentPrice.toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>
              </div>

              {/* Güvenlik Bilgileri */}
              <div className="bg-zinc-950 text-white p-6 rounded-2xl border border-[#AF9164]/20 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#AF9164] animate-pulse" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#AF9164]">
                    PEONY ALICI GÜVENCESİ
                  </h4>
                </div>
                <div className="space-y-3 text-xs text-gray-300 font-light leading-relaxed">
                  <div>
                    <p className="font-medium text-white mb-0.5">1. Güvenli Havuz Hesabı (Escrow)</p>
                    <p>Ödemeniz, ürün Peony Lab tarafından doğrulanıp siz teslim alana kadar güvenli havuz hesabımızda tutulur.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-0.5">2. Peony Lab™ 32 Noktalı Denetim</p>
                    <p>Satıcı ürünü önce uzmanlarımıza gönderir. Fiziksel denetim, mikroskobik inceleme ve orijinal sertifikasyon sürecinden geçen ürünler alıcıya kargolanır.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-0.5">3. Sigortalı Ücretsiz Kargo</p>
                    <p>Gönderilerin tamamı tam değerinde sigortalı olarak taşınır. Kayıp ve hasar riski tamamen güvencemiz altındadır.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
