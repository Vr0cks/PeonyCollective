import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import SettingsClientPage from './SettingsClientPage'
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

  return <SettingsClientPage profile={profile} />
}
