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
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Sipariş bulunamadı veya erişim yetkiniz yok' }, { status: 403 })
    }

    const status = await getOtoOrderStatus(orderId)
    return NextResponse.json(status)
  } catch (error: any) {
    return maskErrorResponse(error, 'Kargo bilgisi alınamadı')
  }
}
