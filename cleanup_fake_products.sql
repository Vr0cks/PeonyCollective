-- Bu kodları kopyalayıp Supabase SQL Editor'da çalıştırarak eski/sahte ürünleri silebilirsiniz.
DELETE FROM products WHERE NOT (public_images::text LIKE '%cdn.shopify.com%');
