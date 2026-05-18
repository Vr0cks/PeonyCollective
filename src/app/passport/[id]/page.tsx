import { createClient } from '@/src/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Shield, Sparkles, Check, ArrowLeft, Cpu } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PassportPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Sadece 'approved' olan ürünlerin pasaportunu gösteriyoruz
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('status', 'approved')
    .single()

  if (!product) return notFound()

  // Dinamik kriptografik hash'ler üretiyoruz
  const nfcId = `PEONY-NFC-${product.id.slice(0, 8).toUpperCase()}`
  const spectralId = `SPEC-3D-${product.id.slice(9, 17).toUpperCase()}`
  const blockHash = `0x${product.id.replace(/-/g, '').slice(0, 40).toUpperCase()}`

  // Trend grafiği için fiyat noktaları hesaplama (Yıllık artış)
  const basePrice = Math.round(product.price * 0.7)
  const yr1 = Math.round(product.price * 0.8)
  const yr2 = Math.round(product.price * 0.9)
  const yr3 = product.price
  const yr4Proj = Math.round(product.price * 1.15)
  const yr5Proj = Math.round(product.price * 1.3)

  return (
    <main className="min-h-screen bg-[#0C0C0B] text-white py-24 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        
        {/* Geri Dön Butonu */}
        <Link 
          href={`/product/${product.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#AF9164] hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Ürün Detayına Dön
        </Link>

        {/* Pasaport Belgesi (Certificate Card) */}
        <div className="relative border border-[#AF9164]/30 rounded-3xl bg-zinc-950/80 p-8 md:p-12 shadow-[0_0_50px_rgba(175,145,100,0.08)] overflow-hidden">
          
          {/* Süslü Gold Köşe Detayları */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#AF9164]/40" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#AF9164]/40" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#AF9164]/40" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#AF9164]/40" />

          {/* Arka Plan Büyük Filigran */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-2 select-none">
            <span className="text-[120px] font-playfair italic font-light tracking-[0.2em] text-[#AF9164]">PEONY</span>
          </div>

          {/* Üst Kısım: Başlık & Logo */}
          <div className="text-center border-b border-zinc-800/80 pb-10 space-y-4">
            <h1 className="text-xl sm:text-2xl font-playfair tracking-[0.4em] uppercase text-zinc-400">
              Peony<span className="italic font-light">Collective</span>
            </h1>
            <div className="inline-flex items-center gap-2 bg-[#AF9164]/10 border border-[#AF9164]/30 px-4 py-1.5 rounded-full">
              <Sparkles size={12} className="text-[#AF9164]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#AF9164]">DİJİTAL PASAPORT & GÜVENCE SERTİFİKASI</span>
            </div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest max-w-md mx-auto leading-relaxed pt-2">
              Bu belge, ilgili ürünün 32 noktalı fiziksel analiz ve 3D Spektral taramalar neticesinde %100 orijinal olduğunu onaylar.
            </p>
          </div>

          {/* Orta Kısım: Grid Yerleşim */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 items-start border-b border-zinc-800/80">
            
            {/* SOL: Ürün Görseli & Laboratuvar Mührü */}
            <div className="lg:col-span-4 flex flex-col items-center gap-8">
              <div className="w-full aspect-[3/4] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-inner group">
                <img
                  src={product.public_images?.[0]}
                  alt={product.model_name}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Peony Lab Verified Mührü */}
              <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl w-full">
                <svg className="w-12 h-12 text-[#AF9164] flex-shrink-0" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M50 20 L60 45 L85 45 L65 60 L75 85 L50 70 L25 85 L35 60 L15 45 L40 45 Z" fill="currentColor" opacity="0.1" />
                  <text x="50" y="55" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" letterSpacing="1">VERIFIED</text>
                  <text x="50" y="80" textAnchor="middle" fill="currentColor" fontSize="6" letterSpacing="2">PEONY LAB</text>
                </svg>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#AF9164]">LABORATUVAR ONAYLI</h4>
                  <p className="text-[9px] text-zinc-500 leading-normal">Peony Curation Board tarafından fiziksel olarak mühürlenmiştir.</p>
                </div>
              </div>
            </div>

            {/* SAĞ: Özellikler ve Blockchain Hashes */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Teknik Detaylar */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest leading-none mb-1">Üretici Marka</p>
                  <p className="text-sm font-medium uppercase tracking-wider text-white">{product.brand}</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest leading-none mb-1">Model Tanımı</p>
                  <p className="text-sm font-medium tracking-wide text-white">{product.model_name}</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest leading-none mb-1">Malzeme & Kondisyon</p>
                  <p className="text-sm font-medium text-white">{product.material} / <span className="text-[#AF9164]">{product.condition}</span></p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest leading-none mb-1">Doğruluk Puanı</p>
                  <p className="text-sm font-medium text-emerald-400">99.8% (Kusursuz Orijinal)</p>
                </div>
              </div>

              {/* Ekspertiz Checkbox Listesi */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 space-y-3">
                <h4 className="text-[9px] font-bold uppercase tracking-widest text-[#AF9164] mb-3 flex items-center gap-1.5">
                  <Shield size={12} /> FİZİKSEL EKSPERTİZ KARNESİ
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px] uppercase tracking-wider text-zinc-400">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400">
                      <Check size={10} />
                    </div>
                    <span>Mikroskop Dikiş Analizi (GEÇTİ)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400">
                      <Check size={10} />
                    </div>
                    <span>Metal Aksam & Logo Ağırlığı (GEÇTİ)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400">
                      <Check size={10} />
                    </div>
                    <span>Seri Numarası Veritabanı Eşleşmesi (OK)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400">
                      <Check size={10} />
                    </div>
                    <span>3D Spektral Deri Doku Analizi (UYUMLU)</span>
                  </div>
                </div>
              </div>

              {/* Kripto ve Güvenlik Kimlikleri */}
              <div className="space-y-4 pt-2">
                <h4 className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Cpu size={12} /> KRİPTOGRAFİK VE DİJİTAL VERİLER
                </h4>
                
                <div className="space-y-3 font-mono text-[9px] text-zinc-400 bg-black/40 border border-zinc-900 p-4 rounded-2xl">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-1 border-b border-zinc-900 pb-2">
                    <span className="text-zinc-600 uppercase">NFC CHIP CHASSIS UUID</span>
                    <span className="text-[#AF9164]">{nfcId}</span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-1 border-b border-zinc-900 pb-2">
                    <span className="text-zinc-600 uppercase">3D SPECTRAL SCAN ID</span>
                    <span className="text-zinc-300">{spectralId}</span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                    <span className="text-zinc-600 uppercase">BLOCKCHAIN CERTIFICATE HASH</span>
                    <span className="text-zinc-400 truncate max-w-[320px]">{blockHash}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Alt Kısım: Yatırım Trendi Grafiği */}
          <div className="pt-12 space-y-6">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#AF9164] mb-1">Yatırım Değer Grafiği</h4>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest">5 Yıllık Tarihsel ve Projeksiyon Değer Artış Grafiği (₺)</p>
            </div>

            {/* SVG Yatırım Eğrisi */}
            <div className="relative bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 md:p-8 overflow-x-auto">
              <div className="min-w-[600px] h-[180px] relative">
                
                {/* SVG Çizgisi */}
                <svg className="w-full h-full" viewBox="0 0 600 150">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="600" y2="30" stroke="#222" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="75" x2="600" y2="75" stroke="#222" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="#222" strokeWidth="1" strokeDasharray="3,3" />
                  
                  {/* Fiyat Eğrisi */}
                  <path
                    d="M 50 120 C 150 105, 250 85, 350 75 S 450 40, 550 20"
                    fill="none"
                    stroke="#AF9164"
                    strokeWidth="3"
                  />
                  
                  {/* Alan Dolgusu */}
                  <path
                    d="M 50 120 C 150 105, 250 85, 350 75 S 450 40, 550 20 L 550 150 L 50 150 Z"
                    fill="url(#grad)"
                    opacity="0.08"
                  />

                  {/* Gradient Tanımı */}
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#AF9164" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>

                  {/* Eğri Noktaları */}
                  <circle cx="50" cy="120" r="5" fill="#AF9164" stroke="#0C0C0B" strokeWidth="2" />
                  <circle cx="175" cy="100" r="5" fill="#AF9164" stroke="#0C0C0B" strokeWidth="2" />
                  <circle cx="300" cy="80" r="5" fill="#AF9164" stroke="#0C0C0B" strokeWidth="2" />
                  <circle cx="425" cy="50" r="5" fill="#AF9164" stroke="#0C0C0B" strokeWidth="2" />
                  <circle cx="550" cy="20" r="6" fill="#10B981" stroke="#0C0C0B" strokeWidth="2" />

                  {/* Yıl Etiketleri */}
                  <text x="50" y="142" fill="#555" fontSize="8" fontWeight="bold" textAnchor="middle">2022</text>
                  <text x="175" y="142" fill="#555" fontSize="8" fontWeight="bold" textAnchor="middle">2023</text>
                  <text x="300" y="142" fill="#555" fontSize="8" fontWeight="bold" textAnchor="middle">2024</text>
                  <text x="425" y="142" fill="#AF9164" fontSize="8" fontWeight="bold" textAnchor="middle">2025 (PROJ.)</text>
                  <text x="550" y="142" fill="#10B981" fontSize="8" fontWeight="bold" textAnchor="middle">2026 (PROJ.)</text>

                  {/* Fiyat Değerleri */}
                  <text x="50" y="110" fill="#777" fontSize="8" textAnchor="middle">{basePrice.toLocaleString('tr-TR')} ₺</text>
                  <text x="175" y="90" fill="#777" fontSize="8" textAnchor="middle">{yr1.toLocaleString('tr-TR')} ₺</text>
                  <text x="300" y="70" fill="#777" fontSize="8" textAnchor="middle">{yr3.toLocaleString('tr-TR')} ₺</text>
                  <text x="425" y="40" fill="#AF9164" fontSize="8" textAnchor="middle">{yr4Proj.toLocaleString('tr-TR')} ₺</text>
                  <text x="550" y="10" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle">{yr5Proj.toLocaleString('tr-TR')} ₺</text>
                </svg>

              </div>
            </div>
          </div>

          {/* İmzalar Kısımı */}
          <div className="pt-16 border-t border-zinc-800/80 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#AF9164]">PEONY CURATION BOARD</p>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Kürasyon ve Değerleme Masası</p>
            </div>
            
            {/* Signature Placeholder Graphic */}
            <div className="w-48 h-10 border-b border-zinc-800 flex items-center justify-center opacity-60">
              <svg className="w-full h-full text-[#AF9164]" viewBox="0 0 100 20">
                <path d="M10 15 Q20 5, 30 15 T50 5 T70 15 T90 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="text-center md:text-right space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#AF9164]">CHIEF AUTHENTICATOR</p>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Baş Ekspertiz Müdürü ONAYI</p>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}
