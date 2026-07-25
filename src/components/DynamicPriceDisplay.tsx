'use client'

import { useSettings } from '@/src/context/SettingsContext'

export default function DynamicPriceDisplay({ price }: { price: number }) {
  const { formatPrice } = useSettings()
  return (
    <div className="text-3xl font-light tracking-widest text-[#AF9164]">
      {formatPrice(price)}
    </div>
  )
}
