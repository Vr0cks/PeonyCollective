'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const phone_number = formData.get('phone_number') as string
  const iban = formData.get('iban') as string
  const address = formData.get('address') as string

  const { error } = await supabase
    .from('profiles')
    .update({
      phone_number,
      iban,
      address,
    })
    .eq('id', user.id)

  if (error) {
    console.error('Profil güncelleme hatası:', error.message)
    throw new Error('Profil güncellenirken bir hata oluştu.')
  }

  revalidatePath('/settings')
  redirect('/settings?message=Profiliniz başarıyla güncellendi.')
}
