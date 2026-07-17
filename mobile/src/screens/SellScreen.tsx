import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  Dimensions
} from 'react-native';
import { supabase } from '../lib/supabase';

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

interface SellScreenProps {
  onSuccess: () => void;
}

export default function SellScreen({ onSuccess }: SellScreenProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Info Form, 2: guided camera, 3: uploading, 4: done
  const [scanStep, setScanStep] = useState(1); // 1: Front, 2: Back, 3: Logo, 4: Zipper

  // Form Fields
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('Deri');

  async function handleNextStep() {
    if (step === 1) {
      if (!brand || !name || !price) {
        alert('Lütfen marka, model adı ve fiyat alanlarını doldurun.');
        return;
      }
      setStep(2); // Go to camera scan
    }
  }

  async function handleCameraSnap() {
    if (scanStep < 4) {
      setScanStep(scanStep + 1);
    } else {
      // Completed scanning all angles, proceed to save product
      handleSubmitProduct();
    }
  }

  async function handleSubmitProduct() {
    setStep(3); // Uploading
    setLoading(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Oturum bulunamadı. Lütfen giriş yapın.');

      // Insert product as pending
      const { data: product, error } = await supabase
        .from('products')
        .insert({
          name,
          brand,
          price: parseFloat(price),
          description,
          material,
          seller_id: user.id,
          status: 'pending',
          entrupy_status: 'pending',
          image_urls: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500'] // Mock listing image
        })
        .select()
        .single();

      if (error) throw error;

      // Simulate webhook processing by trigger a PUT/POST to our webhook after delay
      setTimeout(async () => {
        try {
          // We can call database directly here to simulate the Entrupy analysis completing as 'verified'
          await supabase.from('products').update({
            entrupy_status: 'verified',
            status: 'approved',
            entrupy_certificate_url: 'https://cert.entrupy.com/mock-certificate-url'
          }).eq('id', product.id);
        } catch (e) {
          console.error(e);
        }
      }, 5000);

      setStep(4); // Success screen
    } catch (error: any) {
      alert('Yükleme hatası: ' + error.message);
      setStep(1);
      setScanStep(1);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {step === 1 && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.headerTitle}>Ürün Bilgileri</Text>
            <Text style={styles.headerSubtitle}>Satmak istediğiniz lüks ürünün detaylarını girin.</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>MARKA</Text>
              <TextInput 
                style={styles.input}
                placeholder="Örn. Bottega Veneta, Chanel, Louis Vuitton"
                placeholderTextColor={COLORS.textMuted}
                value={brand}
                onChangeText={setBrand}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>MODEL ADI</Text>
              <TextInput 
                style={styles.input}
                placeholder="Örn. Cassette Bag, Classic Flap"
                placeholderTextColor={COLORS.textMuted}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>FİYAT (TL)</Text>
              <TextInput 
                style={styles.input}
                placeholder="Örn. 145000"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>MALZEME / MATERYAL</Text>
              <TextInput 
                style={styles.input}
                placeholder="Örn. Kuzu Derisi, Canvas"
                placeholderTextColor={COLORS.textMuted}
                value={material}
                onChangeText={setMaterial}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>AÇIKLAMA</Text>
              <TextInput 
                style={[styles.input, styles.textArea]}
                placeholder="Ürünün kondisyonu, aşınma durumu, fatura/kutu varlığı hakkında bilgi yazın..."
                placeholderTextColor={COLORS.textMuted}
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleNextStep}>
              <Text style={styles.primaryBtnText}>TARAMAYI BAŞLAT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {step === 2 && (
        <View style={styles.cameraContainer}>
          <Text style={styles.cameraTitle}>Entrupy AI Doğrulama</Text>
          <Text style={styles.cameraSubtitle}>Kılavuzlara uyarak fotoğrafları çekin</Text>

          {/* Camera Frame */}
          <View style={styles.cameraBox}>
            <View style={styles.cameraGuide}>
              <Text style={styles.guideText}>
                {scanStep === 1 && '[ Ürünün Önünü Hizalayın ]'}
                {scanStep === 2 && '[ Ürünün Arkasını Hizalayın ]'}
                {scanStep === 3 && '[ Logoyu/Damgayı Odaklayın ]'}
                {scanStep === 4 && '[ Fermuar/Detay Tokasını Odaklayın ]'}
              </Text>
            </View>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' }} 
              style={styles.cameraBg}
            />
          </View>

          <Text style={styles.stepIndicator}>Adım {scanStep} / 4</Text>
          <Text style={styles.guidanceText}>
            {scanStep === 1 && '1. Adım: Ürünün ön yüzünü tam karşıdan ve net şekilde fotoğraflayın.'}
            {scanStep === 2 && '2. Adım: Ürünün arka yüzünü ve dikişlerini net şekilde fotoğraflayın.'}
            {scanStep === 3 && '3. Adım: Ürünün içindeki marka logosu baskısını/metal plakasını yakından çekin.'}
            {scanStep === 4 && '4. Adım: Fermuar dişlerini, seri numarasını veya toka detayını makro çekin.'}
          </Text>

          <View style={styles.cameraActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setStep(1)}>
              <Text style={styles.cancelBtnText}>Geri</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.snapBtn} onPress={handleCameraSnap}>
              <View style={styles.snapInner} />
            </TouchableOpacity>
            
            <View style={{ flex: 1 }} />
          </View>
        </View>
      )}

      {step === 3 && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Ürün detayları kaydediliyor ve Entrupy analiz süreci başlatılıyor...</Text>
        </View>
      )}

      {step === 4 && (
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successTitle}>Ürün Başarıyla Alındı</Text>
          <Text style={styles.successText}>
            Çantanızın fotoğrafları kaydedildi. Entrupy AI doğrulama süreci arka planda başlatıldı. Saniyeler içinde analiz edilip onaylandığında vitrinde listelenecektir.
          </Text>

          <TouchableOpacity style={styles.doneBtn} onPress={onSuccess}>
            <Text style={styles.doneBtnText}>TAMAM</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 110, // Safe padding for floating tab bar
  },
  formContainer: {
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
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
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  primaryBtnText: {
    color: '#FFFFFF', // White text on gold button
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1.5,
  },
  cameraContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  cameraSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  cameraBox: {
    width: '100%',
    height: '50%',
    backgroundColor: '#000',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 15,
  },
  cameraBg: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  cameraGuide: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: COLORS.primary,
    width: '80%',
    height: '70%',
    borderRadius: 12,
    borderStyle: 'dashed',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  guidanceText: {
    color: COLORS.text,
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 20,
    lineHeight: 20,
    marginVertical: 10,
  },
  cameraActions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  cancelBtn: {
    flex: 1,
  },
  cancelBtnText: {
    color: COLORS.textMuted,
    fontSize: 16,
  },
  snapBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  snapInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    color: COLORS.text,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  successIcon: {
    fontSize: 72,
    color: COLORS.accent,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  successText: {
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    fontSize: 14,
  },
  doneBtn: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  doneBtnText: {
    color: COLORS.bg,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 2,
  }
});
