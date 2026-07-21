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
  status: 'approved' | 'rejected'
  reason?: string
}

export async function sendProductStatusEmail({
  sellerEmail,
  sellerName,
  productName,
  status,
  reason
}: ProductStatusEmailProps) {
  
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY tanımlı değil. E-posta simüle edildi:', { sellerEmail, status, productName })
    return { success: true, simulated: true }
  }

  const title = status === 'approved' ? 'Ürününüz Onaylandı' : 'Ürününüz Reddedildi'
  const message = status === 'approved'
    ? `Tebrikler! <strong>${productName}</strong> ürününüz laboratuvar testlerinden başarıyla geçti ve platformumuzda satışa sunuldu.`
    : `Maalesef <strong>${productName}</strong> ürününüz kalite standartlarımızı karşılamadığı için reddedildi.`

  const entrupyOfferHtml = status === 'rejected' ? `
    <div style="margin-top: 24px; padding: 20px; background-color: #FBF9F5; border: 1px solid #E5D5C0; border-radius: 8px;">
      <p style="font-size: 11px; font-weight: bold; letter-spacing: 1.5px; color: #AF9164; text-transform: uppercase; margin: 0 0 8px 0;">✦ ALTERNATİF EKSPERTİZ SEÇENEĞİ</p>
      <h4 style="font-size: 15px; margin: 0 0 10px 0; color: #1A1A1A;">%99.6 Doğruluk Oranlı Entrupy Mikroskobik İnceleme</h4>
      <p style="font-size: 13px; line-height: 1.6; color: #555555; margin: 0 0 12px 0;">
        Ürününüzün orijinalliğinden emin misiniz? Çantanızı %99.6 doğruluk oranına ve finansal garantiye sahip, dünyanın 1 numaralı mikroskobik yapay zeka teknolojisi <strong>Entrupy</strong> ile fiziksel incelemeye tabi tutabiliriz.
      </p>
      <p style="font-size: 11.5px; line-height: 1.5; color: #8A6D3B; margin: 0 0 16px 0; padding: 8px 12px; background-color: rgba(175, 145, 100, 0.1); border-radius: 4px;">
        📍 <em>Özel sigortalı VIP kurye hizmetimiz şu an için sadece <strong>İstanbul içi</strong> geçerlidir.</em>
      </p>
      <a href="https://peony-collective.com/entrupy-request?product_name=${encodeURIComponent(productName)}" style="display: inline-block; background-color: #AF9164; color: #FFFFFF; text-decoration: none; padding: 12px 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; border-radius: 4px;">
        ENTRUPY İNCELEMESİ TALEP ET ✦
      </a>
    </div>
  ` : ''
  const reasonHtml = reason && status === 'rejected' ? `<p style="font-size: 14px; color: #DC2626; margin-top: 16px; padding: 12px; background-color: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 6px;"><strong>Red Nedeni:</strong> ${reason}</p>` : ''

  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #FAFAFA; color: #1A1A1A;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: normal; font-size: 32px; letter-spacing: 2px; margin: 0; color: #1A1A1A;">Peony Collective</h1>
      </div>
      
      <div style="background-color: #FFFFFF; padding: 40px; border: 1px solid #EAEAEA; border-radius: 8px;">
        <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: ${status === 'approved' ? '#059669' : '#DC2626'}; margin-bottom: 20px; font-weight: bold;">
          ${title}
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Sayın ${sellerName},</p>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          ${message}
        </p>
        
        ${reasonHtml}
        ${entrupyOfferHtml}

        <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #EAEAEA;">
          <a href="https://peony-collective.com/dashboard" style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; padding: 14px 24px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; border-radius: 4px;">
            Küratör Paneline Git
          </a>
        </div>
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
