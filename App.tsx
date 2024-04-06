/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { NavigationContainer } from "@react-navigation/native/"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useEffect, type PropsWithChildren, useState} from 'react';
import { Button, Modal } from 'react-native';
import { Alert } from 'react-native';

import RootLayout from "./_RootLayout";




import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './lib/supabase';
import LoginProvider from "./context/loginProvider";
import MainLayout from "./_MainLayout";







function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const stack = createNativeStackNavigator()

  const commonFit = 
  {headerTintColor: "white",
  headerTitleAlign: "center",
  headerStyle:{ 
    backgroundColor: "navy"}
  }
  
  
  //for now show header
  //login page should be first with a conditional to check cookies (saving log in)
  //first is home for now
  return (
    <LoginProvider>

        <MainLayout />

    </LoginProvider>
  );
}





export default App;
