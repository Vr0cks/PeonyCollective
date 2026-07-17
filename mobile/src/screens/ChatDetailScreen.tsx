import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator, 
  Image,
  Dimensions
} from 'react-native';
import { supabase } from '../lib/supabase';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#0F1016',
  card: '#181A24',
  text: '#FFFFFF',
  textMuted: '#8E909B',
  primary: '#D4AF37', // Gold
  border: '#2A2D3D',
  accent: '#10B981'
};

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface ChatDetailScreenProps {
  conversationId: string;
  otherName: string;
  productInfo?: {
    brand: string;
    name: string;
    image_urls?: string[];
  };
  onBack: () => void;
}

export default function ChatDetailScreen({ conversationId, otherName, productInfo, onBack }: ChatDetailScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setCurrentUserId(user.id);
    });

    fetchMessages();

    // Subscribe to real-time messages
    const channel = supabase
      .channel(`chat-${conversationId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (e: any) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Obfuscate / Mask contact info (Phone, Email, URL, IBAN) - Replicating Web App logic
  function filterMessageContent(content: string): string {
    const phoneRegex = /(?:\+?90|0)?\s*[1-9]\s*(?:\d\s*){9}/;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const ibanRegex = /TR\s*(?:\d\s*){24}/i;
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:com|net|org|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum|cc|tv|co|me|io|info|xyz|club|com\.tr|net\.tr|org\.tr)\b)/i;

    let filtered = content;
    const trimmed = content.trim();

    if (phoneRegex.test(trimmed.replace(/\s+/g, '')) || emailRegex.test(trimmed) || ibanRegex.test(trimmed.replace(/\s+/g, '')) || urlRegex.test(trimmed)) {
      // General mask
      filtered = '[İLETİŞİM BİLGİSİ GİZLENDİ]';
    }

    return filtered;
  }

  async function handleSend() {
    if (!inputText.trim() || !currentUserId) return;

    const originalText = inputText.trim();
    setInputText('');

    const finalContent = filterMessageContent(originalText);

    try {
      // Insert message into Supabase
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: currentUserId,
          content: finalContent,
          is_read: false
        });

      if (error) throw error;

      // Update conversation last message details
      await supabase
        .from('conversations')
        .update({
          last_message: finalContent,
          last_message_at: new Date().toISOString()
        })
        .eq('id', conversationId);

    } catch (e: any) {
      alert('Mesaj gönderilemedi: ' + e.message);
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{otherName}</Text>
          {productInfo && (
            <Text style={styles.productSubtitle} numberOfLines={1}>
              {productInfo.brand} - {productInfo.name}
            </Text>
          )}
        </View>
        {productInfo && (
          <Image 
            source={{ uri: productInfo.image_urls?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500' }} 
            style={styles.productThumb}
          />
        )}
      </View>

      {/* Messages List */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => {
            const isMe = item.sender_id === currentUserId;
            return (
              <View style={[styles.messageRow, isMe ? styles.myMessageRow : styles.otherMessageRow]}>
                <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
                  <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText]}>
                    {item.content}
                  </Text>
                  <Text style={[styles.timeText, isMe ? styles.myTimeText : styles.otherTimeText]}>
                    {new Date(item.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TextInput 
          style={styles.input}
          placeholder="Mesaj yazın..."
          placeholderTextColor={COLORS.textMuted}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendBtnText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  backBtn: {
    paddingRight: 15,
  },
  backBtnText: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productSubtitle: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  productThumb: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  messageList: {
    padding: 15,
    paddingBottom: 25,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
    width: '100%',
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  otherMessageRow: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  myBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 2,
  },
  otherBubble: {
    backgroundColor: COLORS.card,
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  myMessageText: {
    color: COLORS.bg,
    fontWeight: '500',
  },
  otherMessageText: {
    color: COLORS.text,
  },
  timeText: {
    fontSize: 9,
    marginTop: 4,
    textAlign: 'right',
  },
  myTimeText: {
    color: 'rgba(15, 16, 22, 0.6)',
  },
  otherTimeText: {
    color: COLORS.textMuted,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: COLORS.text,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sendBtn: {
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  }
});
