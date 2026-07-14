'use server'

import { createClient, createAdminClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Tüm destek taleplerini çeken server action (Bypass RLS)
export async function getItSupportTicketsAction() {
  try {
    const supabase = await createClient()

    // 1. Yetki Kontrolü
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return { success: false, error: 'Bu işlemi yapmaya yetkiniz yok.' }
    }

    // 2. RLS Bypass ile veriyi çek (Böylece kimin ne gönderdiğini görebiliriz)
    const adminDb = createAdminClient()
    const { data, error } = await adminDb
      .from('it_support_tickets')
      .select(`
        *,
        profiles:user_id (
          first_name,
          last_name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, tickets: data || [] }
  } catch (error: any) {
    console.error('getItSupportTicketsAction error:', error)
    return { success: false, error: error.message || 'Destek talepleri yüklenirken hata oluştu.' }
  }
}

// Bilet durumunu ve cevabını güncelleyen server action (Panelden de cevap yazılabilmesi için)
export async function respondToSupportTicketAction(ticketId: string, replyText: string) {
  try {
    const supabase = await createClient()

    // Yetki Kontrolü
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return { success: false, error: 'Bu işlemi yapmaya yetkiniz yok.' }
    }

    const adminDb = createAdminClient()
    const { error } = await adminDb
      .from('it_support_tickets')
      .update({
        reply: replyText,
        status: 'replied',
        replied_at: new Date().toISOString()
      })
      .eq('id', ticketId)

    if (error) throw error

    revalidatePath('/admin/support')
    return { success: true }
  } catch (error: any) {
    console.error('respondToSupportTicketAction error:', error)
    return { success: false, error: error.message || 'Cevap gönderilirken hata oluştu.' }
  }
}

// Bilet silen server action
export async function deleteSupportTicketAction(ticketId: string) {
  try {
    const supabase = await createClient()

    // Yetki Kontrolü
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return { success: false, error: 'Bu işlemi yapmaya yetkiniz yok.' }
    }

    const adminDb = createAdminClient()
    const { error } = await adminDb
      .from('it_support_tickets')
      .delete()
      .eq('id', ticketId)

    if (error) throw error

    revalidatePath('/admin/support')
    return { success: true }
  } catch (error: any) {
    console.error('deleteSupportTicketAction error:', error)
    return { success: false, error: error.message || 'Talebi silerken hata oluştu.' }
  }
}
