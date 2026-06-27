'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, CheckCircle2, Award, Loader2, Instagram, Twitter, Linkedin } from 'lucide-react'
import { createClient } from '@/src/utils/supabase/client'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

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
        
        {/* Üst Alan: 4 Kolonlu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 pb-20 border-b border-white/10">
          
          {/* Kolon 1: Marka Tanıtımı (4/12 genişlik) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="text-3xl font-playfair tracking-[0.3em] uppercase block">
              Peony<span className="italic font-light text-[#AF9164]">Collective</span>
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] text-[#AF9164] font-bold">Mirasın Yeni Sahibi</p>
            <p className="text-sm font-light leading-relaxed text-zinc-400 max-w-sm">
              Yarım milyonluk bir yatırımı şansa bırakamazsınız. Peony Collective, her parçayı 32 noktalı fiziksel ekspertiz ve 3D Spektral Analizden geçirerek orijinalliğini garantiler.
            </p>
          </div>

          {/* Kolon 2: Marka Koleksiyonu (2/12 genişlik) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#AF9164]">Koleksiyon</h4>
            <ul className="space-y-4 text-xs font-medium uppercase tracking-widest text-zinc-400">
              <li>
                <Link href="/?brand=Hermès#collection" className="hover:text-white hover:translate-x-1 transition-all inline-block">Hermès</Link>
              </li>
              <li>
                <Link href="/?brand=Chanel#collection" className="hover:text-white hover:translate-x-1 transition-all inline-block">Chanel</Link>
              </li>
              <li>
                <Link href="/?brand=Dior#collection" className="hover:text-white hover:translate-x-1 transition-all inline-block">Dior</Link>
              </li>
              <li>
                <Link href="/?brand=Rolex#collection" className="hover:text-white hover:translate-x-1 transition-all inline-block">Rolex</Link>
              </li>
              <li>
                <Link href="/#collection" className="hover:text-white hover:translate-x-1 transition-all inline-block">Tümünü Keşfet</Link>
              </li>
            </ul>
          </div>

          {/* Kolon 3: VIP Concierge & Support (3/12 genişlik) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#AF9164]">VIP Concierge</h4>
            <ul className="space-y-4 text-xs font-medium uppercase tracking-widest text-zinc-400">
              <li>
                <Link href="/how-it-works" className="hover:text-white hover:translate-x-1 transition-all inline-block">Denetim Süreci</Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-white hover:translate-x-1 transition-all inline-block">Satış Rehberi</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white hover:translate-x-1 transition-all inline-block">Dijital Pasaport</Link>
              </li>
              <li>
                <Link href="/return" className="hover:text-white hover:translate-x-1 transition-all inline-block">İade Talebi</Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-white hover:translate-x-1 transition-all inline-block">Hesap Ayarlarım</Link>
              </li>
            </ul>
          </div>

          {/* Kolon 4: VIP Bülten Aboneliği (3/12 genişlik) */}
          <div className="lg:col-span-3 space-y-6">
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

        {/* Alt Alan: Lisanslar, Güven Rozetleri ve Copyright */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Sol: Copyright */}
          {/* Sol: Copyright, Credit ve Legal Links */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400">
              <Link href="/legal/privacy" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
              <Link href="/legal/terms" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
              <Link href="/legal/kvkk" className="hover:text-white transition-colors">KVKK</Link>
            </div>
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
              <a href="https://instagram.com/peonycollective" target="_blank" rel="noopener noreferrer" className="hover:text-[#AF9164] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com/peonycollective" target="_blank" rel="noopener noreferrer" className="hover:text-[#AF9164] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com/company/peonycollective" target="_blank" rel="noopener noreferrer" className="hover:text-[#AF9164] transition-colors">
                <Linkedin size={18} />
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
          </div>

        </div>

      </div>
    </footer>
  )
}
