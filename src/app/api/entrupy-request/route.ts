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

    let productBrand = undefined
    let productPrice = undefined
    let productCategory = undefined
    let productCondition = undefined
    let aiAnalysisSummary = undefined
    let aiVerdict = undefined
    let aiConfidence = undefined

    if (productId) {
      try {
        const { createAdminClient } = await import('@/src/utils/supabase/admin')
        const supabase = createAdminClient()
        const { data: prod } = await supabase
          .from('products')
          .select('brand, model_name, price, category, condition, ai_authentication_logs(claude_verdict, claude_confidence, claude_raw_response)')
          .eq('id', productId)
          .single()

        if (prod) {
          productBrand = prod.brand
          productPrice = prod.price
          productCategory = prod.category
          productCondition = prod.condition

          const logs = (prod as any).ai_authentication_logs
          if (Array.isArray(logs) && logs.length > 0) {
            const validLogs = logs.filter(l => l && l.claude_raw_response && !l.claude_raw_response.includes('Analiz raporu boş döndü'))
            const latestLog = validLogs.length > 0 ? validLogs[validLogs.length - 1] : logs[logs.length - 1]
            if (latestLog) {
              aiAnalysisSummary = latestLog.claude_raw_response
              aiVerdict = latestLog.claude_verdict
              aiConfidence = latestLog.claude_confidence
            }
          }
        }
      } catch (dbErr) {
        console.warn('Product details fetch error in entrupy route:', dbErr)
      }
    }

    const emailResult = await sendEntrupyRequestAdminEmail({
      sellerName,
      sellerEmail,
      sellerPhone,
      sellerAddress,
      productName: productName || 'Belirtilmemiş Ürün',
      productId,
      productBrand,
      productPrice,
      productCategory,
      productCondition,
      aiAnalysisSummary,
      aiVerdict,
      aiConfidence
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
