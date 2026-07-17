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
  KeyboardAvoidingView
} from 'react-native';
import { supabase } from '../lib/supabase';

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

interface ChatbotMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  products?: Array<{
    id: string;
    brand: string;
    model_name: string;
    price: number;
    image: string;
  }>;
}

export default function SupportTicketsScreen() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [stylistVisible, setStylistVisible] = useState(false);

  // Support ticket inputs
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // AI Stylist Chatbot states
  const [chatbotInput, setChatbotInput] = useState('');
  const [chatbotMessages, setChatbotMessages] = useState<ChatbotMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Merhaba ben Peony Kişisel Stil Danışmanınız. Bugün nereyi ziyaret edeceksiniz veya nasıl bir davete katılacaksınız? Size oranın havasına ve trendlerine en uygun lüks parçaları önereyim.'
    }
  ]);

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
      alert('Lütfen konu ve açıklama alanlarını doldurun.');
      return;
    }
    setSubmitting(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Oturum bulunamadı.');

      const messageText = `[Konu: ${subject}]\n\n${message}`;

      const { error } = await supabase
        .from('it_support_tickets')
        .insert({
          user_id: user.id,
          message: messageText,
          status: 'open'
        });

      if (error) throw error;
      
      alert('Destek talebiniz başarıyla oluşturuldu.');
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

  // Simulated AI Stylist dynamic recommendation algorithm
  function handleSendMessageToStylist() {
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

    // Trigger AI response calculation after short delay
    setTimeout(() => {
      let responseText = '';
      let recommendedProducts: any[] = [];

      const query = userText.toLowerCase();

      if (query.includes('tekne') || query.includes('yat') || query.includes('deniz') || query.includes('yacht') || query.includes('plaj') || query.includes('beach') || query.includes('bodrum') || query.includes('çeşme')) {
        responseText = 'Harika bir yaz planı! Deniz havası ve yat davetlerinin o rahat ama göz alıcı şıklığı için Loewe\'nin hasır detaylı ikonik el çantasını ve gün ışığında parlayacak Rolex altın saatini öneriyorum.';
        recommendedProducts = [
          { id: 'loewe-tote', brand: 'LOEWE', model_name: 'Basket Raffia Bag Medium', price: 24500, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' },
          { id: 'rolex-sub', brand: 'ROLEX', model_name: 'Submariner Date Gold', price: 685000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' }
        ];
      } else if (query.includes('akşam') || query.includes('yemek') || query.includes('davet') || query.includes('düğün') || query.includes('gece') || query.includes('party') || query.includes('dinner')) {
        responseText = 'Şık bir gece daveti! Gecenin tüm bakışlarını üzerinizde toplamak için siyah deri Chanel Flap bag ve altın detaylı Cartier kolyeyi öneririm. Bu klasik şıklık asla modası geçmeyen bir yatırımdır.';
        recommendedProducts = [
          { id: 'chanel-flap', brand: 'CHANEL', model_name: 'Classic Double Flap Black', price: 345000, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' },
          { id: 'cartier-love', brand: 'CARTIER', model_name: 'Love Necklace Gold', price: 92000, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300' }
        ];
      } else {
        // Quiet luxury default fallback
        responseText = 'Her ortama uyum sağlayacak "Quiet Luxury" (Sessiz Lüks) stilini öneriyorum. Logolar yerine mükemmel dikişleri ve deri kalitesini öne çıkaran Bottega Veneta örgü deri çanta ve Loro Piana keten şıklığı bugün harika duracaktır.';
        recommendedProducts = [
          { id: 'bottega-cassette', brand: 'BOTTEGA VENETA', model_name: 'Padded Cassette Bag', price: 145000, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300' }
        ];
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
    }, 1000);
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
              {/* AI STYLIST CONCIERGE BANNER */}
              <TouchableOpacity 
                style={styles.stylistCard}
                onPress={() => setStylistVisible(true)}
              >
                <View style={styles.stylistHeader}>
                  <Text style={styles.stylistTag}>✦ PEONY AI STYLIST</Text>
                  <View style={styles.activeDot} />
                </View>
                <Text style={styles.stylistTitle}>Bugün nereyi ziyaret edeceksiniz?</Text>
                <Text style={styles.stylistDesc}>Bize söyleyin, oraya özel kombin ve lüks sponsorlu ürünleri hemen listeleyelim.</Text>
                <Text style={styles.stylistAction}>Stil Danışmanını Başlat →</Text>
              </TouchableOpacity>

              <View style={styles.actionHeader}>
                <Text style={styles.subtitle}>Destek Talepleriniz</Text>
                <TouchableOpacity style={styles.createBtn} onPress={() => setModalVisible(true)}>
                  <Text style={styles.createBtnText}>+ Yeni Talep</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Henüz hiçbir destek talebiniz bulunmuyor.</Text>
            </View>
          }
          renderItem={({ item }) => {
            // Check if it's the combined message format
            const hasSubject = item.message.startsWith('[Konu:');
            let displayedSubject = 'Genel IT Desteği';
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
                      {item.status === 'replied' ? 'CEVAPLANDI' : 'BEKLEMEDE'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.msg}>{displayedMsg}</Text>
                
                {item.reply && (
                  <View style={styles.replyBox}>
                    <Text style={styles.replyLabel}>Destek Ekibi Cevabı:</Text>
                    <Text style={styles.replyText}>{item.reply}</Text>
                  </View>
                )}
                <Text style={styles.date}>
                  {new Date(item.created_at).toLocaleDateString('tr-TR')}
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
              <Text style={styles.modalTitle}>Destek Talebi Oluştur</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>KONU / BAŞLIK</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Yaşadığınız sorunu kısaca başlık olarak yazın..."
                  placeholderTextColor={COLORS.textMuted}
                  value={subject}
                  onChangeText={setSubject}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>AÇIKLAMA / DETAYLAR</Text>
                <TextInput 
                  style={[styles.input, styles.textArea]}
                  placeholder="Detaylı açıklamayı buraya girin..."
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
                  <Text style={styles.submitBtnText}>TALEBİ İLET</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* AI STYLIST CHATBOT MODAL */}
      <Modal visible={stylistVisible} animationType="slide">
        <SafeAreaView style={styles.stylistModalContainer}>
          {/* Header */}
          <View style={styles.stylistModalHeader}>
            <TouchableOpacity onPress={() => setStylistVisible(false)}>
              <Text style={styles.backBtnText}>← Geri</Text>
            </TouchableOpacity>
            <Text style={styles.stylistHeaderTitle}>Peony AI Stylist</Text>
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
                      <Text style={styles.recsHeader}>Sponsorlu Stil Önerileri:</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recsScroll}>
                        {msg.products.map((prod) => (
                          <View key={prod.id} style={styles.prodCard}>
                            <Image source={{ uri: prod.image }} style={styles.prodImg} />
                            <View style={styles.prodInfo}>
                              <Text style={styles.prodBrand} numberOfLines={1}>{prod.brand}</Text>
                              <Text style={styles.prodName} numberOfLines={1}>{prod.model_name}</Text>
                              <Text style={styles.prodPrice}>{prod.price?.toLocaleString('tr-TR')} ₺</Text>
                            </View>
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>

          {/* Input Bar */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
          >
            <View style={styles.chatbotInputBar}>
              <TextInput 
                style={styles.chatbotInput}
                placeholder="Bugün nereye gidiyorsunuz? Örn: Tekne turu"
                placeholderTextColor={COLORS.textMuted}
                value={chatbotInput}
                onChangeText={setChatbotInput}
              />
              <TouchableOpacity style={styles.chatbotSendBtn} onPress={handleSendMessageToStylist}>
                <Text style={styles.chatbotSendBtnText}>Sor</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
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
