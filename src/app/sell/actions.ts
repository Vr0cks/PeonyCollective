'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addProduct(data: {
  brand: string;
  model_name: string;
  description: string;
  price: number;
  condition: string;
  material: string;
  dimensions: string;
  production_year: number;
  serial_number: string;
  public_images: string[];
  authenticity_docs: string[];
}) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: "Oturum açmanız gerekiyor." }

    const { error: insertError } = await supabase.from('products').insert({
      seller_id: user.id,
      brand: data.brand,
      model_name: data.model_name,
      description: data.description,
      price: data.price,
      condition: data.condition,
      material: data.material,
      dimensions: data.dimensions,
      production_year: data.production_year,
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
  } catch (error: any) {
    console.error('Ürün ekleme hatası:', error)
    return { success: false, error: "Beklenmedik bir hata oluştu. Lütfen tekrar deneyin." }
  }
}