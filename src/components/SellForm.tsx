'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { addProductAction, saveCloudDraft, loadCloudDraft } from '@/src/app/sell/actions'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, UploadCloud, Video, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react'
import {
  genders, mainCategories, brands, conditions,
  getModelsForBrand, getMaterialsForBrand, getSubcategories, getSizesForSubcategory,
  type Gender, type MainCategory,
} from '@/src/utils/categoryData'

// ─── Onay Fotoğrafları Kategorileri ───
const verificationCategories = [
  { key: 'logo', label: 'Logo Detayı', desc: '3 farklı açıdan logonun yakın çekimi', min: 3 },
  { key: 'stitching', label: 'Dikiş Detayı', desc: '3 farklı açıdan dikiş kalitesi', min: 3 },
  { key: 'hardware', label: 'Metal Aksam', desc: '3 farklı açıdan fermuar, toka', min: 3 },
  { key: 'serial', label: 'Seri Numarası', desc: 'Kodun okunaklı fotoğrafı', min: 1 },
  { key: 'receipt', label: 'Fatura / Belge', desc: 'İsteğe bağlı belge', min: 0 },
]

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

// ─── Accordion Komponenti ───
const StepAccordion = ({ stepNum, title, desc, children, activeStep, setActiveStep }: { stepNum: number, title: string, desc: string, children: React.ReactNode, activeStep: number, setActiveStep: (n: number) => void }) => {
  const isActive = activeStep === stepNum
  const isCompleted = activeStep > stepNum

  return (
    <div className={`bg-white rounded-2xl overflow-hidden border transition-all duration-500 ${isActive ? 'border-gray-300 shadow-xl shadow-black/5' : 'border-gray-100 hover:border-gray-200'}`}>
      <button 
        type="button"
        onClick={() => setActiveStep(stepNum)}
        className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
      >
        <div className="flex items-center gap-6">
          <span className={`text-2xl font-light ${isActive ? 'text-black' : isCompleted ? 'text-[#AF9164]' : 'text-gray-300'}`}>
            {isCompleted ? <Check size={28} /> : `0${stepNum}`}
          </span>
          <div>
            <h3 className={`text-lg serif-display tracking-wide ${isActive ? 'text-black' : 'text-gray-600'}`}>{title}</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{desc}</p>
          </div>
        </div>
        <ChevronDown className={`text-gray-400 transition-transform duration-500 ${isActive ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-8 pb-8 pt-2 border-t border-gray-50">
              {children}
              
              {/* Sonraki Adım Butonu */}
              {stepNum < 4 && (
                <div className="mt-10 flex justify-end">
                  <button 
                    type="button" 
                    onClick={() => setActiveStep(stepNum + 1)}
                    className="bg-black text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#AF9164] transition-colors cursor-pointer"
                  >
                    İleri: Adım 0{stepNum + 1}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Reusable File Upload Component ───
const FileUploadZone = ({ id, label, icon, onChange, multiple = true, accept, previews }: any) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Fake an event object to pass to the existing onChange handler
      onChange({ target: { files: e.dataTransfer.files } });
    }
  };

  return (
    <div>
      <label 
        htmlFor={id} 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`block w-full border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all group ${isDragging ? 'border-[#AF9164] bg-[#AF9164]/10' : 'border-gray-200 hover:border-[#AF9164] hover:bg-[#AF9164]/5'}`}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${isDragging ? 'bg-white text-[#AF9164]' : 'bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-[#AF9164]'}`}>
          {icon}
        </div>
        <p className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-[10px] text-gray-400">Sürükleyip bırakın veya tıklayarak seçin</p>
        <input id={id} type="file" multiple={multiple} accept={accept} onChange={onChange} className="sr-only" />
      </label>
      
      {previews?.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {previews.map((url: string, i: number) => (
            <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group">
              <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Preview" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SellForm() {
  const router = useRouter()
  
  const [activeStep, setActiveStep] = useState<number>(1)
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
  
  // ─── Diğer Text Alanları ───
  const [formCondition, setFormCondition] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formDimensions, setFormDimensions] = useState('')
  const [formPurchaseYear, setFormPurchaseYear] = useState('')
  const [formPrice, setFormPrice] = useState('')
  const [serialNumber, setSerialNumber] = useState('')

  // ─── Görünmez Kusurlar ve Raporlama ───
  const [odorScore, setOdorScore] = useState<string>('10')
  const [hasSpaTreatment, setHasSpaTreatment] = useState<boolean>(false)
  const [fullSetItems, setFullSetItems] = useState<string[]>([])

  // ─── Peony VIP (Kargo Hizmeti) ───
  const [isPeonyVip, setIsPeonyVip] = useState<boolean>(false)

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
        if (draft.isPeonyVip !== undefined) setIsPeonyVip(draft.isPeonyVip)
      }
      setIsDraftLoaded(true)
    }
    load()
  }, [])

  const handleSaveDraft = async () => {
    setIsSavingDraft(true)
    await saveCloudDraft({
      selectedGender, selectedCategory, selectedSubcategory, selectedSize,
      selectedBrand, customBrand, selectedModel, customModel,
      selectedMaterial, customMaterial, formCondition, formDescription,
      formDimensions, formPurchaseYear, formPrice, serialNumber,
      odorScore, hasSpaTreatment, fullSetItems, isPeonyVip
    })
    setIsSavingDraft(false)
    setMessage('Taslak buluta kaydedildi.')
    setTimeout(() => setMessage(''), 3000)
  }

  // ─── Dosya İşlemleri ───
  const processFiles = (rawFiles: File[], oldPreviews: string[], setFiles: any, setPreviews: any) => {
    const validFiles = rawFiles.filter(f => ALLOWED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE)
    oldPreviews.forEach(url => URL.revokeObjectURL(url))
    const newUrls = validFiles.map(file => URL.createObjectURL(file))
    allGeneratedUrls.current.push(...newUrls)
    setFiles(validFiles)
    setPreviews(newUrls)
  }

  const handlePublicFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => processFiles(Array.from(e.target.files || []), publicPreviews, setPublicFiles, setPublicPreviews)
  const handleFlawFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => processFiles(Array.from(e.target.files || []), flawPreviews, setFlawFiles, setFlawPreviews)
  
  const handleVerificationFilesChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = Array.from(e.target.files || [])
    const validFiles = rawFiles.filter(f => ALLOWED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE)
    const oldUrls = verificationPreviews[key] || []
    oldUrls.forEach(url => URL.revokeObjectURL(url))
    const newUrls = validFiles.map(file => URL.createObjectURL(file))
    allGeneratedUrls.current.push(...newUrls)
    setVerificationFiles(prev => ({ ...prev, [key]: validFiles }))
    setVerificationPreviews(prev => ({ ...prev, [key]: newUrls }))
  }

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 50 * 1024 * 1024) return alert("Video 50MB'dan büyük olamaz.")
    if (videoPreview) URL.revokeObjectURL(videoPreview)
    const url = URL.createObjectURL(file)
    allGeneratedUrls.current.push(url)
    setVideoFile(file)
    setVideoPreview(url)
  }

  useEffect(() => {
    return () => allGeneratedUrls.current.forEach(url => URL.revokeObjectURL(url))
  }, [])

  // ─── Hesaplanan Değerler ───
  const currentBrand = selectedBrand === '__other__' ? customBrand : selectedBrand
  const currentModel = selectedModel === '__other__' ? customModel : selectedModel
  const currentMaterial = selectedMaterial === '__other__' ? customMaterial : selectedMaterial

  const availableModels = useMemo(() => getModelsForBrand(currentBrand), [currentBrand])
  const availableMaterials = useMemo(() => getMaterialsForBrand(currentBrand), [currentBrand])
  const availableSubcategories = useMemo(() => selectedCategory ? getSubcategories(selectedCategory as MainCategory) : [], [selectedCategory])
  const availableSizes = useMemo(() => selectedCategory && selectedSubcategory ? getSizesForSubcategory(selectedCategory as MainCategory, selectedSubcategory) : [], [selectedCategory, selectedSubcategory])

  // ─── UI Sınıfları ───
  const inputClasses = "w-full px-4 py-3.5 bg-transparent border-b border-gray-200 focus:border-black text-sm text-black placeholder-gray-300 focus:outline-none transition-colors rounded-none"
  const labelClasses = "text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 block"
  const pillClasses = "px-5 py-3 border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer hover:border-black"
  const activePillClasses = "bg-black text-white border-black"

  const toggleFullSetItem = (item: string) => setFullSetItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])

  // ─── Submit ───
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('Dosyalar şifreleniyor ve Peony Lab\'a iletiliyor...')

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
      
      formData.append('odor_score', odorScore)
      formData.append('has_spa_treatment', hasSpaTreatment.toString())
      formData.append('is_peony_vip', isPeonyVip.toString())
      fullSetItems.forEach(item => formData.append('full_set_items', item))

      publicFiles.forEach(f => formData.append('public_images', f))
      flawFiles.forEach(f => formData.append('flaw_images', f))
      if (videoFile) formData.append('video', videoFile)

      Object.values(verificationFiles).forEach(files => {
        files.forEach(f => formData.append('authenticity_docs', f))
      })

      const result = await addProductAction(formData)

      if (result.success) {
        saveCloudDraft({}) 
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

  if (!isDraftLoaded) return <div className="py-20 text-center text-xs tracking-widest uppercase text-gray-400 animate-pulse">Sistem Yükleniyor...</div>

  return (
    <div className="relative">
      
      {/* Üst Bar: Kaydet & Mesaj */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-[10px] text-[#AF9164] font-bold uppercase tracking-widest animate-pulse">
          {message}
        </div>
        <button 
          type="button" 
          onClick={handleSaveDraft}
          disabled={isSavingDraft}
          className="text-[9px] font-bold uppercase tracking-widest border border-gray-200 px-4 py-2 rounded-full hover:border-black transition-all text-gray-500 hover:text-black"
        >
          {isSavingDraft ? 'Kaydediliyor...' : 'Taslağı Buluta Kaydet'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* ADIM 1: KİMLİK */}
        <StepAccordion stepNum={1} title="Ürün Kimliği" desc="Kategori, Marka ve Model Bilgileri" activeStep={activeStep} setActiveStep={setActiveStep}>
          <div className="space-y-10">
            {/* Cinsiyet & Kategori */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className={labelClasses}>Bölüm</label>
                <div className="flex gap-2">
                  {genders.map(g => (
                    <button key={g.value} type="button" onClick={() => setSelectedGender(g.value)} className={`${pillClasses} flex-1 ${selectedGender === g.value ? activePillClasses : ''}`}>
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
              {selectedGender && (
                <div>
                  <label className={labelClasses}>Kategori</label>
                  <div className="flex flex-wrap gap-2">
                    {mainCategories.map(c => (
                      <button key={c.value} type="button" onClick={() => setSelectedCategory(c.value)} className={`${pillClasses} ${selectedCategory === c.value ? activePillClasses : ''}`}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Alt Kategori & Beden */}
            {selectedCategory && availableSubcategories.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className={labelClasses}>Alt Kategori</label>
                  <div className="flex flex-wrap gap-2">
                    {availableSubcategories.map(sub => (
                      <button key={sub.name} type="button" onClick={() => setSelectedSubcategory(sub.name)} className={`${pillClasses} ${selectedSubcategory === sub.name ? activePillClasses : ''}`}>
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedSubcategory && availableSizes.length > 0 && (
                  <div>
                    <label className={labelClasses}>Beden / Numara</label>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map(size => (
                        <button key={size} type="button" onClick={() => setSelectedSize(size)} className={`w-12 h-12 flex items-center justify-center border rounded-full text-[10px] font-bold transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-500 hover:border-black'}`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Marka & Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-50">
              <div>
                <label className={labelClasses}>Marka</label>
                <select className={inputClasses} value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} required>
                  <option value="" disabled>Seçiniz</option>
                  {brands.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                  <option value="__other__">Diğer</option>
                </select>
                {selectedBrand === '__other__' && <input className={`${inputClasses} mt-4`} value={customBrand} onChange={(e) => setCustomBrand(e.target.value)} placeholder="Marka adını yazın" required />}
              </div>
              
              <div>
                <label className={labelClasses}>Model Adı</label>
                {availableModels.length > 0 ? (
                  <>
                    <select className={inputClasses} value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} required>
                      <option value="" disabled>Seçiniz</option>
                      {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                      <option value="__other__">Diğer</option>
                    </select>
                    {selectedModel === '__other__' && <input className={`${inputClasses} mt-4`} value={customModel} onChange={(e) => setCustomModel(e.target.value)} placeholder="Örn: Birkin 30" required />}
                  </>
                ) : (
                  <input className={inputClasses} value={customModel} onChange={(e) => setCustomModel(e.target.value)} placeholder="Örn: Classic Flap Bag" required />
                )}
              </div>
            </div>
          </div>
        </StepAccordion>

        {/* ADIM 2: KONDİSYON */}
        <StepAccordion stepNum={2} title="Kondisyon & Hikaye" desc="Ürünün Geçmişi ve Kusurları" activeStep={activeStep} setActiveStep={setActiveStep}>
          <div className="space-y-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelClasses}>Kondisyon Seviyesi</label>
                <select className={inputClasses} value={formCondition} onChange={(e) => setFormCondition(e.target.value)} required>
                  <option value="" disabled>Seçiniz</option>
                  {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClasses}>Materyal</label>
                <select className={inputClasses} value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
                  <option value="" disabled>Seçiniz</option>
                  {availableMaterials.map(m => <option key={m} value={m}>{m}</option>)}
                  <option value="__other__">Diğer</option>
                </select>
                {selectedMaterial === '__other__' && <input className={`${inputClasses} mt-4`} value={customMaterial} onChange={(e) => setCustomMaterial(e.target.value)} placeholder="Örn: Togo Deri" />}
              </div>
            </div>

            <div>
              <label className={labelClasses}>Ürün Hikayesi / Açıklama</label>
              <textarea className={`${inputClasses} resize-none h-32 leading-relaxed`} value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="Ürününüzün hikayesini, ne sıklıkla kullanıldığını ve göze çarpan detaylarını buraya yazın..." required />
            </div>

            {/* Görünmez Kusurlar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-gray-50">
              <div>
                <label className={labelClasses}>Koku Skoru</label>
                <div className="mt-4 px-2">
                  <input type="range" min="1" max="10" value={odorScore} onChange={(e) => setOdorScore(e.target.value)} className="w-full accent-black mb-3" />
                  <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    <span>Ağır (1)</span><span className="text-black text-base">{odorScore}/10</span><span>Temiz (10)</span>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClasses}>Tamir / Spa Geçmişi</label>
                <label className="flex items-start gap-4 mt-4 cursor-pointer group">
                  <input type="checkbox" className="hidden" checked={hasSpaTreatment} onChange={(e) => setHasSpaTreatment(e.target.checked)} />
                  <div className={`w-6 h-6 shrink-0 rounded border flex items-center justify-center transition-colors mt-0.5 ${hasSpaTreatment ? 'bg-black border-black text-white' : 'border-gray-300 group-hover:border-black text-transparent'}`}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-900 block">3. Parti İşlem Gördü</span>
                    <span className="text-xs text-gray-500">Çanta markanın kendi atölyesi dışında bakım veya boya işlemi gördüyse lütfen işaretleyin.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Kutu İçeriği */}
            <div className="pt-8 border-t border-gray-50">
              <div className="flex items-center justify-between">
                <label className={labelClasses}>Kutu İçeriği (Full Set)</label>
                <button 
                  type="button" 
                  onClick={() => {
                    const allItems = ['Orijinal Kutu', 'Toz Torbası', 'Fatura', 'Orijinallik Kartı', 'Şerit/Kurdele', 'Yağmurluk', 'Anahtar/Kilit'];
                    if (fullSetItems.length === allItems.length) {
                      setFullSetItems([]);
                    } else {
                      setFullSetItems(allItems);
                    }
                  }}
                  className="text-[10px] font-bold text-[#AF9164] uppercase tracking-widest hover:text-black transition-colors"
                >
                  {fullSetItems.length === 7 ? 'Tümünü Temizle' : 'Tümünü Seç'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Orijinal Kutu', 'Toz Torbası', 'Fatura', 'Orijinallik Kartı', 'Şerit/Kurdele', 'Yağmurluk', 'Anahtar/Kilit'].map(item => (
                  <button key={item} type="button" onClick={() => toggleFullSetItem(item)} className={`${pillClasses} ${fullSetItems.includes(item) ? activePillClasses : ''}`}>
                    {item} {fullSetItems.includes(item) && '✓'}
                  </button>
                ))}
              </div>
            </div>

            {/* Teknik Detaylar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
              <div>
                <label className={labelClasses}>Boyutlar (cm)</label>
                <input className={inputClasses} value={formDimensions} onChange={(e) => setFormDimensions(e.target.value)} placeholder="Örn: 30 x 22 x 16" />
              </div>
              <div>
                <label className={labelClasses}>Satın Alındığı Yıl</label>
                <input type="number" className={inputClasses} value={formPurchaseYear} onChange={(e) => setFormPurchaseYear(e.target.value)} placeholder="Örn: 2022" />
              </div>
            </div>

          </div>
        </StepAccordion>

        {/* ADIM 3: MEDYA */}
        <StepAccordion stepNum={3} title="Medya Galerisi" desc="Vitrin Fotoğrafları ve Video" activeStep={activeStep} setActiveStep={setActiveStep}>
          <div className="space-y-8">
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
              Platformumuzda yayınlanacak görseller. Lütfen doğal ışıkta ve net fotoğraflar yüklemeye özen gösterin. Tüm medyalardaki konum verileri (EXIF) sistemimiz tarafından otomatik olarak silinecektir.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadZone 
                id="public-files"
                label="Vitrin Fotoğrafları"
                icon={<Sparkles size={24} strokeWidth={1.5} />}
                accept="image/jpeg,image/png,image/webp,image/heic"
                onChange={handlePublicFilesChange}
                previews={publicPreviews}
              />
              <FileUploadZone 
                id="flaw-files"
                label="Kusur ve Defolar"
                icon={<AlertCircle size={24} strokeWidth={1.5} />}
                accept="image/*"
                onChange={handleFlawFilesChange}
                previews={flawPreviews}
              />
            </div>

            <div className="pt-6">
              <FileUploadZone 
                id="video-file"
                label="Ürün Videosu (Opsiyonel)"
                icon={<Video size={24} strokeWidth={1.5} />}
                multiple={false}
                accept="video/mp4,video/webm"
                onChange={handleVideoFileChange}
              />
              {videoPreview && (
                <div className="mt-4 w-32 rounded-xl overflow-hidden bg-black aspect-[4/5] border border-gray-200">
                  <video src={videoPreview} className="w-full h-full object-cover" muted autoPlay loop />
                </div>
              )}
            </div>
          </div>
        </StepAccordion>

        {/* ADIM 4: GİZLİ ONAY & FİYAT */}
        <StepAccordion stepNum={4} title="Orijinallik & Fiyat" desc="Peony Lab Doğrulaması" activeStep={activeStep} setActiveStep={setActiveStep}>
          <div className="space-y-10">
            
            <div className="bg-[#AF9164]/5 border border-[#AF9164]/20 p-6 rounded-2xl flex items-start gap-4">
              <ShieldCheck className="text-[#AF9164] shrink-0" size={24} strokeWidth={1.5} />
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">Peony Lab™ Gizli Doğrulama</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Buraya yükleyeceğiniz makro fotoğraflar sadece uzmanlarımız ve 3D Spektral analiz sistemimiz tarafından görülecek, sitede yayınlanmayacaktır. 
                  Lütfen istenilen detayların net olduğuna emin olun.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {verificationCategories.map(cat => (
                <div key={cat.key} className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors">
                  <div className="mb-4">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-black mb-1">{cat.label}</h5>
                    <p className="text-[10px] text-gray-400">{cat.desc}</p>
                  </div>
                  
                  {cat.key === 'serial' && (
                    <input className={`${inputClasses} mb-4 px-0 bg-transparent text-center`} value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} placeholder="Seri Kodu..." required />
                  )}

                  <label className="flex items-center justify-center gap-2 border border-gray-200 hover:border-black text-gray-500 hover:text-black py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors">
                    <UploadCloud size={14} /> Fotoğraf Seç
                    <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleVerificationFilesChange(cat.key, e)} required={cat.min > 0} />
                  </label>

                  {verificationPreviews[cat.key]?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {verificationPreviews[cat.key].map((url, i) => (
                        <div key={i} className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                          <img src={url} className="w-full h-full object-cover" alt="" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-10 border-t border-gray-100">
              <div className="max-w-md mx-auto space-y-6">
                
                {/* Peony VIP Toggle */}
                <div className="bg-[#AF9164]/5 border border-[#AF9164]/20 p-5 rounded-xl">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input type="checkbox" className="hidden" checked={isPeonyVip} onChange={(e) => setIsPeonyVip(e.target.checked)} />
                    <div className={`w-6 h-6 shrink-0 rounded border flex items-center justify-center transition-colors mt-0.5 ${isPeonyVip ? 'bg-[#AF9164] border-[#AF9164] text-white' : 'border-gray-300 group-hover:border-[#AF9164] text-transparent'}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 block mb-1">Peony VIP (Kargolamayı Biz Yapalım)</span>
                      <span className="text-xs text-gray-600 leading-relaxed block">
                        Ürününüz satıldığında lojistik süreçleriyle siz uğraşmayın. Peony ekibi adresinizden teslim alsın ve alıcıya sigortalı ulaştırsın. (Bu hizmet seçildiğinde komisyon oranınız standart %20 yerine %30 olarak hesaplanır).
                      </span>
                    </div>
                  </label>
                </div>

                <div className="text-center">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Satış Fiyatı Belirleyin (TL)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full text-center text-4xl font-light py-4 bg-transparent border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors" 
                      value={formPrice} 
                      onChange={(e) => setFormPrice(e.target.value)} 
                      placeholder="0.00" 
                      required 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-light text-gray-400">₺</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className={`w-full py-5 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${isSubmitting ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-[#AF9164] hover:shadow-2xl hover:shadow-[#AF9164]/20 cursor-pointer'}`}
                >
                  {isSubmitting ? 'SİSTEME İŞLENİYOR...' : 'ONAYA GÖNDER'}
                </button>
              </div>
            </div>

          </div>
        </StepAccordion>

      </form>
    </div>
  )
}