'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addProduct(data: {
  gender: string;
  category: string;
  subcategory: string;
  size?: string;
  brand: string;
  model_name: string;
  description: string;
  price: number;
  condition: string;
  material: string;
  dimensions: string;
  purchase_year: number;
  serial_number: string;
  public_images: string[];
  authenticity_docs: string[];
}) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: "Oturum açmanız gerekiyor." }

    // Girdi doğrulama (Validation)
    if (!data.brand || data.brand.trim() === '') {
      return { success: false, error: "Marka alanı zorunludur." }
    }
    if (!data.model_name || data.model_name.trim() === '') {
      return { success: false, error: "Model adı zorunludur." }
    }
    if (!data.category || data.category.trim() === '') {
      return { success: false, error: "Kategori alanı zorunludur." }
    }
    if (!data.subcategory || data.subcategory.trim() === '') {
      return { success: false, error: "Alt kategori alanı zorunludur." }
    }
    if (!data.description || data.description.trim().length < 10) {
      return { success: false, error: "Açıklama en az 10 karakter olmalıdır." }
    }
    if (typeof data.price !== 'number' || data.price <= 0) {
      return { success: false, error: "Fiyat 0'dan büyük bir sayı olmalıdır." }
    }
    if (!data.public_images || data.public_images.length === 0) {
      return { success: false, error: "En az bir adet ürün görseli yüklemeniz gerekmektedir." }
    }

    const { error: insertError } = await supabase.from('products').insert({
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
      material: data.material,
      dimensions: data.dimensions,
      purchase_year: data.purchase_year,
      serial_number: data.serial_number,
      public_images: data.public_images,
      authenticity_docs: data.authenticity_docs,
      status: 'pending' 
    })

    if (insertError) {
      console.error('Veritabanı hatası:', insertError)
      return { success: false, error: "Veritabanına kaydedilemedi: " + insertError.message }
    }

    revalidatePath('/sell')
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Ürün ekleme hatası:', error)
    return { success: false, error: "Beklenmedik bir hata oluştu. Lütfen tekrar deneyin." }
  }
}