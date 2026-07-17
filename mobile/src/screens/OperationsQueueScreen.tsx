import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  Modal
} from 'react-native';
import { supabase } from '../lib/supabase';

const COLORS = {
  bg: '#0F1016',
  card: '#181A24',
  text: '#FFFFFF',
  textMuted: '#8E909B',
  primary: '#D4AF37', // Gold
  border: '#2A2D3D',
  accent: '#10B981',
  danger: '#EF4444'
};

interface Product {
  id: string;
  name: string;
  brand: string;
  status: string;
  entrupy_status: string;
  price: number;
  image_urls?: string[];
}

interface OperationsQueueScreenProps {
  onBack: () => void;
}

export default function OperationsQueueScreen({ onBack }: OperationsQueueScreenProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'pending' | 'verified' | 'rejected'>('pending');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [scanStep, setScanStep] = useState(0); // 0: Closed, 1: Guided Scan, 2: Uploading, 3: Completed

  useEffect(() => {
    fetchProducts();
  }, [statusFilter]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('entrupy_status', statusFilter)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      alert('Hata: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  function startScan(product: Product) {
    setSelectedProduct(product);
    setScanStep(1);
  }

  async function simulateUpload() {
    setScanStep(2);
    setTimeout(async () => {
      if (!selectedProduct) return;
      try {
        const { error } = await supabase.from('products').update({
          entrupy_status: 'verified',
          status: 'approved'
        }).eq('id', selectedProduct.id);

        if (error) throw error;
        setScanStep(3);
      } catch (err: any) {
        alert('Hata: ' + err.message);
        setScanStep(0);
      }
    }, 2000);
  }

  return (
    <View style={styles.container}>
      {/* Back Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Vitrin</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>OPERASYON HAVUZU</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(['pending', 'verified', 'rejected'] as const).map((filter) => (
          <TouchableOpacity 
            key={filter}
            style={[styles.tab, statusFilter === filter && styles.activeTab]}
            onPress={() => setStatusFilter(filter)}
          >
            <Text style={[styles.tabText, statusFilter === filter && styles.activeTabText]}>
              {filter === 'pending' ? 'Bekleyenler' : filter === 'verified' ? 'Doğrulananlar' : 'Reddedilenler'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onRefresh={fetchProducts}
          refreshing={loading}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Bu havuzda ürün bulunamadı.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image 
                source={{ uri: item.image_urls?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' }} 
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productBrand}>{item.brand}</Text>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price?.toLocaleString('tr-TR')} TL</Text>
                
                <View style={styles.cardFooter}>
                  <View style={[
                    styles.badge, 
                    item.entrupy_status === 'verified' ? styles.badgeVerified : 
                    item.entrupy_status === 'rejected' ? styles.badgeRejected : styles.badgePending
                  ]}>
                    <Text style={styles.badgeText}>{item.entrupy_status.toUpperCase()}</Text>
                  </View>
                  
                  {item.entrupy_status === 'pending' && (
                    <TouchableOpacity style={styles.actionBtn} onPress={() => startScan(item)}>
                      <Text style={styles.actionBtnText}>Doğrula</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      )}

      {/* ENTRUPY MOCK SCAN MODAL */}
      <Modal visible={scanStep > 0} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            {scanStep === 1 && (
              <View style={styles.scanView}>
                <Text style={styles.modalTitle}>Entrupy Donanımlı Tarama</Text>
                <Text style={styles.modalSubtitle}>{selectedProduct?.brand} - {selectedProduct?.name}</Text>
                
                <View style={styles.cameraBox}>
                  <View style={styles.cameraTarget}>
                    <Text style={styles.cameraGuideText}>[ Büyüteci Malzemeye Dayayın ]</Text>
                  </View>
                  <Image 
                    source={{ uri: selectedProduct?.image_urls?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' }} 
                    style={styles.cameraPreview}
                  />
                </View>

                <Text style={styles.stepGuidance}>Mikroskobik Çekim: Büyüteç donanımını çantanın derisine temas ettirip net odaklayın.</Text>

                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setScanStep(0)}>
                    <Text style={styles.cancelBtnText}>Vazgeç</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryBtn} onPress={simulateUpload}>
                    <Text style={styles.primaryBtnText}>TARAMAYI ONAYLA</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {scanStep === 2 && (
              <View style={styles.loadingView}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Mikro görseller analiz ediliyor...</Text>
              </View>
            )}

            {scanStep === 3 && (
              <View style={styles.successView}>
                <Text style={styles.successIcon}>✓</Text>
                <Text style={styles.successTitle}>Analiz Başarıyla İletildi</Text>
                <Text style={styles.successText}>Mikro-tarama kayıtları sunucuya iletildi. Sunucu durum güncellemelerini işleyecektir.</Text>
                
                <TouchableOpacity 
                  style={[styles.primaryBtn, { width: '100%', marginTop: 20 }]} 
                  onPress={() => {
                    setScanStep(0);
                    fetchProducts();
                  }}
                >
                  <Text style={styles.primaryBtnText}>TAMAM</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  backBtn: {
    marginRight: 15,
  },
  backBtnText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 20,
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
  },
  productCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  productBrand: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.bg,
  },
  badgePending: {
    backgroundColor: '#F59E0B',
  },
  badgeVerified: {
    backgroundColor: COLORS.accent,
  },
  badgeRejected: {
    backgroundColor: COLORS.danger,
  },
  actionBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionBtnText: {
    color: COLORS.bg,
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 500,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  scanView: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 20,
  },
  cameraBox: {
    height: 250,
    backgroundColor: '#000',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  cameraTarget: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: COLORS.primary,
    width: '80%',
    height: '60%',
    borderRadius: 12,
    borderStyle: 'dashed',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraGuideText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  stepGuidance: {
    color: COLORS.text,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: COLORS.textMuted,
    fontSize: 15,
  },
  primaryBtn: {
    flex: 2,
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    color: COLORS.bg,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    color: COLORS.text,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
  },
  successView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  successIcon: {
    fontSize: 60,
    color: COLORS.accent,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  successText: {
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    lineHeight: 20,
  }
});
