import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nnfjkauqghteqhbiqbzl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZmprYXVxZ2h0ZXFoYmlxYnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMDgwMTgsImV4cCI6MjA5MjY4NDAxOH0.EqEX3lIdCOZjyFFlS00BQOsAX-nBThlsj9kp00y2c8c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
