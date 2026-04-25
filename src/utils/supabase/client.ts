// src/utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

// Bu fonksiyon, tarayıcı (client) tarafında çalışan bileşenlerde
// Supabase'e güvenle bağlanmamızı sağlayacak.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}