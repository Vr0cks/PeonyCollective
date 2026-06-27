'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '@/src/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, cartTotal } = useCart()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#AF9164]" />
                <h2 className="text-xl serif-display">Sepetiniz</h2>
                <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">{cartItems.length}</span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="sans-detail tracking-widest text-gray-500">SEPETINIZ BOŞ</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border border-gray-100 p-4 rounded-xl group hover:border-[#AF9164]/30 transition-colors">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                      {item.public_images && item.public_images.length > 0 ? (
                        <Image src={item.public_images[0]} fill className="object-cover" alt={item.model_name || 'Ürün'} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Görsel Yok</div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="sans-detail text-[#AF9164] mb-1">{item.brand}</p>
                        <h3 className="text-sm font-bold text-gray-900 leading-snug">{item.model_name}</h3>
                      </div>
                      
                      <div className="flex items-end justify-between mt-4">
                        <p className="text-lg serif-display text-black">{item.price?.toLocaleString('tr-TR')} ₺</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 text-sm font-medium">Ara Toplam</span>
                  <span className="text-2xl serif-display">{cartTotal.toLocaleString('tr-TR')} ₺</span>
                </div>
                
                <Link 
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 hover:bg-[#AF9164] transition-colors duration-300 sans-detail"
                >
                  Güvenli Ödemeye Geç
                  <ArrowRight size={18} />
                </Link>
                <div className="mt-4 flex justify-center gap-2">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">100% Güvenli Ödeme</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
