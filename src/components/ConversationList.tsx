'use client'

import Image from 'next/image'

import { Conversation } from '@/src/types'

interface ConversationListProps {
  conversations: Conversation[]
  activeId?: string
  onSelect: (id: string) => void
}

export default function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Görüşmelerim</h2>
      </div>
      <div className="flex-grow overflow-y-auto divide-y divide-gray-50">
        {conversations.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400 italic font-light">
            Henüz bir mesajlaşma kaydı bulunmuyor.
          </div>
        ) : (
          conversations.map((conv) => {
            const other = conv.other_profile || {}
            const product = conv.product
            const otherName = `${other.first_name || 'Kullanıcı'} ${other.last_name || ''}`.trim()
            const isActive = conv.id === activeId

            return (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`w-full text-left p-5 flex items-center gap-4 transition-colors cursor-pointer border-l-4 ${
                  isActive 
                    ? 'bg-[#AF9164]/5 border-[#AF9164]' 
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                {/* Product/User Thumbnail */}
                <div className="relative w-12 h-15 rounded bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                  {product?.public_images?.[0] ? (
                    <Image 
                      src={product.public_images[0]} 
                      alt={product.model_name || ''} 
                      fill 
                      sizes="48px" 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xs font-bold text-gray-400 uppercase">
                      {otherName ? otherName[0] : 'P'}
                    </div>
                  )}
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xs font-bold text-gray-900 truncate uppercase tracking-wider">{otherName}</h4>
                    <span className="text-[8px] text-gray-400 font-light flex-shrink-0 ml-2">
                      {conv.last_message_at
                        ? new Date(conv.last_message_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
                        : ''}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate font-light mb-1">
                    {conv.last_message || 'Sohbet başlatıldı'}
                  </p>
                  {product && (
                    <p className="text-[9px] text-[#AF9164] uppercase tracking-widest font-bold truncate">
                      {product.brand} {product.model_name}
                    </p>
                  )}
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
