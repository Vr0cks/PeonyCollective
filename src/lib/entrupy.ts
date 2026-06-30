/**
 * Entrupy API Entegrasyonu
 */

const ENTRUPY_API_URL = process.env.ENTRUPY_API_URL || 'https://api.entrupy.com/v2';
const ENTRUPY_API_KEY = process.env.ENTRUPY_API_KEY;

import { createAdminClient } from '@/src/utils/supabase/admin';

export interface EntrupyAnalysisRequest {
  productId: string;
  brand: string;
  material?: string;
  imageUrls: string[]; 
}

export interface EntrupyAnalysisResponse {
  entrupy_id: string;
  status: 'analyzing' | 'verified' | 'rejected' | 'error' | 'pending';
  certificate_url?: string;
  error_message?: string;
}

/**
 * Entrupy servisine analiz başlatma talebi gönderir.
 */
export async function startEntrupyAnalysis(data: EntrupyAnalysisRequest): Promise<EntrupyAnalysisResponse> {
  console.log(`[ENTRUPY] Analiz başlatılıyor: ${data.productId} - ${data.brand}`);
  
  if (!ENTRUPY_API_KEY) {
    console.warn('[ENTRUPY] API anahtarı bulunamadı, simülasyon (mock) yanıt dönülüyor.');
    return {
      entrupy_id: `ent_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      status: 'analyzing',
    };
  }

  try {
    const payload = {
      customer_item_id: data.productId, // Bizim ID'miz, Webhook'ta geri gelecek
      brand: data.brand,
      material: data.material,
      images: data.imageUrls
    };

    const response = await fetch(`${ENTRUPY_API_URL}/items`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ENTRUPY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Entrupy API Hatası: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    
    return {
      entrupy_id: result.id || 'unknown',
      status: result.status || 'analyzing'
    };
  } catch (error: unknown) {
    console.error('[ENTRUPY ERROR]', error);
    try {
      const supabase = createAdminClient();
      await supabase.from('system_logs').insert({
        level: 'error',
        source: 'entrupy_api',
        message: 'Entrupy analiz talebi başarısız oldu',
        metadata: { error: error instanceof Error ? error.message : String(error), productId: data.productId }
      });
    } catch (e) {}
    return {
      entrupy_id: '',
      status: 'error',
      error_message: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'
    };
  }
}
