'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { 
  Camera, Upload, Trash2, CheckCircle2, AlertCircle, Sparkles, 
  RefreshCw, X, ChevronRight, Eye, ShieldCheck, Layers, Maximize2, RotateCcw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface PhotoSlot {
  key: string
  labelTr: string
  labelEn: string
  required: boolean
  guideTr: string
  icon: string
  overlayType: 'bag_front' | 'bag_back' | 'stamp' | 'serial' | 'stitching' | 'hardware' | 'generic'
}

export interface CategoryAngleConfig {
  id: string
  nameTr: string
  icon: string
  slots: PhotoSlot[]
}

export const CATEGORY_ANGLE_CONFIGS: CategoryAngleConfig[] = [
  {
    id: 'bags',
    nameTr: 'Çanta',
    icon: '👜',
    slots: [
      {
        key: 'front',
        labelTr: 'Ön Yüz',
        labelEn: 'Front View',
        required: true,
        icon: '👜',
        guideTr: 'Çantayı düz, aydınlık bir zemine koyup tam karşıdan dik açıyla çekin. Tüm gövde simetrisi görünmeli.',
        overlayType: 'bag_front'
      },
      {
        key: 'back',
        labelTr: 'Arka Yüz',
        labelEn: 'Back View',
        required: true,
        icon: '💼',
        guideTr: 'Arka yüzü dik açıyla çekin. Dikiş hizası ve cep yapıları net görünmeli.',
        overlayType: 'bag_back'
      },
      {
        key: 'base',
        labelTr: 'Taban & Köşeler',
        labelEn: 'Base & Corners',
        required: true,
        icon: '📐',
        guideTr: 'Çantanın alt kısmını ve köşe aşınmalarını çekin. Metal ayaklar ve dikişler net olmalı.',
        overlayType: 'generic'
      },
      {
        key: 'stamp',
        labelTr: 'Sıcak Baskı / İç Logo',
        labelEn: 'Heat Stamp / Logo',
        required: true,
        icon: '🏷️',
        guideTr: 'Derideki sıcak baskı veya metal marka plakasını tam dikten, parlamasız makro çekin.',
        overlayType: 'stamp'
      },
      {
        key: 'serial',
        labelTr: 'Seri Kodu / Date Code',
        labelEn: 'Serial / Date Code',
        required: true,
        icon: '🔢',
        guideTr: 'İç etiketteki veya deri flaptaki seri numarasını/tarih kodunu net okunabilir açıyla çekin.',
        overlayType: 'serial'
      },
      {
        key: 'hardware',
        labelTr: 'Metal Aksam & Gravür',
        labelEn: 'Hardware & Engravings',
        required: true,
        icon: '🔩',
        guideTr: 'Fermuar elciği, kilit, kanca veya toka üzerindeki gravür yazısını yakın plandan çekin.',
        overlayType: 'hardware'
      },
      {
        key: 'stitching',
        labelTr: 'Makro Dikiş Kalıbı',
        labelEn: 'Stitching Pattern',
        required: true,
        icon: '🧵',
        guideTr: 'Dikişlerin eğim açısını (örn. Hermès 18° eğik dikişi) göstermek için 5-10cm mesafeden makro çekin.',
        overlayType: 'stitching'
      }
    ]
  },
  {
    id: 'shoes',
    nameTr: 'Ayakkabı',
    icon: '👠',
    slots: [
      {
        key: 'front',
        labelTr: 'Ön Çift Görünüm',
        labelEn: 'Front Pair',
        required: true,
        icon: '👠',
        guideTr: 'Ayakkabı çiftini yan yana koyup burnu ve üst yapıyı çekin.',
        overlayType: 'generic'
      },
      {
        key: 'sole',
        labelTr: 'Taban & Logo Baskısı',
        labelEn: 'Sole & Bottom Logo',
        required: true,
        icon: '🦶',
        guideTr: 'Tabandaki numara, marka baskısı ve yıpranma durumunu çekin.',
        overlayType: 'stamp'
      },
      {
        key: 'insole',
        labelTr: 'İç Taban & Numaratör',
        labelEn: 'Insole & Size Stamp',
        required: true,
        icon: '🏷️',
        guideTr: 'İç tabandaki yaldızlı logo baskısını dik açıdan çekin.',
        overlayType: 'stamp'
      },
      {
        key: 'heel',
        labelTr: 'Topuk & Arka Dikiş',
        labelEn: 'Heel & Back Seam',
        required: true,
        icon: '📐',
        guideTr: 'Arka topuk yüksekliği ve dikiş kalitesini çekin.',
        overlayType: 'stitching'
      }
    ]
  },
  {
    id: 'watches',
    nameTr: 'Saat & Aksesuar',
    icon: '⌚',
    slots: [
      {
        key: 'dial',
        labelTr: 'Kadran & Cam',
        labelEn: 'Dial & Glass',
        required: true,
        icon: '⌚',
        guideTr: 'Kadranı, akrep/yelkovan ve logosunu yansıma olmadan dik çekin.',
        overlayType: 'generic'
      },
      {
        key: 'caseback',
        labelTr: 'Kasa Arkası & Seri No',
        labelEn: 'Caseback & Serial',
        required: true,
        icon: '🔢',
        guideTr: 'Kasa arkasındaki seri numarasını ve gravürleri yakın plandan çekin.',
        overlayType: 'serial'
      },
      {
        key: 'clasp',
        labelTr: 'Kordon Klipsi & Logo',
        labelEn: 'Clasp & Buckle',
        required: true,
        icon: '🔩',
        guideTr: 'Klips üzerindeki marka damgası ve mezon gravürünü çekin.',
        overlayType: 'hardware'
      }
    ]
  }
]

