'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProductAction(productId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

  // Sadece kendi ürününü güncelleyebilir
  const { data: product } = await supabase
    .from('products')
    .select('seller_id, status')
    .eq('id', productId)
    .single()

  if (!product || product.seller_id !== user.id) {
    return { success: false, error: 'Bu ürünü düzenleme yetkiniz yok.' }
  }

  if (product.status === 'sold') {
    return { success: false, error: 'Satılmış ürünler düzenlenemez.' }
  }

  const price = parseFloat(formData.get('price') as string)
  const description = (formData.get('description') as string)?.trim()
  const newImagesRaw = formData.get('new_images') as string
  const removedImagesRaw = formData.get('removed_images') as string

  if (!price || price <= 0) return { success: false, error: 'Geçerli bir fiyat girin.' }

  // Mevcut resimleri al
  const { data: current } = await supabase
    .from('products')
    .select('public_images')
    .eq('id', productId)
    .single()

  let images: string[] = current?.public_images || []

  // Silinen resimleri çıkar
  if (removedImagesRaw) {
    const removed: string[] = JSON.parse(removedImagesRaw)
    images = images.filter(img => !removed.includes(img))
  }

  // Yeni resimleri ekle
  if (newImagesRaw) {
    const newImages: string[] = JSON.parse(newImagesRaw)
    images = [...images, ...newImages]
  }

  if (images.length < 1) {
    return { success: false, error: 'En az 1 fotoğraf olmalıdır.' }
  }

  const { error } = await supabase
    .from('products')
    .update({
      price,
      description,
      public_images: images,
      updated_at: new Date().toISOString(),
    })
    .eq('id', productId)

  if (error) return { success: false, error: error.message }

  revalidatePath(`/product/${productId}`)
  revalidatePath('/dashboard')
  return { success: true }
}

export async function withdrawProductAction(productId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

  const { data: product } = await supabase
    .from('products')
    .select('seller_id, status')
    .eq('id', productId)
    .single()

  if (!product || product.seller_id !== user.id) {
    return { success: false, error: 'Bu ürünü çekme yetkiniz yok.' }
  }

  if (product.status === 'sold') {
    return { success: false, error: 'Satılmış ürünler yayından çekilemez.' }
  }

  const { error } = await supabase
    .from('products')
    .update({ status: 'withdrawn' })
    .eq('id', productId)

  if (error) return { success: false, error: error.message }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
