import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image} from "react-native";
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import removeIcon from '../images/remove-icon.png'

export default function SavedRecipes() {

    const [recipes, setRecipes] = useState([]);

    var currentUserId = '2810f3cd-4e04-44b7-9a19-2405fcec8684'

    async function getRecipes() {
        const {data, error} = await supabase.rpc('get_recipes', {userid: currentUserId})
        setRecipes(data)
        console.log('getting recipes error', error)
        console.log('current recipes', data)
    }

    useEffect(() => {
        getRecipes()
    }, [])

    const removeRecipe = async (recipeId) => {
        try {

            await supabase
                .from('recipe')
                .delete()
                .eq('id', recipeId)
            
            await getRecipes();
            
        } catch (error) {
            console.error('Error: ', error)
            }
    }

    return(
        <ScrollView>
            {recipes.map((recipe, index) => (
                <View key={index} style={styles.recipeBox}>
                    <Text style={styles.recipeInfo}>
                        <Text style={{fontWeight:'bold',}}>Name:</Text> {recipe.name}
                    </Text>
                    <Text style={styles.recipeInfo}>
                        <Text style={{fontWeight:'bold',}}>Description:</Text> {recipe.description}
                    </Text>
                    <Text style={styles.recipeInfo}>
                        <Text style={{fontWeight:'bold',}}>Ingredients:</Text> {recipe.ingredients}
                    </Text>
                    <TouchableOpacity 
                        onPress={() => removeRecipe(recipe.id)}
                        style = {styles.remove}>
                        <Image
                            source={removeIcon}
                            style={{ width: 50, height: 50 }}
                        />

                    </TouchableOpacity>
                    

                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    recipeBox :{
        borderBottomWidth:1,
    },

    recipeInfo :{
        padding:10,
    },

    remove : {
        alignItems:'flex-end',
    }
});