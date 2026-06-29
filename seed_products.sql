-- Shopify'dan Çekilen Ürünler
-- Bu kodu Supabase SQL Editor'a yapıştırıp RUN tuşuna basınız.


INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Sneaker',
  'Sneaker',
  'Salvatore Ferragamo',
  'Salvatore Ferragamo Sneaker - 40.5',
  '',
  5000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferragamo-1_733797ae-43bb-4f7b-87bb-75780f61c7d6.jpg?v=1782460209', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferragamo-2_a9a5c45c-2fb8-4182-a34f-3d4bb0a4bb5a.jpg?v=1782460196', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferragamo-3_9499898a-db0a-4849-8514-f0e761729dd6.jpg?v=1782460209', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ferragamo-4.jpg?v=1782460209']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Topuklu Ayakkabı',
  'Topuklu Ayakkabı',
  'Sergio Rossi',
  'Sergio Rossi Topuklu Ayakkabı 39.5',
  '',
  3000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi-1_231b583d-4a2d-4377-8ca5-6aae5e0946c7.jpg?v=1781608808', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi-2_412221a9-e288-41c6-a418-e08948729c5f.jpg?v=1781608846', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/rossi-3_ac1f2464-fd89-4224-bdd3-f6e25b36608c.jpg?v=1781608847']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Çanta',
  'Çanta',
  'Bottega Veneta',
  'Bottega Veneta Andiamo Süet Small',
  'Ürün Bilgisi 


Materyal: Süet


Boyut: Small

Renk: Yeşil

Editör Notları: 
Bottega Veneta Andiamo, markanın ikonik intrecciato örgü işçiliğini modern çizgilerle buluşturan zamansız bir tasarımdır. Süet deri dokusu ve altın tonlu düğüm detayıyla öne çıkan bu model, elde veya omuzda taşınabilen kullanışlı yapısıyla günlük kullanımdan özel davetlere kadar geniş bir kullanım alanı sunar. Haki tonunun doğal ve sofistike görünümü, çantaya dikkat çekici fakat abartısız bir duruş kazandırır.


Orijina',
  163000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/andiamo1.png?v=1781523780', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/andiamo2.png?v=1781523572', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/andiamo4.png?v=1781523575', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/andiamo3.png?v=1781523577', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_4094.jpg?v=1781523572']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Topuklu Ayakkabı',
  'Topuklu Ayakkabı',
  'Casadei',
  'Casadei Topuklu Ayakkabı Kırmızı - 39',
  'Ürün Bilgisi 


Renk: Kırmızı 

Numara: 39

Kusur Açıklaması: Sol çiftinin üstünde bir dikiş hatası mevcut.

Orijinallik ve Kalite Kontrolü
Peony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.',
  5000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/casadei-1.jpg?v=1781511977', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/casadei-2.jpg?v=1781511978', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/casadei-3.jpg?v=1781511977', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/casadei-4.jpg?v=1781511977']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Bluz',
  'Bluz',
  'Alice And Olivia',
  'Alice + Olivia Bluz Mavi - Xs',
  'AçıklamaKayık yaka, dantel detaylı Alice + Olivia bluz, zamansız bir şıklık ve farklı bir görünüm sağlar.
 
Öne Çıkan Özellikler


Tasarım: Dantel detaylı.

Malzeme: Polyester.

Renk: Mavi.

Beden: Xs. 

Ölçü: En:42 cm Koldan Boy: 55 cm


 
Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.',
  2000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alice-olivia-bluz-on.jpg?v=1753709871', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/alice-olivia-bluz-yan.jpg?v=1753709871']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Diğer',
  'Diğer',
  'Hermes',
  'Hermes Steve Light Junior Çanta',
  'Ürün Bilgisi 


Editör Notları: 
Hermès Sac Steve Junior, markanın işlevselliği zarafetle buluşturan ikonik evrak ve omuz çantalarından biridir. Yumuşak ve dayanıklı deri yapısı, geniş iç hacmi ve sade tasarımıyla günlük kullanım, iş hayatı ve seyahatlerde konforlu bir kullanım sunar. Ayarlanabilir omuz askısı sayesinde çapraz veya omuzda taşınabilen model, Hermès’in kusursuz deri işçiliğini ve zamansız stil anlayışını yansıtır. Minimal görünümü, kaliteli materyalleri ve fonksiyonel yapısıyla uz',
  217000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-4_9f33985c-a7ad-4195-9e25-1ac2576bf277.jpg?v=1780902729', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-5_df82a525-1dc8-4322-ad92-66a745dafc74.jpg?v=1780902729', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-6_bd9aaae1-3369-4c36-920c-f83920680749.jpg?v=1780902729', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes2.jpg?v=1780902729', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-3_711c37e4-b86d-438b-b6df-4eeadfa34d91.jpg?v=1780902729', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hermes-7.jpg?v=1780902729']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Çanta',
  'Çanta',
  'Christian Dior',
  'Christian Dior Oblique Lock Çanta',
  'Ürün Bilgisi 


