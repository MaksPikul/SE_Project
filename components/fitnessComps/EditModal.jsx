import { View, Text, Button, TextInput ,SafeAreaView, Keyboard, StyleSheet, Modal, Alert, ScrollView} from "react-native";
import React from "react";
import CustomButton from "../CustomButtons";
import { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { exercise } from "../../jsFiles/ProgObjs";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function EditModal ({visible, handleModal, prog, setProg, indexs, addEx, remEx}) {
    const [exercs,setExecrs] = useState([{
        name:'Exercise',
        sets:0,
        reps:0
    }])
    const [date, setDate] = useState("Monday")
    const [saved, setSaved] = useState(false)

      const daysOweek = [
        {title:"Monday"},
        {title:"Tuesday"},
        {title:"Wednesday"},
        {title:"Thursday"},
        {title:"Friday"},
        {title:"Saturday"},
        {title:"Sunday"},
      ]


    const saveToObject=()=>{
        const updatedWeeks = [...prog.weeks];
        for (let i=0; i<updatedWeeks[indexs[0]].days[indexs[1]].exercises.length; i++){
        console.log(updatedWeeks[indexs[0]].days[indexs[1]].exercises[i])
        updatedWeeks[indexs[0]].days[indexs[1]].exercises[i].name = exercs[i].name
        updatedWeeks[indexs[0]].days[indexs[1]].exercises[i].sets = exercs[i].sets
        updatedWeeks[indexs[0]].days[indexs[1]].exercises[i].reps = exercs[i].reps
        }
        updatedWeeks[indexs[0]].days[indexs[1]].name = date
        let currentIndex = daysOweek.findIndex((day) => day.title === date);
        let nextIndex = (currentIndex + 1) % daysOweek.length;
        setDate(daysOweek[nextIndex].title);

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
            name:'Exercise',
            sets:0,
            reps:0 
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
        
        const handleInput = (v) => {
            setDate(v)
          }


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
    animationType='fade'
    transparent={true}>


    <View style={editStyle.modalContainer}>
        <View style={editStyle.modalContent}>

        <View style={editStyle.element}>
        <CustomButton
            onPress={() => {
                if (!saved){
                    Alert.alert("Exercises have not been saved, save before continuing")
                }
                else{
                    handleModal()
                }
            setSaved(false)
            }}
            text={"go back"}
            width={140}
            height={40}
            color={"navy"}/>
        </View>
        {/*
        <View style={editStyle.inputs}>
            <Text>Change name of day</Text>
            <TextInput
            value={dayName}
            onChangeText={(text)=>setDayName(text)}
            style={{borderWidth: 1, borderColor: "black"}}/>
        </View>
        */}
        
        <Text>Change name of day</Text>
        <SelectDropdown
                    data={daysOweek}
                    onSelect={(selectedItem,index)=>{
                        handleInput(String(selectedItem.title))
                    }}

                    buttonTextAfterSelection={(selectedItem) => {
                        return selectedItem;
                    }}

                    value={date}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                        <View style={pCreate.dropButton}>
                            <Text style={pCreate.text}>
                            {(selectedItem && selectedItem.title) || ''}
                            </Text>
                        </View>
                        )
                    }}

                    renderItem={(item, index, isSelected) => {
                        return (
                        <View style={{...pCreate.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                            <Icon name={item.icon} style={pCreate.dropdownItemIconStyle} />
                            <Text style={pCreate.dropdownItemTxtStyle}>{item.title}</Text>
                            <Icon name={item.icon} style={pCreate.dropdownItemIconStyle} />
                        </View>
                        );
                    }} 
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={pCreate.dropdownMenuStyle}
                    />

        { visible ? (prog.weeks[indexs[0]].days[indexs[1]].exercises.map((exerc, exercIndex)=>{  
            
            return(
                <View style={{...editStyle.inputs, flexDirection: "row", justifyContent: "space-evenly"}}>
                     
                    <Text>{"Name: "}</Text>
                    
                    <TextInput
                    maxLength={15}
                    value={exercs[exercIndex].name}
                    placeholder={exerc.name}
                    onChangeText={(text)=>handleTextChange(text, exercIndex, "name")} 
                    style={{borderWidth: 1, borderColor: "black", width:95, marginHorizontal: 5}}/>

                    <Text>{"Sets: "}</Text>
                    <TextInput 
                    keyboardType="numeric"
                    maxLength={2}
                    value={exercs[exercIndex].sets.toString()}
                    onChangeText={(text)=>handleTextChange(text, exercIndex, "sets")} 
                    style={{borderWidth: 1, borderColor: "black", marginHorizontal: 10}}/>
                    <Text>{"Reps: "}</Text>
                    <TextInput 
                    keyboardType="numeric"
                    maxLength={2}
                    value={exercs[exercIndex].reps.toString()}
                    onChangeText={(text)=>handleTextChange(text, exercIndex, "reps")} 
                    style={{borderWidth: 1, borderColor: "black", marginHorizontal: 10}}/>
                    
                    <CustomButton
                    onPress={()=>{
                        remEx(indexs[0], indexs[1], exercIndex)
                        remState(exercIndex)}}
                    text={"- remove"}
                    width={70}
                    height={40}
                    color={"navy"}/>
                    
                </View>
            )
        })
    
        
        ):(<View></View>)
        }
        <View style={editStyle.group}>
            
            <CustomButton
                onPress={()=>{
                    let num = prog.weeks[indexs[0]].days[indexs[1]].exercises.length
                    if(num < 7){
                        console.log(num)
                        addEx(indexs[0], indexs[1], new exercise(num, "Exercise", 0, 0))
                        addState()
                    }
                }}
                text={"+ add Exercise" }
                width={140}
                height={40}
                color={"navy"}/>
            
                <View style={{margin: 20}}/>
            
            <CustomButton
                onPress={()=>{

                    saveToObject()
                    setSaved(true)
                }}
                text={"save current"}
                width={140}
                height={40}
                color={"navy"}/>
            
        </View>
                
                </View>
            </View>
    </Modal>
    )
}

const pCreate = StyleSheet.create({
    container: {
      alignContent:"center",
    },
    input: {
      height: 50,
      margin: 12,
      padding: 10,
      borderColor: "navy",
      borderWidth: 2,
      borderRadius:10,
    },
    text: {
      color: 'black',
      fontSize: 15,
      fontWeight: 'bold',
      paddingHorizontal: 30, 
      paddingTop: 5,
    },
    dropButton:{
      borderBlockColor: "navy",
      borderWidth: 2,
      borderRadius:10,
      height: 50,
      margin: 12,
      alignItems: "center"
    },
    dropdownItemStyle:{
      paddingHorizontal:50
    }
});

const editStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    group:{
        flexDirection: "row",
        justifyContent:"center",
        marginTop:15
    },
    element:{
        alignSelf: "center"
    },
    inputs:{
        borderColor: "navy",
        //borderWidth: 2,
        marginTop: 10
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
      backgroundColor: 'white',
      width: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      
    },
  });