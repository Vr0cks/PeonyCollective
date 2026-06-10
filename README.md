# Peony Collective

Merhaba, ben Yiğit. Bu repo, dolap mantığında çalışan, Next.js 15 ve Supabase
kullanarak geliştirdiğim ikinci el platformumuz Peony Collective'in ana kod
yapısını barındırıyor. İçerisinde veri modellemeleri, veritabanı operasyonları
ve PayTR gibi ödeme altyapıları mevcut. Proje tamamen modern web standartlarına
uygun olarak tasarlandı.

Eğer projeyi bilgisayarınızda çalıştırmak isterseniz aşağıdaki adımları takip
edebilirsiniz.

## Nasıl Kullanılır?

Projeyi çalıştırmak oldukça basit. Sadece aşağıdaki adımları uygulamanız
yeterli:

### 1. Repoyu Klonla ve Paketleri Kur

İlk olarak projeyi bilgisayarınıza indirin ve gerekli bağımlılıkları yükleyin.
Node.js'in güncel bir sürümünün (v18+) kurulu olduğundan emin olun.

```bash
# Bağımlılıkları yüklüyoruz
npm install
```

### 2. Çevre Değişkenlerini (Env Variables) Ayarla

Supabase bağlantısı için `.env.local` dosyasına ihtiyacınız var. Proje dizininde
`.env.local` adında bir dosya oluşturup içine Supabase URL ve Key'lerinizi
eklemelisiniz:

```env
NEXT_PUBLIC_SUPABASE_URL=senin_supabase_url_adresin_buraya
NEXT_PUBLIC_SUPABASE_ANON_KEY=senin_supabase_anon_key_buraya
```

Bu bilgileri Supabase kontrol panelinizdeki proje ayarlarından (Project Settings
> API) bulabilirsiniz.

### 3. Sunucuyu Başlat

Gerekli ayarları yaptıktan sonra geliştirme sunucusunu başlatabiliriz:

```bash
npm run dev
```

Sonrasında tarayıcınızdan `http://localhost:3000` adresine giderek projenin
çalıştığını görebilirsiniz. Değişiklik yaptığınızda sayfaya anında
yansıyacaktır.

## Proje Yapısı Hakkında

- **Next.js App Router**: Projenin temel mimarisi. Sayfa yapıları ve klasör
  düzeni (`src/app`) tamamen buna göre oluşturuldu.
- **Supabase (Auth & DB)**: Kullanıcı girişleri ve veri işlemleri için Supabase
  kullanıyoruz. Bütün veritabanı mantığı `src/utils/supabase` altında.
- **Middleware**: Güvenlik ve yetki kontrollerini `src/middleware.ts` üzerinden
  yönetiyoruz. Sadece yetkili kullanıcıların erişmesi gereken sayfaları bu
  dosyada kısıtladık.

Projeye katkıda bulunmak isterseniz PR'lara açığım. Kodlara göz atıp geliştirmek
istediğiniz noktaları ekleyebilirsiniz.
