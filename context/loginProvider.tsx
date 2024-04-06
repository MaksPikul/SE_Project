import React, { createContext, useContext, useState } from "react";

interface LoginContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    uid: string; 
    setUID: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    phone: string;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    //metaData: {};
    //setMetaData: React.Dispatch<React.SetStateAction<{}>>
}


const LoginContext  = createContext< LoginContextType | undefined>(undefined);

const LoginProvider: React.FC = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [uid, setUID] = useState('defaultID')
    const [name, setName] = useState('defaultID')
    const [phone, setPhone] = useState('defaultID')

    //const [metaData, setMetaData] = useState({})


    return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn, token, setToken, uid, setUID, phone, setPhone, name, setName}}>
        {children}
    </LoginContext.Provider>
    );
}

export const useLogin = (): LoginContextType => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};

export default LoginProvider