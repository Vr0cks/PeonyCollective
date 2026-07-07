import { NextResponse } from 'next/server'

const rateLimitCache = new Map<string, number>()

/**
 * Checks if a given IP has exceeded rate limit.
 * @param ip IP Address of the user
 * @param limitMs Window time in milliseconds (default: 10000ms / 10s)
 * @returns boolean true if allowed, false if rate limited
 */
export function checkRateLimit(ip: string, limitMs: number = 10000): boolean {
  const nowTs = Date.now()
  const lastRequestTs = rateLimitCache.get(ip)
  if (lastRequestTs && nowTs - lastRequestTs < limitMs) {
    return false
  }
  rateLimitCache.set(ip, nowTs)
  return true
}

/**
 * Logs the detailed error internally and returns a clean, masked error message to the client.
 * Prevents A05:2021-Security Misconfiguration error leaking.
 * @param error The raw caught error
 * @param fallbackMessage User-facing friendly error message
 * @param status HTTP status code (default: 500)
 */
export function maskErrorResponse(
  error: any,
  fallbackMessage: string = 'Bir iç sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.',
  status: number = 500
) {
  console.error('[SECURITY AUDIT LOG - INTERNAL ERROR]:', error)
  return NextResponse.json({ error: fallbackMessage }, { status })
}
