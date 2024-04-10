
import React from "react";
import { NavigationContainer } from "@react-navigation/native/"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AmbassadorPostsScreen from "./AmbassadorPostsScreen";
import BlogPostForm from "../components/blogComps/BlogPostForm";
import SavedPostsScreen from "./SavedPostsScreen";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";

const Tab = createBottomTabNavigator()

export function BlogScreen(){

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
                
                
                {session && session.user && <Tab.Screen name="Blog Posts" options={{unmountOnBlur: true}} 
                children={()=><AmbassadorPostsScreen user_ID={session.user.id}></AmbassadorPostsScreen>}></Tab.Screen>}
                
                {session && session.user && <Tab.Screen name="Saved Posts" options={{unmountOnBlur: true}} 
                children={()=><SavedPostsScreen user_ID={session.user.id}></SavedPostsScreen>}></Tab.Screen>}

                {session && session.user && <Tab.Screen name="Post Blog" options={{unmountOnBlur: true}} 
                children={()=><BlogPostForm user_ID={session.user.id}></BlogPostForm>}></Tab.Screen>}
                
            </Tab.Navigator>
        </NavigationContainer>
        ) : null
    )
}

