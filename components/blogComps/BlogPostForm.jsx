import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet , TouchableOpacity } from 'react-native';
import { usePosts } from './PostsContext';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const { addPost } = usePosts();

    const handleSubmit = () => {
      addPost({
        title,
        article,
      });
    console.log(title)
    console.log(article)
    setTitle('');
    setArticle('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Blog Title</Text>
      <TextInput
        style={styles.inputTitle}
        placeholder="Type blog post title"
        value={title}
        onChangeText={setTitle}
        multiline
      />
      <Text style={styles.label}>Blog Article</Text>
      <TextInput
        style={styles.inputArticle}
        placeholder="Type blog post content"
        value={article}
        onChangeText={setArticle}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Post Blog Entry</Text>
      </TouchableOpacity>

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
  button: {
    backgroundColor: 'purple', 
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
