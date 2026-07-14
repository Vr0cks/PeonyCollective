import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import SettingsForm from '@/src/components/SettingsForm'
import { decrypt } from '@/src/utils/crypto'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  if (profile) {
    profile.phone_number = decrypt(profile.phone_number)
    profile.iban = decrypt(profile.iban)
    profile.tckn = decrypt(profile.tckn)
    profile.vkn = decrypt(profile.vkn)
  }

  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-light uppercase tracking-widest mb-12 border-b pb-6">Hesap Ayarları</h1>
        
        <SettingsForm profile={profile} />
      </div>
    </main>
  )
}
