import React, { useEffect, useState } from 'react';
import { 
  View, 
  FlatList, 
  Text,
  StyleSheet 
}  from 'react-native';
import { supabase } from '../lib/supabase';
import { RenderPost } from '../components/blogComps/RenderPost';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Session } from '@supabase/supabase-js';


const SavedPostsScreen = ({user_ID}) => {
    const [savedPosts, setSavedPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    

    useEffect(() => {
        getSavedPosts()
    }, []);



    async function getSavedPosts() {
      const {data, error} = await supabase.rpc('get_saved_blogposts', {activeuserid : user_ID})
      setSavedPosts(data);
      console.log("saved posts", data)
      console.log("error", error)
      console.log(user_ID)
  }



    const handleRefresh = () => {
        setSavedPosts([])
        getSavedPosts()
        setRefreshing(false)
    }

    return (
        <SafeAreaView style={styles.pageView}>
          <View>
            <FlatList
              data={savedPosts} 
              renderItem={({item, index}) => (
                <>
                  <RenderPost user_ID={user_ID} blog_post = {item }></RenderPost>
                </>
              )}
  
              
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          </View>
        </SafeAreaView>
      );
    };

export default SavedPostsScreen;

const styles = StyleSheet.create({
    pageView:{
      flex:1
    },
  })