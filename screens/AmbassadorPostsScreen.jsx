import React, { useEffect, useState } from 'react';
import { 
  View, 
  FlatList, 
  Text,
  StyleSheet 
}  from 'react-native';
import { supabase } from '../lib/supabase';
import { RenderPost } from '../components/blogComps/RenderPost';

import { usePosts } from '../components/blogComps/PostsContext';
import { SafeAreaView } from 'react-native-safe-area-context';


const AmbassadorPostsScreen = () => {

    const [currentUserID, setCurrentUserID] = useState('')

    async function getUserID() {
      const {data, error} = await supabase.auth.getUser()
      
      console.log("user id error", error)
      setCurrentUserID(data.user.id)
      console.log("user id", currentUserID)
      getPosts();
    }

    useEffect(() => {
      getUserID();
    }, []);

    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function getPosts() {
      console.log("getposts")
      const { data } = await supabase.rpc('get_blogposts')
      setPosts(data);
      
    }

    const handleRefresh = () => {
      setPosts(true)
      getPosts()
      setRefreshing(false)
    }
  
    return (
      <SafeAreaView style={styles.pageView}>
        <View>
          <FlatList
            data={posts} 
            renderItem={({item, index}) => (
              <>
                <RenderPost blog_post = {item} user_ID={currentUserID}></RenderPost>
              </>
            )}

            keyExtractor={item => item.id.toFixed()}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        </View>
      </SafeAreaView>
    );
  };
  
export default AmbassadorPostsScreen;

const styles = StyleSheet.create({
  pageView:{
    flex:1
  },
})