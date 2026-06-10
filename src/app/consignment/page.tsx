'use client'

import { useState } from 'react'

export default function ConsignmentPage() {
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
    <div className="max-w-4xl mx-auto py-16 px-6 animate-fade-in">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#AF9164]/10 text-[#AF9164] text-[10px] font-bold uppercase tracking-widest mb-4">Peony White-Glove</span>
        <h1 className="serif-display text-4xl mb-4 text-black">Siz Gönderin, Biz Satalım</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Fotoğraf çekmekle veya mesajlara cevap vermekle uğraşmayın. Ürününüzü Peony laboratuvarlarına gönderin; profesyonel stüdyo çekimi, listeleme, lojistik ve satış operasyonlarını biz yönetelim.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Talep Oluşturun</h3>
          <p className="text-xs text-gray-500">Aşağıdaki formu doldurun. Peony Özel Kuryesi ürününüzü kapınızdan alsın.</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Profesyonel İşlem</h3>
          <p className="text-xs text-gray-500">Stüdyomuzda çekimleri yapılır, orijinallik onayı alınır ve fiyatlandırılıp listelenir.</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-[#AF9164] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Ödemenizi Alın</h3>
          <p className="text-xs text-gray-500">Satış gerçekleştiğinde komisyon düşülerek paranız anında hesabınıza yatar.</p>
        </div>
      </div>

      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center">
          <svg className="w-12 h-12 mx-auto mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Konsinye Talebiniz Alındı</h3>
          <p className="text-sm">Kuryemiz ürün(leri) teslim almak için sizinle iletişime geçecektir.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold border-b border-gray-100 pb-4 mb-6">Konsinye Gönderim Formu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Adınız Soyadınız</label>
              <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Telefon Numaranız</label>
              <input type="tel" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Teslim Alınacak Adres</label>
            <textarea rows={2} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"></textarea>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Gönderilecek Ürün Sayısı</label>
            <select required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all">
              <option value="1">1 Adet Ürün</option>
              <option value="2-5">2 - 5 Adet Arası</option>
              <option value="5+">5'ten Fazla Ürün (VIP Valiz Transferi)</option>
            </select>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-50">
            {isSubmitting ? 'Talebiniz İşleniyor...' : 'Kurye Çağır'}
          </button>
        </form>
      )}
    </div>
  )
}
