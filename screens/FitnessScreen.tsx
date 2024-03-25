import {View, Button, Text, StyleSheet, Pressable, Image, ScrollView} from "react-native";
import CustomButton from "../components/CustomButtons";
import { useNavigation } from "@react-navigation/native";
import { fitStyles } from "../styles/allStyles";



export default function FitnessScreen() {
    //might not need this, will be in the App file with customHeader
    const navigation = useNavigation()
    const goToHome = () => navigation.navigate("Home")

    return(


        <ScrollView>
        <View style={fitStyles.container}>



            {/* This thing acting as current header will be removed,
             i will make custom buttons for the header */}
            <View style={{...fitStyles.buttonGroup, flexDirection: "row"}}>
                <Text> Fitness - Create and track activity levels</Text>
                {/*<Text> This image is a representation of a section which displays programs</Text>*/}
                <View style={{width:20}}></View>
                <CustomButton onPress={goToHome} text="Home" width={70} height={50} color={"purple"} />
            </View>
             



            <Image 
            source={require("../images/test.png")}
            style={{width: 300, height:350}}
            />
            
            <View style={{...fitStyles.buttonGroup, flexDirection: "column"}}>
                {/* opens up a modal or other page to enter data*/}
                <CustomButton 
                onPress={null} //make a js file, otherwise it will be too complex
                //or just yeh make function in the above js section
                text="+ Create Programe" 
                width={360} 
                height={45} 
                color={"purple"}/>
                
                <View style={{height:30}}></View>
                
                {/* opens up a modal to see a flat list */}
                <CustomButton 
                onPress={null}
                text="Activity History" 
                width={360} 
                height={45} 
                color={"purple"}/>
            </View>
        </View>
        </ScrollView>
    )
}

