/**
 * @file SellScreen.tsx
 * @description Peony Collective Mobil Uygulaması Satış / Konsinye Ekranı.
 * 
 * Bu ekran kullanıcıların ellerindeki lüks ürünleri satmak veya konsinye bırakmak üzere
 * mobil uygulama üzerinden başvuru oluşturmalarını sağlar.
 */

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

import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#FBFBFA', // Luxury off-white
  card: '#FFFFFF', // Clean white
  text: '#1A1A1A', // High-contrast charcoal text
  textMuted: '#7E8085', // Slate gray
  primary: '#AF9164', // Classic champagne gold
  primaryDark: '#8C7043',
  border: '#E8E8E6', // Thin dividers
  accent: '#10B981', // Emerald green
  danger: '#EF4444',
  chipBg: '#F3F3F0'
};

interface SellScreenProps {
  onSuccess: () => void;
}

// Product Categories Definition
interface CategoryConfig {
  id: string;
  dbCategory: string;
  nameTr: string;
  nameEn: string;
  icon: string;
  slots: {
    key: string;
    labelTr: string;
    labelEn: string;
    required: boolean;
    icon: string;
    guideTr: string;
    guideEn: string;
    guideImg: string;
  }[];
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    id: 'bags',
    dbCategory: 'bags',
    nameTr: 'Çanta',
    nameEn: 'Bags',
    icon: '👜',
    slots: [
      {
        key: 'front',
        labelTr: 'Ön Yüzü',
        labelEn: 'Front View',
        required: true,
        icon: '👜',
        guideTr: 'Çantanızı düz ve aydınlık bir zemine koyup tam karşıdan dik açıyla çekin.',
        guideEn: 'Place bag on a flat surface and shoot straight on.',
        guideImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600'
      },
      {
        key: 'back',
        labelTr: 'Arka Yüzü',
        labelEn: 'Back View',
        required: true,
        icon: '💼',
        guideTr: 'Arka cep dikişlerinin ve derinin genel simetrisinin göründüğünden emin olun.',
        guideEn: 'Ensure rear stitching and leather alignment are clear.',
        guideImg: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600'
      },
      {
        key: 'base',
        labelTr: 'Taban / Alt',
        labelEn: 'Base / Bottom',
        required: false,
        icon: '📏',
        guideTr: 'Tabandaki koruyucu metal ayaklar ve köşe dikişlerini net çekin.',
        guideEn: 'Capture metal feet and bottom corner wear clearly.',
        guideImg: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=600'
      },
      {
        key: 'logo',
        labelTr: 'İç Marka Logosu & Kod',
        labelEn: 'Inner Brand Logo & Code',
        required: true,
        icon: '🏷️',
        guideTr: 'Çantanın içindeki yaldızlı marka damgası ve seri kod etiketini makro çekin.',
        guideEn: 'Close-up of internal gold stamp & date/serial code.',
        guideImg: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'
      },
      {
        key: 'zipper',
        labelTr: 'Fermuar & Metal Aksam',
        labelEn: 'Zipper & Hardware',
        required: true,
        icon: '🔩',
        guideTr: 'Fermuar başlığı üzerindeki marka kazıması ve kilit detaylarını çekin.',
        guideEn: 'Capture hardware engravings and zipper pulls.',
        guideImg: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600'
      }
    ]
  },
  {
    id: 'watches',
    dbCategory: 'watches',
    nameTr: 'Saat',
    nameEn: 'Watches',
    icon: '⌚',
    slots: [
      {
        key: 'dial',
        labelTr: 'Kadran & Ön Yüz',
        labelEn: 'Dial & Front',
        required: true,
        icon: '⌚',
        guideTr: 'Saatin ön kadranını camda yansıma olmadan makro şekilde çekin.',
        guideEn: 'Capture the front dial clearly without glass glare.',
        guideImg: require('../../assets/guides/watch_dial.jpeg')
      },
      {
        key: 'caseback',
        labelTr: 'Arka Kapak & Seri No',
        labelEn: 'Caseback & Serial No',
        required: true,
        icon: '🔍',
        guideTr: 'Arka kapaktaki seri numarası ve çelik/altın gravürünü makro çekin.',
        guideEn: 'Macro shot of serial number and caseback engraving.',
        guideImg: require('../../assets/guides/watch_caseback.jpeg')
      },
      {
        key: 'clasp',
        labelTr: 'Klips & Toka',
        labelEn: 'Clasp & Buckle',
        required: true,
        icon: '🔗',
        guideTr: 'Kordondaki tokada yer alan marka amblemini çekin.',
        guideEn: 'Photograph the brand logo stamp on the clasp.',
        guideImg: require('../../assets/guides/watch_clasp.jpeg')
      },
      {
        key: 'side',
        labelTr: 'Ayar Kolu / Çerçeve',
        labelEn: 'Crown & Bezel Side',
        required: false,
        icon: '⚙️',
        guideTr: 'Saatin kurma kolundaki amblemi ve yan kasa profilini fotoğraflayın.',
        guideEn: 'Capture the crown emblem and side profile.',
        guideImg: require('../../assets/guides/watch_crown_side.jpeg')
      }
    ]
  },
  {
    id: 'jewelry',
    dbCategory: 'jewelry',
    nameTr: 'Takı & Mücevher',
    nameEn: 'Jewelry',
    icon: '💎',
    slots: [
      {
        key: 'overall',
        labelTr: 'Genel Görünüm',
        labelEn: 'Full Overview',
        required: true,
        icon: '💎',
        guideTr: 'Takının tüm kıvrım ve taşlarını net bir zeminde çekin.',
        guideEn: 'Full shot of the jewelry piece on neutral background.',
        guideImg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600'
      },
      {
        key: 'hallmark',
        labelTr: 'Damga & Ayar Kodu',
        labelEn: 'Hallmark & Stamp',
        required: true,
        icon: '🔍',
        guideTr: 'Altın/Platin ayar damgası (750, 18K vb.) ve marka imzasını çekin.',
        guideEn: 'Close-up of metal hallmark, karat stamp & brand logo.',
        guideImg: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600'
      },
      {
        key: 'clasp',
        labelTr: 'Kilit & Bağlantı',
        labelEn: 'Lock & Clasp',
        required: true,
        icon: '🔒',
        guideTr: 'Klips veya kilit mekanizmasının detayını çekin.',
        guideEn: 'Show the clasp or locking mechanism detail.',
        guideImg: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600'
      }
    ]
  },
  {
    id: 'shoes',
    dbCategory: 'shoes',
    nameTr: 'Ayakkabı',
    nameEn: 'Shoes',
    icon: '👠',
    slots: [
      {
        key: 'sole',
        labelTr: 'Dış Taban / Alt',
        labelEn: 'Outsole / Bottom',
        required: true,
        icon: '👟',
        guideTr: 'Ayakkabının alt tabanındaki marka ve beden damgasını çekin.',
        guideEn: 'Capture outsole pattern, brand stamp, and size code.',
        guideImg: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600'
      },
      {
        key: 'side',
        labelTr: 'Yan Profil',
        labelEn: 'Side Profile',
        required: true,
        icon: '👠',
        guideTr: 'Çift halindeki yan duruşunu fotoğraflayın.',
        guideEn: 'Photograph the pair from the side profile.',
        guideImg: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600'
      },
      {
        key: 'insole',
        labelTr: 'İç Taban & Beden',
        labelEn: 'Insole & Size Tag',
        required: true,
        icon: '🏷️',
        guideTr: 'İç tabandaki yaldız baskıyı ve iç etiketi çekin.',
        guideEn: 'Show insole logo print and inner size label.',
        guideImg: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600'
      }
    ]
  },
  {
    id: 'clothing',
    dbCategory: 'clothing',
    nameTr: 'Giyim',
    nameEn: 'Clothing',
    icon: '👗',
    slots: [
      {
        key: 'front',
        labelTr: 'Ön Görünüm',
        labelEn: 'Front Overview',
        required: true,
        icon: '👗',
        guideTr: 'Kıyafeti askıda veya düz zeminde tam boy çekin.',
        guideEn: 'Full frontal shot on a hanger or flat surface.',
        guideImg: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'
      },
      {
        key: 'necktag',
        labelTr: 'Yaka / Marka Etiketi',
        labelEn: 'Neck / Brand Tag',
        required: true,
        icon: '🏷️',
        guideTr: 'Yakada bulunan ana marka etiketini yakın çekin.',
        guideEn: 'Close-up of main neck brand tag and stitching.',
        guideImg: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600'
      },
      {
        key: 'washtag',
        labelTr: 'İç Yıkama Etiketi',
        labelEn: 'Care & Wash Tag',
        required: true,
        icon: '📄',
        guideTr: 'Kumaş kompozisyonu ve seri kodunun olduğu iç etiketi çekin.',
        guideEn: 'Capture inner wash tag with serial & fabric details.',
        guideImg: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600'
      }
    ]
  },
  {
    id: 'accessories',
    dbCategory: 'accessories',
    nameTr: 'Gözlük & Aksesuar',
    nameEn: 'Eyewear & Accessories',
    icon: '🕶️',
    slots: [
      {
        key: 'front',
        labelTr: 'Genel Görünüm',
        labelEn: 'Full Overview',
        required: true,
        icon: '🕶️',
        guideTr: 'Ürünün ön cepheden açısını çekin.',
        guideEn: 'Capture product from straight ahead.',
        guideImg: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600'
      },
      {
        key: 'code',
        labelTr: 'Sap / Seri Kod Baskısı',
        labelEn: 'Temple Serial Stamp',
        required: true,
        icon: '🔍',
        guideTr: 'Gözlük sapındaki veya aksesuarın içindeki model ve renk kodunu çekin.',
        guideEn: 'Photograph serial/model stamp inside the temple arm.',
        guideImg: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600'
      },
      {
        key: 'case',
        labelTr: 'Kutu & Kılıf',
        labelEn: 'Box & Case',
        required: false,
        icon: '📦',
        guideTr: 'Orijinal kılıf, temizleme bezi veya sertifikayı çekin.',
        guideEn: 'Show original case, cloth, and inclusions.',
        guideImg: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600'
      }
    ]
  }
];

