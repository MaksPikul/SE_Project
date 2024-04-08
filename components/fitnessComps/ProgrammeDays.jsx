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
import moment from 'moment';
import CustomButton from '../CustomButtons';
import { supabase } from '../../lib/supabase';

export const ProgrammeDays = ({ weekID }) => {
  const [days, setDays] = useState(0);
  const [exercises, setExercises] = useState([]);


  useEffect(() => {
    getDays();
    getExercises();
  }, []);

  // var day_id = null;
  // console.log("Here is weekID", weekID)
  async function getDays() {
    console.log('RAAAN HEREE');
    const { data, error } = await supabase.rpc('get_days', { weekid: weekID })
    // setDays(data);
    setDays(data[0].id);
    console.log("DayId in programmedays", data[0].id, days);
    // console.log("Testing new query", data, days);
      getExercises({day_id: data[0].id});
    // console.log("Exercises", exercises);
  }

  async function getExercises( {day_id} ) {
    console.log('ran', day_id);
    const { data, error } = await supabase
      .from('exercises')
      .select('name, reps, sets')
      .eq('day_id', day_id)
    setExercises(data);
    console.log(data, exercises);
  }

  return (
    <View style={{ marginVertical: 10, marginHorizontal: 15, alignSelf: "flex-start" }}>
      {exercises.map((exercise, dayIndex) => {
        return (
        <View>
          <Text style={{ ...styles.text, alignSelf: "baseline", borderBottomColor: "black", borderBottomWidth: 2 }}> {exercise['name']} </Text>
          {/* moment(day['day_date']).format('dddd') + " - " + */}
          {/* <Text style={{ ...styles.text, alignSelf: "baseline", borderBottomColor: "black", borderBottomWidth: 2 }}> {"1" + " - " + "TEST "} </Text> */}
        </View>
        ) 
      }
      )
      }
    </View>
  )

}

export default ProgrammeDays

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
    backgroundColor: "white",
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