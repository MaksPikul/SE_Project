import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AmbassadorSection = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AmbassadorPosts')} 
      >
        <Text style={styles.buttonText}>View Ambassador Posts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RecipePost')} 
      >
        <Text style={styles.buttonText}>Post Recipe</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FitnessPost')} 
      >
        <Text style={styles.buttonText}>Post Fitness Program</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MentalHealthPost')} 
      >
        <Text style={styles.buttonText}>Post Mental Health Resource</Text>
      </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', 
  },
  button: {
    backgroundColor: 'purple',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '90%',
  },
  buttonText: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  },
});

export default AmbassadorSection;
