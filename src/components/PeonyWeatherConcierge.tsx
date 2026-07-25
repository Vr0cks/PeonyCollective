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

export default function PeonyWeatherConcierge() {
  const { language, t } = useSettings()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [permissionDenied, setPermissionDenied] = useState(false)

  const requestLocation = () => {
    setLoading(true)
    setPermissionDenied(false)

    if (!navigator.geolocation) {
      setLoading(false)
      setPermissionDenied(true)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude
          const lon = position.coords.longitude

          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          )
          const weatherJson = await weatherRes.json()
          const currentWeather = weatherJson.current_weather || {}

          let city = 'Ankara'
          let district = 'Çankaya'

          try {
            const geoRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=tr`
            )
            const geoJson = await geoRes.json()
            city = geoJson.city || geoJson.principalSubdivision || 'Ankara'
            district = geoJson.locality || geoJson.district || geoJson.city || 'Çankaya'
          } catch (e) {
            console.log('Geocoding fallback used:', e)
          }

          const temp = Math.round(currentWeather.temperature ?? 22)
          const code = currentWeather.weathercode ?? 0

          let desc = 'Açık & Güneşli'
          let recTr = 'Bugün harika bir hava var! Şık güneş gözlükleriniz ve ikonik omuz çantanızla şehir kombinini tamamlayın.'
          let recEn = 'Gorgeous weather today! Elevate your city look with statement sunglasses and an iconic shoulder bag.'

          if (code >= 50 && code <= 99) {
            desc = 'Yağmurlu & Nemli'
            recTr = 'Yağışlı havalar için su tutmayan deri çantalar ve yağmurluk kombinli şık çizmelerimiz tam size göre.'
            recEn = 'For rainy weather, waterproof luxury leather bags and sleek boots are recommended for your outfit.'
          } else if (temp < 15) {
            desc = 'Serin & Rüzgarlı'
            recTr = 'Serin hava kombinlerine şıklık katacak kaşmir atki ve ikonik tote çanta koleksiyonumuzu keşfedin.'
            recEn = 'Explore our cashmere scarves and structured tote bags to complement your chilly day ensemble.'
          } else if (temp >= 25) {
            desc = 'Sıcak & Güneşli'
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
        } catch (error) {
          console.error('Weather Concierge Error:', error)
          setPermissionDenied(true)
        } finally {
          setLoading(false)
        }
      },
      (error) => {
        console.warn('Geolocation permission error:', error)
        setPermissionDenied(true)
        setLoading(false)
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  useEffect(() => {
    requestLocation()
  }, [])

  if (permissionDenied) {
    return (
      <div className="w-full bg-[#111111] text-white py-6 px-8 rounded-3xl border border-[#AF9164]/30 my-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#AF9164]/20 border border-[#AF9164]/30 flex items-center justify-center text-[#AF9164] shrink-0">
            <Navigation size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#AF9164]">
              📍 PEONY WEATHER CONCIERGE
            </h4>
            <p className="text-xs text-white/70 mt-0.5">
              {language === 'en'
                ? 'Allow location access to receive real-time weather and city-tailored luxury style recommendations.'
                : 'Bulunduğunuz il/ilçeye özel anlık hava durumu ve stil önerileri için konum izni verebilirsiniz.'}
            </p>
          </div>
        </div>
        <button
          onClick={requestLocation}
          className="bg-[#AF9164] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors shrink-0 cursor-pointer"
        >
          {language === 'en' ? 'Allow Location Access 📍' : 'Konum İzni Ver 📍'}
        </button>
      </div>
    )
  }

  if (loading || !weather) {
    return null
  }

  return (
    <div className="w-full bg-[#0F0F0F] text-white py-7 px-8 rounded-3xl border border-[#AF9164]/30 my-10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#AF9164]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#AF9164]/20 transition-all duration-700" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] bg-[#AF9164]/20 text-[#AF9164] border border-[#AF9164]/30">
              <Sparkles size={10} /> 📍 PEONY WEATHER CONCIERGE
            </span>
            <span className="text-[10px] text-white/40 font-mono">
              {weather.district}, {weather.city}
            </span>
          </div>

          <h3 className="text-lg font-playfair tracking-wide text-white">
            {weather.district} · {weather.temp}°C {weather.description}
          </h3>

          <p className="text-xs text-white/70 font-light leading-relaxed">
            "{language === 'en' ? weather.recommendationEn : weather.recommendationTr}"
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
          <div className="text-right">
            <div className="text-3xl font-light text-[#AF9164]">
              {weather.temp}°C
            </div>
            <div className="text-[9px] uppercase tracking-widest text-white/40 mt-0.5">
              {weather.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
