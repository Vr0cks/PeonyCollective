'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Product } from '@/src/types'
import { useSettings } from '@/src/context/SettingsContext'

interface LookbookMagazineProps {
  products: Product[]
}

export default function LookbookMagazine({ products }: LookbookMagazineProps) {
  const { language, formatPrice } = useSettings()

  // Select top 20 curated approved products with images
  const lookbookItems = React.useMemo(() => {
    const valid = (products || []).filter(p => Array.isArray(p.public_images) && p.public_images.length > 0)
    return valid.slice(0, 20)
  }, [products])

  const totalSpreads = Math.max(1, lookbookItems.length)
  const [currentSpread, setCurrentSpread] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  // Auto flip every 6s if not hovered
  useEffect(() => {
    if (isHovered || !isOpen) return
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSpread(prev => (prev + 1) % totalSpreads)
    }, 5500)
    return () => clearInterval(timer)
  }, [isHovered, totalSpreads, isOpen])

  const nextSpread = () => {
    setDirection(1)
    setCurrentSpread(prev => (prev + 1) % totalSpreads)
  }

  const prevSpread = () => {
    setDirection(-1)
    setCurrentSpread(prev => (prev - 1 + totalSpreads) % totalSpreads)
  }

  const activeProduct = lookbookItems[currentSpread] || lookbookItems[0]

  if (!activeProduct) return null

  return (
    <div 
      className="relative w-full max-w-[560px] lg:max-w-[620px] select-none flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── 3D OPEN DOUBLE-PAGE MAGAZINE (ÇİFT SAYFA AÇIK DERGİ) ─── */}
      <div className="relative w-full aspect-[16/10.5] sm:aspect-[16/10] perspective-[1800px]">
        
        {/* Physical Book Shadow and Atmosphere */}
        <div className="absolute -inset-2 bg-gradient-to-b from-[#9E7D4E]/20 via-black/90 to-black/95 rounded-[2rem] blur-xl -z-10" />
        <div className="absolute -bottom-4 inset-x-8 h-8 bg-black/80 blur-lg -z-10" />

        {/* The Open Magazine Spread Container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-white/20 bg-[#0E1015]">
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeProduct.id}
              custom={direction}
              initial={{ opacity: 0, rotateY: direction === 1 ? -18 : 18, scale: 0.97 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: direction === 1 ? 18 : -18, scale: 0.97 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative"
            >
              
              {/* ─── SOL SAYFA: EDİTORYAL DERGİ YAZISI & TİPOGRAFİ ─── */}
              <div 
                onClick={prevSpread}
                className="relative bg-[#14161E] p-5 sm:p-7 flex flex-col justify-between text-white border-b md:border-b-0 md:border-r border-white/10 cursor-pointer group"
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/30 pointer-events-none" />

                {/* Left Page Top Header */}
                <div className="relative z-10 flex justify-between items-center text-[8px] font-mono tracking-[0.25em] uppercase text-[#E2C79E]">
                  <span className="flex items-center gap-1">
                    <Sparkles size={9} /> PEONY ARCHIVE
                  </span>
                  <span className="text-stone-400">VOL. IV • N° 04</span>
                </div>

                {/* Editorial Body Content */}
                <div className="relative z-10 my-auto space-y-2.5 sm:space-y-3 py-2">
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.3em] uppercase text-[#E2C79E] block">
                    {activeProduct.brand}
                  </span>

                  <h3 className="text-xl sm:text-2xl lg:text-[1.7rem] font-playfair italic text-white leading-tight">
                    {activeProduct.model_name}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-stone-300 font-light leading-relaxed line-clamp-3">
                    {activeProduct.description || (
                      language === 'en'
                        ? 'Masterfully handcrafted with authentic materials and verified through microscopic AI authenticity protocols.'
                        : 'Özgün işçilik ve zamansız miras. 32 noktalı fiziksel ekspertiz ve mikroskobik yapay zeka doğrulaması ile güvence altında.'
                    )}
                  </p>

                  {/* Verification Badge & Price */}
                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <div>
                      <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest block">PRICE</span>
                      <span className="text-sm sm:text-base font-mono font-bold text-white">
                        {formatPrice(activeProduct.price || 0)}
                      </span>
                    </div>

                    <Link
                      href={`/product/${activeProduct.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#9E7D4E] hover:bg-[#B38F5A] text-white text-[9px] font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer"
                    >
                      <span>{language === 'en' ? 'INSPECT' : 'İNCELE'}</span>
                      <ArrowUpRight size={11} />
                    </Link>
                  </div>
                </div>

                {/* Left Page Footer & Page Number */}
                <div className="relative z-10 flex justify-between items-center text-[8px] font-mono text-stone-500 uppercase tracking-widest pt-2 border-t border-white/5">
                  <span>CURATED OBJECT</span>
                  <span>PAGE {String(currentSpread * 2 + 1).padStart(2, '0')}</span>
                </div>
              </div>

              {/* ─── ORTA CİLT KIVRIMI & GÖLGE (REALISTIC BOOK SPINE) ─── */}
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-black/60 via-black/20 to-black/60 z-30 pointer-events-none shadow-inner" />
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/10 z-30 pointer-events-none" />

              {/* ─── SAĞ SAYFA: YÜKSEK ÇÖZÜNÜRLÜKLÜ FOTOĞRAF VİTRİNİ ─── */}
              <div 
                onClick={nextSpread}
                className="relative bg-[#0A0B0E] p-4 sm:p-5 flex flex-col justify-between cursor-pointer group overflow-hidden"
              >
                {/* Photo Frame Container */}
                <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/15 shadow-inner">
                  <Image 
                    src={activeProduct.public_images[0]} 
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover brightness-[0.88] group-hover:scale-105 transition-transform duration-700 ease-out"
                    alt={activeProduct.model_name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Condition Tag on Top of Image */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[7px] font-mono uppercase tracking-widest bg-black/70 backdrop-blur-md px-2 py-0.5 text-[#E2C79E] rounded-full border border-white/15">
                      {activeProduct.category || 'ARCHIVE'}
                    </span>
                  </div>

                  {/* Corner Page-turn Hint */}
                  <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 text-[8px] font-mono uppercase tracking-widest text-white/80 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                    <span>NEXT</span>
                    <ChevronRight size={10} />
                  </div>
                </div>

                {/* Right Page Footer & Page Number */}
                <div className="relative z-10 flex justify-between items-center text-[8px] font-mono text-stone-500 uppercase tracking-widest pt-2 mt-1">
                  <span>PHOTO ARCHIVE</span>
                  <span>PAGE {String(currentSpread * 2 + 2).padStart(2, '0')}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* ─── DIGITAL MAGAZINE CONTROLS & SPREAD SCRUBBER ─── */}
      <div className="w-full pt-3.5 flex items-center justify-between gap-3 text-[9px] font-mono text-stone-400">
        <button
          onClick={prevSpread}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/10 transition-all cursor-pointer text-white"
        >
          <ChevronLeft size={11} />
          <span>{language === 'en' ? 'PREV' : 'ÖNCEKİ'}</span>
        </button>

        {/* Spread Scrubber Indicator */}
        <div className="flex items-center gap-1.5">
          {lookbookItems.slice(0, 8).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSpread(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentSpread === idx ? 'w-5 bg-[#E2C79E]' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSpread}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/10 transition-all cursor-pointer text-white"
        >
          <span>{language === 'en' ? 'NEXT' : 'SONRAKİ'}</span>
          <ChevronRight size={11} />
        </button>
      </div>
    </div>
  )
}
