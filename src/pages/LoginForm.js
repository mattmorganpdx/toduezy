import React, {useState} from 'react';
import {
    Flex,
    Box,
    Heading
} from '@chakra-ui/core';
import ErrorMessage from '../components/ErrorMessage';
import Email from '../components/Email';
import Password from '../components/Password';
import Submit from '../components/Submit';
import PostLogin from '../components/PostLogin';


export default function LoginForm({loginContext, setLoginContext}) {


    const userLogin = async login => {
        await fetch('login', {method: "POST", body: JSON.stringify(login)}).then(
            res => {
                console.log(res)
                if (res.status === 200) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            }
        )
    }

    const handleSubmit = event => {
        event.preventDefault();
        setLoginContext(prevState => {
            return {
                ...prevState,
                isLoading: true,
            };
        });
        userLogin({email: loginContext.email, password: loginContext.password}).then(() => {
            setLoginContext(prevState => {
                return {
                    ...prevState,
                    isLoggedIn: true,
                    isLoading: false,
                    showPassword: false,
                    error: ''
                };
            });
        }).catch(() => {
            setLoginContext(prevState => {
                return {
                    ...prevState,
                    error: 'Invalid username or password',
                    isLoading: false,
                    email: '',
                    password: '',
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