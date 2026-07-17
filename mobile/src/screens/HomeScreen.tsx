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
  Alert
} from 'react-native';
import { supabase } from '../lib/supabase';

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
  conciergeBg: '#F3ECE0' // Warm luxury beige for weather/location concierge
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
}

const CATEGORIES = [
  { name: 'Çanta', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200' },
  { name: 'Saat', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
  { name: 'Ayakkabı', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200' },
  { name: 'Takı', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200' },
  { name: 'Giyim', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=200' },
];

// Curated Collection filters
type MoodType = 'all' | 'under15k' | 'evening' | 'beach' | 'quiet_luxury';

export default function HomeScreen({ onSelectProduct }: { onSelectProduct: (product: Product) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeMood, setActiveMood] = useState<MoodType>('all');
  
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
    // Dynamic Mock based on real-time hour or location simulation
    const locations = [
      { name: 'Bodrum', temp: 32, desc: 'Güneşli Esinti', vibe: 'Plaj Rahatlığı & Akşamüstü Kokteyl Kombinleri' },
      { name: 'İstanbul', temp: 26, desc: 'Hafif Bulutlu', vibe: 'Boğaz Havası & Nişantaşı Sokak Şıklığı' },
      { name: 'Çeşme', temp: 30, desc: 'Rüzgarlı Güneşli', vibe: 'Alaçatı Esintisi & Keten Rahatlığı' },
      { name: 'Londra', temp: 19, desc: 'Hafif Yağmurlu', vibe: 'Trençkot & Luxury Deri Çanta Kombinleri' }
    ];
    
    // Auto pick a location randomly to simulate geolocation detection on start
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    setLocationName(randomLoc.name);
    setTemp(randomLoc.temp);
    setWeatherDesc(randomLoc.desc);
    setCurationVibe(randomLoc.vibe);
  }

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (e: any) {
      console.error(e.message);
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

    return matchesSearch && matchesCategory && matchesMood;
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Marka, model veya stil ara..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

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
              
              {/* Geolocation & Weather Concierge Widget */}
              <View style={styles.conciergeWidget}>
                <View style={styles.conciergeHeader}>
                  <Text style={styles.conciergeTag}>📍 PEONY WEATHER CONCIERGE</Text>
                  <Text style={styles.weatherInfo}>{locationName}, {temp}°C • {weatherDesc}</Text>
                </View>
                <Text style={styles.conciergeTitle}>{locationName} Havasına Özel Kürasyon</Text>
                <Text style={styles.conciergeDesc}>{curationVibe}</Text>
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
                  <Text style={styles.conciergeActionText}>Görünümü Keşfet →</Text>
                </TouchableOpacity>
              </View>

              {/* Shop By Category Horizontal list */}
              <Text style={styles.sectionTitle}>Kategoriler</Text>
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
                  <Text style={[styles.categoryName, !selectedCategory && styles.activeCategoryName]}>Tümü</Text>
                </TouchableOpacity>

                {CATEGORIES.map((cat, idx) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <TouchableOpacity 
                      key={idx}
                      style={styles.categoryItem}
                      onPress={() => setSelectedCategory(cat.name)}
                    >
                      <Image source={{ uri: cat.image }} style={[styles.categoryImage, isActive && styles.activeCategoryImage]} />
                      <Text style={[styles.categoryName, isActive && styles.activeCategoryName]}>{cat.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* PEONY PRIVÉ - VIP EARLY ACCESS / FOMO SLIDER */}
              <View style={styles.priveContainer}>
                <View style={styles.priveHeader}>
                  <View>
                    <Text style={styles.priveTitle}>🔒 PEONY PRIVÉ</Text>
                    <Text style={styles.priveSubtitle}>VIP Üyelere 24 Saat Erken Erişim</Text>
                  </View>
                  <View style={styles.timerBadge}>
                    <Text style={styles.timerText}>14:32:05 kaldı</Text>
                  </View>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.priveScroll}>
                  {/* Item 1 */}
                  <View style={styles.priveCard}>
                    <Image 
                      source={{ uri: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' }} 
                      style={styles.priveImg} 
                      blurRadius={10} // Blurs the image to create FOMO!
                    />
                    <View style={styles.lockOverlay}>
                      <Text style={styles.lockIcon}>🔒</Text>
                      <Text style={styles.lockText}>VIP ÖNİZLEME</Text>
                    </View>
                    <View style={styles.priveInfo}>
                      <Text style={styles.priveBrand}>HERMÈS</Text>
                      <Text style={styles.priveName}>Birkin 30 Togo Black</Text>
                    </View>
                  </View>

                  {/* Item 2 */}
                  <View style={styles.priveCard}>
                    <Image 
                      source={{ uri: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300' }} 
                      style={styles.priveImg} 
                      blurRadius={10}
                    />
                    <View style={styles.lockOverlay}>
                      <Text style={styles.lockIcon}>🔒</Text>
                      <Text style={styles.lockText}>VIP ÖNİZLEME</Text>
                    </View>
                    <View style={styles.priveInfo}>
                      <Text style={styles.priveBrand}>CHANEL</Text>
                      <Text style={styles.priveName}>Classic Double Flap Gold</Text>
                    </View>
                  </View>
                </ScrollView>
              </View>

              {/* Styled Mood Curations Slider (Matches Web Categories) */}
              <Text style={styles.sectionTitle}>Editoryal Kürasyonlar</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.moodScroll}
              >
                <TouchableOpacity 
                  style={[styles.moodPill, activeMood === 'all' && styles.activeMoodPill]} 
                  onPress={() => setActiveMood('all')}
                >
                  <Text style={[styles.moodText, activeMood === 'all' && styles.activeMoodText]}>Tüm Vitrin</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.moodPill, activeMood === 'under15k' && styles.activeMoodPill]} 
                  onPress={() => setActiveMood('under15k')}
                >
                  <Text style={[styles.moodText, activeMood === 'under15k' && styles.activeMoodText]}>15K TL Altı Çantalar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.moodPill, activeMood === 'evening' && styles.activeMoodPill]} 
                  onPress={() => setActiveMood('evening')}
                >
                  <Text style={[styles.moodText, activeMood === 'evening' && styles.activeMoodText]}>Gecenin Şıklığı</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.moodPill, activeMood === 'beach' && styles.activeMoodPill]} 
                  onPress={() => setActiveMood('beach')}
                >
                  <Text style={[styles.moodText, activeMood === 'beach' && styles.activeMoodText]}>Plaj Rahatlığı</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.moodPill, activeMood === 'quiet_luxury' && styles.activeMoodPill]} 
                  onPress={() => setActiveMood('quiet_luxury')}
                >
                  <Text style={[styles.moodText, activeMood === 'quiet_luxury' && styles.activeMoodText]}>Sessiz Lüks</Text>
                </TouchableOpacity>
              </ScrollView>

              <Text style={styles.sectionTitle}>Sizin İçin Seçilenler</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>✦</Text>
              <Text style={styles.emptyText}>Bu kürasyona ait ürün bulunamadı.</Text>
            </View>
          }
          renderItem={({ item }) => (
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
              </View>
              <View style={styles.info}>
                <Text style={styles.brand} numberOfLines={1}>{item.brand}</Text>
                <Text style={styles.name} numberOfLines={1}>{item.model_name}</Text>
                <Text style={styles.price}>{item.price?.toLocaleString('tr-TR')} TL</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
  searchContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 5,
  },
  searchInput: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    height: 44,
    color: COLORS.text,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    ...StyleSheet.absoluteFillObject,
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
  }
});
