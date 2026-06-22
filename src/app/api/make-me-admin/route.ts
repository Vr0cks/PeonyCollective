import { createClient } from '@/src/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  
  // 1. Giriş yapmış kullanıcıyı bul
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ 
      error: 'Önce siteye normal bir şekilde giriş yapmalısın. Lütfen /login sayfasına gidip giriş yap, sonra bu linke tekrar tıkla.' 
    })
  }

  // 2. Kullanıcının rolünü 'admin' olarak güncelle
  const { error } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.id)

  if (error) {
    return NextResponse.json({ error: 'Rol güncellenirken hata oluştu: ' + error.message })
  }

  // 3. Başarılı olursa admin paneline yönlendir
  const url = new URL('/admin', request.url)
  return NextResponse.redirect(url)
}
