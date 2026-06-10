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

  // Hash için birleştirilecek veri
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

  return postData
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
