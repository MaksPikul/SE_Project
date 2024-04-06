import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LoginTab, SignupTab } from './screens/login/LoginScreen';

const Tab = createMaterialTopTabNavigator();

const tabs = {
    Login: {
        tab: LoginTab
    },
    Signup: {
        tab: SignupTab
    },

}

const LoginLayout = () => {
    return(
    <NavigationContainer independent={true}>

        <Tab.Navigator>
        {Object.entries(tabs).map(([name, { tab }]) => (
            <Tab.Screen key={name} name={name} component={tab} />
            ))}
        </Tab.Navigator>

    </NavigationContainer>)
}





        


export default LoginLayout;