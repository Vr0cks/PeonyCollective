-- 1. Brands Table
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Models Table
CREATE TABLE IF NOT EXISTS public.models (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (brand_id, name)
);

-- Enable RLS
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

-- Select policies (Allow read for everyone)
CREATE POLICY "Allow public read access to brands" ON public.brands
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to models" ON public.models
    FOR SELECT USING (true);

-- Insert/Update/Delete policies (Only admin can modify)
CREATE POLICY "Allow admin write access to brands" ON public.brands
    FOR ALL USING (
        (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
    );

CREATE POLICY "Allow admin write access to models" ON public.models
    FOR ALL USING (
        (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
    );

-- Seed Brands and Models
DO $$
DECLARE
    brand_id_hermes UUID;
    brand_id_chanel UUID;
    brand_id_lv UUID;
    brand_id_dior UUID;
    brand_id_gucci UUID;
    brand_id_prada UUID;
    brand_id_bottega UUID;
    brand_id_celine UUID;
    brand_id_ysl UUID;
    brand_id_balenciaga UUID;
    brand_id_fendi UUID;
    brand_id_loewe UUID;
    brand_id_burberry UUID;
    brand_id_valentino UUID;
    brand_id_miumiu UUID;
BEGIN
    -- Hermès
    INSERT INTO public.brands (name) VALUES ('Hermès') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_hermes;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_hermes, 'Birkin 25'), (brand_id_hermes, 'Birkin 30'), (brand_id_hermes, 'Birkin 35'),
        (brand_id_hermes, 'Kelly 25'), (brand_id_hermes, 'Kelly 28'), (brand_id_hermes, 'Kelly 32'),
        (brand_id_hermes, 'Constance'), (brand_id_hermes, 'Lindy'), (brand_id_hermes, 'Picotin'),
        (brand_id_hermes, 'Garden Party'), (brand_id_hermes, 'Evelyne'), (brand_id_hermes, 'Bolide'),
        (brand_id_hermes, 'Halzan') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Chanel
    INSERT INTO public.brands (name) VALUES ('Chanel') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_chanel;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_chanel, 'Classic Flap Small'), (brand_id_chanel, 'Classic Flap Medium'), (brand_id_chanel, 'Classic Flap Jumbo'),
        (brand_id_chanel, 'Boy Bag'), (brand_id_chanel, '2.55 Reissue'), (brand_id_chanel, 'Gabrielle'),
        (brand_id_chanel, 'Deauville'), (brand_id_chanel, 'Grand Shopping Tote'), (brand_id_chanel, 'WOC (Wallet on Chain)'),
        (brand_id_chanel, '19 Bag'), (brand_id_chanel, 'Coco Handle') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Louis Vuitton
    INSERT INTO public.brands (name) VALUES ('Louis Vuitton') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_lv;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_lv, 'Neverfull MM'), (brand_id_lv, 'Neverfull GM'), (brand_id_lv, 'Speedy 25'),
        (brand_id_lv, 'Speedy 30'), (brand_id_lv, 'Alma BB'), (brand_id_lv, 'Alma PM'),
        (brand_id_lv, 'Pochette Métis'), (brand_id_lv, 'Capucines'), (brand_id_lv, 'Twist'),
        (brand_id_lv, 'Dauphine'), (brand_id_lv, 'OnTheGo'), (brand_id_lv, 'Multi Pochette'),
        (brand_id_lv, 'Keepall') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Dior
    INSERT INTO public.brands (name) VALUES ('Dior') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_dior;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_dior, 'Lady Dior Mini'), (brand_id_dior, 'Lady Dior Medium'), (brand_id_dior, 'Lady Dior Large'),
        (brand_id_dior, 'Saddle Bag'), (brand_id_dior, 'Book Tote Small'), (brand_id_dior, 'Book Tote Medium'),
        (brand_id_dior, 'Bobby Bag'), (brand_id_dior, '30 Montaigne'), (brand_id_dior, 'Dior Caro'),
        (brand_id_dior, 'Diorama') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Gucci
    INSERT INTO public.brands (name) VALUES ('Gucci') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_gucci;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_gucci, 'Dionysus'), (brand_id_gucci, 'Marmont Small'), (brand_id_gucci, 'Marmont Medium'),
        (brand_id_gucci, 'Jackie 1961'), (brand_id_gucci, 'Bamboo'), (brand_id_gucci, 'Horsebit 1955'),
        (brand_id_gucci, 'GG Supreme Tote'), (brand_id_gucci, 'Ophidia'), (brand_id_gucci, 'Blondie') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Prada
    INSERT INTO public.brands (name) VALUES ('Prada') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_prada;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_prada, 'Re-Edition 2005'), (brand_id_prada, 'Re-Edition 2000'), (brand_id_prada, 'Galleria'),
        (brand_id_prada, 'Cleo'), (brand_id_prada, 'Cahier'), (brand_id_prada, 'Saffiano Tote'),
        (brand_id_prada, 'Nylon Backpack') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Bottega Veneta
    INSERT INTO public.brands (name) VALUES ('Bottega Veneta') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_bottega;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_bottega, 'Cassette'), (brand_id_bottega, 'Jodie'), (brand_id_bottega, 'Pouch'),
        (brand_id_bottega, 'Arco'), (brand_id_bottega, 'Padded Cassette'), (brand_id_bottega, 'Point'),
        (brand_id_bottega, 'Teen Jodie'), (brand_id_bottega, 'Andiamo') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Celine
    INSERT INTO public.brands (name) VALUES ('Celine') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_celine;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_celine, 'Luggage Nano'), (brand_id_celine, 'Luggage Micro'), (brand_id_celine, 'Belt Bag'),
        (brand_id_celine, 'Classic Box'), (brand_id_celine, 'Sangle'), (brand_id_celine, 'Triomphe'),
        (brand_id_celine, 'Ava'), (brand_id_celine, '16 Bag') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Saint Laurent
    INSERT INTO public.brands (name) VALUES ('Saint Laurent') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_ysl;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_ysl, 'Sac de Jour'), (brand_id_ysl, 'Loulou'), (brand_id_ysl, 'Kate'),
        (brand_id_ysl, 'Sunset'), (brand_id_ysl, 'College'), (brand_id_ysl, 'Niki'),
        (brand_id_ysl, 'Le 5 à 7'), (brand_id_ysl, 'Solferino') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Balenciaga
    INSERT INTO public.brands (name) VALUES ('Balenciaga') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_balenciaga;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_balenciaga, 'City'), (brand_id_balenciaga, 'Le Cagole'), (brand_id_balenciaga, 'Hourglass'),
        (brand_id_balenciaga, 'Neo Classic'), (brand_id_balenciaga, 'Everyday Tote'), (brand_id_balenciaga, 'Track'),
        (brand_id_balenciaga, 'Triple S') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Fendi
    INSERT INTO public.brands (name) VALUES ('Fendi') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_fendi;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_fendi, 'Baguette'), (brand_id_fendi, 'Peekaboo'), (brand_id_fendi, 'Kan I'),
        (brand_id_fendi, 'Mon Trésor'), (brand_id_fendi, 'First'), (brand_id_fendi, 'Sunshine Shopper'),
        (brand_id_fendi, 'By The Way') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Loewe
    INSERT INTO public.brands (name) VALUES ('Loewe') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_loewe;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_loewe, 'Puzzle'), (brand_id_loewe, 'Gate'), (brand_id_loewe, 'Hammock'),
        (brand_id_loewe, 'Balloon'), (brand_id_loewe, 'Flamenco'), (brand_id_loewe, 'Basket'),
        (brand_id_loewe, 'Amazona') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Burberry
    INSERT INTO public.brands (name) VALUES ('Burberry') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_burberry;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_burberry, 'TB Bag'), (brand_id_burberry, 'Lola'), (brand_id_burberry, 'Note'),
        (brand_id_burberry, 'Pocket'), (brand_id_burberry, 'Frances'), (brand_id_burberry, 'Knight') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Valentino
    INSERT INTO public.brands (name) VALUES ('Valentino') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_valentino;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_valentino, 'Rockstud'), (brand_id_valentino, 'VSLING'), (brand_id_valentino, 'One Stud'),
        (brand_id_valentino, 'Roman Stud'), (brand_id_valentino, 'Supervee') ON CONFLICT (brand_id, name) DO NOTHING;

    -- Miu Miu
    INSERT INTO public.brands (name) VALUES ('Miu Miu') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO brand_id_miumiu;
    INSERT INTO public.models (brand_id, name) VALUES 
        (brand_id_miumiu, 'Wander'), (brand_id_miumiu, 'Arcadie'), (brand_id_miumiu, 'Matelassé'),
        (brand_id_miumiu, 'Madras') ON CONFLICT (brand_id, name) DO NOTHING;
