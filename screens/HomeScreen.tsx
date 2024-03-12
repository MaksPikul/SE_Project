import {View, Text, StyleSheet , Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from './CustomButton';



export default function HomeScreen({}) {
    const navigation = useNavigation()
    return(
        <View style={style.container}>

            <CustomButton
            onPress={() => navigation.navigate("Fitness")}
            title="Fitness, a pull down menu for profile and other things as a bar up top would be good, ill do that next, also need to get all the buttons closer to the top, if adding extra buttons, style must change"
            buttonStyle={style.button}
            textStyle={style.buttonText}
            />

            <CustomButton
            onPress={() => navigation.navigate("Nutrition")}
            title="Nutrition"
            buttonStyle={style.button}
            textStyle={style.buttonText}
            />

            <CustomButton
            onPress={() => navigation.navigate("Blog")}
            title="Blog"
            buttonStyle={style.button}
            textStyle={style.buttonText}
            />

        </View>

    )
}

const style = StyleSheet.create({
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

