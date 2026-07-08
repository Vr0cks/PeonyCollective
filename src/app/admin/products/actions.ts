'use server'

import { createAdminClient } from '@/src/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function deleteProduct(productId: string) {
  const supabase = createAdminClient()
  
  // 1. Delete associated orders first to prevent foreign key errors
  await supabase
    .from('orders')
    .delete()
    .eq('product_id', productId)

  // 2. Delete the product
  const { error: productErr } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (productErr) {
    throw new Error('Ürün silinemedi: ' + productErr.message)
  }

  revalidatePath('/admin/products')
  return { success: true }
}
