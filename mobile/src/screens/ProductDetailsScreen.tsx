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
  ActivityIndicator
} from 'react-native';

const { width } = Dimensions.get('window');

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
  price: number;
  image_urls?: string[];
  entrupy_status: string;
  description?: string;
  material?: string;
}

interface ProductDetailsScreenProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetailsScreen({ product, onBack }: ProductDetailsScreenProps) {
  const [offerText, setOfferText] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');

  async function handleBuy() {
    setLoading(true);
    setStatusText('Ödeme ekranına yönlendiriliyorsunuz...');
    
    setTimeout(() => {
      setLoading(false);
      setStatusText('');
      alert('Tebrikler! Satın alma işleminiz başarıyla tamamlandı.');
      onBack();
    }, 2000);
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
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>← Geri Dön</Text>
      </TouchableOpacity>

      {/* Product Image */}
      <Image 
        source={{ uri: product.image_urls?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' }} 
        style={styles.image}
      />

      <View style={styles.content}>
        {/* Brand & Name */}
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price?.toLocaleString('tr-TR')} TL</Text>

        {/* Certificate Banner */}
        <View style={styles.certBanner}>
          <Text style={styles.certIcon}>✓</Text>
          <View>
            <Text style={styles.certTitle}>Entrupy Verified</Text>
            <Text style={styles.certDescription}>Bu ürün yapay zeka analizinden geçerek onaylanmıştır.</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>ÜRÜN DETAYI</Text>
        <Text style={styles.description}>
          {product.description || 'Bu çanta lüks segment olup Peony Collective uzmanları tarafından kontrol edilmiştir. Çok iyi durumda ve herhangi bir yıpranma bulunmamaktadır.'}
        </Text>

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Materyal:</Text>
          <Text style={styles.specValue}>{product.material || 'Deri'}</Text>
        </View>

        {/* Buying Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.buyBtn} onPress={handleBuy} disabled={loading}>
            {loading && statusText.includes('Ödeme') ? (
              <ActivityIndicator color={COLORS.bg} />
            ) : (
              <Text style={styles.buyBtnText}>HEMEN SATIN AL</Text>
            )}
          </TouchableOpacity>

          <View style={styles.offerContainer}>
            <TextInput 
              style={styles.offerInput}
              placeholder="Teklif Ver (TL)"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="numeric"
              value={offerText}
              onChangeText={setOfferText}
            />
            <TouchableOpacity style={styles.offerBtn} onPress={handleMakeOffer} disabled={loading}>
              {loading && statusText.includes('Teklif') ? (
                <ActivityIndicator color={COLORS.text} />
              ) : (
                <Text style={styles.offerBtnText}>Teklif Et</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {statusText ? (
          <Text style={styles.statusLabel}>{statusText}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  backBtn: {
    padding: 15,
    marginTop: 10,
  },
  backBtnText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  image: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  brand: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 8,
  },
  certBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  certIcon: {
    fontSize: 24,
    color: COLORS.accent,
    marginRight: 15,
    fontWeight: 'bold',
  },
  certTitle: {
    color: COLORS.accent,
    fontWeight: 'bold',
    fontSize: 15,
  },
  certDescription: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
    marginTop: 30,
    marginBottom: 10,
  },
  description: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 22,
  },
  specRow: {
    flexDirection: 'row',
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingTop: 15,
  },
  specLabel: {
    color: COLORS.textMuted,
    fontSize: 14,
    width: 100,
  },
  specValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  actions: {
    marginTop: 35,
    marginBottom: 40,
  },
  buyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buyBtnText: {
    color: COLORS.bg,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1.5,
  },
  offerContainer: {
    flexDirection: 'row',
  },
  offerInput: {
    flex: 2,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    height: 48,
    color: COLORS.text,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
  },
  offerBtn: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusLabel: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 13,
  }
});
