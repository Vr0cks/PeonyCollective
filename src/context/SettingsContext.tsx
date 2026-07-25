'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Currency = 'TRY' | 'USD' | 'EUR'
export type Language = 'tr' | 'en'

interface Rates {
  USD: number
  EUR: number
}

interface SettingsContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
  language: Language
  setLanguage: (l: Language) => void
  rates: Rates
  formatPrice: (priceInTry: number) => string
  t: (key: string, defaultText?: string) => string
}

const defaultRates: Rates = {
  USD: 38.5,
  EUR: 42.0
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  tr: {
    'nav.collection': 'Koleksiyon',
    'nav.sell': 'Satış Yap',
    'nav.howItWorks': 'Nasıl Çalışır?',
    'nav.cart': 'Sepet',
    'nav.myAccount': 'Hesabım',
    'nav.login': 'Giriş Yap',
    'nav.vipOffers': 'VIP Teklifler',
    'hero.title': 'LÜKSÜN EN SAF VE DÖNGÜSEL HALİ',
    'hero.subtitle': 'Uzman onaylı, sertifikalı ve orijinalliği %100 garanti altındaki ikinci el arşiv parçaları.',
    'product.buy': 'SATIN AL',
    'product.offer': 'TEKLİF VER',
    'product.sold': 'BU PARÇA SATILMIŞTIR',
    'product.condition': 'KONDİSYON',
    'product.year': 'SATIN ALINDIĞI YIL',
    'product.seller': 'SATICI',
    'product.dimensions': 'BOYUTLAR',
    'product.expertReport': 'PEONY UZMAN RAPORU',
    'weather.title': '📍 PEONY WEATHER CONCIERGE',
    'weather.subtitle': 'Konumunuza Özel Stil Önerileri'
  },
  en: {
    'nav.collection': 'Collection',
    'nav.sell': 'Consign',
    'nav.howItWorks': 'How It Works',
    'nav.cart': 'Bag',
    'nav.myAccount': 'My Account',
    'nav.login': 'Sign In',
    'nav.vipOffers': 'VIP Offers',
    'hero.title': 'CURATED CIRCULAR LUXURY',
    'hero.subtitle': 'Expert-appraised, 100% verified authentic secondhand luxury archive pieces.',
    'product.buy': 'BUY NOW',
    'product.offer': 'MAKE AN OFFER',
    'product.sold': 'THIS ITEM IS SOLD',
    'product.condition': 'CONDITION',
    'product.year': 'PURCHASE YEAR',
    'product.seller': 'SELLER',
    'product.dimensions': 'DIMENSIONS',
    'product.expertReport': 'PEONY EXPERT REPORT',
    'weather.title': '📍 PEONY WEATHER CONCIERGE',
    'weather.subtitle': 'Personalized Local Style Recommendations'
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('TRY')
  const [language, setLanguageState] = useState<Language>('tr')
  const [rates, setRates] = useState<Rates>(defaultRates)

  useEffect(() => {
    // Load currency and language preferences from localStorage
    const savedCurrency = localStorage.getItem('peony_currency') as Currency
    if (savedCurrency && ['TRY', 'USD', 'EUR'].includes(savedCurrency)) {
      setCurrencyState(savedCurrency)
    }

    const savedLang = localStorage.getItem('peony_lang') as Language
    if (savedLang && ['tr', 'en'].includes(savedLang)) {
      setLanguageState(savedLang)
    }

    // Fetch live exchange rates
    fetch('/api/exchange-rates')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.rates) {
          setRates(data.rates)
        }
      })
      .catch(err => console.error('SettingsProvider exchange rate load error:', err))
  }, [])

  const setCurrency = (c: Currency) => {
    setCurrencyState(c)
    localStorage.setItem('peony_currency', c)
  }

  const setLanguage = (l: Language) => {
    setLanguageState(l)
    localStorage.setItem('peony_lang', l)
    document.documentElement.lang = l
  }

  const formatPrice = (priceInTry: number): string => {
    if (!priceInTry || isNaN(priceInTry)) return '0 ₺'

    if (currency === 'USD') {
      const converted = Math.round(priceInTry / (rates.USD || 38.5))
      return `$ ${converted.toLocaleString('en-US')}`
    }

    if (currency === 'EUR') {
      const converted = Math.round(priceInTry / (rates.EUR || 42.0))
      return `€ ${converted.toLocaleString('de-DE')}`
    }

    return `${priceInTry.toLocaleString('tr-TR')} ₺`
  }

  const t = (key: string, defaultText?: string): string => {
    const langDict = translations[language] || translations.tr
    return langDict[key] || defaultText || key
  }

  return (
    <SettingsContext.Provider value={{
      currency,
      setCurrency,
      language,
      setLanguage,
      rates,
      formatPrice,
      t
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    return {
      currency: 'TRY' as Currency,
      setCurrency: () => {},
      language: 'tr' as Language,
      setLanguage: () => {},
      rates: defaultRates,
      formatPrice: (p: number) => `${(p || 0).toLocaleString('tr-TR')} ₺`,
      t: (k: string, d?: string) => d || k
    }
  }
  return context
}
