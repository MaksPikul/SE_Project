import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, ScrollView, Alert} from "react-native";
import Search from '../components/NutritionComps/Search'
import NutritionInfo from "../components/NutritionComps/NutritionInfo";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { supabase } from "../lib/supabase";


export default function CalorieTracker() {


    var currentUserId = '54d2b68a-4eb6-45f9-9c17-98711ffd3324'

    const [input, setInput] = useState('');

    const [nutritionData, setNutritionData] = useState(null);
    
    const [caloriesMacros, setCaloriesMacros] = useState([]);

    const [showNutrition, setShowNutrition] = useState(true);

    const hideNutrition = () => {
      setShowNutrition(false)
    }

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
          if (data && data.length > 0) {
            setNutritionData(data);
            setShowNutrition(true);
          } else {
              Alert.alert('Invalid Item', 'Please try again with a valid item.');
              setNutritionData(null);
              setShowNutrition(false);
          }
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

    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const calculateTotalMacros = () => {
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFat = 0;

      if (caloriesMacros !== null) {
        caloriesMacros.forEach(foodItem => {
            totalCalories += foodItem.calories;
            totalProtein += foodItem.protein;
            totalCarbs += foodItem.carbs;
            totalFat += foodItem.fats;
        });
      }
    
      return {
          totalCalories,
          totalProtein,
          totalCarbs,
          totalFat,
      };
    };

    const totalMacros = calculateTotalMacros();

    const removeItem = async () => {
      try {

          const recentId = caloriesMacros[caloriesMacros.length -1].itemid;

          await supabase
              .from('calorie_log')
              .delete()
              .eq('id', recentId)
          
          await getCaloriesMacros();
          
      } catch (error) {
          console.error('Error: ', error)
      }
    }

    return(
        <ScrollView style={styles.container}>
            <Search 
              input={input}
              setInput={setInput} 
              fetchData={fetchData} 
              placeholder={"Enter Food or Drink"}
              showButton={true}
              buttonName={"Search"}
              buttonColor={'#58a61c'}
            />
            
            {nutritionData !== null && showNutrition && (
              <NutritionInfo 
                nutrition_info={nutritionData}
                getCaloriesMacros={getCaloriesMacros}
                hideNutrition = {hideNutrition}
              />
            )}

            <Text style= {{textAlign:'center', color:'black', fontWeight:'bold'}}>Daily Caloric Intake</Text>

            <View style={styles.calories}>
              <AnimatedCircularProgress
                size={170}
                width={10}
                fill={(Math.round(totalMacros.totalCalories)/2000)*100}
                tintColor="#58a61c"
                backgroundColor="#d0f0c0"
                style={{padding:10}}>
                {
                  () => (
                    <View style={styles.tracker}>
                      <Text style={styles.trackerTopText}>
                        {2000 - Math.round(totalMacros.totalCalories) + ' cals'}
                      </Text>
                      <Text style={styles.trackerBottomText}>
                        {'Remaining'}
                      </Text>
                    </View>
                  )
                }
                
              </AnimatedCircularProgress>

              <View style={styles.macros}>
                  <Text>Target Calories: 2000 cal</Text>
                  <Text>Total Calories: {(totalMacros.totalCalories).toFixed(1)} cal</Text>
                  <Text>Total Protein: {totalMacros.totalProtein.toFixed(1)} g</Text>
                  <Text>Total Carbohydrates: {totalMacros.totalCarbs.toFixed(1)} g</Text>
                  <Text>Total Fat: {totalMacros.totalFat.toFixed(1)} g</Text>
              </View>

            </View>
            <Button
                title="Remove Item"
                color={'#58a61c'}
                onPress={() => removeItem()}
            />
            <Text 
              style= {{textAlign:'center', 
                      color:'black', 
                      fontWeight:'bold'}}>
              Daily Diet
            </Text>
            <View style={styles.food}>
                {caloriesMacros.map((foodItem, index) => (
                    <View key={index} style={styles.foodItem}>
                        <Text
                          style = {styles.foodText}>
                          {foodItem.serving}g  {capitalizeFirstLetter(foodItem.food_name)}
                        </Text>
                        <Text style = {styles.foodText}>
                          {Math.round(foodItem.calories)} cal
                        </Text>
                    </View>
                ))}
            </View>
            
        </ScrollView>
    )

}

const styles = StyleSheet.create({

    calories: {
      flexDirection:"row",
      alignItems:'center',
    },

    tracker :{
      left:9,
      top:9,
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
        marginRight:10,
        marginTop:10,
    },

    foodItem:{
      flexDirection:'row',
      justifyContent:'space-between'
    },

    foodText:{
      fontSize:20,
    },

    macros: {
        marginRight:40,
        marginLeft:5,
    },
});