import React from 'react';
import {
    Box,
    Button,
    Text
} from '@chakra-ui/core';

export default function PostLogin({ formContext, setContext }) {
    const logout = () =>  setContext(prevState => {
        return {
            ...prevState,
            isLoggedIn: false,
        };
    })

    return (
        <Box textAlign="center">
            <Text>{formContext.email} logged in!</Text>
            <Button
                variantColor="orange"
                variant="outline"
                width="full"
                mt={4}
                onClick={logout}
            >
                Sign out
</Button>
        </Box>
    );
};