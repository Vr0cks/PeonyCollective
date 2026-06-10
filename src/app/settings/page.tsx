import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import { updateProfile } from './actions'

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; error?: string }>
}) {
  const { message, error } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-light uppercase tracking-widest mb-12 border-b pb-6">Hesap Ayarları</h1>
        
        {message && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs uppercase tracking-widest rounded-xl font-medium">
            ✓ {message}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-800 text-xs uppercase tracking-widest rounded-xl font-medium">
            ✕ {error}
          </div>
        )}
        
        <form action={updateProfile} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Telefon</label>
              <input name="phone_number" defaultValue={profile?.phone_number || ''} className="px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white transition-all outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest text-red-500">IBAN (Ödemeler İçin)</label>
              <input name="iban" defaultValue={profile?.iban || ''} placeholder="TR00..." className="px-4 py-3 border border-red-50 rounded-xl bg-red-50/30 focus:bg-white transition-all outline-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Teslimat Adresi</label>
            <textarea name="address" defaultValue={profile?.address || ''} rows={4} className="px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white transition-all outline-none" />
          </div>

          <button className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all">
            Bilgileri Güncelle
          </button>
        </form>
      </div>
    </main>
  )
}
