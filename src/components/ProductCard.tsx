'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/src/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
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

        {/* Minimalist details */}
        <div className="flex flex-col items-center text-center space-y-1.5 px-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#AF9164]">
              {product.brand}
            </h3>
            <p className="text-xl serif-display italic text-[#1A1A1A] leading-tight truncate w-full">
              {product.model_name}
            </p>
            <div className="pt-2 text-sm text-gray-500 font-light">
              {(product.price ?? 0).toLocaleString('tr-TR')} ₺
            </div>
        </div>
      </Link>
    </div>
  )
}
