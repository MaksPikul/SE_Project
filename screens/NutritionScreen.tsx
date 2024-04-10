import { NavigationContainer } from "@react-navigation/native/"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalorieTracker from './CalorieTracker';
import React from "react";
import Water from './WaterScreen';
import RecipePostScreen from "./RecipePostScreen";
import SavedRecipes from "./SavedRecipes";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";

import AmbassadorPostsScreen from "./AmbassadorPostsScreen";
import BlogPostForm from "../components/blogComps/BlogPostForm";
import SavedPostsScreen from "./SavedPostsScreen";


const Tab = createBottomTabNavigator()

export default function NutritionScreen(){

    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    return(
        session ? (
        <NavigationContainer independent={true}>
            
            <Tab.Navigator>

                {session && session.user && <Tab.Screen name="Calorie Tracker" options={{unmountOnBlur: true}} 
                children={()=><CalorieTracker user_ID={session.user.id}></CalorieTracker>}></Tab.Screen>}

                {session && session.user && <Tab.Screen name="Water" options={{unmountOnBlur: true}} 
                children={()=><Water user_ID={session.user.id}></Water>}></Tab.Screen>}

                {session && session.user && <Tab.Screen name="Recipe" options={{unmountOnBlur: true}} 
                children={()=><RecipePostScreen user_ID={session.user.id}></RecipePostScreen>}></Tab.Screen>}

                {session && session.user && <Tab.Screen name="Saved Recipes" options={{unmountOnBlur: true}} 
                children={()=><SavedRecipes user_ID={session.user.id}></SavedRecipes>}></Tab.Screen>}

            </Tab.Navigator>
           
        </NavigationContainer>
        ) : null
    )
}

