'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X, Smartphone } from 'lucide-react'

export default function VirtualTryOnButton({ productName }: { productName: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-3 border border-[#1A1A1A] py-3.5 mt-4 text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300"
      >
        <Camera size={16} strokeWidth={1.5} />
        ÜZERİNİZDE GÖRÜN (AR)
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              className="relative bg-white w-full max-w-lg shadow-2xl p-8 z-10 overflow-hidden"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#AF9164]">
                  <Smartphone size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-playfair italic mb-3">AR Deneyimi</h3>
                <p className="text-sm text-gray-500 font-light mb-8 leading-relaxed">
                  <strong className="text-black">{productName}</strong> modelini kolunuzda veya masanızda görmek için kameranızı kullanarak sanal deneme yapabilirsiniz. Bu özellik çok yakında aktif olacaktır.
                </p>
                <div className="bg-[#F9F9F8] border border-dashed border-[#AF9164]/30 p-8 flex flex-col items-center justify-center mb-6">
                  <div className="w-48 h-48 border-2 border-[#AF9164] rounded-lg opacity-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <Camera size={32} className="mx-auto mb-2" />
                      <span className="text-[10px] font-bold uppercase tracking-widest block">Kamera<br/>Yükleniyor...</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsOpen(false)}
                  className="bg-black text-white px-8 py-3 w-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#AF9164] transition-colors duration-300"
                >
                  Anladım
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
