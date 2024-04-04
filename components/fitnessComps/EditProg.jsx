import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Button,
  Animated,
  useWindowDimensions,
  FlatList
} from 'react-native';
import CustomButton from '../CustomButtons';
import { useState, useEffect } from 'react';
import { day } from '../../jsFiles/ProgObjs';
import { EditModal } from './EditModal';
import { CopyModal } from './CopyModal';



//allow for copying, from 1, to many, will probably need a map, modal comes up
//finalise will check if weeks are empty and alert if is empty
//modal for editing, day modal probably

export function EditProg({prog, setProg}) {
  const [editVisible, setEditVisible] = useState(false)
  const [copyVisible, setCopyVisible] = useState(false)
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

  const handleEditModal = (wIndex, dIndex) =>{
    setIndexs([parseInt(wIndex), parseInt(dIndex)])
    console.log(indexs)
    setEditVisible(!editVisible)
  }

  const handleCopyModal = () =>{
    setCopyVisible(!copyVisible)
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

                <View style={{width: windowWidth, height: 610}} key={weekIndex}>
                    <View style={styles.progContainer}>
                     
                        <View style={{...styles.textContainer}}>
                            <Text style={styles.text}> Programme name: {prog.name}</Text>
                            <Text style={styles.text}> Duration: {prog.duration} weeks</Text>
                            
                            <Text style={{...styles.text, alignSelf:"center", margin: 20}}> Week {(weekIndex+1)}</Text>
                            
                        </View>
                  
                        
                        <View style={epStyles.days}>
                            { week.days.map((day, dayIndex) => {
                              return (

                                  <View style={epStyles.day}>
  
                                      <Text>{day.name}</Text>
                                      {day.exercises.map((exer, exerIndex)=>{
                                      return(
                                      <View style={epStyles.dayInfo}>
                                        <Text>{"Exercise: " +exer.name}</Text>
                                        <Text>{"sets:" + exer.sets}</Text>
                                        <Text>{"Reps:" + exer.reps}</Text>
                                      </View>
                                      )})
                                      }


                                      <View style={epStyles.buttonGroup}>
                                        
                                        <CustomButton
                                          onPress={()=>{handleEditModal(weekIndex, dayIndex)}}
                                          text={"Edit day"}
                                          width={70}
                                          height={40}
                                          color={"purple"}/>
                                        
                                          <View style={{marginHorizontal:10}}/>

                                          <CustomButton
                                          onPress={()=>{removeDayFromWeek(weekIndex, dayIndex)}}
                                          text={"-remove"}
                                          width={70}
                                          height={40}
                                          color={"purple"}/>
                                        
                                      </View>
                                  </View>
                            )})}
                        </View>

                    </View>
                </View>
              )
            })}
          </ScrollView>
          </View>



          <View style={epStyles.buttonGroup}>
            
            <CustomButton
              onPress={()=>{
                curWeek= Math.round(Animated.divide(scrollX, windowWidth).__getValue()) 
                if (prog.weeks[curWeek].days.length < 7){
                  addDayToWeek(curWeek)
                }}}
              text={"+ add day"}
              width={100}
              height={50}
              color={"purple"}/>

            <View style={{marginHorizontal:10}}/>

            <CustomButton
              onPress={()=>handleCopyModal()}
              text={"copy weeks"}
              width={100}
              height={50}
              color={"purple"}/>
            <View style={{marginHorizontal:10}}/>
            <CustomButton
              onPress={null}
              text={"finalize"}
              width={100}
              height={50}
              color={"purple"}/>
          </View>


      

      <CopyModal
      visible={copyVisible}
      handleModal={handleCopyModal}
      prog={prog}
      setProg={setProg}
      addDay={addDayToWeek}
      addEx={addExerciseToDay}
      />

      <EditModal
      visible={editVisible}
      handleModal={handleEditModal}
      prog={prog}
      setProg={setProg}
      indexs={indexs}
      addEx={addExerciseToDay}
      remEx={removeExerciseFromDay}
      />
  
    </SafeAreaView>

  )
}


const epStyles = StyleSheet.create({
  buttonGroup:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button : {  
    margin: 20,
    backgroundColor: "purple"

  },
  days:{
    marginVertical: 10, 
    marginHorizontal: 15,
  },
  day:{
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 5,
    padding:5,
    borderColor: "purple",
    backgroundColor: "white",
    width:350
  },
  dayInfo: {
    flexDirection:"row",
    justifyContent: 'space-evenly'
  }
})





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 620,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  progContainer: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'scroll',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:"#D8BFD8",

  },
  textContainer: {
    height: 100,
    width: 300,
    backgroundColor:"white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20
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
