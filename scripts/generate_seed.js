const fs = require('fs');

const rawData = fs.readFileSync('scraped_products.json', 'utf-8');
const { products } = JSON.parse(rawData);

let sql = `-- Shopify'dan Çekilen Ürünler
-- Bu kodu Supabase SQL Editor'a yapıştırıp RUN tuşuna basınız.

`;

products.forEach(p => {
  const brand = (p.vendor || 'Peony').replace(/'/g, "''");
  const modelName = (p.title || '').replace(/'/g, "''");
  
  let price = 0;
  if (p.variants && p.variants.length > 0) {
    price = parseFloat(p.variants[0].price || 0);
  }

  const category = (p.product_type || 'Diğer').replace(/'/g, "''");
  const description = (p.body_html || '').replace(/<[^>]*>?/gm, '').replace(/'/g, "''").substring(0, 500); 

  const images = (p.images || []).map(img => img.src);
  const imagesSql = `ARRAY[${images.map(url => `'${url}'`).join(', ')}]::text[]`;

  sql += `
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
  '${category}',
  '${category}',
  '${brand}',
  '${modelName}',
  '${description}',
  ${price},
  'Çok İyi',
  ${imagesSql},
  ARRAY[]::text[],
  'approved'
);
`;
});

fs.writeFileSync('seed_products.sql', sql);
console.log('SQL generated successfully in seed_products.sql');
