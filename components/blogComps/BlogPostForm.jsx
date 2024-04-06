import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet , TouchableOpacity } from 'react-native';
import { usePosts } from './PostsContext';
import { supabase } from '../../lib/supabase';
import { useNavigation } from "@react-navigation/native";

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const navigation = useNavigation()
  
  var currentUserId = '54d2b68a-4eb6-45f9-9c17-98711ffd3324'
    
  const addPost = async() => {
    const {error} = await supabase
    .from('blog_post')
    .insert([
      {title: title, article: article, post_owner: currentUserId}
    ])
    console.log("posting error", error)
    setTitle('');
    setArticle('');
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Blog Title</Text>
      <TextInput
        style={styles.inputTitle}
        placeholder="Type blog post title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Blog Article</Text>
      <TextInput
        style={styles.inputArticle}
        placeholder="Type blog post content"
        value={article}
        onChangeText={setArticle}
        multiline
      />

      <>
      {(title === '' || article === '' ||title.length>0 && title.replace(/\s/g, '').length==0 || article.length>0 && article.replace(/\s/g, '').length==0) ? (
        <TouchableOpacity style={styles.WaitButton}>
          <Text style={styles.buttonText}>Fill Out Blog Entry</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
        style={styles.SubmitButton}
      //onPress={addPost} <- was this previously, in case change is neccessary
      //Below on press basically redirects to Blog posts page
        onPress={()=> {
          addPost()
          navigation.navigate("Blog Posts")
          }}>

          <Text style={styles.buttonText} >Post Blog Entry</Text>
        </TouchableOpacity>
      )}
      </>

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  inputTitle: {
    height: 40,
    backgroundColor: 'white', 
    borderColor: 'purple', 
    borderWidth: 1,
    borderRadius: 5, 
    marginBottom: 20,
    padding: 10,
    fontSize: 16, 
    textAlignVertical: 'top'
    
  },
  inputArticle: {
    height: 200,
    backgroundColor: 'white', 
    borderColor: 'purple', 
    borderWidth: 1,
    borderRadius: 5, 
    marginBottom: 20,
    padding: 10,
    fontSize: 16, 
    textAlignVertical: 'top'
  },
  label: {
    fontSize: 16,
    color: 'black', 
    marginBottom: 10,
  },
  SubmitButton: {
    backgroundColor: 'purple', 
    borderRadius: 5,
    padding: 10,
    marginBottom: 20, 
    width: '100%', 
    justifyContent: 'center',
  },
  WaitButton: {
    backgroundColor: '#c2c2d6', 
    borderRadius: 5,
    padding: 10,
    marginBottom: 20, 
    width: '100%', 
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BlogPostForm;
