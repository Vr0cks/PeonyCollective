'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/src/utils/supabase/client'
import { getMessages, sendMessage, markAsRead } from './actions'
import ConversationList from '@/src/components/ConversationList'
import MessageThread from '@/src/components/MessageThread'
import { Conversation, Message } from '@/src/types'

interface MessagesClientProps {
  userId: string
  initialConversations: Conversation[]
  activeId?: string
}

export default function MessagesClient({ userId, initialConversations, activeId }: MessagesClientProps) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [activeConversationId, setActiveConversationId] = useState(activeId)
  const [messages, setMessages] = useState<Message[]>([])
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  const supabase = useMemo(() => createClient(), [])

  // Find active conversation object
  const activeConversation = conversations.find(c => c.id === activeConversationId)

  // 1. Fetch messages when active conversation changes
  useEffect(() => {
    if (!activeConversationId) return

    async function loadMessages() {
      setLoadingMessages(true)
      const res = await getMessages(activeConversationId!)
      if (res.success && res.messages) {
        setMessages(res.messages)
        // Mark as read
        await markAsRead(activeConversationId!)
      }
      setLoadingMessages(false)
    }

    loadMessages()
  }, [activeConversationId])

  // 2. Real-time updates for messages
  useEffect(() => {
    if (!activeConversationId) return

    const channel = supabase
      .channel(`room-${activeConversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${activeConversationId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message
          // Check if we already have it to avoid duplicates
          setMessages((prev) => {
            if (prev.some(m => m.id === newMsg.id)) return prev
            return [...prev, newMsg]
          })

          // Mark as read if receiving from other user
          if (newMsg.sender_id !== userId) {
            markAsRead(activeConversationId!)
          }

          // Update sidebar last message
          setConversations((prevConvs) =>
            prevConvs.map((c) =>
              c.id === activeConversationId
                ? {
                    ...c,
                    last_message: newMsg.content,
                    last_message_at: newMsg.created_at,
                  }
                : c
            )
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [activeConversationId, userId, supabase])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || !activeConversationId || sending) return

    setSending(true)
    const content = text.trim()
    setText('') // clear input

    const res = await sendMessage(activeConversationId, content)
    setSending(false)

    if (res.success && res.message) {
      // Append if not already in (realtime handler might have done it)
      setMessages((prev) => {
        if (prev.some(m => m.id === res.message.id)) return prev
        return [...prev, res.message]
      })

      // Update sidebar
      setConversations((prevConvs) =>
        prevConvs.map((c) =>
          c.id === activeConversationId
            ? {
                ...c,
                last_message: content,
                last_message_at: new Date().toISOString(),
              }
            : c
        )
      )
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 h-[90vh] md:h-[800px] min-h-[600px] flex flex-col md:flex-row gap-8">
      {/* Sol Panel: Konuşma Listesi */}
      <div className="w-full md:w-1/3 border border-gray-100 bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col h-full">
        <ConversationList 
          conversations={conversations} 
          activeId={activeConversationId} 
          onSelect={(id) => setActiveConversationId(id)} 
        />
      </div>

      {/* Sağ Panel: Mesaj Alanı */}
      <div className="w-full md:w-2/3 border border-gray-100 bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col h-full">
        {activeConversationId ? (
          <MessageThread
            messages={messages}
            userId={userId}
            loading={loadingMessages}
            conversation={activeConversation}
            inputText={text}
            onChangeInput={setText}
            onSend={handleSend}
            sending={sending}
          />
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-gray-50/20">
            <p className="text-sm text-gray-400 font-light italic">Sohbet seçin veya bir satıcı ile konuşma başlatın.</p>
          </div>
        )}
      </div>
    </div>
  )
}
