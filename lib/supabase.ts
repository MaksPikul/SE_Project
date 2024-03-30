import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://xomquffaqtoyydujacxp.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvbXF1ZmZhcXRveXlkdWphY3hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNzA0ODQsImV4cCI6MjAyNTc0NjQ4NH0.yqCrnL5Mwk06a0iW3c9Z8TCckKCnPvHBJ57aj3jcYZ8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})