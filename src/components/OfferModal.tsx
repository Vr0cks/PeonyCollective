'use client'

import { useState } from 'react'
import { createOffer } from '@/src/app/messages/offers_actions'
import { X, Check } from 'lucide-react'

interface OfferModalProps {
  productId: string
  productPrice: number
  onClose: () => void
  onSuccess: () => void
}

export default function OfferModal({ productId, productPrice, onClose, onSuccess }: OfferModalProps) {
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const minAllowed = productPrice * 0.7

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const numPrice = parseFloat(price)
    if (isNaN(numPrice) || numPrice <= 0) {
      setError('Lütfen geçerli bir teklif tutarı girin.')
      setLoading(false)
      return
    }

    if (numPrice < minAllowed) {
      setError(`Teklifiniz ürün fiyatının en fazla %30 altında olabilir. Minimum teklif tutarı: ${Math.ceil(minAllowed).toLocaleString('tr-TR')} ₺`)
      setLoading(false)
      return
    }

    const res = await createOffer(productId, numPrice)
    setLoading(false)

    if (res.success) {
      setSuccessMsg('Teklifiniz başarıyla satıcıya iletildi ve sohbet pencereniz oluşturuldu.')
      setTimeout(() => {
        onSuccess()
      }, 2000)
    } else {
      setError(res.error || 'Teklif gönderilirken bir hata oluştu.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
          aria-label="Kapat"
        >
          <X size={20} />
        </button>

        <h3 className="font-playfair text-2xl tracking-wide text-zinc-900 mb-2 uppercase">Teklif Ver</h3>
        <p className="text-xs text-gray-500 font-light mb-6">
          Bu ürün için satıcıya özel bir fiyat teklif edebilirsiniz. Teklif fiyatı en fazla %30 indirimli olabilir.
        </p>

        <div className="bg-zinc-50 rounded-2xl p-4 mb-6 border border-zinc-100 flex justify-between text-xs font-light">
          <div>
            <span className="text-gray-400 block mb-1">Ürün Fiyatı</span>
            <span className="font-bold text-zinc-900">{productPrice.toLocaleString('tr-TR')} ₺</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 block mb-1">Minimum Teklif</span>
            <span className="font-bold text-[#AF9164]">{Math.ceil(minAllowed).toLocaleString('tr-TR')} ₺</span>
          </div>
        </div>

        {successMsg ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check size={18} />
            </div>
            <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="offer-price" className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Teklif Tutarınız (₺)
              </label>
              <input
                id="offer-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Örn. 7500"
                className="w-full bg-zinc-50 border border-gray-200 focus:border-[#AF9164] rounded-2xl px-5 py-4 text-sm focus:outline-none placeholder-gray-400 text-zinc-900"
                required
              />
            </div>

            {error && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest leading-relaxed">
                ✕ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 hover:bg-[#AF9164] disabled:bg-zinc-200 text-white py-4 font-bold uppercase tracking-[0.2em] text-[11px] rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? 'Gönderiliyor...' : 'Teklifi İlet'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
