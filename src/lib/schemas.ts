import { z } from 'zod';
import { genders, mainCategories, conditions } from '@/src/utils/categoryData';

// Kategori verilerindeki değerleri union tiplerine çeviriyoruz
const validGenders = genders.map(g => g.value) as [string, ...string[]];
const validCategories = mainCategories.map(c => c.value) as [string, ...string[]];
const validConditions = conditions as [string, ...string[]];

export const productSchema = z.object({
  gender: z.enum(validGenders, { message: 'Bölüm (Cinsiyet) seçimi zorunludur.' }),
  category: z.enum(validCategories, { message: 'Kategori seçimi zorunludur.' }),
  subcategory: z.string().min(1, 'Alt kategori seçimi zorunludur.').max(100, 'Alt kategori seçimi çok uzun.'),
  size: z.string().max(50, 'Beden bilgisi çok uzun.').optional().nullable(),
  brand: z.string().min(1, 'Marka seçimi zorunludur.').max(100, 'Marka adı çok uzun.'),
  model_name: z.string().min(1, 'Model adı zorunludur.').max(150, 'Model adı çok uzun.'),
  description: z.string().min(20, 'Ürün hikayesi ve açıklaması çok kısa.').max(3000, 'Açıklama çok uzun, en fazla 3000 karakter olabilir.'),
  price: z.coerce.number().min(1, 'Geçerli bir satış fiyatı belirleyin.'),
  condition: z.enum(validConditions, { message: 'Kondisyon seçimi zorunludur.' }),
  material: z.string().max(100, 'Materyal bilgisi çok uzun.').optional().nullable(),
  dimensions: z.string().max(100, 'Boyut bilgisi çok uzun.').optional().nullable(),
  purchase_year: z.coerce.number().min(1900, 'Geçerli bir yıl giriniz.').max(new Date().getFullYear(), 'Gelecekteki bir yıl girilemez.').optional().nullable(),
  serial_number: z.string().max(100, 'Seri numarası çok uzun.').optional().nullable(),
  odor_score: z.coerce.number().min(1).max(10).optional().nullable(),
  has_spa_treatment: z.boolean().default(false),
  is_peony_vip: z.boolean().default(false),
  supplier: z.string().max(100, 'Tedarikçi bilgisi çok uzun.').optional().nullable(),
  full_set_items: z.array(z.string()).default([]),
  
  // Storage URLs
  public_images: z.array(z.string()).min(1, 'En az 1 vitrin görseli yüklemelisiniz.'),
  authenticity_docs: z.array(z.string()),
  flaw_images: z.array(z.string()).default([]),
  video_url: z.string().max(500, 'URL çok uzun.').optional().nullable(),
});

export const conciergeOfferSchema = z.object({
  name: z.string().min(2, 'Adınız çok kısa.').max(100, 'Adınız çok uzun.'),
  product_interest: z.string().min(3, 'Ürün adı çok kısa.').max(200, 'Ürün adı çok uzun.'),
  max_price: z.coerce.number().min(1, 'Geçerli bir tutar girin.'),
});
