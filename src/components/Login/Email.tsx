import {FormControl, FormLabel, Input} from '@chakra-ui/core';
import React from 'react';
import {LoginContext} from "../../types/LoginContext";

type Props = {
    setContext: Function
}

export default function Email({setContext}: Props) {
    const setEmail = (email: any) => setContext((prevState: LoginContext) => { return { ...prevState, email: email } });

    return (
        <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            {/*
            // TODO: Find out why input doesn't accept onChange
            // @ts-ignore */}
            <Input
                type="email"
                placeholder="test@test.com"
                size="lg"
                onChange={(e: any) => setEmail(e.currentTarget.value)}
            />
        </FormControl>
    );
};