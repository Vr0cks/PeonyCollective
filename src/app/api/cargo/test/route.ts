import { NextResponse } from 'next/server'
import { getOtoAccessToken, createOtoOrder } from '@/src/lib/oto'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action') || 'token'

  try {
    const accessToken = await getOtoAccessToken()

    if (action === 'token') {
      return NextResponse.json({ success: true, tokenPreview: accessToken.substring(0, 40) + '...' })
    }

    if (action === 'create_test_order') {
      const otoResponse = await createOtoOrder({
        orderId: `TEST-${Date.now()}`,
        description: 'Test Luxury Bag',
        weightGrams: 500,
        createShipment: true,
        senderInformation: {
          firstName: 'Test Seller',
          lastName: 'Test',
          phone: '+905554443322',
          address: 'Test Mah. Test Sok. No:1',
          city: 'Istanbul',
        },
        customerInformation: {
          firstName: 'Test Buyer',
          lastName: 'Test',
          phone: '+905554443311',
          address: 'Test Mah. Test Sok. No:2',
          city: 'Istanbul',
        }
      })
      
      return NextResponse.json({ success: true, response: otoResponse })
    }

    return NextResponse.json({ error: 'Geçersiz action' }, { status: 400 })

  } catch (error) {
    const err = error as Error
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId, productId, action, isAuthentic } = body

    const { createAdminClient } = await import('@/src/utils/supabase/admin')
    const supabase = createAdminClient()

    if (action === 'reset_order' && orderId) {
      const { error: resetErr } = await supabase
        .from('orders')
        .update({
          order_status: 'pending_payment',
          shipping_tracking_seller: null,
          shipping_tracking_buyer: null,
          delivered_at: null
        })
        .eq('id', orderId)

      if (resetErr) {
        return NextResponse.json({ error: 'Sipariş sıfırlanamadı: ' + resetErr.message }, { status: 500 })
      }

      return NextResponse.json({ success: true, message: 'Sipariş başarıyla sıfırlandı (Ödeme Bekleniyor).' })
    }

    if (action === 'simulate_entrupy' && productId) {
      const webhookPayload = JSON.stringify({
        event: 'session.completed',
        data: {
          customer_item_id: productId,
          status: isAuthentic ? 'verified' : 'rejected',
          certificate_url: isAuthentic ? 'https://example.com/mock-certificate.pdf' : null,
        },
      });

      const crypto = await import('crypto');
      const hmac = crypto.createHmac('sha256', process.env.ENTRUPY_WEBHOOK_SECRET || 'peony_ent_sec_9x8a7b6c5d4e3f2g1h');
      const signature = hmac.update(webhookPayload).digest('hex');

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peony-collective.vercel.app';
      const response = await fetch(`${siteUrl}/api/webhooks/entrupy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'entrupy-signature': signature,
        },
        body: webhookPayload,
      });

      const resText = await response.text();
      return NextResponse.json({ success: response.ok, response: resText });
    }

    if (action === 'mark_as_paid' && orderId) {
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .select('*, products(*)')
        .eq('id', orderId)
        .single()

      if (orderErr || !order) {
        return NextResponse.json({ error: 'Sipariş bulunamadı: ' + (orderErr?.message || '') }, { status: 404 })
      }

      const fullProduct = order.products

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, phone_number, address, role')
        .in('id', [order.buyer_id, order.seller_id])
      
      const buyer = profiles?.find((p: any) => p.id === order.buyer_id)
      const seller = profiles?.find((p: any) => p.id === order.seller_id)

      if (!buyer || !seller) {
        return NextResponse.json({ error: 'Alıcı veya Satıcı profili bulunamadı.' }, { status: 404 })
      }

      await supabase.from('orders').update({
        order_status: 'paid'
      }).eq('id', orderId)

      const isShippedByPeony = seller?.role === 'admin' || fullProduct?.is_peony_vip
      const otoResult = await createOtoOrder({
        orderId: isShippedByPeony ? `${order.id}_FINAL` : order.id,
        description: `${fullProduct?.brand || 'Luxury Bag'} ${fullProduct?.model_name || ''}`,
        senderInformation: {
          firstName: isShippedByPeony ? 'Peony' : (seller?.first_name || 'Satıcı'),
          lastName: isShippedByPeony ? 'Collective' : (seller?.last_name || ''),
          phone: isShippedByPeony ? '+902123536000' : (seller?.phone_number || '+905550000000'),
          city: 'Istanbul',
          address: isShippedByPeony ? 'Zorlu Center, Istanbul' : (seller?.address || 'Zorlu Center, Istanbul')
        },
        customerInformation: {
          firstName: isShippedByPeony ? (buyer.first_name || 'Musteri') : 'Peony Lab',
          lastName: isShippedByPeony ? (buyer.last_name || '') : '(Uzman Ofisi)',
          phone: isShippedByPeony ? (buyer.phone_number || '+905550000000') : '+902123536000',
          city: 'Istanbul',
          address: isShippedByPeony ? (buyer.address || 'Adres bilgisi yok') : 'Zorlu Center, Kule 3, Kat 4, Beşiktaş, İstanbul'
        }
      })

      let trackingNumber = 'MOCK-TRACKING-' + Math.floor(100000 + Math.random() * 900000)
      const resultTracking = otoResult ? (otoResult.trackingNumber || otoResult.shipmentNumber) : null
      if (resultTracking) {
        trackingNumber = resultTracking
      }

      if (isShippedByPeony) {
        await supabase.from('orders').update({
          shipping_tracking_buyer: trackingNumber,
          order_status: 'shipped_to_buyer'
        }).eq('id', orderId)
      } else {
        await supabase.from('orders').update({
          shipping_tracking_seller: trackingNumber,
          order_status: 'shipped_to_lab'
        }).eq('id', orderId)
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Sipariş ödemesi simüle edildi ve OTO Kargo barkodu başarıyla oluşturuldu.', 
        trackingNumber 
      })
    }

    return NextResponse.json({ error: 'Geçersiz parametreler' }, { status: 400 })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
