import { NextRequest, NextResponse } from 'next/server'
import { sendEntrupyRequestAdminEmail } from '@/src/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sellerName, sellerEmail, sellerPhone, sellerAddress, productName, productId } = body

    if (!sellerName || !sellerEmail || !sellerPhone || !sellerAddress) {
      return NextResponse.json(
        { error: 'Lütfen ad soyad, e-posta, telefon ve adres alanlarını doldurunuz.' },
        { status: 400 }
      )
    }

    const emailResult = await sendEntrupyRequestAdminEmail({
      sellerName,
      sellerEmail,
      sellerPhone,
      sellerAddress,
      productName: productName || 'Belirtilmemiş Ürün',
      productId
    })

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Talep e-postası gönderilirken bir hata oluştu.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Entrupy doğrulama talebiniz başarıyla alındı ve ekibimize iletildi.'
    })
  } catch (error: any) {
    console.error('Entrupy Request API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
