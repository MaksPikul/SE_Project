import { NavigationContainer } from "@react-navigation/native/"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalorieTracker from './CalorieTracker';
import Recipe from './RecipeScreen';

const Tab = createBottomTabNavigator()

export default function NutritionScreen(){
    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Calorie Tracker" options={{unmountOnBlur: true}} component={CalorieTracker}></Tab.Screen>
                <Tab.Screen name="Recipe" options={{unmountOnBlur: true}} component={Recipe}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}