import {View, Text, StyleSheet, Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeButton from '../components/homeButton';
import { homeStyle } from "../styles/allStyles";
import { useLogin } from "../context/loginProvider";
import React from "react";
import { logout } from "../components/Logout";



/* 
For this page
    there will be a top section with a user icon saying hello name
*/

//Whoever is doing Home Screen, change the "HomeButton" component to fit ur needs,
//Ask about styling, idealy it will be 4 buttons split into 4 corners
//like a hot cross bun type beat, ya heard?
//Ask for help if neccessary

export default function HomeScreen({}) {


    const {setIsLoggedIn, name, setName, setPhone} = useLogin();
    const navigation = useNavigation()
    
    const handleLogout = async () => {
        console.log("Logout pressed")
        setIsLoggedIn(false)
        setName("");
        setPhone("")
        await logout(); // Call the logout function
      };
    return(
        


        <View style={homeStyle.container}>
        
        
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

            }}>Hello {name}!</Text>
        </View>
          
        <View style={hStyles.container}>
          <HomeButton
            onPress={() => navigation.navigate("Fitness")}
            title="Fitness"
            style={null}
            />

            <HomeButton
            onPress={() => navigation.navigate("Nutrition")}
            title="Nutrition"
            style={{backgroundcolor:"purple"}}
            
            />

            <HomeButton
            onPress={() => navigation.navigate("Blog")}
            title="Blog"
            style={{backgroundcolor:"purple"}}           
            
            />

            <HomeButton
            onPress={() => navigation.navigate("Leaderboard")}
            title="Leaderboard"           
            style={null}
          />

        
            </View>

            <Button
            onPress={handleLogout}
            title={"Logout"}   
            color={"navy"}        
            />


            



            


      </View>
      
      


    )
}

const hStyles = StyleSheet.create({
  container:{
    position: "relative",
    flex: 1,
    flexDirection: "row",
    flexWrap:"wrap",
    justifyContent: "center",
    alignContent:"center",
    marginBottom:5,
    width:398
  },
  containerLogout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  gradientButton: {
    borderRadius: 10,
    marginBottom: 10,
    width: '90%', // Make the buttons take full width
    height: 50, // Set a fixed height for the buttons
    justifyContent: 'center', // Center the button content vertically
    alignItems: 'center', // Center the button content horizontally
  },
  button: {
    paddingHorizontal:120,
    paddingVertical: 0,
    textAlign:"center",

  },
  buttonText: {
    color: "white", fontSize: 19


  },
})