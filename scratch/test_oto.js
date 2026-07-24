// Using global fetch (native in Node 18+)
process.env.OTO_REFRESH_TOKEN = "AMf-vBxHK20I3MBHB_rvPvF0t2JsZwkKqYimB96T-rYW3F3BkrwoSzsBBIz9tqd8Px8K3V-1ohbY9W81m_8klI2htqe58d5a6T7qxelTrXfGL3rYbDK0pJZIW4px_u716gYi_FBzy7XQ6kCkzOdnR2ZBpyLO3ibRxYNrt1ATKOQic8uCYIUld2q1_jsxK60voieN31CJkCcGvTxfvfq6ztAYC2YpBHq7tQ";

const OTO_BASE_URL = 'https://api.tryoto.com/rest/v2';

async function testOto() {
  console.log("=== OTO KARGO TEST SCRIPT ===");
  try {
    console.log("1. Fetching access token...");
    const response = await fetch(`${OTO_BASE_URL}/refreshToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: process.env.OTO_REFRESH_TOKEN }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`OTO Token Request Failed: ${response.status} - ${text}`);
    }

    const data = await response.json();
    console.log("Successfully fetched Access Token!");
    console.log("Token preview:", data.access_token.substring(0, 30) + "...");
    
    console.log("\n2. Trying to create a test order...");
    const orderResponse = await fetch(`${OTO_BASE_URL}/createOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.access_token}`
      },
      body: JSON.stringify({
        external_order_id: `TEST-${Date.now()}`,
        description: 'Test Luxury Handbag',
        weight: 500,
        createShipment: true,
        sender_info: {
          first_name: 'Peony',
          last_name: 'Collective',
          phone: '905554443322',
          address: 'Test Mahallesi Huzur Sokak No 1',
          city: 'Istanbul',
        },
        receiver_info: {
          first_name: 'John',
          last_name: 'Doe',
          phone: '905554443311',
          address: 'Test Mahallesi Mutlu Sokak No 2',
          city: 'Istanbul',
        }
      })
    });

    const orderData = await orderResponse.json();
    console.log("Order creation response:", orderData);
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testOto();
