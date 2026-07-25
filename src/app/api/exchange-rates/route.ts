import { NextResponse } from 'next/server'

// Simple 1-hour in-memory cache for exchange rates
let cachedRates: { USD: number; EUR: number } | null = null
let lastFetchTime = 0

export async function GET() {
  try {
    const now = Date.now()
    // Cache for 1 hour (3600000 ms)
    if (cachedRates && now - lastFetchTime < 3600000) {
      return NextResponse.json({
        success: true,
        rates: cachedRates,
        source: 'cache',
        timestamp: lastFetchTime
      })
    }

    // Free Open Exchange Rates API (Base: TRY)
    const res = await fetch('https://open.er-api.com/v6/latest/TRY', {
      next: { revalidate: 3600 }
    })

    if (!res.ok) {
      throw new Error(`Exchange rate API responded with status ${res.status}`)
    }

    const data = await res.json()
    const ratesData = data.rates || {}

    // ratesData contains values like: 1 TRY = 0.0211 USD, 1 TRY = 0.0185 EUR
    // We compute how many TRY per 1 USD and 1 EUR, or use TRY rate directly
    const usdRateInTry = ratesData.USD ? 1 / ratesData.USD : 38.5
    const eurRateInTry = ratesData.EUR ? 1 / ratesData.EUR : 42.0

    cachedRates = {
      USD: parseFloat(usdRateInTry.toFixed(2)),
      EUR: parseFloat(eurRateInTry.toFixed(2))
    }
    lastFetchTime = now

    return NextResponse.json({
      success: true,
      rates: cachedRates,
      source: 'live',
      timestamp: lastFetchTime
    })
  } catch (error: any) {
    console.error('Exchange rates fetch error:', error)
    // Fallback default rates in case of network issue
    const fallbackRates = {
      USD: 38.50,
      EUR: 42.00
    }
    return NextResponse.json({
      success: true,
      rates: cachedRates || fallbackRates,
      source: 'fallback',
      error: error.message
    })
  }
}
