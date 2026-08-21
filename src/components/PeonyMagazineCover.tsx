'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ArrowUpRight, ChevronLeft, ChevronRight, X, Sparkles, ShieldCheck } from 'lucide-react'
import { Product } from '@/src/types'
import { useSettings } from '@/src/context/SettingsContext'

interface PeonyMagazineCoverProps {
  products: Product[]
}

export default function PeonyMagazineCover({ products }: PeonyMagazineCoverProps) {
  const { language, formatPrice } = useSettings()

  // Select top 20 curated approved products with images
  const lookbookItems = React.useMemo(() => {
    const valid = (products || []).filter(p => Array.isArray(p.public_images) && p.public_images.length > 0)
    return valid.slice(0, 20)
  }, [products])

  const totalPages = lookbookItems.length
  const [activeCoverIdx, setActiveCoverIdx] = useState(0)
  const [isOpenBook, setIsOpenBook] = useState(false)
  const [currentSpread, setCurrentSpread] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  // Auto cycle cover issues when closed and not hovered
  useEffect(() => {
    if (isHovered || isOpenBook || lookbookItems.length <= 1) return
    const timer = setInterval(() => {
      setActiveCoverIdx(prev => (prev + 1) % Math.min(6, lookbookItems.length))
    }, 6500)
    return () => clearInterval(timer)
  }, [isHovered, isOpenBook, lookbookItems.length])

  const currentCoverItem = lookbookItems[activeCoverIdx] || lookbookItems[0]
  const currentSpreadItem = lookbookItems[currentSpread] || lookbookItems[0]

  if (!currentCoverItem) return null

  const nextSpread = () => {
    setDirection(1)
    setCurrentSpread(prev => (prev + 1) % totalPages)
  }

  const prevSpread = () => {
    setDirection(-1)
    setCurrentSpread(prev => (prev - 1 + totalPages) % totalPages)
  }

  const nextCover = () => setActiveCoverIdx(prev => (prev + 1) % Math.min(6, lookbookItems.length))
  const prevCover = () => setActiveCoverIdx(prev => (prev - 1 + Math.min(6, lookbookItems.length)) % Math.min(6, lookbookItems.length))

  const leftHeadlines = [
    {
      topic: language === 'en' ? 'archive' : 'arşiv',
      sub: language === 'en' ? 'rare icons authenticated in İstanbul' : 'İstanbul\'da onaylanan zamansız ikonlar'
    },
    {
      topic: language === 'en' ? 'craft' : 'zanaat',
      sub: language === 'en' ? '32-point microscopic AI verified' : '32 noktalı mikroskobik yapay zeka güvencesi'
    }
  ]

  const rightHeadlines = [
    {
      topic: language === 'en' ? 'couture' : 'kürasyon',
      sub: language === 'en' ? 'four seasons of timeless luxury' : 'dört mevsim zamansız lüks seçkisi'
    },
    {
      topic: language === 'en' ? 'vault' : 'miras',
      sub: language === 'en' ? 'curated circular investment pieces' : 'döngüsel miras ve yatırım parçaları'
    }
  ]

  return (
    <div 
      className="relative w-full flex flex-col items-center justify-center select-none py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isOpenBook ? (
          /* ─── 1. THE GRAND 1970s VINTAGE VOGUE PEONY COVER ─── */
          <motion.div
            key="vintageCoverStage"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[490px] aspect-[3/4.2] rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-white/25 bg-[#0C0D11] group flex flex-col justify-between"
          >
            {/* Background Full-Bleed Photograph */}
            <div className="absolute inset-0 z-0">
              <Image
                src={currentCoverItem.public_images[0]}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover brightness-[0.90] contrast-[1.06] group-hover:scale-105 transition-transform duration-1000 ease-out"
                alt={currentCoverItem.model_name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/50 z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-transparent opacity-70 pointer-events-none z-15" />
            </div>

            {/* ─── GRAND VINTAGE MASTHEAD ("PEONY") ─── */}
            <div className="relative z-20 pt-4 px-6 flex flex-col items-center text-center">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-[0.08em] font-light text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)] leading-none">
                PEONY
              </h1>
              
              <div className="w-full flex justify-between items-center text-[8px] sm:text-[9px] font-mono tracking-[0.25em] text-white/90 uppercase pt-2 border-b border-white/30">
                <span>{language === 'en' ? 'FOUR SEASONS ARCHIVE' : 'DÖRT MEVSİM SEÇKİSİ'}</span>
                <span className="font-bold text-[#E2C79E]">ISSUE N° 0{activeCoverIdx + 1}</span>
                <span>İSTANBUL</span>
              </div>
            </div>

            {/* ─── VINTAGE EDITORIAL HEADLINES (LEFT & RIGHT) ─── */}
            <div className="relative z-20 px-6 flex justify-between items-start gap-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] my-auto">
              {/* Left Column Headlines */}
              <div className="space-y-3 max-w-[170px] sm:max-w-[190px]">
                {leftHeadlines.map((h, i) => (
                  <div key={i} className="space-y-0.5">
                    <span className="text-base sm:text-lg font-serif italic text-[#E2C79E] font-medium block leading-none">
                      {h.topic}
                    </span>
                    <p className="text-[9px] sm:text-[10px] text-stone-200 font-light leading-tight">
                      {h.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Column Headlines */}
              <div className="space-y-3 max-w-[170px] sm:max-w-[190px] text-right">
                {rightHeadlines.map((h, i) => (
                  <div key={i} className="space-y-0.5">
                    <span className="text-base sm:text-lg font-serif italic text-[#E2C79E] font-medium block leading-none">
                      {h.topic}
                    </span>
                    <p className="text-[9px] sm:text-[10px] text-stone-200 font-light leading-tight">
                      {h.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── BOTTOM COVER ACTIONS & DIRECT PRODUCT DETAILS ─── */}
            <div className="relative z-20 p-4 sm:p-5 space-y-2.5 bg-gradient-to-t from-black via-black/90 to-transparent">
              
              {/* Product Info Bar */}
              <div className="bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/20 shadow-2xl flex justify-between items-end">
                <div className="space-y-0.5 max-w-[220px] sm:max-w-[260px]">
                  <span className="text-[8px] sm:text-[9px] font-mono text-[#E2C79E] uppercase tracking-widest block font-bold truncate">
                    {currentCoverItem.brand}
                  </span>
                  <h4 className="text-sm sm:text-base font-playfair italic text-white truncate">
                    {currentCoverItem.model_name}
                  </h4>
                  <Link
                    href={`/product/${currentCoverItem.id}`}
                    className="text-[8px] text-stone-300 font-mono hover:text-[#E2C79E] inline-flex items-center gap-1 cursor-pointer pt-0.5"
                  >
                    <span>{language === 'en' ? 'VIEW OBJECT DETAILS' : 'ÜRÜN SAYFASINA GİT'}</span>
                    <ArrowUpRight size={10} />
                  </Link>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/15 block">
                    {formatPrice(currentCoverItem.price || 0)}
                  </span>
                </div>
              </div>

              {/* Action Buttons: "Open Magazine" + Switchers */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={prevCover}
                  title="Önceki Sayı"
                  className="p-2.5 rounded-xl bg-black/60 hover:bg-white hover:text-black text-white border border-white/15 transition-all cursor-pointer shadow-md"
                >
                  <ChevronLeft size={13} />
                </button>

                <button
                  onClick={() => setIsOpenBook(true)}
                  className="flex-1 py-2.5 px-4 bg-[#9E7D4E] hover:bg-[#B38F5A] text-white rounded-xl text-[9px] sm:text-[10px] font-bold font-mono tracking-widest uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen size={14} />
                  <span>{language === 'en' ? 'OPEN MAGAZINE (EXPLORE ARCHIVE) 📖' : 'DERGİYİ AÇ (ARŞİVİ ÇEVİR) 📖'}</span>
                </button>

                <button
                  onClick={nextCover}
                  title="Sonraki Sayı"
                  className="p-2.5 rounded-xl bg-black/60 hover:bg-white hover:text-black text-white border border-white/15 transition-all cursor-pointer shadow-md"
                >
                  <ChevronRight size={13} />
                </button>
              </div>

              {/* Barcode & Issue Indicator */}
              <div className="flex justify-between items-center text-[7px] font-mono text-stone-400 uppercase tracking-widest pt-1 px-1">
                <span>||| |||| || | 2026</span>
                <span className="text-[#E2C79E] font-bold">COVER ISSUE 0{activeCoverIdx + 1} / 06</span>
                <span>ENTRUPY 100% CERTIFIED</span>
              </div>

            </div>
          </motion.div>
        ) : (
          /* ─── 2. THE GRAND OPEN 2-PAGE EDITORIAL SPREAD (GENİŞ AÇIK MODA DERGİSİ) ─── */
          <motion.div
            key="vintageSpreadStage"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[860px] lg:max-w-[960px] aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden shadow-[0_35px_90px_rgba(0,0,0,0.95)] border border-stone-700 bg-[#F6F3EC] text-[#1E1B18]"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSpreadItem.id}
                custom={direction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative bg-[#F7F4ED]"
              >
                
                {/* ─── SOL SAYFA: VINTAGE EDİTORYAL DERGİ YAZISI (KREM/FİLDİŞİ KAĞIT) ─── */}
                <div 
                  onClick={prevSpread}
                  className="relative p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-300/80 cursor-pointer bg-[#F8F5EE]"
                >
                  {/* Top Editorial Header */}
                  <div className="flex justify-between items-center text-[8px] font-mono tracking-[0.2em] uppercase text-stone-500 border-b border-stone-200 pb-2">
                    <span className="font-serif italic font-bold text-stone-900 text-[10px]">PEONY ARCHIVE</span>
                    <span>VOL. IV • P. {String(currentSpread * 2 + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Editorial Body with Dropped Cap */}
                  <div className="my-auto space-y-3 py-2">
                    <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase text-[#9E7D4E] block">
                      {currentSpreadItem.brand}
                    </span>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-normal italic text-stone-900 leading-tight">
                      {currentSpreadItem.model_name}
                    </h3>

                    {/* Vintage Dropped Cap Paragraph */}
                    <div className="flex gap-2 items-start pt-1">
                      <span className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-none">
                        T
                      </span>
                      <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed line-clamp-3">
                        {currentSpreadItem.description || (
                          language === 'en'
                            ? 'his iconic design reflects the pinnacle of luxury circularity, masterfully handcrafted and inspected under 32-point microscopic criteria.'
                            : 'asarımcının zamansız mirasından doğan bu parça, 32 noktalı fiziksel ekspertiz ve yapay zeka mikroskobik doğrulaması ile güvenceye alınmıştır.'
                        )}
                      </p>
                    </div>

                    {/* Price & Buy Link */}
                    <div className="pt-3 flex items-center justify-between border-t border-stone-200">
                      <div>
                        <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest block">ARCHIVE PRICE</span>
                        <span className="text-base sm:text-lg font-mono font-bold text-stone-900">
                          {formatPrice(currentSpreadItem.price || 0)}
                        </span>
                      </div>

                      <Link
                        href={`/product/${currentSpreadItem.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900 hover:bg-[#9E7D4E] text-white text-[9px] font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer"
                      >
                        <span>{language === 'en' ? 'INSPECT PIECE' : 'ÜRÜNÜ İNCELE'}</span>
                        <ArrowUpRight size={11} />
                      </Link>
                    </div>
                  </div>

                  {/* Footer Turn Hint */}
                  <div className="flex justify-between items-center text-[8px] font-mono text-stone-400 uppercase tracking-widest pt-2 border-t border-stone-200">
                    <span>FOUR SEASONS ARCHIVE</span>
                    <span className="text-[#9E7D4E] font-bold">← PREV SPREAD</span>
                  </div>
                </div>

                {/* ─── ORTA DERGİ CİLT KIVRIMI (VINTAGE SPINE SHADOW) ─── */}
                <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/25 via-black/10 to-black/25 z-30 pointer-events-none" />

                {/* ─── SAĞ SAYFA: PASSE-PARTOUT ÇERÇEVELİ BÜYÜK FOTOĞRAF ─── */}
                <div 
                  onClick={nextSpread}
                  className="relative p-5 sm:p-7 flex flex-col justify-between cursor-pointer bg-[#F5F2EA] overflow-hidden"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-stone-300 shadow-md bg-white p-2">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image 
                        src={currentSpreadItem.public_images[0]} 
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        alt={currentSpreadItem.model_name}
                      />
                    </div>

                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="text-[8px] font-mono uppercase tracking-widest bg-stone-900/80 backdrop-blur-md px-2.5 py-1 text-[#E2C79E] rounded">
                        {currentSpreadItem.category || 'ARCHIVE'}
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 right-3.5 z-10 flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-widest text-stone-900 bg-white/95 backdrop-blur-md px-3 py-1 rounded shadow-sm">
                      <span>NEXT SPREAD</span>
                      <ChevronRight size={11} />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[8px] font-mono text-stone-500 uppercase tracking-widest pt-2 mt-1">
                    <span>FIGURE {currentSpread + 1}</span>
                    <span>P. {String(currentSpread * 2 + 2).padStart(2, '0')}</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Top Close Button (Kapağa Dön) */}
            <button
              onClick={() => setIsOpenBook(false)}
              className="absolute top-3 left-3 z-40 bg-stone-900/90 hover:bg-black text-white py-1.5 px-3 rounded-lg transition-all cursor-pointer shadow-lg flex items-center gap-1.5 text-[8px] font-mono"
            >
              <X size={11} />
              <span>{language === 'en' ? 'CLOSE TO COVER' : 'KAPAĞA DÖN'}</span>
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
