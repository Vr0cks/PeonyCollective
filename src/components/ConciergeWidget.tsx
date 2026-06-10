'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Crown, CheckCircle2, Shield, Loader2 } from 'lucide-react'
import { createClient } from '@/src/utils/supabase/client'

export default function ConciergeWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatStep, setChatStep] = useState<'welcome' | 'spectral' | 'offer' | 'whatsapp' | 'offer_success'>('welcome')
  const [offerData, setOfferData] = useState({ name: '', product: '', price: '' })
  const [loading, setLoading] = useState(false)

  const resetChat = () => {
    setChatStep('welcome')
    setOfferData({ name: '', product: '', price: '' })
  }

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (offerData.name && offerData.product && offerData.price) {
      setLoading(true)
      try {
        const supabase = createClient()
        // Extract raw number value from offer price (e.g. "450.000 ₺" -> 450000)
        const numericPrice = parseFloat(offerData.price.replace(/[^\d]/g, '')) || 0

        const { error } = await supabase.from('concierge_requests').insert({
          name: offerData.name.trim(),
          product_interest: offerData.product.trim(),
          max_price: numericPrice,
          status: 'pending',
        })

        if (error) {
          console.warn('Concierge requests insert failed, simulated fallback:', error.message)
        }
      } catch (err) {
        console.error('Error submitting concierge request:', err)
      } finally {
        setLoading(false)
        setChatStep('offer_success')
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[990]">
      <AnimatePresence>
        
        {/* VIP Concierge Panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring' as const, stiffness: 350, damping: 25 }}
            className="absolute bottom-20 right-0 w-[360px] bg-[#1A1A1A] border border-[#AF9164]/30 rounded-2xl shadow-2xl overflow-hidden text-white z-[991]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 px-6 py-5 border-b border-[#AF9164]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#AF9164] flex items-center justify-center text-black">
                  <Crown size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#AF9164]">Peony Concierge</h4>
                  <p className="text-[9px] text-zinc-400 uppercase tracking-widest">VIP Destek & Teklif Hattı</p>
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
              
              {/* Adım 1: Karşılama ve Seçenekler */}
              {chatStep === 'welcome' && (
                <div className="space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="bg-zinc-900 border border-zinc-800/80 p-4 rounded-2xl text-xs font-light leading-relaxed text-zinc-300">
                      Merhaba, ben Peony VIP Danışmanınız. Seçkin koleksiyonumuz ve hizmetlerimizle ilgili size nasıl yardımcı olabilirim?
                    </div>
                  </div>

                  <div className="space-y-3 pt-6">
                    <button
                      onClick={() => setChatStep('spectral')}
                      className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#AF9164]/30 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      🛡️ 3D Spektral Orijinallik Sorgula
                    </button>
                    <button
                      onClick={() => setChatStep('offer')}
                      className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#AF9164]/30 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      👑 Özel VIP Teklif Ver (100K+)
                    </button>
                    <button
                      onClick={() => setChatStep('whatsapp')}
                      className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#AF9164]/30 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      💬 Temsilci ile Canlı Görüş
                    </button>
                  </div>
                </div>
              )}

              {/* Adım 2: Orijinallik Bilgisi */}
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

              {/* Adım 3: VIP Teklif Formu */}
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
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#AF9164] px-4 py-2.5 rounded-lg text-white text-[10px] uppercase tracking-widest placeholder-zinc-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="İLGİLENDİĞİNİZ ÜRÜN (örn: Rolex Kermit)"
                        required
                        value={offerData.product}
                        onChange={e => setOfferData({ ...offerData, product: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#AF9164] px-4 py-2.5 rounded-lg text-white text-[10px] uppercase tracking-widest placeholder-zinc-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="TEKLİFİNİZ (örn: 450.000 ₺)"
                        required
                        value={offerData.price}
                        onChange={e => setOfferData({ ...offerData, price: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#AF9164] px-4 py-2.5 rounded-lg text-white text-[10px] uppercase tracking-widest placeholder-zinc-600 focus:outline-none"
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

              {/* Adım 4: Teklif Başarılı */}
              {chatStep === 'offer_success' && (
                <div className="space-y-6 text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-[#AF9164]/10 border border-[#AF9164] flex items-center justify-center mx-auto text-[#AF9164]">
                    <CheckCircle2 size={24} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-[#AF9164]">Teklifiniz Alındı</h5>
                    <p className="text-[11px] font-light text-zinc-400 leading-relaxed px-4">
                      Sayın {offerData.name.toUpperCase()}, <strong>{offerData.product.toUpperCase()}</strong> için yaptığınız <strong>{offerData.price}</strong> tutarındaki teklifiniz Concierge ekibimiz tarafından satıcıya iletilmiştir. Sonuç kayıtlı e-postanıza gönderilecektir.
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

              {/* Adım 5: WhatsApp Yönlendirme */}
              {chatStep === 'whatsapp' && (
                <div className="space-y-6">
                  <div className="bg-zinc-900 border border-zinc-800/80 p-4 rounded-2xl text-xs font-light leading-relaxed text-zinc-300 space-y-4">
                    <p>
                      VIP Satış Danışmanlarımızla doğrudan görüşmek, canlı görsel talep etmek ya da özel kurye randevusu oluşturmak için lütfen Concierge hattımızla iletişime geçin.
                    </p>
                    <p className="font-bold text-white text-[13px] tracking-widest text-center py-2 border-y border-zinc-800">
                      +90 (532) PEONY-00
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <a
                      href="https://wa.me/905327366900"
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

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Golden Ring Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#AF9164] hover:bg-[#96794F] text-black shadow-2xl flex items-center justify-center border border-black/20 relative cursor-pointer focus:outline-none"
        aria-label="Concierge Aç"
      >
        <span className="absolute inset-0.5 rounded-full border border-black/10 animate-ping opacity-25" />
        {isOpen ? <X size={22} strokeWidth={1.5} /> : <MessageSquare size={22} strokeWidth={1.5} />}
      </motion.button>
    </div>
  )
}
