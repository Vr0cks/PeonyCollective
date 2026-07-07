'use server'

import { createClient } from '@/src/utils/supabase/server'
import { createAdminClient } from '@/src/utils/supabase/admin'

// Create a new offer for a product
export async function createOffer(productId: string, offeredPrice: number) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    // Fetch product details
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (productError || !product) {
      return { success: false, error: 'Ürün bulunamadı.' }
    }

    if (product.status !== 'approved') {
      return { success: false, error: 'Bu ürüne şu an teklif verilemez.' }
    }

    if (product.seller_id === user.id) {
      return { success: false, error: 'Kendi ürününüze teklif veremezsiniz.' }
    }

    // Limit check: Alıcı ürün fiyatının en fazla %30 altına kadar teklif verebilmeli (min %70'i)
    const minAllowedPrice = product.price * 0.70
    if (offeredPrice < minAllowedPrice) {
      return {
        success: false,
        error: `Teklif fiyatı ürün fiyatının en fazla %30 altında olabilir. Minimum teklif tutarı: ${Math.ceil(minAllowedPrice)} ₺`
      }
    }

    // Create the offer in the database
    const { data: newOffer, error: insertError } = await supabase
      .from('offers')
      .insert({
        buyer_id: user.id,
        product_id: productId,
        offered_price: offeredPrice,
        status: 'pending'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Teklif oluşturulamadı:', insertError.message)
      return { success: false, error: 'Teklif gönderilemedi: ' + insertError.message }
    }

    // Try to find or create a conversation with the seller for this product
    const { createConversation, sendMessage } = await import('./actions')
    const convResult = await createConversation(product.seller_id, productId)
    
    if (convResult.success && convResult.conversationId) {
      // Send an automated system message in the chat
      await sendMessage(
        convResult.conversationId,
        `[SİSTEM MESAJI] ${offeredPrice.toLocaleString('tr-TR')} ₺ tutarında yeni bir teklif gönderildi.`
      )
    }

    return { success: true, offer: newOffer }
  } catch (error) {
    console.error('CreateOffer error:', error)
    return { success: false, error: 'Teklif iletilirken bir hata oluştu.' }
  }
}

// Accept an offer (Seller action)
export async function acceptOffer(offerId: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    // Fetch the offer and details
    const { data: offer, error: offerError } = await supabase
      .from('offers')
      .select(`
        *,
        product:products(*)
      `)
      .eq('id', offerId)
      .single()

    if (offerError || !offer) {
      return { success: false, error: 'Teklif bulunamadı.' }
    }

    const product = offer.product
    if (!product) {
      return { success: false, error: 'İlgili ürün bulunamadı.' }
    }

    if (product.seller_id !== user.id) {
      return { success: false, error: 'Bu teklifi kabul etme yetkiniz bulunmuyor.' }
    }

    if (offer.status !== 'pending') {
      return { success: false, error: `Bu teklif zaten '${offer.status}' durumunda.` }
    }

    // Use admin client to perform atomic updates and bypass strict policies
    const adminClient = createAdminClient()

    // Update the accepted offer status
    const { error: updateOfferError } = await adminClient
      .from('offers')
      .update({ status: 'accepted' })
      .eq('id', offerId)

    if (updateOfferError) {
      return { success: false, error: 'Teklif güncellenemedi.' }
    }

    // 24 saatliğine alıcıya rezerve et (locked_until ve locked_by güncellenmeli)
    const lockedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    const { error: updateProductError } = await adminClient
      .from('products')
      .update({
        locked_until: lockedUntil,
        locked_by: offer.buyer_id
      })
      .eq('id', product.id)

    if (updateProductError) {
      console.error('Ürün kilitlenirken hata:', updateProductError.message)
    }

    // Bu ürün için olan diğer tüm 'pending' teklifleri 'expired' veya 'rejected' olarak güncelle
    await adminClient
      .from('offers')
      .update({ status: 'expired' })
      .eq('product_id', product.id)
      .eq('status', 'pending')
      .neq('id', offerId)

    // Sohbet penceresine sistem bildirimi gönder
    const { createConversation, sendMessage } = await import('./actions')
    const convResult = await createConversation(offer.buyer_id, product.id)
    if (convResult.success && convResult.conversationId) {
      await sendMessage(
        convResult.conversationId,
        `[SİSTEM MESAJI] Teklifiniz satıcı tarafından kabul edildi! Ürün 24 saat boyunca sizin için rezerve edilmiştir.`
      )
    }

    return { success: true }
  } catch (error) {
    console.error('AcceptOffer error:', error)
    return { success: false, error: 'İşlem gerçekleştirilirken bir hata oluştu.' }
  }
}

// Reject an offer (Seller action)
export async function rejectOffer(offerId: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    const { data: offer, error: offerError } = await supabase
      .from('offers')
      .select('*, product:products(*)')
      .eq('id', offerId)
      .single()

    if (offerError || !offer) {
      return { success: false, error: 'Teklif bulunamadı.' }
    }

    const product = offer.product
    if (product.seller_id !== user.id) {
      return { success: false, error: 'Bu teklifi reddetme yetkiniz bulunmuyor.' }
    }

    if (offer.status !== 'pending') {
      return { success: false, error: 'Bu teklif aktif değil.' }
    }

    const { error: updateOfferError } = await supabase
      .from('offers')
      .update({ status: 'rejected' })
      .eq('id', offerId)

    if (updateOfferError) {
      return { success: false, error: 'Teklif güncellenemedi.' }
    }

    // Sohbet penceresine sistem bildirimi gönder
    const { createConversation, sendMessage } = await import('./actions')
    const convResult = await createConversation(offer.buyer_id, product.id)
    if (convResult.success && convResult.conversationId) {
      await sendMessage(
        convResult.conversationId,
        `[SİSTEM MESAJI] Teklifiniz satıcı tarafından reddedildi.`
      )
    }

    return { success: true }
  } catch (error) {
    console.error('RejectOffer error:', error)
    return { success: false, error: 'İşlem gerçekleştirilirken bir hata oluştu.' }
  }
}
