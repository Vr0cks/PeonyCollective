import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Basit bir in-memory rate limiter (Edge ortamında tam dağıtık olmasa da temel koruma sağlar)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

const LIMIT = 100 // 1 dakikada maksimum 100 istek (API için)
const WINDOW_MS = 60 * 1000 // 1 dakika

export async function proxy(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
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
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isProtected =
    path.startsWith('/dashboard') ||
    path.startsWith('/sell') ||
    path.startsWith('/settings') ||
    path.startsWith('/messages') ||
    path.startsWith('/orders') ||
    path.startsWith('/checkout')

  const isAdminRoute = path.startsWith('/admin')

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', path)
    return NextResponse.redirect(url)
  }

  if (isAdminRoute) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirect', path)
      return NextResponse.redirect(url)
    }

    // NOT: Veritabanı (profiles) kontrolü Edge middleware üzerinden kaldırıldı. (Performans Optimizasyonu)
    // Admin yetki kontrolü artık sunucu bileşeni olan src/app/admin/layout.tsx dosyasında yapılıyor.
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/sell/:path*',
    '/settings/:path*',
    '/messages/:path*',
    '/orders/:path*',
    '/checkout/:path*',
    '/admin/:path*',
    '/api/:path*',
  ],
}
