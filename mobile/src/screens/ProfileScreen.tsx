import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator 
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
  accent: '#10B981'
};

interface ProfileScreenProps {
  onLogout: () => void;
  onEnterOperations: () => void;
}

export default function ProfileScreen({ onLogout, onEnterOperations }: ProfileScreenProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        .maybeSingle();

      if (error) throw error;
      setProfile(data || { full_name: user.user_metadata?.full_name || 'Peony Üyesi', role: 'user' });
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    onLogout();
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={styles.profileBox}>
          {/* Avatar simulation */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile?.full_name?.charAt(0).toUpperCase() || 'P'}
            </Text>
          </View>

          <Text style={styles.name}>{profile?.full_name}</Text>
          <Text style={styles.role}>{profile?.role === 'admin' ? 'Yönetici' : profile?.role === 'operations' ? 'Operasyon Yetkilisi' : 'Üye'}</Text>

          {/* Hidden entrance for operations staff */}
          {(profile?.role === 'admin' || profile?.role === 'operations') && (
            <TouchableOpacity style={styles.adminBtn} onPress={onEnterOperations}>
              <Text style={styles.adminBtnText}>🛡 OPERASYON PANELİ GİRİŞİ</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
            <Text style={styles.logoutBtnText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    paddingBottom: 110, // Safe padding for floating tab bar
  },
  profileBox: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
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
    color: '#FFFFFF', // White text on gold avatar circle
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  role: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 35,
  },
  adminBtn: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
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
  }
});
