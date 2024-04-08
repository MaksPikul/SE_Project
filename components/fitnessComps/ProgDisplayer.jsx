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



let progName = "Maxwell's lifts"
let week = 2
let day = "monday"
// let exercises = ["legs", "legs", "more legs", "legs"]

export const ProgDisplayer = () => {

  const [exercises, setExercises] = useState([]);
  const [programmes, setProgrammes] = useState([]);
  // const [days, setDays] = useState([]);
  const [week, setWeek] = useState([]);

  const navigation = useNavigation()

  useEffect(() => {
    getExercise();
    getProgrammes();
  }, []);

  // const { uid } = useLogin();

  async function getExercise() {
    const { data } = await supabase.rpc('get_exercises')
    setExercises(data);
    // console.log(data);
  }

  // async function getDays() {
  //   const { data } = await supabase.rpc('get_days', {weekID: 1})
  //   setDays(data);
  //   console.log(days);
  // }

  async function getProgrammes() {
    const { data } = await supabase.rpc('get_programmes')
    setProgrammes(data);
    console.log(data);


    // console.log(data);
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
            console.log(programmes)
            return (
              <View style={{ width: windowWidth, height: 390 }} key={progIndex}>

                <View style={styles.progContainer}>

                  <View style={{ ...styles.textContainer }}>
                  <LinearGradient
                      colors={['blue', 'navy']}>
                    <Text style={{...styles.text, color: "white", fontSize:20,marginVertical:5}}>
                      {prog['name']}
                    </Text>
                    <Text style={{...styles.text, color: "white", fontSize:20, marginBottom:10}}>
                      {"Week " + prog['current_week']}
                      {/* + moment(prog['day_date']).format('dddd')}  */}
                    </Text>
                  </LinearGradient>
                  </View>

                  <ProgrammeDays weekID={prog.week_id}></ProgrammeDays>

                  <View style={{ marginTop: 90 }}>
                    <CustomButton
                      onPress={()=>navigation.navigate("TrackScreen")}
                      text="Start Tracking!"
                      width={260}
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