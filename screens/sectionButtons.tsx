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
    text:{
      fontSize: 16
    }
  })



  return (
    <Pressable 
      style={style.button}
    >
      <Text style={style.text}> {text} </Text>
    </Pressable>
  );

};






export default SectionButton;