interface AdminGuidedPhotoCaptureProps {
  productId?: string
  productTitle?: string
  onPhotosChange?: (capturedPhotos: Record<string, string>) => void
  onVisionAnalysisComplete?: (analysisResult: any) => void
}

export default function AdminGuidedPhotoCapture({
  productId,
  productTitle = 'Lüks Ürün İnceleme',
  onPhotosChange,
  onVisionAnalysisComplete
}: AdminGuidedPhotoCaptureProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>('bags')
  const [photos, setPhotos] = useState<Record<string, string>>({})
  
  // Camera Modal State
  const [activeSlot, setActiveSlot] = useState<PhotoSlot | null>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [cameraError, setCameraError] = useState<string | null>(null)
  
  // Claude Vision Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any | null>(null)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const currentConfig = CATEGORY_ANGLE_CONFIGS.find(c => c.id === selectedCatId) || CATEGORY_ANGLE_CONFIGS[0]

  // Start Camera Stream
  const startCamera = async (slot: PhotoSlot) => {
    setActiveSlot(slot)
    setIsCameraOpen(true)
    setCameraError(null)

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err: any) {
      console.error('Camera access error:', err)
      setCameraError('Kamera erişimi sağlanamadı. Lütfen kamera izinlerinizi kontrol edin veya dosya yükleme yöntemini kullanın.')
    }
  }

  // Stop Camera Stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsCameraOpen(false)
    setActiveSlot(null)
  }

  // Toggle Camera Facing Mode (Front / Back)
  const toggleFacingMode = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment'
    setFacingMode(newMode)
    if (activeSlot) {
      startCamera(activeSlot)
    }
  }

  // Capture Frame from Video Stream
  const capturePhoto = () => {
    if (!videoRef.current || !activeSlot) return

    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 1280
    canvas.height = video.videoHeight || 720

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92)

    const updated = { ...photos, [activeSlot.key]: dataUrl }
    setPhotos(updated)
    if (onPhotosChange) onPhotosChange(updated)

    stopCamera()
  }

  // Handle Direct File Upload per Slot
  const handleFileUpload = (slotKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      if (result) {
        const updated = { ...photos, [slotKey]: result }
        setPhotos(updated)
        if (onPhotosChange) onPhotosChange(updated)
      }
    }
    reader.readAsDataURL(file)
  }

  // Remove Photo for Slot
  const removePhoto = (slotKey: string) => {
    const updated = { ...photos }
    delete updated[slotKey]
    setPhotos(updated)
    if (onPhotosChange) onPhotosChange(updated)
  }

  // Run Claude Vision Authenticity Check
  const runClaudeVisionCheck = async () => {
    setIsAnalyzing(true)
    setAnalysisError(null)
    setAnalysisResult(null)

    try {
      // Collect base64 images from photos object
      const imagePayload = Object.entries(photos).map(([key, dataUrl]) => ({
        slot: key,
        dataUrl
      }))

      if (imagePayload.length === 0) {
        throw new Error('Lütfen önce en az 1 açının fotoğrafını yükleyin veya çekin.')
      }

      // If productId exists, call API, else perform direct analysis API post
      const res = await fetch('/api/vision-precheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productId || 'demo-product',
          customImages: imagePayload
        })
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Claude Vision analizi tamamlanamadı.')
      }

      setAnalysisResult(data.result)
      if (onVisionAnalysisComplete) onVisionAnalysisComplete(data.result)
    } catch (err: any) {
      console.error('Claude Vision Error:', err)
      setAnalysisError(err.message || 'Analiz sırasında bir hata oluştu.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Calculate Completion Percentage
  const requiredSlotsCount = currentConfig.slots.filter(s => s.required).length
  const completedRequiredCount = currentConfig.slots.filter(s => s.required && photos[s.key]).length
  const completionPercent = Math.round((completedRequiredCount / (requiredSlotsCount || 1)) * 100)

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-8 text-[#1A1A1A]">
      
      {/* BAŞLIK VE KATEGORİ SEÇİMİ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-[#AF9164]/15 text-[#AF9164] text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
              <ShieldCheck size={12} /> Entrupy-Style Angle Capture
            </span>
            <span className="text-xs text-gray-400 font-mono">Peony Vision AI</span>
          </div>
          <h2 className="serif-display text-2xl font-light text-black">Açı Bazlı Detaylı Fotoğraf Çekimi</h2>
          <p className="text-gray-500 text-xs mt-1">
            Peony AI Orijinallik İncelemesi için ürünü belirlenen açılardan kamerayla çekin veya dosya olarak yükleyin.
          </p>
        </div>

        {/* Kategori Tabları */}
        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl">
          {CATEGORY_ANGLE_CONFIGS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                selectedCatId === cat.id
                  ? 'bg-white text-black shadow-sm font-semibold'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameTr}</span>
            </button>
          ))}
        </div>
      </div>

      {/* İLERLEME BARI VE CLAUDE VISION İNCELE BUTONU */}
      <div className="bg-[#FBFBFA] border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-1/2 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-gray-700">Tamamlanan Açı Görselleri</span>
            <span className="font-bold text-[#AF9164]">{completedRequiredCount} / {requiredSlotsCount} Zorunlu Slot (%{completionPercent})</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#AF9164] h-full transition-all duration-500 rounded-full" 
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={runClaudeVisionCheck}
            disabled={isAnalyzing || Object.keys(photos).length === 0}
            className={`w-full md:w-auto px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
              isAnalyzing || Object.keys(photos).length === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-black text-white hover:bg-[#AF9164] shadow-black/10'
            }`}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw size={16} className="animate-spin text-[#AF9164]" />
                Peony AI Vision İncelyor...
              </>
            ) : (
              <>
                <Sparkles size={16} className="text-[#AF9164]" />
                Peony AI Orijinallik Analizi Başlat
              </>
            )}
          </button>
        </div>
      </div>

      {/* FOTOĞRAF SLOTLARI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentConfig.slots.map((slot) => {
          const hasPhoto = Boolean(photos[slot.key])
          const photoUrl = photos[slot.key]

          return (
            <div 
              key={slot.key}
              className={`relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                hasPhoto 
                  ? 'border-emerald-300 bg-emerald-50/20 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Slot Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{slot.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-black flex items-center gap-1.5">
                      {slot.labelTr}
                      {slot.required && <span className="text-red-500 font-bold text-[10px]">*</span>}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-mono">{slot.labelEn}</p>
                  </div>
                </div>

                {hasPhoto ? (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} /> Çekildi
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-medium rounded-full">
                    {slot.required ? 'Zorunlu' : 'İsteğe Bağlı'}
                  </span>
                )}
              </div>

              {/* Slot Visual Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                {hasPhoto ? (
                  <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden border border-gray-200 group bg-black/5">
                    <img 
                      src={photoUrl} 
                      alt={slot.labelTr} 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                      <button
                        onClick={() => startCamera(slot)}
                        className="p-2.5 bg-white/90 text-black rounded-full hover:bg-white transition-all cursor-pointer"
                        title="Kamerayla Yeniden Çek"
                      >
                        <Camera size={16} />
                      </button>
                      <button
                        onClick={() => removePhoto(slot.key)}
                        className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all cursor-pointer"
                        title="Fotoğrafı Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-[11px] text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                      "{slot.guideTr}"
                    </p>

                    <div className="flex gap-2">
                      {/* Live Camera Button */}
                      <button
                        onClick={() => startCamera(slot)}
                        className="flex-1 py-3 px-3 bg-black text-white hover:bg-[#AF9164] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                      >
                        <Camera size={15} />
                        <span>Kamera İle Çek</span>
                      </button>

                      {/* File Upload Button */}
                      <label className="py-3 px-3 border border-gray-200 hover:border-gray-400 bg-white text-gray-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                        <Upload size={15} />
                        <span>Yükle</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(slot.key, e)}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* CLAUDE AI VISION SONUÇ PANOLARI */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-[#1A1A1A] text-white p-6 md:p-8 rounded-3xl shadow-xl space-y-6 border border-amber-500/20"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#AF9164]/20 rounded-2xl border border-[#AF9164]/30">
                  <Sparkles className="text-[#AF9164]" size={24} />
                </div>
                <div>
                  <h3 className="serif-display text-xl text-white">Peony AI Vision Ekspertiz Raporu</h3>
                  <p className="text-xs text-gray-400">Görseller çok açılı olarak analiz edildi</p>
                </div>
              </div>

              {analysisResult.confidenceScore !== undefined && (
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-2xl">
                  <span className="text-xs text-gray-400 font-medium">Güven Skoru:</span>
                  <span className={`text-xl font-bold font-mono ${
                    analysisResult.confidenceScore >= 80 ? 'text-emerald-400' :
                    analysisResult.confidenceScore >= 50 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    %{analysisResult.confidenceScore}
                  </span>
                </div>
              )}
            </div>

            {/* AI Text Summary */}
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed font-light">
              <p className="whitespace-pre-line">{analysisResult.reasoning || analysisResult.summary || JSON.stringify(analysisResult, null, 2)}</p>
            </div>
          </motion.div>
        )}

        {analysisError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-2xl flex items-center gap-3"
          >
            <AlertCircle size={18} />
            <span>{analysisError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KAMERA ÇEKİM MODALI (ENTRUPY SILHOUETTE OVERLAY WITH WEBCAM) */}
      <AnimatePresence>
        {isCameraOpen && activeSlot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <div className="relative w-full max-w-3xl bg-black rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col">
              
              {/* Modal Header */}
              <div className="px-6 py-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activeSlot.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      {activeSlot.labelTr}
                      <span className="text-xs text-[#AF9164] font-normal">({activeSlot.labelEn})</span>
                    </h3>
                    <p className="text-[11px] text-gray-400">{activeSlot.guideTr}</p>
                  </div>
                </div>

                <button
                  onClick={stopCamera}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Stream & Overlay Canvas */}
              <div className="relative aspect-4/3 w-full bg-black overflow-hidden flex items-center justify-center">
                {cameraError ? (
                  <div className="p-8 text-center text-red-400 space-y-4">
                    <AlertCircle size={40} className="mx-auto text-red-500" />
                    <p className="text-sm">{cameraError}</p>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  </>
                )}
              </div>

              {/* Modal Controls Footer */}
              <div className="p-6 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between">
                <button
                  onClick={toggleFacingMode}
                  className="p-3 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-2xl text-xs flex items-center gap-2 transition-colors cursor-pointer"
                  title="Kamera Değiştir"
                >
                  <RotateCcw size={16} />
                  <span className="hidden sm:inline">Kamera Değiştir</span>
                </button>

                <button
                  onClick={capturePhoto}
                  disabled={Boolean(cameraError)}
                  className={`px-8 py-4 bg-[#AF9164] hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-widest rounded-2xl flex items-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-[#AF9164]/20 cursor-pointer ${
                    cameraError ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Camera size={20} />
                  <span>Fotoğrafı Çek</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
