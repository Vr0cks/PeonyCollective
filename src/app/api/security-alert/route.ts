import { NextRequest, NextResponse } from 'next/server'

function parseUserAgent(ua: string): string {
  let os = 'Bilinmeyen İşletim Sistemi'
  if (ua.includes('Windows NT 10.0')) os = 'Windows 10/11 (64-Bit)'
  else if (ua.includes('Windows NT')) os = 'Windows PC'
  else if (ua.includes('Mac OS X')) os = 'Apple macOS'
  else if (ua.includes('iPhone')) os = 'Apple iPhone (iOS)'
  else if (ua.includes('iPad')) os = 'Apple iPad (iPadOS)'
  else if (ua.includes('Android')) os = 'Google Android'
  else if (ua.includes('Linux')) os = 'Linux / Kali / Unix'

  let browser = 'Bilinmeyen Tarayıcı'
  if (ua.includes('OPR/') || ua.includes('Opera')) browser = 'Opera / Opera GX'
  else if (ua.includes('Edg/')) browser = 'Microsoft Edge'
  else if (ua.includes('Chrome/')) browser = 'Google Chrome'
  else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox'
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Apple Safari'

  return `${os} • ${browser}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))

    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const vercelIp = request.headers.get('x-vercel-forwarded-for')
    const cfIp = request.headers.get('cf-connecting-ip')

    let rawIp = body.ip || forwarded?.split(',')[0]?.trim() || realIp || vercelIp || cfIp || 'Bilinmiyor'
    const target = body.target || '/admin'
    const userAgent = body.userAgent || request.headers.get('user-agent') || 'Bilinmeyen Tarayıcı'
    const cleanDevice = parseUserAgent(userAgent)

    // Türkiye Saati (TSİ - GMT+3)
    const istTime = new Date().toLocaleString('tr-TR', {
      timeZone: 'Europe/Istanbul',
      dateStyle: 'long',
      timeStyle: 'medium',
    })

    // Geo-IP & ISP / VPN Sorgusu
    let locationStr = 'Türkiye 🇹🇷'
    let ispStr = 'Bilinmeyen ISS'
    let isVpn = false

    if (rawIp && rawIp !== '127.0.0.1' && rawIp !== '::1' && !rawIp.startsWith('192.168.')) {
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
      `💻 *Cihaz & Tarayıcı:* ${cleanDevice}\n` +
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

    return NextResponse.json({ ok: true, ip: rawIp, location: locationStr, isp: ispStr, device: cleanDevice, time: istTime })
  } catch (err: any) {
    console.error('Security alert error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
