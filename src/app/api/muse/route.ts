import { NextResponse } from 'next/server'
import { createAdminClient } from '@/src/utils/supabase/admin'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(request: Request) {
  try {
    const { message, locale = 'tr' } = await request.json()
    if (!message) {
      return NextResponse.json({ error: 'Mesaj boş olamaz' }, { status: 400 })
    }

    // 1. Üye Giriş (Auth) Kontrolü
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Bu servisi kullanmak için üye girişi yapmalısınız.' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const supabase = createAdminClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Geçersiz oturum.' }, { status: 401 })
    }

    // 2. Kullanıcının Statüsünü ve Limitini Sorgula
    let userRole = 'user'
    let dailyLimit = 5
    const today = new Date().toISOString().split('T')[0]

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()

      userRole = profile?.role || 'user'
      dailyLimit = userRole === 'admin' ? 100 : 5 // Standart üye: 5, Admin: 100

      // Günlük kullanım tablosunu sorgula / güncelle
      const { data: usage } = await supabase
        .from('user_muse_limits')
        .select('request_count')
        .eq('user_id', user.id)
        .eq('usage_date', today)
        .maybeSingle()

      if (usage && usage.request_count >= dailyLimit) {
        return NextResponse.json({ 
          error: locale === 'tr' 
            ? `Günlük yapay zeka limitinize ulaştınız (${dailyLimit} istek). Lütfen yarın tekrar deneyin.`
            : `You have reached your daily AI limit (${dailyLimit} requests). Please try again tomorrow.` 
        }, { status: 429 })
      }

      // Günlük kullanım limit sayacını artır
      if (!usage) {
        await supabase.from('user_muse_limits').insert({
          user_id: user.id,
          usage_date: today,
          request_count: 1
        })
      } else {
        await supabase.from('user_muse_limits')
          .update({ request_count: usage.request_count + 1 })
          .eq('user_id', user.id)
          .eq('usage_date', today)
      }
    } catch (dbLimitError) {
      console.warn('[MUSE LIMIT DB WARNING] Limit tablosu kontrol edilemedi, devam ediliyor:', dbLimitError)
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return getSimulatedFallback(message, locale)
    }

    // 3. Veritabanındaki onaylı gerçek ürünleri çek
    const { data: dbProducts } = await supabase
      .from('products')
      .select('id, brand, model_name, price, description, public_images')
      .eq('status', 'approved')

    const productsList = (dbProducts || []).map(p => ({
      id: p.id,
      brand: p.brand,
      model_name: p.model_name,
      price: p.price,
      description: p.description,
      image: p.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300'
    }))

    // 4. KATI PROMPT GUARD KURALLARI
    const systemPrompt = `
      Sen Peony Collective'in yapay zeka stil asistanı "Peony Muse"sun.
      
      GÖREV TANIMIN VE SINIRLARIN:
      - Yalnızca kullanıcının hava durumuna, moduna, katılacağı etkinliklere göre kombin önerileri yapabilir ve stil tavsiyeleri verebilirsin.
      - Önerilerinde MUTLAKA aşağıda verilen ürün listesindeki gerçek ürünleri kullanmalısın.
      
      CEVAP STRÜKTÜRÜ VE BÜTÇE/HIZ OPTİMİZASYONU:
      - Yazacağın cevap metni ("text") KESİNLİKLE çok kısa, öz ve şık olmalıdır (Maksimum 2 veya 3 cümle!).
      - Ürünün teknik detaylarını, boyutlarını veya maddesini uzun uzun listeleme; çünkü kullanıcı bunları zaten alttaki ürün kartına tıklayarak görebilecek.
      - Örn: "Harika bir YDA Center iş toplantısı için listemizdeki siyah Gucci Emily çantamızı öneririm. Bu klasik parça profesyonel görünümünüze lüks bir dokunuş katacaktır." gibi kısa tut.
      
      KATI YASAKLAR:
      - Moda, kombin ve Peony Collective dışındaki hiçbir soruya KESİNLİKLE yanıt vermeyeceksin.
      - Konu dışı sorularda nazikçe reddet: "${locale === 'tr' ? 'Ben sadece Peony Collective stil asistanıyım. Size moda ve kombin konularında yardımcı olabilirim.' : 'I am only the Peony Collective style assistant. I can only help you with fashion and style curation.'}"
      
      Mevcut Ürünler Listesi:
      ${JSON.stringify(productsList, null, 2)}
      
      Yanıtını MUTLAKA aşağıdaki JSON formatında döndür. JSON dışında hiçbir metin yazma:
      Format:
      {
        "text": "Kullanıcıya yazılacak 2-3 cümlelik şık kombin önerisi...",
        "recommendedProductIds": ["secilen-urun-id-1"]
      }
    `

    // Claude API'ye istek at (Hızlı 250 token kısıtlı Sonnet 3.5)
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 250,
      system: systemPrompt,
      messages: [
        { role: 'user', content: message }
      ]
    })

    const responseContent = response.content[0].type === 'text' ? response.content[0].text : ''
    
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Claude JSON formatında yanıt döndüremedi.')
    }

    const result = JSON.parse(jsonMatch[0])

    const recommendedProducts = productsList.filter(p => 
      result.recommendedProductIds?.includes(p.id)
    )

    return NextResponse.json({
      text: result.text,
      products: recommendedProducts
    })

  } catch (error: any) {
    console.error('[API MUSE CLAUDE ERROR]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function getSimulatedFallback(message: string, locale: string) {
  let text = locale === 'tr'
    ? 'Yapay zeka asistanınız aktif edilmiştir ancak API anahtarı tanımlanmamıştır. Lütfen sunucunuza ANTHROPIC_API_KEY ekleyin.'
    : 'Your AI assistant is enabled but ANTHROPIC_API_KEY is missing. Please add it to your environment variables.'

  return NextResponse.json({
    text,
    products: []
  })
}
