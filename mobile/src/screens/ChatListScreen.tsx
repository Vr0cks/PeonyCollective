import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image 
} from 'react-native';
import { supabase } from '../lib/supabase';

const COLORS = {
  bg: '#0F1016',
  card: '#181A24',
  text: '#FFFFFF',
  textMuted: '#8E909B',
  primary: '#D4AF37', // Gold
  border: '#2A2D3D'
};

interface Conversation {
  id: string;
  last_message?: string;
  last_message_at?: string;
  participant_1: string;
  participant_2: string;
  product?: {
    id: string;
    brand: string;
    name: string;
    image_urls?: string[];
  };
  other_profile?: {
    full_name?: string;
    first_name?: string;
    last_name?: string;
  };
}

interface ChatListScreenProps {
  onSelectChat: (conversationId: string, otherName: string, productInfo?: any) => void;
}

export default function ChatListScreen({ onSelectChat }: ChatListScreenProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  async function fetchConversations() {
    try {
      const userObj = (await supabase.auth.getUser()).data.user;
      if (!userObj) return;

      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          product:products(id, brand, name, image_urls)
        `)
        .or(`participant_1.eq.${userObj.id},participant_2.eq.${userObj.id}`)
        .order('last_message_at', { ascending: false });

      if (error) throw error;

      // Populating other participant's profile manually
      const populated = await Promise.all(
        (data || []).map(async (conv: any) => {
          const otherId = conv.participant_1 === userObj.id ? conv.participant_2 : conv.participant_1;
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, full_name')
            .eq('id', otherId)
            .maybeSingle();

          const name = profile 
            ? (profile.full_name || `${profile.first_name || ''} ${profile.last_name || ''}`.trim())
            : 'Peony Üyesi';

          return {
            ...conv,
            other_profile: { full_name: name }
          };
        })
      );

      setConversations(populated);
    } catch (e: any) {
      console.error('Fetch conversations error:', e.message);
    } finally {
      setLoading(false);
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
          data={conversations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onRefresh={fetchConversations}
          refreshing={loading}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Henüz hiç mesajlaşmanız yok.</Text>
            </View>
          }
          renderItem={({ item }) => {
            const name = item.other_profile?.full_name || 'Peony Üyesi';
            const productImg = item.product?.image_urls?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500';
            
            return (
              <TouchableOpacity 
                style={styles.card} 
                onPress={() => onSelectChat(item.id, name, item.product)}
              >
                <Image source={{ uri: productImg }} style={styles.productThumb} />
                <View style={styles.info}>
                  <View style={styles.row}>
                    <Text style={styles.name}>{name}</Text>
                    {item.last_message_at && (
                      <Text style={styles.time}>
                        {new Date(item.last_message_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.productContext} numberOfLines={1}>
                    {item.product?.brand} - {item.product?.name}
                  </Text>
                  <Text style={styles.lastMsg} numberOfLines={1}>
                    {item.last_message || 'Henüz mesaj yok.'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
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
  listContent: {
    padding: 15,
  },
  emptyContainer: {
    paddingVertical: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    alignItems: 'center',
  },
  productThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 15,
  },
  time: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  productContext: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 2,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  lastMsg: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 4,
  }
});
