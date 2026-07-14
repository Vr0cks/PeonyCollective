'use server'

import { createClient, createAdminClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// VIP Tekliflerini çeken server action (RLS Bypass)
export async function getConciergeRequestsAction() {
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

    // 2. RLS Bypass ile veriyi çek
    const adminDb = createAdminClient()
    const { data, error } = await adminDb
      .from('concierge_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, requests: data || [] }
  } catch (error: any) {
    console.error('getConciergeRequestsAction error:', error)
    return { success: false, error: error.message || 'VIP teklifleri yüklenirken hata oluştu.' }
  }
}

// VIP Teklif durumunu güncelleyen server action
export async function updateConciergeStatusAction(
  requestId: string,
  newStatus: 'pending' | 'contacted' | 'closed'
) {
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

    if (profile?.role !== 'admin') {
      return { success: false, error: 'Bu işlemi yapmaya yetkiniz yok.' }
    }

    // 2. Güncelle (RLS Bypass Admin Client ile)
    const adminDb = createAdminClient()
    const { error } = await adminDb
      .from('concierge_requests')
      .update({ status: newStatus })
      .eq('id', requestId)

    if (error) throw error

    revalidatePath('/admin/concierge')
    return { success: true }
  } catch (error: any) {
    console.error('updateConciergeStatusAction error:', error)
    return { success: false, error: error.message || 'Teklif durumu güncellenirken hata oluştu.' }
  }
}

// VIP Teklifi silen server action
export async function deleteConciergeRequestAction(requestId: string) {
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

    if (profile?.role !== 'admin') {
      return { success: false, error: 'Bu işlemi yapmaya yetkiniz yok.' }
    }

    // Sil (RLS Bypass Admin Client ile)
    const adminDb = createAdminClient()
    const { error } = await adminDb
      .from('concierge_requests')
      .delete()
      .eq('id', requestId)

    if (error) throw error

    revalidatePath('/admin/concierge')
    return { success: true }
  } catch (error: any) {
    console.error('deleteConciergeRequestAction error:', error)
    return { success: false, error: error.message || 'Teklif silinirken hata oluştu.' }
  }
}
