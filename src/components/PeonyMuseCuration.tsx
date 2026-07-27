'use client'

import { useState, useEffect } from 'react'
import { useSettings } from '@/src/context/SettingsContext'
import { Sparkles, Loader2 } from 'lucide-react'

interface PeonyMuseCurationProps {
  productId: string
}

export default function PeonyMuseCuration({ productId }: PeonyMuseCurationProps) {
  const { language } = useSettings()
  const [curation, setCuration] = useState<string | null>(null)
  const [styling, setStyling] = useState<string | null>(null)
  const [loadingCuration, setLoadingCuration] = useState(true)
  const [loadingStyling, setLoadingStyling] = useState(false)

  // Fetch Curation Summary on load or language change
  useEffect(() => {
    setStyling(null)
    async function fetchCuration() {
      setLoadingCuration(true)
      try {
        const res = await fetch('/api/muse/curation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, locale: language })
        })
        const data = await res.json()
        if (data.curation) {
          setCuration(data.curation)
        } else {
          setCuration(language === 'tr' ? 'Detaylı bilgi için uzman ekibimizle iletişime geçebilirsiniz.' : 'Please contact our expert team for detailed styling information.')
        }
      } catch (err) {
        console.error('Error fetching curation:', err)
        setCuration(language === 'tr' ? 'Detaylı bilgi için uzman ekibimizle iletişime geçebilirsiniz.' : 'Please contact our expert team for detailed styling information.')
      } finally {
        setLoadingCuration(false)
      }
    }
    fetchCuration()
  }, [productId, language])

  // Fetch Styling Tip
  const handleGetStylingAdvice = async () => {
    setLoadingStyling(true)
    try {
      const res = await fetch('/api/muse/curation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, locale: language, getStyling: true })
      })
      const data = await res.json()
      if (data.styling) {
        setStyling(data.styling)
      }
    } catch (err) {
      console.error('Error fetching styling:', err)
    } finally {
      setLoadingStyling(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Curation Card */}
      <div className="border-l-2 border-[#AF9164] pl-6 py-1">
        <h4 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#AF9164] mb-3 flex items-center gap-1.5">
          <Sparkles size={10} className="animate-pulse" />
          {language === 'tr' ? 'MUSE KÜRATÖRLÜĞÜ' : 'MUSE CURATION'}
        </h4>

        {loadingCuration ? (
          <div className="space-y-2 animate-pulse py-1">
            <div className="h-3 bg-gray-100 rounded w-5/6" />
            <div className="h-3 bg-gray-100 rounded w-4/6" />
          </div>
        ) : (
          <p className="text-[12.5px] leading-relaxed text-gray-600 font-light font-playfair italic">
            "{curation}"
          </p>
        )}
      </div>

      {/* Styling Advice Action */}
      <div className="pt-2">
        {!styling && !loadingStyling && (
          <button
            onClick={handleGetStylingAdvice}
            className="text-[9.5px] font-bold uppercase tracking-widest text-black hover:text-[#AF9164] transition-colors flex items-center gap-2 cursor-pointer"
          >
            ✦ {language === 'tr' ? 'PEONY MUSE STİL TAVSİYESİ AL' : 'GET PEONY MUSE STYLING ADVICE'}
          </button>
        )}

        {loadingStyling && (
          <div className="flex items-center gap-2 text-[9.5px] font-bold uppercase tracking-widest text-[#AF9164]">
            <Loader2 size={11} className="animate-spin" />
            {language === 'tr' ? 'MUSE KOMBİN YARATIYOR...' : 'MUSE CURATING STYLE...'}
          </div>
        )}

        {styling && (
          <div className="bg-[#F9F9F8] border border-gray-100 rounded-xl p-4 mt-2 transition-all duration-300">
            <h5 className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#AF9164] mb-1.5">
              {language === 'tr' ? 'MUSE STİL TAVSİYESİ' : 'MUSE STYLING ADVICE'}
            </h5>
            <p className="text-[11.5px] text-gray-600 font-light leading-relaxed font-sans">
              {styling}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
