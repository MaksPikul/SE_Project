import { View, Text, Button } from "react-native";
import { useState } from "react";

export default function ActivityHist({ navigation }) {
  const [loading, setLoading] = useState(true);


  /* 
    Fetch request for completed days

    flat list to display
  */


    return (
 
      <View>
        {loading ? (<Text> No History of Activity</Text>):(
          
          
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 30 }}>This is a modal!</Text>
              <Button onPress={() => navigation.goBack()} title="Dismiss" />
           </View>
          
          
          
          
          
          )}
      </View>


     
    );
  }