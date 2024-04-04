import {View, ScrollView, Text, Button, StyleSheet} from "react-native";
import Search from '../components/NutritionComps/Search'
import { useState } from "react";

export default function RecipeScreen() {

    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState([]);

    return (
        <View>
            <Text style = {{textAlign:'center', fontSize:20}}>Create Recipe</Text>
            <Search 
                placeholder="Enter recipe name" 
                showButton={false}
                setInput={setRecipeName}
            />
            <Search
                placeholder="List the Ingredients and Amount"
                showButton={false}
                setInput={setIngredients}
                multi= {true}
                height={200}
            />
            <Button
                title="Create"
                color={'#58a61c'}
            />
            <Button
                title="View My Recipes"
                color={'#58a61c'}
            />
        </View>
    )
}

