import { Resend } from 'resend'

// Resend instance'ını oluştur
// API key yoksa hata fırlatmamak için fallback olarak 'dummy' koyabiliriz ama .env'ye eklenmesi şart.
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key')

interface OrderConfirmationProps {
  orderId: string
  buyerName: string
  buyerEmail: string
  totalAmount: number
  productName: string
  trackingNumber?: string
}

export async function sendOrderConfirmationEmail({
  orderId,
  buyerName,
  buyerEmail,
  totalAmount,
  productName,
  trackingNumber
}: OrderConfirmationProps) {
  
  // Eğer API key tanımlanmamışsa sadece log atalım ki testlerde hata fırlatmasın.
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY tanımlı değil. E-posta simüle edildi:', { buyerEmail, orderId, productName })
    return { success: true, simulated: true }
  }

  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-w-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #FAFAFA; color: #1A1A1A;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: normal; font-size: 32px; letter-spacing: 2px; margin: 0;">Peony Collective</h1>
      </div>
      
      <div style="background-color: #FFFFFF; padding: 40px; border: 1px solid #EAEAEA;">
        <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #AF9164; margin-bottom: 20px; font-weight: bold;">Siparişiniz Alındı</p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Sayın ${buyerName},</p>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
          Peony Collective'den yaptığınız alışveriş için teşekkür ederiz. <strong>${productName}</strong> siparişiniz başarıyla alınmış olup, Peony Lab uzmanları tarafından işleme alınmıştır.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #EAEAEA;">
            <td style="padding: 12px 0; color: #666;">Sipariş Numarası</td>
            <td style="padding: 12px 0; text-align: right; font-weight: bold;">${orderId}</td>
          </tr>
          <tr style="border-bottom: 1px solid #EAEAEA;">
            <td style="padding: 12px 0; color: #666;">Toplam Tutar</td>
            <td style="padding: 12px 0; text-align: right; font-weight: bold;">${totalAmount.toLocaleString('tr-TR')} ₺</td>
          </tr>
          ${trackingNumber ? `
          <tr style="border-bottom: 1px solid #EAEAEA;">
            <td style="padding: 12px 0; color: #666;">Kargo Takip Kodu</td>
            <td style="padding: 12px 0; text-align: right; font-weight: bold;">${trackingNumber}</td>
          </tr>
          ` : ''}
        </table>

        <p style="font-size: 14px; line-height: 1.6; color: #666; margin-bottom: 24px;">
          Siparişinizin anlık kargo durumunu sitemizdeki <a href="https://peony-collective.com/kargom-nerede" style="color: #AF9164; text-decoration: none;">Kargom Nerede</a> sayfasından takip edebilirsiniz.
        </p>
        
        <p style="font-size: 14px; line-height: 1.6; color: #666;">
          Saygılarımızla,<br/>
          Peony VIP Concierge
        </p>
      </div>

      <div style="text-align: center; margin-top: 32px; font-size: 10px; color: #999; letter-spacing: 1px; text-transform: uppercase;">
        © 2026 PEONY COLLECTIVE. TÜM HAKLARI SAKLIDIR.
      </div>
    </div>
  `

  try {
    const data = await resend.emails.send({
      from: 'Peony Concierge <concierge@peony-collective.com>', // Doğrulanmış domain olmalı
      to: [buyerEmail],
      subject: `Peony Sipariş Onayı: ${productName}`,
      html: emailHtml,
    })

    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

interface ProductStatusEmailProps {
  sellerEmail: string
  sellerName: string
  productName: string
  productId?: string
  status: 'approved' | 'rejected'
  reason?: string
  hasCompleteProfile?: boolean
}

export async function sendProductStatusEmail({
  sellerEmail,
  sellerName,
  productName,
  productId,
  status,
  reason,
  hasCompleteProfile
}: ProductStatusEmailProps) {
  
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY tanımlı değil. E-posta simüle edildi:', { sellerEmail, status, productName })
    return { success: true, simulated: true }
  }

  const title = status === 'approved' ? 'Ürününüz Onaylandı' : 'Ürününüz Reddedildi'
  const message = status === 'approved'
    ? `Tebrikler! <strong>${productName}</strong> ürününüz Peony Lab ön inceleme testlerinden başarıyla geçti ve platformumuzda satışa sunuldu.`
    : `Maalesef <strong>${productName}</strong> ürününüz Peony AI ön inceleme kontrolünü geçememiş ve reddedilmiştir.`

  const reasonHtml = reason && status === 'rejected' ? `
    <div style="margin-top: 20px; padding: 16px 20px; background-color: #FFF5F5; border-left: 4px solid #E53E3E; border-radius: 4px;">
      <p style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; color: #E53E3E; margin: 0 0 6px 0;">Red Gerekçesi</p>
      <p style="font-size: 14px; color: #2D3748; margin: 0; line-height: 1.5;">${reason}</p>
    </div>
  ` : ''

  const entrupyTargetUrl = `https://peony-collective.com/entrupy-request?product_id=${productId || ''}&product_name=${encodeURIComponent(productName)}`

  const entrupyOfferHtml = status === 'rejected' ? `
    <div style="margin-top: 28px; padding: 24px; background-color: #FAF7F2; border: 1px solid #E2D9CC; border-radius: 8px;">
      <div style="display: flex; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 10px; font-weight: bold; letter-spacing: 2px; color: #AF9164; text-transform: uppercase;">✦ ALTERNATİF EKSPERTİZ SEÇENEĞİ</span>
      </div>
      <h3 style="font-size: 16px; font-family: 'Times New Roman', serif; font-weight: 600; color: #1A1A1A; margin: 0 0 12px 0;">
        %99.6 Doğruluk Oranlı Entrupy Mikroskobik İnceleme
      </h3>
      <p style="font-size: 13.5px; line-height: 1.6; color: #4A5568; margin: 0 0 16px 0;">
        Ürününüzün orijinalliğinden emin misiniz? Çantanızı %99.6 doğruluk oranına ve finansal garantiye sahip, dünyanın 1 numaralı mikroskobik yapay zeka teknolojisi <strong>Entrupy</strong> ile fiziksel incelemeye tabi tutabiliriz.
      </p>
      
      <div style="margin-bottom: 16px;">
        <a href="${entrupyTargetUrl}" style="display: inline-block; background-color: #AF9164; color: #FFFFFF; text-decoration: none; padding: 14px 24px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; border-radius: 4px; box-shadow: 0 2px 4px rgba(175,145,100,0.2);">
          ${hasCompleteProfile ? 'ENTRUPY DOĞRULAMASI TALEP ET ✦' : 'İLETİŞİM BİLGİLERİNİ DOLDUR VE ENTRUPY TALEP ET ✦'}
        </a>
      </div>

      <div style="border-top: 1px solid #EAE2D5; padding-top: 12px; margin-top: 16px;">
        <p style="font-size: 11.5px; line-height: 1.5; color: #718096; margin: 0;">
          📍 <em>Kapıdan alma hizmetimiz olan <strong>Peony Courier</strong> (Özel sigortalı VIP kurye) sadece <strong>İstanbul içi</strong> geçerlidir.</em>
        </p>
      </div>
    </div>
  ` : ''

  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F7F7F7; color: #1A1A1A;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: normal; font-size: 34px; letter-spacing: 2px; margin: 0; color: #1A1A1A;">Peony Collective</h1>
        <p style="font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: #AF9164; margin-top: 6px; font-weight: bold;">LUXURY AUTHENTICATED MARKETPLACE</p>
      </div>
      
      <div style="background-color: #FFFFFF; padding: 40px; border: 1px solid #E2E8F0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
        <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: ${status === 'approved' ? '#059669' : '#E53E3E'}; margin-bottom: 20px; font-weight: bold;">
          ${title}
        </p>
        
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">Sayın ${sellerName},</p>
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px; color: #2D3748;">
          ${message}
        </p>
        
        ${reasonHtml}
        ${entrupyOfferHtml}

        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #EDF2F7; text-align: center;">
          <a href="https://peony-collective.com/dashboard" style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; padding: 12px 24px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; border-radius: 4px;">
            Küratör Paneline Git
          </a>
        </div>
      </div>

      <div style="text-align: center; margin-top: 32px; font-size: 11px; color: #A0AEC0; line-height: 1.6;">
        <p style="margin: 0;">📍 <em>Kapıdan alma hizmetimiz olan <strong>Peony Courier</strong> sadece İstanbul içidir.</em></p>
        <p style="margin-top: 8px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase;">© 2026 PEONY COLLECTIVE. TÜM HAKLARI SAKLIDIR.</p>
      </div>
    </div>
  `

  try {
    const data = await resend.emails.send({
      from: 'Peony Concierge <concierge@peony-collective.com>',
      to: [sellerEmail],
      subject: `Peony Lab Bildirimi: ${title}`,
      html: emailHtml,
    })

    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

interface EntrupyAdminNotificationProps {
  sellerName: string
  sellerEmail: string
  sellerPhone: string
  sellerAddress: string
  productName: string
  productId?: string
}

export async function sendEntrupyRequestAdminEmail({
  sellerName,
  sellerEmail,
  sellerPhone,
  sellerAddress,
  productName,
  productId
}: EntrupyAdminNotificationProps) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY tanımlı değil. Entrupy bildirimi simüle edildi:', { sellerName, productName })
    return { success: true, simulated: true }
  }

  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F7F7F7; color: #1A1A1A;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: normal; font-size: 30px; letter-spacing: 2px; margin: 0; color: #1A1A1A;">Peony Collective</h1>
        <p style="font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: #AF9164; margin-top: 6px; font-weight: bold;">ENTRUPY DOĞRULAMA TALEP BİLDİRİMİ</p>
      </div>

      <div style="background-color: #FFFFFF; padding: 36px; border: 1px solid #E2E8F0; border-radius: 8px;">
        <p style="font-size: 15px; line-height: 1.6; color: #2D3748; margin-bottom: 24px;">
          Müşterilerimizden <strong>${sellerName}</strong>, <strong>${productName}</strong> ürünü Peony AI kontrolünden geçememiştir. Kendisi Entrupy fiziki doğrulaması talep etmektedir.
        </p>

        <div style="background-color: #FAF7F2; border: 1px solid #E2D9CC; border-radius: 6px; padding: 20px; margin-top: 20px;">
          <h4 style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; color: #AF9164; margin: 0 0 16px 0;">MÜŞTERİ İLETİŞİM VE TESLİMAT BİLGİLERİ</h4>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr style="border-bottom: 1px solid #EAE2D5;">
              <td style="padding: 10px 0; color: #718096; width: 140px;">Müşteri Ad Soyad</td>
              <td style="padding: 10px 0; font-weight: bold; color: #1A1A1A;">${sellerName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE2D5;">
              <td style="padding: 10px 0; color: #718096;">E-posta Adresi</td>
              <td style="padding: 10px 0; font-weight: bold; color: #1A1A1A;"><a href="mailto:${sellerEmail}" style="color: #AF9164; text-decoration: none;">${sellerEmail}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE2D5;">
              <td style="padding: 10px 0; color: #718096;">Telefon Numarası</td>
              <td style="padding: 10px 0; font-weight: bold; color: #1A1A1A;"><a href="tel:${sellerPhone}" style="color: #AF9164; text-decoration: none;">${sellerPhone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE2D5;">
              <td style="padding: 10px 0; color: #718096;">Alım / Kurye Adresi</td>
              <td style="padding: 10px 0; font-weight: bold; color: #1A1A1A;">${sellerAddress}</td>
            </tr>
            ${productId ? `
            <tr>
              <td style="padding: 10px 0; color: #718096;">Ürün Detayı</td>
              <td style="padding: 10px 0; font-weight: bold; color: #1A1A1A;">${productName} (ID: ${productId})</td>
            </tr>
            ` : ''}
          </table>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #EDF2F7; font-size: 11.5px; color: #718096;">
          📍 <em>Kapıdan alma hizmetimiz olan <strong>Peony Courier</strong> (Özel sigortalı VIP kurye) sadece İstanbul içidir.</em>
        </div>
      </div>
    </div>
  `

  try {
    const data = await resend.emails.send({
      from: 'Peony Concierge <concierge@peony-collective.com>',
      to: ['rabiakacar86@gmail.com'],
      subject: `Entrupy Doğrulama Talebi: ${sellerName} - ${productName}`,
      html: emailHtml,
    })

    return { success: true, data }
  } catch (error) {
    console.error('Entrupy request admin notification failed:', error)
    return { success: false, error }
  }
}

