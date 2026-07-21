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
import { t } from '../lib/i18n';

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
  const [step, setStep] = useState(0); // 0: Landing, 1: Info Form, 2: Photo Grid, 3: Loading, 4: Success

  // Form Fields
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('Deri');

  // Guide Modal & Photo states
  const [showGuide, setShowGuide] = useState(false);
  const [guideTab, setGuideTab] = useState<'details' | 'images' | 'zipper' | 'logo'>('details');
  const [activeCameraSlot, setActiveCameraSlot] = useState<string | null>(null);

  // Individual grid images states
  const [photoFront, setPhotoFront] = useState<string | null>(null);
  const [photoBack, setPhotoBack] = useState<string | null>(null);
  const [photoBase, setPhotoBase] = useState<string | null>(null);
  const [photoSide, setPhotoSide] = useState<string | null>(null);
  const [photoLogo, setPhotoLogo] = useState<string | null>(null);
  const [photoZipper, setPhotoZipper] = useState<string | null>(null);

  const isEn = t('wishlistEmpty') === 'Your wishlist is empty.';

  async function handleNextStep() {
    if (step === 1) {
      if (!brand || !name || !price) {
        const fillAlert = isEn ? 'Please fill in brand, model name and price fields.' : 'Lütfen marka, model adı ve fiyat alanlarını doldurun.';
        alert(fillAlert);
        return;
      }
      setStep(2); // Go to grid photo select
    }
  }

  function handleSlotPress(slot: string) {
    setActiveCameraSlot(slot);
  }

  function handleCameraSnapSimulated() {
    if (!activeCameraSlot) return;

    // Simulate capturing a premium bag angle
    const mockImages: { [key: string]: string } = {
      front: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
      back: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600',
      base: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600',
      side: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=600',
      logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600',
      zipper: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'
    };

    const capturedUri = mockImages[activeCameraSlot] || mockImages.front;

    if (activeCameraSlot === 'front') setPhotoFront(capturedUri);
    else if (activeCameraSlot === 'back') setPhotoBack(capturedUri);
    else if (activeCameraSlot === 'base') setPhotoBase(capturedUri);
    else if (activeCameraSlot === 'side') setPhotoSide(capturedUri);
    else if (activeCameraSlot === 'logo') setPhotoLogo(capturedUri);
    else if (activeCameraSlot === 'zipper') setPhotoZipper(capturedUri);

    setActiveCameraSlot(null);
  }

  async function handleSubmitProduct() {
    setStep(3); // Uploading
    setLoading(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Oturum bulunamadı. Lütfen giriş yapın.');

      // Collect all captured images
      const imagesToUpload = [photoFront, photoBack, photoBase, photoSide, photoLogo, photoZipper].filter(Boolean) as string[];

      // Insert product as pending with ALL required database columns
      const { data: product, error } = await supabase
        .from('products')
        .insert({
          model_name: name,
          brand,
          price: parseFloat(price),
          description: description || 'Peony Collective VIP Ön Kontrol Satış Talebi',
          material: material || 'Deri',
          condition: 'very_good', // Veritabanı NOT NULL kuralı
          gender: 'women', // Veritabanı NOT NULL kuralı
          category: 'bags', // Veritabanı NOT NULL kuralı
          subcategory: 'Omuz Çantası', // Veritabanı NOT NULL kuralı
          seller_id: user.id,
          status: 'pending',
          entrupy_status: 'pending',
          public_images: imagesToUpload.length > 0 ? imagesToUpload : ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500']
        })
        .select()
        .single();

      if (error) throw error;

      // Trigger Claude Vision Precheck asynchronously so seller doesn't wait
      try {
        fetch('https://peony-collective.com/api/vision-precheck', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id })
        }).catch(err => console.log('Vision precheck async trigger:', err));
      } catch (e) {
        // silent catch
      }

      setStep(4); // Success screen
    } catch (error: any) {
      alert('Yükleme hatası: ' + error.message);
      setStep(1);
    } finally {
      setLoading(false);
    }
  }

  const isFormValidForSubmit = photoFront && photoBack && photoLogo && photoZipper;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {step === 0 && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.landingContainer}>
            {/* Elegant Top Badge */}
            <View style={styles.tagBadge}>
              <Text style={styles.tagBadgeText}>{isEn ? '✦ CIRCULAR LUXURY ECONOMY' : '✦ DÖNGÜSEL LÜKS EKONOMİSİ'}</Text>
            </View>

            <Text style={styles.landingHeroTitle}>{isEn ? 'Rotate & Value Luxury' : 'Lüksü Döndürün ve Değer Katın'}</Text>
            <Text style={styles.landingHeroSubtitle}>
              {isEn 
                ? 'Let your iconic pieces start a new story instead of waiting in your wardrobe. Discover smart, effortless, and sustainable luxury selling with Peony.' 
                : 'İkonik parçalarınız dolabınızda beklemek yerine yeni bir hikayeye başlasın. Peony ile akıllı, zahmetsiz ve sürdürülebilir lüks satışını keşfedin.'}
            </Text>

            {/* Impact / Stats Summary Row */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{isEn ? '15 Days' : '15 Gün'}</Text>
                <Text style={styles.statLabel}>{isEn ? 'Avg. Sales Speed' : 'Ort. Satış Hızı'}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>%88</Text>
                <Text style={styles.statLabel}>{isEn ? 'Net Earnings Rate' : 'Net Kazanç Oranı'}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>12 kg</Text>
                <Text style={styles.statLabel}>{isEn ? 'Saved CO₂' : 'Tasarruf Edilen CO₂'}</Text>
              </View>
            </View>

            {/* Luxury Value Propositions */}
            <View style={styles.valueGroup}>
              <View style={styles.valueCard}>
                <View style={styles.valueIconWrapper}>
                  <Text style={styles.valueIcon}>🛡️</Text>
                </View>
                <View style={styles.valueTextWrapper}>
                  <Text style={styles.valueTitle}>{isEn ? 'Peony AI & Entrupy Protection' : 'Peony AI & Entrupy Koruması'}</Text>
                  <Text style={styles.valueDescription}>
                    {isEn 
                      ? 'The authenticity of your item is verified using Peony AI pre-examination and world-renowned Entrupy microscopic technology.'
                      : 'Ürününüzün orijinalliği, Peony AI ön analizi ve dünyaca ünlü Entrupy yapay zeka mikroskobik görüntüleme teknolojisiyle tescillenir.'}
                  </Text>
                </View>
              </View>

              <View style={styles.valueCard}>
                <View style={styles.valueIconWrapper}>
                  <Text style={styles.valueIcon}>💼</Text>
                </View>
                <View style={styles.valueTextWrapper}>
                  <Text style={styles.valueTitle}>{isEn ? 'VIP Concierge Experience' : 'VIP Concierge Deneyimi'}</Text>
                  <Text style={styles.valueDescription}>
                    {isEn 
                      ? 'Your item is picked up from your door via free insured courier. Professional studio photography, listing, and buyer relations are managed flawlessly by Peony experts.'
                      : 'Ürününüz kapınızdan ücretsiz sigortalı kuryeyle alınır. Profesyonel stüdyo fotoğrafçılığı, sergileme, listeleme ve alıcı ilişkileri Peony uzmanlarınca kusursuzca yönetilir.'}
                  </Text>
                </View>
              </View>

              <View style={styles.valueCard}>
                <View style={styles.valueIconWrapper}>
                  <Text style={styles.valueIcon}>🌍</Text>
                </View>
                <View style={styles.valueTextWrapper}>
                  <Text style={styles.valueTitle}>{isEn ? 'Sustainable Future' : 'Sürdürülebilir Yarınlar'}</Text>
                  <Text style={styles.valueDescription}>
                    {isEn 
                      ? 'Keeping luxury circular reduces water consumption and carbon footprint by up to %80 compared to producing new items. Transform your wardrobe into an ecological investment.'
                      : 'Lüks modayı döngüsel kılmak, yeni bir ürün üretimine kıyasla su tüketimini ve karbon ayak izini %80\'e kadar azaltır. Gardırobunuzu ekolojik bir yatırıma dönüştürün.'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Call to Action */}
            <TouchableOpacity style={styles.startBtn} onPress={() => setStep(1)}>
              <Text style={styles.startBtnText}>{isEn ? 'START SELLING REQUEST ✦' : 'SATIŞ TALEBİNİ BAŞLAT  ✦'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {step === 1 && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25, borderBottomWidth: 1, borderColor: COLORS.border, paddingBottom: 15 }}>
              <TouchableOpacity onPress={() => setStep(0)} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, marginRight: 15 }}>
                <Text style={{ fontSize: 18, color: COLORS.text, fontWeight: 'bold' }}>←</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text style={[styles.headerTitle, { fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif', fontSize: 24, fontWeight: 'normal', color: COLORS.text }]}>
                  {isEn ? 'Item Details' : 'Ürün Bilgileri'}
                </Text>
                <Text style={[styles.headerSubtitle, { marginBottom: 0, fontSize: 12, color: COLORS.textMuted }]}>
                  {isEn ? 'Provide the luxury details of your asset.' : 'Satmak istediğiniz lüks ürünün detaylarını girin.'}
                </Text>
              </View>
            </View>
            
            <View style={[styles.inputGroup, { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 }]}>
              <Text style={styles.label}>{isEn ? 'BRAND' : 'MARKA'}</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: COLORS.bg, borderRadius: 8 }]}
                placeholder={isEn ? "e.g. Bottega Veneta, Chanel" : "Örn. Bottega Veneta, Chanel, Louis Vuitton"}
                placeholderTextColor={COLORS.textMuted}
                value={brand}
                onChangeText={setBrand}
              />
            </View>

            <View style={[styles.inputGroup, { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1, marginTop: 15 }]}>
              <Text style={styles.label}>{isEn ? 'MODEL NAME' : 'MODEL ADI'}</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: COLORS.bg, borderRadius: 8 }]}
                placeholder={isEn ? "e.g. Cassette Bag, Classic Flap" : "Örn. Cassette Bag, Classic Flap"}
                placeholderTextColor={COLORS.textMuted}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={[styles.inputGroup, { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1, marginTop: 15 }]}>
              <Text style={styles.label}>{isEn ? 'PRICE (TL)' : 'FİYAT (TL)'}</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: COLORS.bg, borderRadius: 8 }]}
                placeholder="Örn. 145000"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
            </View>

            <View style={[styles.inputGroup, { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1, marginTop: 15 }]}>
              <Text style={styles.label}>{isEn ? 'MATERIAL' : 'MALZEME / MATERYAL'}</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: COLORS.bg, borderRadius: 8 }]}
                placeholder={isEn ? "e.g. Lambskin, Canvas" : "Örn. Kuzu Derisi, Canvas"}
                placeholderTextColor={COLORS.textMuted}
                value={material}
                onChangeText={setMaterial}
              />
            </View>

            <View style={[styles.inputGroup, { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1, marginTop: 15 }]}>
              <Text style={styles.label}>{isEn ? 'DESCRIPTION' : 'AÇIKLAMA'}</Text>
              <TextInput 
                style={[styles.input, styles.textArea, { backgroundColor: COLORS.bg, borderRadius: 8 }]}
                placeholder={isEn ? "Condition, wear, original box/invoice availability..." : "Ürünün kondisyonu, aşınma durumu, fatura/kutu varlığı hakkında bilgi yazın..."}
                placeholderTextColor={COLORS.textMuted}
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <TouchableOpacity style={[styles.primaryBtn, { borderRadius: 12, height: 52, marginTop: 20 }]} onPress={handleNextStep}>
              <Text style={styles.primaryBtnText}>{isEn ? 'CONTINUE TO CAM ✦' : 'TARAMAYI BAŞLAT ✦'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {step === 2 && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.gridContainer}>
            {/* Header / Brand info */}
            <View style={styles.gridHeaderBox}>
              <TouchableOpacity onPress={() => setStep(1)} style={styles.gridBackBtn}>
                <Text style={{ fontSize: 18, color: COLORS.text }}>←</Text>
              </TouchableOpacity>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.gridBrandTitle}>{brand || 'Lüks Marka'}</Text>
                <Text style={styles.gridModelSub}>{name || 'Model'}</Text>
              </View>
              <TouchableOpacity style={styles.guideBtn} onPress={() => setShowGuide(true)}>
                <Text style={styles.guideBtnText}>📖 {isEn ? 'Image Guide' : 'Fotoğraf Kılavuzu'}</Text>
              </TouchableOpacity>
            </View>

            {/* Sub-instruction label */}
            <Text style={styles.requiredLabel}>
              {isEn ? '* At least 4 required photos (Front, Back, Logo, Zipper) are needed.' : '* En az 4 zorunlu fotoğraf (Ön, Arka, Logo, Fermuar) yüklenmelidir.'}
            </Text>

            {/* Elegant 6-Grid Selector */}
            <View style={styles.photoGrid}>
              
              {/* Slot 1: Front */}
              <TouchableOpacity 
                style={[styles.gridSlot, photoFront && styles.gridSlotFilled]} 
                onPress={() => handleSlotPress('front')}
              >
                {photoFront ? (
                  <Image source={{ uri: photoFront }} style={styles.slotImage} />
                ) : (
                  <View style={styles.slotPlaceholder}>
                    <Text style={styles.slotIcon}>👜</Text>
                    <Text style={styles.slotTitle}>{isEn ? 'Front View' : 'Ön Yüzü'}</Text>
                    <Text style={styles.slotReqTag}>{isEn ? '* Required' : '* Zorunlu'}</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Slot 2: Back */}
              <TouchableOpacity 
                style={[styles.gridSlot, photoBack && styles.gridSlotFilled]} 
                onPress={() => handleSlotPress('back')}
              >
                {photoBack ? (
                  <Image source={{ uri: photoBack }} style={styles.slotImage} />
                ) : (
                  <View style={styles.slotPlaceholder}>
                    <Text style={styles.slotIcon}>💼</Text>
                    <Text style={styles.slotTitle}>{isEn ? 'Back View' : 'Arka Yüzü'}</Text>
                    <Text style={styles.slotReqTag}>{isEn ? '* Required' : '* Zorunlu'}</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Slot 3: Base */}
              <TouchableOpacity 
                style={[styles.gridSlot, photoBase && styles.gridSlotFilled]} 
                onPress={() => handleSlotPress('base')}
              >
                {photoBase ? (
                  <Image source={{ uri: photoBase }} style={styles.slotImage} />
                ) : (
                  <View style={styles.slotPlaceholder}>
                    <Text style={styles.slotIcon}>📏</Text>
                    <Text style={styles.slotTitle}>{isEn ? 'Base / Bottom' : 'Alt / Taban'}</Text>
                    <Text style={styles.slotOptTag}>{isEn ? 'Optional' : 'İsteğe Bağlı'}</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Slot 4: Side */}
              <TouchableOpacity 
                style={[styles.gridSlot, photoSide && styles.gridSlotFilled]} 
                onPress={() => handleSlotPress('side')}
              >
                {photoSide ? (
                  <Image source={{ uri: photoSide }} style={styles.slotImage} />
                ) : (
                  <View style={styles.slotPlaceholder}>
                    <Text style={styles.slotIcon}>📐</Text>
                    <Text style={styles.slotTitle}>{isEn ? 'Side Profile' : 'Yan Profil'}</Text>
                    <Text style={styles.slotOptTag}>{isEn ? 'Optional' : 'İsteğe Bağlı'}</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Slot 5: Inner Logo */}
              <TouchableOpacity 
                style={[styles.gridSlot, photoLogo && styles.gridSlotFilled]} 
                onPress={() => handleSlotPress('logo')}
              >
                {photoLogo ? (
                  <Image source={{ uri: photoLogo }} style={styles.slotImage} />
                ) : (
                  <View style={styles.slotPlaceholder}>
                    <Text style={styles.slotIcon}>🏷️</Text>
                    <Text style={styles.slotTitle}>{isEn ? 'Inner Logo' : 'İç Marka Logosu'}</Text>
                    <Text style={styles.slotReqTag}>{isEn ? '* Required' : '* Zorunlu'}</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Slot 6: Zipper/Hardware */}
              <TouchableOpacity 
                style={[styles.gridSlot, photoZipper && styles.gridSlotFilled]} 
                onPress={() => handleSlotPress('zipper')}
              >
                {photoZipper ? (
                  <Image source={{ uri: photoZipper }} style={styles.slotImage} />
                ) : (
                  <View style={styles.slotPlaceholder}>
                    <Text style={styles.slotIcon}>🔩</Text>
                    <Text style={styles.slotTitle}>{isEn ? 'Zipper / Lock' : 'Fermuar / Kilit'}</Text>
                    <Text style={styles.slotReqTag}>{isEn ? '* Required' : '* Zorunlu'}</Text>
                  </View>
                )}
              </TouchableOpacity>

            </View>

            {/* Submit Request Button */}
            <TouchableOpacity 
              style={[styles.submitBtn, !isFormValidForSubmit && styles.submitBtnDisabled]} 
              onPress={handleSubmitProduct}
              disabled={!isFormValidForSubmit}
            >
              <Text style={styles.submitBtnText}>{isEn ? 'SUBMIT FOR PRECHECK ✦' : 'ÖN İNCELEMEYE GÖNDER ✦'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* DETAILED PHOTO GUIDE MODAL */}
      {showGuide && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>{isEn ? 'Image Guide' : 'Fotoğraf Çekim Kılavuzu'}</Text>
              <TouchableOpacity onPress={() => setShowGuide(false)} style={styles.modalCloseBtn}>
                <Text style={{ fontSize: 16, color: COLORS.text, fontWeight: 'bold' }}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Modal Tabs Row */}
            <View style={styles.modalTabs}>
              <TouchableOpacity 
                style={[styles.modalTab, guideTab === 'details' && styles.modalTabActive]}
                onPress={() => setGuideTab('details')}
              >
                <Text style={[styles.modalTabText, guideTab === 'details' && styles.modalTabTextActive]}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalTab, guideTab === 'images' && styles.modalTabActive]}
                onPress={() => setGuideTab('images')}
              >
                <Text style={[styles.modalTabText, guideTab === 'images' && styles.modalTabTextActive]}>Images</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalTab, guideTab === 'zipper' && styles.modalTabActive]}
                onPress={() => setGuideTab('zipper')}
              >
                <Text style={[styles.modalTabText, guideTab === 'zipper' && styles.modalTabTextActive]}>Zipper</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalTab, guideTab === 'logo' && styles.modalTabActive]}
                onPress={() => setGuideTab('logo')}
              >
                <Text style={[styles.modalTabText, guideTab === 'logo' && styles.modalTabTextActive]}>Logo/Stamp</Text>
              </TouchableOpacity>
            </View>

            {/* Tab Contents */}
            <ScrollView contentContainerStyle={styles.modalScrollBody} showsVerticalScrollIndicator={false}>
              {guideTab === 'details' && (
                <View>
                  <Text style={styles.guideTipTitle}>✦ {isEn ? 'Item Details SKU Guidance' : 'Ürün SKU ve Referans Numarası'}</Text>
                  <Text style={styles.guideTipDesc}>
                    {isEn 
                      ? 'Enter any serial number, SKU or reference code stamped on the product. This helps us retrieve styling catalog metadata quickly.'
                      : 'Ürünün üzerine basılmış seri numarası, SKU veya model referans kodunu girin. Bu veri, stil katalog eşleşmelerini hızlandıracaktır.'}
                  </Text>
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' }} style={styles.guideSampleImg} />
                </View>
              )}

              {guideTab === 'images' && (
                <View>
                  <Text style={styles.guideTipTitle}>✦ {isEn ? 'Item Images - Front & Back' : 'Temel Çekim Açıları (Ön & Arka)'}</Text>
                  <Text style={styles.guideTipDesc}>
                    {isEn 
                      ? 'Place your bag on a clean, well-lit surface. Shoot straight-on at a 90-degree angle so all stitching symmetry is clearly visible.'
                      : 'Çantanızı temiz ve aydınlık bir zemine koyun. Karşıdan tam 90 derece açıyla, dikişlerin simetrisi net çıkacak şekilde fotoğraflayın.'}
                  </Text>
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400' }} style={styles.guideSampleImg} />
                </View>
              )}

              {guideTab === 'zipper' && (
                <View>
                  <Text style={styles.guideTipTitle}>✦ {isEn ? 'Zipper Pull & Slider base' : 'Fermuar Dişleri ve Metal Aksam'}</Text>
                  <Text style={styles.guideTipDesc}>
                    {isEn 
                      ? 'Capture a macro close-up of the zipper teeth, metal pulls and lock pins. Original hardware leaves distinct engraving patterns.'
                      : 'Fermuar dişleri, metal elcikler ve kilit pimlerini makro (yakın) olarak çekin. Orijinal metallerdeki damga desenleri kritik doğrulama noktasıdır.'}
                  </Text>
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' }} style={styles.guideSampleImg} />
                </View>
              )}

              {guideTab === 'logo' && (
                <View>
                  <Text style={styles.guideTipTitle}>✦ {isEn ? 'Logo Stamp & Serial Tag' : 'Marka Logosu & Seri No Baskısı'}</Text>
                  <Text style={styles.guideTipDesc}>
                    {isEn 
                      ? 'Locate and photograph the brand stamp inside. Ensure the font curves, stamping depth and embossing color are sharp and clean.'
                      : 'Çantanın içindeki marka baskı damgasını bulun. Font kıvrımlarının, damga derinliğinin ve yaldız renginin netçe okunmasına özen gösterin.'}
                  </Text>
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=400' }} style={styles.guideSampleImg} />
                </View>
              )}
            </ScrollView>

            <TouchableOpacity style={styles.modalCloseBtnBottom} onPress={() => setShowGuide(false)}>
              <Text style={styles.modalCloseBtnBottomText}>{isEn ? 'CLOSE GUIDE' : 'KILAVUZU KAPAT'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* SIMULATED CAMERA SCREEN MODAL */}
      {activeCameraSlot !== null && (
        <View style={styles.cameraOverlay}>
          <View style={styles.cameraOverlayContent}>
            <Text style={styles.cameraOverlayTitle}>
              {isEn ? `Capturing: ${activeCameraSlot.toUpperCase()}` : `Çekiliyor: ${activeCameraSlot.toUpperCase()}`}
            </Text>
            <View style={styles.cameraFrameSim}>
              {/* Virtual viewfinder guide line */}
              <View style={styles.viewfinderGuide} />
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' }} 
                style={styles.viewfinderBg} 
              />
            </View>

            <View style={styles.cameraOverlayActions}>
              <TouchableOpacity style={styles.cameraCancelBtn} onPress={() => setActiveCameraSlot(null)}>
                <Text style={styles.cameraCancelText}>{isEn ? 'Cancel' : 'Vazgeç'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cameraSnapBtn} onPress={handleCameraSnapSimulated}>
                <View style={styles.cameraSnapInner} />
              </TouchableOpacity>

              <View style={{ width: 60 }} />
            </View>
          </View>
        </View>
      )}

      {step === 3 && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>
            {isEn 
              ? 'Uploading details and initializing Peony AI authentication process...'
              : 'Ürün detayları kaydediliyor ve Peony AI analiz süreci başlatılıyor...'}
          </Text>
        </View>
      )}

      {step === 4 && (
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successTitle}>{isEn ? 'Request Received Successfully' : 'Talep Başarıyla Alındı'}</Text>
          <Text style={styles.successText}>
            {isEn 
              ? 'Your product photos have been securely uploaded. Peony AI precheck has been initiated.'
              : 'Çantanızın fotoğrafları kaydedildi. Peony AI ön kontrol analizi başlatılmıştır.'}
          </Text>
          <View style={styles.infoHighlightCard}>
            <Text style={styles.infoHighlightText}>
              {isEn 
                ? '🕒 Standard response time is 30 to 60 minutes during business hours (09:00 - 18:00). You will be notified via email.'
                : '🕒 Sonucun çıkması mesai saatleri (09:00 - 18:00) içerisinde ortalama 30 ile 60 dakikayı bulabilir. Sonuçlandığında kayıtlı e-posta adresinize bilgilendirme iletilecektir.'}
            </Text>
          </View>

          <TouchableOpacity style={styles.doneBtn} onPress={onSuccess}>
            <Text style={styles.doneBtnText}>{isEn ? 'DONE' : 'TAMAM'}</Text>
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
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: COLORS.text, // High contrast text instead of muted
    fontSize: 16,
    fontWeight: '600',
  },
  snapBtn: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 4,
    borderColor: COLORS.primary, // Luxury gold border instead of white
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  snapInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary, // Golden inner button
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
    marginTop: 20,
  },
  guidanceCard: {
    backgroundColor: '#F3ECE0', // Soft luxury beige
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(175, 145, 100, 0.2)',
    padding: 15,
    width: '100%',
    marginVertical: 10,
  },
  guidanceTextHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 5,
  },
  infoHighlightCard: {
    backgroundColor: 'rgba(175, 145, 100, 0.08)',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(175, 145, 100, 0.25)',
    padding: 12,
    marginTop: 15,
    width: '100%',
  },
  infoHighlightText: {
    fontSize: 12,
    color: '#8A6D3B', // Warm dark gold/brown text for readability
    lineHeight: 18,
    textAlign: 'center',
  },
  doneBtnText: {
    color: COLORS.bg,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 2,
  },
  landingContainer: {
    paddingBottom: 30,
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(175, 145, 100, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(175, 145, 100, 0.3)',
    marginBottom: 16,
  },
  tagBadgeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  landingHeroTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.text,
    lineHeight: 33,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
  },
  landingHeroSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 9,
    color: COLORS.textMuted,
    marginTop: 4,
    fontWeight: '600',
  },
  valueGroup: {
    marginBottom: 25,
  },
  valueCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 15,
    marginBottom: 15,
  },
  valueIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(175, 145, 100, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  valueIcon: {
    fontSize: 18,
  },
  valueTextWrapper: {
    flex: 1,
  },
  valueTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  valueDescription: {
    fontSize: 11.5,
    color: COLORS.textMuted,
    lineHeight: 17,
  },
  startBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1.5,
  },
  gridContainer: {
    paddingBottom: 40,
  },
  gridHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingBottom: 15,
  },
  gridBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gridBrandTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  gridModelSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  guideBtn: {
    backgroundColor: 'rgba(175, 145, 100, 0.08)',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  guideBtnText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  requiredLabel: {
    fontSize: 10.5,
    color: COLORS.primary,
    marginBottom: 15,
    fontWeight: '600',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  gridSlot: {
    width: (width - 56) / 2,
    height: 120,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  gridSlotFilled: {
    borderStyle: 'solid',
    borderColor: COLORS.primary,
  },
  slotImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  slotPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  slotIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  slotTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  slotReqTag: {
    fontSize: 8.5,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: '600',
  },
  slotOptTag: {
    fontSize: 8.5,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  submitBtnDisabled: {
    backgroundColor: '#C8C9CC',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(18, 19, 26, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalContent: {
    width: width - 40,
    height: '80%',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingBottom: 12,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  modalCloseBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg,
    borderRadius: 8,
    padding: 3,
    marginVertical: 15,
  },
  modalTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  modalTabActive: {
    backgroundColor: COLORS.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  modalTabText: {
    fontSize: 10.5,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  modalTabTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  modalScrollBody: {
    paddingBottom: 20,
  },
  guideTipTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  guideTipDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 18,
    marginBottom: 15,
  },
  guideSampleImg: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  modalCloseBtnBottom: {
    backgroundColor: COLORS.text,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  modalCloseBtnBottomText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1.5,
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#12131A',
    justifyContent: 'space-between',
    paddingVertical: 40,
    zIndex: 10000,
  },
  cameraOverlayContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraOverlayTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  cameraFrameSim: {
    width: width - 40,
    height: width - 40,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.primary,
    position: 'relative',
  },
  viewfinderGuide: {
    position: 'absolute',
    top: '15%',
    bottom: '15%',
    left: '10%',
    right: '10%',
    borderWidth: 1,
    borderColor: 'rgba(175, 145, 100, 0.4)',
    borderStyle: 'dashed',
    borderRadius: 8,
    zIndex: 10,
  },
  viewfinderBg: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  cameraOverlayActions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  cameraCancelBtn: {
    width: 60,
  },
  cameraCancelText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  cameraSnapBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraSnapInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
  }
});
