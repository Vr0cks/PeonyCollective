import { createClient } from '@/src/utils/supabase/server'
import { verifyCallback, PayTRCallbackParams } from '@/src/lib/paytr'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const rawParams: Record<string, string> = {}
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        rawParams[key] = value
      }
    })
    const params = rawParams as unknown as PayTRCallbackParams

    // 1. Verify PayTR signature
    const isValid = verifyCallback(params)
    if (!isValid) {
      return new Response('PAYTR HASH DEGERI GEÇERSIZ', { status: 400 })
    }

    const orderId = params.merchant_oid
    const supabase = await createClient()

    if (params.status === 'success') {
      // 2. Fetch orders to verify status and retrieve details
      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('payment_id', orderId)

      if (orderError || !orders || orders.length === 0) {
        return new Response('SIPARIS BULUNAMADI', { status: 404 })
      }

      // Sepette birden fazla ürün varsa tümünü dolaş
      for (const order of orders) {
        if (order.order_status !== 'pending_payment') {
          continue // Already updated
        }

        // 3. Prevent race conditions: check if product is already sold by someone else
        const { data: product } = await supabase
          .from('products')
          .select('status')
          .eq('id', order.product_id)
          .single()

        if (!product || product.status === 'sold') {
          // Product is sold, cancel this order
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
          continue
        }

        // 5. Update product status to sold
        const { error: updateProductError } = await supabase
          .from('products')
          .update({ status: 'sold' })
          .eq('id', order.product_id)

        if (updateProductError) {
          console.error('URUN DURUMU GUNCELLENEMEDI', updateProductError)
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
            
            if (buyer) {
              const { createOtoOrder } = await import('@/src/lib/oto')
              
              // Gönderici Peony Lab mi yoksa doğrudan satıcı mı?
              // Eğer satıcı Admin ise veya ürün 'is_peony_vip' ise ürün Peony'den çıkar.
              const isShippedByPeony = seller?.role === 'admin' || fullProduct.is_peony_vip

              const otoResult = await createOtoOrder({
                orderId: order.id,
                description: `${fullProduct.brand} ${fullProduct.model_name}`,
                senderInformation: {
                  firstName: isShippedByPeony ? 'Peony' : (seller?.first_name || 'Peony'),
                  lastName: isShippedByPeony ? 'Collective' : (seller?.last_name || 'Collective'),
                  phone: seller?.phone_number || '+905550000000',
                  city: 'Istanbul', // varsayılan
                  address: isShippedByPeony ? 'Zorlu Center, Istanbul' : (seller?.address || 'Zorlu Center, Istanbul')
                },
                customerInformation: {
                  firstName: buyer.first_name || 'Musteri',
                  lastName: buyer.last_name || '',
                  phone: buyer.phone_number || '+905550000000',
                  city: 'Istanbul', // varsayılan
                  address: buyer.address || 'Adres bilgisi yok'
                }
              })

              if (otoResult && otoResult.trackingNumber) {
                await supabase.from('orders').update({
                  shipping_tracking_buyer: otoResult.trackingNumber
                }).eq('id', order.id)
                
                // --- EMAIL SENDING ---
                try {
                  const { sendOrderConfirmationEmail } = await import('@/src/lib/resend')
                  await sendOrderConfirmationEmail({
                    orderId: order.id,
                    buyerName: `${buyer.first_name || ''} ${buyer.last_name || ''}`.trim() || 'Müşteri',
                    buyerEmail: order.buyer_email || 'test@peonycollective.com',
                    totalAmount: order.total_price || 0,
                    productName: `${fullProduct.brand} ${fullProduct.model_name}`,
                    trackingNumber: otoResult.trackingNumber
                  })
                } catch (emailErr) {
                  console.error('Email gönderilemedi:', emailErr)
                }
              }
            }
          } catch (e) {
            console.error('OTO Create Order Error:', e)
          }
        }
      } // End of orders loop
    } else {
      // Payment failed
      await supabase
        .from('orders')
        .update({ order_status: 'cancelled' })
        .eq('payment_id', orderId)
    }

    // PayTR callback expects "OK"
    return new Response('OK')
  } catch (error) {
    const err = error as Error
    console.error('PayTR Callback Error:', err)
    return new Response('INTERNAL SERVER ERROR: ' + err.message, {
      status: 500,
    })
  }
}
