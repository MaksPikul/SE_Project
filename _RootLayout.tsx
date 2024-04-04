import { NavigationContainer } from "@react-navigation/native";
import { PostsProvider } from "./components/blogComps/PostsContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import FitnessScreen from "./screens/FitnessScreen";
import {BlogScreen} from "./screens/BlogScreen";
import NutritionScreen from "./screens/NutritionScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import ProgCreate from "./screens/modal/ProgCreate";
import ActivityHist from "./screens/modal/ActivityHist";
import AmbassadorSection from "./components/blogComps/AmbassadorSection";
import LoginLayout from "./_LoginLayout";
import { PropsWithChildren, useContext } from "react";
import { useLogin } from "./context/loginProvider";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Colors } from "react-native-elements";




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
        options: {undefined},
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
}

const subscreens = {
    ProgCreate: {
        screen: ProgCreate
    },
    ActivityHistory: {
        screen: ActivityHist
    },
    Ambassador: {
        screen: AmbassadorSection
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
            {Object.entries(subscreens).map(([name, { screen }]) => (
                <stack.Screen key={name} name={name} component={screen} />
            ))}</stack.Group>
        </stack.Navigator>
        </NavigationContainer>
      </PostsProvider>
    )
}




export default RootLayout;

