/**
 * @file HomeScreen.tsx
 * @description Peony Collective Mobil Uygulaması Ana Ekranı.
 * 
 * Bu ekran kullanıcılara öne çıkan koleksiyonları, kategorileri, VIP vitrinini ve
 * kişiselleştirilmiş ürün arama/filtreleme arayüzünü sunar.
 */

import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image, 
  TextInput, 
  Dimensions, 
  ScrollView, 
  Platform, 
  Alert, 
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { t, locale } from '../lib/i18n';

const getCategoryTranslation = (name: string): string => {
  switch (name) {
    case 'Çanta': return t('catBags');
    case 'Saat': return t('catWatches');
    case 'Ayakkabı': return t('catShoes');
    case 'Takı': return t('catJewelry');
    case 'Giyim': return t('catClothing');
    case 'Aksesuar': return t('catAccessories');
    case 'Bebek Giyim': return t('catBabyClothing');
    case 'Çocuk Giyim': return t('catKidsClothing');
    default: return name;
  }
};

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 45) / 2;

const COLORS = {
  bg: '#FBFBFA', // Luxury off-white
  card: '#FFFFFF', // Clean white
  text: '#1A1A1A', // High-contrast charcoal text
  textMuted: '#7E8085', // Slate gray
  primary: '#AF9164', // Classic champagne gold
  border: '#E8E8E6', // Thin luxury dividers
  accent: '#10B981', // Emerald green
  bannerBg: '#E9EFEA', // Soft green
  conciergeBg: '#F3ECE0', // Warm luxury beige for weather/location concierge
  darkBar: '#1A1A1A', // Dark bar background
};

interface Product {
  id: string;
  model_name: string;
  brand: string;
  price: number;
  public_images?: string[];
  entrupy_status: string;
  description?: string;
  category?: string;
  condition?: string;
}

