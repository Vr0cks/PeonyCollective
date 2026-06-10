'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to an error reporting service if needed
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FCFCFB] px-6 text-center text-[#1A1A1A]">
      <div className="max-w-md space-y-6">
        <h1 className="serif-display text-4xl md:text-5xl font-light text-[#AF9164] tracking-wide">
          Beklenmeyen Bir Hata
        </h1>
        <p className="sans-detail text-sm uppercase tracking-widest text-[#555555]">
          İşlem sırasında bir hata oluştu.
        </p>
        <p className="text-zinc-500 font-light text-sm">
          Lütfen sayfayı yenilemeyi deneyin veya ana sayfaya geri dönün.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-8 py-3 bg-[#1A1A1A] text-white hover:bg-[#AF9164] transition-all duration-300 font-light tracking-wider text-xs uppercase"
          >
            Yeniden Dene
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 font-light tracking-wider text-xs uppercase text-center"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
