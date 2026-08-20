'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ShieldAlert, Terminal, Lock, AlertTriangle, Scale, ExternalLink } from 'lucide-react'

export default function SecurityIncidentPage() {
  const searchParams = useSearchParams()
  const targetParam = searchParams.get('target') || '/admin'
  const [ip, setIp] = useState<string>('Tespit Ediliyor...')
  const [target, setTarget] = useState(targetParam)
  const [countdown, setCountdown] = useState(6)
  const [userAgent, setUserAgent] = useState('')

  useEffect(() => {
    const ua = navigator.userAgent || 'Mozilla/5.0'
    setUserAgent(ua)

    // Fetch real visitor IP
    async function initIncident() {
      let clientIp = '127.0.0.1'
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json')
        const ipData = await ipRes.json()
        if (ipData?.ip) {
          clientIp = ipData.ip
          setIp(ipData.ip)
        }
      } catch (_) {
        setIp('192.168.1.1 (Masked)')
      }

      // Send silent instant Telegram alert
      try {
        await fetch('/api/security-alert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ip: clientIp,
            target: targetParam,
            userAgent: ua,
          }),
        })
      } catch (_) {}
    }

    initIncident()

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = 'https://onlineislemler.egm.gov.tr/siber-ihbar'
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetParam])

  return (
    <div className="min-h-screen bg-[#07080A] text-red-100 flex items-center justify-center p-4 sm:p-6 font-mono selection:bg-red-600 selection:text-white">
      <div className="w-full max-w-2xl bg-[#0D0F14] border-2 border-red-600/80 rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(220,38,38,0.25)] space-y-6 relative overflow-hidden">
        
        {/* Glowing Top Danger Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-pulse" />

        {/* Header Incident */}
        <div className="flex items-center gap-4 border-b border-red-900/50 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-600/60 flex items-center justify-center text-red-500 shadow-lg shadow-red-900/30 shrink-0">
            <ShieldAlert size={36} className="animate-bounce" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-400 block">
              ADLİ SİBER GÜVENLİK ALARMI • PROTOKOL 5237
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide mt-1">
              YETKİSİZ ERİŞİM TESPİT EDİLDİ
            </h1>
            <p className="text-xs text-red-400/80 font-sans mt-0.5">
              Bu sistem özel mülkiyettir ve 7/24 adli siber izleme altındadır.
            </p>
          </div>
        </div>

        {/* Attacker Log Table */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-red-900/60 space-y-3 text-xs">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">KAYDEDİLEN IP ADRESİ:</span>
            <span className="font-bold text-red-400 text-sm tracking-wider">{ip}</span>
          </div>

          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">HEDEF GÜVENLİK DİZİNİ:</span>
            <span className="text-amber-400 font-semibold">{target}</span>
          </div>

          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">ZAMAN DAMGASI:</span>
            <span className="text-zinc-300">{new Date().toLocaleString('tr-TR')}</span>
          </div>

          <div className="flex justify-between items-start pt-1">
            <span className="text-zinc-500 shrink-0 mr-2">CİHAZ PARMAK İZİ:</span>
            <span className="text-zinc-400 text-[11px] break-all text-right font-sans truncate max-w-xs">
              {userAgent || 'Tespit Ediliyor...'}
            </span>
          </div>
        </div>

        {/* Legal Article Warning */}
        <div className="p-4 rounded-2xl bg-red-950/30 border border-red-600/30 space-y-2 text-xs font-sans">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider font-mono">
            <Scale size={16} /> 5237 Sayılı Türk Ceza Kanunu (TCK)
          </div>
          <p className="text-zinc-300 text-xs leading-relaxed font-light">
            <strong>Madde 243 &amp; 244:</strong> Bir bilişim sisteminin bütününe veya bir kısmına, hukuka aykırı olarak giren veya orada kalmaya devam eden kimseye hapis veya adli para cezası verilir. IP adresiniz, servis sağlayıcınız ve sistem günlüğünüz 5237 sayılı TCK uyarınca adli delil havuzunda kayıt altına alınmış olup, yetkili adli mercilere suç duyurusunda bulunulmak üzere arşivlenmektedir.
          </p>
        </div>

        {/* Redirect Timer & Direct Link */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800 text-xs">
          <div className="text-zinc-400 text-center sm:text-left">
            <span>EGM Siber İhbar Portalı&apos;na aktarılıyorsunuz: </span>
            <strong className="text-red-400 text-sm font-mono">{countdown} sn</strong>
          </div>

          <a
            href="https://onlineislemler.egm.gov.tr/siber-ihbar"
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider transition-all inline-flex items-center gap-2 shadow-lg shadow-red-900/40 cursor-pointer"
          >
            <span>EGM Siber İhbar Portalı</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  )
}
