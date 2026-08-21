'use client'

import { useState, useEffect } from 'react'
import { X, Share, PlusSquare, Smartphone, Download, CheckCircle2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useSettings } from '@/src/context/SettingsContext'

export default function PwaInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [storeNotice, setStoreNotice] = useState<string | null>(null)
  const pathname = usePathname()
  const { language } = useSettings()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('pwa_prompt_dismissed') === 'true') return

      const userAgent = window.navigator.userAgent.toLowerCase()
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent)
      setIsIOS(isIosDevice)

      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      if (isStandalone) return

      if (pathname?.startsWith('/checkout') || pathname?.startsWith('/admin')) {
        return
      }

      if (window.innerWidth < 768) {
        const timer = setTimeout(() => {
          setShowPrompt(true)
        }, 5000)
        return () => clearTimeout(timer)
      }
    }
  }, [pathname])

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa_prompt_dismissed', 'true')
  }

  const handleStoreClick = (storeName: 'App Store' | 'Google Play') => {
    const msg = language === 'en'
      ? `Peony Collective ${storeName} application is launching soon! You can install the VIP PWA version now.`
      : `Peony Collective ${storeName} mobil uygulamamız çok yakında mağazada! Şimdilik web uygulamamızı ana ekrana ekleyebilirsiniz.`
    setStoreNotice(msg)
    setTimeout(() => setStoreNotice(null), 4000)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed inset-x-0 bottom-20 md:bottom-auto md:top-20 z-50 p-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-[#12141A] text-white rounded-3xl shadow-2xl p-5 border border-[#AF9164]/40 relative overflow-hidden max-w-sm mx-auto">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#AF9164]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <button 
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 text-zinc-400 hover:text-white transition-colors z-10 cursor-pointer p-1"
          aria-label="Close prompt"
        >
          <X size={16} />
        </button>

        <div className="flex gap-3.5 items-start relative z-10">
          <div className="w-12 h-12 bg-black rounded-2xl border border-zinc-800 flex items-center justify-center shrink-0 shadow-inner">
            <span className="text-2xl font-playfair italic text-[#AF9164]">P</span>
          </div>
          
          <div className="space-y-2.5 flex-1 pr-4">
            <div>
              <span className="text-[8.5px] font-mono text-[#E2C79E] uppercase tracking-widest block font-bold">
                {language === 'en' ? 'VIP MOBILE ACCESS' : 'VIP MOBİL UYGULAMA'}
              </span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                {language === 'en' ? 'Install Peony App' : 'Peony’yi Telefona Kur'}
              </h4>
            </div>

            <p className="text-[10.5px] text-zinc-300 leading-relaxed font-light">
              {language === 'en'
                ? 'Add Peony Collective to your home screen for instant vault alerts and concierge private drops.'
                : 'Peony Collective’i ana ekranınıza ekleyin; yeni arşiv parçalarından ve VIP indirimlerden anında haberdar olun.'}
            </p>

            {/* Store Buttons & App Notice */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleStoreClick('App Store')}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-[9px] font-mono text-zinc-200 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Smartphone size={11} className="text-[#AF9164]" />
                <span>App Store</span>
                <span className="text-[7.5px] opacity-60">({language === 'en' ? 'Soon' : 'Yakında'})</span>
              </button>

              <button
                type="button"
                onClick={() => handleStoreClick('Google Play')}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-[9px] font-mono text-zinc-200 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Download size={11} className="text-[#AF9164]" />
                <span>Google Play</span>
                <span className="text-[7.5px] opacity-60">({language === 'en' ? 'Soon' : 'Yakında'})</span>
              </button>
            </div>

            {storeNotice && (
              <div className="p-2.5 bg-[#C2A676]/15 border border-[#C2A676]/30 rounded-xl text-[9.5px] text-[#E2C79E] font-mono leading-tight flex items-start gap-1.5">
                <CheckCircle2 size={12} className="shrink-0 mt-0.5" />
                <span>{storeNotice}</span>
              </div>
            )}
            
            {isIOS ? (
              <div className="bg-black/60 rounded-xl p-2.5 text-[9.5px] text-zinc-300 border border-white/10 space-y-1">
                <p>
                  {language === 'en' ? 'From Safari, tap ' : 'Safari’de '} 
                  <Share size={12} className="text-[#AF9164] inline mx-1" /> 
                  {language === 'en' ? 'and select:' : 'butonuna dokunup:'}
                </p>
                <span className="font-bold text-white flex items-center gap-1 text-[10px]">
                  {language === 'en' ? 'Add to Home Screen' : 'Ana Ekrana Ekle'} <PlusSquare size={12} className="text-[#AF9164]" />
                </span>
              </div>
            ) : (
              <p className="text-[9.5px] text-zinc-400 italic">
                {language === 'en' 
                  ? 'Tap browser options (⋮) and choose "Add to Home screen".'
                  : 'Tarayıcı seçeneklerinden (⋮) "Ana Ekrana Ekle"yi seçebilirsiniz.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
