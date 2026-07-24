import fs from 'fs';
import path from 'path';

// Load env from .env.local
try {
  const envPath = path.join(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);
      if (match) {
        let key = match[1];
        let val = match[2].trim();
        // Remove surrounding quotes
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    });
  }
} catch (e) {
  console.warn('Could not load .env.local', e);
}

const ENTRUPY_API_KEY = process.env.ENTRUPY_API_KEY;
const ENTRUPY_API_URL = process.env.ENTRUPY_API_URL || 'https://api.entrupy.com/v2';

async function testEntrupyConnection() {
  console.log('=== ENTRUPY API CONNECTION & AUTHENTICATION TEST ===');
  console.log('API URL:', ENTRUPY_API_URL);
  console.log('API Key Configured:', ENTRUPY_API_KEY ? 'Yes (starts with ' + ENTRUPY_API_KEY.substring(0, 5) + '...)' : 'No');

  if (!ENTRUPY_API_KEY) {
    console.error('Error: ENTRUPY_API_KEY is not defined in .env.local');
    return;
  }

  try {
    // We send a mock request to the authorize-user endpoint
    // Since this is a test from the backend with a mock authorization request,
    // we expect either success (if it accepts dummy data for user mapping) 
    // or a 400 Bad Request indicating the format of sdk_authorization_request is invalid.
    // An HTTP 401/403 means the API credentials are bad.
    const authorizeUrl = `${ENTRUPY_API_URL}/integrations/authorize-user`;
    const payload = {
      unique_user_id: 'peony_test_user_123',
      sdk_authorization_request: 'mock_sdk_request_payload_base64_data',
      email: 'yigit@peony-collective.com'
    };

    console.log('\nSending test request to Entrupy...');
    const response = await fetch(authorizeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${ENTRUPY_API_KEY}`,
        'Api-Version': '2.0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('Response Status:', response.status, response.statusText);
    const result = await response.json().catch(() => ({}));
    console.log('Response Body:', JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('\n[SUCCESS] Connected to Entrupy successfully! Authentication payload accepted.');
    } else if (response.status === 400) {
      console.log('\n[SUCCESS] Connected to Entrupy successfully! (400 Bad Request indicates API key is valid but the mock sdk_authorization_request string format is rejected, which is expected for dummy data).');
    } else {
      console.error('\n[FAILED] Entrupy connection failed or credentials rejected.');
    }

  } catch (error: any) {
    console.error('\n[ERROR] Connection error during Entrupy test:', error.message);
  }
}

testEntrupyConnection();
