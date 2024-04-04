import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';


export const logout = async () => {
  try {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem('sessionData');
    console.log('User logged out successfully.');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
