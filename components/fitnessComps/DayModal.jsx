import { View, Text, Button, TextInput ,SafeAreaView, Keyboard, StyleSheet, Modal, Alert, ScrollView} from "react-native";
import React from "react";
import CustomButton from "../CustomButtons";
import { useState, useEffect } from "react";
import { LinkedList } from "../../jsFiles/LinkedList";
import { exercise } from "../../jsFiles/ProgObjs";

export function DayModal ({visible, handleModal, prog, setProg, indexs, addEx, remEx}) {
    const [exercs,setExecrs] = useState([{
        name:'Exercise',
        sets:0,
        reps:0
    }])

    const saveToObject=()=>{
        const updatedWeeks = [...prog.weeks];
        for (let i=0; i<updatedWeeks[indexs[0]].days[indexs[1]].exercises.length; i++){
        console.log(updatedWeeks[indexs[0]].days[indexs[1]].exercises[i])
        updatedWeeks[indexs[0]].days[indexs[1]].exercises[i].name = exercs[i].name
        updatedWeeks[indexs[0]].days[indexs[1]].exercises[i].sets = exercs[i].sets
        updatedWeeks[indexs[0]].days[indexs[1]].exercises[i].reps = exercs[i].reps
        }

        setProg({ ...prog, weeks: updatedWeeks });
    }

    const handleTextChange = (newText, index, property) => {
        const newInputValues = [...exercs]; // Copy the current state array
        newInputValues[index][property] = newText; // Update the specified property of the input at the specified index
        setExecrs(newInputValues); // Set the new state array
      };

      const addState = () => {
        setExecrs(prevState => [
          ...prevState,
          { 
            name:'',
            sets:'',
            reps:'' 
          }
        ]);
      };

      const remState = (exerciseIndex) => {
        setExecrs(prevState => {
            const updatedExerc = [...prevState];
            updatedExerc.splice(exerciseIndex, 1);
            return updatedExerc;
        });
};


    /*const updatedExerc = {...prog}
        updatedExerc.weeks[indexs[0]].days[indexs[1]].exercises[index] = exerc;
        setProg(updatedExerc) */
    // i need a save button which save
    //i need alert when going back saying, itll save what you have so far
  
    //i need to handleInput, object varaibles must change when typed in
    //exercIndex is the index of the exercise, to edit an exercise, fdind at that index

    return (
    <Modal
    visible={visible}
    animationType='slide'>

        <Button 
        title="go back" 
        onPress={() => {
        handleModal()
        }} />

        { visible ? (prog.weeks[indexs[0]].days[indexs[1]].exercises.map((exerc, exercIndex)=>{  
            let curNum = exerc.id
            return(
                <View style={{flexDirection: "row"}}>
                    <Text>{"Current name: " + exerc.name}</Text>
                    
                    <TextInput 
                    
                    placeholder={exerc.name}
                    onChangeText={(text)=>handleTextChange(text, exercIndex, "name")} 
                    style={{borderWidth: 1, borderColor: "black"}}/>

                    <TextInput
                    onChangeText={(text)=>handleTextChange(text, exercIndex, "sets")} 
                    style={{borderWidth: 1, borderColor: "black"}}/>

                    <TextInput    
                    onChangeText={(text)=>handleTextChange(text, exercIndex, "reps")} 
                    style={{borderWidth: 1, borderColor: "black"}}/>

                </View>
            )
        })
        
        
    
        
        ):(<View></View>)
        }

        

        <Button 
            title="+ add Exercise" 
            onPress={()=>{
                let num = prog.weeks[indexs[0]].days[indexs[1]].exercises.length
                if(num < 7){
                    console.log(num)
                    addEx(indexs[0], indexs[1], new exercise(num, "Exercise", 0, 0))
                    addState()
                }
        }}/>

        

        
        <Button
        title="save current"
        onPress={()=>{
            console.log("pressed")
            saveToObject()
        }}
        />
    </Modal>
    )
}
