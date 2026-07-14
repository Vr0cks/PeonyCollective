import crypto from 'crypto'

// Projenin ortam değişkenlerinde ENCRYPTION_KEY yoksa varsayılan güvenli bir anahtar kullanıyoruz.
// Canlıya çıkarken .env dosyasına en az 32 karakterlik rastgele bir anahtar ekleyebilirsiniz.
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'peony_secret_encryption_key_32_bytes_long_minimum!'
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
