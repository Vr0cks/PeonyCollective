'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { productSchema } from '@/src/lib/schemas'
import { startEntrupyAnalysis } from '@/src/lib/entrupy'
import { z } from 'zod'

export async function addProductAction(payload: z.infer<typeof productSchema>) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return { success: false, error: "Oturum açmanız gerekiyor." }
    }

    // 1. Zod Validasyonu
    const validatedFields = productSchema.safeParse(payload)

    if (!validatedFields.success) {
      console.error(validatedFields.error.flatten())
      return { success: false, error: "Girdiğiniz verilerde eksik veya hatalı alanlar var.", validationErrors: validatedFields.error.flatten().fieldErrors }
    }

    const data = validatedFields.data;

    // 2. Veritabanı Kaydı
    const { data: insertedProduct, error: insertError } = await supabase.from('products').insert({
      seller_id: user.id,
      gender: data.gender,
      category: data.category,
      subcategory: data.subcategory,
      size: data.size || null,
      brand: data.brand,
      model_name: data.model_name,
      description: data.description,
      price: data.price,
      condition: data.condition,
      material: data.material || null,
      dimensions: data.dimensions || null,
      purchase_year: data.purchase_year || null,
      serial_number: data.serial_number || null,
      public_images: data.public_images,
      authenticity_docs: data.authenticity_docs,
      flaw_images: data.flaw_images,
      video_url: data.video_url || null,
      odor_score: data.odor_score || null,
      has_spa_treatment: data.has_spa_treatment,
      is_peony_vip: data.is_peony_vip,
      full_set_items: data.full_set_items,
      status: 'pending',
      entrupy_status: 'pending'
    }).select('id').single()

    if (insertError) {
      console.error(insertError)
      return { success: false, error: insertError.message }
    }

    // 3. Arka Planda Entrupy Analizini Başlat
    // (Bunu await etmeden de yapabiliriz veya webhook'a bırakabiliriz ama şimdilik burada bekliyoruz)
    if (data.authenticity_docs && data.authenticity_docs.length > 0) {
      const entrupyResponse = await startEntrupyAnalysis({
        productId: insertedProduct.id,
        brand: data.brand,
        material: data.material || undefined,
        imageUrls: data.authenticity_docs
      });

      // Entrupy status güncelle
      if (entrupyResponse.entrupy_id) {
        await supabase.from('products').update({
          entrupy_status: entrupyResponse.status
        }).eq('id', insertedProduct.id);
      }
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