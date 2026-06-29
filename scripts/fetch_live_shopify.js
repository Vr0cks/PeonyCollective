import fs from 'fs';
import https from 'https';

const url = 'https://peonycollective.com/products.json?limit=250';

async function run() {
  try {
    let allProducts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const pageUrl = `${url}&page=${page}`;
      const res = await fetch(pageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const json = await res.json();
      const products = json.products;
      
      if (products.length === 0) {
        hasMore = false;
      } else {
        allProducts = allProducts.concat(products);
        console.log(`Fetched page ${page} (${products.length} products)`);
        page++;
      }
    }
    
    let sql = `-- Live Shopify Seed Data\n`;
    sql += `-- Fetched at ${new Date().toISOString()}\n\n`;

    allProducts.forEach((p) => {
      let brand = p.vendor || 'Diğer';
      let productType = p.product_type || '';
      let category = 'Diğer';
      let subcategory = 'Diğer';
      
      productType = productType.toLowerCase();
      if (productType.includes('çanta') || productType.includes('bag')) { category = 'Çanta'; subcategory = 'Çanta'; }
      else if (productType.includes('ayakkabı') || productType.includes('sneaker') || productType.includes('topuklu')) { category = 'Ayakkabı'; subcategory = 'Topuklu Ayakkabı'; }
      else if (productType.includes('kıyafet') || productType.includes('bluz') || productType.includes('elbise')) { category = 'Kıyafet'; subcategory = 'Elbise'; }
      else if (productType.includes('aksesuar') || productType.includes('gözlük') || productType.includes('kemer') || productType.includes('eşarp')) { category = 'Aksesuar'; subcategory = 'Aksesuar'; }

      let gender = 'KADIN';
      const titleLower = p.title.toLowerCase();
      const tags = (p.tags || []).map(t => t.toLowerCase());
      
      if (titleLower.includes('erkek') || tags.includes('erkek') || tags.includes('men')) gender = 'ERKEK';
      if (titleLower.includes('kız çocuk') || tags.includes('kız çocuk') || tags.includes('girl')) gender = 'KIZ ÇOCUK';
      if (titleLower.includes('erkek çocuk') || tags.includes('erkek çocuk') || tags.includes('boy')) gender = 'ERKEK ÇOCUK';
      if (titleLower.includes('çocuk') && gender === 'KADIN') gender = 'KIZ ÇOCUK';

      let price = 0;
      if (p.variants && p.variants.length > 0) {
        price = parseFloat(p.variants[0].price);
      }

      let images = [];
      if (p.images && p.images.length > 0) {
        images = p.images.map(img => img.src);
      }

      // Escape function for SQL strings
      const escapeSql = (str) => {
        if (!str) return '';
        return str
          .replace(/[\0\x08\x09\x1a\n\r]/g, " ") // Replace newlines, tabs, and invisible chars with space
          .replace(/'/g, "''")                    // Escape single quotes for SQL
          .trim();
      };

      let desc = p.body_html ? p.body_html.replace(/(<([^>]+)>)/gi, "") : '';
      desc = escapeSql(desc.substring(0, 500));
      let modelName = escapeSql(p.title.substring(0, 200));
      let safeBrand = escapeSql(brand.substring(0, 100));
      
      if (price > 0 && images.length > 0) {
        sql += `
INSERT INTO products (
  seller_id, gender, category, subcategory, brand, model_name, description, price, condition, public_images, authenticity_docs, status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  '${gender}', '${category}', '${subcategory}', '${safeBrand}', '${modelName}', '${desc}', ${price}, 'Çok İyi',
  ARRAY[${images.map(i => `'${i}'`).join(', ')}]::text[],
  ARRAY[]::text[],
  'approved'
);\n`;
      }
    });

    fs.writeFileSync('seed_live_products.sql', sql);
    console.log('Successfully generated seed_live_products.sql with', allProducts.length, 'products total');

  } catch (e) {
    console.error('Error fetching/parsing:', e);
  }
}

run();
