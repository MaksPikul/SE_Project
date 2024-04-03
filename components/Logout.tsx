import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import { useLogin } from '../context/loginProvider';

export const logout =  async () => {
  const {setIsLoggedIn} = useLogin();
  try {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem('sessionData');
    console.log('User logged out successfully.');
    setIsLoggedIn(false);
    
    
  } catch (error) {
    console.error('Logout error:', error);
  }
};
