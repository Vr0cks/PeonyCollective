-- Peony Collective - Veritabanı Şeması (Supabase PostgreSQL)
-- Bu dosya referans amaçlıdır, Supabase SQL Editörüne yapıştırılarak çalıştırılabilir.

-- 1. Profiles (Kullanıcılar) Tablosu
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    role TEXT CHECK (role IN ('buyer', 'seller', 'admin')) DEFAULT 'buyer',
    phone_number TEXT,
    iban TEXT,
    address TEXT,
    submerchant_type TEXT CHECK (submerchant_type IN ('bireysel', 'kurumsal')),
    tckn TEXT,
    vkn TEXT,
    company_title TEXT,
    submerchant_id TEXT,
    rating NUMERIC(3,2),
    sales_count INTEGER DEFAULT 0,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Brands (Markalar) Tablosu
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Models (Modeller) Tablosu
CREATE TABLE IF NOT EXISTS public.models (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (brand_id, name)
);

-- 2. Products (Ürünler) Tablosu
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    seller_id UUID REFERENCES public.profiles(id) NOT NULL,
    gender TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    size TEXT,
    brand TEXT NOT NULL,
    model_name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    condition TEXT NOT NULL,
    material TEXT,
    dimensions TEXT,
    purchase_year INTEGER,
    serial_number TEXT,
    public_images TEXT[] NOT NULL,
    authenticity_docs TEXT[] NOT NULL,
    flaw_images TEXT[] DEFAULT '{}',
    video_url TEXT,
    odor_score INTEGER,
    has_spa_treatment BOOLEAN DEFAULT false,
    full_set_items TEXT[] DEFAULT '{}',
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'sold')) DEFAULT 'pending',
    locked_until TIMESTAMP WITH TIME ZONE,
    locked_by UUID REFERENCES public.profiles(id),
    is_peony_vip BOOLEAN DEFAULT false,
    entrupy_status TEXT CHECK (entrupy_status IN ('pending', 'analyzing', 'verified', 'rejected')),
    entrupy_certificate_url TEXT,
    supplier TEXT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Orders (Siparişler / Escrow) Tablosu
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    buyer_id UUID REFERENCES public.profiles(id) NOT NULL,
    product_id UUID REFERENCES public.products(id) NOT NULL,
    seller_id UUID REFERENCES public.profiles(id) NOT NULL,
    total_price NUMERIC NOT NULL,
    order_status TEXT CHECK (order_status IN ('pending_payment', 'paid', 'shipped_to_lab', 'inspecting', 'lab_approved', 'shipped_to_buyer', 'delivered', 'completed', 'cancelled', 'refunded')) DEFAULT 'pending_payment',
    shipping_tracking_seller TEXT,
    shipping_tracking_buyer TEXT,
    payment_id TEXT,
    commission_amount NUMERIC,
    seller_amount NUMERIC,
    buyer_name TEXT,
    buyer_email TEXT,
    buyer_phone TEXT,
    shipping_address TEXT,
    is_gift BOOLEAN DEFAULT false,
    gift_note TEXT,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Concierge Requests (VIP Teklifleri) Tablosu
CREATE TABLE IF NOT EXISTS public.concierge_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    product_interest TEXT NOT NULL,
    max_price NUMERIC NOT NULL,
    status TEXT CHECK (status IN ('pending', 'contacted', 'closed')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Product Drafts (Satış Taslakları) Tablosu
CREATE TABLE IF NOT EXISTS public.product_drafts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    seller_id UUID REFERENCES public.profiles(id) NOT NULL UNIQUE,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Offers (Teklifler) Tablosu
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    buyer_id UUID REFERENCES public.profiles(id) NOT NULL,
    product_id UUID REFERENCES public.products(id) NOT NULL,
    offered_price NUMERIC NOT NULL,
    status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Conversations (Mesajlaşma Odaları) Tablosu
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    participant_1 UUID REFERENCES public.profiles(id) NOT NULL,
    participant_2 UUID REFERENCES public.profiles(id) NOT NULL,
    product_id UUID REFERENCES public.products(id),
    last_message TEXT,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Messages (Mesajlar) Tablosu
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES public.profiles(id) NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Notifications (Bildirimler) Tablosu
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Realtime için yayınları etkinleştir
ALTER PUBLICATION supabase_realtime ADD TABLE public.concierge_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- 6. System Logs Tablosu
CREATE TABLE IF NOT EXISTS public.system_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    level TEXT CHECK (level IN ('info', 'warn', 'error')) DEFAULT 'info',
    source TEXT NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
