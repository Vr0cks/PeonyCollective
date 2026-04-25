'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addProduct(data: {
  brand: string;
  model_name: string;
  description: string;
  price: number;
  condition: string;
  material: string; // YENİ
  dimensions: string; // YENİ
  production_year: number; // YENİ
  serial_number: string; // YENİ
  public_images: string[];
  authenticity_docs: string[]; // YENİ
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Oturum açmanız gerekiyor.")

  // Veritabanına tüm detayları (yeni sütunlara) ekliyoruz
  const { error: insertError } = await supabase.from('products').insert({
    seller_id: user.id,
    brand: data.brand,
    model_name: data.model_name,
    description: data.description,
    price: data.price,
    condition: data.condition,
    material: data.material, // YENİ
    dimensions: data.dimensions, // YENİ
    production_year: data.production_year, // YENİ
    serial_number: data.serial_number, // YENİ
    public_images: data.public_images,
    authenticity_docs: data.authenticity_docs, // YENİ
    status: 'pending' 
  })

  if (insertError) {
    console.error('Veritabanına kaydederken hata oluştu:', insertError.message)
    throw new Error("Ürün kaydedilirken bir hata oluştu.")
  }

  revalidatePath('/sell')
  revalidatePath('/admin')
  return { success: true }
}