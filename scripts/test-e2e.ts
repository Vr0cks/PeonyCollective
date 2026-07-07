import fs from 'fs';
import path from 'path';

// --- MOCK DATABASE STATE ---
interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  total_price_kurus: number; // Recommendation 3: Standardize to kuruş
  commission_amount_kurus: number;
  seller_amount_kurus: number;
  status: 'pending_payment' | 'paid' | 'verifying' | 'verified' | 'shipped' | 'delivered' | 'completed' | 'cancelled' | 'refunded';
  shipping_tracking_buyer?: string;
  payment_id?: string;
  entrupy_id?: string;
  entrupy_status?: 'pending' | 'analyzing' | 'verified' | 'rejected';
}

interface Product {
  id: string;
  seller_id: string;
  brand: string;
  model_name: string;
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  is_peony_vip: boolean;
}

const mockDatabase = {
  orders: [] as Order[],
  products: [] as Product[],
  logs: [] as { level: string; source: string; message: string; timestamp: Date }[],
  
  log(level: string, source: string, message: string) {
    this.logs.push({ level, source, message, timestamp: new Date() });
    const colors = {
      info: '\x1b[36m[INFO]\x1b[0m',
      warn: '\x1b[33m[WARN]\x1b[0m',
      error: '\x1b[31m[ERROR]\x1b[0m',
      success: '\x1b[32m[SUCCESS]\x1b[0m'
    };
    console.log(`${(colors as any)[level] || `[${level.toUpperCase()}]`} [${source}] ${message}`);
  }
};

// --- E2E PROCESS COORDINATOR (STATE MACHINE) ---
class OrderCoordinator {
  // Recommendation 2: Idempotency & State Checks
  static async handlePaymentSuccess(orderId: string, paymentOid: string, totalAmountKurus: number) {
    mockDatabase.log('info', 'PAYTR_CALLBACK', `Ödeme başarılı bildirimi alındı. Sipariş: ${orderId}, Tutar: ${totalAmountKurus / 100} TL`);

    const order = mockDatabase.orders.find(o => o.id === orderId);
    if (!order) {
      mockDatabase.log('error', 'PAYTR_CALLBACK', `Sipariş bulunamadı: ${orderId}`);
      return { success: false, reason: 'Sipariş bulunamadı' };
    }

    // Idempotency kontrolü: Zaten ödenmiş veya sonraki aşamada ise tekrarlama
    if (order.status !== 'pending_payment') {
      mockDatabase.log('warn', 'PAYTR_CALLBACK', `Sipariş zaten işlenmiş. Güncel durum: ${order.status}. İşlem atlanıyor.`);
      return { success: true, duplicated: true };
    }

    const product = mockDatabase.products.find(p => p.id === order.product_id);
    if (!product || product.status === 'sold') {
      mockDatabase.log('error', 'PAYTR_CALLBACK', 'Ürün zaten satılmış veya bulunamadı! Sipariş iptal ediliyor.');
      order.status = 'cancelled';
      return { success: false, reason: 'Ürün satılmış' };
    }

    // Ürünü ve siparişi güncelle (Atomic & Safe)
    product.status = 'sold';
    order.status = 'paid';
    order.payment_id = paymentOid;
    mockDatabase.log('success', 'PAYTR_CALLBACK', `Sipariş 'paid', Ürün 'sold' durumuna getirildi.`);

    // Recommendation 1: Event-Driven - Bir sonraki aşamayı (Entrupy Analizi) asenkron başlat
    this.initiateEntrupyAnalysis(order.id).catch(err => {
      mockDatabase.log('error', 'COORDINATOR', `Entrupy başlatma hatası: ${err.message}`);
    });

    return { success: true };
  }

  static async initiateEntrupyAnalysis(orderId: string) {
    const order = mockDatabase.orders.find(o => o.id === orderId);
    if (!order) return;

    const product = mockDatabase.products.find(p => p.id === order.product_id);
    if (!product) return;

    mockDatabase.log('info', 'ENTRUPY_SERVICE', `Entrupy analizi başlatılıyor: ${product.brand} - ${product.model_name}`);
    
    order.status = 'verifying';
    order.entrupy_status = 'analyzing';
    order.entrupy_id = `ent_${Math.random().toString(36).substring(7)}`;

    mockDatabase.log('info', 'ENTRUPY_SERVICE', `Analiz talebi Entrupy API'ye iletildi. ID: ${order.entrupy_id}`);
  }

