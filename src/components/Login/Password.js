import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Icon,
    Button,
} from '@chakra-ui/core';

export default function Password({ formContext, setContext }) {
    const setPassword = password => setContext(prevState => { return { ...prevState, password: password } });
    const setShowPassword = () => setContext(prevState => { return { ...prevState, showPassword: !prevState.showPassword } });
    return (<FormControl isRequired mt={6}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
            <Input
                type={formContext.showPassword ? 'text' : 'password'}
                placeholder="*******"
                size="lg"
                onChange={event => setPassword(event.currentTarget.value)}
            />
            <InputRightElement width="3rem">
                <Button h="1.5rem" size="sm" onClick={setShowPassword}>
                    {formContext.showPassword ? <Icon name="view-off" /> : <Icon name="view" />}
                </Button>
            </InputRightElement>
        </InputGroup>
    </FormControl>);
};