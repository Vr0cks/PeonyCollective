import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  // Next.js 15 ile beraber cookies() artık asenkron çalışıyor, o yüzden await kullanmamız şart yoksa hata alırız.
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Bu catch bloğunu bilerek boş bıraktım. Server Component'ler render edilirken
            // cookie set etmeye çalışırsa uygulamanın çökmesini istemiyoruz.
          }
        },
      },
    }
  )
}

// Bypasses RLS for secure admin-only operations
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