const CATEGORIES_BY_GENDER = {
  women: [
    { name: 'Çanta', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200' },
    { name: 'Saat', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
    { name: 'Ayakkabı', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=200' }, // Clean luxury high-heel close-up
    { name: 'Takı', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200' },
    { name: 'Giyim', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=200' },
  ],
  men: [
    { name: 'Saat', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=200' },
    { name: 'Ayakkabı', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200' }, // Men leather shoe close-up
    { name: 'Giyim', image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=200' },
    { name: 'Çanta', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200' }, // Changed to 'Çanta'
    { name: 'Aksesuar', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200' }, // Luxury men suit details & pocket watch
  ],
  kids: [
    { name: 'Bebek Giyim', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200' },
    { name: 'Çocuk Giyim', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=200' },
    { name: 'Ayakkabı', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=200' } // Clean kids leather boots image
  ]
};

// Curated Collection filters
type MoodType = 'all' | 'under15k' | 'evening' | 'beach' | 'quiet_luxury';

export default function HomeScreen({ 
  onSelectProduct, 
  likedIds = [], 
  onToggleLike,
  onOpenStylist
}: { 
  onSelectProduct: (product: Product) => void;
  likedIds?: string[];
  onToggleLike: (id: string) => void;
  onOpenStylist: () => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [genderSection, setGenderSection] = useState<'women' | 'men' | 'kids'>('women');
  const [activeMood, setActiveMood] = useState<MoodType>('all');
  
  // Flawless Filtering States
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterBrand, setFilterBrand] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');

  // VIP Preview and Countdown Timer States
  const [vipEnabled, setVipEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(52325); // 14:32:05 in seconds
  const [vipModalVisible, setVipModalVisible] = useState(false);
  const [checkoutStage, setCheckoutStage] = useState<'info' | 'paytr' | 'processing' | 'success'>('info');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Concierge Location & Weather states
  const [locationName, setLocationName] = useState('Bodrum');
  const [temp, setTemp] = useState(31);
  const [weatherDesc, setWeatherDesc] = useState('Yaz Esintisi');
  const [curationVibe, setCurationVibe] = useState('Plaj Rahatlığı & Keten Şıklığı');

  useEffect(() => {
    fetchProducts();
    requestLocationPermission();
  }, []);

  function requestLocationPermission() {
    // Dynamic Mock based on real-time hour or location simulation using i18n keys
    const locations = [
      { name: 'Bodrum', nameKey: 'weatherBodrum', temp: 32, descKey: 'weatherSunnyBreeze', vibeKey: 'vibeBodrum' },
      { name: 'İstanbul', nameKey: 'weatherIstanbul', temp: 26, descKey: 'weatherPartlyCloudy', vibeKey: 'vibeIstanbul' },
      { name: 'Çeşme', nameKey: 'weatherCesme', temp: 30, descKey: 'weatherSunnyWindy', vibeKey: 'vibeCesme' },
      { name: 'Londra', nameKey: 'weatherLondon', temp: 19, descKey: 'weatherLightRainy', vibeKey: 'vibeLondon' }
    ];
    
    // Auto pick a location randomly to simulate geolocation detection on start
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    setLocationName(t(randomLoc.nameKey as any));
    setTemp(randomLoc.temp);
    setWeatherDesc(t(randomLoc.descKey as any));
    setCurationVibe(t(randomLoc.vibeKey as any));
  }

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        throw error;
      }
      setProducts(data || []);
    } catch (e: any) {
      console.error('[HomeScreen] fetchProducts error:', e.message);
      // Fallback in case XHR fails, just set empty array so it doesn't spin forever
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.model_name?.toLowerCase().includes(search.toLowerCase()) ||
                          p.brand?.toLowerCase().includes(search.toLowerCase());
    
    // Category Filter
    let matchesCategory = true;
    if (selectedCategory) {
      const catLower = selectedCategory.toLowerCase();
      matchesCategory = p.model_name?.toLowerCase().includes(catLower) || 
                        p.brand?.toLowerCase().includes(catLower) ||
                        (catLower === 'çanta' && p.model_name?.toLowerCase().includes('bag')) ||
                        (catLower === 'saat' && p.model_name?.toLowerCase().includes('watch')) ||
                        (catLower === 'takı' && p.model_name?.toLowerCase().includes('gold'));
    }

    // Mood Collection Filter
    let matchesMood = true;
    if (activeMood === 'under15k') {
      matchesMood = p.price < 15000;
    } else if (activeMood === 'evening') {
      matchesMood = p.model_name?.toLowerCase().includes('gold') || 
                    p.model_name?.toLowerCase().includes('clutch') || 
                    p.brand?.toLowerCase().includes('chanel');
    } else if (activeMood === 'beach') {
      matchesMood = p.model_name?.toLowerCase().includes('tote') || 
                    p.model_name?.toLowerCase().includes('canvas') ||
                    p.brand?.toLowerCase().includes('loewe');
    } else if (activeMood === 'quiet_luxury') {
      matchesMood = p.brand?.toLowerCase().includes('bottega') || 
                    p.brand?.toLowerCase().includes('hermes') || 
                    p.brand?.toLowerCase().includes('loropiana');
    }

    // Flawless Search Filters
    let matchesBrand = true;
    if (filterBrand && p.brand?.toLowerCase() !== filterBrand.toLowerCase()) {
      matchesBrand = false;
    }

    let matchesCondition = true;
    if (filterCondition && p.condition?.toLowerCase() !== filterCondition.toLowerCase()) {
      matchesCondition = false;
    }

    let matchesMinPrice = true;
    if (filterMinPrice && p.price < parseFloat(filterMinPrice)) {
      matchesMinPrice = false;
    }

    let matchesMaxPrice = true;
    if (filterMaxPrice && p.price > parseFloat(filterMaxPrice)) {
      matchesMaxPrice = false;
    }

    return matchesSearch && matchesCategory && matchesMood && matchesBrand && matchesCondition && matchesMinPrice && matchesMaxPrice;
  });

  const handleVipCardPress = (item: any) => {
    if (vipEnabled) {
      onSelectProduct({
        id: item.id,
        brand: item.brand,
        model_name: item.name,
        price: item.price,
        public_images: [item.image],
        entrupy_status: 'approved',
        description: locale === 'tr' 
          ? 'PEONY PRIVÉ Erken Erişim ürünüdür. Kondisyonu mükemmel durumdadır, orijinal kutusu ve fatura/sertifikası mevcuttur.'
          : 'PEONY PRIVÉ Early Access item. Pristine condition, includes original box and invoice/certificate.'
      });
      return;
    }
    setCardNumber('');
    setCardName('');
    setCardExpiry('');
    setCardCvv('');
    setCheckoutStage('info');
    setVipModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar & Filter Button */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <TextInput 
            style={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={COLORS.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity 
          style={[styles.filterBtn, (filterBrand || filterCondition || filterMinPrice || filterMaxPrice) && styles.activeFilterBtn]}
          onPress={() => setFilterModalVisible(true)}
        >
          <Text style={[styles.filterBtnText, (filterBrand || filterCondition || filterMinPrice || filterMaxPrice) && styles.activeFilterBtnText]}>𝌭 {t('filterBtn')}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={filterModalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>✕ {t('filterCancel')}</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{t('filterTitle')}</Text>
            <TouchableOpacity 
              onPress={() => {
                setFilterBrand('');
                setFilterCondition('');
                setFilterMinPrice('');
                setFilterMaxPrice('');
              }}
              style={styles.modalClearBtn}
            >
              <Text style={styles.modalClearText}>{t('filterClear')}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.filterGroupTitle}>{t('filterBrand')}</Text>
            <View style={styles.filterOptionsGrid}>
              {['Chanel', 'Rolex', 'Hermès', 'Bottega Veneta', 'Loro Piana', 'Prada'].map((b) => {
                const isSelected = filterBrand.toLowerCase() === b.toLowerCase();
                return (
                  <TouchableOpacity 
                    key={b}
                    style={[styles.filterOptionPill, isSelected && styles.activeFilterOptionPill]}
                    onPress={() => setFilterBrand(isSelected ? '' : b)}
                  >
                    <Text style={[styles.filterOptionText, isSelected && styles.activeFilterOptionText]}>{b}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.filterGroupTitle}>{t('filterCondition')}</Text>
            <View style={styles.filterOptionsGrid}>
              {['YENİ', 'MÜKEMMEL', 'ÇOK İYİ'].map((cond) => {
                const isSelected = filterCondition.toLowerCase() === cond.toLowerCase();
                return (
                  <TouchableOpacity 
                    key={cond}
                    style={[styles.filterOptionPill, isSelected && styles.activeFilterOptionPill]}
                    onPress={() => setFilterCondition(isSelected ? '' : cond)}
                  >
                    <Text style={[styles.filterOptionText, isSelected && styles.activeFilterOptionText]}>{cond}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.filterGroupTitle}>{t('filterPriceRange')}</Text>
            <View style={styles.priceInputRow}>
              <TextInput 
                style={styles.priceInput}
                placeholder={t('filterMinPrice')}
                placeholderTextColor={COLORS.textMuted}
                keyboardType="numeric"
                value={filterMinPrice}
                onChangeText={setFilterMinPrice}
              />
              <Text style={styles.priceRangeSeparator}>—</Text>
              <TextInput 
                style={styles.priceInput}
                placeholder={t('filterMaxPrice')}
                placeholderTextColor={COLORS.textMuted}
                keyboardType="numeric"
                value={filterMaxPrice}
                onChangeText={setFilterMaxPrice}
              />
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.applyBtn}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.applyBtnText}>{t('filterApply')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.columnWrapper}
          onRefresh={fetchProducts}
          refreshing={loading}
          ListHeaderComponent={
            <View style={styles.headerComponent}>
              
              {/* BRAND CAMPAIGN BANNER */}
              <View style={styles.brandCampaignBanner}>
                <Text style={styles.campaignSubtitle}>{t('campaignSubtitle')}</Text>
                <Text style={styles.campaignTitle}>{t('campaignTitle')}</Text>
                <Text style={styles.campaignDesc}>{t('campaignDesc')}</Text>
              </View>

              {/* GENDER SELECTOR TABS */}
              <View style={styles.genderTabs}>
                <TouchableOpacity 
                  style={[styles.genderTab, genderSection === 'women' && styles.activeGenderTab]}
                  onPress={() => {
                    setGenderSection('women');
                    setSelectedCategory(null);
                  }}
                >
                  <Text style={[styles.genderTabText, genderSection === 'women' && styles.activeGenderTabText]}>{locale === 'tr' ? 'KADIN' : 'WOMEN'}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.genderTab, genderSection === 'men' && styles.activeGenderTab]}
                  onPress={() => {
                    setGenderSection('men');
                    setSelectedCategory(null);
                  }}
                >
                  <Text style={[styles.genderTabText, genderSection === 'men' && styles.activeGenderTabText]}>{locale === 'tr' ? 'ERKEK' : 'MEN'}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.genderTab, genderSection === 'kids' && styles.activeGenderTab]}
                  onPress={() => {
                    setGenderSection('kids');
                    setSelectedCategory(null);
                  }}
                >
                  <Text style={[styles.genderTabText, genderSection === 'kids' && styles.activeGenderTabText]}>{locale === 'tr' ? 'ÇOCUK' : 'KIDS'}</Text>
                </TouchableOpacity>
              </View>

              {/* Shop By Category Horizontal list */}
              <Text style={styles.sectionTitle}>{t('categoriesTitle')}</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScroll}
              >
                <TouchableOpacity 
                  style={styles.categoryItem}
                  onPress={() => setSelectedCategory(null)}
                >
                  <View style={[styles.categoryCircle, !selectedCategory && styles.activeCategoryCircle]}>
                    <Text style={[styles.categoryAllEmoji, !selectedCategory && { color: '#FFF' }]}>✦</Text>
                  </View>
                  <Text style={[styles.categoryName, !selectedCategory && styles.activeCategoryName]}>{t('catAll')}</Text>
                </TouchableOpacity>

                {CATEGORIES_BY_GENDER[genderSection].map((cat, idx) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <TouchableOpacity 
                      key={idx}
                      style={styles.categoryItem}
                      onPress={() => setSelectedCategory(cat.name)}
                    >
                      <Image source={{ uri: cat.image }} style={[styles.categoryImage, isActive && styles.activeCategoryImage]} />
                      <Text style={[styles.categoryName, isActive && styles.activeCategoryName]}>{getCategoryTranslation(cat.name)}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* WEATHER CONCIERGE WIDGET */}
              <View style={styles.conciergeWidget}>
                <View style={styles.conciergeHeader}>
                  <Text style={styles.conciergeTag}>✦ WEATHER CONCIERGE</Text>
                  <Text style={styles.weatherInfo}>📍 {locationName}, {temp}°C - {weatherDesc}</Text>
                </View>
                <Text style={styles.conciergeTitle}>
                  {locale === 'tr' ? 'Hava Durumuna Göre Kürasyon' : 'Weather-Adaptive Curation'}
                </Text>
                <Text style={styles.conciergeDesc}>
                  {locale === 'tr' 
                    ? `Bugün hava ${temp}°C derece ve ${weatherDesc.toLowerCase()}. Sizin için en uygun stil havası: "${curationVibe}".`
                    : `Today it is ${temp}°C and ${weatherDesc.toLowerCase()}. Recommended style vibe: "${curationVibe}".`}
                </Text>
                <TouchableOpacity 
                  style={styles.conciergeAction}
                  onPress={() => {
                    if (locationName === 'Bodrum' || locationName === 'Çeşme') {
                      setActiveMood('beach');
                    } else if (locationName === 'İstanbul') {
                      setActiveMood('evening');
                    } else {
                      setActiveMood('quiet_luxury');
                    }
                  }}
                >
                  <Text style={styles.conciergeActionText}>
                    {locale === 'tr' ? 'HAVA DURUMUNA GÖRE KEŞFET' : 'EXPLORE BY WEATHER'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* WHY PEONY TRUST WIDGET */}
              <View style={styles.whyPeonyWidget}>
                <Text style={styles.whyTitle}>{t('whyPeonyTitle')}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.whyScroll}>
                  <View style={styles.whyPill}><Text style={styles.whyPillText}>{t('whyPeonyAI')}</Text></View>
                  <View style={styles.whyPill}><Text style={styles.whyPillText}>{t('whyPeonyShipping')}</Text></View>
                  <View style={styles.whyPill}><Text style={styles.whyPillText}>{t('whyPeonyInstallments')}</Text></View>
                  <View style={styles.whyPill}><Text style={styles.whyPillText}>{t('whyPeonyReturn')}</Text></View>
                </ScrollView>
              </View>

              {/* PEONY PRIVÉ - VIP EARLY ACCESS / FOMO SLIDER */}
              <View style={styles.priveContainer}>
                <View style={styles.priveHeader}>
                  <View>
                    <Text style={styles.priveTitle}>{t('priveTag')}</Text>
                    <Text style={styles.priveSubtitle}>{t('priveSubtitle')}</Text>
                  </View>
                  <View style={styles.timerBadge}>
                    <Text style={styles.timerText}>{formatTime(timeLeft)} {locale === 'tr' ? 'kaldı' : 'left'}</Text>
                  </View>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.priveScroll}>
                  {/* Item 1 */}
                  <TouchableOpacity 
                    style={styles.priveCard}
                    onPress={() => handleVipCardPress({
                      id: 'hermes-birkin-vip',
                      brand: 'HERMÈS',
                      name: 'Birkin 30 Togo Black',
                      price: 845000,
                      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300'
                    })}
                  >
                    <Image 
                      source={{ uri: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' }} 
                      style={styles.priveImg} 
                      blurRadius={vipEnabled ? 0 : 10}
                    />
                    {!vipEnabled ? (
                      <View style={styles.lockOverlay}>
                        <Text style={styles.lockIcon}>🔒</Text>
                        <Text style={styles.lockText}>{t('priveLockText')}</Text>
                      </View>
                    ) : (
                      <View style={[styles.lockOverlay, { backgroundColor: 'rgba(175, 145, 100, 0.75)' }]}>
                        <Text style={styles.lockIcon}>👑</Text>
                        <Text style={styles.lockText}>VIP UNLOCKED</Text>
                      </View>
                    )}
                    <View style={styles.priveInfo}>
                      <Text style={styles.priveBrand}>HERMÈS</Text>
                      <Text style={styles.priveName}>Birkin 30 Togo Black</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Item 2 */}
                  <TouchableOpacity 
                    style={styles.priveCard}
                    onPress={() => handleVipCardPress({
                      id: 'chanel-classic-vip',
                      brand: 'CHANEL',
                      name: 'Classic Double Flap Gold',
                      price: 360000,
                      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300'
                    })}
                  >
                    <Image 
                      source={{ uri: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300' }} 
                      style={styles.priveImg} 
                      blurRadius={vipEnabled ? 0 : 10}
                    />
                    {!vipEnabled ? (
                      <View style={styles.lockOverlay}>
                        <Text style={styles.lockIcon}>🔒</Text>
                        <Text style={styles.lockText}>{t('priveLockText')}</Text>
                      </View>
                    ) : (
                      <View style={[styles.lockOverlay, { backgroundColor: 'rgba(175, 145, 100, 0.75)' }]}>
                        <Text style={styles.lockIcon}>👑</Text>
                        <Text style={styles.lockText}>VIP UNLOCKED</Text>
                      </View>
                    )}
                    <View style={styles.priveInfo}>
                      <Text style={styles.priveBrand}>CHANEL</Text>
                      <Text style={styles.priveName}>Classic Double Flap Gold</Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              {/* Styled Mood Curations Slider (Matches Web Categories) */}
              <Text style={styles.sectionTitle}>{t('editorialCurations')}</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.moodScroll}
              >
                <TouchableOpacity 
                  style={[styles.moodPill, activeMood === 'all' && styles.activeMoodPill]} 
                  onPress={() => setActiveMood('all')}
                >
                  <Text style={[styles.moodText, activeMood === 'all' && styles.activeMoodText]}>{t('moodAll')}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.moodPill, activeMood === 'under15k' && styles.activeMoodPill]} 
                  onPress={() => setActiveMood('under15k')}
                >
                  <Text style={[styles.moodText, activeMood === 'under15k' && styles.activeMoodText]}>{t('moodUnder15k')}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.moodPill, activeMood === 'evening' && styles.activeMoodPill]} 
                  onPress={() => setActiveMood('evening')}
                >
                  <Text style={[styles.moodText, activeMood === 'evening' && styles.activeMoodText]}>{t('moodEvening')}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.moodPill, activeMood === 'beach' && styles.activeMoodPill]} 
                  onPress={() => setActiveMood('beach')}
                >
                  <Text style={[styles.moodText, activeMood === 'beach' && styles.activeMoodText]}>{t('moodBeach')}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.moodPill, activeMood === 'quiet_luxury' && styles.activeMoodPill]} 
                  onPress={() => setActiveMood('quiet_luxury')}
                >
                  <Text style={[styles.moodText, activeMood === 'quiet_luxury' && styles.activeMoodText]}>{t('moodQuietLuxury')}</Text>
                </TouchableOpacity>
              </ScrollView>

              <Text style={styles.sectionTitle}>{t('feedTitle')}</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>✦</Text>
              <Text style={styles.emptyText}>{t('emptyFeed')}</Text>
            </View>
          }
          renderItem={({ item }) => {
            const isLiked = likedIds.includes(item.id);
            return (
              <TouchableOpacity style={styles.card} onPress={() => onSelectProduct(item)}>
                <View style={styles.imageWrapper}>
                  <Image 
                    source={{ uri: item.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' }} 
                    style={styles.image}
                  />
                  {item.entrupy_status === 'approved' && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓ VERIFIED</Text>
                    </View>
                  )}
                  <TouchableOpacity 
                    style={styles.cardHeartBtn}
                    onPress={() => onToggleLike(item.id)}
                  >
                    <Text style={styles.cardHeartText}>{isLiked ? '❤️' : '🤍'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.info}>
                  <Text style={styles.brand} numberOfLines={1}>{item.brand}</Text>
                  <Text style={styles.name} numberOfLines={1}>{item.model_name}</Text>
                  <Text style={styles.price}>{item.price?.toLocaleString('tr-TR')} TL</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {/* FLOATING ACTION BUTTON (FAB) FOR PEONY MUSE */}
      <TouchableOpacity 
        style={styles.museFab}
        onPress={onOpenStylist}
      >
        <Text style={styles.museFabText}>✦ Muse</Text>
      </TouchableOpacity>

      {/* PREMIUM VIP UPGRADE MODAL WITH PAYTR MOCKUP */}
      <Modal visible={vipModalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.vipContainer}>
          {/* Header */}
          <View style={styles.vipHeader}>
            <TouchableOpacity onPress={() => setVipModalVisible(false)} style={styles.vipCloseBtn}>
              <Text style={styles.vipCloseText}>✕ {t('close')}</Text>
            </TouchableOpacity>
            <Text style={styles.vipHeaderTitle}>PEONY PRIVÉ</Text>
            <View style={{ width: 60 }} />
          </View>

          {checkoutStage === 'info' && (
            <ScrollView contentContainerStyle={styles.vipInfoScroll}>
              <Text style={styles.vipTitle}>👑 PEONY CONCIERGE ÜYELİK</Text>
              <Text style={styles.vipSubtitle}>
                {locale === 'tr' 
                  ? 'Ayrıcalıklı ve Döngüsel Lüks Dünyasına Adım Atın' 
                  : 'Step into the World of Exclusive Circular Luxury'}
              </Text>

              <View style={styles.vipBenefitCard}>
                <Text style={styles.benefitIcon}>🕒</Text>
                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>
                    {locale === 'tr' ? '24 Saat Erken Erişim' : '24-Hour Early Access'}
                  </Text>
                  <Text style={styles.benefitDesc}>
                    {locale === 'tr' 
                      ? 'Lüks çanta, saat ve nadide parçaları vitrine çıkmadan 24 saat önce inceleyin ve teklif verin.' 
                      : 'Preview and make offers on luxury bags and watches 24 hours before they go public.'}
                  </Text>
                </View>
              </View>

              <View style={styles.vipBenefitCard}>
                <Text style={styles.benefitIcon}>🤝</Text>
                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>
                    {locale === 'tr' ? 'Doğrudan Teklif & Öncelik' : 'Direct Offer & Priority'}
                  </Text>
                  <Text style={styles.benefitDesc}>
                    {locale === 'tr' 
                      ? 'Küratörlerimizle doğrudan sohbet edin, özel fiyat teklifleri sunun ve onay süreçlerinde öncelik kazanın.' 
                      : 'Chat directly with our curators, submit custom offers, and get priority in validation.'}
                  </Text>
                </View>
              </View>

              <View style={styles.vipBenefitCard}>
                <Text style={styles.benefitIcon}>🚚</Text>
                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>
                    {locale === 'tr' ? 'Concierge Kurye & SPA Hizmeti' : 'Concierge Courier & SPA Service'}
                  </Text>
                  <Text style={styles.benefitDesc}>
                    {locale === 'tr' 
                      ? 'Alım ve satımlarda sigortalı Concierge kurye hizmetinden ve ücretsiz Entrupy AI doğrulamasından yararlanın.' 
                      : 'Enjoy complimentary insured Concierge courier services and free Entrupy AI validation.'}
                  </Text>
                </View>
              </View>

              <View style={styles.priceContainerCard}>
                <Text style={styles.priceLabel}>{locale === 'tr' ? 'YILLIK ABONELİK' : 'ANNUAL SUBSCRIPTION'}</Text>
                <Text style={styles.priceValue}>15.000 ₺</Text>
                <Text style={styles.pricePeriod}>{locale === 'tr' ? 'Her Yıl Otomatik Yenilenir' : 'Auto-renews annually'}</Text>
              </View>

              <TouchableOpacity 
                style={styles.vipProceedBtn}
                onPress={() => setCheckoutStage('paytr')}
              >
                <Text style={styles.vipProceedText}>
                  {locale === 'tr' ? 'PayTR ile Güvenli Öde' : 'Pay Safely via PayTR'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {checkoutStage === 'paytr' && (
            <View style={styles.paytrGatewayContainer}>
              <View style={styles.paytrHeader}>
                <Text style={styles.paytrLogo}>Pay<Text style={{ color: '#F97316' }}>TR</Text></Text>
                <Text style={styles.paytrSecure}>🛡️ 256-Bit SSL Secured Checkout</Text>
              </View>

              <ScrollView style={{ padding: 20 }}>
                <Text style={styles.paytrTitle}>{locale === 'tr' ? 'Kart Bilgileri' : 'Card Details'}</Text>
                <Text style={styles.paytrSubtitle}>{locale === 'tr' ? 'Ödenecek Tutar: 15.000,00 ₺' : 'Amount to Pay: 15,000.00 ₺'}</Text>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>{locale === 'tr' ? 'KART SAHİBİNİN ADI' : 'CARDHOLDER NAME'}</Text>
                  <TextInput 
                    style={styles.paytrInput} 
                    placeholder="Ahmet Canlı" 
                    placeholderTextColor="#A3A3A3"
                    value={cardName}
                    onChangeText={setCardName}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>{locale === 'tr' ? 'KART NUMARASI' : 'CARD NUMBER'}</Text>
                  <TextInput 
                    style={styles.paytrInput} 
                    placeholder="4355 0000 1111 2222" 
                    placeholderTextColor="#A3A3A3"
                    keyboardType="numeric"
                    maxLength={19}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                  />
                </View>

                <View style={styles.rowInputs}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.inputLabel}>{locale === 'tr' ? 'SON KULLANMA' : 'EXPIRY'}</Text>
                    <TextInput 
                      style={styles.paytrInput} 
                      placeholder="12/29" 
                      placeholderTextColor="#A3A3A3"
                      maxLength={5}
                      value={cardExpiry}
                      onChangeText={setCardExpiry}
                    />
                  </View>

                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput 
                      style={styles.paytrInput} 
                      placeholder="000" 
                      placeholderTextColor="#A3A3A3"
                      keyboardType="numeric"
                      maxLength={3}
                      value={cardCvv}
                      onChangeText={setCardCvv}
                    />
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.paytrPayBtn}
                  onPress={() => {
                    setCheckoutStage('processing');
                    setTimeout(() => {
                      setCheckoutStage('success');
                      setVipEnabled(true);
                    }, 2000);
                  }}
                >
                  <Text style={styles.paytrPayBtnText}>
                    {locale === 'tr' ? '15.000 ₺ Ödemeyi Tamamla' : 'Complete Payment of 15,000 ₺'}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.paytrFooterInfo}>
                  {locale === 'tr' 
                    ? 'Bu ödeme PayTR koruması altındadır. Kart bilgileriniz Peony sunucularında saklanmaz.'
                    : 'This payment is secured by PayTR. Your card details are never stored on Peony servers.'}
                </Text>
              </ScrollView>
            </View>
          )}

          {checkoutStage === 'processing' && (
            <View style={styles.processingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.processingTitle}>{locale === 'tr' ? '3D Secure Doğrulaması...' : '3D Secure Redirecting...'}</Text>
              <Text style={styles.processingDesc}>
                {locale === 'tr' 
                  ? 'PayTR ödeme geçidi güvenli doğrulama işlemi yürütüyor, lütfen pencereyi kapatmayın.' 
                  : 'PayTR payment gateway is processing the secure transaction, please do not close this window.'}
              </Text>
            </View>
          )}

          {checkoutStage === 'success' && (
            <View style={styles.successUpgradeContainer}>
              <Text style={styles.successCrown}>👑</Text>
              <Text style={styles.successTitle}>
                {locale === 'tr' ? 'CONCIERGE Üyeliğiniz Aktif!' : 'Concierge Membership Active!'}
              </Text>
              <Text style={styles.successDesc}>
                {locale === 'tr' 
                  ? 'Tebrikler, Peony Privé erken erişim dünyasına başarıyla katıldınız. Artık tüm kapalı ürünleri inceleyip teklif sunabilirsiniz!' 
                  : 'Congratulations, you have successfully joined Peony Privé early access. You can now unlock and bid on all premium collection items.'}
              </Text>

              <TouchableOpacity 
                style={styles.successDoneBtn}
                onPress={() => setVipModalVisible(false)}
              >
                <Text style={styles.successDoneText}>
                  {locale === 'tr' ? 'KEŞFETMEYE BAŞLA' : 'START DISCOVERING'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: COLORS.bg,
  },
  searchBox: {
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    height: 44,
    color: COLORS.text,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 13,
  },
  filterBtn: {
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilterBtn: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  activeFilterBtnText: {
    color: '#FFFFFF',
  },
  cardHeartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeartText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  modalCloseBtn: {
    padding: 5,
  },
  modalCloseText: {
    fontSize: 13.5,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    color: COLORS.text,
  },
  modalClearBtn: {
    padding: 5,
  },
  modalClearText: {
    fontSize: 13.5,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  modalScroll: {
    flex: 1,
    padding: 20,
  },
  filterGroupTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginTop: 20,
    marginBottom: 12,
  },
  filterOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  filterOptionPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    marginBottom: 10,
  },
  activeFilterOptionPill: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterOptionText: {
    fontSize: 12,
    color: COLORS.text,
  },
  activeFilterOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  priceInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  priceInput: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    fontSize: 13,
    color: COLORS.text,
  },
  priceRangeSeparator: {
    marginHorizontal: 15,
    color: COLORS.textMuted,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  applyBtn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headerComponent: {
    marginBottom: 10,
  },
  conciergeWidget: {
    backgroundColor: COLORS.conciergeBg,
    marginHorizontal: 15,
    marginTop: 25,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(175, 145, 100, 0.15)',
    shadowColor: '#AF9164',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  conciergeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  conciergeTag: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.2,
  },
  weatherInfo: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  conciergeTitle: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    color: COLORS.text,
    fontWeight: 'normal',
    marginBottom: 6,
  },
  conciergeDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 17,
    marginBottom: 15,
  },
  conciergeAction: {
    backgroundColor: COLORS.darkBar,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  conciergeActionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    color: COLORS.text,
    letterSpacing: 1.5,
    marginLeft: 15,
    marginTop: 25,
    marginBottom: 15,
  },
  categoryScroll: {
    paddingLeft: 15,
    paddingBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeCategoryCircle: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryAllEmoji: {
    fontSize: 20,
    color: COLORS.text,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#F3F4F6',
  },
  activeCategoryImage: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  categoryName: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  activeCategoryName: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  priveContainer: {
    marginVertical: 10,
    backgroundColor: '#12131A', // Luxury black box for early access
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    borderRadius: 16,
  },
  priveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  priveTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  priveSubtitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
  },
  timerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  timerText: {
    color: COLORS.primary,
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  priveScroll: {
    paddingRight: 10,
  },
  priveCard: {
    width: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    marginRight: 12,
  },
  priveImg: {
    width: 160,
    height: 120,
    resizeMode: 'cover',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFill,
    height: 120,
    backgroundColor: 'rgba(18, 19, 26, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 22,
  },
  lockText: {
    color: COLORS.primary,
    fontSize: 8.5,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginTop: 6,
  },
  priveInfo: {
    padding: 10,
  },
  priveBrand: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  priveName: {
    color: '#FFFFFF',
    fontSize: 11,
    marginTop: 2,
  },
  moodScroll: {
    paddingLeft: 15,
    paddingBottom: 10,
  },
  moodPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
  },
  activeMoodPill: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  moodText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  activeMoodText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  gridContent: {
    paddingBottom: 100, // Safe padding for floating tab bar
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'transparent',
    width: COLUMN_WIDTH,
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageWrapper: {
    position: 'relative',
    height: COLUMN_WIDTH,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(175, 145, 100, 0.9)', 
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  verifiedText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  info: {
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  brand: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  name: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '500',
    marginTop: 2,
  },
  price: {
    fontSize: 12.5,
    color: COLORS.text,
    marginTop: 4,
    fontWeight: 'bold',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 30,
  },
  emptyIcon: {
    fontSize: 32,
    color: COLORS.primary,
    marginBottom: 10,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 12,
    letterSpacing: 1.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  brandCampaignBanner: {
    backgroundColor: '#F3ECE0', // Soft warm luxury beige
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(175, 145, 100, 0.15)',
  },
  campaignSubtitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 6,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    color: COLORS.text,
    marginBottom: 6,
  },
  campaignDesc: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 16,
  },
  genderTabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 44,
    padding: 3,
  },
  genderTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
  },
  activeGenderTab: {
    backgroundColor: COLORS.primary,
  },
  genderTabText: {
    fontSize: 11.5,
    color: COLORS.textMuted,
    fontWeight: '600',
    letterSpacing: 1,
  },
  activeGenderTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  whyPeonyWidget: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  whyTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: 1,
    marginBottom: 8,
  },
  whyScroll: {
    flexDirection: 'row',
  },
  whyPill: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
  },
  whyPillText: {
    fontSize: 10.5,
    color: COLORS.text,
    fontWeight: '500',
  },
  museFab: {
    position: 'absolute',
    bottom: 95,
    right: 15,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  museFabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12.5,
    letterSpacing: 1.5,
  },
  vipContainer: {
    flex: 1,
    backgroundColor: '#FBFBFA',
  },
  vipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#E8E8E6',
    backgroundColor: '#FFFFFF',
  },
  vipCloseBtn: {
    padding: 8,
  },
  vipCloseText: {
    fontSize: 13,
    color: '#7E8085',
    fontWeight: '500',
  },
  vipHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#AF9164',
    letterSpacing: 3,
  },
  vipInfoScroll: {
    padding: 24,
    alignItems: 'center',
  },
  vipTitle: {
    fontSize: 22,
    fontWeight: '300',
    color: '#1A1A1A',
    letterSpacing: 3,
    marginTop: 10,
    marginBottom: 8,
    textAlign: 'center',
  },
  vipSubtitle: {
    fontSize: 12,
    color: '#7E8085',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1,
    lineHeight: 18,
  },
  vipBenefitCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E6',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 16,
    color: '#AF9164',
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  benefitDesc: {
    fontSize: 11.5,
    color: '#7E8085',
    lineHeight: 16,
  },
  priceContainerCard: {
    backgroundColor: '#F5ECE1',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(175, 145, 100, 0.2)',
  },
  priceLabel: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#AF9164',
    letterSpacing: 2,
    marginBottom: 6,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    letterSpacing: 1,
  },
  pricePeriod: {
    fontSize: 10.5,
    color: '#7E8085',
    marginTop: 4,
  },
  vipProceedBtn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  vipProceedText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  paytrGatewayContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  paytrHeader: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paytrLogo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: 0.5,
  },
  paytrSecure: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '600',
  },
  paytrTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  paytrSubtitle: {
    fontSize: 12.5,
    color: '#4B5563',
    marginBottom: 20,
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#4B5563',
    letterSpacing: 1,
    marginBottom: 6,
  },
  paytrInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  rowInputs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  paytrPayBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  paytrPayBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: 'bold',
  },
  paytrFooterInfo: {
    fontSize: 10.5,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 14,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  processingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 20,
    marginBottom: 8,
  },
  processingDesc: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  successUpgradeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  successCrown: {
    fontSize: 64,
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  successDesc: {
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  successDoneBtn: {
    backgroundColor: '#AF9164',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
  },
  successDoneText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: 'bold',
    letterSpacing: 2,
  }
});
