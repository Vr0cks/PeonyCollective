import { NextResponse } from 'next/server'
import { getOtoOrderStatus } from '@/src/lib/oto'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('orderId')

  if (!orderId) {
    return NextResponse.json({ error: 'Sipariş Numarası eksik' }, { status: 400 })
  }

  try {
    const status = await getOtoOrderStatus(orderId)
    return NextResponse.json(status)
  } catch (error: any) {
    console.error('OTO Tracking Error:', error)
    return NextResponse.json({ error: error.message || 'Kargo bilgisi alınamadı' }, { status: 500 })
  }
}
