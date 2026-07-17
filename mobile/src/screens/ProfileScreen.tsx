import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView,
  Platform,
  Alert,
  TextInput
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
  promoBg: '#F5ECE1', // Soft warm beige
  darkBar: '#12131A'
};

interface ProfileScreenProps {
  onLogout: () => void;
  onEnterOperations: () => void;
}

export default function ProfileScreen({ onLogout, onEnterOperations }: ProfileScreenProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileMode, setProfileMode] = useState<'buyer' | 'seller'>('buyer'); // Switch between Buyer and Seller profiles
  const [activeAdPackage, setActiveAdPackage] = useState<string | null>(null);
  
  // Seller stats
  const [balance, setBalance] = useState('145.000 ₺');
  const [pendingPayout, setPendingPayout] = useState('85.000 ₺');

  // Buyer stats
  const [totalSpent, setTotalSpent] = useState('92.500 ₺');
  const [activeOrdersCount, setActiveOrdersCount] = useState('1 Aktif Sipariş');
  
  // Account settings edit states
  const [iban, setIban] = useState('TR56 0006 2000 0001 2345 6789 01');
  const [isEditingIban, setIsEditingIban] = useState(false);

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
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* PROFILE HEADER & USER DETAILS */}
          <View style={styles.profileHeaderBox}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile?.full_name?.charAt(0).toUpperCase() || 'P'}
              </Text>
            </View>
            <View style={styles.profileInfoText}>
              <Text style={styles.name}>{profile?.full_name}</Text>
              <Text style={styles.role}>
                {profile?.role === 'admin' ? 'Yönetici' : profile?.role === 'operations' ? 'Operasyon Yetkilisi' : 'Peony Üyesi'}
              </Text>
              <Text style={styles.memberSince}>Üyelik Tarihi: 2026</Text>
            </View>
          </View>

          {/* BUYER / SELLER MODE TOGGLE TABS (ELEGANT SEGMENTED SWITCH) */}
          <View style={styles.modeTabs}>
            <TouchableOpacity 
              style={[styles.modeTab, profileMode === 'buyer' && styles.activeModeTab]}
              onPress={() => setProfileMode('buyer')}
            >
              <Text style={[styles.modeTabText, profileMode === 'buyer' && styles.activeModeTabText]}>
                🛍️ Alışverişlerim
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modeTab, profileMode === 'seller' && styles.activeModeTab]}
              onPress={() => setProfileMode('seller')}
            >
              <Text style={[styles.modeTabText, profileMode === 'seller' && styles.activeModeTabText]}>
                💰 Satışlarım
              </Text>
            </TouchableOpacity>
          </View>

          {/* DYNAMIC RENDERING: BUYER ACCOUNT VIEW */}
          {profileMode === 'buyer' && (
            <View>
              {/* Financial Summary */}
              <View style={styles.walletBox}>
                <View style={styles.walletCol}>
                  <Text style={styles.walletLabel}>TOPLAM HARCAMA</Text>
                  <Text style={styles.walletValue}>{totalSpent}</Text>
                </View>
                <View style={styles.walletDivider} />
                <View style={styles.walletCol}>
                  <Text style={styles.walletLabel}>AKTİF SİPARİŞ</Text>
                  <Text style={styles.walletValue}>{activeOrdersCount}</Text>
                </View>
              </View>

              {/* PEONY ELITE CLUB LOYALTY CARD */}
              <View style={styles.eliteCard}>
                <View style={styles.eliteHeader}>
                  <Text style={styles.eliteBrand}>PEONY ELITE</Text>
                  <Text style={styles.eliteTier}>★ GOLD MEMBER</Text>
                </View>
                <Text style={styles.elitePointLabel}>KULLANILABİLİR İNDİRİM PUANI</Text>
                <Text style={styles.elitePoints}>4.500 ₺</Text>
                <Text style={styles.eliteDesc}>
                  Bir sonraki alışverişinizde ödeme ekranında anında indirim olarak kullanabilirsiniz.
                </Text>
                
                {/* Progress bar to Black Member */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: '70%' }]} />
                  </View>
                  <View style={styles.progressLabelRow}>
                    <Text style={styles.progressLabel}>BLACK CARD için 7.500 ₺ kaldı</Text>
                    <Text style={styles.progressBenefit}>%5 Ekstra İndirim & Erken Erişim</Text>
                  </View>
                </View>
              </View>

              {/* Active Orders List Card */}
              <Text style={styles.sectionTitle}>Sipariş Takibi</Text>
              <View style={styles.trackerCard}>
                <View style={styles.trackerHeader}>
                  <Text style={styles.trackerProdName}>Rolex Submariner Date</Text>
                  <Text style={[styles.trackerStatus, { color: COLORS.accent }]}>Kargoya Verildi 🚚</Text>
                </View>
                <Text style={styles.orderDetailText}>
                  Kargo Firması: Yurtiçi Kargo • Takip No: YK837261902{'\n'}
                  Tahmini Teslimat: 2 Gün İçinde
                </Text>
                {/* Visual authenticity guarantee indicator */}
                <View style={styles.guaranteeTag}>
                  <Text style={styles.guaranteeText}>✓ Spektral Analiz Onaylı Dijital Pasaport Hazır</Text>
                </View>
              </View>

              {/* Favorite Brands & Price Alerts */}
              <Text style={styles.sectionTitle}>Takip Ettiğim Markalar & Alarmlar</Text>
              <View style={styles.brandsBox}>
                <View style={styles.brandRow}>
                  <Text style={styles.brandName}>Chanel</Text>
                  <Text style={styles.brandAlertCount}>3 Yeni Fiyat Alarmı 🔔</Text>
                </View>
                <View style={styles.brandRowDivider} />
                <View style={styles.brandRow}>
                  <Text style={styles.brandName}>Rolex</Text>
                  <Text style={styles.brandAlertCount}>Yeni İlan Bildirimi Açık</Text>
                </View>
              </View>
            </View>
          )}

          {/* DYNAMIC RENDERING: SELLER ACCOUNT VIEW */}
          {profileMode === 'seller' && (
            <View>
              {/* Financial Summary */}
              <View style={styles.walletBox}>
                <View style={styles.walletCol}>
                  <Text style={styles.walletLabel}>TOPLAM SATIŞ</Text>
                  <Text style={styles.walletValue}>{balance}</Text>
                </View>
                <View style={styles.walletDivider} />
                <View style={styles.walletCol}>
                  <Text style={styles.walletLabel}>BEKLEYEN HAKEDİŞ</Text>
                  <Text style={styles.walletValue}>{pendingPayout}</Text>
                </View>
              </View>

              {/* Consignment tracking */}
              <Text style={styles.sectionTitle}>Konsinye Ürün Takibi</Text>
              <View style={styles.trackerCard}>
                <View style={styles.trackerHeader}>
                  <Text style={styles.trackerProdName}>Chanel Classic Double Flap</Text>
                  <Text style={styles.trackerStatus}>SPA & Bakım Aşaması</Text>
                </View>

                {/* Stepper Steps */}
                <View style={styles.stepsContainer}>
                  <View style={styles.stepItem}>
                    <View style={[styles.stepCircle, styles.stepDone]}>
                      <Text style={styles.stepCheck}>✓</Text>
                    </View>
                    <Text style={styles.stepLabel}>Kabul</Text>
                  </View>

                  <View style={[styles.stepLine, styles.stepLineActive]} />

                  <View style={styles.stepItem}>
                    <View style={[styles.stepCircle, styles.stepDone]}>
                      <Text style={styles.stepCheck}>✓</Text>
                    </View>
                    <Text style={styles.stepLabel}>Ekspertiz</Text>
                  </View>

                  <View style={[styles.stepLine, styles.stepLineActive]} />

                  <View style={styles.stepItem}>
                    <View style={[styles.stepCircle, styles.stepActive]}>
                      <Text style={styles.stepNumber}>3</Text>
                    </View>
                    <Text style={[styles.stepLabel, styles.stepLabelActive]}>SPA</Text>
                  </View>

                  <View style={styles.stepLine} />

                  <View style={styles.stepItem}>
                    <View style={styles.stepCircle}>
                      <Text style={styles.stepNumber}>4</Text>
                    </View>
                    <Text style={styles.stepLabel}>Çekim</Text>
                  </View>

                  <View style={styles.stepLine} />

                  <View style={styles.stepItem}>
                    <View style={styles.stepCircle}>
                      <Text style={styles.stepNumber}>5</Text>
                    </View>
                    <Text style={styles.stepLabel}>Vitrin</Text>
                  </View>
                </View>
              </View>

              {/* Monetization / Advertising Portal */}
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
            </View>
          )}

          {/* ADMIN OPERATIONS LINK */}
          {(profile?.role === 'admin' || profile?.role === 'operations') && (
            <TouchableOpacity style={styles.adminBtn} onPress={onEnterOperations}>
              <Text style={styles.adminBtnText}>🛡 OPERASYON PANELİ GİRİŞİ</Text>
            </TouchableOpacity>
          )}

          {/* ACCOUNT & PREFERENCES LIST */}
          <Text style={styles.sectionTitle}>Hesap Bilgileri & Ayarlar</Text>
          
          <View style={styles.settingsGroup}>
            {/* IBAN SETTING */}
            <View style={styles.settingsRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingsLabel}>BANKA HESABI (IBAN)</Text>
                {isEditingIban ? (
                  <TextInput 
                    style={styles.ibanInput}
                    value={iban}
                    onChangeText={setIban}
                    onBlur={() => setIsEditingIban(false)}
                  />
                ) : (
                  <Text style={styles.settingsValue}>{iban}</Text>
                )}
              </View>
              <TouchableOpacity 
                style={styles.editBtn} 
                onPress={() => setIsEditingIban(!isEditingIban)}
              >
                <Text style={styles.editBtnText}>{isEditingIban ? 'Kaydet' : 'Düzenle'}</Text>
              </TouchableOpacity>
            </View>

            {/* REGISTERED ADDRESS */}
            <View style={styles.settingsRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingsLabel}>TESLİMAT ADRESİ</Text>
                <Text style={styles.settingsValue}>Nişantaşı, Valikonak Cd. No:45 D:12 Şişli / İstanbul</Text>
              </View>
              <TouchableOpacity style={styles.editBtn} onPress={() => Alert.alert('Bilgi', 'Adres düzenleme modülü yakında aktif olacaktır.')}>
                <Text style={styles.editBtnText}>Düzenle</Text>
              </TouchableOpacity>
            </View>

            {/* PREFERRED SIZE */}
            <View style={styles.settingsRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingsLabel}>BEDEN TERCİHLERİM</Text>
                <Text style={styles.settingsValue}>Kıyafet: M / Shoes: 38 / Aksesuar: Medium</Text>
              </View>
              <TouchableOpacity style={styles.editBtn} onPress={() => Alert.alert('Bilgi', 'Beden tercihi modülü yakında aktif olacaktır.')}>
                <Text style={styles.editBtnText}>Düzenle</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
            <Text style={styles.logoutBtnText}>Oturumu Kapat</Text>
          </TouchableOpacity>

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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfoText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  role: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 2,
  },
  memberSince: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  /* Tab Segment Switch */
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.border,
    borderRadius: 10,
    padding: 3,
    marginBottom: 20,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeModeTab: {
    backgroundColor: COLORS.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  modeTabText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  activeModeTabText: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  walletBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  walletCol: {
    alignItems: 'center',
    flex: 1,
  },
  walletLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  walletValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  walletDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
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
    marginBottom: 25,
    marginTop: 5,
  },
  adminBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    color: COLORS.text,
    letterSpacing: 1,
    fontWeight: 'normal',
    marginBottom: 12,
  },
  sectionDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 18,
    marginBottom: 15,
  },
  eliteCard: {
    backgroundColor: '#12131A', // Sleek black card for VIP member status
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#AF9164/30',
  },
  eliteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  eliteBrand: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  eliteTier: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  elitePointLabel: {
    fontSize: 8.5,
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 1.2,
  },
  elitePoints: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 2,
    marginBottom: 6,
  },
  eliteDesc: {
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 15,
    marginBottom: 15,
  },
  progressContainer: {
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 15,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  progressBenefit: {
    fontSize: 9,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  trackerCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 25,
  },
  trackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingBottom: 12,
  },
  trackerProdName: {
    fontSize: 13.5,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  trackerStatus: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  orderDetailText: {
    fontSize: 11.5,
    color: COLORS.textMuted,
    lineHeight: 18,
    marginBottom: 12,
  },
  guaranteeTag: {
    backgroundColor: '#E9EFEA',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  guaranteeText: {
    fontSize: 10,
    color: '#2E4C36',
    fontWeight: '600',
  },
  brandsBox: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
    marginBottom: 25,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  brandName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  brandAlertCount: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  brandRowDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    width: 45,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepDone: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stepActive: {
    backgroundColor: COLORS.text,
    borderColor: COLORS.text,
  },
  stepCheck: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  stepLabel: {
    fontSize: 9,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.border,
    marginBottom: 16,
  },
  stepLineActive: {
    backgroundColor: COLORS.primary,
  },
  settingsGroup: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
    marginBottom: 25,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  settingsLabel: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  settingsValue: {
    fontSize: 12.5,
    color: COLORS.text,
    fontWeight: '500',
  },
  ibanInput: {
    fontSize: 12.5,
    color: COLORS.text,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.bg,
  },
  editBtn: {
    backgroundColor: '#F3ECE0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
  editBtnText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: 'bold',
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
  },
  logoutBtn: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.danger,
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  logoutBtnText: {
    color: COLORS.danger,
    fontWeight: 'bold',
    fontSize: 14,
  }
});
