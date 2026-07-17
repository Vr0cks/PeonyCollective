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

// Luxury Design Tokens
const COLORS = {
  bg: '#0A0A0E', // Ultra deep black/charcoal
  card: '#13141A', // Rich card slate
  text: '#F5F5F7', // Off-white premium text
  textMuted: '#8E909B', // Slate gray
  primary: '#AF9164', // Classic champagne gold
  primaryLight: '#D4AF37', // Bright gold accent
  border: '#1F212A', // Thin luxury dividers
  accent: '#10B981', // Emerald green
  danger: '#EF4444'
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
  
  // Navigation states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedChatName, setSelectedChatName] = useState<string>('');
  const [selectedChatProduct, setSelectedChatProduct] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header (Only visible on main tabs) */}
      {isMainTab && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>P E O N Y</Text>
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

      {/* Tab Bar (Only visible on main tabs) */}
      {isMainTab && (
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tabItem, currentTab === 'feed' && styles.activeTabItem]}
            onPress={() => setCurrentTab('feed')}
          >
            <Text style={[styles.tabIcon, currentTab === 'feed' && styles.activeTabIcon]}>✦</Text>
            <Text style={[styles.tabText, currentTab === 'feed' && styles.activeTabText]}>VİTRİN</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabItem, currentTab === 'sell' && styles.activeTabItem]}
            onPress={() => setCurrentTab('sell')}
          >
            <Text style={[styles.tabIcon, currentTab === 'sell' && styles.activeTabIcon]}>⊕</Text>
            <Text style={[styles.tabText, currentTab === 'sell' && styles.activeTabText]}>SAT</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabItem, currentTab === 'chats' && styles.activeTabItem]}
            onPress={() => setCurrentTab('chats')}
          >
            <Text style={[styles.tabIcon, currentTab === 'chats' && styles.activeTabIcon]}>✉</Text>
            <Text style={[styles.tabText, currentTab === 'chats' && styles.activeTabText]}>MESAJLAR</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabItem, currentTab === 'support' && styles.activeTabItem]}
            onPress={() => setCurrentTab('support')}
          >
            <Text style={[styles.tabIcon, currentTab === 'support' && styles.activeTabIcon]}>?</Text>
            <Text style={[styles.tabText, currentTab === 'support' && styles.activeTabText]}>DESTEK</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabItem, currentTab === 'profile' && styles.activeTabItem]}
            onPress={() => setCurrentTab('profile')}
          >
            <Text style={[styles.tabIcon, currentTab === 'profile' && styles.activeTabIcon]}>👤</Text>
            <Text style={[styles.tabText, currentTab === 'profile' && styles.activeTabText]}>PROFİL</Text>
          </TouchableOpacity>
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
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: COLORS.primary,
    letterSpacing: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 9,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 6,
    letterSpacing: 3,
  },
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'android' ? 80 : 65, // Added extra height for Android soft keys
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? 22 : 12, // Solved Android soft keys overlap
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  activeTabItem: {
    borderTopWidth: 2,
    borderColor: COLORS.primary,
    marginTop: -2,
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
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  activeTabText: {
    color: COLORS.primary,
  }
});

