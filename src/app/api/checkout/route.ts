import { NextResponse } from 'next/server'
import { createPaymentToken } from '@/src/lib/paytr'
import { createClient } from '@/src/utils/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Sipariş vermek için giriş yapmalısınız.', needsLogin: true }, { status: 401 })
    }

    const body = await req.json()
    const { cartItems, formData } = body

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Sepet boş' }, { status: 400 })
    }

    // ✅ GÜVENLİK: Fiyatları client'tan almıyoruz, veritabanından doğruluyoruz
    const productIds = cartItems.map((item: any) => item.id)
    const { data: dbProducts, error: dbError } = await supabase
      .from('products')
      .select('id, price, status, seller_id, brand, model_name')
      .in('id', productIds)

    if (dbError || !dbProducts) {
      return NextResponse.json({ error: 'Ürün bilgileri alınamadı.' }, { status: 500 })
    }

    // Satışta olmayan veya bulunamayan ürün kontrolü
    for (const product of dbProducts) {
      if (product.status === 'sold') {
        return NextResponse.json({ error: `"${product.brand} ${product.model_name}" ürünü çoktan satılmış. Lütfen sepetinizi güncelleyin.` }, { status: 409 })
      }
      if (product.status !== 'approved') {
        return NextResponse.json({ error: `"${product.brand} ${product.model_name}" ürünü şu an satışta değil.` }, { status: 409 })
      }
    }

    // Toplam fiyatı DB'den hesapla (client'tan gelen değerleri KULLANMIYORUZ)
    const totalAmount = dbProducts.reduce((acc, p) => acc + (p.price || 0), 0)
    const paymentAmount = Math.round(totalAmount * 100) // Kuruş cinsinden, tam sayı

    // Benzersiz sipariş numarası
    const merchantOid = `PO_${Date.now()}_${Math.floor(Math.random() * 1000)}`

    // Siparişleri veritabanına "pending_payment" olarak kaydet (DB fiyatıyla)
    for (const product of dbProducts) {
      const { error: insertError } = await supabase.from('orders').insert({
        buyer_id: user.id,
        seller_id: product.seller_id,
        product_id: product.id,
        total_price: product.price, // DB'den gelen fiyat
        payment_id: merchantOid,
        order_status: 'pending_payment',
        shipping_address: `${formData.address}, ${formData.district}/${formData.city} ${formData.zipCode}`,
        buyer_name: `${formData.firstName} ${formData.lastName}`,
        buyer_email: formData.email,
        buyer_phone: formData.phone,
        gift_note: formData.giftNote || null,
        is_gift: formData.isGift || false,
      })
      if (insertError) {
        console.error('Order insert error:', insertError)
      }
    }

    // Kullanıcı IP Adresi
    const userIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || req.headers.get('x-real-ip') 
      || '85.105.100.100'

    // Geri Dönüş URL'leri
    const protocol = req.headers.get('x-forwarded-proto') || 'http'
    const host = req.headers.get('host') || 'localhost:3000'
    const baseUrl = `${protocol}://${host}`

    const merchantOkUrl = `${baseUrl}/checkout/success?orderId=${merchantOid}`
    const merchantFailUrl = `${baseUrl}/checkout/fail`

    const itemNames = dbProducts.map(p => `${p.brand} ${p.model_name}`).join(', ')

    const tokenParams = {
      userIp,
      merchantOid,
      email: formData.email || user.email || 'musteri@peony.com',
      paymentAmount,
      userName: `${formData.firstName} ${formData.lastName}`.trim() || 'Peony Müşteri',
      userPhone: formData.phone || '05555555555',
      userAddress: `${formData.address} ${formData.district}/${formData.city}` || 'Belirtilmemiş',
      itemName: `Peony: ${itemNames}`.substring(0, 50),
      itemPrice: paymentAmount,
      merchantOkUrl,
      merchantFailUrl
    }

    const postData = createPaymentToken(tokenParams)

    if (process.env.PAYTR_MERCHANT_ID) {
      const formParams = new URLSearchParams()
      for (const [key, value] of Object.entries(postData)) {
        formParams.append(key, value.toString())
      }

      const response = await fetch('https://www.paytr.com/odeme/api/get-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formParams.toString()
      })

      const textRes = await response.text()
      try {
        const result = JSON.parse(textRes)
        if (result.status === 'success') {
          return NextResponse.json({ token: result.token, merchantOid })
        } else {
          return NextResponse.json({ error: result.reason || 'PayTR Hatası' }, { status: 400 })
        }
      } catch (e) {
        console.error('PayTR API Response Error:', textRes)
        return NextResponse.json({ error: 'PayTR servisine bağlanılamadı.' }, { status: 500 })
      }
    } else {
      return NextResponse.json({ token: 'mock_paytr_token_waiting_for_keys', merchantOid })
    }

  } catch (error: any) {
    console.error('Checkout API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
