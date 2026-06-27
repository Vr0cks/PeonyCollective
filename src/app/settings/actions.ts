'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const phone_number = (formData.get('phone_number') as string || '').trim()
  const iban = (formData.get('iban') as string || '').trim().replace(/\s/g, '')
  const address = (formData.get('address') as string || '').trim()
  const submerchant_type = formData.get('submerchant_type') as string
  const tckn = (formData.get('tckn') as string || '').trim()
  const vkn = (formData.get('vkn') as string || '').trim()
  const company_title = (formData.get('company_title') as string || '').trim()

  // 1. Phone number validation (Turkish phone number format: starts with 05 or 5, total 10-11 digits)
  const phoneDigits = phone_number.replace(/\D/g, '')
  const isValidPhone = (phoneDigits.startsWith('05') && phoneDigits.length === 11) || (phoneDigits.startsWith('5') && phoneDigits.length === 10)
  if (phone_number && !isValidPhone) {
    redirect('/settings?error=Lütfen geçerli bir cep telefonu numarası giriniz (Örn: 05321234567).')
  }

  // 2. IBAN validation (Starts with TR, followed by 24 digits, total 26 characters)
  if (iban) {
    if (!iban.startsWith('TR')) {
      redirect('/settings?error=IBAN numarası TR ile başlamalıdır.')
    }
    if (iban.length !== 26) {
      redirect('/settings?error=IBAN numarası eksik veya fazla karakter içeriyor (TR dahil 26 hane olmalıdır).')
    }
  }

  // 3. Address validation (Minimum 10 characters)
  if (address && address.length < 10) {
    redirect('/settings?error=Lütfen kargo gönderiminin doğru yapılabilmesi için en az 10 karakterden oluşan geçerli bir adres giriniz.')
  }

  // 4. Pazaryeri validation
  if (submerchant_type === 'bireysel' && tckn && tckn.length !== 11) {
    redirect('/settings?error=TC Kimlik Numarası 11 hane olmalıdır.')
  }
  if (submerchant_type === 'kurumsal' && vkn && vkn.length !== 10) {
    redirect('/settings?error=Vergi Numarası 10 hane olmalıdır.')
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      phone_number: phoneDigits ? (phoneDigits.startsWith('5') ? '0' + phoneDigits : phoneDigits) : null,
      iban: iban || null,
      address: address || null,
      submerchant_type: submerchant_type || 'bireysel',
      tckn: submerchant_type === 'bireysel' ? tckn || null : null,
      vkn: submerchant_type === 'kurumsal' ? vkn || null : null,
      company_title: submerchant_type === 'kurumsal' ? company_title || null : null,
    })
    .eq('id', user.id)

  if (error) {
    console.error('Profil güncelleme hatası:', error.message)
    redirect('/settings?error=Profil güncellenirken veritabanı hatası oluştu.')
  }

  revalidatePath('/settings')
  redirect('/settings?message=Profiliniz başarıyla güncellendi.')
}
