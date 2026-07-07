-- ═══════════════════════════════════════════════════════════════
-- STORAGE BUCKET & POLICY KURULUMU
-- ═══════════════════════════════════════════════════════════════

-- postgres yetki hatasını aşmak için supabase_storage_admin rolüne geçiyoruz
SET ROLE supabase_storage_admin;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ───────────────────────────────────────────────────────────────
-- BUCKET A: product-images  (PUBLIC)
-- Vitrin fotoğrafları, kusur görselleri, videolar
-- ───────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Eski policy'leri temizle
DROP POLICY IF EXISTS "Allow public read access to product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow owners to update or delete their product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to non-sensitive product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow owners and admins to manage verification product-images" ON storage.objects;
DROP POLICY IF EXISTS "product-images: public read" ON storage.objects;
DROP POLICY IF EXISTS "product-images: owner upload" ON storage.objects;
DROP POLICY IF EXISTS "product-images: owner or admin modify" ON storage.objects;

-- Herkes okuyabilir (public/, flaws/, videos/ klasörleri)
CREATE POLICY "product-images: public read" ON storage.objects
    FOR SELECT TO public
    USING (
        bucket_id = 'product-images'
        AND split_part(name, '/', 2) IN ('public', 'flaws', 'videos')
    );

-- Kullanıcı kendi klasörüne yükleyebilir
CREATE POLICY "product-images: owner upload" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'product-images'
        AND split_part(name, '/', 1) = auth.uid()::text
    );

-- Kullanıcı veya admin kendi dosyalarını güncelleyebilir/silebilir
CREATE POLICY "product-images: owner or admin modify" ON storage.objects
    FOR ALL TO authenticated
    USING (
        bucket_id = 'product-images'
        AND (
            split_part(name, '/', 1) = auth.uid()::text
            OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
        )
    )
    WITH CHECK (
        bucket_id = 'product-images'
        AND (
            split_part(name, '/', 1) = auth.uid()::text
            OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
        )
    );

-- ───────────────────────────────────────────────────────────────
-- BUCKET B: product-docs  (PRIVATE)
-- Doğrulama belgeleri: logo, dikiş, donanım, seri no, fatura
-- Sadece sahip + admin erişebilir (signed URL ile)
-- ───────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-docs', 'product-docs', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Eski policy'leri temizle
DROP POLICY IF EXISTS "product-docs: owner read" ON storage.objects;
DROP POLICY IF EXISTS "product-docs: owner upload" ON storage.objects;
DROP POLICY IF EXISTS "product-docs: owner or admin modify" ON storage.objects;

-- Sadece sahip veya admin okuyabilir
CREATE POLICY "product-docs: owner read" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'product-docs'
        AND (
            split_part(name, '/', 1) = auth.uid()::text
            OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
        )
    );

-- Kullanıcı kendi klasörüne yükleyebilir
CREATE POLICY "product-docs: owner upload" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'product-docs'
        AND split_part(name, '/', 1) = auth.uid()::text
    );

-- Sahip veya admin güncelleme/silme yapabilir
CREATE POLICY "product-docs: owner or admin modify" ON storage.objects
    FOR ALL TO authenticated
    USING (
        bucket_id = 'product-docs'
        AND (
            split_part(name, '/', 1) = auth.uid()::text
            OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
        )
    )
    WITH CHECK (
        bucket_id = 'product-docs'
        AND (
            split_part(name, '/', 1) = auth.uid()::text
            OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
        )
    );

-- Rolü varsayılana geri çekiyoruz
RESET ROLE;
