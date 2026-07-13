'use client'

import { useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Send, Loader2 } from 'lucide-react'

import { Conversation, Message } from '@/src/types'
import OfferChatWidget from './OfferChatWidget'
import { maskContactInfo } from '@/src/utils/security'

interface MessageThreadProps {
  messages: Message[]
  userId: string
  loading: boolean
  conversation: Conversation | null | undefined
  inputText: string
  onChangeInput: (val: string) => void
  onSend: (e: React.FormEvent) => void
  sending: boolean
}

export default function MessageThread({
  messages,
  userId,
  loading,
  conversation,
  inputText,
  onChangeInput,
  onSend,
  sending,
}: MessageThreadProps) {
  // Scroll to bottom of message box container only (not body window scroll)
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Smart multi-message phone number reconstruction filter (prevents split number trickery)
  const processedMessages = useMemo(() => {
    if (!messages) return []
    const processed = messages.map(m => ({ ...m }))

    let i = 0
    while (i < processed.length) {
      const senderId = processed[i].sender_id
      const group: typeof processed = []
      let j = i
      while (j < processed.length && processed[j].sender_id === senderId) {
        group.push(processed[j])
        j++
      }

      // Reconstruct combined text of consecutive messages
      const combinedText = group.map(m => m.content).join(' ')
      const digits = combinedText.replace(/\D/g, '')

      // If combined digits form a typical Turkish mobile/landline number or consecutive digits sum to 10-12
      const isPhonePattern = /0?5\d{9}/.test(digits) || (digits.length >= 10 && digits.length <= 12)

      if (isPhonePattern) {
        group.forEach(m => {
          if (/\d+/.test(m.content)) {
            // Replace if message is pure numbers
            if (m.content.replace(/[\s\.-]/g, '').match(/^\d+$/)) {
              m.content = '[İLETİŞİM BİLGİSİ GİZLENDİ]'
            } else {
              m.content = m.content.replace(/\d+[\s\d\.-]*/g, '[İLETİŞİM BİLGİSİ GİZLENDİ]')
            }
          }
        })
      }
      i = j
    }
    return processed
  }, [messages])

  const other = conversation?.other_profile || {}
  const otherName = `${other.first_name || 'Kullanıcı'} ${other.last_name || ''}`.trim()
  const product = conversation?.product

  return (
    <div className="flex flex-col h-full bg-white text-[#1A1A1A]">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-[#AF9164] uppercase border border-gray-100">
            {other.first_name ? other.first_name[0] : 'K'}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">{otherName}</h4>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Aktif Görüşme</p>
          </div>
        </div>

        {/* Optional Linked Product Header Widget */}
        {product && (
          <Link
            href={`/product/${product.id}`}
            className="flex items-center gap-2 border border-[#AF9164]/20 hover:border-[#AF9164] bg-white px-3 py-1.5 rounded-xl transition-all max-w-[200px]"
          >
            <div className="relative w-8 h-10 rounded overflow-hidden flex-shrink-0 bg-gray-50">
              <Image
                src={product.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=100'}
                alt=""
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[9px] font-bold uppercase tracking-wider text-black truncate">{product.brand}</p>
              <p className="text-[8px] text-[#AF9164] font-bold truncate">{(product.price ?? 0).toLocaleString('tr-TR')} ₺</p>
            </div>
          </Link>
        )}
      </div>

      {/* Offer Status & Management (If product exists) */}
      {product && product.id && (
        <OfferChatWidget
          productId={product.id}
          userId={userId}
          sellerId={product.seller_id || ''}
        />
      )}

      {/* Notice Banner */}
      <div className="bg-amber-50/60 border-b border-amber-100/50 px-4 md:px-6 py-2.5 flex items-center justify-between text-[10px] text-amber-800 tracking-wide font-light">
        <div className="flex items-center gap-2">
          <span>⚠️</span>
          <span>Güvenliğiniz için telefon numarası, e-posta veya harici link paylaşmayınız.</span>
        </div>
        <span className="font-bold text-amber-900 shrink-0">Peony Güvencesi</span>
      </div>

      {/* Messages list */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50/20">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#AF9164]" />
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="text-xs text-gray-400 italic font-light">Sohbeti başlatmak için aşağıdan mesaj gönderin.</p>
          </div>
        ) : (
          processedMessages.map((msg) => {
            const isMe = msg.sender_id === userId
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-2xl text-xs leading-relaxed font-light ${
                    isMe
                      ? 'bg-zinc-900 text-white rounded-tr-none'
                      : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p>{maskContactInfo(msg.content)}</p>
                  <span
                    className={`block text-[8px] mt-1 text-right leading-none ${
                      isMe ? 'text-zinc-400' : 'text-gray-400'
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString('tr-TR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      })}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Input box */}
      <form onSubmit={onSend} className="p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-2 border border-gray-200 focus-within:border-[#AF9164] rounded-full px-4 py-2 bg-gray-50/50 transition-colors">
          <input
            type="text"
            value={inputText}
            onChange={(e) => onChangeInput(e.target.value)}
            placeholder="Mesajınızı buraya yazın..."
            className="flex-grow bg-transparent text-xs py-1.5 focus:outline-none placeholder-gray-400 text-gray-800 font-light"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || sending}
            className="w-8 h-8 rounded-full bg-black hover:bg-[#AF9164] disabled:bg-gray-100 text-white disabled:text-gray-300 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed transition-colors"
            aria-label="Gönder"
          >
            {sending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