END $$;


-- 3. Storage Security RLS Policies (For 'product-images' bucket)
-- Make sure the bucket 'product-images' exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage object policies for 'product-images'
-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies on storage.objects for product-images to prevent conflicts
DROP POLICY IF EXISTS "Allow public read access to product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow owners to update or delete their product-images" ON storage.objects;
DROP POLICY IF EXISTS "Secure verification folder in product-images" ON storage.objects;

-- Policy A: Everyone can read public/ and flaws/ folders (and video folder)
CREATE POLICY "Allow public read access to non-sensitive product-images" ON storage.objects
    FOR SELECT TO public
    USING (
        bucket_id = 'product-images' 
        AND (
            storage.foldername(name)[1] = 'public' 
            OR storage.foldername(name)[1] = 'flaws' 
            OR storage.foldername(name)[1] = 'videos'
            OR storage.foldername(name)[2] = 'public'
            OR storage.foldername(name)[2] = 'flaws'
            OR storage.foldername(name)[2] = 'videos'
        )
    );

-- Policy B: Only the owner (the directory name equals their user ID) or an Admin can read/write 'verification' folder
CREATE POLICY "Allow owners and admins to manage verification product-images" ON storage.objects
    FOR ALL TO authenticated
    USING (
        bucket_id = 'product-images'
        AND (
            storage.foldername(name)[2] IN ('public', 'flaws', 'videos')
            OR (
                storage.foldername(name)[2] = 'verification'
                AND (
                    auth.uid()::text = storage.foldername(name)[1]
                    OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
                )
            )
        )
    )
    WITH CHECK (
        bucket_id = 'product-images'
        AND (
            storage.foldername(name)[2] IN ('public', 'flaws', 'videos')
            OR (
                storage.foldername(name)[2] = 'verification'
                AND (
                    auth.uid()::text = storage.foldername(name)[1]
                    OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
                )
            )
        )
    );
