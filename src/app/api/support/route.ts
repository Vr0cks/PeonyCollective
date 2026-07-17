import { NextResponse } from 'next/server'
import { createClient } from '@/src/utils/supabase/server'
import { sendItSupportPingAction } from '@/src/app/admin/actions'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Check Authorization header first (for mobile apps)
    const authHeader = request.headers.get('Authorization')
    let user = null
    
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const { data: { user: authUser } } = await supabase.auth.getUser(token)
      user = authUser
    } else {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      user = authUser
    }
    
    if (!user) {
      return NextResponse.json({ error: 'Oturum bulunamadı' }, { status: 401 })
    }

    const { message } = await request.json()
    if (!message) {
      return NextResponse.json({ error: 'Mesaj boş olamaz' }, { status: 400 })
    }

    const result = await sendItSupportPingAction(message)
    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (err: any) {
    console.error('[API SUPPORT ERROR]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
