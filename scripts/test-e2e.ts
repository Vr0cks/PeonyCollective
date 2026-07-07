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
  status: 'pending_payment' | 'paid' | 'verifying' | 'verified' | 'shipped_to_lab' | 'inspecting' | 'lab_approved' | 'shipped_to_buyer' | 'shipped' | 'delivered' | 'completed' | 'cancelled' | 'refunded';
  shipping_tracking_seller?: string;
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
      mockDatabase.log('success', 'ENTRUPY_WEBHOOK', `Ürün orijinalliği onaylandı. Aşama 1 Kargo kodu oluşturuluyor...`);
      
      // Kargo Siparişini Oluştur (OTO Kargo): Satıcı -> Peony Lab
      await this.createOtoShippingSellerToLab(order.id);
    } else {
      // Recommendation 4: Rollback & Refund Akışı
      order.status = 'refunded';
      mockDatabase.log('warn', 'ROLLBACK', `Ürün sahte çıktı! Alıcıya para iadesi başlatılıyor. Tutar: ${order.total_price_kurus / 100} TL`);
      mockDatabase.log('success', 'PAYTR_REFUND', `PayTR Refund API ile ${order.total_price_kurus / 100} TL başarıyla iade edildi.`);
    }

    return { success: true };
  }

  static async createOtoShippingSellerToLab(orderId: string) {
    const order = mockDatabase.orders.find(o => o.id === orderId);
    if (!order) return;

    mockDatabase.log('info', 'OTO_KARGO', `Aşama 1: OTO Kargo siparişi oluşturuluyor (Satıcı → Peony Lab)...`);

    // OTO API Simülasyonu
    const trackingNumber = `OTO_S_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    order.status = 'shipped_to_lab';
    order.shipping_tracking_seller = trackingNumber;

    mockDatabase.log('success', 'OTO_KARGO', `Aşama 1 kargo başarıyla oluşturuldu. Takip No (Satıcı → Lab): ${trackingNumber}`);
  }

  // Lab Ekspertiz İncelemesi ve Onay Akışı (Aşama 2 Kargo)
  static async handleLabVerification(orderId: string, decision: 'approve' | 'reject', reason?: string) {
    const order = mockDatabase.orders.find(o => o.id === orderId);
    if (!order) return;

    mockDatabase.log('info', 'LAB_EKSPERTIZ', `Fiziki ürün labda inceleniyor...`);
    order.status = 'inspecting';

    if (decision === 'approve') {
      mockDatabase.log('success', 'LAB_EKSPERTIZ', `Ürün doğruluğu uzmanlar tarafından onaylandı. Aşama 2: OTO Kargo oluşturuluyor (Peony Lab → Alıcı)...`);
      
      const trackingNumber = `OTO_B_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      order.status = 'shipped'; // shipped_to_buyer
      order.shipping_tracking_buyer = trackingNumber;
      
      mockDatabase.log('success', 'LAB_EKSPERTIZ', `Aşama 2 kargo kodu oluşturuldu. Takip No (Lab → Alıcı): ${trackingNumber}`);
    } else {
      order.status = 'refunded';
      mockDatabase.log('warn', 'LAB_EKSPERTIZ', `Ürün testi geçemedi. Sipariş iptal edildi. Gerekçe: ${reason}`);
    }
  }

  // Delivery update simulation
  static async handleCargoDelivery(trackingNumber: string) {
    mockDatabase.log('info', 'OTO_TRACKING_WEBHOOK', `Kargo teslim edildi webhook bildirimi alındı. Takip No: ${trackingNumber}`);

    const order = mockDatabase.orders.find(o => o.shipping_tracking_buyer === trackingNumber);
    if (!order) {
      mockDatabase.log('error', 'OTO_TRACKING_WEBHOOK', `Eşleşen alıcı kargosu bulunamadı.`);
      return { success: false };
    }

    if (order.status === 'completed') {
      mockDatabase.log('warn', 'OTO_TRACKING_WEBHOOK', `Sipariş zaten tamamlanmış durumda.`);
      return { success: true, duplicated: true };
    }

    order.status = 'delivered';
    mockDatabase.log('success', 'OTO_TRACKING_WEBHOOK', `Alıcıya "Ürünü onaylayın" bildirimi gönderildi. 3 günlük yasal onay süreci başlatıldı.`);
  }

  // Cron job simulation
  static async runAutoApproveCron() {
    mockDatabase.log('info', 'CRON_AUTO_COMPLETE', `Otomatik onaylama cron job'ı tetikleniyor...`);
    const pendingOrders = mockDatabase.orders.filter(o => o.status === 'delivered');
    
    for (const order of pendingOrders) {
      mockDatabase.log('info', 'CRON_AUTO_COMPLETE', `Sipariş #${order.id} için 3 günlük süre doldu. Otomatik onaylanıyor...`);
      await this.releaseFundsToSeller(order.id);
    }
  }

  static async releaseFundsToSeller(orderId: string) {
    const order = mockDatabase.orders.find(o => o.id === orderId);
    if (!order) return;

    mockDatabase.log('info', 'PAYTR_ESCROW_RELEASE', `Para dağıtım işlemi başlatılıyor (Escrow Release)...`);
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
  
  // 1. Ödeme başarılı simülasyonu
  await OrderCoordinator.handlePaymentSuccess(testOrderId, 'paytr_oid_98765', 15000000);
  
  // 2. Entrupy Analizi ve Aşama 1 Kargo
  const order = mockDatabase.orders[0];
  console.log('\n\x1b[1m[TEST] Entrupy Orijinal Ürün Bildirimi Webhook\x1b[0m');
  await OrderCoordinator.handleEntrupyWebhook(order.entrupy_id!, 'verified');

  // 3. Laboratuvar Karşılaştırma Onayı ve Aşama 2 Kargo
  console.log('\n\x1b[1m[TEST] Lab Ekspertiz İncelemesi ve Onay (2. Kargo Oluşturma)\x1b[0m');
  await OrderCoordinator.handleLabVerification(order.id, 'approve');

  // 4. Kargo Teslimatı webhook simülasyonu (3 Günlük onay süreci tetiklenir)
  console.log('\n\x1b[1m[TEST] OTO Kargo Teslim Edildi Webhook\x1b[0m');
  await OrderCoordinator.handleCargoDelivery(order.shipping_tracking_buyer!);

  // 5. 3 Günlük onay süresi dolması (Cron tetiklenmesi ve Para Dağıtımı)
  console.log('\n\x1b[1m[TEST] 3 Günlük Süre Sonu Auto-Approval Cron Job\x1b[0m');
  await OrderCoordinator.runAutoApproveCron();

  console.log('\n\x1b[1m\x1b[35m=== Senaryo 1 Sonuçları ===\x1b[0m');
  console.log(`Sipariş Son Durumu: \x1b[32m${order.status.toUpperCase()}\x1b[0m (Beklenen: COMPLETED)`);
  console.log(`Ürün Son Durumu: \x1b[32m${mockDatabase.products[0].status.toUpperCase()}\x1b[0m (Beklenen: SOLD)`);

  // --- Senaryo 2: Lab Reddedildi (Sahte Ürün / Refund) Senaryosu ---
  console.log(`\n\x1b[1mSenaryo 2: Lab İncelemesinde Ürün Sahte Çıkması Durumunda Refund Akışı\x1b[0m`);
  
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
  
  // Entrupy onaylandı -> Aşama 1 Kargo üretildi
  const badOrder = mockDatabase.orders.find(o => o.id === badOrderId)!;
  await OrderCoordinator.handleEntrupyWebhook(badOrder.entrupy_id!, 'verified');

  // Lab incelemesinde RED kararı verilmesi
  console.log('\n\x1b[1m[TEST] Lab İncelemesi Sahte Ürün Red Kararı\x1b[0m');
  await OrderCoordinator.handleLabVerification(badOrder.id, 'reject', 'Dikiş aralığı ve logo sıcak pres derinliği hatalı');

  console.log('\n\x1b[1m\x1b[35m=== Senaryo 2 Sonuçları ===\x1b[0m');
  console.log(`Sipariş Son Durumu: \x1b[31m${badOrder.status.toUpperCase()}\x1b[0m (Beklenen: REFUNDED)`);
}

runE2ETests().catch(console.error);

