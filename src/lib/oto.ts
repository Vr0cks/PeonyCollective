/**
 * OTO Kargo API Entegrasyonu
 * Docs: https://apis.tryoto.com
 * Base URL: https://api.tryoto.com/rest/v2/
 *
 * Auth Akışı:
 *   1. OTO_REFRESH_TOKEN → POST /refreshToken → access_token (1 saat geçerli)
 *   2. Sonraki tüm isteklerde: Authorization: Bearer <access_token>
 *
 * Kargo Oluşturma Akışı (2 adım):
 *   Step 1: POST /createOrder  → orderId alırız
 *   Step 2: POST /createShipment (orderId + deliveryOptionId) → kargo oluşur
 *   Alt: POST /createOrder + createShipment:true → tek adımda
 *   Step 3: GET /print/:orderId → AWB (kargo etiketi) URL
 *   Step 4: GET /orderStatus?orderId=xxx → takip
 */

const OTO_BASE_URL = 'https://api.tryoto.com/rest/v2'

// ─── In-memory token cache (server restart'ta sıfırlanır) ───────────────────
let cachedAccessToken: string | null = null
let tokenExpiresAt: number = 0

/**
 * Refresh token kullanarak yeni bir access token alır.
 * Token'ı 55 dakika boyunca önbelleğe alır (1 saatlik ömrün güvenli altı).
 */
