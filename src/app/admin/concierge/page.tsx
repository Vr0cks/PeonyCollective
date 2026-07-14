'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/src/utils/supabase/client'
import { updateConciergeStatusAction, deleteConciergeRequestAction } from './actions'
import { Crown, Check, X, PhoneCall, Trash2, ShieldCheck, Mail, Calendar, Landmark } from 'lucide-react'

export default function AdminConciergePage() {
  const [requests, setRequests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    loadRequests()
  }, [])

  async function loadRequests() {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('concierge_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRequests(data || [])
    } catch (err: any) {
      setErrorMsg(err.message || 'VIP teklifleri yüklenirken hata oluştu.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, status: 'pending' | 'contacted' | 'closed') => {
    setErrorMsg('')
    setSuccessMsg('')
    const res = await updateConciergeStatusAction(id, status)
    if (res.success) {
      setSuccessMsg('Teklif durumu başarıyla güncellendi.')
      loadRequests()
    } else {
      setErrorMsg(res.error || 'Durum güncellenirken hata oluştu.')
    }
  }

  const handleDeleteRequest = async (id: string) => {
    if (!confirm('Bu teklif kaydını silmek istediğinize emin misiniz?')) return
    setErrorMsg('')
    setSuccessMsg('')
    const res = await deleteConciergeRequestAction(id)
    if (res.success) {
      setSuccessMsg('Teklif kaydı başarıyla silindi.')
      loadRequests()
    } else {
      setErrorMsg(res.error || 'Teklif silinirken hata oluştu.')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Bekliyor
          </span>
        )
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
            İletişime Geçildi
          </span>
        )
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Sonuçlandı / Kapandı
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-8 md:pr-24 min-h-full text-white bg-[#0F0F0F]">
      
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-2">Admin Panel</p>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Crown className="text-[#AF9164]" /> VIP Özel Teklifler
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Kullanıcıların Peony Concierge üzerinden ilettiği özel VIP ürün arayışları ve bütçe teklifleri.
        </p>
      </div>

      {/* Messages */}
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
          ⚠️ {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl">
          ✓ {successMsg}
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-white/40 text-sm">
          Yükleniyor...
        </div>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 border border-dashed border-white/10 rounded-2xl text-center bg-white/2">
          <Crown size={40} className="text-white/20 mb-4" />
          <h3 className="text-base font-bold text-white mb-1">VIP Teklif Bulunmuyor</h3>
          <p className="text-white/40 text-xs max-w-sm">Henüz Concierge üzerinden yapılmış özel bir teklif bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-[#111111] border border-white/5 rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/5 text-white/40 uppercase tracking-widest text-[9px] font-bold">
                  <th className="py-4 px-6">Müşteri</th>
                  <th className="py-4 px-6">İlgilenilen Ürün</th>
                  <th className="py-4 px-6">Teklif Tutarı (Maks Bütçe)</th>
                  <th className="py-4 px-6">Tarih</th>
                  <th className="py-4 px-6 text-center">Durum</th>
                  <th className="py-4 px-6 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-[#AF9164] border border-[#AF9164]/20">
                          {req.name ? req.name[0].toUpperCase() : 'C'}
                        </div>
                        <div>
                          <p>{req.name}</p>
                          <p className="text-[10px] text-white/40 font-normal mt-0.5">Concierge VIP Üyesi</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white/80 font-medium">
                      {req.product_interest}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#AF9164] text-sm tracking-wider">
                      {parseFloat(req.max_price || 0).toLocaleString('tr-TR')} ₺
                    </td>
                    <td className="py-4 px-6 text-white/50 space-y-0.5">
                      <div className="flex items-center gap-1.5"><Calendar size={10} /> {new Date(req.created_at).toLocaleDateString('tr-TR')}</div>
                      <div className="text-[10px] opacity-60">{new Date(req.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-1.5">
                        {req.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'contacted')}
                            className="px-2.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                            title="İletişime Geçildi Olarak İşaretle"
                          >
                            <PhoneCall size={12} />
                            <span>Arandı</span>
                          </button>
                        )}
                        {req.status !== 'closed' && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'closed')}
                            className="px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                            title="Sonuçlandır / Kapat"
                          >
                            <Check size={12} />
                            <span>Sonuçlandır</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteRequest(req.id)}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors cursor-pointer"
                          title="Talebi Sil"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
