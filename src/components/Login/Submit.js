import React from 'react';
import {Button, CircularProgress} from '@chakra-ui/core';

export default function Submit({ formContext }) {
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