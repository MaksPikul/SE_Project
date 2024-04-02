import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet , TouchableOpacity } from 'react-native';
import { usePosts } from './PostsContext';

const MentalHealthPostForm = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [resourceLink, setResourceLink] = useState('');
  const { addPost } = usePosts();

    const handleSubmit = () => {
      addPost({
        type: 'Mental Health',
        description,
        resourceLink,
      });

    setDescription('');
    setResourceLink('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Mental Health Resource Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the mental health resource"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Text style={styles.label}>Resource Link</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the link to the resource"
        value={resourceLink}
        onChangeText={setResourceLink}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Post Mental Health Resource</Text>
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
export default MentalHealthPostForm;
