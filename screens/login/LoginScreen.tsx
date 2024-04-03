import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from '../../lib/supabase';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/loginProvider';




export const LoginTab = () => {

  const { setIsLoggedIn } = useLogin();
  const { setProfile } = useLogin();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigation = useNavigation()


  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        setError(error.message);
      } else {
        console.log('User logged in:', data);
        await AsyncStorage.setItem('sessionData', JSON.stringify(data));
        const { data: { user } } = await supabase.auth.getUser()
        setProfile(user)
        setIsLoggedIn(true)



 

      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export const SignupTab = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [first_name, setFname] = React.useState('');
  const [last_name, setLname] = React.useState('');
  const { setIsLoggedIn } = useLogin();

  const handleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });

      if (error) {
        setError(error.message);
      } else {
        console.log('User signed up:', data);
        // Store user token in AsyncStorage
        await AsyncStorage.setItem('sessionData', JSON.stringify(data));
        setIsLoggedIn(true)
 // Navigate to Home screen after successful signup
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="First Name"
        value={first_name}
        onChangeText={setFname}
      />
      <TextInput
        placeholder="Last Name"
        value={last_name}
        onChangeText={setLname}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};


