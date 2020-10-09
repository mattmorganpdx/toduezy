import {Box, Button} from '@chakra-ui/core';
import React from 'react';
import {LoginContext} from "../../types/LoginContext";

type Props = {
    setContext: Function
}

export default function PostLogin({setContext}: Props) {
    const logout = () => setContext((prevState: LoginContext) => {
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