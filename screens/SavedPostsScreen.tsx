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

const SavedPostsScreen = () => {
    const [savedPosts, setSavedPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    
    useEffect(() => {
        getSavedPosts();
    }, []);

    async function getSavedPosts() {
        const {data, error} = await supabase.rpc('get_saved_blogposts', {activeuserid: '54d2b68a-4eb6-45f9-9c17-98711ffd3324'})
        setSavedPosts(data);
        console.log("saved posts", data)
        console.log("error", error)
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
                  <RenderPost blog_post = {item }></RenderPost>
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