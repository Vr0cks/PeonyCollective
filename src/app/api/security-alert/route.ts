import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const rawIp = body.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'Bilinmiyor'
    const target = body.target || '/admin'
    const userAgent = body.userAgent || request.headers.get('user-agent') || 'Bilinmeyen Tarayıcı'

    // Türkiye Saati (TSİ - GMT+3)
    const istTime = new Date().toLocaleString('tr-TR', {
      timeZone: 'Europe/Istanbul',
      dateStyle: 'long',
      timeStyle: 'medium',
    })

    // Geo-IP & ISP / VPN Sorgusu
    let locationStr = 'Konum Analiz Edilemedi'
    let ispStr = 'Bilinmeyen ISS'
    let isVpn = false

    if (rawIp && rawIp !== '127.0.0.1' && !rawIp.startsWith('192.168.')) {
      try {
        const geoRes = await fetch(`https://ipwho.is/${rawIp}`, { cache: 'no-store' })
        if (geoRes.ok) {
          const geoData = await geoRes.json()
          if (geoData.success) {
            locationStr = `${geoData.city ? geoData.city + ', ' : ''}${geoData.country || 'Bilinmiyor'} ${geoData.flag?.emoji || '🌍'}`
            ispStr = geoData.connection?.isp || geoData.connection?.org || 'Bilinmeyen ISS'
            isVpn = !!geoData.security?.vpn || !!geoData.security?.proxy || !!geoData.security?.tor
          }
        }
      } catch (_) {}
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN || '8445991080:AAHzYmgYwxvYgTyrKpQC4-SLvLuaKrLD29k'
    const chatId = process.env.TELEGRAM_CHAT_ID || '7752066304'

    const text = `🚨 *YETKİSİZ ERİŞİM GİRİŞİMİ TESPİT EDİLDİ*\n\n` +
      `🌐 *Sistem:* Peony Collective Vitrin (Honeypot)\n` +
      `📍 *Hedef Dizin:* \`${target}\`\n` +
      `👤 *Saldırgan IP:* \`${rawIp}\`\n` +
      `🌍 *Konum:* ${locationStr}\n` +
      `🏢 *ISS / Ağ:* ${ispStr} ${isVpn ? '🛡️ _(VPN/Proxy Tespiti: Var)_' : ''}\n` +
      `💻 *Cihaz/Tarayıcı:* ${String(userAgent).slice(0, 100)}\n` +
      `⏰ *Zaman (TSİ):* ${istTime} (GMT+3)\n\n` +
      `_Saldırgan TCK Bilişim Suçları delil ekranı ve EGM Siber İhbar sistemine yönlendirildi._`

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    })

    return NextResponse.json({ ok: true, location: locationStr, isp: ispStr, time: istTime })
  } catch (err: any) {
    console.error('Security alert error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
