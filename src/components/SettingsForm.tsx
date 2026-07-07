'use client'

import { useState } from 'react'
import { updateProfile } from '@/src/app/settings/actions'

interface SettingsFormProps {
  profile: any
}

export default function SettingsForm({ profile }: SettingsFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setMessage(null)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await updateProfile(null, formData)
      if (res.success) {
        setMessage(res.message || 'Profiliniz başarıyla güncellendi.')
      } else {
        setError(res.error || 'Profil güncellenirken bir hata oluştu.')
      }
    } catch (err: any) {
      setError(err.message || 'Bir bağlantı hatası oluştu.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs uppercase tracking-widest rounded-xl font-medium">
          ✓ {message}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-800 text-xs uppercase tracking-widest rounded-xl font-medium">
          ✕ {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Telefon</label>
          <input 
            name="phone_number" 
            defaultValue={profile?.phone_number || ''} 
            className="px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white transition-all outline-none text-black" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest text-red-500">IBAN (Ödemeler İçin)</label>
          <input 
            name="iban" 
            defaultValue={profile?.iban || ''} 
            placeholder="TR00..." 
            className="px-4 py-3 border border-red-50 rounded-xl bg-red-50/30 focus:bg-white transition-all outline-none text-black" 
          />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-6">Pazaryeri (Satıcı) Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Hesap Tipi</label>
            <select 
              name="submerchant_type" 
              defaultValue={profile?.submerchant_type || 'bireysel'} 
              className="px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white transition-all outline-none text-black"
            >
              <option value="bireysel">Bireysel (Şahıs)</option>
              <option value="kurumsal">Kurumsal (Şirket)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">TC Kimlik No (Bireysel)</label>
            <input 
              name="tckn" 
              defaultValue={profile?.tckn || ''} 
              placeholder="11 Haneli" 
              maxLength={11} 
              className="px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white transition-all outline-none text-black" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Vergi No (Kurumsal)</label>
            <input 
              name="vkn" 
              defaultValue={profile?.vkn || ''} 
              placeholder="10 Haneli" 
              maxLength={10} 
              className="px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white transition-all outline-none text-black" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Firma Ünvanı (Kurumsal)</label>
            <input 
              name="company_title" 
              defaultValue={profile?.company_title || ''} 
              placeholder="Tam Şirket Ünvanı" 
              className="px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white transition-all outline-none text-black" 
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Teslimat Adresi</label>
        <textarea 
          name="address" 
          defaultValue={profile?.address || ''} 
          rows={4} 
          className="px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white transition-all outline-none text-black" 
        />
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className={`w-full text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
      >
        {isPending ? 'Güncelleniyor...' : 'Bilgileri Güncelle'}
      </button>
    </form>
  )
}
