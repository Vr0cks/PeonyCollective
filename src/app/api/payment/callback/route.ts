import { createAdminClient } from '@/src/utils/supabase/admin'
import { verifyCallback, PayTRCallbackParams } from '@/src/lib/paytr'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const rawParams: Record<string, string> = {}
    const entries = Array.from((formData as any).entries()) as [string, any][]
    for (const [key, value] of entries) {
      if (typeof value === 'string') {
        rawParams[key] = value
      }
    }
    const params = rawParams as unknown as PayTRCallbackParams

    // 1. Verify PayTR signature
    const isValid = verifyCallback(params)
    if (!isValid) {
      return new Response('PAYTR HASH DEGERI GEÇERSIZ', { status: 400 })
    }

    const orderId = params.merchant_oid
    const supabase = createAdminClient()
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId)

    if (params.status === 'success') {
      // 2. Fetch orders to verify status and retrieve details
      const query = supabase.from('orders').select('*')
      if (isUuid) {
        query.eq('id', orderId)
      } else {
        query.eq('payment_id', orderId)
      }
      const { data: orders, error: orderError } = await query

      if (orderError || !orders || orders.length === 0) {
        return new Response('SIPARIS BULUNAMADI', { status: 404 })
      }

      // Sepette birden fazla ürün varsa tümünü dolaş
      for (const order of orders) {
        if (order.order_status !== 'pending_payment') {
          continue // Already updated
        }

        // 3. TOCTOU FIX: Prevent race conditions & Update product status in a single atomic operation
        const { data: updatedProducts, error: updateProductError } = await supabase
          .from('products')
          .update({ status: 'sold' })
          .eq('id', order.product_id)
          .neq('status', 'sold')
          .select('id')

        if (updateProductError || !updatedProducts || updatedProducts.length === 0) {
          // Product is either already sold by someone else in the same ms, or not found
          console.error('URUN ZATEN SATILMIS VEYA BULUNAMADI', updateProductError)
          await supabase
            .from('orders')
            .update({ order_status: 'cancelled' })
            .eq('id', order.id)
          continue // Skip to next item
        }

        // 4. Update order status to paid
        const { error: updateOrderError } = await supabase
          .from('orders')
          .update({
            order_status: 'paid',
            payment_id: params.merchant_oid,
          })
          .eq('id', order.id)

        if (updateOrderError) {
          console.error('SIPARIS GUNCELLENEMEDI', updateOrderError)
          // If order update fails, we might need a rollback logic in a real app,
          // but for now, we just continue. Product is marked sold.
          continue
        }

        // 6. Notify seller & OTO Kargo Integration
        const { data: fullProduct } = await supabase
          .from('products')
          .select('brand, model_name, seller_id, is_peony_vip')
          .eq('id', order.product_id)
          .single()

        if (fullProduct) {
          await supabase.from('notifications').insert({
            user_id: fullProduct.seller_id,
            type: 'shipping_update',
            title: 'Ürününüz Satıldı!',
            message: `Tebrikler! ${fullProduct.brand} ${fullProduct.model_name} ürününüz satıldı. Lütfen en kısa sürede kargoya hazırlayın.`,
            is_read: false,
            metadata: { order_id: order.id, product_id: order.product_id },
          })
          
          // --- OTO KARGO INTEGRATION ---
          try {
            const { data: profiles } = await supabase
              .from('profiles')
              .select('id, first_name, last_name, phone_number, address, role')
              .in('id', [order.buyer_id, order.seller_id])
            
             const buyer = profiles?.find((p: any) => p.id === order.buyer_id)
             const seller = profiles?.find((p: any) => p.id === order.seller_id)
             
             if (buyer && seller) {
               const { createOtoOrder } = await import('@/src/lib/oto')
 
               const isShippedByPeony = seller?.role === 'admin' || fullProduct.is_peony_vip

               const otoResult = await createOtoOrder({
                 orderId: isShippedByPeony ? `${order.id}_FINAL` : order.id,
                 description: `${fullProduct.brand} ${fullProduct.model_name}`,
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
 
               if (otoResult && (otoResult.trackingNumber || otoResult.shipmentNumber)) {
                 const trackingNumber = otoResult.trackingNumber || otoResult.shipmentNumber
                 if (isShippedByPeony) {
                   await supabase.from('orders').update({
                     shipping_tracking_buyer: trackingNumber,
                     order_status: 'shipped_to_buyer'
                   }).eq('id', order.id)
                 } else {
                   await supabase.from('orders').update({
                     shipping_tracking_seller: trackingNumber,
                     order_status: 'shipped_to_lab'
                   }).eq('id', order.id)
                 }
                 
                 // --- EMAIL SENDING ---
                 try {
                   const { sendOrderConfirmationEmail } = await import('@/src/lib/resend')
                   await sendOrderConfirmationEmail({
                     orderId: order.id,
                     buyerName: `${buyer.first_name || ''} ${buyer.last_name || ''}`.trim() || 'Müşteri',
                     buyerEmail: order.buyer_email || 'test@peonycollective.com',
                     totalAmount: order.total_price || 0,
                     productName: `${fullProduct.brand} ${fullProduct.model_name}`,
                     trackingNumber: trackingNumber
                   })
                 } catch (emailErr) {
                   console.error('Email gönderilemedi:', emailErr)
                   await supabase.from('system_logs').insert({
                     level: 'error',
                     source: 'paytr_webhook',
                     message: 'Sipariş onayı e-postası gönderilemedi',
                     metadata: { orderId: order.id, error: String(emailErr) }
                   })
                 }
               }
             }
          } catch (e) {
            console.error('OTO Create Order Error:', e)
            await supabase.from('system_logs').insert({
              level: 'error',
              source: 'paytr_webhook',
              message: 'OTO Kargo API hatası',
              metadata: { orderId: order.id, error: String(e) }
            })
          }
        }
      } // End of orders loop
    } else {
      // Payment failed
      const query = supabase
        .from('orders')
        .update({ order_status: 'cancelled' })
      if (isUuid) {
        await query.eq('id', orderId)
      } else {
        await query.eq('payment_id', orderId)
      }
    }

    // PayTR callback expects "OK"
    return new Response('OK')
  } catch (error) {
    const err = error as Error
    console.error('PayTR Callback Error:', err)
    try {
      const supabase = createAdminClient()
      await supabase.from('system_logs').insert({
        level: 'error',
        source: 'paytr_callback_webhook',
        message: 'PayTR Webhook Callback genel hata oluştu',
        metadata: { error: err.message, stack: err.stack }
      })
    } catch (e) {}
    return new Response('INTERNAL SERVER ERROR', {
      status: 500,
    })
  }
}
