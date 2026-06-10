import { NextResponse } from 'next/server'
import { createClient } from '@/src/utils/supabase/server'
import { createOtoOrder, getOtoOrderStatus } from '@/src/lib/oto'

/**
 * POST /api/cargo
 * Body: { orderId: string }
 *
 * Peony sipariş ID'sini alarak OTO'da kargo oluşturur.
 * Yalnızca admin veya ilgili satıcı çağırabilir.
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { orderId } = await request.json()
    if (!orderId) return NextResponse.json({ error: "Sipariş ID'si eksik" }, { status: 400 })

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, products(*), buyer:profiles!buyer_id(*)')
      .eq('id', orderId)
      .single()

    if (orderError || !order) return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 })

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    const isAdmin = profile?.role === 'admin'
    const isSeller = order.seller_id === user.id

    if (!isAdmin && !isSeller) return NextResponse.json({ error: 'Bu işlemi yapmaya yetkiniz yok' }, { status: 403 })

    const { data: sellerProfile } = await supabase.from('profiles').select('*').eq('id', order.seller_id).single()
    const buyerProfile = order.buyer as Record<string, string>

    if (!sellerProfile?.address || !sellerProfile?.phone_number) {
      return NextResponse.json({ error: 'Satıcı profil bilgileri eksik (adres/telefon).' }, { status: 400 })
    }
    if (!buyerProfile?.address || !buyerProfile?.phone_number) {
      return NextResponse.json({ error: 'Alıcı profil bilgileri eksik (adres/telefon).' }, { status: 400 })
    }

    const product = order.products as Record<string, string>
    
    // OTO Sipariş/Kargo oluşturma
    const otoResponse = await createOtoOrder({
      orderId: orderId, // Peony sipariş ID
      description: `${product?.brand} ${product?.model_name}`,
      weightGrams: 500,
      createShipment: true,
      senderInformation: {
        firstName: sellerProfile.first_name || 'Satıcı',
        lastName: sellerProfile.last_name || '',
        phone: sellerProfile.phone_number,
        address: sellerProfile.address,
        city: 'İstanbul',
        email: sellerProfile.email || 'seller@peony.com'
      },
      customerInformation: {
        firstName: buyerProfile.first_name || 'Alıcı',
        lastName: buyerProfile.last_name || '',
        phone: buyerProfile.phone_number,
        address: buyerProfile.address,
        city: 'İstanbul',
        email: buyerProfile.email || 'buyer@peony.com'
      },
    })

    if (!otoResponse.success) {
      console.error('OTO Hata Yanıtı:', otoResponse)
      return NextResponse.json({ error: 'Kargo oluşturulamadı. Detaylar loglarda.' }, { status: 400 })
    }

    const trackingNumber = otoResponse.trackingNumber || otoResponse.shipmentNumber || 'TBD'
    
    await supabase
      .from('orders')
      .update({
        shipping_tracking_seller: trackingNumber,
        order_status: 'shipped_to_lab',
      })
      .eq('id', orderId)

    return NextResponse.json({ success: true, trackingNumber, otoResponse })

  } catch (error) {
    const err = error as Error
    console.error('Cargo API Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

/**
 * GET /api/cargo?order_id=xxx
 * Kargo durumunu sorgula
 */
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('order_id')

    if (!orderId) {
      return NextResponse.json({ error: 'order_id parametresi eksik' }, { status: 400 })
    }

    const trackingInfo = await getOtoOrderStatus(orderId)
    return NextResponse.json({ success: true, tracking: trackingInfo })
  } catch (error) {
    const err = error as Error
    console.error('Cargo Track Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
