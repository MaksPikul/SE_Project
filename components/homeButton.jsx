import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//this might need removing, and any instance of homeButton in homeScreen will 
//be replaced with CustumButton

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};


export default CustomButton;