import { View, Text, Button, TextInput ,SafeAreaView, Keyboard, StyleSheet, Modal, Alert, ScrollView} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";
import React from "react";
import CustomButton from "../CustomButtons";
import { ExerciseModal } from "./ExerciseModal";


export function EditProg({name, duration, entered, ll, setLinkedList}) {
  const [weeks, setWeeks] = useState(new Array(parseInt(duration)).fill(5))
  const [visible, setVisible] = useState(false)

  const handleModal = () => {
    setVisible(!visible)
  }

  return(
    
    <View>
      <Text>{name + " " + duration}</Text>


      {weeks.map((week, index)=>{
        return(
          <View>
            <Text>{"week " + (index+1).toString()}</Text>

            <View>{
              ll.dataAt(index).next? 
              (<><Text>{ll.dataAt(index).element}</Text></>) 
              : 
              (<Text>currently empty</Text>)
            }</View>


            <Button title="edit this week" onPress={() => {
            handleModal()
            }} />

          </View>)}
        )
      }
          <ExerciseModal 
          visible={visible}
          handleModal={handleModal}/>

          <CustomButton
            onPress={()=>{handleSubmit()}}
            text={"Finalize Programme"}
            width={300}
            height={30}
            color={"purple"}/>

    </View>
    
)}