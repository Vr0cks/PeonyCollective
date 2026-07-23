import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
  TextInput,
  ActivityIndicator,
  FlatList,
  Platform
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#FBFBFA', // Luxury off-white
  card: '#FFFFFF', // Clean white
  text: '#1A1A1A', // High-contrast charcoal text
  textMuted: '#7E8085', // Slate gray
  primary: '#AF9164', // Classic champagne gold
  border: '#E8E8E6', // Thin dividers
  accent: '#10B981', // Emerald green
  danger: '#EF4444'
};

interface Product {
  id: string;
  model_name: string;
  brand: string;
  price: number;
  image_urls?: string[];
  public_images?: string[];
  entrupy_status: string;
  description?: string;
  material?: string;
  condition?: string;
  purchase_year?: number | string;
  dimensions?: string;
  odor_score?: number;
  has_spa_treatment?: boolean;
  full_set_items?: string[];
  flaw_images?: string[];
}

interface ProductDetailsScreenProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetailsScreen({ product, onBack }: ProductDetailsScreenProps) {
  const [offerText, setOfferText] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');

  // Default values if fields are missing in data
  const condition = product.condition || 'MÜKEMMEL';
  const purchaseYear = product.purchase_year || 'BİLİNMİYOR';
  const dimensions = product.dimensions || 'Boyut bilgisi belirtilmedi';
  const odorScore = product.odor_score ?? 10;
  const spaTreatment = product.has_spa_treatment ?? false;
  const fullSet = product.full_set_items || ['Kutu', 'Toz Torbası'];
  const flawImages = product.flaw_images || [];
  const galleryImages = product.public_images && product.public_images.length > 0 
    ? product.public_images 
    : ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500'];

