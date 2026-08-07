import { NextResponse } from 'next/server'
import { getOtoOrderStatus } from '@/src/lib/oto'
import { createClient } from '@/src/utils/supabase/server'
import { maskErrorResponse } from '@/src/utils/security'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json({ error: 'Sipariş Numarası eksik' }, { status: 400 })
    }

    // Yetki Kontrolü: RLS sayesinde eğer kullanıcının izni yoksa siparişe erişemez
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId)
    
    let query = supabase.from('orders').select('id, payment_id')
    if (isUuid) {
      query = query.or(`id.eq.${orderId},payment_id.eq.${orderId}`)
    } else {
      query = query.eq('payment_id', orderId)
    }

    const { data: order, error: orderError } = await query.limit(1).maybeSingle()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Sipariş bulunamadı veya erişim yetkiniz yok' }, { status: 403 })
    }

    const status = await getOtoOrderStatus(order.id || orderId)
    return NextResponse.json(status)
  } catch (error: any) {
    return maskErrorResponse(error, 'Kargo bilgisi alınamadı')
  }
}
