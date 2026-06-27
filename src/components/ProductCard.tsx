'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/src/types'
import { useCart } from '@/src/context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const validImages = Array.isArray(product.public_images) ? product.public_images : []
  const firstImage = validImages.find(img => typeof img === 'string' && img.length > 5)
  const imageUrl = firstImage || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600'

  return (
    <div className="group relative w-full block">
      <Link href={`/product/${product.id}`} className="block w-full">
        {/* Taller Aspect Ratio for luxury feel (3/4 or 4/5) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2F2F2] mb-6">
          <Image 
            src={imageUrl} 
            alt={product.brand}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out mix-blend-multiply"
          />
          
          {/* Subtle condition badge */}
          <div className="absolute top-4 left-4 z-10">
             <span className="text-[9px] font-bold uppercase tracking-[0.2em] bg-white px-2 py-1 text-gray-900 border border-black/5">
                {product.condition}
             </span>
          </div>
        </div>
      </Link>

      {/* Minimalist details */}
      <div className="flex flex-col items-center text-center space-y-1.5 px-2 relative">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#AF9164]">
            {product.brand}
          </h3>
          <Link href={`/product/${product.id}`} className="w-full">
            <p className="text-xl serif-display italic text-[#1A1A1A] leading-tight truncate w-full hover:text-gray-600 transition-colors">
              {product.model_name}
            </p>
          </Link>
          <div className="pt-2 text-sm text-gray-500 font-light group-hover:opacity-0 transition-opacity duration-300">
            {(product.price ?? 0).toLocaleString('tr-TR')} ₺
          </div>
          
          {/* Add to Cart Button (appears on hover) */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button 
              onClick={(e) => {
                e.preventDefault()
                addToCart(product as any)
              }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-0.5 hover:text-[#AF9164] hover:border-[#AF9164] transition-colors"
            >
              Sepete Ekle
            </button>
          </div>
      </div>
    </div>
  )
}
