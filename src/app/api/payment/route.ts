import { NextResponse } from 'next/server'
import { createClient } from '@/src/utils/supabase/server'
import { createAdminClient } from '@/src/utils/supabase/admin'
import { createPaymentToken, addSubmerchant } from '@/src/lib/paytr'

// Basit In-Memory Rate Limiting (Üretim ortamında Redis / Upstash önerilir)
const rateLimitCache = new Map<string, number>()

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 1. Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    // 1.5 Rate Limiting (Siber Güvenlik Önlemi)
    const userIp = request.headers.get('x-forwarded-for') || '127.0.0.1'
    const nowTs = Date.now()
    const lastRequestTs = rateLimitCache.get(userIp)
    
    // Aynı IP'den 10 saniye içinde yeni ödeme başlatma isteği gelirse reddet
    if (lastRequestTs && nowTs - lastRequestTs < 10000) {
      return NextResponse.json({ 
        error: 'Çok fazla istek gönderdiniz. Güvenliğiniz için lütfen 10 saniye bekleyin.' 
      }, { status: 429 })
    }
    rateLimitCache.set(userIp, nowTs)

    // 2. Parse request body
    const { productId, deliveryMethod } = await request.json()
    if (!productId) {
      return NextResponse.json({ error: "Ürün ID'si eksik" }, { status: 400 })
    }

    // 3. Fetch product details
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }

    // 3.5 Fetch seller profile for marketplace submerchant info
    const { data: sellerProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', product.seller_id)
      .single()

    // 4. Validate product status (approved, not sold)
    if (product.status !== 'approved') {
      return NextResponse.json(
        { error: 'Bu ürün şu an satın alınamaz' },
        { status: 400 }
      )
    }

    // 5. Prevent self-purchase
    if (product.seller_id === user.id) {
      return NextResponse.json(
        { error: 'Kendi ürününüzü satın alamazsınız' },
        { status: 400 }
      )
    }

    // 5.5 Concurrency Lock Check (Race Condition Önlemi & Teklif Rezerve Sistemi)
    const now = new Date()
    if (product.locked_until && new Date(product.locked_until) > now) {
      // Eğer kilit bu kullanıcıya (locked_by) ait değilse satın almayı engelle
      if (product.locked_by && product.locked_by !== user.id) {
        return NextResponse.json(
          { error: 'Bu ürün bir teklif kabulü sebebiyle başka bir alıcıya rezerve edilmiştir.' },
          { status: 409 }
        )
      } else if (!product.locked_by) {
        // Normal 15 dakikalık sepet kilidi ise diğerlerine kapat
        return NextResponse.json(
          { error: 'Bu ürün şu an başka bir koleksiyoner tarafından satın alınıyor. Lütfen 15 dakika sonra tekrar deneyin.' },
          { status: 409 }
        )
      }
    }

    // Ürünü kilitle (Eğer teklif kilidi yoksa veya kendisi kilitlediyse 15 dakika uzat/güncelle)
    const lockTime = new Date(now.getTime() + 15 * 60000).toISOString()
    await supabase.from('products').update({ 
      locked_until: lockTime,
      locked_by: user.id
    }).eq('id', productId)

    // 6. Get buyer profile to retrieve address, name, phone, etc.
    const { data: buyerProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!buyerProfile) {
      return NextResponse.json(
        { error: 'Alıcı profili bulunamadı' },
        { status: 404 }
      )
    }

    if (!buyerProfile.address || !buyerProfile.phone_number) {
      return NextResponse.json(
        {
          error:
            'Lütfen ödeme yapmadan önce profil ayarlarınızdan adres ve telefon bilgilerinizi eksiksiz doldurun.',
          needsProfileUpdate: true,
        },
        { status: 400 }
      )
    }

    // Check if there is an active accepted offer for this buyer and product
    const { data: activeOffer } = await supabase
      .from('offers')
      .select('*')
      .eq('product_id', productId)
      .eq('buyer_id', user.id)
      .eq('status', 'accepted')
      .limit(1)
      .maybeSingle()

    const isReserved = product.locked_by === user.id && product.locked_until && new Date(product.locked_until) > now
    const productPrice = (isReserved && activeOffer) ? activeOffer.offered_price : product.price

    // Toplam Fiyat Hesaplama
    const deliveryFee = deliveryMethod === 'private_viewing' ? 15000 : deliveryMethod === 'vip' ? 2500 : 0
    const finalPrice = productPrice + deliveryFee

    // Komisyon Hesaplama (Split Payment Hazırlığı)
    const commissionRate = product.is_peony_vip ? 0.30 : 0.20
    const commissionAmount = productPrice * commissionRate
    const sellerAmount = productPrice - commissionAmount

    // Generate order draft in database first to get unique order ID
    const { data: newOrder, error: orderInsertError } = await supabase
      .from('orders')
      .insert({
        buyer_id: user.id,
        product_id: productId,
        total_price: finalPrice,
        commission_amount: commissionAmount,
        seller_amount: sellerAmount,
        order_status: 'pending_payment',
      })
      .select('id')
      .single()

    if (orderInsertError || !newOrder) {
      return NextResponse.json(
        { error: 'Sipariş taslağı oluşturulamadı: ' + orderInsertError?.message },
        { status: 500 }
      )
    }

    const merchantOid = newOrder.id

    // PAYTR PAZARYERİ (SPLIT PAYMENT) MANTIGI
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
          email: 'satici_' + sellerProfile.id + '@peonycollective.com', // Gerçek DB'de satıcının email'i users tablosunda. Veya mock.
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
          source: 'paytr_submerchant',
          message: 'Satıcı PayTR alt-üye kaydı başarısız',
          metadata: { error: err.message, sellerId: sellerProfile.id }
        })
        return NextResponse.json(
          { error: 'Satıcının hesap bilgileri doğrulanamadı, işlem iptal edildi.' },
          { status: 400 }
        )
      }
    }

    // Amount in kuruş (price * 100)
    const paymentAmount = Math.round(finalPrice * 100)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peony-collective.vercel.app'

    // 8. Generate PayTR checkout token params
    const paytrParams = createPaymentToken({
      userIp,
      merchantOid,
      email: user.email || 'peony@example.com',
      paymentAmount,
      userName: `${buyerProfile.first_name || ''} ${buyerProfile.last_name || ''}`.trim() || 'Koleksiyoner',
      userPhone: buyerProfile.phone_number,
      userAddress: buyerProfile.address,
      itemName: `${product.brand} ${product.model_name}`,
      itemPrice: paymentAmount,
      merchantOkUrl: `${siteUrl}/orders/success?order_id=${merchantOid}&productId=${productId}`,
      merchantFailUrl: `${siteUrl}/checkout/${productId}?payment_error=true`,
      submerchantId: submerchantId,
      submerchantPrice: Math.round(sellerAmount * 100) // Satıcının hakkedişi (kuruş)
    })

    // Call PayTR to get the token
    const response = await fetch('https://www.paytr.com/odeme/api/get-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(paytrParams as unknown as Record<string, string>).toString(),
    })

    const resultText = await response.text()

    let resultJson
    try {
      resultJson = JSON.parse(resultText)
    } catch {
      // Fallback for mock sandbox environment when credentials are mock/missing
      if (
        process.env.PAYTR_SANDBOX !== 'false' ||
        process.env.PAYTR_MERCHANT_ID === undefined
      ) {
        return NextResponse.json({
          status: 'success',
          iframeUrl: `https://www.paytr.com/odeme/guvenli/${merchantOid}`, // Simulated sandbox checkout
          mock: true,
          merchantOid,
        })
      }
      return NextResponse.json(
        { error: 'PayTR API yanıtı ayrıştırılamadı: ' + resultText },
        { status: 500 }
      )
    }

    if (resultJson.status === 'success') {
      return NextResponse.json({
        status: 'success',
        token: resultJson.token,
        iframeUrl: `https://www.paytr.com/odeme/guvenli/${resultJson.token}`,
        merchantOid,
      })
    } else {
      return NextResponse.json(
        { error: resultJson.reason || 'PayTR token oluşturma başarısız oldu' },
        { status: 400 }
      )
    }
  } catch (error) {
    const err = error as Error
    console.error('Payment API Error:', err)
    return NextResponse.json(
      { error: err.message || 'Ödeme başlatılırken bir hata oluştu' },
      { status: 500 }
    )
  }
}
