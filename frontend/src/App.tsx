import {CSSReset, ThemeProvider,} from '@chakra-ui/core';
import React, {useState} from 'react';
import {mockApiServer} from './mockApi/Users';
import LoginForm from "./pages/LoginForm"
import ToDo from "./pages/ToDo";

//mockApiServer();

export default function App() {


    const [loginContext, setLoginContext] = useState({
        email: '',
        password: '',
        showPassword: false,
        error: '',
        isLoading: false,
        isLoggedIn: false
    });

    return (
        <ThemeProvider>
            <CSSReset/>
            {!loginContext.isLoggedIn
                ? <LoginForm loginContext={loginContext} setLoginContext={setLoginContext}/>
                : <ToDo loginContext={loginContext} setLoginContext={setLoginContext}/>
            }
        </ThemeProvider>
    )
}


