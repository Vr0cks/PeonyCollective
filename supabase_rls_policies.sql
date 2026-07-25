-- Peony Collective Row Level Security (RLS) Policies (Tam Düzeltme & Recursion Fix)
-- Bu betiği Supabase SQL Editöründe çalıştırarak veritabanınızı güvene alın ve sonsuz döngüyü (recursion) önleyin.

-- 0. Güvenlik Yardımcı Fonksiyonu (Infinite RLS Recursion Önleyici)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROFILES Tablosu (Güvenlik & PII Koruması)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own full profile or admin can view all" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;

-- Kullanıcılar sadece kendi profilini veya Admin ise tüm profilleri görebilir
CREATE POLICY "Users can view their own full profile or admin can view all"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Güvenli Genel Profil Görünümü (PII Maskeleme - TCKN, IBAN, Adres Gizleme)
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
    id,
    first_name,
    last_name,
    role,
    avatar_url,
    rating,
    sales_count,
    created_at
FROM public.profiles;

GRANT SELECT ON public.public_profiles TO anon, authenticated;

-- 2. PRODUCTS Tablosu (Ürünlerin Ana Ekranda Görünmesi İçin Düzeltme)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Approved products are viewable by everyone" ON public.products;
DROP POLICY IF EXISTS "Sellers can insert their own products" ON public.products;
DROP POLICY IF EXISTS "Sellers can update their own pending products" ON public.products;

-- Onaylı ve satılmış ürünleri ANONİM ve giriş yapmış HERKES sorunsuz görebilir!
CREATE POLICY "Approved products are viewable by everyone"
  ON public.products FOR SELECT
  USING (
    status = 'approved' 
    OR status = 'sold' 
    OR (auth.uid() IS NOT NULL AND auth.uid() = seller_id) 
    OR public.is_admin()
  );

CREATE POLICY "Sellers can insert their own products"
  ON public.products FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own pending products"
  ON public.products FOR UPDATE
  USING (auth.uid() = seller_id OR public.is_admin());

-- 3. ORDERS Tablosu
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Orders are viewable by buyer, seller, or admin" ON public.orders;
DROP POLICY IF EXISTS "Buyers can insert orders" ON public.orders;

CREATE POLICY "Orders are viewable by buyer, seller, or admin"
  ON public.orders FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id OR public.is_admin());

CREATE POLICY "Buyers can insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

-- 4. CONCIERGE REQUESTS Tablosu
ALTER TABLE public.concierge_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert a concierge request" ON public.concierge_requests;
DROP POLICY IF EXISTS "Only admins can view concierge requests" ON public.concierge_requests;

CREATE POLICY "Anyone can insert a concierge request"
  ON public.concierge_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view concierge requests"
  ON public.concierge_requests FOR SELECT
  USING (public.is_admin());

-- 5. PRODUCT DRAFTS Tablosu
ALTER TABLE public.product_drafts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own drafts" ON public.product_drafts;

CREATE POLICY "Users can manage their own drafts"
  ON public.product_drafts FOR ALL
  USING (auth.uid() = seller_id);

-- 6. SYSTEM LOGS Tablosu
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only admins can view system logs" ON public.system_logs;

CREATE POLICY "Only admins can view system logs"
  ON public.system_logs FOR SELECT
  USING (public.is_admin());

-- 7. NOTIFICATIONS Tablosu
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;

CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT 
  USING (auth.uid() = user_id);

-- 8. BRANDS Tablosu
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Brands are viewable by everyone" ON public.brands;
DROP POLICY IF EXISTS "Only admins can manage brands" ON public.brands;

CREATE POLICY "Brands are viewable by everyone"
  ON public.brands FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage brands"
  ON public.brands FOR ALL
  USING (public.is_admin());

-- 9. MODELS Tablosu
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Models are viewable by everyone" ON public.models;
DROP POLICY IF EXISTS "Only admins can manage models" ON public.models;

CREATE POLICY "Models are viewable by everyone"
  ON public.models FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage models"
  ON public.models FOR ALL
  USING (public.is_admin());

-- 10. OFFERS Tablosu
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Offers are viewable by buyer, seller, or admin" ON public.offers;
DROP POLICY IF EXISTS "Buyers can insert offers" ON public.offers;
DROP POLICY IF EXISTS "Sellers or admins can update offers" ON public.offers;

CREATE POLICY "Offers are viewable by buyer, seller, or admin"
  ON public.offers FOR SELECT
  USING (
    auth.uid() = buyer_id OR 
    auth.uid() = (SELECT seller_id FROM public.products WHERE id = product_id) OR
    public.is_admin()
  );

CREATE POLICY "Buyers can insert offers"
  ON public.offers FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Sellers or admins can update offers"
  ON public.offers FOR UPDATE
  USING (
    auth.uid() = (SELECT seller_id FROM public.products WHERE id = product_id) OR
    public.is_admin()
  );

-- 11. CONVERSATIONS Tablosu
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Conversations are viewable by participants or admin" ON public.conversations;
DROP POLICY IF EXISTS "Participants or admins can manage conversations" ON public.conversations;

CREATE POLICY "Conversations are viewable by participants or admin"
  ON public.conversations FOR SELECT
  USING (
    auth.uid() = participant_1 OR 
    auth.uid() = participant_2 OR
    public.is_admin()
  );

CREATE POLICY "Participants or admins can manage conversations"
  ON public.conversations FOR ALL
  USING (
    auth.uid() = participant_1 OR 
    auth.uid() = participant_2 OR
    public.is_admin()
  );

-- 12. MESSAGES Tablosu
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Messages are viewable by conversation participants or admin" ON public.messages;
DROP POLICY IF EXISTS "Participants can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Participants can update messages (read receipt)" ON public.messages;

CREATE POLICY "Messages are viewable by conversation participants or admin"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations 
      WHERE id = conversation_id AND (participant_1 = auth.uid() OR participant_2 = auth.uid())
    ) OR
    public.is_admin()
  );

CREATE POLICY "Participants can insert messages"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.conversations 
      WHERE id = conversation_id AND (participant_1 = auth.uid() OR participant_2 = auth.uid())
    )
  );

CREATE POLICY "Participants can update messages (read receipt)"
  ON public.messages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations 
      WHERE id = conversation_id AND (participant_1 = auth.uid() OR participant_2 = auth.uid())
    )
  );
