'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function MagnifierImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.pageX - left - window.scrollX) / width) * 100
    const y = ((e.pageY - top - window.scrollY) / height) * 100
    setPosition({ x, y })
    setCursorPosition({ x: e.pageX - left - window.scrollX, y: e.pageY - top - window.scrollY })
  }

  return (
    <div
      className="relative aspect-[4/5] bg-gray-50 overflow-hidden cursor-crosshair group"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        priority={priority}
        className="object-cover transition-opacity duration-300"
      />
      {showMagnifier && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-[#AF9164] bg-white/20 backdrop-blur-sm z-50 shadow-xl"
          style={{
            display: 'block',
            width: '150px',
            height: '150px',
            top: `${cursorPosition.y - 75}px`,
            left: `${cursorPosition.x - 75}px`,
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: '300%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  )
}
