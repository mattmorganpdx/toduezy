import React, {useEffect, useRef, useState} from 'react';
import {
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    CSSReset,
    Heading,
    List,
    ListItem,
    Icon,
    IconButton,
    ThemeProvider,
    Editable, EditableInput, EditablePreview,
    Divider,
} from '@chakra-ui/core';
import {mockApiServer} from './mockApi/Users';
import {User} from "./types/User";
import {Task} from "./types/Task";
import {AddUserModal} from "./components/AddUserModal";

mockApiServer();

export default function App() {
    let [users, setUsers] = useState([]);
    let [adding, setAdding] = useState({id: 0});

    let loadUsers = () => {
        fetch("/api/users")
            .then((res) => res.json())
            .then((json) => {
                setUsers(json.users)
            })
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const finalRef = useRef();

    const onUpdate = (id: number, parent: number, text: string) => {
        fetch("api/tasks", {method: "POST", body: JSON.stringify({id: id, description: text, parent: parent})})
            .then(() => loadUsers())
    }


    const addTask = async (id: number): Promise<void> => {
        setAdding({id: id});
        await fetch("api/tasks", {method: "POST", body: JSON.stringify({description: "", parent: id})})
            .then(() => loadUsers());
        setAdding({id: 0});
    }


    return (
        <ThemeProvider>
            <CSSReset/>
            <Box ref={finalRef} bg="#FFA500" w="75%" p={4} color="white">
                <Heading>You're ToDuezies</Heading>
                <AddUserModal reload={loadUsers} finalFocusRef={finalRef}/>
                <Divider/>
                <Box bg="tomato" w="25%" p={4} color="white" rounded="lg">
                    <Accordion allowMultiple={true}>
                        {users.map((user: User) => (
                            <AccordionItem key={user.id}>
                                <AccordionHeader>
                                    <Box flex="1" textAlign="left">
                                        {user.name}
                                    </Box>
                                    <AccordionIcon/>
                                </AccordionHeader>
                                <AccordionPanel pb={4}>
                                    {user.tasks?.map((task: any) => (
                                        <Editable key={task.id} defaultValue={task.description}
                                                  onSubmit={e => onUpdate(task.id, user.id, e)}>
                                            <EditablePreview/>
                                            <EditableInput/>
                                        </Editable>
                                    ))}
                                    <IconButton
                                        key={user.id}
                                        icon="add"
                                        aria-label={"add item"}
                                        variant={"ghost"}
                                        variantColor="cyan"
                                        size="xs"
                                        isRound={true}
                                        isLoading={adding.id === user.id}
                                        onClick={(e) => {

                                            e.preventDefault();
                                            addTask(user.id).then();
                                        }}
                                        children={null}
                                    />
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Box>
            </Box>
        </ThemeProvider>
    )
}


