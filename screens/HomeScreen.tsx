import {View, Text, StyleSheet , Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from '../components/homeButton';
import { homeStyle } from "../styles/allStyles";

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
    const navigation = useNavigation()
    return(
        <View style={homeStyle.container}>

            <CustomButton
            onPress={() => navigation.navigate("Fitness")}
            title="Fitness, a pull down menu for profile and other things as a bar up top would be good, ill do that next, also need to get all the buttons closer to the top, if adding extra buttons, style must change"
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

        </View>

    )
}

