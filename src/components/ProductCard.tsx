'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ProductCard({ product }: { product: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/product/${product.id}`}>
        {/* Görsel Kutusu - Daha Büyük ve Kaliteli */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F8F8] mb-6">
          <motion.img 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            src={product.public_images?.[0]} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 product-image-premium"
            alt={product.brand}
          />
          
          {/* Kondisyon Rozeti - Daha Minimal */}
          <div className="absolute top-4 left-4">
             <span className="text-[8px] font-bold uppercase tracking-[0.2em] bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-sm text-gray-900">
                {product.condition}
             </span>
          </div>

          {/* Hızlı Detay Overlay - Hover'da Çıkan */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white border-b-2 border-white/20 pb-1">
                İncele
             </span>
          </div>
        </div>

        {/* Metin Detayları - Minimalist ve Ortalanmış */}
        <div className="space-y-1 text-center">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">{product.brand}</h3>
            <p className="text-xl font-playfair italic text-gray-800 leading-tight truncate">{product.model_name}</p>
            <div className="pt-2 text-sm font-medium tracking-tighter text-gray-900">
              {product.price.toLocaleString('tr-TR')} ₺
            </div>
        </div>
      </Link>
    </motion.div>
  )
}
