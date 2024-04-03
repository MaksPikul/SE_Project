import {View, Text, StyleSheet , Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from '../components/homeButton';
import { homeStyle } from "../styles/allStyles";
import { logout } from "../components/Logout";
import { useLogin } from "../context/loginProvider";

/* 
For this page
    there will be a top section with a user icon saying hello name
*/


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

            <CustomButton
            onPress={() => navigation.navigate("Fitness")}
            title="Fitness"
            buttonStyle={homeStyle.button}
            textStyle={homeStyle.buttonText}
            />

            <CustomButton
            onPress={() => navigation.navigate("Nutrition")}
            title="Nutrition"
            buttonStyle={homeStyle.button}
            textStyle={homeStyle.buttonText}
            />

            <CustomButton
            onPress={() => navigation.navigate("Blog")}
            title="Blog"
            buttonStyle={homeStyle.button}
            textStyle={homeStyle.buttonText}
            />

            <CustomButton
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

