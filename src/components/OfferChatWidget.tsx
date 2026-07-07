'use client'

import { useState, useEffect } from 'react'
import { getActiveOffer } from '@/src/app/messages/offers_actions_helper'
import { acceptOffer, rejectOffer } from '@/src/app/messages/offers_actions'
import { createClient } from '@/src/utils/supabase/client'
import { Check, X, ShieldAlert } from 'lucide-react'

interface OfferChatWidgetProps {
  productId: string
  userId: string
  sellerId: string
}

export default function OfferChatWidget({ productId, userId, sellerId }: OfferChatWidgetProps) {
  const [offer, setOffer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  const isSeller = userId === sellerId
  const isBuyer = userId !== sellerId

  const loadOffer = async () => {
    const res = await getActiveOffer(productId)
    if (res.success && res.offer) {
      setOffer(res.offer)
    } else {
      setOffer(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadOffer()

    // Listen to changes in the offers table
    const supabase = createClient()
    const channel = supabase
      .channel(`offers-${productId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'offers',
          filter: `product_id=eq.${productId}`
        },
        () => {
          loadOffer()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [productId])

  if (loading || !offer) return null

  const handleAccept = async () => {
    setProcessing(true)
    const res = await acceptOffer(offer.id)
    setProcessing(false)
    if (res.success) {
      loadOffer()
    } else {
      alert(res.error || 'Teklif kabul edilirken hata oluştu.')
    }
  }

  const handleReject = async () => {
    setProcessing(true)
    const res = await rejectOffer(offer.id)
    setProcessing(false)
    if (res.success) {
      loadOffer()
    } else {
      alert(res.error || 'Teklif reddedilirken hata oluştu.')
    }
  }

  return (
    <div className="bg-[#AF9164]/5 border-y border-[#AF9164]/20 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all">
      <div className="flex items-center gap-3">
        <ShieldAlert className="text-[#AF9164] w-5 h-5 shrink-0" />
        <div>
          <span className="text-[9px] font-bold text-[#AF9164] uppercase tracking-wider block">AKTİF TEKLİF DETAYI</span>
          <p className="text-xs text-gray-800 font-light mt-0.5">
            {isBuyer ? 'Görüntülediğiniz ürün için yaptığınız teklif: ' : 'Alıcı tarafından gelen fiyat teklifi: '}
            <strong className="font-bold text-zinc-900">{offer.offered_price.toLocaleString('tr-TR')} ₺</strong>
          </p>
          {offer.status === 'accepted' && (
            <span className="inline-block mt-1 bg-emerald-50 text-emerald-700 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
              Teklif Kabul Edildi (24 Saat Rezerve)
            </span>
          )}
        </div>
      </div>

      {offer.status === 'pending' && (
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          {isSeller ? (
            <>
              <button
                onClick={handleReject}
                disabled={processing}
                className="flex-1 sm:flex-none border border-red-200 hover:border-red-500 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <X size={12} /> Reddet
              </button>
              <button
                onClick={handleAccept}
                disabled={processing}
                className="flex-1 sm:flex-none bg-black hover:bg-[#AF9164] text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Check size={12} /> Kabul Et
              </button>
            </>
          ) : (
            <span className="text-[9px] text-gray-400 font-light uppercase tracking-widest animate-pulse">
              Satıcı Yanıtı Bekleniyor
            </span>
          )}
        </div>
      )}
    </div>
  )
}