export const sendProductApprovalStatusEmail = sendProductStatusEmail;

interface PasswordResetEmailProps {
  userEmail: string
  resetLink: string
}

export async function sendPasswordResetEmail({ userEmail, resetLink }: PasswordResetEmailProps) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY tanımlı değil. Şifre sıfırlama e-postası simüle edildi:', { userEmail, resetLink })
    return { success: true, simulated: true }
  }

  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #FAFAFA; color: #1A1A1A;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: normal; font-size: 32px; letter-spacing: 2px; margin: 0; color: #1A1A1A;">Peony Collective</h1>
      </div>
      
      <div style="background-color: #FFFFFF; padding: 40px; border: 1px solid #EAEAEA; border-radius: 8px;">
        <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: #AF9164; margin-bottom: 16px; font-weight: bold;">
          Şifre Yenileme Talebi
        </p>
        
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">Merhaba,</p>
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 28px; color: #4A4A4A;">
          Peony Collective hesabınız için şifre sıfırlama talebinde bulundunuz. Aşağıdaki butona tıklayarak yeni şifrenizi güvenle belirleyebilirsiniz.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetLink}" style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; padding: 16px 32px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; border-radius: 4px;">
            ŞİFREMİ YENİLE ✦
          </a>
        </div>

        <p style="font-size: 12px; color: #888888; line-height: 1.5; margin-top: 30px;">
          Bu talebi siz yapmadıysanız bu e-postayı dikkate almayabilirsiniz. Bağlantı 24 saat geçerlidir.
        </p>
      </div>
    </div>
  `

  try {
    const data = await resend.emails.send({
      from: 'Peony Security <security@peony-collective.com>',
      to: [userEmail],
      subject: 'Peony Collective — Şifre Yenileme Bağlantısı',
      html: emailHtml,
    })

    return { success: true, data }
  } catch (error) {
    console.error('Password reset email sending failed:', error)
    return { success: false, error }
  }
}

interface EntrupyAppointmentEmailProps {
  customerName: string
  customerEmail: string
  phone?: string
  address?: string
  productName?: string
  isLoggedIn: boolean
}

export async function sendEntrupyAppointmentEmail({
  customerName,
  customerEmail,
  phone,
  address,
  productName,
  isLoggedIn
}: EntrupyAppointmentEmailProps) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY tanımlı değil. Entrupy randevu e-postası simüle edildi:', { customerName, customerEmail, productName })
    return { success: true, simulated: true }
  }

  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #FAFAFA; color: #1A1A1A;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: normal; font-size: 28px; letter-spacing: 2px; margin: 0; color: #1A1A1A;">Peony Collective</h1>
        <p style="font-size: 11px; letter-spacing: 3px; color: #AF9164; text-transform: uppercase; margin-top: 6px;">VIP Entrupy Ekspertiz Bildirimi</p>
      </div>
      
      <div style="background-color: #FFFFFF; padding: 32px; border: 1px solid #EAEAEA; border-radius: 8px;">
        <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #AF9164; margin-bottom: 16px; font-weight: bold;">
          ✦ %99.6 ENTRUPY MİKROSKOBİK EKSPERTİZ TALEBİ
        </p>
        
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 24px; color: #333333;">
          Sayın Yetkili, <strong>${customerName}</strong> adlı müşterimiz (${isLoggedIn ? 'Kayıtlı Kullanıcı' : 'Ziyaretçi Formu'}) İstanbul içi VIP kuryeli Entrupy mikroskobik doğrulama talebinde bulunmuştur.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
          <tr style="border-bottom: 1px solid #F0F0F0;">
            <td style="padding: 10px 0; color: #777;">Müşteri Adı Soyadı</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #1A1A1A;">${customerName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F0F0F0;">
            <td style="padding: 10px 0; color: #777;">E-Posta Adresi</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #1A1A1A;">${customerEmail}</td>
          </tr>
          ${phone ? `
          <tr style="border-bottom: 1px solid #F0F0F0;">
            <td style="padding: 10px 0; color: #777;">Telefon Numarası</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #1A1A1A;">${phone}</td>
          </tr>
          ` : ''}
          ${productName ? `
          <tr style="border-bottom: 1px solid #F0F0F0;">
            <td style="padding: 10px 0; color: #777;">İncelenecek Ürün</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #AF9164;">${productName}</td>
          </tr>
          ` : ''}
          ${address ? `
          <tr style="border-bottom: 1px solid #F0F0F0;">
            <td style="padding: 10px 0; color: #777;">İstanbul VIP Kurye Adresi</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #1A1A1A;">${address}</td>
          </tr>
          ` : ''}
        </table>

        <div style="padding: 12px 16px; background-color: #FBF9F5; border-left: 3px solid #AF9164; font-size: 12px; color: #666666;">
          📍 <em>Not: VIP kurye ekibimizin en kısa sürede müşteriyle iletişime geçip İstanbul içi teslim alma saatini teyit etmesi gerekmektedir.</em>
        </div>
      </div>
    </div>
  `

  try {
    const data = await resend.emails.send({
      from: 'Peony Concierge <concierge@peony-collective.com>',
      to: ['info@peony-collective.com'],
      subject: `[Entrupy VIP Randevusu] ${customerName} — ${productName || 'Lüks Çanta'}`,
      html: emailHtml,
    })

    return { success: true, data }
  } catch (error) {
    console.error('Entrupy appointment email sending failed:', error)
    return { success: false, error }
  }
}
