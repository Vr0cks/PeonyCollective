'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error('E-posta veya şifre hatalı. Lütfen tekrar deneyin.')
  }

  revalidatePath('/', 'layout')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const role = formData.get('role') as string // Formdan gelen rol (buyer veya seller)

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        role: role, // Veritabanındaki 'profiles' tablosuna aktarılacak
      },
      // Maildeki linke tıklayınca nereye dönecek? (Geliştirme aşamasındaysan localhost)
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  // Supabase'de Confirm Email açıksa, kullanıcıya mesaj dönüyoruz:
  return { message: "Harika! Peony Collective'e hoş geldiniz. Lütfen gelen kutunuzu (ve spam klasörünü) kontrol ederek e-postanızı doğrulayın." }
}