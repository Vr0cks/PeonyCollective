'use server'

import { createClient, createAdminClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Ürünün durumunu değiştiren fonksiyon
export async function updateProductStatus(
  productId: string,
  newStatus: 'approved' | 'rejected',
  reason?: string | FormData
) {
  const supabase = await createClient()

  // 1. İşlemi yapan kişi gerçekten Admin mi? (Güvenlik Kontrolü)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Oturum açmanız gerekiyor.")

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw new Error("Bu işlemi yapmaya yetkiniz yok.")
  }

  // 1.5. Bildirim gönderebilmek için ürün detaylarını al
  const { data: product } = await supabase
    .from('products')
    .select('seller_id, brand, model_name')
    .eq('id', productId)
    .single()

  if (!product) {
    throw new Error("Ürün bulunamadı.")
  }

  // 2. Ürünün durumunu veritabanında güncelle
  const { error } = await supabase
    .from('products')
    .update({ status: newStatus })
    .eq('id', productId)

  if (error) {
    console.error("Durum güncelleme hatası:", error.message)
    throw new Error("Ürün güncellenirken bir hata oluştu.")
  }

  let actualReason: string | undefined = undefined
  if (reason instanceof FormData) {
    const r = reason.get('reason')
    if (typeof r === 'string') {
      actualReason = r
    }
  } else if (typeof reason === 'string') {
    actualReason = reason
  }

  // 3. Satıcıya bildirim gönder
  const notificationTitle = newStatus === 'approved' ? 'Ürününüz Onaylandı' : 'Ürününüz Reddedildi'
  const notificationMessage = newStatus === 'approved'
    ? `Tebrikler! ${product.brand} ${product.model_name} ürününüz uzmanlarımız tarafından onaylandı ve satışa sunuldu.`
    : `Maalesef ${product.brand} ${product.model_name} ürününüz kriterlerimize uymadığı için reddedildi.${actualReason ? ` Red gerekçesi: ${actualReason}` : ''}`

  await supabase.from('notifications').insert({
    user_id: product.seller_id,
    type: newStatus === 'approved' ? 'product_approved' : 'product_rejected',
    title: notificationTitle,
    message: notificationMessage,
    is_read: false,
    metadata: { product_id: productId }
  })

  // 4. Satıcı e-posta bilgisini al ve e-posta gönder
  try {
    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const adminAuthClient = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
      const { data: userObj } = await adminAuthClient.auth.admin.getUserById(product.seller_id)
      
      const { data: sellerProfile } = await supabase.from('profiles').select('first_name, last_name').eq('id', product.seller_id).single()
      
      if (userObj.user?.email) {
        try {
          const { sendProductStatusEmail } = await import('@/src/lib/resend')
          await sendProductStatusEmail({
            sellerEmail: userObj.user.email,
            sellerName: `${sellerProfile?.first_name || ''} ${sellerProfile?.last_name || ''}`.trim() || 'Satıcı',
            productName: `${product.brand} ${product.model_name}`,
            status: newStatus,
            reason: actualReason
          })
        } catch (emailSendErr) {
          console.error('Resend e-posta gönderme hatası:', emailSendErr)
        }
      }
    }
  } catch (emailErr) {
    console.error('Bildirim e-postası hazırlama hatası:', emailErr)
  }

  // Sayfaları yenile ki değişiklikler anında ekrana yansısın
  revalidatePath('/admin/pending')
  revalidatePath('/admin/products')
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function updateOrderStatus(orderId: string, nextStatus: string) {
  const supabase = await createClient()

  // Yetki Kontrolü
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Oturum açmanız gerekiyor.")

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw new Error("Bu işlemi yapmaya yetkiniz yok.")
  }

  // Durumu güncelle
  const { error } = await supabase
    .from('orders')
    .update({ order_status: nextStatus })
    .eq('id', orderId)

  if (error) {
    console.error("Sipariş durum güncelleme hatası:", error.message)
    throw new Error("Sipariş güncellenirken bir hata oluştu.")
  }

  revalidatePath('/admin/orders')
  revalidatePath('/orders')
  revalidatePath('/')
}

// Yardımcı admin doğrulama fonksiyonu
async function verifyAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Oturum açmanız gerekiyor.")

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw new Error("Bu işlemi yapmaya yetkiniz yok.")
  }
  return supabase
}

/**
 * Siparişi inceleme durumuna geçirir.
 */
