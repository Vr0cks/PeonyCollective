'use client'

import { useSettings, Currency, Language } from '@/src/context/SettingsContext'
import { Globe, DollarSign } from 'lucide-react'

export default function CurrencyLanguageSelector() {
  const { currency, setCurrency, language, setLanguage } = useSettings()

  return (
    <div className="hidden xl:flex items-center gap-2 bg-gray-50 border border-gray-200/80 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shrink-0">
      {/* Dil Seçici */}
      <div className="flex items-center gap-1">
        <Globe size={10} className="text-gray-400" />
        <button
          onClick={() => setLanguage('tr')}
          className={`px-1 py-0.5 rounded transition-colors cursor-pointer ${
            language === 'tr' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
          }`}
        >
          TR
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => setLanguage('en')}
          className={`px-1 py-0.5 rounded transition-colors cursor-pointer ${
            language === 'en' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
          }`}
        >
          EN
        </button>
      </div>

      <div className="w-[1px] h-2.5 bg-gray-300" />

      {/* Para Birimi Seçici */}
      <div className="flex items-center gap-0.5">
        {(['TRY', 'USD', 'EUR'] as Currency[]).map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
              currency === c ? 'bg-[#AF9164] text-white' : 'text-gray-500 hover:text-black'
            }`}
          >
            {c === 'TRY' ? '₺' : c === 'USD' ? '$' : '€'}
          </button>
        ))}
      </div>
    </div>
  )
}
