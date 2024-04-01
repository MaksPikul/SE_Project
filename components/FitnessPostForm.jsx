import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { usePosts } from './PostsContext';

const FitnessPostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const { addPost } = usePosts();

  const handleSubmit = () => {
    addPost({
      type: 'fitness',
      title,
      description,
      duration,
    });

    setTitle('');
    setDescription('');
    setDuration('');
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Fitness Program Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter fitness program title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the fitness program"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Text style={styles.label}>Duration</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter duration (e.g., 6 weeks)"
        value={duration}
        onChangeText={setDuration}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Post Fitness Program</Text>
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

export default FitnessPostForm;
