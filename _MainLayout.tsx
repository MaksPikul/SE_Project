
import RootLayout from "./_RootLayout";
import LoginLayout from "./_LoginLayout";
import { useLogin } from "./context/loginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import LoadingScreen from "./screens/LoadingScreen";



const MainLayout = () => {
    const {isLoggedIn} = useLogin();
    const {setIsLoggedIn} = useLogin();
    const {setIsLoading, isLoading} = useLogin();
    const {setName} = useLogin();

    

    useEffect(() => {
      setIsLoading(true)
        const checkSession = async () => {
          
          try {
            const sessionToken = await AsyncStorage.getItem('sessionData');
            console.log(sessionToken);
            console.log('Checking login');
    
            if (sessionToken && !isLoggedIn) {
              const { data: { user }, error } = await supabase.auth.getUser()
    
              if (error) {
                console.error('Token validation error:', error);
                await AsyncStorage.removeItem('sessionData');
                setIsLoggedIn(false);

              } else {
                
                setIsLoggedIn(true);
                console.log('User logged in:', user);
                const freshName = await AsyncStorage.getItem('name');
                
                freshName && setName(freshName);
                
                
                
              }
            } else if (!sessionToken && !isLoggedIn) {
              console.log('No session token found, user is not logged in');
              setIsLoggedIn(false);
            }
          } catch (error) {
            console.error('Error checking session:', error);
          }
          setIsLoading(false)
        };
        
        checkSession();
        
      }, []);

    //const {isLoggedIn} = useLogin();
    // SHOULD BE return  isLoggedIn ? <RootLayout/> : <LoginLayout/>;
    return  (isLoggedIn ?( isLoading ?  <LoadingScreen /> : <RootLayout/>) : ( isLoading ?  <LoadingScreen /> : <LoginLayout/>))
}

export default MainLayout;