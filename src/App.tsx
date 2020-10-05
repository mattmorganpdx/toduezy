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
    Divider, SimpleGrid,
} from '@chakra-ui/core';
import {mockApiServer} from './mockApi/Users';
import {User} from "./types/User";
import {Task} from "./types/Task";
import LoginForm from "./pages/LoginForm"
import {AddUserModal} from "./components/AddUserModal";
import PostLogin from "./components/PostLogin";

mockApiServer();

export default function App() {
    let [users, setUsers] = useState([]);
    let [adding, setAdding] = useState({id: 0});

    let loadUsers = () => {
        fetch("/api/users")
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                setUsers(json.users)
            })
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const [loginContext, setLoginContext] = useState({
        email: '',
        password: '',
        showPassword: false,
        error: '',
        isLoading: false,
        isLoggedIn: false
    });

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

    const deleteTask = async (parentId: number, taskId: number): Promise<void> => {
        await fetch("api/tasks", {method: "DELETE", body: JSON.stringify({id: taskId, parent: parentId})})
            .then(() => loadUsers());
    }

    const completeTask = async (parentId: number, taskId: number): Promise<void> => {
        await fetch("api/tasks", {method: "PUT", body: JSON.stringify({id: taskId, parent: parentId})})
            .then(() => loadUsers());
    }


    return (
        <ThemeProvider>
            <CSSReset/>
            {!loginContext.isLoggedIn ? <LoginForm loginContext={loginContext} setLoginContext={setLoginContext}/> :
            (<Box ref={finalRef} bg="#FFA500" w="75%" p={4} color="white">
                <Heading>You're ToDuezies</Heading>
                <AddUserModal reload={loadUsers} finalFocusRef={finalRef}/>
                <Divider/>
                <Box bg="tomato" w="50%" p={4} color="white" rounded="lg">
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
                                    {user.tasks?.filter(task => task.status !== "DELETED").map((task: any) => (
                                        <SimpleGrid key={`${task.id}-grid`} columns={2} spacing={10}>
                                            <Editable key={`${task.id}-task`} defaultValue={task.description}
                                                      onSubmit={e => onUpdate(task.id, user.id, e)}>
                                                <EditablePreview textDecoration={task.status === "COMPLETE" ? "line-through" : ""}/>
                                                <EditableInput/>
                                            </Editable>
                                            <SimpleGrid key={`${task.id}-grid-inner`} columns={2} spacing={5}>
                                                <IconButton
                                                    key={`${task.id}-complete`}
                                                    icon={"check"}
                                                    aria-label={"complete item"}
                                                    variant={"ghost"}
                                                    variantColor="cyan"
                                                    size="xs"
                                                    isRound={true}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        completeTask(user.id, task.id).then()
                                                    }}
                                                    children={null}
                                                />
                                                <IconButton
                                                    key={`${task.id}-delete`}
                                                    icon={"delete"}
                                                    aria-label={"delete item"}
                                                    variant={"ghost"}
                                                    variantColor="cyan"
                                                    size="xs"
                                                    isRound={true}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        deleteTask(user.id, task.id).then()
                                                    }}
                                                    children={null}
                                                />
                                            </SimpleGrid>
                                        </SimpleGrid>
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
                <PostLogin formContext={loginContext} setContext={setLoginContext} />
            </Box>)}
        </ThemeProvider>
    )
}


