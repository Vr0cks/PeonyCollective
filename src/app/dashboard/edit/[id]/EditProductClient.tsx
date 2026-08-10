'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Trash2, Plus, AlertTriangle, CheckCircle2, Loader2, X } from 'lucide-react'
import { createClient } from '@/src/utils/supabase/client'
import { updateProductAction, withdrawProductAction } from './actions'

interface Product {
  id: string
  brand: string
  model_name: string
  price: number
  description: string | null
  public_images: string[]
  flaw_images: string[]
  status: string
  condition: string
  category: string
}

export default function EditProductClient({ product }: { product: Product }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [price, setPrice] = useState(String(product.price))
  const [description, setDescription] = useState(product.description || '')
  const [images, setImages] = useState<string[]>(product.public_images || [])
  const [removedImages, setRemovedImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [withdrawing, setWithdrawing] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false)

  const handleRemoveImage = (url: string) => {
    setImages(prev => prev.filter(img => img !== url))
    if (product.public_images.includes(url)) {
      setRemovedImages(prev => [...prev, url])
    } else {
      setNewImages(prev => prev.filter(img => img !== url))
    }
  }

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setUploading(false); return }

    for (const file of files) {
      const ext = file.name.split('.').pop()
      const fileName = `${user.id}/public/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`
      const { error } = await supabase.storage.from('product-images').upload(fileName, file)
      if (!error) {
        const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
        setImages(prev => [...prev, data.publicUrl])
        setNewImages(prev => [...prev, data.publicUrl])
      }
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    const formData = new FormData()
    formData.set('price', price)
    formData.set('description', description)
    formData.set('new_images', JSON.stringify(newImages))
    formData.set('removed_images', JSON.stringify(removedImages))

    const result = await updateProductAction(product.id, formData)
    setSaving(false)

    if (result.success) {
      setMessage({ type: 'success', text: 'Ürün başarıyla güncellendi.' })
      setTimeout(() => router.push(`/product/${product.id}`), 1500)
    } else {
      setMessage({ type: 'error', text: result.error || 'Bir hata oluştu.' })
    }
  }

  const handleWithdraw = async () => {
    setWithdrawing(true)
    await withdrawProductAction(product.id)
    setWithdrawing(false)
  }

  const statusLabel: Record<string, string> = {
    pending: 'Onay Bekliyor',
    approved: 'Aktif / Piyasada',
    rejected: 'Reddedildi',
    withdrawn: 'Yayından Çekildi',
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Geri */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Dashboard
        </Link>

        {/* Başlık */}
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#AF9164] mb-2">{product.brand}</p>
          <h1 className="text-3xl font-light text-gray-900">{product.model_name}</h1>
          <p className="text-xs text-gray-400 mt-2">{product.category} · {product.condition}</p>
          <span className={`mt-3 inline-block text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
            product.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
            product.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200' :
            'bg-gray-100 text-gray-500 border-gray-200'
          }`}>
            {statusLabel[product.status] || product.status}
          </span>
        </div>

        {/* Mesaj */}
        {message && (
          <div className={`flex items-center gap-3 p-4 rounded-2xl mb-8 text-sm font-medium ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
            {message.text}
          </div>
        )}

        <div className="space-y-8">

          {/* Fiyat */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Fiyat (₺)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₺</span>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full pl-10 pr-5 py-4 border border-gray-200 rounded-2xl text-2xl font-light focus:outline-none focus:border-black transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          {/* Açıklama */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Açıklama
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={6}
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-sm font-light text-gray-800 focus:outline-none focus:border-black transition-colors resize-none leading-relaxed"
              placeholder="Ürün hakkında notlarınız..."
            />
          </div>

          {/* Fotoğraflar */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Vitrin Fotoğrafları ({images.length})
              </label>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black border border-black/10 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all"
              >
                {uploading ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                {uploading ? 'Yükleniyor...' : 'Fotoğraf Ekle'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleAddImages}
                className="hidden"
              />
            </div>

            {images.length === 0 ? (
              <div className="border-2 border-dashed border-gray-200 rounded-2xl py-12 text-center">
                <p className="text-xs text-gray-400">En az 1 fotoğraf gerekli</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                    <Image src={img} alt="" fill className="object-cover" sizes="200px" />
                    <button
                      onClick={() => handleRemoveImage(img)}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                    >
                      <X size={12} className="text-white" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-2 left-2 text-[8px] font-bold uppercase tracking-widest bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-gray-700">
                        Kapak
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Kaydet */}
          <button
            onClick={handleSave}
            disabled={saving || uploading}
            className="w-full py-4 bg-black text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#AF9164] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {saving ? <><Loader2 size={14} className="animate-spin" /> Kaydediliyor...</> : 'Değişiklikleri Kaydet'}
          </button>

          {/* Yayından Çek */}
          <div className="border border-red-100 rounded-3xl p-8 bg-red-50/30">
            <div className="flex items-start gap-4">
              <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-red-700 mb-1">İlanı Yayından Çek</h3>
                <p className="text-xs text-red-500 font-light mb-4">
                  Ürününüz yayından kaldırılır. Bu işlem admin onayı gerektirir ve geri alınabilir.
                </p>
                {!showWithdrawConfirm ? (
                  <button
                    onClick={() => setShowWithdrawConfirm(true)}
                    className="text-[10px] font-bold uppercase tracking-widest text-red-600 border border-red-200 px-5 py-2.5 rounded-full hover:bg-red-600 hover:text-white transition-all"
                  >
                    Yayından Çek
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleWithdraw}
                      disabled={withdrawing}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white bg-red-600 px-5 py-2.5 rounded-full hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                      {withdrawing ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                      Evet, Çek
                    </button>
                    <button
                      onClick={() => setShowWithdrawConfirm(false)}
                      className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 px-5 py-2.5 rounded-full hover:border-gray-400 transition-all"
                    >
                      İptal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
