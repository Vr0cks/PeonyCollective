'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertOctagon, ExternalLink } from 'lucide-react'

export default function SecurityIncidentPage() {
  const searchParams = useSearchParams()
  const targetParam = searchParams.get('target') || '/admin'
  const [ip, setIp] = useState<string>('Tespit Ediliyor...')
  const [location, setLocation] = useState<string>('Analiz Ediliyor...')
  const [isp, setIsp] = useState<string>('Sorgulanıyor...')
  const [device, setDevice] = useState<string>('Tespit Ediliyor...')
  const [time, setTime] = useState<string>('')
  const [countdown, setCountdown] = useState(5)
  const [incidentId] = useState(() => 'SEC-' + Math.random().toString(36).substring(2, 9).toUpperCase())

  useEffect(() => {
    const ua = navigator.userAgent || 'Mozilla/5.0'

    async function initIncident() {
      let clientIp = ''

      // 1. Grab public IP first
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json')
        const ipData = await ipRes.json()
        if (ipData?.ip) {
          clientIp = ipData.ip
          setIp(ipData.ip)
        }
      } catch (_) {}

      // 2. Fire enriched security alert
      try {
        const res = await fetch('/api/security-alert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ip: clientIp,
            target: targetParam,
            userAgent: ua,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          if (data.ip && !clientIp) setIp(data.ip)
          if (data.location) setLocation(data.location)
          if (data.isp) setIsp(data.isp)
          if (data.device) setDevice(data.device)
          if (data.time) setTime(data.time)
        }
      } catch (_) {}
    }

    initIncident()

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = 'https://www.egm.gov.tr/siber'
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetParam])

  return (
    <div className="fixed inset-0 z-[999999] bg-[#07080A] text-zinc-300 flex flex-col justify-between p-6 sm:p-12 font-mono overflow-y-auto select-none">
      
      {/* Top Protocol Header */}
      <div className="flex items-center justify-between border-b border-red-900/40 pb-4 max-w-4xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
          <span className="text-xs tracking-[0.25em] text-red-500 font-bold uppercase">
            SECURITY PROTOCOL 5237 ACTIVE
          </span>
        </div>
        <span className="text-xs text-zinc-500 font-mono">
          VAKA ID: {incidentId}
        </span>
      </div>

      {/* Main Incident Card */}
      <div className="max-w-4xl w-full mx-auto my-auto py-8 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-red-800/60 rounded text-[11px] text-red-400 font-semibold tracking-wider uppercase">
            <AlertOctagon size={13} />
            <span>HTTP 403 / YETKİSİZ ERİŞİM GİRİŞİMİ TESPİT EDİLDİ</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Sistem Güvenlik Duvarı Devreye Girdi
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            Bu dizin yetkili operasyon merkezi denetimindedir. Yapılan istek güvenlik duvarı tarafından engellenmiş ve adli delil kaydı oluşturulmuştur.
          </p>
        </div>

        {/* Forensic Technical Data Table */}
        <div className="bg-black/80 border border-zinc-800 rounded-xl p-5 space-y-2.5 text-xs text-zinc-300 font-mono">
          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-zinc-500">KAYDEDİLEN IP ADRESİ:</span>
            <span className="text-red-400 font-bold tracking-wider">{ip}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-zinc-500">HEDEF GÜVENLİK DİZİNİ:</span>
            <span className="text-white font-semibold">{targetParam}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-zinc-500">ZAMAN DAMGASI (TSİ):</span>
            <span className="text-zinc-400">
              {time || new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' }) + ' (GMT+3)'}
            </span>
          </div>

          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-zinc-500">TESPİT EDİLEN KONUM &amp; ISS:</span>
            <span className="text-zinc-300">{location} • {isp}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-zinc-500">CİHAZ VE İŞLETİM SİSTEMİ:</span>
            <span className="text-zinc-300">{device}</span>
          </div>

          <div className="flex justify-between pt-1">
            <span className="text-zinc-500">ADLİ DURUM:</span>
            <span className="text-amber-400 font-semibold">Sistem Günlüğüne İşlendi • Rapor İletildi</span>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="p-4 bg-zinc-950 border border-zinc-800/80 rounded-xl space-y-1.5 text-xs font-sans text-zinc-400 leading-relaxed">
          <span className="text-red-400 font-mono font-bold text-xs uppercase block">
            5237 SAYILI TÜRK CEZA KANUNU (TCK) MADDE 243 &amp; 244
          </span>
          <p>
            Bilişim sistemlerine hukuka aykırı olarak giren veya kalmaya devam eden kişiler hakkında hapis cezası öngörülmektedir. Bağlantı verileriniz ve sistem logları yetkili mercilere suç duyurusunda bulunulmak üzere adli havuzda arşivlenmektedir.
          </p>
        </div>

        {/* Action Button & Timer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-zinc-400 font-sans text-center sm:text-left">
            <span>EGM Siber Suçlarla Mücadele Daire Başkanlığı&apos;na yönlendiriliyorsunuz: </span>
            <strong className="text-red-400 font-mono text-sm">{countdown} sn</strong>
          </div>

          <a
            href="https://www.egm.gov.tr/siber"
            className="px-6 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white font-bold text-xs tracking-wider transition-all inline-flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <span>EGM Siber Suçlar Resmi Portalı</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-zinc-900 pt-4 text-center text-[10px] text-zinc-600 max-w-4xl w-full mx-auto">
        <span>Peony Enterprise Defense Gateway • Incident Response Protocol</span>
      </div>
    </div>
  )
}