export async function transitionOrderToInspecting(orderId: string) {
  const supabase = await verifyAdmin()

  const { error } = await supabase
    .from('orders')
    .update({ order_status: 'inspecting' })
    .eq('id', orderId)

  if (error) {
    console.error("Order status update to inspecting failed:", error.message)
    throw new Error("Sipariş durumu güncellenirken hata oluştu.")
  }

  revalidatePath('/admin/lab')
  revalidatePath('/orders')
}

/**
 * Siparişi onaylar ve 2. kargoyu (Peony Lab -> Alıcı) oluşturur.
 */
export async function approveOrderInLab(orderId: string) {
  const supabase = await verifyAdmin()

  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .select('*, products(*), buyer:profiles!buyer_id(*)')
    .eq('id', orderId)
    .single()

  if (orderErr || !order) {
    throw new Error("Sipariş bulunamadı.")
  }

  const buyerProfile = order.buyer as any
  const product = order.products as any

  if (!buyerProfile?.address || !buyerProfile?.phone_number) {
    throw new Error("Alıcının profil veya adres bilgileri eksik.")
  }

  const { createOtoOrder } = await import('@/src/lib/oto')

  // 2. Kargo: Peony Lab'den Alıcıya
  const otoResult = await createOtoOrder({
    orderId: order.id,
    description: `${product.brand} ${product.model_name} (Laboratuvar Onaylı)`,
    senderInformation: {
      firstName: 'Peony',
      lastName: 'Lab',
      phone: '+905550000000',
      address: 'Zorlu Center, No: 123, Beşiktaş',
      city: 'İstanbul',
      email: 'lab@peonycollective.com'
    },
    customerInformation: {
      firstName: buyerProfile.first_name || 'Alıcı',
      lastName: buyerProfile.last_name || '',
      phone: buyerProfile.phone_number,
      address: buyerProfile.address,
      city: 'İstanbul',
      email: buyerProfile.email || 'buyer@peony.com'
    }
  })

  const trackingNumber = otoResult?.trackingNumber || otoResult?.shipmentNumber

  if (!trackingNumber) {
    throw new Error("Alıcı kargo kodu oluşturulamadı.")
  }

  // Siparişi onaylı ve kargolandı durumuna çek
  const { error: updateErr } = await supabase
    .from('orders')
    .update({
      order_status: 'shipped_to_buyer',
      shipping_tracking_buyer: trackingNumber
    })
    .eq('id', orderId)

  if (updateErr) {
    console.error("Order status update failed:", updateErr.message)
    throw new Error("Sipariş durumu güncellenemedi.")
  }

  // Alıcıya bildirim gönder
  await supabase.from('notifications').insert({
    user_id: order.buyer_id,
    type: 'shipping_update',
    title: 'Ürününüz Kargoya Verildi',
    message: `Tebrikler! Satın aldığınız ${product.brand} ${product.model_name} ürünü uzmanlarımız tarafından onaylandı ve size gönderilmek üzere kargolandı. Takip No: ${trackingNumber}`,
    is_read: false,
    metadata: { order_id: orderId, tracking_number: trackingNumber }
  })

  revalidatePath('/admin/lab')
  revalidatePath('/orders')
}

/**
 * Siparişi laboratuvarda sahte olduğu gerekçesiyle reddeder.
 */
export async function rejectOrderInLab(orderId: string, reason: string) {
  const supabase = await verifyAdmin()

  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .select('*, products(*)')
    .eq('id', orderId)
    .single()

  if (orderErr || !order) {
    throw new Error("Sipariş bulunamadı.")
  }

  // Siparişi iade edildi durumuna çek
  const { error: updateErr } = await supabase
    .from('orders')
    .update({
      order_status: 'refunded'
    })
    .eq('id', orderId)

  if (updateErr) {
    console.error("Order status update failed:", updateErr.message)
    throw new Error("Sipariş durumu güncellenemedi.")
  }

  // Ürünü reddedildi olarak işaretle
  await supabase
    .from('products')
    .update({
      status: 'rejected'
    })
    .eq('id', order.product_id)

  const product = order.products as any

  // Alıcıya iade bildirimi
  await supabase.from('notifications').insert({
    user_id: order.buyer_id,
    type: 'order_cancelled',
    title: 'Sipariş İptal Edildi ve İade Başlatıldı',
    message: `Satın aldığınız ${product.brand} ${product.model_name} ürünü laboratuvar incelemesini geçemedi ve sipariş iptal edildi. Ücret iadeniz kartınıza yansıtılacaktır. Gerekçe: ${reason}`,
    is_read: false,
    metadata: { order_id: orderId }
  })

  // Satıcıya ret bildirimi
  await supabase.from('notifications').insert({
    user_id: order.seller_id,
    type: 'product_rejected',
    title: 'Ürününüz Orijinallik Testinden Geçemedi',
    message: `Gönderdiğiniz ${product.brand} ${product.model_name} ürünü laboratuvar dikiş/logo incelemelerinden geçemedi. Ürün size geri gönderilecektir. Gerekçe: ${reason}`,
    is_read: false,
    metadata: { order_id: orderId }
  })

  revalidatePath('/admin/lab')
  revalidatePath('/orders')
}

