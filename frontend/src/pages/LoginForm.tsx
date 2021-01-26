import {Box, Flex, Heading} from '@chakra-ui/core';
import React from 'react';
import Email from '../components/Login/Email';
import ErrorMessage from '../components/Login/ErrorMessage';
import Password from '../components/Login/Password';
import Submit from '../components/Login/Submit';
import {LoginContext} from "../types/LoginContext";

type Props = {
    loginContext: LoginContext,
    setLoginContext: Function
}

type Login = {
    email: string,
    password: string
}

export default function LoginForm({loginContext, setLoginContext}: Props) {


    const userLogin = async (login: Login) => {
        await fetch('http://localhost:3001/users/login',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({user: login})
            }).then(
            res => {
                if (res.status === 200 || res.status === 204) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            }
        )
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLoginContext((prevState: LoginContext) => {
            return {
                ...prevState,
                isLoading: true,
            };
        });
        userLogin({email: loginContext.email, password: loginContext.password}).then(() => {
            setLoginContext((prevState: LoginContext) => {
                return {
                    ...prevState,
                    isLoggedIn: true,
                    isLoading: false,
                    showPassword: false,
                    error: ''
                };
            });
        }).catch(() => {
            setLoginContext((prevState: LoginContext) => {
                return {
                    ...prevState,
                    error: 'Invalid username or password',
                    isLoading: false,
                    showPassword: false
                };
            })
        });
    };
    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <Box p={2}>
                    <Box textAlign="center">
                        <Heading>Login</Heading>
                    </Box>
                </Box>
                <Box my={4} textAlign="left">
                    <form onSubmit={handleSubmit}>
                        {loginContext.error && <ErrorMessage message={loginContext.error}/>}
                        <Email setContext={setLoginContext}/>
                        <Password formContext={loginContext} setContext={setLoginContext}/>
                        <Submit formContext={loginContext}/>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
}