-- Concierge Requests tablosuna user_id sütunu ekleme ve RLS politikalarını güncelleme
ALTER TABLE public.concierge_requests 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.profiles(id);

-- RLS politikalarını sıfırla ve yeniden düzenle
DROP POLICY IF EXISTS "Only admins can view concierge requests" ON public.concierge_requests;
DROP POLICY IF EXISTS "Anyone can insert a concierge request" ON public.concierge_requests;

-- 1. Herkes teklif ekleyebilir (Insert)
CREATE POLICY "Anyone can insert a concierge request"
  ON public.concierge_requests FOR INSERT
  WITH CHECK (true);

-- 2. Kullanıcılar kendi tekliflerini, adminler ise tüm teklifleri görebilir (Select)
CREATE POLICY "Users and admins can view concierge requests"
  ON public.concierge_requests FOR SELECT
  USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
