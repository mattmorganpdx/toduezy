import React from 'react';
import {
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/core';

export default function Email({ setContext }) {
    const setEmail = email => setContext(prevState => { return { ...prevState, email: email } });

    return (
        <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                type="email"
                placeholder="test@test.com"
                size="lg"
                onChange={event => setEmail(event.currentTarget.value)}
            />
        </FormControl>
    );
};