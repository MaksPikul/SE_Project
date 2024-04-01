import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Button,
  Animated,
  useWindowDimensions,
} from 'react-native';
import CustomButton from '../CustomButtons';
import { useState, useEffect } from 'react';
import { LinkedList } from '../../jsFiles/LinkedList';
import { programme, week, day, exercise } from '../../jsFiles/ProgObjs';
import { DayModal } from './DayModal';



//allow for copying, from 1, to many, will probably need a map, modal comes up
//finalise will check if weeks are empty and alert if is empty
//modal for editing, day modal probably

export function EditProg({prog, setProg}) {
  const [visible, setVisible] = useState(false)
  const [indexs, setIndexs] = useState([0,0])

  const scrollX = useRef(new Animated.Value(0)).current;
  const {width: windowWidth} = useWindowDimensions();

  //slide index for week
  let curWeek;

  const removeDayFromWeek = (weekIndex, dayIndex) => {
    const updatedWeeks = [...prog.weeks];
    updatedWeeks[weekIndex].days.splice(dayIndex, 1);
    setProg({ ...prog, weeks: updatedWeeks });
  };

  const addDayToWeek = (weekIndex) => {
    const updatedWeeks = [...prog.weeks];
    let num = updatedWeeks[weekIndex].days.length
    updatedWeeks[weekIndex].days[num] = new day(num, "day "+(num+1));
    setProg({ ...prog, weeks: updatedWeeks });
  }

  const addExerciseToDay = (weekIndex, dayIndex, exercise) => {
    const updatedWeeks = [...prog.weeks];
    updatedWeeks[weekIndex].days[dayIndex].exercises.push(exercise);
    setProg({ ...prog, weeks: updatedWeeks });
  };

  // Function to remove an exercise from a specific day
  const removeExerciseFromDay = (weekIndex, dayIndex, exerciseIndex) => {
    const updatedWeeks = [...prog.weeks];
    updatedWeeks[weekIndex].days[dayIndex].exercises.splice(exerciseIndex, 1);
    setProg({ ...prog, weeks: updatedWeeks });
  };

  const handleModal = (wIndex, dIndex) =>{
    setIndexs([parseInt(wIndex), parseInt(dIndex)])
    console.log(indexs)
    setVisible(!visible)
  }

  return(
    <SafeAreaView style={{...styles.container, marginVertical: 50}}>
    
      <View style={styles.scrollContainer}> 
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={1}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ], { useNativeDriver: false })}>

            {prog.weeks.map((week, weekIndex) => {
              return(

                <View style={{width: windowWidth, height: 590}} key={weekIndex}>
                    <View style={styles.progContainer}>
                     
                        <View style={{...styles.textContainer}}>
                            <Text style={styles.text}> Programme name: {prog.name} - Duration: {prog.duration} weeks</Text>
                            <Text style={styles.text}> Week {(weekIndex+1)}</Text>
                            <Text > {curWeek}</Text>
                        </View>
                  
                        
                        <View style={{marginVertical: 10, marginHorizontal: 15}}>
                            { week.days.map((day, dayIndex) => {
                              return (
                                  <View style={{backgroundColor: "red", color:"black"}}>
  
                                      <Text>{day.name}</Text>
                                      {day.exercises.map((exer, exerIndex)=>{
                                      return(<View><Text>{exer.name + exer.sets + exer.reps}</Text></View>)})
                                      }


                                      <View style={{flexDirection: "row"}}>
                                      <Button title={"edit day"} onPress={()=>{handleModal(weekIndex, dayIndex)}}/>
                                      <Button title={"remove day"} onPress={()=>{removeDayFromWeek(weekIndex, dayIndex)}}/>
                                      </View>
                                  </View>
                            )})}
                        </View>

                        

                    </View>
                </View>
              )
            })}
          </ScrollView>
          <Button 
                title="+ add day" 
                onPress={()=>{
                curWeek= Math.round(Animated.divide(scrollX, windowWidth).__getValue()) 
                if (prog.weeks[curWeek].days.length < 7){
                  addDayToWeek(curWeek)
                }
            }}/>

          <Button
            title="copy weeks"/>

          <Button
          title="finalize"/>
      </View>

      <DayModal
      visible={visible}
      handleModal={handleModal}
      prog={prog}
      setProg={setProg}
      indexs={indexs}
      addEx={addExerciseToDay}
      remEx={removeExerciseFromDay}
      />


    </SafeAreaView>

  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"red"
  },
  progContainer: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:"#FFFAF0",
    

  },
  textContainer: {
    height: 100,
    width: 300,
    backgroundColor:"white",
    borderBottomWidth: 2,
    borderBlockColor: "black"
  },
  text: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 30, 
    paddingTop: 5,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'purple',
    marginHorizontal: 4,
    margin: 4
    
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

{/*
                        
                        <View style={styles.indicatorContainer}>
                          {weeks.map((prog, progIndex) => {
                              width = scrollX.interpolate({
                              inputRange: [
                                windowWidth * (progIndex - 1),
                                windowWidth * progIndex,
                                windowWidth * (progIndex + 1),
                              ],
                              outputRange: [8, 16, 8],
                              extrapolate: 'clamp',
                            });
                            
                            
                            
                          return (
                              <Animated.View
                                key={progIndex}
                                style={[styles.indicator, {width}]}
                              />
                            );
                          })}
                        </View> */}