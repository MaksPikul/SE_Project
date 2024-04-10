//Code taken and adapted by Maks from AmbassadorPostsScreen.jsx and RenderPost.jsx
//both files originally written by --NAME--
import React, { useEffect, useState } from 'react';
import { 
  View, 
  FlatList, 
  Text,
  StyleSheet 
}  from 'react-native';
import { supabase } from '../../lib/supabase';
import { RenderHist } from '../../components/fitnessComps/RenderHist';
import { usePosts } from '../../components/blogComps/PostsContext';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ActivityHist() {

  // const { posts, refreshing, handleRefresh } = usePosts();

  
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
      getExercises();
    }, []);

    async function getExercises() {
      console.log("getposts")
      const { data, error } = await supabase
      .from("exercises")
      .select("id")
      .eq('completed', true)
      setExercises(data);
      console.log("History data", data, exercises, error)
      for (i = 0; i < data.length; i++) {
        getSets({exerciseID: data[i].id})
      }
    }

    console.log("outside function", exercises);

    async function getSets({exerciseID}) {
      const { data } = await supabase.rpc('get_sets_history', {exerciseid: exerciseID} )
      
      console.log("inside function", data);
      for (j = 0; j < data.length; j++) {
        setSets(s => [data[j], ...s]);
      }
    }

    console.log("outside function sets", sets);

    /*
    const handleRefresh = () => {
      setHistory(true)
      getHistory()
      setRefreshing(false)
    }
    */
 


  return(
      <SafeAreaView style={styles.pageView}>
        {sets.map((set, setIndex) => {
          return (
          <View style={{ flexDirection: "row", margin: 5 }}>

          <Text style={{ marginRight: 40, marginStart: 10 }}>{set.name}</Text>
          <Text style={{ marginRight: 60, }}>{set.reps_done.toString() + " reps"}</Text>

          <Text style={{ marginRight: 40, }}>{set.weight.toString() + " weight"}</Text>

          <Text ></Text>
      </View>
        )})}
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pageView:{
    flex:1
  },
})

  /*
      <View>
        {loading ? (<Text> No History of Activity</Text>):(

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 30 }}>This is a modal!</Text>
              <Button onPress={() => navigation.goBack()} title="Dismiss" />
           </View>
          )}
      </View>
      */