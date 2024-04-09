import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = () => {

    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <LinearGradient
        colors={['#007bff', '#28a745']}
        style={styles.gradientButton}
      >
        <TouchableOpacity style={styles.button} onPress={() => 
            {console.log('Login pressed')
            navigation.navigate("Login")}}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={['#007bff', '#28a745']}
        style={styles.gradientButton}
      >
        <TouchableOpacity style={styles.button} onPress={() => 
                {console.log('Signup Pressed')
                navigation.navigate("Signup")}}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    header: {
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    gradientButton: {
      borderRadius: 10,
      marginBottom: 10,
      width: '90%', // Make the buttons take full width
      height: 50, // Set a fixed height for the buttons
      justifyContent: 'center', // Center the button content vertically
      alignItems: 'center', // Center the button content horizontally
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default WelcomeScreen;
