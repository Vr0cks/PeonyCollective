import { NextResponse } from 'next/server'
import { createClient } from '@/src/utils/supabase/server'
import { createOtoOrder, getOtoOrderStatus } from '@/src/lib/oto'
import { maskErrorResponse } from '@/src/utils/security'

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

    const product = order.products as Record<string, string>
    const isStage2 = order.order_status === 'lab_approved' || order.order_status === 'shipped_to_buyer'

    if (isStage2 && (!buyerProfile?.address || !buyerProfile?.phone_number)) {
      return NextResponse.json({ error: 'Alıcı profil bilgileri eksik (adres/telefon).' }, { status: 400 })
    }

    // OTO Sipariş/Kargo oluşturma
    const otoResponse = await createOtoOrder({
      orderId: orderId, // Peony sipariş ID
      description: `${product?.brand} ${product?.model_name}`,
      weightGrams: 500,
      createShipment: true,
      senderInformation: isStage2
        ? {
            firstName: 'Peony',
            lastName: 'Lab',
            phone: '+905550000000',
            address: 'Zorlu Center, No: 123, Beşiktaş',
            city: 'İstanbul',
            email: 'lab@peonycollective.com'
          }
        : {
            firstName: sellerProfile.first_name || 'Satıcı',
            lastName: sellerProfile.last_name || '',
            phone: sellerProfile.phone_number,
            address: sellerProfile.address,
            city: 'İstanbul',
            email: sellerProfile.email || 'seller@peony.com'
          },
      customerInformation: isStage2
        ? {
            firstName: buyerProfile.first_name || 'Alıcı',
            lastName: buyerProfile.last_name || '',
            phone: buyerProfile.phone_number,
            address: buyerProfile.address,
            city: 'İstanbul',
            email: buyerProfile.email || 'buyer@peony.com'
          }
        : {
            firstName: 'Peony',
            lastName: 'Lab',
            phone: '+905550000000',
            address: 'Zorlu Center, No: 123, Beşiktaş',
            city: 'İstanbul',
            email: 'lab@peonycollective.com'
          },
    })

    if (!otoResponse.success) {
      console.error('OTO Hata Yanıtı:', otoResponse)
      return NextResponse.json({ error: 'Kargo oluşturulamadı. Detaylar loglarda.' }, { status: 400 })
    }

    const trackingNumber = otoResponse.trackingNumber || otoResponse.shipmentNumber || 'TBD'
    
    if (isStage2) {
      await supabase
        .from('orders')
        .update({
          shipping_tracking_buyer: trackingNumber,
          order_status: 'shipped_to_buyer',
        })
        .eq('id', orderId)
    } else {
      await supabase
        .from('orders')
        .update({
          shipping_tracking_seller: trackingNumber,
          order_status: 'shipped_to_lab',
        })
        .eq('id', orderId)
    }

    return NextResponse.json({ success: true, trackingNumber, otoResponse })

  } catch (error) {
    return maskErrorResponse(error, 'Kargo oluşturulamadı')
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

    // Yetki Kontrolü: RLS sayesinde eğer kullanıcının izni yoksa siparişe erişemez
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Sipariş bulunamadı veya erişim yetkiniz yok' }, { status: 403 })
    }

    const trackingInfo = await getOtoOrderStatus(orderId)
    return NextResponse.json({ success: true, tracking: trackingInfo })
  } catch (error) {
    return maskErrorResponse(error, 'Kargo bilgisi alınamadı')
  }
}
