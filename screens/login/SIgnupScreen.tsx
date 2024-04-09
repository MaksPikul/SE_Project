
import { StyleSheet, TextInput, View } from "react-native";
import { useLogin } from "../../context/loginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../lib/supabase";
import { useState } from "react";

const { phone, setPhone, name, setName} = useLogin();



const SignupScreen = () => {

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
        await AsyncStorage.setItem('sessionData', JSON.stringify(freshUID));

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

    return(
        <View style={SignupStyle.container}>
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
    )

}

const SignupStyle = StyleSheet.create({
    container: {

    }
})


export default SignupScreen;