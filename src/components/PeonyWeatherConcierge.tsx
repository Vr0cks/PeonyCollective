'use client'

import React, { useState, useEffect } from 'react'
import { useSettings } from '@/src/context/SettingsContext'
import { MapPin, Sun, CloudRain, Wind, Sparkles, Navigation } from 'lucide-react'

interface WeatherData {
  city: string
  district: string
  temp: number
  weatherCode: number
  description: string
  recommendationTr: string
  recommendationEn: string
}

const PRESET_CITIES = [
  { city: 'İstanbul', district: 'Nişantaşı', lat: 41.0505, lon: 28.9904 },
  { city: 'Muğla', district: 'Bodrum', lat: 37.0344, lon: 27.4305 },
  { city: 'İzmir', district: 'Çeşme', lat: 38.3236, lon: 26.3044 },
  { city: 'Ankara', district: 'Çankaya', lat: 39.9334, lon: 32.8597 }
]

const getWeatherDescription = (code: number, lang: string) => {
  if (code >= 50 && code <= 99) return lang === 'en' ? 'Rainy & Humid' : 'Yağmurlu & Nemli'
  return lang === 'en' ? 'Clear & Radiant' : 'Açık & Işıltılı'
}

const getStyleRecommendation = (code: number, temp: number, lang: string) => {
  if (code >= 50 && code <= 99) {
    return lang === 'en' 
      ? 'Waterproof luxury leather and sophisticated boots for rainy transitions.' 
      : 'Yağışlı havalar için su tutmayan deri çantalar ve şık botlar.'
  }
  if (temp < 15) {
    return lang === 'en'
      ? 'Refined cashmere and structured totes for a cool, serene day.'
      : 'Serin hava kombinlerine şıklık katacak kaşmir ve ikonik çantalar.'
  }
  return lang === 'en'
    ? 'Effortless style with refined accessories for a sun-drenched day.'
    : 'Güneşli günün ışıltısını yansıtan zarif aksesuarlar ve hafif dokular.'
}

