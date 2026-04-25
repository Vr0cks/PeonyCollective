'use server'

import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createOrder(productId: string, price: number) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 1. Siparişi oluştur
  const { error: orderError } = await supabase.from('orders').insert({
    buyer_id: user.id,
    product_id: productId,
    total_price: price,
    order_status: 'completed'
  })

  if (orderError) throw new Error("Sipariş oluşturulamadı.")

  // 2. Ürünü "Satıldı" (sold) olarak işaretle
  const { error: productError } = await supabase
    .from('products')
    .update({ status: 'sold' })
    .eq('id', productId)

  if (productError) throw new Error("Ürün durumu güncellenemedi.")

  revalidatePath('/')
  revalidatePath(`/product/${productId}`)
  redirect('/orders/success')
}
