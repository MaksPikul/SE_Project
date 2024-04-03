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
                    
                    <Text>Copy from week:</Text>
                    {prog.weeks.map((week, weekIndex)=>{
                        if (week.days[0]){
                            return(
                               <TouchableOpacity
                                style={{backgroundColor: (week.id == copyFrom) ? "red" : "blue"}}
                                onPress={()=>{
                                    if (copyTo[week.id] === false) {
                                    setCopyFrom(week.id)
                                    }
                                }}>
                                
                                <Text>{"w"+(weekIndex+1)}</Text>
                               </TouchableOpacity>
                            )
                        }
                    })}

                    <Text>Copy to:</Text>
                    {prog.weeks.map((week, weekIndex)=>{
                        return(
                            <TouchableOpacity
                            style={{backgroundColor: copyTo[weekIndex] ? "red" : "blue"}} 
                            onPress={()=>{
                                updateCopyTo(weekIndex)
                            }}>
                                
                            <Text>{"w"+(weekIndex+1)}</Text>
                            </TouchableOpacity>   
                        )
                    })}
                    

                    <Text>.</Text>
                    <Button title="Copy" 
                    onPress={()=>{
                      handleCopying()
                      setCopyTo(new Array(prog.weeks.length).fill(false))
                      setCopyFrom(0)
                      handleModal()
                    }}/>

                    <Button title="Go back" onPress={()=>{
                        setCopyTo(new Array(prog.weeks.length).fill(false))
                        setCopyFrom(0)
                        handleModal()
                        }}/>

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