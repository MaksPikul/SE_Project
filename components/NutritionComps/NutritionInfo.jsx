import {View, Button, StyleSheet, Text} from 'react-native';

export default function NutritionInfo ({nutrition_info}) {

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    return (
        <View style={styles.nutrition_box}>

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