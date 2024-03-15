import {View, Button, Text, StyleSheet, Pressable, Image} from "react-native";
import SectionButton from "./sectionButtons";




export default function FitnessScreen() {
    return(
        <View style={styles.container}>
            
            <View style={{...styles.buttonGroup, flexDirection: "row"}}>
                <Text> Fitness - Create and track activity levels</Text>
                <Text> This image is a representation of a section which displays programs</Text>
                <View style={{width:20}}></View>
                <SectionButton text="Home" width={70} height={50} color={"purple"} />
            </View>

            <Image 
            source={require("../Image/test.png")}
            style={{width: 300, height:350}}
            />
            
            <View style={{...styles.buttonGroup, flexDirection: "column"}}>
                {/* opens up a modal or other page to enter data*/}
                <SectionButton 
                text="+ Create Programe" 
                width={360} 
                height={45} 
                color={"purple"}/>
                    <View style={{height:30}}></View>
                
                {/* opens up a modal to see a flat list */}
                <SectionButton 
                text="Activity History" 
                width={360} 
                height={45} 
                color={"purple"}/>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "darkgrey"
    },
    buttonGroup: {
        margin: 100,
    },

})