'use client'

import { useState, useEffect } from 'react'
import { X, Share, PlusSquare } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function PwaInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Ensure execution strictly within the client-side browser environment.
    if (typeof window !== 'undefined') {
      // Validate local storage to prevent redundant prompt initializations.
      if (localStorage.getItem('pwa_prompt_dismissed') === 'true') return

      // Device detection for tailored installation instructions (iOS Safari vs. Chromium).
      const userAgent = window.navigator.userAgent.toLowerCase()
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsIOS(isIosDevice)

      // Terminate execution if the application is already running in standalone PWA mode.
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      if (isStandalone) return

      // Suppress prompt rendering on restricted routes to maximize conversion and operational focus.
      if (pathname?.startsWith('/checkout') || pathname?.startsWith('/admin')) {
        return
      }

      // Restrict prompt rendering to mobile viewports (width < 768px).
      if (window.innerWidth < 768) {
        // Implement a delay to ensure the primary UI is loaded and the user is engaged.
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

  if (!showPrompt) return null

  return (
    <div className="fixed inset-x-0 bottom-20 md:bottom-auto md:top-20 z-50 p-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-2xl p-5 border border-[#AF9164]/30 relative overflow-hidden max-w-sm mx-auto">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#AF9164]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={16} />
        </button>

        <div className="flex gap-4 items-start relative z-10">
          <div className="w-12 h-12 bg-black rounded-xl border border-zinc-800 flex items-center justify-center shrink-0 shadow-inner">
            <span className="text-xl font-playfair italic text-[#AF9164]">P</span>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-1 text-white">VIP Uygulamayı Kur</h4>
            <p className="text-[10px] text-zinc-400 leading-relaxed font-light mb-3">
              Peony Collective'i telefonunuza ekleyin. Daha hızlı erişim ve PWA ayrıcalıklarını keşfedin.
            </p>
            
            {isIOS ? (
              <div className="bg-black/50 rounded-lg p-3 text-[10px] text-zinc-300 flex items-center gap-2 border border-white/5">
                Tarayıcınızdan <Share size={14} className="text-[#AF9164] inline" /> ikonuna dokunun ve <br/>
                <span className="font-bold text-white flex items-center gap-1">Ana Ekrana Ekle <PlusSquare size={12}/></span> seçeneğini seçin.
              </div>
            ) : (
              <p className="text-[10px] text-zinc-500 italic">
                Tarayıcı seçeneklerinden "Ana Ekrana Ekle"yi seçebilirsiniz.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
