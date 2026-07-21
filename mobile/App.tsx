import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions,
  Modal,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from './src/lib/supabase';
import { t, locale } from './src/lib/i18n';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SellScreen from './src/screens/SellScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OperationsQueueScreen from './src/screens/OperationsQueueScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import ChatDetailScreen from './src/screens/ChatDetailScreen';
import SupportTicketsScreen from './src/screens/SupportTicketsScreen';

const { width, height } = Dimensions.get('window');

// Premium Light Luxury Theme (Matches Website)
const COLORS = {
  bg: '#FBFBFA', // Luxury off-white
  card: '#FFFFFF', // Clean white
  text: '#1A1A1A', // High-contrast charcoal text
  textMuted: '#7E8085', // Slate gray
  primary: '#AF9164', // Classic champagne gold
  border: '#E8E8E6', // Super thin elegant dividers
  accent: '#10B981', // Emerald green
  danger: '#EF4444',
  darkBar: '#12131A' // Floating navigation background
};

type Tab = 'feed' | 'sell' | 'chats' | 'support' | 'profile' | 'details' | 'chat_detail' | 'operations';

interface Product {
  id: string;
  model_name: string;
  brand: string;
  price: number;
  public_images?: string[];
  entrupy_status: string;
  description?: string;
  material?: string;
  condition?: string;
}

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<Tab>('feed');
  const [role, setRole] = useState<string>('user');
  
  // Navigation states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedChatName, setSelectedChatName] = useState<string>('');
  const [selectedChatProduct, setSelectedChatProduct] = useState<any>(null);

  // Favorites (Wishlist) tracking with simulated price reduction notifications
  const [likedIds, setLikedIds] = useState<string[]>(['chanel-flap', 'rolex-sub']); 
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  // AI Stylist Chatbot states (Muse)
  const [stylistVisible, setStylistVisible] = useState(false);
  const [chatbotInput, setChatbotInput] = useState('');
  const [loadingStylist, setLoadingStylist] = useState(false);
  const [chatbotMessages, setChatbotMessages] = useState<any[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: t('museGreeting')
    }
  ]);

  // Simulated AI Stylist dynamic recommendation algorithm using real products from DB
  async function handleSendMessageToStylist() {
    if (!chatbotInput.trim()) return;

    const userText = chatbotInput.trim();
    const messageId = Date.now().toString();

    // Append user message
    const updatedMessages = [
      ...chatbotMessages,
      { id: messageId, sender: 'user' as const, text: userText }
    ];
    setChatbotMessages(updatedMessages);
    setChatbotInput('');
    setLoadingStylist(true);

    // --- CLAUDE BACKEND API İLE ENTEGRASYON ALTYAPISI ---
    // Canlıya çıkarken Next.js tarafında yazdığın /api/muse API'sini buraya bağla.
    // USE_BACKEND_API değerini true yaparak API'yi aktif edebilirsin.
    // Set to true to use real Claude Haiku AI Backend
    const USE_BACKEND_API = true;
    const BACKEND_API_URL = 'http://192.168.1.82:3000/api/muse';

    if (USE_BACKEND_API) {
      try {
        const sessionData = (await supabase.auth.getSession()).data.session;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 sn timeout (Claude API için yetecek süre)

        const response = await fetch(BACKEND_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionData?.access_token || ''}`
          },
          body: JSON.stringify({
            message: userText,
            locale: locale
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await response.json();
        
        if (!response.ok) {
          const errMsg = data.error || (locale === 'tr' ? 'Bir hata oluştu.' : 'An error occurred.');
          setChatbotMessages(prev => [
            ...prev,
            {
              id: `ai-err-${Date.now()}`,
              sender: 'ai',
              text: `⚠️ ${errMsg}`,
              products: []
            }
          ]);
          setLoadingStylist(false);
          return;
        }

        if (data.text) {
          await new Promise(resolve => setTimeout(resolve, 800));

          setChatbotMessages(prev => [
            ...prev,
            {
              id: `ai-${Date.now()}`,
              sender: 'ai',
              text: data.text,
              products: data.products || []
            }
          ]);
          setLoadingStylist(false);
          return;
        }
      } catch (apiErr) {
        console.warn('Backend API ulaşılamadı, yerel stil danışmanı devreye giriyor:', apiErr);
      }
    }

    try {
      // Supabase'den sadece onaylı ve satılmamış ürünleri çek
      const { data: dbProducts } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'approved');

      const realProducts = dbProducts || [];

      let responseText = '';
      let recommendedProducts: any[] = [];

      const query = userText.toLowerCase();

      // Kelime eşleştirme fonksiyonu
      const findMatchingProducts = (keywords: string[]) => {
        return realProducts.filter(p => 
          keywords.some(k => 
            p.brand?.toLowerCase().includes(k) || 
            p.model_name?.toLowerCase().includes(k) ||
            p.description?.toLowerCase().includes(k)
          )
        ).map(p => ({
          id: p.id,
          brand: p.brand,
          model_name: p.model_name,
          price: p.price,
          image: p.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300'
        }));
      };

      if (query.includes('/help') || query.includes('yardım') || query.includes('help')) {
        responseText = locale === 'tr'
          ? "✦ Peony Muse Kılavuzu ✦\n\nStil danışmanınız olarak sizin için en iyi kombinleri hazırlamam için şunları deneyebilirsiniz:\n\n1. 😊 *Duygu Durumu:* Modunuzu yazın (Örn: 'Mutluyum', 'Yorgun hissediyorum')\n2. ⛵ *Yat & Deniz:* Tatil planınızı yazın (Örn: 'Tekne turu', 'Plaj partisi')\n3. 🕯️ *Akşam Daveti:* Katılacağınız daveti yazın (Örn: 'Akşam yemeği', 'Düğün şıklığı')\n4. 💼 *Sessiz Lüks:* Klasik şıklık için 'Sessiz lüks' yazabilirsiniz."
          : "✦ Peony Muse Guide ✦\n\nTo help me curate the best luxury look for you, try typing:\n\n1. 😊 *Mood:* How do you feel? (e.g. 'Feeling happy', 'Tired')\n2. ⛵ *Sea & Yacht:* Holiday vibe (e.g. 'Yacht party', 'Beach trip')\n3. 🕯️ *Dinner:* Events (e.g. 'Dinner party', 'Wedding look')\n4. 💼 *Quiet Luxury:* Standard elegant classic advice.";
      } else if (query.includes('mutlu') || query.includes('keyif') || query.includes('modum') || query.includes('enerj') || query.includes('heyecan') || query.includes('happy') || query.includes('excited') || query.includes('good') || query.includes('feel') || query.includes('hissed') || query.includes('yorgun') || query.includes('tired') || query.includes('üzgün') || query.includes('sad')) {
        // Mutlu/Yorgun gibi durumlarda Chanel veya Cartier ara
        recommendedProducts = findMatchingProducts(['chanel', 'cartier', 'gold', 'altın']);
        
        // Eğer eşleşen ürün yoksa DB'deki ilk 2 ürünü öner
        if (recommendedProducts.length === 0 && realProducts.length > 0) {
          recommendedProducts = realProducts.slice(0, 2).map(p => ({
            id: p.id,
            brand: p.brand,
            model_name: p.model_name,
            price: p.price,
            image: p.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300'
          }));
        }

        responseText = locale === 'tr'
          ? `Kendinizi şımartacak bir şeyler arıyorsunuz. Koleksiyonumuzdaki en özel parçaları sizin için listeledim. Bu nadide eserler bugününüze değer katacaktır.`
          : `Looking for something to pamper yourself. I have listed the most exclusive pieces in our collection for you. These rare items will add value to your day.`;
      } else if (query.includes('tekne') || query.includes('yat') || query.includes('deniz') || query.includes('yacht') || query.includes('plaj') || query.includes('beach') || query.includes('bodrum') || query.includes('çeşme')) {
        recommendedProducts = findMatchingProducts(['loewe', 'rolex', 'hasır', 'tote', 'canvas', 'basket']);
        
        if (recommendedProducts.length === 0 && realProducts.length > 0) {
          recommendedProducts = realProducts.slice(0, 2).map(p => ({
            id: p.id,
            brand: p.brand,
            model_name: p.model_name,
            price: p.price,
            image: p.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300'
          }));
        }

        responseText = locale === 'tr' 
          ? 'Harika bir yaz planı! Deniz havası ve yat davetlerinin o rahat ama göz alıcı şıklığı için şu harika parçaları seçtim.'
          : 'A wonderful summer plan! For that relaxed yet glamorous yacht party look, I selected these amazing pieces.';
      } else if (query.includes('akşam') || query.includes('yemek') || query.includes('davet') || query.includes('düğün') || query.includes('gece') || query.includes('party') || query.includes('dinner')) {
        recommendedProducts = findMatchingProducts(['chanel', 'cartier', 'clutch', 'siyah', 'black']);
        
        if (recommendedProducts.length === 0 && realProducts.length > 0) {
          recommendedProducts = realProducts.slice(0, 2).map(p => ({
            id: p.id,
            brand: p.brand,
            model_name: p.model_name,
            price: p.price,
            image: p.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300'
          }));
        }

        responseText = locale === 'tr'
          ? 'Şık bir gece daveti! Gecenin tüm bakışlarını üzerinizde toplamak için şu göz alıcı koleksiyon parçalarını öneririm.'
          : 'An elegant evening dinner! I recommend these stunning collection pieces to capture all eyes tonight.';
      } else {
        recommendedProducts = findMatchingProducts(['bottega', 'hermes', 'loropiana', 'quiet', 'deri', 'leather']);
        
        if (recommendedProducts.length === 0 && realProducts.length > 0) {
          recommendedProducts = realProducts.slice(0, 2).map(p => ({
            id: p.id,
            brand: p.brand,
            model_name: p.model_name,
            price: p.price,
            image: p.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300'
          }));
        }

        responseText = locale === 'tr'
          ? 'Her ortama uyum sağlayacak "Quiet Luxury" (Sessiz Lüks) stilini öneriyorum. Detaylardaki dikiş kalitesiyle öne çıkan şu eserleri inceleyebilirsiniz:'
          : 'I highly recommend the "Quiet Luxury" style, which fits beautifully in any setting. Take a look at these pieces focusing on premium quality and details:';
      }

      setChatbotMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: responseText,
          products: recommendedProducts
        }
      ]);
    } catch (dbErr) {
      console.error('Muse DB error:', dbErr);
    } finally {
      setLoadingStylist(false);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setRole('user');
      }
    });
  }, []);

  // Fetch liked products details when modal opens
  useEffect(() => {
    if (favoritesVisible) {
      fetchFavoriteProductsDetails();
    }
  }, [favoritesVisible, likedIds]);

  async function fetchFavoriteProductsDetails() {
    if (likedIds.length === 0) {
      setFavoriteProducts([]);
      return;
    }
    setLoadingFavorites(true);
    try {
      // Filter out non-uuid elements to prevent Postgres syntax errors
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const validUuidIds = likedIds.filter(id => uuidRegex.test(id));
      
      let fetchedData: Product[] = [];
      if (validUuidIds.length > 0) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('id', validUuidIds);
        
        if (error) throw error;
        if (data) fetchedData = data;
      }

      // Add simulated mock product listings for local test showcase (Chanel & Rolex price drop simulations)
      const mocks: Product[] = [];
      if (likedIds.includes('chanel-flap')) {
        mocks.push({
          id: 'chanel-flap',
          brand: 'Chanel',
          model_name: 'Classic Double Flap Black Gold',
          price: 345000,
          public_images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300'],
          entrupy_status: 'approved'
        });
      }
      if (likedIds.includes('rolex-sub')) {
        mocks.push({
          id: 'rolex-sub',
          brand: 'Rolex',
          model_name: 'Submariner Date Starbucks',
          price: 685000,
          public_images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'],
          entrupy_status: 'approved'
        });
      }

      setFavoriteProducts([...mocks, ...fetchedData]);
    } catch (err: any) {
      console.error('Error fetching favorites:', err.message);
    } finally {
      setLoadingFavorites(false);
    }
  }

  const toggleLike = (id: string) => {
    setLikedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  async function fetchUserRole(userId: string) {
    const { data } = await supabase.from('profiles').select('role').eq('id', userId).maybeSingle();
    if (data?.role) {
      setRole(data.role);
    }
  }

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    setCurrentTab('details');
  }

  function handleSelectChat(conversationId: string, otherName: string, productInfo?: any) {
    setSelectedChatId(conversationId);
    setSelectedChatName(otherName);
    setSelectedChatProduct(productInfo);
    setCurrentTab('chat_detail');
  }

  const isMainTab = currentTab === 'feed' || currentTab === 'sell' || currentTab === 'chats' || currentTab === 'support' || currentTab === 'profile';

  if (!session) {
    return <LoginScreen onSuccess={() => setCurrentTab('feed')} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      {/* Header (Only visible on main tabs) */}
      {isMainTab && (
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <View style={{ width: 40 }} />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.headerTitle}>PEONY</Text>
              <Text style={styles.headerSubtitle}>
                {currentTab === 'feed' && t('luxuryCollection')}
                {currentTab === 'sell' && t('appraise')}
                {currentTab === 'chats' && t('messages')}
                {currentTab === 'support' && t('supportCenter')}
                {currentTab === 'profile' && t('myAccount')}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.favoritesTrigger}
              onPress={() => setFavoritesVisible(true)}
            >
              <Text style={styles.heartEmoji}>❤️</Text>
              {likedIds.length > 0 && (
                <View style={styles.badgeCount}>
                  <Text style={styles.badgeCountText}>{likedIds.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Screen Router */}
      <View style={styles.mainContainer}>
        {currentTab === 'feed' && (
          <HomeScreen 
            onSelectProduct={handleSelectProduct} 
            likedIds={likedIds}
            onToggleLike={toggleLike}
            onOpenStylist={() => setStylistVisible(true)}
          />
        )}
        {currentTab === 'sell' && (
          <SellScreen onSuccess={() => setCurrentTab('feed')} />
        )}
        {currentTab === 'chats' && (
          <ChatListScreen onSelectChat={handleSelectChat} />
        )}
        {currentTab === 'support' && (
          <SupportTicketsScreen onOpenStylist={() => setStylistVisible(true)} />
        )}
        {currentTab === 'profile' && (
          <ProfileScreen 
            onLogout={() => setCurrentTab('feed')}
            onEnterOperations={() => setCurrentTab('operations')}
          />
        )}
        {currentTab === 'details' && selectedProduct && (
          <ProductDetailsScreen 
            product={selectedProduct} 
            onBack={() => setCurrentTab('feed')} 
          />
        )}
        {currentTab === 'chat_detail' && selectedChatId && (
          <ChatDetailScreen 
            conversationId={selectedChatId}
            otherName={selectedChatName}
            productInfo={selectedChatProduct}
            onBack={() => setCurrentTab('chats')}
          />
        )}
        {currentTab === 'operations' && (
          <OperationsQueueScreen onBack={() => setCurrentTab('profile')} />
        )}
      </View>

      {/* Tab Bar - Luxury Floating Capsule Design */}
      {isMainTab && (
        <View style={styles.tabBarWrapper}>
          <View style={styles.tabBar}>
            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setCurrentTab('feed')}
            >
              <Text style={[styles.tabIcon, currentTab === 'feed' && styles.activeTabIcon]}>🧭</Text>
              <Text style={[styles.tabText, currentTab === 'feed' && styles.activeTabText]}>{t('tabDiscover')}</Text>
              {currentTab === 'feed' && <View style={styles.activeDot} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setCurrentTab('sell')}
            >
              <Text style={[styles.tabIcon, currentTab === 'sell' && styles.activeTabIcon]}>✦</Text>
              <Text style={[styles.tabText, currentTab === 'sell' && styles.activeTabText]}>{t('tabAppraise')}</Text>
              {currentTab === 'sell' && <View style={styles.activeDot} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setCurrentTab('chats')}
            >
              <Text style={[styles.tabIcon, currentTab === 'chats' && styles.activeTabIcon]}>💬</Text>
              <Text style={[styles.tabText, currentTab === 'chats' && styles.activeTabText]}>{t('tabMessages')}</Text>
              {currentTab === 'chats' && <View style={styles.activeDot} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setCurrentTab('support')}
            >
              <Text style={[styles.tabIcon, currentTab === 'support' && styles.activeTabIcon]}>♛</Text>
              <Text style={[styles.tabText, currentTab === 'support' && styles.activeTabText]}>{t('tabSupport')}</Text>
              {currentTab === 'support' && <View style={styles.activeDot} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setCurrentTab('profile')}
            >
              <Text style={[styles.tabIcon, currentTab === 'profile' && styles.activeTabIcon]}>👤</Text>
              <Text style={[styles.tabText, currentTab === 'profile' && styles.activeTabText]}>{t('tabProfile')}</Text>
              {currentTab === 'profile' && <View style={styles.activeDot} />}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* FAVORITES & PRICE ALERTS MODAL */}
      <Modal visible={favoritesVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.favContainer}>
          {/* Header */}
          <View style={styles.favHeader}>
            <TouchableOpacity onPress={() => setFavoritesVisible(false)} style={styles.favCloseBtn}>
              <Text style={styles.favCloseText}>✕ {t('close')}</Text>
            </TouchableOpacity>
            <Text style={styles.favTitle}>{t('wishlistTitle')}</Text>
            <View style={{ width: 60 }} />
          </View>

          {loadingFavorites ? (
            <View style={styles.favCentered}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            <FlatList 
              data={favoriteProducts}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.favList}
              ListEmptyComponent={
                <View style={styles.favEmpty}>
                  <Text style={styles.favEmptyHeart}>❤️</Text>
                  <Text style={styles.favEmptyText}>{t('wishlistEmpty')}</Text>
                  <Text style={styles.favEmptySub}>{t('wishlistEmptySub')}</Text>
                </View>
              }
              renderItem={({ item }) => {
                // Price drop mock indicator
                const isChanel = item.id === 'chanel-flap';
                const isRolex = item.id === 'rolex-sub';
                const hasPriceDrop = isChanel || isRolex;
                const dropAmount = isChanel ? '15.000 ₺' : '30.000 ₺';
                const originalPrice = isChanel ? 360000 : 715000;

                return (
                  <TouchableOpacity 
                    style={styles.favCard} 
                    onPress={() => {
                      setFavoritesVisible(false);
                      handleSelectProduct(item);
                    }}
                  >
                    <Image 
                      source={{ uri: item.public_images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' }} 
                      style={styles.favImg} 
                    />
                    <View style={styles.favInfo}>
                      <View>
                        <Text style={styles.favBrand}>{item.brand}</Text>
                        <Text style={styles.favName}>{item.model_name}</Text>
                      </View>
                      
                      <View style={{ marginTop: 8 }}>
                        {hasPriceDrop ? (
                          <View>
                            <Text style={styles.originalPriceText}>{originalPrice.toLocaleString('tr-TR')} ₺</Text>
                            <Text style={styles.favPrice}>{item.price?.toLocaleString('tr-TR')} ₺</Text>
                            <View style={styles.dropBadge}>
                              <Text style={styles.dropBadgeText}>⬇ {dropAmount} {t('priceDropAlert')} 🔔</Text>
                            </View>
                          </View>
                        ) : (
                          <Text style={styles.favPrice}>{item.price?.toLocaleString('tr-TR')} ₺</Text>
                        )}
                      </View>
                    </View>
                    <TouchableOpacity 
                      style={styles.favRemoveBtn} 
                      onPress={() => toggleLike(item.id)}
                    >
                      <Text style={styles.favRemoveText}>✕</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* AI STYLIST CHATBOT MODAL */}
      <Modal visible={stylistVisible} animationType="slide">
        <SafeAreaView style={styles.stylistModalContainer}>
          {/* Header */}
          <View style={styles.stylistModalHeader}>
            <TouchableOpacity onPress={() => setStylistVisible(false)}>
              <Text style={styles.backBtnText}>← {t('back')}</Text>
            </TouchableOpacity>
            <Text style={styles.stylistHeaderTitle}>Peony Muse</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Messages list */}
          <ScrollView contentContainerStyle={styles.chatbotScroll}>
            {chatbotMessages.map((msg) => {
              const isMe = msg.sender === 'user';
              return (
                <View key={msg.id} style={[styles.chatbotRow, isMe ? styles.chatbotMyRow : styles.chatbotAiRow]}>
                  <View style={[styles.chatbotBubble, isMe ? styles.chatbotMyBubble : styles.chatbotAiBubble]}>
                    <Text style={[styles.chatbotText, isMe ? styles.chatbotMyText : styles.chatbotAiText]}>
                      {msg.text}
                    </Text>
                  </View>

                  {/* Curated Products Scroll inside AI bubble */}
                  {msg.products && msg.products.length > 0 && (
                    <View style={styles.recsContainer}>
                      <Text style={styles.recsHeader}>{t('museCurationText')}</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recsScroll}>
                        {msg.products.map((prod: any) => (
                          <TouchableOpacity 
                            key={prod.id} 
                            style={styles.prodCard}
                            onPress={() => {
                              setStylistVisible(false);
                              handleSelectProduct({
                                id: prod.id,
                                brand: prod.brand,
                                model_name: prod.model_name,
                                price: prod.price,
                                public_images: [prod.image],
                                entrupy_status: 'approved'
                              });
                            }}
                          >
                            <Image source={{ uri: prod.image }} style={styles.prodImg} />
                            <View style={styles.prodInfo}>
                              <Text style={styles.prodBrand} numberOfLines={1}>{prod.brand}</Text>
                              <Text style={styles.prodName} numberOfLines={1}>{prod.model_name}</Text>
                              <Text style={styles.prodPrice}>{prod.price?.toLocaleString('tr-TR')} ₺</Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              );
            })}

            {/* TYPING INDICATOR BUBBLE */}
            {loadingStylist && (
              <View style={[styles.chatbotBubble, styles.chatbotAiBubble, { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 }]}>
                <Text style={{ fontSize: 13, color: COLORS.primary, fontWeight: 'bold', marginRight: 8 }}>Peony Muse</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, color: COLORS.primary, opacity: 0.9 }}>• </Text>
                  <Text style={{ fontSize: 18, color: COLORS.primary, opacity: 0.6 }}>• </Text>
                  <Text style={{ fontSize: 18, color: COLORS.primary, opacity: 0.3 }}>• </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input Bar */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
          >
            {/* Quick Helper Pills */}
            <View style={styles.quickPillsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickPillsScroll}>
                <TouchableOpacity 
                  style={styles.quickPill}
                  onPress={() => {
                    setChatbotInput('/help');
                  }}
                >
                  <Text style={styles.quickPillText}>💡 /help</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.quickPill}
                  onPress={() => {
                    setChatbotInput(locale === 'tr' ? 'Modum harika' : 'Feeling happy');
                  }}
                >
                  <Text style={styles.quickPillText}>😊 {locale === 'tr' ? 'Modum' : 'Mood'}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.quickPill}
                  onPress={() => {
                    setChatbotInput(locale === 'tr' ? 'Tekne turu' : 'Yacht tour');
                  }}
                >
                  <Text style={styles.quickPillText}>⛵ {locale === 'tr' ? 'Tekne' : 'Yacht'}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.quickPill}
                  onPress={() => {
                    setChatbotInput(locale === 'tr' ? 'Akşam yemeği' : 'Dinner party');
                  }}
                >
                  <Text style={styles.quickPillText}>🕯️ {locale === 'tr' ? 'Akşam' : 'Dinner'}</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            <View style={styles.chatbotInputBar}>
              <TextInput 
                style={styles.chatbotInput}
                placeholder={t('musePlaceholder')}
                placeholderTextColor={COLORS.textMuted}
                value={chatbotInput}
                onChangeText={setChatbotInput}
              />
              <TouchableOpacity style={styles.chatbotSendBtn} onPress={handleSendMessageToStylist}>
                <Text style={styles.chatbotSendBtnText}>{t('museSendBtn')}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: COLORS.text,
    letterSpacing: 7,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 7.5,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 2,
    fontWeight: '400',
  },
  favoritesTrigger: {
    position: 'relative',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartEmoji: {
    fontSize: 20,
  },
  badgeCount: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  favContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  favHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  favCloseBtn: {
    padding: 8,
  },
  favCloseText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  favTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    color: COLORS.text,
    letterSpacing: 1,
  },
  favCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favList: {
    padding: 15,
  },
  favEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  favEmptyHeart: {
    fontSize: 48,
    marginBottom: 15,
    opacity: 0.2,
  },
  favEmptyText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
  },
  favEmptySub: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 18,
  },
  favCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 15,
    position: 'relative',
  },
  favImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#E8E8E6',
  },
  favInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  favBrand: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  favName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 2,
  },
  favPrice: {
    fontSize: 13.5,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  originalPriceText: {
    fontSize: 10,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
    marginBottom: 1,
  },
  dropBadge: {
    backgroundColor: 'rgba(175, 145, 100, 0.1)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 4,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
  },
  dropBadgeText: {
    fontSize: 9.5,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  favRemoveBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favRemoveText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  tabBarWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 25 : 15,
    left: 15,
    right: 15,
    backgroundColor: 'transparent',
    zIndex: 100,
    elevation: 100, // Enforce elevation layer for Android key priority
  },
  tabBar: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: COLORS.darkBar,
    borderRadius: 32,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  tabIcon: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  activeTabIcon: {
    color: COLORS.primary,
  },
  tabText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  activeDot: {
    position: 'absolute',
    bottom: 6,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.primary,
  },
  profileTabItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  activeProfileTabItem: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#987B51',
  },
  profileTabIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  /* AI Stylist Chatbot Modal */
  stylistModalContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  stylistModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  backBtnText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  stylistHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  chatbotScroll: {
    padding: 15,
  },
  chatbotRow: {
    marginBottom: 20,
  },
  chatbotMyRow: {
    alignItems: 'flex-end',
  },
  chatbotAiRow: {
    alignItems: 'flex-start',
  },
  chatbotBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 14,
  },
  chatbotMyBubble: {
    backgroundColor: COLORS.darkBar,
    borderBottomRightRadius: 4,
  },
  chatbotAiBubble: {
    backgroundColor: COLORS.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chatbotText: {
    fontSize: 13.5,
    lineHeight: 19,
  },
  chatbotMyText: {
    color: '#FFFFFF',
  },
  chatbotAiText: {
    color: COLORS.text,
  },
  recsContainer: {
    marginTop: 12,
    width: '100%',
  },
  recsHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  recsScroll: {
    flexDirection: 'row',
  },
  prodCard: {
    width: 140,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  prodImg: {
    width: 140,
    height: 110,
    resizeMode: 'cover',
  },
  prodInfo: {
    padding: 8,
  },
  prodBrand: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  prodName: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: '500',
    marginTop: 2,
  },
  prodPrice: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  chatbotInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  chatbotInput: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chatbotSendBtn: {
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chatbotSendBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  quickPillsContainer: {
    backgroundColor: COLORS.card,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  quickPillsScroll: {
    paddingHorizontal: 12,
  },
  quickPill: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  quickPillText: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: '500',
  }
});
