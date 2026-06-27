import { NextResponse } from 'next/server'
import { createPaymentToken } from '@/src/lib/paytr'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { cartItems, formData } = body

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Sepet boş' }, { status: 400 })
    }

    // Güvenlik: Normalde burada veritabanından fiyatlar tekrar kontrol edilir (kullanıcı fiyatla oynamasın diye)
    // Şimdilik gelen fiyatları kullanıyoruz (Test amaçlı)
    const totalAmount = cartItems.reduce((acc: number, item: any) => acc + (item.price || 0), 0)

    const paymentAmount = totalAmount * 100 // Kuruş cinsinden

    // Benzersiz sipariş numarası
    const merchantOid = `PO_${Date.now()}_${Math.floor(Math.random() * 1000)}`

    // Kullanıcı IP Adresi
    const userIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '85.105.100.100'

    // Geri Dönüş URL'leri (Vercel domainine göre güncellenebilir)
    const protocol = req.headers.get('x-forwarded-proto') || 'http'
    const host = req.headers.get('host') || 'localhost:3000'
    const baseUrl = `${protocol}://${host}`

    const merchantOkUrl = `${baseUrl}/checkout/success`
    const merchantFailUrl = `${baseUrl}/checkout/fail`

    // Sepet detayları (PayTR için)
    // Eğer birden fazla ürün varsa, isimleri birleştir veya ilk ürünü yaz
    const itemNames = cartItems.map((i: any) => i.model_name).join(', ')

    // Token Parametreleri
    const tokenParams = {
      userIp,
      merchantOid,
      email: formData.email || 'test@peony.com',
      paymentAmount,
      userName: `${formData.firstName} ${formData.lastName}` || 'Peony Musteri',
      userPhone: formData.phone || '05555555555',
      userAddress: `${formData.address} ${formData.district}/${formData.city}` || 'Test Adres, Test İlçe/Test İl',
      itemName: `Peony Sipariş: ${itemNames}`.substring(0, 50), // Maksimum uzunluk
      itemPrice: paymentAmount, // Tek kalem olarak gönderiyoruz sepeti (PayTR detaylı sepet istiyor ama şimdilik tek kalem sepette geçiyoruz)
      merchantOkUrl,
      merchantFailUrl
    }

    // PayTR'a gönderilecek veriyi hazırla
    const postData = createPaymentToken(tokenParams)

    // PayTR API'sine istek atıp iFrame tokenini al
    // Not: API Key'ler boşsa veya sandbox modundaysa, PayTR muhtemelen hata dönecektir.
    // Şifreler girilene kadar mock bir cevap dönebiliriz.
    
    if (process.env.PAYTR_MERCHANT_ID) {
      const formParams = new URLSearchParams()
      for (const [key, value] of Object.entries(postData)) {
        formParams.append(key, value.toString())
      }

      const response = await fetch('https://www.paytr.com/odeme/api/get-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formParams.toString()
      })

      const textRes = await response.text()
      try {
        const result = JSON.parse(textRes)
        if (result.status === 'success') {
          return NextResponse.json({ token: result.token })
        } else {
          return NextResponse.json({ error: result.reason || 'PayTR Hatası' }, { status: 400 })
        }
      } catch (e) {
         console.error('PayTR API Response Error:', textRes)
         return NextResponse.json({ error: 'PayTR servisine bağlanılamadı.' }, { status: 500 })
      }
    } else {
      // Test mock dönüşü
      return NextResponse.json({ token: 'mock_paytr_token_waiting_for_keys' })
    }

  } catch (error: any) {
    console.error('Checkout API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
