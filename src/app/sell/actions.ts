'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { stripExifData } from '@/src/utils/imageProcessing'

// Dosya yükleme yardımcısı
async function uploadFile(supabase: any, file: File, bucket: string, userId: string) {
  const bytes = await file.arrayBuffer()
  let buffer = Buffer.from(bytes)
  
  // OSINT (EXIF) Koruması
  buffer = await stripExifData(buffer, file.type)

  const ext = file.name.split('.').pop()
  const fileName = `${userId}/${bucket}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`
  
  const { error } = await supabase.storage.from('product-images').upload(fileName, buffer, {
    contentType: file.type,
  })
  
  if (error) throw error
  
  const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
  return data.publicUrl
}

export async function addProductAction(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return { success: false, error: "Oturum açmanız gerekiyor." }
    }

    // 1. Güvenlik ve Validasyon (Sunucu Tarafı)
    const publicImages = formData.getAll('public_images') as File[]
    const flawImages = formData.getAll('flaw_images') as File[]
    const authDocs = formData.getAll('authenticity_docs') as File[]
    const videoFile = formData.get('video') as File | null

    const allFiles = [...publicImages, ...flawImages, ...authDocs]
    if (videoFile) allFiles.push(videoFile)

    for (const file of allFiles) {
      if (file.size > 50 * 1024 * 1024) { // Video için 50MB, Foto için 5MB ama genel limit
        return { success: false, error: "Dosya boyutu çok yüksek." }
      }
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        return { success: false, error: "Geçersiz dosya formatı." }
      }
    }

    if (publicImages.length === 0) {
      return { success: false, error: "En az bir adet ürün görseli yüklemeniz gerekmektedir." }
    }

    // 2. Dosyaları Supabase Storage'a Yükle
    const publicUrls = await Promise.all(publicImages.map(f => uploadFile(supabase, f, 'public', user.id)))
    const flawUrls = await Promise.all(flawImages.map(f => uploadFile(supabase, f, 'flaws', user.id)))
    const authUrls = await Promise.all(authDocs.map(f => uploadFile(supabase, f, 'verification', user.id)))
    
    let videoUrl = null
    if (videoFile && videoFile.size > 0) {
      videoUrl = await uploadFile(supabase, videoFile, 'videos', user.id)
    }

    // 3. Veritabanı Kaydı
    const { error: insertError } = await supabase.from('products').insert({
      seller_id: user.id,
      gender: formData.get('gender') as string,
      category: formData.get('category') as string,
      subcategory: formData.get('subcategory') as string,
      size: formData.get('size') as string || null,
      brand: formData.get('brand') as string,
      model_name: formData.get('model_name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      condition: formData.get('condition') as string,
      material: formData.get('material') as string || null,
      dimensions: formData.get('dimensions') as string || null,
      purchase_year: parseInt(formData.get('purchase_year') as string) || null,
      serial_number: formData.get('serial_number') as string || null,
      public_images: publicUrls,
      authenticity_docs: authUrls,
      flaw_images: flawUrls,
      video_url: videoUrl,
      odor_score: formData.get('odor_score') ? parseInt(formData.get('odor_score') as string) : null,
      has_spa_treatment: formData.get('has_spa_treatment') === 'true',
      full_set_items: formData.getAll('full_set_items') as string[],
      status: 'pending' 
    })

    if (insertError) {
      console.error(insertError)
      return { success: false, error: insertError.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
  } catch (err: any) {
    console.error(err)
    return { success: false, error: err.message || "Beklenmeyen bir hata oluştu." }
  }
}

// ─── CLOUD DRAFT ACTIONS ───

export async function saveCloudDraft(draftData: any) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false }

    const { data: existing } = await supabase.from('product_drafts').select('id').eq('seller_id', user.id).single()

    if (existing) {
      await supabase.from('product_drafts').update({ data: draftData, updated_at: new Date().toISOString() }).eq('id', existing.id)
    } else {
      await supabase.from('product_drafts').insert({ seller_id: user.id, data: draftData })
    }

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export async function loadCloudDraft() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, draft: null }

    const { data } = await supabase.from('product_drafts').select('data').eq('seller_id', user.id).single()
    return { success: true, draft: data?.data || null }
  } catch (error) {
    return { success: false, draft: null }
  }
}