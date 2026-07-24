import { createOtoOrder } from '../src/lib/oto';

// Mock environmental variables for testing
declare var process: any;
process.env.OTO_REFRESH_TOKEN = "AMf-vBxHK20I3MBHB_rvPvF0t2JsZwkKqYimB96T-rYW3F3BkrwoSzsBBIz9tqd8Px8K3V-1ohbY9W81m_8klI2htqe58d5a6T7qxelTrXfGL3rYbDK0pJZIW4px_u716gYi_FBzy7XQ6kCkzOdnR2ZBpyLO3ibRxYNrt1ATKOQic8uCYIUld2q1_jsxK60voieN31CJkCcGvTxfvfq6ztAYC2YpBHq7tQ";

async function run() {
  console.log("=== RUNNING OTO KARGO DIRECT INTEGRATION TEST ===");
  try {
    const result = await createOtoOrder({
      orderId: `TEST-${Date.now()}`,
      description: 'Test Luxury Handbag',
      weightGrams: 500,
      createShipment: true,
      senderInformation: {
        firstName: 'Peony',
        lastName: 'Collective',
        phone: '905554443322',
        address: 'Zorlu Center Levent Beşiktaş',
        city: 'İstanbul',
        country: 'TR',
        email: 'seller@peonycollective.com'
      },
      customerInformation: {
        firstName: 'John',
        lastName: 'Doe',
        phone: '905554443311',
        address: 'Huzur Mahallesi Sakin Sokak No 5',
        city: 'Ankara',
        country: 'TR',
        email: 'buyer@peonycollective.com'
      }
    });

    console.log("SUCCESS! OTO Kargo Order Created Successfully!");
    console.log("Result:", result);
  } catch (error: any) {
    console.error("Test failed:", error.message);
  }
}

run();
