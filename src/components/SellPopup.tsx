'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Sparkles, ArrowRight } from 'lucide-react'

export default function SellPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Sadece ana sayfada ilk girişte bir kez göster (veya session'da tut)
    const hasSeenPopup = sessionStorage.getItem('hasSeenSellPopup')
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem('hasSeenSellPopup', 'true')
      }, 3000) // 3 saniye sonra açılsın
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl"
          >
            {/* Kapat Butonu */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-black bg-white/50 rounded-full hover:bg-gray-100 transition-all"
            >
              <X size={20} />
            </button>

            {/* Üst Görsel Alanı */}
            <div className="relative h-48 md:h-56 bg-[#1A1A1A] w-full overflow-hidden">
               <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center grayscale" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
               <div className="absolute bottom-6 left-8">
                  <div className="flex items-center gap-2 text-[#AF9164] mb-2">
                    <Sparkles size={16} />
                    <span className="sans-detail">PREMIUM İKİNCİ EL</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl text-white serif-display">Dolabınızdaki <br/><span className="italic">Lüksü Nakde Çevirin</span></h2>
               </div>
            </div>

            {/* İçerik */}
            <div className="p-8">
              <p className="text-gray-500 font-light leading-relaxed text-sm mb-8">
                Kullanmadığınız tasarımcı çantalarınızı, kıyafetlerinizi veya ayakkabılarınızı Peony Collective güvencesiyle hemen satın. Süreci biz yönetelim, kazanç hesabınıza yatsın.
              </p>

              <div className="flex flex-col gap-3">
                <Link 
                  href="/sell-with-us" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-4 px-6 hover:bg-[#AF9164] transition-colors duration-300 sans-detail"
                >
                  Hemen Satışa Başla
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-xs text-gray-400 hover:text-black uppercase tracking-widest font-bold mt-2"
                >
                  Daha Sonra
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