Ölçü: 12 x 8 x 3 cm


Renk: Lacivert

Editör Notları: 
Bu Dior çanta, markanın ikonik Oblique jacquard desenini siyah deri detaylarla bir araya getiren kompakt ve zarif bir tasarıma sahiptir. Ön yüzündeki metal kilit detayı modern bir görünüm sunarken, ayarlanabilir askısı sayesinde omuzda veya çapraz kullanılabilir. Günlük kullanım için ideal boyuta sahip olan bu model, telefon, kartlık ve küçük kişisel eşyaları rahatlıkla taşırken kombinlere sofistike bir dokunuş katar. Laciver',
  35000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior4_6e01c5d6-c9ee-461d-a1a0-8d6079d799e8.jpg?v=1780900693', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior2_9b1331ab-d6b1-42aa-95a5-89d61f118a9d.jpg?v=1780899867', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/dior3_b92b1ad1-72fe-4a41-8e27-fa39c4fc7d21.jpg?v=1780899934']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Clutch',
  'Clutch',
  'Proenza Schouler',
  'Proenza Schouler Clutch',
  '',
  3000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ChatGPTImage3Haz202616_04_42.png?v=1780491892', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ChatGPT_Image_3_Haz_2026_16_07_24.png?v=1780492056', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/ChatGPT_Image_3_Haz_2026_16_05_46.png?v=1780491957']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Gözlük',
  'Gözlük',
  'Bvlgari',
  'Bvlgari Güneş Gözlüğü',
  '',
  8000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bvlgari-3.jpg?v=1779441036', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bvlgari-2.jpg?v=1779441036', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bvlgari-1.jpg?v=1779441036', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bvlgari-4.jpg?v=1779441037', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/bvlgari-5.jpg?v=1779441036']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Topuklu Ayakkabı',
  'Topuklu Ayakkabı',
  'Gucci',
  'Gucci Topuklu Ayakkabı - 38',
  '',
  6000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-ayakkabi-1.jpg?v=1779283688', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-ayakkabi-2.jpg?v=1779283688', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-ayakkabi-3.jpg?v=1779283688']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Gözlük',
  'Gözlük',
  'Gucci',
  'Gucci Güneş Gözlüğü',
  '',
  10000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gozluk-1.jpg?v=1779283459', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gozluk-4.jpg?v=1779283458', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gozluk-3.jpg?v=1779283458', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gozluk-2.jpg?v=1779283458', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gozluk-5.jpg?v=1779283458']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Bluz',
  'Bluz',
  'Gucci',
  'Gucci Bluz - S',
  'Öne Çıkan Özellikler


Malzeme: %100 Koton.

Renk: Kahverengi.

Beden: S.

Boy:60 cm 


Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.',
  3000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-3_63808d14-4bc8-4a26-aab6-e67361bc0c1b.jpg?v=1779282948', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-1_2ef6a0ce-8b38-4f6f-9712-33a38d017744.jpg?v=1779282960', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/gucci-2_5627c82a-1f2a-44d9-9ea5-32fd3c214d32.jpg?v=1779282948']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Bluz',
  'Bluz',
  'Isabel Marant',
  'Isabel Marant Bluz - 40',
  'Öne Çıkan Özellikler


Malzeme: %100 Koton.

Beden: 40.

Boy:70 cm 


Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.',
  2000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/isabel-marant-1.jpg?v=1779281505', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/isabel-marant-2.jpg?v=1779281505']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Elbise',
  'Elbise',
  'Carmen Marc Valvo',
  'Carmen Marc Valvo Elbise - S',
  '',
  10000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/carmen-1.jpg?v=1779280707', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/carmen-2.jpg?v=1779280707', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/carmen-3.jpg?v=1779280710', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/carmen-4.jpg?v=1779280707']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Elbise',
  'Elbise',
  'Burberry',
  'Burberry Elbise - 42',
  '',
  6000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-1_61091938-50eb-4b96-84e5-5d18d625e716.jpg?v=1779279717', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-2_4406c453-0b4b-48fd-b3e0-3239dc8fe2e5.jpg?v=1779279717', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-3_aaad9171-7d41-4bfd-928d-e1159168363f.jpg?v=1779279717', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-4_8a9266be-8460-4b0c-9a90-87e8c8b37b26.jpg?v=1779279717']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Etek',
  'Etek',
  'Escada',
  'Escada Etek Lacivert - 42',
  'Öne Çıkan Özellikler