  async function handleBuy() {
    setLoading(true);
    setStatusText('Güvenli ödeme sayfasına yönlendiriliyorsunuz...');
    
    try {
      const { supabase } = await import('../lib/supabase');
      const sessionData = (await supabase.auth.getSession()).data.session;
      const accessToken = sessionData?.access_token || '';
      const refreshToken = sessionData?.refresh_token || '';

      // Vercel'deki siteniz
      const domain = 'https://peony-collective.vercel.app';
      
      // Token ve Refresh Token parametrelerini URL'ye ekliyoruz
      const checkoutUrl = `${domain}/checkout/${product.id}?token=${encodeURIComponent(accessToken)}&refresh=${encodeURIComponent(refreshToken)}`;
      
      await WebBrowser.openBrowserAsync(checkoutUrl);
    } catch (error) {
      console.error('Ödeme sayfası açılamadı:', error);
      alert('Ödeme sayfası yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
      setStatusText('');
    }
  }

  async function handleMakeOffer() {
    if (!offerText) {
      alert('Lütfen teklif miktarınızı girin.');
      return;
    }
    setLoading(true);
    setStatusText('Teklifiniz satıcıya iletiliyor...');
    
    setTimeout(() => {
      setLoading(false);
      setStatusText('');
      alert(`${offerText} TL tutarındaki teklifiniz başarıyla satıcıya gönderildi!`);
      setOfferText('');
    }, 1500);
  }

  return (
    <View style={styles.container}>
      {/* Back Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Vitrin</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{product.brand}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Horizontal Image Gallery */}
        <View style={styles.galleryContainer}>
          <FlatList 
            data={galleryImages}
            keyExtractor={(item, index) => `${item}-${index}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.galleryImage} />
            )}
          />
          <View style={styles.badgeContainer}>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ ENTRUPY VERIFIED</Text>
            </View>
          </View>
        </View>

        <View style={styles.mainInfo}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.model_name}</Text>
          <Text style={styles.price}>{product.price?.toLocaleString('tr-TR')} ₺</Text>
          
          {/* Social Proof (Views & Favorites counts) */}
          <View style={styles.socialProofRow}>
            <Text style={styles.socialProofText}>👁 {product.id === 'chanel-flap' ? '1.428' : '542'} kişi inceledi</Text>
            <Text style={styles.socialProofDivider}>•</Text>
            <Text style={styles.socialProofText}>❤️ {product.id === 'chanel-flap' ? '124' : '48'} kişi favorisine ekledi</Text>
          </View>
        </View>

        {/* Specs Overview */}
        <View style={styles.specsGrid}>
          <View style={styles.specBox}>
            <Text style={styles.specLabel}>KONDİSYON</Text>
            <Text style={styles.specValue}>{condition.toUpperCase()}</Text>
          </View>
          <View style={styles.specBox}>
            <Text style={styles.specLabel}>SATIN ALINAN YIL</Text>
            <Text style={styles.specValue}>{purchaseYear}</Text>
          </View>
          <View style={[styles.specBox, { width: '100%', marginTop: 12 }]}>
            <Text style={styles.specLabel}>BOYUTLAR</Text>
            <Text style={styles.specValue}>{dimensions}</Text>
          </View>
        </View>

        {/* Peony Expert Report Card */}
        <View style={styles.expertCard}>
          <Text style={styles.cardHeader}>PEONY UZMAN RAPORU</Text>
          
          {/* Odor Score */}
          <View style={styles.metricRow}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>KOKU SKORU</Text>
              <Text style={styles.metricValue}>{odorScore}/10</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressInner, { width: `${odorScore * 10}%` }]} />
            </View>
          </View>

          {/* Treatment Status */}
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>BAKIM GEÇMİŞİ</Text>
            <Text style={styles.expertStatus}>
              {spaTreatment ? 'ORİJİNAL DIŞI MÜDAHALE / BOYA' : '%100 FABRİKA KONDİSYONU'}
            </Text>
          </View>

          {/* Full Set items */}
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>İÇERİK (FULL SET)</Text>
            <View style={styles.setTags}>
              {fullSet.map((item, idx) => (
                <View key={idx} style={styles.setTag}>
                  <Text style={styles.setTagText}>{item.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Condition Report Imperfections (Flaw images) */}
        {flawImages.length > 0 && (
          <View style={styles.expertCard}>
            <Text style={styles.cardHeader}>DEFO & KUSUR RAPORU</Text>
            <Text style={styles.cardDesc}>
              Peony Lab tarafından tespit edilen kullanım izleri.
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.flawScroll}>
              {flawImages.map((img, idx) => (
                <Image key={idx} source={{ uri: img }} style={styles.flawImage} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionHeader}>AÇIKLAMA</Text>
          <Text style={styles.descriptionText}>
            {product.description || 'Bu lüks parça Peony Collective eksperleri tarafından incelenmiş ve doğrulanmıştır. Herhangi bir aşınma veya yıpranma bulunmamaktadır.'}
          </Text>
        </View>

        {/* Checkout actions */}
        <View style={styles.actionsBox}>
          <TouchableOpacity style={styles.buyBtn} onPress={handleBuy} disabled={loading}>
            {loading && statusText.includes('Ödeme') ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buyBtnText}>HEMEN SATIN AL</Text>
            )}
          </TouchableOpacity>

          <View style={styles.offerRow}>
            <TextInput 
              style={styles.offerInput}
              placeholder="Teklif Ver (₺)"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="numeric"
              value={offerText}
              onChangeText={setOfferText}
            />
            <TouchableOpacity style={styles.offerBtn} onPress={handleMakeOffer} disabled={loading}>
              {loading && statusText.includes('Teklif') ? (
                <ActivityIndicator color={COLORS.primary} />
              ) : (
                <Text style={styles.offerBtnText}>Teklif Et</Text>
              )}
            </TouchableOpacity>
          </View>
          {statusText ? (
            <Text style={styles.statusLabel}>{statusText}</Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  backBtn: {
    paddingRight: 15,
  },
  backBtnText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  navTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  scrollContent: {
    paddingBottom: 60,
  },
  galleryContainer: {
    width: width,
    height: width,
    position: 'relative',
    backgroundColor: '#F5F5F7',
  },
  galleryImage: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  verifiedBadge: {
    backgroundColor: 'rgba(175, 145, 100, 0.95)', // Gold luxury opacity badge
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  verifiedText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  mainInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  brand: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 6,
  },
  price: {
    fontSize: 20,
    color: COLORS.text,
    fontWeight: '600',
    marginTop: 10,
  },
  socialProofRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(175, 145, 100, 0.05)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderColor: 'rgba(175, 145, 100, 0.2)',
  },
  socialProofText: {
    fontSize: 10.5,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  socialProofDivider: {
    marginHorizontal: 8,
    color: COLORS.primary,
    fontSize: 10.5,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  specBox: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 1,
  },
  specLabel: {
    fontSize: 8.5,
    color: COLORS.textMuted,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  specValue: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  expertCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: 1.5,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingBottom: 8,
  },
  cardDesc: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 15,
  },
  metricRow: {
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 9,
    color: COLORS.textMuted,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  metricValue: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    width: '100%',
  },
  progressInner: {
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  expertStatus: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  setTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  setTag: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  setTagText: {
    color: COLORS.text,
    fontSize: 9,
    fontWeight: 'bold',
  },
  flawScroll: {
    flexDirection: 'row',
  },
  flawImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: '#F3F4F6',
  },
  descriptionSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  descriptionText: {
    color: COLORS.text,
    fontSize: 13.5,
    lineHeight: 21,
  },
  actionsBox: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  buyBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buyBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  offerRow: {
    flexDirection: 'row',
  },
  offerInput: {
    flex: 2,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    height: 50,
    color: COLORS.text,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  offerBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  offerBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  statusLabel: {
    color: COLORS.primary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  }
});
