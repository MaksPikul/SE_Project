import React from 'react';
import {View, Button, Text, StyleSheet, Pressable} from "react-native";

const SectionButton = ({text, width, height, color}) => {

  const style = StyleSheet.create({
    button: {
      width: width,
      height: height,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: color,
      borderRadius: 7,
    },
    buttonPressed: {
      elevation: 10,
        shadowColor: 'purple',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      backgroundColor: 'purple',
      transform: [{ scale: 0.95 }]
    },
    text:{
      fontSize: 16
    }
  })



  return (
    <Pressable 
      style={({pressed}) => [
        style.button,
        pressed ? style.buttonPressed : null
      ]}

      //onPress={()}
    >
      <Text style={style.text}> {text} </Text>
    </Pressable>
  );

};






export default SectionButton;