Malzeme: %100 Koton.

Renk: Lacivert.

Beden: 42.

Ölçü:Bel:40 cm Boy:68 cm

Orijinallik ve Kalite KontrolüPeony Collective’de tüm ürünler, uzmanlarımız tarafından detaylı bir şekilde incelenir ve Entrupy teknolojisi ile %100 orijinallik garantisi sunulur. Güvenle alışveriş yapabilirsiniz.',
  4000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-1_3d64959a-8ac5-4266-b94a-f855a74fcd39.jpg?v=1779278679', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-2_484284ba-4a26-4351-bc6b-682e52b10648.jpg?v=1779278679', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/escada-3_c9c8f8b3-41ac-4fc8-b9dc-dfccf4118fa5.jpg?v=1779278679']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Bluz',
  'Bluz',
  'Philosophy Di Lorenzo Serafini',
  'Philosophy Di Lorenzo Serafini Bluz - M',
  '',
  3500,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/philosophy-1.jpg?v=1779277472', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/philosophy-2.jpg?v=1779277472', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/philosophy-3.jpg?v=1779277472', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/philosophy-4.jpg?v=1779277472']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Elbise',
  'Elbise',
  'Maje',
  'Maje Elbise - 1',
  '




Ürün Bilgisi 


Renk: Siyah


Beden: 1

Ürün İçeriği: Dış Kumaş %100 Polyester - İç Kumaş %100 Viskos - Kurdele %100 Poliamid


Ölçü: Boy 85 cm En 43 cm
Editör Notları: 
Bu Maje elbise, markanın feminen ve modern Paris stilini yansıtan zarif bir tasarımdır. Hafif transparan görünümlü dokulu kumaşı elbiseye sofistike bir hareket kazandırırken, akışkan yapısı sayesinde vücutta zarif bir duruş sağlar. Hakim yaka detayı ve metal görünümlü düğmeleri klasik bir şıklık sunarken, bel kısmındaki haf',
  5750,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maje-elbise-1.jpg?v=1778486070', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maje-elbise-2.jpg?v=1778486070', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/maje-elbise-3.jpg?v=1778486070', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/IMG_3415.jpg?v=1778486070']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Çanta',
  'Çanta',
  'Escada',
  'Escada Krem Çanta',
  '',
  8000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071601_12bd1b80-8de6-4747-adc6-1068c961a2d2.png?v=1778483987', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071601_f924d9df-a636-45ba-9409-73e7fc0051bc.png?v=1778484004', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071601_9eecc7e4-7f39-4c8a-badc-4d8119ea13a8.png?v=1778484025']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Çanta',
  'Çanta',
  'Escada',
  'Escada Mavi Çanta',
  '',
  5000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071039_1a3fd38d-952f-4075-9abf-e7136d2e0998.png?v=1778483618', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071039_811f4292-6c1c-468a-9d66-6c629ab1d913.png?v=1778483689', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_071039_d8a558c6-d031-4cbe-be13-7a9d941d6f94.png?v=1778483662']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Sneaker',
  'Sneaker',
  'Ermenegildo Zegna',
  'Ermenegildo Zegna Lacivert Sneaker - 42',
  '',
  14500,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212554_aba24248-64f8-43a9-8f42-dd22e1e57562.png?v=1778448796', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212554_3987e945-8367-4b5c-9ec3-50aeecf47d78.png?v=1778448704', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212554_af2bc87d-2bf9-41ea-b38e-a16541438dbd.png?v=1778448773']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Sneaker',
  'Sneaker',
  'Ermenegildo Zegna',
  'Ermenegildo Zegna Beyaz Sneaker - 42',
  '',
  11000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212749_911c5ef5-64ca-40e1-82e9-5c8377485974.png?v=1778449025', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212749_09e7b266-346e-45a8-8a7a-acb01c06f3c1.png?v=1778449116', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212749_5d6e7177-85ed-47c8-94a3-7f5aa049e31b.png?v=1778449144', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_212749_01a11442-e602-4cb6-955a-f38055769f9d.png?v=1778449175']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Sneaker',
  'Sneaker',
  'Giuseppe Zanotti',
  'Giuseppe Zanotti Frankie Crocodile Effect Sneaker - 42',
  '',
  9250,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_213808_89bf9565-60e4-4797-9044-701af858b64e.png?v=1778449623', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_213808_0fc671b8-da16-4ec4-aad1-31b23c686f7a.png?v=1778449543', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_213808_5c18c403-197c-44db-a02d-48501ece66ff.png?v=1778449573', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_213808_98367f95-47a3-4309-baf7-8b462061673c.png?v=1778449601']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Sneaker',
  'Sneaker',
  'Valentino',
  'Valentino Garavani Renkli Sneaker - 41',
  '',
  6000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215109_88a9aa80-b566-475f-8c93-34e091304dcd.png?v=1778475051', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215109_01b7d13c-5782-438b-b165-2a97bee50731.png?v=1778475080', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215109_c1d24b3c-adfb-45d7-9eec-49ae4534e723.png?v=1778475105', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215109_c108403d-caf4-4e40-88aa-cb7f7d24e35b.png?v=1778475131']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Sneaker',
  'Sneaker',
  'Prada',
  'Prada Sneaker Siyah - 41',
  '',
  8500,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215457_60171606-0f5f-46ba-aba0-cbda0c59b470.png?v=1778475388', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215457_fcd113a0-e09c-4592-98cb-728051967bd9.png?v=1778475411', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215457_9fdef6a5-3597-44b9-a5bc-5dc69892cda8.png?v=1778475439']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Sneaker',
  'Sneaker',
  'Prada',
  'Prada Sneaker Lacivert - 41',
  '',
  11000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215727_32b16e4b-7f3a-4327-9812-e4e3ddb74b94.png?v=1778475629', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215727_a89cb0b0-a031-40c0-a4ff-4a39a6a9a26c.png?v=1778475655', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215727_b65845ef-ae2c-41e9-a3e1-3bcd010b9df3.png?v=1778475681']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Sneaker',
  'Sneaker',
  'Prada',
  'Prada Sneaker Lacivert - Gri - Beyaz 41',
  '',
  17000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215915_36251595-9231-47b0-b859-78f227609e6d.png?v=1778475937', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215915_13d7a21e-46f3-4656-a70a-c9ffbc45aec9.png?v=1778475974', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215915_10bacbd4-d78f-4111-a926-7b4351860597.png?v=1778476016', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_215915_858b76c1-0ac3-4146-953d-155fc6de9413.png?v=1778476037']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Sneaker',
  'Sneaker',
  'Axel Arigato',
  'Axel Arigato Marathon R-Trail Sneaker - 42',
  '',
  6000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_220010_c7b29f0d-cf99-4bf2-9e3a-1bfbb34434c4.png?v=1778476228', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_220010_eb835895-27f1-4666-bc1d-0a7ee42b1c9d.png?v=1778476248', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_220010_ce763a42-e3e4-4c85-8a07-1e5e1ee198fa.png?v=1778476266', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260510_220010_0184ec59-842b-41a4-ae4f-f2ee5720ce2d.png?v=1778476301']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Çanta',
  'Çanta',
  'Chanel',
  'Chanel 25 Mini Çanta',
  '













