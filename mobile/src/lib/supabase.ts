import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://nnfjkauqghteqhbiqbzl.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZmprYXVxZ2h0ZXFoYmlxYnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMDgwMTgsImV4cCI6MjA5MjY4NDAxOH0.EqEX3lIdCOZjyFFlS00BQOsAX-nBThlsj9kp00y2c8c';

// Custom fetch using XHR to bypass Expo dev client network interceptor bug
const customFetch = (url: RequestInfo | URL, options?: RequestInit): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const urlString = typeof url === 'string' ? url : url.toString();
    xhr.open(options?.method || 'GET', urlString);
    
    if (options?.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => xhr.setRequestHeader(key, value));
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => xhr.setRequestHeader(key, value));
      } else {
        Object.entries(options.headers).forEach(([key, value]) => xhr.setRequestHeader(key, value as string));
      }
    }

    xhr.onload = () => {
      let responseData = xhr.responseText;
      resolve({
        ok: xhr.status >= 200 && xhr.status < 300,
        status: xhr.status,
        statusText: xhr.statusText,
        json: () => Promise.resolve(responseData ? JSON.parse(responseData) : null),
        text: () => Promise.resolve(responseData),
        blob: () => Promise.resolve(new Blob([xhr.response])),
        arrayBuffer: () => Promise.resolve(xhr.response),
        headers: new Headers(),
      } as unknown as Response);
    };
    
    xhr.onerror = () => reject(new Error('XHR Network Error'));
    xhr.ontimeout = () => reject(new Error('XHR Timeout'));
    xhr.timeout = 30000;
    
    xhr.send((options?.body as any) || null);
  });
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    fetch: customFetch,
  }
});
