import { NextResponse } from 'next/server'
import { createPaymentToken, addSubmerchant } from '@/src/lib/paytr'
import { createClient } from '@/src/utils/supabase/server'
import { createAdminClient } from '@/src/utils/supabase/admin'
import { checkRateLimit, maskErrorResponse } from '@/src/utils/security'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Sipariş vermek için giriş yapmalısınız.', needsLogin: true }, { status: 401 })
    }

    // Rate Limiting (Siber Güvenlik Önlemi)
    const userIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || req.headers.get('x-real-ip') 
      || '127.0.0.1'
    
    if (!checkRateLimit(userIp, 10000)) {
      return NextResponse.json({ error: 'Çok fazla istek gönderdiniz. Güvenliğiniz için lütfen 10 saniye bekleyin.' }, { status: 429 })
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
      .select('id, price, status, seller_id, brand, model_name, locked_until, locked_by')
      .in('id', productIds)

    if (dbError || !dbProducts || dbProducts.length === 0) {
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

    // Concurrency Lock Check (Race Condition Önlemi & Teklif Rezerve Sistemi)
    const now = new Date()
    for (const product of dbProducts) {
      if (product.locked_until && new Date(product.locked_until) > now) {
        // Eğer kilit bu kullanıcıya (locked_by) ait değilse satın almayı engelle
        if (product.locked_by && product.locked_by !== user.id) {
          return NextResponse.json({ error: `"${product.brand} ${product.model_name}" ürünü bir teklif kabulü sebebiyle başka bir alıcıya rezerve edilmiştir.` }, { status: 409 })
        } else if (!product.locked_by) {
          // Normal sepet kilidi
          return NextResponse.json({ error: `"${product.brand} ${product.model_name}" ürünü şu an başka bir koleksiyoner tarafından satın alınıyor. Lütfen 15 dakika sonra tekrar deneyin.` }, { status: 409 })
        }
      }
    }

    // Ürünleri kilitle (Eğer teklif kilidi yoksa veya kendisi kilitlediyse 15 dakika uzat/güncelle)
    const lockTime = new Date(now.getTime() + 15 * 60000).toISOString()
    const productIdsToLock = dbProducts.map(p => p.id)
    await supabase.from('products').update({ 
      locked_until: lockTime,
      locked_by: user.id
    }).in('id', productIdsToLock)

    // Alt Üye İşyeri (PayTR Marketplace) Kontrolü
    const sellerId = dbProducts[0].seller_id
    const { data: sellerProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sellerId)
      .single()

    let submerchantId = sellerProfile?.submerchant_id

    if (!submerchantId) {
      // Satıcının IBAN ve TCKN/VKN kontrolü
      if (!sellerProfile?.iban || (!sellerProfile?.tckn && !sellerProfile?.vkn)) {
        return NextResponse.json(
          { error: 'Satıcı ödeme bilgilerini tamamlamadığı için bu ürün şu an satın alınamaz.' },
          { status: 400 }
        )
      }

      // Alt Üye İşyeri Kaydı (PayTR)
      try {
        const subResult = await addSubmerchant({
          name: `${sellerProfile.first_name || ''} ${sellerProfile.last_name || ''}`.trim(),
          address: sellerProfile.address || 'Adres belirtilmemiş',
          email: 'satici_' + sellerProfile.id + '@peonycollective.com',
          iban: sellerProfile.iban,
          tckn: sellerProfile.tckn,
          vkn: sellerProfile.vkn,
          companyTitle: sellerProfile.company_title,
          submerchantType: sellerProfile.submerchant_type || 'bireysel'
        })
        
        submerchantId = subResult.submerchant_id

        // Kaydedilen submerchantId'yi DB'ye yaz (Admin client kullanarak RLS'i aş)
        const adminClient = createAdminClient()
        await adminClient.from('profiles').update({ submerchant_id: submerchantId }).eq('id', sellerProfile.id)
        
      } catch (err: any) {
        console.error('[PAYTR SUBMERCHANT ERROR]', err)
        const adminClient = createAdminClient()
        await adminClient.from('system_logs').insert({
          level: 'error',
          source: 'paytr_submerchant_checkout',
          message: 'Satıcı PayTR alt-üye kaydı başarısız',
          metadata: { error: err.message, sellerId: sellerProfile.id }
        })
        return NextResponse.json(
          { error: 'Satıcının hesap bilgileri doğrulanamadı, işlem iptal edildi.' },
          { status: 400 }
        )
      }
    }

    // Toplam fiyatı DB'den hesapla
    const totalAmount = dbProducts.reduce((acc, p) => acc + (p.price || 0), 0)
    const paymentAmount = Math.round(totalAmount * 100)

    // Benzersiz sipariş numarası
    const merchantOid = `PO_${Date.now()}_${Math.floor(Math.random() * 1000)}`

    // Platform Komisyon Motoru (%15)
    const commissionRate = 0.15
    let totalSellerAmount = 0

    // Siparişleri veritabanına "pending_payment" olarak kaydet
    for (const product of dbProducts) {
      const commissionAmount = product.price * commissionRate
      const sellerAmount = product.price - commissionAmount
      totalSellerAmount += sellerAmount

      const { error: insertError } = await supabase.from('orders').insert({
        buyer_id: user.id,
        seller_id: product.seller_id,
        product_id: product.id,
        total_price: product.price,
        commission_amount: commissionAmount,
        seller_amount: sellerAmount,
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

    const protocol = req.headers.get('x-forwarded-proto') || 'http'
    const host = req.headers.get('host') || 'peony-collective.vercel.app'
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
      merchantFailUrl,
      submerchantId,
      submerchantPrice: Math.round(totalSellerAmount * 100)
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
    return maskErrorResponse(error, 'Ödeme işlemi başlatılamadı.')
  }
}
