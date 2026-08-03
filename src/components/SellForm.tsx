/**
 * @file SellForm.tsx
 * @description Peony Collective Lüks Ürün Satış/Konsinye Formu Bileşeni.
 * 
 * Bu bileşen kullanıcıların ve tedarikçilerin lüks ürün satışı veya konsinye talebi yapabilmesi için
 * adım adım (Step-by-step) bir form sunar. 
 * 
 * Temel Bölümler ve İşlevler:
 * 1. Kategori ve Ürün Detay Seçimi (Cinsiyet, Ana Kategori, Alt Kategori, Beden/Ebat)
 * 2. Marka, Model ve Materyal Doğrulaması (Dinamik marka/model arama ve öneri yapısı)
 * 3. Görsel ve Ekspertiz Belgelerinin Yüklenmesi (Fotoğraf ve Doğrulama Belgeleri)
 * 4. Fiyat Teklifi ve Konsinye Şartları (Fiyatlandırma, Orijinallik Belgeleri)
 */

'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { addProductAction, saveCloudDraft, loadCloudDraft, getBrandsAction, getModelsForBrandAction, getSuppliersAction, addSupplierAction } from '@/src/app/sell/actions'
import { createClient } from '@/src/utils/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, UploadCloud, Video, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react'
import {
  genders, mainCategories, brands as staticBrands, conditions,
  getModelsForBrand, getMaterialsForBrand, getMaterialsForCategoryAndBrand, getSubcategories, getSizesForSubcategory,
  type Gender, type MainCategory,
} from '@/src/utils/categoryData'

