'use client'

import { useState } from 'react'

export default function SourcingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="serif-display text-4xl mb-4 text-[#AF9164]">Peony Sourcing</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Aradığınız nadide parçayı sizin için bulalım. Hermès Birkin, Patek Philippe veya vintage Chanel... Uluslararası ağımızı kullanarak hayalinizdeki parçayı en güvenilir şekilde temin ediyoruz.
        </p>
      </div>

      {success ? (
        <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center">
          <svg className="w-12 h-12 mx-auto mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Talebiniz Alındı</h3>
          <p className="text-sm">Peony Concierge ekibimiz en kısa sürede sizinle gizlilik protokolü (NDA) çerçevesinde iletişime geçecektir.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Adınız Soyadınız</label>
              <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#AF9164] outline-none transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Telefon Numaranız</label>
              <input type="tel" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#AF9164] outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Aradığınız Marka</label>
            <input type="text" placeholder="Örn: Hermès, Rolex, Audemars Piguet" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#AF9164] outline-none transition-all" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Aradığınız Model ve Detaylar</label>
            <textarea rows={4} placeholder="Örn: Kelly 25, Epsom deri, Craie renk, Gold Hardware (Ghw), 2022 sonrası..." required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#AF9164] outline-none transition-all"></textarea>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <input type="checkbox" id="nda" className="w-5 h-5 accent-[#AF9164]" />
            <label htmlFor="nda" className="text-xs text-gray-600 font-medium">Satın alım sürecimde Gizlilik Sözleşmesi (NDA) ve Anonim Teslimat talep ediyorum.</label>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-50">
            {isSubmitting ? 'Gönderiliyor...' : 'Talebi İlet'}
          </button>
        </form>
      )}
    </div>
  )
}
