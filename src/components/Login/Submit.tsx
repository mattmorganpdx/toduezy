import React from 'react';
import {Button, CircularProgress} from '@chakra-ui/core';
import {LoginContext} from "../../types/LoginContext";

type Props = {
    formContext: LoginContext
}

export default function Submit({ formContext }: Props) {
    return (
        <Button
            width="full"
            type="submit"
            variantColor="teal"
            variant="outline"
            mt={4}
        >
            {formContext.isLoading
                ? (<CircularProgress isIndeterminate size="24px" color="teal" />)
                : ('Sign In')
            }
        </Button>
    );
};