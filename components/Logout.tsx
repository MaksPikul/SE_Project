import { Button } from 'react-native-elements';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const logout = async () => {

  try {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem('sessionData');
    await AsyncStorage.removeItem('name');
    

    console.log('User logged out successfully.');
  } catch (error) {
    console.error('Logout error:', error);
  }

  return(
    <Button title="Logout"/>
  );

};
