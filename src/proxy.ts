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

  // ─── GÜVENLİK: KALICI KARALİSTE (BLACKLIST) ───
  const BLACKLISTED_IPS = new Set([
    '78.162.46.79', // Antalya Kepez / Yetkisiz /admin/products taraması
  ])

  // Eğer IP karalistedeyse tüm site erişimini anında 403 Forbidden ile kes
  if (BLACKLISTED_IPS.has(ip)) {
    return new NextResponse('Access Denied - Your IP address has been blocked due to security violations.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  const isProtected =
    path.startsWith('/dashboard') ||
    path.startsWith('/sell') ||
    path.startsWith('/settings') ||
    path.startsWith('/messages') ||
    path.startsWith('/orders') ||
    path.startsWith('/checkout')

  const isAdminRoute = 
    path.startsWith('/admin') ||
    path.startsWith('/wp-admin') ||
    path.startsWith('/administrator') ||
    path.startsWith('/cpanel') ||
    path.startsWith('/phpmyadmin') ||
    path.startsWith('/.env') ||
    path.startsWith('/wp-login') ||
    path.startsWith('/config.json')

  // Honeypot: Ana vitrin sitesinde /admin rotasını tamamen kapat ve TCK Bilişim Suçları / Siber İhbar'a yönlendir
  if (isAdminRoute) {
    const userAgent = request.headers.get('user-agent') || 'Bilinmeyen Tarayıcı'
    
    // Telegram Alert gönder (Asenkron - kullanıcıyı bekletmeden)
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN
      const chatId = process.env.TELEGRAM_CHAT_ID

      if (botToken && chatId) {
        const text = `🚨 *YETKİSİZ ERİŞİM GİRİŞİMİ TESPİT EDİLDİ*\n\n` +
          `🌐 *Site:* Peony Collective Vitrin\n` +
          `📍 *Hedef Dizin:* \`${path}\`\n` +
          `👤 *IP Adresi:* \`${ip}\`\n` +
          `💻 *Cihaz:* ${userAgent.slice(0, 100)}\n` +
          `⏰ *Zaman:* ${new Date().toLocaleString('tr-TR')}\n\n` +
          `_Kullanıcı TCK Bilişim Suçları ve EGM Siber İhbar sistemine yönlendirildi._`

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'Markdown',
          }),
        }).catch(() => {})
      }
    } catch (_) {}

    // 5237 Sayılı TCK Madde 243-244 & Adli Siber Güvenlik Honeypot Ekranına yönlendir
    const incidentUrl = request.nextUrl.clone()
    incidentUrl.pathname = '/security-incident'
    incidentUrl.searchParams.set('ip', ip)
    incidentUrl.searchParams.set('target', path)
    return NextResponse.redirect(incidentUrl)
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
