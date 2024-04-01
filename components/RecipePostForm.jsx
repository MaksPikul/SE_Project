import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet , TouchableOpacity } from 'react-native';
import { usePosts } from './PostsContext';

const RecipePostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const { addPost } = usePosts();

    const handleSubmit = () => {
      addPost({
        type: 'Recipe',
        title,
        description,
        ingredients,
      });

    setTitle('');
    setDescription('');
    setIngredients('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Recipe Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter recipe title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the recipe"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Text style={styles.label}>Ingredients</Text>
      <TextInput
        style={styles.input}
        placeholder="List ingredients separated by commas"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Post Recipe</Text>
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
  input: {
    height: 40,
    backgroundColor: 'white', 
    borderColor: 'purple', 
    borderWidth: 1,
    borderRadius: 5, 
    marginBottom: 20,
    padding: 10,
    fontSize: 16, 
  },
  label: {
    fontSize: 16,
    color: 'black', 
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'purple', 
    borderRadius: 25,
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

export default RecipePostForm;
