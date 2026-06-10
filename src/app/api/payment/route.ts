import { NextResponse } from 'next/server'
import { createClient } from '@/src/utils/supabase/server'
import { createPaymentToken } from '@/src/lib/paytr'

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

    // 2. Parse request body
    const { productId } = await request.json()
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

    // 7. Get client IP
    const userIp = request.headers.get('x-forwarded-for') || '127.0.0.1'

    // Generate order draft in database first to get unique order ID
    const { data: newOrder, error: orderInsertError } = await supabase
      .from('orders')
      .insert({
        buyer_id: user.id,
        product_id: productId,
        total_price: product.price,
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

    // Amount in kuruş (price * 100)
    const paymentAmount = Math.round(product.price * 100)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

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
