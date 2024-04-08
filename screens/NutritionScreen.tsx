import { NavigationContainer } from "@react-navigation/native/"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalorieTracker from './CalorieTracker';
import Recipe from './RecipeScreen';
import React from "react";
import Water from './WaterScreen';
import RecipePostScreen from "./RecipePostScreen";
import { StyleSheet } from "react-native";
import RecipeScreen from "./RecipeScreen";

const Tab = createBottomTabNavigator()

export default function NutritionScreen(){
    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Calorie Tracker" options={{unmountOnBlur: true}} component={CalorieTracker}></Tab.Screen>
                <Tab.Screen name="Water" options={{unmountOnBlur: true}} component={Water}></Tab.Screen>
                <Tab.Screen name="Recipe" options={{unmountOnBlur: true}} component={RecipePostScreen}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

