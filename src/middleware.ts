import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basit bir in-memory rate limiter (Edge ortamında tam dağıtık olmasa da temel koruma sağlar)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

const LIMIT = 100 // 1 dakikada maksimum 100 istek (API için)
const WINDOW_MS = 60 * 1000 // 1 dakika

export function middleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const path = request.nextUrl.pathname

  // Sadece API rotaları için rate limit uygula
  if (path.startsWith('/api/')) {
    const now = Date.now()
    const record = rateLimitMap.get(ip)

    if (!record) {
      rateLimitMap.set(ip, { count: 1, lastReset: now })
    } else {
      if (now - record.lastReset > WINDOW_MS) {
        // Zaman penceresi sıfırlandı
        rateLimitMap.set(ip, { count: 1, lastReset: now })
      } else {
        record.count += 1
        if (record.count > LIMIT) {
          console.warn(`[RATE LIMIT EXCEEDED] IP: ${ip} on path: ${path}`)
          return NextResponse.json(
            { error: 'Too Many Requests', message: 'Çok fazla istek gönderdiniz. Lütfen bir süre bekleyin.' },
            { status: 429 }
          )
        }
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