export async function getOtoAccessToken(): Promise<string> {
  const now = Date.now()

  // Önbellekteki token hâlâ geçerliyse yeniden kullan
  if (cachedAccessToken && now < tokenExpiresAt) {
    return cachedAccessToken
  }

  const refreshToken = process.env.OTO_REFRESH_TOKEN
  if (!refreshToken) {
    throw new Error('OTO_REFRESH_TOKEN tanımlı değil. .env.local dosyasını kontrol edin.')
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 saniye timeout

  try {
    const response = await fetch(`${OTO_BASE_URL}/refreshToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId);

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`OTO token alınamadı (${response.status}): ${text}`)
    }

    const data = await response.json()
    const accessToken: string = data.access_token || data.token || data.accessToken

    if (!accessToken) {
      throw new Error(`OTO token yanıtında access_token bulunamadı: ${JSON.stringify(data)}`)
    }

    cachedAccessToken = accessToken
    tokenExpiresAt = now + 55 * 60 * 1000

    return accessToken
  } catch (error: any) {
    clearTimeout(timeoutId);
    let errorMsg = error.message || 'Bilinmeyen Hata';
    if (error.name === 'AbortError') {
      errorMsg = 'OTO Refresh Token isteği zaman aşımına uğradı (Timeout - 6000ms)';
    } else if (error.code === 'ENOTFOUND' || error.message?.includes('fetch failed')) {
      errorMsg = 'İnternet veya DNS bağlantısı kurulamadı (Ağ hatası)';
    }
    throw new Error(`OTO Auth Hatası: ${errorMsg}`);
  }
}

/**
 * OTO API'ye kimlik doğrulamalı istek atar.
 */
async function otoFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const accessToken = await getOtoAccessToken()

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 saniye timeout

  let text = '';
  try {
    const response = await fetch(`${OTO_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId);

    text = await response.text()
    let json: T

    try {
      json = JSON.parse(text) as T
    } catch {
      throw new Error(`OTO API yanıtı JSON değil (${response.status}): ${text}`)
    }

    if (!response.ok) {
      throw new Error(`OTO API hatası (${response.status}): ${JSON.stringify(json)}`)
    }

    return json
  } catch (error: any) {
    clearTimeout(timeoutId);
    let errorMsg = error.message || 'Bilinmeyen Hata';
    if (error.name === 'AbortError') {
      errorMsg = `OTO API isteği zaman aşımına uğradı (Timeout - 8000ms, Path: ${path})`;
    } else if (error.code === 'ENOTFOUND' || error.message?.includes('fetch failed')) {
      errorMsg = `İnternet veya DNS bağlantısı kurulamadı (Ağ hatası, Path: ${path})`;
    }

    // Sistem loglarına yazmaya çalışalım
    try {
      const { createAdminClient } = await import('@/src/utils/supabase/admin');
      const supabase = createAdminClient();
      await supabase.from('system_logs').insert({
        level: 'error',
        source: 'oto_cargo_api',
        message: `OTO Kargo API isteği başarısız oldu: ${path}`,
        metadata: { error: errorMsg, responseText: text || null }
      });
    } catch (e) {}

    throw new Error(`OTO Kargo Hatası: ${errorMsg}${text ? ` - Yanıt: ${text}` : ''}`);
  }
}

// ─── Tipler ─────────────────────────────────────────────────────────────────

export interface OtoContactInfo {
  firstName: string
  lastName: string
  phone: string
  /** Türkiye için şehir adı (İstanbul, Ankara, vb.) */
  city: string
  address: string
  country?: string
  email?: string
}

export interface OtoCreateOrderParams {
  /** Peony sipariş ID'si — OTO'da referans olarak kullanılır */
  orderId: string
  /** Ürün açıklaması */
  description: string
  /** Paket ağırlığı (gram) */
  weightGrams?: number
  /** COD (kapıda ödeme) tutarı — escrow modelde 0 */
  codAmount?: number
  /** Gönderici (satıcı) bilgileri */
  senderInformation: OtoContactInfo
  /** Alıcı (alıcı) bilgileri */
  customerInformation: OtoContactInfo
  /** true ise createOrder + createShipment tek adımda yapılır */
  createShipment?: boolean
  /** Kargo firması delivery option ID — boş bırakılırsa OTO otomatik atar */
  deliveryOptionId?: string
}

export interface OtoOrderResponse {
  success: boolean
  orderId?: string
  /** createShipment:true gönderildiğinde dolu gelir */
  shipmentNumber?: string
  trackingNumber?: string
  printAWBURL?: string
  [key: string]: unknown
}

export interface OtoOrderStatus {
  success: boolean
  status?: string
  trackingNumber?: string
  carrier?: string
  printAWBURL?: string
  estimatedDeliveryTime?: string
  [key: string]: unknown
}

// ─── API Fonksiyonları ───────────────────────────────────────────────────────

/**
 * OTO'da sipariş (ve opsiyonel olarak kargo) oluşturur.
 *
 * createShipment:true ile tek adımda kargo da oluşturulur.
 * OTO otomatik olarak uygun kargo firmasını atar.
 */
export async function createOtoOrder(params: OtoCreateOrderParams): Promise<OtoOrderResponse> {
  const payload = {
    orderId: params.orderId,
    createShipment: params.createShipment ?? true,
    payment_method: 'paid',
    amount: 100, // Varsayılan/Dummy tutar, OTO kargo fiyatı için gerekebiliyor
    amount_due: params.codAmount ?? 0,
    currency: 'TRY',
    ...(params.deliveryOptionId && { deliveryOptionId: params.deliveryOptionId }),
    senderName: `${params.senderInformation.firstName} ${params.senderInformation.lastName}`,
    senderInformation: {
      senderFullName: `${params.senderInformation.firstName} ${params.senderInformation.lastName}`,
      senderMobile: params.senderInformation.phone,
      senderCity: params.senderInformation.city,
      senderStreet: params.senderInformation.address,
      senderCountry: params.senderInformation.country ?? 'TR',
      ...(params.senderInformation.email && { senderEmail: params.senderInformation.email }),
    },
    customer: {
      name: `${params.customerInformation.firstName} ${params.customerInformation.lastName}`,
      mobile: params.customerInformation.phone,
      email: params.customerInformation.email || 'customer@peony.com',
      address: params.customerInformation.address,
      city: params.customerInformation.city,
      country: params.customerInformation.country ?? 'TR',
    },
    items: [
      {
        name: params.description,
        price: 0,
        quantity: 1,
      },
    ],
  }

  return otoFetch<OtoOrderResponse>('/createOrder', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

/**
 * Ayrı olarak kargo oluşturur (createOrder'dan sonra).
 */
export async function createOtoShipment(
  orderId: string,
  deliveryOptionId?: string
): Promise<OtoOrderResponse> {
  return otoFetch<OtoOrderResponse>('/createShipment', {
    method: 'POST',
    body: JSON.stringify({
      orderId,
      ...(deliveryOptionId && { deliveryOptionId }),
    }),
  })
}

/**
 * Sipariş/kargo durumunu sorgular.
 * orderId: OTO'daki sipariş ID'si (Peony order ID)
 */
export async function getOtoOrderStatus(orderId: string): Promise<OtoOrderStatus> {
  return otoFetch<OtoOrderStatus>(`/orderStatus?orderId=${encodeURIComponent(orderId)}`)
}

/**
 * AWB (kargo etiketi) URL'sini alır.
 */
export async function getOtoAWB(orderId: string): Promise<{ success: boolean; printUrl?: string }> {
  return otoFetch<{ success: boolean; printUrl?: string }>(`/print/${encodeURIComponent(orderId)}`)
}

/**
 * Sipariş tarihçesini alır (tüm durum değişiklikleri).
 */
export async function getOtoOrderHistory(orderId: string): Promise<unknown> {
  return otoFetch(`/orderHistory?orderId=${encodeURIComponent(orderId)}`)
}

/**
 * Mevcut siparişleri listeler.
 */
export async function listOtoOrders(page = 1, limit = 20): Promise<unknown> {
  return otoFetch(`/orders?page=${page}&limit=${limit}`)
}
