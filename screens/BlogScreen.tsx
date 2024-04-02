
import React from "react";
import { NavigationContainer } from "@react-navigation/native/"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AmbassadorPostsScreen from "./AmbassadorPostsScreen";
import BlogPostForm from "../components/blogComps/BlogPostForm";


const Tab = createBottomTabNavigator()

export function BlogScreen(){
    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Blog Posts" component={AmbassadorPostsScreen}></Tab.Screen>
                <Tab.Screen name="Add New Post" component={BlogPostForm}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

