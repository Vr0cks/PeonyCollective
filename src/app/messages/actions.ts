'use server'
import { createClient } from '@/src/utils/supabase/server'

export async function sendMessage(conversationId: string, content: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('messages').insert({
    conversation_id: conversationId,
    sender_id: user.id,
    content: content
  })
}
