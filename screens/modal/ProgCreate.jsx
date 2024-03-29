import { View, Text, Button, TextInput ,SafeAreaView, StyleSheet, Modal, Alert} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import React from "react";

export default function ProgCreate({ navigation }) {
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



  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  return (
  
    <View>
        <Text> Enter Program name</Text>
          <TextInput style={{...styles.input}}
          id="name"
          name="name"
          placeholder="My cool Programme"
          onChangeText={(text) => handleInput('name', text)}
          maxLength={20}
          value={data.name}/>


        <Text>Enter duration of programme (weeks)</Text>
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
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                )}
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || ''}
                </Text>
                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }} 
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
          />

        <Button onPress={() => handleSubmit()} type="submit" title="Submit"/>
    </View>


    );
  }


  