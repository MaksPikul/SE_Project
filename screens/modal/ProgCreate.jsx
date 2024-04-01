import { View, Text, Button, TextInput ,SafeAreaView, Keyboard, StyleSheet, Modal, Alert, ScrollView} from "react-native";
import {useState, useEffect } from "react";
import React from "react";
import { LinkedList, Node } from "../../jsFiles/LinkedList";
import CustomButton from "../../components/CustomButtons";
import { NameDurationInput } from "../../components/fitnessComps/nameAndDuration";
import { EditProg } from "../../components/fitnessComps/EditProg";
import { programme , week, day } from "../../jsFiles/ProgObjs";


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
            prog={prog}
            setProg={setProg}/>
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