export default function PeonyWeatherConcierge() {
  const { language } = useSettings()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCityIndex, setSelectedCityIndex] = useState<number | null>(null)
  const [locationStatus, setLocationStatus] = useState<string | null>(null)

  const fetchWeatherForCoords = async (
    lat: number,
    lon: number,
    cityDefault?: string,
    districtDefault?: string
  ) => {
    setLoading(true)
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4000)

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
        { signal: controller.signal }
      )
      clearTimeout(timeoutId)

      if (!weatherRes.ok) throw new Error(`Weather API error: ${weatherRes.status}`)
      const weatherJson = await weatherRes.json()
      const currentWeather = weatherJson.current_weather || {}

      let city = cityDefault || ''
      let district = districtDefault || ''

      if (!city || !district) {
        try {
          const geoController = new AbortController()
          const geoTimeoutId = setTimeout(() => geoController.abort(), 3500)

          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${language === 'en' ? 'en' : 'tr'}`,
            { signal: geoController.signal }
          )
          clearTimeout(geoTimeoutId)

          if (geoRes.ok) {
            const geoJson = await geoRes.json()
            city = geoJson.city || geoJson.principalSubdivision || geoJson.countryName || 'İstanbul'
            district = geoJson.locality || geoJson.district || geoJson.city || 'Merkez'
          }
        } catch {
          try {
            const nomRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
            )
            if (nomRes.ok) {
              const nomJson = await nomRes.json()
              city = nomJson.address?.city || nomJson.address?.province || nomJson.address?.state || 'İstanbul'
              district = nomJson.address?.suburb || nomJson.address?.town || nomJson.address?.district || 'Merkez'
            }
          } catch {
            city = 'İstanbul'
            district = 'Nişantaşı'
          }
        }
      }

      const temp = Math.round(currentWeather.temperature ?? 22)
      const wCode = currentWeather.weathercode ?? 0
      const desc = getWeatherDescription(wCode, language)
      const recTr = getStyleRecommendation(wCode, temp, 'tr')
      const recEn = getStyleRecommendation(wCode, temp, 'en')

      setWeather({
        city,
        district,
        temp,
        weatherCode: wCode,
        description: desc,
        recommendationTr: recTr,
        recommendationEn: recEn
      })
    } catch (err) {
      console.error("Weather Concierge load error:", err)
      setWeather({
        city: 'İstanbul',
        district: 'Nişantaşı',
        temp: 22,
        weatherCode: 0,
        description: language === 'en' ? 'Clear & Elegant' : 'Açık & Güneşli',
        recommendationTr: 'Güneşli havaya uygun hafif ve zarif lüks parçalar.',
        recommendationEn: 'Curated light and timeless pieces tailored for clear weather.'
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchIpLocation = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/')
      if (res.ok) {
        const data = await res.json()
        if (data.latitude && data.longitude) {
          fetchWeatherForCoords(data.latitude, data.longitude, data.city, data.region || data.city)
          setLocationStatus(null)
          return
        }
      }
    } catch {
      // Ignore fallback
    }
    fetchWeatherForCoords(41.0505, 28.9904, 'İstanbul', 'Nişantaşı')
  }

  const requestLocation = () => {
    setLoading(true)
    setSelectedCityIndex(null)
    setLocationStatus(null)

    if (typeof window === 'undefined' || !navigator?.geolocation) {
      fetchIpLocation()
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus(null)
        fetchWeatherForCoords(position.coords.latitude, position.coords.longitude)
      },
      (err) => {
        console.warn("Geolocation error:", err.message)
        setLocationStatus(language === 'en' ? 'GPS permission off. Using network location.' : 'GPS izni kapalı. Şebeke konumu kullanılıyor.')
        fetchIpLocation()
      },
      { timeout: 8000, enableHighAccuracy: true }
    )
  }

  useEffect(() => {
    requestLocation()
  }, [])

  const handleCityPresetChange = (index: number) => {
    setSelectedCityIndex(index)
    setLocationStatus(null)
    const p = PRESET_CITIES[index]
    fetchWeatherForCoords(p.lat, p.lon, p.city, p.district)
  }

  return (
    <div className="w-full bg-[#12141A] text-white p-6 sm:p-8 rounded-3xl border border-[#9E7D4E]/30 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#9E7D4E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] bg-[#9E7D4E]/20 text-[#E2C79E] border border-[#9E7D4E]/30 font-mono">
              <Sparkles size={11} className="text-[#E2C79E]" />
              <span>PEONY STYLE CONCIERGE</span>
            </span>

            {weather && (
              <span className="text-[10px] text-stone-400 font-mono tracking-wider">
                {weather.district}, {weather.city}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-playfair tracking-tight text-white flex items-center gap-2">
            {loading ? (
              <span className="text-stone-400 animate-pulse text-base">{language === 'en' ? 'Detecting weather & styling...' : 'Hava durumu ve stil önerisi yükleniyor...'}</span>
            ) : (
              <span>{weather?.district} · {weather?.temp}°C {weather?.description}</span>
            )}
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed italic border-l border-[#9E7D4E]/40 pl-3">
            &ldquo;{language === 'en' ? weather?.recommendationEn : weather?.recommendationTr}&rdquo;
          </p>

          {locationStatus && (
            <p className="text-[9px] text-stone-400 font-mono italic">
              {locationStatus}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[9px] text-stone-400 font-mono uppercase tracking-widest mr-1">
              {language === 'en' ? 'DESTINATIONS:' : 'HIZLI ŞEHİR:'}
            </span>
            {PRESET_CITIES.map((p, idx) => (
              <button
                key={p.district}
                onClick={() => handleCityPresetChange(idx)}
                className={`px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase transition-all cursor-pointer border ${
                  selectedCityIndex === idx
                    ? 'bg-[#9E7D4E] text-white border-[#9E7D4E] font-bold shadow-md'
                    : 'bg-white/5 text-stone-400 border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                {p.district}
              </button>
            ))}
            <button
              onClick={requestLocation}
              title={language === 'en' ? 'Detect My Location' : 'Konumumu Bul'}
              className="p-1 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/10 text-stone-300 transition-all cursor-pointer ml-1"
            >
              <Navigation size={12} />
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-playfair font-bold text-[#E2C79E] block leading-none">
                {weather?.temp}°C
              </span>
              <span className="text-[8px] font-mono uppercase tracking-wider text-stone-400">
                {weather?.description}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E2C79E]">
              {weather && weather.weatherCode >= 51 ? <CloudRain size={18} /> : <Sun size={18} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