  // Recommendation 2 & 4: Webhook & Rollback
  static async handleEntrupyWebhook(entrupyId: string, status: 'verified' | 'rejected') {
    mockDatabase.log('info', 'ENTRUPY_WEBHOOK', `Entrupy webhook tetiklendi. Analiz: ${entrupyId}, Sonuç: ${status}`);

    const order = mockDatabase.orders.find(o => o.entrupy_id === entrupyId);
    if (!order) {
      mockDatabase.log('error', 'ENTRUPY_WEBHOOK', `Eşleşen sipariş bulunamadı: Entrupy ID ${entrupyId}`);
      return { success: false };
    }

    // Idempotency: Zaten doğrulanmış veya iptal edilmişse atla
    if (order.status !== 'verifying') {
      mockDatabase.log('warn', 'ENTRUPY_WEBHOOK', `Sipariş zaten doğrulama aşamasını geçmiş. Durum: ${order.status}`);
      return { success: true, duplicated: true };
    }

    order.entrupy_status = status;

    if (status === 'verified') {
      order.status = 'verified';
      mockDatabase.log('success', 'ENTRUPY_WEBHOOK', `Ürün orijinalliği onaylandı. Kargo oluşturuluyor...`);
      
      // Kargo Siparişini Oluştur (OTO Kargo)
      await this.createOtoShipping(order.id);
    } else {
      // Recommendation 4: Rollback & Refund Akışı
      order.status = 'refunded';
      mockDatabase.log('warn', 'ROLLBACK', `Ürün sahte çıktı! Alıcıya para iadesi başlatılıyor. Tutar: ${order.total_price_kurus / 100} TL`);
      mockDatabase.log('success', 'PAYTR_REFUND', `PayTR Refund API ile ${order.total_price_kurus / 100} TL başarıyla iade edildi.`);
    }

    return { success: true };
  }

