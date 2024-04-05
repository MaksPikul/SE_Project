import { useState } from "react";
import {View, Text, StyleSheet, TextInput, Button, ScrollView} from "react-native";
import Search from '../components/NutritionComps/Search'
import NutritionInfo from "../components/NutritionComps/NutritionInfo";
import { AnimatedCircularProgress } from "react-native-circular-progress";


export default function CalorieTracker() {

    const [input, setInput] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    
    const [totalCalories, addTotalCalories] = useState(0);
    const [totalProtein, addTotalProtein] = useState(0);
    const [totalCarbohydrates, addTotalCarbohydrates] = useState(0);
    const [totalFat, addTotalFat] = useState(0);

    const [item, addItem] = useState([]);

    const addMacros = (cal, pro, carb, fat) => {
      addTotalCalories(totalCalories + cal)
      addTotalProtein(totalProtein + pro)
      addTotalCarbohydrates(totalCarbohydrates + carb)
      addTotalFat(totalFat + fat)

    }

    const addTotalItem = (item_serving) => {
      addItem([...item, item_serving])
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
          setNutritionData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

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
                addMacros = {addMacros}
                addTotalItem = {addTotalItem}
              />
            )}

            <Text style= {{textAlign:'center', color:'black', fontWeight:'bold'}}>Daily Caloric Intake</Text>

            <View style={styles.calories}>
              <AnimatedCircularProgress
                size={170}
                width={10}
                fill={(totalCalories/2000)*100}
                tintColor="#58a61c"
                backgroundColor="#d0f0c0"
                style={{padding:10}}>
                {
                  () => (
                    <View style={styles.tracker}>
                      <Text style={styles.trackerTopText}>
                        {2000 - Math.round(totalCalories) + ' cals'}
                      </Text>
                      <Text style={styles.trackerBottomText}>
                        {'Remaining'}
                      </Text>
                    </View>
                  )
                }
                
              </AnimatedCircularProgress>
              <View style={styles.macros}>
                <Text>Total Calories: {totalCalories} cal</Text>
                <Text>Total Protein: {totalProtein} g</Text>
                <Text>Total Carbohydrates: {totalCarbohydrates} g</Text>
                <Text>Total Fat: {totalFat} g</Text>
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
              {item.map((foodItem, index) => (
                <Text key={index}>{foodItem}</Text>
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