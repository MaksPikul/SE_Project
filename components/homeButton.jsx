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



const HomeButton = ({ onPress, title, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
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

export default HomeButton;
