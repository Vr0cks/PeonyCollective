import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Free currency API with fallback
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/TRY', {
      next: { revalidate: 3600 },
    })

    if (res.ok) {
      const data = await res.json()
      if (data?.rates) {
        // Convert TRY base to USD and EUR rates (1 USD = X TRY, 1 EUR = Y TRY)
        const usdRate = data.rates.USD ? 1 / data.rates.USD : 38.5
        const eurRate = data.rates.EUR ? 1 / data.rates.EUR : 42.0

        return NextResponse.json({
          USD: Number(usdRate.toFixed(2)),
          EUR: Number(eurRate.toFixed(2)),
        })
      }
    }
  } catch (_) {}

  // Safe Fallback Rates
  return NextResponse.json({
    USD: 38.5,
    EUR: 42.0,
  })
}
