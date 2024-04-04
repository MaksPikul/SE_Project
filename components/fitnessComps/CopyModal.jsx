import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Modal,
  TouchableOpacity
} from 'react-native';
import CustomButton from '../CustomButtons';
import { useState } from 'react';

import { exercise } from '../../jsFiles/ProgObjs';

export function CopyModal ({visible, handleModal, prog, setProg, addDay, addEx }) {
    const [copyFrom, setCopyFrom] = useState(0)
    const [copyTo, setCopyTo] = useState(new Array(prog.weeks.length).fill(false)) //
    //im gonna need states for remembering which is chosen
    //only one and many to choose, without the one thats already chosen

    const updateCopyTo = (index) => {
        setCopyTo(prevState => {
            return prevState.map((value, i) => {
              if (i === index && i !=copyFrom) {
                return !value
              }
              return value
            })
          })
      }

    const handleCopying = () => {
      let daysToCopy = JSON.parse(JSON.stringify(prog.weeks[copyFrom].days));

      prog.weeks.map((week, weekIndex)=>{
        if (weekIndex != copyFrom && copyTo[weekIndex]){

          daysToCopy.map((day, dayIndex)=>{
            addDay(weekIndex)

              daysToCopy[dayIndex].exercises.map((exerc, exercIndex)=>{
                addEx(weekIndex, dayIndex,
                  new exercise(
                    dayIndex, 
                    exerc.name,
                    exerc.sets,
                    exerc.reps
                    ))
              })
          })
          prog.weeks[weekIndex].days  
        }
      })

      
      setProg(prog)
    }

    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}>

            <View style={copyStyle.modalContainer}>
                <View style={copyStyle.modalContent}>
                    
                    <Text style={copyStyle.text}>Copy from week:</Text>
                    <View style={{flexDirection: "row", justifyContent:"center"}}>
                    {prog.weeks.map((week, weekIndex)=>{
                        if (week.days[0]){
                            return(
                               <TouchableOpacity
                                style={{opacity: (week.id == copyFrom) ?  1 : 0.4,
                                  ...copyStyle.button}}
                                onPress={()=>{
                                    if (copyTo[week.id] === false) {
                                    setCopyFrom(week.id)
                                    }
                                }}>
                                
                                <Text style={{color: "white", alignSelf:"center"}}>{"w"+(weekIndex+1)}</Text>
                               </TouchableOpacity>
                            )
                        }
                    })}
                    </View>

                    <Text style={copyStyle.text}>Copy to:</Text>
                    <View style={{flexDirection: "row", justifyContent:"center"}}>
                    {prog.weeks.map((week, weekIndex)=>{
                        return(
                            
                              <TouchableOpacity
                              style={
                                {opacity: copyTo[weekIndex] ? 1 : 0.4,
                                ...copyStyle.button}} 
                              onPress={()=>{
                                  updateCopyTo(weekIndex)
                              }}>
                                  
                              <Text style={{color: "white", alignSelf:"center"}}>{"w"+(weekIndex+1)}</Text>
                              </TouchableOpacity>   
                            
                        )
                    })}
                    </View>

                    <View style={copyStyle.group}>
                      <CustomButton
                      onPress={()=>{
                        handleCopying()
                        setCopyTo(new Array(prog.weeks.length).fill(false))
                        setCopyFrom(0)
                        handleModal()
                      }}
                      text={"Copy"}
                      width={140}
                      height={40}
                      color={"purple"}/>
                      <View style={{margin: 20}}/>
                      <CustomButton
                      onPress={()=>{
                        setCopyTo(new Array(prog.weeks.length).fill(false))
                        setCopyFrom(0)
                        handleModal()
                        }}
                      text={"Go back"}
                      width={140}
                      height={40}
                      color={"purple"}/>
                    </View>

                </View>
            </View>




        </Modal>
    )
}

const copyStyle = StyleSheet.create({
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
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    button:{
      backgroundColor: "purple",
      margin:5,
      height: 40,
      width: 50,
      borderWidth:2,
      borderColor: "purple",
      borderRadius: 5
    },
    text:{
      fontSize:16,
      color: "black"
    },
    modalContent: {
      backgroundColor: 'white',
      width: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
  });