import Link from 'next/link'
import { ArrowRight, ShieldCheck, CheckCircle2, Award } from 'lucide-react'

export default function Footer() {
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
            <form className="relative mt-4 group">
              <input
                type="email"
                placeholder="E-POSTA ADRESİNİZ"
                className="w-full bg-zinc-900 border-b border-zinc-700 focus:border-[#AF9164] py-3.5 px-0 text-xs font-bold tracking-widest uppercase text-white placeholder-zinc-500 focus:outline-none transition-colors duration-500"
              />
              <button
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#AF9164] transition-colors"
                aria-label="Abone Ol"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </form>
          </div>

        </div>

        {/* Alt Alan: Lisanslar, Güven Rozetleri ve Copyright */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Sol: Copyright */}
          <div className="text-[10px] font-medium tracking-[0.15em] text-zinc-500 text-center md:text-left">
            © 2026 PEONY COLLECTIVE. BÜTÜN HAKLARI SAKLIDIR. MIRASIN DİJİTAL SAHİBİ.
          </div>

          {/* Sağ: Güven Rozetleri */}
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
    </footer>
  )
}
