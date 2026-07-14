'use client'

import { useState, useRef } from 'react'
import { updateProfile } from '@/src/app/settings/actions'
import { Camera, User, Phone, CreditCard, Shield, Briefcase, MapPin } from 'lucide-react'

interface SettingsFormProps {
  profile: any
}

export default function SettingsForm({ profile }: SettingsFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Avatar states
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

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

  const initials = `${profile?.first_name?.[0] || ''}${profile?.last_name?.[0] || ''}`.toUpperCase() || 'P'

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-20">
      <input type="hidden" name="avatar_url" value={avatarUrl || ''} />
      
      {/* Premium Profil Kartı */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        {/* Banner Arka Plan */}
        <div className="h-32 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#AF9164_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
        
        {/* Profil Resmi & Kimlik Kartı */}
        <div className="px-8 pb-8 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 text-left">
          <div className="relative group shrink-0">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-zinc-900 overflow-hidden flex items-center justify-center relative transition-all duration-300 group-hover:brightness-90">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="text-3xl font-playfair font-semibold italic text-[#AF9164] tracking-widest">
                  {initials}
                </div>
              )}
              {/* Fotoğraf Değiştirme Butonu (Hover'da çıksın) */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white text-[9px] font-bold uppercase tracking-wider cursor-pointer"
              >
                <Camera size={20} className="text-[#AF9164]" />
                <span>Değiştir</span>
              </div>
            </div>
            {/* Gizli Dosya Seçici */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 serif-display italic">
              {profile?.first_name || 'Peony'} {profile?.last_name || 'Üyesi'}
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#AF9164] mt-1.5 flex items-center justify-center sm:justify-start gap-1.5">
              <Shield size={11} className="fill-[#AF9164]/10" /> Onaylı Üye & Koleksiyoner
            </p>
          </div>
        </div>
      </div>

      {/* Mesaj Bildirimleri */}
      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs uppercase tracking-widest rounded-2xl font-medium">
          ✓ {message}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-800 text-xs uppercase tracking-widest rounded-2xl font-medium">
          ✕ {error}
        </div>
      )}

      {/* KARTLAR: İletişim & Ödeme Bilgileri */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-left space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#AF9164] flex items-center gap-2 border-b border-gray-100 pb-4">
          <User size={14} /> Kişisel Bilgiler & Ödemeler
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest flex items-center gap-1.5">
              <Phone size={10} /> Telefon Numarası
            </label>
            <input 
              name="phone_number" 
              type="tel"
              defaultValue={profile?.phone_number || ''} 
              placeholder="05xx xxx xx xx"
              className="px-4 py-3.5 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#AF9164] transition-all outline-none text-black text-sm" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest flex items-center gap-1.5 text-red-500">
              <CreditCard size={10} /> IBAN (Ödemeleriniz İçin)
            </label>
            <input 
              name="iban" 
              defaultValue={profile?.iban || ''} 
              placeholder="TR000000000000000000000000" 
              className="px-4 py-3.5 border border-red-50 rounded-xl bg-red-50/20 focus:bg-white focus:border-[#AF9164] transition-all outline-none text-black text-sm font-mono" 
            />
          </div>
        </div>
      </div>

      {/* KARTLAR: Pazaryeri & Satıcı Bilgileri */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-left space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#AF9164] flex items-center gap-2 border-b border-gray-100 pb-4">
          <Briefcase size={14} /> Pazaryeri (Satıcı) Bilgileri
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Hesap Tipi</label>
            <select 
              name="submerchant_type" 
              defaultValue={profile?.submerchant_type || 'bireysel'} 
              className="px-4 py-3.5 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#AF9164] transition-all outline-none text-black text-sm"
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
              className="px-4 py-3.5 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#AF9164] transition-all outline-none text-black text-sm" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Vergi No (Kurumsal)</label>
            <input 
              name="vkn" 
              defaultValue={profile?.vkn || ''} 
              placeholder="10 Haneli" 
              maxLength={10} 
              className="px-4 py-3.5 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#AF9164] transition-all outline-none text-black text-sm" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Firma Ünvanı (Kurumsal)</label>
            <input 
              name="company_title" 
              defaultValue={profile?.company_title || ''} 
              placeholder="Tam Şirket Ünvanı" 
              className="px-4 py-3.5 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#AF9164] transition-all outline-none text-black text-sm" 
            />
          </div>
        </div>
      </div>

      {/* KARTLAR: Teslimat Adresi */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-left space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#AF9164] flex items-center gap-2 border-b border-gray-100 pb-4">
          <MapPin size={14} /> Teslimat Adresim
        </h3>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Varsayılan Adres</label>
          <textarea 
            name="address" 
            defaultValue={profile?.address || ''} 
            rows={4} 
            placeholder="Kargo teslimatlarının yapılacağı açık adresiniz..."
            className="px-4 py-3.5 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#AF9164] transition-all outline-none text-black text-sm resize-none" 
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className={`w-full text-white py-4.5 rounded-xl font-bold uppercase tracking-[0.25em] text-[10px] transition-all cursor-pointer ${isPending ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-black hover:bg-zinc-800 shadow-lg shadow-black/10 hover:shadow-none'}`}
      >
        {isPending ? 'Güncelleniyor...' : 'Bilgileri Güncelle'}
      </button>
    </form>
  )
}
