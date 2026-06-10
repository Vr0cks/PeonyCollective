import { NextResponse } from 'next/server'
import { getOtoAccessToken, createOtoOrder } from '@/src/lib/oto'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action') || 'token'

  try {
    const accessToken = await getOtoAccessToken()

    if (action === 'token') {
      return NextResponse.json({ success: true, tokenPreview: accessToken.substring(0, 40) + '...' })
    }

    if (action === 'create_test_order') {
      const otoResponse = await createOtoOrder({
        orderId: `TEST-${Date.now()}`,
        description: 'Test Luxury Bag',
        weightGrams: 500,
        createShipment: true,
        senderInformation: {
          firstName: 'Test Seller',
          lastName: 'Test',
          phone: '+905554443322',
          address: 'Test Mah. Test Sok. No:1',
          city: 'Istanbul',
        },
        customerInformation: {
          firstName: 'Test Buyer',
          lastName: 'Test',
          phone: '+905554443311',
          address: 'Test Mah. Test Sok. No:2',
          city: 'Istanbul',
        }
      })
      
      return NextResponse.json({ success: true, response: otoResponse })
    }

    return NextResponse.json({ error: 'Geçersiz action' }, { status: 400 })

  } catch (error) {
    const err = error as Error
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