// Telegram IT Destek Bildirim Action
export async function sendItSupportPingAction(messageText: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    // Kullanıcı adı ve e-postasını al
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', user.id)
      .single()

    const userName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : 'Bilinmeyen Admin'

    const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.warn('[TELEGRAM PING ERROR] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in env.')
      return { success: false, error: 'Telegram entegrasyonu (env değişkenleri) henüz yapılandırılmamış.' }
    }

    // 1. Veritabanına "open" bilet olarak kaydet (RLS bypass admin client ile)
    const adminDb = createAdminClient()
    const { data: ticket, error: ticketError } = await adminDb
      .from('it_support_tickets')
      .insert({
        user_id: user.id,
        message: messageText,
        status: 'open'
      })
      .select('*')
      .single()

    if (ticketError) {
      console.warn('[DB TICKET SAVE WARNING] Could not save ticket to database:', ticketError.message)
    }

    const ticketIdStr = ticket ? `\n\n📌 *Talep ID:* \`${ticket.id}\`` : ''

    const message = `🔔 *YENİ IT DESTEK TALEBİ*\n\n` +
      `👤 *Gönderen:* ${userName}\n` +
      `📧 *E-posta:* ${user.email || 'Belirtilmemiş'}\n` +
      `🕒 *Zaman:* ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}\n\n` +
      `💬 *Mesaj:*\n${messageText}` +
      ticketIdStr +
      `\n\n⚠️ _Cevap vermek için bu mesaja "Yanıtla (Reply)" yapıp mesajınızı yazabilirsiniz._`

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Telegram API responded with status ${response.status}: ${errorText}`)
    }

    // 2. Telegram message_id bilgisini veritabanına geri işle (reply mekanizması için)
    const resData = await response.json()
    const telegramMessageId = resData?.result?.message_id

    if (ticket && telegramMessageId) {
      await adminDb
        .from('it_support_tickets')
        .update({ telegram_message_id: String(telegramMessageId) })
        .eq('id', ticket.id)
    }

    return { success: true }
  } catch (error: any) {
    console.error('[IT SUPPORT PING FAILED]', error)
    return { success: false, error: error.message || 'Telegram bildirimi gönderilemedi.' }
  }
}

// VIP Özel Teklif (Concierge) Kayıt ve Telegram Bildirim Action
export async function createConciergeRequestAction(name: string, productInterest: string, maxPrice: number) {
  try {
    const supabase = await createClient()

    // Oturum açmış kullanıcının ID'sini bul (varsa)
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user ? user.id : null

    // 1. Veritabanına kaydet
    const { error } = await supabase.from('concierge_requests').insert({
      name,
      product_interest: productInterest,
      max_price: maxPrice,
      status: 'pending',
      user_id: userId
    })

    if (error) throw error

    // 2. Telegram Bildirimi Gönder (Eğer Telegram env tanımlıysa)
    const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

    if (botToken && chatId) {
      const message = `👑 *YENİ VIP TEKLİF (CONCIERGE)*\n\n` +
        `👤 *Müşteri:* ${name}\n` +
        `👜 *İlgilenilen Ürün:* ${productInterest}\n` +
        `💰 *Teklif Tutarı:* ${maxPrice.toLocaleString('tr-TR')} ₺\n\n` +
        `🕒 *Zaman:* ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}`

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      }).catch(err => console.error('[TELEGRAM CONCIERGE ERROR]', err))
    }

    return { success: true }
  } catch (err: any) {
    console.error('[CONCIERGE REQUEST FAILED]', err)
    return { success: false, error: err.message || 'Teklif iletilemedi.' }
  }
}

// Sistem durumunu gerçek zamanlı sorgulayan server action
export async function checkSystemStatusAction() {
  try {
    const supabase = await createClient()

    // 1. Postgres DB ping & latency hesapla
    const dbStartTime = Date.now()
    const { error: dbError } = await supabase.from('profiles').select('id').limit(1)
    const dbLatency = Date.now() - dbStartTime
    const dbStatus = dbError ? 'OFFLINE' : `ONLINE (${dbLatency}ms)`

    // 2. Storage ping & kontrolü
    const { error: storageError } = await supabase.storage.listBuckets()
    const storageStatus = storageError ? 'OFFLINE' : 'ONLINE'

    // 3. Entrupy API Key Kontrolü
    const entrupyConfigured = !!process.env.ENTRUPY_API_KEY
    const entrupyStatus = entrupyConfigured ? 'SYNCED' : 'NOT_CONFIGURED'

    return {
      success: true,
      dbStatus,
      storageStatus,
      entrupyStatus,
      edgeStatus: 'ONLINE'
    }
  } catch (error: any) {
    console.error('[SYSTEM STATUS ACTION ERROR]', error)
    return {
      success: false,
      dbStatus: 'OFFLINE',
      storageStatus: 'OFFLINE',
      entrupyStatus: 'OFFLINE',
      edgeStatus: 'ONLINE'
    }
  }
}

/**
 * Ürün fotoğraflarını Claude 3.5 Sonnet Vision API ile analiz eder
 * ve sonucu ai_authentication_logs tablosuna kaydeder.
 */
export async function runClaudeVisionPrecheck(productId: string) {
  const supabase = await verifyAdmin()

  // 1. Ürün detaylarını ve fotoğraflarını çek
  const { data: product, error: prodErr } = await supabase
    .from('products')
    .select('id, brand, model_name, public_images, authenticity_docs')
    .eq('id', productId)
    .single()

  if (prodErr || !product) {
    throw new Error("Ürün bulunamadı.")
  }

  // Analiz edilecek fotoğrafları belirle (Dökümanlar veya vitrin görselleri)
  const imagesToAnalyze = product.authenticity_docs && product.authenticity_docs.length > 0 
    ? product.authenticity_docs 
    : product.public_images

  if (!imagesToAnalyze || imagesToAnalyze.length === 0) {
    throw new Error("Analiz edilecek fotoğraf bulunamadı.")
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY bulunamadı. Lütfen API anahtarını tanımlayın.")
  }

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.peony-collective.com'

    // Claude API'sine görselleri base64 formatında besle (Maksimum 5 fotoğraf)
    const imageBlocks = await Promise.all(
      imagesToAnalyze.slice(0, 5).map(async (url: string) => {
        try {
          const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : url
          const res = await fetch(fullUrl)
          if (!res.ok) return null
          const arrayBuffer = await res.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          
          const contentType = res.headers.get('content-type') || ''
          let media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' = 'image/jpeg'
          if (contentType.includes('png')) media_type = 'image/png'
          else if (contentType.includes('webp')) media_type = 'image/webp'
          else if (contentType.includes('gif')) media_type = 'image/gif'

          return {
            type: 'image' as const,
            source: {
              type: 'base64' as const,
              media_type,
              data: buffer.toString('base64')
            }
          }
        } catch (e) {
          console.error('Image fetch error:', url, e)
          return null
        }
      })
    )

    const validImageBlocks = imageBlocks.filter((block): block is {
      type: 'image'
      source: {
        type: 'base64'
        media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
        data: string
      }
    } => block !== null)

    if (validImageBlocks.length === 0) {
      throw new Error("Analiz edilecek görseller indirilemedi veya yüklenemedi.")
    }

    const systemPrompt = `
      Sen lüks ikinci el çanta ve saat orijinallik doğrulama uzmanısın.
      
      GÖNDERİLEN GÖRSELLERİN GEÇERLİLİK KONTROLÜ VE UYUMSUZLUK DETEKSİYONU:
      - Eğer gönderilen fotoğraflar tamamen siyah, aşırı karanlık, bulanık, boş veya lüks çanta/saat İÇERMİYORSA talebi KESİNLİKLE REDDET.
      - UYUMSUZLUK KONTROLÜ: Beyan edilen ürün bilgisi (${product.brand} - ${product.model_name}) ile fotoğraftaki nesne eşleşmiyorsa (örneğin saat ürünü/markası adı altında ÇANTA fotoğrafı yüklenmişse veya tam tersi), bu durumu kesinlikle tespit et! Kararını "suspicious" yap, güven skorunu 95 belirle ve gerekçede ürün başlığı/kategorisi ile yüklenen görsel arasındaki nesne uyumsuzluğunu net olarak açıkla.
      
      ORİJİNALLİK DEĞERLENDİRME KURALLARI:
      - Görseller geçerliyse ve ürün bilgisiyle uyumluysa; fotoğraflardaki dikiş simetrisini, deri dokusunu, logo fontunu, metal parça kalitesini, saat kadranı/donanım detaylarını ve seri numarası damgalarını detaylı incele.
      - Değerlendirmeni yaptıktan sonra mutlaka aşağıdaki JSON formatında bir rapor döndür. JSON dışında hiçbir metin yazma:
      
      Format:
      {
        "verdict": "likely_authentic|suspicious|likely_fake",
        "confidence": 0-100, (verdiğin kararın güven skoru)
        "reasoning": "Buraya çantanın/saatin detayları ve analiz raporunu yaz..."
      }
    `

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: [
            ...validImageBlocks,
            {
              type: 'text',
              text: `Bu ${product.brand} - ${product.model_name} ürününü analiz et.`
            }
          ]
        }
      ]
    })

    const responseContent = response.content[0].type === 'text' ? response.content[0].text : ''
    
    let verdict: 'likely_authentic' | 'suspicious' | 'likely_fake' = 'suspicious'
    let confidence = 90
    let reasoning = responseContent

    const jsonMatch = responseContent.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0])
        if (parsed.verdict) {
          const v = String(parsed.verdict).toLowerCase()
          if (['likely_authentic', 'suspicious', 'likely_fake'].includes(v)) {
            verdict = v as any
          } else if (v.includes('authentic') || v.includes('orijinal')) {
            verdict = 'likely_authentic'
          } else if (v.includes('fake') || v.includes('sahte')) {
            verdict = 'likely_fake'
          }
        }
        if (typeof parsed.confidence === 'number') {
          confidence = Math.min(100, Math.max(0, Math.round(parsed.confidence)))
        }
        const text = parsed.reasoning || parsed.reason || parsed.analysis || parsed.explanation || parsed.details
        if (text && typeof text === 'string') {
          reasoning = text
        }
      } catch (e) {
        console.warn("JSON parse warning, using raw text:", e)
      }
    }

    if (!reasoning || reasoning.trim().length === 0) {
      reasoning = "Claude Vision analizi tamamlandı ancak metin içeriği alınamadı."
    }

    // 2. Analiz sonuçlarını ai_authentication_logs tablosuna kaydet (Eğitim seti için)
    const { error: logErr } = await supabase
      .from('ai_authentication_logs')
      .insert({
        product_id: product.id,
        brand: product.brand,
        model_name: product.model_name,
        image_urls: imagesToAnalyze,
        claude_verdict: verdict,
        claude_confidence: confidence,
        claude_raw_response: reasoning
      })

    if (logErr) {
      console.error("AI auth log yazma hatası:", logErr.message)
    }

    revalidatePath('/admin/lab')
    revalidatePath('/admin/pending')
    
    return {
      success: true,
      verdict,
      confidence,
      reasoning
    }
  } catch (error: any) {
    console.error("Claude Vision Precheck Error:", error)
    
    // Hata oluşsa dahi sayfayı çökertmemek için ai_authentication_logs tablosuna hata kaydı düş ve revalidate et
    try {
      await supabase
        .from('ai_authentication_logs')
        .insert({
          product_id: productId,
          brand: 'Bilinmiyor',
          model_name: 'Bilinmiyor',
          image_urls: [],
          claude_verdict: 'suspicious',
          claude_confidence: 0,
          claude_raw_response: `⚠️ Claude Vision analizi gerçekleştirilemedi: ${error.message || 'Bilinmeyen sunucu hatası'}`
        })
      
      revalidatePath('/admin/lab')
      revalidatePath('/admin/pending')
    } catch (dbErr) {
      console.error("Failed to log vision analysis error:", dbErr)
    }

    return {
      success: false,
      error: error.message
    }
  }
}

export async function triggerVisionAnalysisAction(productId: string) {
  try {
    await runClaudeVisionPrecheck(productId)
  } catch (err: any) {
    console.error("triggerVisionAnalysisAction error:", err)
  }
}