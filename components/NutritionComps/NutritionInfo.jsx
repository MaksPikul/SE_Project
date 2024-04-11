import {View, Button, StyleSheet, Text} from 'react-native';
import { supabase } from '../../lib/supabase';

export default function NutritionInfo ({nutrition_info, getCaloriesMacros, hideNutrition, user_ID}) {

    

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    
      
    const addFood = async() => {
        const {error} = await supabase
        .from('calorie_log')
        .insert([
            {client_id: user_ID, calories: nutrition_info[0].calories, protein: nutrition_info[0].protein_g,
            carbs: nutrition_info[0].carbohydrates_total_g, fats: nutrition_info[0].fat_total_g, food_name: nutrition_info[0].name, 
            serving: nutrition_info[0].serving_size_g}
        ])

        await getCaloriesMacros();

        console.log("adding error", error)
        console.log("data after post",nutrition_info)

        hideNutrition();

    }

    return (
        nutrition_info && <View style={styles.nutrition_box}>

             <View style={styles.nutrition_info}>
                <Text style={styles.nutrition_text}>Item Name: {capitalizeFirstLetter(nutrition_info[0].name)}</Text>
                <Text style={styles.nutrition_text}>Calories: {nutrition_info[0].calories} cal</Text>
                <Text style={styles.nutrition_text}>Serving Size: {nutrition_info[0].serving_size_g} g</Text>
                <Text style={styles.nutrition_text}>Protein: {nutrition_info[0].protein_g} g</Text>
                <Text style={styles.nutrition_text}>Carbohydrates: {nutrition_info[0].carbohydrates_total_g} g</Text>
                <Text style={styles.nutrition_text}>Fat: {nutrition_info[0].fat_total_g} g</Text>
                <Text style={styles.nutrition_text}>Sugar: {nutrition_info[0].sugar_g} g</Text>
                <Text style={styles.nutrition_text}>Sodium: {nutrition_info[0].sodium_mg} mg</Text>
            </View>
            <Button
                title="Add Item"
                color={'#58a61c'}
                onPress={addFood}
            />
        </View>
    )

}

const styles = StyleSheet.create({

    nutrition_box: {
        borderBottomWidth:1,
        flexDirection: "row",
        alignItems:"center",
        justifyContent:'space-evenly',
    },
  
    nutrition_info: {
        padding:10,
        
    },

    nutrition_text: {
        fontSize: 16, 
        color: 'black',
        fontWeight: 'bold',
    }
})