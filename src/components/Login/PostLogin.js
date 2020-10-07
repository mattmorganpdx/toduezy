import {Box, Button} from '@chakra-ui/core';
import React from 'react';

export default function PostLogin({formContext, setContext}) {
    const logout = () => setContext(prevState => {
        return {
            ...prevState,
            isLoggedIn: false,
        };
    })

    return (
        <Box textAlign="center" w="15%">
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