import {View, Text, StyleSheet , Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeButton from '../components/homeButton';
import { homeStyle, logoutButton } from "../styles/allStyles";
import { logout } from "../components/Logout";
import { useLogin } from "../context/loginProvider";
import React from "react";
import CustomButton from "../components/CustomButtons";

export default function HomeScreen() {
    const navigate = useNavigation();

//Whoever is doing Home Screen, change the "HomeButton" component to fit ur needs,
//Ask about styling, idealy it will be 4 buttons split into 4 corners
//like a hot cross bun type beat, ya heard?
//Ask for help if neccessary

    return (
        <View style={{ flex: 1 }}>
            {/* Main content with buttons */}
            <ScrollView contentContainerStyle={homeStyle.container}>
                <CustomButton
                    onPress={() => navigate.navigate('FitnessScreen')} // Corrected
                    title="Fitness"
                    buttonStyle={homeStyle.button}
                    textStyle={homeStyle.buttonText}
                />

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
        <Text>Hello {name}</Text>

            
       
        <View style={homeStyle.container}>

          <HomeButton
            onPress={() => navigation.navigate("Fitness")}
            title="Fitness"
            buttonStyle={homeStyle.button}
            textStyle={homeStyle.buttonText}
            />

            <HomeButton
            onPress={() => navigation.navigate("Nutrition")}
            title="Nutrition"
            buttonStyle={homeStyle.button}
            textStyle={homeStyle.buttonText}
            />

            <HomeButton
            onPress={() => navigation.navigate("Blog")}
            title="Blog"
            buttonStyle={homeStyle.button}
            textStyle={homeStyle.buttonText}
            />

            <HomeButton
            onPress={() => navigation.navigate("Leaderboard")}
            title="Leaderboard"
            buttonStyle={homeStyle.button}
            textStyle={homeStyle.buttonText}
          />
        </View>
            <HomeButton
            onPress={handleLogout}
            title="Logout"
            buttonStyle={homeStyle.button}
            textStyle={homeStyle.buttonText}
            />
        
      </View>

    )
}

const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 75,
    },
    button: {
        width: 400,
        height: 150,
        backgroundColor: "black",
        
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 16

    }
    
})
