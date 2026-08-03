/**
 * @file ProductReelsScreen.tsx
 * @description Peony Collective Mobil Uygulaması Ultra-Sade & Minimalist Reels (Keşfet) Ekranı.
 * 
 * Tasarım Felsefesi (Clean Minimalist Luxury):
 * - Instagram / TikTok sadeliğinde, kalabalıktan uzak, ürüne odaklanan arayüz.
 * - Gizli/isteğe bağlı açılan arama çubuğu ve etkileşim noktaları.
 * - Sağa-sola kaydırmalı fotoğraf galerisi & dikey snap scroll.
 * - Double-Tap kalp efekti ve temiz şeffaf aksiyon ikonları.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StatusBar,
  ViewToken,
  Animated,
  Share,
  TextInput,
  Platform,
  ScrollView
} from 'react-native';
import { supabase } from '../lib/supabase';
import { t } from '../lib/i18n';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const COLORS = {
  bg: '#000000',
  card: '#141416',
  text: '#FFFFFF',
  textMuted: '#A0A0A8',
  primary: '#C5A059', // Classic Champagne Gold
  goldLight: '#F3E5C8',
  glassBg: 'rgba(15, 15, 18, 0.60)',
  glassBorder: 'rgba(255, 255, 255, 0.15)'
};

export interface ReelProduct {
  id: string;
  brand: string;
  model_name: string;
  price: number;
  condition?: string;
  category?: string;
  public_images?: string[];
  lifestyle_image?: string;
  gallery: string[];
  description?: string;
  short_summary?: string;
  hotspot?: { x: number; y: number };
}

interface ProductReelsScreenProps {
  onSelectProduct: (product: any) => void;
  onClose?: () => void;
  likedIds?: string[];
  onToggleLike?: (id: string) => void;
  onOpenStylist?: () => void;
}

export default function ProductReelsScreen({
  onSelectProduct,
  onClose,
  likedIds = [],
  onToggleLike,
  onOpenStylist
}: ProductReelsScreenProps) {
  const [products, setProducts] = useState<ReelProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuickBuyProduct, setSelectedQuickBuyProduct] = useState<ReelProduct | null>(null);
  const [showTagDetails, setShowTagDetails] = useState<Record<string, boolean>>({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  // Animations
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const heartScaleAnim = useRef(new Animated.Value(0)).current;
  const heartOpacityAnim = useRef(new Animated.Value(0)).current;
  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.4,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();

    fetchReelProducts();
  }, []);

  const triggerDoubleTapHeart = () => {
    heartScaleAnim.setValue(0.3);
    heartOpacityAnim.setValue(1);

    Animated.parallel([
      Animated.spring(heartScaleAnim, {
        toValue: 1.3,
        friction: 4,
        useNativeDriver: true
      }),
      Animated.timing(heartOpacityAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true
      })
    ]).start();
  };

  const handleImagePress = (productId: string) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      if (onToggleLike && !likedIds.includes(productId)) {
        onToggleLike(productId);
      }
      triggerDoubleTapHeart();
    }
    lastTapRef.current = now;
  };

  const fetchReelProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) throw error;

      if (data && data.length > 0) {
        const formatted: ReelProduct[] = data.map((item: any, idx: number) => {
          const rawImages: string[] = item.public_images || item.image_urls || [];
          const actualProductImage = rawImages[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900';

          const gallery = rawImages.length > 0 ? rawImages : [actualProductImage];
          if (item.lifestyle_image) {
            gallery.unshift(item.lifestyle_image);
          }

          let summaryTeaser = item.description
            ? item.description.replace(/#|\*|-/g, '').trim().slice(0, 80) + '...'
            : '';

          return {
            id: item.id,
            brand: (item.brand || 'LUXURY').toUpperCase(),
            model_name: item.model_name || item.title || 'Exclusive Piece',
            price: item.price || 0,
            condition: item.condition || 'Çok İyi',
            category: item.category || 'Çanta',
            public_images: rawImages,
            gallery,
            lifestyle_image: item.lifestyle_image || actualProductImage,
            description: item.description || '',
            short_summary: summaryTeaser,
            hotspot: { x: 50 + (idx % 2 === 0 ? 6 : -6), y: 44 + (idx % 3 === 0 ? 4 : -4) }
          };
        });

        setProducts(formatted);
      } else {
        setProducts(getDemoReelsData());
      }
    } catch (err) {
      console.error('Error fetching reels products:', err);
      setProducts(getDemoReelsData());
    } finally {
      setLoading(false);
    }
  };

  const getDemoReelsData = (): ReelProduct[] => [
    {
      id: 'demo-1',
      brand: 'LOUIS VUITTON',
      model_name: 'Alma GM Patent Leather',
      price: 42500,
      condition: 'Çok İyi',
      gallery: [
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900',
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900'
      ],
      lifestyle_image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900',
      short_summary: 'Işıltılı bordo rugan deri ve monogram kabartma.',
      hotspot: { x: 50, y: 45 }
    }
  ];

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.brand.toLowerCase().includes(q) ||
      p.model_name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  });

  const handleShare = async (product: ReelProduct) => {
    try {
      await Share.share({
        message: `${product.brand} - ${product.model_name} | Peony: ${product.price.toLocaleString('tr-TR')} ₺`
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const toggleHotspotTag = (productId: string) => {
    setShowTagDetails((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const renderReelItem = ({ item, index }: { item: ReelProduct; index: number }) => {
    const isLiked = likedIds.includes(item.id);
    const isTagOpen = showTagDetails[item.id] ?? false; // Default: HIDDEN so screen stays super clean!
    const activeImgIdx = activeImageIndexes[item.id] || 0;

    return (
      <View style={styles.reelContainer}>
        {/* Horizontal Multi-Image Carousel with Double-Tap Handler */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => handleImagePress(item.id)}
          style={styles.carouselContainer}
        >
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const slide = Math.round(e.nativeEvent.contentOffset.x / WINDOW_WIDTH);
              if (slide !== activeImgIdx) {
                setActiveImageIndexes((prev) => ({ ...prev, [item.id]: slide }));
              }
            }}
            scrollEventThrottle={16}
          >
            {item.gallery.map((imgUrl, imgIdx) => (
              <View key={imgIdx} style={styles.imageWrapper}>
                <Image
                  source={{ uri: imgUrl }}
                  style={styles.fullScreenImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>

          {/* Animated Double-Tap Heart Overlay */}
          <Animated.View
            style={[
              styles.heartAnimContainer,
              {
                opacity: heartOpacityAnim,
                transform: [{ scale: heartScaleAnim }]
              }
            ]}
            pointerEvents="none"
          >
            <Text style={styles.heartAnimEmoji}>❤️</Text>
          </Animated.View>
        </TouchableOpacity>

        {/* Ambient Dark Gradient Overlays */}
        <View style={styles.topGradient} pointerEvents="none" />
        <View style={styles.bottomGradient} pointerEvents="none" />

        {/* Multi-Image Gallery Indicator Dots */}
        {item.gallery.length > 1 && (
          <View style={styles.carouselDotsContainer} pointerEvents="none">
            {item.gallery.map((_, dotIdx) => (
              <View
                key={dotIdx}
                style={[
                  styles.carouselDot,
                  dotIdx === activeImgIdx && styles.carouselDotActive
                ]}
              />
            ))}
          </View>
        )}

        {/* Minimal Hotspot Pulse Dot (Expands tag ONLY on tap) */}
        {item.hotspot && (
          <View
            style={[
              styles.hotspotContainer,
              { left: `${item.hotspot.x}%`, top: `${item.hotspot.y}%` }
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => toggleHotspotTag(item.id)}
              style={styles.hotspotTouchArea}
            >
              <Animated.View
                style={[
                  styles.hotspotPulse,
                  { transform: [{ scale: pulseAnim }] }
                ]}
              />
              <View style={styles.hotspotCore} />
            </TouchableOpacity>

            {/* Hotspot Clean Tag Popup */}
            {isTagOpen && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onSelectProduct(item)}
                style={styles.hotspotCard}
              >
                <Text style={styles.hotspotBrand}>{item.brand}</Text>
                <Text style={styles.hotspotPrice}>
                  {item.price.toLocaleString('tr-TR')} ₺
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Right Floating Actions (Like, Share, Info, Muse AI) */}
        <View style={styles.rightActionsColumn}>
          {/* Like Button */}
          <TouchableOpacity
            style={styles.actionIconButton}
            onPress={() => onToggleLike && onToggleLike(item.id)}
          >
            <Text style={styles.actionIconText}>{isLiked ? '❤️' : '🤍'}</Text>
            <Text style={styles.actionLabelText}>{t('reelsLike')}</Text>
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity
            style={styles.actionIconButton}
            onPress={() => handleShare(item)}
          >
            <Text style={styles.actionIconText}>↗️</Text>
            <Text style={styles.actionLabelText}>{t('reelsShare')}</Text>
          </TouchableOpacity>

          {/* Product Details Button */}
          <TouchableOpacity
            style={styles.actionIconButton}
            onPress={() => onSelectProduct(item)}
          >
            <Text style={styles.actionIconText}>🔍</Text>
            <Text style={styles.actionLabelText}>{t('reelsDetails')}</Text>
          </TouchableOpacity>

          {/* Muse AI Button */}
          {onOpenStylist && (
            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={onOpenStylist}
            >
              <Text style={styles.actionIconText}>✦</Text>
              <Text style={styles.actionLabelText}>Muse AI</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Ultra-Clean Bottom Info Overlay (Instagram Style) */}
        <View style={styles.bottomInfoContainer}>
          {/* Brand & Model */}
          <Text style={styles.brandTitleText}>{item.brand}</Text>
          <Text style={styles.productModelText} numberOfLines={1}>
            {item.model_name}
          </Text>

          {/* Price & Condition Row */}
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>
              {item.price.toLocaleString('tr-TR')} ₺
            </Text>
            {item.condition && (
              <View style={styles.conditionTag}>
                <Text style={styles.conditionTagText}>{item.condition}</Text>
              </View>
            )}
            <View style={styles.entrupyMiniBadge}>
              <Text style={styles.entrupyMiniText}>🛡️ VERIFIED</Text>
            </View>
          </View>

          {/* Action Buttons Row */}
          <View style={styles.bottomButtonsRow}>
            <TouchableOpacity
              style={styles.inspectButton}
              onPress={() => onSelectProduct(item)}
            >
              <Text style={styles.inspectButtonText}>{t('reelsInspectBtn')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buyNowButton}
              onPress={() => setSelectedQuickBuyProduct(item)}
            >
              <Text style={styles.buyNowButtonText}>{t('reelsQuickBuyBtn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>{t('loading')}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Top Header Bar - Minimal & Uncluttered */}
      <View style={styles.headerBar}>
        <Text style={styles.brandLogoHeader}>PEONY • REELS</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.searchIconButton}
            onPress={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Text style={styles.searchIconText}>🔍</Text>
          </TouchableOpacity>

          {onClose && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Expandable Search Input (Only visible when user taps search icon) */}
      {isSearchOpen && (
        <View style={styles.searchBarExpandable}>
          <TextInput
            style={styles.searchInput}
            placeholder={t('reelsSearchPlaceholder')}
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <TouchableOpacity onPress={() => { setSearchQuery(''); setIsSearchOpen(false); }}>
            <Text style={styles.clearSearchText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Vertical Fullscreen Snap Feed */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderReelItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={WINDOW_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          length: WINDOW_HEIGHT,
          offset: WINDOW_HEIGHT * index,
          index
        })}
      />

      {/* Quick Buy Modal Sheet */}
      <Modal
        visible={!!selectedQuickBuyProduct}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedQuickBuyProduct(null)}
      >
        {selectedQuickBuyProduct && (
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setSelectedQuickBuyProduct(null)}
          >
            <View style={styles.modalSheetContainer}>
              <View style={styles.modalHandle} />

              <View style={styles.modalHeaderRow}>
                <Image
                  source={{
                    uri:
                      selectedQuickBuyProduct.gallery?.[0] ||
                      selectedQuickBuyProduct.lifestyle_image
                  }}
                  style={styles.modalProductThumb}
                />
                <View style={styles.modalTitleCol}>
                  <Text style={styles.modalBrandText}>
                    {selectedQuickBuyProduct.brand}
                  </Text>
                  <Text style={styles.modalModelText} numberOfLines={1}>
                    {selectedQuickBuyProduct.model_name}
                  </Text>
                  <Text style={styles.modalPriceText}>
                    {selectedQuickBuyProduct.price.toLocaleString('tr-TR')} ₺
                  </Text>
                </View>
              </View>

              <View style={styles.modalDivider} />

              <View style={styles.modalInfoBox}>
                <Text style={styles.modalInfoLabel}>{t('reelsAuthenticityVerified')}</Text>
                <Text style={styles.modalInfoSub}>
                  {t('reelsAuthenticitySub')}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modalCheckoutBtn}
                onPress={() => {
                  const productToBuy = selectedQuickBuyProduct;
                  setSelectedQuickBuyProduct(null);
                  onSelectProduct(productToBuy);
                }}
              >
                <Text style={styles.modalCheckoutBtnText}>
                  {t('reelsCheckoutBtn')}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    marginTop: 15,
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1
  },
  reelContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    position: 'relative',
    backgroundColor: '#0A0A0C'
  },
  carouselContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    position: 'relative'
  },
  imageWrapper: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050505'
  },
  fullScreenImage: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT
  },
  heartAnimContainer: {
    position: 'absolute',
    top: WINDOW_HEIGHT / 2 - 50,
    left: WINDOW_WIDTH / 2 - 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  heartAnimEmoji: {
    fontSize: 80
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.45)'
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 260,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  carouselDotsContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 175 : 160,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 25
  },
  carouselDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    marginRight: 4
  },
  carouselDotActive: {
    width: 14,
    backgroundColor: COLORS.primary
  },
  headerBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 45 : 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 40
  },
  brandLogoHeader: {
    color: COLORS.goldLight,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.glassBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    marginRight: 8
  },
  searchIconText: {
    fontSize: 14
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.glassBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.glassBorder
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 14
  },
  searchBarExpandable: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 75,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(15, 15, 18, 0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    zIndex: 50
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 13,
    padding: 0
  },
  clearSearchText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginLeft: 8
  },
  // Hotspot Dot Styles
  hotspotContainer: {
    position: 'absolute',
    zIndex: 25,
    alignItems: 'center'
  },
  hotspotTouchArea: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hotspotPulse: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(197, 160, 89, 0.35)'
  },
  hotspotCore: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  hotspotCard: {
    position: 'absolute',
    top: 34,
    alignSelf: 'center',
    backgroundColor: 'rgba(15, 15, 18, 0.92)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: 130, // Explicit width prevents vertical text squishing
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6
  },
  hotspotBrand: {
    color: COLORS.goldLight,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    textAlign: 'center'
  },
  hotspotPrice: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
    textAlign: 'center'
  },
  // Right Actions Column
  rightActionsColumn: {
    position: 'absolute',
    right: 16,
    bottom: 165,
    alignItems: 'center',
    zIndex: 30
  },
  actionIconButton: {
    alignItems: 'center',
    marginBottom: 18
  },
  actionIconText: {
    fontSize: 26,
    color: '#FFF'
  },
  actionLabelText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 3
  },
  // Bottom Info Overlay
  bottomInfoContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 85,
    left: 20,
    right: 76,
    zIndex: 30
  },
  brandTitleText: {
    color: COLORS.goldLight,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.8
  },
  productModelText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800'
  },
  conditionTag: {
    marginLeft: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6
  },
  conditionTagText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '600'
  },
  entrupyMiniBadge: {
    marginLeft: 6,
    backgroundColor: 'rgba(197, 160, 89, 0.25)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: COLORS.primary
  },
  entrupyMiniText: {
    color: COLORS.goldLight,
    fontSize: 9,
    fontWeight: '800'
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  inspectButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)'
  },
  inspectButtonText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700'
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  buyNowButtonText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800'
  },
  // Modal Sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    justifyContent: 'flex-end'
  },
  modalSheetContainer: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 25,
    borderWidth: 1,
    borderColor: COLORS.glassBorder
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalProductThumb: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#000'
  },
  modalTitleCol: {
    marginLeft: 14,
    flex: 1
  },
  modalBrandText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1
  },
  modalModelText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2
  },
  modalPriceText: {
    color: COLORS.goldLight,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4
  },
  modalDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16
  },
  modalInfoBox: {
    backgroundColor: 'rgba(197, 160, 89, 0.15)',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(197, 160, 89, 0.3)',
    marginBottom: 16
  },
  modalInfoLabel: {
    color: COLORS.goldLight,
    fontSize: 12,
    fontWeight: '700'
  },
  modalInfoSub: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    marginTop: 2
  },
  modalCheckoutBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  modalCheckoutBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800'
  }
});
