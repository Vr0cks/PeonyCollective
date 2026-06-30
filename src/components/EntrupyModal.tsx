'use client'

import { useState } from 'react'
import { X, ShieldCheck, Microscope, Fingerprint } from 'lucide-react'

export default function EntrupyModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-[10px] text-[#AF9164] font-bold uppercase tracking-widest hover:text-black transition-colors underline underline-offset-4 mt-2 inline-block"
      >
        Entrupy Teknolojisi Nedir?
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-white w-full max-w-2xl rounded-2xl p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#AF9164]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Microscope size={32} className="text-[#AF9164]" />
              </div>
              <h2 className="text-3xl serif-display mb-4">Entrupy™ Doğrulaması</h2>
              <p className="text-gray-500 font-light leading-relaxed max-w-lg mx-auto">
                Gelişmiş optik lensler ve mikroskobik görüntüleme teknolojisiyle lüks ürünlerin orijinal formunu %99.1 oranında doğrulayan dünya standardı.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="flex gap-4">
                <Fingerprint className="text-[#AF9164] shrink-0" size={24} />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Mikroskobik Analiz</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">Ürünün materyali, dikişleri ve donanımı 260x büyütme ile incelenir. Deri gözenekleri ve damgalamalar moleküler düzeyde analiz edilir.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <ShieldCheck className="text-[#AF9164] shrink-0" size={24} />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Finansal Garanti</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">Entrupy tarafından "Orijinal" onayı alan her parça, hata payına karşı finansal olarak sigortalanır. Olası bir aksilikte tam para iadesi sağlanır.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Peony Lab Süreci</p>
              <p className="text-sm text-gray-600 font-light mb-4">
                Sitemizdeki her ürün satıldıktan sonra Peony Lab'a gönderilir. Burada uzman küratörlerimiz ve Entrupy cihazlarımızla incelenir. Sadece sertifika alabilen ürünler alıcıya kargolanır.
              </p>
              <p className="text-[9px] text-gray-400 leading-relaxed font-medium bg-white p-3 rounded border border-gray-100 text-left">
                <strong>Hukuki Uyarı:</strong> Peony Collective, bağımsız bir pazar yeri olup markaların yetkili satıcısı değildir. Entrupy doğrulaması, mikroskobik veri analizi destekli yüksek isabetli bir orijinallik tahmini sunar. Peony Collective, satıcı tarafından kasıtlı manipüle edilen ve teknolojiyi aşan çok spesifik ("super fake") sahtecilik durumlarında doğrudan sorumluluk kabul etmez; ancak Entrupy'nin sunduğu finansal garanti koşulları dahilinde alıcı haklarını savunmayı taahhüt eder.
              </p>
            </div>
            
            <div className="mt-8 text-center">
               <button onClick={() => setIsOpen(false)} className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#AF9164] transition-colors">
                 Anladım
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
