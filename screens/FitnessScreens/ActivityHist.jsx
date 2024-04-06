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

  /*
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
      getHistory();
    }, []);

    async function getHistory() {
      console.log("getposts")
      const { data } = await supabase.rpc('get_history')
      setHistory(data);
      //console.log("History data", data)
    }

    const handleRefresh = () => {
      setHistory(true)
      getHistory()
      setRefreshing(false)
    }
    */
 


  return(
      <SafeAreaView style={styles.pageView}>
        <View>
        <FlatList
            data={posts} 
            renderItem={({item, index}) => (
              <>
                <RenderHist historyData = {item}/>
              </>
            )}
            keyExtractor={item => item.id.toFixed()}
            refreshing={refreshing}
            onRefresh={handleRefresh}/>

        </View>
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