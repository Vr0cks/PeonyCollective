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
  Platform,
  SafeAreaView,
  Image,
  Dimensions
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { supabase } from '../lib/supabase';

const { width, height } = Dimensions.get('window');
WebBrowser.maybeCompleteAuthSession();

const COLORS = {
  bg: '#0F1016',
  overlay: 'rgba(10, 10, 14, 0.75)', // Deep dark overlay
  card: '#1C1D24', // Card dark background
  text: '#FFFFFF',
  textMuted: '#9E9EA5',
  primary: '#AF9164', // Champagne gold
  border: 'rgba(255, 255, 255, 0.1)',
  accent: '#10B981',
};

interface LoginScreenProps {
  onSuccess: () => void;
}

const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000',
  'https://images.unsplash.com/photo-1588099768531-a72d4a190513?q=80&w=1000'
];

export default function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  React.useEffect(() => {
    if (showEmailForm) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [showEmailForm]);

  async function handleAuth() {
    if (!email || !password || (isSignUp && !fullName)) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: 'user'
            }
          }
        });
        if (error) throw error;
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
        setIsSignUp(false);
      } else {
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

  async function handleGoogleLogin() {
    setLoading(true);
    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: 'peony',
        path: 'auth/callback',
      });
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;

      const res = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
      
      if (res.type === 'success' && res.url) {
        const hashIndex = res.url.indexOf('#');
        if (hashIndex !== -1) {
          const hash = res.url.substring(hashIndex + 1);
          const params = hash.split('&').reduce((acc, current) => {
            const [key, value] = current.split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
          }, {} as Record<string, string>);

          const accessToken = params['access_token'];
          const refreshToken = params['refresh_token'];

          if (accessToken && refreshToken) {
            const { error: setSessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            if (setSessionError) throw setSessionError;
            onSuccess();
          }
        }
      }
    } catch (error: any) {
      alert('Google Giriş Hatası: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Editorial Background Image Slider */}
      <Image 
        source={{ uri: BACKGROUND_IMAGES[currentSlide] }} 
        style={styles.backgroundImage}
      />
      <View style={styles.backgroundOverlay} />

      {/* Instagram Story Progress Indicators */}
      {!showEmailForm && (
        <View style={styles.storyProgressContainer}>
          {BACKGROUND_IMAGES.map((_, idx) => (
            <View key={idx} style={styles.storyProgressBar}>
              <View 
                style={[
                  styles.storyProgressFill, 
                  { width: currentSlide === idx ? '100%' : currentSlide > idx ? '100%' : '0%' }
                ]} 
              />
            </View>
          ))}
        </View>
      )}

      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          
          {/* Main Visual/Editorial Overlay */}
          {!showEmailForm ? (
            <View style={styles.welcomeContainer}>
              <View style={styles.topLogo}>
                <Text style={styles.brandTitle}>PEONY</Text>
                <Text style={styles.brandSubtitle}>COLLECTIVE</Text>
              </View>

              <View style={styles.onboardingSection}>
                <Text style={styles.serifIntro}>Arzunun Objeleri</Text>
                <Text style={styles.subIntro}>Mirasın yeni sahibi olun. Lüks ikinci el moda ve konsinyerlik hizmeti.</Text>

                {/* Google Button */}
                <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin} disabled={loading}>
                  <Text style={styles.googleButtonText}>Google ile Devam Et</Text>
                </TouchableOpacity>

                {/* Email Login Button */}
                <TouchableOpacity style={styles.emailOutlineButton} onPress={() => setShowEmailForm(true)}>
                  <Text style={styles.emailOutlineButtonText}>E-posta ile Devam Et</Text>
                </TouchableOpacity>

                <Text style={styles.termsText}>
                  Devam ederek kullanıcı sözleşmesini ve kvkk şartlarını kabul etmiş olursunuz.
                </Text>
              </View>
            </View>
          ) : (
            /* Elegant Slide-up Email Form View */
            <View style={styles.formCard}>
              <TouchableOpacity style={styles.backButton} onPress={() => setShowEmailForm(false)}>
                <Text style={styles.backButtonText}>← Geri</Text>
              </TouchableOpacity>

              <Text style={styles.brandTitleForm}>PEONY</Text>
              <Text style={styles.loginHeader}>{isSignUp ? 'Yeni Hesap Oluştur' : 'Giriş Yap'}</Text>
              <Text style={styles.loginDescription}>
                {isSignUp ? 'Peony Collective ailesine katılın.' : 'Lütfen bilgilerinizi girerek devam edin.'}
              </Text>

              {isSignUp && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>AD SOYAD</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Ahmet Canlı"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-POSTA</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="email@peonycollective.com"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
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
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handleAuth} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
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
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F1016',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  backgroundOverlay: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: COLORS.overlay,
  },
  container: {
    flex: 1,
  },
  storyProgressContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 25,
    left: 15,
    right: 15,
    flexDirection: 'row',
    zIndex: 200,
    justifyContent: 'space-between',
  },
  storyProgressBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginHorizontal: 3,
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  storyProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: height * 0.1,
    paddingBottom: 40,
  },
  topLogo: {
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '300',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    letterSpacing: 10,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: 9,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 6,
    letterSpacing: 3,
  },
  onboardingSection: {
    marginTop: 'auto',
  },
  serifIntro: {
    fontSize: 36,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'normal',
  },
  subIntro: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 35,
    paddingHorizontal: 15,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  googleButtonText: {
    color: '#1F2937',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  emailOutlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  emailOutlineButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  termsText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 25,
    lineHeight: 16,
  },
  /* Form Sheet styles */
  formCard: {
    backgroundColor: 'rgba(19, 20, 26, 0.95)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  brandTitleForm: {
    fontSize: 22,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: 8,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
  },
  loginHeader: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  loginDescription: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    height: 50,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1.5,
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
