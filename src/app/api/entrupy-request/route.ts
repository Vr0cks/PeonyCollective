import { NextRequest, NextResponse } from 'next/server'
import { sendEntrupyRequestAdminEmail } from '@/src/lib/resend'

// Supabase'in bu query'den döndürdüğü verinin TypeScript tipi.
// Bu sadece bir tip tanımı — runtime'da tamamen silinir, JS'e etki etmez.
type EntrupyProductResult = {
  brand: string | null
  model_name: string | null
  price: number | null
  category: string | null
  condition: string | null
  ai_authentication_logs: Array<{
    claude_verdict: string | null
    claude_confidence: number | null
    claude_raw_response: string | null
  }>
}

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
      // Geçerli bir UUID formatı mı kontrol et.
      // Supabase'den gelen gerçek ürün UUID'leri her zaman bu formatı karşılar:
      // örn: "3f2504e0-4f89-11d3-9a0c-0305e82c3301"
      // Geçersizse DB'ye hiç sorgu atmıyoruz — form yine de başarıyla gönderilir,
      // sadece admin e-postasında ürün detayı olmaz.
      const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (!UUID_REGEX.test(productId)) {
        console.warn('Entrupy request: geçersiz productId formatı, ürün detayı atlanıyor:', productId)
      } else {
        try {
          const { createAdminClient } = await import('@/src/utils/supabase/admin')
          const supabase = createAdminClient()
          const { data: prod } = await supabase
            .from('products')
            .select('brand, model_name, price, category, condition, ai_authentication_logs(claude_verdict, claude_confidence, claude_raw_response)')
            .eq('id', productId)
            .single()

          if (prod) {
            const typedProd = prod as unknown as EntrupyProductResult
            // ?? undefined: DB'den null gelebilir, ama email fonksiyonu undefined bekliyor.
            // null ?? undefined → undefined, "Hermès" ?? undefined → "Hermès"
            // Runtime davranışı değişmez — ikisi de falsy.
            productBrand     = typedProd.brand     ?? undefined
            productPrice     = typedProd.price     ?? undefined
            productCategory  = typedProd.category  ?? undefined
            productCondition = typedProd.condition ?? undefined

            const logs = typedProd.ai_authentication_logs
            if (Array.isArray(logs) && logs.length > 0) {
              const validLogs = logs.filter(l => l && l.claude_raw_response && !l.claude_raw_response.includes('Analiz raporu boş döndü'))
              const latestLog = validLogs.length > 0 ? validLogs[validLogs.length - 1] : logs[logs.length - 1]
              if (latestLog) {
                aiAnalysisSummary = latestLog.claude_raw_response ?? undefined
                aiVerdict         = latestLog.claude_verdict       ?? undefined
                aiConfidence      = latestLog.claude_confidence    ?? undefined
              }
            }
          }
        } catch (dbErr) {
          console.warn('Product details fetch error in entrupy route:', dbErr)
        }
      } // else (geçerli UUID)
    } // if (productId)

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
