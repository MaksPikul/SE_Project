import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/loginProvider'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';



export const LoginScreen = () => {

  const { setIsLoggedIn } = useLogin();
  const { setToken } = useLogin();
  const { setUID } = useLogin();
  const {setName} = useLogin();
  const {setIsLoading} = useLogin();

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        setError(error.message);

      } else {
        console.log('User logged in:', data);

        const freshToken = data.session.access_token
        setToken(freshToken)
        await AsyncStorage.setItem('sessionData', JSON.stringify(freshToken));

        const freshUID = data.user.id;
        setUID(freshUID)
        await AsyncStorage.setItem('uid', JSON.stringify(freshUID));
        
        
        
        console.log("access token: ", freshToken)
        console.log("user id: ", data.user.id)
        console.log("user metadata: ", data.user.user_metadata)
        getUserDetails(freshUID);
        setIsLoggedIn(true)
        

      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login.');
    }
  };

  async function getUserDetails(freshUID: string){

    console.log('Getting details');
    setIsLoading(true);

    const uid = freshUID

    const { data, error } = await supabase.rpc('get_user_info', {uid})
    if (error) {console.error(error)}
    else {console.log(data)

    const freshName = data[0].user_name;
    await AsyncStorage.setItem('name', freshName);
    setName(freshName)
    
    setIsLoading(false);
    
  }
  
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text>{error}</Text> : null}
      <LinearGradient
        colors={['#007bff', '#28a745']}
        style={styles.gradientButton}
        >

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </LinearGradient>
    </View>
  );
};

export const SignupScreen = () => {
  const { phone, setPhone, name, setName } = useLogin();
  const { setToken, setUID, setIsLoggedIn } = useLogin();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignup() {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        console.log('User signed up:', data);

        // Store user token in AsyncStorage
        const freshToken = data.session.access_token;
        setToken(freshToken);
        await AsyncStorage.setItem('sessionData', JSON.stringify(freshToken));

        const freshUID = data.user.id;
        setUID(freshUID);
        await AsyncStorage.setItem('uid', JSON.stringify(freshUID));

        setIsLoggedIn(true);
        setUserDetails();
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup.');
    }
  }

  async function setUserDetails() {
    try {
      const { data, error } = await supabase.rpc('insert_user', {
        name,
        phone,
        uid,
      });
      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      
      <LinearGradient
        colors={['#007bff', '#28a745']}
        style={styles.gradientButton}
        >

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
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
  input: {
    height: 40,
    width: '100%',
    backgroundColor: '#eee',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gradientButton: {
    borderRadius: 10,
    marginBottom: 10,
    width: '70%', // Make the buttons take full width
    height: 50, // Set a fixed height for the buttons
    justifyContent: 'center', // Center the button content vertically
    alignItems: 'center', // Center the button content horizontally
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});


