import { View, Text, Button, TextInput ,SafeAreaView, StyleSheet} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import React from "react";

export default function ProgCreate({ navigation }) {
  const [entered, setEntered] = useState(false)
  const [text, onChangeText] = React.useState('');
    
  const valScheme = yup.object().shape({
    name: yup.string()
    .required("Enter a programme name")
    .min(3, "Name too short - 3 min")
    .max(20, "Name too large - 20 max"),
    duration: yup.number()
      .required("Enter a number")
      .min(1)
      .max(7),
  });


  /* 
  Once the thing is entered, display will change to screen where you choose exercises with new values, 

  */
  

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  return (

      
        <Formik
        initialValues={{name:"", duration:"1"}}
        onSubmit={((values, actions)=> {

        })}>
          <View style={{flex:1, alignItems: "flex-start", justifyContent: "centre"}}>
          
          <TextInput style={styles.input}
        onChangeText={onChangeText}
        value={text}/>

          <Button onPress={null} type="submit" title="Submit"/>
       
      

    





    {/*
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        
        <Text>Programme name</Text>
        <TextInput ></TextInput>

        <Text>Programme durartion</Text>
        <TextInput keyBoardType="numeric" 
        placeholder="0-12"
        onChangeText={(text)=>}></TextInput>

        <Button  onPress={() => navigation.goBack()} title="Dismiss" />
        
    */}
    
    </View>
        </Formik>



    );
  }
