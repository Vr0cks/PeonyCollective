import fs from 'fs';
import path from 'path';

// Load .env.local manually
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const index = trimmed.indexOf('=');
      if (index === -1) return;
      let key = trimmed.substring(0, index).trim();
      let val = trimmed.substring(index + 1).trim();
      // Remove surrounding quotes if present
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    });
  }
}

loadEnv();

import { createAdminClient } from '../src/utils/supabase/admin';

async function main() {
  const supabase = createAdminClient();
  const { data: productsRaw, error } = await supabase
    .from('products')
    .select(`*, profiles:seller_id (first_name, last_name)`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  let emptyStringImages = 0;
  let noImagesButTruthy = 0;

  if (productsRaw) {
    for (const p of productsRaw) {
      if (p.public_images) {
        if (p.public_images.length > 0 && p.public_images.some((img: string) => img === "")) {
          emptyStringImages++;
          console.log(`Product ID ${p.id} has empty string in public_images:`, p.public_images);
        }
      }
    }
  }

  console.log(`\nCheck results:`);
  console.log(`- Products with empty string image URLs: ${emptyStringImages}`);
}

main().catch(console.error);
