'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/src/utils/supabase/client'
import { sendEntrupyAppointmentEmailAction } from './actions'

function EntrupyRequestFormContent() {
  const searchParams = useSearchParams()
  const productName = searchParams.get('product_name') || 'Lüks Çanta'

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [submitted, setSubmitted] = useState(false)

  // Guest Form states
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setEmail(user.email || '')
        const { data: prof } = await supabase
          .from('profiles')
          .select('first_name, last_name, phone, address')
          .eq('id', user.id)
          .maybeSingle()
        if (prof) {
          setProfile(prof)
          setFullName(`${prof.first_name || ''} ${prof.last_name || ''}`.trim() || user.email || '')
          if (prof.phone) setPhone(prof.phone)
          if (prof.address) setAddress(prof.address)
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await sendEntrupyAppointmentEmailAction({
        customerName: fullName || email || 'Değerli Müşteri',
        customerEmail: email,
        phone: phone || undefined,
        address: address || undefined,
        productName: productName,
        isLoggedIn: !!user
      })

      if (res.success) {
        setSubmitted(true)
      } else {
        alert('Randevu iletilirken bir sorun oluştu, lütfen info@peony-collective.com ile iletişime geçin.')
      }
    } catch (err: any) {
      alert('Hata: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0E10] flex items-center justify-center text-amber-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#AF9164]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#F9F6F0] flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-xl w-full bg-[#18191E] border border-amber-900/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Gold Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#AF9164]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] tracking-[4px] text-[#AF9164] uppercase font-bold block mb-2">
            ✦ VIP EKSPERTİZ SEÇENEĞİ
          </span>
          <h1 className="font-serif text-2xl md:text-3xl text-white font-normal mb-3">
            %99.6 Entrupy Mikroskobik Doğrulama
          </h1>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-md mx-auto">
            Dünyanın en güvenilir fiziksel mikroskobik yapay zeka doğrulama teknolojisi ile çantanızı inceleyelim.
          </p>
        </div>

        {/* Courier Notice Box */}
        <div className="mb-6 p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200/90 text-xs leading-relaxed flex items-start gap-3">
          <span className="text-lg">📍</span>
          <div>
            <strong className="block text-amber-400 font-semibold mb-1">İstanbul İçi VIP Kurye Hizmeti</strong>
            Özel sigortalı VIP kurye kapınızdan teslim alma hizmetimiz şu an için sadece <strong>İstanbul içi</strong> adreslerde geçerlidir.
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4">
              ✓
            </div>
            <h3 className="text-xl font-serif text-white mb-2">Randevu Talebiniz Alındı</h3>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto mb-6">
              VIP Kurye ekibimiz ve eksperimiz en kısa sürede sizinle iletişime geçerek kapınızdan teslim alma saatini teyit edecektir.
            </p>
            <a 
              href="/" 
              className="inline-block bg-[#AF9164] hover:bg-[#96794F] text-white text-xs font-bold tracking-[2px] uppercase px-8 py-3.5 rounded-xl transition-all"
            >
              ANASAYFAYA DÖN
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Targeted Product Info */}
            <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl flex items-center justify-between text-xs">
              <span className="text-neutral-400">İncelenecek Ürün:</span>
              <span className="font-semibold text-amber-300">{productName}</span>
            </div>

            {user ? (
              /* LOGGED IN USER VIEW */
              <div className="p-4 bg-amber-900/10 border border-amber-800/30 rounded-xl space-y-2">
                <p className="text-xs text-neutral-300">
                  <strong className="text-white">Kayıtlı Müşteri:</strong> {fullName} ({user.email})
                </p>
                {phone && <p className="text-xs text-neutral-400">Telefon: {phone}</p>}
                {address && <p className="text-xs text-neutral-400">Adres: {address}</p>}
                <p className="text-[11px] text-amber-400/80 pt-2">
                  ✓ Sistemde kayıtlı bilgileriniz otomatik olarak <strong>info@peony-collective.com</strong> adresine randevu bildirimi olarak iletilecektir.
                </p>
              </div>
            ) : (
              /* GUEST FORM VIEW */
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-[#AF9164] tracking-widest mb-1 uppercase">
                    ADINIZ VE SOYADINIZ *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Örn. Ahmet Canlı"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#AF9164]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#AF9164] tracking-widest mb-1 uppercase">
                    E-POSTA ADRESİNİZ *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Örn. ahmet@example.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#AF9164]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#AF9164] tracking-widest mb-1 uppercase">
                    TELEFON NUMARANIZ *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Örn. 0532 000 00 00"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#AF9164]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#AF9164] tracking-widest mb-1 uppercase">
                    İSTANBUL İÇİ KURYE ADRESİNİZ *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="İlçe, Mahalle, Cadde ve Bina No bilgisi..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#AF9164]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#AF9164] hover:bg-[#96794F] text-white text-xs font-bold tracking-[2px] uppercase py-4 rounded-xl shadow-lg shadow-amber-900/20 transition-all mt-4 disabled:opacity-50"
            >
              {submitting ? 'İLETİLİYOR...' : 'ENTRUPY VIP RANDEVUSU TALEP ET ✦'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function EntrupyRequestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0E0E10]" />}>
      <EntrupyRequestFormContent />
    </Suspense>
  )
}
