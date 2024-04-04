import {View, Button, StyleSheet, Text} from 'react-native';

export default function NutritionInfo ({nutrition_info}) {

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    return (
        <View style={styles.nutrition_box}>

             <View style={styles.nutrition_info}>
                <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold'}}>Item Name: {capitalizeFirstLetter(nutrition_info[0].name)}</Text>
                <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold' }}>Calories: {nutrition_info[0].calories} cal</Text>
                <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold' }}>Serving Size: {nutrition_info[0].serving_size_g} g</Text>
                <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold' }}>Protein: {nutrition_info[0].protein_g} g</Text>
                <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold' }}>Carbohydrates: {nutrition_info[0].carbohydrates_total_g} g</Text>
                <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold'}}>Fat: {nutrition_info[0].fat_total_g} g</Text>
                <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold' }}>Sugar: {nutrition_info[0].sugar_g} g</Text>
                <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold'}}>Sodium: {nutrition_info[0].sodium_mg} mg</Text>
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
        
    }
})