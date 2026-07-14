'use client'

import { useState, useEffect } from 'react'
import { getItSupportTicketsAction, respondToSupportTicketAction, deleteSupportTicketAction } from './actions'
import { HelpCircle, Reply, Trash2, Calendar, User, MessageSquare, Terminal } from 'lucide-react'

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Reply Modal/Input state
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadTickets()
  }, [])

  async function loadTickets() {
    setIsLoading(true)
    const res = await getItSupportTicketsAction()
    if (res.success) {
      setTickets(res.tickets || [])
    } else {
      setErrorMsg(res.error || 'Destek talepleri yüklenemedi.')
    }
    setIsLoading(false)
  }

  const handleSendReply = async (ticketId: string) => {
    if (!replyText.trim()) return
    setIsSubmitting(true)
    setErrorMsg('')
    setSuccessMsg('')
    const res = await respondToSupportTicketAction(ticketId, replyText.trim())
    setIsSubmitting(false)
    if (res.success) {
      setSuccessMsg('Cevabınız başarıyla iletildi ve bilet güncellendi.')
      setReplyText('')
      setActiveReplyId(null)
      loadTickets()
    } else {
      setErrorMsg(res.error || 'Cevap iletilirken hata oluştu.')
    }
  }

  const handleDeleteTicket = async (ticketId: string) => {
    if (!confirm('Bu destek talebini silmek istediğinize emin misiniz?')) return
    setErrorMsg('')
    setSuccessMsg('')
    const res = await deleteSupportTicketAction(ticketId)
    if (res.success) {
      setSuccessMsg('Tepel kaydı başarıyla silindi.')
      loadTickets()
    } else {
      setErrorMsg(res.error || 'Bilet silinirken hata oluştu.')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Cevap Bekliyor
          </span>
        )
      case 'replied':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Cevaplandı
          </span>
        )
      case 'closed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
            Kapatıldı
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
          <HelpCircle className="text-[#AF9164]" /> IT Destek Talepleri
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Yöneticilerin veya ekip üyelerinin IT / Altyapı birimine ilettiği mesajlar ve geliştirici yanıtları.
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
      ) : tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 border border-dashed border-white/10 rounded-2xl text-center bg-white/2">
          <HelpCircle size={40} className="text-white/20 mb-4" />
          <h3 className="text-base font-bold text-white mb-1">Destek Talebi Bulunmuyor</h3>
          <p className="text-white/40 text-xs max-w-sm">Henüz hiçbir ekip üyesi IT destek talebinde bulunmadı.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {tickets.map((ticket) => {
            const userName = ticket.profiles
              ? `${ticket.profiles.first_name || ''} ${ticket.profiles.last_name || ''}`.trim()
              : 'Bilinmeyen Admin'

            return (
              <div 
                key={ticket.id} 
                className={`p-6 bg-[#111111] border rounded-2xl transition-all duration-300 ${
                  ticket.status === 'open' ? 'border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.02)]' : 'border-white/5'
                }`}
              >
                {/* Meta */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-emerald-400 border border-emerald-500/10">
                      {userName[0]?.toUpperCase() || 'A'}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{userName}</h4>
                      <p className="text-[10px] text-white/40 flex items-center gap-1 mt-0.5"><Calendar size={10} /> {new Date(ticket.created_at).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(ticket.status)}
                    <button
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors cursor-pointer"
                      title="Talebi Sil"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <p className="text-[10px] text-emerald-400/50 uppercase tracking-widest font-bold mb-1">Destek Talebi:</p>
                  <p className="text-xs text-white/80 leading-relaxed bg-white/2 p-3.5 rounded-xl border border-white/5 font-mono">{ticket.message}</p>
                </div>

                {/* Reply */}
                {ticket.reply ? (
                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl text-xs">
                    <p className="text-[9px] text-emerald-400 uppercase tracking-widest font-bold mb-1 flex items-center gap-1">
                      <Terminal size={10} /> Developer / Sistem Cevabı:
                    </p>
                    <p className="text-white/80 leading-relaxed font-mono">{ticket.reply}</p>
                    {ticket.replied_at && (
                      <p className="text-[8px] text-white/30 mt-2 font-sans">Cevaplama Zamanı: {new Date(ticket.replied_at).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}</p>
                    )}
                  </div>
                ) : (
                  <div className="mt-4">
                    {activeReplyId === ticket.id ? (
                      <div className="space-y-3">
                        <textarea
                          rows={3}
                          className="w-full text-xs p-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-white resize-none"
                          placeholder="Yanıtınızı buraya yazın..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSendReply(ticket.id)}
                            disabled={isSubmitting || !replyText.trim()}
                            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            {isSubmitting ? 'Gönderiliyor...' : 'Yanıtı Gönder'}
                          </button>
                          <button
                            onClick={() => {
                              setActiveReplyId(null)
                              setReplyText('')
                            }}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-400 rounded-lg text-[10px] uppercase tracking-wider cursor-pointer"
                          >
                            İptal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveReplyId(ticket.id)
                          setReplyText('')
                        }}
                        className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[#AF9164] hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Reply size={11} />
                        <span>Talebe Yanıt Yaz</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
