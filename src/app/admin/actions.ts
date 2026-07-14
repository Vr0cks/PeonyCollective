'use server'

import { createClient } from '@/src/utils/supabase/server'
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

    const message = `🔔 *YENİ IT DESTEK TALEBİ*\n\n` +
      `👤 *Gönderen:* ${userName}\n` +
      `📧 *E-posta:* ${user.email || 'Belirtilmemiş'}\n` +
      `🕒 *Zaman:* ${new Date().toLocaleString('tr-TR')}\n\n` +
      `💬 *Mesaj:*\n${messageText}\n\n` +
      `⚠️ _Lütfen admin panelinden sistem durumunu kontrol edin._`

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

    // 1. Veritabanına kaydet
    const { data, error } = await supabase.from('concierge_requests').insert({
      name,
      product_interest: productInterest,
      max_price: maxPrice,
      status: 'pending',
    }).select('*').single()

    if (error) throw error

    // 2. Telegram Bildirimi Gönder (Eğer Telegram env tanımlıysa)
    const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

    if (botToken && chatId) {
      const message = `👑 *YENİ VIP TEKLİF (CONCIERGE)*\n\n` +
        `👤 *Müşteri:* ${name}\n` +
        `👜 *İlgilenilen Ürün:* ${productInterest}\n` +
        `💰 *Teklif Tutarı:* ${maxPrice.toLocaleString('tr-TR')} ₺\n\n` +
        `🕒 *Zaman:* ${new Date().toLocaleString('tr-TR')}`

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

    return { success: true, request: data }
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