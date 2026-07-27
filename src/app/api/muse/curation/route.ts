import { NextResponse } from 'next/server'
import { createAdminClient } from '@/src/utils/supabase/admin'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(request: Request) {
  try {
    const { productId, locale = 'en', getStyling = false, getInvestment = false } = await request.json()
    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data: product } = await supabase
      .from('products')
      .select('brand, model_name, description, category')
      .eq('id', productId)
      .single()

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      if (getStyling) {
        return NextResponse.json({
          styling: locale === 'tr'
            ? `Bu lüks ${product.brand} ürünü şık bir takım elbise veya şık bir gece elbisesiyle harika duracaktır.`
            : `This luxury ${product.brand} piece would pair beautifully with a tailored suit or an elegant evening gown.`
        })
      }
      if (getInvestment) {
        return NextResponse.json({
          investment: locale === 'tr'
            ? `Bu lüks ${product.brand} ürünü harika bir yatırım değerine sahiptir, lüks çanta pazarı değerini korumaktadır.`
            : `This luxury ${product.brand} piece holds strong investment value, retaining its price in the luxury resale market.`
        })
      }
      return NextResponse.json({ 
        curation: locale === 'tr' 
          ? `${product.brand} markasının eşsiz ${product.model_name} tasarımı.`
          : `The exquisite ${product.model_name} from ${product.brand}.`
      })
    }

    if (getInvestment) {
      // 1. Get INVESTMENT advice
      const systemPrompt = `
        Sen Peony Collective'in lüks moda ve yatırım danışmanı "Peony Muse"sun.
        Kullanıcıya bu ürün için neden lüks bir yatırım değeri taşıdığını, nadirliğini ve koleksiyon değerini ("less is more" felsefesine uygun) anlatacaksın.
        
        KURALLAR:
        - Yanıtın kesinlikle en fazla 2 veya 3 cümle olmalıdır. Uzun listeler veya paragraflar yazma.
        - Dil: Yanıtı ${locale === 'tr' ? 'Türkçe' : 'İngilizce'} olarak yaz.
        - Ton: Premium, VIP, finansal/arşivsel değer vurgulayan elit bir asistan tonu kullan.
        - Neden bu parçaya sahip olması gerektiğini ikna edici şekilde açıkla.
      `

      const prompt = `
        Ürün: ${product.brand} - ${product.model_name} (${product.category})
        Açıklama: ${product.description}
        
        Lütfen bu ürün için kısa ve etkileyici bir yatırım gerekçesi yaz.
      `

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5',
        max_tokens: 200,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }]
      })

      const investmentText = response.content[0].type === 'text' ? response.content[0].text.trim() : ''
      return NextResponse.json({ investment: investmentText })
    }

    if (getStyling) {
      // 1. Get STYLING advice
      const systemPrompt = `
        Sen Peony Collective'in lüks moda ve stil danışmanı "Peony Muse"sun.
        Kullanıcıya bu ürün için son derece şık, lüks, elit ve "less is more" (sade ama etkili) felsefesine uygun bir kombin ve stil tavsiyesi vereceksin.
        
        KURALLAR:
        - Yanıtın kesinlikle en fazla 2 veya 3 cümle olmalıdır. Uzun listeler veya paragraflar yazma.
        - Dil: Yanıtı ${locale === 'tr' ? 'Türkçe' : 'İngilizce'} olarak yaz.
        - Ton: Premium, VIP, sofistike ve özgüvenli bir stil uzmanı tonu kullan.
        - Sadece stil/kombin önerisi yap. Teknik detaylara girme.
      `

      const prompt = `
        Ürün: ${product.brand} - ${product.model_name} (${product.category})
        Açıklama: ${product.description}
        
        Lütfen bu ürün için kısa ve etkileyici bir stil tavsiyesi yaz.
      `

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5',
        max_tokens: 200,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }]
      })

      const stylingText = response.content[0].type === 'text' ? response.content[0].text.trim() : ''
      return NextResponse.json({ styling: stylingText })
    }

    // 2. Get CURATION summary (MUSE CURATION)
    const systemPrompt = `
      Sen Peony Collective'in lüks moda küratörü "Peony Muse"sun.
      Görevin, verilen lüks ürünün açıklamasını okuyup, VIP müşteriler için son derece elit, etkileyici ve "less is more" felsefesine uygun, en fazla 2 cümlelik can alıcı bir kürasyon özeti (MUSE CURATION) yazmaktır.
      
      KURALLAR:
      - Çıktı KESİNLİKLE en fazla 2 cümle olmalıdır. Uzun paragraflar yazma.
      - Dil: Yanıtı ${locale === 'tr' ? 'Türkçe' : 'İngilizce'} olarak yaz.
      - Ton: Son derece sofistike, lüks, lirik ve premium bir moda küratörü tonu kullan.
      - Ürünün neden yatırım değeri taşıdığını veya neden eşsiz olduğunu hissettir.
    `

    const prompt = `
      Marka: ${product.brand}
      Model: ${product.model_name}
      Kategori: ${product.category}
      Açıklama: ${product.description}
    `

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 150,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }]
    })

    const curationText = response.content[0].type === 'text' ? response.content[0].text.trim() : ''
    return NextResponse.json({ curation: curationText })

  } catch (error: any) {
    console.error('[API MUSE CURATION ERROR]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
