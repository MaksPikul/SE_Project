import React, { ReactNode, createContext, useContext, useState } from "react";

interface LoginContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
    uid: string; 
    setUID: React.Dispatch<React.SetStateAction<string | undefined>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string | undefined>>;
    phone: string;
    setPhone: React.Dispatch<React.SetStateAction<string | undefined>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

    //metaData: {};
    //setMetaData: React.Dispatch<React.SetStateAction<{}>>
}


export const LoginContext  = createContext< LoginContextType | undefined>(undefined);

const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState<string | undefined>();
    const [uid, setUID] = useState<string | undefined>();
    const [name, setName] = useState<string | undefined>();
    const [phone, setPhone] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false)

    //const [metaData, setMetaData] = useState({})


    return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn, token, setToken, uid, setUID, phone, setPhone, name, setName, isLoading, setIsLoading}}>
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