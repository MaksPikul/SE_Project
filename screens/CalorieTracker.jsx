import { useState } from "react";
import {View, Text, StyleSheet, TextInput, Button, ScrollView} from "react-native";
import Search from '../components/NutritionComps/Search'
import NutritionInfo from "../components/NutritionComps/NutritionInfo";


export default function CalorieTracker() {

    const [input, setInput] = useState('');
    const [nutritionData, setNutritionData] = useState(null);

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
            />
            
            {nutritionData && (<NutritionInfo nutrition_info={nutritionData} />)}

            <Text style= {{textAlign:'center', color:'black', fontWeight:'bold'}}>Daily Caloric Intake</Text>

            <View style={styles.diet}>
              <ScrollView style={styles.food}>
                <Text>Food1</Text>
                <Text>Food2</Text>
                <Text>Food3</Text>
                <Text>Food4</Text>
                <Text>Food5</Text>
                <Text>Food6</Text>
                <Text>Food7</Text>
                <Text>Food8</Text>
                <Text>Food9</Text>
                <Text>Food10</Text>
                <Text>Food11</Text>
                <Text>Food12</Text>
              </ScrollView>
              <View style={styles.macros}>
                <Text>Total Calories: </Text>
                <Text>Total Protein: </Text>
                <Text>Total Carbohydrates: </Text>
                <Text>Total Fat: </Text>
              </View>
            </View>
            <Button
                title="Remove Item"
                color={'#58a61c'}
            />
        </ScrollView>
    )

}

const styles = StyleSheet.create({

    diet: {
      flexDirection:"row",
      justifyContent:"space-between",
      marginTop:10,
      padding:15,
      maxHeight:200,
      borderBottomWidth:1,
      alignItems:'center',
    },

    food:{
        marginLeft:10,

    },

    macros: {
        marginRight:40,
        marginLeft:10,
    },
});