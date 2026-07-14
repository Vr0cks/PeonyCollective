'use server'

import { createClient } from '@/src/utils/supabase/server'
import { maskContactInfo } from '@/src/utils/security'

// Send a message in a conversation
export async function sendMessage(conversationId: string, content: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    if (!content || content.trim() === '') {
      return { success: false, error: 'Mesaj içeriği boş olamaz.' }
    }

    // --- SİBER GÜVENLİK FİLTRESİ (TELEFON, E-POSTA, HARİCİ LİNK, IBAN) ---
    // 1. Telefon Numarası Regex Filtresi (örneğin 05xx xxx xx xx, 905xx..., 5xx-xxx-xx-xx veya boşluklu/obfuse halleri)
    const phoneRegex = /(?:\+?90|0)?\s*[1-9]\s*(?:\d\s*){9}/
    
    // 2. E-posta Regex Filtresi
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/

    // 3. IBAN Filtresi (TR ile başlayan ve 26 haneli olan yapılar)
    const ibanRegex = /TR\s*(?:\d\s*){24}/i

    // 4. Harici Link Regex Filtresi (http, https, www veya .com/.net/.org/.gov/.edu/.ist/.com.tr gibi uzantılar)
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:com|net|org|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum|cc|tv|co|me|io|info|xyz|club|com\.tr|net\.tr|org\.tr)\b)/i

    const trimmedContent = content.trim()

    let finalContent = trimmedContent
    const hasPhone = phoneRegex.test(trimmedContent.replace(/\s+/g, ''))
    const hasEmail = emailRegex.test(trimmedContent)
    const hasIban = ibanRegex.test(trimmedContent.replace(/\s+/g, ''))
    const hasUrl = urlRegex.test(trimmedContent)

    if (hasPhone || hasEmail || hasIban || hasUrl) {
      finalContent = maskContactInfo(trimmedContent)
      // Also mask IBAN and URLs if any
      finalContent = finalContent.replace(ibanRegex, '[İLETİŞİM BİLGİSİ GİZLENDİ]')
      finalContent = finalContent.replace(urlRegex, '[İLETİŞİM BİLGİSİ GİZLENDİ]')
    }

    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: finalContent,
        is_read: false,
      })
      .select()
      .single()

    if (error) {
      console.error('Mesaj gönderilemedi:', error.message)
      return { success: false, error: 'Mesaj gönderilemedi: ' + error.message }
    }

    // Update conversation last_message details
    await supabase
      .from('conversations')
      .update({
        last_message: finalContent,
        last_message_at: new Date().toISOString(),
      })
      .eq('id', conversationId)

    return { success: true, message }
  } catch (error) {
    console.error('SendMessage error:', error)
    return { success: false, error: 'Teknik bir hata oluştu.' }
  }
}

// Get all conversations for the authenticated user
export async function getConversations() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    // Fetch conversations where user is participant_1 or participant_2
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select(`
        *,
        product:products(*),
        participant_1_profile:profiles!conversations_participant_1_fkey(*),
        participant_2_profile:conversations_participant_2_fkey(*)
      `)
      .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
      .order('last_message_at', { ascending: false })

    // Fallback if foreign key alias fails (postgrest syntax fallback without aliases)
    if (error) {
      console.warn('Foreign key alias failed, trying simple join:', error.message)
      const { data: simpleConversations, error: simpleError } = await supabase
        .from('conversations')
        .select(`
          *,
          product:products(*)
        `)
        .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
        .order('last_message_at', { ascending: false })

      if (simpleError) {
        return { success: false, error: simpleError.message }
      }

      // Fetch profiles manually to populate
      const populated = await Promise.all(
        (simpleConversations || []).map(async (conv) => {
          const otherId = conv.participant_1 === user.id ? conv.participant_2 : conv.participant_1
          const { data: otherProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', otherId)
            .single()
          
          return {
            ...conv,
            other_profile: otherProfile,
          }
        })
      )

      return { success: true, conversations: populated }
    }

    // Populate "other_profile" helper
    const formatted = (conversations || []).map((conv) => {
      const otherProfile =
        conv.participant_1 === user.id
          ? conv.participant_2_profile
          : conv.participant_1_profile
      return {
        ...conv,
        other_profile: otherProfile,
      }
    })

    return { success: true, conversations: formatted }
  } catch (error) {
    console.error('GetConversations error:', error)
    return { success: false, error: 'Konuşmalar yüklenirken hata oluştu.' }
  }
}

// Get all messages for a specific conversation
export async function getMessages(conversationId: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    const { data: messages, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!messages_sender_id_fkey(*)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error) {
      // Fallback if join fails
      const { data: simpleMessages, error: simpleError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (simpleError) {
        return { success: false, error: simpleError.message }
      }
      return { success: true, messages: simpleMessages }
    }

    return { success: true, messages }
  } catch (error) {
    console.error('GetMessages error:', error)
    return { success: false, error: 'Mesajlar yüklenirken hata oluştu.' }
  }
}

// Create a new conversation or return existing
export async function createConversation(participant2Id: string, productId?: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    if (user.id === participant2Id) {
      return { success: false, error: 'Kendinizle sohbet başlatamazsınız.' }
    }

    // Check if conversation already exists (either participant_1/2 combination)
    let query = supabase
      .from('conversations')
      .select('*')
      .or(`and(participant_1.eq.${user.id},participant_2.eq.${participant2Id}),and(participant_1.eq.${participant2Id},participant_2.eq.${user.id})`)

    if (productId) {
      query = query.eq('product_id', productId)
    }

    const { data: existing } = await query

    if (existing && existing.length > 0) {
      return { success: true, conversationId: existing[0].id }
    }

    // Create new conversation
    const { data: newConv, error: insertError } = await supabase
      .from('conversations')
      .insert({
        participant_1: user.id,
        participant_2: participant2Id,
        product_id: productId || null,
        last_message: 'Sohbet başlatıldı',
        last_message_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      console.error('Konuşma oluşturulamadı:', insertError.message)
      return { success: false, error: 'Konuşma başlatılamadı: ' + insertError.message }
    }

    return { success: true, conversationId: newConv.id }
  } catch (error) {
    console.error('CreateConversation error:', error)
    return { success: false, error: 'Konuşma oluşturulurken hata oluştu.' }
  }
}

// Mark messages in a conversation as read
export async function markAsRead(conversationId: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .not('sender_id', 'eq', user.id)
      .eq('is_read', false)

    if (error) {
      console.error('Mesajlar okundu işaretlenemedi:', error.message)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('MarkAsRead error:', error)
    return { success: false, error: 'Hata oluştu.' }
  }
}

// VIP destek sohbeti için ilk bulduğu admin ID'sini dönen yardımcı action
export async function getAdminIdAction() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
      .limit(1)
      .single()

    if (error || !data) {
      return { success: true, adminId: '516bccae-8ab6-4e9c-96e7-f315de72c28a' }
    }
    return { success: true, adminId: data.id }
  } catch {
    return { success: true, adminId: '516bccae-8ab6-4e9c-96e7-f315de72c28a' }
  }
}
