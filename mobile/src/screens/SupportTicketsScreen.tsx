import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Modal 
} from 'react-native';
import { supabase } from '../lib/supabase';

const COLORS = {
  bg: '#0F1016',
  card: '#181A24',
  text: '#FFFFFF',
  textMuted: '#8E909B',
  primary: '#D4AF37', // Gold
  border: '#2A2D3D',
  accent: '#10B981'
};

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: string;
  reply?: string;
  created_at: string;
}

export default function SupportTicketsScreen() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

      const { error } = await supabase
        .from('it_support_tickets')
        .insert({
          user_id: user.id,
          subject,
          message,
          status: 'pending'
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

  return (
    <View style={styles.container}>
      <View style={styles.actionHeader}>
        <Text style={styles.subtitle}>Destek Talepleriniz</Text>
        <TouchableOpacity style={styles.createBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.createBtnText}>+ Yeni Talep</Text>
        </TouchableOpacity>
      </View>

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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Henüz hiçbir destek talebiniz bulunmuyor.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.subject} numberOfLines={1}>{item.subject}</Text>
                <View style={[styles.badge, item.status === 'replied' ? styles.badgeReplied : styles.badgePending]}>
                  <Text style={styles.badgeText}>
                    {item.status === 'replied' ? 'CEVAPLANDI' : 'BEKLEMEDE'}
                  </Text>
                </View>
              </View>
              <Text style={styles.msg}>{item.message}</Text>
              
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
          )}
        />
      )}

      {/* CREATE TICKET MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Destek Talebi Oluştur</Text>
            <Text style={styles.modalDesc}>
              Yaşadığınız sorunu veya sorunuzu iletin, ekibimiz en kısa sürede yanıtlayacaktır.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>KONU</Text>
              <TextInput 
                style={styles.input}
                placeholder="Sorunu kısaca özetleyin"
                placeholderTextColor={COLORS.textMuted}
                value={subject}
                onChangeText={setSubject}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>AÇIKLAMA / DETAYLAR</Text>
              <TextInput 
                style={[styles.input, styles.textArea]}
                placeholder="Lütfen detaylı bilgi verin..."
                placeholderTextColor={COLORS.textMuted}
                multiline
                numberOfLines={5}
                value={message}
                onChangeText={setMessage}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Vazgeç</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <ActivityIndicator color={COLORS.bg} />
                ) : (
                  <Text style={styles.submitBtnText}>GÖNDER</Text>
                )}
              </TouchableOpacity>
            </View>
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
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: 1,
  },
  createBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  createBtnText: {
    color: COLORS.bg,
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 15,
  },
  emptyContainer: {
    paddingVertical: 80,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subject: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    marginRight: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFF',
  },
  badgePending: {
    backgroundColor: '#F59E0B',
  },
  badgeReplied: {
    backgroundColor: COLORS.accent,
  },
  msg: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
  },
  replyBox: {
    backgroundColor: COLORS.bg,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 3,
    borderColor: COLORS.primary,
  },
  replyLabel: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  replyText: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 18,
  },
  date: {
    color: COLORS.textMuted,
    fontSize: 10,
    marginTop: 12,
    textAlign: 'right',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 500,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  modalDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 20,
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: 20,
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
    height: 50,
    color: COLORS.text,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: COLORS.textMuted,
    fontSize: 15,
  },
  submitBtn: {
    flex: 2,
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: COLORS.bg,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  }
});
