'use server'

import { createAdminClient } from '@/src/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function deleteProduct(productId: string) {
  const supabase = createAdminClient()
  
  // 1. Delete associated orders first to prevent foreign key errors
  const { error: orderErr } = await supabase
    .from('orders')
    .delete()
    .eq('product_id', productId)

  if (orderErr) {
    return { success: false, error: 'Siparişler silinirken hata: ' + orderErr.message }
  }

  // 2. Delete associated offers
  const { error: offerErr } = await supabase
    .from('offers')
    .delete()
    .eq('product_id', productId)

  if (offerErr) {
    return { success: false, error: 'Teklifler silinirken hata: ' + offerErr.message }
  }

  // 3. Set product_id to null in conversations
  const { error: convErr } = await supabase
    .from('conversations')
    .update({ product_id: null })
    .eq('product_id', productId)

  if (convErr) {
    return { success: false, error: 'Mesajlaşma odaları güncellenirken hata: ' + convErr.message }
  }

  // 4. Delete the product
  const { error: productErr } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (productErr) {
    return { success: false, error: 'Ürün silinemedi: ' + productErr.message }
  }

  revalidatePath('/admin/products')
  return { success: true }
}
