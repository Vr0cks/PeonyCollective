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
      // 2. Fetch order to verify status and retrieve details
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

      if (orderError || !order) {
        return new Response('SIPARIS BULUNAMADI', { status: 404 })
      }

      // Check if already processed
      if (order.order_status !== 'pending_payment') {
        return new Response('OK') // Already updated
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
          .eq('id', orderId)
        return new Response('URUN COKTAN SATILMIS', { status: 400 })
      }

      // 4. Update order status to paid
      const { error: updateOrderError } = await supabase
        .from('orders')
        .update({
          order_status: 'paid',
          payment_id: params.merchant_oid,
        })
        .eq('id', orderId)

      if (updateOrderError) {
        return new Response('SIPARIS GUNCELLENEMEDI', { status: 500 })
      }

      // 5. Update product status to sold
      const { error: updateProductError } = await supabase
        .from('products')
        .update({ status: 'sold' })
        .eq('id', order.product_id)

      if (updateProductError) {
        return new Response('URUN DURUMU GUNCELLENEMEDI', { status: 500 })
      }

      // 6. Notify seller
      const { data: fullProduct } = await supabase
        .from('products')
        .select('brand, model_name, seller_id')
        .eq('id', order.product_id)
        .single()

      if (fullProduct) {
        await supabase.from('notifications').insert({
          user_id: fullProduct.seller_id,
          type: 'shipping_update',
          title: 'Ürününüz Satıldı!',
          message: `Tebrikler! ${fullProduct.brand} ${fullProduct.model_name} ürününüz satıldı. Lütfen en kısa sürede kargoya hazırlayın.`,
          is_read: false,
          metadata: { order_id: orderId, product_id: order.product_id },
        })
      }
    } else {
      // Payment failed
      await supabase
        .from('orders')
        .update({ order_status: 'cancelled' })
        .eq('id', orderId)
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
