const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Manually parse env file
const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing environment variables in .env.local", { supabaseUrl, supabaseServiceKey });
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, brand, model_name, public_images, authenticity_docs, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error("Database query error:", error);
    return;
  }

  console.log("=== LATEST 5 PRODUCTS ===");
  products.forEach(p => {
    console.log(`\nProduct ID: ${p.id}`);
    console.log(`Name: ${p.brand} - ${p.model_name}`);
    console.log(`Created At: ${p.created_at}`);
    console.log(`Public Images:`, p.public_images);
    console.log(`Authenticity Docs (Hidden docs):`, p.authenticity_docs);
  });
}

check();
