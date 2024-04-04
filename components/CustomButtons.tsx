import React from 'react';
import {View, Button, Text, StyleSheet, Pressable} from "react-native";
import { CustButStyle } from '../styles/allStyles';

const CustomButton = ({onPress, text, width, height, color} : {onPress : any, text : any, width : any, height : any, color : any}) => {


  return (
    <Pressable 
      style={({pressed}) => [
        CustButStyle.button, {width: width, height: height, borderColor: color},
        pressed ? {...CustButStyle.buttonPressed, backgroundColor: color, shadowColor: color}  : null
      ]}
      onPress={onPress}
    >
      <Text style={CustButStyle.text}> {text} </Text>
    </Pressable>
  );

};

export default CustomButton;