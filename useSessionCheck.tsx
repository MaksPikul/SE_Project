import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './lib/supabase';
import { useLogin } from './context/loginProvider';

const useSessionCheck = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin()

  

  return isLoggedIn;
};

export default useSessionCheck;
