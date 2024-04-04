import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from '../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/loginProvider';







export const LoginTab = ({}) => {

  const { setIsLoggedIn } = useLogin();
  const { setToken } = useLogin();
  const { setUID } = useLogin();

  
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
        await AsyncStorage.setItem('sessionData', JSON.stringify(data));
        setToken(data.session.access_token)

        setUID(data.user.id)
        
        console.log("access token: ", data.session.access_token)
        console.log("user id: ", data.user.id)
        console.log("user metadata: ", data.user.user_metadata)


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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mobile, setMobile] = useState('')
  const { setIsLoggedIn } = useLogin();
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const handleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: name,
            phone: mobile,
            age: age,
          }
        }
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
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Phone"
        value={mobile}
        onChangeText={setMobile}
        keyboardType='phone-pad'
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}

      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType='numeric'
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};


