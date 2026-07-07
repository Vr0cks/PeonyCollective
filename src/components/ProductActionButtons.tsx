'use client'

import { useState } from 'react'
import Link from 'next/link'
import OfferModal from './OfferModal'

interface ProductActionButtonsProps {
  productId: string
  productPrice: number
  isOwner: boolean
  isSold: boolean
}

export default function ProductActionButtons({ productId, productPrice, isOwner, isSold }: ProductActionButtonsProps) {
  const [showOfferModal, setShowOfferModal] = useState(false)

  if (isSold) {
    return (
      <button disabled className="w-full bg-gray-100 text-gray-400 py-4 font-bold uppercase tracking-[0.2em] text-[11px] text-center cursor-not-allowed border border-gray-200">
        BU PARÇA SATILMIŞTIR
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Link 
        href={`/checkout/${productId}`} 
        className="w-full bg-black text-white py-4 font-bold uppercase tracking-[0.2em] text-[11px] text-center hover:bg-[#AF9164] transition-colors duration-300 block"
      >
        SATIN AL
      </Link>
      
      {!isOwner && (
        <button
          onClick={() => setShowOfferModal(true)}
          className="w-full bg-white text-zinc-900 border border-zinc-300 hover:border-black py-4 font-bold uppercase tracking-[0.2em] text-[11px] text-center transition-colors duration-300 block cursor-pointer"
        >
          TEKLİF VER
        </button>
      )}

      {showOfferModal && (
        <OfferModal
          productId={productId}
          productPrice={productPrice}
          onClose={() => setShowOfferModal(false)}
          onSuccess={() => {
            setShowOfferModal(false)
            // Redirect to messages or reload
            window.location.href = '/messages'
          }}
        />
      )}
    </div>
  )
}
