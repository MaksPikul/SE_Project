import { View, Text, Button, TextInput ,SafeAreaView, Keyboard, StyleSheet, Modal, Alert, ScrollView} from "react-native";
import {useState } from "react";
import React from "react";
import { LinkedList, Node } from "../../jsFiles/LinkedList";
import CustomButton from "../../components/CustomButtons";
import { NameDurationInput } from "../../components/fitnessComps/nameAndDuration";
import { EditProg } from "../../components/fitnessComps/EditProg";


export default function ProgCreate() {
  const [entered, setEntered] = useState(false)
  const [data, setData] = useState({
    name: '',
    duration: ''
  })
  const [ll, setLinkedList] = useState(new LinkedList())

  const handleSubmit = () => {
    if (data.name === '' || data.duration === ''){
      Alert.alert("Enter values")
    }
    else{
      console.log(data)
      Keyboard.dismiss()
      let num = parseInt(data.duration,10)

      //creates num amount of weeks, each week is linked list that holds amount of days
      for (let i=0; i<num; i++){
        ll.add(new LinkedList())
      }
      setLinkedList(ll)
      setEntered(true)
    }
  }

  const handleInput = (k, v) => {
    setData({...data, [k] : v})
  }
  

  return(
    <ScrollView>


      {!entered ? 
        (
          <>
            <NameDurationInput 
              handleInput={handleInput} 
              name={data.name}
              dur={data.duration}/>

            <CustomButton
              onPress={()=>{handleSubmit()}}
              text={"Submit"}
              width={300}
              height={30}
              color={"purple"}/>
          </>
        ) 
        :
        (
          <EditProg
            name={data.name}
            duration={data.duration}
            entered={entered}
            ll={ll}
            setLinkedList={setLinkedList}/>
        /* 
        handleSubmit={handleSubmit}
        weeks={weeks}*/
        )
      }
      
        
    </ScrollView>
  )


}

const pCreate = StyleSheet.create({
  container: {
    alignContent:"center",
  },

  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderColor: "purple",
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