'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, ShoppingBag, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Product } from '@/src/types'
import { useCart } from '@/src/context/CartContext'
import { useSettings } from '@/src/context/SettingsContext'

interface ProductCardProps {
  product: Product
}

function getLocalizedCondition(cond?: string, lang: 'tr' | 'en' = 'tr'): string {
  if (!cond) return ''
  const c = cond.toLowerCase().trim()
  if (lang === 'en') {
    if (c.includes('etiketli') || c.includes('sıfır') || c.includes('new')) return 'NEW WITH TAGS'
    if (c.includes('kusursuz') || c.includes('pristine') || c.includes('flawless')) return 'PRISTINE'
    if (c.includes('çok iyi') || c.includes('excellent')) return 'EXCELLENT'
    if (c.includes('temiz') || c.includes('great')) return 'GREAT'
    if (c.includes('iyi') || c.includes('good')) return 'GOOD'
    return cond.toUpperCase()
  }
  if (c.includes('etiketli') || c.includes('sıfır')) return 'ETİKETLİ / SIFIR'
  if (c.includes('kusursuz')) return 'KUSURSUZ'
  if (c.includes('çok iyi')) return 'ÇOK İYİ'
  if (c.includes('temiz')) return 'TEMİZ'
  if (c.includes('iyi')) return 'İYİ'
  return cond.toUpperCase()
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { formatPrice, t, language } = useSettings()
  const [isHovered, setIsHovered] = useState(false)

  const validImages = (Array.isArray(product.public_images) ? product.public_images : []).filter(
    img => typeof img === 'string' && img.length > 5
  )
  const primaryImage = validImages[0] || '/hero_banner.png'
  const secondaryImage = validImages[1] || primaryImage
  const hasMultipleImages = validImages.length > 1

  const localizedCondition = getLocalizedCondition(product.condition, language)

  return (
    <div 
      className="group relative w-full flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block w-full">
        {/* Luxury Image Showcase Frame */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border border-stone-200/70 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] group-hover:border-[#9E7D4E]/40 transition-all duration-500 mb-4">
          
          {/* Primary Photo */}
          <Image 
            src={primaryImage} 
            alt={product.brand}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out ${
              hasMultipleImages && isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100 group-hover:scale-105'
            }`}
          />

          {/* Secondary Detail Photo on Hover */}
          {hasMultipleImages && (
            <Image 
              src={secondaryImage} 
              alt={`${product.brand} detail`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}

          {/* Top Floating Badges */}
          <div className="absolute top-3 inset-x-3 z-10 flex justify-between items-start pointer-events-none">
            {localizedCondition ? (
              <span className="text-[7.5px] font-mono font-bold uppercase tracking-[0.2em] bg-white/90 backdrop-blur-md px-2.5 py-1 text-stone-800 border border-black/5 rounded-full shadow-sm">
                {localizedCondition}
              </span>
            ) : <span />}

            <span className="text-[7.5px] font-mono uppercase tracking-widest bg-black/60 backdrop-blur-md px-2 py-0.5 text-[#E2C79E] rounded-full border border-white/10 flex items-center gap-1 shadow-sm">
              <ShieldCheck size={10} />
              <span>ENTRUPY</span>
            </span>
          </div>

          {/* Quick Action Overlay on Hover */}
          <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                addToCart(product)
              }}
              className="flex-1 py-2 px-3 bg-stone-900/90 hover:bg-[#9E7D4E] text-white text-[8px] font-mono font-bold uppercase tracking-[0.2em] rounded-xl backdrop-blur-md transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag size={11} />
              <span>{t('nav.addToCart', 'SEPETE EKLE')}</span>
            </button>
          </div>
        </div>
      </Link>

      {/* Editorial Details Below Card */}
      <div className="flex flex-col items-center text-center space-y-1 px-1">
        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-[#9E7D4E] block">
          {product.brand}
        </span>
        
        <Link href={`/product/${product.id}`} className="w-full">
          <h4 className="text-base sm:text-lg font-playfair italic text-stone-900 truncate hover:text-[#9E7D4E] transition-colors leading-tight">
            {product.model_name}
          </h4>
        </Link>

        <p className="text-xs sm:text-sm font-mono font-bold text-stone-900 pt-0.5">
          {formatPrice(product.price || 0)}
        </p>
      </div>
    </div>
  )
}
