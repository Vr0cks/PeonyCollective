'use client'

import { useState, useRef, useEffect } from 'react'
import { useSettings, Currency } from '@/src/context/SettingsContext'
import { Globe, ChevronDown, Check } from 'lucide-react'

interface CurrencyLanguageSelectorProps {
  dropUp?: boolean
  variant?: 'light' | 'dark' | 'topbar'
  align?: 'left' | 'right'
}

export default function CurrencyLanguageSelector({
  dropUp = false,
  variant = 'light',
  align = 'right'
}: CurrencyLanguageSelectorProps) {
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

  // Variant bazlı stil sınıfları
  const getButtonStyles = () => {
    switch (variant) {
      case 'topbar':
        return 'bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-none'
      case 'dark':
        return 'bg-zinc-800/90 hover:bg-zinc-700 border-zinc-700 text-zinc-200 shadow-md'
      case 'light':
      default:
        return 'bg-gray-50 hover:bg-gray-100 border-gray-200/80 text-[#1A1A1A] shadow-2xs'
    }
  }

  const isDarkMenu = variant === 'dark' || variant === 'topbar'

  const getDropdownStyles = () => {
    const verticalClass = dropUp ? 'bottom-full mb-2.5' : 'top-full mt-2.5'
    const horizontalClass = align === 'left' ? 'left-0' : 'right-0'
    const colorClass = isDarkMenu
      ? 'bg-[#1C1C1E] border-zinc-800 text-white shadow-2xl backdrop-blur-xl'
      : 'bg-white border-gray-100 text-gray-900 shadow-xl'
    
    return `absolute ${verticalClass} ${horizontalClass} w-48 border rounded-2xl p-3 z-[999] animate-in fade-in zoom-in-95 duration-150 space-y-3 ${colorClass}`
  }

  return (
    <div className="relative shrink-0 inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Tetikleyici Butonu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${getButtonStyles()}`}
        aria-label="Dil ve Para Birimi Seçimi"
      >
        <Globe size={12} className="text-[#AF9164]" />
        <span>{language.toUpperCase()} / {currencySymbolMap[currency]}</span>
        <ChevronDown size={11} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menüsü */}
      {isOpen && (
        <div className={getDropdownStyles()}>
          
          {/* Dil Seçeneği */}
          <div>
            <span className={`text-[9px] font-bold uppercase tracking-widest block mb-1.5 px-2 ${isDarkMenu ? 'text-zinc-400' : 'text-gray-400'}`}>
              DİL / LANGUAGE
            </span>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setLanguage('tr')}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  language === 'tr' 
                    ? 'bg-[#AF9164] text-white' 
                    : isDarkMenu 
                      ? 'text-zinc-300 hover:bg-zinc-800' 
                      : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                TR {language === 'tr' && <Check size={10} />}
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  language === 'en' 
                    ? 'bg-[#AF9164] text-white' 
                    : isDarkMenu 
                      ? 'text-zinc-300 hover:bg-zinc-800' 
                      : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                EN {language === 'en' && <Check size={10} />}
              </button>
            </div>
          </div>

          <div className={`h-[1px] w-full ${isDarkMenu ? 'bg-zinc-800' : 'bg-gray-100'}`} />

          {/* Para Birimi Seçeneği */}
          <div>
            <span className={`text-[9px] font-bold uppercase tracking-widest block mb-1.5 px-2 ${isDarkMenu ? 'text-zinc-400' : 'text-gray-400'}`}>
              PARA BİRİMİ / CURRENCY
            </span>
            <div className="space-y-1">
              {[
                { code: 'TRY', label: 'TRY (₺)' },
                { code: 'USD', label: 'USD ($)' },
                { code: 'EUR', label: 'EUR (€)' },
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setCurrency(item.code as Currency)
                    setIsOpen(false)
                  }}
                  className={`w-full px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center justify-between transition-colors cursor-pointer ${
                    currency === item.code 
                      ? 'bg-[#AF9164] text-white' 
                      : isDarkMenu 
                        ? 'text-zinc-300 hover:bg-zinc-800' 
                        : 'text-gray-600 hover:bg-gray-50'
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
