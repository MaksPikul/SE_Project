import { useState } from "react";
import {View, Text, StyleSheet, TextInput, Button, Image, ScrollView} from "react-native";


export default function NutritionScreen() {

    const [input, setInput] = useState('');
    const [nutritionData, setNutritionData] = useState(null);

    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
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
            <TextInput
                placeholder='Enter a food or drink'
                onChangeText={setInput}
                style ={styles.input}
            />
            <Button
                title="Search"
                onPress={fetchData}
                color={'#58a61c'}
            />
            {nutritionData && (
                <View style={styles.nutrition_box}>
                    {/*
                    <View>
                      <Image
                          source={{ uri: nutritionData.foods[0].photo.thumb }}
                          style={styles.nutrition_image}
                      />                    
                    </View>
                    */}
                    <View style={styles.nutrition_info}>
                      <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold'}}>Item Name: {capitalizeFirstLetter(nutritionData[0].name)}</Text>
                      <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold' }}>Calories: {nutritionData[0].calories} cal</Text>
                      <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold' }}>Serving Size: {nutritionData[0].serving_size_g} g</Text>
                      <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold' }}>Protein: {nutritionData[0].protein_g} g</Text>
                      <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold' }}>Carbohydrates: {nutritionData[0].carbohydrates_total_g} g</Text>
                      <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold'}}>Fat: {nutritionData[0].fat_total_g} g</Text>
                      <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold' }}>Sugar: {nutritionData[0].sugar_g} g</Text>
                      <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold'}}>Sodium: {nutritionData[0].sodium_mg} mg</Text>
                    </View>
                    <Button
                      title="Add Item"
                      color={'#58a61c'}
                    />
                </View>
            )}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style= {{textAlign:'center', color:'black', fontWeight:'bold'}}>Daily Caloric Intake</Text>
              <View style={styles.diet_container}>
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
              </View>
            </ScrollView>
            <View style={styles.recipe_container}>
              <Button
                title="Create Recipe"
                color={'#58a61c'}
              />
              <Button
                title="View My Recipes"
                color={'#58a61c'}
              />
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#e2ffe2',
    },


    input: {
        borderWidth:1,
        padding: 10,
        height: 40,
        margin: 12,
    },

    nutrition_box: {
      borderBottomWidth:1,
      flexDirection: "row",
      alignItems:"center",
      justifyContent:'space-evenly',
    },

    nutrition_image: {
      width:150,
      height:150,
      borderRadius:10,
      marginLeft:10,
    },

    nutrition_info: {
      padding:10,
      
    },
    recipe_container:{
      flexDirection:"row",
      justifyContent:'space-between',
      margin:15,
    },

    scrollViewContent: {
      flexGrow: 1,
    },

    diet_container: {
      height:100,
    }
});