import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')

    if (!imageUrl) {
      return NextResponse.json({ error: 'URL parametresi eksik' }, { status: 400 })
    }

    // 1. Orijinal HEIC dosyasını indir
    const response = await fetch(imageUrl)
    if (!response.ok) {
      return NextResponse.json({ error: 'Resim indirilemedi' }, { status: 400 })
    }

    const arrayBuffer = await response.arrayBuffer()
    const inputBuffer = Buffer.from(arrayBuffer)

    // 2. HEIC'den JPEG'e dönüştür (heic-convert kütüphanesi ile)
    const convert = require('heic-convert')
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.8
    })

    // 3. Tarayıcıya JPEG olarak dön
    return new Response(outputBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=604800, immutable' // 1 hafta önbellekleme
      }
    })
  } catch (error: any) {
    console.error('[HEIC TO JPEG API ERROR]', error)
    return NextResponse.json({ error: error.message || 'Dönüştürme başarısız' }, { status: 500 })
  }
}
