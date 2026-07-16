import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  ActivityIndicator, 
  SafeAreaView, 
  StatusBar,
  Dimensions,
  Modal
} from 'react-native';
import { supabase } from './src/lib/supabase';

const { width } = Dimensions.get('window');

// Premium Colors
const COLORS = {
  bg: '#0F1016',
  card: '#181A24',
  text: '#FFFFFF',
  textMuted: '#8E909B',
  primary: '#D4AF37', // Gold
  accent: '#10B981', // Green
  danger: '#EF4444',
  border: '#2A2D3D'
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

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [scanStep, setScanStep] = useState(0); // 0: Closed, 1: Guided Scan, 2: Uploading, 3: Completed
  const [statusFilter, setStatusFilter] = useState<'pending' | 'verified' | 'rejected'>('pending');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      fetchProducts();
    }
  }, [session, statusFilter]);

  async function fetchProducts() {
    setLoading(true);
    try {
      // Map filter to entrupy_status
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('entrupy_status', statusFilter)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      alert('Ürünler yüklenirken hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    if (!email || !password) {
      alert('Lütfen e-posta ve şifrenizi girin.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      alert('Giriş başarısız: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setProducts([]);
  }

  // Simulating Entrupy SDK scanning
  function startScan(product: Product) {
    setSelectedProduct(product);
    setScanStep(1); // Start guided camera steps
  }

  async function simulateUpload() {
    setScanStep(2); // Set uploading state
    
    // Simulate API call to complete session
    setTimeout(async () => {
      if (!selectedProduct) return;
      try {
        // Here we simulate the webhook by writing to our API route or updating DB directly
        const { error } = await supabase.from('products').update({
          entrupy_status: 'verified',
          status: 'approved'
        }).eq('id', selectedProduct.id);

        if (error) throw error;
        setScanStep(3); // Completed!
      } catch (err: any) {
        alert('Durum güncellenirken hata: ' + err.message);
        setScanStep(0);
      }
    }, 2500);
  }

  // --- RENDERING SCREENS ---

  if (!session) {
    // LOGIN SCREEN
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.authContainer}>
          <Text style={styles.brandTitle}>PEONY</Text>
          <Text style={styles.brandSubtitle}>COLLECTIVE • OPERATIONS</Text>
          
          <Text style={styles.loginHeader}>Operasyon Girişi</Text>
          <Text style={styles.loginDescription}>Lütfen yönetici veya operatör hesabınızla giriş yapın.</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-POSTA</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. operasyon@peonycollective.com"
              placeholderTextColor={COLORS.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ŞİFRE</Text>
            <TextInput 
              style={styles.input} 
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor={COLORS.textMuted}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={COLORS.bg} />
            ) : (
              <Text style={styles.loginButtonText}>GİRİŞ YAP</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // DASHBOARD SCREEN
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>PEONY</Text>
          <Text style={styles.headerSubtitle}>Doğrulama Havuzu</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Çıkış</Text>
        </TouchableOpacity>
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

      {/* Product List */}
      {loading && products.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={fetchProducts}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Bu kategoride ürün bulunamadı.</Text>
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
                      <Text style={styles.actionBtnText}>Tara</Text>
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
                <Text style={styles.modalTitle}>Entrupy Device-Free Scan</Text>
                <Text style={styles.modalSubtitle}>{selectedProduct?.brand} - {selectedProduct?.name}</Text>
                
                {/* Simulated Camera Window */}
                <View style={styles.cameraBox}>
                  <View style={styles.cameraTarget}>
                    <Text style={styles.cameraGuideText}>[ Logoyu Kılavuz Çizgiye Hizalayın ]</Text>
                  </View>
                  <Image 
                    source={{ uri: selectedProduct?.image_urls?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' }} 
                    style={styles.cameraPreview}
                  />
                </View>

                <Text style={styles.stepGuidance}>Adım 1/3: Çantanın ön metal logosunu net şekilde fotoğraflayın.</Text>

                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setScanStep(0)}>
                    <Text style={styles.cancelBtnText}>Vazgeç</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryBtn} onPress={simulateUpload}>
                    <Text style={styles.primaryBtnText}>FOTOĞRAFI ONAYLA</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {scanStep === 2 && (
              <View style={styles.loadingView}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Fotoğraflar analiz için Entrupy sunucularına gönderiliyor...</Text>
              </View>
            )}

            {scanStep === 3 && (
              <View style={styles.successView}>
                <Text style={styles.successIcon}>✓</Text>
                <Text style={styles.successTitle}>İşlem Başarılı</Text>
                <Text style={styles.successText}>Tarama tamamlandı ve analiz talebi oluşturuldu. Webhook saniyeler içinde durumu güncelleyecektir.</Text>
                
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
    </SafeAreaView>
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
  authContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    letterSpacing: 8,
  },
  brandSubtitle: {
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: 'center',
    letterSpacing: 4,
    marginBottom: 50,
  },
  loginHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  loginDescription: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    height: 50,
    color: COLORS.text,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: COLORS.bg,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 4,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  logoutBtn: {
    padding: 8,
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: 13,
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
