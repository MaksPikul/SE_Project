import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './screens/login/WelcomeScreen';
import { SignupScreen } from './screens/login/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './screens/login/LoginScreen';

const loginScreens = {
    Welcome: {
        screen: WelcomeScreen,
        options: {headerShown: false},
    },
    Login: {
        screen: LoginScreen,
        options: {headerShown:true},
    },
    Signup: {
        screen: SignupScreen,
        options: {headerShown:true},
    }
}




const loginStack = createNativeStackNavigator()

const LoginLayout = () => {
    
    return(

        <NavigationContainer>
        <loginStack.Navigator>
            <loginStack.Group>
            {Object.entries(loginScreens).map(([name, { screen, options } ]) => (
                <loginStack.Screen key={name} name={name} component={screen} options={options}/>
            ))}</loginStack.Group>
        </loginStack.Navigator>
        </NavigationContainer>

    )
}




        


export default LoginLayout;