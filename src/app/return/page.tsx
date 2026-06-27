'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, PackageCheck, AlertCircle } from 'lucide-react'

export default function ReturnPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    orderId: '',
    email: '',
    reason: 'size_issue',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Burada ileride veritabanı kaydı veya e-posta gönderme işlemi yapılabilir
    setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-[#F9F9F8] pt-32 pb-24 px-6">
      <div className="max-w-[600px] mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>

        <h1 className="text-4xl serif-display mb-6">İade Talebi</h1>
        
        <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-sm mb-8">
          <div className="flex gap-4 items-start mb-8 p-4 bg-amber-50 text-amber-900 border border-amber-200">
            <AlertCircle size={24} className="shrink-0 mt-1 text-amber-600" />
            <div className="text-sm font-light leading-relaxed">
              <strong>Önemli:</strong> İade talebinizin kabul edilebilmesi için ürün üzerindeki <span className="font-bold">Peony Lock (Güvenlik Mührü)</span> kesinlikle koparılmamış veya zarar görmemiş olmalıdır. Mührü sökülen ürünlerin iadesi kabul edilmemektedir.
            </div>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <PackageCheck size={40} className="text-emerald-500" />
              </div>
              <h2 className="text-2xl serif-display mb-4">Talebiniz Alındı</h2>
              <p className="text-gray-500 font-light mb-8 max-w-md mx-auto">
                {formData.orderId} numaralı siparişiniz için iade talebiniz ekibimize ulaştı. İade kargo kodunuz 24 saat içinde e-posta adresinize gönderilecektir.
              </p>
              <button onClick={() => window.location.href = '/'} className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#AF9164] transition-colors">
                Alışverişe Dön
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">Sipariş Numarası</label>
                <input 
                  type="text" 
                  name="orderId" 
                  required 
                  value={formData.orderId}
                  onChange={handleChange}
                  placeholder="PO_..." 
                  className="w-full border-b border-gray-300 py-3 bg-transparent focus:border-black focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">E-posta Adresi</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-3 bg-transparent focus:border-black focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">İade Nedeni</label>
                <select 
                  name="reason" 
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-3 bg-transparent focus:border-black focus:outline-none transition-colors text-sm cursor-pointer"
                >
                  <option value="size_issue">Beden / Ölçü Uymadı</option>
                  <option value="not_as_expected">Beklentimi Karşılamadı</option>
                  <option value="damaged">Ürün Hasarlı Geldi</option>
                  <option value="wrong_item">Yanlış Ürün Gönderildi</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">Ek Açıklama</label>
                <textarea 
                  name="message" 
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="İadenizle ilgili eklemek istediğiniz detaylar..." 
                  className="w-full border-b border-gray-300 py-3 bg-transparent focus:border-black focus:outline-none transition-colors text-sm resize-none"
                />
              </div>

              <button type="submit" className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#AF9164] transition-colors mt-4">
                İade Talebini Gönder
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
