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
  try {
    const supabase = await createClient()
    
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('first_name') as string
    const lastName = formData.get('last_name') as string
    const role = formData.get('role') as string

    if (!email || !password) {
      return { error: 'E-posta ve şifre gereklidir.' }
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: role,
        },
        emailRedirectTo: `https://peony-collective.vercel.app/auth/callback`,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { 
      success: true, 
      message: "Harika! Peony Collective'e hoş geldiniz. Lütfen gelen kutunuzu (ve spam klasörünü) kontrol ederek e-postanızı doğrulayın." 
    }
  } catch (error: any) {
    console.error('Signup error:', error)
    return { error: 'Kayıt işlemi sırasında teknik bir hata oluştu. Lütfen tekrar deneyin.' }
  }
}