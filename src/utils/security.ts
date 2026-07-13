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

/**
 * Filters out contact information (phone numbers, emails) from a string.
 * Helps prevent off-platform transaction attempts (A05:2021-Security Misconfiguration context).
 * @param text The raw message content
 * @returns string Cleaned text with masked contact info
 */
export function maskContactInfo(text: string): string {
  if (!text) return text

  // 1. Email address masking
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi
  let masked = text.replace(emailRegex, '[İLETİŞİM BİLGİSİ GİZLENDİ]')

  // 2. Phone number masking (standard formats: e.g. 0532 123 4567, +905321234567, 532-123-45-67)
  const phoneRegex = /(?:\+?90[\s\.-]?)?\(?0?5[0-9]{2}\)?[\s\.-]?[0-9]{3}[\s\.-]?[0-9]{2}[\s\.-]?[0-9]{2}/g
  masked = masked.replace(phoneRegex, '[İLETİŞİM BİLGİSİ GİZLENDİ]')

  // 3. Consecutive digit blocks of 10-13 digits
  const consecutiveDigitsRegex = /\b\d{10,13}\b/g
  masked = masked.replace(consecutiveDigitsRegex, '[İLETİŞİM BİLGİSİ GİZLENDİ]')

  // 4. Spaced out phone number masking (e.g. 0 5 3 2 1 2 3 4 5 6 7 or 5 3 2 1 2 3 4 5 6 7)
  const spacedPhoneRegex = /\b0?\s*5\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\b/g
  masked = masked.replace(spacedPhoneRegex, '[İLETİŞİM BİLGİSİ GİZLENDİ]')

  return masked
}

