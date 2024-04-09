import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from '../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/loginProvider';







export const LoginTab = ({}) => {

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
  const { token, setIsLoggedIn, phone, setPhone, name, setName} = useLogin();
  const { setToken } = useLogin();
  const { uid, setUID } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  async function handleSignup(){
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      
      if (error) console.error(error)
      else console.log(data)

      if (error) {
        setError(error.message);
      } else {
        console.log('User signed up:', data);
        // Store user token in AsyncStorage

        const freshToken = data.session.access_token
        setToken(freshToken)
        await AsyncStorage.setItem('sessionData', JSON.stringify(freshToken));
        
        const freshUID = data.user.id
        setUID(freshUID)
        await AsyncStorage.setItem('uid', JSON.stringify(freshUID));

        setIsLoggedIn(true);
        setUserDetails();
 // Navigate to Home screen after successful signup
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup.');
    }
  };

  async function setUserDetails(){

    try {
      const { data, error } = await supabase
    .rpc('insert_user', {
      name,
      phone, 
      uid
    })
      if (error) console.error(error)
      else console.log(data)
    } 
    catch (error) {console.error('Signup error:', error);
    setError('An error occurred during signup.');}
  }

  

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
        value={phone}
        onChangeText={setPhone}
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
      {error ? <Text>{error}</Text> : null}
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};


