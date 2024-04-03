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
import { useContext } from "react";
import { useLogin } from "./context/loginProvider";




const mainscreens = {
    Home: {
        screen: HomeScreen
    },
    Login: {
        screen: LoginLayout
    },
    Fitness: {
        screen: FitnessScreen
    },
    Blog: {
        screen: BlogScreen
    },
    Nutrition: {
        screen: NutritionScreen
    },
    Leaderboard: {
        screen: LeaderboardScreen
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
            {Object.entries(mainscreens).map(([name, { screen }]) => (
                <stack.Screen key={name} name={name} component={screen} />
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

