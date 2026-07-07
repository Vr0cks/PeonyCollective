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