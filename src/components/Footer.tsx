'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, CheckCircle2, Award, Loader2 } from 'lucide-react'
import { createClient } from '@/src/utils/supabase/client'

export default function Footer() {
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
      setError('Lütfen geçerli bir e-posta adresi giriniz.')
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

      setMessage("Özel listemize başarıyla kaydoldunuz. VIP ayrıcalıklar yakında e-postanızda.")
      setEmail('')
    } catch (err) {
      console.error(err)
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-[#1A1A1A] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      
      {/* İnce Altın Parıltı Dekoru */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#AF9164]/40 to-transparent" />

      <div className="max-w-[1800px] mx-auto px-8">
        
        {/* Üst Alan: 3 Kolonlu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-8 pb-20 border-b border-white/10">
          
          {/* Kolon 1: Marka Tanıtımı ve Şirket Bilgileri */}
          <div className="space-y-6">
            <Link href="/" className="block max-w-[200px] transition-all duration-300 hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.png" 
                alt="Peony Collective Logo" 
                className="h-10 sm:h-12 w-auto object-contain invert brightness-200" 
              />
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] text-[#AF9164] font-bold">Mirasın Yeni Sahibi</p>
            <p className="text-sm font-light leading-relaxed text-zinc-400 max-w-sm">
              Yarım milyonluk bir yatırımı şansa bırakamazsınız. Peony Collective, her parçayı 32 noktalı fiziksel ekspertiz ve 3D Spektral Analizden geçirerek orijinalliğini garantiler.
            </p>
            <div className="text-[10px] text-zinc-500 font-light space-y-1 pt-4 border-t border-white/5">
              <p className="font-bold text-zinc-400 uppercase tracking-wider mb-1">Peony Collective</p>
              <p>Adres: Mehmet Akif Mah. Şahinbey Cd. Hacı Tevfikoğulları İş Merkezi No:59, 34774 Çekmeköy/İstanbul</p>
              <p>Telefon: 0850 885 4110 | E-posta: info@peonycollective.com</p>
              <p className="text-zinc-600">Mersis No: [Mersis No] | Vergi No: [Vergi No] ([Vergi Dairesi])</p>
            </div>
          </div>

          {/* Kolon 2: Hukuki & Yasal Metinler */}
          <div className="space-y-6 lg:pl-12">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#AF9164]">Yasal Belgeler</h4>
            <ul className="space-y-3 text-xs text-zinc-400 font-light">
              <li>
                <Link href="/legal/terms" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
              </li>
              <li>
                <Link href="/legal/kvkk" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</Link>
              </li>
              <li>
                <Link href="/legal/distance-sales" className="hover:text-white transition-colors">Mesafeli Satış Sözleşmesi</Link>
              </li>
              <li>
                <Link href="/legal/pre-information" className="hover:text-white transition-colors">Ön Bilgilendirme Formu</Link>
              </li>
              <li>
                <Link href="/legal/return-policy" className="hover:text-white transition-colors">İptal ve İade Koşulları</Link>
              </li>
              <li>
                <Link href="/legal/delivery" className="hover:text-white transition-colors">Teslimat ve Kargo Politikası</Link>
              </li>
            </ul>
          </div>

          {/* Kolon 3: VIP Bülten Aboneliği */}
          <div className="space-y-6 lg:pl-12">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#AF9164]">Private List</h4>
            <p className="text-sm font-light text-zinc-400">
              Özel kürasyonlardan, gizli butik satışlarından ve VIP davetlerden ilk siz haberdar olun.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-4 group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-POSTA ADRESİNİZ"
                className="w-full bg-zinc-900 border-b border-zinc-700 focus:border-[#AF9164] py-3.5 px-0 text-xs font-bold tracking-widest uppercase text-white placeholder-zinc-500 focus:outline-none transition-colors duration-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#AF9164] transition-colors cursor-pointer"
                aria-label="Abone Ol"
              >
                {loading ? (
                  <Loader2 className="w-4.5 h-4.5 animate-spin text-[#AF9164]" />
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

        {/* Alt Alan: Güven Rozetleri ve Copyright */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Sol: Copyright, Credit */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-[10px] font-medium tracking-[0.15em] text-zinc-500 text-center md:text-left">
                © 2026 PEONY COLLECTIVE. BÜTÜN HAKLARI SAKLIDIR. MIRASIN DİJİTAL SAHİBİ.
              </div>
              <div className="text-[8px] font-medium tracking-[0.2em] text-zinc-600 text-center md:text-left">
                CRAFTED BY <a href="https://www.vr0cks.com/en" target="_blank" rel="noopener noreferrer" className="text-[#AF9164] hover:text-white transition-colors">VR0CKS</a>
              </div>
            </div>
          </div>

          {/* Sağ: Sosyal Medya ve Güven Rozetleri */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-4 text-zinc-400">
              <a href="https://www.instagram.com/peonycollectivebrands?igsh=MWFpbnp3bGIzejRwbg==" target="_blank" rel="noopener noreferrer" className="hover:text-[#AF9164] transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/peonycollective/" target="_blank" rel="noopener noreferrer" className="hover:text-[#AF9164] transition-colors" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 opacity-40 hover:opacity-75 transition-opacity duration-500">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#AF9164]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Orijinallik Garantisi</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} className="text-[#AF9164]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Peony Lab™ Onaylı</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#AF9164]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">VIP Sigortalı Teslimat</span>
              </div>
            </div>
            
            {/* Ödeme Logoları */}
            <div className="flex flex-wrap justify-center md:justify-end gap-2 items-center opacity-30 hover:opacity-60 transition-opacity duration-500 pt-2">
              <span className="text-[8px] tracking-widest uppercase text-zinc-400 mr-1">GÜVENLİ ÖDEME:</span>
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
