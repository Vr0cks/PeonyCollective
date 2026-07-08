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
  const { data: products, error } = await supabase
    .from('products')
    .select('id, brand, model_name, public_images, authenticity_docs, flaw_images');

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  let totalHeicPublic = 0;
  let totalHeicDocs = 0;
  let productsWithHeic = 0;

  for (const p of products || []) {
    let hasHeic = false;
    const publicHeic = (p.public_images || []).filter((img: string) => img.toLowerCase().endsWith('.heic')).length;
    const docsHeic = (p.authenticity_docs || []).filter((img: string) => img.toLowerCase().endsWith('.heic')).length;
    const flawsHeic = (p.flaw_images || []).filter((img: string) => img.toLowerCase().endsWith('.heic')).length;

    totalHeicPublic += publicHeic;
    totalHeicDocs += docsHeic + flawsHeic;

    if (publicHeic > 0 || docsHeic > 0 || flawsHeic > 0) {
      productsWithHeic++;
      console.log(`Product ID ${p.id} (${p.brand} ${p.model_name}) has HEIC files: ${publicHeic} public, ${docsHeic} docs, ${flawsHeic} flaws`);
    }
  }

  console.log(`\nAnalysis finished:`);
  console.log(`- Products with HEIC: ${productsWithHeic}`);
  console.log(`- Total public HEIC images: ${totalHeicPublic}`);
  console.log(`- Total private HEIC docs/flaws: ${totalHeicDocs}`);
}

main().catch(console.error);
