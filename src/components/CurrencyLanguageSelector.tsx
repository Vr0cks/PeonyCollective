'use client'

import { useSettings, Currency, Language } from '@/src/context/SettingsContext'
import { Globe, DollarSign } from 'lucide-react'

export default function CurrencyLanguageSelector() {
  const { currency, setCurrency, language, setLanguage } = useSettings()

  return (
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200/80 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
      {/* Dil Seçici */}
      <div className="flex items-center gap-1.5">
        <Globe size={11} className="text-gray-400" />
        <button
          onClick={() => setLanguage('tr')}
          className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
            language === 'tr' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
          }`}
        >
          TR
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => setLanguage('en')}
          className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
            language === 'en' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
          }`}
        >
          EN
        </button>
      </div>

      <div className="w-[1px] h-3 bg-gray-300" />

      {/* Para Birimi Seçici */}
      <div className="flex items-center gap-1">
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
