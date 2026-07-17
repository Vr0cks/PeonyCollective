import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import { supabase } from './src/lib/supabase';

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

const { width } = Dimensions.get('window');

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
  name: string;
  brand: string;
  price: number;
  image_urls?: string[];
  entrupy_status: string;
  description?: string;
  material?: string;
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
          <Text style={styles.headerTitle}>PEONY</Text>
          <Text style={styles.headerSubtitle}>
            {currentTab === 'feed' && 'L Ü K S  K O L E K S İ Y O N'}
            {currentTab === 'sell' && 'S A T I Ş  T A L E B İ'}
            {currentTab === 'chats' && 'M E S A J L A R I M'}
            {currentTab === 'support' && 'D E S T E K  M E R K E Z İ'}
            {currentTab === 'profile' && 'H E S A B I M'}
          </Text>
        </View>
      )}

      {/* Screen Router */}
      <View style={styles.mainContainer}>
        {currentTab === 'feed' && (
          <HomeScreen onSelectProduct={handleSelectProduct} />
        )}
        {currentTab === 'sell' && (
          <SellScreen onSuccess={() => setCurrentTab('feed')} />
        )}
        {currentTab === 'chats' && (
          <ChatListScreen onSelectChat={handleSelectChat} />
        )}
        {currentTab === 'support' && (
          <SupportTicketsScreen />
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
              <Text style={[styles.tabText, currentTab === 'feed' && styles.activeTabText]}>KEŞFET</Text>
              {currentTab === 'feed' && <View style={styles.activeDot} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setCurrentTab('sell')}
            >
              <Text style={[styles.tabIcon, currentTab === 'sell' && styles.activeTabIcon]}>⊞</Text>
              <Text style={[styles.tabText, currentTab === 'sell' && styles.activeTabText]}>SAT</Text>
              {currentTab === 'sell' && <View style={styles.activeDot} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setCurrentTab('chats')}
            >
              <Text style={[styles.tabIcon, currentTab === 'chats' && styles.activeTabIcon]}>✉</Text>
              <Text style={[styles.tabText, currentTab === 'chats' && styles.activeTabText]}>MESAJLAR</Text>
              {currentTab === 'chats' && <View style={styles.activeDot} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setCurrentTab('support')}
            >
              <Text style={[styles.tabIcon, currentTab === 'support' && styles.activeTabIcon]}>?</Text>
              <Text style={[styles.tabText, currentTab === 'support' && styles.activeTabText]}>DESTEK</Text>
              {currentTab === 'support' && <View style={styles.activeDot} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.tabItem}
              onPress={() => setCurrentTab('profile')}
            >
              <Text style={[styles.tabIcon, currentTab === 'profile' && styles.activeTabIcon]}>👤</Text>
              <Text style={[styles.tabText, currentTab === 'profile' && styles.activeTabText]}>PROFİL</Text>
              {currentTab === 'profile' && <View style={styles.activeDot} />}
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'normal',
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    color: COLORS.text,
    letterSpacing: 6,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 9,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 2,
  },
  tabBarWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 25 : 15,
    left: 15,
    right: 15,
    backgroundColor: 'transparent',
    zIndex: 100,
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
  }
});
