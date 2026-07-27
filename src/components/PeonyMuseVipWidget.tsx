'use client'

import { useState, useEffect } from 'react'
import { useSettings } from '@/src/context/SettingsContext'
import { Sparkles, X, Loader2, Landmark, Shirt } from 'lucide-react'

interface PeonyMuseVipWidgetProps {
  productId: string
  brand: string
}

export default function PeonyMuseVipWidget({ productId, brand }: PeonyMuseVipWidgetProps) {
  const { language } = useSettings()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<'styling' | 'investment' | null>(null)
  const [adviceText, setAdviceText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Reset selected topic and advice when language changes
  useEffect(() => {
    setSelectedTopic(null)
    setAdviceText(null)
  }, [language])

  // Listen to scroll and timer triggers
  useEffect(() => {
    if (isDismissed) return

    // Trigger 1: Scroll threshold
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    // Trigger 2: Time threshold (15 seconds)
    const timer = setTimeout(() => {
      setIsVisible(true)
      window.removeEventListener('scroll', handleScroll)
    }, 15000)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [isDismissed])

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
    setIsDismissed(true)
  }

  const handleFetchAdvice = async (topic: 'styling' | 'investment') => {
    setSelectedTopic(topic)
    setLoading(true)
    setAdviceText(null)
    try {
      const res = await fetch('/api/muse/curation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          locale: language,
          getStyling: topic === 'styling',
          getInvestment: topic === 'investment'
        })
      })
      const data = await res.json()
      if (topic === 'styling') {
        setAdviceText(data.styling)
      } else {
        setAdviceText(data.investment)
      }
    } catch (err) {
      console.error('Error fetching VIP advice:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 right-6 z-[99] max-w-[340px] w-full bg-white/95 backdrop-blur-lg border border-[#AF9164]/30 shadow-2xl rounded-2xl p-5 text-gray-900 animate-in slide-in-from-bottom-5 duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#AF9164] flex items-center gap-1.5">
          <Sparkles size={11} className="animate-pulse" />
          PEONY MUSE VIP
        </span>
        <button 
          onClick={handleDismiss}
          className="text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Main Content Area */}
      {!selectedTopic ? (
        <div className="space-y-4">
          <p className="text-xs text-gray-600 font-light leading-relaxed">
            {language === 'tr' 
              ? `Bu eşsiz ${brand} parçası hakkında karar vermenize yardımcı olmak için Muse asistanınız hazır.`
              : `Your Muse assistant is ready to help you discover details about this unique ${brand} archival piece.`}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleFetchAdvice('investment')}
              className="flex flex-col items-center justify-center gap-2 p-3 bg-[#F9F9F8] hover:bg-[#AF9164]/10 border border-gray-100 hover:border-[#AF9164]/30 rounded-xl transition-all group cursor-pointer text-center"
            >
              <Landmark size={14} className="text-[#AF9164] group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-800">
                {language === 'tr' ? 'YATIRIM DEĞERİ' : 'WHY INVEST?'}
              </span>
            </button>
            <button
              onClick={() => handleFetchAdvice('styling')}
              className="flex flex-col items-center justify-center gap-2 p-3 bg-[#F9F9F8] hover:bg-[#AF9164]/10 border border-gray-100 hover:border-[#AF9164]/30 rounded-xl transition-all group cursor-pointer text-center"
            >
              <Shirt size={14} className="text-[#AF9164] group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-800">
                {language === 'tr' ? 'STİL / KOMBİN' : 'HOW TO STYLE?'}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AF9164] flex items-center gap-1.5">
            {selectedTopic === 'investment' 
              ? (language === 'tr' ? '✦ YATIRIM GEREKÇESİ' : '✦ INVESTMENT INSIGHT')
              : (language === 'tr' ? '✦ STİL TAVSİYESİ' : '✦ STYLING INSIGHT')}
          </h5>

          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 size={20} className="animate-spin text-[#AF9164]" />
            </div>
          ) : (
            <p className="text-[12px] text-gray-700 font-light leading-relaxed font-playfair italic">
              "{adviceText}"
            </p>
          )}

          {/* Reset Topic button */}
          {!loading && (
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setSelectedTopic(null)}
                className="text-[8px] font-bold uppercase tracking-wider text-gray-400 hover:text-black transition-colors cursor-pointer"
              >
                ← {language === 'tr' ? 'GERİ DÖN' : 'GO BACK'}
              </button>
              <button
                onClick={handleDismiss}
                className="text-[8px] font-bold uppercase tracking-wider text-[#AF9164] hover:text-[#96794F] transition-colors cursor-pointer"
              >
                {language === 'tr' ? 'KAPAT' : 'CLOSE'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
