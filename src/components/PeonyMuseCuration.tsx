'use client'

import { useState, useEffect } from 'react'
import { useSettings } from '@/src/context/SettingsContext'
import { Sparkles, Loader2, Landmark, Shirt } from 'lucide-react'

interface PeonyMuseCurationProps {
  productId: string
}

export default function PeonyMuseCuration({ productId }: PeonyMuseCurationProps) {
  const { language } = useSettings()
  const [curation, setCuration] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<'styling' | 'investment' | null>(null)
  const [adviceText, setAdviceText] = useState<string | null>(null)
  const [loadingCuration, setLoadingCuration] = useState(true)
  const [loadingAdvice, setLoadingAdvice] = useState(false)

  // Fetch Curation Summary on load or language change
  useEffect(() => {
    setSelectedTopic(null)
    setAdviceText(null)
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

  // Fetch Styling or Investment Advice
  const handleFetchAdvice = async (topic: 'styling' | 'investment') => {
    setSelectedTopic(topic)
    setLoadingAdvice(true)
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
      console.error('Error fetching advice:', err)
    } finally {
      setLoadingAdvice(false)
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

      {/* Interactive Tabs */}
      <div className="pt-2">
        <div className="flex gap-4 border-b border-gray-100 pb-2 mb-3">
          <button
            onClick={() => handleFetchAdvice('investment')}
            className={`text-[9.5px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer ${
              selectedTopic === 'investment' ? 'text-[#AF9164]' : 'text-gray-400 hover:text-black'
            }`}
          >
            <Landmark size={11} className={selectedTopic === 'investment' ? 'text-[#AF9164]' : 'text-gray-400'} />
            {language === 'tr' ? 'YATIRIM DEĞERİ' : 'WHY INVEST?'}
          </button>
          <button
            onClick={() => handleFetchAdvice('styling')}
            className={`text-[9.5px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer ${
              selectedTopic === 'styling' ? 'text-[#AF9164]' : 'text-gray-400 hover:text-black'
            }`}
          >
            <Shirt size={11} className={selectedTopic === 'styling' ? 'text-[#AF9164]' : 'text-gray-400'} />
            {language === 'tr' ? 'STİL TAVSİYESİ' : 'HOW TO STYLE?'}
          </button>
        </div>

        {/* Advice Panel */}
        {selectedTopic && (
          <div className="bg-[#F9F9F8] border border-gray-100 rounded-xl p-4 mt-2 transition-all duration-300">
            {loadingAdvice ? (
              <div className="flex items-center gap-2 text-[9.5px] font-bold uppercase tracking-widest text-[#AF9164] py-2">
                <Loader2 size={11} className="animate-spin" />
                {language === 'tr' ? 'MUSE YAZIYOR...' : 'MUSE CURATING...'}
              </div>
            ) : (
              <p className="text-[11.5px] text-gray-600 font-light leading-relaxed font-sans">
                {adviceText}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
