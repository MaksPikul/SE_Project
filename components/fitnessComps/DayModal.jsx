import { View, Text, Button, TextInput ,SafeAreaView, Keyboard, StyleSheet, Modal, Alert, ScrollView} from "react-native";
import React from "react";
import CustomButton from "../CustomButtons";
import { useState, useEffect } from "react";
import { LinkedList } from "../../jsFiles/LinkedList";
import { exercise } from "../../jsFiles/ProgObjs";

export function DayModal ({visible, handleModal, prog, setProg, indexs, addEx, remEx}) {
    const [exerc,setExecrs] = useState({
        name:'',
        sets:'',
        reps:''
    })

    const handleInputChange = (key, val, index) => {
        setExecrs({ ...exerc, [key]: val });
        const updatedExerc = {...prog}
        updatedExerc.weeks[indexs[0]].days[indexs[1]].exercises[index] = exerc;
        setProg(updatedExerc)

    }

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
            return(
                <View style={{flexDirection: "row"}}>
                    <Text>{"Current name: " + exerc.name}</Text>
                    
                    <TextInput 
                    onChangeText={(a)=> handleInputChange("name", a, exercIndex)} 
                    style={{borderWidth: 1, borderColor: "black"}}/>

                    <TextInput
                    onChangeText={(b)=> handleInputChange("sets", b, exercIndex)} 
                    style={{borderWidth: 1, borderColor: "black"}}/>

                    <TextInput    
                    onChangeText={(c)=> handleInputChange("reps", c, exercIndex)} 
                    style={{borderWidth: 1, borderColor: "black"}}/>

                    <Button 
                    title="remove Exercise"
                    onPress={()=> {
                        remEx(indexs[0], indexs[1], exercIndex)}}/>

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
                }
        }}/>

        

        

        <Button
        title="save current"
        onPress={()=>{
            
        }}
        />
    </Modal>
    )
}
