import {
    AccordionPanel,
    Button, FormControl, FormLabel, IconButton, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/core";
import React, {useRef} from "react";
import {addUser} from "../api/AddContact";

export function AddUserModal(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const newUserName = useRef<HTMLInputElement>(null)
    const saveHandler = () => {
        if (newUserName?.current?.value) {
            addUser(newUserName.current.value)
            onClose();
            props.reload();
        }
    }
    return (
        <>
            <IconButton
                icon="add"
                aria-label={"add item"}
                variant={"ghost"}
                variantColor="cyan"
                size="xs"
                isRound={true}
                onClick={onOpen}
            />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Contact Name</FormLabel>
                            <Input placeholder="New Contact" ref={newUserName}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variantColor="blue" mr={3} onClick={saveHandler}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}