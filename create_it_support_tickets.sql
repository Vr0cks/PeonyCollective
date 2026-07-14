-- IT Support Tickets (Destek Talepleri) Tablosu
CREATE TABLE IF NOT EXISTS public.it_support_tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    message TEXT NOT NULL,
    reply TEXT,
    telegram_message_id TEXT,
    status TEXT CHECK (status IN ('open', 'replied', 'closed')) DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    replied_at TIMESTAMP WITH TIME ZONE
);

-- RLS Etkinleştir
ALTER TABLE public.it_support_tickets ENABLE ROW LEVEL SECURITY;

-- Politikalar:
-- 1. Her oturum açmış kullanıcı kendi taleplerini ekleyebilir (Insert)
CREATE POLICY "Users can insert their own tickets"
  ON public.it_support_tickets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 2. Her kullanıcı sadece kendi taleplerini görebilir (Select)
CREATE POLICY "Users can view their own tickets"
  ON public.it_support_tickets FOR SELECT
  USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 3. Sadece adminler tüm talepleri güncelleyebilir (Update)
CREATE POLICY "Admins can update tickets"
  ON public.it_support_tickets FOR UPDATE
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Realtime'a ekle (Canlı mesajlaşma güncellemeleri için)
ALTER PUBLICATION supabase_realtime ADD TABLE public.it_support_tickets;
