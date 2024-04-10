import React, { useEffect, useRef, useState } from 'react';
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
import ProgrammeDays from './ProgrammeDays';
import { supabase } from '../../lib/supabase';
import { useLogin } from '../../context/loginProvider';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';



// let progName = "Maxwell's lifts"
// let week = 2
// let day = "monday"
// let exercises = ["legs", "legs", "more legs", "legs"]

export const ProgDisplayer = () => {

  const [exercises, setExercises] = useState([]);
  const [programmes, setProgrammes] = useState([]);
  // const [days, setDays] = useState([]);
  const [week, setWeek] = useState([]);

  const navigation = useNavigation()

  var user = 'd9fd43fd-39ce-4683-9cf5-d27ececcc2b5';

  useEffect(() => {
    // getExercise();
    getProgrammes();
    // getCurrentDay();
  }, []);

  // const { uid } = useLogin();

  // async function getExercise() {
  //   const { data } = await supabase.rpc('get_exercises')
  //   setExercises(data);
  //   // console.log(data);
  // }

  // async function getDays() {
  //   const { data } = await supabase.rpc('get_days', {weekID: 1})
  //   setDays(data);
  //   console.log(days);
  // }

  // async function getCurrentDay() {

  // }

  async function getProgrammes() {
    const { data } = await supabase.rpc('get_programmes', {userid: user})
    setProgrammes(data);
    console.log(data)
    // console.log("length of programmes", data.length);


    // console.log(data);
  }

  async function getDaysForDelete({week_id}) {
    const { data } = await supabase.rpc('get_days', {weekid: week_id})
    console.log("data in days delete", data);
    for (j = 0; j < data.length; j++) {
      console.log(data[j].id);
      getExercisesForDelete({day_id:data[j].id});
      const { error } = await supabase
      .from('fitness_day')
      .delete()
      .eq('id', data[j].id)

      console.log(error);
    }

    // if (data.length != 0) {

    //   for (j1 = 0; j1 < data.length; j1++) {

    //     const { error } = await supabase
    //     .from('fitness_day')
    //     .delete()
    //     .eq('id', data[j1].id)
    //   }

    // }
  }

  async function getExercisesForDelete({day_id}) {
    const { data, error } = await supabase.rpc('get_exercises', {dayid: day_id})
    console.log("data in exercises delete", data, error);
    
    if (data.length != 0 ) {
      for (k = 0; k < data.length; k++) {
        getSetsForDelete({exercise_id: data[k].id});
        console.log("seeing how things run", data);
        const { error } = await supabase
        .from('exercises')
        .delete()
        .eq('id', data[k].id)

        console.log(error);
      }
    }

    // if (data.length != 0 ) {

    //   for (k1 = 0; k1 < data.length; k1++) {
    //     const { error } = await supabase
    //     .from('exercises')
    //     .delete()
    //     .eq('id', data[k1].id)

    //     console.log(error);
    //   }

    // }

  }

  async function getSetsForDelete({exercise_id}) {
    const { data } = await supabase.rpc('get_sets', {exerciseid: exercise_id})
    console.log("data in sets delete", data, error);

    if (data.length != 0) {
      for (l = 0; l < data.length; l++) {
        const { error } = await supabase
        .from('sets')
        .delete()
        .eq('id', data[l].id)

        console.log(error);
      }
    }
  }

  async function deleteProgramme({prog}) {
    const { data } = await supabase.rpc('get_week', {programmeid: prog.programme_id})
    console.log("data in delete", data);
    for (i = 0; i < data.length; i++) {
      getDaysForDelete({week_id:data[i].week_id})
      const { error } = await supabase
      .from('fitness_week')
      .delete()
      .eq('id', data[i].week_id)
      console.log(error)
    }

    const { error } = await supabase
    .from('fitness_programmes')
    .delete()
    .eq('id', prog.programme_id)
    console.log(error)
  }

  // async function getWeek(week) {
  //   const { data, error } = await supabase
  //   .from('fitness_week')
  //   .select('id, programme_id', 'week_number', 'completed')
  //   .eq('name', week.number)

  //   setWeek(data);
  // }

  // const progs = new Array(4).fill(
  //   "program: 8hr arm work out"
  // );

  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();


  return (
    <SafeAreaView style={{ ...styles.container, marginVertical: 50 }}>
      {/*<Text style={{alignSelf:"flex-start"}}>Continue?</Text>*/}

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

          {programmes.map((prog, progIndex) => {
            console.log(progIndex)
            console.log(prog)
            return (
              <View style={{ width: windowWidth, height: 390 }} key={progIndex}>

                <View style={styles.progContainer}>

                  <View style={{ ...styles.textContainer }}>
                  <LinearGradient
                      colors={['blue', 'navy']}>
                    <Text style={{...styles.text, color: "white", fontSize:20,marginVertical:5}}>
                      {prog['name']}
                    </Text>
                    <Text style={{...styles.text, color: "white", fontSize:20, marginBottom:5}}>
                      {"Week " + prog['current_week']}
                      {/* + moment(prog['day_date']).format('dddd')}  */}
                    </Text>
                    <Text style={{...styles.text, color: "white", fontSize:16, marginBottom:5}}>Exercises for today:</Text>
                  </LinearGradient>

                  
                  </View>
                  
                  <ProgrammeDays weekID={prog.week_id}></ProgrammeDays>

                </View>
                <View style={{ marginTop: 0, flexDirection:"row", alignContent:"flex-end", alignSelf:"center"}}>
                    <CustomButton
                      onPress={()=>navigation.navigate("TrackScreen", {
                        programme: programmes[progIndex],
                        week: prog.week_id,
                      })}
                      text="Start Tracking!"
                      width={150}
                      height={45}
                      color={"navy"} />
                      <View style={{marginHorizontal:10}}/>
                      <CustomButton
                  onPress={() => {deleteProgramme({prog: prog})}}
                  text="Delete Programme"
                      width={150}
                      height={45}
                      color={"navy"} />
                  </View>


                  <View style={styles.indicatorContainer}>
                    {programmes.map((prog, progIndex) => {
                      const width = scrollX.interpolate({
                        inputRange: [
                          windowWidth * (progIndex - 1),
                          windowWidth * progIndex,
                          windowWidth * (progIndex + 1),
                        ],
                        outputRange: [9, 18, 9],
                        extrapolate: 'clamp',
                      });


                      return (
                        <Animated.View
                          key={progIndex}
                          style={[styles.indicator, { width }]}
                        />
                      );
                    })}
                  </View>
              </View>
            )
          })}

        </ScrollView>
      </View>



    </SafeAreaView>
  )
}


// i will put this into file when done

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progContainer: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#f5f5f5",

  },
  textContainer: {
    height: 100,
    width: 400,
    backgroundColor: "navy",
    

    
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
    backgroundColor: 'navy',
    marginHorizontal: 4,
    margin: 4

  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
})