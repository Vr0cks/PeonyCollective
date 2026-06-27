-- Peony Collective Row Level Security (RLS) Policies
-- Lütfen bu betiği Supabase SQL Editöründe çalıştırarak veritabanınızı güvene alın.

-- 1. PROFILES Tablosu
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. PRODUCTS Tablosu
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Sadece adminler reddedilen veya bekleyen ürünleri görebilir, diğer herkes SADECE onaylıları veya SADECE KENDİ ürünlerini görebilir.
CREATE POLICY "Approved products are viewable by everyone"
  ON public.products FOR SELECT
  USING (status = 'approved' OR status = 'sold' OR auth.uid() = seller_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Sellers can insert their own products"
  ON public.products FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own pending products"
  ON public.products FOR UPDATE
  USING (auth.uid() = seller_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 3. ORDERS Tablosu
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Siparişleri sadece alıcı, satıcı veya admin görebilir
CREATE POLICY "Orders are viewable by buyer, seller, or admin"
  ON public.orders FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Buyers can insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Users can update their orders or admin"
  ON public.orders FOR UPDATE
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 4. CONCIERGE REQUESTS Tablosu
ALTER TABLE public.concierge_requests ENABLE ROW LEVEL SECURITY;

-- (İsteğe bağlı) Sadece adminler tüm concierge taleplerini görebilir. Normal kullanıcılar kendininkini (eğer auth'luysa). 
-- Biz formda giriş zorunluluğu koymadıysak, herkes insert yapabilsin, ama select edemesin.
CREATE POLICY "Anyone can insert a concierge request"
  ON public.concierge_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view concierge requests"
  ON public.concierge_requests FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 5. PRODUCT DRAFTS Tablosu
ALTER TABLE public.product_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own drafts"
  ON public.product_drafts FOR ALL
  USING (auth.uid() = seller_id);

-- 6. NOTIFICATIONS Tablosu (Varsa)
-- ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view their own notifications"
--   ON public.notifications FOR SELECT USING (auth.uid() = user_id);