  static async createOtoShipping(orderId: string) {
    const order = mockDatabase.orders.find(o => o.id === orderId);
    if (!order) return;

    const product = mockDatabase.products.find(p => p.id === order.product_id);
    if (!product) return;

    mockDatabase.log('info', 'OTO_KARGO', `OTO Kargo sipariş kaydı yapılıyor...`);

    // OTO API Simülasyonu
    const trackingNumber = `OTO_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    order.status = 'shipped';
    order.shipping_tracking_buyer = trackingNumber;

    mockDatabase.log('success', 'OTO_KARGO', `Kargo siparişi başarıyla oluşturuldu. Otomatik atanan kargo firması takip numarası: ${trackingNumber}`);
  }

  // Delivery update simulation
  static async handleCargoDelivery(trackingNumber: string) {
    mockDatabase.log('info', 'OTO_TRACKING_WEBHOOK', `Kargo teslim edildi bildirimi alındı. Takip No: ${trackingNumber}`);

    const order = mockDatabase.orders.find(o => o.shipping_tracking_buyer === trackingNumber);
    if (!order) {
      mockDatabase.log('error', 'OTO_TRACKING_WEBHOOK', `Eşleşen kargo bulunamadı.`);
      return { success: false };
    }

    // Idempotency: Zaten tamamlanmışsa işlem yapma
    if (order.status === 'completed') {
      mockDatabase.log('warn', 'OTO_TRACKING_WEBHOOK', `Sipariş zaten tamamlanmış durumda.`);
      return { success: true, duplicated: true };
    }

    order.status = 'delivered';
    mockDatabase.log('success', 'OTO_TRACKING_WEBHOOK', `Sipariş teslim edildi.`);

    // Para Dağıtımı (Escrow Release)
    await this.releaseFundsToSeller(order.id);
  }

  static async releaseFundsToSeller(orderId: string) {
    const order = mockDatabase.orders.find(o => o.id === orderId);
    if (!order) return;

    mockDatabase.log('info', 'PAYTR_ESCROW_RELEASE', `Para dağıtım işlemi başlatılıyor...`);
    mockDatabase.log('success', 'PAYTR_ESCROW_RELEASE', `Satıcıya aktarılan: ${order.seller_amount_kurus / 100} TL (Satıcı ID: ${order.seller_id})`);
    mockDatabase.log('success', 'PAYTR_ESCROW_RELEASE', `Peony komisyonu: ${order.commission_amount_kurus / 100} TL`);

    order.status = 'completed';
    mockDatabase.log('success', 'COORDINATOR', `Tüm uçtan uca akış sorunsuz tamamlandı! Sipariş ID: ${order.id}`);
  }
}

// --- RUN TESTS ---
async function runE2ETests() {
  console.log('\n\x1b[1m\x1b[35m=== PEONY END-TO-END INTEGRATION TEST RUNNER ===\x1b[0m\n');

  // Setup seed data
  const testProductId = 'prod_chanel_bag_001';
  const testOrderId = 'ord_yigit_purchase_001';
  
  mockDatabase.products.push({
    id: testProductId,
    seller_id: 'seller_yigit',
    brand: 'Chanel',
    model_name: 'Classic Flap Bag',
    status: 'approved',
    is_peony_vip: true
  });

  mockDatabase.orders.push({
    id: testOrderId,
    buyer_id: 'buyer_ali',
    seller_id: 'seller_yigit',
    product_id: testProductId,
    total_price_kurus: 15000000,      // 150,000 TL
    commission_amount_kurus: 1500000, // 15,000 TL (%10 Komisyon)
    seller_amount_kurus: 13500000,     // 135,000 TL satıcı payı
    status: 'pending_payment'
  });

  console.log(`\x1b[1mSenaryo 1: Başarılı Uçtan Uca Sipariş, Orijinallik Onayı ve Teslimat\x1b[0m`);
  
  // 1. Ödeme Webhook'u Simüle Edilir
  await OrderCoordinator.handlePaymentSuccess(testOrderId, 'paytr_oid_98765', 15000000);
  
  // Idempotency Testi (Tekrar eden ödeme webhook çağrısı)
  console.log('\n\x1b[1m[TEST] Idempotency Testi (Mükerrer PayTR Webhook Çağrısı)\x1b[0m');
  const doublePayment = await OrderCoordinator.handlePaymentSuccess(testOrderId, 'paytr_oid_98765', 15000000);
  if (doublePayment.duplicated) {
    console.log('\x1b[32m✔ BAŞARILI: Mükerrer ödeme çağrısı güvenle yoksayıldı (Idempotency).\x1b[0m');
  } else {
    console.log('\x1b[31m✘ HATA: Mükerrer ödeme çağrısı engellenemedi!\x1b[0m');
  }

  // 2. Entrupy Analizi webhook simülasyonu
  const order = mockDatabase.orders[0];
  console.log('\n\x1b[1m[TEST] Entrupy Orijinal Ürün Bildirimi Webhook\x1b[0m');
  await OrderCoordinator.handleEntrupyWebhook(order.entrupy_id!, 'verified');

  // Idempotency Testi 2 (Tekrar eden Entrupy bildirimi)
  const doubleVerification = await OrderCoordinator.handleEntrupyWebhook(order.entrupy_id!, 'verified');
  if (doubleVerification.duplicated) {
    console.log('\x1b[32m✔ BAŞARILI: Mükerrer Entrupy doğrulaması güvenle yoksayıldı.\x1b[0m');
  }

  // 3. Kargo Teslimatı webhook simülasyonu
  console.log('\n\x1b[1m[TEST] OTO Kargo Teslim Edildi Webhook & Para Dağıtımı\x1b[0m');
  await OrderCoordinator.handleCargoDelivery(order.shipping_tracking_buyer!);

  console.log('\n\x1b[1m\x1b[35m=== Senaryo 1 Sonuçları ===\x1b[0m');
  console.log(`Sipariş Son Durumu: \x1b[32m${order.status.toUpperCase()}\x1b[0m (Beklenen: COMPLETED)`);
  console.log(`Ürün Son Durumu: \x1b[32m${mockDatabase.products[0].status.toUpperCase()}\x1b[0m (Beklenen: SOLD)`);

  // --- Senaryo 2: Entrupy Reddedildi (Sahte Ürün / Refund) Senaryosu ---
  console.log(`\n\x1b[1mSenaryo 2: Ürün Sahte Çıkması Durumunda Refund (Rollback) Akışı\x1b[0m`);
  
  const badProductId = 'prod_fake_bag_002';
  const badOrderId = 'ord_bad_purchase_002';

  mockDatabase.products.push({
    id: badProductId,
    seller_id: 'seller_dolandirici',
    brand: 'Hermes',
    model_name: 'Birkin 30',
    status: 'approved',
    is_peony_vip: false
  });

  mockDatabase.orders.push({
    id: badOrderId,
    buyer_id: 'buyer_magdur',
    seller_id: 'seller_dolandirici',
    product_id: badProductId,
    total_price_kurus: 45000000,      // 450,000 TL
    commission_amount_kurus: 4500000,
    seller_amount_kurus: 40500000,
    status: 'pending_payment'
  });

  // Ödeme başarılı
  await OrderCoordinator.handlePaymentSuccess(badOrderId, 'paytr_oid_54321', 45000000);
  
  // Entrupy RED webhook simülasyonu
  const badOrder = mockDatabase.orders.find(o => o.id === badOrderId)!;
  await OrderCoordinator.handleEntrupyWebhook(badOrder.entrupy_id!, 'rejected');

  console.log('\n\x1b[1m\x1b[35m=== Senaryo 2 Sonuçları ===\x1b[0m');
  console.log(`Sipariş Son Durumu: \x1b[31m${badOrder.status.toUpperCase()}\x1b[0m (Beklenen: REFUNDED)`);
}

runE2ETests().catch(console.error);
