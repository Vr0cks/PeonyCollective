-- Peony Collective - Offers (Teklifler) Tablosu ve Şema Güncellemeleri
-- Bu script Supabase SQL Editöründe çalıştırılabilir veya local migrasyonlara eklenebilir.

-- 1. Products Tablosuna locked_by sütununu ekle (Rezerve edilen alıcıyı takip etmek için)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS locked_by UUID REFERENCES public.profiles(id);

-- 2. Offers Tablosunu Oluştur
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    buyer_id UUID REFERENCES public.profiles(id) NOT NULL,
    product_id UUID REFERENCES public.products(id) NOT NULL,
    offered_price NUMERIC NOT NULL,
    status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')) DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Realtime yayınına offers tablosunu ekle
ALTER PUBLICATION supabase_realtime ADD TABLE public.offers;

-- 3. RLS (Row Level Security) Etkinleştirme
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Teklifleri sadece teklif sahibi alıcı, ürünün satıcısı veya admin görebilir.
CREATE POLICY "Offers are viewable by buyer, seller, or admin"
ON public.offers FOR SELECT
USING (
    auth.uid() = buyer_id 
    OR auth.uid() = (SELECT seller_id FROM public.products WHERE id = product_id)
    OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Alıcılar kendi adlarına teklif oluşturabilir
CREATE POLICY "Buyers can insert their own offers"
ON public.offers FOR INSERT
WITH CHECK (auth.uid() = buyer_id);

-- Satıcılar veya alıcılar teklifi güncelleyebilir (durum güncellemesi)
CREATE POLICY "Buyers and sellers can update offers"
ON public.offers FOR UPDATE
USING (
    auth.uid() = buyer_id 
    OR auth.uid() = (SELECT seller_id FROM public.products WHERE id = product_id)
    OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
