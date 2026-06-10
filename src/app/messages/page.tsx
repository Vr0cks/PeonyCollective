import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getConversations, createConversation } from './actions'
import MessagesClient from './MessagesClient'
import { Conversation } from '@/src/types'

export const metadata = {
  title: 'Mesajlarım | Peony Collective',
  description: 'Alıcı ve satıcılarla lüks ürünler hakkında anlık görüşmeler yapın.',
}

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; new?: string; seller?: string; product?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const params = await searchParams

  // 1. Yeni konuşma talebi varsa oluştur ve yönlendir
  if (params.new === 'true' && params.seller) {
    const result = await createConversation(params.seller, params.product)
    if (result.success && result.conversationId) {
      redirect(`/messages?id=${result.conversationId}`)
    }
  }

  // 2. Kullanıcının tüm konuşmalarını çek
  const convsResult = await getConversations()
  const conversations = convsResult.success ? (convsResult.conversations as Conversation[]) || [] : []

  const activeId = params.id || (conversations.length > 0 ? conversations[0].id : undefined)

  return (
    <main className="min-h-screen bg-[#FCFCFB] text-[#1A1A1A]">
      <MessagesClient 
        userId={user.id} 
        initialConversations={conversations} 
        activeId={activeId} 
      />
    </main>
  )
}
