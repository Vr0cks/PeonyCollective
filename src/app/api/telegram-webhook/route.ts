import { NextResponse } from 'next/server'
import { createAdminClient } from '@/src/utils/supabase/server'

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tokenParam = searchParams.get('token')
    const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN

    // Güvenlik Kontrolü: Gelen webhook isteğinin bizim botumuzdan gelip gelmediğini doğrula
    if (tokenParam !== botToken) {
      return NextResponse.json({ error: 'Yetkisiz webhook çağrısı' }, { status: 401 })
    }

    const body = await request.json()
    console.log('[TELEGRAM WEBHOOK RECEIVED BODY]', JSON.stringify(body))

    const message = body?.message
    const replyToMessage = message?.reply_to_message

    if (replyToMessage && message?.text) {
      const origTelegramMsgId = replyToMessage.message_id
      const developerReply = message.text

      // 1. RLS bypass eden admin client'ı ile ilgili bileti bul ve güncelle
      const adminDb = createAdminClient()
      const { data: ticket, error: fetchError } = await adminDb
        .from('it_support_tickets')
        .select('*')
        .eq('telegram_message_id', String(origTelegramMsgId))
        .single()

      if (fetchError || !ticket) {
        console.warn('[TELEGRAM WEBHOOK] Ticket not found for telegram_message_id:', origTelegramMsgId)
        return NextResponse.json({ ok: true, status: 'Ticket not found' })
      }

      // 2. Cevabı yaz ve durumunu güncelle
      const { error: updateError } = await adminDb
        .from('it_support_tickets')
        .update({
          reply: developerReply,
          status: 'replied',
          replied_at: new Date().toISOString()
        })
        .eq('id', ticket.id)

      if (updateError) {
        console.error('[TELEGRAM WEBHOOK] Update ticket reply error:', updateError.message)
        return NextResponse.json({ error: updateError.message }, { status: 500 })
      }

      // 3. Telegram grubuna veya bota "Cevap sisteme işlendi" bildirimi geri gönder (İsteğe bağlı, temiz geri bildirim)
      const chat_id = message.chat.id
      const feedbackMessage = `✅ *Cevabınız sisteme başarıyla işlendi!*\n\n📌 *Talep ID:* \`${ticket.id}\`\n💬 *İletilen Cevap:* _${developerReply}_`

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chat_id,
          text: feedbackMessage,
          parse_mode: 'Markdown',
          reply_to_message_id: message.message_id
        })
      }).catch(err => console.error('[TELEGRAM WEBHOOK FEEDBACK ERROR]', err))
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('[TELEGRAM WEBHOOK ROUTE ERROR]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
