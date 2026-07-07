import crypto from 'crypto'

interface PayTRTokenParams {
  userIp: string
  merchantOid: string
  email: string
  paymentAmount: number // Fiyat kuruş cinsinden (örn: 100 TL = 10000)
  userName: string
  userPhone: string
  userAddress: string
  itemName: string
  itemPrice: number // kuruş
  merchantOkUrl: string
  merchantFailUrl: string
  submerchantId?: string
  submerchantPrice?: number
}

export function createPaymentToken(params: PayTRTokenParams) {
  const merchantId = process.env.PAYTR_MERCHANT_ID || 'mock_merchant_id'
  const merchantKey = process.env.PAYTR_MERCHANT_KEY || 'mock_merchant_key'
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT || 'mock_merchant_salt'
  const testMode = process.env.PAYTR_SANDBOX === 'false' ? '0' : '1' // Default to sandbox/test mode

  const noInstallment = '0' // Taksit kısıtlaması (0: taksit yapılabilir, 1: tek çekim)
  const maxInstallment = '12' // Maksimum taksit sayısı
  const currency = 'TL'

  // Sepet formatı: [[ürün adı, birim fiyatı, adet]]
  const userBasket = Buffer.from(
    JSON.stringify([[params.itemName, (params.itemPrice / 100).toString(), 1]])
  ).toString('base64')

  // Eğer submerchant bilgisi varsa ekle, yoksa ekleme
  const hashString =
    merchantId +
    params.userIp +
    params.merchantOid +
    params.email +
    params.paymentAmount.toString() +
    userBasket +
    noInstallment +
    maxInstallment +
    currency +
    testMode

  // Token oluşturma (HMAC-SHA256)
  const token = crypto
    .createHmac('sha256', merchantKey)
    .update(hashString + merchantSalt)
    .digest('base64')

  const postData = {
    merchant_id: merchantId,
    user_ip: params.userIp,
    merchant_oid: params.merchantOid,
    email: params.email,
    payment_amount: params.paymentAmount,
    paytr_token: token,
    user_basket: userBasket,
    no_installment: noInstallment,
    max_installment: maxInstallment,
    user_name: params.userName,
    user_address: params.userAddress,
    user_phone: params.userPhone,
    merchant_ok_url: params.merchantOkUrl,
    merchant_fail_url: params.merchantFailUrl,
    currency,
    test_mode: testMode,
    debug_on: '1',
    timeout_limit: '30',
  }

  if (params.submerchantId && params.submerchantPrice) {
    ;(postData as any).non3d_test_failed = testMode === '1' ? '0' : '0';
    ;(postData as any).submerchant_id = params.submerchantId;
    ;(postData as any).submerchant_price = params.submerchantPrice.toString();
  }

  return postData
}

export interface PayTRSubmerchantParams {
  name: string
  address: string
  email: string
  iban: string
  tckn?: string
  vkn?: string
  companyTitle?: string
  taxOffice?: string
  submerchantType: 'bireysel' | 'kurumsal'
}

export async function addSubmerchant(params: PayTRSubmerchantParams) {
  const merchantId = process.env.PAYTR_MERCHANT_ID || 'mock_merchant_id'
  const merchantKey = process.env.PAYTR_MERCHANT_KEY || 'mock_merchant_key'
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT || 'mock_merchant_salt'
  const testMode = process.env.PAYTR_SANDBOX === 'false' ? '0' : '1'

  // Benzersiz alt işyeri kodu oluştur (1-100 karakter)
  const submerchantId = `peony_${Date.now()}_${Math.random().toString(36).substring(7)}`

  // Hash oluştur: merchant_id + email + merchant_salt
  const hashString = merchantId + params.email + merchantSalt
  const paytrToken = crypto
    .createHmac('sha256', merchantKey)
    .update(hashString)
    .digest('base64')

  const postData: any = {
    merchant_id: merchantId,
    paytr_token: paytrToken,
    submerchant_id: submerchantId,
    name: params.companyTitle || params.name,
    address: params.address,
    email: params.email,
    iban: params.iban.replace(/\s+/g, ''),
    has_clause: '1', // Sözleşme onaylandı
  }

  if (params.submerchantType === 'bireysel') {
    postData.identity_no = params.tckn || ''
  } else {
    postData.identity_no = params.tckn || params.vkn || ''
    postData.tax_number = params.vkn || ''
    postData.tax_office = params.taxOffice || 'Bilinmiyor'
    postData.company_title = params.companyTitle || ''
  }

  // Mock kontrolü
  if (merchantId === 'mock_merchant_id') {
    console.warn('[PAYTR] API key eksik, sahte Submerchant oluşturuluyor:', submerchantId)
    return { status: 'success', submerchant_id: submerchantId }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 saniye timeout

  let resultText = '';
  try {
    const response = await fetch('https://www.paytr.com/odeme/api/submerchant-add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(postData).toString(),
      signal: controller.signal,
    })

    clearTimeout(timeoutId);

    resultText = await response.text()
    
    const resultJson = JSON.parse(resultText)
    if (resultJson.status === 'success') {
      return { status: 'success', submerchant_id: submerchantId }
    } else {
      throw new Error(resultJson.err_msg || resultJson.reason || 'Bilinmeyen Hata')
    }
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error('[PAYTR SUBMERCHANT ERROR]', error);

    let errorMsg = error.message || 'Bilinmeyen Hata';
    if (error.name === 'AbortError') {
      errorMsg = 'PayTR API isteği zaman aşımına uğradı (Timeout - 8000ms)';
    } else if (error.code === 'ENOTFOUND' || error.message?.includes('fetch failed')) {
      errorMsg = 'İnternet veya DNS bağlantısı kurulamadı (Ağ hatası)';
    }

    try {
      const { createAdminClient } = await import('@/src/utils/supabase/admin');
      const supabase = createAdminClient();
      await supabase.from('system_logs').insert({
        level: 'error',
        source: 'paytr_submerchant',
        message: 'PayTR alt işyeri ekleme başarısız oldu',
        metadata: { error: errorMsg, submerchantId, apiResponse: resultText || null }
      });
    } catch (e) {}

    throw new Error(`PayTR Submerchant API Hatası: ${errorMsg}${resultText ? ` - API Yanıtı: ${resultText}` : ''}`)
  }
}

export interface PayTRCallbackParams {
  merchant_oid: string
  status: 'success' | 'failed'
  total_amount: string
  hash: string
  failed_reason_code?: string
  failed_reason_msg?: string
}

export function verifyCallback(params: PayTRCallbackParams): boolean {
  const merchantKey = process.env.PAYTR_MERCHANT_KEY || 'mock_merchant_key'
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT || 'mock_merchant_salt'

  const hashString =
    params.merchant_oid + merchantSalt + params.status + params.total_amount

  const expectedHash = crypto
    .createHmac('sha256', merchantKey)
    .update(hashString)
    .digest('base64')

  return expectedHash === params.hash
}
