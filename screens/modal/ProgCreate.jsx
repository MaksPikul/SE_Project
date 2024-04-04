import { View, Text, Button, TextInput ,SafeAreaView, Keyboard, StyleSheet, Modal, Alert, ScrollView} from "react-native";
import {useState, useEffect } from "react";
import React from "react";
import { LinkedList, Node } from "../../jsFiles/LinkedList";
import CustomButton from "../../components/CustomButtons";
import { NameDurationInput } from "../../components/fitnessComps/NameDurationInput";
import { EditProg } from "../../components/fitnessComps/EditProg";
import { programme , week, day } from "../../jsFiles/ProgObjs";
import LinearGradient from "react-native-linear-gradient";


export default function ProgCreate() {
  const [entered, setEntered] = useState(false)
  const [data, setData] = useState({
    name: '',
    duration: '',
  })
  const [prog, setProg] = useState()


  const handleSubmit = () => {
    if (data.name === '' || data.duration === ''){
      Alert.alert("Enter values")
    }
    else{
      console.log(data)
      Keyboard.dismiss()
      let num = parseInt(data.duration,10)
      console.log(num)

      let newProg = new programme(data.name, parseInt(data.duration))
      newProg = addWeeks(newProg)
      console.log(newProg)
      setProg(newProg)
      setEntered(true)
    }
  }

    const addWeeks = (prog) =>{
      for (let i=0; i<data.duration; i++){

          prog.weeks[i] = new week(i, ("week " +(1+i)))
      }
    return prog
    }

  const handleInput = (k, v) => {
    setData({...data, [k] : v})
  }


  return (
    <ScrollView>
      {!entered ? (
        <View key="input-view" style={{alignContent:"center"}}>
          <NameDurationInput 
            handleInput={handleInput} 
            name={data.name}
            dur={data.duration}
          />
          <View style={{alignSelf:"center"}}>
            <CustomButton
              onPress={handleSubmit}
              text="Submit"
              width={300}
              height={50}
              color={"navy"}/>
              </View>
          </View>
        ) 
        :
        (
          <EditProg
            prog={prog}
            setProg={setProg}/>
        )
      }
      
        
    </ScrollView>
  )


}
