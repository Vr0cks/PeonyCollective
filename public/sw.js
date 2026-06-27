const CACHE_NAME = 'peony-pwa-v1'

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/logo.png' // Eğer varsa
]

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
  // Eski cache'leri temizle
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    })
  )
})

self.addEventListener('fetch', (event) => {
  // Sadece GET istekleri için cache
  if (event.request.method !== 'GET') return

  // Next.js Hot Reloading (Geliştirme modunda cache'i iptal et)
  if (event.request.url.includes('/_next/webpack-hmr')) return

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Önce network'e git (Ağ öncelikli - Güncel verileri çekmek için)
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // Gelen cevabı önbelleğe ekle
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })
          }
          return networkResponse
        })
        .catch(() => {
          // Ağ hatası (offline) durumunda önbellekten (cache) dön
          return cachedResponse
        })

      // Eğer önceden cache'de varsa hemen göster, yoksa network sonucunu bekle
      return fetchPromise || cachedResponse
    })
  )
})
