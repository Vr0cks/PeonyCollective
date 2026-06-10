'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { addProductAction, saveCloudDraft, loadCloudDraft } from '@/src/app/sell/actions'
import { motion, AnimatePresence } from 'framer-motion'
import {
  genders, mainCategories,
  brands, conditions,
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

export default function SellForm() {
  const router = useRouter()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isDraftLoaded, setIsDraftLoaded] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)

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
  
  // ─── Diğer Text Alanları (Draft için) ───
  const [formCondition, setFormCondition] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formDimensions, setFormDimensions] = useState('')
  const [formPurchaseYear, setFormPurchaseYear] = useState('')
  const [formPrice, setFormPrice] = useState('')
  const [serialNumber, setSerialNumber] = useState('')

  // ─── YENİ: Görünmez Kusurlar ve Raporlama (Faz 3) ───
  const [odorScore, setOdorScore] = useState<string>('10') // 10 = Kokusuz
  const [hasSpaTreatment, setHasSpaTreatment] = useState<boolean>(false)
  const [fullSetItems, setFullSetItems] = useState<string[]>([])

  // ─── Görseller & Önizlemeler ───
  const [publicFiles, setPublicFiles] = useState<File[]>([])
  const [publicPreviews, setPublicPreviews] = useState<string[]>([])
  
  const [flawFiles, setFlawFiles] = useState<File[]>([])
  const [flawPreviews, setFlawPreviews] = useState<string[]>([])

  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)

  const [verificationFiles, setVerificationFiles] = useState<Record<string, File[]>>({
    logo: [], stitching: [], hardware: [], serial: [], receipt: [],
  })
  const [verificationPreviews, setVerificationPreviews] = useState<Record<string, string[]>>({
    logo: [], stitching: [], hardware: [], serial: [], receipt: [],
  })

  const allGeneratedUrls = useRef<string[]>([])

  // ─── Cloud Draft Yükleme ───
  useEffect(() => {
    async function load() {
      const { success, draft } = await loadCloudDraft()
      if (success && draft) {
        if (draft.selectedGender) setSelectedGender(draft.selectedGender)
        if (draft.selectedCategory) setSelectedCategory(draft.selectedCategory)
        if (draft.selectedSubcategory) setSelectedSubcategory(draft.selectedSubcategory)
        if (draft.selectedSize) setSelectedSize(draft.selectedSize)
        if (draft.selectedBrand) setSelectedBrand(draft.selectedBrand)
        if (draft.customBrand) setCustomBrand(draft.customBrand)
        if (draft.selectedModel) setSelectedModel(draft.selectedModel)
        if (draft.customModel) setCustomModel(draft.customModel)
        if (draft.selectedMaterial) setSelectedMaterial(draft.selectedMaterial)
        if (draft.customMaterial) setCustomMaterial(draft.customMaterial)
        if (draft.formCondition) setFormCondition(draft.formCondition)
        if (draft.formDescription) setFormDescription(draft.formDescription)
        if (draft.formDimensions) setFormDimensions(draft.formDimensions)
        if (draft.formPurchaseYear) setFormPurchaseYear(draft.formPurchaseYear)
        if (draft.formPrice) setFormPrice(draft.formPrice)
        if (draft.serialNumber) setSerialNumber(draft.serialNumber)
        if (draft.odorScore) setOdorScore(draft.odorScore)
        if (draft.hasSpaTreatment !== undefined) setHasSpaTreatment(draft.hasSpaTreatment)
        if (draft.fullSetItems) setFullSetItems(draft.fullSetItems)
      }
      setIsDraftLoaded(true)
    }
    load()
  }, [])

  // ─── Cloud Draft Manuel Kaydetme ───
  const handleSaveDraft = async () => {
    setIsSavingDraft(true)
    const draft = {
      selectedGender, selectedCategory, selectedSubcategory, selectedSize,
      selectedBrand, customBrand, selectedModel, customModel,
      selectedMaterial, customMaterial, formCondition, formDescription,
      formDimensions, formPurchaseYear, formPrice, serialNumber,
      odorScore, hasSpaTreatment, fullSetItems
    }
    await saveCloudDraft(draft)
    setIsSavingDraft(false)
    setMessage('Taslak başarıyla buluta kaydedildi.')
    setTimeout(() => setMessage(''), 3000)
  }

  const handlePublicFilesChange = (rawFiles: File[]) => {
    const validFiles = rawFiles.filter(f => ALLOWED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE)
    publicPreviews.forEach(url => URL.revokeObjectURL(url))
    const newUrls = validFiles.map(file => URL.createObjectURL(file))
    allGeneratedUrls.current.push(...newUrls)
    setPublicFiles(validFiles)
    setPublicPreviews(newUrls)
  }

  const handleFlawFilesChange = (rawFiles: File[]) => {
    const validFiles = rawFiles.filter(f => ALLOWED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE)
    flawPreviews.forEach(url => URL.revokeObjectURL(url))
    const newUrls = validFiles.map(file => URL.createObjectURL(file))
    allGeneratedUrls.current.push(...newUrls)
    setFlawFiles(validFiles)
    setFlawPreviews(newUrls)
  }

  const handleVideoFileChange = (file: File | null) => {
    if (!file) return
    if (file.size > 50 * 1024 * 1024) {
      alert("Video 50MB'dan büyük olamaz.")
      return
    }
    if (videoPreview) URL.revokeObjectURL(videoPreview)
    const url = URL.createObjectURL(file)
    allGeneratedUrls.current.push(url)
    setVideoFile(file)
    setVideoPreview(url)
  }

  const handleVerificationFilesChange = (key: string, rawFiles: File[]) => {
    const validFiles = rawFiles.filter(f => ALLOWED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE)
    const oldUrls = verificationPreviews[key] || []
    oldUrls.forEach(url => URL.revokeObjectURL(url))
    const newUrls = validFiles.map(file => URL.createObjectURL(file))
    allGeneratedUrls.current.push(...newUrls)
    setVerificationFiles(prev => ({ ...prev, [key]: validFiles }))
    setVerificationPreviews(prev => ({ ...prev, [key]: newUrls }))
  }

  useEffect(() => {
    return () => {
      allGeneratedUrls.current.forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

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

  const inputClasses = "px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-gray-900 font-medium transition-all w-full"
  const labelClasses = "text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1"
  const cardClasses = "py-4 px-5 border rounded-xl text-center transition-all cursor-pointer select-none"
  const activeCardClasses = "border-black bg-black text-white"
  const inactiveCardClasses = "border-gray-200 text-gray-500 hover:border-gray-400"

  const toggleFullSetItem = (item: string) => {
    setFullSetItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('Güvenlik filtrelerinden geçiliyor ve dosyalar yükleniyor...')

    try {
      const formData = new FormData()
      formData.append('gender', selectedGender)
      formData.append('category', selectedCategory)
      formData.append('subcategory', selectedSubcategory)
      if (selectedSize) formData.append('size', selectedSize)
      formData.append('brand', currentBrand)
      formData.append('model_name', currentModel)
      formData.append('description', formDescription)
      formData.append('price', formPrice)
      formData.append('condition', formCondition)
      if (currentMaterial) formData.append('material', currentMaterial)
      if (formDimensions) formData.append('dimensions', formDimensions)
      if (formPurchaseYear) formData.append('purchase_year', formPurchaseYear)
      if (serialNumber) formData.append('serial_number', serialNumber)
      
      // Faz 3 Eklemeleri
      formData.append('odor_score', odorScore)
      formData.append('has_spa_treatment', hasSpaTreatment.toString())
      fullSetItems.forEach(item => formData.append('full_set_items', item))

      publicFiles.forEach(f => formData.append('public_images', f))
      flawFiles.forEach(f => formData.append('flaw_images', f))
      
      if (videoFile) formData.append('video', videoFile)

      Object.values(verificationFiles).forEach(files => {
        files.forEach(f => formData.append('authenticity_docs', f))
      })

      const result = await addProductAction(formData)

      if (result.success) {
        saveCloudDraft({}) // Clear draft
        router.push('/sell?message=Ürün başarıyla onaya gönderildi.')
      } else {
        setMessage(`Hata: ${result.error}`)
        setIsSubmitting(false)
      }
    } catch (error: any) {
      setMessage(`Hata: ${error.message}`)
      setIsSubmitting(false)
    }
  }

  const categoryStep = !selectedGender ? 1 : !selectedCategory ? 2 : !selectedSubcategory ? 3 : (availableSizes.length > 0 && !selectedSize) ? 4 : 5

  if (!isDraftLoaded) return <div className="p-8 text-center text-xs">Yükleniyor...</div>

  return (
    <form onSubmit={handleSubmit} className="space-y-10 relative">
      
      {/* Cloud Draft Butonları */}
      <div className="absolute top-0 right-0 flex gap-4">
        <button 
          type="button" 
          onClick={handleSaveDraft}
          disabled={isSavingDraft}
          className="text-[10px] text-[#AF9164] font-bold uppercase tracking-widest hover:text-black transition-all"
        >
          {isSavingDraft ? 'Kaydediliyor...' : 'Taslağı Buluta Kaydet'}
        </button>
      </div>

      {message && <div className="p-4 bg-zinc-900 text-white text-center text-xs font-bold rounded-xl animate-pulse">{message}</div>}

      <section className="space-y-6">
        <h3 className="text-sm font-bold border-l-2 border-[#AF9164] pl-3 uppercase tracking-tighter">Kategori Seçimi</h3>
        
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

        {selectedGender && (
          <div className="space-y-3">
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
          </div>
        )}

        {selectedCategory && availableSubcategories.length > 0 && (
          <div className="space-y-3">
            <label className={labelClasses}>Alt Kategori</label>
            <div className="flex flex-wrap gap-2">
              {availableSubcategories.map(sub => (
                <button
                  key={sub.name}
                  type="button"
                  onClick={() => { setSelectedSubcategory(sub.name); setSelectedSize('') }}
                  className={`px-4 py-2.5 border rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedSubcategory === sub.name ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedSubcategory && availableSizes.length > 0 && (
          <div className="space-y-3">
            <label className={labelClasses}>Beden</label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {selectedSubcategory && (categoryStep >= 5 || availableSizes.length === 0) && (
        <div className="space-y-10 animate-fade-in">
          <section className="space-y-6">
            <h3 className="text-sm font-bold border-l-2 border-black pl-3 uppercase tracking-tighter">1. Ürün Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelClasses}>Marka</label>
                <select className={inputClasses} value={selectedBrand} onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(''); setSelectedMaterial('') }} required>
                  <option value="">Marka Seçiniz...</option>
                  {brands.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                  <option value="__other__">Diğer (Elle Girin)</option>
                </select>
                {selectedBrand === '__other__' && <input className={`${inputClasses} mt-2`} value={customBrand} onChange={(e) => setCustomBrand(e.target.value)} placeholder="Marka adını yazın..." required />}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClasses}>Model</label>
                {availableModels.length > 0 ? (
                  <>
                    <select className={inputClasses} value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} required>
                      <option value="">Model Seçiniz...</option>
                      {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                      <option value="__other__">Diğer (Elle Girin)</option>
                    </select>
                    {selectedModel === '__other__' && <input className={`${inputClasses} mt-2`} value={customModel} onChange={(e) => setCustomModel(e.target.value)} placeholder="Model adını yazın..." required />}
                  </>
                ) : (
                  <input className={inputClasses} value={customModel} onChange={(e) => setCustomModel(e.target.value)} placeholder="Model adını yazın..." required />
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClasses}>Kondisyon</label>
                <select className={inputClasses} value={formCondition} onChange={(e) => setFormCondition(e.target.value)} required>
                  <option value="">Seçiniz...</option>
                  {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClasses}>Materyal</label>
                <select className={inputClasses} value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
                  <option value="">Materyal Seçiniz...</option>
                  {availableMaterials.map(m => <option key={m} value={m}>{m}</option>)}
                  <option value="__other__">Diğer (Elle Girin)</option>
                </select>
                {selectedMaterial === '__other__' && <input className={`${inputClasses} mt-2`} value={customMaterial} onChange={(e) => setCustomMaterial(e.target.value)} placeholder="Materyal adını yazın..." />}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClasses}>Ürün Hikayesi / Açıklama</label>
              <textarea className={`${inputClasses} min-h-[100px]`} value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="Ürünün kondisyonu ve hikayesi..." required />
            </div>
          </section>

          {/* FAZ 3: Görünmez Kusurlar ve Raporlama */}
          <section className="space-y-6 bg-[#AF9164]/5 p-6 rounded-2xl border border-[#AF9164]/20">
            <h3 className="text-sm font-bold border-l-2 border-[#AF9164] pl-3 uppercase tracking-tighter text-[#AF9164]">Görünmez Kusurlar & Kutu İçeriği</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-800">Koku ve Rutubet Skoru (1-10)</label>
                <p className="text-[10px] text-gray-500 mb-2">Eski ve vintage ürünlerde koku şeffaflığı şarttır. (10: Tamamen Kokusuz, 1: Ağır Koku)</p>
                <input type="range" min="1" max="10" value={odorScore} onChange={(e) => setOdorScore(e.target.value)} className="w-full accent-[#AF9164]" />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold"><span>Ağır Koku (1)</span><span className="text-[#AF9164] text-lg">{odorScore}</span><span>Kokusuz (10)</span></div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-800">Spa veya Tamir Geçmişi (3. Parti)</label>
                <p className="text-[10px] text-gray-500 mb-2">Çanta markanın kendi atölyesi dışında hiç bakım/boya gördü mü?</p>
                <label className="flex items-center gap-3 cursor-pointer mt-2">
                  <input type="checkbox" checked={hasSpaTreatment} onChange={(e) => setHasSpaTreatment(e.target.checked)} className="w-5 h-5 accent-red-600 rounded" />
                  <span className={`text-xs font-bold ${hasSpaTreatment ? 'text-red-600' : 'text-gray-600'}`}>Evet, 3. Parti Spa/Boya gördü</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#AF9164]/10">
              <label className="text-xs font-bold text-gray-800 block mb-3">Kutu İçeriği (Full Set Checklist)</label>
              <div className="flex flex-wrap gap-3">
                {['Kutu', 'Toz Torbası', 'Orijinal Fatura', 'Orijinallik Kartı', 'Şerit/Kurdele', 'Yağmurluk', 'Anahtar/Kilit'].map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleFullSetItem(item)}
                    className={`px-4 py-2 border rounded-full text-[10px] font-bold uppercase transition-all ${
                      fullSetItems.includes(item) ? 'bg-[#AF9164] text-white border-[#AF9164]' : 'bg-white text-gray-500 border-gray-300 hover:border-[#AF9164]'
                    }`}
                  >
                    {item} {fullSetItems.includes(item) && '✓'}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-sm font-bold border-l-2 border-black pl-3 uppercase tracking-tighter">2. Teknik Özellikler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelClasses}>Boyutlar</label>
                <input className={inputClasses} value={formDimensions} onChange={(e) => setFormDimensions(e.target.value)} placeholder="30 x 22 x 16 cm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClasses}>Satın Alındığı Yıl</label>
                <input type="number" className={inputClasses} value={formPurchaseYear} onChange={(e) => setFormPurchaseYear(e.target.value)} placeholder="2023" />
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-sm font-bold border-l-2 border-black pl-3 uppercase tracking-tighter">3. Medya Galeri (EXIF Gizlilik Korumalı)</h3>
            
            {/* Tanıtım Videosu */}
            <div className="bg-blue-50 p-6 rounded-2xl border border-dashed border-blue-200">
              <label className="text-xs font-bold text-blue-800 block mb-2">ÜRÜN VİDEOSU (Opsiyonel)</label>
              <p className="text-[10px] text-blue-600 mb-4">Ürünün 360 derece veya doğal ışıktaki görünümünü yükleyin (Maksimum 50MB, mp4/webm).</p>
              <input type="file" accept="video/mp4,video/webm" className="w-full text-xs text-blue-800" onChange={(e) => handleVideoFileChange(e.target.files?.[0] || null)} />
              {videoPreview && (
                <div className="mt-4 w-32 rounded-lg overflow-hidden bg-black aspect-[4/5]">
                  <video src={videoPreview} className="w-full h-full object-cover" muted autoPlay loop />
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
              <label className="text-xs font-bold block mb-2">VİTRİN FOTOĞRAFLARI</label>
              <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/heic" className="w-full text-xs" onChange={(e) => handlePublicFilesChange(Array.from(e.target.files || []))} required />
              {publicPreviews.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {publicPreviews.map((url, i) => (
                    <div key={i} className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={url} className="w-full h-full object-cover" alt={`Vitrin ${i + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-red-50 p-6 rounded-2xl border border-dashed border-red-200">
              <label className="text-xs font-bold text-red-800 block mb-2">KUSURLAR VE DEFOLAR</label>
              <input type="file" multiple accept="image/*" className="w-full text-xs text-red-800" onChange={(e) => handleFlawFilesChange(Array.from(e.target.files || []))} />
              {flawPreviews.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {flawPreviews.map((url, i) => (
                    <div key={i} className="w-16 h-16 rounded-lg overflow-hidden bg-red-100 border border-red-200">
                      <img src={url} className="w-full h-full object-cover" alt={`Defo ${i + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl text-white space-y-6">
              <div>
                <label className="text-xs font-bold block mb-1 uppercase tracking-widest text-zinc-400">Onay Fotoğrafları & Belgeler (Gizli)</label>
              </div>

              {verificationCategories.map(cat => (
                <div key={cat.key} className="bg-zinc-800 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{cat.label}</h4>
                      <p className="text-[10px] text-zinc-500">{cat.desc}</p>
                    </div>
                  </div>
                  {cat.key === 'serial' && (
                    <div className="flex flex-col gap-1.5">
                      <input className="px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#AF9164] transition-all" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} placeholder="Seri Numarası..." required />
                    </div>
                  )}
                  <input type="file" multiple accept="image/*" className="w-full text-xs file:bg-white file:text-black file:rounded file:px-4 file:py-2 file:border-0 file:cursor-pointer" onChange={(e) => handleVerificationFilesChange(cat.key, Array.from(e.target.files || []))} required={cat.min > 0} />
                  {verificationPreviews[cat.key]?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {verificationPreviews[cat.key].map((url, i) => (
                        <div key={i} className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-700 border border-zinc-600">
                          <img src={url} className="w-full h-full object-cover" alt={`${cat.label} ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col gap-1.5">
              <label className={labelClasses}>Satış Fiyatı (TL)</label>
              <input type="number" className={`${inputClasses} text-xl font-bold`} value={formPrice} onChange={(e) => setFormPrice(e.target.value)} placeholder="00.000" required />
            </div>
            <button type="submit" disabled={isSubmitting} className={`h-[56px] mt-4 rounded-xl font-bold uppercase tracking-widest transition-all cursor-pointer ${isSubmitting ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:scale-[1.02] shadow-xl'}`}>
              {isSubmitting ? 'GÜVENLİ YÜKLENİYOR...' : 'ONAYA GÖNDER'}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}