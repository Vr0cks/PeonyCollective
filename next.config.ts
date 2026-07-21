import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'nnfjkauqghteqhbiqbzl.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Clickjacking koruması — sadece aynı origin iframe açabilir
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // MIME sniffing koruması
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer bilgisi sızıntısını önler
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // HTTPS zorunluluğu (HSTS) — 1 yıl, tüm alt domainler dahil
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          // Gereksiz tarayıcı özelliklerine erişimi kısıtlar
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://www.paytr.com")',
          },
          // XSS Koruması — Content Security Policy
          // PayTR iframe, Supabase storage ve Google Fonts'a izin verildi
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paytr.com https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://plus.unsplash.com https://cdn.shopify.com https://www.peony-collective.com",
              "frame-src 'self' https://www.paytr.com",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.tryoto.com https://www.paytr.com https://api.entrupy.com https://api.telegram.org https://api.resend.com",
              "media-src 'self' https://*.supabase.co",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://www.paytr.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