Ürün Bilgisi 


Renk: Siyah


Durum: Sıfır - Full Set - Faturalı

Editör Notları: 
Bu model, Chanel’ın son dönemde öne çıkan tasarımlarından biri olan Chanel 25 modelidir. İkonik kapitone deri yapıyı daha modern ve relaxed bir siluetle yorumlayan bu çanta, geniş hacmi ve büzgülü yapısıyla günlük kullanımda yüksek konfor sunar. Kalın gold zincir askı detayları ve CC charm aksesuarı tasarıma güçlü bir karakter kazandırırken, klasik Chanel estetiğini daha çağdaş bir formda yansıtır. Ö',
  352000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_061537_64feec75-a398-43c3-87cf-b2bed25f3827.png?v=1778480399', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_061626_fa8a867a-7a2d-4c90-b2cf-c59b0a3a0075.png?v=1778480399', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/hf_20260511_061729_21f91756-fbce-486b-aaaa-ffb7aa81d6b8.png?v=1778480399']::text[],
  ARRAY[]::text[],
  'approved'
);

INSERT INTO products (
  seller_id,
  gender,
  category,
  subcategory,
  brand,
  model_name,
  description,
  price,
  condition,
  public_images,
  authenticity_docs,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- İlk bulduğu kullanıcıyı satıcı yapar
  'KADIN',
  'Trençkot',
  'Trençkot',
  'Burberry',
  'Burberry Trençkot Mavi - M',
  '',
  16000,
  'Çok İyi',
  ARRAY['https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-1.jpg?v=1777899648', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-2.jpg?v=1777899648', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-3.jpg?v=1777899648', 'https://cdn.shopify.com/s/files/1/0572/4097/7480/files/burberry-4.jpg?v=1777899648']::text[],
  ARRAY[]::text[],
  'approved'
);
