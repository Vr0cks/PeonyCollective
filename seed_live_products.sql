-- Live Shopify Seed Data
-- Fetched at 2026-06-29T11:41:48.027Z


INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Salvatore Ferragamo', 'Salvatore Ferragamo Sneaker - 40.5', '', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferragamo-1_733797ae-43bb-4f7b-87bb-75780f61c7d6.jpg?v=1782460209', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferragamo-2_a9a5c45c-2fb8-4182-a34f-3d4bb0a4bb5a.jpg?v=1782460196', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferragamo-3_9499898a-db0a-4849-8514-f0e761729dd6.jpg?v=1782460209', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferragamo-4.jpg?v=1782460209']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Topuklu Ayakkabı 39.5', '', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi-1_231b583d-4a2d-4377-8ca5-6aae5e0946c7.jpg?v=1781608808', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi-2_412221a9-e288-41c6-a418-e08948729c5f.jpg?v=1781608846', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi-3_ac1f2464-fd89-4224-bdd3-f6e25b36608c.jpg?v=1781608847']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Bottega Veneta', 'Bottega Veneta Andiamo Süet Small', 'Ürün Bilgisi    Materyal: Süet   Boyut: Small  Renk: Yeşil  Editör Notları:  Bottega Veneta Andiamo, markanın ikonik intrecciato örgü işçiliğini modern çizgilerle buluşturan zamansız bir tasarımdır. Süet deri dokusu ve altın tonlu düğüm detayıyla öne çıkan bu model, elde veya omuzda taşınabilen kullanışlı yapısıyla günlük kullanımdan özel davetlere kadar geniş bir kullanım alanı sunar. Haki tonunun doğal ve sofistike görünümü, çantaya dikkat çekici fakat abartısız bir duruş kazandırır.   Orijina', 163000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/andiamo1.png?v=1781523780', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/andiamo2.png?v=1781523572', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/andiamo4.png?v=1781523575', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/andiamo3.png?v=1781523577', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_4094.jpg?v=1781523572']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Casadei', 'Casadei Topuklu Ayakkabı Kırmızı - 39', 'Ürün Bilgisi    Renk: Kırmızı   Numara: 39  Kusur Açıklaması: Sol çiftinin üstünde bir dikiş hatası mevcut.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/casadei-1.jpg?v=1781511977', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/casadei-2.jpg?v=1781511978', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/casadei-3.jpg?v=1781511977', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/casadei-4.jpg?v=1781511977']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Alice And Olivia', 'Alice + Olivia Bluz Mavi - Xs', 'AçıklamaKayık yaka, dantel detaylı Alice + Olivia bluz, zamansız bir şıklık ve farklı bir görünüm sağlar.   Öne Çıkan Özellikler   Tasarım: Dantel detaylı.  Malzeme: Polyester.  Renk: Mavi.  Beden: Xs.   Ölçü: En:42 cm Koldan Boy: 55 cm     Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alice-olivia-bluz-on.jpg?v=1753709871', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alice-olivia-bluz-yan.jpg?v=1753709871']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Hermes', 'Hermes Steve Light Junior Çanta', 'Ürün Bilgisi    Editör Notları:  Hermès Sac Steve Junior, markanın işlevselliği zarafetle buluşturan ikonik evrak ve omuz çantalarından biridir. Yumuşak ve dayanıklı deri yapısı, geniş iç hacmi ve sade tasarımıyla günlük kullanım, iş hayatı ve seyahatlerde konforlu bir kullanım sunar. Ayarlanabilir omuz askısı sayesinde çapraz veya omuzda taşınabilen model, Hermès’in kusursuz deri işçiliğini ve zamansız stil anlayışını yansıtır. Minimal görünümü, kaliteli materyalleri ve fonksiyonel yapısıyla uz', 217000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-4_9f33985c-a7ad-4195-9e25-1ac2576bf277.jpg?v=1780902729', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-5_df82a525-1dc8-4322-ad92-66a745dafc74.jpg?v=1780902729', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-6_bd9aaae1-3369-4c36-920c-f83920680749.jpg?v=1780902729', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes2.jpg?v=1780902729', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-3_711c37e4-b86d-438b-b6df-4eeadfa34d91.jpg?v=1780902729', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-7.jpg?v=1780902729']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Christian Dior', 'Christian Dior Oblique Lock Çanta', 'Ürün Bilgisi    Ölçü: 12 x 8 x 3 cm   Renk: Lacivert  Editör Notları:  Bu Dior çanta, markanın ikonik Oblique jacquard desenini siyah deri detaylarla bir araya getiren kompakt ve zarif bir tasarıma sahiptir. Ön yüzündeki metal kilit detayı modern bir görünüm sunarken, ayarlanabilir askısı sayesinde omuzda veya çapraz kullanılabilir. Günlük kullanım için ideal boyuta sahip olan bu model, telefon, kartlık ve küçük kişisel eşyaları rahatlıkla taşırken kombinlere sofistike bir dokunuş katar. Laciver', 35000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior4_6e01c5d6-c9ee-461d-a1a0-8d6079d799e8.jpg?v=1780900693', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior2_9b1331ab-d6b1-42aa-95a5-89d61f118a9d.jpg?v=1780899867', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior3_b92b1ad1-72fe-4a41-8e27-fa39c4fc7d21.jpg?v=1780899934']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Proenza Schouler', 'Proenza Schouler Clutch', '', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ChatGPTImage3Haz202616_04_42.png?v=1780491892', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ChatGPT_Image_3_Haz_2026_16_07_24.png?v=1780492056', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ChatGPT_Image_3_Haz_2026_16_05_46.png?v=1780491957']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Bvlgari', 'Bvlgari Güneş Gözlüğü', '', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bvlgari-3.jpg?v=1779441036', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bvlgari-2.jpg?v=1779441036', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bvlgari-1.jpg?v=1779441036', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bvlgari-4.jpg?v=1779441037', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bvlgari-5.jpg?v=1779441036']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gucci', 'Gucci Topuklu Ayakkabı - 38', '', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-ayakkabi-1.jpg?v=1779283688', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-ayakkabi-2.jpg?v=1779283688', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-ayakkabi-3.jpg?v=1779283688']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Gucci', 'Gucci Güneş Gözlüğü', '', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gozluk-1.jpg?v=1779283459', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gozluk-4.jpg?v=1779283458', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gozluk-3.jpg?v=1779283458', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gozluk-2.jpg?v=1779283458', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gozluk-5.jpg?v=1779283458']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Gucci', 'Gucci Bluz - S', 'Öne Çıkan Özellikler   Malzeme: %100 Koton.  Renk: Kahverengi.  Beden: S.  Boy:60 cm    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-3_63808d14-4bc8-4a26-aab6-e67361bc0c1b.jpg?v=1779282948', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-1_2ef6a0ce-8b38-4f6f-9712-33a38d017744.jpg?v=1779282960', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-2_5627c82a-1f2a-44d9-9ea5-32fd3c214d32.jpg?v=1779282948']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Isabel Marant', 'Isabel Marant Bluz - 40', 'Öne Çıkan Özellikler   Malzeme: %100 Koton.  Beden: 40.  Boy:70 cm    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/isabel-marant-1.jpg?v=1779281505', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/isabel-marant-2.jpg?v=1779281505']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Carmen Marc Valvo', 'Carmen Marc Valvo Elbise - S', '', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/carmen-1.jpg?v=1779280707', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/carmen-2.jpg?v=1779280707', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/carmen-3.jpg?v=1779280710', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/carmen-4.jpg?v=1779280707']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Burberry', 'Burberry Elbise - 42', '', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-1_61091938-50eb-4b96-84e5-5d18d625e716.jpg?v=1779279717', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-2_4406c453-0b4b-48fd-b3e0-3239dc8fe2e5.jpg?v=1779279717', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-3_aaad9171-7d41-4bfd-928d-e1159168363f.jpg?v=1779279717', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-4_8a9266be-8460-4b0c-9a90-87e8c8b37b26.jpg?v=1779279717']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Escada', 'Escada Etek Lacivert - 42', 'Öne Çıkan Özellikler   Malzeme: %100 Koton.  Renk: Lacivert.  Beden: 42.  Ölçü:Bel:40 cm Boy:68 cm  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-1_3d64959a-8ac5-4266-b94a-f855a74fcd39.jpg?v=1779278679', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-2_484284ba-4a26-4351-bc6b-682e52b10648.jpg?v=1779278679', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-3_c9c8f8b3-41ac-4fc8-b9dc-dfccf4118fa5.jpg?v=1779278679']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Philosophy Di Lorenzo Serafini', 'Philosophy Di Lorenzo Serafini Bluz - M', '', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/philosophy-1.jpg?v=1779277472', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/philosophy-2.jpg?v=1779277472', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/philosophy-3.jpg?v=1779277472', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/philosophy-4.jpg?v=1779277472']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Maje', 'Maje Elbise - 1', 'Ürün Bilgisi    Renk: Siyah   Beden: 1  Ürün İçeriği: Dış Kumaş %100 Polyester - İç Kumaş %100 Viskos - Kurdele %100 Poliamid   Ölçü: Boy 85 cm En 43 cm Editör Notları:  Bu Maje elbise, markanın feminen ve modern Paris stilini yansıtan zarif bir tasarımdır. Hafif transparan görünümlü dokulu kumaşı elbiseye sofistike bir hareket kazandırırken, akışkan yapısı sayesinde vücutta zarif bir duruş sağlar. Hakim yaka detayı ve metal görünümlü düğmeleri klasik bir şıklık sunarken, bel kısmındaki haf', 5750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maje-elbise-1.jpg?v=1778486070', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maje-elbise-2.jpg?v=1778486070', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maje-elbise-3.jpg?v=1778486070', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3415.jpg?v=1778486070']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Escada', 'Escada Krem Çanta', '', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071601_12bd1b80-8de6-4747-adc6-1068c961a2d2.png?v=1778483987', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071601_f924d9df-a636-45ba-9409-73e7fc0051bc.png?v=1778484004', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071601_9eecc7e4-7f39-4c8a-badc-4d8119ea13a8.png?v=1778484025']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Escada', 'Escada Mavi Çanta', '', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071039_1a3fd38d-952f-4075-9abf-e7136d2e0998.png?v=1778483618', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071039_811f4292-6c1c-468a-9d66-6c629ab1d913.png?v=1778483689', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071039_d8a558c6-d031-4cbe-be13-7a9d941d6f94.png?v=1778483662']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Ermenegildo Zegna', 'Ermenegildo Zegna Lacivert Sneaker - 42', '', 14500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212554_aba24248-64f8-43a9-8f42-dd22e1e57562.png?v=1778448796', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212554_3987e945-8367-4b5c-9ec3-50aeecf47d78.png?v=1778448704', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212554_af2bc87d-2bf9-41ea-b38e-a16541438dbd.png?v=1778448773']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Ermenegildo Zegna', 'Ermenegildo Zegna Beyaz Sneaker - 42', '', 11000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212749_911c5ef5-64ca-40e1-82e9-5c8377485974.png?v=1778449025', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212749_09e7b266-346e-45a8-8a7a-acb01c06f3c1.png?v=1778449116', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212749_5d6e7177-85ed-47c8-94a3-7f5aa049e31b.png?v=1778449144', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212749_01a11442-e602-4cb6-955a-f38055769f9d.png?v=1778449175']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Giuseppe Zanotti', 'Giuseppe Zanotti Frankie Crocodile Effect Sneaker - 42', '', 9250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_213808_89bf9565-60e4-4797-9044-701af858b64e.png?v=1778449623', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_213808_0fc671b8-da16-4ec4-aad1-31b23c686f7a.png?v=1778449543', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_213808_5c18c403-197c-44db-a02d-48501ece66ff.png?v=1778449573', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_213808_98367f95-47a3-4309-baf7-8b462061673c.png?v=1778449601']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Valentino', 'Valentino Garavani Renkli Sneaker - 41', '', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215109_88a9aa80-b566-475f-8c93-34e091304dcd.png?v=1778475051', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215109_01b7d13c-5782-438b-b165-2a97bee50731.png?v=1778475080', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215109_c1d24b3c-adfb-45d7-9eec-49ae4534e723.png?v=1778475105', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215109_c108403d-caf4-4e40-88aa-cb7f7d24e35b.png?v=1778475131']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Sneaker Siyah - 41', '', 8500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215457_60171606-0f5f-46ba-aba0-cbda0c59b470.png?v=1778475388', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215457_fcd113a0-e09c-4592-98cb-728051967bd9.png?v=1778475411', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215457_9fdef6a5-3597-44b9-a5bc-5dc69892cda8.png?v=1778475439']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Sneaker Lacivert - 41', '', 11000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215727_32b16e4b-7f3a-4327-9812-e4e3ddb74b94.png?v=1778475629', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215727_a89cb0b0-a031-40c0-a4ff-4a39a6a9a26c.png?v=1778475655', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215727_b65845ef-ae2c-41e9-a3e1-3bcd010b9df3.png?v=1778475681']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Sneaker Lacivert - Gri - Beyaz 41', '', 17000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215915_36251595-9231-47b0-b859-78f227609e6d.png?v=1778475937', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215915_13d7a21e-46f3-4656-a70a-c9ffbc45aec9.png?v=1778475974', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215915_10bacbd4-d78f-4111-a926-7b4351860597.png?v=1778476016', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215915_858b76c1-0ac3-4146-953d-155fc6de9413.png?v=1778476037']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Axel Arigato', 'Axel Arigato Marathon R-Trail Sneaker - 42', '', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_220010_c7b29f0d-cf99-4bf2-9e3a-1bfbb34434c4.png?v=1778476228', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_220010_eb835895-27f1-4666-bc1d-0a7ee42b1c9d.png?v=1778476248', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_220010_ce763a42-e3e4-4c85-8a07-1e5e1ee198fa.png?v=1778476266', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_220010_0184ec59-842b-41a4-ae4f-f2ee5720ce2d.png?v=1778476301']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Chanel', 'Chanel 25 Mini Çanta', 'Ürün Bilgisi    Renk: Siyah   Durum: Sıfır - Full Set - Faturalı  Editör Notları:  Bu model, Chanel’ın son dönemde öne çıkan tasarımlarından biri olan Chanel 25 modelidir. İkonik kapitone deri yapıyı daha modern ve relaxed bir siluetle yorumlayan bu çanta, geniş hacmi ve büzgülü yapısıyla günlük kullanımda yüksek konfor sunar. Kalın gold zincir askı detayları ve CC charm aksesuarı tasarıma güçlü bir karakter kazandırırken, klasik Chanel estetiğini daha çağdaş bir formda yansıtır. Ö', 352000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_061537_64feec75-a398-43c3-87cf-b2bed25f3827.png?v=1778480399', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_061626_fa8a867a-7a2d-4c90-b2cf-c59b0a3a0075.png?v=1778480399', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_061729_21f91756-fbce-486b-aaaa-ffb7aa81d6b8.png?v=1778480399']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Trençkot Mavi - M', '', 16000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-1.jpg?v=1777899648', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-2.jpg?v=1777899648', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-3.jpg?v=1777899648', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-4.jpg?v=1777899648']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Etro', 'ETRO Pantolon - 38', '', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/etro-1.jpg?v=1777898716', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/etro-3.jpg?v=1777898716', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/etro-2.jpg?v=1777898716', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/etro-4.jpg?v=1777898716', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/etro-5.jpg?v=1777898716']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Eşofman Takımı - M', '', 12000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-takim-1.jpg?v=1777888990', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-takim-2.jpg?v=1777888989', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-takim-3.jpg?v=1777888990', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-takim-4.jpg?v=1777888990']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Mavi Sneaker - 38', '', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada1_11cf5c40-281f-486d-b7ad-92d31af06dbc.jpg?v=1777495890', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada2_82cd8c64-0741-4bd4-87fb-2a1358ade992.jpg?v=1777495890', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada3_49d3787a-2f5a-4e19-83d4-fa9fade3ce8c.jpg?v=1777495890']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Dior', 'Christian Dior Topuklu Ayakkabı - 38', '', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior1_f89642da-f65e-4ac1-a8e3-a3dddf826c56.jpg?v=1777494050', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior2_761a166c-8a84-453d-8ee0-f574c98e7e2a.jpg?v=1777494050', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior3_352fae8f-33bc-4c88-a734-a5a8e774b3b1.jpg?v=1777494050']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Dolce & Gabbana', 'Dolce & Gabbana Sneaker - 38.5', '', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/leopar3.jpg?v=1777472907', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/leopar2.jpg?v=1777472907', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/leopar1.jpg?v=1777472907', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/leopar4.jpg?v=1777472907']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Sneaker -38', '', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada2.jpg?v=1777472328', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada3_8d3a40f3-f028-425a-b556-ad4cd8484548.jpg?v=1777472328', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada1_acc7a7c5-447d-4df6-97e1-5ea37423d7f5.jpg?v=1777472328']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Chanel', 'Chanel Loafer - 38', '', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel1_717c17c9-0a42-4660-a2f1-adb261be1ee6.jpg?v=1777471838', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel2_12418604-04e5-44b2-bf17-20a7a7a71fc5.jpg?v=1777471838', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel3_b19e8e53-71a5-4f3d-9d8c-3be65453086d.jpg?v=1777471838']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Peony Collective', 'Burberry Atkı', '', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/WhatsAppImage2026-02-20at15.05.54.jpg?v=1771589230']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Şal 70x260 cm', 'Ürün Özellikleri:  %80 Yün - %20 İpek 70 x 260 cm  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 19000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-krem-1.jpg?v=1776251304', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3171.jpg?v=1776251304']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Hermes', 'Hermès Rodeo Rock Bag Charm', '', 77000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/charm11.jpg?v=1776410131', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/charm.jpg?v=1776410131']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Hermes', 'Hermes Kelly 18 Kemer', '', 87000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kemer1.jpg?v=1776409257', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kemer2.jpg?v=1776409257']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Loro Piana', 'Loro Piana Cüzdan', '', 42000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cuzdan1.jpg?v=1776409759', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cuzdan2.jpg?v=1776409759', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cuzdan3.jpg?v=1776409759']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK ÇOCUK', 'Diğer', 'Diğer', 'Peony Collective', 'Ralph Lauren Erkek Çocuk Gömlek - 4 Yaş', '', 650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gomlek1.jpg?v=1776262436', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3160.jpg?v=1776262436', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gomlek2.jpg?v=1776262436']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Erkek Çocuk T-shirt - 3 Yaş', '', 550, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yesil-rl.jpg?v=1776262035']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK ÇOCUK', 'Diğer', 'Diğer', 'Dolce & Gabbana', 'Dolce & Gabbana Erkek Çocuk Eşofman - 2 Yaş', '', 650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dg1_8d3f1b6c-7ca3-4800-a400-2f5d78541722.jpg?v=1776261630', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dg2_a05b5f41-07ba-4dac-946f-a375db5cfb7b.jpg?v=1776261630', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3101.jpg?v=1776261630']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Kıyafet', 'Elbise', 'Laura Ashley', 'Laura Ashley Kız Çocuk Elbise - 5 Yaş', '', 750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/laura1.jpg?v=1776260323', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/laura2.jpg?v=1776260324']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Erkek Çocuk T-shirt - 4 Yaş', '', 550, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rl2_1afb66bc-333c-4b29-b33c-0f406660ad8f.jpg?v=1776255678', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rl2_1.jpg?v=1776255678']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Çocuk Polo Yaka T-shirt - 6 Yaş', '', 550, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/p1_bec2d9b1-b924-4707-b019-c9c3df1dea30.jpg?v=1776253721', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3085.jpg?v=1776253722']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Şal 70x200cm', 'Ürün Özellikleri:  %70 Yün - %30 İpek 70 x 200 cm Ufak lekelenmeler mevcut.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 14000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci1_6465c650-d8bc-4c84-9131-401a2b56afea.jpg?v=1776250899', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3165.jpg?v=1776250900', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3166.jpg?v=1776250900', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3168.jpg?v=1776250900']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Kız Çocuk Etek - 2 Yaş', '', 650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rl-etek-1.jpg?v=1776086985', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3097.jpg?v=1776086985']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Kıyafet', 'Elbise', 'Burberry', 'Burberry Kız Çocuk Elbise Pembe - 6', 'Öne Çıkan Özellikler:   Tasarım: Çiçek desenli.   Malzeme: Koton .   Renk: Pembe.   Beden: 6Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pembe-burberry1.jpg?v=1776086650', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pembe-burberry2.jpg?v=1776086650']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Kıyafet', 'Elbise', 'Ralph Lauren', 'Ralph Lauren Mavi - Beyaz Kız Çocuk Elbise - 7 Yaş', '', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mavi1_5b395ce3-e112-4ccb-9a79-cb6f8ab1b3bd.jpg?v=1776086260', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3109_20ad394a-bccc-4c3b-89d8-bc4dccbd20cc.jpg?v=1776086260']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK ÇOCUK', 'Diğer', 'Diğer', 'Hugo Boss', 'Hugo Boss Erkek Çocuk Eşofman - 10 Yaş', '', 950, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hugo-esofman-1.jpg?v=1776085084', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3117.jpg?v=1776085096']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Chloe', 'Chloe Kız Çocuk Pantolon - 10 Yaş', '', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ch-pant-1.jpg?v=1776084637', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3115.jpg?v=1776084638']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Gucci', 'Gucci Kız Çocuk Pantolon - 9 Yaş', '', 1500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/p1.jpg?v=1776083073', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/p2.jpg?v=1776083073', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/p3.jpg?v=1776083073', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3105.jpg?v=1776083073']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Gucci', 'Gucci Çocuk Denim Şort - 8 Yaş', '', 1100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-beyaz-1.jpg?v=1776082104', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3154.jpg?v=1776082105', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3155.jpg?v=1776082105']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Erkek Çocuk T-shirt - 5 Yaş', '', 650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/laci5.jpg?v=1776080966', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3143.jpg?v=1776080966']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Erkek Çocuk Gömlek - 2 Yaş', '', 860, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rl1.jpg?v=1776073520', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rl2.jpg?v=1776073520']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Dolce & Gabbana', 'Dolce&Gabbana Kız Çocuk Gömlek 7-8 Yaş Puantiyeli', '', 1500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce1_d95e7bc7-d5f6-46a0-a161-5a15e6e74377.jpg?v=1776071864', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3130.jpg?v=1776071865']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Marc Jacobs', 'The Marc Jacobs Kız Çocuk Etek - 8 Yaş', '', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/etek.jpg?v=1775475700']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Louis Vuitton', 'Louis Vuitton Şal 145x145cm Yeşil', 'Ürün Bilgisi    Renk: Yeşil  Ölçü: 145x145cm  Editör Notları:  Louis Vuitton’un zamansız çizgisini yansıtan bu eşarp, markanın ikonik Monogram deseninin ton sür ton yorumuyla tasarlanmış modern ve sofistike bir modeldir. Yumuşak ve hafif dokusu sayesinde akıcı bir duruş sunarken, ince püskül detaylı kenarları ürüne zarif bir hareket kazandırır. Yeşil tonları, klasik monogramın daha sade ve rafine bir versiyonunu sunarak hem günlük hem şık kombinlerde kolayca kullanılabilen, zamansız bir tamamlay', 16000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-yesil-2.jpg?v=1775221238']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Louis Vuitton', 'Louis Vuitton Eşarp 145x145cm Siyah', 'Ürün Bilgisi    Renk: Siyah  Ölçü: 145x145cm  Editör Notları:  Louis Vuitton’un zamansız çizgisini yansıtan bu eşarp, markanın ikonik Monogram deseninin ton sür ton yorumuyla tasarlanmış modern ve sofistike bir modeldir. Yumuşak ve hafif dokusu sayesinde akıcı bir duruş sunarken, ince püskül detaylı kenarları ürüne zarif bir hareket kazandırır. Koyu gri/siyah tonları, klasik monogramın daha sade ve rafine bir versiyonunu sunarak hem günlük hem şık kombinlerde kolayca kullanılabilen, zamansız bir', 16000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-siyah-1.jpg?v=1775208937', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-siyah-2.jpg?v=1775208937']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Hermes', 'Hermes Eşarp 90x90 Turuncu', 'Ürün Bilgisi    Renk: Turuncu  Ölçü: 90x90   Editör Notları:  Hermès’in ikonik desen anlayışını yansıtan bu eşarp, markanın klasik “Les Bijoux de…” (takı temalı) çizgisine yakın bir tasarıma sahiptir; zincir üzerine dizilmiş farklı mücevher ve obje illüstrasyonlarıyla zengin, koleksiyonluk bir görünüm sunar. Canlı turuncu zemin, Hermès’in imza enerjisini taşırken altın ve pastel tonlardaki detaylar sofistike bir kontrast yaratır. İpek twill dokusu sayesinde akıcı ve parlak bir duruş sunan bu mod', 23000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-3.jpg?v=1775204406', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-4.jpg?v=1775204407']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Hermes', 'Hermes Eşarp 90x90 Renkli', 'Ürün Bilgisi    Renk: Renkli  Ölçü: 90x90   Editör Notları:  Hermès’in sanatla modayı buluşturan ikonik eşarp koleksiyonuna ait bu model, detaylı ve canlı botanik bahçe temalı illüstrasyonu ile öne çıkar. İpek twill dokusu sayesinde akıcı ve zarif bir duruş sunarken, çok renkli desen yapısı her kombinle kolayca uyum sağlayabilecek güçlü bir stil vurgusu yaratır. Kenarındaki ince kontrast bordür detayı ve yüksek işçilik kalitesiyle, hem klasik hem modern kullanım için zamansız ve koleksiyonluk bi', 23000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-1.jpg?v=1775204355', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-2.jpg?v=1775204355', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2970.jpg?v=1775204355']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Hermes', 'Hermes Eşarp 90x90 Mavi', 'Ürün Bilgisi    Renk: Mavi  Ölçü: 90x90   Kusur: Etiketi mevcut değil.  Editör Notları:  Hermès’in sanatsal çizgisini yansıtan bu eşarp, zarif tüy ve doğa temalı illüstrasyonu ile dikkat çeker. Açık mavi zemin üzerine turkuaz, pastel tonlar ve detaylı desen geçişleri, modele ferah ve sofistike bir görünüm kazandırır. İpek twill dokusu sayesinde akıcı ve yumuşak bir kullanım sunarken, elde dikilmiş kenar detayları Hermès’in yüksek işçiliğini ortaya koyar. Hem klasik hem modern kombinlere kolayca', 18000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-5.jpg?v=1775204707', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-6.jpg?v=1775204708']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Chanel', 'Chanel Wallet on Chain Siyah', 'Ürün Bilgisi    Renk: Siyah   Editör Notları:    Chanel Wallet on Chain (WOC), modern lüks aksesuar tarihinin en ikonik parçalarından biri.     1955''te Coco Chanel''in devrimci 2.55 çantasından ilham alan WOC, ilk kez 1980''lerde Karl Lagerfeld döneminde hayata geçti. "Cüzdan mı, çanta mı?" sorusunu ortadan kaldıran bu hibrit konsept, minimalizm ile işlevselliği tek bir formda birleştirdi.     Klasik Chanel quilting''i — matelassé dikiş deseni — ve ikonik altın ya da gümüş zincir askısı, tasarımın', 136000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260330_135821_618c3b77-2800-4622-919a-0fdf93c837db.png?v=1774879626', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260330_140130_e2c81331-d9a8-4cc6-9a77-1051d155a6d6.png?v=1774879626', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260330_140356_eb355c27-69bd-494f-b212-ac831790b300.png?v=1774879626']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Bottega Veneta', 'Bottega Veneta Terlik - 38', 'Ürün Bilgisi    Renk: Siyah  Numara: 38   Editör Notları:  Bottega Veneta’nın modern ve iddialı tasarım dilini yansıtan bu terlik modeli, markanın ikonik yumuşak, dolgun intreccio (örgü) detaylı bant tasarımıyla öne çıkar. Siyah deri yapısı ve geniş, hacimli üst bandı hem konfor hem de güçlü bir stil sunarken, minimal formu sayesinde sade ama dikkat çekici bir görünüm yaratır. Günlük kullanımdan şehir stiline kadar rahatlıkla uyum sağlayan bu model, Bottega’nın çağdaş lüks anlayışını yansıtan za', 37600, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-2.jpg?v=1774869453', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-1.jpg?v=1774869453']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Loafer - 39', 'Ürün Bilgisi    Renk: Kahverengi  Numara: 39   Editör Notları:  Louis Vuitton’un ikonik tasarım kodlarını taşıyan bu loafer modeli, markanın klasik Monogram kanvas yüzeyi ile öne çıkar. Üst kısmındaki deri püskül (tassel) detayı ve altın tonlu metal uçlar modele sofistike bir hareket katarken, slip-on formu sayesinde hem konforlu hem de zahmetsiz bir şıklık sunar. Zamansız siluetiyle günlük kombinlerden daha şık görünümlere kadar geniş bir kullanım alanına sahip olan bu model, güçlü marka kimliğ', 43000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv1_e1df5e7f-a170-4638-924c-f7110bc742ac.jpg?v=1774867824', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv3_588391b3-9525-4b1b-ac7e-b0061d6ee454.jpg?v=1774867824', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv4_6c29bc24-3d02-4969-b2af-76c1ce67bc0c.jpg?v=1774867824', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv2_8fe71512-14b5-428b-8952-615bdd1d48bc.jpg?v=1774867824', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv5_243dc157-ffd9-48e9-a246-b27d166fc7aa.jpg?v=1774867824']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Salvatore Ferragamo', 'Salvatore Ferragamo Loafer - 43.5', 'Ürün Bilgisi    Renk: Siyah  Numara: 43.5/44   Editör Notları:  Salvatore Ferragamo’nun zamansız klasiklerinden biri olan bu loafer modeli, markanın ikonik Gancini toka detayıyla öne çıkar. Yumuşak deri yapısı ve sade silueti sayesinde hem konforlu hem de şık bir kullanım sunarken, üst kısmındaki metal aksesuar modele sofistike bir karakter kazandırır. Günlük kombinlerden daha klasik görünümlere kadar geniş bir kullanım alanı sunan bu model, Ferragamo’nun zarif ve modern İtalyan stilini yansıtan', 43000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferragamo-1.jpg?v=1774859532', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferragamo-2.jpg?v=1774859532', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferragamo-3.jpg?v=1774859532']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Givenchy', 'Givenchy Bot - 38', 'Ürün Bilgisi    Renk: Siyah  Numara: 38  Editör Notları:   Givenchy’nin güçlü ve modern tasarım dilini yansıtan bu bot modeli, siyah deri yapısı ve bilek kısmındaki dikkat çekici 4G metal logo detayı ile öne çıkar. Minimal ve keskin hatlara sahip silueti, önden sade bir görünüm sunarken altın tonlu logo ile sofistike bir kontrast yaratır. Fermuarlı yapısı kullanım kolaylığı sağlarken, hem şehir stiline hem de daha iddialı kombinlere rahatlıkla uyum sağlayan, karakterli ve zamansız bir parçadır.', 40000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/givenchy-1_ccdb531b-1237-473a-a22e-2cec20a223e5.jpg?v=1774864206', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/givenchy-2.jpg?v=1774864206']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Loafer - 43', 'Ürün Bilgisi    Renk: Siyah - Gri  Numara: 43   Editör Notları:  Louis Vuitton’un zamansız tasarım anlayışını yansıtan bu loafer modeli, markanın ikonik Damier Graphite kanvas deseni ile siyah deri detayları bir araya getirir. Üst kısmındaki metal LV logo tokası modele sofistike bir imza katarken, klasik loafer silueti sayesinde hem günlük hem de daha şık kombinlerde rahatlıkla kullanılabilir. Konforlu yapısı ve güçlü duruşuyla, modern ve rafine bir stil arayanlar için öne çıkan, uzun ömürlü bir', 57500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv1_f700423f-bc01-43af-98f1-cc28c28de63d.jpg?v=1774861703', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv2_93e9337a-f63a-400d-9725-3b43c70dba65.jpg?v=1774861703', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv3_676d8a12-dabd-4f6d-81cb-e2fb0072abb0.jpg?v=1774861703', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-4.jpg?v=1774861703']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Loafer - 38', 'Ürün Bilgisi    Renk: Camel  Numara: 38   Editör Notları:  Gucci’nin klasik loafer çizgisini modern bir dokunuşla yorumlayan bu model, pürüzsüz kahverengi deri yapısı ve ön kısmındaki kabartma GG logo detayı ile markanın ikonik kimliğini sade ama güçlü bir şekilde yansıtır. Yuvarlak burun formu ve yumuşak yapısı sayesinde gün boyu konfor sunarken, hem casual hem daha şık kombinlere kolayca uyum sağlar. Zamansız tasarımıyla gardıropta uzun yıllar kullanılabilecek, rafine ve karakter sahibi bir pa', 36000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/camel-1.jpg?v=1774860797', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/camel-2.jpg?v=1774860797', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/camel-3.jpg?v=1774860796']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Jordaan Loafer - 42', 'Ürün Bilgisi    Renk: Siyah  Numara: 42   Editör Notları:  Gucci’nin ikonik modellerinden biri olan Jordaan loafer, markanın klasik çizgisini modern bir zarafetle birleştirir. Yumuşak deri yapısı ve ince, zarif formu sayesinde ayağa daha oturan ve şık bir siluet sunarken, üst kısmındaki altın tonlu Horsebit (at tokası) detayı modele karakteristik Gucci imzasını kazandırır. Hem günlük hem de daha klasik kombinlerde rahatlıkla kullanılabilen bu model, zamansız tasarımıyla uzun yıllar gardırobun va', 29000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-1.jpg?v=1774859951', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-2.jpg?v=1774859951', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-3.jpg?v=1774859951']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Salvatore Ferragamo', 'Salvatore Ferragamo Loafer - 37.5', 'Ürün Bilgisi    Renk: Siyah  Numara: 37.5   Editör Notları:  Salvatore Ferragamo’nun zamansız klasiklerinden biri olan bu loafer modeli, markanın ikonik Gancini toka detayıyla öne çıkar. Yumuşak deri yapısı ve sade silueti sayesinde hem konforlu hem de şık bir kullanım sunarken, üst kısmındaki metal aksesuar modele sofistike bir karakter kazandırır. Günlük kombinlerden daha klasik görünümlere kadar geniş bir kullanım alanı sunan bu model, Ferragamo’nun zarif ve modern İtalyan stilini yansıtan gü', 27000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/salvatore-1.jpg?v=1774858777', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/salvatore-2.jpg?v=1774858777', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/salvatore-3.jpg?v=1774858777', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/salvatore-4.jpg?v=1774858777']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Prada', 'Prada Re-Edition Çanta', 'Ürün Bilgisi    Renk: Siyah  Aksesuar: Full Set   Editör Notları:  Prada’nın ikonik arşiv modellerinden ilham alan bu çanta, Re-Edition 2000 serisinin modern ve dikkat çekici yorumlarından biridir. Kompakt hobo formu, tek saplı yapısı ve minimal siluetiyle 2000’ler estetiğini yansıtırken; üzerini tamamen kaplayan taşlı/ışıltılı yüzeyi modele güçlü bir gece şıklığı katıyor. Ön yüzündeki üçgen Prada logosu ve yanındaki “Re-Edition 2000” etiketiyle markanın imza detaylarını taşıyan bu model, hem el', 86000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/re-edition-1.jpg?v=1774854766', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/re-edition-2.jpg?v=1774854765', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/re-edition-3.jpg?v=1774854766', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/re-edition-4.jpg?v=1774854766']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Yves Saint Laurent', 'Yves Saint Laurent Envelope Çanta', 'Ürün Bilgisi    Renk: Gri   Editör Notları:  Saint Laurent’in ikonik ve zamansız tasarımlarından biri olan bu model, Envelope (Monogram) zincir askılı çanta olarak bilinir. Chevron ve kapitone dikiş detaylarının birleşimiyle sofistike bir doku sunarken, ön kapağındaki metal YSL logosu modele güçlü bir imza kazandırır. Zincir askısı sayesinde omuzda ya da çapraz kullanım imkânı sunan bu tasarım, hem günlük hem de akşam kombinlerinde rahatlıkla kullanılabilecek şık ve fonksiyonel bir parçadır.   O', 78000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl1_ecb5a55e-1a08-49f5-97c6-174d3899b997.jpg?v=1774618465', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl2_4179e28d-81c3-46b1-9cc0-9b6c3fa41b3a.jpg?v=1774618465', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl3_3829da0d-6080-4d3a-beb2-f75dd105f696.jpg?v=1774618465', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2671_1.jpg?v=1774618706']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Bottega Veneta', 'Bottega Veneta Andiamo Yeşil Small Çanta', 'Ürün Bilgisi    Renk: Yeşil   Editör Notları:  Bottega Veneta’nın ikonik intrecciato (örgü deri) işçiliğini modern bir dokunuşla yorumlayan Andiamo modeli, yumuşak formu ve zarif siluetiyle öne çıkar. Ön yüzünde yer alan gold tonlu düğüm detayı, modele karakteristik bir imza kazandırırken; üst sap ve ayarlanabilir askı sayesinde elde ya da omuzda kullanım imkânı sunar. Geniş iç hacmiyle hem şık hem fonksiyonel olan bu model, sofistike yeşil tonu sayesinde sade ama dikkat çekici bir stil yaratır.', 160000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yesil-andiamo-1.jpg?v=1774617524', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yesil-andiamo-2.jpg?v=1774617523', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yesil-andiamo-3.jpg?v=1774617523']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Bottega Veneta', 'Bottega Veneta Bang Bang', 'Ürün Bilgisi    Renk: Yeşil   Editör Notları:  Bottega Veneta’nın modern ve fonksiyonel çizgisini yansıtan Bang Bang modeli, markanın imzası haline gelen intrecciato (örgü deri) tekniğiyle hazırlanmış kompakt ve yapılandırılmış bir çantadır. Üstten fermuarlı tasarımı ve kutu formu sayesinde günlük kullanımda pratiklik sunarken, kısa sapı ve uzun askı detayı ile elde ya da omuzda taşınabilir. Bu modeldeki yumuşak deri dokusu ve doğal yeşil tonu, sade ama dikkat çekici bir stil yaratır.   Orijinal', 78000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bang-bang-1.jpg?v=1774616331', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bang-bang-2.jpg?v=1774616331', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bang-bang-3.jpg?v=1774616331']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Hermes', 'Hermes Herbag Zip31 Çanta Vizon', 'Ürün Bilgisi    Renk: Vizon   Aksesuar: Full Set  Editör Notları:  Bu model, Hermès’in ikonik ve fonksiyonel tasarım anlayışını yansıtan Herbag çantadır. Tuval (canvas) gövde ile deri kapak ve sap detaylarının birleşimiyle hafif ama dayanıklı bir kullanım sunar. Üst kapakta yer alan klasik “Clou de Selle” kilit detayı modele karakteristik bir görünüm kazandırırken, geniş iç hacmi günlük kullanım için oldukça pratiktir. Nötr kahverengi tonlardaki gövde ve sıcak deri detayları sayesinde zamansız v', 195000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/vizon-herbag-1_9eb0c135-067b-4bc7-b7e0-fb00212a2200.jpg?v=1774615639', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/vizon-herbag-2_c326cb43-f76d-4e5f-be92-8e5b344ab1c0.jpg?v=1774615639', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/vizon-herbag-3_0319ae6f-a1f7-47a3-b92c-c9477ba9a939.jpg?v=1774615639']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Hermes', 'Hermes Evelyne 29 Çanta', 'Ürün Bilgisi    Renk: Gri   Editör Notları:  Bu Hermès Evelyne çanta, markanın en ikonik ve fonksiyonel modellerinden biridir. Yumuşak dokulu deri yüzeyi ve ön kısmındaki delikli “H” logosu, çantaya sade ama karakteristik bir görünüm kazandırır. Geniş, ayarlanabilir kanvas askısı sayesinde çapraz kullanım için oldukça konforlu olan bu model, günlük kullanımda pratikliğiyle öne çıkar. Hafif yapısı ve zamansız tasarımıyla Hermès’in sportif şıklığını yansıtan Evelyne, şehir hayatı için ideal ve uzu', 185000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/evelyne-1.jpg?v=1774614280', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/evelyne2.jpg?v=1774614281', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2660.jpg?v=1774614281']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Bottega Veneta', 'Bottega Veneta Andiamo Medium Black Çanta', 'Ürün Bilgisi    Renk: Siyah   Editör Notları:          Bu Bottega Veneta Andiamo çanta, markanın imza intrecciato (örgü deri) tekniğini modern ve zarif bir siluetle buluşturan ikonik modellerinden biridir. Yumuşak dokulu siyah deri yüzeyi, ön kısmındaki altın tonlu düğüm formundaki metal kilit detayıyla güçlü ve sofistike bir karakter kazanır. Üst sapı ve ayarlanabilir uzun askısıyla hem elde hem omuzda kullanım imkânı sunan bu model, geniş iç hacmi sayesinde günlük kullanım için oldukça işlevse', 169000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/andiamo-siyah-on.jpg?v=1774610531', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/andiamo-siyah-yan.jpg?v=1774610531', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/andiamo-siyah-arka.jpg?v=1774610531']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Hermes', 'Hermes Herbag Zip31 Çanta', 'Ürün Bilgisi    Renk: Krem  Aksesuar: Full Set   Editör Notları:  Bu Hermès Herbag, markanın klasik tasarım kodlarını daha casual ve fonksiyonel bir yorumla sunan ikonik bir modeldir. Kanvas gövde ile deri üst kapak ve sap detaylarının birleşimi, çantaya hem hafiflik hem de zarif bir kontrast kazandırır. Kelly modelinden ilham alan kilit sistemi ve değiştirilebilir gövde yapısıyla öne çıkan Herbag, günlük kullanım için pratiklik sunarken Hermès’in zamansız ve rafine stilini modern bir şekilde ya', 205000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/krem-herbag1.jpg?v=1774601787', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/krem-herbag2.jpg?v=1774601787', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/krem-herbag3.jpg?v=1774601787', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2616.jpg?v=1774601788', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2625_2.jpg?v=1774601853']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alberta Ferretti', 'Alberta Ferretti Çizme 36', 'Ürün Bilgisi    Renk: Kahverengi   Numara: 36  Editör Notları:  Bu Alberta Ferretti çizme, sofistike ve güçlü bir siluete sahip zamansız bir modeldir. Kahverengi krokodil baskılı deri yüzeyi, zarif sivri burun formu ve ince yüksek topuk detayıyla feminen ve iddialı bir duruş sunar. Boyu ve yan fermuar kapaması sayesinde hem şık hem pratik kullanım sağlayan bu tasarım, elbise ve etek kombinlerinden dar paça pantolonlara kadar birçok stil ile uyum sağlayarak kış sezonunda elegan bir görünüm yaratı', 6950, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/nku1.jpg?v=1772193807']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Peony Collective', 'Valentino Clutch Pembe', 'Ürün Bilgisi    Renk: Pembe   Editör Notları:  Bu Valentino Garavani clutch, markanın zarif çizgisini yansıtan VLogo Signature serisine ait minimal ve şık bir modeldir. Pembe tonlu dokulu deri gövdesi, ön yüzeyde yer alan altın renkli VLogo metal detayıyla sofistike bir görünüm sunar. Üstten fermuarlı tasarımı ve bilek askısı sayesinde hem elde hem pratik şekilde taşınabilen bu kompakt model, davetlerden günlük şık kombinlere kadar her stile zarif ve feminen bir dokunuş katar.   Orijinallik ve K', 16000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/clutch1_689957fb-1c0a-4095-9593-91d20ebfb0a6.jpg?v=1771504309', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/clutch2.jpg?v=1771504310', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/clutch3.jpg?v=1771504310']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Valentino', 'Valentino Garavani Çanta', 'Ürün Bilgisi    Renk: Beyaz   Kondisyon: Ön kapağında aşınma mevcuttur.  Editör Notları:  Bu Valentino Garavani çanta, markanın ikonik VLogo Signature serisine ait modern ve zarif bir modeldir. Pürüzsüz beyaz deri gövdesi, ön yüzeyi tamamen vurgulayan büyük boy altın tonlu VLogo metal detayıyla güçlü ve sofistike bir görünüm sunar. Kapaklı flap tasarımı ve kompakt formu sayesinde hem şık davetlerde hem günlük kombinlerde rahatlıkla kullanılabilen bu model, minimal çizgilerle Valentino’nun karakt', 45000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-beyaz-1.jpg?v=1771500274', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-beyaz-2.jpg?v=1771500273', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-beyaz-3.jpg?v=1771500273']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Alexander Wang', 'Alexander Wang Marquess Medium Hobo Çanta', 'Ürün Bilgisi    Renk: Yeşil  Kumaş İçeriği: Saten  Editör Notları:  Bu Alexander Wang çanta, markanın modern ve statement tasarım anlayışını yansıtan dikkat çekici bir modeldir. Parlak saten görünümlü canlı yeşil yüzeyi ve metalik logo harflerinden oluşan kalın askı detayı, çantaya güçlü ve ikonik bir karakter kazandırır. Yumuşak, kompakt formu ve fermuarlı üst yapısı sayesinde hem şık hem fonksiyonel bir kullanım sunan bu model, gece kombinlerinden şehir stiline kadar modern ve cesur görünümler', 16000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/wang1_b8991d2d-e612-424e-a348-50503773a21c.jpg?v=1771498520', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/wang2_e09ea620-f7aa-452b-84da-27509dceaa28.jpg?v=1771498520', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/wang-3.jpg?v=1771498521', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/wang-4.jpg?v=1771498520']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Balmain', 'Balmain Çanta', 'Ürün Bilgisi    Renk: Kahverengi   Editör Notları:  Bu Balmain Paris çanta, markanın modern ve şehirli estetiğini yansıtan minimal ama güçlü karakterli bir tasarıma sahip. Doğal tonlu kanvas gövdesi, kontrast taba deri çerçeve ve askı detaylarıyla tamamlanarak hem dayanıklılık hem de şık bir görünüm sunuyor. Ön yüzündeki ikonik BALMAIN PARIS logo baskısı tasarıma net bir kimlik kazandırırken, üst fermuarlı yapısı pratik kullanım sağlıyor. İnce ve kompakt formu sayesinde günlük kullanım, seyahat', 40000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmian1.jpg?v=1771495547', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain2_ac28dd73-0a50-4e23-bdd9-6a5de0cf3138.jpg?v=1771495547', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ballmain3.jpg?v=1771495547', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain4.jpg?v=1771495547']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Valentino', 'Valentino Grainy Mini Vlogo Hobo Çanta', 'Ürün Bilgisi    Renk: Silver   Editör Notları:  Valentino Garavani omuz çantası, markanın modern ve minimal estetiğini zarif detaylarla buluşturan şık bir modeldir. Yumuşak dokulu beyaz deri yüzeyi ve ön kısmındaki ikonik V logo detayıyla sofistike bir görünüm sunarken, yarım ay formundaki kompakt silüeti günlük kullanım için hem hafif hem pratik bir yapı sağlar. Zincir ve deri karışımlı askısı tasarıma modern bir dokunuş katarken, şehir şıklığını tamamlayan zamansız ve rafine bir Valentino parç', 38000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-garavani-1.jpg?v=1771494845', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-garavani-2.jpg?v=1771494845', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-garavani-3.jpg?v=1771494846']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Louis Vuitton', 'Louis Vuitton Vivacite GM Monogram Çanta', '', 46000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv5.jpg?v=1771844481', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv2_79d0c646-6528-47ba-b740-3fa477a97d81.jpg?v=1771844492', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv3_7f8e9f10-190b-42ce-b360-a3bb21437e66.jpg?v=1771844492', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv1_cab1108f-2512-4ca2-bb79-028608422ac0.jpg?v=1771844492', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv4_d036f4d0-0cef-4d3e-b7a3-2edf85b65903.jpg?v=1771844480']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Hermes', 'Hermes Kelly Çanta', '', 674999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2345.png?v=1771282726', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2363.jpg?v=1771282726', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2364.jpg?v=1771282727', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2365.jpg?v=1771282726']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Peony Collective', 'Bottega Veneta Andiamo Bordo', '', 160000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/WhatsAppImage2026-02-15at12.07.00.jpg?v=1771146917']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'BCBG Max Azria', 'BCBG Max Azria Bluz - Etek Takım M', 'Ürün Bilgisi    Renk: Pembe - Beyaz  Beden: M  Kumaş İçeriği: %81 Koton   Editör Notları:  BCBG Max Azria etek–bluz takımı, markanın feminen silüetleri modern dokularla buluşturan imza tasarım anlayışını yansıtan şık bir settir. Triko dokulu kumaşı ve zarif jakar desenleriyle öne çıkan model, v-yaka kesimi ve bel hattında yer alan peplum formu sayesinde vücuda dengeli ve zarif bir yapı kazandırır. Uyumlu A-form eteğiyle birlikte hem şehir şıklığında hem de özel davetlerde rahatlıkla kullanılabil', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bcbg1.jpg?v=1770903867', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bcbg2.jpg?v=1770903868', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bcbg3.jpg?v=1770903867']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Kravat Kahve- Beyaz', 'Ürün Bilgisi    Renk: Kahve - Beyaz  Materyal: %100 İpek  Editör Notları:  Bu Gucci kravat, markanın ikonik GG monogram desenini modern ve zarif bir yorumla sunan klasik bir tasarımdır. Kahverengi zemin üzerine düzenli şekilde yerleştirilen mikro GG motifleri, modele sofistike bir derinlik kazandırırken ipek dokusu sayesinde yumuşak, hafif parlak ve akıcı bir duruş sağlar. Zamansız çizgisiyle hem iş stiline hem de özel davet kombinlerine kolayca uyum sağlayan, Gucci’nin imza estetiğini yansıtan', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/GUCCI-SON1.jpg?v=1770890568', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-son2.jpg?v=1770890568', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-son3.jpg?v=1770890568']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Kravat Gri', 'Ürün Bilgisi    Renk: Gri  Materyal: %100 İpek  Editör Notları:  Bu Gucci kravat, markanın zamansız ve rafine stil anlayışını yansıtan klasik bir tasarıma sahiptir. Antrasit gri zemin üzerine işlenmiş mikro geometrik motifler, modele sade ama sofistike bir hareket kazandırırken %100 ipek dokusu sayesinde hafif parlak ve akıcı bir duruş sunar. Minimal desen yapısı, hem iş kombinlerinde hem de resmi davetlerde kolayca uyum sağlayan, modern ve şık bir Gucci aksesuarı olarak öne çıkar.   Orijinallik', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-gri1.jpg?v=1770890231', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-grii2.jpg?v=1770890230', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-gri3.jpg?v=1770890230']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Christian Dior', 'Christian Dior Kravat Kahverengi - Krem - Mavi', 'Ürün Bilgisi    Renk: Kahverengi - Krem - Mavi   Materyal: %100 İpek  Editör Notları:  Bu Dior kravat, markanın klasik İtalyan terzilik anlayışını yansıtan zarif ve zamansız bir tasarıma sahiptir. Kahverengi zemin üzerine işlenen mikro geometrik desenler ve ince mavi vurgular, modele derinlik kazandırarak sade takım elbiselerle kolayca uyum sağlayan sofistike bir görünüm sunar. %100 ipek dokusu sayesinde hafif parlak ve akıcı bir duruşa sahip olan bu model, hem iş stilinde hem de özel davetlerde', 3299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-mavili-1.jpg?v=1770888511', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-mavili-3.jpg?v=1770888511', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-mavili-2.jpg?v=1770888511']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Karavat Siyah - Turuncu', 'Ürün Bilgisi    Renk: Siyah - Turuncu  Materyal: %100 İpek  Editör Notları:  Bu Gucci kravat, markanın köklü binicilik mirasından ilham alan ikonik horsebit (at gemi) motifleriyle tasarlanmış karakterli ve zamansız bir aksesuardır. Siyah zemin üzerine altın tonlarında tekrarlayan desen, klasik Gucci kodlarını güçlü bir şekilde yansıtırken %100 ipek dokusu sayesinde parlak, akıcı ve sofistike bir duruş sunar. Hem iş stilinde hem de özel davet kombinlerinde sade bir takım elbiseye hareket ve prest', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-turuncu-1.jpg?v=1770887396', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-turuncu-2.jpg?v=1770887396', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-turuncu-3.jpg?v=1770887396']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Versace', 'Versace Kravat', 'Ürün Bilgisi    Renk: Siyah - Altın  Materyal: %100 İpek  Editör Notları:  Bu Versace Classique kravat, markanın ikonik barok estetiğini modern bir geometrik düzenle buluşturan güçlü ve karakterli bir tasarıma sahiptir. Siyah zemin üzerine yerleştirilen altın tonlu Medusa ve barok motifler, dama formundaki kompozisyonla birleşerek Versace’nin gösterişli ama rafine stil kodlarını yansıtır. %100 ipek yapısı sayesinde akıcı ve parlak bir yüzeye sahip olan model, özellikle klasik takım elbiselerle v', 3799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/versace-kravat-1.jpg?v=1770886484', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/versace-kravat-2.jpg?v=1770886483', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/versace-kravat-3.jpg?v=1770886483', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/versace-kravat-4.jpg?v=1770886484']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Hermes', 'Hermes Eşarp 90x90 Sarı', 'Ürün Bilgisi    Renk: Sarı  Ölçü: 90x90   Kondisyon: Son fotoğrafta sol üstte görünen ufak lekesi vardır.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 14000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-sari-1.jpg?v=1770210853', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-sari-2.jpg?v=1770210853', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-sari-3.jpg?v=1770210854', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/77C9B2D8-6FC2-485E-A004-FA6925FE68DD.jpg?v=1770884679']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Hermes', 'Hermes Eşarp Bordo 90x90', 'Ürün Bilgisi    Renk: Bordo  Ölçü: 90x90 %65 Kaşmir - %35 İpek  Kondisyon: Minik deliği mevcuttur.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 14999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-bordo-2.jpg?v=1770210731', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-bordo-4.jpg?v=1770210731', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-bordo-3.jpg?v=1770210731', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/0008A201-D208-4519-8137-430F3405C90A.jpg?v=1770884562']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Moncler', 'Moncler Yelek 2', 'Ürün Bilgisi    Renk: Siyah  Beden: 2   Editör Notları:  Moncler imzasını taşıyan bu siyah şişme yelek, markanın ikonik parlak laqué (lake görünümlü) nylon dokusuyla tasarlanmış zamansız bir modeldir. Yüksek yakalı, önden fermuarlı ve yatay kapitone dikişli formu sayesinde hem ısı yalıtımı sağlar hem de sportif-şık bir siluet sunar. Göğüs kısmındaki klasik Moncler patch logosu modele güçlü bir marka vurgusu katar. Hafif ama sıcak tutan yapısıyla geçiş mevsimlerinde sweatshirt veya trikolar üzeri', 18299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/moncler2_ab2c021f-e9df-4fe6-aa38-e7211b2cf877.jpg?v=1770880278']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Kenzo', 'Kenzo Sweatshirt S', 'Ürün Bilgisi    Renk: Siyah  Beden: S   Editör Notları:  Kenzo imzasını taşıyan bu hoodie model, markanın sanatsal ve grafik odaklı tasarım anlayışını yansıtan dikkat çekici bir parçadır. Siyah zemin üzerine yerleştirilen soyut ve akışkan desenler; mor, lila, mavi ve bej tonlarının uyumuyla dinamik bir görünüm sunar. Kapüşonlu, oversize kesimli ve ön kısmı kanguru cepli olan bu sweatshirt, rahat kalıbı sayesinde günlük kullanım için idealdir. Spor-şık kombinlerde, denim ya da jogger pantolonlarl', 5299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo1.jpg?v=1770878586', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo2.jpg?v=1770878587', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo3.jpg?v=1770878587', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2453.jpg?v=1770878587']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Theory', 'Theory Pantolon Bej - 34', 'Açıklama   Theory pantolon, zamansız bir şıklık sağlar.     Öne Çıkan Özellikler     Malzeme: Koton.   Renk: Bej.   Beden: 34.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 2250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/theory1.jpg?v=1770800399', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/theory2.jpg?v=1770800399', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/theory3.jpg?v=1770800399']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alberta Ferretti', 'Alberta Ferretti T-shirt 36', 'Öne Çıkan Özellikler   Malzeme: %100 Koton.  Renk: Beyaz.  Beden: 36.  Boy:55 cm En: 45 cm  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alberta1.jpg?v=1770798882', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alberta2.jpg?v=1770798882', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alberta3.jpg?v=1770798882']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Brunello Cucinelli', 'Brunello Cucinelli Gömlek Vizon - S', 'Açıklama Uzun kollu, çizgili Brunello Cucinelli gömlek, zamansız bir şıklık sunar.     Öne Çıkan Özellikler     Tasarım: Çizgili.   Malzeme: Koton.   Renk: Vizon.   Beden: S.      Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3305, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/brunello3.jpg?v=1770798379', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bronello2.jpg?v=1770798379', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bronello-arka.jpg?v=1770798379']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Loafer 40', 'Ürün Bilgisi    Renk: Siyah  Beden: 40   Editör Notları:  Louis Vuitton imzasını taşıyan bu loafer modeli, markanın ikonik detaylarını zamansız bir silüetle birleştirir. Siyah deri yüzey üzerindeki kabartmalı Monogram deseni, tasarıma sofistike bir derinlik katarken; üst kısımdaki bağcık detayı ve altın tonlu metal uçlar modern bir dokunuş sunar. Mokasen formundaki yumuşak yapısı ve elde dikim burun hattı sayesinde hem konforlu hem de şık bir kullanım sağlar. Günlük şehir stilinden smart-casual', 18999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv1_78683186-2afc-40d4-b31c-66c45e00ecbd.jpg?v=1770796086', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv2_597303bb-f729-49fa-8e40-786d04216051.jpg?v=1770796086']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Isabel Marant', 'İsabel Marant Çizme 40', 'Ürün Bilgisi    Renk: Siyah  Beden: 40   Editör Notları:  Isabel Marant imzasını taşıyan bu çizme, markanın bohem ve etnik dokunuşlarını modern bir silüetle buluşturan dikkat çekici bir modeldir. Siyah süet deri yapısı, yan kısımlardaki püskül detayları ve ön bölümdeki renkli etnik nakış işlemeleriyle western esintili güçlü bir duruş sunar. Sivri burun formu ve heykelsi, hafif konik topuğu sayesinde hem feminen hem iddialı bir görünüm sağlar. Günlük kombinlerde jean ve oversize trikolarla boho b', 15299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marant1.jpg?v=1770795442', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marant2.jpg?v=1770795442', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marant3.jpg?v=1770795442', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marant4.jpg?v=1770795442']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Longchamp', 'Longchamp Büyük Boy Bavul', '', 9990, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lc1.jpg?v=1770790386', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tods-kucuk2_d55f61b9-5747-416e-8b21-609bf0843546.jpg?v=1770790386', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lc2.jpg?v=1770790386']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Longchamp', 'Longchamp Küçük Boy Bavul', '', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tods-kucuk-1.jpg?v=1770790144', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tods-kucuk2.jpg?v=1770790144', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tods-kucuk-3.jpg?v=1770790144']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Dior', 'Christian Dior Topuklu Ayakkabı - 38.5', 'Ürün Bilgisi    Renk:  Nude   Beden:  38.5   Editör Notları:  Bu Dior ayakkabı, markanın ikonik vernik rugan platform peep-toe stilettoları arasında yer alıyor. Nude/bej tonundaki parlak deri yüzeyi, ön açık burun detayı ve arkadaki zarif CD metal logosu ile klasik Dior feminenliğini yansıtıyor. Yüksek ince topuğu sayesinde bacağı uzun gösteren bu model; davetler, akşam kombinleri ve şık özel günler için ideal, aynı zamanda Dior’un zamansız couture çizgisini günlük lükse taşıyan güçlü bir parça.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior2_956fdfa2-70c8-4da7-a1de-3220ac645b14.jpg?v=1770369908', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior1_0258171d-799f-473e-afc0-eeb82a3d5dce.jpg?v=1770369908', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior3_03498aa1-ee3c-48db-bd1b-592f15e7f371.jpg?v=1770369908', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior4_df123cab-371a-4903-b17c-06e0ad4cc79b.jpg?v=1770369908']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Prada', 'Prada Elbise 3', 'Ürün Bilgisi    Renk:  Siyah - Kırmızı   Beden:  3   Editör Notları:  Bu Prada elbise, markanın modern ve mimari çizgisini yansıtan kontrast biye detaylı A-kesim midi modellerinden biri olarak öne çıkıyor. Siyah zemin üzerine kırmızı şerit geçişleriyle vurgulanan dikiş hatları, beli nazikçe toparlayarak feminen bir siluet yaratırken, kol formu ve diz altına uzanan boyu sayesinde hem gündüz şıklığında hem de akşam davetlerinde rahatlıkla kullanılabiliyor. Minimal ama güçlü tasarımıyla Prada’nın s', 13000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pradaelbise1.jpg?v=1770367942', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pradaelbise2.jpg?v=1770367942', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pradaelbise3.jpg?v=1770367942']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Missoni', 'Missoni Bluz 3', 'Ürün Bilgisi    Renk:  Renkli   Beden:  3   Editör Notları:  Bu Missoni bluz, markanın ikonik örgü estetiğini yansıtan V yaka, rahat kesim ince triko tunik modelidir. Melanj bordo tonları üzerine etek ucunda yer alan gri-yeşil şerit detayıyla hareket kazanan tasarım, bileklerde bağcık detaylarıyla modern ve bohem bir hava sunuyor. Hafif ve akışkan yapısı sayesinde hem jeanlerle günlük şıklıkta hem de kumaş pantolonlarla daha sofistike kombinlerde rahatlıkla kullanılabilecek karakterli bir Misson', 11000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni1.jpg?v=1770368589', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni2.jpg?v=1770368589', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni3.jpg?v=1770368589', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2414.jpg?v=1770368589']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Chanel', 'Chanel Deauville Çanta', 'Ürün Bilgisi    Renk: Lacivert  Kumaş İçeriği: Canvas   Editör Notları:  Bu Chanel çanta, markanın ikonik Deauville Tote modelidir. Dayanıklı dokuma kumaş yapısı, ön yüzündeki büyük CHANEL – Rue Cambon yazı detayı ve deri–zincir karışımı omuz askılarıyla hem sportif hem şık bir karakter sunar. Geniş iç hacmi sayesinde günlük kullanım, seyahat veya şehir hayatı için son derece pratik olan Deauville, Chanel’in rahat lüks anlayışını yansıtan modern ve zamansız bir modeldir.   Orijinallik ve Kalite', 125000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel1_096b0587-5e61-4a2d-be6d-033617a9a2bf.jpg?v=1770756004', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel2_7c2680c3-9a1c-4569-ac83-e80971c6857f.jpg?v=1770756004', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel3.jpg?v=1770756004', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel4.jpg?v=1770756004', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/WhatsApp_Image_2026-02-10_at_15.29.22.jpg?v=1770756018']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Louis Vuitton', 'Louis Vuitton Annie Çanta', 'Ürün Bilgisi    Renk: Beyaz   Editör Notları:  Bu Louis Vuitton çanta, markanın Multicolor Monogram koleksiyonuna ait ikonik Annie modelidir. Beyaz zemin üzerindeki renkli monogram deseni, ön bölümde yer alan deri fiyonk ve altın tonlu kilit detayı ile feminen ve dikkat çekici bir görünüm sunar. Deri–zincir karışımı omuz askıları sayesinde hem elde hem omuzda taşınabilen bu model, günlük şıklık ve özel kombinler için koleksiyon değeri taşıyan zamansız bir Louis Vuitton klasiğidir.   Orijinallik', 60000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-1.jpg?v=1770755073']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Hermes', 'Hermes Evelyne Çanta Bej', 'Ürün Bilgisi    Renk: Bej   Editör Notları:  Bu Hermès çanta, markanın en ikonik ve günlük kullanıma en uygun modellerinden biri olan Evelyne ''dir. Ön yüzündeki delikli büyük H logosu ve yumuşak grain deri (Clemence/Epsom ailesi) dokusu ile sportif-lüks bir duruş sunar. Ayarlanabilir ve çıkarılabilir uzun askısı sayesinde çapraz askılı kullanılabilen bu model, kompakt boyutuna rağmen günlük temel ihtiyaçlar için idealdir ve sade tasarımıyla zamansız bir Hermès klasiği olarak öne çıkar.   Orijina', 140000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-bej1.jpg?v=1770754567']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Hermes', 'Hermes Evelyne Çanta Mavi', 'Ürün Bilgisi    Renk: Mavi  2025 Haziran Paris''ten alındı. Yeni &amp; Hiç Kullanılmadı.  Editör Notları:  Bu Hermès çanta, markanın en ikonik modellerinden biri olan Evelyne serisine ait. Ön yüzündeki delikli büyük H logosu, sportif-lüks kimliğini net şekilde yansıtırken, yumuşak grain (togo/clemence tipi) deri yapısı günlük kullanımda konfor sunar. Ayarlanabilir uzun askısı sayesinde çapraz askılı kullanılabilen bu model, sade ama güçlü tasarımıyla hem şehir hayatında hem de seyahatlerde zamans', 165000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-mavi.jpg?v=1770754087']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Bottega Veneta', 'Bottega Veneta Andiamo', 'Ürün Bilgisi    Renk:  Vizon   Editör Notları:  Bu Bottega Veneta Andiamo çanta, markanın ikonik Intrecciato örgü tekniğiyle hazırlanmış, elde veya uzun örgü askısıyla omuzda taşınabilen sofistike bir top-handle / crossbody modelidir. Üst kısımdaki altın tonlu düğüm detayı Andiamo’nun imzası niteliğindedir; yumuşak deri yapısı, zamansız taupe tonu ve yapılandırılmış formu sayesinde hem günlük şıklıkta hem de daha özel kombinlerde rahatlıkla kullanılabilen modern bir Bottega klasiği olarak öne çı', 150000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fc71f3e0-7fb4-4a75-aa1b-5f22944b9f66.jpg?v=1770369266']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Moncler', 'Moncler Mont - 3', 'Ürün Bilgisi    Renk:  Lacivert   Beden:  3   Editör Notları:  Bu parça Moncler’in şehir şıklığına odaklanan, blazer formunda tasarlanmış şişme mont modellerinden biridir. Lacivert tonlu, yatay kapitone yapısı sayesinde hem sıcak tutar hem de klasik ceket siluetiyle smart-casual kombinlere rahatça uyum sağlar. Hakim yaka detayı, düğmeli ön kapama ve kapaklı cepleriyle ofis stilinden günlük kullanıma kadar geniş bir alanda tercih edilebilen, Moncler’in teknik konforunu zamansız erkek şıklığıyla b', 32299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/moncler1.jpg?v=1770294667', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/moncler2.jpg?v=1770294667', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/moncler3.jpg?v=1770294667', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/moncler4.jpg?v=1770294667']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Hermes', 'Hermes Double Sangle Eşarp - 90x90', 'Ürün Bilgisi    Kumaş İçeriği:  %100 İpek   Editör Notları:  Bu parça Hermès’in ikonik Double Sangle desenli ipek eşarbıdır. Eyer kayışlarından (sangle) ilham alan grafik kompozisyonu, canlı turuncu-kırmızı tonları ve çok renkli geometrik detaylarıyla Hermès’in klasik binicilik mirasını modern bir yorumla buluşturur. %100 ipek dokusu sayesinde son derece hafif ve akıcıdır; boyunda, saçta ya da çanta aksesuarı olarak rahatlıkla kullanılabilen, zamansız ve koleksiyon değeri yüksek bir Hermès klasi', 17000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/double1.jpg?v=1770293038', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/double2.jpg?v=1770293038', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2368.jpg?v=1770293039', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2372.jpg?v=1770293040']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Burberry', 'Burberry Taba Çanta', 'Ürün Bilgisi    Renk: Taba  Editör Notları:  Bu Çanta Burberry’nin klasik deri tote / shopper stili bir model. Taba tonlu yumuşak dana derisinden üretilmiş, sade hatları ve ön yüzündeki Burberry logosuyla zamansız bir şıklık sunuyor. Geniş iç hacmi sayesinde günlük kullanım, iş hayatı ya da seyahatlerde rahatlıkla tercih edilebilir; elde taşımaya uygun çift sap detayıyla hem fonksiyonel hem de sofistike bir görünüm sağlar. Minimal tasarımı sayesinde dört mevsim kombinlenebilen, zamansız bir Burb', 16500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/taba1.jpg?v=1770282898', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/taba2.jpg?v=1770282898', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2362.jpg?v=1770282898', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/taba3.jpg?v=1770282898']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Louis Vuitton', 'Louis Vuitton Sac Plat Çanta', 'Ürün Bilgisi    Renk: Kahve - Siyah  Model: Louis Vuitton Sac Plat  Editör Notları:  Bu Louis Vuitton çanta, markanın ikonik Damier Ebene deseniyle tasarlanan Sac Plat formunda klasik bir modeldir. Düz ve kare silueti sayesinde oldukça kullanışlı bir iç hacim sunarken, elde taşıma sapları ve ayarlanabilir omuz askısıyla hem el çantası hem crossbody olarak kullanılabilir. Günlük şehir temposu, ofis kullanımı ve seyahatlerde rahatlıkla tercih edilebilen; zamansız, güçlü ve fonksiyonel bir Louis Vu', 47000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-canta-1.jpg?v=1770211843', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-canta-2.jpg?v=1770211843', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-canta-3.jpg?v=1770211843', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-canta-4.jpg?v=1770211843']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Peony Collective', 'Chanel Sneaker - 41', '', 17500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/d28a0a51-db8f-43df-8d4f-d55d0c8b7a4f.jpg?v=1770108341', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/f31310e5-b3ff-4d07-af02-2a5108809e89.jpg?v=1770108284', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/5d3ed9a9-b0f6-406a-bbb4-17867019985b.jpg?v=1770108284', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/12d179a2-cb6b-4314-9623-5b034b51a855.jpg?v=1770108284', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/2662eace-e602-4dd1-9f2a-445fc315d193.jpg?v=1770108284']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Isabel Marant', 'Isabel Marant Gömlek Pembe - 34', 'qÜrün Bilgisi    Renk: Pembe Beden: 34  Ölçü: Boy 65 cm En 43 cm  Materyal: %100 İpek  Editör Notları:  Bu Isabel Marant pembe gömlek, markanın romantik-bohem çizgisini yansıtan ruffle (fırfırlı) yakalı ve hacimli kollu zarif modellerinden biridir. Hafif ve akışkan kumaşı sayesinde gün boyu konfor sunarken, omuz detayları ve boyun kısmındaki fırfır dokunuşu parçaya feminen bir siluet kazandırır. Hem jeanlerle gündüz şıklığında hem kumaş pantolon veya eteklerle daha sofistike kombinlerde rahatlık', 3250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pembe-gomlek1.jpg?v=1769853882', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pembe-gomlek-2.jpg?v=1769853882', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pembe-gomlek3.jpg?v=1769853882']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Yves Saint Laurent', 'Yves Saint Laurent Çanta', 'Ürün Bilgisi    Renk: Siyah   Editör Notları:  Bu Saint Laurent çanta, markanın ikonik Kate Tassel modelinin krokodil kabartmalı deri versiyonudur. Siyah, parlak dokulu derisi; ön kısımda yer alan altın renk YSL monogram logosu ve zarif zincir püskül detayıyla güçlü bir şıklık sunar. Altın zincir askısı sayesinde omuzda veya çapraz taşınabilen bu zamansız model, gece davetlerinden şık akşam kombinlerine kadar sofistike ve iddialı bir tamamlayıcıdır.   Orijinallik ve Kalite Kontrolü Peony Collect', 45000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl1.jpg?v=1768488642', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl2.jpg?v=1768488642', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl3.jpg?v=1768488642', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl5.jpg?v=1768488642']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK', 'Diğer', 'Diğer', 'Columbia', 'Columbia Mont Erkek - L', 'Ürün Bilgisi    Renk: Yeşil  Beden: Large   Editör Notları:  Bu Columbia Sportswear mont, markanın hafif dolgulu packable (katlanabilir) kapüşonlu puffer modellerinden biri olup günlük kullanım ve outdoor aktiviteler için tasarlanmıştır. İnce ama sıcak tutan yapısı sayesinde mevsim geçişlerinde ve serin havalarda ideal bir konfor sunar. Fermuarlı cepler, ayarlanabilir kapüşon ve sportif kesimiyle hem şehir hayatında hem doğa yürüyüşlerinde rahatlıkla tercih edilebilecek fonksiyonel bir parçadır.', 8750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/colombia1.jpg?v=1769802493', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/colombia2.jpg?v=1769802493', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/colombia3.jpg?v=1769802493', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/colombia4.jpg?v=1769802493']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Chanel', 'Chanel Maxi Jumbo Çanta Siyah', 'Ürün Bilgisi    Renk: Siyah   Editör Notları:  Bu çanta Chanel’in ikonik Classic Double Flap Maxi / Jumbo formunda uzun flap tasarımına ait, siyah caviar deri kapitone dokulu bir modeldir. Ön yüzündeki gümüş tonlu CC kilidi ve zincir-deri askısı, Chanel’in zamansız imzasını yansıtır. Geniş iç hacmi sayesinde günlük kullanımda oldukça pratiktir; omuzda veya çapraz taşınabilir. Hem casual kombinlere hem de daha şık stillere kolayca uyum sağlayan, Chanel koleksiyonlarının en güçlü ve yatırım değeri', 185000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/siyahchanel1.jpg?v=1769757834']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Chanel', 'Chanel Wallet On Chain', 'Ürün Bilgisi    Renk: Siyah   Editör Notları:  Bu Chanel Wallet on Chain (WOC), markanın ikonik Classic WOC modelidir. Siyah caviar deri, elmas kapitone dokusu ve altın tonlu CC logosuyla Chanel’in zamansız zarafetini yansıtır. İnce zincir askısı sayesinde hem omuzda hem çapraz kullanılabilen bu kompakt model; kart bölmeleri ve fermuarlı iç yapısıyla günlük essentials’ları rahatça taşımaya uygundur. Gündüzden geceye geçişlerde şıklığını koruyan, Chanel koleksiyonlarının en fonksiyonel ve en çok', 135000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/woc1.jpg?v=1769754592', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/woc2.jpg?v=1769754592', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/woc3.jpg?v=1769754592', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/woc4.jpg?v=1769754592']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Jimmy Choo', 'Jimmy Choo Bot - 36.5', 'Ürün Bilgisi    Renk: Siyah  Beden: 36.5  Kumaş İçeriği: Deri  Editör Notları:  Bu Jimmy Choo bot, markanın feminen dokunuşu güçlü detaylarla buluşturan karakteristik tasarım anlayışını yansıtan, kristal taş süslemeli bilek boy combat-style bir modeldir. Yumuşak siyah deri gövdesi, önde bağcık detayları ve kalın kauçuk tabanıyla hem konforlu hem iddialı bir siluet sunar. Burun kısmındaki taş aplikeler modele sofistike bir ışıltı katarken, günlük kombinlerden şehir şıklığına kadar rahatlıkla kull', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/jimmy1.jpg?v=1769697679', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/jimmy2.jpg?v=1769697679', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/jimmy4.jpg?v=1769697679', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/jimmy3.jpg?v=1769697680']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alexander Wang', 'Alexander Wang Suede Topuklu Bot Lacivert - 37', 'Ürün Bilgisi    Renk: Lacivert  Beden: 37  Kumaş İçeriği: Süet  Editör Notları:  Bu Alexander Wang bot, markanın imzası haline gelen metal detaylı topuğuyla öne çıkan suede Chelsea ankle boot modelidir. Lacivert süet deri gövdesi, yan elastik panelleri ve arkadaki çekme halkasıyla klasik Chelsea formunu modern bir dokunuşla birleştirir. Topuk kısmındaki metal insert detayı modele güçlü ve edgy bir karakter kazandırırken, alçak blok topuk günlük konfor sağlar. Hem jean hem de elbiselerle rahatlık', 7299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/wang4.jpg?v=1769696970', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/wang3.jpg?v=1769696970', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/wang1.jpg?v=1769696970', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/wang2.jpg?v=1769696970']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alexander Mcqueen', 'Alexander Mcqueen Bot - 37', 'Ürün Bilgisi    Renk: Siyah  Beden: 37  Kumaş İçeriği: Deri  Editör Notları:  Bu Alexander McQueen bilek botu, markanın güçlü ve modern siluet anlayışını yansıtan tokalı, kalın topuklu ankle boot modelidir. Yumuşak siyah deri gövdesi, bilek çevresindeki metal toka ve endüstriyel zincir detaylarıyla karakter kazanırken, dengeli blok topuğu sayesinde hem konforlu hem iddialı bir duruş sunar. Günlük şıklıkta jean ve blazer kombinlerinden akşam stiline kadar kolayca uyum sağlayan, güçlü ve sofistike', 6299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mcqueen1.jpg?v=1769696209', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mcqueen2.jpg?v=1769696209', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mcqueen3.jpg?v=1769696209', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mcqueen4.jpg?v=1769696209']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tadashi Shoji', 'Tadashi Shoji Dantel Elbise Bordo - 44', 'Ürün Bilgisi    Renk: Bordo  Beden: US 16 , TR 44   Ölçüler: Boy 160 cm, bel 80 cm Kumaş İçeriği: Eksper Notları :  Eksper Puanları: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır. 10/10   Orijinallik ve Kalite Kontrolü  Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tadashi-shoji-bordo-dantel-elbise-44-5-4aa4.jpg?v=1735930357', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dantel-gece-elbisesi-42-84e.jpg?v=1735930357', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dantel-gece-elbisesi-c34f49.jpg?v=1735930357', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dantel-gece-elbisesi-0b12-4.jpg?v=1735930357', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dantel-gece-elbisesi-3fbb4.jpg?v=1735930357', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dantel-gece-elbisesi-b2f6f3.jpg?v=1735930357', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dantel-gece-elbisesi-0d6-99.jpg?v=1735930357', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dantel-gece-elbisesi-90e-62.jpg?v=1735930357']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Christian Dior', 'Christian Dior Safari North South Tote Çanta', 'Ürün Bilgisi    Renk: Siyah  Ölçü: 21 x 23.5 × 7.5 cm   Editör Notları:  Bu Christian Dior çanta, markanın ikonik Oblique jacquard monogram kumaşıyla tasarlanmış Dior Mini Tote / Vertical Tote stilini yansıtan modern ve kompakt bir modeldir. Siyah deri kulplar ve çerçeve detaylarıyla tamamlanan yapı, üstten elde taşıma veya ayarlanabilir omuz askısıyla çapraz kullanım imkânı sunar. Ön fermuarlı cebi hem fonksiyonel hem sportif bir dokunuş katarken, günlük şehir stilinden seyahat kullanımına kada', 45000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior1_6e872e33-9c25-4170-912a-785c735f08a0.jpg?v=1769678602', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior2_f37cc0af-9691-4df6-bb27-64ab22eed488.jpg?v=1769678602', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior3.jpg?v=1769678603', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior4.jpg?v=1769678602']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Polo Ralph Lauren Erkek Çocuk Mont - 4 Yaş', 'Ürün Bilgisi    Renk: Kahverengi  Beden: 4 Yaş   Editör Notları:  Bu Polo Ralph Lauren mont, markanın klasik quilted barn jacket / diamond quilted jacket tarzını yansıtan zamansız bir modeldir. Kahverengi kapitone dış yüzeyi, kadife (corduroy) yaka detayı ve çıtçıt kapamalı önüyle İngiliz countryside estetiğini sportif şıklıkla buluşturur. Ön cepleri hem fonksiyonel hem dekoratif bir görünüm sunarken, hafif dolgulu yapısı günlük kullanımda konfor sağlar; jean, chino ya da triko kombinleriyle rah', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/polo-kahve-1.jpg?v=1769630721', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/polo-kahve2.jpg?v=1769630721']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Moncler', 'Moncler Yelek - 14 Yaş', 'Ürün Bilgisi    Renk: Lacivert  Beden: 14 Yaş   Editör Notları:  Bu Moncler yelek, markanın ikonik şişme down vest (puffer gilet) modellerinden biridir. Parlak siyah dış yüzeyi, göğüs kısmındaki klasik Moncler arma logosu ve çıtçıt kapamalı önüyle sportif-lüks bir görünüm sunar. Hafif ama yüksek ısı yalıtımı sağlayan kaz tüyü dolgusu sayesinde hem şehir kullanımına hem seyahat ve günlük kombinlere uygundur; sweatshirt, triko ya da ince montların üzerine rahatlıkla katmanlanabilen zamansız bir Mo', 12000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/moncleryelek-1.jpg?v=1769628886', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/moncleryelek2.jpg?v=1769628886', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/moncleryelek3.jpg?v=1769628886']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Emporio Armani', 'Emporio Armani Yelek - M Lacivert', 'Ürün Bilgisi    Renk: Lacivert  Beden: M  Editör Notları:  Bu Emporio Armani EA7 yelek, markanın sportif-şık çizgisini yansıtan kapitone dolgulu fermuarlı puffer yelek modelidir. Hafif yapısı ve bele oturan formu sayesinde hem sıcak tutar hem de silueti toparlar. Dik yaka detayı, ön fermuar kapaması ve göğüsteki EA7 logosu ile modern bir görünüm sunarken; günlük kombinlerden aktif şehir stiline kadar rahatlıkla kullanılabilecek zamansız ve fonksiyonel bir parçadır.   Orijinallik ve Kalite Kontro', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/armani-yelek-1.jpg?v=1769622414', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/armani-yelek2.jpg?v=1769622414', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/armani-yelek-3.jpg?v=1769622414']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Self Portrait', 'Self Portrait Hırka - S', 'Ürün Bilgisi    Renk: Kırmızı  Beden: S  Kumaş İçeriği: %77 Pamuk ve %18 Yün  Made in China  Editör Notları:  Bu Self-Portrait hırka, markanın imzası haline gelen feminen silueti modern bir dokunuşla buluşturan kısa kesim V-yaka örgü cardigan modelidir. Kırmızı-siyah çizgili dokusu, bele oturan yapısı ve dekoratif taş detaylı düğmeleriyle couture hissi verirken; cropped boyu sayesinde yüksek bel pantolonlar, etekler veya elbiselerle çok şık bir denge sağlar. Günlük şık kombinlerden akşam davetle', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hirka1.jpg?v=1769497919', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hirka2.jpg?v=1769497920', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hirka3.jpg?v=1769497919', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hirka4.jpg?v=1769497919', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1803_1.jpg?v=1769497920']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Alice And Olivia', 'Alice + Olivia  Pembe Çanta', 'Ürün Bilgisi    Renk: Pembe   Editör Notları:  Bu Alice + Olivia çanta, markanın cesur ve feminen çizgisini yansıtan yılan derisi dokulu mini zincir askılı bir modeldir. Canlı pembe rengi, kapaklı formu ve siyah metal zincir detayıyla güçlü bir kontrast yaratırken; beraberindeki mini kartlık/cüzdan detayı tasarıma fonksiyonellik katar. Günlük şık kombinlerden gece davetlerine kadar iddialı bir vurgu parçası olarak kullanılabilecek, kompakt ama dikkat çekici bir tasarımdır.   Orijinallik ve Kalit', 6500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-pembe-1.jpg?v=1769157844', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-pembe2.jpg?v=1769157844']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tory Burch', 'Tory Burch Loafer Bordo 37', 'Ürün Bilgisi    Renk: Bordo  Beden: 37   Editör Notları:  Bu Tory Burch loafer, markanın zarif ama günlük kullanıma uygun çizgisini yansıtan slip-on sneaker-loafer formundadır. Kapitone desenli deri yüzeyi, yan kısımda yer alan ikonik Tory Burch logosu ve kontrast açık renk tabanı ile modern bir görünüm sunar. Rahat tabanı sayesinde gün boyu konfor sağlarken, sportif-şık duruşu ile jean, kumaş pantolon ya da midi eteklerle kolayca kombinlenebilen çok yönlü bir modeldir.   Orijinallik ve Kalite K', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-loafer1.jpg?v=1769157684', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-loafer-2.jpg?v=1769157684', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-loafer-3.jpg?v=1769157684']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Giuseppe Zanotti', 'Giuseppe Zanotti Loafer Siyah 37', 'Ürün Bilgisi    Renk: Siyah  Beden: 37  Materyal: Süet   Editör Notları:  Bu Giuseppe Zanotti loafer, markanın imza detaylarını taşıyan iddialı ve sofistike bir tasarıma sahiptir. Siyah süet yüzeyi, tamamı altın tonlu metal perçin ve taş detaylarla süslenerek güçlü ve lüks bir görünüm sunar. Ön kısımda yer alan altın metal burun detayı modele karakteristik bir Zanotti dokunuşu katarken, espadril taban yapısı loafer formuna modern ve stil sahibi bir hava kazandırır. Hem gündüz şık kombinlerde hem', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-siyah-loafer1.jpg?v=1769157492', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-siyah-loafer2.jpg?v=1769157492', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-siyah-loafer3.jpg?v=1769157492']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Giuseppe Zanotti', 'Giuseppe Zanotti Loafer 37', 'Ürün Bilgisi    Renk: Bej  Beden: 37  Materyal: Süet  Editör Notları:  Bu Giuseppe Zanotti loafer, markanın imzası hâline gelen sofistike detaylarıyla öne çıkan metal burunlu slip-on loafer modelidir. Bej tonlu süet deri üst yüzeyi, burundaki altın renk metal kaplama ve üst kısımdaki zarif Giuseppe Zanotti Signature logosu ile modern ve lüks bir görünüm sunar. Düz tabanlı, rahat kalıbı sayesinde hem günlük şık kombinlerde hem de ofis stilinde konforla kullanılabilen bu model, zamansız ve iddialı', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-bej-loafer-1.jpg?v=1769157223', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-bej-loafer-2.jpg?v=1769157223', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-bej-loafer-3.jpg?v=1769157223']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Valentino', 'Valentino Babet 37', 'Ürün Bilgisi    Renk: Siyah  Beden: 37  Malzeme İçeriği: Deri  Editör Notları:  Bu Valentino babet, markanın ikonik Rockstud çizgisini zarif ve günlük kullanıma uygun bir siluetle birleştiren klasik bir modeldir. Sivri burun formu ve pürüzsüz deri yapısı feminen bir duruş sunarken, kenar hattı boyunca yer alan altın tonlu metal zımbalar ve renkli taş detayları modele karakteristik Valentino imzasını kazandırır. Düşük topuklu ve rahat kalıbı sayesinde hem şehir şıklığında hem de gündüz-gece geçiş', 11000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-babet-1.jpg?v=1769157081', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-babet-2.jpg?v=1769157082', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-babet-3.jpg?v=1769157082']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Dolce & Gabbana', 'Dolce & Gabbana Gözlük Bordo', 'Ürün Bilgisi    Renk: Bordo   Editör Notları:  Bu Dolce &amp; Gabbana güneş gözlüğü, markanın feminen ve sofistike çizgisini yansıtan kedi gözü (cat-eye) formuyla öne çıkan zarif bir modeldir. Bordo asetat çerçevesi ve altın tonlu metal sap detaylarıyla klasik ile moderni dengelerken, degrade camları hem şık bir görünüm hem de konforlu güneş koruması sunar. Günlük şehir stilinden yaz davetlerine kadar farklı kombinlerle rahatlıkla kullanılabilecek, zamansız ve iddialı bir Dolce &amp; Gabbana tas', 7500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce-gabbana-gozluk-1.jpg?v=1769156758', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce-gabbana-gozluk2.jpg?v=1769156758']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Tom Ford', 'Tom Ford Gözlük', 'Ürün Bilgisi    Renk: Siyah   Editör Notları:  Bu Tom Ford güneş gözlüğü, markanın imzası haline gelen yarı çerçeveli (browline) ve köşeli siluetiyle zamansız bir şıklık sunar. Kahverengi asetat çerçevesi ve degrade camları, altın tonlu T metal detay ile tamamlanarak sofistike ve güçlü bir duruş yaratır. Günlük şehir stilinden daha klasik kombinlere kadar rahatlıkla uyum sağlayan, Tom Ford’un maskülen-lüks çizgisini net şekilde yansıtan ikonik bir modeldir.   Orijinallik ve Kalite Kontrolü Peony', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tomford-gozluk1.jpg?v=1769156391', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tomford-gozluk2.jpg?v=1769156391']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Balenciaga', 'Balenciaga Gözlük Beyaz', 'Ürün Bilgisi    Renk: Beyaz   Editör Notları:  Bu Balenciaga güneş gözlüğü, markanın modern ve iddialı stilini yansıtan dar oval / cat-eye etkili ikonik modellerinden biridir. Beyaz asetat çerçevesi, koyu camlarla kontrast yaratarak güçlü ve trend bir görünüm sunar. Minimal ama dikkat çekici formu sayesinde sokak stilinden şehir şıklığına kadar pek çok kombinde öne çıkan, Balenciaga’nın cesur ve çağdaş estetiğini taşıyan bir modeldir.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürün', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-gozluk_00b88ef3-37c4-47fa-bd17-00c20f3b03e3.jpg?v=1769156199']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Celine', 'Celine Gözlük Mavi', 'Ürün Bilgisi    Renk: Mavi   Editör Notları:  Bu Celine güneş gözlüğü, markanın zamansız ve modern çizgisini yansıtan kalın çerçeveli klasik modellerinden biridir. Koyu lacivert/füme tonlu asetat çerçevesi ve yuvarlağa yakın hatlarıyla güçlü bir siluet sunarken, kahverengi camlarıyla hem şık hem de kullanışlı bir görünüm sağlar. Minimal detaylar ve dengeli form sayesinde günlük kombinlerden daha sofistike şehir stillerine kadar rahatlıkla eşlik eden, Celine’in sade ama iddialı estetiğini taşıyan', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-gzoluk-1.jpg?v=1769155886', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Celine-gozluk2.jpg?v=1769155886']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Bottega Veneta', 'Bottega Veneta The Pouch Clutch Nude', 'Ürün Bilgisi    Renk: Nude  Kumaş İçeriği: Deri    Ölçüleri: Derinlik: 11 cmGenişlik: 34 cmYükseklik: 18 cm   Editör Notları:  Bu Bottega Veneta clutch, markanın en ikonik tasarımlarından biri olan The Pouch modelidir. Yumuşak nappa deriden üretilen, elde taşınan bu clutch; büzgülü, heykelsi formu ve logosuz sade tasarımıyla modern lüks anlayışını yansıtır. Minimal ama güçlü duruşu sayesinde hem gündüz şıklığında hem de akşam davetlerinde stilin odak parçası olarak tercih edilir.   Orijinallik v', 46000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/clutch1.jpg?v=1768995078']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Bottega Veneta', 'Bottega Veneta The Pouch Clutch Siyah', 'Ürün Bilgisi    Renk: Siyah  Kumaş İçeriği: Deri    Ölçüleri: Derinlik: 11 cmGenişlik: 34 cmYükseklik: 18 cm   Editör Notları:  Bu Bottega Veneta clutch, markanın en ikonik tasarımlarından biri olan The Pouch modelidir. Yumuşak nappa deriden üretilen, elde taşınan bu clutch; büzgülü, heykelsi formu ve logosuz sade tasarımıyla modern lüks anlayışını yansıtır. Minimal ama güçlü duruşu sayesinde hem gündüz şıklığında hem de akşam davetlerinde stilin odak parçası olarak tercih edilir.   Orijinallik', 47000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega4.jpg?v=1768994326', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega2.jpg?v=1768994327', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega3.jpg?v=1768994326', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega1.jpg?v=1768994327']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Chanel', 'Chanel Cüzdan', 'Ürün Bilgisi    Renk: Siyah   Editör Notları:  Bu Chanel cüzdan, markanın ikonik Classic Quilted Zip Around (L-zip / uzun cüzdan) model ailesine aittir. Siyah kapitone deri gövdesi, ön yüzündeki altın tonlu CC logosu ve fermuarlı yapısıyla zamansız bir şıklık sunar. İç hacmi kartlar, banknotlar ve bozuk paralar için düzenli bölmelere sahip olup, hem günlük kullanımda hem de çanta içinde pratik ve sofistike bir tamamlayıcıdır.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzma', 15000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-cuzdan-on.jpg?v=1768553202', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-cuzdan.jpg?v=1768553202']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Dolce & Gabbana', 'Dolce & Gabbana Kırmızı Çanta', 'Ürün Bilgisi    Renk: Kırmızı   Editör Notları:  Bu Dolce &amp; Gabbana çanta, markanın ikonik Sicily modelinin zarif ve feminen bir yorumudur. Canlı kırmızı renkte, dokulu dana derisinden üretilen bu tasarım; üst sap detayı, altın renk metal aksesuarları ve yapılandırılmış formu ile dikkat çeker. Hem elde hem de zincir askısı sayesinde omuzda taşınabilen Sicily modeli; gündüzden akşama, şık davetlerden şehir stiline kadar pek çok kullanım alanına uyum sağlayan zamansız bir klasiktir.   Orijinal', 40500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/krimizi1.jpg?v=1768489716', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/krimizi2.jpg?v=1768489717', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kirmizi3.jpg?v=1768489717']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Dolce & Gabbana', 'Dolce & Gabbana Çanta', 'Ürün Bilgisi    Renk: Bordo   Editör Notları:  Bu Dolce &amp; Gabbana çanta, markanın mücevher detaylı DG Girls / Embellished Clutch çizgisini yansıtan zarif bir modeldir. Bordo tonlu, dokulu deri yüzeyi; ön kısımda yer alan renkli taş işlemeli DG logosu ile çantaya sofistike ve feminen bir vurgu katar. Altın renk zincir askısı sayesinde elde, omuzda veya çapraz kullanılabilen bu model; davetler, akşam yemekleri ve özel geceler için iddialı ve şık bir tamamlayıcıdır.   Orijinallik ve Kalite Kont', 42250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dg1.jpg?v=1768489316', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dg2.jpg?v=1768489316', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dg3.jpg?v=1768489316', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dg4.jpg?v=1768489316']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Gucci', 'Gucci Çanta', 'Ürün Bilgisi    Renk: Gri   Editör Notları:  Bu Gucci çanta, markanın ikonik Emily modelinin Microguccissima desenli versiyonudur. Gri tonlu deri üzerine kabartma GG monogramı, ön kısımda yer alan at nalı (horsebit) metal detay ve püskül süsleme ile tamamlanırken, altın renk zincir askısı modele sofistike bir şıklık kazandırır. Omuzda ya da çapraz kullanılabilen bu zamansız tasarım; günlük şık kombinlerden akşam davetlerine kadar çok yönlü ve zarif bir tercihtir.   Orijinallik ve Kalite Kontrolü', 32250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-canta-on.jpg?v=1768488167', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-canta-yan.jpg?v=1768488167', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-canta-arka.jpg?v=1768488167', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1740.jpg?v=1768488334']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Peony Collective', 'Christian Louboutin Topuklu Ayakkabı - 38.5', 'Ürün Bilgisi    Renk: Nude  Beden: 38.5   Editör Notları:  Bu Christian Louboutin topuklu ayakkabı, markanın ikonik sivri burunlu stud detaylı stiletto modellerinden biridir. Nude tonlu rugan deri yüzeyi, kenar boyunca yer alan metal spike süslemelerle güçlü ve iddialı bir karakter kazanırken, ince ve yüksek topuğu ile feminen bir silüet sunar. Kırmızı tabanı Louboutin imzasını vurgulayan bu model; gece davetleri, özel organizasyonlar ve şık kombinler için çarpıcı ve zamansız bir tercihtir.   Or', 10800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-on.jpg?v=1768486759', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-yan.jpg?v=1768486759', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-detay.jpg?v=1768486759', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-kusur.jpg?v=1768486759']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Louis Vuitton', 'Louis Vuitton Sneaker - 41', 'Ürün Bilgisi    Renk: Beyaz  Beden: 41   Editör Notları:  Bu Louis Vuitton sneaker, markanın LV Trainer Sneaker modelinin özel ve playful bir versiyonudur. Beyaz deri zemin üzerinde yer alan renkli grafik/illustrasyon detayları ve kabartmalı LV logosu, tasarıma enerjik ve koleksiyonluk bir karakter kazandırır. Kalın kauçuk tabanı ve bağcıklı spor silüetiyle konforlu bir kullanım sunarken, Virgil Abloh döneminin genç, sanatsal ve sokak stiline göz kırpan estetiğini yansıtan dikkat çekici bir LV s', 27000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv10.jpg?v=1768486025', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv11.jpg?v=1768486025', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv12.jpg?v=1768486025', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv13.jpg?v=1768486025', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1727.jpg?v=1768486041']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Louis Vuitton', 'Louis Vuitton Sneaker - 40', 'Ürün Bilgisi    Renk: Kırmızı  Beden: 40 Made in Italy  Editör Notları:  Bu Louis Vuitton sneaker, markanın ikonik LV Trainer Sneaker modelidir. Kırmızı tonlarda Monogram desenli kadife/velour yüzeyi, beyaz deri detaylar ve katmanlı kauçuk tabanla birleşerek güçlü ve dikkat çekici bir silüet sunar. Virgil Abloh döneminin imza tasarımlarından olan bu model, sportif sneaker formunu lüks materyallerle buluşturur; şehir stilinde statement parça olarak öne çıkan, koleksiyon değeri yüksek bir LV sneak', 21500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv1_951eecbb-1a1e-458c-ad15-0adf27bccccc.jpg?v=1768484664', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv2_1b8b60d7-e2b6-4c17-b987-a9ee6c3484c4.jpg?v=1768484664', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv3_36ece4c5-4fd6-4418-8ef4-3112bebc5d9f.jpg?v=1768484664', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1690.jpg?v=1768484664', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1686.jpg?v=1768485169']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Louis Vuitton', 'Louis Vuitton Sneaker - 39', 'Ürün Bilgisi    Renk: Beyaz - Kahve  Beden: 39   Editör Notları:  Bu Louis Vuitton sneaker, markanın ikonik Archlight Sneaker modelidir. Oversize, dalgalı formdaki kalın tabanı ve futuristik silüetiyle Louis Vuitton’un modern tasarım çizgisini yansıtır. Beyaz teknik kumaş ve deri paneller, Monogram kanvas detaylarla zenginleştirilmiş; hem sportif hem de lüks bir görünüm sunar. Günlük şehir stilinde statement parça olarak öne çıkan, konforu ve güçlü duruşu bir arada sunan çok karakteristik bir LV', 25000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv8.jpg?v=1768483737', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv1_248f93fb-dab2-4318-b733-27d5494e7351.jpg?v=1768483736', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv2_3db6cb09-2d30-410f-81db-50f05b65bb2b.jpg?v=1768483737', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv3_06f19fd8-c01d-47ff-ae74-1cce5c003c5e.jpg?v=1768483737', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv4.jpg?v=1768483736', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv6.jpg?v=1768483736', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1709.jpg?v=1768483888']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Christian Dior', 'Christian Dior İpek Şal 95x200', 'Ürün Bilgisi    Renk: Mavi  Ölçü: 95x200  Kumaş İçeriği: %100 İpek   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-esarp-yeni-95x200.jpg?v=1768470981', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-desen.jpg?v=1768470981', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-etiket.jpg?v=1768470981']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Peony Collective', 'Prada Gözlük', '', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1915.jpg?v=1768392720']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Msgm', 'MSGM Gold Parıltılı Bluz - 36', 'Ürün Bilgisi    Renk: Gold  Beden: 40 (İtalyan)  Ölçü: Boy:71 cm En 40 cm   Editör Notları:  MSGM imzalı bu bluz, asimetrik yaka detayı ve drapeli yapısıyla modern ve sofistike bir siluet sunar. Vücuda oturan formu ve akışkan dokusu sayesinde zarif bir duruş elde edilirken, minimal tasarımıyla hem gündüz hem akşam kombinlerine kolayca uyum sağlar. Zamansız rengi ve net hatlarıyla gardırobun güçlü tamamlayıcı parçalarındandır.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzma', 4400, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/MSGM.webp?v=1767771331']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Academia', 'Academia Siyah/Beyaz Çizgili Body - M', 'Ürün Bilgisi    Renk: Beyaz/Siyah  Beden: M  %65 Viskoz,%35 Poliamid  Editör Notları:  Academia imzalı bu çizgili body, zamansız siyah-beyaz renk paletiyle modern ve sportif bir siluet sunar. Atlet kesimi ve vücuda oturan formu sayesinde minimal ama güçlü bir duruş yaratır. Esnek ve hafif kumaş yapısı gün boyu konfor sağlarken, çizgili deseniyle klasik parçaları bile daha dinamik hale getirir. Tek başına ya da katmanlı kombinlerde rahatlıkla kullanılabilecek zamansız bir temel parçadır.   Orijin', 1500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ACADEMIA.jpg?v=1767770159', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ACAjpg.jpg?v=1767770178']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Versace', 'Versace Kadın Elbise - 42', 'Ürün Bilgisi    Renk: Siyah  Beden: 42, İtalyan 46  Kumaş İçeriği: %70 Liyosel ve %30 Pamuk  Made in Italy.  Editör Notları:  Versace elbise, markanın klasik çizgisiyle modern  birleştiren oldukça şık ve dengeli bir parça. Etek kısmındaki pile tasarım modern bir hava sunar.    Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 25000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Versace-elbise-on.jpg?v=1767335613', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/versace-elbise-yan.jpg?v=1767335613', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/versace-elbise-arka.jpg?v=1767335613']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alexis', 'Alexis Gömlek - S', 'Ürün Bilgisi    Renk: Mavi - Beyaz  Beden: Smal  Editör Notları: Alexis gömlek farklı desenleriyle yeni bir hava kazandırır, hem jeanlerle günlük hem de kumaş pantolonlarla daha seçkin kombinlere rahatlıkla uyum sağlar.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Alexis-Gomlek-On.jpg?v=1767334800', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alexis-gomlek-yan.jpg?v=1767334800', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alexis-gomlek-arka.jpg?v=1767334801']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Mont - L Beden', 'Ürün Bilgisi    Renk: Mavi  Beden: Large  Editör Notları:  Burberry mont markanın zamansız stiliyle spor şıklığını birleştiren oldukça dengeli bir parça. Uzun yıllar giyilebilecek modern bir klasik.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 19599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/l-beden-on.jpg?v=1769629367', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Burberry-mavi-mont-yan_d4a74184-73b4-4e81-81ee-9081e4eb138c.jpg?v=1769629367', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-mon-mavi-arka.jpg?v=1769629367', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/l-beden2.jpg?v=1769629352']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balmain', 'Balmain Sweatshirt - M Beden', 'Ürün Bilgisi    Renk: Kırmızı - Siyah  Beden: Medium  Editör Notları: Balmain sweatshirt, markanın klasik çizgisiyle modern spor detayları birleştiren oldukça şık ve dengeli bir parça. Göğüs kısmındaki tasarım "üks bir hava sunarken, omuz kısmındaki detaylar tasarıma dinamik bir karakter katıyor. Siyah ve kırmızının zamansız kontrastı sayesinde hem jeanlerle günlük hem de kumaş pantolonlarla daha seçkin kombinlere rahatlıkla uyum sağlar; uzun yıllar giyilebilecek modern bir klasik.  Orijinallik', 16000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Balmain-Sweatshirt-On.jpg?v=1767333599', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Balmain-Sweatshirt-yan.jpg?v=1767333599', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Balmain-Sweatshirt-arka.jpg?v=1767333599']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Kenzo', 'Kenzo Kadın Siyah Elbise - S Beden', 'Ürün Bilgisi    Renk: Siyah  Beden: S  Editör Notları: Siyah zemin üzerine yerleştirilen Kenzo’nun imza kaplan (Tiger) motifi, elbiseye net ve karakterli bir duruş kazandırıyor. T-shirt elbise formunda; kısa kollu, bisiklet yaka ve düz kesimli. Vücudu sarmadan düşen rahat kalıbı sayesinde hem konforlu hem de modern bir siluet yaratıyor. Spor-lüks çizgide, zahmetsiz ama dikkat çekici bir parça.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şe', 14000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-elbise-on_a6771986-7586-4029-89ce-f69630a7ca37.jpg?v=1767192740', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-elbise-yan.jpg?v=1767192740', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-elbise-arka.jpg?v=1767192740']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Mavi Mont - Small', 'Ürün Bilgisi    Renk: Mavi  Beden: Small  Editör Notları: Burberry’nin zamansız kapitone ceketi, ikonik baklava dikişleri ve manşetlerdeki House Check detayıyla markanın klasik stilini yansıtır. Hafif yapısı sayesinde mevsim geçişlerinde konforlu ve şık bir dış giyim alternatifi sunar.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsini', 12799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-mont-mavi-on.jpg?v=1767192403', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-mavi-mont-yan.jpg?v=1767192404', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-mavi-mont-aqrka.jpg?v=1767192403', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_0751.jpg?v=1767192403']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Mont Mor - Xs Beden', 'Ürün Bilgisi    Beden: XS  Renk: Mor  Editör Notları:  Bu Burberry mont, markanın ikonik diamond quilt (baklava desenli) kapitone tasarımını taşıyan, bele oturan feminen bir quilted jacket modelidir. Hafif dolgulu yapısı sayesinde mevsim geçişleri ve serin havalar için ideal olup, gömlek yaka ve önden logo detaylı metal düğme kapamasıyla klasik Burberry çizgisini yansıtır. Mor tonundaki rengi modele sofistike bir karakter kazandırırken, manşetlerdeki Burberry check astar detayı markanın imzasını', 12500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-mor-mont-on.jpg?v=1767192451', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-mor-mont-yan.jpg?v=1767192451', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-mor-mont-arka.jpg?v=1767192451', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_0745.jpg?v=1767192437', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dis1.jpg?v=1769506843']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Chloe', 'Chloe Sneaker Siyah - 38', 'Ürün Bilgisi    Renk:Siyah/Beyaz  Numara: 38  Editör Notları: Chloé’nin ikonik Lauren sneaker modeli, zarif dalgalı taban detayı ve sade deri yüzeyiyle lüksü günlük stile taşıyor. Konforlu yapısı ve zamansız tasarımı sayesinde hem sportif hem de feminen kombinlerde rahatlıkla tercih edilebilen, gardırobun joker parçalarından biridir.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chloe-sneaker-on.jpg?v=1767185172', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chloe-sneaker-yan.jpg?v=1767185171', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chloe-snaekr-arka.jpg?v=1767185171', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/detay.jpg?v=1767185355']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Lesilla', 'Lesilla Topuklu Ayakkabı Siyah - 38.5', 'Ürün Bilgisi    Renk: Siyah/Gold  Model: Eva Platform Pump  Editör Notları: Le Silla’nın ikonikleşmiş modellerinden biri olan bu ayakkabı, markanın zarafeti ve şehveti birleştiren tasarım anlayışının en somut örneklerinden biridir. Süet dokusunun mat siyahlığı ile platform kısmında kullanılan metalik altın (gold) kaplamanın yarattığı kontrast, ayakkabıya mimari bir derinlik ve üst düzey bir lüks hissiyatı kazandırıyor. Markanın imzası olan ultra ince stiletto topuk yapısı, ön kısımdaki gizli/açı', 2975, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Lesilla-Ayakkabi-On.jpg?v=1767174564', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Lesilla-ayakkabi-yan.jpg?v=1767174563', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Lesilla-Ayakkabi-Arka.jpg?v=1767174564']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Christian Dior', 'Christian Dior Kazak - 36', 'Ürün Bilgileri  Mavi 77% Acatate 12% Polyemide 36 Beden Sim detaylı  Monogram desenli    Orijinallik ve Kalite KontrolüPeony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 11000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-mavi-kazak-on.jpg?v=1759243623', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-mavi-kazak-yan.jpg?v=1759243623', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-kazak-mavi-arka.jpg?v=1759243622']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Jil Sander', 'Jil Sander Siyah Hırka 38', 'Ürün Bilgisi    Renk: Siyah  Beden: 38  Eksper Puanı:  Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır. 10/10  Editör Notları:   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 11999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Jil-sander-hirka.jpg?v=1767168184']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tod''S', 'Tods''s Çizme - 35', 'Ürün Bilgisi    Renk: Vizon  Numara: 35 Editör Notları:  Tod''s çizme dokusu sayesinde hem mat hem de sıcak bir görünüme sahip. Diz altına kadar uzanan formu, bacağı nazikçe sararak oldukça zarif bir siluet oluşturuyor. Üst ve ayak bileği kısmındaki metal tokalı bant detayları, modele güçlü ama abartısız bir karakter katıyor.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi', 7799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod2_52364d1a-7f3a-4fb8-b231-bcd43206bad2.jpg?v=1766571783', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod1_aece88e9-b7df-4991-9e30-5b8b9206d798.jpg?v=1766571783', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod4_a5ec5cc5-58fc-4417-a89d-ae80463fefaa.jpg?v=1766571783', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod5.jpg?v=1766571783']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Balenciaga', 'Balenciaga Siyah Elbise - 36', 'Ürün Bilgisi    Beden: 36   Renk:  Siyah   Ölçü: Boy 100 cm (büzgülü)   Editör Notları:  Balenciaga imzalı bu "One-Shoulder Ruched Mini Dress", Demna Gvasalia’nın estetik anlayışını yansıtan, hem fütüristik hem de son derece kışkırtıcı bir parça. Markanın vücudu adeta ikinci bir ten gibi saran ikonik büzgü teknikleriyle tasarlanan elbise, asimetrik tek omuz kesimiyle klasik gece şıklığına modern bir başkaldırı niteliği taşıyor. Omuzdan ve etek ucundan sarkan uzun, ince kordon detayları, Balencia', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga1.jpg?v=1765449314', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga2.jpg?v=1765449315']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Emporio Armani', 'Emporio & Armani Siyah T-shirt - Large', 'Ürün Bilgisi    Renk: Siyah  Beden: Large  Kumaş İçeriği: %70 Liyosel ve %30 Pamuk  Made in Vietnam  Editör Notları:  Emporio Armani’nin bu tişörtü, markanın klasik çizgisiyle modern spor detayları birleştiren oldukça şık ve dengeli bir parça. Göğüs kısmındaki sade tasarım "sessiz lüks" bir hava sunarken, alt kısımdaki ikonik logo bandı tasarıma dinamik bir karakter katıyor. Siyah ve beyazın zamansız kontrastı sayesinde hem jeanlerle günlük hem de kumaş pantolonlarla daha seçkin kombinlere rahat', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ChatGPTImage16Ara202510_38_42.png?v=1765870764']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Siyah Etek - 40', 'Ürün Bilgisi    Renk: Siyah  Beden: 40  Editör Notları: Prada''nın bu mini eteği, markanın avangart ve mimari tasarım anlayışını yansıtan ikonik bir parça. Saten dokusunun verdiği lüks hissiyatı, arkadan sarkan uzun kuyruk detayıyla birleştirerek geleneksel mini etek formunu modern bir sanat eserine dönüştürüyor; hem cesur hem de son derece sofistike bir duruş sergiliyor.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entr', 8600, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-train-embellished-silk-satin-mini-skirt.webp?v=1765530492', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-train-embellished-silk-satin-mini-skirt_1.webp?v=1765530682', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-train-embellished-silk-satin-mini-skirt_3.webp?v=1765530682', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-train-embellished-silk-satin-mini-skirt_4.webp?v=1765530682', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-train-embellished-silk-satin-mini-skirt_2.webp?v=1765530682']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Beyaz Topuklu Ayakkabı - 38.5', 'Ürün Bilgisi    Renk: Beyaz   Numara: 38.5   Güncel Satışı: 46.500₺   Editör Notları: Bu Prada ayakkabı, markanın modern ve mimari tasarım dilini yansıtan sivri burunlu, blok topuklu slingback modeldir. Beyaz deri yüzeyi ayakkabıya net ve sofistike bir duruş kazandırırken, yanlardaki kesik detaylar tasarımı hafifletir ve feminen bir hava katar. Orta yükseklikteki siyah blok topuk hem konforlu hem de güçlü bir siluet sunar. Minimal Prada logosu ile tamamlanan bu model; ofis şıklığından davet stil', 25000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/25957304_55877103_2048.webp?v=1765521145', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/25957304_55877106_2048.webp?v=1765521145', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/25957304_55877079_2048.webp?v=1765521145', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/25957304_55877101_2048.webp?v=1765521145', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/25957304_55877077_1000.webp?v=1765521145']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Off White', 'Off White Yeşil Elbise- 36', 'Ürün Bilgisi    Renk: Yeşil  Beden: 40 IT / 36 TR  Ölçü: Omuz genişliği: 34–35 cm  Göğüs: 38–40 cm  Bel: 32–34 cm  Kalça: 40–42 cm  Elbise boyu: 80–83 cm  Kol boyu: 58–60 cm  Materyal: Transparan formdadır.  Kalıp: İtalyan   Editör Notları:  Vücuda oturan formu ve çapraz drapeli yapısıyla feminen silueti ön plana çıkarır. Yarı transparan, ince ve esnek tül kumaş üzerine uygulanan bulut efektli / tie-dye görünümlü desen, elbiseye dinamik ve çağdaş bir karakter kazandırır. Asimetrik katmanlar ve s', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/off-white-elbise-on.jpg?v=1765449479', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fashn-export-1780942235007.webp?v=1780942250']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Valentino', 'Valentino Yeşil Çizme - 38.5', 'Ürün Bilgisi    Renk: Koyu Yeşil   Numara: 38.5  Topuk Boyu : 10 cm  Editör Notları: Valentino’nun ikonik Rockstud detayını modern bir yorumla buluşturan bu kama topuklu yağmur çizmesi, parlak kauçuk yüzeyi ve güçlü silüetiyle hem fonksiyonel hem stil sahibi bir dış giyim tamamlayıcısıdır.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilir', 13599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino1.jpg?v=1765448730', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino2.jpg?v=1765448730', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino3.jpg?v=1765448730', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino4.jpg?v=1765448730']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Christian Dior', 'Christian Dior 30 Montaigne Krem / Beyaz Çanta', 'Ürün Bilgisi   Renk: Beyaz  Model Adı:  Dior 30 Montaigne  Eksper Puanı:  Ürünün tüm incelmesi tarafımızca yapılmıştır. Ön kısımında çizik mevcuut.  Kondisyon Durumu 9/10   Eksper Notları: Dior’un zamansız şıklığını yansıtan ikonik tasarımlarından biri olarak öne çıkıyor. Beyaz rengi ve altın detaylı CD tokası, hem modern hem de sofistike bir görünüm sunuyor. Kaliteli deri dokusu ve zarif işçiliğiyle dikkat çeken model, hem günlük kullanımda hem de özel davetlerde stilinizi tamamlayacak lüks bir', 55000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1107_117c3515-32f5-4de1-bce0-4d6c2ed7d37b.png?v=1765354163']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Zadig & Voltaire', 'Zadig & Voltaire Siyah/Gri 36 Ceket', 'Ürün Bilgisi    Renk: Siyah/Gri  Beden:36  Editör Notları: Metalik dokusu ve kısa kesimiyle zamansız rock zarafetini buluşturan bu Zadig &amp; Voltaire blazer, her kombine anında iddialı bir görünüm kazandırır. Minimal üstlerle ve yüksek bel etek veya pantolonlarla mükemmel uyum sağlayan ceket, ister gece davetlerinde, ister gündüz jean üzerine cool bir tarz yaratmak için ideal. Omuz hattını netleştiren kesimi sayesinde hem modern hem de feminen bir siluet sunar.  Orijinallik ve Kalite Kontrolü', 5500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/zadig.jpg?v=1765264620']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Hermes', 'Hermes Bouncing Sneaker - 38.5', 'Ürün Bilgisi    Renk: Siyah  Numara: 38.5  Editör Notları:  Hermès’in modern ve fonksiyonel tasarım anlayışını yansıtan bu sneaker modeli, deri ve süet birleşimiyle konforu şıklıkla buluşturur. Günlük kullanıma uygun, zamansız ve sofistike bir alternatiftir.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 35000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-sneaker-2.jpg?v=1764939635', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-sneaker-1.jpg?v=1764939635', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-sneaker-3.jpg?v=1764939635', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-sneaker-4.jpg?v=1764939635']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Peony Collective', 'VERSACE Multicoloured Floral Scarf', 'Ürün Bilgisi    Renk: Rennkli   Editör Notları: Markanın ikonik Barok geometrileri ile canlı floral desenlerini bir araya getiren çarpıcı bir tasarımdır. Mor, krem, siyah ve çok renkli çiçek detayları sayesinde güçlü ve iddialı bir görünüm sunar. Parlak ve akışkan ipek dokusu, eşarbın hem şık hem de konforlu bir şekilde kullanılmasını sağlar. Versace’nin maksimalist estetiğini yansıtan bu parça; sade kombinleri tek dokunuşla yükselten, karakterli ve zamansız bir aksesuardır.  Orijinallik ve Kali', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/VERSACEESARP.jpg?v=1764916251']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Stella Mccartney', 'Stella Mccartney Siyah 38  Pantolon', 'Ürün Bilgisi   Renk: Siyah  Beden: 38  Editör Notları: Stella McCartney imzalı bu siyah pantolon, markanın sürdürülebilir lüks anlayışını ve kusursuz terzilik yeteneğini yansıtan zamansız bir temel parçadır. Düz ve klasik kesimi sayesinde silüeti uzatan ve son derece rafine bir duruş sergileyen bu model, gardırobun en güvenilir yatırım parçalarından biri olma özelliğini taşır. Stella McCartney’nin maskülen hatları feminen zarafetle harmanlayan stili, bu tasarımda yüksek kaliteli kumaş seçimi ve', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Stella-Pantolon-On.jpg?v=1767173863', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Stealla-Pantolon-Yan.jpg?v=1767173863', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Stella-Pantolon-arka.jpg?v=1767173863']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Peony Collective', 'Dior Oblique Diortwin 90 Kare Eşarp', 'Ürün Bilgisi    Kumaş İçeriği :%100 İpek  Ölçü: 90X90 cm   Eksper Puanı: Ürünün tüm incelmesi tarafımızca yapılmıştır. Hiçbir Kondisyon Durumu 10/10  Eksper Notları:  Dior’un ikonik Oblique deseniyle tasarlanan bu eşarp, zarafeti en sade hâliyle taşıyor. Yumuşak dokusu ve karakteristik motifleri, her kombine anında lüks bir dokunuş katıyor. Hem gündelik stile hem de özel anlara eşlik eden, zamansız bir Dior klasiği.   Orijinal ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tara', 13270, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/DIORSAL.webp?v=1764770431', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/DIorESARP.webp?v=1764770387', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/C3.jpg?v=1764770479']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Çizme 37', 'Açıklama Logo desenli Louis Vuitton Çizme, kombinlerinize zamansız bir şıklık katar. Öne Çıkan Özellikler   Tasarım: Logo desen ve gold düğme detay.  Malzeme: Kauçuk.  Renk: Siyah.  Beden: 37.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 18000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-cizme-1.jpg?v=1764585669', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv3.jpg?v=1766567761', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv2.jpg?v=1766567761', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv1.jpg?v=1766567761']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Peony Collective', 'Chanel Wallet on Chain Siyah Kol Çantası (Woc)', 'Ürün Bilgisi   Renk: Siyah  Askı Rengi: Rose Gold  Diamond Quilted Lambskin  Eksper Puanı:  Ürünün tüm incelmesi tarafımızca yapılmıştır. Kondisyon Durumu 10/10   Eksper Notları:  Markanın en zamansız ve en çok tercih edilen siluetlerinden biri. Kapitone dokusu, kompakt formu ve zincir–deri askısının yarattığı klasik duruşuyla, hem gündüz hem akşam stiline uyum sağlayan “küçük ama etkili” bir parça. Elde taşıdığında zarif bir aksesuar, çapraz kullanımda ise pratik bir mini çanta gibi davranıyor.', 120000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel1.jpg?v=1764575173', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel2.jpg?v=1764575173']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Prada', 'Prada Saffiano Çanta Medium Lacivert', 'Ürün Bilgisi  Renk: Mavi Numara: Orta Kumaş: Deri Editör Notları: markanın en ikonik deri modellerinden biridir. Yapısal formülü, altın tonlu metal detayları ve üçgen Prada logosuyla klasik, güçlü ve zamansız bir duruş sunuyor. Saffiano deri, çizilmelere karşı dayanıklı, hafif, parlak dokulu özel bir para birimine sahip olduğu için günlük kullanımda hem şık hem de uzun ömürlü bir seçimdir. Omuz askısı sayesinde elde, kolda veya çapraz şekilde takılabilir; iç bölmeleri ise düzenli kullanım için i', 49799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_0618.jpg?v=1763015654']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Peony Collective', 'Ralph Lauren Yeşil 34 Etek', 'Ürün Bilgisi    Kumaş Türü: Kadife    Renk:  Yeşil  Beden: 34 Bel kısmı lastikli  Eksper Puanı:  Ürünün tüm incelmesi tarafımızca yapılmıştır. Hiçbir deformesi yoktur.  Kondisyon Durumu 10/10   Editör Notları:Nefes alan ince dokusu ve akışkan saten yüzeyiyle ışığı zarifçe yansıtan bu midi etek, belden oturan ve altta hafif volanla hareketlenen silueti sayesinde vücuda doğal bir incelik kazandırır. Düşük topuklar, şık sandaletler veya basic gömleklerle her sezona uyum sağlayan zamansız bir parça;', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph1.jpg?v=1770799347', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph2.jpg?v=1770799347', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph3.jpg?v=1770799347']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Escada', 'Escada Clutch', 'Ürün Bilgisi    Renk: Siyah   Editör Notları:  Bu Escada clutch, markanın feminen ve göz alıcı tasarım anlayışını yansıtan şık bir gece çantasıdır. Dalgalı kapitone dokulu siyah deri gövdesi, ortadaki taşlı kalp formundaki broş detayıyla romantik ve sofistike bir vurgu kazanır. İnce ve zarif formu sayesinde gece davetleri, kokteyller ve özel organizasyonlar için ideal bir tamamlayıcıdır. Escada’nın imza niteliğindeki detaylarıyla hem klasik hem de iddialı bir stil sunar.   Orijinallik ve Kalite', 15999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-1.jpg?v=1778677070', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-2.jpg?v=1778677070', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-3.jpg?v=1778677070']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Escada', 'Escada Eşarp', 'Ürün Bilgisi    Renk: Kahverengi  Kumaş İçeriği: İpek  Ölçü: 48x48  Editör Notları:  Bu Escada eşarp, markanın zarif ve sofistike tasarım dilini yansıtan klasik bir ipek aksesuar modelidir. Sıcak taba-kahve tonları üzerine yerleştirilmiş zincir ve kayış motifleri, Escada’nın güçlü ve feminen estetiğini vurgular. İnce dokulu ipek kumaşı sayesinde hafif ve akıcı bir duruş sunarken, hem boyunda hem çanta sapında hem de saç aksesuarı olarak kullanılabilecek çok yönlü bir parçadır. Zamansız deseniyle', 1500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-esarp.jpg?v=1761119841']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Yves Saint Laurent', 'Yves Saint Laurent  Wicker Basket (YSL) Çanta', 'Ürün Bilgisi    Renk: Siyah   Editör Notları:  Bu Saint Laurent (YSL) çanta, markanın rafya dokulu tote / yazlık shopper stilini yansıtan şık ve zamansız bir modelidir. Doğal hasır görünümlü gövde siyah şerit detaylarla modern bir kontrast yaratırken, deri saplar ve püskül aksesuar tasarıma sofistike bir dokunuş katar. Hafif yapısı ve geniş iç hacmi sayesinde plajdan şehir yaşamına, yaz tatillerinden günlük kullanıma kadar rahatlıkla tercih edilebilen, YSL’nin sade ama güçlü estetiğini taşıyan b', 47000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl1_380eedfb-c355-4c1d-b096-667b8f804a23.jpg?v=1778505353', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl2_a68213c1-561e-4ccc-a11f-65160baad480.jpg?v=1778505353', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-3.jpg?v=1778505353', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl4.jpg?v=1778505353']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Manu Atelier', 'Manu Atelier Çanta', 'Ürün Bilgisi    Renk: Sarı   Editör Notları:  Bu Manu Atelier çanta, markanın büzgülü mini omuz çantası stilini yansıtan modern ve feminen bir modelidir. Yumuşak deri gövdesi, lastik büzgülü kısa sapı ve ince zincir askısı sayesinde hem elde hem omuzda kullanılabilir. Minimal logosu ve kompakt formu ile özellikle akşam davetleri, şehir şıklığı ve zarif günlük kombinler için tasarlanmış; sade ama trend odaklı Manu Atelier estetiğini net şekilde ortaya koyan bir parçadır.   Orijinallik ve Kalite K', 7999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/EkranResmi2025-10-2209.05.36.png?v=1761113255']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ann Taylor', 'Ann Taylor Beyaz Ceket', 'Ürün Bilgisi    Renk: Beyaz  Beden: 36   Editör Notları:  Bu Ann Taylor ceket, markanın klasik ve zarif çizgisini yansıtan kısa boy, yuvarlak yaka (collarless) tweed-dokulu bir modeldir. Düz ve temiz silueti, önden dekoratif metal düğme kapaması ve ön cepleriyle zamansız bir şıklık sunar. Kırık beyaz tonundaki rengi sayesinde hem ofis kombinlerinde hem de özel davetlerde rahatlıkla kullanılabilir; elbiseler, kumaş pantolonlar veya eteklerle kusursuz uyum sağlar. Minimal ama sofistike bir görünüm', 3799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Ann-Taylor-Ceket-On.jpg?v=1767167530', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Ann-Taylor-Ceket-Yan.jpg?v=1767167530', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Ann-Taylor-Ceket-Arka.jpg?v=1767167530']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Gucci', 'Gucci GG Marmont Super Mini Çanta', 'Ürün Bilgisi:  Siyah matelasse şeritli deri Beyaz deriden, zincirli, çıkarılabilir ve fermuarlı ek kartlık GG logo ve çıtçıt kapama Uzun zincir askı, çapraz kullanıma uygun Altın tonlu donanım İç kısmında bir ana bölme ve bir küçük kartlık Arka kısmında bir adet bölme Toz torbası mevcut Ölçüler: 21 cm en 12 cm boy Renk: Siyah   Orijinallik ve Kalite Kontrolü         Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik', 46000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/image00001-15-1535x2048.png?v=1761289886']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Joseph', 'Joseph Kahverengi Renk S Beden  Pantolon', 'Ürün Bilgisi    Renk: Kahverengi  Beden: Small   Kumaş: %100 Yün Editör Notları:  Bu Joseph pantolon, markanın rafine terzilik anlayışını yansıtan yüksek bel, geniş paça (wide-leg) bir modeldir. Yün içerikli kumaşı sayesinde akıcı ama tok bir duruş sunarken, minimal dikiş detayları ve sade formu ile zamansız bir siluet oluşturur. Nötr bej tonundaki rengi, hem ofis stilinde gömlek ve blazer’larla hem de günlük şıklıkta ince trikolarla kolayca kombinlenebilir. Modern, sofistike ve uzun ömürlü bir', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Joseph-Pantolon-1.jpg?v=1767169306', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Joseph-Pantolon-2.jpg?v=1767169305', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Joseph-Pantolon-3.jpg?v=1767169306']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balmain', 'Balmain Siyah Hırka-Large', 'Ürün Bilgisi    Renk: Siyah    Beden: Large   Editör Notları:   Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 10899, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-on.jpg?v=1761308217']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Loro Piana', 'Loro Piana Trecia Jumper Baby Cashmere Kazak', 'Ürün Bilgisi    Renk: Lacivert   Model: Loro Piana Treccia Jumper Baby  Kumaş: Örme   Editör Notları: Yarım fermuarlı dik yakası, kazaklara sportif-şık bir karakter katarken aynı zamanda kullanım esnekliği sağlıyor. Fermuar kapalıyken daha düzenli ve klasik, açık kullanıldığında ise daha rahat ve gündelik bir görünüm elde ediliyor. Ribana manşetler ve etek ucu, formun vücutta düzgün durmasını sağlıyor.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detay', 52599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kazak-on.jpg?v=1761137633', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kazak-arka.jpg?v=1761137633', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/FAD7358_J348_MEDIUM_1_080b21d4-4221-46fa-beab-471361947cd7.avif?v=1761137633']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balmain', 'Balmain Siyah Deri Ceket', 'Ürün Bilgisi    Renk: Siyah  Editör Notları:  Balmain’in ikonik bomber ceket yorumunu yansıtan bu model, hakiki deri yapısı ve göğüste yer alan kabartmalı logo detayıyla güçlü ve modern bir duruş sunar. Spor detaylarla lüksü bir araya getiren tasarımı sayesinde hem günlük hem de iddialı kombinlerde rahatlıkla kullanılabilir.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi', 52999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain2.jpg?v=1769801060', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain1.jpg?v=1769801070', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-deri-ceket-arka.jpg?v=1769801070']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Michael Kors', 'Michael Kors Lacivert Yağmurluk M', 'Ürün Bilgisi   Beden:38  Renk: Lacivert  Editör Notları: Denizci lacivertinin sakin tonunu taşıyan bu yağmurluk, hafif yapısı ve kapüşonlu tasarımıyla rüzgârda, yağmurda tam koruma sağlıyor. Ön kısımdaki beyaz düğmeler ve kalın ip detayları modele sportif bir canlılık katarken, bele doğru ayarlanabilen ip yapısı vücudu daha derli toplu gösteriyor. Günlük şehir hayatında, sahil yürüyüşlerinde ya da ani hava değişimlerinde çantaya kolayca atılıp çıkarılabilecek pratik ve kullanışlı bir parça. Orij', 17000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/YAGMURLUK-ON.jpg?v=1761126608']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Giuseppe Zanotti', 'Giuseppe Zanotti Siyah Loafer 42', 'Ürün Bilgisi    Renk: Siyah  Beden: 42  Materyal: Deri  Editör Notları:  Bu Giuseppe Zanotti erkek loafer modeli, markanın sofistike ve iddialı tasarım çizgisini yansıtır. Parlak siyah deri üst yüzeyi, ön kısımda yer alan altın tonlu metal detay ile klasik loafer formuna modern ve lüks bir vurgu katar. Yuvarlatılmış burun yapısı ve temiz dikişleri sayesinde hem konforlu hem de şık bir kullanım sunar. Takım elbiselerle, kumaş pantolonlarla veya smart-casual kombinlerde tercih edilebilecek zamansı', 25000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-on.jpg?v=1761124187', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-yan.jpg?v=1761124187']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Monogram Espadril 41', 'Ürün Bilgisi    Renk: Kahverengi  Beden: 41  Materyal: Kanvas Erkek   Editör Notları:  Bu Gucci espadril modeli, markanın ikonik GG monogram desenini rahat ve yazlık bir siluetle birleştiren casual-lüks bir tasarımdır. Kanvas üst yüzeyi ve klasik hasır (jüt) tabanı sayesinde hafif, nefes alabilir ve konforlu bir kullanım sunar. Slip-on formu pratiklik sağlarken, kauçuk taban detayı günlük şehir kullanımına da uygun dayanıklılık kazandırır. Yaz aylarında keten pantolon, chino veya şortlarla rahat', 19999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-yan.jpg?v=1761124132']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Balmain', 'Balmain Siyah Çanta', 'Ürün Bilgisi    Renk: Siyah  Editör Notları:  Balmain’in ikonik B-Buzz serisine ait bu model, markanın güçlü ve modern tasarım dilini net hatlarla yansıtır. Pürüzsüz deri yüzeyi, altın tonlu perçin detayları ve imza B-Buzz kilit mekanizmasıyla sofistike bir duruş sunar. Yapılandırılmış formu sayesinde formunu korur; zincir askısı ile omuzda veya çapraz kullanım imkânı sağlar. Zamansız siyah rengiyle hem gündüz hem akşam kombinlerine kolayca uyum sağlar.   Orijinallik ve Kalite Kontrolü Peony Col', 36299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-shoulder-bags-bbox-28-smooth-leather-bag-00000126658f00s001.jpg?v=1761124089', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-1.jpg?v=1778625321', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-2.jpg?v=1778625321', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-3.jpg?v=1778625423']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Dolce & Gabbana', 'Dolce & Gabbana Bordo Çanta', 'Ürün Bilgisi    Renk: Bordo  Editör Notları:  Bu Dolce &amp; Gabbana el çantası, markanın klasik İtalyan zarafetini güçlü bir siluetle buluşturur. Dokulu deri yüzeyi ve derin bordo tonu çantaya sofistike bir karakter kazandırırken, ön yüzde yer alan altın tonlu kilit detayı tasarımın imza dokunuşunu oluşturur. Üstten saplı yapısı sayesinde elde taşımaya uygundur; kompakt formuna rağmen günlük ihtiyaçlar için ideal bir iç hacim sunar. Günlük şıklık, özel davetler ve akşam kombinleri için zamansız', 34599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce-bordo-on.jpg?v=1761124049', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce-gabbana-1.jpg?v=1778619742', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce-gabbana-2.jpg?v=1778619742', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce-gabbana-3.jpg?v=1778619742']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Etro', 'Etro Çanta', 'Ürün Bilgisi    Renk: Kahverengi  Editör Notları :  Etro’nun imza paisley deseni ile öne çıkan bu tote çanta, markanın bohem ve sofistike tasarım anlayışını yansıtır. Dayanıklı kumaş gövdesi ve kontrast deri kenar detayları sayesinde hem şık hem fonksiyonel bir kullanım sunar. Geniş iç hacmi günlük ihtiyaçları rahatlıkla taşımaya olanak tanırken, omuz askıları konforlu bir taşıma sağlar. Zamansız desen yapısıyla sezonlar boyunca stilini koruyan karakterli bir parçadır.    Orijinallik ve Kalite K', 40000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/0N0088210_600-7_650x_a93934b4-a866-4827-a509-67b79eed1d91.webp?v=1761122179', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/e.webp?v=1767618833', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/et.webp?v=1767618889', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/etr.webp?v=1767618889']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Roland Mouret', 'Roland Mouret Siyah Etek- 32', 'Ürün Bilgisi    Renk :Siyah   Beden: 32  Kumaş İçeriği:  %61 viskon, %30 asetat ve %7 seda kumaş ve %2 elastan  Ölçü: Boy: 80 cm Bel: 32 cm  Eksper Notları: Siyah tonlarda tasarlanmış, hem mat hem kadife dokuyu bir araya getiren sofistike bir maxi etek. Farklı yüzeylerin diyagonal çizgilerle birleşmesi eteğe heykelsi bir dinamizm katarken, çizgilerin üzerinde yer alan ince renkli taş/ışıltı detayları parçaya zarif bir ışık oyunu ekliyor. Asimetrik kesim alt uç, yürüdükçe akışkan bir hareket yara', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/2c80ababf9c54c39329c8d5c7826fc72_45165457-aab0-4460-89a6-f634e2db833c.jpg?v=1761120471']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Givenchy', 'Givenchy Kırmızı-Siyah Etek- 32', 'Ürün Bilgisi    Renk: Siyah/Kırmızı   Beden: 36 (İtalyan)  Editör Notları: Siyah kumaş üzerine kırmızı şerit detaylarıyla hareket kazandırılmış asimetrik volanlı.Üst bölümden başlayan geniş volan, eteğe akıcı bir form veriyor ve yan tarafa doğru katlanarak feminen bir siluet oluşturuyor. Alt kenarlardaki kırmızı çift şerit, tasarıma sportif ama zarif bir vurgu katıyor. Midi boya yakın uzunluğu ve akışkan yapısıyla hem basic üstlerle hem daha iddialı parçalarla kolayca kombinlenebilecek etkileyic', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ww40779_1_920x_507e559c-140b-432e-8109-9cdc014b0d10.webp?v=1761120327']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Louboutin', 'Christian Louboutin Topuklu Ayakkabı Siyah - 38', 'Ürün Bilgisi    Renk: Siyah  Numara: 38  Materyal: Rugan Editör Notları:   Bu Christian Louboutin topuklu ayakkabı, markanın ikonik So Kate modeline ait, sivri burunlu ve yüksek ince topuklu (stiletto) tasarımıyla öne çıkar. Parlak siyah rugan derisi ve kusursuz kesimiyle son derece feminen, güçlü ve iddialı bir siluet sunar. Kırmızı tabanı ile Louboutin imzasını taşıyan bu model; özel davetler, gece kombinleri ve şık akşam görünümleri için zamansız bir klasik olarak kabul edilir.   Orijinallik', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lb-yan.jpg?v=1761119537']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Prada', 'Prada Saffiano XL', 'Ürün Bilgisi  Renk: Pembe Ölçü: XLKumaş: DeriEksper Notları: markanın en ikonik deri modellerinden biridir. Yapısal formu, altın tonlu metal detayları ve üçgen Prada logosuyla klasik, güçlü ve zamansız bir duruş sunar. Saffiano deri, çizilmelere karşı dayanıklı, hafif parlak dokulu özel bir yüzeye sahip olduğu için günlük kullanımda hem şık hem de uzun ömürlü bir seçimdir. Omuz askısı sayesinde elde, kolda veya çapraz şekilde takılabilir; iç bölmeleri ise düzenli kullanım için idealdir. İş hayat', 69999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-on.jpg?v=1761118187', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-arka.jpg?v=1761118187']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi Kelepçe', 'Ürün Bilgisi    Renk: Gold  Editör Notları:          Bu Fendi kelepçe bileklik, markanın ikonik FF logo tasarımını merkezine alan güçlü ve lüks bir aksesuardır. Altın tonlu metal gövde, iç kısmındaki kahverengi detaylarla sıcak ve sofistike bir kontrast yaratırken, geniş kelepçe formu bilekte iddialı bir duruş sunar. Ayarlanabilir kilit mekanizması sayesinde konforlu kullanım sağlar. Hem gündüz şık kombinlerde hem de gece stilinde tek başına dikkat çeken, koleksiyonluk bir Fendi parçasıdır.', 13000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/il_1588xN.6936945872_axcc.webp?v=1761117315']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Burberry', 'Burberry Çanta', 'Ürün Bilgisi    Renk: Siyah  Kumaş İçeriği: Deri  Editör Notları:  Bu Burberry çanta, markanın zamansız İngiliz şıklığını yansıtan klasik hobo / omuz çantası formundadır. Yumuşak dokulu siyah deri gövdesi, doğal duruşu ve günlük kullanıma uygun esnek yapısıyla öne çıkar. Ön bölümde yer alan kemer detaylı metal tokası ve altın tonlu aksesuarlar tasarıma sofistike bir vurgu katar. Geniş iç hacmi sayesinde günlük şehir hayatı, iş veya seyahat kullanımı için hem şık hem fonksiyonel bir Burberry mode', 30000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-on.jpg?v=1761116720']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Furla', 'Furla Çanta', 'Ürün Bilgisi    Renk: Kahverengi  Editör Notları: Bu Furla çanta, markanın zamansız İtalyan şıklığını yansıtan yapılandırılmış (structured) satchel formundadır. Kahverengi–ekru–siyah tonlarının dengeli birlikteliğiyle hem klasik hem modern kombinlere kolayca uyum sağlar. Üstten saplı tasarımı şık bir elde taşıma alternatifi sunarken, ayarlanabilir omuz askısı sayesinde gün boyu konforlu kullanım sağlar. Kaliteli deri dokusu ve sade metal kilit detayı, çantaya sofistike bir karakter kazandırır. O', 12000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/furla-on.jpg?v=1761114534', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/furla-oanta.jpg?v=1778673177']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Christian Louboutin', 'Christian Louboutin Çanta', 'Ürün Bilgisi    Renk: Nude/Bej:   Editör Notları: Bu Christian Louboutin çanta, markanın feminen ama güçlü çizgisini yansıtan zarif bir modeldir. Nude/bej tonlu pürüzsüz deri yapısı sayesinde zamansız ve çok yönlü bir kullanım sunar. Ön kapakta yer alan fiyonk detayı, metal perçinlerle modern bir dokunuş kazanırken, ikonik zincir askı çantaya sofistike bir hava katar. Orta boy hacmi günlük ihtiyaçlar için idealdir; omuzda ya da çapraz askılı olarak rahatlıkla kullanılabilir. Hem gündüz şıklığınd', 27599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/EkranResmi2025-10-2209.15.09.png?v=1761113757', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-1.jpg?v=1778626921', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-2.jpg?v=1778626921']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Burberry', 'Burberry Crossbody Çanta', 'Ürün Bilgisi   Renk: Siyah / Ekose detaylı   Editör Notları:  Siyah deri gövdesi, markanın ikonik ekose kumaşıyla birleşerek hem modern hem de klasik bir görünüm yaratıyor. Üst kısmındaki büzgülü detay çantaya yumuşak bir hacim ve günlük kullanıma uygun pratiklik katarken, gold Burberry logosu zarif bir vurgu sunuyor. Hem gündüz hem akşam stiline kolayca uyum sağlayan, kompakt ama fonksiyonel bir model. Üzerine hafifçe şıklık katmak isteyenler için ideal bir tamamlayıcı.   Orijinallik ve Kalite', 25000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry_little_crush_cross_body_bag_black_with_house_check_brand_new_1567517558_295feece.jpg?v=1761113518', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/crossbody1.jpg?v=1778514271', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/crossbody2.jpg?v=1778514272', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/35850228_black_1747147757374_4.webp?v=1778514270']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Elie Saab', 'Elie Saab Siyah Çanta', 'Ürün Bilgisi    Renk:Siyah  Model Adı: Top Handle Mini Bag – Patent Kapak Detaylı Eksper Puanı: Eksper Notları:', 20000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/elie-saab-on.jpg?v=1761117156', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/elie-saab-1.jpg?v=1778510612', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/elie-saab-2.jpg?v=1778510612', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/elie-saab-3.jpg?v=1778510612']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Loewe', 'Loewe Eşarp - 90x90', 'Ürün Bilgisi  Mavi  90x90 cm Etiketi mevcut değil.  Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/loewe-esarp.jpg?v=1760707395']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Maje', 'Maje Yırtmaçlı Etek - 38', 'Ürün Bilgisi    Renk: Lacivert,Beyaz   Beden: 38  Eksper Notları: Yüksek bel yapısı ve A kesime yakın uzun silueti, vücut oranlarını dengeli gösterirken boyu daha uzun algılatıyor. Kumaşı dökümlü ama formunu koruyan bir yapıda; yürürken akışkan ve zarif bir hareket yaratıyor. Ön kısımdaki ince düğme detayları, eteğe hem vintage bir dokunuş hem de dikey bir hat kazandırarak silueti daha ince gösteriyor.   Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından deta', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_0392.jpg?v=1760693506']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Yuzefi', 'Yuzefi Çanta', 'Ürün Bilgisi    Renk:Siyah  Model Adı: Yuzefi Delila Bag  Ölçüleri:    Genişlik: 24 cm   Yükseklik: 15 cm   Derinlik: 10 cm   Kısa Zincir Sap Uzunluğu: ~20 cm   Uzun Askı Uzunluğu: Ayarlanabilir, genelde 100–120 cm     Eksper Puanı: Ürünün tüm incelmesi tarafımızca yapılmıştır. Hiçbir deformesi yoktur. Ürün sıfırdır. Kondisyon Durumu 10/10   Eksper Notları: Yuzefi’nin heykelsi çizgisini taşıyan Delila modeli, modern formu ve altın halka detayıyla her kombine güçlü bir duruş katan özel bir parça.', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_0390.jpg?v=1760693243', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yuzefi1.jpg?v=1778826976', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yuzefi2.jpg?v=1778826976']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Prada', 'Prada Saffiano Çanta XL', 'Ürün Bilgisi  Renk: MaviNumara: XL Ölçüleri:    Yükseklik: ~29,0 cm   Genişlik: ~39,0 cm   Derinlik (Taban): ~15,0 cm   Kumaş: Deri Eksper Puanı: Ürünün tüm incelmesi tarafımızca yapılmıştır. Hiçbir deformesi yoktur. Ürün sıfırdır. Kondisyon Durumu 10/10Eksper Notları: markanın en ikonik deri modellerinden biridir. Yapısal formu, altın tonlu metal detayları ve üçgen Prada logosuyla klasik, güçlü ve zamansız bir duruş sunar. Saffiano deri, çizilmelere karşı dayanıklı, hafif parlak dokulu özel bir', 58000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mavi-saffiano-1.jpg?v=1778626604', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mavi-saffiano-2.jpg?v=1778626604', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mavi-saffiano-3.jpg?v=1778626604', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3538.jpg?v=1778626604']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Givenchy', 'Givenchy Antigona Çanta Medium', 'Ürün Bilgisi    Renk: Siyah  Model Adı: Givenchy Antigona Medium / Antigona Tote (Black Smooth Leather)  Orijinallik ve Kalite Kontrolü         Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 58000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/givenchy1.jpg?v=1778505948', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/givenchy2_b816e50f-55ed-4faa-aab1-cbf227733524.jpg?v=1778505948', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/givenchy3_106fc4c7-6eee-474d-a997-15dee4c44dd4.jpg?v=1778505948', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/givenchy4.jpg?v=1778505948', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/givenchy5.jpg?v=1778505948']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Chloe', 'Chloe Bordo Terlik - 39', 'Ürün Bilgisi   Renk: Bordo  Numara: 39  Eksper Notları:   Chloé’nin ikonik sade şıklığını yansıtan bu deri mule model, altın ton tokaları ve bordo rengiyle zamansız bir stil sunar. Günlük kullanımda hem konforlu hem de sofistike bir alternatif oluşturur.   Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 12000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_9429.jpg?v=1760520699']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Stella Mccartney', 'Stella McCartney Topuklu Sandalet - 38.5', 'Ürün Bilgisi    Renk:Siyah  Numara:38.5  Topuk Yüksekliği:12 cm  Editör Notları: Stella McCartney’nin ikonik Elyse serisinden bu platform sandalet, mantar detaylı tabanı ve sürdürülebilir vejetaryen deri yapısıyla modern ve güçlü bir stil sunar. Konfor ve şıklığı bir arada arayanlar için ideal.  Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapa', 20000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_9433.jpg?v=1760520971', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-mccartney-sandalet-on.jpg?v=1767189912', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-mccartney-sandalet-arka.jpg?v=1767189912']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Marni', 'Marni Loafer - 39', 'Ürün Bilgisi    Renk:Beyaz  Numara:39  Topuk Yüksekliği:5 cm  Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 16000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_9440.jpg?v=1760521422', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marni-1.jpg?v=1781514065', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marni-2.jpg?v=1781514065', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marni-4.jpg?v=1781514065', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_4022.jpg?v=1781514066', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marni-3.jpg?v=1781514067']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Topuklu Ayakkabı - 38.5', 'Ürün Bilgisi    Renk: Pudra - Beyaz  Beden: 38.5  Editör Notları:  Bu Sergio Rossi ayakkabı, markanın feminen ve sofistike tasarım dilini yansıtan slingback stiletto modelidir. Sivri burun formu ayağı zarif ve uzun gösterirken, rugan dokulu nude–bej gövdeye eşlik eden beyaz burun detayı modern bir kontrast yaratır. İnce topuğu ve arka bantlı yapısı sayesinde hem şık davetlerde hem de özel akşam kombinlerinde elegan bir duruş sunar; klasik ama iddialı bir siluet arayanlar için zamansız bir seçene', 18299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_9442.jpg?v=1760521963', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/B07620MFL290110.9565-37_2.webp?v=1777283648', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/B07620MFL290110.9565-37_4.webp?v=1777283649']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Brian Atwood', 'Brian Atwood Topuklu Ayakkabı - 38.5', 'Ürün Bilgisi    Renk: Bej  Beden: 38.5   Editör Notları:  Bu Brian Atwood topuklu ayakkabı, markanın feminen ama güçlü tasarım çizgisini yansıtan şık bir modeldir. Açık burunlu (peep-toe) formu ve ayak bileğini saran bant detayıyla ayağı zarif şekilde kavrarken, süet dokulu yüzeyi yumuşak ve lüks bir görünüm sunar. Dengeli topuk yüksekliği sayesinde hem davetlerde hem de özel akşam kombinlerinde rahatlıkla tercih edilebilir; elbise, etek ya da kumaş pantolonlarla son derece sofistike durur.   Or', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/atwood-1.jpg?v=1781618015', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/atwood-2.jpg?v=1781618015', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/atwood-3.jpg?v=1781618015', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/atwood-4.jpg?v=1781618015']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Trençkot - 40', 'Ürün Bilgisi   Beden: 40  Renk: Siyah  Editör Notları: Burberry’nin klasik çizgisini taşıyan trençkot, tam bel hattında toplanan kemeri ve çift sıra düğmeleriyle son derece derli toplu bir siluet oluşturuyor. Kollarındaki toka detayları ve iç kısmındaki ikonik desen, markanın zamansız dokunuşunu ortaya koyuyor. Mevsim geçişlerinde hafifliğiyle rahatlık sunarken, şehir hayatında hem günlük kombinlerde hem de daha özenli görünümlerde şıklığı kolayca tamamlayan bir parça.   Orijinallik ve Kalite Ko', 16000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-trenc-on.jpg?v=1760520369']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Mavi Pantolon-26', 'Ürün Bilgisi    Renk: Mavi  Beden: 26  Editör Notları:  Bu Prada jean pantolon, markanın zamansız ve minimalist tasarım anlayışını yansıtan klasik straight / regular fit bir modeldir. Orta bel kesimi ve düz paça formu sayesinde vücutta dengeli bir duruş sunarken, kaliteli pamuklu denim kumaşı ile konfor ve dayanıklılığı bir arada sağlar. Sade detayları ve temiz çizgileriyle hem günlük kombinlerde hem de daha rafine üstlerle kolayca kullanılabilen, Prada’nın modern ama uzun ömürlü denim parçaları', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/EkranResmi2025-10-0711.28.34.png?v=1759825736']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Punto', 'Punto Kürk Vizon - 36', 'Ürün Bilgisi    Renk: Vizon  Beden: 36  Editör Notları: Punto, kürk işçiliğinde İtalyan geleneklerini sürdüren bir marka olup, her bir parça el işçiliğiyle üretilir. Punto, genellikle doğal kürk malzemeleriyle ürettiği ürünleriyle tanınır. Modern ve şık görüntüsüyle her ortamda dikkat çeker.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabili', 26799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/punto-vizon-renk-36-beden-kurk-adc6-0.jpg?v=1735926972']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Agolde', 'AGOLDE Mavi Pantolon- 25', 'Ürün Bilgisi    Renk: Mavi  Beden: 25 (34-36)  Editör Notları:  AGOLDE’nin 90’lar ilhamlı Pinch Waist modeli, yüksek bel yapısı ve düz paça kesimiyle zamansız bir siluet sunar. Açık mavi yıkaması sayesinde hem günlük hem de şehir stiline kolayca uyum sağlar. Belden oturan formu vücut hatlarını dengelerken, paçaya doğru düz inen kesimi rahat ve modern bir duruş yaratır. Minimal, güçlü ve uzun ömürlü bir denim parçasıdır.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarım', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/EkranResmi2025-10-0711.40.34.png?v=1759826532']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Celine', 'Celine Omuz Çantası', 'Ürün Özellikleri    Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler , uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 43500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/WhatsAppImage2025-10-07at09.57.26_2.jpg?v=1759820621', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sc-2205-0074_1000x_44c38ac6-0552-4b15-9c1b-856741e006cb.webp?v=1768375535', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sc-2205-0074__1_1000x_b2113a96-f64c-4e0e-ab4d-6c6b226a35b8.webp?v=1768375535', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sc-2205-0074__2_1000x_7a05fa5a-d879-4bfc-bed6-8b17c7658ff8.webp?v=1768375535', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sc-2205-0074__3_600x_d75da63c-fa89-4416-b77f-c784383fa8c7.jpg?v=1768375536', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sc-2205-0074__4_600x_a478018d-6916-4ac7-9e5f-0919f5196f50.webp?v=1768375535']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi Gri Etek - 38', 'Ürün Bilgisi    Renk:  Fıstık Yeşili/Koyu Yeşil   Beden: 38(italyan)  Ölçü: Boy:80 cm Bel: 34 cm  Materyal: Yün  Editör Notları: Rejina Pyo imzalı, iki farklı dokuyu bir araya getiren asimetrik etek. Zeytin tonlarındaki düz panel yapı, tasarıma mimari bir sadelik katarken; yan tarafta yer alan açık yeşil pliseli parça eteğe hareket ve derinlik kazandırıyor. Üst bölümdeki büyük metal tokalı kemer detayları, markanın heykelsi ve yenilikçi duruşuna gönderme yapıyor. Kontrast dokuların harmonisi say', 14500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi1.jpg?v=1781099062', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi2_6bf6f21c-d7e9-48c6-9040-dc7fc865ebae.jpg?v=1781099062']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Rejina Pyo', 'Rejina Pyo Yeşil Etek-32', 'Ürün Bilgisi    Renk:  Fıstık Yeşili/Koyu Yeşil  Beden:  32  Ölçü: Boy: 82 cm Bel: 32 cm  Kumaş İçeriği: %50 viskon, %50 polyester   Eksper Notları: Rejina Pyo imzalı, iki farklı dokuyu bir araya getiren asimetrik etek. Zeytin tonlarındaki düz panel yapı, tasarıma mimari bir sadelik katarken; yan tarafta yer alan açık yeşil pliseli parça eteğe hareket ve derinlik kazandırıyor. Üst bölümdeki büyük metal tokalı kemer detayları, markanın heykelsi ve yenilikçi duruşuna gönderme yapıyor. Kontrast dok', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_9282_5fa117bb-1ea1-459a-a324-6dfe8613d2a2.webp?v=1759742155']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Makyaj Çantası', 'Ürün Bilgileri  Kahverengi Deri 27x18 cm Kullanılmış. Üstünde belli belirsiz bir leke ve iç astarında logo altında bir yapışkan leke mevcuttur.    Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 15600.8, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-clutch-on.jpg?v=1754583928', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-clutch-yan_2fd42d23-0736-4541-9306-92ec2132d9c9.jpg?v=1754583927', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-clutch-arka_79e759e3-25fd-4a8c-b011-b5ed54851762.jpg?v=1754583927', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-clutch-detay.jpg?v=1754583927']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi Kahve-Lacivert Etek- 34', 'Ürün Bilgisi    Renk:Siyah/Kahverengi   Beden:38 (İtalyan) /34 Etiketli Ürün   Editör Notları: Kahverengi–lacivert dikey ve diyagonal çizgilerin bir arada kullanıldığı, drape detaylı bir etek. Bel kısmı daha düz bir formdayken, alt bölümdeki asimetrik drapeler eteğe modern ve zarif bir hareket kazandırıyor. Vücuda oturan, midi boya yakın siluetiyle hem ofis kombinlerine hem daha iddialı akşamlara kolay uyum sağlayan şık bir model.  Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler,', 15000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-etek.jpg?v=1759738514']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Max Mara', 'Max Mara Kazak Krem - M', 'Ürün Bilgisi    Renk: Bej   Kumaş: Kaşmir   Eksper Puanı: Hiçbir deformesi bulunmamaktadır. 10/10   Eksper Notları: Açık krem / bej tonundaki rengi son derece soft ve sofistike; koyu renklerle kontrast yaratabilir, ton sür ton kombinlerde ise çok zarif bir bütünlük sağlar. Kumaş pantolonlar, etekler ya da jean’lerle kolayca uyum sağlar; ceket veya kaban altına da rahatlıkla giyilebilir.   Genel olarak bu ürün; sade ama kaliteli, günlük kullanıma çok uygun, aynı zamanda şık ortamlara da taşınabil', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maxmara-kapuson-on_e8579a14-c04f-4b28-afa0-bb6e9080353b.jpg?v=1759483298']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Prada', 'Prada Çanta', 'Ürün Bilgisi    Renk: Siyah  Kumaş: Nylon  Editör Notları: Bu model, Prada’nın ikonik naylon mirasını yeniden yorumlayan Prada Re-Edition 2005 Nylon çantasıdır. Hafif, suya dayanıklı ve günlük kullanıma çok uygun olan teknik naylonu; modern bir zincir detay ve çıkarılabilir mini pouch ile birleştirir. Siyah rengi, gümüş metal aksesuarlı üçgen logo plakası ve çok yönlü askı kombinasyonu sayesinde hem spor hem şehir şıklığına uyum sağlar. Omuzda ya da çapraz takılabilmesi, küçük eşyalar için ek mi', 50000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cq5dam.web.hebebed.2400.2400_5.avif?v=1768460789', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cq5dam.web.hebebed.2000.2000.avif?v=1768460789', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cq5dam.web.hebebed.2400.2400_7.avif?v=1768460798', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cq5dam.web.hebebed.2400.2400_6.avif?v=1768460798']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Michael Kors', 'Michael Kors Kahve Çanta', 'Ürün Bilgisi    Renk: Kahverengi   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/M.webp?v=1767953676']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Christian Dior', 'Christian Dior Çanta -Dior CD Camera Bag (Black Grained Calfskin)', 'Ürün Bilgisi   Renk: Siyah  Boyut: Small  Editör Notları: minimal tasarımı ve ikonik CD logosuyla günlük şıklığı zamansız bir çizgide sunar. Grenli dana derisi yapısı ve çift fermuarlı bölmesiyle hem fonksiyonel hem de sofistike bir kullanım sağlar.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 47299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_9130.webp?v=1759387572', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-1.jpg?v=1778672605', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-2.jpg?v=1778672605']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Gucci', 'Gucci Çanta', 'Ürün Bilgisi    Renk: Siyah  Boyut: Small  Editör Notları: Gucci’nin ikonik Emily modeli, Guccissima kabartmalı deri dokusu ve Horsebit detayıyla zamansız bir şıklık sunar. Zincir askısı ve püskül detayıyla hem günlük hem akşam kombinlerine sofistike bir dokunuş katar.   Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 39000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/guccisima1.jpg?v=1778669643', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/guccisima2.jpg?v=1778669644', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/guccisima3.jpg?v=1778669644', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/guccisima-4.jpg?v=1778669644']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alexachung', 'Alexachung Yeşil Ceket- 34', 'Ürün Bilgileri  Renk:Yeşil Beden:34  Kumaş İçeriği:93% Cotone 7% Elastane  100% Vıscosa  Eksper Notları:Zamansız bir duruşa sahip olan bu AlexaChung ceket, double-breasted (çift düğmeli) yapısı ve güçlü omuz hattıyla modern klasik çizgiyi mükemmel şekilde yansıtıyor. Bele doğru hafifçe daralan kalıbı, silueti zarifçe toparlayarak feminen bir form yaratıyor.Derin koyu tonuyla hem iş ortamında profesyonel bir görünüm sunuyor hem de akşam davetlerinde sofistike bir tamamlayıcıya dönüşüyor. Minimal', 8500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alexachung-ceket-on_4bbc9e04-8923-41c0-a69b-79de6f9a827e.jpg?v=1759242949']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'All Saints', 'All Saints S Beden  Elbise', 'Ürün Bilgileri   Renk: Desenli  Beden: Small  Ölçü: Boy:98 cm, Bel: 30 cm  Materyal: %100 polyester  Editör Notları:  Zarif ve modern bir duruş sunan bu leopar desenli elbise, hafif dökümlü kumaşı ve asimetrik etek kesimiyle hareketli bir silüet yaratıyor. Bel kısmındaki toparlayıcı form, vücuda oturarak feminen bir görünüm sağlarken V yaka detayı şıklığı tamamlıyor. Günlük şıklıkta da, akşam kombinlerinde de rahatlıkla kullanılabilir.   Orijinallik ve Kalite KontrolüPeony Collective''de tüm ürün', 5500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/all-saint-elbise-on.jpg?v=1759243277']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'The Kooples', 'The Kooples Siyah Ceket- 34', 'Ürün Bilgileri  Renk:Siyah Beden:34   Editör Notları: The Kooples’un karakteristik rock-romantik stilini yansıtan bu kısa ceket, jakarlı desenli kadife dokusuyla güçlü ve sofistike bir görünüm sunar. Çift sıra düğme detayı, omuzlardaki işlemeli apolet dokunuşları ve yapılandırılmış formu ile maskülen-feminen dengesi kurar. Kısa boyu sayesinde bel hattını vurgulayan, iddialı ama zamansız bir parçadır.   Orijinallik ve Kalite KontrolüPeony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/the-kooples-ceket-on.jpg?v=1759243208']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Christian Dior', 'Christian Dior Lacivert Ceket-34', 'Ürün Bilgileri   Renk:  Siyah/Beyaz Kumaş:100% İpek  Editör Notları: 34Dior’un moda tarihine yön veren "New Look" akımının en ikonik simgesi olan bu Bar Jacket, markanın terzilik sanatındaki ustalığını ve zamansız zarafetini temsil eden bir başyapıttır. İlk kez 1947 yılında tanıtılan bu model, kum saati silüetini vurgulayan daraltılmış beli ve kalçayı hafifçe dolgun gösteren heykelsi yapısıyla kadının feminen hatlarını mükemmel bir dengeyle ön plana çıkarır. Dior’un mirasıyla özdeşleşen siyah-be', 27999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-ceket-arka_bfbe89f0-8580-4f90-a9ba-7fcefce17faf.jpg?v=1759243390']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Altuzarra', 'Altuzarra Hardal Sarısı 34 Beden Ceket', 'Ürün Bilgileri  Renk:Kahve Beden:38(İtalyan) Editör Notları:Klasik ekoseyi modern bir siluetle buluşturan bu Altuzarra ceket, zamansız şıklığın güçlü bir temsilcisi. Bele doğru incelen kalıbı, vücut hattını zarifçe ortaya çıkarırken kusursuz bir duruş sağlıyor. Yapısı sayesinde hem iş ortamında profesyonel bir görünüm yaratıyor hem de akşam etkinliklerinde sofistike bir tamamlayıcıya dönüşüyor. Canlı kahve tonları ve özenli dikiş detaylarıyla gardıroba karakter katan, çok yönlü ve fonksiyonel bi', 9599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hardal-ceket.jpg?v=1759386740', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/CEKET.jpg?v=1767601929', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/c.jpg?v=1767602126']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Kırmızı Kazak- M', 'Ürün Bilgisi  Renk:Kırmızı Beden:38 beden Kumaş İçeriği:85% coton 15% cachemıre Editör Notları:Louis Vuitton yazısıyla öne çıkan bu kazak, enerjik bir tasarım anlayışı sunuyor. Düzenli örme yapısı ve fit formu sayesinde hem rahat hem de derli toplu bir duruş sağlıyor. Mavi tonlu yazı detayı kazakta güçlü bir kontrast etkisi oluşturuyor.Yumuşak dokusu ve pratik formu sayesinde gündelik kullanım için son derece uygun. Şehir içinde, ofis günlerinde veya günlük programlarda kolayca tercih edilebilec', 13499, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-kazak-kirmizi-on_ec258a2f-b2eb-4067-92db-dd8e93260f43.jpg?v=1759243249']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Sandro', 'Sandro Siyah Kazak-36', 'Ürün Bilgileri  Renk :Siyah Beden: 36   Kumaş İçeriği: %100 pamuk  Editör Notları: Sandro imzalı, tamamen siyah tonlarda tasarlanmış romantik detaylı bir triko. Göğüs bölümünde lazer kesim aplikeler ve minik ışıltılarla zenginleştirilmiş dekoratif panel yer alıyor; panelin etrafını saran kat kat fırfır detayları parçaya feminen bir hareket katıyor. Yüksek, büzgülü yaka hem zarif hem de karakteristik bir duruş sağlarken, trikonun gövdesi daha sade tutularak üstteki işçiliğin öne çıkması sağlanmış', 3999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sandro-kazak-on.jpg?v=1759243186']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Brunello Cucinelli', 'Brunello Cucinelli Bej Kazak-36', 'Ürün Bilgisi  Renk:bej Beden:36 Tasarım:şerit detaylı  Kumaş İçeriği:67%Mohair 20%Yün13%viskoz Editör Notları:Doğal bej tonuyla öne çıkan bu kazak, yumuşak dokusu ve düzenli örme yapısıyla sakin ve modern bir görünüm sunuyor. Göğüs hizasındaki yatay renk bloğu tasarıma hafif bir kontrast etkisi ekleyerek parçayı sade ama karakterli bir hale getiriyor. Fit olmayan rahat formu sayesinde gün içinde konfor sağlar. Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır.kullanım yıpranmaları vardır', 5599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/brunello-cucinelli-kazak-on.jpg?v=1759243232']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi Pudra Renk 12+  Kazak', 'Ürün Bilgisi  Renk:Pudra Beden:12+ Tasarım:Kapişon monogram detaylı Kumaş İçeriği:88% YÜN Editör Notları:Pudra tonunun yumuşak etkisini modern bir kesimle buluşturan bu üst, kısa formu ve kapüşon detayıyla güncel bir görünüm sunuyor. Düz örgü yapısı konforlu bir hissiyat sağlarken, kol ucu ve kapüşondaki ince desen detayları tasarıma sakin ama karakterli bir dokunuş ekliyor. Eksper Puanı:Ürünün tüm incelemesi tarafımızca yapılmıştır.kondisyon durumu 10%10    Orijinallik ve Kalite KontrolüPeony C', 6999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-kazak-on_d9fa7eb6-862e-4c7e-b7a0-7bc94e4f31c7.jpg?v=1759243055']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Fendi', 'Fendi Lacivert Bluz-34', 'Ürün Bilgisi  Renk:Lacivert Beden:38 Editör Notları:Minimal tasarımına rağmen göğüs kısmındaki logo detayı ürüne güçlü bir karakter katıyor. Şehir içinde, günlük kombinlerde veya spor-şık bir görünümde kolayca kullanılabilen çok yönlü bir parça. Gardıropta hem pratik hem de markalı bir üst arayanlar için ideal bir seçenek.  Orijinallik ve Kalite KontrolüPeony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulu', 12000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-body-on.jpg?v=1759243082']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Isabel Marant', 'Isabel Marant Kırmızı-Pembe Kazak-34', 'Ürün Bilgileri  Renk:Pembe  Kumaş İçeriği: 67% süper çocuk tiftik 28%poliamid ve  5% ekstra ince yün Beden: 34   Editör Notları:  Kırmızıdan fuşyaya doğru yumuşak geçişlerle boyanan degrade bir triko. Hafif tüylü dokusu ve loş ton geçişleri sayesinde sıcak, cozy bir görünüm sunuyor. Omuzdan kola doğru hafif hacimli formu, gövdede ise daha toparlayan bir kesimi var. Renk efektinin verdiği hareket sayesinde jean, deri pantolon ya da sade eteklerle kolayca yükselen, iddialı ama kullanımı rahat bir', 3999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/isabel-kazak-on.jpg?v=1759239523']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Sacai Luck', 'Sacai Luck Siyah Bluz-36', 'Ürün Bilgileri  Renk: Siyah Kıyafet İçeriği: 100% Coton  Beden: 36  Eksper Puanı: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır. İç etiketi mevcut değildir. 9/10   Eksper Notları : Siyah tonlardaki bu zarif bluz, dantel şerit panelleri ve hafif transparan detaylarıyla romantik bir siluet sunuyor. Yüksek yaka kısmındaki minik düğmeler, tasarıma klasik bir dokunuş katarken gövde boyunca uzanan dantel işçilik parçayı modern ve feminen bir çizgiye', 5199, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sacai-goomlek-on_c24a3ff6-397f-4239-8799-f6f1d6ef0085.jpg?v=1759243538']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alice And Olivia', 'Alice&Olivia Krem Etek- 34', 'Ürün Bilgileri  Renk: Krem Kumaş İçeriği:100% Kuzu derisi  Ölçü: Bel: 34 cm Boy: 80 cm Beden: 34  Eksper Notları: Açık krem tonundaki bu midi etek, minimal ve zamansız bir siluete sahip. Üst kısımda daha oturan bir form sunarken, etek ucuna doğru hafifçe genişleyerek doğal bir A-kesim oluşturuyor. Temiz çizgileri, dikiş detayları ve akışkan dokusu sayesinde hem günlük kombinlerde hem daha özenli görünümlerde kolaylıkla kullanılabilecek, sofistike bir parça.      Orijinallik ve Kalite KontrolüPeo', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sari-etek-on.jpg?v=1759243168']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Mavi-Beyaz Kazak-36', 'Ürün Bilgisi  Renk:Mavi-Beyaz   Beden:36 Tasarım:Monogram desen Kumaş İçeriği:100% yün Eksper Notları:Yumuşak dokusuyla gündelik kullanım için son derece uygun. Şehir içinde, ofis ortamında ya da günlük programlarda kolayca tercih edilebilecek çok yönlü bir parça. Gardıropta hem konforlu hem de marka imzası taşıyan alternatif arayanlar için ideal bir seçim. Eksper Puanı:Ürünün tüm incelemesi tarafımızca yapılmıştır. kondisyon durumu 10%10    Orijinallik ve Kalite KontrolüPeony Collective''de tüm', 9999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-kazak-on1.jpg?v=1759231212']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alice And Olivia', 'Alice Olivia Siyah-Beyaz Kazak 36 Beden', 'Ürün Bilgisi    Renk: Siyah - Beyaz  Beden: 36   Kumaş İçeriği : %98 yün %2 elastan   Eksper Notları : Siyah desen üzerindeki swarovski taşlar ürüne zerafet ve boyut kazandırmıştır. Yumuşacık dokusu konforu ve kaliteyi bir arada hissettiriyor. Hem spor hem şık davetlerde rahatlıkla kullanabileceğiniz zamansız bir parça.    Editör puanı:  Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır. 10/10   Orijinallik ve Kalite Kontrolü Peony Collective’de tü', 4999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Alice-olivia-kazak-on.jpg?v=1759319947']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Johanna Ortiz', 'Johanna Ortiz Yeşil Etek Bluz Takım- 34', 'Ürün Bilgisi    Renk: Yeşil  Beden: 34   Editör Notları:  Bu Johanna Ortiz takım, markanın doğadan ilham alan romantik ve sofistike estetiğini yansıtan desenli bluz + pliseli etek kombininden oluşur. Yeşil zemin üzerindeki egzotik floral ve hayvan motifleri, güçlü ama feminen bir siluet yaratırken; balon kol detaylı bluz ve yüksek bel, akışkan pliseli etek birlikte zarif bir denge sunar. Günlük şıklıkla özel davetler arasında rahatlıkla kullanılabilen bu model, Johanna Ortiz’in imza bohem-lüks ç', 17250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/johanna-ortiz-takim.jpg?v=1759319970']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tory Burch', 'Tory Burch Siyah-Mor Kazak- S', 'Ürün Bilgisi    Renk: Siyah/Turuncu/Mor  Beden: Small  Kumaş İçeriği: %41 viskon %45 Yün ve %14 polyemit  Editör Notları: Tory Burch imzalı, grafik etkisi yüksek bir triko. Turuncu, siyah ve mor tonlarının blok geçişleri üzerine yerleştirilmiş beyaz ilustratif figür detayı parçaya sanatsal bir vurgu katıyor. Kontrast renkli uzun kollar ve etek ucundaki çift çizgili ribana bitişi, kazağa sportif ama sofistike bir denge getiriyor. Yaka kısmında markanın özgün etiketinin yer alması da parçanın orij', 3599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-burch-1.jpg?v=1777901614', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-burch-kazak-on1_2ac9d72a-e4c1-4384-a29d-d32c5604e1e3.jpg?v=1759320026', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-burch-2.jpg?v=1777901614']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Zimmermann', 'Zimmermann Açık Mavi Kazak- 34', 'Ürün Bilgisi    Renk:  Açık Mavi   Beden: 0   Kıyafet İçeriği:  %100 Merinos Yünü   Eksper Puanı:  Ürünün tüm incelemeleri tarafımızdan yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır.  10/10    Editör Notları :  Zimmermann''ın imzası olan romantik dokunuşu taşıyan bu mavi örgü kazak, omuzlardaki fırfır detaylarıyla feminen bir şıklık sunuyor. Kalınlık oranı sayesinde sıcak tutarken, uygun kalıp silueti zarifçe vurguluyor. Günlük stile bir dokunuş katmak isteyenler için idealdir.', 6999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/zimmermann-kazak-on.jpg?v=1759319992']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Sandro', 'Sandro Mavi Kazak- 36', 'Ürün Bilgisi    Renk: Mavi   Beden :36   Kumaş İçeriği: %73 Viskon, %23 naylon ve %4 Elastan  Editör Notları: Bebe mavisi tonunda, ince dokulu bir triko. Göğüs kısmındaki “Freedom” yazısı, kontrast lacivert işleme formunda tasarlanmış ve parçaya enerjik bir karakter katıyor. Vücuda oturan silueti, yuvarlak yaka detayı ve temiz bitişleriyle hem jean’lerle hem de daha klasik altlarla kolayca eşleşebilen, modern bir basic.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımı', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/freedom-kazak-on_01050c47-de6a-4166-8fd1-d328807d6221.jpg?v=1759318629']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Set Urban', 'Set Urban Deluxe Siyah Ceket- 34', 'Ürün Bilgisi   Renk:Siyah  Beden:34  Editör Notları:Siyah derinin keskin duruşunu metal perçin detaylarıyla birleştiren bu ceket, modern ve karakterli bir görünüm sunuyor. Kısa formu ve asimetrik fermuar yapısı, klasik biker çizgisini daha güncel ve düzenli bir siluete taşıyor. Omuz ve gövde boyunca yerleştirilen metal dokunuşlar tasarıma güçlü bir ifade katarken, ön kısımdaki küçük gül nakışı cekete özgün bir imza ekliyor.Şehir yaşamında günlük kullanım için rahatlıkla tercih edilebilecek bir p', 7999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/deri-ceket-on1.jpg?v=1759318692']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK', 'Diğer', 'Diğer', 'Balenciaga', 'Balenciaga Erkek T-shirt - XS', 'Ürün Bilgisi   Erkek   Beden: xs   Renk: Beyaz   Tasarım :Yaka detaylı   Kumaş İçeriği: %100 Pamuk   Eksper Notları: Balencıaga imzalı ,beyaz''ın sadeliği ile düşük omuz modasıyla , oversize kol tipi, kullanışlı biçimi kusursuz kalıbı ,boy kısmı yaka detaylı, modern graffiti detaylı tişört.   Eksper Puanı: Ürünün tüm incelemesi tarafımızca yapılmıştır. 10/10   Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknoloj', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sbIbzQjnjvvVsReeFKFOKLNb77kjEwRBHQDe6lh8-1366x2048.jpg?v=1758918965']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci İpek Şort- 40', 'Ürün Bilgisi   Renk:Renkli   Beden : 40   Editör Notları: Gucci’nin ikonik desen anlayışını yansıtan bu ipek şort, turkuaz zemin üzerindeki canlı floral baskısıyla yaz stiline sofistike bir enerji katıyor. %100 ipek kumaşı sayesinde hafif, akışkan ve nefes alabilir bir yapı sunarken; lastikli ve bağlamalı bel detayı gün boyu konforlu bir kullanım sağlıyor. Tatil kombinlerinden şehir şıklığına kadar geniş bir kullanım alanına sahip olan bu parça, basic tişörtlerden ipek gömleklere kadar pek çok ü', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blue-silk-gucci-shorts-58933544-1_2_c64b5017-c604-4496-a266-9179a28735bc.webp?v=1758918820']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Dolce & Gabbana', 'Dolce & Gabbana Denim-Siyah Şapka', 'Orijinallik ve Kalite KontrolüPeony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ac3jvonr.eie_IMG_26_2110082203249_325_451_210b244b-f3ec-43d9-8b4e-9e16a42a53b1.jpg?v=1758918653']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Mavi Topuklu Terlik - 39', 'Ürün Bilgisi    Renk: Mavi  Beden: 39  Güncel satış fiyatı : 43.320 ₺    Editör Notları:  Bu Louis Vuitton topuklu terlik, markanın ikonik Monogram desenli denim kumaşıyla tasarlanmış, modern ve feminen bir modeldir. Açık burunlu ve arkası açık mule formu sayesinde yaz ayları için ferah bir kullanım sunarken, kalın topuğu hem rahatlık hem de dengeli bir duruş sağlar. Açık mavi tonları tasarıma yumuşak ve sofistike bir hava katarken, şehir şıklığından tatil kombinlerine kadar geniş bir kullanım a', 15000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/terlik-yeni.jpg?v=1758916002']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Cartier', 'Cartier İpek Eşarp - 90x90', 'Açıklama  Krem, desenli Cartier eşarp, her kombininize uyum sağlar.       Öne Çıkan Özellikler     Tasarım: Desenli.   Malzeme: %100 İpek.   Renk: Krem.   Beden: 90x90      Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 7500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1103.jpg?v=1758609106']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Kıyafet', 'Elbise', 'Ralph Lauren', 'Ralph Lauren Pembe Kız Çocuk Elbise- 6 Yaş', 'Ürün Bilgisi    Renk: Pembe  Beden: 6 Yaş  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 850, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pembe1.jpg?v=1776070264']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Kırmızı 8 Yaş Çocuk T-shirt', 'Ürün Bilgisi    Beden: 8 yaş  Renk:Kırmızı Unisex Güncel Satış Fiyatı :5.250 ₺  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 850, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/WhatsAppImage2025-09-22at13.15.32.jpg?v=1758536154']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gucci', 'Gucci Beige Leather Taryn Peep Toe Ankle Strap Topuklu Ayakkabı - 36.5', 'Ürün Bilgisi    Renk: Bej  Beden: 36.5  Topuk Boyu: 13 cm  Editör Notları:  Bu Gucci topuklu ayakkabı, markanın feminen ve iddialı tasarım çizgisini yansıtan, yüksek ince topuklu ve platformlu sandalet modelidir. Nude tonlu deri yapısı sayesinde bacağı uzun ve zarif gösterirken, burun kısmındaki pileli (plissé) detay ve ayak bileğini saran ince kayış tasarıma sofistike bir hareket katar. Yüksek topuğa rağmen platform tabanı denge sağlar; özel davetler, gece kombinleri ve şık elbiselerle güçlü bi', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_9380.jpg?v=1758182765']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Yves Saint Laurent', 'Yves Saint Laurent ( YSL ) Çanta', 'Ürün Bilgileri  Kahverengi iç cepli 20x15 cm   Orijinallik ve Kalite KontrolüPeony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 38000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_8706.webp?v=1758018032', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-canta-suet-yan.jpg?v=1768457989', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-suet-canta-arka.jpg?v=1768457988', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-suet-canta-uzak.jpg?v=1768457988']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Chloe', 'Chloe Topuklu Ayakkabı- 36 Numara', 'Ürün Bilgisi    Renk: Nude  Beden: 36  Topuk Yüksekliği: 9 cm  Editör Notları:  Bu Chloé topuklu ayakkabı, markanın sade ama feminen çizgisini yansıtan zamansız bir modeldir. Yumuşak dokulu deri yapısı ve nude/bej tonu, ayağı zarif gösterirken bacağı daha uzun ve ince bir silüette sunar. Hafif sivri burun formu modern bir duruş kazandırır; ne çok iddialı ne de klasik kalır. Gün boyu şık ofis kombinlerinden akşam davetlerine kadar rahatlıkla uyarlanabilen, minimal ve sofistike bir parça olarak ön', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chloe-topuklu-on.jpg?v=1757665893']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Stella Mccartney', 'Stella McCartney Shaggy Deer Falabella Mini Crossbody Çanta', 'Ürün Bilgisi   Siyah  Gold detaylı  Genişlik : 22 cm  Yükseklik : 13 cm  İç cep   Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 25000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-on_875967f0-a737-402c-b983-4d17ba0fc9cf.jpg?v=1757574608']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Louis Vuitton', 'Louis Vuitton Monogram Canvas Bosphore Messenger Çanta', 'Ürün Bilgileri  Kahverengi Monogram desen 25x25 cm İki fermuarlı göz    Orijinallik ve Kalite KontrolüPeony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 28299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Louis-Vuitton-Monogram-on.jpg?v=1757572649']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Louis Vuitton', 'Louis Vuitton Amarante Monogram Vernis Alma GM Burgundy Çanta', 'Ürün Bilgisi    Renk:Bordo    Ölçü:Genişlik : 38.5 cm ,En : 18 cm  ve Yükseklik : 29 cm   Çanta Hikayesi:  Model, aslında Coco Chanel için Louis Vuitton tarafından özel bir sipariş olarak tasarlanmıştır. O dönem Chanel, kullanışlı ama şık bir günlük çanta istiyordu — hem şehirde rahat taşınabilecek hem de hatları temiz, yapı olarak modern bir şey… Louis Vuitton’un o dönemdeki yaratıcı ekibi, Chanel’in bu talebine yanıt olarak “Squire” isimli bir prototip çanta tasarladı. Bu tasarım daha sonra ge', 42500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-pm-on.jpg?v=1757572448', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3527.jpg?v=1778625966', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alma-1.jpg?v=1778625965', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alma-2.jpg?v=1778625965']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Dior', 'Christian Dior Beyaz Sneaker- 38.5 Numara', 'Ürün Bilgisi    Renk: Beyaz  Numara: 38.5   Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 17899, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dioryenisneaker.jpg?v=1757494400']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Celine', 'Celine Symmetrical Deri Çanta Nar çiçeği', 'Açıklama Fransız lüks moda markası Celine''in 2015 yılına ait Simetrik Çanta modeli, ayarlanabilir uzun deri omuz askısı ve altın tonlu detaylar ile hem omuzda hem de çapraz olarak mevcuttur. İki ayrı bölmeli akordeon yapısıyla günlük kullanım için ideal; Eşyalarınızı düzenli bir şekilde taşımanızı sağlar. Kırmızı deri astarı, fermuarlı iç cep ve küçük ek cepleriyle şıklık ve pratiklik sunuyor.  Öne Çıkan Özellikler   Malzeme: deri.   Renk: Nar çiçeği.  Beden: U zunluk 22,5 cm, genişlik 11 cm, yü', 25600, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-1_6f2cf01d-d132-4804-98c7-3b59aa856b66.jpg?v=1778672294', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-2_27b7e322-392d-4030-96f0-74eb0dcc224f.jpg?v=1778672294', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-3.jpg?v=1778672294', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-nar-cicegi-renk-standart-beden--7-3a71.jpg?v=1735927797']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Chanel', 'Chanel Siyah Renk 37 Beden Çizme', 'Ürün Bilgisi  Siyah  Beden 37 Topuk yüksekliği 9 cm Marka sembolü Made in Italy Tabanında metal rengi zincir detayları   Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 19799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-cizme-on.jpg?v=1760943139']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Dolce & Gabbana', 'Dolce & Gabbana Portofino Deri Sneaker Beyaz - 38', 'Ürün Bilgisi    Renk: Beyaz  Numara: 38  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/DOL.jpg?v=1767948546', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/D.jpg?v=1767948546']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Marc Jacobs', 'Marc Jacobs Siyah Çanta', 'Ürün Bilgisi   Renk: Siyah   Editör Notları: Sade ama karakterli tasarım anlayışını yansıtan minimal ve zamansız bir modeldir. Yumuşak dokulu siyah deri yapısı çantaya doğal ve akışkan bir form kazandırırken, ön kısımdaki büzgü bağcık detayı tasarıma modern bir hareket katar. Tek omuz askılı yapısı sayesinde konforlu bir kullanım sunar. Orta boy iç hacmi günlük ihtiyaçlar için ideal olup, şehir hayatında zahmetsiz şıklık arayanlar için güçlü bir tamamlayıcıdır. Hem gündüz hem akşam kombinlerine', 13750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marc-jacobs-siyah-on.jpg?v=1756992745']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Marc Jacobs', 'Marc Jacobs Taba   Çanta', 'Ürün Bilgisi    Renk: Taba   Editör Notları:  Bu Marc Jacobs çanta, markanın modern ve fonksiyonel tasarım anlayışını yansıtan deri omuz / crossbody çanta modelidir. Yumuşak dokulu granüllü kahverengi deri yapısı günlük kullanıma dayanıklılık sağlarken, ön yüzdeki minimal dikiş detayları ve sade siluet zamansız bir şıklık sunar. Ayarlanabilir, desenli askısı sayesinde hem omuzda hem çapraz kullanılabilir; bu da çantayı gün boyu konforlu ve pratik hale getirir. Günlük şehir kombinlerinden casual', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marc-jacobs-taba-on_8a4d971d-90ee-413e-8994-7d1db9fe8308.jpg?v=1756992677']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Tory Burch', 'Tory Burch İpek Eşarp', 'Ürün Bilgisi    Renk: Siyah - Beyaz  Ölçü: 90x90  Kumaş İçeriği: İpek   Editör Notları:  Bu Tory Burch eşarp, markanın ikonik Double-T logosunu merkezine alan grafik ve modern bir tasarıma sahiptir. Siyah-beyaz renk paleti ve optik çizgili desen, güçlü ve zamansız bir görünüm sunarken; kare formu sayesinde boyunda, saçta, çantada ya da aksesuar olarak çok yönlü kullanım sağlar. Minimal ama iddialı tarzı ile günlük kombinlerden şık şehir stillerine kadar rahatlıkla uyum sağlayan imza bir Tory Bur', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_8393.jpg?v=1756907335']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Burberry', 'Burberry Eşarp', 'Ürün Bilgisi   Renk: Krem,Lacivert,Mavi  Editör Notları: Burberry eşarp, farklı boyutlarda yerleştirilmiş grafik baskılarıyla mozaik etkisi yaratan özgün bir tasarıma sahip.Siyah, gri ve turkuaz tonlarının birleşimi parçaya hem modern hem de koleksiyonluk bir hava katıyor. Büyük ölçüsü sayesinde boyunda, çantada ya da omuzda kolayca kullanılabiliyor   Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberryesarp.jpg?v=1756823671']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Loafer', 'Ürün Bilgisi   Siyah  38.5 Numara   Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlar tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garntisi sunulur. Güvenle alışveriş yapabilirsiniz.', 19999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-loafer-ust.jpg?v=1756381892']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Dior', 'Christian Dior Sneaker - 39', 'Ürün Bilgisi   Ten rengi  39 Numara  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 16799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-sneaker-yan.jpg?v=1756381262']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Christian Dior', 'Christian Dior Dway Slide - 38.5', 'Ürün Bilgisi   Lacivert 38.5 Numara Güncel satışı  var.  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 24500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-terlik-on_f97d7acd-3e1f-4d93-91fd-0c1bfe92cb3b.jpg?v=1756380560']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Kenzo T-Shirt', 'Ürün Bilgisi   XXL beden  Gri   Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 20000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Louis-Vuitton-Tisort-On.jpg?v=1767168464', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Louis-Vuitton-Tisort-Arka.jpg?v=1767168463']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tory Burch', 'Tory Burch Cüzdan', 'Ürün Bilgisi    Renk: Siyah/Renkli  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler , uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-burch-cuzdan.jpg?v=1756108796']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Burberry', 'Burberry Kol Çantası', 'Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 9750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Michael-kors-kol-cantasi.jpg?v=1756107284']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Bottega Veneta', 'Bottega Veneta Mini Intrecciato Leather Bag', 'Ürün Bilgisi    Renk: Yeşil  Boyut: Mini  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 39000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/9ae0dfd2-4f30-4ca1-a057-9add64c89258.jpg?v=1755943659']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Michael Kors', 'Michael Kors Topuklu Ayakkabı - 38.5', 'Ürün Bilgisi   Tasarım: Gümüş Metal Görünümlü  Materyal: Rugan  Renk: Siyah  Beden: 38.5  Editör Notları: Siyah deri gövdesi ve metalik gümüş burun detayıyla güçlü bir kontrast sunan bu Michael Kors slingback topuklu ayakkabı, sade tasarımı modern bir vurgu ile birleştiriyor.Arkadan bantlı yapısı ayağı sabit tutarken, sivri burun formu silueti zarifleştiriyor. Hem gece kombinlerine hem ofis şıklığına rahatça uyum sağlayan, minimal fakat dikkat çeken bir parça.   Orijinallik ve Kalite Kontrolü  P', 3499, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-ayakkabi-on_9f1f727a-531d-4e45-af46-243e5677847f.jpg?v=1767178613', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-ayakkabi-yan.jpg?v=1767178613', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-ayakkabi-arka.jpg?v=1767178613', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-ayakkabi-detay.jpg?v=1767178613']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Armani Collezione', 'Armani Takım - 34', 'Ürün Bilgisi  Renk:Gri Beden: 34 Editör Notları: Hafif transparan yapısı ve yumuşak gri-beyaz çizgileriyle sakin ama dikkat çeken bir görünüm veriyor. Ön kısmındaki dökümlü hareket, parçaya feminen değil akıcı bir şıklık katıyor. Vücuda hafifçe oturan formu sayesinde hem günlük kombinlerde hem de daha özenli bir görünüm istediğin anlarda kolayca kullanılabilir.  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy tekno', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/armani-takim.jpg?v=1755846172']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Michael Kors', 'Michael Kors Çanta', 'Ürün Bilgisi  Renk: kırmızıKumaş: DeriEksper Puanı: Ürünün tüm incelmesi tarafımızca yapılmıştır. Hiçbir deformesi yoktur. Ürün sıfırdır. Kondisyon Durumu 10/10Eksper Notları: Michael Kors’un sportif–şık çizgisini öne çıkaran bu model, canlı kırmızı tonuyla enerjik ve modern bir görünüm sunuyor. Yumuşak dokulu derisi çantaya günlük kullanımda rahat bir form kazandırırken, altın renk zincir detayları ve halka aksesuarlar tasarımı daha lüks ve dikkat çekici bir hale getiriyor. Hem üst sapları hem', 14799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-kirmizi-2.jpg?v=1778828102', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-kirmizi-1.jpg?v=1778828102', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/nar-cicegi-mk.jpg?v=1755698814']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Stella Mccartney', 'Stella Mccartney Çanta', 'Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsin.', 24999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-on.jpg?v=1755698537']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Tory Burch', 'Tory Burch Çanta', 'Ürün Bilgisi    Renk: Gri  Editör Notları:Bu Tory Burch püsküllü omuz çantası, markanın ikonik logosunu minimal bir yorumla öne çıkaran zamansız bir tasarıma sahiptir. Yumuşak deri dokusu ve hareketli püskül detaylarıyla bohem şıklığı modern bir çizgiyle buluşturur. Ayarlanabilir zincir–deri askısı sayesinde omuzda ya da çapraz kullanıma uygundur. Günlük kombinlerden şehir stiline, hafta sonu şıklığından casual davetlere kadar geniş bir kullanım alanı sunar; sade ama karakterli bir parça arayanl', 13999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-1.jpg?v=1778827636', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-2.jpg?v=1778827636', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-gri.jpg?v=1755698241']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Tory Burch', 'Tory Burch Çanta', 'Ürün Bilgisi  Kırmızı    Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsin.', 10499, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-kirmizi-1.jpg?v=1778828326', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-kirmizi-3.jpg?v=1778828326', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-kirmizi-2.jpg?v=1778828326']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Michael Kors', 'Michael Kors Çanta', 'Ürün Bilgisi  Kırmızı    Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsin.', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-kirmizion.jpg?v=1755696391']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Coach', 'Coach Topuklu Ayakkabı - 39', 'Ürün Bilgisi    Renk: Lacivert  Beden: 39   Editör Notları:          Bu Coach topuklu ayakkabı, markanın klasik-şık çizgisini modern bir dokunuşla birleştiren zarif bir modeldir. Sivri burun formu ayağı daha uzun ve ince gösterirken, lacivert zemin üzerindeki minik desenler modele sofistike bir hareket katar. Ön kısmındaki metal detay, Coach’un imza estetiğini vurgulayarak ayakkabıya feminen ama güçlü bir karakter kazandırır. Orta-yüksek topuk boyu sayesinde hem ofis şıklığında hem de akşam dave', 3499, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/coach-topuklu-ayakkabi-ust.jpg?v=1755694854']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Michael Kors', 'Michael Kors Sloan Studded / Eyelet Trim Shoulder Çanta', 'Ürün Bilgisi  Beyaz Etiketli ve sıfır kondisyonda  İki adet iç cebi bulunuyor; biri fermuarlı     Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsin.', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-beyaz-canta-on.jpg?v=1755694160', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-beyaz-2.jpg?v=1778682846', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-beyaz-1.jpg?v=1778682846', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-beyaz-3.jpg?v=1778682847']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Michael Kors', 'Michael Kors MK Logo Flap Shoulder Çanta', 'Ürün Bilgisi  Kahverengi Deri  İç cebinde bir fermuar ve kart kısmı bulunuyor.  Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlar tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-taba-canta-on1.jpg?v=1755693646', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-taba-1.jpg?v=1778829390', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-taba-2.jpg?v=1778829389', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-taba-3.jpg?v=1778829390']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Michael Kors', 'Michael Kors Selma Studded Medium Messenger Çanta', 'Ürün Bilgisi  Lila  Metal çivi detaylı  İç fermuar cebi bulunuyor.  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 4750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-lila-canta-on.jpg?v=1755693224', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk1.jpg?v=1778680095', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk2.jpg?v=1778680095']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Tory Burch', 'Tory Burch Britten Chain Wallet Mini Cüzdan Hediyeli', 'Ürün Bilgisi   Renk:Gri  Detay: Sapı gold detaylı  Satın Alındığı Ülke: ABD  İçinde bir kart kısmı ve fermuarlı bir bölümü bulunuyor.   Editör Notu:   Minimal silueti ve ikonik altın logosuyla öne çıkan bu Tory Burch omuz çantası, zamansız stile modern bir dokunuş katıyor. Yumuşak dokulu hakiki derisi, zarif zincir askısıyla tamamlanırken hem gündüz hem gece kombinlerine kolayca uyum sağlıyor. Yanında hediye olarak gelen takım şeklindeki cüzdanı ile fiyat olarak benzersiz bir fırsat sunuyor.', 9500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Adsiz_tasarim.png?v=1774529261', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Adsiz_tasarim_1.png?v=1774529261', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Adsiz_tasarim_2.png?v=1774529261', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2636.jpg?v=1774529004']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Celine', 'Celine Çanta', 'Ürün Bilgisi  Kahverengi  Boyut: En 19.5 cm, Boy 12 cm Kapak kısmında 2 adet püskül bulunuyor. Bir iç cebi bulunuyor.  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlar tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur.', 39999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-canta-on_f08c5cfb-ddbb-4028-abbe-906c0d5cae81.jpg?v=1755691022', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-1.jpg?v=1778620076', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-2.jpg?v=1778620076']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Loafer -41', 'Ürün Bilgisi   Koyu Kahverengi (espresso tonlarında) Süet 41 Numara  Taban açık (renk bej tonlu ) kauçuk taban Vamp kısmında Prada ikonik üçgen metal logosu mevcut. 1980''lerden itibaren sadece klasik bir ''''erkek ayakkabası'''' değil, aynı zamanda lüks ve günlük şıklığın birleşimi  Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur.', 17999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-kahve-loafer-on.jpg?v=1755679596']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Loafer -41', 'Ürün Bilgisi   Lacivert Süet 41 Numara  Taban açık (renk bej tonlu ) kauçuk taban Vamp kısmında Prada ikonik üçgen metal logosu mevcut. 1980''lerden itibaren sadece klasik bir ''''erkek ayakkabası'''' değil, aynı zamanda lüks ve günlük şıklığın birleşimi  Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur.', 17999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-loafer-lacivert-ust.jpg?v=1755677555']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Michael Kors', 'Michael Kors 38,5 Beden Sandalet', 'Ürün Bilgisi  38.5 Numara Gold  Bağlama detaylı  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsin.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-sandalet-yan.jpg?v=1767177659', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Michael-kors-sandalet-on.jpg?v=1767177659', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-sandalet-arka.jpg?v=1767177654', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-sandalet-detay.jpg?v=1767177654']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Hermes', 'Hermes T-shirt - 36', 'Ürün Bilgisi  Krem/Kahverengi  36 Beden Made in France %100 Koton En 42 cm Boy 55 cm  Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 15000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tisort1.jpg?v=1777289799', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tisort2.jpg?v=1777289799', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tisort3.jpg?v=1777289799', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3182.jpg?v=1777289799']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Tory Burch', 'Tory Burch Çanta', 'Ürün Bilgisi  Bordo Omuz Çantası  Üzerinde mavi  ve kahverengi  yuvarlak detaylı   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 11000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory1_cc480028-7188-4a75-b980-f4cddf83574f.jpg?v=1778506242', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory2_ddd835c2-531d-4569-be22-edc9d2ec5a77.jpg?v=1778506242', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory3_8cbe9e50-e2b5-40cd-b9d0-e469b88a9de6.jpg?v=1778506242']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Miu Miu', 'MİU MİU Gözlük', 'Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsin.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/miu-miu-takim.jpg?v=1755692917']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Bottega Veneta', 'Bottega Veneta Turuncu Clutch', 'Ürün Bilgisi   Turuncu   Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknoloji ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 15000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-1_416a027c-654a-44ff-97d2-b8e77ee89360.jpg?v=1778676489', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-3.jpg?v=1778676595', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-2_08692d0b-4481-44ff-ac20-a3764a19a59a.jpg?v=1778676595', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-5.jpg?v=1778676595']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Burberry', 'Burberry Ekose Çanta', 'Ürün Bilgisi   Ekose  İçinde bir fermuarlı bölüm olmak üzere iki tarafı kartlık   Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı şekilde incelenir ve Entrupy teknolojisi ile %100 orijanallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 13000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-pembe-on.jpg?v=1756108359']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Siyah Renk 36 Beden Çizme', 'Ürün Bilgisi   Renk:Siyah   Numara:36  Editör Notları: Kaydırmaz tabanı ve bütünleşik gövde yapısı sayesinde yağmurlu havalarda güvenli adım sağlarken, tasarımın düzenli çizgisi botun şehir stiline de uyumlu bir görünüm .kazanmasına yardımcı oluyorGünlük kullanım için oldukça uygun bir model. Hem şehir içi yağmurlu havalarda hem de hafta sonu programlarında pratik bir seçenek olarak öne çıkıyor. Monogram detayları botun karakterini belirginleştirirken, sade silueti birçok kombine kolayca uyum sa', 8599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-cizme-yan.jpg?v=1761309075']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Nude Topuklu Ayakkabı - 35,5', 'Ürün Bilgisi  Nude Beden 35.5 Topuk Yüksekliği 12 cm   Ürün Bilgisi    Renk: Nude  Beden: 35.5  Topuk Yüksekliği: 12 cm  Editör Notları:  Bu Sergio Rossi topuklu ayakkabı, markanın zamansız ve feminen çizgisini yansıtan klasik pump modelidir. Nude tonlu parlak deri yüzeyi sayesinde bacağı uzun ve zarif gösterirken, sivriye yakın yuvarlatılmış burun formu sofistike bir siluet yaratır. İnce ve dengeli topuk yapısı hem şıklık hem de gün boyu konfor sunar. Ofis stilinden davet kombinlerine kadar pek', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-topuklu-ayakkabi-ust.jpg?v=1755690542']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tom Ford', 'Tom Ford Bootie -37', 'Ürün Bilgisi  Renk: Siyah Numara: 37 beden Tasarım: Topuk Detaylı,Fermuar Kapama Kumaş İçeriği: Deri Editör Notları: Yumuşak derisi ayağı sararken, arka kısımdaki metal topuk tasarıma modern ve iddialı bir imza bırakıyor. Sivri burun formu sayesinde çizgisi uzuyor ve her kombinle kendini belli eden bir duruş yaratıyor. Hem gece hem şehir stili için kolayca yükselten, karakterli bir bot.  Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde i', 3799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/TOM-FORD-BOT-CAPRAZ.jpg?v=1755697688']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Siyah Renk 37 Beden Topuklu Ayakkabı', 'Ürün Bilgisi    Renk: Siyah  Beden: 37  Editör Notları:  Bu Prada topuklu ayakkabı, markanın zamansız ve güçlü minimalizmini yansıtan sivri burunlu klasik pump formundadır. Parlak dokulu siyah deri yüzeyiyle oldukça sofistike bir duruş sunarken, ince metalik stiletto topuğu ayakkabıya modern ve feminen bir karakter kazandırır. Ayağı zarif gösteren kesimi sayesinde hem davetlerde hem de şık ofis kombinlerinde rahatlıkla kullanılabilecek, güçlü ama sade bir Prada tasarımıdır.   Orijinallik ve Kali', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-stiletto-yan.jpg?v=1755696832']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Christian Louboutin', 'Christian Louboutin Nude Renk 38 Beden Topuklu Sandalet', 'Ürün Bilgisi    Renk: Nude  Beden: 38  Editör Notları:  Bu Christian Louboutin topuklu sandalet, markanın ikonik teatral estetiğini yansıtan özel tasarımlardan biridir. Açık burunlu ve arkası bantlı (slingback) formu sayesinde feminen ve zarif bir siluet sunarken, en dikkat çekici detayı altın tonlu heykelsi topuğudur. Parlak nude/pudra tonundaki deri yüzeyi hem gündüz hem de özel davet kombinlerine kolayca uyum sağlar. Klasik Louboutin kırmızı tabanı ve sanatsal topuk formu ile şıklığı güçlü bi', 11500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-yan-cift.jpg?v=1755693809']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Tory Burch', 'Tory Burch Metalik Marion Çanta', 'Ürün Bilgisi    Renk: Bronz  Editör Notları:  Bu Tory Burch çanta, markanın Marion / Fleming çizgisine yakın zincir askılı omuz–crossbody modellerinden biridir. Metalik bronz–gümüş tonlu yumuşak deri yapısı, ön yüzdeki kabartmalı Tory Burch logo detayı ve el işçiliğini vurgulayan örgü (whipstitch) dikişleriyle karakter kazanır. Altın renk zincir askısı sayesinde hem omuzda hem çapraz kullanılabilirken, kompakt ama fonksiyonel formu günlük ve akşam kullanımı için idealdir. Feminen, sofistike ve z', 9599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-gri-1.jpg?v=1778827842', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-gri-2.jpg?v=1778827842', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-gri-3.jpg?v=1778827842', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-burch-gri-on.jpg?v=1754588165']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Tory Burch', 'Tory Burch Kol Çantası', 'Ürün Bilgisi    Renk: Siyah   Kumaş: Naylon   Editör Notları: Hafif ve dayanıklı naylon gövde, parlak vernice (lakeli) deri detaylarla birleştirilerek hem spor hem de şık bir görünüm sunar. Çantanın ortasında yer alan büyük kabartma logo, tasarımın karakter noktasını oluştururken, sade formun içinde güçlü bir stil ifadesi yaratır.Geniş iç hacmi, bilgisayar, evrak, spor eşyası veya günlük ihtiyaçlar için kolay kullanım sağlar; bu nedenle şehir yaşamında, ofiste, seyahatte veya hafta sonu stilinde', 13000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-burch-on.jpg?v=1754587851', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory1.jpg?v=1768465802', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory2.jpg?v=1768465802', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory3.jpg?v=1768465803']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Kenzo', 'Kenzo Deri Sırt Çantası', 'Ürün Bilgisi    Renk: Siyah  Kumaş: Deri   Editör Notları: Minimal gövdesiyle sade bir görünüm sunarken, ön cepteki metal Kenzo tokası ve püskül detayı çantanın karakterini belirgin şekilde öne çıkarıyor.Parlak ve mat deri dokuların bir arada kullanılması, çantaya sadece fonksiyon değil, dokusal bir zenginlik de katıyor. Çift sap detayının yanı sıra fermuarlı yapısı, günlük kullanımda güvenli ve pratik bir deneyim sağlıyor. Küçük boyutuna rağmen düzenli gözleri sayesinde cüzdan, telefon, anahtar', 5500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-sirt-canta.jpg?v=1754587586', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-1.jpg?v=1778830169', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-2.jpg?v=1778830244']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Babet - 37', 'Ürün Bilgileri    Renk: Siyah  Numara: 37  Tasarm: Ekose desen    Eksper Notları : Ekose dokusuyla dikkat çeken babet , siyah deri detayları ve ön kısmındaki büyük tokasıyla modern ve zamansız bir stile sahip. Açık arka tasarımı sayesinde hem yaz aylarında ferahlık sunar hem de şıklığından ödün vermez . klasik çizigisi her kombinle uyum yakalar .  Eksper Puanı : Ürünün tüm incelemesi tarafımızca yapılmıştır. Kondisyon durumu 10/10   Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler,', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-babet-on.jpg?v=1767186780', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-babet-on-2.jpg?v=1767186780']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Kate Spade', 'Kate Spade Çanta', 'Ürün Bilgisi    Renk: Bordo   Kumaş: Deri   Editör Notları: Kate Spade’in sade ama zarif tasarım dilini yansıtan bu model, yuvarlak gövdesi ve düz kapak formuyla modern bir crossbody silueti sunuyor. Bordoya yakın koyu mürdüm tonu çantayı hem gündüz hem akşam stiline uyumlu hale getirirken, hafif dokulu yüzeyi çizilmeye karşı dayanıklı bir kullanım sağlıyor. Küçük altın logo detayı minimal görünümü bozmadan şık bir vurgu ekliyor; ince ayarlanabilir askısı ise konforlu ve şehir hayatına uygun pra', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kate-spade-on.jpg?v=1754587205', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kate-spade.jpg?v=1768466106', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/WKA352250_2_enlarged.webp?v=1768466117']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Michael Kors', 'Michael Kors Cros Body', 'Ürün Bilgisi  Beyaz/Siyah 22x18 cm Kullanılmış Beyaz deride bükülme izi mevcuttur.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 7799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-siyah-beyaz.jpg?v=1754586650', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-sb-1.jpg?v=1778829707', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-sb-2.jpg?v=1778829707', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-sb-3.jpg?v=1778829707']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Gucci', 'Gucci Circle Bag', 'Ürün Bilgisi    Renk: Lacivert  Ölçü: 18x18 cm  Kumaş: Deri  Editör Notları: Lacivert deri yüzeyinde diyagonal dikiş detayları ve markanın karakteristik GG logosunun metal, burgulu görünümü modern ve dikkat çekici bir dokunuş veriyor. Çevresini saran açık renk deri biyeler ise çantayı hem daha belirgin hem de daha sofistike hale getiriyor. Crossbody kullanılabilen zincirli askısı sayesinde günlük stil, akşam çıkışı veya hareketli şehir kombinlerinde rahatça eşlik edebilecek boyutta. Minimal form', 29000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-canta-on_66f38a7a-0070-408c-8a6b-488f4f57b0a4.jpg?v=1754582376']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Yves Saint Laurent', 'Yves Saint Laurent Gri Clutch', 'Ürün İle İlgili Bilmeniz Gerekenler:  Vizon  20x30 cm  Gerçek kuzu derisi Dikdörtgen formda, birbirini takip eden chevron(balık sırtı) desenler mevcuttur.  Derisinde bazı lekeler mevcut.     Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 11450, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-clutch-gri.jpg?v=1754581745']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Fendi', 'Fendi FF Logo Çanta', 'Ürün Bilgisi    Renk: Siyah / Koyu Kahve  Ölçü: 16x19 cm  Kumaş İçeriği: Dana Derisi  Sıfır Kondisyonda  Editör Notları:  Bu Fendi FF Logo çanta, markanın ikonik FF monogram kabartmalı desenini taşıyan, zamansız ve güçlü bir tasarıma sahip zincir askılı omuz / crossbody çanta modelidir. Kahverengi tonlarındaki deri yüzey, all-over FF logosuyla sofistike bir görünüm sunarken, ön kısımdaki altın tonlu Fendi kilit detayı çantaya karakteristik bir vurgu katar. Metal zincir askısı sayesinde hem gündü', 60000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-canta-on.jpg?v=1754581363', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-ff-logo-yan.jpg?v=1768460245', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fenfi-ff-logo-alt.jpg?v=1768460245']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Prada', 'Prada Re-Nylon Bag', 'Ürün Bilgisi  Renk: KremKumaş: NaylonEditör Notları: Bu model, Prada’nın ikonik naylon mirasını yeniden yorumlayan Prada Re-Edition 2005 Nylon çantasıdır. Hafif, suya dayanıklı ve günlük kullanıma çok uygun olan teknik naylonu; modern bir zincir detay ve çıkarılabilir mini pouch ile birleştirir. Siyah rengi, gümüş metal aksesuarlı üçgen logo plakası ve çok yönlü askı kombinasyonu sayesinde hem spor hem şehir şıklığına uyum sağlar. Omuzda ya da çapraz takılabilmesi, küçük eşyalar için ek mini cep', 28700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cq5dam.web.hebebed.2400.2400.avif?v=1768460623', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cq5dam.web.hebebed.2400.2400_1.avif?v=1768460623', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cq5dam.web.hebebed.2400.2400_2.avif?v=1768460622', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cq5dam.web.hebebed.2400.2400_3.avif?v=1768460623', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cq5dam.web.hebebed.2400.2400_4.avif?v=1768460623', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cq5dam.web.hebebed.2400.2400.jpg?v=1768460622']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Celine', 'Celine Grained Çanta', 'Ürün Bilgisi    Renk: Siyah  Kumaş: Deri  Editör Notları: Minimal çizgilere sahip, logosunu öne çıkarmayan, formla değer kazanan ikonik tasarımlardan biridir.Ön kısmındaki “belt” adını veren bağcık detayı, çantaya hareket katarken; açılım şekli ve üst kapağı, modelin sade görünümünün altındaki sofistike işçiliği vurgular. Hafif dokulu deri, çizilmelere karşı dayanıklı yapısıyla günlük kullanım için ideal; koyu ton ise hem ofis stiline hem de modern şehir kombinlerine uyum sağlar.Üst sapı elde ta', 46000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-canta-on.jpg?v=1754581066', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/CEL293143_4_enlarged.webp?v=1768465564']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Valentino', 'Valentino Denim Çanta', 'Ürün Bilgisi    Renk: Mavi   Kumaş: Denim   Editör Notları: Valentino’nun Rockstud çizgisini denimle buluşturan bu model, turkuaz taşlar ve yıldız formundaki metal süslemelerle karakter kazanan, koleksiyon ruhu güçlü bir çanta. Kutu siluetine sahip flap tasarımı, yapısal duruşu korurken; denim dokusu çantaya genç ve özgür bir hava katıyor. Rockstud’ın sert görünümü bu modelde bohem bir ifadeyle yumuşatılırken, üst sap üzerindeki detaylar adeta takı etkisi yaratarak çantayı sade kombinlerde bile', 43999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mavi-valentino-on.jpg?v=1754580684', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/v1.jpg?v=1769841212', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/v2.jpg?v=1769841212', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/v3.jpg?v=1769841212', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1797.jpg?v=1769841217']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Tory Burch', 'Tory Burch Çanta', 'Ürün Bilgisi    Renk: Fuşya   Editör Notları: Tory Burch’un modern ve feminen çizgisini yansıtan bu model, canlı fuşya rengi ve parlak altın zincir askısıyla hem şık hem de dikkat çeken kompakt bir çanta. Yumuşak deri yüzeyi minimal bir formda sunulurken, ortadaki klasik logo detayı tasarımı zarif bir şekilde öne çıkarıyor. Zincir askının deri omuz pedi hem rahat kullanım sağlıyor hem de çantaya daha lüks bir görünüm katıyor. Gündüzden geceye kolaylıkla uyum sağlayabilen bu parça, sade kombinler', 8600, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-bordo-1.jpg?v=1778828649', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-bordo-2.jpg?v=1778828649', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-bordo-3.jpg?v=1778828649', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-burch-canta-on.jpg?v=1754580132']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Valentino', 'Valentino Cros Body Çanta', 'Ürün Bilgisi    Renk: Siyah   Kumaş: Deri   Editör Notları: Valentino’nun Rockstud imzasını daha sade ve çabasız bir şehir stiline uyarlayan bu model, yumuşak dokulu siyah derisi ve antik metal görünümlü zımbalarıyla modern, cool bir duruş sunuyor. Çerçeve boyunca uzanan küçük piramit ve halka detaylı stud’lar, çantaya abartıya kaçmadan iddialı bir karakter katarken, kilit kapama tasarımı modelin sofistike duruşunu güçlendiriyor. İnce askısı sayesinde hem çapraz hem omuzda taşınabilen bu parça,', 23999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/calent_i.jpg?v=1754893944']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Valentino', 'Valentino Sırt Çantası', 'Ürün Bilgisi    Renk: Siyah   Kumaş: Deri   Editör Notları: Siyah derinin güçlü dokusu, çantanın etrafını saran turkuaz taşlı metal zımbalar ile bohem-rock bir ruh kazanır. Hem sert hem de renkli bir etki yaratması, Rockstud koleksiyonunu diğer lüks çantalardan ayıran imza detaylardan biridir. Çantanın arka kısmında yer alan etnik dokulu geniş kayış, tasarıma konfor kadar karakter de katıyor; günlük şehir stilinde spor, festival ruhunda özgür, denim ve deri kombinlerinde cesur bir ifade sunuyor.', 36000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino1_1e78f8df-4e9c-4796-9da1-41f4d04e540f.jpg?v=1778827368', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-2_d0758cc2-ab94-4eec-9d76-d79f04dd76cd.jpg?v=1778827368', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-3.jpg?v=1778827368']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Michael Kors', 'Michael Kors Kempton / Fulton Hobo Çanta', 'Ürün Bilgisi    Renk: Kırmızı  Kumaş: Deri  Editör Notları:  Bu çanta, markanın şehirli ve fonksiyonel çizgisini yansıtan yumuşak formlu hobo model tasarımlarından biridir. Canlı kırmızı deri gövdesi, altın tonlu metal halkalar ve zincir detaylı askı bağlantıları ile modern bir şıklık sunarken; hem kısa elde taşıma hem de ayarlanabilir uzun askısı sayesinde omuz ve çapraz kullanım imkânı verir. Günlük kullanıma uygun geniş iç hacmiyle konforlu, sade ama dikkat çekici tarzıyla ofisten hafta sonu', 13299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-canta.jpg?v=1754579713']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Kenzo', 'Kenzo Çanta', 'Ürün Bilgisi    Renk: Gri  Kumaş: Deri  Editör Notları:  Bu Kenzo çanta, markanın ikonik Tiger (Kaplan) nakışlı crossbody modellerinden biridir. Antrasit gri deri gövdesi üzerinde yer alan kontrast renkli kaplan motifi, Kenzo’nun enerjik ve grafik tasarım dilini yansıtırken; kompakt dikdörtgen formu günlük kullanım için pratik bir yapı sunar. Ayarlanabilir uzun askısı sayesinde çapraz kullanım imkânı sağlayan bu model, hafifliği ve modern sokak stili havasıyla casual kombinlere güçlü ve karakter', 7500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-canta-onn.jpg?v=1754579521']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Michael Kors', 'Michael Kors Denim Patchwork Çanta', 'Ürün Bilgisi    Renk: Mavi  Kumaş: Denim  Editör Notları:  Bu Michael Kors sırt çantası, markanın şehirli ve günlük kullanıma yönelik patchwork denim backpack modellerinden biridir. Farklı tonlarda mavi kot panellerden oluşan tasarımı modern ve genç bir görünüm sunarken, yuvarlak hatlı klasik sırt çantası formu zamansız bir duruş kazandırır. Ön fermuarlı cebi ve geniş ana bölmesi ile pratik kullanım sağlayan bu model, ayarlanabilir askıları sayesinde konforlu bir taşıma sunar. Günlük kombinlere', 5500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-denim-1.jpg?v=1778672919', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-denim-2.jpg?v=1778672919', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mk-denim-3.jpg?v=1778672919']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Chanel', 'Chanel Espadril - 37', 'Ürün Bilgisi  Espadril Beyaz Üst malzeme deri İç taban malzeme deri Dış taban malzemesi kauçuk 37 Üzerinde gold renkte marka harfleri ile süslenmiş.  Orijinallik ve Kalite Konrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik grantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 25000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-espadril-on-1.jpg?v=1754579106']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Valentino', 'Valentino Sneaker - 36.5', 'Ürün Bilgisi  Garavani Kadın Sneakers Kahverengi Beden :36.5 %80 Pamuk, %20 Polyester  Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 14000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-sneaker_3559536d-e0d6-4046-ba05-0a322030b14b.jpg?v=1754578967']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gucci', 'Gucci Sneaker - 36.5', 'Ürün Bilgisi    Renk: Kahverengi  Beden: 36.5   Editör Notları:  Bu Gucci sneaker, markanın ikonik GG monogram desenli kanvas yüzeyiyle öne çıkan, zamansız ve günlük kullanıma uygun bir modeldir. Bağcıklı formu ve konforlu kauçuk tabanı sayesinde şehir yaşamında rahat bir kullanım sunarken, bej-kahve tonlarındaki klasik Gucci deseniyle spor-şık kombinlere kolayca uyum sağlar. Hem casual hem smart-casual görünümler için tercih edilen, markanın imza stilini yansıtan bir sneaker modelidir.   Orijin', 27299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-sneaker.jpg?v=1754578402']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Balenciaga', 'Balenciaga Gözlük', 'Ürün Bilgileri:  Siyah-Beyaz, Yanlarında altın rengi logo detaylı, Kullanılmış, Deformesi bulunmamaktadır.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-beyaz-gozluk_19c4dd18-6245-4251-8e5a-ba45a4b36676.jpg?v=1754577729']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Fendi', 'Fendi Gözlük', 'Ürün Bilgileri:  Fendi FE 4075US Turuncu cam, gold saplı,  Kullanılmış, Deformesi bulunmamaktadır.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 12000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-gozluk.jpg?v=1754577638', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-gozluk-set.jpg?v=1754577638']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Chanel', 'Chanel Gözlük', 'Ürün Bilgileri:  Siyah, Sapları gümüş zincir ve logo detaylı güneş gözlüğü, Kullanılmış, Deformesi bulunmamaktadır.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 7500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-gozluk.jpg?v=1754577274']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Christian Dior', 'Christian Dior Gözlük', 'Ürün Bilgileri:  Siyah, Metal saplı güneş gözlüğü, çerçevesinde yıldız detaylı, Kullanılmış, Deformesi bulunmamaktadır.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 16299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-dior-gozluk.jpg?v=1754576940']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Christian Dior', 'Christian Dior Gözlük', 'Ürün Bilgisi    Renk: Siyah  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 8500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior.webp?v=1767952839']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balenciaga', 'Balenciaga Gözlük', 'Ürün Bilgileri:  Yeşil, Yanlarında altın rengi logo detaylı, Kullanılmış, Deformesi bulunmamaktadır.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 11000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-gozluk-guncel.jpg?v=1754894633']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Victoria Beckham', 'Victoria Beckham Elbise - 38', 'Ürün Bilgisi    Renk: Siyah   Beden: 38  Kumaş İçeriği: %100 ipek biye Editör Notları: Siyah renkte, minimal çizgilerle tasarlanmış A-kesim bir elbise. Kolsuz formu ve temiz üst silueti, parçamın sadeliğini öne çıkarırken; etek ucundaki asimetrik, köşeli volanlar tasarıma mimari bir hareket katıyor. Akıcı dökümlü kumaşı sayesinde hem gündüz hem akşam kullanımına uyarlanabilen, zahmetsiz ama şık bir görünüm sunan güçlü bir temel parça. Ön kısmında gizli cep bölme mevcuttur  Orijinallik ve Kalite', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/victoria-backham-elbise-on.gif?v=1754309751']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Msgm', 'MSGM Elbise Yeşil - 36', 'Ürün Bilgisi    Renk: Yeşil  Beden: 36  Editör Notları:  Bu MSGM elbise, markanın feminen ama modern çizgisini yansıtan fular yakalı, düğmeli midi/maxi elbise modelidir. İnce dokulu ve akışkan kumaşı, belden oturan kesimi ve etek kısmındaki hafif A-form siluetiyle zarif bir duruş sunar. Uzun kollu yapısı ve boyunda bağlanan fular detayı sayesinde hem gündüz şıklığında hem de davet ve özel gün kombinlerinde rahatlıkla tercih edilebilecek, sofistike bir MSGM parçasıdır.   Orijinallik ve Kalite Kon', 4900, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/msgm-elbise-on.gif?v=1754307474']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balmain', 'Balmain Pantolon 36', 'Ürün Bilgisi    Renk: Beyaz.  Beden: 36  Editör Notları: Minimal ve modern çizgilere sahip bu beyaz yüksek bel pantolon, kontrast dikiş detaylarıyla silueti zarifçe vurguluyor. Vücudu toparlayan formu ve temiz hatlarıyla hem günlük stilinize hem de daha şık kombinlere kolayca uyum sağlar. Şık, sade ve güçlü bir görünüm arayanlar için ideal bir parça.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %1', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-jean-on.jpg?v=1754295647']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Leonard', 'Leonard İpek Eşarp - 90x90', 'Açıklama Desenli Leonard şal, her kombininize uyum sağlar.  Öne Çıkan Özellikler   Tasarım: Desenli.  Malzeme: %100 İpek.  Renk: Pembe, bej ağırlıklı.  Beden: 90x90    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/031E2A31-9A3D-41A3-85D3-8038D1244961.jpg?v=1753964141']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Stella Mccartney', 'Stella Mccartney T-shirt 36', 'Öne Çıkan Özellikler   Tasarım: Göğsünde marka yazılı.  Malzeme: %100 Koton.  Renk: Su Yeşili.  Beden: 36.  Boy:55 cm En: 45 cm  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-mccartney-tisort-on.jpg?v=1753711121']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Kenzo', 'Kenzo Denim Etek 26', 'Ürün Bilgisi    Renk: Mavi  Beden:  26  Kumaş İçeriği: Denim   Ölçü: Boy: 63 cm Bel: 36 cm  Eksper Notları:  Açık mavi yıkaması, eteğe ferah ve modern bir görünüm kazandırırken; yüksek bel ve diz altına yakın boyu vücut hatlarını dengeli gösterir. Ön ortadaki dikiş hattı, silueti daha uzun ve toparlayıcı gösteren ince bir detaydır. Klasik denim yapısı sayesinde formunu korur ama günlük kullanım için yeterince rahattır.Yan cepler ve kemer köprüleri, eteği hem spor-şık hem de fonksiyonel hale geti', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-sort-on.jpg?v=1753710662']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton T-shirt 36', 'AçıklamaLouis Vuitton T-shirt, zamansız şıklık sağlar. Öne Çıkan Özellikler   Tasarım: Farklı ön-arka kumaşları, desenli.  Malzeme: Ön ipek, arkası koton.  Renk: Beyaz-Kırmızı.  Beden: 36.  Deforme: Deformesi bulunmamaktadır.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-tisort-on.jpg?v=1753710482']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Escada', 'ESCADA Elbise Siyah - 42', 'Açıklama Siyah, kısa kollu, işleme detaylı Escada elbise, zamansız bir tarz ve şıklık sunuyor.     Öne Çıkan Özellikler     Tasarım: Kabartma ve işleme detaylı.   Malzeme: %100 İpek.   Renk: Siyah.   Beden: 42.      Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-elbise-on.jpg?v=1753710203']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Dsquared2', 'Dsquared2 Etek 38', 'Ürün Bilgisi    Tasarım: Fermuar, deri parça, kayış detaylı.  Kumaş İçeriği: Koton   Renk: Yeşil.  Beden: 38.  Ölçüler: Boy:58 cm Bel: 36cm  Eksper Notları: Dsquared2 imzalı bu haki mini etek, markanın sert–feminen çizgisini modern dokularla birleştiren özgün bir tasarım. Askeri tonlardaki düz yüzey, yan kısımdaki metal tokalı şerit detayıyla daha teknik ve utilitarian bir havaya bürünüyor. Alt bölümde yer alan parlak vinil panel ve onun altından görünen siyah dantel parça ise kontrast dokularla', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dsquared-etek-on.jpg?v=1753710001']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Moncler', 'Moncler Bordo Mont - 3', 'Ürün Bilgisi    Renk: Bordo  Beden: 3/ L  Editör Notları:          Markanın fonksiyonellik ve şıklığı bir araya getiren ikonik tasarım anlayışını yansıtır. Bordo tonlu kapitone yapısı hem modern hem zamansız bir görünüm sunarken, hafif ama yüksek ısı yalıtımı sağlayan dolgu yapısı soğuk havalarda üstün konfor sağlar. Çıtçıt ve fermuar detaylı önü, pratik kullanım sunarken göğüs cepleri tasarıma sportif bir karakter katar. Günlük şehir yaşamından hafta sonu kombinlerine kadar geniş bir kullanım a', 25000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bordo1_09ec5cbd-9c60-42db-868a-6a051375a4fc.jpg?v=1769672391', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bordo2_15966785-854e-4dbc-bb1e-453c2cc8fa1d.jpg?v=1769672391', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bordo3_375dc598-0d19-4691-a799-4d2ef6da33e1.jpg?v=1769672391']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Dsquared2', 'Dsquared2 Denim Elbise - 32', 'Ürün Bilgisi    Renk: Mavi /Beyaz  Beden: 32  Editör Notları:  Dsquared2 imzalı bu denim elbise, markanın sportif ve feminen çizgisini mükemmel şekilde bir araya getiriyor. Farklı tonlarda denim panellerin bir araya getirilmesiyle oluşturulan yapı, parçada patchwork etkisi yaratırken; göğüs kısmındaki V yaka ve keskin hatlı kup detayları elbiseye heykelsi bir form kazandırıyor. Bel hattındaki kontrast şerit, silueti toparlayarak ince bir görünüm sağlıyor. Alt bölümdeki genişleyen, hareketli etek', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_7330.jpg?v=1753362824']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Off White', 'Off White Şort - 36', 'Ürün Bilgisi    Renk: Krem  Beden: 36  Materyal: Koton-Viskos Karışım  Ölçü: Boy:33cm Bel:36cm  Editör Puanı: Off-White’ın modern terzilik anlayışını yansıtan bu bej pinstripe şort, minimalist ve sofistike bir siluet sunar. İnce çizgili (pinstripe) deseni ve pile detayları sayesinde klasik şıklığı çağdaş bir yorumla birleştirirken, yüksek bel kesimi vücut oranlarını dengeli gösterir. Yapılı fakat hafif kumaşı gün boyu konfor sağlarken, hem casual hem de şık kombinlerde rahatlıkla kullanılabilir.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/offwhite-sort-on.jpg?v=1754295869']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Proenza Schouler', 'Proenza Schouler Topuklu Ayakkabı - 36', 'Ürün Bilgisi   Numara:36  Renk:Siyah ,Beyaz  Tasarım:Topuk detaylı,bilek bağlama  Editör Notları:Siyah ve krem tonlarının el işçiliğini öne çıkaran bu dokuma topuklu sandal, örgü detaylarıyla heykelsi bir etki yaratıyor. İnce bilek kayışı ve yüksek stiletto formu modern bir siluet sunarken, açık burun tasarımı parçayı daha hafif ve iddialı kılıyor. Karakterli, dikkat çekici ve özel kombinleri anında yükselten bir model.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarım', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/proenza-3.jpg?v=1781605610', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/proenza-1.jpg?v=1781605610', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/proenza-2.jpg?v=1781605610']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Fendi', 'Fendi Mavi-Beyaz Çanta', 'Ürün Bilgisi    Renk: Mavi  Model Adı:  Fendi First Small   Editör Notları:  El işçiliğini ön plana çıkaran örgü (woven) deri tasarımıyla dikkat çeker. Mavi ve krem tonlarının uyumlu birlikteliği, çantaya hem modern hem sofistike bir karakter kazandırır. Yumuşak formu sayesinde elde clutch olarak veya ince askısıyla omuzda taşınabilir. Metal çerçeveli ağız yapısı çantaya zarif bir duruş verirken, kompakt iç hacmi temel ihtiyaçlar için idealdir. Şık ama iddiasız tasarımıyla gündüzden akşama rahat', 60000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/f.jpg?v=1767944433', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fe.jpg?v=1767944432']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Prada', 'Prada Mavi Çanta', 'Ürün Bilgisi    Renk: Mavi  Kumaş: Naylon  Ölçü:    Yükseklik: 22 cm   Genişlik: 20 cm   Derinlik: 13 cm   Editör Notları: Prada’nın ikonik naylon tasarımını daha yumuşak ve hacimli bir formla sunan bucket (kova) stili Re-Edition çantasıdır. Teknik naylonun hafifliği, parlak mavi rengi ve Saffiano deri detaylarıyla birleşerek günlük kullanıma canlı, modern ve sportif bir dokunuş katar. Üst kısmındaki büzgülü kapama, çantayı hem pratik hem de karakteristik kılar; altın tonlu metal aksesuarlar ise', 42390, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_7374.jpg?v=1753367882', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mavi-prada-arka.jpg?v=1768460474', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mavi-prada-detay.jpg?v=1768460475', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mavi-prada-ic.jpg?v=1768460474']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Chanel', 'Chanel Pembe Çanta', 'Ürün Bilgisi    Renk: Pembe   Editör Notları:          Güçlü rengiyle klasik çizgiyi modern bir enerjiyle buluşturan dikkat çekici bir tasarımdır. Yumuşak dokulu kapitone deri yüzeyi çantaya hacimli ve dolgun bir duruş kazandırırken, zarif CC metal logo sade ama ikonik bir vurgu oluşturur. Zincir askısı sayesinde hem omuzda hem çapraz kullanım imkânı sunar. Canlı pembe tonu, nötr kombinlere kontrast katarak stilin odak noktası olmasını sağlar; feminen, modern ve şehirli bir görünüm arayanlar içi', 75000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ch.webp?v=1767946795']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Aquazzura', 'Aquazzura Ponponlu Siyah Terlik 36,5 Numara', 'Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/118EF0E5-B225-4B28-AF4A-5B28F9D7E42A.jpg?v=1752762569']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Mcq', 'Mcq Elbise Kırmızı - 38', 'Ürün Bilgisi  Beden: 38  Renk: Siyah,Kırmızı  Editör Notları: Bu elbise akıcı ve dökümlü yapısıyla vücut hatlarını nazikçe sararken belden geçen kemeri sayesinde beli daha ince, silueti daha dengeli gösterir. Uzun boyu ve etek formu bacak boyunu olduğundan uzun göstererek zarif bir duruş kazandırır. Siyah zemin üzerindeki kırmızı floral desenler güçlü ama sofistike bir etki yaratır; hareket ettikçe canlı ve dikkat çekici görünür. Boyun detayı ve uzun kolları elbiseye feminen bir şıklık katarken,', 6790, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mcq-elbise-kirmizi.jpg?v=1752756387']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Roberto Cavalli', 'ROBERTO CAVALLİ Elbise Ekru - 38', 'Ürün Bilgisi    Renk: Ekru.  Beden: 38.  Editör Notları: Halter yaka formu ile omuzları ve boyun hattını zarif şekilde öne çıkaran elbise, bele oturan yapısı ve kat kat inen uzun eteğiyle dengeli ve akışkan bir siluet sunar. Delikli (broderie / ajur) kumaş dokusu elbiseye hafiflik ve yazlık bir karakter kazandırırken, etek boyunca yer alan volan detaylar hareketli ve romantik bir görünüm yaratır. Açık rengi sayesinde çok ferah, doğal ve sofistike durur.  Orijinallik ve Kalite KontrolüPeony Colle', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/roberto-cavalli-6198-on.gif?v=1754315588']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Roberto Cavalli', 'Roberto Cavalli Haki Elbise Haki - 36', 'Öne Çıkan Özellikler:   Renk: Haki.  Beden: 36.  Ölçü: Boy:153 Bel:40  Deforme: Deformesi bulunmamaktadır.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 4350, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/99ACD9BB-2068-4D8A-BE62-1D1FFE670960.jpg?v=1752748783']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Ulla Johnson', 'Ulla Johnson Renkli Elbise - 36', 'Ürün Bilgisi    Renk: Renkli  Beden: 36   Editör Notları:  Bu Ulla Johnson elbise, markanın imzası haline gelen bohem ve feminen mini elbise siluetini yansıtan desenli bir modeldir. V yaka formu, bele oturan lastikli kesimi ve katmanlı etek yapısı sayesinde vücut hatlarını zarifçe dengelerken; etnik ilhamlı geometrik desenler ve sıcak renk paleti elbiseye karakter kazandırır. Günlük şıklık, tatil kombinleri ve gündüz davetleri için ideal olan bu model, Ulla Johnson’ın modern boho estetiğini güçl', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ulla-johson-elbise-on.jpg?v=1753711176']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Kenzo', 'Kenzo Elbise 36', 'Ürün Bilgisi   Renk:Beyaz/Mavi  Beden:36  Editör Notları: Kenzo’nun imza desen anlayışını taşıyan bu elbise, deniz temalı illüstrasyonlarıyla canlı ve özgün bir görünüm sunuyor. Hafif dokusu ve rahat kesimi sayesinde gün boyu konfor sağlayan bir formda tasarlanmış. Kısa kol yapısı ve düz hatları, elbiseyi hem şehir içinde hem tatil atmosferinde kolayca kullanılabilir hale getiriyor.Önden tam düğmeli yapısı pratik bir kullanım sunarken, beyaz zemin üzerindeki mavi illustrasyonlar tasarıma modern', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-elbise-on.jpg?v=1754299106']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'La Doublej', 'La DoubleJ Elbise Renkli - S', 'Ürün Bilgisi   Renk: Mavi , sarı ağırlıklı.  Beden: S  Editör Notları:  Bol ve akışkan swing kesimi sayesinde vücuda yapışmadan rahatça dökülen elbise, hareket ettikçe canlılık kazanan bir siluet sunar. Retro ilhamlı, renkli ve yoğun desen yapısı La DoubleJ’nin arşiv baskılarından esinlenen karakteristik estetiğini taşır. Geniş kol formu ve rahat kalıbı konforu ön plana çıkarırken, hafif kumaşı gün boyu zahmetsiz bir kullanım sağlar. Hem enerjik hem sofistike bir duruşu vardır; tek başına tüm ko', 6110, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/double-j-elbise-on.jpg?v=1754299499']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'See By Chloe', 'See By Chloe Elbise Kahverengi - 38', 'Öne Çıkan Özellikler:   Renk: Kahverengi.  Beden: 38.  Ölçü: Boy:127 Bel:44  Deforme: Deformesi bulunmamaktadır.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/see-by-chloe-elbise-on.jpg?v=1754300144']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Roberto Cavalli', 'Roberto Cavalli Leopar Elbise Leopar - 38', 'Öne Çıkan Özellikler:   Renk: Leopar.  Beden: 38.  Ölçü: Boy:161 Bel:35  Deforme: Deformesi bulunmamaktadır.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/14D58E69-0943-4895-85B8-DE59500844C8.jpg?v=1752748213']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Prada', 'Prada Saffiano Leather Bag', 'Ürün Bilgisi    Renk: Pudra   Editör Notları:  Bu Prada Saffiano çanta, markanın ikonik Saffiano deri dokusuyla üretilmiş, zarif ve fonksiyonel bir Galleria tote / top-handle modelidir. Yapılandırılmış formu, üstten fermuarlı kapanışı ve altın tonlu üçgen Prada logosu ile klasik Prada estetiğini yansıtır. Elde taşımaya uygun saplarının yanı sıra ayarlanabilir omuz askısıyla elde, omuzda veya crossbody kullanım imkânı sunar. Günlük şehir hayatından ofis şıklığına kadar geniş bir kullanım alanına', 40000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/s-l500.jpg?v=1756815407']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Louis Vuitton', 'Louis Vuitton Yağ Yeşili Çanta', 'Ürün Bilgisi    Renk: Yağ Yeşili  Kumaş: Rugan  Editör Notları:  Bu Louis Vuitton Vernis Brea modeli, markanın ikonik Monogram Vernis rugan derisiyle tasarlanmış, zarif ve feminen bir çantadır. Açık sarı–şampanya tonlarındaki parlak yüzeyi, kabartma LV monogram deseniyle öne çıkarken; doğal vachetta deri üst detayları ve altın renk metal aksesuarları tasarıma sofistike bir denge kazandırır. Üstten elde taşımaya uygun çift sapı ve çıkarılabilir uzun askısı sayesinde elde, omuzda veya çapraz kulla', 30000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv_9c90f221-970a-48d5-a525-fd0877d25fd1.jpg?v=1756815087', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-yag-yesili-1.jpg?v=1778670413', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-yag-yesili-3.jpg?v=1778670413', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-yag-yesili-4.jpg?v=1778670413']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Chloe', 'CHLOE Taba Çanta', 'Ürün Bilgisi    Renk: Taba   Editör Notları:  Bu Chloé çanta, markanın imzası hâline gelen Nile / Pixie Ring tasarım çizgisini yansıtan, halka metal saplı ikonik bir crossbody / shoulder bag modelidir. Doğal grenli deri yapısı, sıcak kahverengi tonu ve altın tonlu yuvarlak metal tutma halkası ile Chloé’nin bohem-lüks estetiğini net biçimde ortaya koyar. Ayarlanabilir omuz askısı sayesinde hem elde hem omuzda hem de çapraz kullanım sunan bu model; gündüz şıklığından şehirli akşam kombinlerine kad', 19999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/5C466909-C4DA-41BE-99C6-67D7C33EAD3C.jpg?v=1752747778']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Valentino', 'Valentino Gold Rockstud Spike Omuz Çantası - Medium', 'Ürün Bilgisi    Renk: Gold   Editör Notları:  Bu Valentino Garavani Rockstud Spike modeli, markanın ikonik Rockstud çivileriyle süslenmiş, kapitone desenli lüks bir çantadır. Açık altın/şampanya tonlarındaki metalik deri yüzeyi, sofistike bir ışıltı sunarken; ön kısımdaki twist-lock kilit detayı tasarıma modern bir karakter katar. Üstten elde taşımaya uygun kısa sapı ve zincir askı detayı sayesinde elde ve omuzda kullanım imkânı sunar. Hem gündüz şıklığına hem de gece kombinlerine kolayca uyum s', 50000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/1751DFAD-4BED-4E8F-BDD1-D0163CAE44EB.webp?v=1773339402', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/VAL.jpg?v=1773339402', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/V.jpg?v=1773339402', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/VA.jpg?v=1773339402']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Bottega Veneta', 'Bottega Veneta Terlik Gümüş - 39', 'Ürün Bilgisi    Renk: Gümüş   Numara: 39  Editör Notları: İkonik Intrecciato (örgü) deri tekniğini yansıtan zamansız bir tasarımdır. Metalik gümüş tonlu örgü üst yüzeyi modern ve sofistike bir görünüm sunarken, düz tabanı sayesinde gün boyu konfor sağlar. Minimal ama güçlü tasarımıyla hem şehir hayatında hem de yaz kombinlerinde kolayca öne çıkar; sade kombinlere lüks bir dokunuş ekler.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde i', 7500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/F6DD958E-32F8-4E1E-B25A-E53C31060F6C.jpg?v=1752746617']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Terlik - 38', 'AçıklamaGucci terlik, yaz kombinlerinizde zamansız şıklık sağlar. Öne Çıkan Özellikler   Tasarım: Marka ismi desenli.  Malzeme: Kauçuk.  Renk: Su Yeşili.  Beden: 38.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 8500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-yesil-terlik-on.jpg?v=1754314109']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Tom Ford', 'Tom Ford Kahverengi Renk Standart Beden Gözlük', 'Tom Ford Kahverengi Renk Standart Beden Gözlük', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gozluk.jpg?v=1751380668']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Prada', 'Prada Siyah Renk Standart Beden Çanta', 'Prada Siyah Renk Standart Beden Çanta', 40000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/500259e6-a989-4069-8541-e0da0fc48d1f.jpg?v=1750071811']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Kenzo', 'Kenzo Floral Desen Gömlek - 38', 'Ürün Bilgisi    Renk: Beyaz/Renkli desen  Beden: 38  Eksper Puanı: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır. İç etiketi mevcut değildir. 9/10   Eksper Notları : Kenzo’nun modern grafik diliyle tasarlanan bu çiçek desenli gömlek, kontrast siyah yakasıyla güçlü bir vurgu yaratıyor. Akışkan yapısı ve canlı renk geçişleri sayesinde hem günlük stile hem de ofis şıklığına kolayca uyum sağlar. Tek başına statement parça olabilecek kadar dikkat çe', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-floral-desen-gomlek-1.jpg?v=1749113896']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Hermes', 'Hermes Bordo Renk Standart Beden Çanta', 'Ürün Bilgisi    Renk: Bordo Herbag  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 130000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/h.webp?v=1767952704']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Sandalet 38', 'Açıklama Marka isim detaylı Prada sandalet, yaz kombinlerinize uyum sağlar. Öne Çıkan Özellikler   Tasarım: Önü çapraz detaylı, marka isimli.  Renk: Siyah.  Beden: 38.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 5500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bb503267-fde5-43fe-b4e0-b28915ec3272.jpg?v=1748616491']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Brunello Cucinelli', 'Brunello Cucinelli Yelek S', 'AçıklamaBrunello Cucinelli yelek, kombinlerinizde eşsiz bir şıklık sağlayacak.   Öne Çıkan Özellikler   Tasarım: Yaka taş detaylı.  Renk: Gri.  Beden: S.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Brunello-Cucinelli-Yelek-On.jpg?v=1767169580', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Brunello-Cucinelli-Yelek-Yan.jpg?v=1767169580']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Sandro', 'Sandro Elbise 36', 'AçıklamaSandro elbise, zamansız şıklık sağlar. Öne Çıkan Özellikler   Tasarım: Göğüs çengel ve bağlama detaylı.  Malzeme: Polyester.  Renk: Mavi-Kırmızı.  Beden: 36.  Ölçü: Boy:126 Bel:34  Deforme: Deformesi bulunmamaktadır.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sandro-elbise-on.jpg?v=1748270140']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Rixo', 'RIXO Etek Sarı - S', 'AçıklamaRixo etek, kombinlerinizde eşsiz bir şıklık sağlayacak. Öne Çıkan Özellikler   Tasarım: Desenli,pileli.  Malzeme: Polyester.  Renk: Sarı.  Beden: S.  Ölçü: Boy:93 cm Bel:36 cm    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rixon-on-etek_632f4da5-71d3-4015-84b1-e7110e6f9a61.jpg?v=1748266916']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Dodo Bar Or', 'Dodo Bar Or Elbise S', 'Ürün Bilgisi   Renk: Mavi-Krem  Beden: S  Editör Notları:Mavi ve krem tonlarının uyumuyla öne çıkan bu elbise, dokuma şeritleri ve püskül detaylarıyla ferah ve karakterli bir görünüm sunuyor. Yumuşak dokusu ve rahat kesimi sayesinde hareket alanı geniş, konforlu bir form oluşturuyor.Uzun kol yapısı ve akışkan eteğiyle hem gündelik yaşamda hem de tatil stilinde rahatlıkla kullanılabilir. Hafif bohem etkili tasarımı, şehir içinde de plaj sonrası akşam yürüyüşlerinde de uyum sağlayan çok yönlü bir', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/uzun-koton-elbise-on.jpg?v=1748265574']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Emilio Pucci', 'Emilio Pucci Bluz Beyaz - 36', 'Ürün Bilgisi    Renk: Beyaz  Beden: 36  Editör Notları:  Bu Emilio Pucci bluz, markanın ikonik renk ve desen oyunlarını zarif bir tasarımla buluşturan volan kollu, kayık yaka modelidir. Düz beyaz gövdesi, Pucci’ye özgü desenli ve katmanlı fırfırlı kollarla kontrast oluştururken, akışkan ve hafif kumaşı gün boyu konfor sağlar. Feminen ama enerjik havasıyla hem gündüz şıklığında hem de yazlık davet kombinlerinde rahatlıkla kullanılabilecek, karakteristik bir Emilio Pucci parçasıdır.   Orijinallik', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pucci-tshirt-on.jpg?v=1748263551', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pucci-tshirt-yan.jpg?v=1748263551']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Michael Kors', 'Michael Kors Elbise Xs', 'Ürün Bilgisi    Renk: Mor.   Beden: XS   Editör Notları: Açık lila ve gri tonlarında yılan deseniyle tasarlanmış uzun, gömlek formunda bir elbise. İnce dokulu kumaşı sayesinde dökümlü ve hafif bir siluet oluştururken, tam boy düğmeli yapısı parçaya hem rahatlık hem de zamansız bir şıklık katıyor. Klasik yaka detayı, güçlü deseni dengeleyerek elbiseyi hem gündüz hem akşam stillerine uyarlanabilir hale getiriyor.Doğal akışı ve modern hayvan deseniyle dikkat çeken, sofistike bir statement parça.  O', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/uzun-elbise-on.jpg?v=1748262080']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Alexis', 'Alexis Elbise Renkli - 36', 'Ürün Bilgisi    Renk: Mor.  Beden: 36  Editör Notları:  Uzun kollu formu ve belden kemerli yapısıyla vücut hatlarını dengeli şekilde vurgular. Bordo zemin üzerine yerleştirilen açık renkli çiçek desenleri elbiseye romantik ve sofistike bir hava kazandırırken, etek ucundaki volan detayı harekete yumuşak bir akış katar. Yüksek yakası ve düğme detaylarıyla modern bir görünüm sunan elbise, hem gündüz hem de akşam kullanımına uygun, zamansız ve şık bir siluete sahiptir.  Orijinallik ve Kalite Kontrol', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alexis-elbise-on.jpg?v=1748262678']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Louis Vuitton', 'Louis Vuitton Kahverengi Renk Standart Beden Çanta', 'Louis Vuitton Kahverengi Renk Standart Beden Çanta', 40000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/4ee5c581-4404-4b26-8202-8b3ea4cbe31b.jpg?v=1747994594', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/573d0cd9-2133-44b5-ae54-a2144f62e762.jpg?v=1747994594']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Hugo Boss', 'Hugo Boss Çocuk T-shirt  - 10 y', 'Öne Çıkan Özellikler:   Tasarım: Yazı detaylı.   Malzeme: Koton   Renk: Siyah.   Beden: 10Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hugo1.jpg?v=1776070772', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3121.jpg?v=1776070772', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hugo2.jpg?v=1776070772']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Kıyafet', 'Elbise', 'Chloe', 'Chloe Kız Çocuk Elbise Vizon - 4', 'Öne Çıkan Özellikler   Tasarım: Askılı, önden düğmeli.   Malzeme: Koton.   Renk: Vizon.   Beden: 4Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/vizon1.jpg?v=1776081350', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3147.jpg?v=1776081351', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/vizon-2.jpg?v=1776081351']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Bottega Veneta', 'Bottega Veneta Kahverengi Renk Standart Beden  Çanta', 'Bottega Veneta Kahverengi Renk Standart Beden Çanta', 95000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bvvvvv.jpg?v=1743760538']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Bottega Veneta', 'Bottega Veneta Kahverengi Renk Standart Beden  Çanta', 'Bottega Veneta Kahverengi Renk Standart Beden Çanta', 33000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bv_8400756d-4d7f-459f-8795-309749351fdb.jpg?v=1741951198']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Siyah Çizme - 36', 'Ürün Bilgisi    Renk: Siyah  Beden: 36  Editör Notları:   Gucci’nin zamansız estetiğini yansıtan bu diz altı çizme, pürüzsüz siyah deri yapısı ve yan kısımda yer alan ikonik GG logo detayıyla güçlü bir siluet sunar. İnce topuğu feminen ve dengeli bir duruş sağlarken, sade formu sayesinde sezonlar boyunca stilini koruyan klasik bir parçadır. Bacak hattına oturan yapısı ile şık ve sofistike bir görünüm elde edilir.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tara', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci2.jpg?v=1766568130', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci4.jpg?v=1766568130', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci1.jpg?v=1766568130', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci3.jpg?v=1766568130']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tod''S', 'Tods Kahverengi Çizme - 36,5', 'Açıklama Tod''s Çizme, kombinlerinize zamansız bir şıklık katar. Öne Çıkan Özellikler   Malzeme: Deri.  Renk: Kahverengi.  Beden: 36.5  Eksper Puanı:  Ürünün tüm incelmesi tarafımızca yapılmıştır.Hiçbir deformesi yoktur. Kondisyon Durumu 10/10   Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 7999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod2_97c9d08a-28aa-46c6-aa5f-f7d0e2ffb9fb.jpg?v=1766569438', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod1_07aef707-0c6b-405a-a1fe-bb7309a27bc8.jpg?v=1766569438', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod3.jpg?v=1766569434']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tod''S', 'Tod''s Siyah Çizme - 36,5', 'Ürün Bilgisi   Renk: Siyah.  Beden: 36.5  Editör Notları: Tod’s’un zamansız İtalyan zarafetini yansıtan bu diz altı çizme, pürüzsüz deri yüzeyi ve sade siluetiyle öne çıkar. İnce ve dengeli topuk formu feminen bir duruş sağlarken, topuk arkasında yer alan kapitone/dokulu deri detayı tasarıma sofistike bir karakter katar. Bacak formuna uyum sağlayan yapısı sayesinde şık ve güçlü bir görünüm sunan, sezonlar boyunca kullanılabilecek klasik bir modeldir.   Orijinallik ve Kalite KontrolüPeony Collect', 7999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod1.jpg?v=1766569159', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod4.jpg?v=1766569164', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod2.jpg?v=1766569164']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Christian Louboutin', 'Christian Louboutin Mavi Çanta', 'AçıklamaChristian Louboutin rugan çanta, kombinlerinizde eşsiz bir şıklık sağlayacak. Öne Çıkan Özellikler   Tasarım: Zincir ve yuvarlak isim detaylı.  Malzeme: Rugan.  Renk: Mavi.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/c_abee8333-be2b-4dee-bea8-298ded11dd6b.webp?v=1767946503']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Jimmy Choo', 'Jimmy Choo Krem Çanta', 'Ürün Bilgisi  Renk: Beyaz Tasarım: Gold Zincir Detaylı Kumaş İçeriği: Deri Editör Notları:Altın zincir askısı ve köşelerdeki metal detaylar tasarıma modern bir ışıltı katıyor. Yapısal formu sayesinde hem gündüz hem akşam stiline kolayca uyum sağlayan, sade görünümün içinde şık bir vurgu yaratan bir model.  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle al', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/WhatsAppImage2025-08-27at14.54.52.jpg?v=1756295811']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Off White', 'Off White Yağmurluk Yeşil - 38', 'Açıklama Sırt yazı detaylı, çıtçıt kapamalı, neon kol baskılı Off-White Yağmurluk, zamansız bir şıklık sağlar ve mevsime uygundur.   Öne Çıkan Özellikler   Tasarım: Neon kol ve sırt yazı detaylı.  Renk: Yeşil.  Beden: 38.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_7831.jpg?v=1739314335']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Bottega Veneta', 'Bottega Veneta Sİyah Renk Standart Beden  Clutch', 'Bottega Veneta Sİyah Renk Standart Beden Clutch', 75000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bv.jpg?v=1741002139']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Valentino', 'Valentino İpek Eşarp - 90x90', 'Açıklama Desenli Valentino şal, her kombininize uyum sağlar.  Öne Çıkan Özellikler   Tasarım: Desenli.  Malzeme: %100 İpek.  Renk: Lacivert,kırmızı,krem,yeşil.  Beden: 90x90    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/C5017252-75D2-4FE5-A9DE-64303F645426.jpg?v=1753950458', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/16E2C663-70F0-463F-AE03-0C6261451231.jpg?v=1753950459', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/F3D5E5B1-E37A-4D74-8947-6F0C3013EAFE.jpg?v=1753950458']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Chanel', 'Chanel İpek Eşarp - 90x90', 'Açıklama Turuncu, desenli Chanel eşarp, her kombininize uyum sağlar.  Öne Çıkan Özellikler   Tasarım: Desenli.  Malzeme: %100 İpek.  Renk: Turuncu.  Beden: 90x90.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/B9AC101A-3EE2-4354-B9C3-AD609AB46BDE.jpg?v=1753950322']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Hermes', 'Hermes İpek Eşarp - 90x90', 'Açıklama  Pudra, desenli Hermes eşarp, her kombininize uyum sağlar.       Öne Çıkan Özellikler     Tasarım: Desenli.   Malzeme: %100 İpek.   Renk: Pudra.   Beden: 90x90      Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermessal2.jpg?v=1757069187']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Lanvin', 'Lanvin Hırka Renkli - 38', 'Ürün Bilgisi   Tasarım: Şerit ve sim detaylı.  Malzeme: Akrilik-Polyester karışım.  Renk: Çok renkli.  Beden: 38  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260213_114706_24f56454-ee34-4449-945d-653e8cff8c19.png?v=1770983667', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260213_114659_d622cba9-766c-4a6d-9576-edb2d8ae391a.png?v=1770983690']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Love Shack Fancy', 'Love Shack Fancy Elbise Pembe - 34', 'Ürün Bilgisi    Renk: Pembe.  Beden: 34.  Editör Notları: Hafif ve akışkan kumaşıyla bedene yumuşak şekilde oturan elbise, üst bölümdeki büzgülü ve dökümlü detaylarıyla romantik bir siluet yaratır. Belden itibaren vücudu nazikçe saran etek formu ve yandan yer alan yırtmaç, elbiseye feminen ve zarif bir hareket kazandırır. Uzun kollu tasarımı ve pastel tonlardaki çiçek baskısı, LoveShackFancy’nin vintage esintili, narin ve sofistike stil anlayışını yansıtır. Hem hafif hem de göz alıcı bir duruşu', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/love-shack-fancy-elbise-arka.jpg?v=1754300785']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Emilio Pucci', 'Emilio Pucci Elbise Siyah - 38', 'Ürün Bilgisi    Renk: Siyah.  Beden: 38  Editör Notları:  V yaka formu ve çapraz (wrap etkili) kesimi sayesinde vücut hatlarını zarif şekilde öne çıkarır. Bel kısmında yer alan drape detay ve dekoratif toka / aksesuar, elbisenin odak noktasını oluşturur ve siluete feminen bir kıvrım kazandırır. Pucci’ye özgü dalgalı, barok esintili desenler; siyah, bej, kahve ve sıcak sarı tonlarının kontrastıyla güçlü ve sofistike bir görünüm yaratır. Diz boyu, vücuda oturan formu ile hem iddialı hem de zamansı', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_9390.gif?v=1748266554']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Alessandra Rich', 'Alessandra Rich Elbise - 38', 'Ürün Bilgisi    Renk: Siyah.  Beden: 38.  Ölçü: İki kol 50 cm Boy 124 cm  Materyal: %100 İpek  Editör Notları:   Uzun kollu ve midi–uzun boy formundaki elbise, vücuda oturan üst kısmı ve aşağı doğru açılan etek kesimiyle zarif bir siluet sunar. Siyah zemin üzerinde kontrast yaratan beyaz fırfırlı yaka ve yakadaki kadife fiyonk detayı, tasarıma retro ve aristokrat bir hava katar. Ön bölümde yer alan altın tonlu, inci görünümlü düğmeler elbiseye sofistike bir şıklık kazandırır. Akışkan kumaşı saye', 8500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alessandra-rich-elbise-on.jpg?v=1753709749']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Equipment', 'Equipment Elbise Siyah - Xs', 'Ürün Bilgisi   Renk:Siyah  Beden:xs  Tasarım:Çiçek motifli,belden kuşaklı   Kumaş İçeriği:100% ipek  Eksper Notları :Siyah zemin üzerine işlenen çiçek desenleriyle öne çıkan bu elbise, yumuşak akışı ve düzenli formuyla zamansız bir görünüm sunuyor. Düğmeli üst kısmı ve beldeki bağlama detayı, silueti toparlayarak daha dengeli bir duruş sağlıyor. Uzun kol yapısı ve yere doğru akış kazanan etek formu, elbiseyi hem konforlu hem de şık bir parça haline getiriyor.Hafif dokusu sayesinde gündelik kulla', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/equipment-elbise-on.jpg?v=1753710079']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Roberto Cavalli', 'Roberto Cavalli Elbise Mavi beyaz - 40', 'Açıklama  Desenli, dantel detaylı, önden düğmeli Roberto Cavalli elbise, zamansız bir şıklık sağlar.     Öne Çıkan Özellikler     Tasarım: Desenli, dantel detaylı, düğmeli elbise.   Malzeme: İpek.   Renk: Siyah.   Beden: 40.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/roberto-cavalli-elbise-on.jpg?v=1753711021']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Dior', 'Christian Dior Topuklu Ayakkabı -37', 'Ürün Bilgisi    Renk: Siyah - Mavi  Beden: 37   Topuk Yüksekliği: 10 cm  Editör Notları:  Bu Dior topuklu ayakkabı, markanın zamansız zarafetini modern bir yorumla buluşturan sivri burunlu klasik stiletto modelidir. İnce ve dengeli topuğu bacağı daha uzun ve zarif gösterirken, lacivert–siyah tonların dokulu geçişi ayakkabıya sofistike ve güçlü bir karakter kazandırır. Şık davetlerden akşam kombinlerine, ofis stilinden özel günlere kadar rahatlıkla uyarlanabilen bu model, Dior’un minimal ama iddi', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-ayakkabi-yan.jpg?v=1760014764']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tory Burch', 'Tory Burch Hasır Sandalet Hasır - 37', '', 3754.55, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-burch-sandalet.jpg?v=1767178960', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-burch-sandalet-2.jpg?v=1767178961']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Sneaker Siyah - 38.5', 'AçıklamaPrada Black Velvet Trainers, Prada markasının şıklığı ve zarafeti ile spor ayakkabıları birleştirdiği özel bir modeldir. Velvet malzeme, ayakkabılara lüks bir dokunuş katarken, spor ayakkabıların rahatlığı ve fonksiyonelliği de bu tasarıma dahil edilmiştir. Prada''nın zamansız tasarımlarıyla tanınan bu model, hem günlük kullanımda hem de şık bir spor tarzı yaratmak isteyenler için mükemmel bir seçenektir. Öne Çıkan Özellikler   Tasarım: Siyah kadife taban üzerine kırmızı kadife cırt.  Kon', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-1.jpg?v=1781530317', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-3.jpg?v=1781530318', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-2.jpg?v=1781530317', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-4.jpg?v=1781530317']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'See By Chloe', 'See By Chloe Babet Siyah - 37', 'Açıklama See By Chloe babet, zamansız bir şıklık  ve her kombine uyum sağlar. Öne Çıkan Özellikler   Tasarım: Gold detaylı.  Renk: Siyah.  Beden: 37.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_9210.jpg?v=1746020436']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Aquazzura', 'Aquazzura , Loafer Bordo - 37', '', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquazzura-2.jpg?v=1777887194', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquazzura-1.jpg?v=1777887194', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquazzura-3.jpg?v=1777887194']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Pinko', 'Pinko Etek Bluz Takım 36', 'Ürün Bilgisi    Renk: Beyaz  Beden: 36  Editör Notları: Markanın feminen ama güçlü tasarım dilini yansıtan, vücuda oturan kalem (sheath) silüetli bir modeldir. Derin V yaka detayı ve önden boydan boya uzanan metal fermuarı, elbiseye modern ve iddialı bir karakter kazandırırken, bel kısmındaki form sayesinde silueti zarif şekilde toparlar. Açık renk tonu (kırık beyaz / ekru) elbiseyi hem sofistike hem de minimal gösterir.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarım', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Pinko-Takim-On.jpg?v=1767168885', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Pinko-Takim-Yan.jpg?v=1767168885']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Emilio Pucci', 'Emilio Pucci Elbise 34', 'Ürün Bilgisi    Renk: Siyah  Beden: S   Editör Notları: Siyah, vücuda tamamen oturan uzun kollu bir elbise. Ön kısımda sade bir siluet sunarken, arka bölümdeki geniş dantel panel tasarıma güçlü ve feminen bir vurgu katıyor. Dantel detayın zarif motifleri, bel hattını ince gösteren oval bir açıklıkla birleşerek elbiseye sofistike bir çekicilik kazandırıyor. Esnek kumaşı sayesinde hem rahat hem de iddialı bir görünüm arayanlar için ideal bir gece elbisesi.  Orijinallik ve Kalite Kontrolü  Peony Co', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/emilio-pucci-elbise-on_8e5c02d6-e15d-4acf-a1fd-cbc762e5953f.jpg?v=1755688427']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Yves Saint Laurent', 'Yves Saint Laurent Emmanuelle Bucket Bag', 'Ürün Bilgisi    Renk: Lacivert  Kumaş: Deri Kullanım izleri mevcuttur.  Editör Notları: Mat derinin yumuşak havası, parlak olmayan dokusuyla oldukça sade, doğal ve lüks bir görünüm sunuyor. Üst kısmındaki büzgülü form, çantayı hem günlük kullanım için pratik kılıyor hem de klasik çizgiyi modern bir tavırla birleştiriyor.Altın tonlu metal detaylar, lacivert-siyaha yakın koyu rengin üzerinde hafif bir kontrast oluşturarak tasarıma sofistike bir vurgu katıyor. Ayarlanabilir omuz askısı sayesinde he', 14999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-1.jpg?v=1778625726', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-2.jpg?v=1778625726', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-3_7eaa2a27-b249-463f-aa3a-382a299b8507.jpg?v=1778625726', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-4.jpg?v=1778625726']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Moncler', 'Moncler Mont Haki - 36', 'Ürün Bilgisi  Renk: kahverengi Beden: 36 Tasarım: Kuşak,kemer,katman görüntü detaylı Eksper Notları: Tok dokulu teknik kumaşı, gerçek kürk detaylı kapüşonu ve belde toparlanan formuyla hem sıcak tutan hem de şehir stiline uyumlu bir Moncler modeli. Hafif yapısına rağmen güçlü ısı koruması sunan bu tasarım, kış için fonksiyonel ve şık bir seçenek.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 o', 25000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mont-on.jpg?v=1759473029']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Oscar De La Renta', 'Oscar De La Renta Kaban Lacivert - 36', 'Ürün Bilgisi  Renk: Lacivert Beden: 36 Tasarım: Kuşak,kemer,katman görüntü detaylı Kumaş İçeriği: Kaşmir  Eksper Notları: Bu parça, klasik bir kabanın modern çizgilerle yeniden yorumlanmış heykelsi bir formu. Üstteki kısa panel tasarıma katmanlı bir görünüm verirken, beldeki ton sür ton kemer silueti zarifçe topluyor. Alt kısmın hafif açılan kesimi hareket alanı yaratıyor ve bütün hatlara yumuşak bir denge katıyor. Tok ve kaliteli kumaşı formunu koruyarak derin lacivert tonunu daha da belirginle', 22000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kaban-on.jpg?v=1759501017', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/oscar1.jpg?v=1769622985', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/oscar2.jpg?v=1769622985']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Max Mara', 'Max Mara Mont Siyah - 38', '', 17299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maxmara1.jpg?v=1769672996', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maxmara2.jpg?v=1769672996', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maxmara4.jpg?v=1769672996', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maxmara3.jpg?v=1769672996']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Max Mara', 'Max Mara Triko - M', 'Ürün Bilgisi    Tasarım: Kapüşon ve yaka ip detaylı.  Kumaş İçeriği: Yün.  Renk: Ekru.  Beden: Medium  Eksper Notları:  Yumuşak bej tonunda, minimal çizgilere sahip rahat kesim bir hoodie. İnce dokulu esnek kumaşı sayesinde formunu korurken aynı zamanda konforlu bir kullanım sunuyor. Düşük omuz detayı parçaya modern ve hafif oversize bir hava katarken, kapüşon ve ince ayar bağcıkları tasarımı sportif bir şıklıkla tamamlıyor. Günlük kombinlerde sakin, sofistike ve zamansız bir duruş arayanlar içi', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/max-mara-kap-kahve-on.jpg?v=1759483456']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Roberto Cavalli', 'Roberto Cavalli Gömlek Haki - 36', 'Öne Çıkan Özellikler   Malzeme: İpek.  Renk: Haki.  Beden: 36.  Ölçü: En:50 cm Boy 72 cm   Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/roberto-cavalli-gomlek-on.jpg?v=1753711071']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Joseph', 'Joseph Bluz Siyah - 38', 'Ürün Bilgisi  Renk: Siyah Beden: 38 Tasarım: Yaka Düğme Detaylı Kumaş İçeriği: İpek Eksper Notları: Akışkan kumaşı ve rahat kesimi sayesinde vücutta doğal bir siluet oluşturuyor. V yaka formuna doğru açılan sade detay, parçayı hem günlük kombinlerde hem de iş ortamında modern ve düzenli bir görünüme taşıyor. Rahatlık ve şıklığı bir arada isteyenler için ideal. Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır. Kondisyon Durumu 10/10  Orijinallik ve Kalite KontrolüPeony Collective’de tüm', 4499, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/joseph-3.jpg?v=1749113619']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Joseph', 'Joseph Bluz Ki̇remi̇t - 38', 'Ürün Bilgisi  Renk:Kiremit Beden:38 Tasarım: Düğme Detaylı Kumaş İçeriği: İpek Eksper Notları:Yumuşak dokusu ve rahat kesimi sayesinde vücuda doğal bir şekilde oturuyor. V yakaya doğru açılan zarif yaka detayı hem gündelik stile hem işe giderken tercih edilecek kombinlere modern bir hava katıyor. Hem konforlu hem şık görünmek isteyenler için ideal bir üst. Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır.Kondisyon durumu 10/10  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünl', 4499, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/joseph-kiremit.jpg?v=1749113555']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Peter Pilotto', 'Peter Pilotto Triko Xs', 'Ürün Bilgisi   Beden: Xs  Renk: Renkli  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kazak-on_16710715-4cad-4e88-b93a-187d4f8e1399.jpg?v=1765457867', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kazakyan.jpg?v=1765457866', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kazak-arka_2a20d409-01af-4f61-ab86-24db00f0f9e6.jpg?v=1765457866']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gianfranco Ferre', 'Gianfranco Ferre Hırka Bej - Xs', 'Açıklama  Gümüş düğme, siyah şerit detaylı Gianfranco Ferre hırka, zamansız bir şıklık sağlar.     Öne Çıkan Özellikler     Tasarım: Gümüş düğme, siyah şerit detaylı.   Malzeme: Penye pamuk.   Renk: Bej.   Beden: Xs.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hirka-on.jpg?v=1759473995']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Max Mara', 'Max Mara Pantolon Gri - 38', 'Açıklama  Max Mara pantolon, her kombine uyum sağlar.  Öne Çıkan Özellikler     Malzeme: Yün.   Renk: Gri.   Beden: 38.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maxmara1_40bfb0d5-dab0-4cd0-adab-81b5617d45c1.jpg?v=1770799698', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maxmara2_d0edb1e9-bad6-47b4-8cea-585038c71bad.jpg?v=1770799698', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maxmara3_13860a90-6732-4a25-aa56-e5eae6b49a9b.jpg?v=1770799698', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maxmara4_13e116a2-8fb6-4470-ba87-840b6265d9b0.jpg?v=1770799698']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Acne Studios', 'Acne Studios Sneaker 40', 'AçıklamaAcne Studios Sneaker, kombinlerinizde eşsiz bir şıklık sağlayacak.   Öne Çıkan Özellikler   Tasarım: Ponpon detaylı.  Renk: Beyaz.  Beden: 40.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/achne-studyo-sneaker-on.jpg?v=1748266686']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'The Frankie', 'The Frankie Kazak S', 'Ürün Bilgisi    Tasarım: Boğazlı kazak.  Malzeme: Örme.  Renk: Siyah-Beyaz.  Beden: Small  Editör Notları:  Siyah–ekru çizgili, yüksek yakalı triko crop kazak. Yumuşak dokulu, esnek örgüsü sayesinde hem konforlu hem de formunu koruyan bir yapıya sahip. Geniş ve dökümlü omuz kesimi, kısa ve kıvrımlı alt bitişle birleşerek modern, genç ve dinamik bir siluet oluşturuyor. Yüksek balıkçı yaka ise parçaya hem sıcaklık hem de sofistike bir vurgu katıyor. Minimal ama etkili stil arayanlar için çabasız b', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/KAZAK.jpg?v=1741605374']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Stella Mccartney', 'Stella Mccartney Bluz 40', 'Açıklama Stella McCartney bluz, yaz kombinlerinize şıklık katacak. Öne Çıkan Özellikler   Tasarım: Kolsuz bluz.  Renk: Turuncu.  Beden: 40.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_8260.jpg?v=1741178299']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Prada', 'Prada Kol Çantası', 'Prada Kol Çantası', 27000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_8594.jpg?v=1739246735']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Loro Piana', 'Loro Piana Loafer Lacivert - 37', '', 27000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_7512.jpg?v=1736948329', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_7508.jpg?v=1736948329', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_7514.jpg?v=1736948320', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_7515.jpg?v=1736948321', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_7516.jpg?v=1736948321', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_7521.jpg?v=1736948321']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ermanno Scervino', 'Ermanno Scervino Hırka Lacivert - 38', '', 3599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ermanno1.jpg?v=1770797647', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ermanno2.jpg?v=1770797647', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ermanno3.jpg?v=1770797647']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Yves Saint Laurent', 'Yves Saint Laurent ( YSL ) Gold Topuklu Platform Ayakkabı Si̇yah - 37,5', 'Ürün Bilgisi    Renk: Siyah  Beden: 37.5  Topuk Yüksekliği: 13 cm  Editör Notları:  Bu Saint Laurent platform topuklu ayakkabı, markanın güçlü ve zamansız siluet anlayışını yansıtan ikonik modellerden biridir. Pürüzsüz siyah deri yapısı, yuvarlatılmış burun formu ve kalın platform tabanı sayesinde yüksek topuğa rağmen dengeli ve iddialı bir duruş sunar. Topuk kısmındaki metal detay YSL’nin modern-lüks imzasını vurgularken, model genel olarak feminen, güçlü ve gece şıklığına çok yakışan bir karak', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yves-saint-laurent-gold-topuklu-platfo-7669-4_beb64a27-a806-4a46-b7f1-4adb065d6bcb.jpg?v=1735930489']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Yves Saint Laurent', 'Yves Saint Laurent (YSL )Burnu Açık Rugan Topuklu Ayakkabı Laci̇vert - 39,5', 'Ürün Bilgisi    Renk: Lacivert  Beden: 39.5  Editör Notları:  Bu Yves Saint Laurent topuklu ayakkabı, markanın feminen ama güçlü siluet anlayışını yansıtan platformlu peep-toe modeldir. Parlak siyah deri yüzeyi ve önden açık burun detayı sayesinde hem iddialı hem de sofistike bir duruş sunar. Yüksek topuğu platform tabanla dengelendiği için klasik stile göre daha konforlu bir kullanım sağlar. Akşam davetleri, kokteyller ve şık gece kombinleri için zamansız, güçlü ve karakterli bir YSL klasiğidir', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-2_ad1a96b7-6510-4e8f-9fc0-28b8d02930a5.jpg?v=1779286210', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-3_558690ba-69e3-4597-a4e8-f1b281925b4e.jpg?v=1779286210', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-5.jpg?v=1779286210', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl-1_5710d190-f7eb-411a-abd1-4858fc02d07b.jpg?v=1779286210']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Walter Steiger', 'Walter Steiger Deri Çizme Kahverengi̇ - 39', 'Ürün Bilgisi  Renk: Kahverengi Beden: 39 Tasarım: Kemer Detay  Kumaş İçeriği: Deri Eksper Notları: Doğal dokulu deri yüzeyi ve bilek üzerindeki metal tokalı kayış detayı tasarıma güçlü bir karakter katıyor. İnce ama dengeli topuğu bacak boyunu belirgin şekilde uzatırken, yumuşak kırışık form çizmeye modern bir hava veriyor. Hem elbiselerle hem dar paça pantolonlarla kolayca stil yükselten iddialı bir model.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından d', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/walter-steiger-high-cizme-kahverengi-r-3-4bad.jpg?v=1735930474']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Valentino', 'Valentino Geometrik Desenli Rugan Topuklu Ayakkabı Si̇yah - 40', 'Ürün Bilgisi    Renk: Siyah - Beyaz  Beden: 40 Made in Italy  Editör Notları:  Bu Valentino topuklu ayakkabı, markanın grafik ve iddialı tasarım dilini yansıtan, platform tabanlı ve yüksek topuklu bir modeldir. Siyah–krem kontrastlı geometrik desenli ön bant modern ve güçlü bir görünüm sunarken, kalın platform taban ve blok topuk ayağı dengeli şekilde destekleyerek konforu artırır. Ayak bileğinden ince bantlı tokalı tasarımı feminen bir duruş kazandırır; davetler, gece kombinleri ve iddialı stil', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/geometrik-desenli-rugan-deri-topuklu-a-5-8a62.jpg?v=1735930401']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Tommy Hilfiger', 'Tommy Hilfiger Çocuk Şort Kirmizi - 16-17y', 'Öne Çıkan Özellikler:   Tasarım: Marka yazı detaylı.   Malzeme: Polyester.   Renk: Kırmızı.   Beden: 16-17Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1200, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/erkek-cocuk-polyester-sort-9e7-aa.jpg?v=1735930371']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Stella Mccartney', 'Stella McCartney Jakarlı İpek Elbise Yeşi̇l - 38', 'Ürün Bilgisi   Renk:Yeşil  Beden:38 Editör Notları: yeşil tonuyla öne çıkan bu elbise, akıcı dokusu ve bütünsel desen yapısıyla karakter sahibi bir görünüm sunuyor. Üst bölümdeki büzgü detayları doğal bir hareket katarken, beldeki bağlama detayı formu düzenleyip daha dengeli bir siluet oluşturuyor.Uzun kol yapısı ve ayak bileğine doğru uzanan akışkan etek formu sayesinde hem gündelik kullanımda hem de özel davetlerde rahatlıkla tercih edilebilecek çok yönlü bir parça. Hafif parlak yüzeyi ve üzer', 7500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-mccartney-jakarli-ipek-elbise-3-9e4e5.jpg?v=1735930342']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Stella Mccartney', 'Stella McCartney Percy Bot Beyaz - 40', 'Ürün Bilgisi    Renk: Beyaz  Beden: 40  Kumaş İçeriği: Deri  Editör Notları:  Bu Stella McCartney bilek botu, markanın modern ve sürdürülebilir lüks anlayışını yansıtan kontrast topuklu ankle boot modelidir. Pürüzsüz beyaz vegan deri gövdesi, arkadan geçen gold fermuar detayı ve kaplumbağa desenli blok topuğuyla güçlü bir stil kontrastı yaratır. Keskin burun formu sayesinde silueti zarif gösterirken, rahat topuk yüksekliğiyle gün boyu konfor sunar. Hem jean hem elbise kombinlerinde fark yaratan,', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella1.jpg?v=1766566541', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella4.jpg?v=1766566557', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella2.jpg?v=1766566557', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella3.jpg?v=1766566557']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Sonia Rykiel', 'Sonia Rykiel Kapüşonlu Bebek Mont Renkli̇ - 2 yaş', 'Öne Çıkan Özellikler   Tasarım: İki ön cepli, kürk detay kapüşonlu.   Malzeme: Polyamid .   Renk: Renkli.   Beden: 2Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kiz-cocuk-polyamid-mont-da-059.jpg?v=1735930294']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Egzotik Baskılı Deri Stiletto Bordo - 39.5', 'Ürün Bilgisi    Renk: Bordo  Beden: 39.5  Editör Notları:  Bu Sergio Rossi topuklu ayakkabı, markanın zamansız ve feminen çizgisini yansıtan sivri burunlu klasik stiletto modelidir. Derin bordo tonundaki krokodil dokulu deri yüzeyi, ayakkabıya sofistike ve güçlü bir karakter kazandırırken ince ve yüksek topuğu silueti zarifçe uzatır. Keskin hatları sayesinde hem davetlerde hem de iddialı gece kombinlerinde rahatlıkla tercih edilebilecek, lüks ama abartısız bir tasarıma sahiptir.   Orijinallik ve', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-egzotik-baskili-deri-stil-ebb367.jpg?v=1735930287', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Sergio-rossi-bordo-ayakkabi-on.jpg?v=1767188873', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Sergio-rossi-bordo-ayakkabi-yan.jpg?v=1767188873', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Sergio-rossi-bordo-ayakkabi-arka.jpg?v=1767188873']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Topuklu Ayakkabı - 37', 'Ürün Bilgisi    Renk: Siyah  Beden: 37   Editör Notları:  Bu Sergio Rossi topuklu ayakkabı, markanın zarif ve feminen çizgisini modern bir detayla birleştiren şık bir stiletto modelidir. Siyah parlak deri gövdesi, uca doğru kullanılan leopar desenli detay ile güçlü ve sofistike bir kontrast yaratır; bu vurgu ayakkabıya karakter kazandırırken klasik görünümü daha iddialı hale getirir. İnce ve yüksek topuğu bacağı daha uzun ve zarif gösterir, sivri burun formu ise silueti netleştirir. Hem gece dav', 6220, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-leopar-detayli-rugan-topu-f-9e36.jpg?v=1735930278']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Süet Topuklu Ayakkabı Yeşi̇l - 39.5', 'Ürün Bilgisi    Renk: Yeşil  Beden: 39.5 Made in Italy.  Editör Notları:  Bu Sergio Rossi topuklu ayakkabı, markanın zamansız şıklığını yansıtan sivri burunlu, ince topuklu klasik stiletto formundadır. Süet dokulu yeşil rengiyle hem iddialı hem sofistike bir duruş sunarken, ayağı zarif gösteren dengeli kalıbı sayesinde feminen bir siluet oluşturur. Günlük şık kombinlerden davet ve gece stillerine kadar rahatlıkla uyarlanabilen bu model, minimal tasarımı ve kaliteli işçiliğiyle Sergio Rossi’nin i', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-ayakkabi-yesil-on.jpg?v=1767189657', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-ayakkabi-yesil-yan.jpg?v=1767189657', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-ayakkabi-yesil-arka.jpg?v=1767189658']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Sergio Rossi', 'Sergio Rossi Nubuk Topuklu Bot Gri̇ - 36', 'Ürün Bilgisi    Renk: Gri  Beden: 36  Kumaş İçeriği: Nubuk  Editör Notları:  Bu Sergio Rossi bilek botu, markanın imzası olan zarif silueti yansıtan stiletto topuklu ankle boot modelidir. Siyah süet dokusu ve sivri burun formu sayesinde ayağı ince gösterirken, altın tonlu ince topuğu feminen ve sofistike bir duruş kazandırır. Minimal tasarımıyla hem gece kombinlerinde hem de şık günlük stillerde rahatlıkla kullanılabilen, zamansız ve elegan bir Sergio Rossi klasiği.   Orijinallik ve Kalite Kontr', 5750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-nubuk-topuklu-bot-36-fe9351.jpg?v=1735930256', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio1.jpg?v=1766651401', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio2.jpg?v=1766651401', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio3.jpg?v=1766651401']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Sergio Rossi', 'Sergio Rossi Rugan Bootie Si̇yah - 37', 'Ürün Bilgisi    Renk: Siyah  Beden: 37  Kumaş İçeriği: Rugan  Editör Notları:  Bu Sergio Rossi bilek botu, markanın modern ve feminen çizgisini yansıtan rugansiyah deri ankle boot modelidir. Parlak lake yüzeyi, yuvarlatılmış sivri burun formu ve kalın blok topuğuyla hem şık hem konforlu bir siluet sunar. Yan fermuar detayı kolay kullanım sağlarken, güçlü topuk yapısı gün boyu rahatlık verir. Gece kombinlerinden ofis şıklığına kadar geniş bir kullanım alanına sahip, zamansız ve iddialı bir Sergio', 7650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi2.jpg?v=1769697233', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi1.jpg?v=1769697233', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi3.jpg?v=1769697233']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Sandro', 'Sandro Kapitone Deri Clutch Mor', 'Ürün Bilgisi    Malzeme: Deri   Renk: Mor.   Ölçü: 29 cm genişlik, 17 cm yükseklik, 7 cm derinlik.   Eksper Notları:  Sandro Paris imzalı, bordo–mor arası metalik tonda tasarlanmış, yumuşak formda bir clutch çanta. Kıvrımlı ve hacim kazandırılmış dokusu, çantaya modern bir heykelsi görünüm verirken; ışığı farklı açılardan yakalayan metalik yüzey tasarıma zarif bir ışıltı katıyor. Minimal ama dikkat çekici silueti sayesinde hem gece davetlerinde hem de daha casual şık kombinlerde rahatlıkla kulla', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sandro-kapitone-deri-clutch-76-43f.jpg?v=1735930226', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sandro-1.jpg?v=1778677189']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Salvatore Ferragamo', 'Salvatore Ferragamo Desenli Yağmurluk Si̇yah - 40', 'Ürün Bilgisi   Beden: Uzunluk 65 cm, en 55 cm, kol 64 cm  Renk: Siyah  Tasarım: Fermuar   Eksper Notları: Canlı deseniyle enerjiyi öne çıkaran bu ceket, çiçek ve geometrik çizgilerin bir araya geldiği özgün bir tasarıma sahip. Hafif yapısı sayesinde mevsim geçişlerinde konforlu bir kullanım sunarken, kapüşonu ve ayarlanabilir alt ucu günlük hayatta pratiklik sağlıyor. Kolu saran ribana detayları rüzgârı keserek sıcaklığı içeride tutuyor. Siyah zemin üzerine pembe ve kahve tonlarının kattığı hare', 7799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cicekli-ve-puantiyeli-yagmurluk-siyah--47c931.jpg?v=1735930208']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Rykiel Enfant', 'Rykiel Enfant Fırfırlı Bebek Etek Si̇yah - 2 yaş', 'Öne Çıkan Özellikler   Tasarım: Fırfırlı, minik taş detaylı.   Malzeme: Yün .   Renk: Siyah.   Beden: 2Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/firfirli-siyah-kiz-cocuk-etek-f0abef.jpg?v=1735930193']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Roland Mouret', 'Roland Mouret Kaban Açik mavi̇ - 38', 'Ürün Bilgisi  Renk: Mavi Beden: 38 Tasarım: Fermuar Kapama,Cep Detay Kumaş İçeriği: %52 viskon %26 polyamid, %18 Laine, %4 elastan. Eksper Notları: Bu parça, klasik bir kabanın modern çizgilerle yeniden yorumlanmış heykelsi bir formu. Üstteki kısa panel tasarıma katmanlı bir görünüm verirken, beldeki ton sür ton kemer silueti zarifçe topluyor. Alt kısmın hafif açılan kesimi hareket alanı yaratıyor ve bütün hatlara yumuşak bir denge katıyor. Tok ve kaliteli kumaşı formunu koruyarak derin lacive', 7999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Roland-Ceket-On.jpg?v=1767173555', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Roland-ceket-yan.jpg?v=1767173556', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Roland-Ceket-arka.jpg?v=1767173556']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Rochas', 'Rochas Dantel Midi Etek Renkli - Standart', 'İtalyan 40 beden karşılığı 36 beden. Boy 92 cm, bel 70 cm. Krem rengi koton dantel. Midi boydur, yandan ceplidir. Arkadan fermuarlıdır. %60 koton, %40 rayon.', 3331.4, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/midi-dantel-kalem-etek-c2f-78.jpg?v=1735930159']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Red Valentino', 'Red Valentino Dantel Detaylı Elbise Si̇yah - 40', 'Ürün Bilgisi   Renk: Siyah  Beden:40  Editör Notları:Siyahın klasik gücünü modern detaylarla buluşturan bu elbise, zarif çizgisini dantel dokunuşlarla tamamlıyor. Yüksek yaka formu ve omuzdaki hafif yapı, elbiseye temiz ve düzenli bir siluet kazandırırken, beldeki bağlama detayı formu toparlayıp daha dengeli bir görünüm sunuyor.Diz üstü uzunluğu ve uzun kol tasarımı sayesinde hem gündüz hem akşam kullanılabilir; ofis sonrası davetlerde, özel buluşmalarda veya sezonun şık etkinliklerinde rahatlık', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Red-Valentino-Elbise-On.jpg?v=1767174136', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Red-Valentino-Elbise-arka.jpg?v=1767174136']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Desenli Pantolon Krem - 16-17y', 'Ürün Bilgisi    Beden:  16-17 Yaş   Renk:Krem/Bej  Editör Notları:   Ralph Lauren’in zamansız Amerikan şıklığını yansıtan bu bej chino pantolon, tüm yüzeyine işlenmiş küçük arma/nakış detaylarıyla klasik stile sofistike bir dokunuş ekler. Temiz kesimi ve slim fit formu sayesinde hem gündelik hem de smart-casual kombinlerde rahatlıkla kullanılabilir. Minimal ama karakterli tasarımıyla gardırobun çok yönlü parçalarından biridir.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, u', 750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/erkek-cocuk-koton-pantalon-c233d1.jpg?v=1735930115']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Catch Me If You Can Kristal İşlemeli Slip On Sneaker Saks - 38.5', 'Saks mavisi teknik kumaş, yuvarlak burun, mavi deri astar, silikon taban.', 6220, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-runaway-diamond-sneaker-e-32c4.jpg?v=1735930099']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Kristal İşlemeli Süet Slip On Si̇yah - 39', 'Siyah süet, siyah taban, yuvarlak burun, siyah astar.', 7650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kristal-suslemeli-suet-deri-espadril-2d739c.jpg?v=1735930077']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Peter Pilotto', 'Peter Pilotto Blok Renkli Midi Elbise Mavi̇ - 34', 'Ürün Bilgisi   Renk:Mavi  Beden: 6 (italyan)   Editör Notları:Keskin mavi tonu ve heykelsi hatlarıyla öne çıkan bu elbise, modern zarafetin güçlü bir yorumunu sunuyor. Asimetrik yaka detayı tasarıma özgün bir hareket katarken, bel bölgesindeki kontrast şeritler silueti daha dengeli ve toparlanmış bir görünüme taşıyor. A-çizgi etek kesimi yürüdükçe akış kazanan zarif bir form yaratıyor.Renk ve kesim uyumuyla özel davetlerde, kokteyllerde ve akşam etkinliklerinde modern ve iddialı bir duruş isteye', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/elbise-on.jpg?v=1765458267', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/elbise-arka.jpg?v=1765458267']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Patrizia Pepe', 'Patrizia Pepe Fırfırlı Çocuk Pantolon Beyaz - M', 'Ürün Bilgisi    Renk: Beyaz.   Beden: M   Editör Notları:  Patrizia Pepe Kids imzalı bu beyaz pantolon, minimal ve zarif tasarımını paça ucundaki fırfır detayıyla hareketlendirir. Yumuşak dokulu ve esnek kumaşı sayesinde gün boyu konfor sunarken, sade çizgileriyle hem günlük hem de özel kombinlerde rahatlıkla kullanılabilir. Zamansız beyaz rengi, üst giyim ve ayakkabı seçimlerinde geniş kombin imkânı sağlar.    Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafı', 1100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/patrizia1.jpg?v=1776084232', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/patrizia2.jpg?v=1776084232']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Monalisa', 'Monnalisa Çiçekli Çocuk Triko - 6 Yaş', 'Öne Çıkan Özellikler   Tasarım: Sırt dekolteli, çiçek desenli.   Malzeme: Viskos.   Renk: Mavi.   Beden: 6Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kiz-cocuk-cicek-motifli-triko-5ef4f6.jpg?v=1735930041']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Monalisa', 'Monnalisa Gül Desenli Kısa Kol Çocuk Triko Krem - 8 yaş', 'Öne Çıkan Özellikler   Tasarım: Kısa kollu,desenli.   Malzeme: Yün karışımlı .   Renk: Krem.   Beden: 8Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kiz-cocuk-gul-desenli-kisa-kol-triko--4a8c.jpg?v=1735930032']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Missoni', 'Missoni Çizgi Tunik Mavi̇ - 36', 'Açıklama   Kahverengi, uzun tül detaylı kol, V yaka Missoni bluz, zamansız bir tarz ve şıklık sunuyor.     Öne Çıkan Özellikler     Tasarım: Tül detaylı kol, V yaka.   Malzeme: %57 rayon, %16 polyester, %11 ipek.    Renk: Kahverengi.   Beden: 36.      Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Missoni-Bluz-On.jpg?v=1767172263', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Missoni-bluz-Yan.jpg?v=1767172262', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Missoni-Bluz-arka.jpg?v=1767172263']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Missoni', 'Missoni Çizgili Hırka Yeşi̇l - 38', 'Açıklama Missoni çizgili hırka, kombinlere şıklık katar. Öne Çıkan   Tasarım:  Kısa kollu, cep detaylı   Malzeme: %57 rayon, %16 polyester, %11 ipek.   Renk:   Yeşil.   Beden:  İtalyan 42, Tr 38.     Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 7700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Missoni-Hirka-On.jpg?v=1767173282', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Missoni-Hirka-Yan.jpg?v=1767173282', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Missoni-Hirka-Arka.jpg?v=1767173282']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Mehry Mu', 'Mehry Mu Fey Pom Pom Hazeran ve Deri Çanta Desenli̇ - Standart', 'Mehry Mu''nun yumuşak yavruağzı tonundaki deri ve hazeran karışımı çantası, gold metal detaylar ve renkli süet püsküllerle tamamlanıyor. Uzun deri askısı ve tutma sapı ile hem elde hem de omuzda taşınabiliyor. Ekstra bir cüzdan da içeriyor. Yükseklik 23 cm, genişlik 26 cm, derinlik 12 cm.        Orijinallik ve Kalite Kontrolü:  Peony Collective’de her ürün uzmanlarımız tarafından incelemeden geçirilir. Buna ek olarak, kalite ve orijinallik açısından güvence sağlamak için Entrupy teknolojisi kulla', 9500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mehry-mu-1.jpg?v=1778627163', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mehry-mu-2.jpg?v=1778627163', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mehry-mu-3.jpg?v=1778627163']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Marni', 'Marni Square Midi Etek - 38', 'Ürün Bilgisi  Renk: Mavi,Kahverengi Beden: 38 Tasarım: Geometrik Desem Kumaş İçeriği: %52 Yün,%48 İpek Eksper Notları: Desenin ritmik tekrarı parçaya hem retro hem modern bir hava katarken, belden oturan ve aşağı doğru hafif genişleyen kesimi temiz bir siluet oluşturuyor. Hafif yapısı sayesinde hareket ettikçe akışkan duran, sade bir üstle bile güçlü bir kombin yaratan dinamik bir model. Eksper Puanı: Ürünün tüm incelmesi tarafımızca yapılmıştır.Kondisyon Durmu 10/10  Orijinallik ve Kalite Kontr', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marni-square-midi-etek-acik-mavi-renk--682-be.jpg?v=1735929965']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Marni', 'Marni Volanlı Krep Bluz Si̇yah - 38', 'Ürün Bilgisi   Tasarım: Etekleri volan detaylı krep bluz.  Kumaş İçeriği: %63 asetat, %37 polyester.   Renk: Siyah.  Beden: 38  Editör Notları:         Siyah renkte, yapılandırılmış kumaştan tasarlanmış kolsuz bir mini elbise. Üst gövde daha sade ve fit bir formdayken, etek kısmında yer alan geniş, mimari tarzda açılan paneller elbiseye heykelsi bir hareket kazandırıyor. Bel hattından aşağı doğru yarım çan şeklinde açılan bu asimetrik volan, tasarımı hem modern hem de çabasız şık bir görünüme ta', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marni-volanli-krep-bluz-38--4bcf.jpg?v=1735929954']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Marc Jacobs', 'Marc Jacobs Çocuk Eşofman Gri̇ - 6 yaş', 'Öne Çıkan Özellikler:   Tasarım: Yazı ve renkli fermuar detaylı.   Malzeme: Koton.   Renk: Gri.   Beden: 6Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pacasi-lastikli-klasik-esofman--a173.jpg?v=1735929938']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Taşlı Kadife Dolgu Topuk Ayakkabı Bordo - 40', 'Bordo renkli kadife. Siyah renkli taban. Yuvarlak ve kapalı burun. Bordo renkli deri iç astar. Bordo renkli kristal süslemeli topuk. Üretim yeri İtalya. Orijinallik kodu: BL 0151', 12655, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louis-vuitton-tasli-kadife-dolgu-topuk--4ccf.jpg?v=1735929917']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Fiyonklu Sandalet Si̇yah - 36.5', 'Siyah renkli saten. Siyah renkli taban. Yuvarlak ve açık burun. Siyah renkli deri iç astar. Üretim yeri İtalya. Orijinallik kodu: SC 0153', 6220, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louis-vuitton-fiyonklu-sandalet-36-5a162.png?v=1735929902']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Louis Vuitton', 'Louis Vuitton Kilit Detaylı Rugan Topuklu Ayakkabı Si̇yah - 36.5', 'Ürün Bilgisi:   Renk: Siyah  Beden: 36.5  Made in Italy  Editör Notları:  Bu Louis Vuitton topuklu ayakkabı, markanın zamansız feminen çizgisini yansıtan açık burunlu (peep-toe), ince topuklu bir modeldir. Parlak siyah rugan deri yüzeyi şık ve iddialı bir duruş sunarken, arkadaki gold tonlu LV kilit detayı modele ikonik ve sofistike bir imza katar. İnce topuk ve zarif kesim bacağı daha uzun ve ince gösterir; gece davetleri, kokteyller ve özel akşam kombinleri için güçlü ama klasik bir tamamlayıc', 7650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-kilit-ayakkabi-on.jpg?v=1767185795', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-kilit-ayakkabi-yan.jpg?v=1767185795', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-kilit-ayakkabi-arka.jpg?v=1767185795', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-kilit-ayakkabi-detay.jpg?v=1767185795']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Süet ve Deri Sneaker Si̇yah - 36.5', 'BEDEN&amp;KALIP •NUMARA: 36,5 DETAYLAR •Siyah renkli süet ve deri •Bağcıklı ve yuvarlak burunludur •Ön kısmı siyah deri •Yan taraflarında vizon renkli Louis Vuitton logolu şerit bulunmaktadır', 3800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/suet-ve-deri-spor-ayakkabi-siyah-renk--152-d5.png?v=1735929872']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Montaigne PM Epi Deri Çanta Krem - Standart', 'Fransız modaevi Louis Vuitton, Montaigne Bowling PM modelini ilk kez 2006 yılı civarında satışa sundu. Markanın klasik Epi deri koleksiyonunun bir parçası olarak tanıtılan ve zamansız tasarımıyla dikkat çeken bu zarif ve ikonik tasarım, beyaz Epi deriden üretilmiş olup, fermuarlı kapama, cepli bej astar ve gümüş renkli metal detaylarla tamamlanıyor. 33 cm genişlik, 20 cm yükseklik ve 18 cm derinlik ölçülerine sahip model, her kombine zarif bir dokunuş katmak isteyenler için ideal seçim.', 37999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lvbah.jpg?v=1759495106', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-pm-2.jpg?v=1778671546', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-pm-3.jpg?v=1778671546', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-pm1.jpg?v=1778671545']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Desenli Kanvas Babet Laci̇vert - 36', 'Lacivert kanvas kumaş. Desenli. Yuvarlak burunlu. Deri iç astar.', 5700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-babet-1.jpg?v=1781618481', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-babet-2.jpg?v=1781618481', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-babet-3.jpg?v=1781618481', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lv-babet-4.jpg?v=1781618481']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Fiyonklu Rugan Babet Yeşi̇l - 36', 'Ön tarafında fiyonk toka detayı. Yeşil rugan deri. Yuvarlak burunlu.', 6500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fiyonk-detay-rugan-babet-70cde3.jpg?v=1735929837']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Ballerinas Babet Fuşya - 37.5', 'Fuşya süet dış yüzey.Fuşya silikon taban. Fuşya renkli deri iç astar. Yuvarlak ve kapalı burun. Topuk yüksekliği 0,5 cm. Üst kısmında fiyonk ve gold LV detayı. Üretim yeri İtalya.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louis-vuitton-ballerinas-babet-80-aec.jpg?v=1735929829']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Little Eleven', 'Little Eleven Çocuk Şort Gri̇ - 8 yaş', 'Öne Çıkan Özellikler:   Malzeme: Koton .   Renk: Gri.   Beden: 8Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 450, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kiz-cocuk-koton-sort-3-0a0c.jpg?v=1735929817']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Kenzo', 'Kenzo Jean Si̇yah - 28', 'Uzunluk 102 cm, en 36 cm. Dar kesim. İki adet cep detayı. Dizler ve kenarlar dikişli. Hiç kullanılmamıştır. %98 koton, %2 elastan.', 4325.8, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/motorcu-dikisli-denim-pantolon--b6f8.jpg?v=1735929810']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Juicy Couture', 'Juicy Couture Eşofman Üstü Gri̇ - S', 'Fermuarlı açma kapama, kapüşonlu, iki cepli. %78 koton, %22 polyester. Uzunluk 51 cm, en 41 cm, kol 53 cm. Üretim yeri Vietnam.', 1930, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/juicy-couture-gri-esofman-ustu-s--e18b-4.jpg?v=1735929799']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Kıyafet', 'Elbise', 'Juicy Couture', 'Juicy Couture Etnik Desenli Çocuk Elbise Renkli̇ - 6 yaş', 'Öne Çıkan Özellikler:   Tasarım: Desenli, etek pileli.   Malzeme: Viskos .   Renk: Renkli.   Beden: 6Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/juicy1.jpg?v=1776070915', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3124.jpg?v=1776070938']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Joseph', 'Joseph Kolları Cepli Kaşmir Kazak Krem - Xs', 'Ürün Bilgisi   Kumaş İçeriği: Kaşmir.  Renk: Krem.  Beden: Xsmall  Ölçü: Uzunluk 90 cm, en 42 cm, kol 67 cm  Editör Notları:  Nude–bejin yumuşak tonlarında, ince nervürlü örgü dokusuyla tasarlanmış triko bir elbise. Vücuda yakın oturan silueti, hem rahat hem de feminen bir görünüm sunarken; keskin omuz çizgisi olmayan sade üst tasarım elbiseyi tamamen dokusuyla öne çıkarıyor. Kolların ortasındaki hafif kesit detayı, klasik triko elbise formuna modern bir dokunuş katıyor. Günlük şıklığa çabasız b', 3790, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/joseph-on.jpg?v=1759483822']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Jonathan Saunders', 'Jonathan Saunders İpek Koton Etek Si̇yah - Standart', 'BEDEN &amp; KALIP •UK:6 / TR :36 BEDEN •ÖLÇÜLER;  BOY: 66 cm/ BEL: 69 cm •Bedeniyle uyumludur •Belden oturur, aşağıya doğru pilelerle açılır •Yan dikişleri ceplidir DETAYLAR •Antrasit üzerine beyaz desenli ipek koton •Astarsızdır, iç göstermez •KUMAŞ IÇERIĞI;  %84 PAMUK, %16 IPEK •Sadece Kuru Temizleme', 3360, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dizalti-ipek-koton-etek-92dd76.jpg?v=1735929759']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Jimmy Choo', 'Jimmy Choo Metalik Platform Stiletto Gold - 39.5', 'Ürün Bilgisi    Renk: Gold  Beden: 39.5 Made in Italt  Editör Notları:  Bu Jimmy Choo topuklu ayakkabı, markanın davet ve gece stiline yönelik zarif çizgisini yansıtan klasik bir platformlu stiletto modelidir. Gümüş tonlu, ışıltılı dokulu yüzeyi sayesinde ışığı güçlü şekilde yansıtarak dikkat çekerken, ince ve yüksek topuğu feminen bir siluet yaratır. Ön kısmındaki hafif platform, topuk yüksekliğini dengeler ve daha konforlu bir kullanım sunar. Özel davetler, gece organizasyonları ve şık kokteyl', 6935, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/jimmy-choo-1.jpg?v=1781512479', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/jimmy-choo-2.jpg?v=1781512479', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/jimmy-choo-3.jpg?v=1781512479']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Isabel Marant', 'Isabel Marant Tüvit Kruvaze Ceket Mavi̇ - 36', 'Ürün Bilgisi   Tasarım: Dokulu Yapı,İnce Kırmızı Detaylar  Kumaş İçeriği: %34 Akrilik %54 Pamuk  Renk: Lacivert  Beden: 36  Eksper Notları:Lacivert tonlarda tasarlanan bu kısa ceket, dokulu kumaşı ve yırtık görünümlü kenar detaylarıyla özgün bir stile sahip.Asimetrik düğme kapanışı ve ince kırmızı dikişler modele canlı bir vurgu katarken, bel hattını toparlayan kalıbı şık bir siluet oluşturuyor.Jean’lerle rahat, etek ve topuklularla daha iddialı bir görünüm yaratmak için ideal bir parça.  Eksper', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/isabel-marant-ceket-on.jpg?v=1759475685']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Süet Topuklu Sandalet Si̇yah - 38.5', 'Siyah renkli süet deri. Siyah renkli taban. Yuvarlak ve açık burun. Siyah renkli deri iç astar. Üretim yeri İtalya. Orijinallik kodu: 247707', 6935, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-suet-topuklu-sandalet-38-a2-488.jpg?v=1735929720']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Giuseppe Zanotti', 'Giuseppe Zanotti Süet Topuklu Ayakkabı Si̇yah - 36', 'Ürün Bilgisi    Renk: Siyah  Beden: 36   Editör Notları:  Bu Giuseppe Zanotti topuklu ayakkabı, markanın feminen ama güçlü siluet anlayışını yansıtan zamansız bir modeldir. Süet dokulu siyah dış yüzeyiyle son derece sofistike bir duruş sunarken, platform tabanı ve ince yüksek topuğu bacağı daha uzun ve zarif gösterir. Kapalı burun formu klasik şıklığı korurken, dengeli kalıbı sayesinde özel davetlerden gece kombinlerine kadar rahatlıkla tercih edilebilecek iddialı ve şık bir seçenektir.   Orijin', 6510, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-ayakkabi-on.jpg?v=1767178352', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-ayakkabi-yan.jpg?v=1767178352', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-ayakkabi-arka.jpg?v=1767178352']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Giuseppe Zanotti', 'Giuseppe Zanotti Piton Baskılı Deri Stiletto Krem - 40', 'Ürün Bilgisi    Renk: Krem  Beden: 40  Topuk Yüksekliği: 12 cm  Made in Italy  Editör Notları:  Bu Giuseppe Zanotti topuklu ayakkabı, markanın imza zarafetini yansıtan sivri burun stiletto formunda tasarlanmış olup, yılan derisi dokulu (snake-effect) yüzeyi ile güçlü ve iddialı bir duruş sunar. İnce ve yüksek topuğu bacağı daha uzun gösterirken, keskin hatlı burun yapısı modeli feminen ve sofistike bir çizgiye taşır. Hem gece davetlerinde hem de minimal kombinlerle öne çıkmak isteyenler için zam', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-piton-baskili-deri-st-2bb-48.png?v=1735929693']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Giuseppe Zanotti', 'Giuseppe Zanotti Zımbalı Süet Makosen Si̇yah - 38', 'Siyah renkli süet. Siyah renk taban. Siyah renkli deri iç astar. Gold zımba detayı. Kapalı burun. Üretim yeri İtalya.', 6510, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-1.jpg?v=1777886766', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-2.jpg?v=1777886766', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-3.jpg?v=1777886766', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-4.jpg?v=1777886766', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/suet-zimbali-makosen-fb8106.jpg?v=1735929681']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gianvito Rossi', 'Gianvito Rossi Metalik Deri Topuklu Ayakkabı - 37', 'Ürün Bilgisi    Renk: Vizon  Beden: 37  Editör Notları:  Bu Gianvito Rossi topuklu ayakkabı, markanın imzası haline gelen zarif ve feminen stiletto çizgisini yansıtan sofistike bir modeldir. Metalik rose-gold tonlu derisi ve sivri burun formu ayağı daha ince ve uzun gösterirken, burun ucundaki metal kaplama detayı tasarıma modern ve güçlü bir vurgu katar. İnce topuğu sayesinde silüeti netleştirir; hem davetlerde hem de şık akşam kombinlerinde rahatlıkla kullanılabilecek, minimal ama iddialı bir', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Gianvito-rossi-ayakkabi-yan.jpg?v=1767176627', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Gianvito-rossi-ayakkabi-on.jpg?v=1767176627', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Gianvito-rossi-ayakkabi-arka.jpg?v=1767176627']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gianvito Rossi', 'Gianvito Rossi Süet Stiletto Kirmizi - 40', 'Ürün Bilgisi    Renk: Kırmızı  Beden: 40   Editör Notları:  Bu Gianvito Rossi topuklu ayakkabı, markanın imzası hâline gelen zarif silüeti yansıtan sivri burunlu, ince topuklu klasik bir stiletto modelidir. Süet dokulu canlı kırmızı rengiyle feminen ve iddialı bir duruş sunarken, ayağı saran temiz kesimi bacağı daha uzun ve ince gösterir. Minimal tasarımı sayesinde özel davetlerden şık akşam kombinlerine kadar güçlü ve sofistike bir tamamlayıcı olarak öne çıkar.   Orijinallik ve Kalite Kontrolü', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-kirmizi-suet-stiletto-4-a-48a7.jpg?v=1735929659', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bilek-detayli-suet-stiletto-570-8a.jpg?v=1735929659', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bilek-detayli-suet-stiletto-fdb605.jpg?v=1735929659', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bilek-detayli-suet-stiletto-f3-4f4.jpg?v=1735929659', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bilek-detayli-suet-stiletto-ea78dc.jpg?v=1735929659']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gianvito Rossi', 'Gianvito Rossi Kadife Topuklu Ayakkabı Bordo - 40', 'Ürün Bilgisi    Renk: Bordo  İçerik:Kadife  Numara:40  Editör Notları:Zamansız şıklığın en güçlü temsilcilerinden biri olan Gianvito Rossi bordo kadife stilettolar, sofistike dokusuyla her adımda zarafeti hissettiriyor. Derin bordo tonu ve kadifenin yumuşak dokusu akşam görünümlerini zahmetsizce yükseltirken, ince topuk silueti feminen duruşu kusursuz bir şekilde tamamlıyor. Hem özel davetlerde hem de güçlü bir gece stilinde tek başına fark yaratacak bir parça.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kadife-topuklu-ayakkabi-bordo-renk-40--9-5075.jpg?v=1735929649', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bordo1.jpg?v=1766669484', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bordo2.jpg?v=1766669485', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bordo3.jpg?v=1766669485']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gianvito Rossi', 'Gianvito Rossi Metalik Deri ve PVC Topuklu Ayakkabı Gri̇ - 37', 'Ürün Bilgisi    Renk: Gri  Beden: 37  Made in Italy  Editör Notları:  Bu Gianvito Rossi topuklu ayakkabı, markanın zarif ve modern tasarım anlayışını yansıtan ikonik bir stilettodur. Şeffaf PVC yan panelleri ayağı hafif ve ince gösterirken, metalik sivri burun detayı tasarıma sofistike ve çağdaş bir vurgu katar. İnce ve dengeli topuğu feminen bir siluet sunar; hem gece davetlerinde hem de şık şehir kombinlerinde güçlü ama zarif bir tamamlayıcı olarak öne çıkar.   Orijinallik ve Kalite Kontrolü P', 5650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-metalik-deri-ve-pvc-top-0-44ab.jpg?v=1735929617']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gianvito Rossi', 'Gianvito Rossi Deri Sneaker Vi̇zon - 37', 'Açıklama Gianvito Rossi deri sneaker, zamansız bir şıklık sağlar. Öne Çıkan Özellikler   Tasarım: Bağcıklı deri sneaker.  Malzeme: Deri.   Renk: Vizon.  Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-leather-sneaker--7af5f.jpg?v=1735929605']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gianvito Rossi', 'Gianvito Rossi Süet Topuklu Sandalet Si̇yah - 36', 'BEDEN&amp;KALIP •NUMARA:36 •TOPUK YÜKSEKLIĞI: 11 cm DETAYLAR •Siyah renkli süet deri •Açık ve yuvarlak burunlu  •Siyah renkli süet taban •Krem renkli deri iç astar  •Bileği saran ip detaylı  •ORJINALLİK KODU:30414 12559 •MADE IN ITALY', 4218, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-suet-topuklu-sandalet-3-c55e-4.png?v=1735929595']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gianvito Rossi', 'Gianvito Rossi Deri Western Çizme Si̇yah - 36.5', 'Ürün Bilgisi    Renk: Siyah  Beden: 36.5  Kumaş İçeriği: Deri  Editör Notları:  Bu Gianvito Rossi diz altı çizme, markanın zamansız siluetlerini yansıtan klasik blok topuklu knee-high modeli olarak öne çıkıyor. Yumuşak siyah deri yapısı, hafif sivri burun formu ve dengeli orta topuğuyla hem şık hem konforlu bir kullanım sunar. Minimal tasarımı sayesinde günlük kombinlerden ofis stiline, elbise ya da dar paça pantolonlarla rahatça eşleşebilen, sofistike ve uzun ömürlü bir Gianvito Rossi parçasıdı', 8999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito2.jpg?v=1766568509', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito1.jpg?v=1766568509', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito4.jpg?v=1766568496']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi Continental Cüzdan Vi̇zon', 'BEDEN&amp;KALIP  ÖLÇÜLER; YÜKSEKLİK: 10 cm / GENİŞLİK: 19  cm / DERİNLİK: 3 cm cm  DETAYLAR •Vizon renkli deri •Ön kısmında gümüş ikonik marka düğmesi •Açma kapama kısmı fermuarlı •İç kısmı vizon renkli deri  •Kartlık bölümleri mevcut •Made in ITALY', 7500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-continantel-cuzdan-f-c81e.jpg?v=1735929561']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi Deri Bootie - 38', 'Ürün Bilgisi    Renk: Lacivert  Beden: 38  Kumaş İçeriği: Deri  Editör Notları:  Bu Fendi bilek botu, markanın sofistike şehir stilini yansıtan ankle boot modelidir. Lacivert pürüzsüz deri gövdesi, yuvarlak burun formu ve dikkat çeken dokulu blok topuğuyla hem modern hem güçlü bir siluet sunar. Yan fermuar detayı pratik kullanım sağlarken, kalın topuk yapısı gün boyu konfor verir. Günlük şıklıkta, ofis kombinlerinde ya da akşam stilinde rahatlıkla kullanılabilecek zamansız ve karakterli bir Fend', 9299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-bot.jpg?v=1766570257', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/3.jpg?v=1766570257', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/2.jpg?v=1766570257']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fabianna Filippi', 'Fabianna Filippi Çizgili Ceket Renkli̇ - 38', 'Ürün Açıklaması:   Beden:38   Renk:Bej/Gri   Tasarım:Düğme Kapama,Çizgili,Astar,Cep   Kumaş İçeriği:100%Pamuk   Eksper Notları:yumuşak dokulu çizgili kumaşı ve hafif oturan kesimiyle doğal bir şıklık sunuyor. İki düğmeli yapısı ve kısa formu silueti düzenli gösterirken, iç astardaki mikro desen parçaya beklenmedik bir karakter detayı katıyor. Günlük şehir stiline kolayca uyum sağlayan hafif ve modern bir tasarım.   Eksper Puanı:Ürünün Tüm İncelemesi Tarafımızca Yapılmıştır.Kullanım Yıpranması Bu', 2200, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/koton-ceket-renkli-renk-38-beden-b1d0-4.jpg?v=1735929520']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Etro', 'Etro Şal Desenli Gömlek Desenli̇ - 38', 'Ürün Bilgisi   Beden : 38 Renk: Çok Renkli/Etnik desenli Ölçü: Uzunluk 61 cm, En 44 cm ve kol 56 cm  Kıyafet İçeriği: %97 KOTON  %3 ELASTAN  Eksper Puanı: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır. 10/10  Eksper Notları:  Etro’nun imza dokunuşu olan çok renkli paisley motifleri, ipek hissiyatlı akışkan kumaşla birleşerek şık ve zamansız bir görünüm sunuyor. Hem denimlerle casual bir stile uyarlanabilir hem de daha klasik parçalarla kolayc', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/etro-gomlek1.jpg?v=1769852268', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/etro-gomlek2.jpg?v=1769852268', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/etro-gomlek3.jpg?v=1769852268']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ermanno Scervino', 'Ermanno Scervino Kalem Etek Beyaz - 40', 'Öne Çıkan Özellikler   Malzeme: %50 Asetat  %47 Visko    Renk: Beyaz.  Beden: IT:44 TR:40  Bel: 40 cm Boy: 90cm  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 4790, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/klasik-kalem-etek-58a5-8.jpg?v=1735929464']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Elie Tahari', 'Elie Tahari Kemer Detaylı Mini Elbise Fuşya - 38', 'Ürün Bilgisi   Renk:Kırmızı  Beden:38 Editör Notları: Canlı renk tonuyla enerji veren ve zarif silüeti ile vücudu ince uzun gösteren çok kullanışlı elbise.  Orijinallik ve Kalite KontrolüPeony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/elie-tahari-elbise-on.gif?v=1754311567']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Dsquared2', 'Dsquared Kolsuz Triko Elbise Siyah - 38', 'Ürün Bilgisi    Renk:  Siyah   Beden: 42 (İtalyan) /38   Materyal: %65 viskon, %35 polyester Ölçü: Göğüs: 86–88 cm  Bel: 68–70 cm  Basen: 92–94 cm  Omuzdan boy: 118–122 cm  Editör Notları: Siyah, tek omuz detaylı Dsquared2 elbise. Üst bölümde yer alan drape ve heykelsi fiyonk formu, tasarıma dramatik ve couture bir etki katarken, vücudu tamamen saran kalem siluet elbiseyi keskin ve feminen bir çizgiye taşıyor. Omuzdaki asimetrik yapı modern bir vurgu yaratıyor; temiz dikiş geçişleri ise markanın', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dsquared-kolsuz-triko-elbise-38-565a4e.png?v=1735929418']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Dolce & Gabbana', 'Dolce & Gabbana Dantel Detaylı Bluz Gri̇ - 8 yaş', 'Öne Çıkan Özellikler   Tasarım: Dantel detaylı.   Malzeme: Koton.   Renk: Gri.   Beden: 8Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kiz-cocuk-dantel-detayli-tisort-3-4f33.jpg?v=1735929394']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Dolce & Gabbana', 'Dolce & Gabbana Kaşmir Çocuk Palto Si̇yah - 7 - 8 yaş', 'Öne Çıkan Özellikler:   Tasarım: Yaka işleme detaylı.   Malzeme: Kaşmir .   Renk: Siyah.   Beden: 7-8Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 3250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce-gabbana-cashmere-erkek-cocuk-pal-eedfc.jpg?v=1735929386']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Louboutin', 'Christian Louboutin Rugan Topuklu Ayakkabı Nude - 35', 'Ürün Bilgisi    Renk: Nude  Beden: 35   Editör Notları:  Bu Christian Louboutin topuklu ayakkabı, markanın imzası haline gelen parlak rugan deri yapısı ve ikonik kırmızı tabanı ile zamansız bir klasik niteliği taşır. Yuvarlatılmış burun formu ve ince topuğu sayesinde hem feminen hem de dengeli bir siluet sunar; ayağı nazikçe sararken şıklığı abartısız şekilde öne çıkarır. Nude–bej tonu, bacak boyunu optik olarak uzun gösterir ve gündüzden geceye, davetlerden ofis şıklığına kadar pek çok kombinde', 4075, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-1_9b8a6443-8c4a-4176-bb29-410a628e43c1.jpg?v=1781533804', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-2_e3c688cc-3167-4183-9215-47ac3419f18f.jpg?v=1781533804', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-3.jpg?v=1781533804', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-4.jpg?v=1781533804']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Dior', 'Christian Dior Rugan Topuklu Ayakkabı Haki̇ - 36', 'Ürün Bilgisi    Renk: Haki  Beden: 36  Editör Notları:  Bu Christian Dior topuklu ayakkabı, markanın klasik stiletto siluetini modern ve çarpıcı bir dokunuşla yorumlayan iridescent (yansımalı) deri tasarımıyla öne çıkar. Işığa göre renk değiştiren yüzeyi, sade formuna sofistike ve dikkat çekici bir karakter kazandırırken; sivri burun ve ince topuk Dior’un zamansız feminen çizgisini yansıtır. Hem özel davetlerde hem de güçlü bir gece kombininde tek başına odak noktası olabilecek, couture ruhunu t', 6500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-dior-yansimali-ayakkabi-on.jpg?v=1767191300', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-dior-yansimali-ayakkabi-yan.jpg?v=1767191305', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-dior-yansimali-ayakkabi-arka.jpg?v=1767191305']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Dior', 'Christian Dior File ve Süet Stiletto Si̇yah - 37', 'Ürün Bilgisi    Renk: Siyah  Beden: 37  Made in Italy  Editör Notları:  Bu Christian Dior topuklu ayakkabı, markanın zarif feminen çizgisini yansıtan file detaylı (mesh) stiletto pump modelidir. Şeffaf görünümlü ince file yüzeyi, siyah deri biyeler ve sivri burun formuyla dengelenerek modern ve sofistike bir siluet oluşturur. İnce topuğu ve hafif transparan yapısı sayesinde hem iddialı hem de hafif bir görünüm sunan bu model; gece davetleri, özel organizasyonlar ve şık akşam kombinleri için Dior', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-dior-file-ve-suet-stiletto-3-4689a7.jpg?v=1735929309', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior1.jpg?v=1766730669', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior-3.jpg?v=1766730669', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior2.jpg?v=1766730661']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Christian Dior', 'Christian Dior Çocuk Gömlek Açik mavi̇ - 10 yaş', 'Öne Çıkan Özellikler:   Tasarım: Uzun kollu gömlek.   Malzeme: Koton.   Renk: Mavi.   Beden: 10Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior1_36eb1ce7-884f-42a1-aaf5-7a68500856cb.jpg?v=1776071248', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior2_f13f15ce-db2d-49e0-b2a5-da73f5b7de09.jpg?v=1776071248', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior3_9128434e-030f-4583-86f9-c1ecabe15405.jpg?v=1776071248']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Charlotte Olympia', 'Charlotte Olympia Zımbalı Gold ve PVC Topuklu Ayakkabı Gold - 36', 'Ürün Bilgisi    Renk: Gold  Beden: 36   Editör Notları:  Bu Charlotte Olympia topuklu ayakkabı, markanın imzası haline gelen Playful Glamour çizgisini yansıtan iddialı ve koleksiyonluk bir modeldir. Şeffaf PVC üst yüzey, altın tonlu deri detaylar ve karakteristik spike (zımba) süslemeler ile tamamlanırken, ince yüksek topuk feminen ve çarpıcı bir siluet yaratır. Bilekten tokalı formu ayağı zarifçe sarar; hem gece davetlerinde hem de özel kombinlerde odak noktası olacak heykelsi ve couture hissi', 7650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/zimba-detayli-topuklu-ayakkabi-gold-re-083629.png?v=1735929266']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Chanel', 'Chanel Rugan ve Deri Topuklu Ayakkabı Si̇yah - 39.5', 'Ürün Bilgisi    Renk: Siyah  Beden: 39.5  Topuk Yüksekliği: 11 cm  Made in Italy  Editör Notları:  Bu Chanel topuklu ayakkabı, markanın klasik feminen çizgisini modern platform formuyla buluşturan zamansız bir modeldir. Siyah rugan deri üst yüzeyi, yuvarlatılmış burun yapısı ve önden hafif platform tabanı ile hem şık hem de dengeli bir duruş sunar. Topuğun arka kısmında yer alan dokulu / örgü efektli kalın topuk, modele karakteristik bir Chanel dokunuşu katar. Gün boyu konforu destekleyen iç tab', 9080, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-topuklu-rugan-on.jpg?v=1767187133', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-topuklu-rugan-yan.jpg?v=1767187133', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-topuklu-rugan-capraz.jpg?v=1767187150', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-topuklu-rugan-arka.jpg?v=1767187150']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Celine', 'Celine Püsküllü Makosen Si̇yah - 35', 'BEDEN&amp;KALIP •NUMARA:35 •TOPUK YÜKSEKLİK:4.5cm DETAYLAR •Siyah renkli parlak dana derisi •Yuvarlak ve kapalı burunlu •Ön kısmı püskül detaylı •Kalın ve lastik topuklu •Taba renkli deri iç astar •MADE IN ITALY', 4900, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/parlak-deri-oxford-ayakkabi-1febb0.jpg?v=1735929242']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Casadei', 'Casadei Süet Katlanabilir Bot Mavi̇ - 36', 'Ürün Bilgisi  Numara:36 Renk:Mavi Tasarım:Uzun Tabanlı Çizme Kumaş İçeriği:Süet Eksper Notları:ilk bakışta spor ve şıklığın birleştiği özgün bir çizgiyi yansıtıyor. Parlak kobalt mavisi süet, bota canlı ve cesur bir karakter verirken; gizli dolgu topuk formu parçaya beklenmedik bir yükseklik ve modern bir dinamizm katıyor.Alt tabandaki sneaker dokunuşu, klasik uzun çizmeye alışılmadık bir rahatlık hissi ekliyor. Bu da tasarımı hem şehir stili için konforlu hem de görsel olarak iddialı bir parçay', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/suet-deri-cizme-mavi-renk-36-beden-885a-5.jpg?v=1739241094']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Burberry', 'Burberry Bantlı Topuklu Ayakkabı Camel - 40', 'Ürün Bilgisi    Renk: Camel  Beden: 40  Topuk Yüksekliği: 10 cm  Made in Italy  Editör Notları:  Bu Burberry topuklu ayakkabı, markanın zamansız İngiliz şıklığını yansıtan klasik stiletto siluetine sahiptir. Pürüzsüz deri yüzeyi, sivri burun formu ve ince topuğu ile son derece zarif bir duruş sunarken, bilek kısmındaki ince kayış detayı modele sofistike ve feminen bir karakter kazandırır. Nötr kahve tonu sayesinde hem ofis kombinlerinde hem de akşam şıklığında rahatlıkla kullanılabilen, sade ama', 7650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-bantli-topuklu-ayakkabi-40--97ba.jpg?v=1735929177']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Desenli Topuklu Sandalet Kahverengi̇ - 40', 'BEDEN&amp;KALIP •NUMARA : TR: 40 DETAYLAR •Kahverengi renkli deri •Siyah renkli taban •Yuvarlak ve açık burun •Novacheck desenli kanvas iç astar •Novacheck desenli topuk detayı ORİJİNALLİK KODU: IDCALCARSMAL ÜRETİM YERİ: İTALYA', 7650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-sandalet-dolgu-on-jpg.jpg?v=1767189111', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-sandalet-dolgu-yan.jpg?v=1767189111', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-sandalet-dolgu-arka.jpg?v=1767189110']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Yakası Kürklü Kapitone Mont Bej - M', 'Ürün Bilgisi  Renk: Bej Beden: 38 Tasarım: Kemer,çıt çıt detay Kumaş İçeriği: %98 Yün, %2 Elastan Eksper Notları: Bu model, klasik kapitone dokuyu modern ve zarif bir silüetle birleştiren şık bir dış giyim parçası. Arkadaki el işçiliğini andıran elmas kapitone yüzey hem sıcaklık sağlar hem de cekete yapı kazandırır. Beldeki ayarlanabilir kemer formu toparlayarak daha feminen bir hat oluştururken, manşet detayları tasarımı daha sofistike gösteriyor. Doğal tonlardaki kürk yaka ise modele hem sıcak', 16799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Burberry-Mont-On.jpg?v=1767172511', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Burberry-Mont-Yan.jpg?v=1767172511', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Burberry-Mont-Arka.jpg?v=1767172511']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Bebek Şort Gri̇ - 1 yaş', 'Öne Çıkan Özellikler:   Tasarım: Yazı detaylı.   Malzeme: Pamuk .   Renk: Gri.   Beden: 1Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 550, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/beli-baglamali-kiz-cocuk-sort--09d2.jpg?v=1735929126']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Çizgili Bebek Şort Açik mavi̇ - 2 yaş', 'Öne Çıkan Özellikler:   Tasarım: Çizgili.   Malzeme: Koton .   Renk: Mavi.   Beden: 2Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kiz-cocuk-cizgili-sort-996-3c.jpg?v=1735929119']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Burberry', 'Burberry Çocuk Pantolon Kirmizi - 8 yaş', 'Ürün Bilgisi   Renk:Kırmızı  Beden: 8 Yaş  Editör Notları: Burberry’nin zamansız İngiliz şıklığını çocuk koleksiyonuna taşıyan bu pantolon, canlı kırmızı rengi ve sade tasarımıyla öne çıkar. Yüksek bel formu ve önden pile detayları sayesinde hem şık hem de rahat bir siluet sunar. Günlük kombinlerden özel davetlere kadar geniş bir kullanım alanına sahiptir.  Orijinallik ve Kalite Kontrolü  Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknoloj', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-kirmizi.jpg?v=1776084025']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Fiyonklu Rugan Babet Si̇yah - 34', 'BEDEN&amp;KALIP •NUMARA : TR: 34 DETAYLAR •Siyah renkli rugan •fiyonk detayı •Siyah deri iç astar ÜRETİM YERİ: İTALYA', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fiyonklu-rugan-babet-91-80a.jpg?v=1735929085']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Fiyonklu Midi Etek Si̇yah - 40', 'Ürün Bilgisi  Renk: Siyah Beden: 40 Tasarım: Kemer Detayı Kuzu Derisi Kumaş İçeriği: %67 asetat, % 33 polyester  Ölçü: Boy: 75 cm Bel: 40 cm Eksper Notları: Siyah, diz altı boy bir etek; bel kısmındaki ince deri kurdele ve metal uç detaylarıyla zarifçe hareket kazanıyor.Düz silueti vücudu sade bir çizgiyle takip ederken, beldeki minimal dokunuş tasarımı tek bakışta daha özenli gösteriyor. Ofis stiline de, daha klasik bir akşam kombinine de rahatça uyum sağlayan zamansız bir parça.  Orijinallik v', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-fiyonklu-midi-etek-40-3b70a5.jpg?v=1735929078']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Kapitone Deri Babet Yeşi̇l - 35', 'BEDEN&amp;KALIP•NUMARA : 35.5•TOPUK YÜKSEKLİĞİ : 0.5 cmDETAYLAR•Yeşil renkli quilted deri•Kapalı ve yuvarlak burunlu •Ön kısmında ayarlanabilir kemer detaylı•Kapitone dikişli•Siyah deri iç astar•Orjinallik kodu : ITCALFAL8MON•MADE IN ENGLAND', 1787, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-kapitone-deri-babet-35-ed786e.png?v=1735929057']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Brian Atwood', 'Brian Atwood Gold Detaylı Stiletto - 37', 'Ürün Bilgisi    Renk: Gold  Beden: 37  Editör Notları:  Bu Brian Atwood topuklu ayakkabı, markanın feminen ama iddialı tasarım çizgisini yansıtan pointed-toe stiletto pump modelidir. Siyah zemin üzerine uygulanan altın tonlu zincir/desen dokusu, ayakkabıya güçlü ve lüks bir görünüm kazandırırken ince ve yüksek topuğu silueti zarif biçimde uzatır. Parlak ve dikkat çekici yüzeyi sayesinde özellikle gece davetleri, kokteyller ve özel organizasyonlar için ideal bir tercih olup, sade kombinleri tek b', 5700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Brian-Atwood-Ayakkabi-On.jpg?v=1767175057', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Brian-Atwood-Ayakkabi-Yan.jpg?v=1767175057', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Brian-Atwood-Ayakkabi-arka.jpg?v=1767175057', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Brian-Atwood-Ayakkabi-detay.jpg?v=1767175057']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Bottega Veneta', 'Bottega Veneta Fiyonklu Deri Babet Si̇yah - 37', 'Siyah renkli deri. Rugan deri fiyonk süslemeli. Siyah renkli taban. Yuvarlak burunlu. Siyah deri iç astar.', 8365, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fiyonk-suslemeli-deri-babet-de52eb.jpg?v=1735929020']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Blumarine', 'Miss Blumarine İşlemeli Bebek Etek Gri̇ - 2Y', 'Öne Çıkan Özellikler:   Tasarım: İşleme detaylı.   Malzeme: Asetat,polyester .   Renk: Gri.   Beden: 2Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 350, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kiz-cocuk-mini-etek-da8688.jpg?v=1735928992']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Blugirl', 'Blugirl Kristal Detaylı Yün Kazak Elbise Krem - 36', 'Ürün Bilgisi   Renk: Krem   Beden: 36   Kumaş İçeriği: %25 koton, %25 viskon, %25 naylon, %20 yün, %5 kaşmir  Editör Notları: Krem tonunda, yumuşak dokulu triko bir elbise. Kısa kol formu ve gövdeyi saran siluetiyle sade ama zarif bir görünüm sunuyor. Omuz kısmındaki inci ve taş detaylı broş benzeri süsleme, elbiseye ince bir ışıltı katarak minimal tasarımı şık bir dokunuşla tamamlıyor. Rahatlığı ve şıklığı bir arada isteyenler için ideal bir parça.  Orijinallik ve Kalite Konrolü Peony Collectiv', 2300, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blugirl-kristal-detayli-yun-kazak-elbi-b1949f.jpg?v=1735928984']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Bikkembergs', 'Bikkembergs Koton Çocuk Gömlek Beyaz - 16-17y', 'Öne Çıkan Özellikler:   Tasarım: Uzun kollu, yaka yazı detaylı.   Malzeme: Koton .   Renk:Beyaz .   Beden: 16-17Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/erkek-cocuk-koton-gomlek-c03be1.jpg?v=1735928969']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balenciaga', 'Balenciaga Race Runner Sneaker Gri̇ - 36', 'Beyaz renkli deri ve kanvas, yuvarlak burunlu ve bağcıklı, burun kısmı siyah file ve lastik detaylı, beyaz lastik taban, topuk yüksekliği 4 cm.', 5340, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/race-runner-sneaker-8c5b-6.jpg?v=1735928963']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Army By Yves Salomon', 'Yves Saint Laurent ( YSL ) Salomon Marmotte Çocuk Bere Gri̇', 'Ürün Bilgisi   Gri örgülü yün kumaş Marmotte kürkü ponpon detayı %90 yün, %10 kaşmir.  Orijinallik Kontrolü ve Kalite Peony Collective''de tüm ürünler uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi  sunulur. Güvenle alışveriş yapabilirsiniz.', 550, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yves-salomon-marmotte-fur-wool-kiz-coc--24c24.jpg?v=1735928950']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Aquazzura', 'Aquazzura Sandy Bow 115 Kadife Topuklu Ayakkabı Mavi̇ - 40', 'Ürün Bilgisi    Renk: Mavi  Beden: 40  Topuk Yüksekliği: 11.5 cm  Made in Italy  Editör Notları:  Bu Aquazzura topuklu ayakkabı, markanın feminen ve sofistike çizgisini yansıtan zarif bir Mary Jane yorumudur. Lacivert kadife (velvet) yüzeyi, ayakkabıya derin ve lüks bir doku kazandırırken, bilek kısmındaki çift bant ve düğüm detayı tasarıma romantik bir karakter ekler. Orta–yüksek blok topuk formu sayesinde hem şık hem de dengeli bir kullanım sunar. Günlük şıklıkla akşam davetleri arasında rahat', 7650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquazzura-sandy-bow-115-mavi-kadife-to-f5ac9c.jpg?v=1735928930']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Aquazzura', 'Aquazzura Kristal Topuk Detaylı Süet Bot Si̇yah - 36.5', 'Ürün Bilgisi    Renk: Siyah  Beden: 36.5  Topuk Yüksekliği: 9 cm  Kumaş İçeriği: Süet Deri   Editör Notları:  Bu Aquazzura bilek botu, markanın zarif ama iddialı tasarım çizgisini yansıtan süet ankle boot modelidir. Siyah süet üst yüzeyi klasik ve sofistike bir görünüm sunarken, kristal taşlarla süslenmiş blok topuğu modele güçlü bir karakter kazandırır. Sivri burun formu bacağı optik olarak uzatır, fermuarlı yapısı ise kolay kullanım sağlar. Hem özel davetlerde hem de şık günlük kombinlerde rah', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kristal-suslemeli-topuk-detayli-suet-d-4-9c06.jpg?v=1735928919', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aqua1.jpg?v=1766574459', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aqua2.jpg?v=1766574459']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alexandre Birman', 'Alexandre Birman Simli Fermuarlı Bot Si̇yah - 36.5', 'Siyah renkli simli kumaş. Fermuarlı açma kapama. Siyah renkli taban. Yuvarlak burunlu. Siyah deri iç astar. Üretim yeri İtalya.', 7799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Alexandre-Birman-Simli-bot-on.jpg?v=1767190683', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Alexandre-Birman-Simli-bot-yan.jpg?v=1767190683', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Alexandre-Birman-Simli-bot-arka.jpg?v=1767190683']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Alexander Wang', 'Alexander Wang Boncuklu Midi Elbise Si̇yah - S', 'Ürün Bilgisi   Renk:  Siyah.   Beden: Small   Editör Notları: Alexander Wang’ın keskin hatlarla şekillenen bu ikonik elbisesi, vücudu kusursuz şekilde saran siluetiyle modern gücü minimalizmle buluşturuyor. Esnek dokusu hareket özgürlüğü sağlarken, temiz dikey hatlar elbiseye heykelsi bir form kazandırıyor. Tek başına bile iddiasını ortaya koyan zamansız bir Wang klasiği.   Orijinallik ve Kalite KontrolüPeony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Ent', 4790, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alexander-elbise-on.jpg?v=1754297497']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alexander Mcqueen', 'Alexander McQueen Floral Fırfırlı Mini Etek Kirmizi - 38', 'Öne Çıkan Özellikler   Malzeme: %100 Koton.  Renk: Kırmızı - Beyaz.  Beden: 38  Boy:46 cm En: 34 cm  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alexander-mcqueen-floral-firfirli-mini-3ecdf.jpg?v=1735928856']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Yves Saint Laurent', 'Yves Saint Laurent ( YSL ) Rugan Topuklu Ayakkabı - 35', 'Ürün Bilgisi    Renk: Siyah  Beden: 35   Editör Notları:  Bu Saint Laurent topuklu ayakkabı, markanın zamansız ve güçlü siluet anlayışını yansıtan klasik stiletto pump modelidir. Parlak siyah rugan deri yüzeyi ve zarif yuvarlatılmış burun formu ile sofistike bir duruş sunarken, ince ve yüksek topuğu feminen bir etki yaratır. Minimal tasarımı sayesinde hem gece kombinlerinde hem de şık davetlerde rahatlıkla kullanılabilen, YSL’in modern Paris şıklığını taşıyan ikonik bir parçadır.   Orijinallik v', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yves-saint-laurent-rugan-topuklu-ayakk-05a-29.jpg?v=1735928830']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Valentino', 'Valentino Dolgu Topuklu Sandalet - 35', 'BEDEN&amp;KALIP •NUMARA : 35 DETAYLAR •Kahverengi renkli deri •Açık ve yuvarlak burunlu  •Bilekten ayarlanabilir kemer detaylı •Kahverengi deri iç astar •Krem renkli hasır dolgu topuk', 5100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/buyuk-fiyonk-detayli-dolgu-topuklu-san--adee.jpg?v=1735928820']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tommy Hilfiger', 'Tommy Hilfiger Ekose Elbise Kirmizi - 6yas', '', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ekoseli-sifir-kol-elbise-kirmizi-renk--656-ab.jpg?v=1735928813']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Çocuk Jean Pembe - 5yas', 'Öne Çıkan Özellikler   Malzeme: Denim.   Renk: Pembe.   Beden: 5Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/pembe-hean.jpg?v=1776073781', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3138.jpg?v=1776073781']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Ekose Çocuk Gömlek Yesil - 4yas', 'Öne Çıkan Özellikler   Tasarım: Uzun kollu, ekose.   Malzeme: Koton .   Renk: Yeşil.   Beden: 4Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 790, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ekose-desenli-yesil-gomlek-yesil-renk--d0c-42.jpg?v=1735928801']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Kıyafet', 'Elbise', 'Ralph Lauren', 'Ralph Lauren Çizgili Çocuk Elbise Pembe - 6yas', 'Öne Çıkan Özellikler:   Tasarım: Etekleri dantel detaylı, çizgili.   Malzeme: Koton.   Renk: Pembe.   Beden: 6Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1200, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/elbise1.jpg?v=1776083531', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3083.jpg?v=1776083531', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cizgili-dantel-detayli-kiz-cocuk-elbis--429ef.jpg?v=1776083531']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Ekose Çocuk Gömlek Elbise Pembe - 4Y', 'Öne Çıkan Özellikler   Tasarım: Yaka detaylı, etek pileli, ekose.   Malzeme: Koton.   Renk: Pembe.   Beden: 4Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1200, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ekoseli-gomlek-elbise-pembe-renk-4yas--07fe-4.jpg?v=1735928789']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Kemerli Denim Çocuk Elbise Mavi̇ - 5yas', 'Öne Çıkan Özellikler:   Tasarım: Kemer detaylı.   Malzeme: Denim .   Renk: Mavi.   Beden: 5Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1200, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dugme-detayli-kot-elbise-mavi-renk-5ya--f9fe.jpg?v=1735928783']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Kapitone Çocuk Mont Pembe - 2 yaş', 'Öne Çıkan Özellikler:   Tasarım:Gümüş düğme detaylı.   Malzeme: Koton .   Renk: Pembe.   Beden: 2Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 950, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cizgili-citcitli-kiz-cocuk-montu-pembe-e8-068.jpg?v=1735928777']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Polo Yaka Çocuk Tişört Mavi̇ - 6yas', 'Öne Çıkan Özellikler:   Malzeme: Koton .   Renk: Mavi.   Beden: 6Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/klasik-bisiklet-yaka-erkek-cocuk-t-shi-dc51fd.jpg?v=1735928769']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Polo Yaka Tişört Pembe - 4 yaş', 'Öne Çıkan Özellikler   Malzeme: Koton   Renk: Pembe   Beden: 4Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/klasik-polo-yaka-t-shirt-pembe-renk-4y-ff3-bf.jpg?v=1735928762']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Polo Yaka Çocuk Tişört Kirmizi - 6 Yaş', 'Öne Çıkan Özellikler:   Tasarım: Logo ve işleme detaylı.   Malzeme: Koton.   Renk: Kırmızı.   Beden: 6Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/klasik-polo-yakali-t-shirt-kirmizi-ren-585d32.jpg?v=1735928755']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Polo Yaka Çocuk Tişört Yesil - 12yas', 'Öne Çıkan Özellikler   Tasarım: Kısa kollu, marka logolu.   Malzeme: Koton.   Renk: Yeşil.   Beden: 12Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/klasik-polo-yakali-t-shirt-yesil-renk--be8386.jpg?v=1735928746']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Kadife Yakalı Çocuk Mont - 7', 'Öne Çıkan Özellikler:   Tasarım: Kapitone detaylı.   Malzeme: Polyester .   Renk: Lacivert.   Beden: 7Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1900, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kadife1.jpg?v=1769673238', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kadife-detayli-erkek-cocuk-mont-lacive-64-962.jpg?v=1769673238']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Platform Topuklu Süet Ayakkabı - 36', 'Ürün Bilgisi    Renk: Kahverengi  Beden: 36  Editör Notları:  Bu Prada topuklu ayakkabı, markanın zamansız ve güçlü siluet anlayışını yansıtan platformlu klasik pump modelidir. Yumuşak dokulu süet deri yapısı ve nötr toprak tonundaki rengiyle sofistike bir duruş sunarken, yüksek ince topuk ve önden platform detayı hem boyu dengeli şekilde uzatır hem de daha konforlu bir kullanım sağlar. Günlük şıklıkla akşam kombinleri arasında rahatça geçiş yapabilen bu model, Prada’nın sade ama iddialı tasarım', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-platform-topuklu-suet-ayakkabi-3-1f373d.jpg?v=1735928721']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Moncler', 'Moncler Klasik Teknik Kumaş Mont Yeşil - 3', 'Ürün Bilgisi  Renk: Yeşil Beden: 40  Tasarım: Fermuar Kapma,Cep Detaylı   Eksper Notları: Bu model, Moncler’in hafifliği ve sıcaklığı bir arada sunan ikonik kısa montlarından biri. Parlak teknik dokusu ve canlı turkuaz tonu parçaya enerjik bir hava verirken, %90 kaz tüyü dolgusu güçlü bir ısı koruması sağlıyor. Minimal formu günlük kullanıma çok uygun; hem sportif hem şehir stiline kolayca uyum sağlayan dinamik bir tasarım. Eksper Puanı:Ürünün tüm incelemesi tarafımızca yapılmıştır. kondisyon du', 17999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fermuar-detayli-klasik-teknik-kumas-mo-3-1995.jpg?v=1735928710', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/moncler-yan.jpg?v=1769506355', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1888.jpg?v=1769506355']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Le Silla', 'Le Silla Yüksek Topuklu Platform Sandalet - 36', 'Tül süslemeli, altın renkli metal aksesuar detaylı. Yüksek topuklu. Açılır fermuar detaylı. Ten rengi deri iç astar. Üretim yeri İtalya.', 4900, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/buzgu-tul-suslemeli-yuksek-topuklu-san-b0-9f9.jpg?v=1735928687']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Giuseppe Zanotti', 'Giuseppe Zanotti Kürk ve Deri Sneaker - 38', 'Gri renk deri, yuvarlak ve kapalı burun, içi kürklü, yanlarda fermuar detaylı, siyah renkli taban. Fermuar kısmında açılıp kapanırken zorlanma yaşanmaktadır.', 5500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kurklu-fermuarli-sneaker-gri-renk-38-b-98-5a4.jpg?v=1735928677']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gianvito Rossi', 'Gianvito Rossi Bağcıklı Süet Sandalet - 35.5', 'Kahverengi süet, açık ve bileği saran ip detaylı, krem rengi deri iç astar, rahat dolgulu iç taban.', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ipli-baglamali-kisa-topuklu-sandalet--42c9.jpg?v=1735928652']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi İnci İşlemeli Dokuma Sneaker Bot - 36', 'Ürün Bilgisi  Renk: Siyah Beden: 36 Tasarım: İnci İşleme Kumaş İçeriği: Örme Eksper Notları: Esnek örgü yapısı ayağı çorap gibi sararak konfor sağlarken, yukarı doğru uzanan bilek kısmı modern ve farklı bir siluet yaratıyor. Tabanındaki beyaz hatlar ve yan logo detayı modele dinamik bir görünüm katıyor. Hem günlük stil hem athleisure kombinler için dikkat çekici bir seçenek. Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır. Kondisyon Durumu 10/10  Orijinallik ve Kalite Kontrolü Peony Co', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/inci-islemeli-dokuma-bot-2d-3ad.jpg?v=1735928646']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Equipment', 'Equipment Desenli İpek Gömlek Kirmizi - M', 'Ürün Bilgisi    Renk: Kırmızı  Beden: M  Kumaş İçeriği: İpek  Ölçü: En 55 Boy 65 cm  Editör Notları:  Bu Equipment gömlek, markanın imzası haline gelen akıcı ve sofistike gömlek siluetinin desenli bir yorumudur. %100 ipek kumaşı sayesinde hafif, dökümlü ve ciltte son derece konforlu bir his sunarken; klasik yaka, düğmeli ön kapama ve zamansız kesimiyle hem ofis şıklığında hem de günlük kombinlerde rahatlıkla kullanılabilir. Canlı rengi ve modern desen yapısı, sade parçalarla kombinlendiğinde güç', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kirmizi-cicek-desenli-ipek-gomlek-kirm-86a-38.jpg?v=1735928637']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Diane Von Furstenberg', 'Diane Von Furstenberg Desenli ve Yırtmaçlı Elbise Si̇yah - 38', 'Ürün Bilgisi   Renk:Sarı,Siyah  Beden:2 Editör Notları: Desenin ahengiyle maksi boy elbise vücudu ince gösterip hem şık hem gündelik giyimlerde oldukça kullanışlıdır.  Orijinallik ve Kalite KontrolüPeony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yuksek-yaka-uzun-yirtmacli-elbise-siya-90-449.jpg?v=1735928618']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Christian Dior', 'Christian Dior İnci Bilezik Pembe', 'BEDEN&amp;KALIP •BEDEN: Ayarlanabilir uzunluk: 14 - 23 cm DETAYLAR •Pembe ve krem renkli boncuklu püskül detaylı bileklik', 9300, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/puskul-detayli-boncuklu-bileklik-985811.jpg?v=1735928605']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Chloe', 'Chloé Çocuk Boğazlı Bluz Beyaz - 8yas', 'Öne Çıkan Özellikler   Tasarım: Boğazlı body.   Malzeme: Koton.   Renk: Beyaz.   Beden: 8Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chloe1.jpg?v=1776077381', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chloe2.jpg?v=1776077380']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Kıyafet', 'Elbise', 'Burberry', 'Burberry Tül Detaylı Çocuk Elbise Beyaz - 5yas', '', 850, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tul-detayli-sifir-kol-elbise-beyaz-ren-de2014.jpg?v=1735928590']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Balmain', 'Balmain Kapüşonlu Çocuk Eşofman Üstü - 10', 'Siyah kumaş, kol kısımlarında beyaz detay, fermuarlı açma kapama, kapüşonlu.', 1200, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marka-logolu-fermuarli-sweatshirts-siy-43bb-a.jpg?v=1735928582']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Balmain', 'Balmain Çocuk Eşofman Gri̇ - 10 y', 'Öne Çıkan Özellikler   Malzeme: Koton.   Renk: Gri.   Beden: 10Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/erkek-cocuk-bilek-lastikli-tek-renk-es-707-00.jpg?v=1735928574', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/erkek-cocuk-bilek-lastikli-tek-renk-es-501-4a.jpg?v=1735928574', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/erkek-cocuk-bilek-lastikli-tek-renk-es-b9216a.jpg?v=1735928574']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Balmain', 'Balmain Detaylı Çocuk Eşofman Siyah - 8', '', 1100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/erkek-cocuk-ayarlanabilir-lastikli-eso-4d35-b.jpg?v=1735928568']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Aquazzura', 'Aquazzura Alix 105 Kadife Topuklu Ayakkabı - 36', 'Ürün Bilgisi    Renk: Somon  Beden: 36   Editör Notları:  Bu Aquazzura topuklu ayakkabı, markanın zarif ama feminen çizgisini yansıtan kadife (velvet) dokulu, bilekten ince kayışlı ve kalın topuklu bir modeldir. Pudra–gül tonlarındaki rengi ve yumuşak kadife yüzeyi ayakkabıya romantik bir hava katarken, bilek kayışı hem estetik hem de denge sağlar. Orta-yüksek blok topuğu sayesinde stiletto şıklığını daha konforlu bir formda sunar; davetlerde, akşam yemeklerinde veya şık kombinlerde rahatlıkla t', 4900, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquazzura-alix-105-kadife-topuklu-ayak-2f08d0.jpg?v=1735928561']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Armani Junior', 'Armani Junior Çocuk Yağmurluk Si̇yah - 10 y', 'Açıklama Armani Junior yağmurluk, mevsimsel bir şıklık yaratır. Öne Çıkan Özellikler   Malzeme: Polyamid .   Renk: Siyah.   Beden: 10Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/armani-junior-kiz-cocuk-mont-f12d83.jpg?v=1735928527', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/armani-junior-kiz-cocuk-mont-74b874.jpg?v=1735928527', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/armani-junior-kiz-cocuk-mont-130-92.jpg?v=1735928527', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/armani-junior-kiz-cocuk-mont-e4511c.jpg?v=1735928527']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Il Gufo', 'II Gufo Kadife Çocuk Yelek Laci̇vert - 10 yaş', 'Öne Çıkan Özellikler   Tasarım: Düğmeli yelek.   Malzeme: Kadife.   Renk: Lacivert.   Beden: 10Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ii-gufo-kiz-cocuk-yelek-9dd2df.jpg?v=1735928520']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Juicy Couture', 'Juicy Couture Çocuk Denim Ceket Mavi̇ - 10 y', 'Öne Çıkan Özellikler   Tasarım: Yaka ve sırt detaylı.   Malzeme: Denim.   Renk: Mavi.   Beden: 10Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/juicy-couture-kiz-cocuk-ceket-a68a-4.jpg?v=1735928514']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi Monster Cüzdan', 'DETAYLAR •Siyah dokulu deri •Ön kısımda sarı deri üzerinde taş detaylı • Fermuar bölmeli •Bez torbası ve kutusu bulunmaktadır', 7999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-kadin-cuzdan-4644-8.jpg?v=1735928506']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Tadashi Shoji', 'Tadashi Shoji Dantel Gece Elbisesi - 36', 'Ürün Bilgileri  Renk :Kırmızı Beden: 36   Editör Notları:Vücudu saran kesimiyle beli ince, silueti daha uzun ve zarif gösteren bir elbise. V yaka formu boyun ve omuz hattını öne çıkararak feminen bir duruş sağlar. Baştan sona dantel dokusu sayesinde güçlü ama sofistike bir etki yaratır. Canlı kırmızı rengiyle davetlerde iddialı, şık ve dikkat çekici görünür; abartısız ama etkileyici bir stil sunar.    Orijinallik ve Kalite KontrolüPeony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı', 7537.8, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tadashi-shoji-kirmizi-renk-36-beden-ka-cb-419.jpg?v=1735928471']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Roberto Cavalli', 'Roberto Cavalli Leopar Desenli Maksi Etek - 42', 'Ürün Bilgisi    Renk: Leopar Desen  Beden: 42   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/roberto-cavalli-leopar-desenli-maksi-e-30a-02.jpg?v=1735928460']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Gucci', 'Gucci Yakası Fermuarlı Elbise Siyah - M', 'Ürün Bilgisi   Beden:38  Renk: Siyah  Editör Notları:  Gucci fermuarlı dik yaka midi elbise, markanın zamansız ve güçlü siluet anlayışını yansıtan, sade ama etkisi yüksek bir tasarımdır. Dik yaka ve ön fermuar detayı elbiseye modern ve sofistike bir hava katarken, vücuda oturan yapısı feminen bir duruş sağlar. Tok ve yapılandırılmış kumaşı sayesinde formunu gün boyu korur, minimal çizgileriyle abartıdan uzak ama iddialı bir şıklık sunar. Kısa kollu ve midi boy kesimiyle hem klasik hem çağdaş bir', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-yakasi-fermuarli-siyah-elbise-m-9904-4.jpg?v=1735928450']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Escada', 'Escada Desenli Kadın Tunik - 36', 'Açıklama  Truvakar kol, desenli Escada tunik, hem günlük hemde şık kullanıma uygundur.     Öne Çıkan Özellikler     Tasarım: Truvakar kol, desenli.   Malzeme: %84 İpek.   Renk: Lacivert ve beyaz.   Beden: 36.      Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-desenli-renk-36-beden-kadin-tun-cf25-7.jpg?v=1735928434']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Bonpoint', 'Bonpoint Ekose Çocuk Kaban - 14', '', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bonpoint-ekose-renk-14-beden-kiz-cocuk-09c2-0.jpg?v=1735928401', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bonpoint-ekose-renk-14-beden-kiz-cocuk--8855.jpg?v=1735928401', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bonpoint-ekose-renk-14-beden-kiz-cocuk--b222.jpg?v=1735928401', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bonpoint-ekose-renk-14-beden-kiz-cocuk-c1c-d0.jpg?v=1735928401']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Kürk ve Deri Topuklu Bot Siyah - 40.5', 'Ürün Bilgisi  Renk:Siyah Numara: 40.5 Kumaş İçeriği: Deri,Kürk Eksper Notları:Bilek kısmındaki yumuşak kürk dokusu modele hem sıcaklık hem de karakter katıyor. Kalın topuk ve dişli taban yapısı sayesinde yüksek olmasına rağmen dengeli bir duruş sunuyor. Bağcık detayıyla modern bir outdoor havası taşıyan bu model, kış kombinlerini tek adımda daha iddialı gösteren parçalar arasında.     Orijinallik ve Kalite Kontrolü  Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde inc', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-siyah-renk-40--4c6b.jpg?v=1735928382', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada.jpg?v=1769694632', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada1.jpg?v=1769694632', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada3.jpg?v=1769694632']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Missoni', 'Missoni Çizgili Bluz ve Etek Takım Renkli - 40', 'Ürün Bilgisi   Beden:44 (italyan) /40 Esnek örgü yapısı sayesinde ölçüler vücuda göre uyum sağlar.  Renk: Pembe  Editör Notları: Bu elbise vücuda oturan formu sayesinde silueti toparlayıp daha ince gösterir, bel hattını yumuşak şekilde vurgular. Uzun boyu ve aşağı doğru dökülen etek yapısı bacak boyunu uzun gösterirken, askılı ve yuvarlak yaka kesimi üst bedeni dengeli ve zarif gösterir. Örgü dokusu ve desenli yapısı elbiseye hareket katar, hem gündüz hem yaz akşamı davetlerinde rahat ama stil s', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni-renkli-renk-44-beden-kadin-tak-d926f9.jpg?v=1735928370']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Kenzo', 'Kenzo Sneaker Pembe - 38', 'Pembe   Hiç kullanılmamıştır.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-pembe-renk-38-beden-kadin-sneake-f1-433.jpg?v=1735928362']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gianvito Rossi', 'Gianvito Rossi Bilekten Bantlı Süet Topuklu Ayakkabı Kızıl kahve - 40.5', 'Ürün Bilgisi   Numara:40.5  Renk:Bordo  Tasarım:Kalın Topuk,Bilekten Bağlama  Kumaş İçeriği:Süet  Editör Notları: Bordo süet yüzeyi ve bilekteki ince kayışıyla zarif bir çizgi sunuyor. Blok topuğun şeffaf-misere dokulu görünümü ayakkabıya modern ve farklı bir karakter katıyor. Sivri burun formu ise silueti şık şekilde uzatarak parçayı hem gündüz hem akşam kombinlerine uygun hale getiriyor.    Orijinallik ve Kalite Konrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekil', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-kizil-kahve-renk-40.5-b--4789.jpg?v=1735928355', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-kahve-ayakkabi-on.jpg?v=1767177107', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-kahve-ayakkabi-arka.jpg?v=1767177107']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Fendi', 'Fendi Rococo Floral Kanvas ve Deri Topuklu Ayakkabı Desenli - 41', 'Ürün Bilgisi    Renk: Sarı  Beden: 41  Editör Notları:  Bu Fendi topuklu ayakkabı, markanın cesur tasarım diliyle feminen silueti bir araya getiren özel bir modeldir. Çiçek desenli kanvas üst yüzeyi, Fendi’nin grafik ve sanatsal estetiğini yansıtırken; dalgalı kesimli ön formu ve kalın, renk bloklu topuk detayı ayakkabıya modern ve koleksiyonluk bir karakter kazandırır. Açık burun tasarımı sayesinde daha hafif ve yazlık bir his sunan bu model, klasik stiletto çizgisinden ayrılan özgün topuğuyla', 7540, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-desenli-renk-41-beden-kadin-topu-0b8-4d.jpg?v=1735928349', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-desenli-renk-41-beden-kadin-topu-d-4866.jpg?v=1735928349', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-desenli-renk-41-beden-kadin-topu-3b2236.jpg?v=1735928349', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-desenli-renk-41-beden-kadin-topu-bf2-4c.jpg?v=1735928349']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Donna Karan', 'Donna Karan Desenli Elbise Renkli - 36', 'Ürün Bilgisi   Beden:36  Renk: Siyah,Krem,Mavi  Editör Notları: Bu elbise akışkan ve hafif yapısıyla vücuda yumuşak bir şekilde oturur, bel kısmındaki formu sayesinde beli ince gösterirken etek kısmındaki hareket uzun ve dengeli bir siluet yaratır. Desenli kumaşı hem dikkat çekici hem de sofistike bir duruş sunar, kolsuz kesimi ise omuzları zarif göstererek ferah bir görünüm sağlar. Diz hizasında biten boyu sayesinde hem resmi hem de yarı resmi davetlerde rahatlıkla tercih edilebilir; gündüz dav', 2700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/donna-karan-renkli-renk-36-beden-kadin-d6c1c4.jpg?v=1735928342']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Valentino', 'Valentino Bilekten Bantlı Rugan Babet Sarı - 36', '', 5100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-bilekten-bantli-rugan-babet--bbb-4c.jpg?v=1735928329', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sari1.jpg?v=1766652865', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sari2.jpg?v=1766652865', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sari3.jpg?v=1766652865']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tod''S', 'Tod'' Bağcıklı Süet Bot Taba - 36.5', 'Ürün Bilgisi  Renk:Kum Rengi Beden:36.5 Tasarım:Bağcık Detaylı Kumaş İçeriği: Süet Eksper Notları:Yumuşak süet dokusu ve kalın, dişli tabanı sayesinde hem konforlu hem de şehir stiline uygun bir duruş sunuyor. Bağcık detayı modele hafif bir outdoor havası katarken, nötr rengi sayesinde jean’den joggera kadar birçok kombinle kolayca uyum sağlıyor. Rahat ve düzenli bir görünüm arayanlar için ideal bir günlük bot. Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır. Kondisyon Durumu 10/10  Or', 4599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tods-taba-renk-36-e1c1b5.jpg?v=1735928317', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod1_7e685c31-8baf-4dc4-993f-949b1c901a95.jpg?v=1766572278', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod2_c542ffe8-c4d9-46c6-8de4-641f32c8f0ae.jpg?v=1766572277']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK ÇOCUK', 'Diğer', 'Diğer', 'Christian Dior', 'Christian Dior Erkek Çocuk Sneaker Bot Siyah beyaz', '', 1900, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-dior-siyah-standart-erkek-co-b3ea-0.jpg?v=1735928303']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Christian Louboutin', 'Christian Louboutin Viola Saten Clutch Gri', 'Christian Louboutin''in gümüş saten clutch çantası, sofistike bir gece aksesuarı olarak öne çıkıyor. İç kısmındaki parlak kırmızı astar ve kullanışlı cep detayı ile tamamlanan çantaya, taşlarla süslü ikonik stiletto detaylı kiss-lock kapanışı eşsiz bir şıklık katıyor. Gümüş tonlu çerçeve ile güçlendirilmiş çanta, elde taşınabildiği gibi ince zincir askısı sayesinde omuzda da taşınabiliyor. Genişlik 29 cm, yükseklik 15 cm, derinlik 4 cm.      Orijinallik ve Kalite Kontrolü:  Peony Collective’de he', 6599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-louboutin-gri-standart-beden-0a-025.jpg?v=1735928292', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-1_1773bc3e-19fa-4832-9053-80b6b3bb184b.jpg?v=1778673444', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-2_84f893c3-18ba-49ee-b58e-823f8c7ca2b1.jpg?v=1778673444']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Michael Kors', 'Michael Kors Volan Detaylı Midi Elbise Siyah yeşil - 42', 'Ürün Bilgisi   Beden: 42  Kumaş İçeriği: %96 saf yün, %4 elastik  Ölçü: Omuzdan boy: 100–104 cm  Göğüs (tek yön): 48–50 cm  Bel (tek yön): 40–42 cm  Basen (tek yön): 50–52 cm  Renk: Siyah,Yeşil  Editör Notları: Bu elbise, kontrast renk yerleşimi ve yapısal kesimiyle vücudu belirgin şekilde ince ve uzun gösteren güçlü bir siluete sahip. Orta kısımdaki düz ve koyu ton bel hattını toparlarken, yan paneller formu içe doğru çekerek daha fit bir görünüm yaratır. Bel hizasındaki volan detayları kalça d', 4900, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-siyah-yesil-renk-42-beden-a-9df7.jpg?v=1735928268']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Dior', 'Christian Dior Deri Topuklu Ayakkabı Nar Çiçeği - 39', 'Ürün Bilgisi    Renk: Nar Çiçeği  Beden: 39  Editör Notları:  Bu Christian Dior topuklu ayakkabı, markanın ikonik cannage (kapitone) dikiş detayını öne çıkaran, feminen ve zamansız bir modeldir. Kırmızı deri yüzeyi, peep-toe (açık burun) tasarımı ve burun kısmındaki zarif fiyonk detayıyla Dior’un sofistike ve romantik tasarım dilini yansıtır. İnce stiletto topuğu silueti uzatırken, platformlu tabanı hem şıklık hem de dengeli bir duruş sunar; özel davetler ve iddialı gece kombinleri için güçlü bi', 4020, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-dior-nar-cicegi-renk-39-bede-41d-44.jpg?v=1735928257']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Roberto Cavalli', 'Roberto Cavalli Leopar Saten ve Deri Clutch Leopar', 'Ürün Bilgisi  Renk: Kahverengi Tasarım: Leopar Desen  Kumaş İçeriği: Saten ,Deri  Eksper Notları: Parlak yüzeyi ve altın kapama detayıyla tek bakışta dikkat çeken, cesur ama zarif bir parça. İnce uzun formu elde taşındığında şık bir siluet yaratıyor. Akşam kombinlerine kolayca karakter katan, Cavalli imzasını net bir şekilde taşıyan özel bir aksesuar.             Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır. Kondisyon durumu 10/10  Orijinallik ve Kalite KontrolüPeony Collective’de t', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/roberto-cavalli-leopar-saten-ve-deri-c-e7d6-4.jpg?v=1735928242', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cavalli-1.jpg?v=1778676846', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cavalli-2.jpg?v=1778676846']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Alexander Mcqueen', 'Alexander McQueen Saten Platform Topuklu Ayakkabı Gri - 37.5', 'Ürün Bilgisi    Renk: Gri  Beden: 37.5   Editör Notları:          Bu Alexander McQueen topuklu ayakkabı, markanın güçlü ve mimari tasarım dilini yansıtan platformlu bir stiletto modelidir. Yumuşak dokulu saten yüzeyi, sade ama sofistike bir etki yaratırken; kalın platform tabanı ve yüksek blok topuğu sayesinde hem iddialı bir siluet hem de dengeli bir duruş sunar. Yuvarlatılmış burun formu ve temiz hatlarıyla zamansız bir şıklık sunan bu model, özellikle gece davetleri, özel organizasyonlar ve g', 2697.8, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alexander-mcqueen-gri-renk-37.5-beden--6b-dd0.jpg?v=1735928229']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Aidan Mattox', 'Aidan Mattox Boncuklu Püsküllü Kokteyl Elbisesi Siyah - 34', 'Ürün Bilgisi   Beden: 34  Renk: Siyah  Ölçü: Boy 90 cm En 40 cm  Materyal: %100 Polyester  Editör Notları: Bu elbise vücudu saran kesimi ve bel hizasında yoğunlaşan desenleri sayesinde beli ince, silueti daha orantılı ve feminen gösterir. Payetli ve boncuklu dokusu ışığı yakalayarak hareket ettikçe dikkat çekerken, etek ucundaki püskül detayları elbiseye dinamizm ve zarif bir akış katar; yürürken ve dans ederken çok şık durur. Omuzları dengeli biçimde örten kısa kollar üst bedeni toparlar, diz h', 7100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aidan-mattox-antrasit-renk-34-beden-ka--5272.jpg?v=1735928221']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Louboutin', 'Christian Louboutin Rugan Topuklu Ayakkabı Siyah - 35.5', 'Ürün Bilgisi    Renk: Siyah  Beden: 35.5  Editör Notları:  Bu Christian Louboutin topuklu ayakkabı, markanın imzası hâline gelen siyah rugan deri ve kırmızı taban detayıyla öne çıkan, zamansız bir stiletto modelidir. Yuvarlağa yakın burun formu ve ince topuk yapısı, klasik Pigalle / Simple Pump çizgisini çağrıştırır. Minimal ama güçlü duruşu sayesinde hem gündüz şık kombinlerde hem de gece davetlerinde rahatlıkla tercih edilebilecek, Louboutin’in sofistike ve feminen tasarım anlayışını yansıtan', 14000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/4667--2.jpg?v=1780913284', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/4667--3.jpg?v=1780913284', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/4667--4.jpg?v=1780913284', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/4667-1.jpg?v=1780913284']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Cesare Paciotti', 'Cesare Paciotti Deri Topuklu Ayakkabı Gri - 40', 'Ürün Bilgisi    Renk: Gri  Beden: 40  Editör Notları:  Bu Cesare Paciotti topuklu ayakkabı, markanın güçlü ve modern çizgisini yansıtan zamansız bir platformlu stiletto modelidir. Mat gri deri gövdesi, arka bölümde yer alan kontrast dokulu detayla sofistike bir karakter kazanırken, kalın ama dengeli topuk formu hem feminen hem de iddialı bir duruş sunar. Ön platformu sayesinde yüksek topuğa rağmen daha konforlu bir kullanım sağlar; şehir şıklığından gece kombinlerine kadar cesur ve güçlü bir sti', 4020, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cesare-paciotti-gri-renk-40-beden-kadi-da5d1e.jpg?v=1735928204']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'John Varvatos', 'John Varvatos İpek ve Kaşmir Triko Mavi - Xl', 'Bisiklet yaka, düğmeli, %70 İpek, %30 Kaşmir', 2700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/john-varvatos-mavi-xl-erkek-kazak-b708-4.jpg?v=1735928196']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Tommy Hilfiger', 'Tommy Hilfiger Taba Dolgu Topuk Ayakkabı Taba - 39', 'Ürün Bilgisi    Renk: Taba  Numara: 39   Editör Notları:          Markanın klasik ve zamansız stilini günlük şıklıkla buluşturan zarif bir dolgu topuk (wedge) modelidir. Taba tonlu süet yüzeyi yumuşak ve doğal bir görünüm sunarken, ahşap dokulu dolgu topuğu sayesinde hem boy kazandırır hem de gün boyu dengeli ve konforlu bir kullanım sağlar. Ön kısımdaki sade metal logo detayı tasarıma ince bir imza niteliği katar. Ofisten günlük kombinlere kadar rahatlıkla uyum sağlayan, feminen ama abartısız b', 3580, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tommy-hilfiger-taba-39-numara-kadin-ay-4ae549.jpg?v=1735928182']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Burberry', 'Burberry Drapeli Mürdüm Elbise Mürdüm - 36', '', 3580, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-murdum-renk-36-beden-kadin-el-4b7-03.jpg?v=1735928174']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balenciaga', 'Balenciaga Deri Chelsea Bot Siyah - 36', 'Ürün Bilgisi    Renk: Siyah  Beden: 36   Editör Notları:  Bu Balenciaga bot, markanın modern şehir stilini yansıtan deri Chelsea ankle boot modelidir. Parlak siyah deri yüzeyi, yan elastik panelleri ve arkadaki çekme halkasıyla klasik Chelsea formunu çağdaş bir yorumla sunar. Kalın tabanı üzerindeki altın tonlu Balenciaga logo detayı modele güçlü ve karakterli bir dokunuş katarken, rahat kalıbı günlük kullanım için konfor sağlar. Hem casual kombinlerde hem de smart-casual stillerde rahatlıkla te', 20000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-siyah-renk-36-beden-kadin-b-478-56.jpg?v=1735928168', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga1_fa5d0c55-5fc2-40c7-b1d0-ffd662e99a8d.jpg?v=1769694128', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga2_42c35829-47d1-4b1b-9b75-c3d514a0b36d.jpg?v=1769694128', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga3.jpg?v=1769694128']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Neil Barrett', 'Neil Barrett Baskılı Çocuk Sweatshirt Siyah beyaz - 10y', 'Öne Çıkan Özellikler:   Tasarım: Yazı detaylı.   Malzeme: Koton .   Renk: Siyah-Beyaz.   Beden: 10Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/neil-barrett-cocuk-sweetshirt-dfca8.jpg?v=1735928152']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Stella Mccartney', 'Stella McCartney İçi Kürklü Çocuk Ceket Yeşil - 10y', 'Öne Çıkan Özellikler:   Tasarım: İçi kürklü, ön cepli.   Malzeme: Dış polyester.   Renk: Yeşil.   Beden: 10Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-mccartney-cocuk-mont-00a01.jpg?v=1735928140']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Gucci', 'Gucci Cep Detaylı Çocuk Şort Mavi - 10y', 'Öne Çıkan Özellikler:   Tasarım: Arka cep detaylı.   Malzeme: Denim .   Renk: Mavi.   Beden: 10Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-erkek-sort1.jpg?v=1776253150', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-sort2.jpg?v=1776253150']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Burberry', 'Burberry Çocuk Hırka Lacivert - 10y', 'Öne Çıkan Özellikler:   Tasarım: Düğme detaylı.   Malzeme: Yün.   Renk: Lacivert.   Beden: 10Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-cocuk-hirka-552f1d.jpg?v=1735928118']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Dolce & Gabbana', 'Dolce & Gabbana Portofino Kanvas Sneaker Pembe beyaz - 38', 'Ürün Bilgisi    Renk: Beyaz - Pembe  Numara: 38  Kumaş İçeriği: Kanvas  Editör Notları:  Bu Dolce &amp; Gabbana sneaker, markanın genç ve enerjik çizgisini yansıtan porthole/low-top platform sneaker stilindedir. Beyaz taban üzerine pembe yan panel, metal perçin detayları ve ikonik DG logosu ile sportif ama iddialı bir görünüm sunar. Kalın tabanı sayesinde konforlu bir kullanım sağlarken, günlük şehir kombinlerinden casual-chic stillere kadar rahatlıkla uyum sağlayan modern ve dikkat çekici bir D', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce-gabbana-pembe-beyaz-38-kadin-sne-2e762d.jpg?v=1735928108']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tod''S', 'Tod'' Gommino Deri Loafer Vizon - 36.5', 'Ürün Bilgisi   Tasarım: Altın Halka,İp Detay  Kumaş İçeriği: Deri  Renk: Kahve Tonu  Beden: 36.5  Eksper Notları:Nude–kahve tonundaki bu Tod’s tarzı sürüş loafer’ı, yumuşak derisi ve alt kısımdaki kauçuk tırtıklarıyla gün boyu rahatlık sunuyor.Altın halkalar ve bağcık detayı ayakkabıya zarif bir hareket katarken, doğal rengi sayesinde neredeyse her kombine uyum sağlıyor.Hem konforlu hem de sade şıklık arayanlar için ideal bir günlük ayakkabı.  Eksper Puanları: Ürünün tüm incelemesi tarafımızca y', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tods-kadin-loafer-8ee-bf.jpg?v=1735928103']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Polo Yaka Tişört Füme - M', '', 3580, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph-lauren-erkek-t-shirt--4d9e.jpg?v=1735928096']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Godiva Topuklu Ayakkabı Turkuaz - 36', 'Ürün Bilgisi    Renk: Turkuaz  Beden: 36  Editör Notları:  Bu Sergio Rossi topuklu ayakkabı, markanın zamansız zarafet anlayışını yansıtan klasik stiletto pump modelidir. Sivri burun formu ve ince yüksek topuğuyla feminen bir siluet sunarken, ayakkabının turkuaz tonlarındaki süet derisi tasarıma sofistike ve dikkat çekici bir karakter kazandırır. Minimal ve logosuz çizgisi sayesinde hem gece davetlerinde hem de şık gündüz kombinlerinde rahatlıkla kullanılabilen, Sergio Rossi’nin rafine İtalyan i', 2200, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-turkuaz-renk-36-beden-top-32a-4d.jpg?v=1735928091', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio1_ffeb4255-de5e-4924-ade0-21bb0895dc1c.jpg?v=1766733768', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio2_6b710586-66c6-43de-b283-74d4a4f9fbdc.jpg?v=1766733769', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/godiva.jpg?v=1781511494']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Stuart Weitzman', 'Stuart Weitzman Süet Topuklu Ayakkabı Haki - 36', 'Ürün Bilgisi    Renk: Haki  Beden: 36  Topuk Yüksekliği: 10 cm  Editör Notları:  Bu Stuart Weitzman topuklu ayakkabı, markanın zamansız ve rafine klasik stiletto çizgisini yansıtan zarif bir modeldir. Bej süet gövdesi, burun kısmındaki siyah kontrast detayla sofistike bir görünüm kazanırken, sivri burun formu ve ince topuk yapısı ayağı daha uzun ve zarif gösterir. Dengeli topuk yüksekliği sayesinde şıklıkla birlikte konfor da sunan bu model, hem ofis stilinde hem de akşam kombinlerinde rahatlıkl', 3800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/agent-provocateur-kadin-mayo-30699.jpg?v=1735928085']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Marc Jacobs', 'Marc Jacobs Süet Topuklu Ayakkabı Bordo - 36', 'Ürün Bilgisi    Renk: Bordo  Beden: 36  Topuk Yüksekliği: 12 cm  Editör Notları:  Bu Marc Jacobs topuklu ayakkabı, markanın feminen ama güçlü tasarım dilini yansıtan platformlu pump modelidir. Yumuşak dokulu süet deri yapısı ve sıcak kahverengi tonu ile zamansız bir şıklık sunarken, kalın ve dengeli topuğu sayesinde klasik stile modern bir konfor ekler. Hafif yuvarlatılmış burun formu ve platform tabanı, hem gündüz hem akşam kombinlerinde rahatlıkla kullanılabilecek sofistike bir siluet oluşturu', 3800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Marc-Jacobs-ayakkabi-On.jpg?v=1767175385', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Marc-Jacobs-ayakkabi-yan.jpg?v=1767175385', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Marc-Jacobs-ayakkabi-arka.jpg?v=1767175385']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Burberry', 'Burberry Burnu Açık Bootie Bordo - 36', 'Ürün Bilgisi    Renk: Bordo  Beden: 36  Topuk Yüksekliği: 10 cm  Editör Notları:  Emporio Armani’nin bu tişörtü, markanın klasik çizgisiyle modern spor detayları birleştiren oldukça şık ve dengeli bir parça. Göğüs kısmındaki sade tasarım "sessiz lüks" bir hava sunarken, alt kısımdaki ikonik logo bandı tasarıma dinamik bir karakter katıyor. Siyah ve beyazın zamansız kontrastı sayesinde hem jeanlerle günlük hem de kumaş pantolonlarla daha seçkin kombinlere rahatlıkla uyum sağlar; kalitesini bağırm', 4900, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-bordo-renk-36-beden-topuklu-a-0-a9f3.jpg?v=1735928070']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Chanel', 'Chanel Zincir Detaylı Deri Platform Topuklu Ayakkabı - 37', 'Ürün Bilgisi    Renk: Siyah  Beden: 37   Editör Notları:  Bu Chanel topuklu ayakkabı, markanın klasik zarafetini modern bir detayla birleştiren ikonik bir platform pump modelidir. Siyah deri gövdesi zamansız ve güçlü bir duruş sunarken, ön platform bölümündeki zincir detay Chanel’in çanta ve aksesuarlarında sıkça görülen imza tasarım diline gönderme yapar. Yüksek ama dengeli topuğu sayesinde feminen bir siluet yaratır; hem gece kombinlerinde hem de şık davetlerde sofistike bir tamamlayıcı olara', 15000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-1.jpg?v=1781527284', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-2.jpg?v=1781527284', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-3.jpg?v=1781527284', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-4.jpg?v=1781527284']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Jimmy Choo', 'Jimmy Choo Rugan Kitten Topuk Ayakkabı Siyah - 36.5', 'Ürün Bilgisi    Renk: Siyah  Numara: 36.5   Editör Notları:  Bu Jimmy Choo topuklu ayakkabı, markanın zamansız ve sofistike çizgisini yansıtan slingback stiletto formunda bir modeldir. Sivri burun tasarımı, parlak siyah (vernik) deri yüzeyi ve ince topuk yapısıyla feminen ve zarif bir duruş sunar. Arka bantlı yapısı ayağı nazikçe kavrarken, hem özel davetlerde hem de şık akşam kombinlerinde klasik ama güçlü bir tamamlayıcı olarak öne çıkar.   Orijinallik ve Kalite Kontrolü Peony Collective’de tü', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/jimmy-choo-siyah-renk-365-beden-topukl-6125ab.jpg?v=1735928035']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Bottega Veneta', 'Bottega Veneta Padded Cassette Çanta Camel', 'Bottega Veneta Padded Cassette Crossbody Bag, ikonik Intreccio örgü işçiliği ile dikkat çeken şık ve lüks bir tasarıma sahiptir. Hafif yapısı ve şık karamel rengi ile her türlü kombine zarif bir dokunuş katarken, yumuşak ve konforlu askısı sayesinde omuzda veya çapraz taşımaya uygun bir kullanım sunar. İç kısmında fermuarlı bir cep bulunduran çanta, günlük ihtiyaçlarınızı kolayca sığdıracak genişliktedir. Intreccio örgü tekniğiyle işlenmiş kuzu derisi astara sahiptir. Askı uzunluğu 50 cm. Yüksek', 60000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-veneta-camel-renk-standart-bed-7-8efa.jpg?v=1735928029', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bittega1.jpg?v=1768467688', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bittega2.jpg?v=1768467688', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bittega3.jpg?v=1768467688', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bittega4.jpg?v=1768467689']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Hugo Boss', 'Hugo Boss Neon Yelekli Çocuk Ceket Lacivert - 10y', '', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hugo-boss-cocuk-ceket--c971.jpg?v=1735928017']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tory Burch', 'Tory Burch Sandalet Lacivert - 40.5', 'Ürün Bilgisi    Renk: Lacivert  Beden: 40.5   Editör Notları:  Bu Tory Burch sandalet, markanın feminen ve sofistike tasarım anlayışını yansıtan çiçek aplikeli topuklu sandalet modelidir. Lacivert tonlarındaki dokulu bantlar, el işi görünümlü çiçek detayları ve ahşap görünümlü konik topuğuyla hem zarif hem de karakterli bir duruş sunar. Ayak bileğini saran bant yapısı denge sağlarken, yaz davetlerinden şık akşam kombinlerine kadar rahatlıkla kullanılabilen, dikkat çekici ve rafine bir Tory Burch', 2260, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tory-burch-lacivert-renk-40--8bff.jpg?v=1735928000']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Bantlı Süet Topuklu Ayakkabı Lacivert - 37', 'Ürün Bilgisi    Renk: Lacivert  Beden: 37   Editör Notları:  Bu Sergio Rossi topuklu ayakkabı, markanın zarif ve feminen çizgisini yansıtan klasik bir stiletto pump modelidir. Lacivert süet deri yüzeyi, ayağı saran derin V kesimli formu ve ince bilek kayışı detayıyla hem şık hem de sofistike bir görünüm sunar. İnce ve yüksek topuğu silueti zarifçe uzatırken, sade ama güçlü tasarımı sayesinde özel davetlerden akşam şıklığına kadar birçok kombinle rahatlıkla kullanılabilecek zamansız bir modeldir.', 5505, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-bantli-suet-topuklu-ayakk--f4474.jpg?v=1735927994', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/laci2.jpg?v=1766652681', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/laci1.jpg?v=1766652681', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/laci3.jpg?v=1766652672']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Süet Topuklu Ayakkabı Lacivert - 36', 'Ürün Bilgisi    Renk: Lacivert  Beden: 36  Editör Notları:  Bu Prada süet topuklu ayakkabı, markanın zamansız ve feminen çizgisini yansıtan klasik platformlu pump modelidir. Lacivert tonlarındaki yumuşak süet deri, ayakkabıya sofistike ve rafine bir görünüm kazandırırken, yuvarlatılmış burun formu ve dengeli platform taban uzun süreli kullanımda konfor sunar. İnce ve yüksek topuğu silueti zarif şekilde uzatır; hem gündüz şık kombinlerde hem de akşam davetlerinde rahatlıkla tercih edilebilecek, P', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/suet-topuklu-ayakkabi-374-29.jpg?v=1735927957']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Kıyafet', 'Elbise', 'Monalisa', 'Monnalisa Tül Detaylı Çocuk Bluz Lacivert - 8 yaş', 'Ürün Bilgisi    Renk: Lacivert  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/monnalisa-frilly-kiz-cocuk-bluz-lacive-a38-bd.jpg?v=1735927951']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Hugo Boss', 'Hugo Boss Çocuk Sweatshirt Lacivert - 10 y', 'Ürün Bilgisi    Renk: Lacivert  Beden:  10 Yaş  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marka-logolu-sweat-lacivert-renk-10-y--1d4b3d.jpg?v=1735927944']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Giuseppe Zanotti', 'Giuseppe Zanotti İşlemeli Süet Espadril Lacivert - 39', '', 7650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/boncuk-suslemeli-espadril-lacivert-ren-9-aa45.jpg?v=1735927938']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Brooks Brothers', 'Brooks Brothers Mevsimlik Bomber Ceket - M', 'Ürün Bilgisi    Renk : Lacivert/çiçekli desen   Beden : Medium  Kumaş İçeriği: %91 polyester , %9 spandeks (sentetik)  Editör Notları:  Lacivert zemin üzerine renkli çiçek desenleriyle işlenmiş bomber formunda bir Brooks Brothers ceket. Canlı floraller, markanın geleneksel preppy estetiğine enerjik ve modern bir dokunuş katıyor. Ribanalı yaka, etek ucu ve manşet detayları silueti sportif şekilde toparlarken, öndeki fermuar kapama modeli günlük kombinlerde oldukça kullanışlı hale getiriyor. Hem j', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cicek-desenli-mevsimlik-bomber-ceket-l-41-857.jpg?v=1735927921']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Missoni', 'Missoni Zikzak Desenli Tulum Mavi - 34', '', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni-mavi-renk-34-beden-tulum-8f7b-e.jpg?v=1735927896', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni-mavi-renk-34-beden-tulum-759943.jpg?v=1735927896', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni-mavi-renk-34-beden-tulum-29b-b7.jpg?v=1735927896']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK', 'Diğer', 'Diğer', 'Versace', 'Versace Erkek Jean Lacivert - 36', 'Ürün Bilgisi    Renk: Lacivert   Beden: 36  Editör Notları:            Bu Versace jean pantolon, markanın güçlü ve zamansız tasarım anlayışını yansıtan klasik 5 cep formunda bir modeldir. Siyah denim kumaşı, kontrast sarı dikiş detayları ile hareket kazanırken, net kesimi sayesinde modern ve maskülen bir duruş sunar. Günlük kullanımda konforlu, kombinlemesi ise oldukça kolaydır; Versace’nin sade ama iddialı stilini temsil eder.           Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürü', 3140, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/versace-erkek-jean-36-624-8e.jpg?v=1735927872']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Salvatore Ferragamo', 'Salvatore Ferragamo Mürdüm Hırka Mürdüm - L', 'Ürün Bilgisi    Renk: Mürdüm  Beden: L   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/salvatore-ferragamo-murdum-renk-l-bede-ecd007.jpg?v=1735927849']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Camel Stiletto Camel - 41', 'Ürün Bilgisi    Renk: Camel  Beden: 41   Editör Notları:  Bu Prada topuklu ayakkabı, markanın feminen ama iddialı tasarım çizgisini yansıtan pointed toe (sivri burun) stiletto modelidir. Nude–bej tonlarında, hafif dokulu ve parlak yüzeyli derisiyle zarif bir silüet sunarken, en dikkat çekici detayı altın tonlu metal stiletto topuğudur. İnce ve heykelsi topuk formu, klasik pump modelini modern ve mücevher etkili bir tasarıma dönüştürür. Özel davetler, gece kombinleri ve şık akşam stilleri için gü', 7500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-ayakkabi-on.jpg?v=1767188531', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-ayakkabi-yan.jpg?v=1767188531', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-ayakkabi-arka.jpg?v=1767188531']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Valentino', 'Velvet Rockstud Small No Limit Çanta Kırmızı', 'Valentino Garavani Velvet Rockstud Small No Limit Shoulder Bag, yumuşak kırmızı kadife yüzeyi ve altın rengi metal zımbalarıyla, Valentino’nun ikonik Rockstud detaylarını taşır. Ön kapağında döner kilit sistemi bulunan çanta, aynı zamanda zımbalı kırmızı deri omuz askısına sahiptir. İç kısmında iki ayrı bölme, fermuarlı bir ara bölme ve ek cepler bulunur. Arka yüzünde ise küçük bir cep yer alır. Altın tonlarındaki metal donanımı ve deri astarı ile hem lüks hem de zamansız bir stil sunar.', 29299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-2.jpg?v=1778670872', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-1.jpg?v=1778670872']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Diane Von Furstenberg', 'Diane Von Furstenberg Elbise Sarı - 34', 'Ürün Bilgisi   Beden: 34  Kumaş İçeriği: %95 ipek, %5 spandex.  Ölçü: Boy 92 cm İki koldan 50 cm  Renk: Sarı  Editör Notları: Bu elbise akışkan kumaşı ve bel kısmındaki düğüm detayıyla vücudu doğal şekilde toparlayıp beli ince gösterirken, V yaka formu üst bedeni daha uzun ve zarif bir siluete taşıyor. Diz hizasına yakın boyu hem rahat hem şık bir duruş sunarken, hareketli eteği yürürken çok hoş bir akış yaratıyor. Canlı sarı tonu sayesinde enerjik, aydınlık ve dikkat çekici bir etki bırakır; ya', 3999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/diane-von-furstenberg-sari-renk-34-bed-a-82db.jpg?v=1735927817']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Self Portrait', 'Self-Portrait Dantel Detaylı Maxi Elbise  - 6', 'Açıklama Otoportre dantel detaylı maxi elbise, zamansız bir şıklık sağlar. Öne Çıkan   Tasarım: Düşük omuz, dantel detayı.   Malzeme: Polyester .   Renk: Kiremit.   Beden: 6.  Ölçü: Boy:132 Bel:41 Deforme: Deformesi bulunmamaktadır.  Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/self-portrait-kiremit-rengi-renk-6-bed-573a15.jpg?v=1735927808']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alaia', 'Alaïa Arabesque Lazer Kesim Deri Clutch', 'Ürün Bilgisi   Renk:Turuncu  Tasarım:Lazer kesim ,fermuarlı  Kumaş İçeriği:Deri  Eksper Notları:Sıcak turuncu tonu ve lazer kesim desenleriyle öne çıkan bu clutch, zarif ve düzenli bir tasarım anlayışı sunuyor. Düz formu sayesinde elde rahat taşınabilirken, iç hacmi günlük ihtiyaçları pratik şekilde taşıyacak alan sağlıyor.Hafif yapısı ve modern görünümü sayesinde hem gündelik kombinlerde hem de daha düzenli akşam stillerinde kullanılabilir. Desen yüzeyi çantaya karakter katan güçlü bir detay ol', 14000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alaia-kahverengi-renk-standart-beden-c-063292.jpg?v=1735927775']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Michael Kors', 'Michael Kors Kayık Yaka Midi Elbise Pembe - Xl', 'Ürün Bilgisi   Beden: XL  Renk: Pembe  Editör Notları: Bu elbise sade ama çok güçlü bir siluete sahip; vücuda oturan düz kesimi sayesinde beli ve kalçayı toparlayarak daha ince bir görünüm yaratır, diz hizasındaki boyu ise bacakları olduğundan uzun gösterir. Omuzları hafifçe saran kolsuz formu üst bedeni dengelerken, düz yaka ve pürüzsüz hatlar elbiseye zamansız ve zarif bir duruş kazandırır. Canlı pembe tonu sayesinde davetlerde, kokteyllerde ya da şık akşam organizasyonlarında tek başına bile', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-kayik-yaka-midi-elbise-xl-5ff7e7.jpg?v=1735927760']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Goyard', 'Goyard Comores PM Tote Çanta Siyah', 'Goyard Comores PM Tote, ikonik desenli kanvas ve deri detayları ile şıklığı ve işlevselliği bir araya getiriyor. 29 cm genişliği, 33 cm yüksekliği ve 8 cm derinliği, günlük kullanımda rahatlıkla eşyalarınızı taşımanıza olanak tanıyor. Siyah deri saplar üzerinde toka detayları çantaya modern bir dokunuş katarken, sağlam bir tutuş da sağlıyor. İç kısmında sarı kumaş astar ve fermuarlı bir yan cep bulunan çanta, şıklığından ödün vermeden pratik bir aksesuar kullanmak isteyenler için mükemmel seçim.', 30000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/g.jpg?v=1767944214']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Bottega Veneta', 'Bottega Veneta Intrecciato Brera Deri Çanta Siyah', 'Bottega Veneta''nın zarif Intrecciato Brera siyah el çantası, markanın ikonik el işçiliğini ve sofistike tasarımını yansıtır. Yüksek kaliteli deri kullanılarak dokuma tarzında üretilen büyük boy tote çanta, yaklaşık 46 x 28 x 15 cm ölçülerindedir. Üstte bulunan sağlam tutma sapları, rahat bir taşıma deneyimi sunar. Manyetik kapanış mekanizması, eşyalarınızın güvenliğini sağlar. Dış kısımda bulunan fermuarlı cepler, küçük eşyalarınıza kolay erişim imkanı tanır. Yanlardaki çıtçıtlı detaylar, çant', 26900, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-veneta-siyah-renk-standart-bed-93d634.jpg?v=1735927731', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-1_2372864f-a1b9-4cdc-ad30-fd2f970bb38b.jpg?v=1778829921', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-2_0aac37b9-4236-484c-b51e-1ec1e780ca1f.jpg?v=1778830017']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balenciaga', 'Balenciaga Motocross Giant Envelope Clutch Lacivert - Standart', 'Bu nadir ve özel tasarım Balenciaga Motocross Giant 21 Envelope clutch çanta, denim ve koyu mavi deri kombinasyonuyla dikkat çekiyor. Zarif kapak stili ve köşelerdeki metal zımba detayları, çantaya imza Balenciaga görünümü katarken, ön yüzündeki fermuarlı cep işlevsellik sağlıyor. Deri astarlı iç kısmında geniş çift bölme bulunan çanta, hem günlük kullanımda hem de özel etkinliklerde şık bir aksesuar olarak öne çıkmak isteyenler için mükemmel bir tercih. Yükseklik 18 cm, genişlik 30 cm.', 15000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-lacivert-renk-standart-bede-9c-169.jpg?v=1735927717', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-lacivert-renk-standart-bede-f-bfb5.jpg?v=1735927718', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-lacivert-renk-standart-bede-ab97-4.jpg?v=1735927718', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-lacivert-renk-standart-bede-a60c-0.jpg?v=1735927718']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Junior Gaultier', 'Junior Gaultier Çocuk Elbise Siyah - 10 y', 'Öne Çıkan Özellikler   Tasarım: Omuz işleme detaylı.   Malzeme: Polyester-Elastan karışım .   Renk: Siyah.   Beden: 10Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/junior-gaultier-siyah-renk-10-beden-ki-cca-ae.jpg?v=1735927705']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Rykiel Enfant', 'Rykiel Enfant Renkli Çizgili Bebek Mont Renkli - 2 yaş', 'Öne Çıkan Özellikler   Tasarım: Cep, kapüşon detaylı.   Malzeme: Tüy karışımlı .   Renk: Renkli.   Beden: 2Y..   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rykiel-enfant-renkli-renk-2-beden-kiz--328-45.jpg?v=1735927696']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Roberto Cavalli', 'Roberto Cavalli Leopar Desenli Denim Etek Leopar - 6 yaş', 'Öne Çıkan Özellikler   Tasarım: Leopar desenli, arkada marka etiketli.   Malzeme: Denim.   Renk: Kahve.   Beden: 6Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/roberto-cavalli-leopar-renk-6-beden-ki-c89-4d.jpg?v=1735927684']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Monalisa', 'Monnalisa Broşlu Kız Çocuk Ceket Leopar - 12y', 'Öne Çıkan Özellikler   Tasarım: Broş detaylı, leopar desenli.   Malzeme: Akrilik.   Renk: Leopar.   Beden: 12Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/monnalisa-leopar-renk-12-beden-kiz-coc-5-5855.jpg?v=1735927673']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Monalisa', 'Monnalisa Kürklü Süet Mont Krem - 2 yaş', 'Öne Çıkan Özellikler   Tasarım: İçi kürklü, cep detaylı.   Malzeme: %44 polyester, %56 akrilik .   Renk: Krem.   Beden: 2Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/monnalisa-krem-renk-2-beden-kiz-cocuk--9f238b.jpg?v=1735927661']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balenciaga', 'Balenciaga Pompon Giant Brogues Çanta Mor - Standart', 'İspanya kökenli Fransız modaevinin 2009 yılında tanıttığı Balenciaga Giant Covered Pompon çanta, stil ve işlevselliği bir araya getiriyor. Mor renkteki kaliteli yumuşak lüks derisi ve uyumlu mor kaplama dev çivi detayları ile dikkat çekiyor. Çantanın dış yüzeyinde fermuarlı bir cep, toka detayları ve ön kısımda ayarlanabilir bir büzgü kapanış sistemi bulunuyor. Ayarlanabilir ve çıkarılabilir deri askı, omuzda veya çapraz olarak kullanılabilmesini sağlıyor. Siyah kumaş astarlı iç yüzeyde bir ferm', 16000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-mor-renk-standart-beden-can-863b-7.jpg?v=1735927644', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-mor-renk-standart-beden-can-1-aa91.jpg?v=1735927644', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-mor-renk-standart-beden-can-0d-974.jpg?v=1735927644', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-mor-renk-standart-beden-can-113-b7.jpg?v=1735927644']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Balmain', 'Balmain Bisiklet Yaka Çocuk Sweatshirt Gri - 10 y', 'Ürün Bilgisi   Tasarım: Omuz,Kol Detaylı  Kumaş İçeriği: Pamuk  Renk: Gri  Beden: 10 Yaş   Eksper Notları: Omuz ve kol detaylarındaki beyaz paneller parçaya spor bir hava katarken, yumuşak pamuk dokusu gün boyu rahatlık sağlıyor.   Eksper Puanları: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır. 10/10   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi i', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-gri-renk-10-beden-erkek-cocuk--0-ba43.jpg?v=1735927629']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Gucci', 'Gucci Çocuk Loafer Kahverengi - 29', 'Kahverengi Süet 29 Numara Hiç kullanılmamış,temizdir.', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-kahverengi-renk-29-numara-erkek--3-f726.jpg?v=1735927615']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Yves Saint Laurent', 'Yves Saint Laurent ( YSL )Bantlı Platform Rugan Ayakkabı Siyah - 40,5', 'Ürün Bilgisi   Siyah Rugan Önü açık Topuk yüksekliği: 14 cm''dir. Platform yüksekliği: 3 cm''dir.  Orijinallik ve Kalite Kontrolü  Peony Collective''de tüm ürünler uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi  sunulur. Güvenle alışveriş yapabilirsiniz.', 3800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yves-saint-laurent-siyah-renk-405-bede-2619cd.jpg?v=1735927598']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tod''S', 'Tod'' Gommino Süet Loafer Nar çiçeği - 38.5', 'Öne Çıkan Özellikler   Malzeme: Süet.  Renk: Nar çiçeği.  Beden: 38.5     Orijinallik ve Kalite Kontrolü  Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Tod-loafer-yan.jpg?v=1767178033', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Tod-loafer-arka.jpg?v=1767178033', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tod-loafer-detay.jpg?v=1767178033']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi İpek Fular Lacivert', 'Açıklama Fendi %100 ipek fular, çok yönlü kullanımıyla her tarza uyum sağlar. Boyunda, saçta, bilekte ya da çanta aksesuarı olarak kullanılabilir. Mavi, turkuaz, beyaz, kahve ve siyah tonlarıyla her kıyafeti tamamlayan bir şıklık sunar. Çok az kullanılmış ve temiz durumdadır.     Öne Çıkan Özellikler     Tasarım: Mavi, turkuaz, beyaz, kahve ve siyah tonlarında, Fendi imza desenleriyle   Kullanım Alanları: Boyun, saç, bilek ya da çanta aksesuarı olarak kullanılabilir   Malzeme: %100 ipek   Dur', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-lacivert-renk-standart-beden-ful-25b-40.jpg?v=1735927561']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Christian Dior', 'Christian Dior Fiyonklu Babet Gümüş - 38', 'Ürün Bilgisi    Renk : Gümüş  Numara : 38  Tasarım : Kapitone dikişli yüzey  Eksper Notları : Metalik sedef tonundaki kapitone deri dokusuyla öne çıkan bu zarif babet , yuvarlak burun formu ve ön kısmındaki grosgrain fiyonk detayıyla klasik şıklığı modern bir dokunuşla buluşturuyor . Siyah biyeli kenar tasarımı modele hem kontrast hem de sofistike bir görünüm katıyor.   Eksper Puanı : Ürünün tüm incelemesi tarafımızca yapılmıştır. Alt taban kullanım izleri, iç topuk kısmı renk değişikliği. 10/8', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-dior-gumus-renk-38-beden-bab-30-3c8.jpg?v=1735927542']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Tek Düğmeli Ceket Pantolon Takım Siyah - 34', 'Ürün Bilgisi    Renk: Siyah  Beden:34  Editör Notları: Klasik çizgiyi modern bir yorumla buluşturan bu takım, hem iş ortamında hem de şık bir davette rahatlıkla kullanılabilecek çok yönlü bir görünüme sahip. Bele oturan ceket kalıbı silueti zarifçe şekillendirirken, pantolonun cep detayları feminen ve sofistike bir duruş sunuyor. Zamansız tasarımı sayesinde gardırobun en işlevsel parçalarından biri  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından det', 9599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-tek-dugmeli-ceket-pantolon-ta-e6f0d3.jpg?v=1735927527']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Lanvin', 'Lanvin Gül Kurusu High-Top Sneaker Pembe - 38', 'Ürün Bilgisi    Renk: Gül Kurusu  Numara: 38   Editör Notları:  Bu Lanvin sneaker, markanın spor-şık çizgisini yansıtan yüksek bilekli (high-top) bir modeldir. Nude–bej tonlarındaki deri ve tekstil karışımı üst yüzeyi, yuvarlak burun formu ve bağcıklı tasarımıyla günlük kullanıma uygundur. Rahat tabanı ve sade ama sofistike duruşu sayesinde jean, chino pantolon ve casual kombinlerle kolayca eşleşen, şehir stiline modern bir lüks dokunuş katan zamansız bir Lanvin sneaker’dır.   Orijinallik ve Kal', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lanvin-gul-kurusu-renk-38-beden-sneake-e-16b4.jpg?v=1735927512']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Agolde', 'Agolde Vegan Deri Gömlek Gri - S', 'AçıklamaŞıklığı ve çevre dostu tasarımı bir araya getiren modern bir parça. %55 polyester ve %45 poliüretandan ABD''de üretilmiştir ve yalnızca kuru temizleme ile temizlenmesi önerilir. Vegan deri kullanılarak yapılan tasarım, otantik deri görünümünü hayvanlara zarar vermeden sunar.   Ürün Bilgisi    Renk: Gri  Beden: S   Kumaş İçeriği: %55 polyester, %45 Poliüretan Vegan Deri   Eksper Notları: Gri tonlarında, derimsi yüzeye sahip modern bir gömlek. Yapısı itibarıyla hafif parlak bir bitiş sunu', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/agolde-gri-renk-s-beden-gomlek-b104e4.jpg?v=1735927485']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Stella Mccartney', 'Stella McCartney Kamuflaj Desenli Çocuk Mont Renkli - 8 y', 'Ürün Bilgisi   Tasarım: Parmak Geçirme,fermuar Kapama,Kapişon Detaylı  Kumaş İçeriği: Polyester  Renk: Gri,Yeşil  Beden: 8yaş   Eksper Notları: Canlı sarı detaylarıyla öne çıkan kamuflaj mont, çocukların hem sıcak kalmasını hem de rahatça hareket etmesini sağlayan bir tasarıma sahip.Suya dayanıklı yüzeyi, kapüşonu ve büyük cepleriyle günlük kullanım için çok pratik.Soğuk havalarda güvenli, dayanıklı ve dikkat çeken bir dış giyim parçası.   Eksper Puanları: Ürünün tüm incelemesi tarafımızca yapıl', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/monton.jpg?v=1769625759', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2014.jpg?v=1769625795', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2013.jpg?v=1769625797']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tod''S', 'Tod'' Gommino Süet Loafer Lacivert - 37.5', 'Ürün Bilgisi:   Numara:37.5  Renk:Lacivert  Kumaş İçeriği:Süet  Eksper Notları: Lacivert süet dokusuyla zarif ve temiz bir görünüm sunan bu loafer, klasik penny detayını modern bir yalınlıkla taşıyor. Yumuşak yapısı ve tabandaki sürücü tipi kauçuk çıkıntılar rahat adım sağlarken, gündelik şehir stilinde hem jean’lerle hem de daha smart-casual kombinlerle uyum sağlayan çok kullanışlı bir model.  Eksper Puanı: Ürünün tüm incelemesi tarafımızca yapılmıştır.Kondisyon durumu 10/9     Orijinallik ve K', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tods-lacivert-renk-375-beden-loafer-39-446.jpg?v=1735927445']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Theory', 'Theory Somon Kazak Somon - M', 'Ürün Bilgisi   Beden:38  Renk:Somon  Tasarım:Yaka Detaylı  Kumaş İçeriği:100%Kaşmir  Editör Notları:Yumuşak dokulu mercan tonlu bu triko, sade çizgisi ve rahat kesimiyle günün her anına uyum sağlıyor. Düşük omuz detayları modern bir hava katarken, geniş ribana bitişleri parçayı daha derli toplu gösteriyor. Hem denimlerle hem de klasik parçalarla kolayca eşleşen, konforlu ve sıcak tutan bir kazak.  Eksper Puanı:Ürünün Tüm İncelemesi Tarafımızca Yapılmıştır.Kondisyon durumu 10/10   Orijinallik ve', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/theory-somon-renk-m-beden-kazak-4d-f03.jpg?v=1735927425']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'ERKEK ÇOCUK', 'Diğer', 'Diğer', 'Stella Mccartney', 'Stella Mccartney Yaş Erkek Çocuk İçlik - 14 yaş', 'Öne Çıkan Özellikler:   Tasarım: Yazı detaylı.   Malzeme: Polyester.   Renk: Yeşil.   Beden: 14Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-mccartney-yesil-renk-14-yas-erk-57-c43.jpg?v=1735927415']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Platform Oxford Ayakkabı Siyah - 38', 'Siyah   Deri  38 numara  Tam kalıptır', 3800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-siyah-renk-38-beden-sneaker-e-49db.jpg?v=1735927384']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Joseph', 'Joseph Düğmeli ve Kuşaklı Elbise Ekru - 36', 'Ürün Bilgisi   Renk: Krem  Beden: 36  Editör Notları: Kırık beyaz tonundaki bu uzun elbise, önü düğmeli yakası ve rahat kesimiyle sakin ve zarif bir görünüm sunuyor.Akışkan kumaşı hareket ettikçe yumuşak bir düşüş sağlar; bilekte biten geniş manşetleri modele hafif bir karakter katar.Günlük şehir stilinden sakin bir davete kadar pek çok ortamda kullanılabilecek, zamansız bir parça.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incel', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/joseph-ekru-renk-36-beden-elbise-ef3-a3.jpg?v=1735927357']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Manolo Blahnik', 'Manolo Blahnik Bağcıklı Deri Topuklu Ayakkabı Siyah - 40', 'Ürün Bilgisi    Renk: Siyah  Beden: 40  Topuk Yüksekliği: 11 cm  Editör Notları:  Bu Manolo Blahnik topuklu ayakkabı, markanın zamansız şıklığını modern bir dokunuşla birleştiren açık arka (slingback) bootie formunda bir tasarımdır. Pürüzsüz siyah deri yüzeyi, ayak bileğini saran yapısı ve arkadaki bağcıklı detayla feminen ama güçlü bir siluet sunar. İnce ve dengeli stiletto topuğu, klasik Manolo Blahnik zarafetini korurken ayakkabıya şehirli ve sofistike bir karakter kazandırır. Hem gece kombin', 2150, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/manolo-blahnik-siyah-renk-40-beden-top-91bc82.jpg?v=1735927314']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Diane Von Furstenberg', 'Diane von Furstenberg Lyle Shearling Yelek Lacivert - 36', 'Ürün Bilgisi   Beden:38  Renk: Siyah,Beyaz  Tasarım: Shearling yakalı, kürk astarlı ve deri dış yüzeyli  Kumaş İçeriği: Deri  Eksper Notları: Kış stiline özgün bir dokunuş katan bu kürklü yelek, kontrast renkleri ve güçlü yapısıyla dikkat çekiyor. Omuz bölümündeki kıvırcık dokulu siyah kürk sıcaklık ve hacim kazandırırken, gövde kısmındaki kırık beyaz ve koyu deri yüzey modern bir denge oluşturuyor. Büyük cepler hem pratiklik sunuyor hem de modele karakter katıyor. Kalın yapısı sayesinde soğuk h', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/diane-von-furstenberg-lacivert-renk-36-8-485c.jpg?v=1735927294']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Chloe', 'Chloé Peluşlu Uzun Yelek Lacivert - 36', 'Açıklama Chloe peluşlu yelek, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Peluş detaylı.   Malzeme: Kuzu derisi .   Renk: Lacivert.   Beden: 36   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chloe-lacivert-renk-36-beden-yelek-47-27f.jpg?v=1735927245', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chloeyan.jpg?v=1769840903', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chloearka.jpg?v=1769840903']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tara Jarmon', 'Tara Jarmon Hardal Sarısı Ceket - 38', 'Öne Çıkan Özellikler   Renk: Hardal sarısı.  Beden: 38.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tara-jarmon-hardal-sarisi-renk-38-bede-48d253.jpg?v=1735927189']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Paul & Joe', 'Paul & Joe Fiyonk Detaylı Uzun Hırka Lacivert - 40', 'Ürün Bilgisi    Renk: Lacivert  Beden: 40   Editör Notları:  Bu Paul &amp; Joe hırka/ince ceket, markanın feminen ve Parisyen çizgisini yansıtan zarif bir modeldir. Düz lacivert rengi, belden hafif oturan silueti ve ön kısımda yer alan kurdele detaylı kapama tasarımıyla klasik ama romantik bir görünüm sunar. İnce yapısı sayesinde mevsim geçişlerinde veya serin akşamlarda elbise ve bluzların üzerine rahatlıkla kullanılabilir; hem günlük şıklıkta hem de daha sofistike kombinlerde zamansız bir tama', 2299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/paul-joe-lacivert-renk-40-beden-hirka-d240d.jpg?v=1735927176']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Jimmy Choo', 'Jimmy Choo Bilekten Bantlı Platform Topuklu Sandalet Sarı - 38.5', 'Sarı. Topuk yüksekliği 13.5 cm. Üzerinde lekeler mevcuttur. Bilekten kemerli bağlamalıdır.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/jimmy-choo-sari-renk-385-beden-topuklu-3924f3.jpg?v=1735927159']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Armani Collezione', 'Armani Collezioni Hırka Gri - 40', 'Ürün Bilgisi   Beden:40   Renk:Gri   Tasarım:Düğmeli,Yan Detaylı   Eksper Notları:omuz ve yanlardaki açık krem panellerle birleştiren bu Armani ceket, yapılandırılmış siluetiyle çok temiz bir duruş sunuyor. Yumuşak geçişli renk blokları tasarıma modern bir çizgi katarken, asimetrik kapanışı parçayı daha karakterli hale getiriyor. İş ortamından şehir stiline kadar pek çok kombine uyum sağlayan zarif ve minimalist bir ceket.   Eksper Puanı:Ürünün Tüm İncelemesi Tarafımızca Yapılmıştır.Kondisyon Du', 2799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/armani-collezioni-gri-renk-40-beden-hi-38898.jpg?v=1735927148']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Miu Miu', 'Miu Miu Bağcıklı Klasik Ayakkabı Siyah - 42', 'Siyah. 42 numara. Deri. Bağcıklı. Temizdir, çok hafif deri kırılmaları mevcuttur.', 7500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/miu-miu-siyah-renk-42-beden-klasik-aya-b48-b7.jpg?v=1735927131']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Klasik Ayakkabı Kahverengi - 43.5', 'Siyah. Rugan. İtalyan 9,5 numaradır. Hiç kullanılmamış, temizdir.', 20300, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-kahverengi-renk-435-beden-klasik-b1e-ab.jpg?v=1735927122']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Dolce & Gabbana', 'Dolce & Gabbana Burnu Açık Rugan ve Deri Topuklu Ayakkabı Siyah - 36.5', 'Ürün Bilgisi    Renk: Siyah  Beden: 36.5  Topuk Yüksekliği: 9 cm  Editör Notları:  Bu Dolce &amp; Gabbana topuklu ayakkabı, markanın feminen ama güçlü tasarım dilini yansıtan zarif bir peep-toe pump modelidir. Parlak siyah rugan gövde, ön kısımda yer alan kontrast taba deri bant ve dekoratif detay ile hareket kazanırken, ince ve kavisli stiletto topuk silueti son derece şık bir duruş sunar. Klasik formu modern dokunuşlarla birleştiren bu model; özel davetler, akşam kombinleri ve sofistike şehir', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/4785---1.jpg?v=1780918022', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/4785---2.jpg?v=1780918022', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/4785---3.jpg?v=1780918022']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Aquazzura', 'Aquazzura Bağcıklı ve Bantlı Deri Topuklu Ayakkabı Bej - 35.5', 'Ürün Bilgisi    Renk: Bej  Beden: 35.5  Topuk Yüksekliği: 11 cm  Editör Notları:  Bu Aquazzura topuklu ayakkabı, markanın zarif ve feminen çizgisini yansıtan lace-up detaylı open-toe sandal-pump formunda bir modeldir. Açık burun tasarımı, bilek kısmındaki bağcık detayı ve ince stiletto topuğuyla hem modern hem de sofistike bir siluet sunar. Nude/ekru tonlu pürüzsüz deri yapısı sayesinde bacak boyunu optik olarak uzatır; özel davetlerden yaz akşamı kombinlerine kadar şık ve iddialı bir kullanım s', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquazzura-bagcikli-ve-bantli-deri-topu--98f7.jpg?v=1735927098', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Aquazzura-Ayakkabu-On.jpg?v=1767176306', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Aquazzura-ayakkabi-arka.jpg?v=1767176305']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gianvito Rossi', 'Gianvito Rossi Bilekten Bantlı Süet Stiletto Siyah - 35.5', 'Ürün Bilgisi    Renk: Siyah  Beden: 35.5  Kumaş İçeriği: 10 cm Editör Notları:   Bu Gianvito Rossi topuklu ayakkabı, markanın imza niteliğindeki zarif siluetini yansıtan sivri burunlu, ince topuklu bir modeldir. Siyah süet yüzeyi sofistike ve mat bir duruş sunarken, arkadan gelen ince bilek bandı detayı hem feminen bir hava katar hem de ayağı daha dengeli kavrar. Minimal ama son derece şık tasarımıyla akşam davetlerinden özel gün kombinlerine kadar zamansız bir kullanım sunan, klasik Gianvito Ro', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-siyah-renk-35-2-7fe1.jpg?v=1735927084', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito1_c0c0b9c6-367a-4320-a390-e05867c900db.jpg?v=1766652401', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gian2.jpg?v=1766652401', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gian3.jpg?v=1766652401']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Kenzo', 'Kenzo Kids Blok Renkli Çocuk Sweatshirt Gri - 14 yaş', 'Öne Çıkan Özellikler:   Tasarım: Yazı ve renk detaylı.   Malzeme: Koton.   Renk: Gri.   Beden: 14Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-gri-turuncu-renk-14-beden-sweats-e-9a1d.jpg?v=1735927079']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Kenzo', 'Kenzo Desenli Çocuk Sweatshirt Gri - 14 yaş', 'Öne Çıkan Özellikler   Tasarım: Hayvan desenli.   Malzeme: Koton.   Renk: Gri.   Beden: 14Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-gri-renk-14-beden-sweatshirt-08e3-e.jpg?v=1735927068']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Theory', 'Theory Ceket Siyah - M', 'Ürün Bilgisi   Beden: 38  Renk: Siyah  Tasarım: Fermuar Kapama  Eksper Notları: Siyah rengin sade gücünü taşıyan bu ceket, fermuar detayları ve düz kesimiyle şehir stiline net ve modern bir dokunuş katıyor. Hafif yapısı sayesinde mevsim geçişlerinde rahatlıkla kullanılabilir; ince yaka formu spor ve minimal bir görünüm yaratıyor. Göğüsteki ve yanlardaki fermuarlı cepler hem pratiklik sağlıyor hem de cekete hareket kazandırıyor. Jean’lerle, basic tişörtlerle veya daha klasik parçalarla kolayca uy', 3250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/theory-siyah-renk-m-beden-ceket-5a-a78_f9e20d15-3239-45ce-bb2b-429824615d4c.jpg?v=1735927028']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Salvatore Ferragamo', 'Salvatore Ferragamo Mink Wristlet Clutch Siyah', 'Ürün Bilgisi  Renk:Kahverengi Tasarım: Çıkarıp Takılabilir Kürk Detaylı Kumaş İçeriği: Süet,Kürk  Eksper Notları:Yumuşak dokulu, koyu tonlu bir kemer; merkezdeki kürk detayıyla öne çıkıyor.Dokusu sayesinde bele zarifçe oturuyor, kürklü parça ise hem sıcak bir his hem de şıklık katan küçük bir vurgu yaratıyor. Minimal görünümü seven ama detaydan vazgeçmeyenler için tamamlayıcı bir aksesuar.      Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır.Kondisyon Durumu 10/10   Orijinallik ve Kali', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/salvatore-ferragamo-mink-wristlet-clut-66c466.jpg?v=1735927016']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Roberto Cavalli', 'Roberto Cavalli Desenli Maksi Elbise ve Ceket Takım - 38', 'Açıklama Roberto Cavalli elbise ve ceket takım,  zamansız bir şıklık sağlar. Öne Çıkan Özellikler   Tasarım: Desenli.  Renk: Mavi-Beyaz.  Beden: 38.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/roberto-cavalli-mavi-beyaz-renk-38-bed-0895-4.jpg?v=1735926996']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Paul & Joe', 'Paul & Joe Hırka Lacivert - 36', 'Ürün Bilgisi    Renk: Lacivert   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 1600, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/paul-joe-lacivert-renk-36-beden-hirka-2d-9ba.jpg?v=1735926924', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/paul-joe-lacivert-renk-36-beden-hirka-8-3123.jpg?v=1735926924', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/paul-joe-lacivert-renk-36-beden-hirka-c95-42.jpg?v=1735926924', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/paul-joe-lacivert-renk-36-beden-hirka-e2fe-0.jpg?v=1735926924', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/paul-joe-lacivert-renk-36-beden-hirka-f96596.jpg?v=1735926924', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/paul-joe-lacivert-renk-36-beden-hirka-9ce3e4.jpg?v=1735926924']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Giuseppe Zanotti', 'Giuseppe Zanotti Zımbalı Babet Siyah - 38', '', 2700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-siyah-renk-38-beden-b-a5ad1.jpg?v=1735926855']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ermanno Scervino', 'Ermanno Scervino Kareli Çocuk Kaban Siyah beyaz - 12 yaş', 'Ürün Bilgisi  Renk: Siyah Beden: 12 Yaş Tasarım: Ekose Desen Kumaş İçeriği: %20 yün %50 akrilik %20 vikos Eksper Notları: Bu model, dokusuyla ve deseniyle oldukça karakterli bir dış giyim parçası. Büyük ekose yüzeyi, siyah ve kırık beyazın kontrastıyla hem sıcak hem de modern bir görünüm yaratıyor. Yünün doğal dokusu yapıya hafif bir kabarıklık verirken, rahat kesimi gün boyu konfor sağlıyor. Kalıbının sadeliği, desenin güçlü duruşunu öne çıkarıyor; bu yüzden minimal kombinlerle bile kendi başın', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Ermanno-Kaban-On.jpg?v=1767172787', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Ermanno-Kaban-Yan.jpg?v=1767172787', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Ermanno-Kaban-Arka.jpg?v=1767172787', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sb-kaban.jpg?v=1769626393']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Dolce & Gabbana', 'Dolce & Gabbana Topuklu Deri Çizme Füme - 38', 'Ürün Bilgisi   Tasarım: Kalın Topuk  Kumaş İçeriği: Deri  Renk: Siyah  Beden: 38   Eksper Notları: Diz altına kadar yükselen bu siyah deri çizme, ince topuğuyla bacak boyunu belirgin şekilde uzatan sofistike bir siluet sunuyor.Pürüzsüz deri yapısı sade ama güçlü bir görünüm yaratırken, formu sayesinde hem eteklerle hem dar paça pantolonlarla kolayca uyum sağlıyor.Kış stiline şıklık katmak isteyenlerin gardırobunda mutlaka bulunması gereken bir parça.   Orijinallik ve Kalite Kontrolü Peony Collec', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce1.jpg?v=1766569736', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce3.jpg?v=1766569752', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce2.jpg?v=1766569752']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Chanel', 'Chanel Logolu Espadril Siyah - 36', 'Ürün Bilgisi    Renk: Siyah  Numara: 36   Editör Notları:  Bu Chanel espadril, markanın zamansız yaz koleksiyonlarının en ikonik modellerinden biridir. Doğal örgü jüt tabanı ve siyah deri üst yüzeyiyle klasik Chanel zarafetini rahat bir siluetle buluşturur. Minimal formu ve sofistike duruşu sayesinde hem günlük yaz kombinlerinde hem de tatil stilinde şıklığı zahmetsizce tamamlayan, konforu ve lüksü bir arada sunan bir modeldir.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uz', 8200, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-siyah-renk-36-beden-espadril-040-aa.jpg?v=1735926773']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Balenciaga', 'Balenciaga Speed Sneaker Siyah - 39', 'Ürün Bilgisi    Renk: Siyah  Numara: 39   Editör Notları:  Bu Balenciaga sneaker, markanın ikonik Speed Trainer modelidir. Çorap formundaki esnek örme üst yüzeyi ayağı sıkıca sararak konforlu bir kullanım sunarken, kalın ve hafif tabanı modern, sportif bir siluet yaratır. Minimal logo detayı ve sade tasarımıyla hem günlük kombinlerde hem de şehir stilinde öne çıkan, Balenciaga’nın çağdaş ve yenilikçi sneaker anlayışını yansıtan zamansız bir modeldir.   Orijinallik ve Kalite Kontrolü Peony Collec', 8500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Balenciaga-sneaker-yan.jpg?v=1767187554', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-sneaker-on.jpg?v=1767187554', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-sneaker-arka.jpg?v=1767187550']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Dialux Snow Glam Boston Çanta Siyah', 'Dialux Snow Glam Medium Boston, siyah rugan deri ve gümüş tonlu metal detaylarla tasarlanmış sofistike bir çantadır. 38 cm uzunluk, 13 cm genişlik ve 25 cm yükseklik ölçülerine sahip model, çift yuvarlak deri üst tutma sapları ve ön kısmında ikonik GG logosuyla dikkat çeker. Üst kısmındaki fermuarla açılan kırmızı ve siyah GG desenli iç kısmı, fermuarlı ve düz cepleriyle günlük eşyalarınızı düzenli bir şekilde taşımanıza olanak tanır. Alt kısmında koruyucu ayakları bulunan Gucci Boston çanta hem', 8500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-siyah-renk-standart-beden-canta-5775cf.jpg?v=1735926706', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci1_6f74eb73-5e54-4f7f-9948-2821b0087a2c.jpg?v=1768468641', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci2_3b46e17d-33be-4308-bb56-3a9d6f85ca7f.jpg?v=1778669306', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci1_90bda4ab-36f6-4739-9e04-f3a7782d5b24.jpg?v=1778669306']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gucci', 'Gucci Zincir Detaylı Topuklu Ayakkabı Siyah - 36.5', 'Ürün Bilgisi   Tasarım: Zincir Detaylı  Kumaş İçeriği: Rugan  Renk: Siyah  Beden: 36.5  Editör Notları: Siyah rugan dokusuyla şık bir görünüm sunan bu topuklu ayakkabı, ön kısmındaki metal detayla klasik stile modern bir dokunuş katıyor.İnce topuğu ve hafif platformu sayesinde hem zarif hem de dengeli bir duruş sağlıyor.Özel davetler, iş kombinleri veya tek parçada iddialı bir görünüm isteyenler için ideal.   Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından', 2599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-siyah-renk-365-beden-topuklu-aya-5b8a-2.jpg?v=1735926692']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gucci', 'Gucci Charlotte Burnu Açık Napa Ayakkabı Kahverengi - 36.5', 'Ürün Bilgisi    Renk: Kahverengi  Numara: 36.5   Editör Notları:  Bu Gucci topuklu ayakkabı, markanın klasik feminen çizgisini yansıtan platformlu peep-toe bir modeldir. Kahverengi tonlardaki delikli (perforé) deri yüzeyi hem hafiflik hem de zarif bir doku sunarken, ince topuğu ve platform tabanı dengeli ve konforlu bir duruş sağlar. Günlük şık kombinlerden davet ve akşam görünümlerine kadar geniş bir kullanım alanına sahip, zamansız ve sofistike bir Gucci topuklu ayakkabıdır.   Orijinallik ve K', 1600, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-kahverengi-renk-365-beden-topukl-08fc4e.jpg?v=1735926674']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Valentino', 'Valentino Zımbalı Loafer Siyah - 39', 'Açıklama Zımba detaylı loafer. Öne Çıkan Özellikler   Malzeme: deri.   Renk: Siyah  Beden: 39.  Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 19000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-siyah-renk-39-beden-loafer--894e.jpg?v=1735926650']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gucci', 'Gucci GG Canvas High-Top Sneaker Kahverengi - 39', 'Ürün Bilgisi    Renk: Kahverengi  Numara: 39  Materyal: Kanvas  Editör Notları:  Bu Gucci sneaker, markanın ikonik GG Supreme monogram kanvas dokusunu siyah deri detaylarla birleştiren, zamansız ve sportif bir modeldir. Orta bilekli (mid-top) formu günlük kullanımda ekstra destek sağlarken, kontrast bağcıklar ve sade taban tasarımıyla klasik Gucci estetiğini modern bir siluetle buluşturur. Hem jean hem casual pantolonlarla rahatlıkla kombinlenebilen bu model, şehir stiline lüks bir dokunuş katar', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-kahverengi-renk-39-beden-sneaker--bb1a.jpg?v=1735926641']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Balmain', 'Balmain Teknik Kumaş Sneaker Siyah - 38', 'Ürün Bilgisi   Tasarım: Çorap Formlu,Logo Yazılı  Kumaş İçeriği: Kumaş  Renk: Siyah  Beden: 38   Eksper Notları: Balmain’in sportif ve modern çizgisini taşıyan bu sneaker bot, esnek çorap formuyla ayağa tam oturan bir rahatlık sunuyor.Siyah zemin üzerindeki tekrarlayan Balmain yazıları parçayı hareketlendirirken, bilek kısmındaki belirgin logo güçlü bir görünüm katıyor. Günlük kombinlerde hem konforlu hem de dikkat çeken bir tamamlayıcı.', 13700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-siyah-renk-38-beden-sneaker-e55-ff.jpg?v=1735926617', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Balmain3.jpg?v=1769697383', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain1_fa912928-14ca-4529-b048-8ed580872264.jpg?v=1769697383', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain2_0b385564-2c85-466b-a3bb-f3c90c24d8d9.jpg?v=1769697383']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Prada', 'Prada Nylon Saffiano Sneaker Siyah - 39', '', 3800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-siyah-renk-39-beden-sneaker-d3a7b0.jpg?v=1735926607']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Alexander Mcqueen', 'Alexander McQueen Sneaker Beyaz - 38', 'Açıklama Alexander McQueen sneaker, her kombine kolaylıkla uyum sağlar. Öne Çıkan Özellikler:   Malzeme: Deri.   Renk:   Beyaz   Beden:  38.  Kullanım izi ve yıpranmalar mevcuttur.    Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/amq3_aebf9505-a404-400f-b939-a77e15ada88e.jpg?v=1781533479', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/amq-1.jpg?v=1781533478', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/amq-2.jpg?v=1781533478', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/amq-4.jpg?v=1781533478']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Chanel', 'Chanel Deri Bootie Siyah - 37', 'Ürün Bilgisi    Renk: Siyah - Lacivert  Beden: 37  Kumaş İçeriği: Deri  Editör Notları:  Bu Chanel bot, markanın ikonik cap-toe detaylı ankle boot yorumlarından biridir. Yumuşak siyah deri gövdesi, önde yer alan zarif fiyonk ve metal CC logo detayıyla klasik Chanel feminenliğini modern bir siluetle buluşturur. İnce topuklu yapısı bacağı daha uzun gösterirken, arkadaki gizli fermuar pratik kullanım sağlar. Hem elbiselerle hem de slim jean’lerle rahatça kombinlenebilen, zamansız ve sofistike bir C', 10299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-siyah-lacivert-renk-37-beden-bo-21c-7c.jpg?v=1735926585', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-bot1.jpg?v=1769693699', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-bot2.jpg?v=1769693699']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Casadei', 'Casadei Rugan Stiletto Siyah - 37', 'Ürün Bilgisi    Renk: Siyah  Beden: 37   Editör Notları:  Bu Casadei topuklu ayakkabı, markanın ikonik Blade estetiğini yansıtan sivri burunlu, ultra ince stiletto topuklu bir modeldir. Siyah rugan deri yüzeyi güçlü ve iddialı bir parlaklık sunarken, keskin hatları ayağı zarifçe vurgular. Casadei’nin feminen ama cesur tasarım anlayışını yansıtan bu model; gece davetleri, özel organizasyonlar ve şık akşam kombinleri için zamansız ve yüksek stil etkisi yaratan bir parçadır.   Orijinallik ve Kalite', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/casadei-siyah-renk-375-beden-topuklu-a-3a8fab.jpg?v=1735926563', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/casadei1.jpg?v=1766652043', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/casadei2.jpg?v=1766652043']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Louboutin', 'Christian Louboutin Egzotik Stiletto Kahverengi - 37', 'Ürün Bilgisi    Renk: Kahverengi  Beden: 37    Topuk Yüksekliği: 10 cm  Editör Notları:  Bu Christian Louboutin topuklu ayakkabı, markanın ikonik Pigalle / So Kate çizgisini yansıtan sivri burunlu, ince stiletto bir modeldir. Doğal tonlarda python (yılan) derisi dokusu güçlü ve sofistike bir karakter sunarken, Louboutin’e özgü kırmızı taban tasarımı tamamlar. Zamansız ama iddialı duruşuyla özel davetler, akşam kombinleri ve güçlü ofis stilleri için lüks ve dikkat çekici bir seçenektir.   Orijina', 8500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-louboutin-bej-kahverengi-ren-15e-4e.jpg?v=1735926552']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Dolce & Gabbana', 'Dolce & Gabbana Puantiyeli İpek Jorjet Topuklu Ayakkabı Siyah beyaz - 37', 'Ürün Bilgisi    Renk: Siyah  Beden: 37   Editör Notları:  Bu Dolce &amp; Gabbana topuklu ayakkabı, markanın feminen ve retro ruhunu yansıtan ipek jorjet kumaştan üretilmiş zarif bir stiletto modelidir. Sivri burun formu ve ön kısımdaki fiyonk detayı, tasarıma romantik ve couture bir hava katarken ince topuğu silueti daha zarif gösterir. Siyah-beyaz puantiye deseni sayesinde hem klasik hem de iddialı kombinlere kolayca uyum sağlayan bu model, özel davetler ve şık akşam görünümleri için ikonik bir', 6550, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce-gabbana-siyah-beyaz-renk-37-bede-fdcd35.jpg?v=1735926538']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Valentino', 'Valentino Roman Stud Topuklu Ayakkabı Siyah - 35', 'Ürün Bilgisi    Renk: Siyah  Beden: 35  Editör Notları:  Bu Valentino Garavani topuklu ayakkabı, markanın ikonik Rockstud detaylarıyla öne çıkan zarif bir slingback stiletto modelidir. Sivri burun formu, ince topuğu ve ayak bileğini saran ayarlanabilir tokalı bantları feminen silueti güçlendirirken, mat siyah deri üzerine yerleştirilen piramidal metal studlar tasarıma karakteristik Valentino imzasını kazandırır. Hem şık davetlerde hem de modern gece kombinlerinde güçlü, sofistike ve zamansız bir', 17000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-siyah-renk-35-beden-topuklu--f7759.jpg?v=1735926521']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gianvito Rossi', 'Gianvito Rossi Denim Bootie Lacivert - 37', 'Ürün Bilgisi  Renk: Lacivert Beden: 37 Tasarım: V Kesim Kumaş İçeriği: Denim Eksper Notları:Denimin sıradışı kullanımı bu modele casual ve şık arasında özel bir denge katıyor. Derin V kesimi ayak bileğini zarifçe ortaya çıkarırken, ince topuğu silueti belirgin şekilde uzatıyor. Hem jean görünümlerine uyum sağlayan hem de elbiseleri modernleştiren karakterli bir parça. Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır. Kondisyon Durumu 10/10  Orijinallik ve Kalite KontrolüPeony Collective', 5799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-denim-renk-375-beden-to-4e84ea.jpg?v=1735926512', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-bootie-on.jpg?v=1767186177', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-bootie-arka.jpg?v=1767186177']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Chanel', 'Chanel Kristal Topuklu Deri Bootie Siyah - 37', 'Açıklama Chanel 2012 Sonbahar/Kış koleksiyonundan CC logolu, tüvit detaylı deri, bilekte biten bot. Öne Çıkan Özellikler   Malzeme: deri.   Renk: Siyah.  Beden: 37.  Orijinallik ve Kalite Kontrolü  Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-siyah-renk-375-beden-topuklu-ay-75ee04.jpg?v=1735926480']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Jacquemus', 'Jacquemus Les Chaussures Valerie Topuklu Ayakkabı Yeşil - 39', 'Ürün Bilgisi    Renk: Yeşil  Beden: 39   Editör Notları:  Jacquemus Les Chaussures Valerie, markanın ikonik heykelsi tasarım dilini yansıtan modern bir slingback topuklu ayakkabı modelidir. Yumuşak deri üst yüzeyi, kare burun formu ve Jacquemus’a özgü geometrik–küresel topuk detayıyla öne çıkar. Minimal ama sanatsal çizgileri sayesinde hem çağdaş hem de sofistike bir görünüm sunan bu model, stil odaklı davetler ve modern şehir kombinleri için güçlü ve karakterli bir parça olarak öne çıkar.   Ori', 10400, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/jacquemus-yesil-renk-39-beden-topuklu--6c6-4a.jpg?v=1735926469']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Stuart Weitzman', 'Stuart Weitzman Diz Üstü Süet Çizme Vizon - 37', 'Açıklama Stuart Weitzman Highland Mojave Süet Diz Üstü Çizme, zarif tasarımı ve üstün malzeme kalitesiyle dikkat çeker. Süet ve Lycra spandeks üst yüzeyi, deri astarı ve kauçuk tabanıyla hem şıklık hem de konfor sunar. İspanya''da üretilen model, yüksek topukları ve diz üstüne uzanan tasarımıyla modern bir stilin tamamlayıcısıdır.     Öne Çıkan Özellikler    Süet ve Lycra spandeks üst yüzey, deri astar, kauçuk taban.  Diz üstü  Açık kahverengi  Topuk Yüksekliği 10 cm      Orijinallik ve Kalite Ko', 9500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stuart-weitzman-vizon-renk-37-beden-ci--8061a.jpg?v=1735926460', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cizme1.jpg?v=1769693462', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/cizme2.jpg?v=1769693462']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Givenchy', 'Givenchy Eva Chain Wellington Bot Lacivert - 37', 'Ürün Bilgisi    Renk: Lacivert  Beden: 37   Editör Notları:  Bu Givenchy diz altı bot, markanın modern binici (riding boot) stilinden ilham alan zincir detaylı knee-high modeli olarak öne çıkıyor. Mat lacivert deri gövdesi, bilek kısmındaki chunky metal zincir aksesuarıyla güçlü ve sofistike bir karakter kazanıyor. Düz tabanı sayesinde gün boyu konfor sunarken, minimal siluetiyle hem tayt ve skinny jean’lerle hem de elbiselerle rahatça kombinlenebilen, şehir şıklığını tamamlayan zamansız bir Giv', 12000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/givenchy3.jpg?v=1766565960', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/givenchy2.jpg?v=1766565960', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/givenchy-1.jpg?v=1766565960']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Miu Miu', 'Miu Miu Kristal Topuklu Saten Platform Sandalet Siyah - 37', 'Ürün Bilgisi  Siyah  37 Numara Platform yüksekliği : 3 cm  topuk yüksekliği :12 cm', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/miu-miu-kristal-topuklu-saten-platform-fe4d-4.png?v=1735926428']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Red Valentino', 'Red Valentino Retro Desenli Mini Elbise Yeşil - 38', 'Ürün Bilgisi   Beden: 38  Renk: Sarı,Kırmızı,beyaz,siyah  Editör Notları: Bu elbise güçlü grafik deseni ve düz, kolsuz kesimiyle modern ve iddialı bir siluet sunuyor. Desenin ortadaki dikey yerleşimi vücudu daha uzun ve dengeli gösterirken, A-form hafif açılan eteği bel ve basen hattını yumuşak şekilde kamufle ediyor. Mini boyu bacakları daha uzun gösterir, tok kumaşı sayesinde formunu korur ve şık durur. Gün davetlerinde, yaz akşamı etkinliklerinde ya da şehirde stil sahibi bir görünüm için ter', 2199, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/red-valentino-yesil-renk-38-beden-elbi-3b75e1.jpg?v=1735926022']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ted Baker', 'Ted Baker Floral Midi Şifon Elbise Siyah - 40', 'Ürün Bilgisi    Malzeme: Şifon.  Renk: Siyah.  Beden: 40  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ted-baker-floral-midi-sifon-elbise-40-a-85a2.jpg?v=1735925986']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alexander Mcqueen', 'Alexander McQueen Iris Eye Mini Çanta Lacivert', 'Alexander McQueen Iris Eye Printed Mini Jewelled Satchel Bag, markanın ikonik tarzını yansıtan mücevher detayları ve imza niteliğindeki kafatası süslemeleriyle dikkat çekiyor. Mavi tonlarında "iris göz" baskısına sahip mini çanta, zincir omuz askısı ile omuzda zarif bir şekilde taşınabilir. Manyetik kapanış sistemi sayesinde kolayca açılıp kapanır ve iç kısmında kart bölmesi yer alır. Yüksek kaliteli deri materyalden İtalya''da üretilmiştir. Kompakt boyutları (yaklaşık 17.8 cm genişlik, 7.6 cm yü', 30000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alexander-mcqueen-lacivert-renk-standa-8942de.jpg?v=1735925845', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/amq1_12db027b-9cf6-457d-9460-645e6dc1e3ea.jpg?v=1778510812']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Stella Mccartney', 'Stella McCartney Denim Elbise Somon - 14 yaş', 'Öne Çıkan Özellikler:   Malzeme: Koton .   Renk: Somon.   Beden: 14Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 650, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-mccartney-somon-renk-14-yas-bed-b6b068.jpg?v=1735925837']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Stella Mccartney', 'Stella McCartney Kapüşonlu Sweatshirt Gri - 14 yaş', 'Öne Çıkan Özellikler:   Tasarım: Yazı ve bilekte şerit detaylı.   Malzeme: Koton .   Renk: Gri.   Beden: 14Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-mccartney-gri-renk-14-yas-beden-f-a135.jpg?v=1735925822']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Little Eleven', 'Little Eleven Mickey Mouse Hırka Siyah - 16-17y', '', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/little-eleven-siyah-renk-16-yas-beden--4-fea8.jpg?v=1735925812']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Il Gufo', 'Il Gufo Elbise Turuncu - 14 yaş', 'Öne Çıkan Özellikler:   Tasarım: Etekleri volanlı.   Malzeme: Viskos .   Renk: Turuncu.   Beden: 14Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/il-gufo-turuncu-renk-14-yas-beden-elbi-02f-fd.jpg?v=1735925800']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Polo Yaka Elbise Sarı - 16 y', 'Öne Çıkan Özellikler:   Malzeme: Koton .   Renk: Sarı.   Beden: 16Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph-lauren-sari-renk-16-yas-beden-el-29-4fc.jpg?v=1735925792']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Çocuk Elbise Lila - 16 y', 'Öne Çıkan Özellikler:   Malzeme: Koton .   Renk: Lila.   Beden: 16Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph-lauren-lila-renk-16-yas-beden-el-c6f-93.jpg?v=1735925783']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Polo Yaka Çocuk Elbise Pembe - 16 y', 'Öne Çıkan Özellikler:   Malzeme: Koton .   Renk: Pembe.   Beden: 16Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph-lauren-pembe-renk-16-yas-beden-e-ac-888.jpg?v=1735925774']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Giuseppe Zanotti', 'Giuseppe Zanotti Çengelli İğne Detaylı Deri ve Süet Sandalet Siyah - 37', 'Ürün Bilgisi    Renk: Siyah - Mavi  Numara: 37   Editör Notları:  Bu Giuseppe Zanotti topuklu ayakkabı, markanın iddialı ve feminen çizgisini yansıtan bilekten bantlı stiletto sandalet modelidir. İnce ve yüksek topuğu, bilekten ayarlanabilir kayışı ve ön banttaki fiyonk detayıyla zarif ama güçlü bir siluet sunar. Canlı mavi ve siyah renk kontrastı ayakkabıyı gece davetleri, özel etkinlikler ve şık akşam kombinleri için dikkat çekici bir parça haline getirir.   Orijinallik ve Kalite Kontrolü Peon', 4350, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-siyah-mavi-renk-37-be--e8f58.jpg?v=1735925765']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Giuseppe Zanotti', 'Giuseppe Zanotti Frankie Sneaker Siyah - 43', '', 9850, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-siyah-renk-43-beden-s-4cf8fb.jpg?v=1735925742']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Polo Yaka Bluz Siyah - S', 'Ürün Bilgisi    Renk: Siyah  Beden: S   Editör Notları:  Bu Burberry polo yaka üst, markanın zamansız ve rafine stilini yansıtan klasik polo modelidir. Dokulu pamuklu kumaşı sayesinde hem konforlu hem de şık bir duruş sunarken, göğüs kısmındaki ikonik Burberry amblemi tasarıma karakteristik bir imza ekler. Uzun kollu yapısı ve sade siyah rengiyle günlük şıklıkta, ofis stilinde ya da smart-casual kombinlerde rahatlıkla kullanılabilecek zamansız bir parçadır.   Orijinallik ve Kalite Kontrolü Peony', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-siyah-renk-s-beden-sweatshirt-8a17-3.jpg?v=1735925725']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Fendi', 'Fendi Fendista Rugan ve Deri Topuklu Ayakkabı Krem - 38', 'Ürün Bilgisi    Renk: Krem  Beden: 38   Editör Notları:  Bu Fendi “Fendista” topuklu ayakkabı, markanın güçlü logo dili ve feminen siluetini bir araya getiren ikonik platform modellerinden biridir. Açık krem tonlu üst yüzeyi, kontrast yaratan mercan-turuncu platform ve topuk detayıyla dinamik bir görünüm sunarken, önde yer alan FF logo plakası tasarıma imza niteliği kazandırır. Açık burunlu (peep-toe) formu ve yüksek platformu sayesinde hem iddialı hem de dengeli bir duruş sağlar. Özel davetler,', 3999, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-ayakkabi-on.jpg?v=1767191771', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-ayakkabi-yan.jpg?v=1767191770', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-ayakkabi-arka.jpg?v=1767191770', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-ayakkabi-detay.jpg?v=1767191771']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Missoni', 'Missoni Desenli Stiletto Lacivert - 37', 'Ürün Bilgisi  Renk: Siyah Beden: 37 Kumaş İçeriği: Deri Editör Notları: Bu model, klasik stiletto formunu modern ve iddialı bir dokunuşla yorumlayan güçlü bir tasarıma sahip. Sivri burunlu siyah deri gövdesi zamansız bir şıklık sunarken, topuk kısmında kullanılan desenli ve dokulu yüzey ayakkabıyı sıradanlıktan çıkararak sofistike bir karakter kazandırıyor. Dengeli topuk yüksekliği sayesinde zarif bir siluet yaratırken, aynı zamanda feminen ve güçlü bir duruş sağlıyor. Günlük şıklıkta basic komb', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni-desenli-stiletto-37-904ca2.png?v=1735925689']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Missoni', 'Missoni XM005 Burnu Açık Platform Ayakkabı Sarı - 37', '', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Missoni-ayakkabi-on.jpg?v=1767188129', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni-ayakkabi-yan.jpg?v=1767188129', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni-ayakkabi-arka.jpg?v=1767188129']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Antonio Berardi', 'Antonio Berardi Korse Formlu Elbise Siyah - 34', 'Ürün Bilgisi  Beden: 34  Renk: Siyah  Editör Notları: Bu elbise vücuda oturan, korsaj etkili kesimi sayesinde beli ince, silueti net ve dengeli gösterir. Dikiş hatları ve yapılandırılmış formu kum saati etkisi yaratırken, diz altına inen boyu bacakları daha uzun ve proporsiyonlu gösterir. V yaka detayı üst bedeni zarifçe açar, omuz ve bel hattını dengeler. Minimal ama güçlü duruşuyla davetlerde, akşam yemeklerinde veya şık iş organizasyonlarında oldukça sofistike ve iddialı bir görünüm sunar; ab', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/antonio-berardi-siyah-renk-34-beden-el-82e9-c.jpg?v=1735925663']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Dsquared2', 'Dsquared Degaje Yaka Elbise Yeşil - M Beden', 'Ürün Bilgisi   Beden: Medium  Renk: Yeşil  Editör Notları: Bu elbise, dökümlü kayık yakası ve vücudu saran kalıbıyla oldukça zarif ve feminen bir duruş sunar. Bel ve kalça hattını yumuşak şekilde sararak silueti ince ve uzun gösterir, düz ve akıcı formu sayesinde boyu daha uzun algılatır. Uzun kolları dengeleyici bir etki yaratırken yeşilin sofistike tonu elbiseye güçlü ama sade bir şıklık katar. Davetlerde, akşam yemeklerinde veya özel organizasyonlarda abartısız ama etkileyici bir görünüm sağl', 3250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dsquared-degaje-yaka-elbise-m-362-40.png?v=1735925654']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Johanna Ortiz', 'Johanna Ortiz Fırfırlı Midi Etek Krem - 36', 'Ürün Bilgisi   Renk: Krem  Beden: 36   Kumaş İçeriği : Pamuk   Ölçü: Boy:87 cm Bel:36 cm  Eksper Notları :Akışkan yapılı kumaşı sayesinde vücutta sert durmaz; yürüdükçe hafifçe dalgalanan volan ve fırfır detayları eteğe romantik bir hava katar. Asimetrik yerleşimli katlar, sade rengiyle dengelenerek abartıdan uzak ama etkileyici bir görünüm sunar. Yüksek bel formu beli toparlar, boyu ise şık ve dengeli bir duruş sağlar.   Ekspert puanı:  Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım em', 1700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/johanna-ortiz-firfirli-midi-etek-36-e-400c.png?v=1735925640']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Aquilano Rimondi', 'Aquilano Rimondi Blok Renkli Mini Elbise Siyah beyaz - 36', '', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquilano-rimondi-blok-renkli-mini-elbi-ac9d5d.jpg?v=1735925633', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquilano-rimondi-blok-renkli-mini-elbi-1e6dc2.jpg?v=1735925633', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquilano-rimondi-siyah-lacivert-krem-r-c73a-4.jpg?v=1735925633', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquilano-rimondi-blok-renkli-mini-elbi-e5e-a3.jpg?v=1735925633']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Yves Saint Laurent', 'Yves Saint Laurent ( YSL ) Sade Puffer Kapitone Deri Clutch Lame - Standart', 'Ürün Bilgisi  Saint Laurent Sade Puffer Large Envelope clutch çanta, gümüş metalik kaplamalı kuzu derisinden üretilmiş olup, sofistike bir şıklık sunar. Kare dikiş detaylı elmas desenli kapitone yüzeyi, zarif ve modern bir görünüm sağlarken, arkasında yer alan ikonik YSL logosu markanın klasik imzasını taşır. 36 cm genişlik, 18 cm yükseklik ve 8 cm derinlik ölçülerine sahip clutch, iç kısmında bir fermuarlı cep bulundurur. Önde manyetik kapaklı kapanış ile eşyalarınıza kolay erişim imkanı sunar.', 25000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yves-saint-laurent-lame-renk-standart--7-8623.jpg?v=1735925622']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Giuseppe Zanotti', 'Giuseppe Zanotti Süet Sandalet Siyah - 37', '', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-siyah-renk-37-beden-s-aac8e1.jpg?v=1735925618']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ferre', 'Ferre Kemerli Uzun Hırka Mavi - Xs', 'Ürün Bilgisi   Beden:34  Renk:Mavi/Beyaz  Tasarım:Kuşaklı ,Desenli,Cepli  Kumaş İçeriği:100%Pamuk  Eksper Notları:Pastel mavi ve beyaz tonlarında, örgü dokusuyla yumuşak bir görünüm veren bu bel bantlı cardigan; zarif deseni ve ince kontrast şeritleriyle modern bir duruş sunuyor. Belden bağlamalı formu silueti toplu gösterirken, altın düğme detaylı cepleri tasarıma sofistike bir dokunuş katıyor. Hem günlük kullanımda hem de rahat ama özenli bir görünüm istediğin her ortamda ideal bir tamamlayıcı', 2350, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferre-mavi-renk-xs-beden-hirka-6-b639.jpg?v=1735925600']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Altuzarra', 'Altuzarra Dantel Etekli Kazak Siyah - M', 'Öne Çıkan Özellikler   Kıyafet İçeriği: Koton.  Renk: Siyah.  Beden: Medium   Eksper Puanı: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır. 10/10    Editör Notları:  Siyah ince dokulu triko üzerine tasarlanan bu model, Altuzarra’nın modern zarafet anlayışını yansıtan özel bir parçadır. Minimal üst formunu, etek ucunda yer alan beyaz dantel görünümlü katman tamamlar. Bu detay, ürüne hem romantik hem de sofistike bir görünüm kazandırırken, katmanl', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/altuzarra-siyah-renk-m-beden-kazak-089bb6.jpg?v=1735925587']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Burberry', 'Burberry Çocuk Mont Bordo - 12 yaş', 'Öne Çıkan Özellikler:   Tasarım: Fermuarlı, fitilli kol detaylı.   Malzeme: Polyester.   Renk: Bordo.   Beden: 12Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 8500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-bordo-renk-12-yas-beden-ceket-4438-8.jpg?v=1735925563']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Barbara Bui', 'Barbara Bui Astarlı Ceket Siyah - 36', 'Ürün Bilgisi   Tasarım: İç astar,Ön Kapama  Kumaş İçeriği: Coton  Renk: Siyah  Beden: 36  Eksper Notları: Siyah düz kesimiyle modern bir çizgi sunan bu Barbara Bui blazer, içerisindeki turkuaz astarla beklenmedik bir canlılık katıyor.Omuz yapısı net, kalıbı derli toplu; bu yüzden hem jean’le günlük bir stile, hem de ofis kombinlerine kolayca uyum sağlıyor.Temiz hatlarıyla dolapta her zaman elinizin gideceği joker bir ceket.   Eksper Puanları: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullan', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/barbara-bui-siyah-renk-36-beden-ceket-166-42.jpg?v=1735925533']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Brian Atwood', 'Brian Atwood Blok Renkli Bağcıklı Süet Sandalet Bordo - 37', 'Victoria''s Secret 2015 defilesinde tasarımlara eşlik eden Brian Atwood koleksiyonundan. Süet, burnu açık, çapraz uzun bağcıklı bot sandalet.', 2700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/brian-atwood-blok-renkli-bagcikli-suet-1a-b89.jpg?v=1735925527']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Sergio Rossi', 'Sergio Rossi Gold ve Platform Sandalet Vizon - 36.5', '', 4350, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-gold-ve-vizon-platform-sa--0e33d.jpg?v=1735925521']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Alice And Olivia', 'Alice + Olivia İşlemeli Elbise Ekru - 36', 'Ürün Bilgileri  Renk:Krem Beden: 36 Editör Notları: Bu elbise sade ve zarif kesimiyle zamansız bir şıklık sunuyor. Düz, hafif A form silueti vücuda yapışmadan akıcı durur; bu da hem rahat hem de ince bir görünüm sağlar. Kolsuz yapısı ve yuvarlak yaka kesimi omuzları yumuşak şekilde vurgularken, etek ucundaki boncuk ve işlemeli detaylar elbiseye feminen ve sofistike bir hareket katar. Günlük şıklıkla özel davetler arasında kolayca uyarlanabilen, minimal ama etkisi yüksek bir parça.  Orijinallik v', 3250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alice-olivia-islemeli-elbise-36-62-40d.jpg?v=1735925500']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Mantero 1902', 'Mantero Eşarp Bordo - 90x90', 'Açıklama Bordo, desenli Mantero eşarp, her kombininize uyum sağlar.  Öne Çıkan Özellikler   Tasarım: Desenli.  Malzeme: %100 İpek.  Renk: Bordo.  Beden: 90x90    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 2700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/mantero-bordo-renk-90x90-beden-esarp-dc-844.jpg?v=1735925471']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Longchamp', 'Longchamp Eşarp Lacivert - 90x90', 'Açıklama Lacivert, desenli Longchamp eşarp, her kombininize uyum sağlar.  Öne Çıkan Özellikler   Tasarım: Desenli.  Malzeme: %100 İpek.  Renk: Lacivert.  Beden: 90x90    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 3800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/longchamp-lacivert-renk-90x90-beden-es-70-484.jpg?v=1735925442']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Tod''S', 'Tod''s Deri Sneaker Haki - 42.5', 'Ürün Bilgisi    Renk: Haki  Numara: 42.5  Editör Notları:  Bu Tod’s sneaker, markanın spor-şık DNA’sını yansıtan modern low-top bir modeldir. Süet ve deri karışımı üst yüzeyi, perforasyon detaylarıyla nefes alabilirlik sunarken; kontrast turuncu ve yeşil tonları ayakkabıya dinamik bir görünüm kazandırır. Hafif tabanı ve ergonomik yapısı sayesinde gün boyu konfor sağlayan bu Tod’s sneaker, günlük şehir stilinden hafta sonu kombinlerine kadar rahatlıkla kullanılabilecek sofistike bir seçenektir.', 9300, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tods-haki-turuncu-renk-425-beden-sneak-f7f2-8.jpg?v=1735925405']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Sergio Rossi', 'Sergio Rossi Platform Sandalet Bej - 38', 'Öne Çıkan Özellikler:   Tasarım: Platform, ucu açık.   Renk:  Bej.   Beden: 38.     Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-krem-1.jpg?v=1781617308', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-krem-2.jpg?v=1781617308', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-krem-3.jpg?v=1781617308', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-krem-4.jpg?v=1781617307']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Deri Platform Ayakkabı Siyah - 38', 'Ürün Bilgisi    Renk: Siyah  Beden: 38   Editör Notları:  Bu Sergio Rossi topuklu ayakkabı, markanın zamansız ve sofistike çizgisini yansıtan platformlu stiletto pump modelidir. Pürüzsüz siyah deri yüzeyi, yuvarlatılmış burun formu ve yüksek ince topuğuyla bacağı daha uzun ve zarif gösteren güçlü bir siluet sunar. Klasik ama iddialı duruşu sayesinde özel davetler, akşam yemekleri ve şık gece kombinleri için vazgeçilmez bir parça olarak öne çıkar.   Orijinallik ve Kalite Kontrolü Peony Collective', 2250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-siyah-3.jpg?v=1781617600', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-siyah-1.jpg?v=1781617599', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-siyah--4.jpg?v=1781617599', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-siyah-2.jpg?v=1781617599']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Victoria Beckham', 'Victoria Beckham Kemerli Uzun Yelek Siyah - 38', 'Ürün Bilgisi    Renk: Siyah  Beden: İtalyan 44   Ürün Ölçüsü: Boy 127 cm  Kumaş İçeriği: Dış %100 kaşmir , İç %35 pamuk   Editör Notları:  Bu Victoria Beckham yelek, markanın imza minimal çizgisini yansıtan kemerli uzun tailored vest (uzun yelek) modelidir. Yapılandırılmış omuzları, derin V yakası ve bele oturan kemer detayıyla güçlü ve modern bir siluet oluşturur. Ön kısmındaki kontrast renkli şerit tasarımı parçaya sofistike bir hareket katarken; ister tek başına elbise gibi, ister gömlek veya', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/victoria.jpg?v=1769625277', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/victoria-beckham-siyah-renk-38-beden-y-f-4f08.jpg?v=1769625277', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_1909.jpg?v=1769623195']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Dries Van Noten', 'Dries Van Noten Payet İşlemeli Sweatshirt Siyah - S', 'Ürün Bilgisi   Beden:36  Renk:Siyah  Kumaş İçeriği:100%pamuk  Tasarım:Taş işlemeli  Eksper Notları:Siyahın sade gücünü, omuzdaki parlak payet işlemeli çiçek detayıyla daha seçkin bir noktaya taşıyan bu sweatshirt; temiz kesimi ve yumuşak dokusuyla günlük stile zarif bir dokunuş ekliyor. Hem jean’lerle hem de daha şehirli parçalarla kolayca eşleşen, basic görünümü ince bir ışıkla yükselten bir model.  Eksper Puanı:Ürünün tüm incelemesi tarafımızca yapılmıştır. Kondisyon durumu 10/10   Orijinallik', 2850, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dries-van-noten-siyah-renk-s-beden-swe--fa4f.jpg?v=1735925298']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', '3.1 Phillip Lim', 'Phillip Lim Güneş Gözlüğü Siyah - Standart', '', 2700, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/3-10-9ea2-0c.jpg?v=1735925274']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Off White', 'Off-White Arrows Hiking Sneaker Bot Siyah - 39', 'Ürün Bilgisi  Renk: Siyah Beden: 39 Tasarım: Metal Detay Eksper Notları: Kalın dişli tabanı güçlü bir zemin tutuşu sağlarken, bilekteki neopren yapı ve metal bağcık halkaları modele teknik bir hava katıyor. Yan bölümlerdeki gri paneller ve kırmızı vurgular tasarımı dinamikleştiriyor. Hem fonksiyonel hem şehir stiline uyarlanabilir yapısıyla karakterli ve iddialı bir model. Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır. Kondisyon Durumu 10/10    Orijinallik ve Kalite KontrolüPeony Col', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/off-white-siyah-renk-39-beden-bot-a48d-4.jpg?v=1735925244']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Loafer Siyah - 42', '', 11500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louis-vuitton-siyah-renk-42-beden-loaf-ea-2f8.jpg?v=1735925214']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gucci', 'Gucci GG Sneaker Lacivert - 45', '', 7100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-lacivert-renk-45-beden-sneaker-0583-4.jpg?v=1735925201']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Borgo De Nor', 'Borgo de Nor Floral Elbise Mavi - 36', 'Ürün Bilgisi    Renk: Mavi  Beden: 36  Editör Notları: Borgo de Nor’un maksimalist ve neşeli tasarım dilini temsil eden bu elbise, turkuaz zemin üzerindeki beyaz çiçek desenleriyle adeta yazın enerjisini yansıtıyor. Tek omuz kesimi ve omuz kısmındaki feminen fiyonk detayı, tasarıma modern bir asimetri kazandırırken; kat kat (tiered) dökümlü yapısı elbiseye hareketli ve romantik bir silüet veriyor. Hafif ve kaliteli kumaş seçimi sayesinde hem şık hem de konforlu bir kullanım sunan bu model, marka', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/borgo-floral-ipek-elbise-on.jpg?v=1753363864']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Prada', 'Prada Güneş Gözlüğü Siyah - Standart', 'Ürün Bilgisi    Renk: Siyah    Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-siyah-renk-standart-beden-gozluk-8c-be0.jpg?v=1735925155']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Helmut Lang', 'Helmut Lang Deri Kalem Etek Siyah - 36', 'Ürün Bilgisi    Renk: Siyah  Beden: 36  Kumaş İçeriği: Deri  Editör Notları:  Bu Helmut Lang etek, markanın minimalist ve modern estetiğini yansıtan yüksek bel, kalem (pencil) etek formundadır. Siyah deri görünümlü yüzeyi, temiz kesimleri ve vücuda oturan siluetiyle güçlü ve sofistike bir duruş sunar. Diz altı boyu sayesinde hem ofis şıklığında hem de akşam kombinlerinde rahatlıkla kullanılabilen, zamansız ve iddialı bir Helmut Lang tasarımıdır.   Orijinallik ve Kalite Kontrolü Peony Collective’', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/helmut-lang-siyah-renk-36-beden-etek--b1c2_004f969c-d05f-44b8-9a51-4ba9e57703b8.jpg?v=1765286749']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi Desenli İpek Eşarp - 90x90', 'Açıklama Kırmızı, desenli FENDİ eşarp, her kombininize uyum sağlar.  Öne Çıkan Özellikler   Tasarım: Desenli.  Malzeme: %100 İpek.  Renk: Kırmızı - krem.  Beden: 90x90    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/AF105EB1-C0CE-4851-9682-0A196046181F.jpg?v=1753950133']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Missoni', 'Missoni Çok Renkli Kemer - 75', 'Açıklama Missoni kemer her kombine uyarak zamansız bir şıklık ve farklı bir hava sağlar.  Öne Çıkan   Tasarım: Çok renkli, desenli.   Renk: Renkli.   Beden: 75.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni-cok-renkli-kemer-75-2e70d9.jpg?v=1735925119']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi Hasır Bantlı Terlik Siyah - 37', 'Açıklama Fendi hasır bantlı terlik, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Logo detaylı.   Malzeme: Hasır- deri.   Renk: Siyah.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 13000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-siyah-renk-375-beden-terlik-1f2eeb.jpg?v=1735925036', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-siyah-renk-375-beden-terlik-43b7-9.jpg?v=1735925036', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-siyah-renk-375-beden-terlik-919b-6.jpg?v=1735925036']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Malone Souliers', 'Malone Souliers Kareli Kanvas Terlik - 38', 'Açıklama Malone Souliers kareli kanvas terlik , yaz aylarında zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Bant ve kareli burun detayı.   Malzeme: Kanvas .   Renk: Siyah-Beyaz.   Beden: 38.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/malone-souliers-siyah-beyaz-renk-38-be-5bec0a.jpg?v=1735924974']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Alaia', 'Alaïa Deri Lazer Kesim Terlik Lame - 37', 'Açıklama Alaia terlik, yaz aylarında zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Lazer kesim.   Malzeme: Deri .   Renk: Lame.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 4900, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alaia-silver-renk-37-beden-terlik--b8af.jpg?v=1735924958']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Chanel', 'Chanel Sandalet Kırmızı - 38', 'Açıklama Chanel sandalet, yaz aylarında zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım:İp ve logo detayı.   Renk: Kırmızı.   Beden: 38.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 18100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/chanel-kirmizi-renk-38-beden-sandalet-3c7392.jpg?v=1735924927']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Aquazzura', 'Aquazzura Hardal Rengi Sivri Burun Terlik - 37.5', 'Açıklama Aquazzura terlik, yaz aylarında zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Sivri burun, işleme detaylı.   Malzeme: Koton .   Renk: Hardal.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquazzura-yag-yesili-renk-375-beden-te-f6-a28.jpg?v=1735924901']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Aquazzura', 'Aquazzura Ponponlu Sivri Burun Terlik Mor - 37', 'Açıklama Aquazzura terlik, yaz aylarında zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Ponpon detayı.   Renk: Mor.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquazzura-mor-renk-37-beden-terlik-4d44-9.jpg?v=1735924882']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Dolce & Gabbana', 'Dolce & Gabbana Kate Topuğu Zımbalı Stiletto Füme - 37', 'Ürün Bilgisi  Renk: Füme Beden: 37 Kumaş İçeriği: Deri Editör Notları: Zarif silueti ve feminen duruşuyla öne çıkan bu topuklu ayakkabılar, güçlü ama sofistike bir stilin en net tamamlayıcısı. İnce topuk formu ve dengeli kalıbı sayesinde ayağı estetik biçimde sararken, seçkin dokuları ve modern detaylarıyla her adımda kendini fark ettiriyor. Gündüzden geceye kolayca uyum sağlayan bu tasarımlar, ister özel davetlerde ister şık şehir kombinlerinde iddialı ama abartısız bir şıklık sunuyor; dolabın', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/5858---1.jpg?v=1780918233', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/5858---2.jpg?v=1780918232', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/5858---3.jpg?v=1780918233', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/5858---4.jpg?v=1780918232']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Louboutin', 'Christian Louboutin Rugan, Deri ve PVC Stiletto - 38', 'Ürün Bilgisi  Renk: Yağ Yeşili Beden: 38 Kumaş İçeriği: Rugan Editör Notları: Bu stiletto, zarif sivri burun formu ve ince topuğuyla ayağı uzun ve feminen gösteren klasik ama iddialı bir siluete sahip. Parlak rugan yüzeyi modern bir şıklık sunarken, iç kenardaki kontrast detaylar modele sofistike bir karakter katıyor. Dengeli topuk yüksekliği sayesinde duruşu güçlü, görünümü ise net ve temiz; hem özel davetlerde hem de şık şehir kombinlerinde zahmetsizce öne çıkan zamansız bir parça.  Orijinalli', 2250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-louboutin-rugan-deri-ve-pvc--9abc-4.png?v=1735924854']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Giannico', 'Giannico Kristal Detaylı Topuklu Terlik Yeşil - 37', 'Açıklama Giannico terlik, yaz aylarında zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Kristal detaylı.   Malzeme: Kadife .   Renk: Yeşil.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giannico-yesil-renk-375-beden-terlik-94fb-1.jpg?v=1735924838']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Giuseppe Zanotti', 'Giuseppe Zanotti Topuklu Sandalet Leopar - 37', 'Açıklama Giuseppe Zanotti sandalet , yaz aylarında zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Leopar desenli, dolgu topuk.   Renk: Leopar.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 3250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-leopar-topuklu-sandal-d67373.png?v=1735924827']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Yves Saint Laurent', 'Yves Saint Laurent ( YSL ) Topuklu Sandalet Kahverengi - 37,5', 'Açıklama Yves Saint Laurent sandalet, yaz aylarında zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Sık bant detayı.   Renk: Kahverengi.   Beden: 37,5   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yves-saint-laurent-topuklu-sandalet-37-bd03-b.png?v=1735924811', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl1_8432ac3c-bf7f-444f-b93c-c6b539b6e3cb.jpg?v=1781606514', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ysl2_8fd91e5e-f8bb-4fc6-90c1-f332969b8a39.jpg?v=1781606476']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gucci', 'Gucci Piton Baskılı Deri Topuklu Ayakkabı Lacivert - 37', 'Ürün Bilgisi  Renk: Lacivert Beden: 37 Kumaş İçeriği: Deri Editör Notları: Bu model, lacivert tonundaki krokodil dokulu deri yüzeyi ve zarif sivri burun formu ile güçlü ama sofistike bir duruş sunar. İnce topuğu bacağı optik olarak daha uzun gösterirken, klasik pump silueti sayesinde hem gece davetlerinde hem de şık ofis kombinlerinde rahatlıkla kullanılabilir. Dokulu yüzeyi sade kombinlere karakter katar; elbise, kumaş pantolon ya da kalem eteklerle zamansız ve iddialı bir tamamlayıcıdır.  Orij', 5599, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-2_ee57b5d7-0a03-4fdf-8a3f-eeb5bb72ede3.jpg?v=1782118743', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-1_906b8720-9409-4a50-a151-db3284eca8c5.jpg?v=1782118743', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-3_2167038a-5374-47a8-a544-bb385b61343e.jpg?v=1782118743', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-5.jpg?v=1782118743', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-4.jpg?v=1782118743']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Stiletto Bronz - 37.5', 'Ürün Bilgileri  Renk: Bronz Beden:  37.5  Editör Notları: Zarif, sivri burun formülü ve ince stiletto topuğuyla feminen bir siluet sunan bu ayakkabı, metal malzemesiyle güçlü ama keskin bir durma yaratır. Ayağı uzun ve ince kalıp gösteren sayesinde elbiselerden kumaş pantolonlara kadar pek çok kombinde şık bir tamamlayıcı olur. Özel davetliler, akşam yemekleri ve şehir şıklığı için ideal; iddialı ama abartısız bir alan arayanlar için zamansız bir parça.               Orijinallik ve Kalite Kontro', 4750, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-bronz-stiletto-375--08bb.png?v=1735924765']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Fendi', 'Fendi Piton Detaylı Topuklu Ayakkabı Füme - 37', 'Ürün Bilgileri  Renk: Füme Beden: 37 Editör Notları: Bu ayakkabı, platform tabanı ve ince topuk formuyla güçlü ama dengeli bir siluet sunuyor. Süet dokusu ve haki–zeytin tonundaki rengi, modele sofistike ve modern bir hava katarken, bant detayları ayağı güzel kavrayarak daha zarif bir duruş sağlıyor. Platform yapısı yüksek topuğa rağmen daha konforlu bir kullanım sunar; hem gece davetlerinde hem de iddialı şehir kombinlerinde şık ve feminen bir tamamlayıcı olarak öne çıkar.  Orijinallik ve Kalit', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-piton-detayli-fume-topuklu-ayakk-4-4c56.png?v=1735924744']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Yves Saint Laurent', 'Yves Saint Laurent ( YSL ) Deri Topuklu Ayakkabı - 38', 'Ürün Bilgileri  Renk:Krem Beden: 38 Editör Notları: Bu ayakkabı, platform tabanı ve ince, yüksek topuğuyla güçlü ve feminen bir siluet yaratıyor. Burun kısmındaki platform detayı hem daha iddialı bir duruş sağlıyor hem de topuk yüksekliğini dengeleyerek formu daha rahat hale getiriyor. Arkası açık, bilekten ayarlanabilir bantlı yapısı ayağı zarifçe sararken nude–pudra tonundaki rengi bacak boyunu daha uzun gösteren bir etki yaratıyor. Özel davetler, gece kombinleri veya sade bir elbiseyi öne çık', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yves-saint-laurent-camel-deri-topuklu---a0e3.png?v=1735924725']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Devine Cut Out Topuklu Ayakkabı Siyah - 37', 'Ürün Bilgisi   Renk: Füme.  Beden: 37  Editör Notları: Siyah süet dokusuyla şık bir görünüm sunan bu açık burunlu kısa bot, yanlardaki kıvrımlı kesimleriyle modern ve feminen bir hava taşıyor.İnce topuğu bacağı olduğundan daha uzun gösterirken, arka fermuarı sayesinde pratikçe giyilip çıkarılabiliyor.Özellikle akşam kombinlerine iddialı bir dokunuş katmak isteyenler için güzel bir seçenek.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şek', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/devine-2.jpg?v=1781608507', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/devine-1.jpg?v=1781608534', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/devine-3.jpg?v=1781608507']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Louboutin', 'Christian Louboutin Burnu Açık Süet Topuklu Ayakkabı Siyah - 38.5', 'Ürün Bilgileri  Renk:Siyah Beden: 38.5 Editör Notları: Bu ayakkabı, siyah süet dokusuyla zamansız ve sofistike bir duruş sunan, yüksek ve kalın topuklu bir platform modeldir. Önü hafif açık tasarımı ayağa feminen bir zarafet katarken, bilekten ayarlanabilir bant detayı hem denge hem de şıklık sağlar. Platform tabanı sayesinde yüksek topuğa rağmen daha dengeli bir yürüyüş sunar; gece davetleri, kokteyller ve özel kombinlerde güçlü ve iddialı bir tamamlayıcı olarak öne çıkar.  Orijinallik ve Kalit', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/christian-louboutin-burnu-acik-suet-to-158f6e.png?v=1735924682', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/loubotin-suet-on.jpg?v=1767189337', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-suet-arka.jpg?v=1767189337']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Brian Atwood', 'Brian Atwood Süet T Bant Sandalet Bordo - 37', 'Açıklama Brian Atwood sandalet, yaz aylarında zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: T bant detayı.   Malzeme: Süet .   Renk: Bordo.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/brian-atwood-suet-t-bant-sandalet-375-ba54ef.png?v=1735924664']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Sergio Rossi', 'Sergio Rossi Haki Rugan Stiletto - 37', 'Ürün Bilgileri  Renk:Haki Beden: 37 Editör Notları: Bu ayakkabı sivri burunlu, ince ve yüksek topuklu klasik bir stiletto formunda. Parlak vernik deri yüzeyi sayesinde oldukça iddialı ve modern bir duruşu var; yeşile çalan haki/olive tonu siyah ya da nude stilettolardan daha karakterli bir alternatif sunuyor. Ayağı uzun ve ince gösteren kesimiyle özellikle kalem etekler, maskülen takım elbiseler veya sade gece elbiseleriyle çok şık durur. Hem ofis sonrası davetlerde hem de akşam kombinlerinde gü', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/5879---1.jpg?v=1780918526', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/5879---2.jpg?v=1780918526', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/5879---3.jpg?v=1780918526', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/5879---4.jpg?v=1780918527']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Brian Atwood', 'Brian Atwood Gold ve Süet Burnu Açık Topuklu Ayakkabı Siyah - 37', 'Ürün Bilgileri  Renk:Siyah Beden: 37 Editör Notları: Bu model, siyah süet dokusu ve T-bant formundaki ince kayışıyla son derece zarif ve feminen bir siluet sunuyor. Ayak bileğinden geçen ayarlanabilir tokası ayağı nazikçe sararken, arkadaki metalik altın topuk detayı tasarıma sofistike ve iddialı bir kontrast katıyor. İnce topuklu yapısı bacağı daha uzun ve ince gösterir; özel davetler, akşam yemekleri ve şık kokteyl kombinleri için çok güçlü bir tamamlayıcıdır.    Orijinallik ve Kalite Kontrolü', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/brian-atwood-gold-ve-suet-burnu-acik-t-1a710e.png?v=1735924625']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Santoni', 'Santoni Burnu Açık Topuklu Ayakkabı Bej - 38', 'Ürün Bilgileri  Renk: Bej Beden: 38 Editör Notları: Bu ayakkabı, feminen ve sofistike bir silueti öne çıkaran zarif bir topuklu sandalet modelidir. Süet dokusu yumuşak ve lüks bir his verirken, önden açık burun ve ince püskül detayları tasarıma hareket katar. Bilekten ve ön kısımdan ayarlanabilir tokalı bantları ayağı nazikçe sararak hem estetik hem de dengeli bir duruş sağlar. İnce ve yüksek topuğu bacak boyunu uzun gösterir; özel davetler, akşam yemekleri veya şık kombinlerde güçlü ama zarif b', 3800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/santoni-burnu-acik-bej-topuklu-ayakkab-fd5-1e.jpg?v=1735924607']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Dolce & Gabbana', 'Dolce & Gabbana Süet Platform Sandalet Füme - 38', 'Açıklama Dolce &amp; Gabbana platform sandalet, yaz aylarında zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Platform, çok bant detayı.   Malzeme: Süet.   Renk: Füme.   Beden: 38.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 3800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce-gabbana-fume-suet-platform-sanda-13-12c.jpg?v=1735924590']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Sergio Rossi', 'Sergio Rossi Zımbalı Platform Sandalet Antrasit - 37', 'Açıklama Sergio Rossi sandalet, yaz aylarında zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: zımba detayı.   Renk: Antrasit.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sergio-rossi-zimbali-platform-sandalet-4bfa-b.png?v=1735924558']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Christian Louboutin', 'Christian Louboutin File Detaylı Süet Araknene Bot Siyah - 37', 'Ürün Bilgisi    Renk: Siyah  Beden: 37  Topuk Yüksekliği: 10 cm  Editör Notları:  Bu Christian Louboutin topuklu ayakkabı, markanın ikonik kırmızı tabanını modern ve cesur bir tasarımla buluşturan özel modellerinden biridir. Siyah süet ve transparan mesh panellerden oluşan kafes formu, ayağı zarifçe sararken feminen ve iddialı bir görünüm yaratır. Sivri burun yapısı ve ince stiletto topuğu silueti uzatır, grafik kesimler ise modele couture bir karakter kazandırır. Akşam davetleri ve özel kombinl', 7100, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-file-2.jpg?v=1781618844', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-file-1.jpg?v=1781618844', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-file-3.jpg?v=1781618844', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louboutin-file-4.jpg?v=1781618844']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Sonia Rykiel', 'Sonia Rykiel Makosen Siyah - 38', 'Açıklama Sonia Rykiel Makosen, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: İşleme detaylı.   Malzeme: Deri .   Renk: Siyah.   Beden: 38.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sonia-rykel-1.jpg?v=1777886148', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sonia-rykel-2.jpg?v=1777886148', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sonia-rykel-3.jpg?v=1777886148', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sonia-rykiel-siyah-renk-38-beden-loafe--83eb.jpg?v=1735924496']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Bottega Veneta', 'Bottega Veneta Loafer Kahverengi - 37', 'Açıklama Bottega Veneta, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Fiyonk detaylı.   Malzeme: Süet.   Renk: Kahverengi.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-veneta-kahverengi-renk-375-bed-4d1de3.jpg?v=1735924475', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-veneta-kahverengi-renk-375-bed-c97d-b.jpg?v=1735924475', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-veneta-kahverengi-renk-375-bed-a8390b.jpg?v=1735924475', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-veneta-kahverengi-renk-375-bed-0bcca8.jpg?v=1735924476']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Santoni', 'Santoni Leopar Loafer - 36', 'Ürün Bilgisi   Tasarım: Leopar Desen,Püskül Detay  Renk: Kahve  Beden: 36  Eksper Notları: Santoni’nin imzası olan kusursuz işçiliği, bu loafer modelinde vahşi dokulu leopar deseniyle buluşuyor.Yumuşak tüylü yüzeyi ve altın tonlu püskül detayı ayakkabıya hem sıcak bir karakter hem de sofistike bir dokunuş katıyor.Düz tabanı sayesinde gün boyu rahat, deseni sayesinde tek adımda iddialı bir görünüm sunan özel bir parça.   Eksper Puanları: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım ema', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/santoni-leopar-renk-36-beden-loafer-74-8a5.jpg?v=1735924458']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Süet Loafer Taba - 37', 'Ürün Bilgisi  Renk: Taba Beden:37 Tasarım: Ahşap Taban Kumaş İçeriği: Süet Eksper Notları:Yumuşak dokusu ve zarif kesimi sayesinde ayağa hafifçe oturan, günlük stile doğal bir şıklık katan bir model. İnce tabanı ve klasik formu hem rahatlık hem de düzenli bir görünüm sunuyor. Jean’le de, daha özenli bir kombinle de aynı uyumu veren zamansız bir parça. Eksper Puanı: Ürünün tüm incelmesi tarafımızca yapılmıştır. Kondisyon Durumu 10/10  Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünl', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph-1.jpg?v=1781529977', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph-2.jpg?v=1781529977', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph-3.jpg?v=1781529977', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph4.jpg?v=1781529977']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tod''S', 'Tod''s Gommino Süet Loafer Lacivert - 37', 'Açıklama Tod''s loafer, zamansız bir şıklık sağlar.  Öne Çıkan   Malzeme: Süet.   Renk: Lacivert.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 7500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tods-lacivert-renk-37-beden-loafer-8228-1.jpg?v=1735924419']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gianvito Rossi', 'Gianvito Rossi Lacivert Topuklu Ayakkabı -37', 'Ürün Bilgisi    Renk: Lacivert  Beden: 37   Editör Notları:  Bu Gianvito Rossi topuklu ayakkabı, markanın feminen zarafetini modern detaylarla buluşturan özel tasarımlarından biridir. Lacivert kadife (velvet) yüzeyi lüks bir doku sunarken, ön kısmındaki kırmızı bağcık detayları ve metal halkalar modele çarpıcı, couture bir karakter kazandırır. İnce stiletto topuğu ve zarif açık burun formu sayesinde hem bacağı uzun gösterir hem de güçlü bir siluet yaratır. Akşam davetleri, özel etkinlikler ve id', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi-2.jpg?v=1781528352', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi-1.jpg?v=1781528353', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi-3.jpg?v=1781528352', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi-4.jpg?v=1781528353']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Aquazzura', 'Aquazzura Deri Biyeli Gold İşlemeli Babet Kahverengi - 37', 'Ürün Bilgisi    Tasarım: Dei biyeli, gold işlemeli.   Malzeme İçeriği Deri.   Renk: Kahverengi.   Beden: 37   Eksper Puanı: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır. 10/10   Eksper Notları:  Dantelin romantik dokusunu modern bir silüetle buluşturan bu özel tasarım ayakkabı, feminen tarzı sevenler için ideal bir parça. İnce bağcık detayları bileği zarifçe sararak hem şık bir görünüm hem de destek sağlar. Altın ve kahve tonlarının uyumu, aya', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/aquazzura-kahverengi-renk-375-beden-ba-0f-846.jpg?v=1735924389']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Bottega Veneta', 'Bottega Veneta Süet Loafer Mürdüm - 37', 'Açıklama Bottega Veneta loafer, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Fiyonk detayı.   Malzeme: Süet.   Renk: Mürdüm.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 10000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-veneta-murdum-renk-37-beden-lo-97eac.jpg?v=1735924373', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Bottega-loafer-arka.jpg?v=1767177365', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-loafer-detay1.jpg?v=1767177365']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Tod''S', 'Tod''s Gommino Deri Loafer Yeşil - 37', 'Açıklama Tod''s loafer, zamansız bir şıklık sağlar.  Öne Çıkan   Malzeme: Deri .   Renk: Yeşil.   Beden: 37.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/tods-yesil-renk-37-beden-loafer-5b4-88.jpg?v=1735924358']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Rixo', 'Rixo Yırtmaçlı ve Pileli Etek - S', 'Ürün Açıklaması   Beden :36   Renk:Siyah/Beyaz   Tasarım:Yırtmaçlı,Pileli   Materyal:Şifon   Ölçü: Boy:88 cm Bel: 34 cm   Eksper Notları:Akıcı dokusu ve küçük ölçekli geometrik deseniyle hafif ve zarif bir görünüm sunuyor. Belden aşağı doğru yumuşak şekilde açılan formu hareket ettikçe doğal bir akış yaratıyor. Yandaki ince yırtmaç detayı ise parçaya sade ama modern bir dinamizm katıyor.     Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şek', 2250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rixo-siyah-renk-s-beden-etek-be76-e.jpg?v=1735924342']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Red Valentino', 'Red Valentino Pileli Desenli Etek Renkli - 38', 'Açıklama Red Valentino etek, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: desenli, pileli.   Malzeme: Şifon.   Renk: Renkli.   Beden: 38.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/red-valentino-pileli-desenli-etek-38-68d-9b.jpg?v=1735924315']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Red Valentino', 'Red Valentino Kareli Ceket Kırmızı - 36', 'Açıklama Red Valentino ceket, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Kare desenli.   Malzeme: Koton.   Renk: Kırmızı.   Beden: 36.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/red-valentino-kirmizi-renk-36-beden-ce-46-8e7.jpg?v=1735924269']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Zimmermann', 'Zimmermann Desenli Şifon Elbise Renkli - 36', 'Ürün Bilgisi   Renk:  Beden: 36   Editör Notları: Zimmermann imzalı bu maksi elbise, markanın ikonikleşmiş çiçek desenleri ve uçuş uçuş ipek şifon kumaşıyla rüya gibi bir silüet sunuyor. Mor ve lavanta tonlarının hakim olduğu bu özel baskı, doğanın zarafetini sofistike bir dokuyla birleştiriyor. Elbisenin yaka kısmındaki fırfır detayları ve büzgülü bel yapısı, feminen hatları nazikçe vurgularken, uzun kollar ve dökümlü etek boyu eforsuz bir şıklık yaratıyor. Hem özel bir bahar davetinde hem de s', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/zimmermann-koy.gif?v=1754316469']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Giuseppe Zanotti', 'Giuseppe Zanotti Nubuk Topuklu Ayakkabı Nude- 38', 'Ürün Bilgisi   Renk: Nude  Beden: 38  Editör Notları: Bej süet üstü ve ince T-band detayıyla feminen bir çizgi sunan bu platform topuk, modern gri topuğuyla hem yumuşak hem iddialı bir görünüm yaratıyor.Platform taban adımı dengelerken, bilekten ayarlanan ince bant ayağı güvenli şekilde kavrıyor.Özel davetler ve şık akşam kombinleri için hem zarif hem de dikkat çeken bir seçenek.  Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incele', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-nubuk-topuklu-ayakkab-25f50f.png?v=1735924212']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Dolce & Gabbana', 'Dolce & Gabbana Anahtar Desenli Elbise Siyah - 36', 'Ürün Bilgisi   Beden: 36  Renk: Siyah,Yeşil  Editör Notları: Bu elbise, siyah zemin üzerindeki altın ve gümüş tonlu anahtar desenleriyle güçlü ve sofistike bir duruş yaratıyor. Vücudu saran düz kesimi bel hattını belirginleştirerek daha ince bir siluet sunarken, diz altına uzanan boyu bacakları daha uzun gösterir. Uzun kolları ve sade yaka formu sayesinde dengeli ve şık bir görünüm sağlar; desenin dikey akışı elbiseye hareket katar. Davetlerde, akşam yemeklerinde veya özel buluşmalarda iddialı a', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dolce-gabbana-siyah-renk-36-beden-elbi-310bb3.jpg?v=1735924194']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balmain', 'Balmain Gold Çizgili Kazak Siyah - 36', 'Ürün Bilgisi   Renk: Siyah  Beden: 36  Editör Notları:Balmain’in karakteristik çizgisini taşıyan bu üst, siyah zemin üzerindeki altın tonlu dikey çizgileriyle bedeni daha ince ve uzun gösteriyor.Yumuşak ve esnek dokusu sayesinde hem rahat hem de bedenin formunu toplayan bir yapıya sahip.Günlük bir jean ile sade bir şıklık, deri bir etek ile daha iddialı bir görünüm oluşturmak için ideal.  Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekild', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-siyah-renk-36-beden-kazak-6-9878.jpg?v=1735924178']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Stella Mccartney', 'Stella McCartney Yün Kazak Renkli - 38', 'Ürün Bilgisi   Tasarım: Ekose Desen  Kumaş İçeriği: Yün  Renk: Bej,Kahve,Mavi  Beden: 38  Editör Notları: Bej, kahve ve mavi tonlarının birleştiği bu yün kazak, modern ekose deseniyle sıcak ve zarif bir görünüm sunuyor.Yünün doğal dokusu hem yumuşaklık hem de ısı sağlar; alt kenar ve manşetlerdeki düz bej detaylar deseni sakinleştirip kazağa temiz bir bitiş katıyor.Günlük jean kombinlerinden ofis pantolonlarına kadar birçok stile kolayca uyum sağlayan kullanışlı bir parça.   Eksper Puanları: Ürü', 3299, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-mccartney-renkli-renk-38-beden--6-8050.jpg?v=1735924166']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Kenzo', 'Kenzo Bisiklet Yaka Çocuk Sweatshirt Gri - S', 'Açıklama Kenzo sweatshirt, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Bisiklet yaka, baskı detaylı.   Renk: Gri.   Beden: S.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kenzo-gri-renk-s-beden-sweatshirt-539-8b.jpg?v=1735924153']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'By Malene Birger', 'By Malene Birger İşlemeli Gömlek Nude - 38', 'Açıklama By Malene Birger gömlek, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: İşleme detayı.   Renk: Nude.   Beden: 38.   Materyal: %100 İpek   Ölçü: Boy: 75 cm   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 3800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/by-malene-birger-ten-renk-38-beden-gom-4-7cef.jpg?v=1735924143', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/product_to_model_0.webp?v=1780941931']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balmain', 'Balmain V Yaka Kazak Turuncu - 40', 'Ürün Bilgisi   Tasarım: V yaka   Kumaş İçeriği: Örme,Koton  Renk: Turuncu  Beden: 40   Editör Notları: Balmain’in dikkat çeken enerjisini taşıyan bu üst, canlı turuncu tonuyla tek başına bile güçlü bir görünüm yaratıyor.V yakası boynu daha uzun gösterirken, dokudaki kabartmalı desenler parçaya modern ve hareketli bir ifade katıyor.   Eksper Puanları: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır. 10/10   Orijinallik ve Kalite Kontrolü Peony Col', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-turuncu-renk-40-beden-kazak-e-d288.jpg?v=1735924135']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Desenli Metalik Etek Lacivert - 34', 'Ürün Bilgisi  Renk: Lacivert Beden:34  Ölçü: Bel: 34 cm Boy 83 cm  Materyal: %42 İpek %44 Metal Tasarım: Kalp Metalik Desen  Eksper Notları:Işığı her hareketle yakalayan metalik dokusu ve düzenli plise formu parçaya hem akışkan hem şık bir görünüm veriyor. Bel hattını toparlayan kesimi sayesinde siluet temiz duruyor. Sade bir üstle bile kombinlendiğinde dikkat çeken, akşamdan gündüze rahatça uyarlanabilen özel bir model.  Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlar', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-lacivert-renk-34-beden-etek-c37453.jpg?v=1735924114']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Altuzarra', 'Altuzarra Leopar Desenli Kazak Mavi - S', 'Ürün Bilgisi   Renk :Mavi  Beden: Small    Tasarım: Leopar desenli   Kumaş İçeriği: %50 Merinos yünü, %30 polyamit ve %20 Alpaka   Editör Notları: Altuzarra imzalı, buz mavisi tonunda jacquard örgü bir triko. Siyah leopard desenleri enerjik bir kontrast yaratırken, etek ucu ve manşetlerdeki etnik ilhamlı bordür detayı kazağa sofistike bir karakter kazandırıyor. Yumuşak dokusu ve rahat kesimiyle günlük stilin içinde öne çıkan, markanın modern–bohem çizgisini taşıyan bir parça.   Eksper Puanı: Ürü', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/altuzarra-mavi-siyah-renk-s-beden-kaza-bc-98f.jpg?v=1735924102']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Iro', 'IRO Deri Biker Ceket Gri - 34', 'Ürün Bilgisi  Renk: Açık Gri Beden: 34 Tasarım: Fermuar Cep Detaylı  Kumaş İçeriği: Deri Eksper Notları: Önde yer alan çoklu fermuarlar ve omuzdaki metal düğme detayları modele havalı bir karakter katıyor. Bel kısmındaki ayar kayışları silueti toparlarken, yumuşak deri yapısı rahat bir kullanım sunuyor. Jean’lerle, elbiselerle ve modern şehir stiliyle kolayca uyum sağlayan güçlü bir tamamlayıcı. Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır.kullanım yıpranmaları vardır kondisyon duru', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/iro-gri-renk-34-beden-ceket-e3d0-4.jpg?v=1735924081']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Kazak Leopar - Xs', 'Ürün Bilgileri  Renk: Kahve Beden: XS Kumaş İçeriği: Yün Editör  Notları: Bu kazak kısa ve hafif crop kesimiyle bele doğru oturan, üst bedeni dengeli ve zarif gösteren bir modele sahip. Leopar desenli dokusu güçlü ve iddialı bir stil yaratırken, ribanalı bel ve manşet detayları formunu toparlayarak daha fit bir duruş sağlar. Yuvarlak yaka ve uzun kol yapısı sayesinde hem günlük kombinlerde hem de şık-casual görünümlerde rahatlıkla kullanılabilir; özellikle yüksek bel pantolon ve eteklerle çok de', 2900, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph-lauren-leopar-renk-xs-beden-kaza-4d-9be.jpg?v=1735924062']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Missoni', 'Missoni Çizgili Monogrom Pantolon Si̇yah - 36', 'Ürün Bilgisi  Renk:Siyah,Gri,Beyaz Beden:36 Editör Notları:Hafif ve akışkan kumaşı yürüdükçe hareket kazanıyor; desen ise parçaya hem modern hem sanat etkisi taşıyan bir görünüm veriyor. Yüksek bel formu sayesinde vücudu toparlayıp bacak boyunu uzatan bu model, sade bir üstle bile güçlü bir stil yaratıyor.  Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alı', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/missoni-siyah-beyaz-renk-36-beden-pant-41902.jpg?v=1735924049']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Marni', 'Marni Volanlı Midi Etek Siyah - 36', 'Ürün Bilgisi   Tasarım: A Kesim  Kumaş İçeriği: Coton  Renk: Siyah  Beden: 36  Ölçü: Boy 63 cm Bel 36 cm  Eksper Notları: Klasik siyah A kesim bu etek, beldeki oturan formu ve aşağı doğru açılan siluetiyle zarif bir duruş yaratıyor.Kumaşının dökümü sayesinde hareket halinde şık bir akış sağlıyor.Günlük stil için düz bir kazakla, daha şık bir görünüm için topuklu ayakkabıyla kolayca tamamlanabilecek çok yönlü bir parça.   Eksper Puanları: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım em', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/marni-siyah-renk-36-beden-etek-dbc01a.jpg?v=1735924037']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Helmut Lang', 'Helmut Lang Deri Kalem Etek Siyah - 36', 'Açıklama Helmut Lang kalem etek, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Kalem etek.   Malzeme: Deri .   Renk: Siyah.   Beden: 36.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/helmut-lang-siyah-renk-36-beden-etek--b1c2.jpg?v=1735924027', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/helmut-lang-siyah-renk-36-beden-etek-757aa5.jpg?v=1735924027', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/helmut-lang-siyah-renk-36-beden-etek-cd1c99.jpg?v=1735924027']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Isabel Marant', 'Isabel Marant Etoile Triko Kazak Renkli - 36', 'Ürün Bilgisi   Beden:34(italyan)   Renk:Gri,mor,yeşil   Tasarım:Örme   Kumaş İçeriği:85% Pamuk 15 %polyemid   Eksper Yorumu:Lila ve mint tonlarının karıştığı bu dokulu triko, elle örülmüş hissi veren kabarık yapısıyla oldukça karakterli bir parça. Omuzdaki hafif hacim ve belde toparlayan ribana bitiş, silueti dengeli gösteriyor. Renk geçişleri sayesinde hareketli ama yumuşak bir görünüm sunan, şehir stiline kolayca uyum sağlayan özgün bir kazak.   Orijinallik ve Kalite Kontrolü Peony Collective''', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/isabel-marant-renkli-renk-36-beden-kaz-5235e3.jpg?v=1735924016']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Versace', 'Versace Baskılı Leopar Tişört Renkli - 36', 'Ürün Bilgisi:   Boy:55 cm En: 45 cm  İçerik: %94 Koton', 3250, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/versace-renkli-renk-36-beden-t-shirt-3e7-b2.jpg?v=1735924005', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/versace_tshirt.webp?v=1780927989']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fabianna Filippi', 'Fabianna Filippi Tül Detaylı V Yaka Kazak Nude - 36', 'Açıklama Fabianna Filippi kazak, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Tül detaylı, V yaka.   Malzeme: Örme.   Renk: Nude.   Beden: 36.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fabianna-filippi-tas-renk-36-beden-kaz-6-3007.jpg?v=1735923990', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fabianna-filippi-tas-renk-36-beden-kaz-87b049.jpg?v=1735923990', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fabianna-filippi-tas-renk-36-beden-kaz-056-8b.jpg?v=1735923990']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Victoria Beckham', 'Victoria Beckham Boğazlı Uzun Triko Elbise Mor - 36', 'Açıklama Victoria Bechkam elbise, zamansız bir şıklık sağlar.  Öne Çıkan   Tasarım: Boğazlı, uzun elbise.   Malzeme: Örme.   Renk: Mor.   Beden: 36.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 4350, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/victoria-beckham-mor-renk-36-beden-elb-4f12-a.jpg?v=1735923968']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balmain', 'Balmain Monokrom Desenli Kazak Siyah Beyaz - 36', 'Ürün Bilgisi   Tasarım: Kazayağı Desen  Kumaş İçeriği: Örme  Renk: Gri,Siyah,Beyaz  Beden: 36  Eksper Notları: Siyah-beyaz kazayağı deseniyle dikkat çeken bu üst, klasik bir deseni modern ve toparlayıcı bir kalıpla birleştiriyor.Esnek dokusu bedene güzelce oturuyor, kolların ve etek ucunun düz siyah bitişleri parçaya temiz bir görünüm veriyor.   Eksper Puanları: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım emaresi ve deformasyon barındırmamaktadır. 10/10   Orijinallik ve Kalite Kontro', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-siyah-beyaz-renk-36-beden-kaza-b-c325.jpg?v=1735923958']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Zimmermann', 'Zimmermann İpek Mini Elbise Renkli - 36', 'Ürün Bilgisi   Renk: Renkli  Beden: 36  Materyal: %90 ipek  Ölçü: Boy 85 cm En 40 cm  Editör Notları: Zimmermann''ın podyum koleksiyonlarında öne çıkan bu elbise, markanın "retro-modern" estetiğini kusursuz bir şekilde sergiliyor. Farklı floral ve doğa temalı desenlerin bir araya getirildiği patchwork (yama) tasarımı, elbiseye el işçiliği yüksek, antika bir hava katarken; ipek ve keten karışımlı lüks dokusu yapısını korumasını sağlıyor. Uzun kolları ve bele oturan kemer detayıyla dengelenen kloş', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/zimmermann-renkli-renk-36-beden-elbise--4201.jpg?v=1735923936']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Selma Çi̇lek', 'Selma Çilek Vatkalı Kazak Gri - 36', 'Ürün Bilgisi    Renk: Bej   Kumaş: Yün   Eksper Notları: Kısa kesimi ve bel hizasında yer alan bağlama detayı, vücut hatlarını zarifçe vurgular ve silueti daha dengeli gösterir. Üst kısmındaki daha sık örgü dokusu ile alt bölümdeki düz ve akıcı yapı, tasarıma hareket ve derinlik kazandırır. Uzun kolları ve ribana manşetleri, parçaya dengeli ve modern bir duruş sağlar.  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/selma-cilek-gri-renk-36-beden-kazak-880-47.jpg?v=1735923924']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Bottega Veneta', 'Bottega Veneta Blok Renkli Yün Bluz Ki̇remi̇t - 36', 'Ürün Bilgisi   Kıyafet İçeriği: %100 Yün.   Renk: Kiremit/Siyah/Beyaz   Beden: 36   Eksper Notları:  “Modern renk bloklarıyla öne çıkan bu triko kazak, ince dokusu ve net hatlarıyla günlük şıklığa güçlü bir yorum katıyor. Hem denimlerle hem klasik parçalarla zahmetsizce eşleşir.”  Eksper Puanı: Ürünün tüm incelemesi tarafımızca yapılmıştır. Kullanım imaresi ve kumaş çekmesi bulunmaktadır.  810   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bottega-veneta-kiremit-renk-36-beden-b-8549-4.jpg?v=1735923908']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Blumarine', 'Blumarine Klasik V Yaka Tulum Mavi beyaz - 36', 'Açıklama Feminen ve romantik tasarımlarıyla tanınan İtalyan Blumarine markasının mavi-beyaz tulumu modern bir zarafet sunmaktadır. Manşet detayları ve beli vurgulayan geniş bandıyla sofistike bir görünüm sunar.  Öne Çıkan Özellikler   Tasarım: Tulum..  Renk: Mavi-Beyaz.  Beden: 36.    Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blumarine-mavi-beyaz-renk-36-beden-tul-a93379.jpg?v=1735923890', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blumarine-mavi-beyaz-renk-36-beden-tul-ba-952.jpg?v=1735923890', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blumarine-mavi-beyaz-renk-36-beden-tul-1-7336.jpg?v=1735923890', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blumarine-mavi-beyaz-renk-36-beden-tul-362e7d.jpg?v=1735923890', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blumarine-mavi-beyaz-renk-36-beden-tul--468ab.jpg?v=1735923890']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Balenciaga', 'Balenciaga Paris Cities Jumbo Çanta', 'Açıklama İç kısmında kumaş astar, bir iç cep, fermuarlı iç cep ve ortada bir bölme. Öne Çıkan Özellikler   Malzeme: Organik pamuk kanvas.  Renk: Siyah.  Beden: Std.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 16000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-siyah-renk-standart-beden-c-7d4-74.jpg?v=1735923870']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Celine', 'Celine Triomphe Cabas Thais Çanta Siyah', 'Açıklama Celine 2021 koleksiyonuna ait orijinal siyah-beyaz zebra desenli, büyük boy kanvas ve deri Celine Triomphe Cabas Thais omuz çantası, uzun askıları, ön kısmında deri Triomphe detayı ve cepli bej astarı ile öne çıkıyor. Çift saplı yapısıyla elde de taşınabilecek şekilde tasarlanmış. Geniş iç hacmi sayesinde günlük kullanımda eşyalarınızı rahatça taşıyabileceğiniz bir model.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde ince', 30000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-zebra-renk-standart-beden-canta-4004-9.jpg?v=1735923851', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-zebra-renk-standart-beden-canta-ce3d70.jpg?v=1735923851', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-zebra-renk-standart-beden-canta-dcbc31.jpg?v=1735923851', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-zebra-renk-standart-beden-canta-88dd-7.jpg?v=1735923851', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-zebra-renk-standart-beden-canta-4c92-a.jpg?v=1735923851']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Çanta', 'Çanta', 'Alexander Mcqueen', 'Alexander McQueen The Curve Bucket Çanta Yeşil', 'Ürün Bilgisi    Renk: Yeşil  Kumaş: Deri  Editör Notları:  Bu Alexander McQueen çanta, markanın güçlü ve heykelsi tasarım dilini yansıtan kemer tokalı bucket (kova) form bir modeldir. Pürüzsüz yeşil deri gövdesi, üst kısımda yer alan geniş kemer ve metal toka detayı ile McQueen’in imza sert-modern estetiğini vurgular. Ayarlanabilir uzun askısı sayesinde çapraz ya da omuzda kullanılabilirken, kompakt ama derin yapısı günlük kullanım için oldukça pratiktir. Cesur rengi ve mimari silüetiyle sade ko', 20000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/amq4.jpg?v=1768466530', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/amq1.jpg?v=1768466530', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/amq3.jpg?v=1768466530', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/amq2.jpg?v=1768466530', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alexander-mcqueen-yesil-renk-standart--691ce7.jpg?v=1768466530']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fendi', 'Fendi Flat Baguette Mini Çanta Pembe', 'Açıklama Fendi''nin ikonik Baguette çantası ilk kez 1997 yılında tasarlandı ve o dönemden itibaren birçok farklı boyut, malzeme ve tasarımla yeniden yorumlandı. Flat Baguette Mini ise Baguette’in daha minimal ve ince bir versiyonu olarak satışa sunuldu. Deri kart bölmesi ve iki bölmeli iç yapısı ile pratik kullanım sunan çanta, açık ve koyu kahverengi tonlarındaki iki renkli kanvas askısı sayesinde birçok farklı kombine uyum sağlar.    Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürün', 30000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fendi-flat-baguette-mini-canta--4aa2.jpg?v=1735923791']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Wandler', 'Wandler Anna Deri Bel ve Kol Çantası Gri', 'Açıklama Hollandalı aksesuar markası Wandler''in modern ve minimalist estetiğini yansıtan Anna çanta, ayarlanabilir bir kayışa, arka kısımda fermuarlı cebe, altın tonlu metal aksesuarlara ve kart bölmeli bir iç göze sahip. Omuz çantası olarak da kullanılabilir. %100 deri, 20 cm yükseklik, 14 cm genişlik.    Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik olarak sunulur. Güvenle alış', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/wandler-gri-renk-standart-beden-canta-0e2d04.jpg?v=1735923775']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Moncler', 'Moncler Atkı Bere Takım Gri', '', 5500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/moncler-gri-renk-standart-beden-atki-b-5-5c2e.jpg?v=1735923765']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'No.21', 'No. Şeffaf Vizörlü Şapka Siyah - Standart', '', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/no-4-cfe891ca.jpg?v=1735923756']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Balmain', 'Balmain Çocuk Eşofman Altı Siyah - 12 y', 'Öne Çıkan Özellikler:   Tasarım: Yazı detaylı.   Malzeme: Koton .   Renk: Siyah.   Beden: 12Y.   Orijinallik ve Kalite Kontrolü Peony Collective''deki tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 1800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-siyah-renk-12-beden-esofman-a0bc99.jpg?v=1735923735', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-siyah-renk-12-beden-esofman-f3625d.jpg?v=1735923735']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Max & Co.', 'Max & Co. Kareli Geniş Paça Pantolon Renkli - 36', 'Ürün Bilgisi   Beden:36  Renk:Kahverengi  Editör Notları:İtalyan Max Mara Grubu''nun bir parçası olan Max &amp; Co. markasının bej ve kahverengi tonlardaki pantolonu, yüksek bel kesimi ile bacak boyunu uzun gösterir ve modern bir siluet sunar. Geniş paçaları rahat hareket alanı sağlarken, aynı zamanda şık bir görünüm sağlar. Ofis ortamında veya günlük şıklık için rahatlıkla kullanılabilecek, hem klasik hem de modern stillere uygun bir parça.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/max-co-renkli-renk-36-beden-pantolon-9c281e.jpg?v=1735923719']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Sandro', 'Sandro Ekose Culotte Pantolon Füme - 36', 'Ürün Bilgisi   Beden:36  Renk:Koyu Gri  Tasarım:Kapitone  Eksper Notları:Parizyen Sandro markasının zarif ve klasik pantolonu, geniş paçalı ve culotte tarzında tasarlanmış olup, modern ve rahat bir kesime sahiptir. Bel kısmındaki kemer köprüleri pantolona şıklık katarken aksesuar kullanımına olanak tanır. Diz altına kadar uzanan paça boyu, yüksek bel kesimi ve ince ekose deseni ile hem ofis ortamı hem de günlük şıklık için uygundur. Eksper Puanı:Ürünün tüm incelemesi tarafımızca yapılmıştır.Kond', 1800, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/sandro-fume-renk-36-beden-pantolon-5a4750.jpg?v=1735923682']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Christian Louboutin', 'Christian Louboutin Almeria 120 Dolgu Topuk Sandalet Kahverengi - 36', 'Öne Çıkan Özellikler:   Tasarım:  Dolgu topuk.   Renk: Kahverengi.   Beden: 36.     Orijinallik ve Kalite Kontrolü Peony Collective''de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinal olarak sunulur. Güvenle alışveriş yapabilirsiniz.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lb-sandalet-1.jpg?v=1781534097', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lb-sandalet-2.jpg?v=1781534097', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lb-sandalet-3.jpg?v=1781534097', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/lb-sandalet-4.jpg?v=1781534097']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Yves Saint Laurent', 'Yves Saint Laurent ( YSL )Süet ve Rugan Tribtoo Platform Ayakkabı Bej - 36', 'Ürün Bilgisi   Renk: Nude  Beden: 36   Topuk Yüksekliği: 13 cm   Platform Yüksekliği: 4 cm  Editör Notları: Nude tonlarda tasarlanan bu platform topuk, süet dokusu ve parlak burun detayıyla iki farklı dokuyu zarifçe bir araya getiriyor.Yüksek ve ince topuğu bacak boyunu belirgin şekilde uzatırken, platform tabanı yürümeyi daha dengeli hale getiriyor.Hem özel davetlerde hem de iddialı ofis kombinlerinde güçlü bir tamamlayıcı parça.     Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/yves-saint-laurent-bej-renk-36-beden-t-9-495b.jpg?v=1735923614']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Loro Piana', 'Loro Piana Sneaker Camel - 36', '', 17500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/loro-piana-camel-renk-36-beden-sneaker--9d20.jpg?v=1735923590']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Gianvito Rossi', 'Gianvito Rossi Bonnie Stiletto Siyah - 35,5', 'Ürün Bilgileri  Renk:Siyah Beden: 35,5 Editör Notları: Bu model, sivri burun formu ve ince yüksek topuğuyla oldukça feminen ve iddialı bir siluet sunuyor. Siyah deri gövdeye eşlik eden transparan tül paneller, ayakkabıya hafiflik ve sofistike bir cazibe katarken ayağı daha zarif ve uzun gösteriyor. Yanlardan görünen tül detay sayesinde klasik stiletto çizgisi modern ve çekici bir yorum kazanıyor. Özel davetler, akşam yemekleri ve şık gece kombinleri için ideal; minimal bir elbise ya da güçlü bir', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-stiletto-yan.jpg?v=1767190333', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-stiletto-on.jpg?v=1767190333', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gianvito-rossi-stiletto-arka.jpg?v=1767190333']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Valentino', 'Valentino Dantel Espadril Pembe - 36', 'Dantel detaylı Valentino espadril, jüt, deri ve kauçuk malzeme karışımından oluşuyor. Jüt liflerinden yapılmış taban tasarıma doğal bir görünüm kazandırırken, dantel ve pembe dikiş gibi incelikli detaylar romantik bir hava sunuyor.     Orijinallik ve Kalite Kontrolü:  Peony Collective’de her ürün uzmanlarımız tarafından incelemeden geçirilir. Buna ek olarak, kalite ve orijinallik açısından güvence sağlamak için Entrupy teknolojisi kullanılır. Bu gelişmiş doğrulama sistemi sayesinde, ürünün %100', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/Valentino-espadril-yan.jpg?v=1767176901', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/valentino-espadril-arka.jpg?v=1767176901']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Yves Saint Laurent', 'Yves Saint Laurent (YSL) Deri Stiletto Siyah - 39', 'Ürün Bilgileri  Renk:Siyah Beden: 39 Editör Notları: Bu ayakkabı, sivri burun formu ve ince stiletto topuğuyla güçlü ve sofistike bir siluet sunuyor. Ayak bileğini saran zarif kayışı ayağı dengeli gösterirken, burun kısmındaki altın metal detay modele modern ve iddialı bir dokunuş katıyor. Pürüzsüz siyah deri yüzeyi sayesinde hem gece davetlerinde hem de şık akşam kombinlerinde rahatlıkla kullanılabilecek, feminen ve güçlü bir duruşa sahip zamansız bir parça.    Orijinallik ve Kalite Kontrolü: P', 8000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/saint-laurent-deri-stiletto-39--7566-d.png?v=1735923535']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Aksesuar', 'Aksesuar', 'Fendi', 'Fendi Cateye Güneş Gözlüğü Turuncu - Standart', 'Ürün Bilgisi    Renk: Turuncu   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/N.jpg?v=1767947479']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Zadig & Voltaire', 'Zadig & Voltaire Ceket Pembe - 36', 'Saint Laurent Paris''in klasik ve zarif tasarımı, ince topukları ve nötr rengiyle hem günlük hem de özel davetlerde kullanmak için ideal. Her kıyafete sofistike ve lüks bir dokunuş katmak için mükemmel tercih.      Orijinallik ve Kalite Kontrolü:  Peony Collective’de her ürün uzmanlarımız tarafından incelemeden geçirilir. Buna ek olarak, kalite ve orijinallik açısından güvence sağlamak için Entrupy teknolojisi kullanılır. Bu gelişmiş doğrulama sistemi sayesinde, ürünün %100 orijinal olduğundan em', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/zadig-voltaire-pembe-ceket_5483642b-b403-4a53-b76a-8c7b2979f001.jpg?v=1765287319']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry London Deri Biyeli Yün Kaban Siyah - S', 'Ürün Bilgisi  Renk: Siyah Beden: 36 Tasarım: Düğme Detaylı  Kumaş İçeriği: %85 Yün %15 Kaşmir Eksper Notları: Yumuşak yapısı ve tam boy düğme kapaması sayesinde hem şık hem düzenli bir duruş sunuyor. Geniş yakası modele retro bir hava katarken, kol manşetlerindeki detaylar silueti tamamlıyor. Soğuk havalarda hem günlük stile hem daha özenli kombinlere kolayca uyum sağlayan zamansız bir parça. Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır.kullanım yıpranmaları vardır kondisyon durumu1', 6000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-siyah-renk-s-beden-kaban--4a9c2.jpg?v=1735923491', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-siyah-renk-s-beden-kaban-58-42e.jpg?v=1735923491', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-siyah-renk-s-beden-kaban-96e2-9.jpg?v=1735923491']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ralph Lauren', 'Polo Ralph Lauren Kapitone Mont Lacivert - M', 'Açıklama Lacivert kaz tüyü dolgulu Denver mont, Ralph Lauren ailesinin orijinal serisi olan Polo Ralph Lauren''in klasik Amerikan tarzını yansıtan bir parçasıdır. Hem konfor hem de stil sunarak bu zamansız tarzın vazgeçilmez unsurlarından birini temsil eder.     Öne Çıkan Özellikler     Tasarım: Kapitone detaylı klasik Amerikan tarzı.   Malzeme: Kaz tüyü dolgu ile sıcaklık sağlar.   Renk: Lacivert.   Beden: M.      Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tara', 9000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralphlauren1.jpg?v=1769629991', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralphlauren2.jpg?v=1769629991', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralphlauren3.jpg?v=1769629991', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_2027.jpg?v=1769629992']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Il Gufo', 'Il Gufo Kapüşonlu Çocuk Mont Siyah - 14', 'İtalyan Il Gufo markasına ait kapüşonlu mont, sade ve modern bir tasarıma sahip. Rahat ve işlevsel yapısıyla günlük ve sportif aktiviteler için ideal.           Orijinallik ve Kalite Kontrolü:  Peony Collective’de her ürün uzmanlarımız tarafından incelemeden geçirilir. Buna ek olarak, kalite ve orijinallik açısından güvence sağlamak için Entrupy teknolojisi kullanılır. Bu gelişmiş doğrulama sistemi sayesinde, ürünün %100 orijinal olduğundan emin olabilir ve gönül rahatlığıyla alışveriş yapabilir', 6799, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/il-gufo-siyah-renk-14-beden-mont-977292.jpg?v=1735923465']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'The Kooples', 'The Kooples V Yaka Kazak Mor - S', 'Ürün Bilgisi   Renk: Mor  Beden: Small  Editör Notları: “The Kooples’ın imza dokusuyla öne çıkan bu mor kazak, yumuşak dokusu ve hacimli kollarıyla modern silueti yeniden yorumluyor. V-yakası zarif bir duruş sağlarken, fit oturan bel kısmı kusursuz bir form yaratıyor. Şehir şıklığını rahatlıkla buluşturan güçlü bir parça.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunu', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/the-kooples-mor-renk-s-beden-kazak-58beb7.jpg?v=1735923417']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Givenchy', 'Givenchy Kapüşonlu Çocuk Sweatshirt Siyah - 12 y', 'Açıklama Siyah koton kumaşı ve eskitilmiş görünümlü detayları ile dikkat çeken karakteristik bir stil sunar. Rahat kesimi sayesinde, günlük spor-şık kombinler için mükemmel bir tercihtir.     Öne Çıkan Özellikler     Tasarım: Eskitilmiş görünümlü detaylarla zenginleştirilmiş siyah koton kumaş.   Kesim: Rahat kesim, günlük kullanım için ideal.   Beden: 12.      Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy tekno', 1500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/givenchy-siyah-renk-12-beden-sweatshir-e6ccaf.jpg?v=1735923391']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Kanvas Waterfall Espadril Kırmızı - 38', 'Açıklama Louis Vuitton Waterfall espadril, şıklığı ve rahatlığı bir araya getiren bir tasarımdır. Parlak turuncu tonundaki kanvas malzemeden üretilen model, üzerine işlenmiş Louis Vuitton logosuyla dikkat çeker. Deri astar ve iç taban gün boyu konfor sağlarken, kauçuk dış taban ekstra dayanıklılık sunar.     Öne Çıkan Özellikler     Tasarım: Parlak turuncu kanvas ve işlemeli Louis Vuitton logosu.   Konfor: Deri astar ve iç taban.   Dayanıklılık: Kauçuk dış taban.   Numara: 38.      Orijinalli', 10500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louis-vuitton-kirmizi-renk-38-beden-es-be7bbc.jpg?v=1735923361']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balmain', 'Balmain Bermuda Şort Mavi - 36', 'Ürün Bilgisi    Renk: Mavi.  Beden: 36  Editör Notları:  Balmain’in güçlü ve modern siluet anlayışını yansıtan bu yüksek bel denim bermuda şort, zamansız jean dokusunu sofistike bir kesimle birleştirir. Açık mavi yıkamalı rengi ve diz üstünde biten boyu ile hem şehir stiline hem de yaz kombinlerine rahatlıkla uyum sağlar. Yapılı formu sayesinde vücut hatlarını dengeli gösterirken, günlük kullanımdan şık casual kombinlere kadar geniş bir kullanım alanı sunar. Minimal ama karakterli Balmain tasarı', 5500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balmain-mavi-renk-36-beden-bermuda-sor-3fd8ed.jpg?v=1735923347']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Roberto Cavalli', 'Roberto Cavalli Deri Ceket Siyah - 38', 'Ürün Bilgisi  Renk: Siyah Beden:38 Tasarım: Fermuar Kapama Kumaş İçeriği:Deri Eksper Notları:Yumuşak derinin doğal dokusu, kesik desenlerle birleşince hem modern hem de el işçiliğini hissettiren özel bir form ortaya çıkıyor. Bel hattını hafifçe vurgulayan kesimi sayesinde vücuda oturan şık bir siluet yaratıyor. Jean’le de, elbiseyle de stilinizi anında yükselten iddialı bir parça. Eksper Puanı:Ürünün tüm incelmesi tarafımızca yapılmıştır.Kondisyon Durumu 10/10  Orijinallik ve Kalite KontrolüPeon', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/roberto-cavalli-siyah-renk-38-beden-ce-5a5-4a.jpg?v=1735923332']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Prada', 'Prada Deri Topuklu Ayakkabı - 39', 'Ürün Bilgileri  Renk:Kahverengi Beden: 39 Editör Notları: Bu ayakkabı, zarif ve zamansız bir stile sahip ince topuklu bir sandalet modelidir. İnce ve yüksek topuğu bacak boyunu daha uzun gösterirken, sade tek bantlı ön kısmı ayağı zarifçe sarar ve feminen bir siluet yaratır. Bilekten ayarlanabilir bant detayı hem şık bir görünüm sunar hem de daha dengeli bir kullanım sağlar. Sıcak kahverengi tonu sayesinde elbiselerden takımlara kadar pek çok kombinle kolayca uyum sağlar; davetler, akşam yemekle', 7000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/prada-kahverengi-renk-39-beden-topuklu-4a75-b.jpg?v=1735923318']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Ralph Lauren', 'Ralph Lauren Çocuk Şişme Yelek / Pembe - 8-10y', 'Hafif ve şişme yapısıyla sıcak tutan toz pembe kız çocuk puffer yelek, günlük kullanıma uygun bir rahatlık sunar. Dik yakalı ve fermuarlı kapanışıyla hareket özgürlüğü ve soğuk havalarda ekstra koruma sağlar.       Orijinallik ve Kalite Kontrolü:  Peony Collective’de her ürün uzmanlarımız tarafından incelemeden geçirilir. Buna ek olarak, kalite ve orijinallik açısından güvence sağlamak için Entrupy teknolojisi kullanılır. Bu gelişmiş doğrulama sistemi sayesinde, ürünün %100 orijinal olduğundan e', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ralph-lauren-pembe-renk-810-yas-beden--3a-f55.jpg?v=1735923292']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Balenciaga', 'Balenciaga Lipstick Logo Hoodie Beyaz - L', '', 15500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/balenciaga-beyaz-renk-l-beden-sweatshi-e6-b44.jpg?v=1735923257']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Ayakkabı', 'Topuklu Ayakkabı', 'Giuseppe Zanotti', 'Giuseppe Zanotti Gail Deri Sneaker Beyaz - 43', '', 5500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/giuseppe-zanotti-beyaz-renk-43-beden-s-b8-bbb.jpg?v=1735923247']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Celine', 'Celine Klasik Loafer Siyah - 43', 'Ürün Bilgisi    Renk: Siyah  Numara: 43   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/celine-siyah-renk-43-beden-loafer-64405f.jpg?v=1735923221']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Escada', 'Escada Sport Payetli Bluz Siyah - 42', 'Ürün Bilgisi    Renk: Siyah  Beden: 42   Editör Notları:  Bu Escada bluz, markanın cesur ve feminen tasarım anlayışını yansıtan, dikkat çekici payet işlemeli grafik detayıyla öne çıkan bir modeldir. Siyah zemin üzerine yerleştirilen renkli payet aplikesi bluzu modern ve iddialı bir görünüme taşırken, uzun kollu ve rahat kesimi sayesinde hem gündüz hem akşam kombinlerinde konforlu bir kullanım sunar. Tek başına stilin odağı olan bu model, sade alt parçalarla tamamlandığında şık ve güçlü bir görün', 1500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-siyah-renk-42-beden-bluz-7546-4.jpg?v=1735923210']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Burberry', 'Burberry Truvakar Kol Bluz Gri - S', 'Açıklama  Truvakar kol Burberry bluz, zamansız bir şıklık sağlar.     Öne Çıkan Özellikler     Tasarım: Truvakar kol bluz.   Malzeme: İpek.   Renk: Gri.   Beden: S.      Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-gri-renk-s-beden-bluz-9b-4a2.jpg?v=1735923197', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-gri-renk-s-beden-bluz-c-6cb8.jpg?v=1735923197', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-gri-renk-s-beden-bluz-d66f5a.jpg?v=1735923197']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Ted Baker', 'Ted Baker Kürklü Deri Mont Haki - 36', 'Ürün Bilgisi   Renk: Haki  Beden: 36   Editör Notları : Bu parça, yumuşak deri dokusunu sıcak shearling detayla birleştiren, formu çok güzel oturan modern bir ceket. Bel hattını toparlayan dikey dikişleri silueti ince gösterirken, krem tonlarındaki iç kürk yakası tasarıma hem sıcaklık hem de daha karakterli bir hava katıyor.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik ga', 5000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ted-baker-haki-renk-36-beden-mont-7992-4.jpg?v=1735923174']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Louis Vuitton', 'Louis Vuitton Hockenheim Bileklik Kahverengi - Standart', 'Açıklama: Louis Vuitton Hockenheim erkek bilekliği, şık ve modern tasarımıyla dikkat çeker. Monogram desenli kanvas ve deri materyalin birleşimi, markanın zarif estetiğini yansıtır.     Öne Çıkan Detaylar:     Malzeme: Monogram desenli kanvas ve deri.   Süsleme: Gümüş tonlu logo detayı.   Kapanış: Pratik ve güvenli kullanım için çıtçıtlı kapanış.   Tasarım: Zamansız bir aksesuar olarak hem günlük hem özel kullanıma uygun.', 4500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/louis-vuitton-bileklik-4b-439.jpg?v=1735923134']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Stella Mccartney', 'Stella McCartney Tek Düğmeli Ceket Somon - 38', 'Açıklama: Minimal tasarımı ve zarif hatlarıyla modern bir stil sunuyor. Açık yaka detayı, şık ve sofistike bir görünüm yaratıyor.      Öne Çıkan Özellikler:     Tasarım: Tek düğme kapamalı, açık yaka detaylı, cepli.   Kesim: Relaxed fit, rahat ve şık bir silüet.   Renk: Nude tonlarında.   Malzeme: Yüksek kaliteli kumaş dokusuyla konforlu ve dayanıklı.', 3500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/stella-mccartney-ceket-38-2d5d2c.jpg?v=1735923118']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Michael Kors', 'Michael Kors Düğmeli Trençkot Bej - 36', 'Ürün Bilgisi   Beden: 36  Tasarım: Diz üstü uzunluk, düğmeli kapama ve sade yaka detayı.  Kumaş İçeriği: Yüksek kaliteli kumaş kullanımı.  Renk: Açık bej (camel tonlarında).  Eksper Notları:         Zamansız şıklığın en sade hâli. Michael Kors imzasını yansıtan bu bej kaban, temiz hatları ve rafine duruşuyla her gardırobun kurtarıcı parçası. Diz altına uzanan modern silueti, minimal düğme detayları ve yuvarlak yaka formuyla günlük şıklığı zahmetsizce tamamlar. Hafif dokusu sayesinde hem mevsim g', 2500, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/michael-kors-trenckot-36-9-646a.jpg?v=1735923108']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Emilio Pucci', 'Emilio Pucci Şal Desenli İpek Elbise Yeşil - 34', 'Ürün Bilgisi    Renk: Yeşil  Beden:  34   Editör Notları:Akdeniz renk paleti ve geometrik desenlerin canlı enerjisini yansıtan Emilio Pucci''nin 2017 Sonbahar/Kış koleksiyonunda, tazelik ve zarafet ön plandaydı. Bu yeşil ipek elbise, şık detaylarıyla zamansız bir stil sunuyor.   Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/emilio-pucci-elbise-34--28d8d.jpg?v=1735923071']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Blumarine', 'Blumarine Desenli Hırka Renkli - 38', 'Açıklama  Bluemarine hırka markanın zarif, modern ve şık tasarım anlayışını yansıtan bir parçadır, hem iç mekanlarda rahat bir kullanım hem de dış mekanlarda şık bir dış giyim alternatifi olarak idealdir.     Öne Çıkan Özellikler     Tasarım: Renkli ve desenli.   Malzeme: İpek.   Renk: Kırmızı, krem ağırlıklı.   Beden: 38.      Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantis', 2000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blumarine-hirka-38-21320e.jpg?v=1735923052', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blumarine-hirka-38--297c.jpg?v=1735923052', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blumarine-hirka-38-f20b46.jpg?v=1735923052', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blumarine-hirka-38-c4e47f.jpg?v=1735923052', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/blumarine-hirka-38-85ba-d.jpg?v=1735923052']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Kıyafet', 'Elbise', 'Etro', 'Etro Desenli Elbise Mavi - 44', 'Açıklama  Truvaka kollu, renkli desenli, midi elbise markanın zarif, modern ve şık tasarım anlayışını yansıtan bir parçadır.      Öne Çıkan Özellikler     Tasarım: Renkli ve desenli.   Malzeme: Viskos.   Renk: Mavi ağırlıklı.   Beden: 44.      Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/etro-elbise-44-02-d53.jpg?v=1735923036']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Jil Sander', 'Jil Sander Yüksek Bel Yün Etek Kahverengi - 34', 'Ürün Bilgisi   Tasarım: Yüksel bel etek.  Kıyafet İçeriği: Yün.  Renk:Kahverengi.  Beden: 34  Ölçü: Boy: 72 cm Bel: 36 cm  Eksper Notları: Renk bloklu yün karışımlı dokusu ve yüksek bel – kalem formu Marni’nin klasik imzasıyla birebir uyuşuyor.  Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz', 3000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/jil-sander-etek-34-95-b0f.jpg?v=1735923009']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Gucci', 'Gucci Yün Anvelop Etek Füme - 36', 'Ürün Bilgisi   Tasarım: Bel düğme detaylı.  Kumaş İçeriği: Yün.  Renk: Füme.  Beden: 36  Eksper Notları: Orta gri tonunda, yumuşak dokulu kumaştan tasarlanmış modern bir wrap etkili etek. Ön paneldeki örtüşen parça, klasik düz eteğe mimari bir hareket katarken; bel hattındaki hafif pile detayı eteğe doğal bir hacim kazandırıyor. Diz hizasına yakın uzunluğu ve sade silueti sayesinde hem ofis hem günlük stil için rahatlıkla kullanılabilecek, zamansız ve sofistike bir parça.  Eksper Puanları: Ürünü', 4000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-etek-36-e6902d.jpg?v=1735922998']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KADIN', 'Diğer', 'Diğer', 'Fabianna Filippi', 'Fabianna Filippi Yağmurluk Krem - 38', 'Ürün Bilgisi    Renk: Krem  Beden: 38  Orijinallik ve Kalite Kontrolü Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.', 11000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/fabianna-filippi-yagmurluk-38-144414.jpg?v=1735922889']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'KIZ ÇOCUK', 'Diğer', 'Diğer', 'Tyess', 'Tyess Çocuk Sweatshirt Si̇yah - 12 yaş', 'Lacivert viskos kumaş, bisiklet yaka, düz kesim, uzun kol, önde slogan detayları. Uzunluk 45 cm, bel 72 cm. %70 viskos ,%25 polyamid, %5 elastan.', 1000, 'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/kiz-cocuk-viskos-sweatshirt-5f6111.jpg?v=1735922846']::text[],
  ARRAY[]::text[],
  'approved'
);
