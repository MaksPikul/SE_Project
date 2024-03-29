/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from "@react-navigation/native/"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type {PropsWithChildren} from 'react';
import { Button } from 'react-native';
import { Alert } from 'react-native';

import FitnessScreen from './screens/FitnessScreen';
import HomeScreen from './screens/HomeScreen';
import BlogScreen from './screens/BlogScreen';
import NutritionScreen from './screens/NutritionScreen';
import CustomHeader from './components/CustomHeader';
import ProgCreate from './screens/modal/ProgCreate';
import ActivityHist from './screens/modal/ActivityHist';

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

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const stack = createNativeStackNavigator()
  
  //for now show header
  //login page should be first with a conditional to check cookies (saving log in)
  //first is home for now
  return (
      <NavigationContainer>                                      
        <stack.Navigator  initialRouteName='Home' screenOptions={{headerShown:true}}>
          {/* example of how header implementation may work, idk tho */}
          <stack.Group>
            <stack.Screen name="Home" component={HomeScreen} options={{headerTitleAlign:"center"}}/>
            {/* playing with header settings, seeing whats up */}
            <stack.Screen name="Fitness" component={FitnessScreen} options={{headerTintColor: "white", headerStyle:{ backgroundColor: "purple"},headerTitleAlign: "center", headerRight: ()=> <Button title="Settings" onPress={() => Alert.alert("kill yourself")}></Button>}}/>
            <stack.Screen name="Blog" component={BlogScreen} />
            <stack.Screen name="Nutrition" component={NutritionScreen} />
          </stack.Group>

          <stack.Group screenOptions={{ presentation: "modal" }}>
            <stack.Screen name="ProgCreate" component={ProgCreate}/>
            <stack.Screen name="ActivityHist" component={ActivityHist}/>
          </stack.Group>

        </stack.Navigator> 
      </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
