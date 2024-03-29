import { View, Text, Button, TextInput ,SafeAreaView, Keyboard, StyleSheet, Modal, Alert} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import React from "react";
import CustomButton from "../../components/CustomButtons";

export default function ProgCreate() {
  const [entered, setEntered] = useState(false)
  const [data, setData] = useState({
    name: '',
    duration: ''
  })

  const handleSubmit = () => {
    if (data.name === ''|| data.duration === ''){
      Alert.alert("Enter values")
    }
    else{
      console.log(data)
      Keyboard.dismiss()
      setEntered(true)

    }
  }

  const handleInput = (k, v) => {
    setData({...data, [k] : v})
  }

  const durationDrop = [
    {title:1},
    {title:2},
    {title:3},
    {title:4},
    {title:5},
    {title:6},
    {title:7},
    {title:8},
    {title:9},
    {title:10},
    {title:11},
    {title:12},
  ]

  /* 
  
  will need a conditional state, to display exercise choosing screen, 
  either modal or bottom
  im thinking flat list at bottom
  */



  return (
  
    <View style={pCreate.container}>

        <View style={{margin: 20}}>
        <Text style={pCreate.text}> Enter Program name</Text>
          <TextInput style={{...pCreate.input}}
          id="name"
          name="name"
          placeholder="My cool Programme"
          onChangeText={(text) => handleInput('name', text)}
          maxLength={20}
          value={data.name}/>


        <Text style={pCreate.text}>Enter duration of programme (weeks)</Text>
          <SelectDropdown 
          data={durationDrop}
          onSelect={(selectedItem,index)=>{
            console.log(selectedItem.title);
            handleInput('duration', String(selectedItem.title))
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          
          value={data.duration}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={pCreate.dropButton}>
                <Text style={pCreate.text}>
                  {(selectedItem && selectedItem.title) || ''}
                </Text>
                
              </View>
            );
          }}

          renderItem={(item, index, isSelected) => {
            return (
              <View style={{...pCreate.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                <Icon name={item.icon} style={pCreate.dropdownItemIconStyle} />
                <Text style={pCreate.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }} 
          showsVerticalScrollIndicator={false}
          dropdownStyle={pCreate.dropdownMenuStyle}
          />
        </View>

        <View>
          {(!entered ? (<View style={{alignSelf: "center"}}>
                <CustomButton
                onPress={()=>{handleSubmit()}}
                text={"Submit"}
                width={300}
                height={30}
                color={"purple"}/>
            </View>) : 
            
            (<Text>we can enter exercises!, add a component to save</Text>)

           )}
        </View>


    </View>


    );
  }


  const pCreate = StyleSheet.create({
    container: {
      
      alignContent:"center",
    },

    input: {
      height: 40,
      margin: 12,
      padding: 10,
      borderBlockColor: "purple",
      borderWidth: 2,
    },
    text: {
      color: 'black',
      fontSize: 15,
      fontWeight: 'bold',
      paddingHorizontal: 30, 
      paddingTop: 5,
    },
    dropButton:{
      borderBlockColor: "purple",
      borderWidth: 2,
      height: 40,
      margin: 12,
      alignItems: "center"
      
      
  }});