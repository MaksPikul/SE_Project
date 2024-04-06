// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// //this might need removing, and any instance of homeButton in homeScreen will 
// //be replaced with CustumButton

// const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => {
//   return (
//     <TouchableOpacity onPress={onPress} style={buttonStyle}>
//       <Text style={textStyle}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

//trial but check if it runs and it doesnt want to work for me 

import React from 'react';
import { View, Text, ScrollView,StyleSheet } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import CustomButton from '../components/homeButton';

export default function HomeScreen() {
    const navigate = useNavigation();

    const getUserName = () => {
        return "user"; // actual user's name
    };

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

                <CustomButton
                    onPress={() => navigate.navigate('NutritionScreen')}
                    title="Nutrition"
                    buttonStyle={homeStyle.button}
                    textStyle={homeStyle.buttonText}
                />

                <CustomButton
                    onPress={() => navigate.navigate('BlogScreen')}
                    title="Blog"
                    buttonStyle={homeStyle.button}
                    textStyle={homeStyle.buttonText}
                />

                <CustomButton
                    onPress={() => navigate.navigate('AmbassadorPostScreen')}
                    title="Ambassador"
                    buttonStyle={homeStyle.button}
                    textStyle={homeStyle.buttonText}
                />
                <CustomButton
                    onPress={() => navigate.navigate('FitnessPostScreen')}
                    title="Fitness"
                    buttonStyle={homeStyle.button}
                    textStyle={homeStyle.buttonText}
                />
                <CustomButton
                    onPress={() => navigation.navigate('SavedPostSCreen')}
                    title="Saved post"
                    buttonStyle={homeStyle.button}
                    textStyle={homeStyle.buttonText}
                />
                <CustomButton
                    onPress={() => navigation.navigate('RecipiepostScreen')}
                    title="Recipe"
                    buttonStyle={homeStyle.button}
                    textStyle={homeStyle.buttonText}
                />
            </ScrollView>

            {/* Footer */}
            <View style={homeStyle.footer}>
                <Text style={homeStyle.footerText}>Footer Content Here</Text>
            </View>
        </View>
    );
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
