import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const FooterButton = ({  }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} >
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'blue', // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default FooterButton;
