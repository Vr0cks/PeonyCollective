'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

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

    // 2. Güncelle
    const { error } = await supabase
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

    // Sil
    const { error } = await supabase
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
