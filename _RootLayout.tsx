import { NavigationContainer } from "@react-navigation/native";
import { PostsProvider } from "./components/blogComps/PostsContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import FitnessScreen from "./screens/FitnessScreens/FitnessScreen";
import {BlogScreen} from "./screens/BlogScreen";
import NutritionScreen from "./screens/NutritionScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import ProgCreate from "./screens/FitnessScreens/ProgCreate";
import ActivityHist from "./screens/FitnessScreens/ActivityHist";
import AmbassadorSection from "./components/blogComps/AmbassadorSection";
import LoginLayout from "./_LoginLayout";
import TrackScreen from "./screens/FitnessScreens/TrackScreen";
import { PropsWithChildren, useContext } from "react";
import { useLogin } from "./context/loginProvider";
import { StyleSheet, Text, View, useColorScheme , Button, Alert } from "react-native";
import { Colors } from "react-native-elements";
import React from "react";
import WaterScreen from "./screens/WaterScreen";



const fitOptions = {
    headerTintColor: "white",
    headerStyle:{ backgroundColor: "navy"},
    headerTitleAlign: "center",
    headerRight: ()=> <Button 
    title="Settings" 
    onPress={() => Alert.alert("love yourself")}/>}



const mainscreens = {
    Home: {
        screen: HomeScreen,
        options: {headerShown: false},
    },
    Login: {
        screen: LoginLayout,
        options: {undefined},
    },
    Fitness: {
        screen: FitnessScreen,
        options: fitOptions
    },
    Blog: {
        screen: BlogScreen,
        options: {undefined},
    },
    Nutrition: {
        screen: NutritionScreen,
        options: {undefined},
    },
    Leaderboard: {
        screen: LeaderboardScreen,
        options: {undefined},
    },
    Water: {
        screen: WaterScreen,
        options: {undefined},
    },
}

const subscreens = {
    ProgCreate: {
        screen: ProgCreate,
        options: fitOptions
    },
    ActivityHist: {
        screen: ActivityHist,
        options: fitOptions
    },
    TrackScreen: {
        screen: TrackScreen,
        options: fitOptions
    },
    Ambassador: {
        screen: AmbassadorSection,
        options: {undefined}
    },
}

const stack = createNativeStackNavigator()

const RootLayout = () => {
    
    return(
        <PostsProvider>
        <NavigationContainer>
        <stack.Navigator>
            <stack.Group>
            {Object.entries(mainscreens).map(([name, { screen, options } ]) => (
                <stack.Screen key={name} name={name} component={screen} options={options}/>
            ))}</stack.Group>
            <stack.Group>
            {Object.entries(subscreens).map(([name, { screen, options }]) => (
                <stack.Screen key={name} name={name} component={screen} options={options} />
            ))}</stack.Group>
        </stack.Navigator>
        </NavigationContainer>
      </PostsProvider>
    )
}




export default RootLayout;

