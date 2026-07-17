'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Crown, CheckCircle2, Shield, Loader2, Terminal, Server, Activity } from 'lucide-react'
import { createClient } from '@/src/utils/supabase/client'
import { usePathname } from 'next/navigation'
import { sendItSupportPingAction, createConciergeRequestAction, checkSystemStatusAction } from '@/src/app/admin/actions'

export default function ConciergeWidget() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  const [isOpen, setIsOpen] = useState(false)
  const [chatStep, setChatStep] = useState<'welcome' | 'spectral' | 'offer' | 'whatsapp' | 'offer_success' | 'admin_welcome' | 'admin_status' | 'admin_support_form' | 'muse'>('welcome')
  const [offerData, setOfferData] = useState({ name: '', contact: '', product: '', price: '' })
  const [loading, setLoading] = useState(false)
  const [newRequests, setNewRequests] = useState<any[]>([])
  const [supportMessage, setSupportMessage] = useState('')
  const [isSendingPing, setIsSendingPing] = useState(false)
  const [systemStats, setSystemStats] = useState({
    db: 'YÜKLENİYOR...',
    storage: 'YÜKLENİYOR...',
    entrupy: 'YÜKLENİYOR...',
    edge: 'YÜKLENİYOR...'
  })

  // Peony Muse Chatbot States
  const [museInput, setMuseInput] = useState('')
  const [museMessages, setMuseMessages] = useState<Array<{
    id: string
    sender: 'user' | 'muse'
    text: string
    products?: Array<{
      id: string
      brand: string
      model_name: string
      price: number
      image: string
    }>
  }>>([
    {
      id: 'welcome',
      sender: 'muse',
      text: 'Merhaba ben Peony stil küratörünüz Muse. Bugün nereyi ziyaret edeceksiniz veya nasıl bir davete katılacaksınız? Size oranın havasına ve dokusuna en uygun lüks parçaları önereyim.'
    }
  ])

  const handleSendMuseMessage = () => {
    if (!museInput.trim()) return
    const text = museInput.trim()
    const msgId = Date.now().toString()
    setMuseMessages(prev => [...prev, { id: msgId, sender: 'user', text }])
    setMuseInput('')

    setTimeout(() => {
      let reply = ''
      let recs: any[] = []
      const query = text.toLowerCase()

      if (query.includes('tekne') || query.includes('yat') || query.includes('deniz') || query.includes('yacht') || query.includes('plaj') || query.includes('beach') || query.includes('bodrum') || query.includes('çeşme')) {
        reply = 'Harika bir yaz planı! Deniz havası ve yat davetlerinin o rahat ama göz alıcı şıklığı için Loewe\'nin hasır detaylı ikonik el çantasını ve gün ışığında parlayacak Rolex altın saatini öneriyorum.'
        recs = [
          { id: 'loewe-tote', brand: 'LOEWE', model_name: 'Basket Raffia Bag Medium', price: 24500, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' },
          { id: 'rolex-sub', brand: 'ROLEX', model_name: 'Submariner Date Gold', price: 685000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' }
        ]
      } else if (query.includes('akşam') || query.includes('yemek') || query.includes('davet') || query.includes('düğün') || query.includes('gece') || query.includes('party') || query.includes('dinner')) {
        reply = 'Şık bir gece daveti! Gecenin tüm bakışlarını üzerinizde toplamak için siyah deri Chanel Flap bag ve altın detaylı Cartier kolyeyi öneriyorum. Bu klasik şıklık asla modası geçmeyen bir yatırımdır.'
        recs = [
          { id: 'chanel-flap', brand: 'CHANEL', model_name: 'Classic Double Flap Black', price: 345000, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' },
          { id: 'cartier-love', brand: 'CARTIER', model_name: 'Love Necklace Gold', price: 92000, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300' }
        ]
      } else {
        reply = 'Her ortama uyum sağlayacak "Quiet Luxury" (Sessiz Lüks) stilini öneriyorum. Logolar yerine mükemmel dikişleri ve deri kalitesini öne çıkaran Bottega Veneta örgü deri çanta ve Loro Piana keten şıklığı bugün harika duracaktır.'
        recs = [
          { id: 'bottega-cassette', brand: 'BOTTEGA VENETA', model_name: 'Padded Cassette Bag', price: 145000, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' }
        ]
      }

      setMuseMessages(prev => [
        ...prev,
        {
          id: `muse-${Date.now()}`,
          sender: 'muse',
          text: reply,
          products: recs
        }
      ])
    }, 800)
  }

  const handleCheckStatus = async () => {
    setChatStep('admin_status')
    setSystemStats({
      db: 'SORGULANIYOR...',
      storage: 'SORGULANIYOR...',
      entrupy: 'SORGULANIYOR...',
      edge: 'SORGULANIYOR...'
    })
    const res = await checkSystemStatusAction()
    setSystemStats({
      db: res.dbStatus,
      storage: res.storageStatus,
      entrupy: res.entrupyStatus,
      edge: res.edgeStatus
    })
  }

  // Checkout (ödeme) ekranında dikkat dağıtmamak için widget'ı gizle
  if (pathname?.startsWith('/checkout')) {
    return null;
  }

  /**
   * Supabase Realtime Subscription
   * Subscribes to INSERT events on the 'concierge_requests' table.
   * This ensures administrators receive live updates for VIP offers without polling.
   */
  useEffect(() => {
    if (isAdmin) {
      const supabase = createClient()
      const channel = supabase.channel('concierge_requests_channel')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'concierge_requests' },
          (payload) => {
            setNewRequests(prev => [payload.new, ...prev])
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [isAdmin])

  /**
   * State Initialization
   * Resets the chat interface to the appropriate root view based on the user's role authorization.
   */
  useEffect(() => {
    if (isOpen) {
      setChatStep(isAdmin ? 'admin_welcome' : 'welcome')
    }
  }, [isOpen, isAdmin])

  const resetChat = () => {
    setChatStep(isAdmin ? 'admin_welcome' : 'welcome')
    setOfferData({ name: '', contact: '', product: '', price: '' })
  }

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (offerData.name && offerData.contact && offerData.product && offerData.price) {
      setLoading(true)
      try {
        const numericPrice = parseFloat(offerData.price.replace(/[^\d]/g, '')) || 0
        const formattedName = `${offerData.name.trim()} (${offerData.contact.trim()})`
        const res = await createConciergeRequestAction(
          formattedName,
          offerData.product.trim(),
          numericPrice
        )
        if (res.success) {
          setChatStep('offer_success')
        } else {
          alert('Teklif gönderilemedi: ' + res.error)
        }
      } catch (err: any) {
        console.error('Error submitting concierge request:', err)
        alert('Hata oluştu: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
  }

  // Dynamic Theming: Applies administrative styling conventions if the user possesses the 'admin' role.
  const themeColor = isAdmin ? 'emerald-500' : '#AF9164'
  const ThemeIcon = isAdmin ? Terminal : Crown

  return (
    <div className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-[990]">
      <AnimatePresence>
        
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring' as const, stiffness: 350, damping: 25 }}
            className={`absolute bottom-20 right-0 w-[360px] bg-[#1A1A1A] border rounded-2xl shadow-2xl overflow-hidden text-white z-[991] ${isAdmin ? 'border-emerald-500/30' : 'border-[#AF9164]/30'}`}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r from-zinc-900 to-zinc-950 px-6 py-5 border-b flex items-center justify-between ${isAdmin ? 'border-emerald-500/20' : 'border-[#AF9164]/20'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-black ${isAdmin ? 'bg-emerald-500' : 'bg-[#AF9164]'}`}>
                  <ThemeIcon size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-[0.25em] ${isAdmin ? 'text-emerald-500' : 'text-[#AF9164]'}`}>
                    {isAdmin ? 'Systems & Ops' : 'Peony Concierge'}
                  </h4>
                  <p className="text-[9px] text-zinc-400 uppercase tracking-widest">
                    {isAdmin ? 'IT Destek & Altyapı' : 'VIP Destek & Teklif Hattı'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setIsOpen(false); resetChat(); }}
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-1"
                aria-label="Kapat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-6 max-h-[380px] overflow-y-auto min-h-[260px] flex flex-col justify-between">
              
              {/* ADMIN: Karşılama */}
              {chatStep === 'admin_welcome' && (
                <div className="space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="bg-zinc-900 border border-emerald-500/20 p-4 rounded-2xl text-xs font-mono leading-relaxed text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
                      <p className="opacity-50 mb-2">{'> root@peony-core:~#'}</p>
                      Sistem bağlantısı stabil. Veritabanı sekronize. IT Destek Merkezine hoş geldiniz. Nasıl yardımcı olabilirim?
                    </div>

                    {newRequests.length > 0 && (
                      <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl max-h-[100px] overflow-y-auto">
                        <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Yeni Gelen VIP Teklifler ({newRequests.length})
                        </p>
                        {newRequests.map((req, i) => (
                          <div key={i} className="text-[11px] text-white mb-2 pb-2 border-b border-emerald-500/10 last:border-0 last:mb-0 last:pb-0 font-mono">
                            <span className="text-emerald-400 font-bold">{req.name}</span>: {req.product_interest} <br/>
                            <span className="text-zinc-400">Teklif:</span> {req.max_price} ₺
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-6">
                    <button
                      onClick={handleCheckStatus}
                      className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer text-zinc-300 hover:text-emerald-400 group"
                    >
                      <Activity size={12} className="inline mr-2 group-hover:animate-pulse" /> Sistem Durumunu Kontrol Et
                    </button>
                    <button
                      onClick={() => {
                        setChatStep('admin_support_form')
                        setSupportMessage('')
                      }}
                      className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer text-zinc-300 hover:text-emerald-400"
                    >
                      <Terminal size={12} className="inline mr-2" /> Developer Ekibiyle Görüş
                    </button>
                  </div>
                </div>
              )}

              {/* ADMIN: Sistem Durumu */}
              {chatStep === 'admin_status' && (
                <div className="space-y-6 text-left">
                  <div className="bg-zinc-900 border border-emerald-500/20 p-4 rounded-2xl text-xs font-mono leading-relaxed text-emerald-400 space-y-3 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
                    <p className="opacity-50 mb-2">{'> systemctl status peony-services'}</p>
                    <div className="space-y-1 text-[11px]">
                      <p>● Postgres DB: <span className="text-white">{systemStats.db}</span></p>
                      <p>● Next.js Edge: <span className="text-white">{systemStats.edge}</span></p>
                      <p>● Entrupy API: <span className="text-white">{systemStats.entrupy}</span></p>
                      <p>● Supabase Storage: <span className="text-white">{systemStats.storage}</span></p>
                    </div>
                    <p className="pt-2 border-t border-emerald-500/20 mt-2 opacity-80 text-[10px]">
                      {systemStats.db.includes('OFFLINE') || systemStats.storage.includes('OFFLINE')
                        ? 'Bazı servisler yanıt vermiyor.'
                        : 'Tüm altyapı servisleri aktif durumda.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setChatStep('admin_welcome')}
                    className="text-[10px] font-bold text-emerald-500 hover:text-emerald-400 uppercase tracking-widest border-b border-emerald-500/30 pb-0.5 transition-colors cursor-pointer"
                  >
                    ← Konsola Dön
                  </button>
                </div>
              )}

              {/* ADMIN: Destek Mesaj Formu */}
              {chatStep === 'admin_support_form' && (
                <div className="space-y-4 text-left">
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-xs font-light leading-relaxed text-zinc-300">
                    Sistemle ilgili yaşadığınız sorunu veya iletmek istediğiniz mesajı yazın. Telegram botu aracılığıyla ekibimize anında iletilecektir.
                  </div>
                  <textarea
                    rows={4}
                    className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-white resize-none"
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Lütfen mesajınızı detaylıca yazın..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!supportMessage.trim()) {
                          alert('Lütfen boş bir mesaj göndermeyin.')
                          return
                        }
                        setIsSendingPing(true)
                        const res = await sendItSupportPingAction(supportMessage)
                        setIsSendingPing(false)
                        if (res.success) {
                          alert('Mesajınız Telegram üzerinden anlık olarak ekibimize ulaştırıldı.')
                          setChatStep('admin_welcome')
                          setSupportMessage('')
                        } else {
                          alert('Hata: ' + res.error)
                        }
                      }}
                      disabled={isSendingPing}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-wider transition-colors cursor-pointer text-center"
                    >
                      {isSendingPing ? 'Gönderiliyor...' : 'Telegram ile Gönder'}
                    </button>
                    <button
                      onClick={() => setChatStep('admin_welcome')}
                      className="px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 py-2.5 rounded-xl text-[10px] uppercase tracking-wider cursor-pointer"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              )}

              {/* USER: Karşılama ve Seçenekler */}
              {chatStep === 'welcome' && (
                <div className="space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="bg-zinc-900 border border-zinc-800/80 p-4 rounded-2xl text-xs font-light leading-relaxed text-zinc-300">
                      Merhaba, ben Peony VIP Danışmanınız. Seçkin koleksiyonumuz ve hizmetlerimizle ilgili size nasıl yardımcı olabilirim?
                    </div>
                  </div>

                  <div className="space-y-3 pt-6">
                    <button
                      onClick={() => setChatStep('muse')}
                      className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-[#AF9164]/50 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer text-white flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2">✨ <span>Peony Muse Stil Sohbeti</span></span>
                      <span className="text-[8px] bg-[#AF9164]/10 text-[#AF9164] group-hover:bg-[#AF9164] group-hover:text-black px-1.5 py-0.5 rounded transition-all">YENİ</span>
                    </button>
                    <button
                      onClick={() => setChatStep('spectral')}
                      className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#AF9164]/30 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer text-white"
                    >
                      🛡️ 3D Spektral Orijinallik Sorgula
                    </button>
                    <button
                      onClick={() => setChatStep('offer')}
                      className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#AF9164]/30 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer text-white"
                    >
                      👑 Özel VIP Teklif Ver (100K+)
                    </button>
                    <button
                      onClick={() => setChatStep('whatsapp')}
                      className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#AF9164]/30 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer text-white"
                    >
                      💬 Temsilci ile Canlı Görüş
                    </button>
                  </div>
                </div>
              )}

              {/* USER: Orijinallik Bilgisi */}
              {chatStep === 'spectral' && (
                <div className="space-y-6">
                  <div className="bg-zinc-900 border border-zinc-800/80 p-4 rounded-2xl text-xs font-light leading-relaxed text-zinc-300 space-y-3">
                    <p className="font-bold text-[#AF9164] flex items-center gap-1.5 uppercase text-[9px] tracking-widest">
                      <Shield size={12} /> Peony Lab™ Güvencesi
                    </p>
                    <p>
                      Sistemimizdeki tüm arşiv parçaları 32 noktalı fiziksel inceleme ve 3D Spektral Analizden geçirilmektedir.
                    </p>
                    <p>
                      İlgilendiğiniz ürünün sayfasında bulunan <strong>&quot;Dijital Pasaportu Görüntüle&quot;</strong> butonuna tıklayarak laboratuvar raporunu, orijinallik puanını ve blokzincir kontrat kayıtlarını canlı olarak inceleyebilirsiniz.
                    </p>
                  </div>
                  <button
                    onClick={() => setChatStep('welcome')}
                    className="text-[10px] font-bold text-[#AF9164] hover:text-white uppercase tracking-widest border-b border-[#AF9164]/30 pb-0.5 transition-colors cursor-pointer"
                  >
                    ← Ana Menüye Dön
                  </button>
                </div>
              )}

              {/* USER: VIP Teklif Formu */}
              {chatStep === 'offer' && (
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">VIP Özel Teklif Formu</p>
                  <form onSubmit={handleOfferSubmit} className="space-y-3 text-xs">
                    <div>
                      <input
                        type="text"
                        placeholder="ADINIZ SOYADINIZ"
                        required
                        value={offerData.name}
                        onChange={e => setOfferData({ ...offerData, name: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#AF9164] px-4 py-2.5 rounded-lg text-white text-[10px] tracking-widest placeholder-zinc-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="İLETİŞİM (E-POSTA VEYA TELEFON)"
                        required
                        value={offerData.contact}
                        onChange={e => setOfferData({ ...offerData, contact: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#AF9164] px-4 py-2.5 rounded-lg text-white text-[10px] tracking-widest placeholder-zinc-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="İLGİLENDİĞİNİZ ÜRÜN (örn: Rolex Kermit)"
                        required
                        value={offerData.product}
                        onChange={e => setOfferData({ ...offerData, product: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#AF9164] px-4 py-2.5 rounded-lg text-white text-[10px] tracking-widest placeholder-zinc-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="TEKLİFİNİZ (örn: 450.000 ₺)"
                        required
                        value={offerData.price}
                        onChange={e => setOfferData({ ...offerData, price: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#AF9164] px-4 py-2.5 rounded-lg text-white text-[10px] tracking-widest placeholder-zinc-600 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#AF9164] hover:bg-[#96794F] text-black font-bold uppercase tracking-widest text-[9px] py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {loading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send size={12} />
                      )}
                      Teklifi Concierge&apos;e İlet
                    </button>
                  </form>
                  <button
                    onClick={() => setChatStep('welcome')}
                    className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest border-b border-zinc-800 pb-0.5 transition-colors cursor-pointer"
                  >
                    ← İptal Et
                  </button>
                </div>
              )}

              {/* USER: Teklif Başarılı */}
              {chatStep === 'offer_success' && (
                <div className="space-y-6 text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-[#AF9164]/10 border border-[#AF9164] flex items-center justify-center mx-auto text-[#AF9164]">
                    <CheckCircle2 size={24} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-[#AF9164]">Teklifiniz Alındı</h5>
                    <p className="text-[11px] font-light text-zinc-400 leading-relaxed px-4">
                      Sayın {offerData.name.toUpperCase()}, <strong>{offerData.product.toUpperCase()}</strong> için yaptığınız <strong>{offerData.price}</strong> tutarındaki teklifiniz Concierge ekibimiz tarafından satıcıya iletilmiştir. Sonuç kayıtlı e-postanıza gönderilecektir. <br/>
                      <span className="text-[9px] text-[#AF9164] mt-1.5 block font-light italic">ℹ Danışmanlarımızın cevap vermesi 2 saati bulabilir.</span>
                    </p>
                  </div>
                  <button
                    onClick={resetChat}
                    className="bg-zinc-900 border border-zinc-800 px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-zinc-300 hover:text-[#AF9164] transition-colors cursor-pointer"
                  >
                    Harika
                  </button>
                </div>
              )}

              {/* USER: WhatsApp Yönlendirme */}
              {chatStep === 'whatsapp' && (
                <div className="space-y-6">
                  <div className="bg-zinc-900 border border-zinc-800/80 p-4 rounded-2xl text-xs font-light leading-relaxed text-zinc-300 space-y-4">
                    <p>
                      VIP Satış Danışmanlarımızla doğrudan görüşmek, canlı görsel talep etmek ya da özel kurye randevusu oluşturmak için lütfen Concierge hattımızla iletişime geçin.
                    </p>
                    <p className="font-bold text-white text-[13px] tracking-widest text-center py-2 border-y border-zinc-800">
                      +90 552 365 20 93
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <a
                      href="https://wa.me/905523652093"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-all"
                    >
                      WhatsApp&apos;ı Aç
                    </a>
                    <button
                      onClick={() => setChatStep('welcome')}
                      className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Ana Menü
                    </button>
                  </div>
                </div>
              )}

              {/* USER: Peony Muse Stil Sohbeti */}
              {chatStep === 'muse' && (
                <div className="space-y-4 flex flex-col h-[320px] text-left">
                  {/* Chat messages */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                    {museMessages.map((msg) => {
                      const isMe = msg.sender === 'user'
                      return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[85%] rounded-xl p-2.5 leading-relaxed ${
                            isMe 
                              ? 'bg-[#AF9164] text-black rounded-tr-none font-bold' 
                              : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none'
                          }`}>
                            {msg.text}
                          </div>

                          {/* Recs */}
                          {msg.products && msg.products.length > 0 && (
                            <div className="mt-2 w-full space-y-1.5">
                              <p className="text-[8px] font-bold text-[#AF9164] uppercase tracking-wider">Küratörün Seçtikleri:</p>
                              <div className="flex gap-2 overflow-x-auto pb-1">
                                {msg.products.map((prod) => (
                                  <a 
                                    key={prod.id} 
                                    href="/#collection"
                                    onClick={() => setIsOpen(false)}
                                    className="w-[100px] bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden block shrink-0 hover:border-[#AF9164] transition-colors"
                                  >
                                    <div className="relative h-[65px] w-full bg-zinc-800">
                                      <img src={prod.image} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="p-1.5 space-y-0.5">
                                      <p className="text-[7px] font-bold text-[#AF9164] tracking-wider uppercase">{prod.brand}</p>
                                      <h5 className="text-[8px] text-white truncate">{prod.model_name}</h5>
                                      <p className="text-[8px] text-zinc-400">{(prod.price ?? 0).toLocaleString('tr-TR')} ₺</p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Input area */}
                  <div className="pt-2 border-t border-zinc-800 flex gap-2 items-center">
                    <input 
                      type="text" 
                      placeholder="Bugün nereye gidiyorsunuz?" 
                      value={museInput}
                      onChange={(e) => setMuseInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMuseMessage()}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-[10px] text-white placeholder-zinc-500 focus:outline-none focus:border-[#AF9164] transition-all"
                    />
                    <button 
                      onClick={handleSendMuseMessage}
                      className="text-[9px] font-bold text-[#AF9164] tracking-widest uppercase px-2 py-1.5 cursor-pointer hover:text-white transition-colors"
                    >
                      SOR
                    </button>
                  </div>

                  <button
                    onClick={() => setChatStep('welcome')}
                    className="text-[9px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest border-b border-zinc-800 pb-0.5 transition-colors cursor-pointer self-start mt-1"
                  >
                    ← Menüye Dön
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full text-black shadow-2xl flex items-center justify-center border relative cursor-pointer focus:outline-none transition-colors ${
          isAdmin ? 'bg-emerald-500 hover:bg-emerald-400 border-emerald-400/20' : 'bg-[#AF9164] hover:bg-[#96794F] border-black/20'
        }`}
        aria-label="Destek Aç"
      >
        <span className="absolute inset-0.5 rounded-full border border-black/10 animate-ping opacity-25" />
        {isOpen ? <X size={22} strokeWidth={1.5} /> : <ThemeIcon size={22} strokeWidth={1.5} />}
      </motion.button>
    </div>
  )
}
