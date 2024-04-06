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

const ProgrammeDays = ({ weekID }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    getDays();
  }, []);

  console.log("Here is weekID", weekID)
  async function getDays() {
    const { data , error } = await supabase
      .from('fitness_day')
      .select('id, week_id, day_date, num_of_exercises, day_name')
      .eq('week_id', weekID)
    setDays(data);
    console.log(data);
  }

  return (
    <View style={{ marginVertical: 10, marginHorizontal: 15, alignSelf: "flex-start" }}>
      {days.map((day, dayIndex) => {
        return (
        <View>
          <Text style={{ ...styles.text, alignSelf: "baseline", borderBottomColor: "black", borderBottomWidth: 2 }}> {moment(day['day_date']).format('dddd') + " - " + day['day_name']} </Text>
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