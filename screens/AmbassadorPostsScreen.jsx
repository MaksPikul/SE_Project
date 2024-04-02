import React, { useEffect, useState } from 'react';
import { 
  View, 
  FlatList, 
  Text,
  StyleSheet 
}  from 'react-native';
import { supabase } from '../lib/supabase';
import { RenderPost } from '../components/RenderPost';

import { usePosts } from '../components/PostsContext';


const AmbassadorPostsScreen = () => {
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      getPosts();
    }, []);

    async function getPosts() {
      console.log("getposts")
      const { data } = await supabase.rpc('get_blogposts')
      setPosts(data);
      console.log("blog data", data)
    }
  
    return (
      <FlatList
        data={posts} 
        renderItem={({item, index}) => (
          <>
            <RenderPost blog_post = {item }></RenderPost>
          </>
        )}

        keyExtractor={item => item.id.toFixed()}
      />
    );
  };
  

export default AmbassadorPostsScreen;
