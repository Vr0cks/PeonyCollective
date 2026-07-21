'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/src/utils/supabase/client'

function EntrupyRequestForm() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product_id') || ''
  const productName = searchParams.get('product_name') || ''

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    sellerName: '',
    sellerEmail: '',
    sellerPhone: '',
    sellerAddress: '',
    productName: productName || 'Lüks Çanta / Saat Ürünü',
    productId: productId
  })

  useEffect(() => {
    async function loadUserData() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, phone_number, address')
            .eq('id', user.id)
            .single()

          setFormData(prev => ({
            ...prev,
            sellerEmail: user.email || prev.sellerEmail,
            sellerName: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : prev.sellerName,
            sellerPhone: profile?.phone_number || prev.sellerPhone,
            sellerAddress: profile?.address || prev.sellerAddress,
          }))
        }
      } catch (err) {
        console.error('Error loading user data:', err)
      }
    }

    loadUserData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    try {
      const res = await fetch('/api/entrupy-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'İşlem gerçekleştirilemedi.')
      }

      setSuccess(true)
    } catch (err: any) {
      console.error('Entrupy request error:', err)
      setErrorMsg(err.message || 'Talebiniz gönderilirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <h1 className="font-serif italic text-3xl sm:text-4xl tracking-widest text-white mb-1">
            Peony Collective
          </h1>
        </Link>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#AF9164]">
          ✦ ENTRUPY MİKROSKOBİK FİZİKİ İNCELEME TALEP FORMU
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-xl bg-[#141519] border border-[#AF9164]/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative ambient accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#AF9164]/10 rounded-full blur-3xl pointer-events-none" />

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-serif text-white mb-3">Talebiniz Alındı ✦</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Entrupy %99.6 mikroskobik fiziki doğrulama talebiniz başarıyla kaydedildi. Ekibimiz iletişim bilgileriniz üzerinden sizinle en kısa sürede iletişime geçerek kurye organizasyonunu sağlayacaktır.
            </p>
            <div className="p-4 bg-[#AF9164]/10 border border-[#AF9164]/20 rounded-xl text-xs text-[#AF9164] mb-8">
              📍 <em>Kapıdan alma hizmetimiz olan VIP kuryemiz <strong>Peony Courier</strong> şu an için sadece <strong>İstanbul içi</strong> geçerlidir.</em>
            </div>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-[#AF9164] hover:bg-[#96794F] text-white text-xs font-bold uppercase tracking-[2px] rounded-lg transition-all"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#AF9164] block mb-1">
                İnceleme Yapılacak Ürün
              </span>
              <h3 className="text-lg font-medium text-white">
                {formData.productName}
              </h3>
            </div>

            <div className="p-4 bg-[#1C1D24] border border-white/5 rounded-xl text-xs text-white/70 leading-relaxed">
              <p className="mb-2 text-[#AF9164] font-semibold">
                %99.6 Doğruluk Oranı ve Finansal Garanti ✦
              </p>
              Çantanızı dünyanın 1 numaralı mikroskobik yapay zeka teknolojisi <strong>Entrupy</strong> ile fiziki incelemeye tabi tutmak için lütfen aşağıdaki bilgileri doğrulayın.
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  required
                  value={formData.sellerName}
                  onChange={e => setFormData({ ...formData, sellerName: e.target.value })}
                  placeholder="Örn: Ahmet Yiğit Canlı"
                  className="w-full bg-[#1C1D24] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#AF9164] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">
                  E-posta Adresi
                </label>
                <input
                  type="email"
                  required
                  value={formData.sellerEmail}
                  onChange={e => setFormData({ ...formData, sellerEmail: e.target.value })}
                  placeholder="ornek@domain.com"
                  className="w-full bg-[#1C1D24] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#AF9164] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">
                  Telefon Numarası
                </label>
                <input
                  type="tel"
                  required
                  value={formData.sellerPhone}
                  onChange={e => setFormData({ ...formData, sellerPhone: e.target.value })}
                  placeholder="05XX XXX XX XX"
                  className="w-full bg-[#1C1D24] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#AF9164] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">
                  Teslimat / Kurye Adresi
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.sellerAddress}
                  onChange={e => setFormData({ ...formData, sellerAddress: e.target.value })}
                  placeholder="Ürünün VIP kurye ile alınacağı açık adresiniz..."
                  className="w-full bg-[#1C1D24] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#AF9164] transition-colors"
                />
              </div>
            </div>

            {/* Courier Note */}
            <div className="p-3 bg-[#AF9164]/10 border border-[#AF9164]/20 rounded-xl text-[11px] text-[#AF9164] leading-relaxed">
              📍 <em>Kapıdan alma hizmetimiz olan <strong>Peony Courier</strong> (Özel sigortalı VIP kurye) sadece <strong>İstanbul içi</strong> geçerlidir.</em>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-[2px] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-[#AF9164]/50 text-white/60 cursor-not-allowed'
                  : 'bg-[#AF9164] hover:bg-[#96794F] text-white'
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  TALEP İLETİLİYOR...
                </>
              ) : (
                'ENTRUPY DOĞRULAMASI TALEP ET ✦'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function EntrupyRequestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0C] text-white flex items-center justify-center">Yükleniyor...</div>}>
      <EntrupyRequestForm />
    </Suspense>
  )
}