// ─── Onay Fotoğrafları Kategorileri (Entrupy Tarzı Detaylı Açı Çekimleri) ───
// ─── Onay Fotoğrafları Kategorileri (Kategoriye Özel Ekspertiz Çekim Rehberi) ───
export function getVerificationCategories(category?: string) {
  if (category === 'Ayakkabı') {
    return [
      { 
        key: 'front', 
        icon: '👠', 
        label: 'Ön & Yan Profil (Genel Simetri)', 
        desc: 'Ayakkabıları düz, aydınlık zeminde yan profilden ve üstten çekin. Formu net görünmeli.', 
        min: 1 
      },
      { 
        key: 'back', 
        icon: '👢', 
        label: 'Topuk & Arka Profil', 
        desc: 'Topuk yüksekliği, arka dikişler ve topuk ucu kondisyonunu gösteren dik çekim.', 
        min: 1 
      },
      { 
        key: 'base', 
        icon: '👟', 
        label: 'Alt Taban & Logo Baskısı', 
        desc: 'Ayakkabının alt tabanını, numara baskısını ve taban aşınmasını gösteren çekim.', 
        min: 1 
      },
      { 
        key: 'stamp', 
        icon: '🏷️', 
        label: 'İç Taban Logo & Beden Stampı', 
        desc: 'İç tabandaki altın/gümüş marka logosunu ve beden yazısını tam dikten çekin.', 
        min: 1 
      },
      { 
        key: 'serial', 
        icon: '🔢', 
        label: 'Seri Kodu / Dil Etiketi', 
        desc: 'Ayakkabı dilinin altındaki veya iç yanındaki seri numarasını/beden etiketini çekin.', 
        min: 1 
      },
      { 
        key: 'hardware', 
        icon: '🔩', 
        label: 'Tokalar, Bağcık & Metal Aksam', 
        desc: 'Varsa metal toka, fermuar, bağcık kapsülleri veya aksamların yakın çekimi.', 
        min: 1 
      },
      { 
        key: 'stitching', 
        icon: '🧵', 
        label: 'Makro Dikiş & Malzeme Dokusu', 
        desc: 'Dikiş kalitesini ve deri/kumaş dokusunu göstermek için yakın makro çekim yapın.', 
        min: 1 
      },
      { 
        key: 'receipt', 
        icon: '📦', 
        label: 'Kutu / Toz Torbası / Fatura', 
        desc: 'Varsa orijinal kutusu, toz torbaları, yedek topuk uçları veya faturası.', 
        min: 0 
      },
    ]
  }

  if (category === 'Kıyafet') {
    return [
      { 
        key: 'front', 
        icon: '👗', 
        label: 'Ön Yüz (Genel Silüet)', 
        desc: 'Kıyafeti askıda veya düz zeminde dik açıyla çekin. Tüm kesim ve gövde görünmeli.', 
        min: 1 
      },
      { 
        key: 'back', 
        icon: '🧥', 
        label: 'Arka Yüz & Dikişler', 
        desc: 'Arka yüzü ve sırt dikiş hatlarını gösteren çekim.', 
        min: 1 
      },
      { 
        key: 'base', 
        icon: '👔', 
        label: 'Yaka, Omuz & Manşet Detayları', 
        desc: 'Yaka kesimini, omuz ve kol manşet dikişlerini yakın açıyla çekin.', 
        min: 1 
      },
      { 
        key: 'stamp', 
        icon: '🏷️', 
        label: 'İç Boyun Marka Etiketi', 
        desc: 'Kıyafetin içindeki ana dikişli marka etiketini parlamasız makro çekin.', 
        min: 1 
      },
      { 
        key: 'serial', 
        icon: '🔢', 
        label: 'İç Yıkama & Malzeme Etiketi', 
        desc: 'İç yandaki % kumaş kompozisyonu ve seri numarasının bulunduğu etiket.', 
        min: 1 
      },
      { 
        key: 'hardware', 
        icon: '🔘', 
        label: 'Düğmeler, Fermuar & Metal Aksam', 
        desc: 'Logolu özel düğmeler, fermuar elciği veya aksam gravür yakın çekimi.', 
        min: 1 
      },
      { 
        key: 'stitching', 
        icon: '🧵', 
        label: 'Dikiş & Kumaş Dokusu', 
        desc: 'Kumaş dokusu, astar dikişleri ve kenar bitişlerinin makro çekimi.', 
        min: 1 
      },
      { 
        key: 'receipt', 
        icon: '📄', 
        label: 'Yedek Düğme / Fatura / Etiket', 
        desc: 'Varsa faturası, yedek düğmeleri veya orijinal kağıt etiketleri.', 
        min: 0 
      },
    ]
  }

  if (category === 'Aksesuar') {
    return [
      { 
        key: 'front', 
        icon: '🕶️', 
        label: 'Genel Görünüm (Ön Yüz)', 
        desc: 'Aksesuarı/Takıyı aydınlık zeminde tam karşıdan çekin.', 
        min: 1 
      },
      { 
        key: 'back', 
        icon: '💎', 
        label: 'Arka & Yan Detaylar', 
        desc: 'Kemer tokası arkası, gözlük sapı yanları veya takının kilit mekanizması.', 
        min: 1 
      },
      { 
        key: 'base', 
        icon: '🔒', 
        label: 'Klips / Kilit / Kemer Delikleri', 
        desc: 'Kemer delikleri, kordon tokası veya kolye kilit mekanizması çekimi.', 
        min: 1 
      },
      { 
        key: 'stamp', 
        icon: '🏷️', 
        label: 'Ayar Damgası / Logo Stampı', 
        desc: 'Takıdaki 750/18K damgası, kemer içi beden yazısı veya marka logosu.', 
        min: 1 
      },
      { 
        key: 'serial', 
        icon: '🔢', 
        label: 'Seri Numarası / Model Gravürü', 
        desc: 'Sap içindeki model kodu veya takı üzerindeki seri numara gravürü.', 
        min: 1 
      },
      { 
        key: 'hardware', 
        icon: '🔩', 
        label: 'Metal İşçilik & Vidalar', 
        desc: 'Gözlük menteşeleri, kemer toka dikişleri veya aksesuar metalleri.', 
        min: 1 
      },
      { 
        key: 'stitching', 
        icon: '✨', 
        label: 'Taş / Doku Yakın Çekimi', 
        desc: 'Taş yuvaları, mineli yüzeyler veya malzeme dokusu makro çekimi.', 
        min: 1 
      },
      { 
        key: 'receipt', 
        icon: '📦', 
        label: 'Kutu / Kese / Fatura', 
        desc: 'Varsa orijinal kutusu, derisi kesesi, garanti kartı veya faturası.', 
        min: 0 
      },
    ]
  }

  // Varsayılan: Çanta Kategorisi
  return [
    { 
      key: 'front', 
      icon: '👜', 
      label: 'Ön Yüz (Genel Simetri)', 
      desc: 'Çantayı düz, aydınlık bir zemine koyup tam karşıdan dik açıyla çekin. Tüm gövde görünmeli.', 
      min: 1 
    },
    { 
      key: 'back', 
      icon: '💼', 
      label: 'Arka Yüz (Dikiş Hizası)', 
      desc: 'Arka yüzü dik açıyla çekin. Dikiş hizası ve cep yapısı net görünmeli.', 
      min: 1 
    },
    { 
      key: 'base', 
      icon: '📐', 
      label: 'Taban & Köşeler', 
      desc: 'Çantanın alt kısmını ve köşe aşınmalarını çekin. Metal ayaklar ve taban dikişleri net olmalı.', 
      min: 1 
    },
    { 
      key: 'stamp', 
      icon: '🏷️', 
      label: 'Sıcak Baskı / İç Logo Stamp', 
      desc: 'Derideki sıcak baskı veya metal marka plakasını tam dikten, parlamasız makro çekin.', 
      min: 1 
    },
    { 
      key: 'serial', 
      icon: '🔢', 
      label: 'Seri Kodu / Date Code', 
      desc: 'İç etiketteki veya deri flaptaki seri numarasını/tarih kodunu okunaklı açıyla çekin.', 
      min: 1 
    },
    { 
      key: 'hardware', 
      icon: '🔩', 
      label: 'Metal Aksam & Gravürler', 
      desc: 'Fermuar elciği, kilit, halkanın üzerindeki gravür yazısını yakın plandan çekin.', 
      min: 1 
    },
    { 
      key: 'stitching', 
      icon: '🧵', 
      label: 'Makro Dikiş Yakın Çekimi', 
      desc: 'Dikişlerin eğim açısını göstermek için 5-10cm mesafeden makro çekin.', 
      min: 1 
    },
    { 
      key: 'receipt', 
      icon: '📄', 
      label: 'Fatura / Sertifika / Belge', 
      desc: 'Varsa orijinal fatura, kutu veya sertifika belgesi.', 
      min: 0 
    },
  ]
}

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
    <div className={`bg-white rounded-2xl border transition-all duration-500 ${isActive ? 'border-gray-300 shadow-xl shadow-black/5' : 'border-gray-100 hover:border-gray-200'}`}>
      <button 
        type="button"
        onClick={() => setActiveStep(stepNum)}
        className="w-full px-5 py-5 md:px-8 md:py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer rounded-t-2xl"
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
const FileUploadZone = ({ id, label, icon, onChange, multiple = true, accept, previews, onRemove }: any) => {
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
              {onRemove && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove(i);
                  }}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md z-10"
                >
                  <span className="text-[10px] font-bold">×</span>
                </button>
              )}
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
  const showSupplierField = true // Enabled for all accounts during testing

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

  // ─── Peony VIP (Kargo Hizmeti) & Tedarikçi ───
  const [isPeonyVip, setIsPeonyVip] = useState<boolean>(false)
  const [supplier, setSupplier] = useState('')
  const [supplierId, setSupplierId] = useState('')
  const [suppliersList, setSuppliersList] = useState<any[]>([])
  const [showNewSupplierForm, setShowNewSupplierForm] = useState(false)

  // ─── Admin Özel Kontrol State'leri ───
  const [adminStatus, setAdminStatus] = useState<'approved' | 'pending' | 'rejected' | 'sold'>('approved')
  const [sellerPayout, setSellerPayout] = useState('')
  const [isFeatured, setIsFeatured] = useState<boolean>(false)
  const [isVipExclusive, setIsVipExclusive] = useState<boolean>(false)
  const [isDealBadge, setIsDealBadge] = useState<boolean>(false)
  
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
      // Çanta dışındaki kategorilerde (Ayakkabı, Kıyafet vb.) model girmek opsiyoneldir.
      if (!selectedModel && selectedCategory === 'Çanta') errors.model = 'Çanta kategorisinde model seçimi zorunludur'
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
      getVerificationCategories(selectedCategory).forEach(cat => {
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

      const newUrls = validFiles.map(file => URL.createObjectURL(file))
      allGeneratedUrls.current.push(...newUrls)
      setFiles((prev: File[]) => [...prev, ...validFiles])
      setPreviews((prev: string[]) => [...prev, ...newUrls])
    } finally {
      setIsProcessingFiles(false)
    }
  }

  const handlePublicFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => processFiles(Array.from(e.target.files || []), publicPreviews, setPublicFiles, setPublicPreviews)
  const handleFlawFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => processFiles(Array.from(e.target.files || []), flawPreviews, setFlawFiles, setFlawPreviews)
  
  const handleRemovePublicFile = (index: number) => {
    setPublicPreviews(prev => {
      const urlToRemove = prev[index]
      if (urlToRemove) URL.revokeObjectURL(urlToRemove)
      return prev.filter((_, i) => i !== index)
    })
    setPublicFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleRemoveFlawFile = (index: number) => {
    setFlawPreviews(prev => {
      const urlToRemove = prev[index]
      if (urlToRemove) URL.revokeObjectURL(urlToRemove)
      return prev.filter((_, i) => i !== index)
    })
    setFlawFiles(prev => prev.filter((_, i) => i !== index))
  }

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

      const newUrls = validFiles.map(file => URL.createObjectURL(file))
      allGeneratedUrls.current.push(...newUrls)
      setVerificationFiles(prev => ({
        ...prev,
        [key]: [...(prev[key] || []), ...validFiles]
      }))
      setVerificationPreviews(prev => ({
        ...prev,
        [key]: [...(prev[key] || []), ...newUrls]
      }))
    } finally {
      setIsProcessingFiles(false)
    }
  }

  const handleRemoveVerificationFile = (key: string, index: number) => {
    setVerificationPreviews(prev => {
      const oldUrls = prev[key] || []
      const urlToRemove = oldUrls[index]
      if (urlToRemove) URL.revokeObjectURL(urlToRemove)
      return {
        ...prev,
        [key]: oldUrls.filter((_, i) => i !== index)
      }
    })
    setVerificationFiles(prev => {
      const oldFiles = prev[key] || []
      return {
        ...prev,
        [key]: oldFiles.filter((_, i) => i !== index)
      }
    })
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
  const categoryLabel = selectedSubcategory ? `${selectedSubcategory} ${selectedCategory || ''}`.trim() : (selectedCategory || '')
  const autoGeneratedModel = selectedBrand ? `${selectedBrand} ${categoryLabel} ${selectedSize || ''}`.replace(/\s+/g, ' ').trim() : ''
  const currentModel = selectedModel.trim() || autoGeneratedModel
  const currentMaterial = selectedMaterial === '__other__' ? customMaterial : selectedMaterial

  const filteredBrands = useMemo(() => {
    if (!brandSearchQuery) return dbBrands
    return dbBrands.filter(b => b.name.toLowerCase().includes(brandSearchQuery.toLowerCase()))
  }, [brandSearchQuery, dbBrands])

  const filteredModels = useMemo(() => {
    if (!modelSearchQuery) return dbModels
    return dbModels.filter(m => m.name.toLowerCase().includes(modelSearchQuery.toLowerCase()))
  }, [modelSearchQuery, dbModels])

  const availableMaterials = useMemo(() => getMaterialsForCategoryAndBrand(selectedCategory, currentBrand), [selectedCategory, currentBrand])
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
        video_url: videoUrl || undefined,
        status: userRole === 'admin' ? adminStatus : 'pending',
        seller_payout: sellerPayout ? parseFloat(sellerPayout) : undefined,
        is_featured: isFeatured,
        is_vip_exclusive: isVipExclusive,
        is_deal: isDealBadge
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
              {/* MARKA ALANI */}
              <div className="relative space-y-2">
                <div className="flex items-center justify-between">
                  <label className={labelClasses}>Marka</label>
                  {selectedBrand && !dbBrands.some(b => b.name.toLowerCase() === selectedBrand.toLowerCase()) && (
                    <span className="text-[9px] font-bold text-[#AF9164] bg-[#AF9164]/10 border border-[#AF9164]/20 px-2 py-0.5 rounded uppercase">
                      ✦ Özel Marka
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    className={getInputClasses('brand')} 
                    placeholder="Marka arayın veya yazın (örn: Hermès, Chanel)..." 
                    value={brandSearchQuery} 
                    onChange={(e) => {
                      const val = e.target.value
                      setBrandSearchQuery(val)
                      setSelectedBrand(val)
                      setSelectedModel('')
                      setModelSearchQuery('')
                    }}
                    onFocus={() => setBrandDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setBrandDropdownOpen(false), 250)}
                    required
                  />
                  {brandDropdownOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-[280px] overflow-y-auto divide-y divide-gray-50">
                      {filteredBrands.map(b => (
                        <button
                          key={b.id}
                          type="button"
                          onMouseDown={() => {
                            setSelectedBrand(b.name)
                            setBrandSearchQuery(b.name)
                            setBrandDropdownOpen(false)
                          }}
                          className="w-full text-left px-5 py-3 text-xs font-bold hover:bg-[#AF9164]/10 transition-colors uppercase tracking-wider text-gray-800 border-none cursor-pointer bg-white"
                        >
                          {b.name}
                        </button>
                      ))}

                      {/* Özel Marka Ekle Butonu */}
                      <button
                        type="button"
                        onMouseDown={() => {
                          const val = brandSearchQuery.trim() || 'Yeni Marka'
                          setSelectedBrand(val)
                          setBrandSearchQuery(val)
                          setBrandDropdownOpen(false)
                        }}
                        className="w-full text-left px-5 py-3.5 text-xs bg-[#FAF7F2] hover:bg-[#AF9164]/20 text-[#AF9164] font-bold uppercase tracking-wider border-none cursor-pointer flex items-center justify-between"
                      >
                        <span>➕ {brandSearchQuery.trim() ? `"${brandSearchQuery.trim().toUpperCase()}" Markasını Ekle` : 'Listede Olmayan Yeni Marka Gir'}</span>
                        <span className="text-[9px] bg-[#AF9164] text-white px-2 py-0.5 rounded font-mono">Özel Marka</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-400">Aradığınız marka listede yok mu?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setBrandDropdownOpen(true)
                      if (!brandSearchQuery) setBrandSearchQuery('')
                    }}
                    className="text-[#AF9164] font-bold hover:underline cursor-pointer"
                  >
                    + Yeni Marka Ekle
                  </button>
                </div>
                {renderErrorMsg('brand')}
              </div>
              
              {/* MODEL ALANI */}
              <div className="relative space-y-2">
                <div className="flex items-center justify-between">
                  <label className={labelClasses}>Model Adı</label>
                  {selectedModel && !dbModels.some(m => m.name.toLowerCase() === selectedModel.toLowerCase()) && (
                    <span className="text-[9px] font-bold text-[#AF9164] bg-[#AF9164]/10 border border-[#AF9164]/20 px-2 py-0.5 rounded uppercase">
                      ✦ Özel Model
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    className={getInputClasses('model')} 
                    placeholder={
                      !selectedBrand 
                        ? "Önce marka seçiniz veya yazınız" 
                        : selectedCategory === 'Ayakkabı' 
                        ? "İsteğe bağlı (Boş bırakırsanız örn: Chanel Topuklu 37.5 atnır)..." 
                        : "Model arayın veya yazın (örn: Birkin 30)..."
                    } 
                    value={modelSearchQuery} 
                    onChange={(e) => {
                      const val = e.target.value
                      setModelSearchQuery(val)
                      setSelectedModel(val)
                    }}
                    onFocus={() => {
                      if (selectedBrand) setModelDropdownOpen(true)
                    }}
                    onBlur={() => setTimeout(() => setModelDropdownOpen(false), 250)}
                    disabled={!selectedBrand}
                    required={selectedCategory === 'Çanta'}
                  />
                  {modelDropdownOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-[280px] overflow-y-auto divide-y divide-gray-50">
                      {filteredModels.map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onMouseDown={() => {
                            setSelectedModel(m.name)
                            setModelSearchQuery(m.name)
                            setModelDropdownOpen(false)
                          }}
                          className="w-full text-left px-5 py-3 text-xs font-bold hover:bg-[#AF9164]/10 transition-colors uppercase tracking-wider text-gray-800 border-none cursor-pointer bg-white"
                        >
                          {m.name}
                        </button>
                      ))}

                      {/* Özel Model Ekle Butonu */}
                      <button
                        type="button"
                        onMouseDown={() => {
                          const val = modelSearchQuery.trim() || 'Yeni Model'
                          setSelectedModel(val)
                          setModelSearchQuery(val)
                          setModelDropdownOpen(false)
                        }}
                        className="w-full text-left px-5 py-3.5 text-xs bg-[#FAF7F2] hover:bg-[#AF9164]/20 text-[#AF9164] font-bold uppercase tracking-wider border-none cursor-pointer flex items-center justify-between"
                      >
                        <span>➕ {modelSearchQuery.trim() ? `"${modelSearchQuery.trim().toUpperCase()}" Modelini Ekle` : 'Listede Olmayan Yeni Model Gir'}</span>
                        <span className="text-[9px] bg-[#AF9164] text-white px-2 py-0.5 rounded font-mono">Özel Model</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-400">
                    {selectedCategory === 'Ayakkabı' || selectedCategory === 'Kıyafet' || selectedCategory === 'Aksesuar' ? (
                      selectedModel.trim() ? (
                        'Özel model ismi girildi.'
                      ) : autoGeneratedModel ? (
                        <span className="text-[#AF9164] font-bold">✨ Otomatik İsim: "{autoGeneratedModel}"</span>
                      ) : (
                        'Model yazmazsanız otomatik oluşturulur.'
                      )
                    ) : (
                      'Aradığınız model listede yok mu?'
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedBrand) setModelDropdownOpen(true)
                    }}
                    className="text-[#AF9164] font-bold hover:underline cursor-pointer disabled:opacity-50"
                    disabled={!selectedBrand}
                  >
                    + Manuel Model Ekle
                  </button>
                </div>
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
                <label className={labelClasses}>
                  {selectedCategory === 'Ayakkabı' ? 'Topuk / Boyut Detayı' : 'Boyutlar (cm)'}
                </label>
                <input 
                  className={getInputClasses('dimensions')} 
                  value={formDimensions} 
                  onChange={(e) => setFormDimensions(e.target.value)} 
                  placeholder={
                    selectedCategory === 'Ayakkabı' 
                      ? 'Örn: Topuk Yüksekliği 11 cm' 
                      : selectedCategory === 'Kıyafet' 
                      ? 'Örn: Göğüs: 48cm, Boy: 70cm' 
                      : 'Örn: 30 x 22 x 16'
                  } 
                />
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
                onRemove={handleRemovePublicFile}
              />
              <FileUploadZone 
                id="flaw-files"
                label="Kusur ve Defolar"
                icon={<AlertCircle size={24} strokeWidth={1.5} />}
                accept="image/*"
                onChange={handleFlawFilesChange}
                previews={flawPreviews}
                onRemove={handleRemoveFlawFile}
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
                  Buraya yükleyeceğiniz makro fotoğraflar <strong>sitede müşterilere asla gösterilmez (gizlidir)</strong>. Sadece Peony Orijinallik Uzmanları ve <strong>Peony AI Vision Orijinallik Analiz Motoru</strong> tarafından kullanılır. Lütfen fotoğrafların net ve aydınlık çekildiğinden emin olun.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {getVerificationCategories(selectedCategory).map(cat => (
                <div key={cat.key} className={`border rounded-2xl p-5 hover:border-[#AF9164]/50 transition-all bg-white flex flex-col justify-between ${fieldErrors[cat.key] ? 'border-red-200 bg-red-50/10' : 'border-gray-200 shadow-sm'}`}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{cat.icon}</span>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-black">{cat.label}</h5>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase tracking-widest">
                        {cat.min > 0 ? 'Zorunlu' : 'Opsiyonel'}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-500 leading-relaxed mb-4 bg-gray-50 p-2.5 rounded-xl border border-gray-100 italic">
                      "{cat.desc}"
                    </p>

                    {cat.key === 'serial' && (
                      <div className="mb-4">
                        <input className={`${getInputClasses('serial')} px-3 py-2 bg-gray-50 text-center font-mono text-xs rounded-xl border border-gray-200`} value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} placeholder="Seri Kodu / Date Code..." />
                        {renderErrorMsg('serial')}
                        <p className="text-[9px] text-gray-400 text-center mt-1 italic">Kodu bulamadıysanız &apos;none&apos; yazabilirsiniz.</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-center justify-center gap-2 border border-gray-200 hover:border-black bg-gray-50 hover:bg-black text-gray-700 hover:text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all">
                      <UploadCloud size={15} /> Fotoğraf Yükle / Çek
                      <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleVerificationFilesChange(cat.key, e)} />
                    </label>
                    {renderErrorMsg(cat.key)}

                    {verificationPreviews[cat.key]?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-gray-100">
                        {verificationPreviews[cat.key].map((url, i) => (
                          <div key={i} className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 relative group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} className="w-full h-full object-cover" alt="" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemoveVerificationFile(cat.key, i);
                              }}
                              className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm z-20 opacity-90 hover:opacity-100"
                              title="Sil"
                            >
                              <span className="text-[9px] font-bold leading-none">×</span>
                            </button>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] font-bold">
                              ✓ Yüklendi
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-[9px] text-gray-400 text-center flex items-center justify-center gap-1">
                      <span>🔒 Sadece Admin & AI Vision Görür</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10 border-t border-gray-100">
              <div className="max-w-xl mx-auto space-y-6">
                
                {/* ADMIN ÖZEL YÖNETİM & KAR HESAPLAMA PANELİ */}
                {userRole === 'admin' && (
                  <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-[#AF9164]/30 space-y-6 text-left shadow-lg mb-8">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#AF9164] animate-pulse" />
                        <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#AF9164]">YÖNETİCİ KONTROL VE FİNANSAL HESAPLAMA PANELİ</h4>
                      </div>
                      <span className="text-[9px] font-bold bg-[#AF9164]/10 text-[#AF9164] border border-[#AF9164]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Admin Yetkisi
                      </span>
                    </div>

                    {/* 1. Ürün Yayın Durumu */}
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Ürün Yayın Durumu</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { key: 'approved', label: '✦ Vitrine Çıkar', desc: 'Sitede Yayında' },
                          { key: 'pending', label: '⏳ Onay Bekliyor', desc: 'İnceleme Aşamasında' },
                          { key: 'sold', label: '🏷️ Satıldı', desc: 'Vitrin Dışı / Satıldı' },
                          { key: 'rejected', label: '❌ Reddet', desc: 'Pasif İlan' }
                        ].map(item => {
                          const isSelected = adminStatus === item.key
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => setAdminStatus(item.key as any)}
                              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                                isSelected 
                                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md' 
                                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#AF9164]'
                              }`}
                            >
                              <p className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#AF9164]' : ''}`}>{item.label}</p>
                              <p className="text-[9px] text-gray-400 mt-0.5">{item.desc}</p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* 2. Fiyatlandırma & Kar Marjı Açıklamalı Hesaplayıcı */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Fiyatlandırma & Kar Marjı Hesabı</label>
                        <span className="text-[10px] text-gray-400 italic">Canlı Otomatik Hesaplama</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Müşteri Satış Fiyatı */}
                        <div className="space-y-1.5 bg-[#FAF8F5] p-4 rounded-xl border border-[#AF9164]/20">
                          <label className="text-[10px] font-bold text-[#AF9164] uppercase tracking-wider block">1. Müşteri Satış Fiyatı (TL)</label>
                          <input
                            type="number"
                            placeholder="Örn: 400000"
                            value={formPrice}
                            onChange={(e) => setFormPrice(e.target.value)}
                            className="w-full bg-white border border-gray-200 focus:border-[#AF9164] text-black font-bold px-3.5 py-2 rounded-lg text-base focus:outline-none"
                          />
                          <p className="text-[9px] text-gray-400">Sitede ziyaretçilere gösterilecek nihai satış tutarı.</p>
                        </div>

                        {/* Satıcı Hak Edişi */}
                        <div className="space-y-1.5 bg-[#FAF8F5] p-4 rounded-xl border border-[#AF9164]/20">
                          <label className="text-[10px] font-bold text-[#AF9164] uppercase tracking-wider block">2. Satıcı Hak Edişi / Maliyet (TL)</label>
                          <input
                            type="number"
                            placeholder="Örn: 300000"
                            value={sellerPayout}
                            onChange={(e) => setSellerPayout(e.target.value)}
                            className="w-full bg-white border border-gray-200 focus:border-[#AF9164] text-black font-bold px-3.5 py-2 rounded-lg text-base focus:outline-none"
                          />
                          <p className="text-[9px] text-gray-400">Satış tamamlandığında ürün sahibine ödenecek tutar.</p>
                        </div>
                      </div>

                      {/* Canlı Kar Analizi Kutusu */}
                      {(() => {
                        const priceNum = parseFloat(formPrice) || 0
                        const payoutNum = parseFloat(sellerPayout) || 0
                        const profit = priceNum - payoutNum
                        const marginPercent = priceNum > 0 ? ((profit / priceNum) * 100).toFixed(1) : '0.0'
                        const isProfitPositive = profit >= 0

                        return (
                          <div className={`p-4 rounded-xl border transition-all ${
                            priceNum > 0 && payoutNum > 0
                              ? isProfitPositive ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/60 border-red-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Platform Net Brüt Karı</p>
                                <p className={`text-2xl font-bold font-mono ${isProfitPositive ? 'text-emerald-700' : 'text-red-600'}`}>
                                  {priceNum > 0 && payoutNum > 0 
                                    ? `${profit.toLocaleString('tr-TR')} ₺` 
                                    : '0 ₺'}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-0.5">Satış Fiyatı − Satıcı Payı = Net Kazanç</p>
                              </div>

                              <div className="sm:border-l sm:border-gray-200 sm:pl-4">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Kar Marjı Oranı</p>
                                <p className={`text-2xl font-bold font-mono ${isProfitPositive ? 'text-[#AF9164]' : 'text-red-600'}`}>
                                  %{marginPercent}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-0.5">(Brüt Kar / Satış Fiyatı) × 100</p>
                              </div>
                            </div>
                          </div>
                        )
                      })()}
                    </div>

                    {/* 3. Vitrin & Özel Etiketler */}
                    <div className="space-y-2.5 pt-4 border-t border-gray-100">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Vitrin & Özel Etiketler</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${isFeatured ? 'bg-[#AF9164]/10 border-[#AF9164] text-black font-bold' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="accent-[#AF9164] w-4 h-4" />
                          <span className="text-xs">🌟 Hero Banner (Manşet)</span>
                        </label>
                        <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${isVipExclusive ? 'bg-[#AF9164]/10 border-[#AF9164] text-black font-bold' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                          <input type="checkbox" checked={isVipExclusive} onChange={(e) => setIsVipExclusive(e.target.checked)} className="accent-[#AF9164] w-4 h-4" />
                          <span className="text-xs">👑 VIP Concierge Kataloğu</span>
                        </label>
                        <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${isDealBadge ? 'bg-[#AF9164]/10 border-[#AF9164] text-black font-bold' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                          <input type="checkbox" checked={isDealBadge} onChange={(e) => setIsDealBadge(e.target.checked)} className="accent-[#AF9164] w-4 h-4" />
                          <span className="text-xs">🔥 Fırsat Ürünü Etiketi</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
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

                {/* Müşteri Komisyon & Fiyatlandırma Bloğu (Sadece Normal Müşteriler İçin Gösterilir) */}
                {userRole !== 'admin' && (
                  <>
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
                          required={userRole !== 'admin'}
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
                  </>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className={`w-full py-5 rounded-full text-sm font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    isSubmitting 
                      ? 'bg-gray-100 text-gray-400' 
                      : userRole === 'admin'
                        ? 'bg-[#1A1A1A] text-[#AF9164] border border-[#AF9164]/30 hover:bg-[#AF9164] hover:text-white shadow-xl hover:shadow-[#AF9164]/20'
                        : 'bg-black text-white hover:bg-[#AF9164] hover:shadow-2xl hover:shadow-[#AF9164]/20'
                  }`}
                >
                  {isSubmitting 
                    ? 'SİSTEME İŞLENİYOR...' 
                    : userRole === 'admin'
                      ? '✦ ÜRÜNÜ KAYDET VE YAYINLA'
                      : 'ONAYA GÖNDER'
                  }
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