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
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, role, first_name, last_name')
    .limit(5);

  if (error) {
    console.error('Error fetching profiles:', error);
    return;
  }

  console.log('Profiles in database:');
  console.log(JSON.stringify(profiles, null, 2));
}

main().catch(console.error);
