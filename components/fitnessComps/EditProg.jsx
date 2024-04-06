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
import LinearGradient from 'react-native-linear-gradient';
import { supabase } from '../../lib/supabase';



//allow for copying, from 1, to many, will probably need a map, modal comes up
//finalise will check if weeks are empty and alert if is empty
//modal for editing, day modal probably

export function EditProg({prog, setProg}) {
  const [editVisible, setEditVisible] = useState(false)
  const [copyVisible, setCopyVisible] = useState(false)
  const [indexs, setIndexs] = useState([0,0])
  const [postedProgramme, setPostedProgramme] = useState([]);
  const [postedWeeks, setPostedWeeks] = useState([]);

  // useEffect(() =>{
  //   addProgramme();
  // })

  const scrollX = useRef(new Animated.Value(0)).current;
  const {width: windowWidth} = useWindowDimensions();

  //slide index for week
  let curWeek;
  var currentUserId = '2810f3cd-4e04-44b7-9a19-2405fcec8684'

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
    // console.log(prog);
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

  const addProgramme = async () => {
    const {data, error} = await supabase
    .from('fitness_programmes')
    .insert([
      {name: prog.name, made_by: currentUserId, weeks: prog.weeks.length}
    ])
    .select()
    setPostedProgramme(data);
    // console.log("Posting error", data);
    // console.log(postedProgramme);
    // console.log(data);
    console.log("Here is this", prog.weeks[0]['name']);
    var week_num = prog.weeks.length;
    console.log('ran', week_num);
    setTimeout(() => { console.log('1 second passed'); }, 1000);
    for (let i = 0; i < week_num; i++) {
      console.log(postedProgramme);
      const {data1, error1} = await supabase
      .from('fitness_week')
      .insert([
        {programme_id: postedProgramme[0].id, week_number: prog.weeks[i].id + 1}
      ])
      .select()
      setPostedWeeks(data1);
      console.log("data1", data1);
    }
  }

  console.log(prog);

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

                <View style={{width: windowWidth, height: 620,}} key={weekIndex}>
                    <View style={styles.progContainer}>
                     
                    
                        <View style={{...styles.textContainer}}>
                        <LinearGradient
                          colors={['blue', 'navy']}>
                            <Text style={{...styles.text, color:"white"}}> Programme name: {prog.name}</Text>
                            <Text style={{...styles.text, color:"white"}}> Duration: {prog.duration} weeks</Text>
                            
                            <Text style={{...styles.text,color:"white",  alignSelf:"center", margin: 10}}> Week {(weekIndex+1)}</Text>
                            </LinearGradient>
                        </View>
                    
                  
                        
                        <ScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false} 
              style={epStyles.days}>
                            { week.days.map((day, dayIndex) => {
                              return (

                                  <View style={epStyles.day}>
  
                                      <Text>{day.name}</Text>
                                      {day.exercises.map((exer, exerIndex)=>{
                                      return(
                                      <View style={epStyles.dayInfo}>
                                        <Text>{"Name: " +exer.name}</Text>
                                        <Text>{"Sets:" + exer.sets}</Text>
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
                                          color={"navy"}/>
                                        
                                          <View style={{marginHorizontal:10}}/>

                                          <CustomButton
                                          onPress={()=>{removeDayFromWeek(weekIndex, dayIndex)}}
                                          text={"-remove"}
                                          width={70}
                                          height={40}
                                          color={"navy"}/>
                                        
                                      </View>
                                  </View>
                            )})}
                        </ScrollView>

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
              color={"navy"}/>

            <View style={{marginHorizontal:10}}/>

            <CustomButton
              onPress={()=>handleCopyModal()}
              text={"copy weeks"}
              width={100}
              height={50}
              color={"navy"}/>
            <View style={{marginHorizontal:10}}/>
            {/* console.log(...prog); */}
            <CustomButton
              onPress={addProgramme}
              text={"✔ finalize"}
              width={100}
              height={50}
              color={"navy"}/>
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
    backgroundColor: "navy"
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
    borderColor: "navy",
    backgroundColor: "white",
    width:320,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 10,
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
    marginTop: 550,
    marginBottom:15
    
  },
  progContainer: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'scroll',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:"white",

  },
  textContainer: {
    height: 100,
    width: 400,
    backgroundColor:"navy",
    
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
