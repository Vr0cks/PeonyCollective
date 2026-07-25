import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  Modal, 
  TextInput,
  ScrollView,
  Platform,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import { supabase } from '../lib/supabase';
import { t, locale } from '../lib/i18n';

const { width, height } = Dimensions.get('window');

const COLORS = {
  bg: '#FBFBFA', // Luxury off-white
  card: '#FFFFFF', // Clean white
  text: '#1A1A1A', // High-contrast charcoal text
  textMuted: '#7E8085', // Slate gray
  primary: '#AF9164', // Classic champagne gold
  border: '#E8E8E6', // Thin dividers
  accent: '#10B981', // Emerald green
  darkBar: '#12131A', // Deep black accent for bubbles
  stylistBg: '#F5ECE1' // Soft warm beige for stylist card
};

interface Ticket {
  id: string;
  message: string;
  status: string;
  reply?: string;
  created_at: string;
}

export default function SupportTicketsScreen({ onOpenStylist }: { onOpenStylist: () => void }) {
  const isEn = locale === 'en';
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Developer Feedback Modal States
  const [devModalVisible, setDevModalVisible] = useState(false);
  const [devCategory, setDevCategory] = useState<'feature' | 'bug' | 'idea'>('feature');
  const [devMessage, setDevMessage] = useState('');
  const [devSubmitting, setDevSubmitting] = useState(false);

  // Support ticket inputs
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      const { data, error } = await supabase
        .from('it_support_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (e: any) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!subject || !message) {
      const allFieldsAlert = t('loginAlertAllFields') || 'Lütfen tüm alanları doldurun.';
      alert(allFieldsAlert);
      return;
    }
    setSubmitting(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Oturum bulunamadı.');

      const messageText = `[Konu: ${subject}]\n\n${message}`;

      const session = (await supabase.auth.getSession()).data.session;
      const accessToken = session?.access_token;

      const response = await fetch('https://peony-collective.vercel.app/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ message: messageText })
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || 'Destek talebi iletilemedi.');
      }
      
      const successAlert = t('wishlistEmpty') === 'Your wishlist is empty.' ? 'Your support request has been created successfully.' : 'Destek talebiniz başarıyla oluşturuldu.';
      alert(successAlert);
      setModalVisible(false);
      setSubject('');
      setMessage('');
      fetchTickets();
    } catch (e: any) {
      alert('Hata: ' + e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDevSubmit() {
    if (!devMessage.trim()) {
      alert(isEn ? 'Please enter your feedback message for the developer.' : 'Lütfen geliştiriciye iletmek istediğiniz notu yazın.');
      return;
    }
    setDevSubmitting(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error(isEn ? 'Session not found. Please log in.' : 'Oturum bulunamadı. Lütfen giriş yapın.');

      const catTitle = devCategory === 'feature' ? (isEn ? '🚀 Feature Request' : '🚀 Yeni Özellik Talebi')
        : devCategory === 'bug' ? (isEn ? '🐛 Bug Report' : '🐛 Hata Bildirimi')
        : (isEn ? '💡 General Idea / Feedback' : '💡 Genel Görüş / Fikir');

      const fullMessageText = `[GELİŞTİRİCİYE NOT: ${catTitle}] [Platform: ${Platform.OS.toUpperCase()}]\n\n${devMessage.trim()}`;

      const session = (await supabase.auth.getSession()).data.session;
      const accessToken = session?.access_token;

      const response = await fetch('https://peony-collective.vercel.app/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ message: fullMessageText })
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || (isEn ? 'Failed to send note to developer.' : 'Geliştiriciye not iletilemedi.'));
      }

      alert(isEn 
        ? '✦ Thank you! Your feedback has been transmitted directly to the lead developer.' 
        : '✦ Teşekkürler! Notunuz doğrudan baş geliştiriciye iletildi.');
      setDevModalVisible(false);
      setDevMessage('');
      fetchTickets();
    } catch (e: any) {
      alert(isEn ? 'Error: ' + e.message : 'Hata: ' + e.message);
    } finally {
      setDevSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onRefresh={fetchTickets}
          refreshing={loading}
          ListHeaderComponent={
            <View style={styles.headerComponent}>
              {/* PEONY MUSE BANNER */}
              <TouchableOpacity 
                style={styles.stylistCard}
                onPress={onOpenStylist}
              >
                <View style={styles.stylistHeader}>
                  <Text style={styles.stylistTag}>✦ PEONY MUSE</Text>
                  <View style={styles.activeDot} />
                </View>
                <Text style={styles.stylistTitle}>{t('wishlistEmpty') === 'Your wishlist is empty.' ? 'Where are you visiting today?' : 'Bugün nereyi ziyaret edeceksiniz?'}</Text>
                <Text style={styles.stylistDesc}>{t('wishlistEmpty') === 'Your wishlist is empty.' ? 'Tell us about your day, and we will match the perfect luxury pieces and custom curations for you.' : 'Gününüzü bize anlatın, size en uygun lüks parçaları ve özel kürasyonları anında eşleştirelim.'}</Text>
                <Text style={styles.stylistAction}>{t('wishlistEmpty') === 'Your wishlist is empty.' ? 'Start Muse Curation Chat →' : 'Muse Kürasyon Sohbetini Başlat →'}</Text>
              </TouchableOpacity>

              {/* WRITE TO DEVELOPER VIP BANNER */}
              <TouchableOpacity 
                style={styles.devCard}
                onPress={() => setDevModalVisible(true)}
              >
                <View style={styles.devHeader}>
                  <Text style={styles.devTag}>{isEn ? '💡 DEVELOPER DIRECT' : '💡 GELİŞTİRİCİYE İLETİN'}</Text>
                  <Text style={styles.devBadge}>{isEn ? 'BETA FEEDBACK' : 'CANLI GERİ BİLDİRİM'}</Text>
                </View>
                <Text style={styles.devTitle}>{isEn ? 'Shape the Future of Peony App' : 'Uygulamayı Birlikte Geliştirelim'}</Text>
                <Text style={styles.devDesc}>
                  {isEn 
                    ? 'Share your ideas, feature requests, or report issues directly to our lead engineering team.'
                    : 'Fikirlerinizi, yeni özellik isteklerinizi veya karşılaştığınız sorunları doğrudan kurucu geliştirici ekibimize iletin.'}
                </Text>
                <Text style={styles.devAction}>{isEn ? '✦ Write Note to Developer →' : '✦ Geliştiriciye Not İlet →'}</Text>
              </TouchableOpacity>

              <View style={styles.actionHeader}>
                <Text style={styles.subtitle}>{t('supportCenterTitle') || 'Destek Talepleriniz'}</Text>
                <TouchableOpacity style={styles.createBtn} onPress={() => setModalVisible(true)}>
                  <Text style={styles.createBtnText}>{t('newTicket') || '+ Yeni Talep'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{t('emptyTickets') || 'Henüz hiçbir destek talebiniz bulunmuyor.'}</Text>
            </View>
          }
          renderItem={({ item }) => {
            // Check if it's the combined message format
            const hasSubject = item.message.startsWith('[Konu:');
            const defaultSubject = t('wishlistEmpty') === 'Your wishlist is empty.' ? 'General IT Support' : 'Genel IT Desteği';
            let displayedSubject = defaultSubject;
            let displayedMsg = item.message;

            if (hasSubject) {
              const closingIndex = item.message.indexOf(']');
              if (closingIndex !== -1) {
                displayedSubject = item.message.substring(6, closingIndex);
                displayedMsg = item.message.substring(closingIndex + 1).trim();
              }
            }

            return (
              <View style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.subject} numberOfLines={1}>{displayedSubject}</Text>
                  <View style={[styles.badge, item.status === 'replied' ? styles.badgeReplied : styles.badgePending]}>
                    <Text style={styles.badgeText}>
                      {item.status === 'replied' ? (t('ticketStatusReplied') || 'CEVAPLANDI') : (t('ticketStatusPending') || 'BEKLEMEDE')}
                    </Text>
                  </View>
                </View>
                <Text style={styles.msg}>{displayedMsg}</Text>
                
                {item.reply && (
                  <View style={styles.replyBox}>
                    <Text style={styles.replyLabel}>{t('ticketReplyLabel') || 'Destek Ekibi Cevabı:'}</Text>
                    <Text style={styles.replyText}>{item.reply}</Text>
                  </View>
                )}
                <Text style={styles.date}>
                  {new Date(item.created_at).toLocaleDateString(t('wishlistEmpty') === 'Your wishlist is empty.' ? 'en-US' : 'tr-TR')}
                </Text>
              </View>
            );
          }}
        />
      )}

      {/* SUPPORT TICKET MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('newTicket') || (isEn ? 'Create Support Ticket' : 'Destek Talebi Oluştur')}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('ticketSubject') || (isEn ? 'SUBJECT / TITLE' : 'KONU / BAŞLIK')}</Text>
                <TextInput 
                  style={styles.input}
                  placeholder={t('ticketPlaceholderSubject') || (isEn ? 'Brief title of your issue...' : 'Yaşadığınız sorunu kısaca başlık olarak yazın...')}
                  placeholderTextColor={COLORS.textMuted}
                  value={subject}
                  onChangeText={setSubject}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('ticketMessage') || (isEn ? 'DESCRIPTION / DETAILS' : 'AÇIKLAMA / DETAYLAR')}</Text>
                <TextInput 
                  style={[styles.input, styles.textArea]}
                  placeholder={t('ticketPlaceholderMessage') || (isEn ? 'Enter detailed description here...' : 'Detaylı açıklamayı buraya girin...')}
                  placeholderTextColor={COLORS.textMuted}
                  value={message}
                  onChangeText={setMessage}
                  multiline
                />
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitBtnText}>{t('ticketSubmit') || 'TALEBİ İLET'}</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* WRITE TO DEVELOPER VIP MODAL */}
      <Modal visible={devModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{isEn ? 'Write to Developer' : 'Geliştiriciye Not İlet'}</Text>
                <Text style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>
                  {isEn ? 'Direct channel to lead engineering team' : 'Kurucu geliştirici ekibine doğrudan erişim hattı'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setDevModalVisible(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll} keyboardShouldPersistTaps="handled">
              <Text style={styles.label}>{isEn ? 'FEEDBACK CATEGORY' : 'BİLDİRİM KATEGORİSİ'}</Text>
              <View style={{ flexDirection: 'row', gap: 6, marginBottom: 16 }}>
                {[
                  { id: 'feature', labelEn: '🚀 Feature', labelTr: '🚀 Özellik İstedi' },
                  { id: 'bug', labelEn: '🐛 Bug Report', labelTr: '🐛 Hata Bildirimi' },
                  { id: 'idea', labelEn: '💡 Idea', labelTr: '💡 Görüş / Fikir' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.devCategoryChip,
                      devCategory === item.id && styles.devCategoryChipActive
                    ]}
                    onPress={() => setDevCategory(item.id as any)}
                  >
                    <Text style={[
                      styles.devCategoryChipText,
                      devCategory === item.id && styles.devCategoryChipTextActive
                    ]}>
                      {isEn ? item.labelEn : item.labelTr}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{isEn ? 'YOUR NOTE / FEEDBACK' : 'NOTUNUZ & AÇIKLAMA'}</Text>
                <TextInput 
                  style={[styles.input, styles.textArea, { minHeight: 110 }]}
                  placeholder={isEn 
                    ? "Share feature ideas, bug details, UI suggestions or things you'd like to see improved in Peony..." 
                    : "Uygulamada olmasını istediğiniz özellikleri, karşılaştığınız hataları veya önerilerinizi detaylıca yazın..."}
                  placeholderTextColor={COLORS.textMuted}
                  value={devMessage}
                  onChangeText={setDevMessage}
                  multiline
                />
              </View>

              <View style={styles.devDeviceInfoCard}>
                <Text style={styles.devDeviceInfoText}>
                  📱 {isEn ? 'Platform Info Attached Automatically' : 'Sistem Bilgisi Otomatik Eklenir'}: {Platform.OS.toUpperCase()} (v3.2)
                </Text>
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={handleDevSubmit} disabled={devSubmitting}>
                {devSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitBtnText}>{isEn ? 'SEND NOTE TO DEVELOPER ✦' : 'GELİŞTİRİCİYE GÖNDER ✦'}</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  headerComponent: {
    marginBottom: 5,
  },
  stylistCard: {
    backgroundColor: COLORS.stylistBg,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(175, 145, 100, 0.15)',
  },
  devCard: {
    backgroundColor: '#181920', // Sleek dark luxury background
    marginHorizontal: 15,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(175, 145, 100, 0.3)',
    shadowColor: '#AF9164',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  devHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  devTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#D97706',
    letterSpacing: 1.5,
  },
  devBadge: {
    fontSize: 8,
    fontWeight: '700',
    color: '#AF9164',
    backgroundColor: 'rgba(175, 145, 100, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  devTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
  },
  devDesc: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 17,
    marginBottom: 12,
  },
  devAction: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#AF9164',
  },
  devCategoryChip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  devCategoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  devCategoryChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text,
  },
  devCategoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  devDeviceInfoCard: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  devDeviceInfoText: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  stylistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stylistTag: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginLeft: 6,
  },
  stylistTitle: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    color: COLORS.text,
    marginBottom: 6,
  },
  stylistDesc: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 16,
    marginBottom: 15,
  },
  stylistAction: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 15,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  createBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  createBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 110,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 15,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subject: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    paddingRight: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeReplied: {
    backgroundColor: '#E9EFEA',
  },
  badgePending: {
    backgroundColor: '#F3ECE0',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  msg: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  replyBox: {
    backgroundColor: '#F9F9F8',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  replyLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  replyText: {
    fontSize: 12.5,
    color: COLORS.text,
    lineHeight: 18,
  },
  date: {
    fontSize: 9.5,
    color: COLORS.textMuted,
    marginTop: 12,
    textAlign: 'right',
  },
  /* Modal styling */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeBtn: {
    fontSize: 18,
    color: COLORS.textMuted,
    padding: 5,
  },
  modalScroll: {
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    height: 48,
    color: COLORS.text,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 100,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1.5,
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
  }
});
