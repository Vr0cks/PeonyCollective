import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { supabase } from '../lib/supabase';

const COLORS = {
  bg: '#FBFBFA', // Luxury off-white
  card: '#FFFFFF', // Clean white
  text: '#1A1A1A', // High-contrast charcoal text
  textMuted: '#7E8085', // Slate gray
  primary: '#AF9164', // Classic champagne gold
  border: '#E8E8E6', // Thin dividers
  danger: '#EF4444',
  accent: '#10B981',
  promoBg: '#F5ECE1' // Soft warm beige
};

interface ProfileScreenProps {
  onLogout: () => void;
  onEnterOperations: () => void;
}

export default function ProfileScreen({ onLogout, onEnterOperations }: ProfileScreenProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeAdPackage, setActiveAdPackage] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (e: any) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    onLogout();
  }

  function handleBuyAdPackage(packageName: string, price: string) {
    Alert.alert(
      'Reklam Paketi Satın Al',
      `${packageName} (${price}) aboneliğini başlatmak istiyor musunuz? Ürünleriniz hemen öncelikli olarak listelenecektir.`,
      [
        { text: 'Vazgeç', style: 'cancel' },
        { 
          text: 'Onayla', 
          onPress: () => {
            setActiveAdPackage(packageName);
            Alert.alert('Başarılı', `${packageName} aktif edildi. Satışlarınızda %50\'ye varan artış analizleri yakında profilinizde görünecektir!`);
          } 
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Profile Header Box */}
          <View style={styles.profileBox}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile?.full_name?.charAt(0).toUpperCase() || 'P'}
              </Text>
            </View>
            <Text style={styles.name}>{profile?.full_name}</Text>
            <Text style={styles.role}>
              {profile?.role === 'admin' ? 'Yönetici' : profile?.role === 'operations' ? 'Operasyon Yetkilisi' : 'Üye'}
            </Text>

            {(profile?.role === 'admin' || profile?.role === 'operations') && (
              <TouchableOpacity style={styles.adminBtn} onPress={onEnterOperations}>
                <Text style={styles.adminBtnText}>🛡 OPERASYON PANELİ GİRİŞİ</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
              <Text style={styles.logoutBtnText}>Çıkış Yap</Text>
            </TouchableOpacity>
          </View>

          {/* Monetization / Advertising Portal Section */}
          <Text style={styles.sectionTitle}>Satışlarınızı Artırın</Text>
          <Text style={styles.sectionDesc}>
            Peony Muse ve Vitrin reklam paketleriyle ürünlerinize %50 daha fazla gösterim kazandırın.
          </Text>

          {/* Package 1: Curator Boost */}
          <View style={styles.adCard}>
            <View style={styles.adHeader}>
              <Text style={styles.adTitle}>Küratör Öne Çıkarması (Muse Boost)</Text>
              <Text style={styles.adPrice}>3.000 ₺ / Ay</Text>
            </View>
            <Text style={styles.adDesc}>
              Ürünleriniz lüks stil danışmanımız **Peony Muse** sohbetlerinde öncelikli tavsiye olarak eşleştirilir ve vitrinde %50 daha fazla görünürlük kazanır.
            </Text>
            <TouchableOpacity 
              style={[styles.adBtn, activeAdPackage === 'Küratör Öne Çıkarması' && styles.activeAdBtn]}
              onPress={() => handleBuyAdPackage('Küratör Öne Çıkarması', '3.000 ₺ / Ay')}
            >
              <Text style={styles.adBtnText}>
                {activeAdPackage === 'Küratör Öne Çıkarması' ? '✓ AKTİF ABONELİK' : 'ABONELİĞİ BAŞLAT'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Package 2: VIP Showcase */}
          <View style={styles.adCard}>
            <View style={styles.adHeader}>
              <Text style={styles.adTitle}>VIP Vitrin Vitrini (Showcase Pro)</Text>
              <Text style={styles.adPrice}>5.000 ₺ / Ay</Text>
            </View>
            <Text style={styles.adDesc}>
              Ürünleriniz ana sayfadaki üst kategori slider\'larında, Weather Concierge hava durumu listelemelerinde ve aramalarda en üst sırada sponsorlu ibaresi olmadan organik olarak sergilenir.
            </Text>
            <TouchableOpacity 
              style={[styles.adBtn, activeAdPackage === 'VIP Vitrin Vitrini' && styles.activeAdBtn]}
              onPress={() => handleBuyAdPackage('VIP Vitrin Vitrini', '5.000 ₺ / Ay')}
            >
              <Text style={styles.adBtnText}>
                {activeAdPackage === 'VIP Vitrin Vitrini' ? '✓ AKTİF ABONELİK' : 'ABONELİĞİ BAŞLAT'}
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 110, // Safe padding for floating tab bar
  },
  profileBox: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 25,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  role: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 25,
  },
  adminBtn: {
    backgroundColor: 'rgba(175, 145, 100, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  adminBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  logoutBtn: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.danger,
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtnText: {
    color: COLORS.danger,
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    color: COLORS.text,
    letterSpacing: 1,
    fontWeight: 'normal',
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 18,
    marginBottom: 20,
  },
  adCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  adHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  adTitle: {
    fontSize: 13.5,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    paddingRight: 10,
  },
  adPrice: {
    fontSize: 13.5,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  adDesc: {
    fontSize: 11.5,
    color: COLORS.textMuted,
    lineHeight: 17,
    marginBottom: 15,
  },
  adBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeAdBtn: {
    backgroundColor: COLORS.accent,
  },
  adBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12.5,
    letterSpacing: 1,
  }
});
