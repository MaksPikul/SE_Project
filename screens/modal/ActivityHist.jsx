import { View, Text, Button } from "react-native";

export default function ActivityHist({ navigation }) {

  /* 
    Fetch request for completed days

    flat list to display
  */


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    );
  }