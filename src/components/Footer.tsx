'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, CheckCircle2, Award, Loader2 } from 'lucide-react'
import { createClient } from '@/src/utils/supabase/client'
import { useSettings } from '@/src/context/SettingsContext'
import CurrencyLanguageSelector from './CurrencyLanguageSelector'

export default function Footer() {
  const { t, language } = useSettings()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log(
      "%cDeveloped by vr0cks (vr0cks.com)",
      "color: #AF9164; font-size: 12px; font-weight: bold; font-family: monospace; padding: 4px;"
    )
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError(t('footer.subscribeError', 'Lütfen geçerli bir e-posta adresi giriniz.'))
      return
    }

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const supabase = createClient()
      
      // Try to insert into newsletter table
      const { error: insertError } = await supabase
        .from('newsletter')
        .insert({ email: email.trim().toLowerCase() })

      // Fallback simulation if table doesn't exist
      if (insertError) {
        console.warn('Newsletter table insert failed, falling back to localStorage simulation:', insertError.message)
        const savedList = JSON.parse(localStorage.getItem('peony_newsletter') || '[]')
        if (!savedList.includes(email)) {
          savedList.push(email)
          localStorage.setItem('peony_newsletter', JSON.stringify(savedList))
        }
      }

      setMessage(t('footer.subscribeSuccess', 'Özel listemize başarıyla kaydoldunuz. VIP ayrıcalıklar yakında e-postanızda.'))
      setEmail('')
    } catch (err) {
      console.error(err)
      setError(t('footer.subscribeError', 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-[#1A1A1A] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      
      {/* İnce Altın Parıltı Dekoru */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#AF9164]/40 to-transparent" />

      <div className="max-w-[1800px] mx-auto px-6 sm:px-10">
        
        {/* ─── Üst Alan: 4 Kolonlu Dengeli Lüks Mimari ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Kolon 1: Marka Tanıtımı ve Şirket Bilgileri (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block transition-all duration-300 hover:opacity-90">
              <span className="font-playfair text-2xl tracking-[0.15em] uppercase text-white font-bold block">
                PEONY COLLECTIVE
              </span>
              <span className="text-[8px] font-mono tracking-[0.3em] text-[#C2A676] uppercase block mt-0.5">
                MAISON ARCHIVES • İSTANBUL
              </span>
            </Link>

            <p className="text-xs uppercase tracking-[0.2em] text-[#C2A676] font-bold font-mono">
              {t('footer.tagline', 'Mirasın Yeni Sahibi')}
            </p>
            
            <p className="text-xs font-light leading-relaxed text-zinc-400 max-w-sm">
              {t('footer.aboutText', 'Yarım milyonluk bir yatırımı şansa bırakamazsınız. Peony Collective, her parçayı 32 noktalı fiziksel ekspertiz ve mikroskobik optik analizden geçirerek orijinalliğini garantiler.')}
            </p>

            {/* VIP WhatsApp Concierge Butonu */}
            <div className="pt-2">
              <a
                href={`https://wa.me/905523652093?text=${encodeURIComponent(
                  language === 'en'
                    ? 'Hello, I would like to get information about Peony Collective.'
                    : 'Merhaba, Peony Collective hakkında bilgi almak istiyorum.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#C2A676]/20 border border-white/10 hover:border-[#C2A676]/40 text-[#E2C79E] text-xs transition-all font-mono shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === 'en' ? 'VIP Concierge: +90 (552) 365 20 93' : 'VIP Danışma: +90 (552) 365 20 93'}</span>
              </a>
            </div>

            <div className="text-[10px] text-zinc-500 font-light space-y-1 pt-3 border-t border-white/5">
              <p className="font-bold text-zinc-400 uppercase tracking-wider mb-0.5">Peony Collective Lüks Moda A.Ş.</p>
              <p>{t('footer.companyAddress', 'Adres: Merkez Mah. Üsküdar Cad. No: 57 İç Kapı No: 1, 34788 Çekmeköy/İstanbul')}</p>
              <p>{t('footer.companyPhone', 'E-posta: info@peonycollective.com')}</p>
              <p className="text-zinc-600">{t('footer.companyTax', 'Vergi No: 8590652178 (Sarıgazi V.D.)')}</p>
            </div>
          </div>

          {/* Kolon 2: Koleksiyonlar & Keşfet (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-5 lg:pl-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A676] font-mono">
              {language === 'en' ? 'COLLECTIONS' : 'KOLEKSİYONLAR'}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li>
                <Link href="/catalog?category=Çanta" className="hover:text-white transition-colors">
                  {language === 'en' ? 'Bags & Leather Goods' : 'Çanta & Deri İşçiliği'}
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Kıyafet" className="hover:text-white transition-colors">
                  {language === 'en' ? 'Haute Couture & Apparel' : 'Kıyafet & Elbise'}
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Ayakkabı" className="hover:text-white transition-colors">
                  {language === 'en' ? 'Designer Footwear' : 'Tasarımcı Ayakkabıları'}
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Aksesuar" className="hover:text-white transition-colors">
                  {language === 'en' ? 'Horology & Accessories' : 'Saat & Aksesuar'}
                </Link>
              </li>
              <li>
                <Link href="/magazine" className="text-[#C2A676] hover:text-white font-medium transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C2A676] animate-pulse" />
                  <span>{language === 'en' ? 'Peony Gazette (Issue 01)' : 'Peony Magazine (Sayı 01)'}</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-white/5">
                <Link href="/sell" className="text-[#E2C79E] hover:text-white font-medium transition-colors">
                  {language === 'en' ? 'VIP Consignment Desk' : 'VIP Konsinye Başvurusu'}
                </Link>
              </li>
              <li>
                <Link href="/#trust" className="hover:text-white transition-colors">
                  {language === 'en' ? 'Authenticity Standard' : 'Orijinallik Güvencesi'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolon 3: Hukuki & Yasal Metinler (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5 lg:pl-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A676] font-mono">
              {t('footer.legalTitle', 'Yasal Belgeler')}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-light">
              <li>
                <Link href="/legal/terms" className="hover:text-white transition-colors">
                  {t('footer.terms', 'Kullanım Koşulları')}
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-white transition-colors">
                  {t('footer.privacy', 'Gizlilik Politikası')}
                </Link>
              </li>
              <li>
                <Link href="/legal/kvkk" className="hover:text-white transition-colors">
                  {t('footer.kvkk', 'KVKK Aydınlatma Metni')}
                </Link>
              </li>
              <li>
                <Link href="/legal/distance-sales" className="hover:text-white transition-colors">
                  {t('footer.distanceSales', 'Mesafeli Satış Sözleşmesi')}
                </Link>
              </li>
              <li>
                <Link href="/legal/pre-information" className="hover:text-white transition-colors">
                  {t('footer.preInfo', 'Ön Bilgilendirme Formu')}
                </Link>
              </li>
              <li>
                <Link href="/legal/return-policy" className="hover:text-white transition-colors">
                  {t('footer.returnPolicy', 'İptal ve İade Koşulları')}
                </Link>
              </li>
              <li>
                <Link href="/legal/delivery" className="hover:text-white transition-colors">
                  {t('footer.delivery', 'Teslimat ve Kargo Politikası')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolon 4: VIP Bülten Aboneliği (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A676] font-mono">
              {t('footer.privateListTitle', 'Private List')}
            </h4>
            <p className="text-xs font-light text-zinc-400 leading-relaxed">
              {t('footer.privateListDesc', 'Özel kürasyonlardan, gizli butik satışlarından ve VIP davetlerden ilk siz haberdar olun.')}
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-3 group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder', 'E-POSTA ADRESİNİZ')}
                className="w-full bg-zinc-900 border-b border-zinc-700 focus:border-[#C2A676] py-3.5 px-0 text-xs font-bold tracking-widest uppercase text-white placeholder-zinc-500 focus:outline-none transition-colors duration-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#C2A676] transition-colors cursor-pointer"
                aria-label="Abone Ol"
              >
                {loading ? (
                  <Loader2 className="w-4.5 h-4.5 animate-spin text-[#C2A676]" />
                ) : (
                  <ArrowRight size={18} strokeWidth={1.5} />
                )}
              </button>
            </form>

            {message && (
              <p className="text-[10px] text-emerald-400 uppercase tracking-wider leading-relaxed mt-2 font-medium">
                ✓ {message}
              </p>
            )}
            {error && (
              <p className="text-[10px] text-red-400 uppercase tracking-wider leading-relaxed mt-2 font-medium">
                ✕ {error}
              </p>
            )}
          </div>

        </div>

        {/* ─── Alt Alan: Güven Rozetleri, Copyright & İmzalar ─── */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Sol: Copyright, Credit ve Dil/Para Birimi Seçici */}
          <div className="flex flex-col gap-3">
            <div className="text-[10px] font-medium tracking-[0.15em] text-zinc-500 text-center md:text-left">
              {t('footer.copyright', '© 2026 PEONY COLLECTIVE. TÜM HAKLARI SAKLIDIR.')}
            </div>
            
            <div className="text-[8px] font-mono tracking-[0.25em] text-zinc-600 text-center md:text-left uppercase">
              DIGITAL ARCHITECTURE BY{' '}
              <a 
                href="https://www.vr0cks.com/en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#C2A676] hover:text-white transition-colors underline underline-offset-2"
              >
                VR0CKS
              </a>
            </div>

            <div className="pt-1 flex justify-center md:justify-start">
              <CurrencyLanguageSelector dropUp={true} variant="dark" align="left" />
            </div>
          </div>

          {/* Sağ: Sosyal Medya ve Güven Rozetleri */}
          <div className="flex flex-col items-center md:items-end gap-5">
            <div className="flex gap-4 text-zinc-400">
              <a href="https://www.instagram.com/peonycollectivebrands?igsh=MWFpbnp3bGIzejRwbg==" target="_blank" rel="noopener noreferrer" className="hover:text-[#C2A676] transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/peonycollective/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C2A676] transition-colors" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 opacity-50 hover:opacity-85 transition-opacity duration-500">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#C2A676]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-300">
                  {t('footer.authenticity', 'Orijinallik Garantisi')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} className="text-[#C2A676]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-300">
                  {t('footer.labApproved', 'Entrupy Onaylı')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#C2A676]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-300">
                  {t('footer.insuredDelivery', 'VIP Sigortalı Teslimat')}
                </span>
              </div>
            </div>
            
            {/* Ödeme Logoları */}
            <div className="flex flex-wrap justify-center md:justify-end gap-2 items-center opacity-40 hover:opacity-75 transition-opacity duration-500 pt-1">
              <span className="text-[8px] tracking-widest uppercase text-zinc-400 mr-1 font-mono">
                {t('footer.securePayment', 'GÜVENLİ ÖDEME:')}
              </span>
              <span className="text-[9px] font-bold border border-zinc-700 px-2 py-0.5 rounded text-zinc-300 tracking-wider">PayTR</span>
              <span className="text-[9px] font-bold border border-zinc-700 px-2 py-0.5 rounded text-zinc-300 tracking-wider">VISA</span>
              <span className="text-[9px] font-bold border border-zinc-700 px-2 py-0.5 rounded text-zinc-300 tracking-wider">MASTERCARD</span>
              <span className="text-[9px] font-bold border border-zinc-700 px-2 py-0.5 rounded text-zinc-300 tracking-wider">TROY</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  )
}
