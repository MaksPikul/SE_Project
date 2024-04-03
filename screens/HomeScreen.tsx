import {View, Text, StyleSheet , Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeButton from '../components/homeButton';
import { homeStyle } from "../styles/allStyles";
import { logout } from "../components/Logout";
import { useLogin } from "../context/loginProvider";

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
*/

export default function HomeScreen({}) {
    const {setIsLoggedIn} = useLogin();
    const navigation = useNavigation()
    console.log("Logout pressed")
    const handleLogout = async () => {
        await logout(); // Call the logout function
      };
    return(
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

            <CustomButton
            onPress={() => { handleLogout(), setIsLoggedIn(false)}}
            title="Logout"
            buttonStyle={homeStyle.button}
            textStyle={homeStyle.buttonText}
            />

        </View>

    )
}

