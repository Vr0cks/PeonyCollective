'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function MagnifierImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.pageX - left - window.scrollX) / width) * 100
    const y = ((e.pageY - top - window.scrollY) / height) * 100
    setPosition({ x, y })
  }

  return (
    <div
      className="relative aspect-[4/5] bg-[#F9F9F8] overflow-hidden cursor-zoom-in w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setPosition({ x: 50, y: 50 }) // Reset to center
      }}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: isHovered ? 'scale(1.4)' : 'scale(1)',
          transformOrigin: `${position.x}% ${position.y}%`
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  )
}
