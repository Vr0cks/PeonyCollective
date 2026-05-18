'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/src/utils/supabase/client'
import { addProduct } from '@/src/app/sell/actions'
import { motion, AnimatePresence } from 'framer-motion'
import {
  genders, mainCategories, categoryTree,
  brands, conditions, generalMaterials,
  getModelsForBrand, getMaterialsForBrand,
  getSubcategories, getSizesForSubcategory,
  type Gender, type MainCategory,
} from '@/src/utils/categoryData'

// ─── Onay Fotoğrafları Kategorileri ───
const verificationCategories = [
  { key: 'logo', label: 'Logo Detayı', desc: '3 farklı açıdan logonun yakın çekimi', min: 3 },
  { key: 'stitching', label: 'Dikiş Detayı', desc: '3 farklı açıdan dikiş kalitesi', min: 3 },
  { key: 'hardware', label: 'Donanım / Metal Aksam', desc: '3 farklı açıdan fermuar, toka, zincir', min: 3 },
  { key: 'serial', label: 'Seri No / Date Code', desc: 'Kodun fotoğrafı (en az 1 adet)', min: 1 },
  { key: 'receipt', label: 'Fatura / Garanti Belgesi', desc: 'İsteğe bağlı belge yükleme', min: 0 },
]

export default function SellForm() {
  const router = useRouter()
  const supabase = createClient()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  // ─── Kategori State'leri ───
  const [selectedGender, setSelectedGender] = useState<Gender | ''>('')
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | ''>('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  // ─── Marka / Model State'leri ───
  const [selectedBrand, setSelectedBrand] = useState('')
  const [customBrand, setCustomBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [customModel, setCustomModel] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [customMaterial, setCustomMaterial] = useState('')

  // ─── Gizli Kod (Onay bölümünde) ───
  const [serialNumber, setSerialNumber] = useState('')

  // ─── Görseller ───
  const [publicFiles, setPublicFiles] = useState<File[]>([])
  const [verificationFiles, setVerificationFiles] = useState<Record<string, File[]>>({
    logo: [], stitching: [], hardware: [], serial: [], receipt: [],
  })

  // ─── Computed Values ───
  const currentBrand = selectedBrand === '__other__' ? customBrand : selectedBrand
  const currentModel = selectedModel === '__other__' ? customModel : selectedModel
  const currentMaterial = selectedMaterial === '__other__' ? customMaterial : selectedMaterial

  const availableModels = useMemo(() => getModelsForBrand(currentBrand), [currentBrand])
  const availableMaterials = useMemo(() => getMaterialsForBrand(currentBrand), [currentBrand])
  const availableSubcategories = useMemo(() => {
    if (!selectedCategory) return []
    return getSubcategories(selectedCategory as MainCategory)
  }, [selectedCategory])
  const availableSizes = useMemo(() => {
    if (!selectedCategory || !selectedSubcategory) return []
    return getSizesForSubcategory(selectedCategory as MainCategory, selectedSubcategory)
  }, [selectedCategory, selectedSubcategory])

  const inputClasses = "px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-gray-900 font-medium transition-all"
  const labelClasses = "text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1"
  const cardClasses = "py-4 px-5 border rounded-xl text-center transition-all cursor-pointer select-none"
  const activeCardClasses = "border-black bg-black text-white"
  const inactiveCardClasses = "border-gray-200 text-gray-500 hover:border-gray-400"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('İşleniyor...')

    try {
      const formData = new FormData(e.currentTarget)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Oturum bulunamadı")

      // Fotoğraf yükleme
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

      setMessage('Vitrin fotoğrafları yükleniyor...')
      const publicUrls = await uploadImages(publicFiles, 'public')
      
      setMessage('Onay belgeleri yükleniyor...')
      const allAuthFiles: File[] = []
      for (const key of Object.keys(verificationFiles)) {
        allAuthFiles.push(...verificationFiles[key])
      }
      const authUrls = await uploadImages(allAuthFiles, 'verification')

      setMessage('Veriler kaydediliyor...')
      const result = await addProduct({
        gender: selectedGender,
        category: selectedCategory,
        subcategory: selectedSubcategory,
        size: selectedSize || undefined,
        brand: currentBrand,
        model_name: currentModel,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        condition: formData.get('condition') as string,
        material: currentMaterial,
        dimensions: formData.get('dimensions') as string,
        purchase_year: parseInt(formData.get('purchase_year') as string),
        serial_number: serialNumber,
        public_images: publicUrls,
        authenticity_docs: authUrls,
      })

      if (result?.error) {
        setMessage(`Hata: ${result.error}`)
        setIsSubmitting(false)
        return
      }

      router.push('/sell?message=Ürün başarıyla onaya gönderildi.')
    } catch (error: any) {
      setMessage(`Hata: ${error.message}`)
      setIsSubmitting(false)
    }
  }

  // ─── Kategori seçim adımını belirle ───
  const categoryStep = !selectedGender ? 1 : !selectedCategory ? 2 : !selectedSubcategory ? 3 : (availableSizes.length > 0 && !selectedSize) ? 4 : 5

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {message && <div className="p-4 bg-zinc-900 text-white text-center text-xs font-bold rounded-xl animate-pulse">{message}</div>}

      {/* ═══════════════════════════════════════════
          BÖLÜM 0: KATEGORİ AĞACI (Dolap Benzeri)
          ═══════════════════════════════════════════ */}
      <section className="space-y-6">
        <h3 className="text-sm font-bold border-l-2 border-[#AF9164] pl-3 uppercase tracking-tighter">Kategori Seçimi</h3>
        
        {/* Adım 1: Cinsiyet */}
        <div className="space-y-3">
          <label className={labelClasses}>Cinsiyet</label>
          <div className="grid grid-cols-3 gap-3">
            {genders.map(g => (
              <button
                key={g.value}
                type="button"
                onClick={() => { setSelectedGender(g.value); setSelectedCategory(''); setSelectedSubcategory(''); setSelectedSize('') }}
                className={`${cardClasses} ${selectedGender === g.value ? activeCardClasses : inactiveCardClasses}`}
              >
                <span className="text-2xl block mb-1">{g.icon}</span>
                <span className="text-xs font-bold">{g.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Adım 2: Ana Kategori */}
        <AnimatePresence>
          {selectedGender && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
            >
              <label className={labelClasses}>Ürün Tipi</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mainCategories.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => { setSelectedCategory(c.value); setSelectedSubcategory(''); setSelectedSize('') }}
                    className={`${cardClasses} ${selectedCategory === c.value ? activeCardClasses : inactiveCardClasses}`}
                  >
                    <span className="text-2xl block mb-1">{c.icon}</span>
                    <span className="text-xs font-bold">{c.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Adım 3: Alt Kategori */}
        <AnimatePresence>
          {selectedCategory && availableSubcategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
            >
              <label className={labelClasses}>Alt Kategori</label>
              <div className="flex flex-wrap gap-2">
                {availableSubcategories.map(sub => (
                  <button
                    key={sub.name}
                    type="button"
                    onClick={() => { setSelectedSubcategory(sub.name); setSelectedSize('') }}
                    className={`px-4 py-2.5 border rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedSubcategory === sub.name
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 text-gray-500 hover:border-gray-400'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Adım 4: Beden (varsa) */}
        <AnimatePresence>
          {selectedSubcategory && availableSizes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
            >
              <label className={labelClasses}>Beden</label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 text-gray-500 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Seçim Özeti */}
        {selectedSubcategory && (
          <div className="bg-gray-50 px-4 py-3 rounded-xl text-xs text-gray-500 flex flex-wrap gap-2 items-center">
            <span className="font-bold text-black">{selectedGender}</span>
            <span>›</span>
            <span className="font-bold text-black">{selectedCategory}</span>
            <span>›</span>
            <span className="font-bold text-black">{selectedSubcategory}</span>
            {selectedSize && (
              <>
                <span>›</span>
                <span className="font-bold text-[#AF9164]">Beden: {selectedSize}</span>
              </>
            )}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════
          Kategori seçildikten sonra asıl form göster
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedSubcategory && (categoryStep >= 5 || availableSizes.length === 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {/* ═══ BÖLÜM 1: TEMEL BİLGİLER ═══ */}
            <section className="space-y-6">
              <h3 className="text-sm font-bold border-l-2 border-black pl-3 uppercase tracking-tighter">1. Ürün Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Marka — Akıllı Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClasses}>Marka</label>
                  <select
                    className={inputClasses}
                    value={selectedBrand}
                    onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(''); setSelectedMaterial('') }}
                    required
                  >
                    <option value="">Marka Seçiniz...</option>
                    {brands.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                    <option value="__other__">Diğer (Elle Girin)</option>
                  </select>
                  {selectedBrand === '__other__' && (
                    <input
                      className={`${inputClasses} mt-2`}
                      value={customBrand}
                      onChange={(e) => setCustomBrand(e.target.value)}
                      placeholder="Marka adını yazın..."
                      required
                    />
                  )}
                </div>

                {/* Model — Markaya Göre Otomatik Liste */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClasses}>Model</label>
                  {availableModels.length > 0 ? (
                    <>
                      <select
                        className={inputClasses}
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        required
                      >
                        <option value="">Model Seçiniz...</option>
                        {availableModels.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                        <option value="__other__">Diğer (Elle Girin)</option>
                      </select>
                      {selectedModel === '__other__' && (
                        <input
                          className={`${inputClasses} mt-2`}
                          value={customModel}
                          onChange={(e) => setCustomModel(e.target.value)}
                          placeholder="Model adını yazın..."
                          required
                        />
                      )}
                    </>
                  ) : (
                    <input
                      className={inputClasses}
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      placeholder="Model adını yazın..."
                      required
                    />
                  )}
                </div>

                {/* Kondisyon */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClasses}>Kondisyon</label>
                  <select className={inputClasses} name="condition" required>
                    <option value="">Seçiniz...</option>
                    {conditions.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Materyal — Markaya Göre Otomatik Liste */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClasses}>Materyal</label>
                  <select
                    className={inputClasses}
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  >
                    <option value="">Materyal Seçiniz...</option>
                    {availableMaterials.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                    <option value="__other__">Diğer (Elle Girin)</option>
                  </select>
                  {selectedMaterial === '__other__' && (
                    <input
                      className={`${inputClasses} mt-2`}
                      value={customMaterial}
                      onChange={(e) => setCustomMaterial(e.target.value)}
                      placeholder="Materyal adını yazın..."
                    />
                  )}
                </div>
              </div>

              {/* Açıklama */}
              <div className="flex flex-col gap-1.5">
                <label className={labelClasses}>Ürün Hikayesi / Açıklama</label>
                <textarea className={`${inputClasses} min-h-[100px]`} name="description" placeholder="Ürünün kondisyonu ve hikayesi..." required />
              </div>
            </section>

            {/* ═══ BÖLÜM 2: TEKNİK DETAYLAR ═══ */}
            <section className="space-y-6">
              <h3 className="text-sm font-bold border-l-2 border-black pl-3 uppercase tracking-tighter">2. Teknik Özellikler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={labelClasses}>Boyutlar</label>
                  <input className={inputClasses} name="dimensions" placeholder="30 x 22 x 16 cm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClasses}>Satın Alındığı Yıl</label>
                  <input type="number" className={inputClasses} name="purchase_year" placeholder="2023" />
                </div>
              </div>
            </section>

            {/* ═══ BÖLÜM 3: FOTOĞRAFLAR ═══ */}
            <section className="space-y-8">
              <h3 className="text-sm font-bold border-l-2 border-black pl-3 uppercase tracking-tighter">3. Medya Galeri</h3>
              
              {/* Vitrin Fotoğrafları */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
                <label className="text-xs font-bold block mb-2">VİTRİN FOTOĞRAFLARI</label>
                <p className="text-[10px] text-gray-400 mb-4">Müşterilerin göreceği profesyonel ürün fotoğrafları.</p>
                <input type="file" multiple accept="image/*" className="w-full text-xs" onChange={(e) => setPublicFiles(Array.from(e.target.files || []))} required />
                {publicFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {publicFiles.map((f, i) => (
                      <div key={i} className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" alt={`Vitrin ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Onay Fotoğrafları — Kategorize Edilmiş */}
              <div className="bg-zinc-900 p-6 rounded-2xl text-white space-y-6">
                <div>
                  <label className="text-xs font-bold block mb-1 uppercase tracking-widest text-zinc-400">Onay Fotoğrafları & Belgeler (Gizli)</label>
                  <p className="text-[10px] text-zinc-500">AI denetimi için her detaydan en az 3 farklı açıdan fotoğraf yükleyin.</p>
                </div>

                {verificationCategories.map(cat => (
                  <div key={cat.key} className="bg-zinc-800 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white">{cat.label}</h4>
                        <p className="text-[10px] text-zinc-500">{cat.desc}</p>
                      </div>
                      <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        verificationFiles[cat.key]?.length >= cat.min
                          ? 'bg-green-500/20 text-green-400'
                          : cat.min > 0
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-zinc-700 text-zinc-500'
                      }`}>
                        {verificationFiles[cat.key]?.length || 0} / {cat.min === 0 ? 'Opsiyonel' : `min ${cat.min}`}
                      </div>
                    </div>

                    {/* Seri No bölümünde kod giriş alanı */}
                    {cat.key === 'serial' && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Seri Numarası / Date Code</label>
                        <input
                          className="px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#AF9164] transition-all placeholder-zinc-500"
                          value={serialNumber}
                          onChange={(e) => setSerialNumber(e.target.value)}
                          placeholder="Ürünün içindeki kodu girin..."
                          required
                        />
                      </div>
                    )}

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="w-full text-xs file:bg-white file:text-black file:rounded file:px-4 file:py-2 file:mr-4 file:border-0 file:cursor-pointer"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        setVerificationFiles(prev => ({ ...prev, [cat.key]: files }))
                      }}
                      required={cat.min > 0}
                    />

                    {/* Küçük Önizleme */}
                    {verificationFiles[cat.key]?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {verificationFiles[cat.key].map((f, i) => (
                          <div key={i} className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-700 border border-zinc-600">
                            <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" alt={`${cat.label} ${i + 1}`} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ═══ FİYAT VE GÖNDER ═══ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col gap-1.5">
                <label className={labelClasses}>Satış Fiyatı (TL)</label>
                <input type="number" className={`${inputClasses} text-xl font-bold`} name="price" placeholder="00.000" required />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`h-[56px] mt-4 rounded-xl font-bold uppercase tracking-widest transition-all cursor-pointer ${isSubmitting ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:scale-[1.02] shadow-xl'}`}
              >
                {isSubmitting ? 'YÜKLENİYOR...' : 'ONAYA GÖNDER'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}