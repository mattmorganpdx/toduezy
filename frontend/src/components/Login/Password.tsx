import {Button, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement,} from '@chakra-ui/core';
import React from 'react';
import {LoginContext} from "../../types/LoginContext";

type Props = {
    formContext: LoginContext,
    setContext: Function
}

export default function Password({formContext, setContext}: Props) {
    const setPassword = (password: any) => setContext((prevState: LoginContext) => {return {...prevState, password: password}})

    const setShowPassword = () => setContext((prevState: LoginContext) => {
        return {...prevState, showPassword: !prevState.showPassword}
    });
    return (<FormControl isRequired mt={6}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
            // @ts-ignore
            // TODO: Find out why input doesn't accept onChange
            <Input
                type={formContext.showPassword ? 'text' : 'password'}
                placeholder="*******"
                size="lg"
                onChange={(e: any) => setPassword(e.currentTarget.value)}
            />
            <InputRightElement width="3rem">
                <Button h="1.5rem" size="sm" onClick={setShowPassword}>
                    {formContext.showPassword ? <Icon name="view-off"/> : <Icon name="view"/>}
                </Button>
            </InputRightElement>
        </InputGroup>
    </FormControl>);
};