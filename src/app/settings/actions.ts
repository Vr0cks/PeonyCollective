'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { encrypt, decrypt } from '@/src/utils/crypto'


export async function updateProfile(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    const phone_number = (formData.get('phone_number') as string || '').trim()
    const iban = (formData.get('iban') as string || '').trim().replace(/\s/g, '')
    const address = (formData.get('address') as string || '').trim()
    const submerchant_type = formData.get('submerchant_type') as string
    const tckn = (formData.get('tckn') as string || '').trim()
    const vkn = (formData.get('vkn') as string || '').trim()
    const company_title = (formData.get('company_title') as string || '').trim()

    // 1. Phone number validation
    const phoneDigits = phone_number.replace(/\D/g, '')
    const isValidPhone = (phoneDigits.startsWith('05') && phoneDigits.length === 11) || (phoneDigits.startsWith('5') && phoneDigits.length === 10)
    if (phone_number && !isValidPhone) {
      return { success: false, error: 'Lütfen geçerli bir cep telefonu numarası giriniz (Örn: 05321234567).' }
    }

    // 2. IBAN validation
    if (iban) {
      if (!iban.toUpperCase().startsWith('TR')) {
        return { success: false, error: 'IBAN numarası TR ile başlamalıdır.' }
      }
      if (iban.length !== 26) {
        return { success: false, error: 'IBAN numarası eksik veya fazla karakter içeriyor (TR dahil 26 hane olmalıdır).' }
      }
    }

    // 3. Address validation
    if (address && address.length < 10) {
      return { success: false, error: 'Lütfen geçerli bir adres giriniz (en az 10 karakter).' }
    }

    // 4. Pazaryeri validation
    if (submerchant_type === 'bireysel' && tckn && tckn.length !== 11) {
      return { success: false, error: 'TC Kimlik Numarası 11 hane olmalıdır.' }
    }
    if (submerchant_type === 'kurumsal' && vkn && vkn.length !== 10) {
      return { success: false, error: 'Vergi Numarası 10 hane olmalıdır.' }
    }

    const avatar_url = formData.get('avatar_url') as string || null

    const { error } = await supabase
      .from('profiles')
      .update({
        phone_number: encrypt(phoneDigits ? (phoneDigits.startsWith('5') ? '0' + phoneDigits : phoneDigits) : null),
        iban: encrypt(iban ? iban.toUpperCase() : null),
        address: address || null,
        submerchant_type: submerchant_type || 'bireysel',
        tckn: submerchant_type === 'bireysel' ? encrypt(tckn || null) : null,
        vkn: submerchant_type === 'kurumsal' ? encrypt(vkn || null) : null,
        company_title: submerchant_type === 'kurumsal' ? company_title || null : null,
        avatar_url: avatar_url,
      })
      .eq('id', user.id)

    if (error) {
      console.error('Profil güncelleme hatası:', error.message)
      return { success: false, error: 'Profil güncellenirken veritabanı hatası oluştu: ' + error.message }
    }

    revalidatePath('/settings')
    return { success: true, message: 'Profiliniz başarıyla güncellendi.' }
  } catch (err: any) {
    console.error('updateProfile catch error:', err)
    return { success: false, error: 'Beklenmeyen bir hata oluştu: ' + err.message }
  }
}

export async function getDecryptedProfile() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum kapalı' }
    
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (profile) {
      profile.phone_number = decrypt(profile.phone_number)
      profile.iban = decrypt(profile.iban)
      profile.tckn = decrypt(profile.tckn)
      profile.vkn = decrypt(profile.vkn)
    }
    return { success: true, profile }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
