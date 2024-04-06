import { View, Text, Button, TextInput ,SafeAreaView, Keyboard, StyleSheet, Modal, Alert, ScrollView} from "react-native";
import React from "react";
import CustomButton from "../CustomButtons";
import { useState, useEffect } from "react";

export function ExerciseModal ({visible, handleModal}) {
    const [exNum, setExNum] = useState(1)
    const [exercises, setExercises] = useState(["lol"])

    useEffect(()=>{
        setExercises(new Array(exNum).fill(""))
    }, [exNum])



    return (
        <Modal visible={visible}>
            <Button title="go back" onPress={() => {
                handleModal()
                setExNum(1)
                setExercises(["lol"])
                }} />

            {exercises.map((exercise, index)=>{
                return(
                    <View style={{flexDirection: "row"}}>
                        <TextInput keyboardType="numeric"/>
                    </View>
                )
            })}

            <Button 
            title="+ add exercise" 
            onPress={()=>{
                if(exNum <= 8){
                    setExNum(exNum+1)
                }
            }}/>
            <Button 
            title="save"/>
        </Modal>

    )
}