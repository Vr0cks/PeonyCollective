import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  TextInput,
  Dimensions
} from 'react-native';
import { supabase } from '../lib/supabase';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 50) / 2;

const COLORS = {
  bg: '#0A0A0E', // Ultra deep black/charcoal
  card: '#13141A', // Rich card slate
  text: '#F5F5F7', // Off-white premium text
  textMuted: '#8E909B', // Slate gray
  primary: '#AF9164', // Classic champagne gold
  border: '#1F212A', // Thin luxury dividers
  accent: '#10B981' // Emerald green
};

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_urls?: string[];
  entrupy_status: string;
  description?: string;
}

interface HomeScreenProps {
  onSelectProduct: (product: Product) => void;
}

export default function HomeScreen({ onSelectProduct }: HomeScreenProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'approved') // Only show approved/verified items on catalog
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Fetch products error:', error.message);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Marka veya model ara..."
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
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓ VERIFIED</Text>
                </View>
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
    padding: 15,
  },
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
    padding: 15,
  },
  searchInput: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    height: 45,
    color: COLORS.text,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gridContent: {
    padding: 15,
    paddingBottom: 100, // Safe padding for floating tab bar
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    width: COLUMN_WIDTH,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    // Add subtle shadow for premium floating feel
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageWrapper: {
    position: 'relative',
    height: COLUMN_WIDTH,
    backgroundColor: '#F5F5F7',
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
    backgroundColor: 'rgba(175, 145, 100, 0.9)', // Luxury Gold Badge
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
    padding: 12,
  },
  brand: {
    fontSize: 10,
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
    fontSize: 13,
    color: COLORS.text,
    marginTop: 4,
    fontWeight: '600',
  },
  emptyContainer: {
    paddingVertical: 120,
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