// Popular Brands Quick Chips
const POPULAR_BRANDS = [
  'Chanel', 'Hermès', 'Louis Vuitton', 'Rolex', 'Cartier', 
  'Bottega Veneta', 'Gucci', 'Prada', 'Dior', 'Saint Laurent', 'Audemars Piguet'
];

export default function SellScreen({ onSuccess }: SellScreenProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 0: Landing, 1: Category Select, 2: Info Form, 3: Photo Grid, 4: Preview, 5: Loading, 6: Success

  // Form States
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('bags');
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('Deri / Deri Aksam');
  const [condition, setCondition] = useState<'new_with_tags' | 'very_good' | 'good' | 'fair'>('very_good');
  
  // Inclusions (Box, Invoice, Certificate)
  const [hasBox, setHasBox] = useState(false);
  const [hasInvoice, setHasInvoice] = useState(false);
  const [hasCertificate, setHasCertificate] = useState(false);

  // Photo States dictionary: { slotKey: imageUri }
  const [capturedPhotos, setCapturedPhotos] = useState<{ [slotKey: string]: string }>({});
  
  // Active Camera Slot for Simulation Modal
  const [activeSlotKey, setActiveSlotKey] = useState<string | null>(null);

  // Active Guide Modal
  const [showGuide, setShowGuide] = useState(false);
  const [activeGuideSlotKey, setActiveGuideSlotKey] = useState<string>('front');

  const isEn = t('wishlistEmpty') === 'Your wishlist is empty.';

  // Current category config
  const currentCategory = CATEGORY_CONFIGS.find(c => c.id === selectedCategoryId) || CATEGORY_CONFIGS[0];

  function handleSelectCategory(catId: string) {
    setSelectedCategoryId(catId);
    setCapturedPhotos({}); // Reset photos when category changes
    setStep(2); // Move to info form
  }

  // Real Camera & Gallery Picker Launchers
  async function handleLaunchCamera(slotKey: string) {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        alert(isEn ? 'Camera permission is required to take photo.' : 'Fotoğraf çekebilmek için kamera izni vermeniz gerekmektedir.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const capturedUri = result.assets[0].uri;
        setCapturedPhotos(prev => ({
          ...prev,
          [slotKey]: capturedUri
        }));
      }
    } catch (err: any) {
      alert(isEn ? 'Camera Error: ' + err.message : 'Kamera hatası: ' + err.message);
    }
  }

  async function handleLaunchGallery(slotKey: string) {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert(isEn ? 'Gallery permission is required.' : 'Fotoğraf seçebilmek için galeri izni vermeniz gerekmektedir.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setCapturedPhotos(prev => ({
          ...prev,
          [slotKey]: selectedUri
        }));
      }
    } catch (err: any) {
      alert(isEn ? 'Gallery Error: ' + err.message : 'Galeri hatası: ' + err.message);
    }
  }

  function handlePhotoCapture(slotKey: string) {
    // Show Action Sheet option via Modal or direct trigger
    setActiveSlotKey(slotKey);
  }

  function handleSimulatedSnap() {
    if (!activeSlotKey) return;
    
    // Demo realistic luxury images mapping based on category & slot
    const demoImages: { [key: string]: string } = {
      bags_front: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600',
      bags_back: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600',
      bags_base: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=600',
      bags_logo: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
      bags_zipper: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600',

      watches_dial: 'https://images.gemini.google.com/antigravity/user_uploads/0e47b08b-e5bf-449e-98e6-4e296989a3b2/4_dial_front.png',
      watches_caseback: 'https://images.gemini.google.com/antigravity/user_uploads/0e47b08b-e5bf-449e-98e6-4e296989a3b2/3_caseback.png',
      watches_clasp: 'https://images.gemini.google.com/antigravity/user_uploads/0e47b08b-e5bf-449e-98e6-4e296989a3b2/2_clasp.png',
      watches_side: 'https://images.gemini.google.com/antigravity/user_uploads/0e47b08b-e5bf-449e-98e6-4e296989a3b2/1_crown_side.png',

      jewelry_overall: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
      jewelry_hallmark: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
      jewelry_clasp: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600',

      shoes_sole: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600',
      shoes_side: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600',
      shoes_insole: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600',

      clothing_front: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600',
      clothing_necktag: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600',
      clothing_washtag: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600',

      accessories_front: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
      accessories_code: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
      accessories_case: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600'
    };

    const lookupKey = `${selectedCategoryId}_${activeSlotKey}`;
    const uri = demoImages[lookupKey] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600';

    setCapturedPhotos(prev => ({
      ...prev,
      [activeSlotKey]: uri
    }));
    setActiveSlotKey(null);
  }

  // Validate if all required photos for category are provided
  const missingRequiredSlots = currentCategory.slots.filter(s => s.required && !capturedPhotos[s.key]);
  const isPhotoStepValid = missingRequiredSlots.length === 0;

  // Helper function to upload local device image URI to Supabase Storage
  async function uploadImageToSupabase(fileUri: string): Promise<string> {
    // If image is already an HTTP/HTTPS URL, return as is
    if (fileUri.startsWith('http://') || fileUri.startsWith('https://')) {
      return fileUri;
    }

    try {
      const ext = fileUri.split('.').pop()?.toLowerCase() || 'jpg';
      const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
      const filePath = `products/${fileName}`;

      // Create FormData compatible with React Native fetch & Supabase
      const formData = new FormData();
      formData.append('file', {
        uri: Platform.OS === 'android' ? fileUri : fileUri.replace('file://', ''),
        name: fileName,
        type: mimeType,
      } as any);

      // Upload directly using Supabase storage endpoint / fetch API for React Native stability
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, formData, {
          contentType: mimeType,
          upsert: true
        });

      if (error) {
        console.warn('Supabase storage upload warning:', error.message);
        // Fallback: get public URL anyway if uploaded or use CDN fallback
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl || fileUri;
    } catch (err) {
      console.error('Failed to convert local image blob for Supabase:', err);
      return fileUri;
    }
  }

  async function handleSubmitProduct() {
    setStep(5); // Uploading loading
    setLoading(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error(isEn ? 'Please log in to continue.' : 'Oturum bulunamadı. Lütfen giriş yapın.');

      const localPhotos = Object.values(capturedPhotos).filter(Boolean);

      // Convert all local phone URIs to public Supabase Storage HTTPS URLs concurrently
      const uploadedImagesList = await Promise.all(
        localPhotos.map(uri => uploadImageToSupabase(uri))
      );

      // Build inclusion text description
      const inclusions = [];
      if (hasBox) inclusions.push(isEn ? 'Original Box' : 'Orijinal Kutu');
      if (hasInvoice) inclusions.push(isEn ? 'Original Invoice' : 'Orijinal Fatura');
      if (hasCertificate) inclusions.push(isEn ? 'Certificate' : 'Sertifika');

      const fullDescription = [
        description,
        inclusions.length > 0 ? `[Aksesuarlar: ${inclusions.join(', ')}]` : ''
      ].filter(Boolean).join('\n\n');

      const { data: product, error } = await supabase
        .from('products')
        .insert({
          model_name: name,
          brand,
          price: parseFloat(price),
          description: fullDescription || 'Peony VIP Ekspertiz Talebi',
          material: material || 'Deri',
          condition: condition,
          gender: 'unisex',
          category: currentCategory.dbCategory,
          subcategory: currentCategory.nameTr,
          seller_id: user.id,
          status: 'pending',
          entrupy_status: 'pending',
          public_images: uploadedImagesList.length > 0 ? uploadedImagesList : ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500']
        })
        .select()
        .single();

      if (error) throw error;

      // Trigger Peony AI precheck asynchronously
      try {
        fetch('https://peony-collective.com/api/vision-precheck', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id })
        }).catch(err => console.log('Peony AI vision precheck async trigger:', err));
      } catch (e) {
        // silent catch
      }

      setStep(6); // Success
    } catch (error: any) {
      alert(isEn ? 'Upload Error: ' + error.message : 'Yükleme hatası: ' + error.message);
      setStep(2);
    } finally {
      setLoading(false);
    }
  }

  // RENDER STEPPER HEADER
  const renderStepper = () => (
    <View style={styles.stepperContainer}>
      {[
        { stepNum: 1, title: isEn ? 'Category' : 'Kategori' },
        { stepNum: 2, title: isEn ? 'Details' : 'Detaylar' },
        { stepNum: 3, title: isEn ? 'Photos' : 'Fotoğraflar' },
        { stepNum: 4, title: isEn ? 'Review' : 'Ön İzleme' }
      ].map((item, idx) => {
        const isActive = step === item.stepNum;
        const isDone = step > item.stepNum;
        return (
          <View key={item.stepNum} style={styles.stepItem}>
            <View style={[styles.stepCircle, isActive && styles.stepCircleActive, isDone && styles.stepCircleDone]}>
              <Text style={[styles.stepNumberText, (isActive || isDone) && styles.stepNumberTextActive]}>
                {isDone ? '✓' : item.stepNum}
              </Text>
            </View>
            <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>{item.title}</Text>
            {idx < 3 && <View style={[styles.stepLine, isDone && styles.stepLineDone]} />}
          </View>
        );
      })}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* STEP 0: LANDING */}
      {step === 0 && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.landingContainer}>
            <View style={styles.tagBadge}>
              <Text style={styles.tagBadgeText}>{isEn ? '✦ CIRCULAR LUXURY APPRAISAL' : '✦ DÖNGÜSEL LÜKS EKSPERTİZİ'}</Text>
            </View>

            <Text style={styles.landingHeroTitle}>{isEn ? 'Value & Authenticate Luxury' : 'Lüksü Onaylatın ve Değer Katın'}</Text>
            <Text style={styles.landingHeroSubtitle}>
              {isEn 
                ? 'Submit your luxury items for professional Peony AI pre-evaluation & expert authentication. Experience seamless VIP consignment selling.' 
                : 'Lüks parçalarınızı Peony AI ön incelemesi ve uzman ekspertiz sürecine gönderin. İkonik parçalarınıza kolayca değer biçin.'}
            </Text>

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
                <Text style={styles.statValue}>%100</Text>
                <Text style={styles.statLabel}>{isEn ? 'Guaranteed' : 'Orijinallik Garantisi'}</Text>
              </View>
            </View>

            <View style={styles.valueGroup}>
              <View style={styles.valueCard}>
                <View style={styles.valueIconWrapper}>
                  <Text style={styles.valueIcon}>💎</Text>
                </View>
                <View style={styles.valueTextWrapper}>
                  <Text style={styles.valueTitle}>{isEn ? 'Peony AI & Entrupy Protection' : 'Peony AI & Entrupy Güvencesi'}</Text>
                  <Text style={styles.valueDescription}>
                    {isEn 
                      ? 'Every asset undergoes intelligent visual analysis with Peony AI followed by microscopic Entrupy verification.'
                      : 'Her ürün önce Peony AI akıllı görsel analizi, ardından mikroskobik Entrupy teknolojisiyle tescillenir.'}
                  </Text>
                </View>
              </View>

              <View style={styles.valueCard}>
                <View style={styles.valueIconWrapper}>
                  <Text style={styles.valueIcon}>💼</Text>
                </View>
                <View style={styles.valueTextWrapper}>
                  <Text style={styles.valueTitle}>{isEn ? 'VIP Concierge Experience' : 'VIP Kurye & Stüdyo Hizmeti'}</Text>
                  <Text style={styles.valueDescription}>
                    {isEn 
                      ? 'Free insured pickup from your door. Professional photography and listing managed entirely by Peony.'
                      : 'Kapınızdan ücretsiz sigortalı kuryeyle teslim alma. Profesyonel stüdyo çekimleri ve sergileme Peony tarafından yönetilir.'}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.startBtn} onPress={() => setStep(1)}>
              <Text style={styles.startBtnText}>{isEn ? 'START APPRAISAL REQUEST ✦' : 'ONAY & SATIŞ TALEBİ BAŞLAT ✦'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* STEP 1: CATEGORY SELECTION */}
      {step === 1 && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {renderStepper()}

          <View style={styles.stepHeaderBox}>
            <TouchableOpacity onPress={() => setStep(0)} style={styles.backBtnCircle}>
              <Text style={styles.backBtnText}>←</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.screenTitle}>{isEn ? 'Select Category' : 'Ürün Kategorisini Seçin'}</Text>
              <Text style={styles.screenSubTitle}>{isEn ? 'Choose the category of your luxury asset.' : 'Ekspertize göndereceğiniz lüks parçanın türü.'}</Text>
            </View>
          </View>

          <View style={styles.categoryGrid}>
            {CATEGORY_CONFIGS.map(cat => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <TouchableOpacity 
                  key={cat.id} 
                  style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                  onPress={() => handleSelectCategory(cat.id)}
                >
                  <View style={styles.categoryIconCircle}>
                    <Text style={{ fontSize: 28 }}>{cat.icon}</Text>
                  </View>
                  <Text style={[styles.categoryCardTitle, isSelected && styles.categoryCardTitleSelected]}>
                    {isEn ? cat.nameEn : cat.nameTr}
                  </Text>
                  <Text style={styles.categoryCardSub}>
                    {cat.slots.length} {isEn ? 'Guided Photos' : 'Çekim Açısı'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}

      {/* STEP 2: ITEM DETAILS FORM */}
      {step === 2 && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {renderStepper()}

          <View style={styles.stepHeaderBox}>
            <TouchableOpacity onPress={() => setStep(1)} style={styles.backBtnCircle}>
              <Text style={styles.backBtnText}>←</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.screenTitle}>{isEn ? 'Item Details' : 'Ürün Bilgileri'}</Text>
              <Text style={styles.screenSubTitle}>
                {isEn ? `${currentCategory.nameEn} details & features` : `${currentCategory.nameTr} detayları ve bilgileri`}
              </Text>
            </View>
          </View>

          {/* Quick Brand Select Chips */}
          <View style={styles.formSectionCard}>
            <Text style={styles.label}>{isEn ? 'BRAND' : 'MARKA'}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
              {POPULAR_BRANDS.map(b => (
                <TouchableOpacity 
                  key={b} 
                  style={[styles.brandChip, brand === b && styles.brandChipActive]}
                  onPress={() => setBrand(b)}
                >
                  <Text style={[styles.brandChipText, brand === b && styles.brandChipTextActive]}>{b}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TextInput 
              style={styles.input}
              placeholder={isEn ? "Or enter brand name (e.g. Bottega Veneta)" : "Veya marka adını yazın (Örn. Chanel, Rolex)"}
              placeholderTextColor={COLORS.textMuted}
              value={brand}
              onChangeText={setBrand}
            />
          </View>

          {/* Model Name & Price */}
          <View style={styles.formSectionCard}>
            <Text style={styles.label}>{isEn ? 'MODEL NAME / LINE' : 'MODEL ADI / SERİ'}</Text>
            <TextInput 
              style={styles.input}
              placeholder={isEn ? "e.g. Submariner, Classic Flap, Birkin" : "Örn. Submariner, Classic Flap, Birkin 30"}
              placeholderTextColor={COLORS.textMuted}
              value={name}
              onChangeText={setName}
            />

            <Text style={[styles.label, { marginTop: 15 }]}>{isEn ? 'ESTIMATED PRICE (TL)' : 'HEDEF SATIŞ FİYATI (TL)'}</Text>
            <TextInput 
              style={styles.input}
              placeholder="Örn. 145000"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          {/* Condition Select */}
          <View style={styles.formSectionCard}>
            <Text style={styles.label}>{isEn ? 'CONDITION' : 'KONDİSYON'}</Text>
            <View style={styles.conditionRow}>
              {[
                { id: 'new_with_tags', labelTr: 'Sıfır / Etiketli', labelEn: 'New with tags' },
                { id: 'very_good', labelTr: 'Çok İyi', labelEn: 'Very Good' },
                { id: 'good', labelTr: 'İyi', labelEn: 'Good' },
                { id: 'fair', labelTr: 'Kullanılmış', labelEn: 'Fair' }
              ].map(item => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.conditionChip, condition === item.id && styles.conditionChipActive]}
                  onPress={() => setCondition(item.id as any)}
                >
                  <Text style={[styles.conditionChipText, condition === item.id && styles.conditionChipTextActive]}>
                    {isEn ? item.labelEn : item.labelTr}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { marginTop: 15 }]}>{isEn ? 'MATERIAL / FABRIC' : 'MATERYAL / METALS / KUMAŞ'}</Text>
            <TextInput 
              style={styles.input}
              placeholder={isEn ? "e.g. 18k Gold, Caviar Leather, Stainless Steel" : "Örn. Kuzu Derisi, 18K Çelik-Altın, İpek"}
              placeholderTextColor={COLORS.textMuted}
              value={material}
              onChangeText={setMaterial}
            />
          </View>

          {/* Inclusions Toggle Chips */}
          <View style={styles.formSectionCard}>
            <Text style={styles.label}>{isEn ? 'MEVCUT AKSESUAR & BELGELER' : 'MEVCUT AKSESUAR & BELGELER'}</Text>
            <View style={styles.inclusionRow}>
              <TouchableOpacity 
                style={[styles.inclusionChip, hasBox && styles.inclusionChipActive]}
                onPress={() => setHasBox(!hasBox)}
              >
                <Text style={[styles.inclusionChipText, hasBox && styles.inclusionChipTextActive]}>
                  {hasBox ? '✓ ' : '+ '}{isEn ? 'Original Box' : 'Orijinal Kutu'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.inclusionChip, hasInvoice && styles.inclusionChipActive]}
                onPress={() => setHasInvoice(!hasInvoice)}
              >
                <Text style={[styles.inclusionChipText, hasInvoice && styles.inclusionChipTextActive]}>
                  {hasInvoice ? '✓ ' : '+ '}{isEn ? 'Invoice' : 'Fatura'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.inclusionChip, hasCertificate && styles.inclusionChipActive]}
                onPress={() => setHasCertificate(!hasCertificate)}
              >
                <Text style={[styles.inclusionChipText, hasCertificate && styles.inclusionChipTextActive]}>
                  {hasCertificate ? '✓ ' : '+ '}{isEn ? 'Certificate / Card' : 'Sertifika / Kart'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.label, { marginTop: 15 }]}>{isEn ? 'ADDITIONAL DESCRIPTION' : 'EK AÇIKLAMA (OPSİYONEL)'}</Text>
            <TextInput 
              style={[styles.input, styles.textArea]}
              placeholder={isEn ? "Notes regarding wear, scratches or purchase year..." : "Ürünün durumu, kullanım izleri veya satın alma yılı hakkında notlar..."}
              placeholderTextColor={COLORS.textMuted}
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <TouchableOpacity 
            style={styles.primaryBtn} 
            onPress={() => {
              if (!brand || !name || !price) {
                alert(isEn ? 'Please fill in brand, model name and price.' : 'Lütfen marka, model adı ve fiyat alanlarını doldurun.');
                return;
              }
              setStep(3);
            }}
          >
            <Text style={styles.primaryBtnText}>{isEn ? 'CONTINUE TO GUIDED PHOTOS ✦' : 'FOTOĞRAF ÇEKİMİNE GEÇ ✦'}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* STEP 3: GUIDED PHOTO GRID */}
      {step === 3 && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {renderStepper()}

          <View style={styles.stepHeaderBox}>
            <TouchableOpacity onPress={() => setStep(2)} style={styles.backBtnCircle}>
              <Text style={styles.backBtnText}>←</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.screenTitle}>
                {isEn ? `${currentCategory.nameEn} Photos` : `${currentCategory.nameTr} Fotoğrafları`}
              </Text>
              <Text style={styles.screenSubTitle}>
                {isEn ? 'Peony AI requires guided clear close-ups.' : 'Peony AI doğrulaması için özel açılardan fotoğraf yükleyin.'}
              </Text>
            </View>
          </View>

          <Text style={styles.requiredTagNotice}>
            {isEn ? '* Red border slots are mandatory for authentication.' : '* Kırmızı işaretli alanlar zorunlu çekim açılarıdır.'}
          </Text>

          {/* Dynamic Category Photo Grid */}
          <View style={styles.photoGrid}>
            {currentCategory.slots.map(slot => {
              const photoUri = capturedPhotos[slot.key];
              return (
                <View key={slot.key} style={styles.slotContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.gridSlot, 
                      slot.required && !photoUri && styles.gridSlotRequired,
                      photoUri && styles.gridSlotFilled
                    ]} 
                    onPress={() => handlePhotoCapture(slot.key)}
                  >
                    {photoUri ? (
                      <Image source={{ uri: photoUri }} style={styles.slotImage} />
                    ) : (
                      <View style={styles.slotPlaceholder}>
                        <Text style={styles.slotIcon}>{slot.icon}</Text>
                        <Text style={styles.slotTitle}>{isEn ? slot.labelEn : slot.labelTr}</Text>
                        <Text style={slot.required ? styles.slotReqTag : styles.slotOptTag}>
                          {slot.required ? (isEn ? '* Required' : '* Zorunlu') : (isEn ? 'Optional' : 'İsteğe Bağlı')}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  {/* Info Guide trigger per slot */}
                  <TouchableOpacity 
                    style={styles.slotGuideTrigger} 
                    onPress={() => {
                      setActiveGuideSlotKey(slot.key);
                      setShowGuide(true);
                    }}
                  >
                    <Text style={styles.slotGuideTriggerText}>💡 {isEn ? 'Guide' : 'Çekim İpucu'}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <TouchableOpacity 
            style={[styles.primaryBtn, !isPhotoStepValid && styles.primaryBtnDisabled]} 
            onPress={() => setStep(4)}
            disabled={!isPhotoStepValid}
          >
            <Text style={styles.primaryBtnText}>{isEn ? 'REVIEW & SUBMIT ✦' : 'ÖN İZLEME VE KONTROL ✦'}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* STEP 4: PREVIEW & REVIEW */}
      {step === 4 && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {renderStepper()}

          <View style={styles.stepHeaderBox}>
            <TouchableOpacity onPress={() => setStep(3)} style={styles.backBtnCircle}>
              <Text style={styles.backBtnText}>←</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.screenTitle}>{isEn ? 'Review Request' : 'Talep Özeti & İnceleme'}</Text>
              <Text style={styles.screenSubTitle}>{isEn ? 'Confirm details before submitting to Peony AI.' : 'Peony AI ön incelemesine göndermeden önce bilgileri doğrulayın.'}</Text>
            </View>
          </View>

          {/* Luxury Review Card */}
          <View style={styles.reviewCard}>
            <Text style={styles.reviewBrand}>{brand}</Text>
            <Text style={styles.reviewName}>{name}</Text>
            <Text style={styles.reviewPrice}>₺{parseFloat(price || '0').toLocaleString('tr-TR')}</Text>

            <View style={styles.reviewDivider} />

            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>{isEn ? 'Category:' : 'Kategori:'}</Text>
              <Text style={styles.reviewValue}>{currentCategory.nameTr}</Text>
            </View>

            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>{isEn ? 'Condition:' : 'Kondisyon:'}</Text>
              <Text style={styles.reviewValue}>{condition.toUpperCase()}</Text>
            </View>

            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>{isEn ? 'Material:' : 'Materyal:'}</Text>
              <Text style={styles.reviewValue}>{material}</Text>
            </View>

            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>{isEn ? 'Photos Attached:' : 'Yüklenen Fotoğraf:'}</Text>
              <Text style={styles.reviewValue}>{Object.keys(capturedPhotos).length} {isEn ? 'Photos' : 'Adet'}</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 15 }}>
              {Object.values(capturedPhotos).map((img, idx) => (
                <Image key={idx} source={{ uri: img }} style={styles.previewThumb} />
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleSubmitProduct}>
            <Text style={styles.primaryBtnText}>{isEn ? 'SEND TO PEONY APPRAISAL ✦' : 'PEONY ONALAYINA GÖNDER ✦'}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* MODAL: PHOTO GUIDE */}
      {showGuide && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>{isEn ? 'Photo Guide' : 'Fotoğraf Çekim Rehberi'}</Text>
              <TouchableOpacity onPress={() => setShowGuide(false)} style={styles.modalCloseBtn}>
                <Text style={{ fontSize: 16, color: COLORS.text, fontWeight: 'bold' }}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Guide Body */}
            {(() => {
              const guideSlot = currentCategory.slots.find(s => s.key === activeGuideSlotKey) || currentCategory.slots[0];
              const imageSource = typeof guideSlot.guideImg === 'string' ? { uri: guideSlot.guideImg } : guideSlot.guideImg;
              return (
                <View style={{ padding: 15 }}>
                  <Text style={styles.guideTipTitle}>✦ {isEn ? guideSlot.labelEn : guideSlot.labelTr}</Text>
                  <Text style={styles.guideTipDesc}>{isEn ? guideSlot.guideEn : guideSlot.guideTr}</Text>
                  <Image source={imageSource} style={styles.guideSampleImg} />
                </View>
              );
            })()}

            <TouchableOpacity style={styles.modalCloseBtnBottom} onPress={() => setShowGuide(false)}>
              <Text style={styles.modalCloseBtnBottomText}>{isEn ? 'UNDERSTOOD' : 'ANLADIM'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* MODAL: REAL CAMERA / GALLERY ACTION MODAL */}
      {activeSlotKey !== null && (
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { padding: 20 }]}>
            <Text style={styles.actionModalTitle}>
              {isEn ? `Add Photo: ${activeSlotKey.toUpperCase()}` : `Fotoğraf Ekle: ${activeSlotKey.toUpperCase()}`}
            </Text>
            <Text style={styles.actionModalSub}>
              {isEn ? 'Choose how you want to upload this angle' : 'Bu çekim açısını nasıl eklemek istersiniz?'}
            </Text>

            <TouchableOpacity 
              style={styles.actionChoiceBtnPrimary}
              onPress={() => {
                const targetKey = activeSlotKey;
                setActiveSlotKey(null);
                handleLaunchCamera(targetKey);
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 10 }}>📷</Text>
              <Text style={styles.actionChoiceTextPrimary}>{isEn ? 'Take Photo (Camera)' : 'Kamera İle Çek'}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionChoiceBtnSecondary}
              onPress={() => {
                const targetKey = activeSlotKey;
                setActiveSlotKey(null);
                handleLaunchGallery(targetKey);
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 10 }}>🖼️</Text>
              <Text style={styles.actionChoiceTextSecondary}>{isEn ? 'Choose from Gallery' : 'Galeriden Seç'}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ marginTop: 15, alignSelf: 'center', padding: 8 }}
              onPress={() => setActiveSlotKey(null)}
            >
              <Text style={{ color: COLORS.danger, fontWeight: 'bold', fontSize: 13 }}>{isEn ? 'Cancel' : 'İptal'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 5: UPLOADING LOADING */}
      {step === 5 && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>
            {isEn 
              ? 'Uploading details & initializing Peony AI visual authentication...'
              : 'Ürün detayları aktarılıyor ve Peony AI ön inceleme süreci başlatılıyor...'}
          </Text>
        </View>
      )}

      {/* STEP 6: SUCCESS */}
      {step === 6 && (
        <View style={styles.successContainer}>
          <View style={styles.successBadge}>
            <Text style={styles.successIcon}>✓</Text>
          </View>
          <Text style={styles.successTitle}>{isEn ? 'Request Submitted to Peony' : 'Talep Peony Onayına İletildi'}</Text>
          <Text style={styles.successText}>
            {isEn 
              ? 'Your product photos and details have been registered. Peony AI pre-check analysis has started.'
              : 'Ürününüzün fotoğrafları ve detayları başarıyla kaydedildi. Peony AI ön inceleme analizi başlatılmıştır.'}
          </Text>

          <View style={styles.infoHighlightCard}>
            <Text style={styles.infoHighlightText}>
              {isEn 
                ? '🕒 Standard response time is 30 to 60 minutes during business hours (09:00 - 18:00). You will be notified in-app and via email.'
                : '🕒 Peony uzman ve AI değerlendirmesi mesai saatleri (09:00 - 18:00) içerisinde ortalama 30 ile 60 dakika sürmektedir. Değerlendirme tamamlandığında bildirim iletilecektir.'}
            </Text>
          </View>

          <TouchableOpacity style={styles.doneBtn} onPress={onSuccess}>
            <Text style={styles.doneBtnText}>{isEn ? 'RETURN TO HOME' : 'ANA SAYFAYA DÖN'}</Text>
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
    paddingBottom: 110,
  },

  // Stepper
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.chipBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
  },
  stepCircleDone: {
    backgroundColor: COLORS.accent,
  },
  stepNumberText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: 'bold',
  },
  stepNumberTextActive: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginLeft: 6,
    fontWeight: '600',
  },
  stepLabelActive: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 6,
  },
  stepLineDone: {
    backgroundColor: COLORS.accent,
  },

  // Headers
  stepHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtnCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 12,
  },
  backBtnText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
  },
  screenSubTitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  // Step 0 Landing
  landingContainer: {
    paddingBottom: 40,
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3EFE6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 15,
  },
  tagBadgeText: {
    fontSize: 11,
    color: COLORS.primaryDark,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  landingHeroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    marginBottom: 10,
  },
  landingHeroSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 22,
    marginBottom: 25,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  valueGroup: {
    marginBottom: 30,
  },
  valueCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  valueIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  valueIcon: {
    fontSize: 20,
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
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  startBtn: {
    backgroundColor: COLORS.primary,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },

  // Step 1 Category Grid
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 52) / 2,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: 14,
    alignItems: 'center',
  },
  categoryCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#FAF7F2',
  },
  categoryIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  categoryCardTitleSelected: {
    color: COLORS.primaryDark,
  },
  categoryCardSub: {
    fontSize: 11,
    color: COLORS.textMuted,
  },

  // Step 2 Form
  formSectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 15,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 80,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  chipsScroll: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  brandChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.chipBg,
    marginRight: 8,
  },
  brandChipActive: {
    backgroundColor: COLORS.primary,
  },
  brandChipText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
  },
  brandChipTextActive: {
    color: '#FFFFFF',
  },
  conditionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.chipBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  conditionChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  conditionChipText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
  },
  conditionChipTextActive: {
    color: '#FFFFFF',
  },
  inclusionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  inclusionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.chipBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inclusionChipActive: {
    backgroundColor: '#E6F4EA',
    borderColor: COLORS.accent,
  },
  inclusionChipText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
  },
  inclusionChipTextActive: {
    color: COLORS.accent,
  },

  // Step 3 Photo Grid
  requiredTagNotice: {
    fontSize: 12,
    color: COLORS.danger,
    marginBottom: 15,
    fontWeight: '600',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  slotContainer: {
    width: (width - 52) / 2,
    marginBottom: 16,
  },
  gridSlot: {
    height: 140,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridSlotRequired: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FFF5F5',
  },
  gridSlotFilled: {
    borderStyle: 'solid',
    borderColor: COLORS.accent,
  },
  slotImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  slotPlaceholder: {
    alignItems: 'center',
    padding: 10,
  },
  slotIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  slotTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  slotReqTag: {
    fontSize: 10,
    color: COLORS.danger,
    marginTop: 2,
    fontWeight: 'bold',
  },
  slotOptTag: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  slotGuideTrigger: {
    marginTop: 6,
    alignSelf: 'center',
  },
  slotGuideTriggerText: {
    fontSize: 11,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },

  // Step 4 Review
  reviewCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  reviewBrand: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  reviewName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  reviewPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginTop: 6,
  },
  reviewDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  reviewValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  previewThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
  },

  primaryBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  primaryBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  // Modals & Camera
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 999,
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalCloseBtn: {
    padding: 5,
  },
  guideTipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 6,
  },
  guideTipDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
    marginBottom: 12,
  },
  guideSampleImg: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  modalCloseBtnBottom: {
    backgroundColor: COLORS.primary,
    padding: 14,
    alignItems: 'center',
  },
  modalCloseBtnBottomText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },

  // Camera Overlay
  cameraOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  cameraOverlayContent: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cameraOverlayTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 1,
  },
  cameraFrameSim: {
    width: width - 40,
    height: width - 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.primary,
    position: 'relative',
  },
  viewfinderGuide: {
    position: 'absolute',
    top: '10%', left: '10%', right: '10%', bottom: '10%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    borderStyle: 'dashed',
    zIndex: 2,
  },
  viewfinderBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cleanCameraBg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionModalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  actionModalSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },
  actionChoiceBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    marginBottom: 10,
  },
  actionChoiceTextPrimary: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionChoiceBtnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.chipBg,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionChoiceTextSecondary: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Loading & Success
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  successBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E6F4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    fontSize: 32,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
  },
  successText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  infoHighlightCard: {
    backgroundColor: '#FAF7F2',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 30,
  },
  infoHighlightText: {
    fontSize: 12,
    color: COLORS.primaryDark,
    lineHeight: 18,
  },
  doneBtn: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  }
});
