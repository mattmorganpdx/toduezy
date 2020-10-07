import {
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/core";
import React, {KeyboardEvent, useRef} from "react";
import {addUser} from "../../api/AddContact";

export function AddContactModal(props: any) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const newUserName = useRef<HTMLInputElement>(null)
    const saveHandler = () => {
        if (newUserName?.current?.value) {
            addUser(newUserName.current.value)
            onClose();
            props.reload();
        }
    }
    const saveOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e?.key === 'Enter')
            saveHandler();
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
                children={null}
            />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                finalFocusRef={props.finalFocusRef}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add a new stakeholder</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Contact Name</FormLabel>
                            <Input placeholder="New Contact" ref={newUserName}
                                   onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => saveOnEnterHandler(e)}/>
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