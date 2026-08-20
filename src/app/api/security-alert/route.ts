import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { ip, target, userAgent } = await request.json()

    const botToken = process.env.TELEGRAM_BOT_TOKEN || '8445991080:AAHzYmgYwxvYgTyrKpQC4-SLvLuaKrLD29k'
    const chatId = process.env.TELEGRAM_CHAT_ID || '7752066304'

    const text = `🚨 *YETKİSİZ ERİŞİM GİRİŞİMİ TESPİT EDİLDİ*\n\n` +
      `🌐 *Site:* Peony Collective Vitrin\n` +
      `📍 *Hedef Dizin:* \`${target || '/admin'}\`\n` +
      `👤 *Saldırgan IP:* \`${ip || 'Bilinmiyor'}\`\n` +
      `💻 *Cihaz/Tarayıcı:* ${String(userAgent || '').slice(0, 120)}\n` +
      `⏰ *Zaman:* ${new Date().toLocaleString('tr-TR')}\n\n` +
      `_Kullanıcı TCK Bilişim Suçları ve EGM Siber İhbar sistemine yönlendirildi._`

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Security alert telegram error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
