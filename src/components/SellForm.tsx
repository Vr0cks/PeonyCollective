'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/src/utils/supabase/client'
import { addProduct } from '@/src/app/sell/actions'

export default function SellForm() {
  const router = useRouter()
  const supabase = createClient()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  // Eyalet Yönetimi (Görseller için iki ayrı kategori)
  const [publicFiles, setPublicFiles] = useState<File[]>([])
  const [authFiles, setAuthFiles] = useState<File[]>([])

  const inputClasses = "px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-gray-900 font-medium transition-all"
  const labelClasses = "text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('İşleniyor...')

    try {
      const formData = new FormData(e.currentTarget)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Oturum bulunamadı")

      // Helper: Resim yükleme fonksiyonu
      const uploadImages = async (files: File[], bucket: string) => {
        const urls = []
        for (const file of files) {
          const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${file.name.split('.').pop()}`
          const filePath = `${user.id}/${bucket}/${fileName}`
          const { error } = await supabase.storage.from('product-images').upload(filePath, file)
          if (error) throw error
          urls.push(supabase.storage.from('product-images').getPublicUrl(filePath).data.publicUrl)
        }
        return urls
      }

      setMessage('Satış fotoğrafları yükleniyor...')
      const publicUrls = await uploadImages(publicFiles, 'public')
      
      setMessage('Denetim belgeleri yükleniyor...')
      const authUrls = await uploadImages(authFiles, 'verification')

      setMessage('Veriler kaydediliyor...')
      await addProduct({
        brand: formData.get('brand') as string,
        model_name: formData.get('model_name') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        condition: formData.get('condition') as string,
        material: formData.get('material') as string,
        dimensions: formData.get('dimensions') as string,
        production_year: parseInt(formData.get('production_year') as string),
        serial_number: formData.get('serial_number') as string,
        public_images: publicUrls,
        authenticity_docs: authUrls
      })

      router.push('/sell?message=Ürün başarıyla onaya gönderildi.')
    } catch (error: any) {
      setMessage(`Hata: ${error.message}`)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {message && <div className="p-4 bg-zinc-900 text-white text-center text-xs font-bold rounded-xl animate-pulse">{message}</div>}

      {/* BÖLÜM 1: TEMEL BİLGİLER */}
      <section className="space-y-6">
        <h3 className="text-sm font-bold border-l-2 border-black pl-3 uppercase tracking-tighter">1. Temel Bilgiler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses}>Marka</label>
            <input className={inputClasses} name="brand" placeholder="Hermès, Chanel..." required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses}>Model</label>
            <input className={inputClasses} name="model_name" placeholder="Birkin 30, Kelly..." required />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClasses}>Ürün Hikayesi / Açıklama</label>
          <textarea className={`${inputClasses} min-h-[100px]`} name="description" placeholder="Çantanın kondisyonu ve hikayesi..." required />
        </div>
      </section>

      {/* BÖLÜM 2: TEKNİK DETAYLAR (EKLENEN KISIM) */}
      <section className="space-y-6">
        <h3 className="text-sm font-bold border-l-2 border-black pl-3 uppercase tracking-tighter">2. Teknik Özellikler & Güvenlik</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses}>Materyal / Deri</label>
            <input className={inputClasses} name="material" placeholder="Togo Deri, Epsom..." />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses}>Boyutlar</label>
            <input className={inputClasses} name="dimensions" placeholder="30 x 22 x 16 cm" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses}>Üretim Yılı</label>
            <input type="number" className={inputClasses} name="production_year" placeholder="2023" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={`${labelClasses} text-red-500`}>Seri Numarası / Date Code (Gizli)</label>
          <input className={`${inputClasses} border-red-100 focus:ring-red-500`} name="serial_number" placeholder="Çantanın içindeki gizli kod..." required />
        </div>
      </section>

      {/* BÖLÜM 3: FOTOĞRAFLAR (AYRIŞTIRILMIŞ) */}
      <section className="space-y-8">
        <h3 className="text-sm font-bold border-l-2 border-black pl-3 uppercase tracking-tighter">3. Medya Galeri</h3>
        
        {/* Vitrin Fotoğrafları */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
          <label className="text-xs font-bold block mb-4">VİTRİN FOTOĞRAFLARI (Müşteriler Görecek)</label>
          <input type="file" multiple accept="image/*" className="w-full text-xs" onChange={(e) => setPublicFiles(Array.from(e.target.files || []))} required />
        </div>

        {/* AI Denetim Fotoğrafları */}
        <div className="bg-zinc-900 p-6 rounded-2xl text-white">
          <label className="text-xs font-bold block mb-2 uppercase tracking-widest text-zinc-400">Onay Fotoğrafları & Belgeler (Gizli)</label>
          <p className="text-[10px] text-zinc-500 mb-4">AI denetimi için logonun, dikişlerin, donanımın ve faturanın yakın çekimlerini yükleyin.</p>
          <input type="file" multiple accept="image/*" className="w-full text-xs file:bg-white file:text-black file:rounded file:px-4 file:py-2 file:mr-4 file:border-0" onChange={(e) => setAuthFiles(Array.from(e.target.files || []))} required />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col gap-1.5">
          <label className={labelClasses}>Satış Fiyatı (TL)</label>
          <input type="number" className={`${inputClasses} text-xl font-bold`} name="price" placeholder="00.000" required />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`h-[56px] mt-4 rounded-xl font-bold uppercase tracking-widest transition-all ${isSubmitting ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:scale-[1.02] shadow-xl'}`}
        >
          {isSubmitting ? 'YÜKLENİYOR...' : 'ONAYA GÖNDER'}
        </button>
      </div>
    </form>
  )
}