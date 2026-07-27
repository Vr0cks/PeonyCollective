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
  { city: 'Londra', district: 'Mayfair', lat: 51.5074, lon: -0.1278 }
]

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
      // 1. Fetch current weather from Open-Meteo
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

      // 2. Reverse geocoding to find city & district names
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
          // Fallback to nominatim if bigdatacloud fails
          try {
            const nomRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
            )
            if (nomRes.ok) {
              const nomJson = await nomRes.json()
              const addr = nomJson.address || {}
              city = addr.province || addr.city || addr.state || 'İstanbul'
              district = addr.suburb || addr.town || addr.district || addr.city_district || 'Merkez'
            }
          } catch {
            city = cityDefault || 'İstanbul'
            district = districtDefault || 'Nişantaşı'
          }
        }
      }

      if (!city) city = 'İstanbul'
      if (!district) district = 'Nişantaşı'

      const temp = Math.round(currentWeather.temperature ?? 24)
      const code = currentWeather.weathercode ?? 0

      let desc = 'Açık & Güneşli'
      let recTr = 'Bugün harika bir hava var! Şık güneş gözlükleriniz ve ikonik omuz çantanızla şehir kombinini tamamlayın.'
      let recEn = 'Gorgeous weather today! Elevate your city look with statement sunglasses and an iconic shoulder bag.'

      if (code >= 50 && code <= 99) {
        desc = language === 'en' ? 'Rainy & Humid' : 'Yağmurlu & Nemli'
        recTr = 'Yağışlı havalar için su tutmayan deri çantalar ve yağmurluk kombinli şık çizmelerimiz tam size göre.'
        recEn = 'For rainy weather, waterproof luxury leather bags and sleek boots are recommended for your outfit.'
      } else if (temp < 15) {
        desc = language === 'en' ? 'Chilly & Windy' : 'Serin & Rüzgarlı'
        recTr = 'Serin hava kombinlerine şıklık katacak kaşmir atkı ve ikonik tote çanta koleksiyonumuzu keşfedin.'
        recEn = 'Explore our cashmere scarves and structured tote bags to complement your chilly day ensemble.'
      } else if (temp >= 25) {
        desc = language === 'en' ? 'Warm & Sunny' : 'Sıcak & Güneşli'
        recTr = 'Güneşli havanın tadını çıkarın. Loewe basket çanta ve hafif yazlık aksesuarlar ile stilinizi yansıtın.'
        recEn = 'Enjoy the sunny vibe! Pair your look with Loewe raffia basket bags and light summer luxury items.'
      }

      setWeather({
        city,
        district,
        temp,
        weatherCode: code,
        description: desc,
        recommendationTr: recTr,
        recommendationEn: recEn
      })
    } catch {
      setWeather({
        city: cityDefault || 'İstanbul',
        district: districtDefault || 'Nişantaşı',
        temp: 24,
        weatherCode: 0,
        description: language === 'en' ? 'Sunny & Breezy' : 'Güneşli & Esintili',
        recommendationTr: 'Şehir kombinlerine özel ikonik omuz çantaları ve göz alıcı aksesuarlarımızı keşfedin.',
        recommendationEn: 'Discover iconic shoulder bags and statement accessories for your city look.'
      })
    } finally {
      setLoading(false)
    }
  }

  // Fetch location via IP address as fallback if browser geolocation is blocked/unavailable
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
      // Ignore IP fallback error
    }
    // Default fallback
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
        console.warn("Geolocation error/denied:", err.message)
        setLocationStatus(language === 'en' ? 'GPS permission blocked. Using IP location.' : 'GPS izni kapalı. İp konumu kullanılıyor.')
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
    <div className="w-full bg-[#0F0F0F] text-white py-7 px-8 rounded-3xl border border-[#AF9164]/30 my-6 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#AF9164]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#AF9164]/20 transition-all duration-700" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] bg-[#AF9164]/20 text-[#AF9164] border border-[#AF9164]/30">
              <Sparkles size={11} /> 📍 PEONY WEATHER CONCIERGE
            </span>

            {weather && (
              <span className="text-[10px] text-white/50 font-mono tracking-wider">
                {weather.district}, {weather.city}
              </span>
            )}
          </div>

          <h3 className="text-lg md:text-xl font-playfair tracking-wide text-white flex items-center gap-2">
            {loading ? (
              <span className="text-zinc-500 animate-pulse">{language === 'en' ? 'Detecting location & fetching weather...' : 'Konum ve hava durumu yükleniyor...'}</span>
            ) : (
              <span>{weather?.district} · {weather?.temp}°C {weather?.description}</span>
            )}
          </h3>

          <p className="text-xs text-white/75 font-light leading-relaxed">
            "{language === 'en' ? weather?.recommendationEn : weather?.recommendationTr}"
          </p>

          {locationStatus && (
            <p className="text-[10px] text-[#AF9164] font-medium tracking-wide">
              ℹ {locationStatus}
            </p>
          )}

          {/* Konum Değiştirme Kısayolları */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 mr-1">{language === 'en' ? 'Quick Location:' : 'Hızlı Konum:'}</span>
            {PRESET_CITIES.map((c, i) => (
              <button
                key={c.district}
                onClick={() => handleCityPresetChange(i)}
                className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                  selectedCityIndex === i 
                    ? 'bg-[#AF9164] text-white border-[#AF9164]' 
                    : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {c.district}
              </button>
            ))}
            <button
              onClick={requestLocation}
              className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black transition-all cursor-pointer flex items-center gap-1 ml-1"
              title="Konumumu otomatik algıla"
            >
              <Navigation size={9} />
              <span>{language === 'en' ? 'Detect Location' : 'Konumumu Algıla'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
          <div className="text-right">
            <div className="text-3xl md:text-4xl font-light text-[#AF9164]">
              {loading ? '--' : `${weather?.temp}°C`}
            </div>
            <div className="text-[9px] uppercase tracking-widest text-white/40 mt-0.5">
              {weather?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
