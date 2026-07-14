'use client'

interface SafeImageProps {
  src: string
  alt: string
  className?: string
}

export default function SafeImage({ src, alt, className }: SafeImageProps) {
  const isHeic = src.toLowerCase().includes('.heic') || src.toLowerCase().includes('.heif')
  const finalSrc = isHeic ? `/api/heic-to-jpeg?url=${encodeURIComponent(src)}` : src

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={finalSrc} alt={alt} className={className} loading="lazy" />
}
