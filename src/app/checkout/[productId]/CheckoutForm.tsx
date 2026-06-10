'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface CheckoutFormProps {
  productId: string
}

export default function CheckoutForm({ productId }: CheckoutFormProps) {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [needsProfileUpdate, setNeedsProfileUpdate] = useState(false)

  useEffect(() => {
    async function initPayment() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
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

    initPayment()
  }, [productId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border border-gray-100 bg-[#FCFCFB] p-8 text-center">
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
      <div className="border border-red-100 bg-red-50/30 p-8 text-center space-y-4">
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
          <div className="pt-2">
            <Link
              href={`/product/${productId}`}
              className="inline-block px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all font-light tracking-wider text-xs uppercase"
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
      <div className="space-y-4 w-full">
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

  return null
}
