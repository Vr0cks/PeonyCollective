import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/src/utils/supabase/admin'

const ENTRUPY_API_URL = process.env.ENTRUPY_API_URL || 'https://api.entrupy.com/v2';
const ENTRUPY_API_KEY = process.env.ENTRUPY_API_KEY;

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user using Supabase
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Bu servisi kullanmak için üye girişi yapmalısınız.' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const supabase = createAdminClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Geçersiz oturum.' }, { status: 401 })
    }

    // 2. Parse request body
    const body = await req.json().catch(() => ({}))
    const { sdk_authorization_request } = body

    if (!sdk_authorization_request) {
      return NextResponse.json({ error: 'sdk_authorization_request parametresi zorunludur.' }, { status: 400 })
    }

    if (!ENTRUPY_API_KEY) {
      return NextResponse.json({ error: 'Entrupy API Key sistemde yapılandırılmamış.' }, { status: 500 })
    }

    // 3. Request user details to pass email
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, first_name, last_name')
      .eq('id', user.id)
      .maybeSingle()

    const email = profile?.email || user.email || `${user.id}@peony-collective.com`

    // 4. Proxy to Entrupy authorize-user endpoint
    const authorizeUrl = `${ENTRUPY_API_URL}/integrations/authorize-user`
    console.log(`[ENTRUPY AUTHORIZE] Authorizing user ${user.id} at ${authorizeUrl}`)

    const entrupyResponse = await fetch(authorizeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${ENTRUPY_API_KEY}`,
        'Api-Version': '2.0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        unique_user_id: user.id,
        sdk_authorization_request: sdk_authorization_request,
        email: email,
        first_name: profile?.first_name || '',
        last_name: profile?.last_name || ''
      })
    })

    if (!entrupyResponse.ok && entrupyResponse.status !== 409) {
      const errorData = await entrupyResponse.json().catch(() => ({}))
      console.error('[ENTRUPY AUTHORIZE ERROR]', entrupyResponse.status, errorData)
      return NextResponse.json({
        error: `Entrupy API hatası: ${entrupyResponse.status}`,
        details: errorData
      }, { status: entrupyResponse.status })
    }

    const result = await entrupyResponse.json()
    return NextResponse.json(result)

  } catch (error: any) {
    console.error('[ENTRUPY AUTHORIZE EXCEPTION]', error)
    return NextResponse.json({ error: error.message || 'Bir hata oluştu' }, { status: 500 })
  }
}
