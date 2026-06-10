// src/utils/supabase/client.ts - Tarayıcı tarafı Supabase bağlantısı
import { createBrowserClient } from '@supabase/ssr'

// Bu fonksiyonu tarayıcıda çalışan component'lerde
// Supabase'e güvenli bir şekilde bağlanmak için kullanıyoruz.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
