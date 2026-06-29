'use client'

import { useState } from 'react'
import Image from 'next/image'
import MagnifierImage from '@/src/components/MagnifierImage'

interface ProductGalleryProps {
  images: string[]
  brand: string
  videoUrl?: string | null
}

export default function ProductGallery({ images, brand, videoUrl }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Toplam medya sayısı
  const hasVideo = !!videoUrl
  const totalMedia = images.length + (hasVideo ? 1 : 0)

  return (
    <div className="flex flex-col gap-4">
      {/* ANA GÖRÜNÜM */}
      <div className="w-full relative aspect-[4/5] bg-[#F9F9F8] overflow-hidden">
        {hasVideo && selectedIndex === 0 ? (
          <video 
            src={videoUrl} 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline 
          />
        ) : (
          <MagnifierImage
            src={images[hasVideo ? selectedIndex - 1 : selectedIndex]}
            alt={`${brand} - ${selectedIndex}`}
            priority={true}
          />
        )}
      </div>

      {/* THUMBNAILS (KÜÇÜK RESİMLER) */}
      {totalMedia > 1 && (
        <div className="flex items-center gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {hasVideo && (
            <button
              onClick={() => setSelectedIndex(0)}
              className={`relative w-20 h-24 shrink-0 overflow-hidden transition-all duration-300 ${selectedIndex === 0 ? 'border border-black' : 'border border-transparent opacity-50 hover:opacity-100'}`}
            >
              <video src={videoUrl} className="w-full h-full object-cover pointer-events-none" muted />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center pl-0.5">
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-black border-b-4 border-b-transparent" />
                </div>
              </div>
            </button>
          )}

          {images.map((img, idx) => {
            const indexValue = hasVideo ? idx + 1 : idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(indexValue)}
                className={`relative w-20 h-24 shrink-0 overflow-hidden transition-all duration-300 ${selectedIndex === indexValue ? 'border border-black' : 'border border-transparent opacity-50 hover:opacity-100'}`}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
