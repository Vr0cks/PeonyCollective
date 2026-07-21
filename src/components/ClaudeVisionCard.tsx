'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ClaudeVisionCardProps {
  productId: string
  initialLog?: {
    claude_verdict?: string
    claude_confidence?: number
    claude_raw_response?: string
  } | null
}

export default function ClaudeVisionCard({ productId, initialLog }: ClaudeVisionCardProps) {
  const [loading, setLoading] = useState(false)
  const [log, setLog] = useState(initialLog || null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()

  const handleRunAnalysis = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      const res = await fetch('/api/vision-precheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Analiz başlatılamadı.')
      }

      setLog({
        claude_verdict: data.result?.verdict,
        claude_confidence: data.result?.confidence,
        claude_raw_response: data.result?.reasoning
      })
      router.refresh()
    } catch (err: any) {
      console.error('Claude Vision error:', err)
      setErrorMsg(err.message || 'Analiz sırasında bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  const getVerdictBadge = (verdict?: string) => {
    if (!verdict) return null
    if (verdict === 'suspicious' || verdict === 'likely_fake') {
      return (
        <span className="text-[9.5px] bg-red-500/20 text-red-400 px-2.5 py-1 rounded border border-red-500/30 font-semibold tracking-wider flex items-center gap-1">
          ⚠️ ŞÜPHELİ / UYUMSUZ
        </span>
      )
    }
    if (verdict === 'likely_authentic') {
      return (
        <span className="text-[9.5px] bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/30 font-semibold tracking-wider flex items-center gap-1">
          ✓ ORİJİNAL OLABİLİR
        </span>
      )
    }
    return null
  }

  return (
    <div className="bg-[#18191E] border border-[#AF9164]/30 rounded-xl p-4 mt-2 shadow-lg relative z-30">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#AF9164] flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full bg-[#AF9164] ${loading ? 'animate-ping' : 'animate-pulse'}`} /> ✦ PEONY LAB GÖRSEL ANALİZ RAPORU
        </span>
        <div className="flex items-center gap-2">
          {log?.claude_verdict && getVerdictBadge(log.claude_verdict)}
          <span className="text-[9.5px] bg-[#AF9164]/10 text-[#AF9164] px-2.5 py-1 rounded border border-[#AF9164]/30 font-semibold tracking-wider">
            {log && typeof log.claude_confidence === 'number' 
              ? `Güven Skoru: %${log.claude_confidence}` 
              : loading ? 'İnceleniyor...' : 'Bekliyor'}
          </span>
        </div>
      </div>

      <p className="text-xs text-neutral-300 leading-relaxed font-sans min-h-[40px] whitespace-pre-wrap">
        {loading ? (
          <span className="flex items-center gap-2 text-[#AF9164] animate-pulse py-2">
            <svg className="animate-spin h-4 w-4 text-[#AF9164]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Fotoğraflar Claude 3.5 Sonnet Vision AI tarafından analiz ediliyor, lütfen bekleyin...
          </span>
        ) : log ? (
          log.claude_raw_response || 'Analiz raporu boş döndü.'
        ) : errorMsg ? (
          <span className="text-red-400 font-medium">{errorMsg}</span>
        ) : (
          'Fotoğraflar yüklendi. Claude Vision ön inceleme raporu oluşturulmaya hazır.'
        )}
      </p>

      <button 
        onClick={handleRunAnalysis}
        disabled={loading}
        type="button"
        className={`mt-3 w-full py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-[1.5px] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
          loading 
            ? 'bg-[#AF9164]/50 text-white/70 cursor-not-allowed' 
            : 'bg-[#AF9164] hover:bg-[#96794F] text-white'
        }`}
      >
        {loading ? (
          <>
            <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            CLAUDE VISION İNCELİYOR...
          </>
        ) : log ? (
          '🔄 YENİDEN ANALİZ ET'
        ) : (
          '⚡ CLAUDE VISION ANALİZİNİ BAŞLAT'
        )}
      </button>
    </div>
  )
}
