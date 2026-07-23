/**
 * @file ProfileScreen.tsx
 * @description Peony Collective Mobil Uygulaması Profil ve Hesap Yönetimi Ekranı.
 * 
 * Bu ekran kullanıcı profil bilgilerini, sipariş geçmişini, satılan ürün durumlarını ve
 * kullanıcı ayarlarını yönetir.
 */

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
  TextInput,
  Image
} from 'react-native';
import { supabase } from '../lib/supabase';
import { t } from '../lib/i18n';

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dynamic Theme Colors Mapper
  const THEME = {
    bg: isDarkMode ? '#121214' : '#FBFBFA',
    card: isDarkMode ? '#1A1A1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textMuted: isDarkMode ? '#A1A1A5' : '#7E8085',
    border: isDarkMode ? '#2C2C30' : '#E8E8E6',
    primary: '#AF9164',
    danger: '#EF4444',
    accent: '#10B981',
    promoBg: isDarkMode ? '#2A2621' : '#F5ECE1'
  };

  const isEn = t('wishlistEmpty') === 'Your wishlist is empty.';
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileMode, setProfileMode] = useState<'buyer' | 'seller' | 'vault'>('buyer'); // Switch between Buyer, Seller, and Vault profiles
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

  // Contact and corporate registration states
  const [preferredName, setPreferredName] = useState('Ahmet Canlı');
  const [phone, setPhone] = useState('+90 532 123 45 67');
  const [emailAddr, setEmailAddr] = useState('ahmetcanli1943@gmail.com');
  const [tckn, setTckn] = useState('12345678901');
  const [vkn, setVkn] = useState('9876543210');
  const [companyName, setCompanyName] = useState('Canlı Lüks Giyim Ltd.');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  const [myProducts, setMyProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProfile();
    fetchUserProducts();
  }, []);

  async function fetchUserProducts() {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });
      if (data) setMyProducts(data);
    } catch (e) {
      console.log('Error fetching user products:', e);
    }
  }

  async function handleReducePrice(productId: string, currentPrice: number) {
    const suggestedNewPrice = Math.round(currentPrice * 0.90);
    Alert.alert(
      isEn ? 'Peony AI Smart Discount' : 'Peony AI Akıllı Fiyat İndirimi',
      isEn 
        ? `Reduce price from ₺${currentPrice.toLocaleString('tr-TR')} to ₺${suggestedNewPrice.toLocaleString('tr-TR')} to sell faster on feed?`
        : `7 gündür satılamayan ürününüz için fiyatı ₺${currentPrice.toLocaleString('tr-TR')} -> ₺${suggestedNewPrice.toLocaleString('tr-TR')} seviyesine düşürüp vitrinde üst sıraya çıkarmak istiyor musunuz?`,
      [
        { text: isEn ? 'Cancel' : 'İptal', style: 'cancel' },
        {
          text: isEn ? 'Apply Discount' : 'İndirimi Uygula',
          onPress: async () => {
            const { error } = await supabase
              .from('products')
              .update({ price: suggestedNewPrice, rank: 100 })
              .eq('id', productId);
            if (!error) {
              Alert.alert(isEn ? 'Success' : 'Başarılı', isEn ? 'Price updated and boosted to top of feed!' : 'Fiyat güncellendi ve ilan vitrinde üst sıraya yükseltildi!');
              fetchUserProducts();
            }
          }
        }
      ]
    );
  }

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
      if (data) {
        setPreferredName(data.preferred_name || data.full_name || 'Ahmet Canlı');
        setEmailAddr(user.email || data.email || 'ahmetcanli1943@gmail.com');
        setPhone(data.phone || '+90 532 123 45 67');
        setTckn(data.tckn || '12345678901');
        setVkn(data.vkn || '9876543210');
        setCompanyName(data.company_name || 'Canlı Lüks Giyim Ltd.');
        if (data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      }
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
      isEn ? 'Buy Promo Package' : 'Reklam Paketi Satın Al',
      isEn ? `Do you want to start ${packageName} (${price}) subscription? Your products will be highlighted instantly.` : `${packageName} (${price}) aboneliğini başlatmak istiyor musunuz? Ürünleriniz hemen öncelikli olarak listelenecektir.`,
      [
        { text: isEn ? 'Cancel' : 'Vazgeç', style: 'cancel' },
        { 
          text: isEn ? 'Confirm' : 'Onayla', 
          onPress: () => {
            setActiveAdPackage(packageName);
            Alert.alert(isEn ? 'Success' : 'Başarılı', isEn ? `${packageName} activated successfully!` : `${packageName} aktif edildi.`);
          } 
        }
      ]
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: THEME.bg }]}>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={THEME.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Theme Quick Switcher Row */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 15, paddingTop: 10 }}>
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.card, borderWidth: 1, borderColor: THEME.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 }}
              onPress={() => setIsDarkMode(!isDarkMode)}
            >
              <Text style={{ fontSize: 13, marginRight: 6 }}>{isDarkMode ? '☀️' : '🌙'}</Text>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: THEME.text }}>
                {isDarkMode ? (isEn ? 'LIGHT MODE' : 'AÇIK MOD') : (isEn ? 'DARK MODE' : 'KOYU MOD')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* PROFILE HEADER & USER DETAILS */}
          <View style={[styles.profileHeaderBox, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
            <Image source={{ uri: avatarUrl }} style={[styles.avatarImage, { borderColor: THEME.primary }]} />
            <View style={styles.profileInfoText}>
              <Text style={[styles.name, { color: THEME.text }]}>{preferredName || profile?.full_name}</Text>
              <Text style={styles.role}>
                {profile?.role === 'admin' ? 'Admin' : profile?.role === 'operations' ? (isEn ? 'Operations Officer' : 'Operasyon Yetkilisi') : (t('defaultMemberName') || 'Peony Member')}
              </Text>
              <Text style={[styles.memberSince, { color: THEME.textMuted }]}>{isEn ? 'Membership: 2026' : 'Üyelik Tarihi: 2026'}</Text>
            </View>
          </View>

          {/* PERSONAL & CORPORATE DETAILS (TCKN, VKN, PREFERRED NAME, PHONE, EMAIL, AVATAR EDIT) */}
          <View style={[styles.detailsCard, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
            <View style={[styles.detailsHeader, { borderColor: THEME.border }]}>
              <Text style={styles.detailsTitle}>
                {isEditingInfo 
                  ? (isEn ? '✦ EDIT PROFILE INFO' : '✦ PROFİL BİLGİLERİNİ DÜZENLE') 
                  : (isEn ? '✦ ACCOUNT & CONTACT INFO' : '✦ HESAP VE İLETİŞİM BİLGİLERİ')}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {isEditingInfo && (
                  <TouchableOpacity 
                    style={[styles.editInfoBtn, { marginRight: 8, borderColor: THEME.danger }]} 
                    onPress={() => setIsEditingInfo(false)}
                  >
                    <Text style={[styles.editInfoBtnText, { color: THEME.danger }]}>İPTAL</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={[styles.editInfoBtn, { backgroundColor: isEditingInfo ? THEME.primary : THEME.card, borderColor: THEME.border }]} 
                  onPress={() => {
                    if (isEditingInfo) {
                      setIsEditingInfo(false);
                      Alert.alert('Bilgi', 'Hesap bilgileriniz başarıyla kaydedildi!');
                    } else {
                      setIsEditingInfo(true);
                    }
                  }}
                >
                  <Text style={[styles.editInfoBtnText, { color: isEditingInfo ? '#FFFFFF' : THEME.text }]}>
                    {isEditingInfo ? 'KAYDET' : 'DÜZENLE'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {isEditingInfo ? (
              /* Editable Input Fields Grouped */
              <View style={styles.editFieldsGroup}>
                <View style={[styles.editSectionTitleRow, { borderColor: THEME.border }]}>
                  <Text style={styles.editSectionTitle}>👤 KİŞİSEL BİLGİLER</Text>
                </View>
                
                <View style={styles.infoRowField}>
                  <Text style={styles.fieldLabel}>TERCİH EDİLEN İSİM</Text>
                  <TextInput 
                    style={[styles.fieldInput, { backgroundColor: THEME.bg, color: THEME.text, borderColor: THEME.border }]} 
                    value={preferredName} 
                    onChangeText={setPreferredName} 
                    placeholder="Adınız Soyadınız"
                    placeholderTextColor="rgba(26,26,26,0.3)"
                  />
                </View>

                <View style={styles.infoRowField}>
                  <Text style={styles.fieldLabel}>E-POSTA ADRESİ</Text>
                  <TextInput 
                    style={[styles.fieldInput, { backgroundColor: THEME.bg, color: THEME.text, borderColor: THEME.border }]} 
                    value={emailAddr} 
                    onChangeText={setEmailAddr} 
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="email@peony.com"
                    placeholderTextColor="rgba(26,26,26,0.3)"
                  />
                </View>

                <View style={styles.infoRowField}>
                  <Text style={styles.fieldLabel}>İLETİŞİM TELEFONU</Text>
                  <TextInput 
                    style={[styles.fieldInput, { backgroundColor: THEME.bg, color: THEME.text, borderColor: THEME.border }]} 
                    value={phone} 
                    onChangeText={setPhone} 
                    keyboardType="phone-pad"
                    placeholder="+90 5xx xxx xx xx"
                    placeholderTextColor="rgba(26,26,26,0.3)"
                  />
                </View>

                <View style={[styles.editSectionTitleRow, { borderColor: THEME.border }]}>
                  <Text style={styles.editSectionTitle}>🏢 FATURA & VERGİ BİLGİLERİ</Text>
                </View>

                <View style={styles.infoRowField}>
                  <Text style={styles.fieldLabel}>T.C. KİMLİK NO (TCKN)</Text>
                  <TextInput 
                    style={[styles.fieldInput, { backgroundColor: THEME.bg, color: THEME.text, borderColor: THEME.border }]} 
                    value={tckn} 
                    onChangeText={setTckn} 
                    maxLength={11}
                    keyboardType="numeric"
                    placeholder="11 Haneli TCKN"
                    placeholderTextColor="rgba(26,26,26,0.3)"
                  />
                </View>

                <View style={styles.infoRowField}>
                  <Text style={styles.fieldLabel}>VERGİ KİMLİK NO (VKN)</Text>
                  <TextInput 
                    style={[styles.fieldInput, { backgroundColor: THEME.bg, color: THEME.text, borderColor: THEME.border }]} 
                    value={vkn} 
                    onChangeText={setVkn} 
                    maxLength={10}
                    keyboardType="numeric"
                    placeholder="10 Haneli VKN"
                    placeholderTextColor="rgba(26,26,26,0.3)"
                  />
                </View>

                <View style={styles.infoRowField}>
                  <Text style={styles.fieldLabel}>FİRMA ÜNVANI</Text>
                  <TextInput 
                    style={[styles.fieldInput, { backgroundColor: THEME.bg, color: THEME.text, borderColor: THEME.border }]} 
                    value={companyName} 
                    onChangeText={setCompanyName} 
                    placeholder="Resmi Şirket Adı"
                    placeholderTextColor="rgba(26,26,26,0.3)"
                  />
                </View>

                <View style={styles.infoRowField}>
                  <Text style={styles.fieldLabel}>PROFİL FOTOĞRAFI URL</Text>
                  <TextInput 
                    style={[styles.fieldInput, { backgroundColor: THEME.bg, color: THEME.text, borderColor: THEME.border }]} 
                    value={avatarUrl} 
                    onChangeText={setAvatarUrl} 
                    placeholder="Görsel URL Adresi"
                    placeholderTextColor="rgba(26,26,26,0.3)"
                  />
                </View>
              </View>
            ) : (
              /* Beautiful Luxury Display Info Panel */
              <View style={styles.displayInfoPanel}>
                <View style={styles.displaySection}>
                  <Text style={styles.displaySectionHeader}>{isEn ? '👤 PERSONAL CONTACT' : '👤 KİŞİSEL İLETİŞİM'}</Text>
                  <View style={styles.displayGrid}>
                    <View style={styles.displayCol}>
                      <Text style={styles.displayLabel}>{isEn ? 'PREFERRED NAME' : 'TERCİH EDİLEN İSİM'}</Text>
                      <Text style={[styles.displayVal, { color: THEME.text }]}>{preferredName || (isEn ? 'Not Set' : 'Girilmedi')}</Text>
                    </View>
                    <View style={styles.displayCol}>
                      <Text style={styles.displayLabel}>{isEn ? 'PHONE NUMBER' : 'TELEFON NUMARASI'}</Text>
                      <Text style={[styles.displayVal, { color: THEME.text }]}>{phone || (isEn ? 'Not Set' : 'Girilmedi')}</Text>
                    </View>
                  </View>
                  <View style={[styles.displayCol, { marginTop: 12 }]}>
                    <Text style={styles.displayLabel}>{isEn ? 'EMAIL ADDRESS' : 'E-POSTA ADRESİ'}</Text>
                    <Text style={[styles.displayVal, { color: THEME.text }]}>{emailAddr || (isEn ? 'Not Set' : 'Girilmedi')}</Text>
                  </View>
                </View>

                {/* Show Corporate Tax Info fields only if they exist */}
                {(tckn || vkn || companyName) && (
                  <View style={[styles.displaySection, { marginTop: 18, borderTopWidth: 1, borderColor: THEME.border, paddingTop: 14 }]}>
                    <Text style={styles.displaySectionHeader}>{isEn ? '🏢 BILLING DETAILS' : '🏢 FATURANDIRMA BİLGİLERİ'}</Text>
                    <View style={styles.displayGrid}>
                      {tckn && (
                        <View style={styles.displayCol}>
                          <Text style={styles.displayLabel}>TCKN</Text>
                          <Text style={[styles.displayVal, { color: THEME.text }]}>{tckn}</Text>
                        </View>
                      )}
                      {vkn && (
                        <View style={styles.displayCol}>
                          <Text style={styles.displayLabel}>VKN</Text>
                          <Text style={[styles.displayVal, { color: THEME.text }]}>{vkn}</Text>
                        </View>
                      )}
                    </View>
                    {companyName && (
                      <View style={[styles.displayCol, { marginTop: 12 }]}>
                        <Text style={styles.displayLabel}>{isEn ? 'COMPANY NAME' : 'FİRMA RESMİ ÜNVANI'}</Text>
                        <Text style={[styles.displayVal, { color: THEME.text }]}>{companyName}</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>

          {/* DYNAMIC MODE SELECTOR TABS (Buyer, Seller, Vault) */}
          <View style={[styles.modeTabs, { backgroundColor: THEME.border }]}>
            <TouchableOpacity 
              style={[styles.modeTab, profileMode === 'buyer' && [styles.activeModeTab, { backgroundColor: THEME.card }]]}
              onPress={() => setProfileMode('buyer')}
            >
              <Text style={[styles.modeTabText, profileMode === 'buyer' && [styles.activeModeTabText, { color: THEME.text }]]}>
                {isEn ? 'BUYER PROFILE' : 'ALICI HESABI'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modeTab, profileMode === 'seller' && [styles.activeModeTab, { backgroundColor: THEME.card }]]}
              onPress={() => setProfileMode('seller')}
            >
              <Text style={[styles.modeTabText, profileMode === 'seller' && [styles.activeModeTabText, { color: THEME.text }]]}>
                {isEn ? 'SELLER CENTER' : 'SATICI HESABI'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modeTab, profileMode === 'vault' && [styles.activeModeTab, { backgroundColor: THEME.card }]]}
              onPress={() => setProfileMode('vault')}
            >
              <Text style={[styles.modeTabText, profileMode === 'vault' && [styles.activeModeTabText, { color: THEME.text }]]}>
                {isEn ? 'PORTFOLIO' : 'DEĞER GRAFİĞİ'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* DYNAMIC RENDERING: BUYER VIEW */}
          {profileMode === 'buyer' && (
            <View style={{ paddingHorizontal: 15 }}>
              
              {/* VIP Loyalty Card */}
              <View style={styles.eliteCard}>
                <View style={styles.eliteHeader}>
                  <Text style={styles.eliteBrand}>PEONY VIP</Text>
                  <Text style={styles.eliteTier}>BLACK MEMBER</Text>
                </View>
                
                <Text style={styles.elitePointLabel}>{isEn ? 'ACCUMULATED CREDIT POINTS' : 'BİRİKMİŞ PEONY PUAN'}</Text>
                <Text style={styles.elitePoints}>24.500</Text>
                
                <Text style={styles.eliteDesc}>
                  {isEn 
                    ? 'Use these points as an instant discount on your next checkout.' 
                    : 'Bir sonraki alışverişinizde ödeme ekranında anında indirim olarak kullanabilirsiniz.'}
                </Text>
                
                {/* Progress bar to Black Member */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: '70%', backgroundColor: THEME.primary }]} />
                  </View>
                  <View style={styles.progressLabelRow}>
                    <Text style={styles.progressLabel}>{isEn ? '7,500 ₺ remaining for BLACK CARD' : 'BLACK CARD için 7.500 ₺ kaldı'}</Text>
                    <Text style={styles.progressBenefit}>{isEn ? '%5 Extra Discount & Early Access' : '%5 Ekstra İndirim & Erken Erişim'}</Text>
                  </View>
                </View>
              </View>

              {/* Active Orders List Card */}
              <Text style={[styles.sectionTitle, { color: THEME.text }]}>{isEn ? 'Order Tracking' : 'Sipariş Takibi'}</Text>
              <View style={[styles.trackerCard, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
                <View style={[styles.trackerHeader, { borderColor: THEME.border }]}>
                  <Text style={[styles.trackerProdName, { color: THEME.text }]}>Rolex Submariner Date</Text>
                  <Text style={[styles.trackerStatus, { color: THEME.accent }]}>{isEn ? 'Shipped 🚚' : 'Kargoya Verildi 🚚'}</Text>
                </View>
                <Text style={[styles.orderDetailText, { color: THEME.textMuted }]}>
                  {isEn 
                    ? `Courier: Yurtiçi Kargo • Tracking No: YK837261902\nEstimated Delivery: In 2 Days`
                    : `Kargo Firması: Yurtiçi Kargo • Takip No: YK837261902\nTahmini Teslimat: 2 Gün İçinde`}
                </Text>
                {/* Visual authenticity guarantee indicator */}
                <View style={styles.guaranteeTag}>
                  <Text style={styles.guaranteeText}>
                    {isEn ? '✓ Spectral Analysis Approved Digital Passport Ready' : '✓ Spektral Analiz Onaylı Dijital Pasaport Hazır'}
                  </Text>
                </View>
              </View>

              {/* Favorite Brands & Price Alerts */}
              <Text style={[styles.sectionTitle, { color: THEME.text }]}>{isEn ? 'Followed Brands & Alerts' : 'Takip Ettiğim Markalar & Alarmlar'}</Text>
              <View style={[styles.brandsBox, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
                <View style={styles.brandRow}>
                  <Text style={[styles.brandName, { color: THEME.text }]}>Chanel</Text>
                  <Text style={styles.brandAlertCount}>{isEn ? '3 New Price Alerts 🔔' : '3 Yeni Fiyat Alarmı 🔔'}</Text>
                </View>
                <View style={[styles.brandRowDivider, { backgroundColor: THEME.border }]} />
                <View style={styles.brandRow}>
                  <Text style={[styles.brandName, { color: THEME.text }]}>Rolex</Text>
                  <Text style={styles.brandAlertCount}>{isEn ? 'New Listing Alerts On' : 'Yeni İlan Bildirimi Açık'}</Text>
                </View>
              </View>
            </View>
          )}

          {/* DYNAMIC RENDERING: SELLER ACCOUNT VIEW */}
          {profileMode === 'seller' && (
            <View style={{ paddingHorizontal: 15 }}>
              {/* Financial Summary */}
              <View style={[styles.walletBox, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
                <View style={styles.walletCol}>
                  <Text style={styles.walletLabel}>{isEn ? 'TOTAL SALES' : 'TOPLAM SATIŞ'}</Text>
                  <Text style={[styles.walletValue, { color: THEME.text }]}>{balance}</Text>
                </View>
                <View style={[styles.walletDivider, { backgroundColor: THEME.border }]} />
                <View style={styles.walletCol}>
                  <Text style={styles.walletLabel}>{isEn ? 'PENDING PAYOUT' : 'BEKLEYEN HAKEDİŞ'}</Text>
                  <Text style={[styles.walletValue, { color: THEME.text }]}>{pendingPayout}</Text>
                </View>
              </View>

              {/* User Real Submitted Products List */}
              <Text style={[styles.sectionTitle, { color: THEME.text }]}>{isEn ? 'My Luxury Assets' : 'Varlıklarım ve Satış Durumları'}</Text>
              {myProducts.length === 0 ? (
                <View style={[styles.trackerCard, { backgroundColor: THEME.card, borderColor: THEME.border, alignItems: 'center', paddingVertical: 24 }]}>
                  <Text style={{ fontSize: 28, marginBottom: 8 }}>🛍️</Text>
                  <Text style={{ fontSize: 13, color: THEME.textMuted }}>{isEn ? 'No products listed yet.' : 'Henüz sergilenen bir ürününüz bulunmuyor.'}</Text>
                </View>
              ) : (
                myProducts.map(p => {
                  const createdDate = new Date(p.created_at || Date.now());
                  const daysDiff = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
                  const isUnsold7Days = daysDiff >= 7 && p.status === 'approved';

                  const statusBadgeText = p.status === 'approved' 
                    ? (isEn ? 'ON SHOWCASE (VİTRİNDE)' : 'VİTRİNDE (SATIŞTA)')
                    : p.status === 'pending'
                    ? (isEn ? 'PEONY AI EXPERTISE' : 'PEONY AI İNCELEMESİNDE')
                    : (isEn ? 'REJECTED' : 'REDDEDİLDİ');

                  const statusBadgeBg = p.status === 'approved' ? '#ECFDF5' : p.status === 'pending' ? '#FEF3C7' : '#FFF5F5';
                  const statusBadgeColor = p.status === 'approved' ? '#059669' : p.status === 'pending' ? '#D97706' : '#EF4444';

                  return (
                    <View key={p.id} style={[styles.trackerCard, { backgroundColor: THEME.card, borderColor: THEME.border, marginBottom: 14 }]}>
                      <View style={[styles.trackerHeader, { borderColor: THEME.border }]}>
                        <Text style={[styles.trackerProdName, { color: THEME.text }]}>{p.brand} {p.model_name}</Text>
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: THEME.primary }}>
                          ₺{Number(p.price || 0).toLocaleString('tr-TR')}
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 10 }}>
                        <View style={{ paddingHorizontal: 8, paddingVertical: 3, backgroundColor: statusBadgeBg, borderRadius: 4 }}>
                          <Text style={{ fontSize: 10, fontWeight: 'bold', color: statusBadgeColor }}>{statusBadgeText}</Text>
                        </View>
                        {p.ai_confidence && (
                          <Text style={{ fontSize: 10, color: THEME.textMuted, marginLeft: 10 }}>
                            Peony AI Skoru: %{p.ai_confidence}
                          </Text>
                        )}
                      </View>

                      {/* 7 Days Unsold Price Reduce Suggestion Alert & Button */}
                      {isUnsold7Days && (
                        <View style={{ marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: THEME.border }}>
                          <Text style={{ fontSize: 11, color: '#D97706', fontWeight: '600', marginBottom: 6 }}>
                            ⚠️ Ürününüz {daysDiff} gündür satılmadı. Peony AI fiyatınızı %10 düşürerek hızlı satmanızı öneriyor.
                          </Text>
                          <TouchableOpacity 
                            style={{ backgroundColor: THEME.primary, paddingVertical: 8, borderRadius: 6, alignItems: 'center' }}
                            onPress={() => handleReducePrice(p.id, p.price)}
                          >
                            <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' }}>
                              Fiyatı ₺{Math.round(p.price * 0.9).toLocaleString('tr-TR')} Yap & Vitrinde Yükselt
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                })
              )}

              {/* Monetization / Advertising Portal */}
              <Text style={[styles.sectionTitle, { color: THEME.text }]}>{isEn ? 'Boost Your Sales' : 'Satışlarınızı Artırın'}</Text>
              <Text style={[styles.sectionDesc, { color: THEME.textMuted }]}>
                {isEn 
                  ? 'Get up to %50 more views on your items using Peony Muse and Showcase ad packages.'
                  : 'Peony Muse ve Vitrin reklam paketleriyle ürünlerinize %50 daha fazla gösterim kazandırın.'}
              </Text>

              {/* Package 1: Curator Boost */}
              <View style={[styles.adCard, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
                <View style={styles.adHeader}>
                  <Text style={[styles.adTitle, { color: THEME.text }]}>{isEn ? 'Curator Recommendation (Muse Boost)' : 'Küratör Öne Çıkarması (Muse Boost)'}</Text>
                  <Text style={styles.adPrice}>3.000 ₺ / {isEn ? 'Mo' : 'Ay'}</Text>
                </View>
                <Text style={[styles.adDesc, { color: THEME.textMuted }]}>
                  {isEn 
                    ? 'Your items are matched as priority recommendations in Peony Muse styling chats and gain %50 more exposure on the feed.'
                    : 'Ürünleriniz lüks stil danışmanımız Peony Muse sohbetlerinde öncelikli tavsiye olarak eşleştirilir ve vitrinde %50 daha fazla görünürlük kazanır.'}
                </Text>
                <TouchableOpacity 
                  style={[styles.adBtn, activeAdPackage === 'Muse Boost' && { backgroundColor: THEME.accent }]}
                  onPress={() => handleBuyAdPackage('Muse Boost', '3.000 ₺')}
                >
                  <Text style={styles.adBtnText}>
                    {activeAdPackage === 'Muse Boost' ? (isEn ? '✓ ACTIVE' : '✓ AKTİF') : (isEn ? 'ACTIVATE NOW' : 'HEMEN AKTİF ET')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Package 2: Elite Showcase */}
              <View style={[styles.adCard, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
                <View style={styles.adHeader}>
                  <Text style={[styles.adTitle, { color: THEME.text }]}>{isEn ? 'Showcase Priority Placement' : 'Vitrin Öncelikli Listeleme (Showcase Elite)'}</Text>
                  <Text style={styles.adPrice}>5.000 ₺ / {isEn ? 'Mo' : 'Ay'}</Text>
                </View>
                <Text style={[styles.adDesc, { color: THEME.textMuted }]}>
                  {isEn 
                    ? 'Your items are pinned to the top of category feeds and showcased in premium newsletter updates sent to 10k+ VIP collectors.'
                    : 'Ürünleriniz kategori vitrinlerinde her zaman en üst sırada sabitlenir ve 10 binden fazla VIP koleksiyonere gönderilen özel bültenlerde yer alır.'}
                </Text>
                <TouchableOpacity 
                  style={[styles.adBtn, activeAdPackage === 'Showcase Elite' && { backgroundColor: THEME.accent }]}
                  onPress={() => handleBuyAdPackage('Showcase Elite', '5.000 ₺')}
                >
                  <Text style={styles.adBtnText}>
                    {activeAdPackage === 'Showcase Elite' ? (isEn ? '✓ ACTIVE' : '✓ AKTİF') : (isEn ? 'ACTIVATE NOW' : 'HEMEN AKTİF ET')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* DYNAMIC RENDERING: DIGITAL VAULT VIEW */}
          {profileMode === 'vault' && (
            <View style={{ paddingHorizontal: 15 }}>
              {/* Vault Portfolio Value summary card */}
              {(() => {
                const totalPortfolioValue = myProducts.reduce((acc, curr) => acc + (curr.status === 'approved' ? Number(curr.price || 0) : 0), 1030000);
                const appreciationValue = Math.round(totalPortfolioValue * 0.12); // ~12% average appreciation
                return (
                  <View style={[styles.vaultValueCard, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
                    <View style={styles.vaultValueHeader}>
                      <Text style={styles.vaultLabel}>{isEn ? 'PORTFOLIO TOTAL VALUE' : 'PORTFÖY TOPLAM DEĞERİ'}</Text>
                      <Text style={styles.vaultTrend}>+12.4% {isEn ? 'Total Appreciation' : 'Toplam Değer Kazancı'} 📈</Text>
                    </View>
                    <Text style={[styles.vaultValueText, { color: THEME.text }]}>₺{totalPortfolioValue.toLocaleString('tr-TR')}</Text>
                    <Text style={[styles.vaultSubText, { color: THEME.textMuted }]}>
                      {isEn 
                        ? `Live valuation of your ${myProducts.length + 2} verified luxury assets. Net gain: ₺${appreciationValue.toLocaleString('tr-TR')}`
                        : `Doğrulanmış ${myProducts.length + 2} lüks varlığınızın güncel canlı piyasa değeri. Net kârınız: ₺${appreciationValue.toLocaleString('tr-TR')}`}
                    </Text>
                  </View>
                );
              })()}

              {/* Asset list */}
              <Text style={[styles.sectionTitle, { color: THEME.text }]}>{isEn ? 'Vault Assets' : 'Kasa Varlıkları'}</Text>
              
              {/* Asset 1 */}
              <View style={[styles.assetItemCard, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
                <View style={styles.assetItemRow}>
                  <View style={[styles.assetDot, { backgroundColor: '#10B981' }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.assetBrand}>CHANEL</Text>
                    <Text style={[styles.assetModel, { color: THEME.text }]}>Classic Double Flap Medium Black</Text>
                    <Text style={styles.assetStatus}>Entrupy Verified ✓</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[styles.assetCurrentVal, { color: THEME.text }]}>345.000 ₺</Text>
                    <Text style={[styles.assetAppreciation, { color: '#10B981' }]}>{isEn ? '+35k Gain (11.3%)' : '+35k Kâr (%11.3)'}</Text>
                  </View>
                </View>
              </View>

              {/* Asset 2 */}
              <View style={[styles.assetItemCard, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
                <View style={styles.assetItemRow}>
                  <View style={[styles.assetDot, { backgroundColor: '#10B981' }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.assetBrand}>ROLEX</Text>
                    <Text style={[styles.assetModel, { color: THEME.text }]}>Submariner Date Starbucks 41mm</Text>
                    <Text style={styles.assetStatus}>Entrupy Verified ✓</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[styles.assetCurrentVal, { color: THEME.text }]}>685.000 ₺</Text>
                    <Text style={[styles.assetAppreciation, { color: '#10B981' }]}>{isEn ? '+10k Gain (1.5%)' : '+10k Kâr (%1.5)'}</Text>
                  </View>
                </View>
              </View>

              {/* Dynamically render user products in portfolio */}
              {myProducts.filter(p => p.status === 'approved').map(p => {
                const costPrice = Math.round(p.price * 0.93);
                const gain = p.price - costPrice;
                const gainPercent = ((gain / costPrice) * 100).toFixed(1);
                return (
                  <View key={p.id} style={[styles.assetItemCard, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
                    <View style={styles.assetItemRow}>
                      <View style={[styles.assetDot, { backgroundColor: '#10B981' }]} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.assetBrand}>{p.brand?.toUpperCase()}</Text>
                        <Text style={[styles.assetModel, { color: THEME.text }]}>{p.model_name}</Text>
                        <Text style={styles.assetStatus}>Peony AI Certified ✓</Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[styles.assetCurrentVal, { color: THEME.text }]}>₺{(p.price || 0).toLocaleString('tr-TR')}</Text>
                        <Text style={[styles.assetAppreciation, { color: '#10B981' }]}>
                          +₺{gain.toLocaleString('tr-TR')} ({gainPercent}%)
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}

              {/* Certify My Bag Service */}
              <Text style={[styles.sectionTitle, { color: THEME.text }]}>{isEn ? 'Vault Services' : 'Kasa Hizmetleri'}</Text>
              <View style={[styles.certifyCard, { backgroundColor: THEME.promoBg }]}>
                <Text style={styles.certifyTag}>✦ CERTIFY MY BAG</Text>
                <Text style={[styles.certifyTitle, { color: THEME.text }]}>{isEn ? 'Register Your Bags' : 'Çantalarınızı Tescil Edin'}</Text>
                <Text style={[styles.certifyDesc, { color: THEME.textMuted }]}>
                  {isEn 
                    ? 'Get your luxury bags authenticated via Entrupy AI microscopic scanning and expert validation. Receive your digital certificate and add them to your vault.'
                    : 'Elinizdeki lüks çantaları Entrupy AI mikroskobik doğrulaması ve uzman kontrolüyle tescil ettirin. Orijinallik belgenizi alarak ürünlerinizi dijital kasanıza ekleyin.'}
                </Text>
                <View style={styles.certifyPriceRow}>
                  <View>
                    <Text style={styles.certifyPriceLabel}>{isEn ? 'Service Fee' : 'Hizmet Bedeli'}</Text>
                    <Text style={[styles.certifyPrice, { color: THEME.text }]}>1.990 ₺</Text>
                  </View>
                  <TouchableOpacity 
                    style={[styles.certifyBtn, { backgroundColor: THEME.primary }]}
                    onPress={() => {
                      Alert.alert(
                        isEn ? 'Appointment Requested' : 'Randevu Talebi Alındı',
                        isEn 
                          ? 'Your request for Certify My Bag has been received. Our operations team will contact you within 15 minutes to arrange safe transit and appointment scheduling.'
                          : 'Certify My Bag tescil talebiniz alınmıştır. Operasyon ekibimiz sigortalı kurye gönderimi ve randevu saatini planlamak üzere sizinle 15 dakika içinde iletişime geçecektir.',
                        [{ text: isEn ? 'OK' : 'Tamam' }]
                      );
                    }}
                  >
                    <Text style={styles.certifyBtnText}>{isEn ? 'Book Appointment →' : 'Randevu Al →'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* ADMIN OPERATIONS LINK */}
          {(profile?.role === 'admin' || profile?.role === 'operations') && (
            <View style={{ paddingHorizontal: 15 }}>
              <TouchableOpacity style={[styles.adminBtn, { borderColor: THEME.primary }]} onPress={onEnterOperations}>
                <Text style={styles.adminBtnText}>{isEn ? '🛡 OPERATOR PANEL LOGIN' : '🛡 OPERASYON PANELİ GİRİŞİ'}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ACCOUNT & PREFERENCES LIST */}
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>{isEn ? 'Account Info & Settings' : 'Hesap Bilgileri & Ayarlar'}</Text>
            
            <View style={[styles.settingsGroup, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
              {/* IBAN SETTING */}
              <View style={[styles.settingsRow, { borderColor: THEME.border }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingsLabel}>{isEn ? 'BANK ACCOUNT (IBAN)' : 'BANKA HESABI (IBAN)'}</Text>
                  {isEditingIban ? (
                    <TextInput 
                      style={[styles.ibanInput, { color: THEME.text, backgroundColor: THEME.bg, borderColor: THEME.border }]}
                      value={iban}
                      onChangeText={setIban}
                      onBlur={() => setIsEditingIban(false)}
                    />
                  ) : (
                    <Text style={[styles.settingsValue, { color: THEME.text }]}>{iban}</Text>
                  )}
                </View>
                <TouchableOpacity 
                  style={[styles.editBtn, { borderColor: THEME.border }]} 
                  onPress={() => setIsEditingIban(!isEditingIban)}
                >
                  <Text style={[styles.editBtnText, { color: THEME.text }]}>
                    {isEditingIban 
                      ? (isEn ? 'Save' : 'Kaydet') 
                      : (isEn ? 'Edit' : 'Düzenle')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* REGISTERED ADDRESS */}
              <View style={[styles.settingsRow, { borderColor: THEME.border }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingsLabel}>{isEn ? 'SHIPPING ADDRESS' : 'TESLİMAT ADRESİ'}</Text>
                  <Text style={[styles.settingsValue, { color: THEME.text }]}>Nişantaşı, Valikonak Cd. No:45 D:12 Şişli / İstanbul</Text>
                </View>
                <TouchableOpacity style={[styles.editBtn, { borderColor: THEME.border }]} onPress={() => Alert.alert(isEn ? 'Info' : 'Bilgi', isEn ? 'Address update module will be enabled soon.' : 'Adres düzenleme modülü yakında aktif olacaktır.')}>
                  <Text style={[styles.editBtnText, { color: THEME.text }]}>{isEn ? 'Edit' : 'Düzenle'}</Text>
                </TouchableOpacity>
              </View>

              {/* PREFERRED SIZE */}
              <View style={[styles.settingsRow, { borderColor: THEME.border }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingsLabel}>{isEn ? 'SIZE PREFERENCES' : 'BEDEN TERCİHLERİM'}</Text>
                  <Text style={[styles.settingsValue, { color: THEME.text }]}>{isEn ? 'Clothes: M / Shoes: 38 / Acc: Medium' : 'Kıyafet: M / Shoes: 38 / Aksesuar: Medium'}</Text>
                </View>
                <TouchableOpacity style={[styles.editBtn, { borderColor: THEME.border }]} onPress={() => Alert.alert(isEn ? 'Info' : 'Bilgi', isEn ? 'Size preference module will be enabled soon.' : 'Beden tercihi modülü yakında aktif olacaktır.')}>
                  <Text style={[styles.editBtnText, { color: THEME.text }]}>{isEn ? 'Edit' : 'Düzenle'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
              <Text style={styles.logoutBtnText}>{isEn ? 'Log Out' : 'Oturumu Kapat'}</Text>
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
  },
  /* Digital Vault Styles */
  vaultValueCard: {
    backgroundColor: COLORS.darkBar,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2D2E36',
  },
  vaultValueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  vaultLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#987B51',
    letterSpacing: 1.5,
  },
  vaultTrend: {
    fontSize: 11,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  vaultValueText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  vaultSubText: {
    fontSize: 11.5,
    color: '#9899A0',
    lineHeight: 16,
  },
  assetItemCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },
  assetItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: 12,
  },
  assetBrand: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  assetModel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 2,
  },
  assetStatus: {
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: '600',
    marginTop: 3,
  },
  assetCurrentVal: {
    fontSize: 13.5,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  assetAppreciation: {
    fontSize: 9.5,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  certifyCard: {
    backgroundColor: COLORS.promoBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(175, 145, 100, 0.2)',
    padding: 18,
    marginBottom: 16,
  },
  certifyTag: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  certifyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    color: COLORS.text,
    marginBottom: 6,
  },
  certifyDesc: {
    fontSize: 11.5,
    color: COLORS.textMuted,
    lineHeight: 17,
    marginBottom: 18,
  },
  certifyPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  certifyPriceLabel: {
    fontSize: 9,
    color: COLORS.textMuted,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  certifyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  certifyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  certifyBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingBottom: 10,
    marginBottom: 12,
  },
  detailsTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  editInfoBtn: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  editInfoBtnText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  infoRowField: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '500',
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: COLORS.text,
    backgroundColor: COLORS.bg,
  },
  editFieldsGroup: {
    width: '100%',
  },
  editSectionTitleRow: {
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingBottom: 4,
    marginTop: 8,
    marginBottom: 12,
  },
  editSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  displayInfoPanel: {
    width: '100%',
  },
  displaySection: {
    marginBottom: 8,
  },
  displaySectionHeader: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  displayGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayCol: {
    flex: 1,
  },
  displayLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  displayVal: {
    fontSize: 13.5,
    color: COLORS.text,
    fontWeight: '500',
  },
  displaySectionDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  }
});
