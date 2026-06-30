import { NextResponse } from 'next/server'
import { createClient } from '@/src/utils/supabase/server'
import { createAdminClient } from '@/src/utils/supabase/admin'
import { createOtoOrder } from '@/src/lib/oto'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    // Admin Kontrolü
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Bu işlem için admin yetkisi gerekiyor' }, { status: 403 })
    }

    const { orderId } = await request.json()
    if (!orderId) {
      return NextResponse.json({ error: 'Sipariş ID eksik' }, { status: 400 })
    }

    const adminClient = createAdminClient()

    // Siparişi ve Ürünü getir
    const { data: order, error: orderError } = await adminClient
      .from('orders')
      .select('*, products(brand, model_name), profiles!orders_buyer_id_fkey(first_name, last_name, phone_number, address, email)')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 })
    }

    const buyer = order.profiles
    const product = order.products

    if (!buyer) {
      return NextResponse.json({ error: 'Alıcı bilgileri bulunamadı' }, { status: 404 })
    }

    // OTO Kargo üzerinden Peony'den Alıcıya kargo oluştur
    const otoResult = await createOtoOrder({
      orderId: order.id + '_FINAL', // Aynı orderId ile çakışmaması için suffix eklenebilir
      description: `${product.brand} ${product.model_name}`,
      senderInformation: {
        firstName: 'Peony',
        lastName: 'Collective',
        phone: '+905550000000',
        city: 'Istanbul',
        address: 'Zorlu Center, Istanbul'
      },
      customerInformation: {
        firstName: buyer.first_name || 'Müşteri',
        lastName: buyer.last_name || '',
        phone: buyer.phone_number || '+905550000000',
        city: 'Istanbul',
        address: buyer.address || 'Adres belirtilmemiş',
        email: buyer.email
      }
    })

    if (!otoResult || !otoResult.trackingNumber) {
      throw new Error('OTO Kargo barkod oluşturamadı: ' + JSON.stringify(otoResult))
    }

    // Siparişi güncelle
    await adminClient
      .from('orders')
      .update({
        order_status: 'shipped_to_buyer',
        shipping_tracking_buyer: otoResult.trackingNumber
      })
      .eq('id', order.id)

    // Logla
    await adminClient.from('system_logs').insert({
      level: 'info',
      source: 'admin_shipment',
      message: 'Peony Merkezden Alıcıya kargo oluşturuldu',
      metadata: { orderId, trackingNumber: otoResult.trackingNumber }
    })

    // Opsiyonel: E-posta gönderimi burada eklenebilir

    return NextResponse.json({ success: true, trackingNumber: otoResult.trackingNumber })

  } catch (error: any) {
    console.error('[ADMIN SHIPMENT ERROR]', error)
    return NextResponse.json({ error: error.message || 'Kargo oluşturulamadı' }, { status: 500 })
  }
}
