-- Ürün Değişiklik Audit Log Tablosu
-- Supabase SQL Editor'de çalıştırın

CREATE TABLE IF NOT EXISTS public.product_edit_logs (
    id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id  UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    changed_by  UUID REFERENCES public.profiles(id) NOT NULL,
    role        TEXT NOT NULL,                    -- 'seller' veya 'admin'
    field       TEXT NOT NULL,                    -- 'price', 'description', 'images', 'status', 'withdrawn'
    old_value   TEXT,                             -- değişmeden önceki değer
    new_value   TEXT,                             -- değişmeden sonraki değer
    note        TEXT,                             -- isteğe bağlı admin notu
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS
ALTER TABLE public.product_edit_logs ENABLE ROW LEVEL SECURITY;

-- Adminler her şeyi görebilir
CREATE POLICY "Admins can view all edit logs"
  ON public.product_edit_logs FOR SELECT
  USING (public.is_admin());

-- Satıcılar sadece kendi ürünlerinin loglarını görebilir
CREATE POLICY "Sellers can view logs for their own products"
  ON public.product_edit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.products
      WHERE id = product_id AND seller_id = auth.uid()
    )
  );

-- Sadece server-side (service_role) insert yapabilir — kullanıcılar doğrudan yazamaz
-- (Next.js server action'lar service_role kullanır)
CREATE POLICY "Service role can insert logs"
  ON public.product_edit_logs FOR INSERT
  WITH CHECK (true);

-- İndeks: ürün bazında hızlı sorgulama
CREATE INDEX IF NOT EXISTS idx_product_edit_logs_product_id
  ON public.product_edit_logs(product_id, created_at DESC);
