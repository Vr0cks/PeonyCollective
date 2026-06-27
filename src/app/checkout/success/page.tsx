'use client'

import Link from 'next/link'
import { CheckCircle, Truck, Copy, Check } from 'lucide-react'
import { useCart } from '@/src/context/CartContext'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function SuccessContent() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Ödeme başarılı olduğunda sepeti boşalt
    clearCart()
  }, [])

  const handleCopy = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-white p-16 md:p-24 border border-gray-100 shadow-2xl shadow-black/5 max-w-2xl w-full flex flex-col items-center">
      <CheckCircle className="text-emerald-600 mb-8" size={64} strokeWidth={1} />
      <h1 className="text-4xl md:text-5xl serif-display mb-6 text-center">Siparişiniz Alındı</h1>
      <p className="text-gray-500 font-light mb-8 max-w-md leading-relaxed text-center">
        Peony VIP ayrıcalığıyla lüks alışverişinizi tamamladığınız için teşekkür ederiz. Siparişiniz başarıyla oluşturuldu ve doğrulama süreçleri için hazırlanıyor.
      </p>

      {orderId && (
        <div className="w-full bg-gray-50 border border-gray-100 p-6 flex flex-col items-center mb-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Sipariş Numaranız</p>
          <div className="flex items-center gap-4">
            <span className="text-xl font-mono text-black font-medium">{orderId}</span>
            <button 
              onClick={handleCopy} 
              className="text-gray-400 hover:text-[#AF9164] transition-colors"
              title="Kopyala"
            >
              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
        <Link href="/#collection" className="bg-black text-white px-8 py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-gray-800 transition-colors w-full sm:w-auto text-center">
          Koleksiyonlara Dön
        </Link>
        {orderId && (
          <Link href={`/kargom-nerede?orderId=${orderId}`} className="border border-[#AF9164] text-[#AF9164] bg-[#AF9164]/5 px-8 py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-[#AF9164] hover:text-white transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
            <Truck size={14} /> Kargomu Takip Et
          </Link>
        )}
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F8] flex flex-col items-center justify-center pt-24 px-6">
      <Suspense fallback={<div className="text-gray-500 text-sm tracking-widest uppercase">Yükleniyor...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
