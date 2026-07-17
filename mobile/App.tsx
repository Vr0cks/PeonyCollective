import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  TouchableOpacity,
  Platform
} from 'react-native';
import { supabase } from './src/lib/supabase';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SellScreen from './src/screens/SellScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OperationsQueueScreen from './src/screens/OperationsQueueScreen';

const COLORS = {
  bg: '#0F1016',
  card: '#181A24',
  text: '#FFFFFF',
  textMuted: '#8E909B',
  primary: '#D4AF37', // Gold
  border: '#2A2D3D'
};

type Tab = 'feed' | 'sell' | 'profile' | 'details' | 'operations';

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  // --- RENDERING SCREENS ---

  if (!session) {
    return <LoginScreen onSuccess={() => setCurrentTab('feed')} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header (Only visible on main tabs) */}
      {(currentTab === 'feed' || currentTab === 'sell' || currentTab === 'profile') && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PEONY</Text>
          <Text style={styles.headerSubtitle}>
            {currentTab === 'feed' && 'Lüks Koleksiyon'}
            {currentTab === 'sell' && 'Çanta Satış Talebi'}
            {currentTab === 'profile' && 'Hesabım'}
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
        {currentTab === 'operations' && (
          <OperationsQueueScreen onBack={() => setCurrentTab('profile')} />
        )}
      </View>

      {/* Tab Bar (Only visible on main tabs) */}
      {(currentTab === 'feed' || currentTab === 'sell' || currentTab === 'profile') && (
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tabItem, currentTab === 'feed' && styles.activeTabItem]}
            onPress={() => setCurrentTab('feed')}
          >
            <Text style={[styles.tabText, currentTab === 'feed' && styles.activeTabText]}>VİTRİN</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabItem, currentTab === 'sell' && styles.activeTabItem]}
            onPress={() => setCurrentTab('sell')}
          >
            <Text style={[styles.tabText, currentTab === 'sell' && styles.activeTabText]}>ÇANTA SAT</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabItem, currentTab === 'profile' && styles.activeTabItem]}
            onPress={() => setCurrentTab('profile')}
          >
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 2,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'space-around',
    alignItems: 'center',
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
  },
  tabText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  activeTabText: {
    color: COLORS.primary,
  }
});
