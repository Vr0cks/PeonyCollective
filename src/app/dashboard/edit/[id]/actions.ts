'use server'

import { createClient } from '@/src/utils/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

// Audit log yazar — service role ile RLS bypass
async function logProductEdit(params: {
  productId: string
  changedBy: string
  role: 'seller' | 'admin'
  field: string
  oldValue?: string
  newValue?: string
  note?: string
}) {
  try {
    const service = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    await service.from('product_edit_logs').insert({
      product_id: params.productId,
      changed_by: params.changedBy,
      role: params.role,
      field: params.field,
      old_value: params.oldValue ?? null,
      new_value: params.newValue ?? null,
      note: params.note ?? null,
    })
  } catch (e) {
    console.error('Audit log yazılamadı:', e)
  }
}
import { redirect } from 'next/navigation'

export async function updateProductAction(productId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

  // Satıcı veya admin düzenleyebilir
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  const isAdmin = profile?.role === 'admin'

  const { data: product } = await supabase
    .from('products')
    .select('seller_id, status')
    .eq('id', productId)
    .single()

  if (!product || (product.seller_id !== user.id && !isAdmin)) {
    return { success: false, error: 'Bu ürünü düzenle yetkiniz yok.' }
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

  // Mevcut değerleri al (log için)
  const { data: before } = await supabase
    .from('products')
    .select('price, description, public_images')
    .eq('id', productId)
    .single()

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

  // Audit log
  const changedByRole = product.seller_id === user.id ? 'seller' : 'admin'
  if (before?.price !== price) {
    await logProductEdit({ productId, changedBy: user.id, role: changedByRole, field: 'price', oldValue: String(before?.price), newValue: String(price) })
  }
  if (before?.description !== description) {
    await logProductEdit({ productId, changedBy: user.id, role: changedByRole, field: 'description', oldValue: before?.description ?? '', newValue: description })
  }
  if (JSON.stringify(before?.public_images) !== JSON.stringify(images)) {
    await logProductEdit({ productId, changedBy: user.id, role: changedByRole, field: 'images', oldValue: `${before?.public_images?.length ?? 0} fotoğraf`, newValue: `${images.length} fotoğraf` })
  }

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

  await logProductEdit({
    productId,
    changedBy: user.id,
    role: 'seller',
    field: 'status',
    oldValue: product.status,
    newValue: 'withdrawn',
    note: 'Satıcı ilanı yayından çekti'
  })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
