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
    // Auth user'ı bulmak zor (admin API olmadığı sürece), ama seller_id Auth tablosu ile ilişkili.
    // Şimdilik profil tablosundan isim bilgilerini, auth'dan email alamıyoruz RLS nedeniyle doğrudan (eğer adminsek alabiliriz).
    // Daha basit bir çözüm olarak Auth admin apisi ile veya eğer profilde email tutuyorsak oradan.
    // Şema kontrolünde profile'da email yok.
    // Supabase Admin client kullanarak e-posta adresini alalım:
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
        const { sendProductStatusEmail } = await import('@/src/lib/resend')
        await sendProductStatusEmail({
          sellerEmail: userObj.user.email,
          sellerName: `${sellerProfile?.first_name || ''} ${sellerProfile?.last_name || ''}`.trim() || 'Satıcı',
          productName: `${product.brand} ${product.model_name}`,
          status: newStatus,
          reason: actualReason
        })
      }
    }
  } catch (emailErr) {
    console.error('Bildirim e-postası gönderilemedi:', emailErr)
  }

  // Sayfaları yenile ki değişiklikler anında ekrana yansısın
  revalidatePath('/admin')
  revalidatePath('/')
}