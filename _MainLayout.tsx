import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootLayout from "./_RootLayout";
import LoginLayout from "./_LoginLayout";
import { NavigationContainer } from "@react-navigation/native";
import { useLogin } from "./context/loginProvider";


const MainLayout = () => {
    const {isLoggedIn} = useLogin();
    console.log(isLoggedIn)


    // SHOULD BE return  isLoggedIn ? <RootLayout/> : <LoginLayout/>;
    return  !isLoggedIn ? <RootLayout/> : <LoginLayout/>;
        
        
    

}

export default MainLayout;