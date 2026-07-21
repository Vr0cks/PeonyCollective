import crypto from 'crypto'

// ENCRYPTION_KEY: IBAN, TCKN ve VKN gibi hassas verileri şifrelemek için kullanılır.
// Bu değişken .env.local ve Vercel environment'ında tanımlı olmalıdır.
// Tanımsızsa uygulama başlamaz — bu kasıtlı bir güvenlik önlemidir.
if (!process.env.ENCRYPTION_KEY) {
  throw new Error('[GÜVENLİK] ENCRYPTION_KEY ortam değişkeni tanımlı değil. .env.local dosyasına ekleyin.')
}
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string
const IV_LENGTH = 16

/**
 * Metni AES-256-CBC algoritması ile şifreler.
 * Çıktı formatı: iv_hex:encrypted_hex
 */
export function encrypt(text: string | null | undefined): string | null {
  if (!text) return null
  try {
    // Anahtarın tam 32 byte olmasını garanti etmek için sha256 hash'ini alıyoruz
    const key = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest()
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(text, 'utf8')
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString('hex') + ':' + encrypted.toString('hex')
  } catch (err) {
    console.error('Şifreleme hatası:', err)
    return text
  }
}

/**
 * AES-256-CBC ile şifrelenmiş metni çözer.
 * Eğer veri şifreli değilse (eski ham veriler) olduğu gibi döndürür.
 */
export function decrypt(text: string | null | undefined): string | null {
  if (!text) return null
  try {
    // Şifreli veri formatı iv:ciphertext şeklinde olmalı
    if (!text.includes(':')) {
      return text // Eski ham veri ise doğrudan dön
    }

    const key = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest()
    const textParts = text.split(':')
    const ivHex = textParts.shift()
    const encryptedHex = textParts.join(':')

    if (!ivHex || !encryptedHex) return text

    const iv = Buffer.from(ivHex, 'hex')
    const encryptedText = Buffer.from(encryptedHex, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString('utf8')
  } catch (err) {
    // Çözme başarısız olursa (örneğin anahtar değişti veya veri düz metindi) ham veriyi dön
    return text
  }
}
