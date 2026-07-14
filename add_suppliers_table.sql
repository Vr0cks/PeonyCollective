-- 1. Suppliers Tablosunu Oluştur
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    email TEXT,
    phone TEXT,
    address TEXT,
    iban TEXT NOT NULL,
    tckn TEXT,
    vkn TEXT,
    company_title TEXT,
    submerchant_type TEXT CHECK (submerchant_type IN ('bireysel', 'kurumsal')) DEFAULT 'bireysel',
    submerchant_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Products Tablosuna supplier_id Ekle
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL;

-- 3. Mevcut text tabanlı supplier verilerini yeni tabloya taşı/ilişkilendir
DO $$
DECLARE
    r RECORD;
    new_id UUID;
BEGIN
    FOR r IN SELECT DISTINCT supplier FROM public.products WHERE supplier IS NOT NULL AND supplier <> '' LOOP
        -- Eğer bu isimde tedarikçi yoksa oluştur (Geçici dummy IBAN ile yasal kayda uygun olması için)
        IF NOT EXISTS (SELECT 1 FROM public.suppliers WHERE name = r.supplier) THEN
            INSERT INTO public.suppliers (name, iban, address, submerchant_type)
            VALUES (r.supplier, 'TR000000000000000000000000', 'Geçici Adres', 'bireysel')
            RETURNING id INTO new_id;
        ELSE
            SELECT id INTO new_id FROM public.suppliers WHERE name = r.supplier;
        END IF;

        -- Ürünleri güncelle
        UPDATE public.products SET supplier_id = new_id WHERE supplier = r.supplier;
    END LOOP;
END $$;

-- 4. RLS Politikalarını Etkinleştir
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;

-- 5. RLS Kuralları (Adminler her şeyi yapar, yetkisizler veya satıcılar sadece okuyabilir)
CREATE POLICY "Admins have full access to suppliers" ON public.suppliers
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Authenticated users can read suppliers" ON public.suppliers
    FOR SELECT
    TO authenticated
    USING (true);
