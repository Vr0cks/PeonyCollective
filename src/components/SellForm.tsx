'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { addProductAction, saveCloudDraft, loadCloudDraft, getBrandsAction, getModelsForBrandAction, getSuppliersAction, addSupplierAction } from '@/src/app/sell/actions'
import { createClient } from '@/src/utils/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, UploadCloud, Video, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react'
import {
  genders, mainCategories, brands as staticBrands, conditions,
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

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/jpg', 'image/heif'];

const isFileTypeAllowed = (file: File) => {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  if (ALLOWED_TYPES.includes(type)) return true;
  return name.endsWith('.jpg') || 
         name.endsWith('.jpeg') || 
         name.endsWith('.png') || 
         name.endsWith('.webp') || 
         name.endsWith('.heic') || 
         name.endsWith('.heif');
};

// ─── Accordion Komponenti ───
const StepAccordion = ({ stepNum, title, desc, children, activeStep, setActiveStep, onNext }: { stepNum: number, title: string, desc: string, children: React.ReactNode, activeStep: number, setActiveStep: (n: number) => void, onNext?: () => void }) => {
  const isActive = activeStep === stepNum
  const isCompleted = activeStep > stepNum

  return (
    <div className={`bg-white rounded-2xl overflow-hidden border transition-all duration-500 ${isActive ? 'border-gray-300 shadow-xl shadow-black/5' : 'border-gray-100 hover:border-gray-200'}`}>
      <button 
        type="button"
        onClick={() => setActiveStep(stepNum)}
        className="w-full px-5 py-5 md:px-8 md:py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
      >
        <div className="flex items-center gap-4 md:gap-6">
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
            <div className="px-5 pb-6 pt-2 md:px-8 md:pb-8 border-t border-gray-50">
              {children}
              
              {/* Sonraki Adım Butonu */}
              {stepNum < 4 && (
                <div className="mt-10 flex justify-end">
                  <button 
                    type="button" 
                    onClick={() => onNext ? onNext() : setActiveStep(stepNum + 1)}
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

export default function SellForm({ userEmail, userRole }: { userEmail?: string, userRole?: string }) {
  const router = useRouter()
  
  const ALLOWED_EMAILS = [
    'ahmetcanli1943@gmail.com',
    'designer_7150@peony.com',
    'ela@peonycollective.com',
    'rabiakacar86@gmail.com',
    'info@peonycollective.com'
  ]
  const showSupplierField = userRole === 'admin' || (userEmail && ALLOWED_EMAILS.includes(userEmail.toLowerCase()))

  const [activeStep, setActiveStep] = useState<number>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessingFiles, setIsProcessingFiles] = useState(false)
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
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [customMaterial, setCustomMaterial] = useState('')

  // Dynamic Brands & Models States
  const [dbBrands, setDbBrands] = useState<{ id: string; name: string }[]>([])
  const [dbModels, setDbModels] = useState<{ id: string; name: string }[]>([])
  const [brandSearchQuery, setBrandSearchQuery] = useState('')
  const [modelSearchQuery, setModelSearchQuery] = useState('')
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false)
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false)
  
  // ─── Diğer Text Alanları ───
  const [formCondition, setFormCondition] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formDimensions, setFormDimensions] = useState('')
  const [formPurchaseYear, setFormPurchaseYear] = useState('')
  const [isFirstOwner, setIsFirstOwner] = useState<boolean>(false)
  const [formPrice, setFormPrice] = useState('')
  const [serialNumber, setSerialNumber] = useState('')

  // ─── Görünmez Kusurlar ve Raporlama ───
  const [odorScore, setOdorScore] = useState<string>('10')
  const [hasSpaTreatment, setHasSpaTreatment] = useState<boolean>(false)
  const [fullSetItems, setFullSetItems] = useState<string[]>([])

  // ─── Peony VIP (Kargo Hizmeti) ───
  const [isPeonyVip, setIsPeonyVip] = useState<boolean>(false)
  const [supplier, setSupplier] = useState('')
  const [supplierId, setSupplierId] = useState('')
  const [suppliersList, setSuppliersList] = useState<any[]>([])
  const [showNewSupplierForm, setShowNewSupplierForm] = useState(false)
  
  // New Supplier fields
  const [newSupName, setNewSupName] = useState('')
  const [newSupEmail, setNewSupEmail] = useState('')
  const [newSupPhone, setNewSupPhone] = useState('')
  const [newSupAddress, setNewSupAddress] = useState('')
  const [newSupIban, setNewSupIban] = useState('')
  const [newSupTckn, setNewSupTckn] = useState('')
  const [newSupVkn, setNewSupVkn] = useState('')
  const [newSupCompanyTitle, setNewSupCompanyTitle] = useState('')
  const [newSupType, setNewSupType] = useState<'bireysel' | 'kurumsal'>('bireysel')
  const [isAddingSupplier, setIsAddingSupplier] = useState(false)
  const [supplierError, setSupplierError] = useState('')

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

  // ─── İleri Adım Validasyonu & Hata Gösterimi ───
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateStep = (step: number) => {
    const errors: Record<string, string> = {}
    
    if (step === 1) {
      if (!selectedGender) errors.gender = 'Lütfen cinsiyet seçin'
      if (!selectedCategory) errors.category = 'Lütfen kategori seçin'
      if (availableSubcategories.length > 0 && !selectedSubcategory) errors.subcategory = 'Lütfen alt kategori seçin'
      if (selectedSubcategory && availableSizes.length > 0 && !selectedSize) errors.size = 'Lütfen beden seçin'
      if (!selectedBrand) errors.brand = 'Marka seçimi zorunludur'
      if (!selectedModel) errors.model = 'Model seçimi zorunludur'
    } else if (step === 2) {
      if (!formCondition) errors.condition = 'Kondisyon zorunludur'
      if (!formDescription || formDescription.length < 20) errors.description = 'Açıklama çok kısa (en az 20 karakter)'
    } else if (step === 3) {
      if (publicFiles.length === 0) errors.publicFiles = 'En az 1 adet vitrin fotoğrafı yükleyin'
    } else if (step === 4) {
      if (!formPrice || isNaN(Number(formPrice)) || Number(formPrice) <= 0) {
        errors.price = 'Geçerli bir satış fiyatı belirleyin'
      }
      if (!serialNumber) {
        errors.serial = 'Seri numarası zorunludur (yoksa "none" yazın)'
      }
      
      // Her kategori için fotoğraf sayılarını denetle
      verificationCategories.forEach(cat => {
        const filesCount = verificationFiles[cat.key]?.length || 0
        if (filesCount < cat.min) {
          errors[cat.key] = `Bu alan için en az ${cat.min} fotoğraf yüklemelisiniz. (Şu an: ${filesCount})`
        }
      })
    }
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNextStep = (step: number) => {
    setMessage('')
    if (validateStep(step)) {
      setActiveStep(step + 1)
    } else {
      setMessage('Lütfen kırmızı ile işaretlenmiş eksik alanları doldurun.')
    }
  }

  // ─── Otomatik Taslak Kaydet & Yükle (Local Storage & Cloud) ───
  useEffect(() => {
    async function load() {
      // 1. Önce Local Storage kontrol et
      const localDraftRaw = localStorage.getItem('peony_sell_draft')
      let draft = null
      
      if (localDraftRaw) {
        try {
          draft = JSON.parse(localDraftRaw)
        } catch (e) {
          console.error('Local draft parse error', e)
        }
      }
      
      // 2. Local Storage yoksa Bulut taslağına git
      if (!draft) {
        const { success, draft: cloudDraft } = await loadCloudDraft()
        if (success && cloudDraft) {
          draft = cloudDraft
        }
      }

      if (draft) {
        if (draft.selectedGender) setSelectedGender(draft.selectedGender)
        if (draft.selectedCategory) setSelectedCategory(draft.selectedCategory)
        if (draft.selectedSubcategory) setSelectedSubcategory(draft.selectedSubcategory)
        if (draft.selectedSize) setSelectedSize(draft.selectedSize)
        if (draft.selectedBrand) {
          setSelectedBrand(draft.selectedBrand)
          setBrandSearchQuery(draft.selectedBrand)
        }
        if (draft.selectedModel) {
          setSelectedModel(draft.selectedModel)
          setModelSearchQuery(draft.selectedModel)
        }
        if (draft.selectedMaterial) setSelectedMaterial(draft.selectedMaterial)
        if (draft.customMaterial) setCustomMaterial(draft.customMaterial)
        if (draft.formCondition) setFormCondition(draft.formCondition)
        if (draft.formDescription) setFormDescription(draft.formDescription)
        if (draft.formDimensions) setFormDimensions(draft.formDimensions)
        if (draft.formPurchaseYear) setFormPurchaseYear(draft.formPurchaseYear)
        if (draft.isFirstOwner !== undefined) setIsFirstOwner(draft.isFirstOwner)
        if (draft.formPrice) setFormPrice(draft.formPrice)
        if (draft.serialNumber) setSerialNumber(draft.serialNumber)
        if (draft.odorScore) setOdorScore(draft.odorScore)
        if (draft.hasSpaTreatment !== undefined) setHasSpaTreatment(draft.hasSpaTreatment)
        if (draft.fullSetItems) setFullSetItems(draft.fullSetItems)
        if (draft.isPeonyVip !== undefined) setIsPeonyVip(draft.isPeonyVip)
        if (draft.supplier) setSupplier(draft.supplier)
        if (draft.supplierId) setSupplierId(draft.supplierId)
        if (draft.activeStep) setActiveStep(draft.activeStep)
      }
      setIsDraftLoaded(true)
    }
    load()
  }, [])

  // Tedarikçileri Getir
  useEffect(() => {
    async function fetchSuppliers() {
      const res = await getSuppliersAction()
      if (res.success) {
        setSuppliersList(res.suppliers || [])
      }
    }
    if (showSupplierField) {
      fetchSuppliers()
    }
  }, [showSupplierField])

  // Her değişiklikte Local Storage'a otomatik kaydet (Debounce/Autosave)
  useEffect(() => {
    if (!isDraftLoaded) return
    
    const draftData = {
      selectedGender, selectedCategory, selectedSubcategory, selectedSize,
      selectedBrand, selectedModel,
      selectedMaterial, customMaterial, formCondition, formDescription,
      formDimensions, formPurchaseYear, isFirstOwner, formPrice, serialNumber,
      odorScore, hasSpaTreatment, fullSetItems, isPeonyVip, supplier, supplierId, activeStep
    }
    
    localStorage.setItem('peony_sell_draft', JSON.stringify(draftData))
  }, [
    selectedGender, selectedCategory, selectedSubcategory, selectedSize,
    selectedBrand, selectedModel,
    selectedMaterial, customMaterial, formCondition, formDescription,
    formDimensions, formPurchaseYear, isFirstOwner, formPrice, serialNumber,
    odorScore, hasSpaTreatment, fullSetItems, isPeonyVip, supplier, activeStep,
    isDraftLoaded
  ])

  const handleSaveDraft = async () => {
    setIsSavingDraft(true)
    await saveCloudDraft({
      selectedGender, selectedCategory, selectedSubcategory, selectedSize,
      selectedBrand, selectedModel,
      selectedMaterial, customMaterial, formCondition, formDescription,
      formDimensions, formPurchaseYear, isFirstOwner, formPrice, serialNumber,
      odorScore, hasSpaTreatment, fullSetItems, isPeonyVip, supplier
    })
    setIsSavingDraft(false)
    setMessage('Taslak buluta kaydedildi.')
    setTimeout(() => setMessage(''), 3000)
  }

  // ─── HEIC to JPEG Dönüştürücü ───
  const convertHeicToJpeg = async (file: File): Promise<File> => {
    const isHeic = file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif') || file.type.toLowerCase() === 'image/heic';
    if (!isHeic) return file;
    
    try {
      const heic2any = (await import('heic2any')).default;
      const res = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.8
      });
      const blob = Array.isArray(res) ? res[0] : res;
      return new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
        type: "image/jpeg"
      });
    } catch (err) {
      console.error("HEIC conversion failed, uploading original:", err);
      return file;
    }
  };

  // ─── Dosya İşlemleri ───
  const processFiles = async (rawFiles: File[], oldPreviews: string[], setFiles: any, setPreviews: any) => {
    setIsProcessingFiles(true)
    try {
      const processedFiles = await Promise.all(rawFiles.map(convertHeicToJpeg))
      
      const validFiles: File[] = []
      const rejectedFiles: { file: File; reason: 'size' | 'type' }[] = []

      processedFiles.forEach(f => {
        const isAllowedType = isFileTypeAllowed(f)
        const isAllowedSize = f.size <= MAX_FILE_SIZE

        if (!isAllowedType) {
          rejectedFiles.push({ file: f, reason: 'type' })
        } else if (!isAllowedSize) {
          rejectedFiles.push({ file: f, reason: 'size' })
        } else {
          validFiles.push(f)
        }
      })

      if (rejectedFiles.length > 0) {
        const sizeLimitMB = Math.round(MAX_FILE_SIZE / (1024 * 1024))
        const sizeErrors = rejectedFiles.filter(r => r.reason === 'size')
        const typeErrors = rejectedFiles.filter(r => r.reason === 'type')
        
        let errorMsg = "Bazı dosyalar yüklenemedi:\n"
        if (sizeErrors.length > 0) {
          errorMsg += `- ${sizeErrors.length} dosya ${sizeLimitMB}MB boyut sınırını aşıyor.\n`
        }
        if (typeErrors.length > 0) {
          errorMsg += `- ${typeErrors.length} dosya desteklenmeyen formatta (Sadece JPG, PNG, WEBP ve HEIC desteklenir).\n`
        }
        alert(errorMsg)
      }

      oldPreviews.forEach(url => URL.revokeObjectURL(url))
      const newUrls = validFiles.map(file => URL.createObjectURL(file))
      allGeneratedUrls.current.push(...newUrls)
      setFiles(validFiles)
      setPreviews(newUrls)
    } finally {
      setIsProcessingFiles(false)
    }
  }

  const handlePublicFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => processFiles(Array.from(e.target.files || []), publicPreviews, setPublicFiles, setPublicPreviews)
  const handleFlawFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => processFiles(Array.from(e.target.files || []), flawPreviews, setFlawFiles, setFlawPreviews)
  
  const handleVerificationFilesChange = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = Array.from(e.target.files || [])
    setIsProcessingFiles(true)
    try {
      const processedFiles = await Promise.all(rawFiles.map(convertHeicToJpeg))
      
      const validFiles: File[] = []
      const rejectedFiles: { file: File; reason: 'size' | 'type' }[] = []

      processedFiles.forEach(f => {
        const isAllowedType = isFileTypeAllowed(f)
        const isAllowedSize = f.size <= MAX_FILE_SIZE

        if (!isAllowedType) {
          rejectedFiles.push({ file: f, reason: 'type' })
        } else if (!isAllowedSize) {
          rejectedFiles.push({ file: f, reason: 'size' })
        } else {
          validFiles.push(f)
        }
      })

      if (rejectedFiles.length > 0) {
        const sizeLimitMB = Math.round(MAX_FILE_SIZE / (1024 * 1024))
        const sizeErrors = rejectedFiles.filter(r => r.reason === 'size')
        const typeErrors = rejectedFiles.filter(r => r.reason === 'type')
        
        let errorMsg = "Bazı dosyalar yüklenemedi:\n"
        if (sizeErrors.length > 0) {
          errorMsg += `- ${sizeErrors.length} dosya ${sizeLimitMB}MB boyut sınırını aşıyor.\n`
        }
        if (typeErrors.length > 0) {
          errorMsg += `- ${typeErrors.length} dosya desteklenmeyen formatta (Sadece JPG, PNG, WEBP ve HEIC desteklenir).\n`
        }
        alert(errorMsg)
      }

      const oldUrls = verificationPreviews[key] || []
      oldUrls.forEach(url => URL.revokeObjectURL(url))
      const newUrls = validFiles.map(file => URL.createObjectURL(file))
      allGeneratedUrls.current.push(...newUrls)
      setVerificationFiles(prev => ({ ...prev, [key]: validFiles }))
      setVerificationPreviews(prev => ({ ...prev, [key]: newUrls }))
    } finally {
      setIsProcessingFiles(false)
    }
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

  // Load brands on mount
  useEffect(() => {
    async function loadBrands() {
      const res = await getBrandsAction()
      if (res.success && res.brands) {
        setDbBrands(res.brands)
      }
    }
    loadBrands()
  }, [])

  // Load models when selected brand changes
  useEffect(() => {
    async function loadModels() {
      if (!selectedBrand) {
        setDbModels([])
        return
      }
      const matchedBrand = dbBrands.find(b => b.name.toLowerCase() === selectedBrand.toLowerCase())
      if (matchedBrand) {
        const res = await getModelsForBrandAction(matchedBrand.id)
        if (res.success && res.models) {
          setDbModels(res.models)
        }
      } else {
        setDbModels([])
      }
    }
    loadModels()
  }, [selectedBrand, dbBrands])

  // ─── Hesaplanan Değerler ───
  const currentBrand = selectedBrand
  const currentModel = selectedModel
  const currentMaterial = selectedMaterial === '__other__' ? customMaterial : selectedMaterial

  const filteredBrands = useMemo(() => {
    if (!brandSearchQuery) return dbBrands
    return dbBrands.filter(b => b.name.toLowerCase().includes(brandSearchQuery.toLowerCase()))
  }, [brandSearchQuery, dbBrands])

  const filteredModels = useMemo(() => {
    if (!modelSearchQuery) return dbModels
    return dbModels.filter(m => m.name.toLowerCase().includes(modelSearchQuery.toLowerCase()))
  }, [modelSearchQuery, dbModels])

  const availableMaterials = useMemo(() => getMaterialsForBrand(currentBrand), [currentBrand])
  const availableSubcategories = useMemo(() => selectedCategory ? getSubcategories(selectedCategory as MainCategory) : [], [selectedCategory])
  const availableSizes = useMemo(() => selectedCategory && selectedSubcategory ? getSizesForSubcategory(selectedCategory as MainCategory, selectedSubcategory) : [], [selectedCategory, selectedSubcategory])

  const labelClasses = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3"
  
  const getInputClasses = (field: string) => {
    const isError = !!fieldErrors[field]
    return `w-full px-4 py-3.5 bg-transparent border-b ${isError ? 'border-red-500 text-red-900 placeholder-red-300' : 'border-gray-200 focus:border-black text-black placeholder-gray-300'} text-sm focus:outline-none transition-colors rounded-none`
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, react/display-name
  const renderErrorMsg = (field: string) => {
    if (!fieldErrors[field]) return null
    return <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 block">{fieldErrors[field]}</span>
  }
  const pillClasses = "px-5 py-3 border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer hover:border-black"
  const activePillClasses = "bg-black text-white border-black"

  const toggleFullSetItem = (item: string) => setFullSetItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])

  // ─── Submit ───
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('Dosyalar şifreleniyor ve yükleniyor...')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Oturum açmanız gerekiyor.")

      // Ürün görselleri (public, flaws, videos) → product-images bucket
      const uploadFile = async (file: File, folder: string) => {
        const ext = file.name.split('.').pop()
        const fileName = `${user.id}/${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`
        const { error } = await supabase.storage.from('product-images').upload(fileName, file)
        if (error) throw error
        const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
        return data.publicUrl
      }

      // Doğrulama belgeleri (logo, stitching, serial, receipt vb.) → product-docs bucket (private)
      const uploadVerificationFile = async (file: File, category: string) => {
        const ext = file.name.split('.').pop()
        const fileName = `${user.id}/${category}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`
        const { error } = await supabase.storage.from('product-docs').upload(fileName, file)
        if (error) throw error
        // product-docs private bucket — sadece signed URL ile erişilebilir
        const { data } = await supabase.storage.from('product-docs').createSignedUrl(fileName, 60 * 60 * 24 * 365 * 5) // 5 yıl
        return data?.signedUrl || fileName // fallback: path
      }

      setMessage('Vitrin fotoğrafları yükleniyor...')
      const publicUrls = await Promise.all(publicFiles.map(f => uploadFile(f, 'public')))
      
      setMessage('Kusur fotoğrafları yükleniyor...')
      const flawUrls = await Promise.all(flawFiles.map(f => uploadFile(f, 'flaws')))
      
      setMessage('Doğrulama belgeleri yükleniyor...')
      const authUrls: string[] = []
      for (const [category, files] of Object.entries(verificationFiles)) {
        for (const file of files) {
          const url = await uploadVerificationFile(file, category)
          authUrls.push(url)
        }
      }
      
      let videoUrl = null
      if (videoFile) {
        setMessage('Video yükleniyor...')
        videoUrl = await uploadFile(videoFile, 'videos')
      }

      setMessage('Veriler işleniyor...')
      const payload = {
        gender: selectedGender,
        category: selectedCategory,
        subcategory: selectedSubcategory,
        size: selectedSize || undefined,
        brand: currentBrand,
        model_name: currentModel,
        description: formDescription + (isFirstOwner ? '\n\nNot: Ürünün ilk sahibiyim.' : ''),
        price: parseFloat(formPrice) || 0,
        condition: formCondition,
        material: currentMaterial || undefined,
        dimensions: formDimensions || undefined,
        purchase_year: formPurchaseYear && formPurchaseYear !== 'hatirlamiyorum' ? parseInt(formPurchaseYear) : undefined,
        serial_number: serialNumber || undefined,
        odor_score: odorScore ? parseInt(odorScore) : undefined,
        has_spa_treatment: hasSpaTreatment,
        is_peony_vip: isPeonyVip,
        supplier: supplier || undefined,
        supplier_id: supplierId || undefined,
        full_set_items: fullSetItems,
        public_images: publicUrls,
        authenticity_docs: authUrls,
        flaw_images: flawUrls,
        video_url: videoUrl || undefined
      }

      const result = await addProductAction(payload as any)

      if (result.success) {
        saveCloudDraft({}) 
        localStorage.removeItem('peony_sell_draft')
        router.push('/dashboard?message=Ürün başarıyla onaya gönderildi.')
      } else {
        console.error("Validation Errors:", result.validationErrors)
        if (result.validationErrors) {
          const errors = Object.values(result.validationErrors).flat().join(' | ')
          setMessage(`Eksik/Hatalı Bilgi: ${errors}`)
        } else {
          setMessage(`Hata: ${result.error}`)
        }
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
        <StepAccordion stepNum={1} title="Ürün Kimliği" desc="Kategori, Marka ve Model Bilgileri" activeStep={activeStep} setActiveStep={setActiveStep} onNext={() => handleNextStep(1)}>
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
                  {renderErrorMsg('gender')}
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
                  {renderErrorMsg('category')}
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
                    {renderErrorMsg('size')}
                  </div>
                )}
              </div>
            )}

            {/* Marka & Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-50">
              <div className="relative">
                <label className={labelClasses}>Marka</label>
                <input 
                  type="text" 
                  className={getInputClasses('brand')} 
                  placeholder="Marka arayın (örn: Hermès, Chanel)..." 
                  value={brandSearchQuery} 
                  onChange={(e) => {
                    setBrandSearchQuery(e.target.value)
                    setSelectedBrand('')
                    setSelectedModel('')
                    setModelSearchQuery('')
                  }}
                  onFocus={() => setBrandDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setBrandDropdownOpen(false), 200)}
                  required
                />
                {brandDropdownOpen && filteredBrands.length > 0 && (
                  <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredBrands.map(b => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setSelectedBrand(b.name)
                          setBrandSearchQuery(b.name)
                          setBrandDropdownOpen(false)
                        }}
                        className="w-full text-left px-4 py-3 text-xs hover:bg-[#AF9164]/10 transition-colors uppercase tracking-wider text-gray-800 border-none cursor-pointer bg-white"
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                )}
                {renderErrorMsg('brand')}
              </div>
              
              <div className="relative">
                <label className={labelClasses}>Model Adı</label>
                <input 
                  type="text" 
                  className={getInputClasses('model')} 
                  placeholder={selectedBrand ? "Model arayın (örn: Birkin 30)..." : "Önce marka seçiniz"} 
                  value={modelSearchQuery} 
                  onChange={(e) => {
                    setModelSearchQuery(e.target.value)
                    setSelectedModel('')
                  }}
                  onFocus={() => {
                    if (selectedBrand) setModelDropdownOpen(true)
                  }}
                  onBlur={() => setTimeout(() => setModelDropdownOpen(false), 200)}
                  disabled={!selectedBrand}
                  required
                />
                {modelDropdownOpen && filteredModels.length > 0 && (
                  <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredModels.map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedModel(m.name)
                          setModelSearchQuery(m.name)
                          setModelDropdownOpen(false)
                        }}
                        className="w-full text-left px-4 py-3 text-xs hover:bg-[#AF9164]/10 transition-colors uppercase tracking-wider text-gray-800 border-none cursor-pointer bg-white"
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                )}
                {renderErrorMsg('model')}
              </div>
            </div>
          </div>
        </StepAccordion>

        {/* ADIM 2: KONDİSYON */}
        <StepAccordion stepNum={2} title="Kondisyon & Hikaye" desc="Ürünün Geçmişi ve Kusurları" activeStep={activeStep} setActiveStep={setActiveStep} onNext={() => handleNextStep(2)}>
          <div className="space-y-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelClasses}>Kondisyon Seviyesi</label>
                <select className={getInputClasses('condition')} value={formCondition} onChange={(e) => setFormCondition(e.target.value)} required>
                  <option value="" disabled>Seçiniz</option>
                  {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {renderErrorMsg('condition')}
              </div>
              <div>
                <label className={labelClasses}>Materyal</label>
                <select className={getInputClasses('material')} value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
                  <option value="" disabled>Seçiniz</option>
                  {availableMaterials.map(m => <option key={m} value={m}>{m}</option>)}
                  <option value="__other__">Diğer</option>
                </select>
                {selectedMaterial === '__other__' && <input className={`${getInputClasses('material')} mt-4`} value={customMaterial} onChange={(e) => setCustomMaterial(e.target.value)} placeholder="Örn: Togo Deri" />}
              </div>
            </div>

            <div>
              <label className={labelClasses}>Ürün Hikayesi / Açıklama</label>
              <textarea className={`${getInputClasses('description')} resize-none h-32 leading-relaxed`} value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="Ürününüzün hikayesini, ne sıklıkla kullanıldığını ve göze çarpan detaylarını buraya yazın..." required />
              {renderErrorMsg('description')}
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
                <input className={getInputClasses('dimensions')} value={formDimensions} onChange={(e) => setFormDimensions(e.target.value)} placeholder="Örn: 30 x 22 x 16" />
              </div>
              <div>
                <label className={labelClasses}>Satın Alındığı Yıl</label>
                <select className={getInputClasses('purchase_year')} value={formPurchaseYear} onChange={(e) => setFormPurchaseYear(e.target.value)}>
                  <option value="" disabled>Seçiniz</option>
                  <option value="hatirlamiyorum">Hatırlamıyorum</option>
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-8">
              <label className="flex items-start gap-4 cursor-pointer group">
                <input type="checkbox" className="hidden" checked={isFirstOwner} onChange={(e) => setIsFirstOwner(e.target.checked)} />
                <div className={`w-6 h-6 shrink-0 rounded border flex items-center justify-center transition-colors mt-0.5 ${isFirstOwner ? 'bg-black border-black text-white' : 'border-gray-300 group-hover:border-black text-transparent'}`}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900 block">Ürünün ilk sahibiyim</span>
                  <span className="text-xs text-gray-500">Ürünü mağazadan sıfır olarak kendim satın aldım.</span>
                </div>
              </label>
            </div>

          </div>
        </StepAccordion>

        {/* ADIM 3: MEDYA */}
        <StepAccordion stepNum={3} title="Medya Galerisi" desc="Vitrin Fotoğrafları ve Video" activeStep={activeStep} setActiveStep={setActiveStep} onNext={() => handleNextStep(3)}>
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
                <div key={cat.key} className={`border rounded-xl p-5 hover:border-gray-200 transition-colors ${fieldErrors[cat.key] ? 'border-red-200 bg-red-50/10' : 'border-gray-100'}`}>
                  <div className="mb-4">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-black mb-1">{cat.label}</h5>
                    <p className="text-[10px] text-gray-400">{cat.desc}</p>
                  </div>
                  
                  {cat.key === 'serial' && (
                    <div className="mb-4">
                      <input className={`${getInputClasses('serial')} px-0 bg-transparent text-center`} value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} placeholder="Seri Kodu..." />
                      {renderErrorMsg('serial')}
                      <p className="text-[9px] text-gray-400 text-center mt-2 italic">Kodu bulamadıysanız &apos;none&apos; yazabilirsiniz.</p>
                    </div>
                  )}

                  <label className="flex items-center justify-center gap-2 border border-gray-200 hover:border-black text-gray-500 hover:text-black py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors">
                    <UploadCloud size={14} /> Fotoğraf Seç
                    <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleVerificationFilesChange(cat.key, e)} />
                  </label>
                  {renderErrorMsg(cat.key)}

                  {verificationPreviews[cat.key]?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {verificationPreviews[cat.key].map((url, i) => (
                        <div key={i} className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
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
                
                {/* Tedarikçi Bilgisi */}
                {showSupplierField && (
                  <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl space-y-4 text-left">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Tedarikçi Seçin</label>
                      <select
                        className="w-full text-sm py-2.5 px-4 bg-white border border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                        value={supplierId}
                        onChange={(e) => {
                          const val = e.target.value
                          if (val === 'new') {
                            setShowNewSupplierForm(true)
                            setSupplierId('')
                            setSupplier('')
                          } else {
                            setShowNewSupplierForm(false)
                            setSupplierId(val)
                            const found = suppliersList.find(s => s.id === val)
                            setSupplier(found ? found.name : '')
                          }
                        }}
                      >
                        <option value="">Seçiniz (İsteğe Bağlı)</option>
                        {suppliersList.map((sup) => (
                          <option key={sup.id} value={sup.id}>{sup.name}</option>
                        ))}
                        <option value="new" className="font-bold text-[#AF9164]">+ Yeni Tedarikçi Ekle</option>
                      </select>
                    </div>

                    {showNewSupplierForm && (
                      <div className="bg-white border border-gray-200 p-4 rounded-lg space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#AF9164] border-b border-gray-100 pb-1.5">Yeni Tedarikçi Kartı</h4>
                        
                        {supplierError && (
                          <p className="text-xs text-red-500 font-medium">{supplierError}</p>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-400 font-bold uppercase">Ad Soyad / Unvan</label>
                            <input
                              type="text"
                              className="w-full text-xs py-2 px-3 border border-gray-200 rounded focus:border-black focus:outline-none"
                              value={newSupName}
                              onChange={(e) => setNewSupName(e.target.value)}
                              placeholder="Tedarikçi A"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-400 font-bold uppercase">E-posta</label>
                            <input
                              type="email"
                              className="w-full text-xs py-2 px-3 border border-gray-200 rounded focus:border-black focus:outline-none"
                              value={newSupEmail}
                              onChange={(e) => setNewSupEmail(e.target.value)}
                              placeholder="eposta@peony.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-400 font-bold uppercase">Telefon</label>
                            <input
                              type="text"
                              className="w-full text-xs py-2 px-3 border border-gray-200 rounded focus:border-black focus:outline-none"
                              value={newSupPhone}
                              onChange={(e) => setNewSupPhone(e.target.value)}
                              placeholder="053..."
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-400 font-bold uppercase">IBAN</label>
                            <input
                              type="text"
                              className="w-full text-xs py-2 px-3 border border-gray-200 rounded focus:border-black focus:outline-none uppercase"
                              value={newSupIban}
                              onChange={(e) => setNewSupIban(e.target.value)}
                              placeholder="TR..."
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-400 font-bold uppercase">Adres</label>
                          <textarea
                            className="w-full text-xs py-2 px-3 border border-gray-200 rounded focus:border-black focus:outline-none"
                            value={newSupAddress}
                            onChange={(e) => setNewSupAddress(e.target.value)}
                            placeholder="Tedarikçi adresi..."
                            rows={2}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-400 font-bold uppercase">Tedarikçi Türü</label>
                            <select
                              className="w-full text-xs py-2 px-3 border border-gray-200 rounded focus:border-black focus:outline-none bg-white"
                              value={newSupType}
                              onChange={(e) => setNewSupType(e.target.value as any)}
                            >
                              <option value="bireysel">Bireysel</option>
                              <option value="kurumsal">Kurumsal (Firma)</option>
                            </select>
                          </div>
                          {newSupType === 'bireysel' ? (
                            <div className="space-y-1">
                              <label className="text-[9px] text-gray-400 font-bold uppercase">TC Kimlik No</label>
                              <input
                                type="text"
                                className="w-full text-xs py-2 px-3 border border-gray-200 rounded focus:border-black focus:outline-none"
                                value={newSupTckn}
                                onChange={(e) => setNewSupTckn(e.target.value)}
                                placeholder="11 haneli TCKN"
                                maxLength={11}
                              />
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <label className="text-[9px] text-gray-400 font-bold uppercase">Vergi No (VKN)</label>
                              <input
                                type="text"
                                className="w-full text-xs py-2 px-3 border border-gray-200 rounded focus:border-black focus:outline-none"
                                value={newSupVkn}
                                onChange={(e) => setNewSupVkn(e.target.value)}
                                placeholder="10 haneli VKN"
                                maxLength={10}
                              />
                            </div>
                          )}
                        </div>

                        {newSupType === 'kurumsal' && (
                          <div className="space-y-1">
                            <label className="text-[9px] text-gray-400 font-bold uppercase">Şirket Resmi Unvanı</label>
                            <input
                              type="text"
                              className="w-full text-xs py-2 px-3 border border-gray-200 rounded focus:border-black focus:outline-none"
                              value={newSupCompanyTitle}
                              onChange={(e) => setNewSupCompanyTitle(e.target.value)}
                              placeholder="Resmi Şirket Unvanı A.Ş."
                            />
                          </div>
                        )}

                        <button
                          type="button"
                          className="w-full mt-2 bg-black hover:bg-zinc-800 text-white font-bold py-2 rounded text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                          disabled={isAddingSupplier}
                          onClick={async () => {
                            if (!newSupName || !newSupIban) {
                              setSupplierError('Lütfen Tedarikçi Adı ve IBAN alanlarını doldurun.')
                              return
                            }
                            if (!newSupIban.toUpperCase().startsWith('TR') || newSupIban.replace(/\s+/g, '').length !== 26) {
                              setSupplierError('IBAN numarası geçersiz (TR ile başlamalı ve 26 hane olmalıdır).')
                              return
                            }
                            setIsAddingSupplier(true)
                            setSupplierError('')
                            const res = await addSupplierAction({
                              name: newSupName,
                              email: newSupEmail,
                              phone: newSupPhone,
                              address: newSupAddress,
                              iban: newSupIban,
                              tckn: newSupTckn || undefined,
                              vkn: newSupVkn || undefined,
                              company_title: newSupCompanyTitle || undefined,
                              submerchant_type: newSupType
                            })
                            setIsAddingSupplier(false)
                            if (res.success && res.supplier) {
                              setSuppliersList(prev => [...prev, res.supplier].sort((a,b) => a.name.localeCompare(b.name)))
                              setSupplierId(res.supplier.id)
                              setSupplier(res.supplier.name)
                              setShowNewSupplierForm(false)
                              
                              // Reset fields
                              setNewSupName('')
                              setNewSupEmail('')
                              setNewSupPhone('')
                              setNewSupAddress('')
                              setNewSupIban('')
                              setNewSupTckn('')
                              setNewSupVkn('')
                              setNewSupCompanyTitle('')
                            } else {
                              setSupplierError(res.error || 'Tedarikçi eklenirken bir hata oluştu.')
                            }
                          }}
                        >
                          {isAddingSupplier ? 'Kaydediliyor...' : 'Tedarikçiyi Kaydet ve Seç'}
                        </button>
                      </div>
                    )}

                    <p className="text-[10px] text-gray-500 leading-relaxed font-light block mt-2 border-t border-gray-200 pt-2">
                      Kayıtlı bir tedarikçi seçildiğinde, PayTR split payment ödemesi doğrudan bu tedarikçinin IBAN'ına yönlendirilir (%63 Tedarikçi / %37 Peony).
                    </p>
                  </div>
                )}

                {/* Peony VIP Toggle */}
                {(!showSupplierField || !supplier) && (
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
                )}

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
                  {renderErrorMsg('price')}
                  
                  {formPrice && !isNaN(Number(formPrice)) && Number(formPrice) > 0 && (
                    <div className="mt-6">
                      {showSupplierField && supplier ? (
                        <div className="p-5 rounded-xl border border-black bg-black text-white text-center">
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">{supplier} Payı (%63)</p>
                          <p className="text-2xl serif-display">{(Number(formPrice) * 0.63).toLocaleString('tr-TR')} ₺</p>
                          <p className="text-[9px] opacity-50 mt-1.5">%37 Peony Komisyonu ({(Number(formPrice) * 0.37).toLocaleString('tr-TR')} ₺)</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          <div className={`p-4 rounded-xl border ${!isPeonyVip ? 'border-black bg-black text-white' : 'border-gray-200 bg-gray-50'}`}>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Standart Kazanç</p>
                            <p className="text-xl serif-display">{(Number(formPrice) * 0.8).toLocaleString('tr-TR')} ₺</p>
                            <p className="text-[9px] opacity-50 mt-1">%20 Komisyon</p>
                          </div>
                          <div className={`p-4 rounded-xl border ${isPeonyVip ? 'border-[#AF9164] bg-[#AF9164] text-white' : 'border-[#AF9164]/20 bg-[#AF9164]/5'}`}>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">VIP Kazanç</p>
                            <p className="text-xl serif-display">{(Number(formPrice) * 0.7).toLocaleString('tr-TR')} ₺</p>
                            <p className="text-[9px] opacity-70 mt-1">%30 Komisyon (Kargo Bizden)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
      
      {isProcessingFiles && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center animate-fade-in">
          <div className="bg-white p-8 rounded-3xl text-center max-w-sm mx-4 shadow-2xl border border-gray-100 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-[#AF9164]/20 border-t-[#AF9164] animate-spin"></div>
            <div>
              <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">Fotoğraflar İşleniyor</p>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Yüksek çözünürlüklü veya HEIC formatındaki fotoğraflarınız tarayıcı uyumlu JPEG formatına dönüştürülüyor. Bu işlem birkaç saniye sürebilir, lütfen bekleyin.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}