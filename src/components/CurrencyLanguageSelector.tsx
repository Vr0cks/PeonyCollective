'use client'

import { useState, useRef, useEffect } from 'react'
import { useSettings, Currency, Language } from '@/src/context/SettingsContext'
import { Globe, ChevronDown, Check } from 'lucide-react'

export default function CurrencyLanguageSelector() {
  const { currency, setCurrency, language, setLanguage } = useSettings()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Dışarıya tıklanınca dropdown'ı kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currencySymbolMap: Record<Currency, string> = {
    TRY: '₺',
    USD: '$',
    EUR: '€'
  }

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      {/* Dropdown Tetikleyici Butonu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200/80 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] transition-all cursor-pointer shadow-2xs"
        aria-label="Dil ve Para Birimi Seçimi"
      >
        <Globe size={12} className="text-[#AF9164]" />
        <span>{language.toUpperCase()} / {currencySymbolMap[currency]}</span>
        <ChevronDown size={11} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menüsü */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
          
          {/* Dil Seçeneği */}
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 px-2">
              DİL / LANGUAGE
            </span>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setLanguage('tr')}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  language === 'tr' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                TR {language === 'tr' && <Check size={10} />}
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  language === 'en' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                EN {language === 'en' && <Check size={10} />}
              </button>
            </div>
          </div>

          <div className="h-[1px] bg-gray-100 w-full" />

          {/* Para Birimi Seçeneği */}
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 px-2">
              PARA BİRİMİ / CURRENCY
            </span>
            <div className="space-y-1">
              {[
                { code: 'TRY', symbol: '₺', label: 'TRY (₺)' },
                { code: 'USD', symbol: '$', label: 'USD ($)' },
                { code: 'EUR', symbol: '€', label: 'EUR (€)' },
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setCurrency(item.code as Currency)
                    setIsOpen(false)
                  }}
                  className={`w-full px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center justify-between transition-colors cursor-pointer ${
                    currency === item.code ? 'bg-[#AF9164] text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {currency === item.code && <Check size={10} />}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
