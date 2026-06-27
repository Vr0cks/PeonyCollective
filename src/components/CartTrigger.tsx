'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/src/context/CartContext'

export default function CartTrigger() {
  const { cartItems, setIsCartOpen } = useCart()
  
  // Sadece client side'da hidrasyon hatası vermesin diye mount kontrolü yapabiliriz
  // Ancak basitlik adına doğrudan kullanıyoruz
  const itemCount = cartItems.length

  return (
    <button 
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 text-gray-600 hover:text-black transition-colors"
      aria-label="Sepet"
    >
      <ShoppingBag size={20} strokeWidth={1.5} />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  )
}
