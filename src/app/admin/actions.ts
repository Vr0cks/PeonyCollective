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

  // Sayfaları yenile ki değişiklikler anında ekrana yansısın
  revalidatePath('/admin')
  revalidatePath('/')
}