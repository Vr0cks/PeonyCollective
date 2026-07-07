'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Truck, Loader2 } from 'lucide-react'

interface GetCargoCodeButtonProps {
  orderId: string
}

export default function GetCargoCodeButton({ orderId }: GetCargoCodeButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleGetCode = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/cargo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Kargo kodu oluşturulamadı.')
      }

      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 flex flex-col items-end gap-2">
      <button
        onClick={handleGetCode}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#AF9164] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={13} className="animate-spin" />
            Oluşturuluyor...
          </>
        ) : (
          <>
            <Truck size={13} />
            Kargo Kodu Al (Peony Lab'e Gönder)
          </>
        )}
      </button>
      {error && <p className="text-red-500 text-[10px] uppercase font-bold">{error}</p>}
    </div>
  )
}
