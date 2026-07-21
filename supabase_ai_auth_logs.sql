-- AI Model Eğitimi İçin Veri Biriktirme Tablosu
-- Bu tablo Claude Vision ve Entrupy kararlarını fotoğraflarla eşleştirerek saklar.
CREATE TABLE IF NOT EXISTS ai_authentication_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  brand VARCHAR(100) NOT NULL,
  model_name VARCHAR(150) NOT NULL,
  image_urls TEXT[] NOT NULL, -- Analiz edilen fotoğrafların linkleri
  
  -- Claude Vision Analiz Sonuçları
  claude_verdict VARCHAR(50) CHECK (claude_verdict IN ('likely_authentic', 'suspicious', 'likely_fake')),
  claude_confidence INTEGER, -- 0-100 arası güven skoru
  claude_raw_response TEXT, -- Claude'un yazdığı tüm gerekçeli rapor
  claude_analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Entrupy Doğrulama Sonuçları
  entrupy_verdict VARCHAR(50) CHECK (entrupy_verdict IN ('authentic', 'fake', 'unknown')),
  entrupy_certificate_url TEXT,
  entrupy_analyzed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Hızlı sorgulama için indeksler
CREATE INDEX IF NOT EXISTS idx_ai_auth_logs_product ON ai_authentication_logs(product_id);
CREATE INDEX IF NOT EXISTS idx_ai_auth_logs_verdicts ON ai_authentication_logs(claude_verdict, entrupy_verdict);
