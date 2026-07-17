import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform 
} from 'react-native';
import { supabase } from '../lib/supabase';

// Theme Colors
const COLORS = {
  bg: '#0F1016',
  card: '#181A24',
  text: '#FFFFFF',
  textMuted: '#8E909B',
  primary: '#D4AF37', // Gold
  border: '#2A2D3D'
};

interface LoginScreenProps {
  onSuccess: () => void;
}

export default function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAuth() {
    if (!email || !password || (isSignUp && !fullName)) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: 'user' // Default role
            }
          }
        });
        if (error) throw error;
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
        setIsSignUp(false);
      } else {
        // Sign In
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onSuccess();
      }
    } catch (error: any) {
      alert('Hata: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.authContainer}>
          <Text style={styles.brandTitle}>PEONY</Text>
          <Text style={styles.brandSubtitle}>COLLECTIVE</Text>
          
          <Text style={styles.loginHeader}>{isSignUp ? 'Yeni Hesap Oluştur' : 'Giriş Yap'}</Text>
          <Text style={styles.loginDescription}>
            {isSignUp ? 'Peony Collective ailesine katılın.' : 'Lütfen bilgilerinizi girerek devam edin.'}
          </Text>

          {isSignUp && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>AD SOYAD</Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. Ahmet Canlı"
                placeholderTextColor={COLORS.textMuted}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-POSTA</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. email@peonycollective.com"
              placeholderTextColor={COLORS.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ŞİFRE</Text>
            <TextInput 
              style={styles.input} 
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor={COLORS.textMuted}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleAuth} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={COLORS.bg} />
            ) : (
              <Text style={styles.loginButtonText}>{isSignUp ? 'KAYIT OL' : 'GİRİŞ YAP'}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchButton} 
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text style={styles.switchText}>
              {isSignUp ? 'Zaten hesabınız var mı? Giriş Yapın' : 'Hesabınız yok mu? Kayıt Olun'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  authContainer: {
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    letterSpacing: 8,
  },
  brandSubtitle: {
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: 'center',
    letterSpacing: 4,
    marginBottom: 40,
  },
  loginHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  loginDescription: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
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
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: COLORS.bg,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 2,
  },
  switchButton: {
    marginTop: 25,
    alignItems: 'center',
  },
  switchText: {
    color: COLORS.primary,
    fontSize: 13,
  }
});
