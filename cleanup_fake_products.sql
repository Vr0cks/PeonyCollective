-- Bu kodları kopyalayıp Supabase SQL Editor'da çalıştırarak eski/sahte ürünleri silebilirsiniz.
DELETE FROM products WHERE created_at < CURRENT_DATE;
