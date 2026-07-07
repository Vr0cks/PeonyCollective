'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CheckoutFormProps {
  productId: string
  product: any
  currentPrice: number
  profile?: any
}

export default function CheckoutForm({ productId, product, currentPrice, profile }: CheckoutFormProps) {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsProfileUpdate, setNeedsProfileUpdate] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'vip' | 'private_viewing'>('standard')

  const deliveryFee = deliveryMethod === 'private_viewing' ? 15000 : deliveryMethod === 'vip' ? 2500 : 0
  const totalPrice = currentPrice + deliveryFee

  async function initPayment(e?: React.FormEvent) {
    if (e) e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          productId,
          deliveryMethod 
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Ödeme başlatılamadı.')
        if (data.needsProfileUpdate) {
          setNeedsProfileUpdate(true)
        }
        return
      }

      if (data.status === 'success' && data.iframeUrl) {
        setIframeUrl(data.iframeUrl)
      } else {
        setError('PayTR ödeme oturumu oluşturulamadı.')
      }
    } catch (err) {
      console.error(err)
      setError('Ödeme sistemiyle bağlantı kurulamadı. Lütfen internetinizi kontrol edin.')
    } finally {
      setLoading(false)
    }
  }

  // Sol tarafta gösterilecek form/içerik alanı
  function renderLeftColumn() {
    return (
      <div className="space-y-8">
        {/* Teslimat ve Fatura Adresi */}
        {profile && (
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
            <div className="space-y-2 text-sm text-gray-600 font-light">
              <p className="font-medium text-black">
                {profile.first_name} {profile.last_name}
              </p>
              <p>{profile.phone_number}</p>
              <p className="leading-relaxed">{profile.address}</p>
            </div>
          </div>
        )}

        {renderLeftInner()}
      </div>
    )
  }

  function renderLeftInner() {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] border border-gray-100 bg-[#FCFCFB] p-8 text-center rounded-2xl">
          <div className="w-8 h-8 border-2 border-[#AF9164] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="sans-detail text-[10px] uppercase tracking-widest text-[#555555]">
            Güvenli Ödeme Geçidi Hazırlanıyor
          </p>
          <p className="text-xs text-gray-400 font-light mt-2 max-w-xs">
            Lütfen bu sayfayı kapatmayın veya yenilemeyin.
          </p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="border border-red-100 bg-red-50/30 p-8 text-center space-y-4 rounded-2xl">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            !
          </div>
          <h3 className="serif-display text-lg font-light text-red-800">
            Ödeme İşlemi Başlatılamadı
          </h3>
          <p className="text-sm text-red-600 font-light max-w-md mx-auto leading-relaxed">
            {error}
          </p>
          {needsProfileUpdate ? (
            <div className="pt-2">
              <Link
                href="/settings"
                className="inline-block px-8 py-3 bg-[#1A1A1A] text-white hover:bg-[#AF9164] transition-all font-light tracking-wider text-xs uppercase"
              >
                Profil Ayarlarını Güncelle
              </Link>
            </div>
          ) : (
            <div className="pt-2 flex gap-3 justify-center">
              <button
                onClick={() => setError(null)}
                className="inline-block px-8 py-3 bg-black text-white hover:bg-gray-800 transition-all font-light tracking-wider text-xs uppercase rounded-xl"
              >
                Tekrar Dene
              </button>
              <Link
                href={`/product/${productId}`}
                className="inline-block px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all font-light tracking-wider text-xs uppercase rounded-xl"
              >
                Ürüne Geri Dön
              </Link>
            </div>
          )}
        </div>
      )
    }

    if (iframeUrl) {
      return (
        <div className="space-y-4 w-full animate-fade-in">
          <div className="flex items-center justify-between bg-zinc-950 text-[#AF9164] px-4 py-3 rounded-t-xl text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>🔒 PAYTR 256-Bit SSL GÜVENLİ ÖDEME</span>
            <span className="hidden sm:inline">3D Secure</span>
          </div>
          <div className="w-full overflow-hidden border border-gray-200 rounded-b-xl min-h-[540px] bg-white relative">
            <iframe
              src={iframeUrl}
              className="w-full min-h-[540px] border-none"
              scrolling="no"
            />
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
        <h3 className="text-xs uppercase tracking-widest font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">
          2. Ödeme Yöntemi
        </h3>
        
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-800">Teslimat Yöntemi</label>
          
          <button
            type="button"
            onClick={() => setDeliveryMethod('standard')}
            className={`w-full p-4 border rounded-xl flex items-center justify-between transition-all ${deliveryMethod === 'standard' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="text-left col-span-2">
              <span className="block text-sm font-bold text-black">Standart Sigortalı Lüks Kargo</span>
              <span className="block text-xs text-gray-500 font-light mt-1">Siparişiniz laboratuvar onayından sonra 1-3 iş günü içinde teslim edilir.</span>
            </div>
            <span className="text-sm font-bold uppercase text-[#AF9164] shrink-0">Ücretsiz</span>
          </button>

          <button
            type="button"
            onClick={() => setDeliveryMethod('vip')}
            className={`w-full p-4 border rounded-xl flex items-center justify-between transition-all ${deliveryMethod === 'vip' ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="text-left col-span-2">
              <span className={`block text-sm font-bold ${deliveryMethod === 'vip' ? 'text-white' : 'text-black'}`}>VIP Concierge Teslimat</span>
              <span className={`block text-xs font-light mt-1 ${deliveryMethod === 'vip' ? 'text-gray-300' : 'text-gray-500'}`}>Özel güvenlik kuryesi ile aynı gün elden VIP teslimat.</span>
            </div>
            <span className={`text-sm font-bold shrink-0 ${deliveryMethod === 'vip' ? 'text-[#AF9164]' : 'text-black'}`}>+2.500 ₺</span>
          </button>

          <button
            type="button"
            onClick={() => setDeliveryMethod('private_viewing')}
            className={`w-full p-4 border rounded-xl flex items-center justify-between transition-all ${deliveryMethod === 'private_viewing' ? 'border-[#AF9164] bg-[#AF9164]/10' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="text-left col-span-2">
              <span className="block text-sm font-bold text-black">Private Viewing (Özel Gösterim)</span>
              <span className="block text-xs text-gray-500 font-light mt-1">Ürün evinize/yatınıza özel kurye ve uzman ile getirilir. İnceleyip onaylayarak alırsınız.</span>
            </div>
            <span className="text-sm font-bold text-[#AF9164] shrink-0">+15.000 ₺</span>
          </button>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
          {/* Apple Pay / Google Pay Hızlı Satın Alma Simülasyonu */}
          <button onClick={initPayment} className="w-full bg-black text-white py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-900 transition-all">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <span className="font-bold">Apple Pay ile Hızlı Al</span>
          </button>

          <button onClick={initPayment} className="w-full bg-white border border-gray-200 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all cursor-pointer">
            Kredi/Banka Kartı ile Devam Et
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
      {/* Sol: Adres Kontrolü ve Ödeme Formu */}
      <div className="lg:col-span-7 space-y-8">
        {renderLeftColumn()}
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
              <span>Teslimat Yöntemi ({deliveryMethod === 'vip' ? 'VIP' : deliveryMethod === 'private_viewing' ? 'Özel Gösterim' : 'Standart'})</span>
              <span className={deliveryFee === 0 ? 'text-[#AF9164] uppercase tracking-widest font-bold' : 'text-gray-800'}>
                {deliveryFee === 0 ? 'Ücretsiz' : `+${deliveryFee.toLocaleString('tr-TR')} ₺`}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Peony Lab™ Doğrulama</span>
              <span className="text-[#AF9164] uppercase tracking-widest font-bold">Ücretsiz</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-gray-100">
              <span>Toplam</span>
              <span>{totalPrice.toLocaleString('tr-TR')} ₺</span>
            </div>
            {deliveryFee > 0 && (
              <p className="text-[9px] text-amber-600 font-bold tracking-wider uppercase mt-2 pt-1 border-t border-amber-50">
                * Seçtiğiniz teslimat yöntemi nedeniyle toplam fiyata {deliveryFee.toLocaleString('tr-TR')} ₺ eklenmiştir.
              </p>
            )}
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
  )
}
