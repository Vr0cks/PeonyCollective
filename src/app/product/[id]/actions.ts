'use server'

import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createOrder(productId: string, price: number) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 0. Ürün durumunu ve satıcıyı kontrol et (Race Condition ve Kendi Ürününü Alma Engeli)
  const { data: product, error: productFetchError } = await supabase
    .from('products')
    .select('seller_id, status')
    .eq('id', productId)
    .single()

  if (productFetchError || !product) {
    redirect(`/product/${productId}?error=Ürün bulunamadı.`)
  }

  if (product.status !== 'approved') {
    redirect(`/product/${productId}?error=Bu ürün satılmıştır veya şu an satın alınamaz durumda.`)
  }

  if (product.seller_id === user.id) {
    redirect(`/product/${productId}?error=Kendi sattığınız ürünü satın alamazsınız.`)
  }

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
