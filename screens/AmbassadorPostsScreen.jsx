import React, { useEffect, useState } from 'react';
import { 
  View, 
  FlatList, 
  Text,
  StyleSheet 
}  from 'react-native';
import { supabase } from '../lib/supabase';

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

    const renderPost = ({ item }) => {
      return (
        <View style={styles.postContainer}>
          <Text style={styles.postType}>{item.post_owner_name}</Text>
          {item.title && <Text style={styles.postTitle}>{item.title}</Text>}
          <Text>{item.article}</Text>
          {item.post_time && <Text style={styles.postDate}>Posted at: {item.post_time}</Text>}
          {item.ingredients && <Text>Ingredients: {item.ingredients}</Text>}
          {item.resourceLink && <Text style={styles.postLink}>Resource: {item.resourceLink}</Text>}
        </View>
      );
    };
  
    return (
      <FlatList
        data={posts} 
        renderItem={renderPost}
        keyExtractor={item => item.id}
      />
    );
  };
  


const styles = StyleSheet.create({
    postContainer: {
      backgroundColor: '#fff', 
      borderRadius: 4,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowColor: '#000',
      shadowOffset: { height: 0, width: 0 },
      borderWidth: 1, 
      borderColor: 'purple', 
    },
    postType: {
      fontSize: 18, 
      fontWeight: 'bold',
      color: 'purple', 
      marginBottom: 4,
    },
    postTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 8,
      color: 'purple',
    },
    postDate: {
        fontSize: 14,
        color: '#2f4f4f',
        marginTop: 8,
      },
      postLink: {
        fontSize: 16,
        color: '#0000ff', 
        marginTop: 8,
      },
    
  });

export default AmbassadorPostsScreen;
