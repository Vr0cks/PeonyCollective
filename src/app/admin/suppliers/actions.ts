'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Tedarikçi bilgilerini güncelleyen server action
export async function updateSupplierDetailsAction(
  supplierId: string,
  updatedData: {
    name: string
    email?: string | null
    phone?: string | null
    address?: string | null
    iban: string
    tckn?: string | null
    vkn?: string | null
    company_title?: string | null
    submerchant_type: 'bireysel' | 'kurumsal'
  }
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

    // 2. IBAN Format Kontrolü
    const cleanedIban = updatedData.iban.toUpperCase().replace(/\s+/g, '')
    if (!cleanedIban.startsWith('TR') || cleanedIban.length !== 26) {
      return { success: false, error: 'IBAN numarası geçersiz (TR ile başlamalı ve 26 hane olmalıdır).' }
    }

    // 3. Mevcut tedarikçiyi çekip kritik bilgilerinin değişip değişmediğini kontrol et
    const { data: currentSupplier } = await supabase
      .from('suppliers')
      .select('iban, tckn, vkn, submerchant_id')
      .eq('id', supplierId)
      .single()

    // Eğer IBAN veya TCKN/VKN değiştiyse, PayTR alt üye kaydının yenilenmesi için submerchant_id'yi sıfırla.
    // İlk ödeme geldiğinde sistem PayTR tarafında yeni bilgilerle otomatik olarak alt üye işyeri açacaktır.
    const isCredentialsChanged = 
      currentSupplier && (
        currentSupplier.iban !== cleanedIban ||
        currentSupplier.tckn !== (updatedData.tckn || null) ||
        currentSupplier.vkn !== (updatedData.vkn || null)
      )

    const updatePayload: any = {
      name: updatedData.name,
      email: updatedData.email || null,
      phone: updatedData.phone || null,
      address: updatedData.address || null,
      iban: cleanedIban,
      tckn: updatedData.tckn || null,
      vkn: updatedData.vkn || null,
      company_title: updatedData.company_title || null,
      submerchant_type: updatedData.submerchant_type
    }

    if (isCredentialsChanged) {
      updatePayload.submerchant_id = null
    }

    const { error } = await supabase
      .from('suppliers')
      .update(updatePayload)
      .eq('id', supplierId)

    if (error) throw error

    revalidatePath('/admin/suppliers')
    return { success: true }
  } catch (error: any) {
    console.error('updateSupplierDetailsAction error:', error)
    return { success: false, error: error.message || 'Tedarikçi güncellenirken bir hata oluştu.' }
  }
}

// Tedarikçiyi silen server action
export async function deleteSupplierAction(supplierId: string) {
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

    // Tedarikçiyi sil
    const { error } = await supabase
      .from('suppliers')
      .delete()
      .eq('id', supplierId)

    if (error) throw error

    revalidatePath('/admin/suppliers')
    return { success: true }
  } catch (error: any) {
    console.error('deleteSupplierAction error:', error)
    return { success: false, error: error.message || 'Tedarikçi silinirken bir hata oluştu.' }
  }
}
