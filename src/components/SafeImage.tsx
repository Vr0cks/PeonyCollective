'use client'

import { useState, useEffect } from 'react'

interface SafeImageProps {
  src: string
  alt: string
  className?: string
}

export default function SafeImage({ src, alt, className }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // URL'de .heic veya .heif geçiyor mu kontrol et (Query parametreleri veya token'lar öncesindeki dosya adını kontrol etmek için küçük harfe çevirip bakıyoruz)
    const isHeic = src.toLowerCase().includes('.heic') || src.toLowerCase().includes('.heif')
    
    if (!isHeic) {
      setImgSrc(src)
      return
    }

    let active = true
    let objectUrl = ''

    async function convert() {
      setIsLoading(true)
      try {
        // Dosyayı imzalı URL'den blob olarak indir
        const response = await fetch(src)
        if (!response.ok) throw new Error('Görsel indirilemedi')
        const blob = await response.blob()

        // Tarayıcı tarafında dinamik heic2any kütüphanesini yükle
        const heic2any = (await import('heic2any')).default
        
        const converted = await heic2any({
          blob,
          toType: 'image/jpeg',
          quality: 0.7
        })

        const finalBlob = Array.isArray(converted) ? converted[0] : converted
        
        if (active) {
          objectUrl = URL.createObjectURL(finalBlob)
          setImgSrc(objectUrl)
        }
      } catch (err) {
        console.error('HEIC client-side conversion failed:', err)
        if (active) {
          setImgSrc(src) // Hata durumunda orijinal URL'e dön (kırık resim gösterir ama çökmez)
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    convert()

    return () => {
      active = false
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [src])

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-400 text-[10px] uppercase tracking-widest font-semibold p-4 text-center">
        <span className="animate-pulse mb-1">HEIC Çözülüyor...</span>
        <span className="text-[8px] opacity-60">(Lütfen bekleyin)</span>
      </div>
    )
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={imgSrc || src} alt={alt} className={className} loading="lazy" />
}
