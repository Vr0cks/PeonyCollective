import { createClient } from '@/src/utils/supabase/server'
import { logout } from '@/src/app/login/actions'
import NavbarClient from './NavbarClient'
import { Profile } from '@/src/types'

export default async function Navbar() {
  const supabase = await createClient()
  
  // Aktif kullanıcıyı alıyoruz
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile: Profile | null = null;
  
  // Eğer kullanıcı varsa, adını ve rolünü göstermek için profiles tablosuna bakıyoruz
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return <NavbarClient user={user} profile={profile} logoutAction={logout} />
}
