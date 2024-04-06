import { useState, useEffect } from "react";
import {View, Text, StyleSheet, TextInput, Button, ScrollView} from "react-native";
import Search from '../components/NutritionComps/Search'
import NutritionInfo from "../components/NutritionComps/NutritionInfo";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { supabase } from "../lib/supabase";


export default function CalorieTracker() {


    var currentUserId = '54d2b68a-4eb6-45f9-9c17-98711ffd3324'

    const [input, setInput] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    
    const [caloriesMacros, setCaloriesMacros] = useState([]);

    const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api.api-ninjas.com/v1/nutrition?query=${input}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': '43/k77pdZGlSUxlMxcuAXA==PThyLYxZMDEQMJRd'
              }
            }
          );
          const data = await response.json();
          setNutritionData(data);
          console.log('nutrition data', nutritionData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    async function getCaloriesMacros() {
      const { data, error } = await supabase.rpc('get_calories_macros', {userid: currentUserId})
      setCaloriesMacros(data);
      console.log('calorie and macro data', data)
      console.log('getCaloriesMacros error',error)
    }

    useEffect(() => {
      getCaloriesMacros();
    }, []);

    return(
        <ScrollView style={styles.container}>
            <Search 
              setInput={setInput} 
              fetchData={fetchData} 
              placeholder={"Enter Food or Drink"}
              showButton={true}
              buttonName={"Search"}
              buttonColor={'#58a61c'}
            />
            
            {nutritionData &&  (
              <NutritionInfo 
                nutrition_info={nutritionData}
              />
            )}

            <Text style= {{textAlign:'center', color:'black', fontWeight:'bold'}}>Daily Caloric Intake</Text>

            <View style={styles.calories}>
              <AnimatedCircularProgress
                size={170}
                width={10}
                fill={(1600/2000)*100}
                tintColor="#58a61c"
                backgroundColor="#d0f0c0"
                style={{padding:10}}>
                {
                  () => (
                    <View style={styles.tracker}>
                      <Text style={styles.trackerTopText}>
                        {2000 - 1600 + ' cals'}
                      </Text>
                      <Text style={styles.trackerBottomText}>
                        {'Remaining'}
                      </Text>
                    </View>
                  )
                }
                
              </AnimatedCircularProgress>
              <View style={styles.macros}>
                <Text>Total Calories: cal</Text>
                <Text>Total Protein:  g</Text>
                <Text>Total Carbohydrates:  g</Text>
                <Text>Total Fat:  g</Text>
              </View>
            </View>
            <Button
                title="Remove Item"
                color={'#58a61c'}
            />
            <Text 
              style= {{textAlign:'center', 
                      color:'black', 
                      fontWeight:'bold'}}>
              Daily Diet
            </Text>
            <View style={styles.food}>
              <Text>{caloriesMacros}</Text>
              <Text>{caloriesMacros}</Text>
            </View>
            
        </ScrollView>
    )

}

const styles = StyleSheet.create({

    calories: {
      flexDirection:"row",
      alignItems:'center',
    },

    trackerTopText:{
      textAlign:'center',
      fontSize:26,
    },

    trackerBottomText:{
      textAlign:'center',
      fontSize:18,
    },

    food:{
        marginLeft:10,
        marginTop:10,
    },

    macros: {
        marginRight:40,
        marginLeft:5,
    },
});