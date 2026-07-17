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
  Platform
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
  bannerBg: '#E9EFEA' // Very soft pastel green for promotion
};

interface Product {
  id: string;
  model_name: string;
  brand: string;
  price: number;
  public_images?: string[];
  entrupy_status: string;
  description?: string;
}

const CATEGORIES = [
  { name: 'Çanta', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200' },
  { name: 'Saat', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
  { name: 'Ayakkabı', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200' },
  { name: 'Takı', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200' },
  { name: 'Giyim', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=200' },
];

interface HomeScreenProps {
  onSelectProduct: (product: Product) => void;
}

export default function HomeScreen({ onSelectProduct }: HomeScreenProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

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
    
    // Simple mock category filtering based on keywords or model name
    if (selectedCategory) {
      const catLower = selectedCategory.toLowerCase();
      const matchesCategory = p.model_name?.toLowerCase().includes(catLower) || 
                              p.brand?.toLowerCase().includes(catLower) ||
                              (catLower === 'çanta' && p.model_name?.toLowerCase().includes('bag')) ||
                              (catLower === 'saat' && p.model_name?.toLowerCase().includes('watch')) ||
                              (catLower === 'takı' && p.model_name?.toLowerCase().includes('gold'));
      return matchesSearch && matchesCategory;
    }

    return matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Marka, model veya kategori ara..."
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
              {/* Luxury Promo Banner (Matches Vestiaire banner style) */}
              <View style={styles.promoBanner}>
                <View style={styles.promoTextContainer}>
                  <Text style={styles.promoTitle}>İlk Satışınıza Özel</Text>
                  <Text style={styles.promoDesc}>Sıfır hizmet bedeli ve komisyon avantajını kaçırmayın.</Text>
                </View>
                <TouchableOpacity style={styles.promoAction}>
                  <Text style={styles.promoActionText}>İncele →</Text>
                </TouchableOpacity>
              </View>

              {/* Shop By Category Circular list */}
              <Text style={styles.sectionTitle}>Kategorilere Göz At</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScroll}
              >
                <TouchableOpacity 
                  style={[styles.categoryItem, !selectedCategory && styles.activeCategoryItem]}
                  onPress={() => setSelectedCategory(null)}
                >
                  <View style={[styles.categoryCircle, !selectedCategory && styles.activeCategoryCircle]}>
                    <Text style={styles.categoryAllEmoji}>✦</Text>
                  </View>
                  <Text style={[styles.categoryName, !selectedCategory && styles.activeCategoryName]}>Tümü</Text>
                </TouchableOpacity>

                {CATEGORIES.map((cat, idx) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <TouchableOpacity 
                      key={idx}
                      style={[styles.categoryItem, isActive && styles.activeCategoryItem]}
                      onPress={() => setSelectedCategory(cat.name)}
                    >
                      <Image source={{ uri: cat.image }} style={[styles.categoryImage, isActive && styles.activeCategoryImage]} />
                      <Text style={[styles.categoryName, isActive && styles.activeCategoryName]}>{cat.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <Text style={styles.sectionTitle}>Yeni Gelenler</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>✦</Text>
              <Text style={styles.emptyText}>Henüz sergilenecek ürün bulunmuyor.</Text>
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
    paddingTop: 15,
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
  promoBanner: {
    backgroundColor: COLORS.bannerBg,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  promoTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2E4C36',
    letterSpacing: 0.5,
  },
  promoDesc: {
    fontSize: 11,
    color: '#4B6B54',
    marginTop: 4,
    lineHeight: 15,
  },
  promoAction: {
    backgroundColor: '#1E3524',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
  },
  promoActionText: {
    color: '#FFFFFF',
    fontSize: 10.5,
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
  activeCategoryItem: {},
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
  gridContent: {
    paddingBottom: 100, // Safe padding for floating tab bar
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'transparent', // Clean borderless look
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
    paddingVertical: 80,
    alignItems: 'center',
    justifyContent: 'center',
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
