import React, {useEffect, useRef, useState} from 'react';
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
import { supabase } from '../../lib/supabase';
import { useLogin } from '../../context/loginProvider';
// import React, {useEffect, useState} from "react";


/* thinking about program layout

let program = {
  name: "12 week leg session",
  Desc: "training legs",
  weeks:week[
    day[
      exercises[{
        monday: "legs", 
        wednesday: "more legs",
        friday: "calves ONLY",
        saturday: "legs"
    }]
    ]
  ]
}
*/

// example data
let progName = "Maxwell's lifts"
let week = 2
let day = "monday"
// let exercises = ["legs", "legs", "more legs", "legs"]

export const ProgDisplayer = () => {

  const [exercises, setExercises] = useState([]);
  

  

  useEffect(() => {
    getExercise();
  }, []);

  async function getExercise({uid}) {


      try {
           // Assuming useLogin provides uid
  
          if (!uid) {
              throw new Error('UID is not available.');
          }
  
          const { data, error } = await supabase.rpc('get_fitness_data', {
              uid
          });
  
          if (error) {
              console.error('Error fetching exercise data:', error.message);
          } else {
              console.log('Exercise data:', data);
              Copy
  
            setExercises(data);
            console.log(data)
            const arrayWeekNum = exercises.map(week => <Text>{week.week_number}</Text>);
            console.log('week_number', arrayWeekNum)
                      // Do something with the retrieved data
          }
      } catch (error) {
          console.error('Error:', error.message);
      }
  }
  
  
  

  const progs = new Array(4).fill(
    "program: 8hr arm work out"
  );

  const scrollX = useRef(new Animated.Value(0)).current;
  const {width: windowWidth} = useWindowDimensions();


  return (
  <SafeAreaView style={{...styles.container, marginVertical: 50}}>
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

        { exercises.map((prog, progIndex) => {
          return (
        <View style={{width: windowWidth, height: 390}} key={progIndex}>

          <View style={styles.progContainer}>

            <View style={{...styles.textContainer}}>
                <Text style={styles.text}>
                  {/*'Image - ' + imageIndex*/}
                  {progName}
                </Text>
                <Text style={styles.text}>
                  {"week " + week + " - " + day} 
                </Text>
                <Text style={styles.text}>
                  {"Exercise"}
                </Text>
            </View>


            <View style={{marginVertical: 10, marginHorizontal: 15, alignSelf: "flex-start"}}>
              { exercises.map((exercise, exIndex) => {
            return (
              <View>
                <Text style={{...styles.text,alignSelf:"baseline",borderBottomColor: "black", borderBottomWidth:2}}> {exIndex + " - " + exercise['exercise_name']} </Text>
              </View>
            )})}
            </View>

            <View style={{marginTop: 90}}>

            <CustomButton 
                    onPress={null}
                    text="Start Tracking!" 
                    width={260} 
                    height={45} 
                    color={"navy"}/>
            </View>
          

            <View style={styles.indicatorContainer}>
            
          

          {exercises.map((prog, progIndex) => {
            const width = scrollX.interpolate({
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
        </View>
            


            
          </View>
        </View>
        )})}
            
          </ScrollView>
    </View>



  </SafeAreaView>
)}


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
    backgroundColor:"#f5f5f5",

  },
  textContainer: {
    height: 100,
    width: 400,
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