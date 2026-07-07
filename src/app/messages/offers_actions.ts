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

    // Sohbet penceresine sistem bildirimini doğrudan DB sorgusu ile gönder (Circular Import'u önlemek için)
    try {
      // Önce mevcut konuşmayı ara
      const { data: existingConv } = await adminClient
        .from('conversations')
        .select('id')
        .or(`and(participant_1.eq.${offer.buyer_id},participant_2.eq.${user.id}),and(participant_1.eq.${user.id},participant_2.eq.${offer.buyer_id})`)
        .eq('product_id', product.id)
        .limit(1)

      let conversationId = existingConv?.[0]?.id

      if (!conversationId) {
        // Konuşma yoksa oluştur
        const { data: newConv } = await adminClient
          .from('conversations')
          .insert({
            participant_1: user.id,
            participant_2: offer.buyer_id,
            product_id: product.id,
            last_message: 'Sohbet başlatıldı',
            last_message_at: new Date().toISOString()
          })
          .select('id')
          .single()
        conversationId = newConv?.id
      }

      if (conversationId) {
        const sysMsg = `[SİSTEM MESAJI] Teklifiniz satıcı tarafından kabul edildi! Ürün 24 saat boyunca sizin için rezerve edilmiştir.`
        
        // Mesajı ekle
        await adminClient.from('messages').insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: sysMsg,
          is_read: false
        })

        // Konuşmayı güncelle
        await adminClient.from('conversations').update({
          last_message: sysMsg,
          last_message_at: new Date().toISOString()
        }).eq('id', conversationId)
      }
    } catch (msgErr) {
      console.error('Kabul bildirim mesajı gönderilemedi:', msgErr)
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

    // Sohbet penceresine sistem bildirimini doğrudan DB sorgusu ile gönder (Circular Import'u önlemek için)
    try {
      const { data: existingConv } = await supabase
        .from('conversations')
        .select('id')
        .or(`and(participant_1.eq.${offer.buyer_id},participant_2.eq.${user.id}),and(participant_1.eq.${user.id},participant_2.eq.${offer.buyer_id})`)
        .eq('product_id', product.id)
        .limit(1)

      let conversationId = existingConv?.[0]?.id

      if (!conversationId) {
        const { data: newConv } = await supabase
          .from('conversations')
          .insert({
            participant_1: user.id,
            participant_2: offer.buyer_id,
            product_id: product.id,
            last_message: 'Sohbet başlatıldı',
            last_message_at: new Date().toISOString()
          })
          .select('id')
          .single()
        conversationId = newConv?.id
      }

      if (conversationId) {
        const sysMsg = `[SİSTEM MESAJI] Teklifiniz satıcı tarafından reddedildi.`
        
        await supabase.from('messages').insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: sysMsg,
          is_read: false
        })

        await supabase.from('conversations').update({
          last_message: sysMsg,
          last_message_at: new Date().toISOString()
        }).eq('id', conversationId)
      }
    } catch (msgErr) {
      console.error('Ret bildirim mesajı gönderilemedi:', msgErr)
    }

    return { success: true }
  } catch (error) {
    console.error('RejectOffer error:', error)
    return { success: false, error: 'İşlem gerçekleştirilirken bir hata oluştu.' }
  }
}
