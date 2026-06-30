import { z } from 'zod';
import { genders, mainCategories, conditions } from '@/src/utils/categoryData';

// Kategori verilerindeki değerleri union tiplerine çeviriyoruz
const validGenders = genders.map(g => g.value) as [string, ...string[]];
const validCategories = mainCategories.map(c => c.value) as [string, ...string[]];
const validConditions = conditions as [string, ...string[]];

export const productSchema = z.object({
  gender: z.enum(validGenders, { message: 'Bölüm (Cinsiyet) seçimi zorunludur.' }),
  category: z.enum(validCategories, { message: 'Kategori seçimi zorunludur.' }),
  subcategory: z.string().min(1, 'Alt kategori seçimi zorunludur.'),
  size: z.string().optional().nullable(),
  brand: z.string().min(1, 'Marka seçimi zorunludur.'),
  model_name: z.string().min(1, 'Model adı zorunludur.'),
  description: z.string().min(20, 'Ürün hikayesi ve açıklaması çok kısa.'),
  price: z.coerce.number().min(1, 'Geçerli bir satış fiyatı belirleyin.'),
  condition: z.enum(validConditions, { message: 'Kondisyon seçimi zorunludur.' }),
  material: z.string().optional().nullable(),
  dimensions: z.string().optional().nullable(),
  purchase_year: z.coerce.number().min(1900, 'Geçerli bir yıl giriniz.').max(new Date().getFullYear(), 'Gelecekteki bir yıl girilemez.').optional().nullable(),
  serial_number: z.string().optional().nullable(),
  odor_score: z.coerce.number().min(1).max(10).optional().nullable(),
  has_spa_treatment: z.boolean().default(false),
  is_peony_vip: z.boolean().default(false),
  full_set_items: z.array(z.string()).default([]),
  
  // Storage URLs
  public_images: z.array(z.string()).min(1, 'En az 1 vitrin görseli yüklemelisiniz.'),
  authenticity_docs: z.array(z.string()),
  flaw_images: z.array(z.string()).default([]),
  video_url: z.string().optional().nullable(),
});

export const conciergeOfferSchema = z.object({
  name: z.string().min(2, 'Adınız çok kısa.'),
  product_interest: z.string().min(3, 'Ürün adı çok kısa.'),
  max_price: z.coerce.number().min(1, 'Geçerli bir tutar girin.'),
});
