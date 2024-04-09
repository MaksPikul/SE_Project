import {View, Text, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeButton from '../components/homeButton';
import { homeStyle } from "../styles/allStyles";
import { logout } from "../components/Logout";
import { useLogin } from "../context/loginProvider";
import React from "react";
import LinearGradient from "react-native-linear-gradient";

/* 
For this page
    there will be a top section with a user icon saying hello name
*/

//Whoever is doing Home Screen, change the "HomeButton" component to fit ur needs,
//Ask about styling, idealy it will be 4 buttons split into 4 corners
//like a hot cross bun type beat, ya heard?
//Ask for help if neccessary

/*
For all sections,
    Default header has to go
    footer might be good
    allowing for scrolling would be good


    grey : #6b6b6b
    darker grey: #424242 66
*/

export default function HomeScreen({}) {


    const {setIsLoggedIn, name} = useLogin();
    const navigation = useNavigation()
    
    const handleLogout = async () => {
        console.log("Logout pressed")
        setIsLoggedIn(false)

        await logout(); // Call the logout function
      };
    return(
        


        <View style={homeStyle.container}>
        
        <View style={hStyles.container}>
        <View>
            <Text
            style={{
            backgroundColor: "navy",
            color:"white",
            paddingVertical:30,
            paddingHorizontal: 50,
            borderRadius:40,
            fontSize: 26,
            width: 300,
            textAlign:"center"

            }}>Hello {name}</Text>
        </View>
          

          <HomeButton
            onPress={() => navigation.navigate("Fitness")}
            title="Fitness"
            
            />

            <HomeButton
            onPress={() => navigation.navigate("Nutrition")}
            title="Nutrition"
            
            />

            <HomeButton
            onPress={() => navigation.navigate("Blog")}
            title="Blog"           
            
            />

            <HomeButton
            onPress={() => navigation.navigate("Leaderboard")}
            title="Leaderboard"           
            
          />
            <HomeButton
            onPress={handleLogout}
            title="Logout"


            />
        </View>

        
      </View>


    )
}

          




const hStyles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: "row",
    flexWrap:"wrap",
    justifyContent: "center",
    alignContent:"center",
    marginBottom:10,
    width:398
  }
})