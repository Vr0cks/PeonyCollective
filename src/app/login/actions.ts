'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error('E-posta veya şifre hatalı. Lütfen tekrar deneyin.')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
}

export async function resetPassword(formData: FormData) {
  try {
    const supabase = await createClient()
    const email = formData.get('email') as string

    if (!email) {
      return { error: 'Lütfen geçerli bir e-posta adresi girin.' }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/update-password`,
    })

    if (error) {
      return { error: error.message }
    }

    return { 
      success: true, 
      message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin." 
    }
  } catch (error) {
    return { error: 'İşlem sırasında bir hata oluştu.' }
  }
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
          full_name: `${firstName} ${lastName}`,
          role: role,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { 
      success: true, 
      message: "Harika! Peony Collective'e hoş geldiniz. Lütfen gelen kutunuzu (ve spam klasörünü) kontrol ederek e-postanızı doğrulayın." 
    }
  } catch (error) {
    console.error('Signup error:', error)
    return { error: 'Kayıt işlemi sırasında teknik bir hata oluştu. Lütfen tekrar deneyin.' }
  }
}

// ─── Sosyal Giriş (Google / Facebook) ───
export async function signInWithProvider(provider: 'google' | 'facebook') {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    throw new Error('Sosyal giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.')
  }

  if (data.url) {
    redirect(data.url)
  }
}