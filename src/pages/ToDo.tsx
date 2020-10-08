import {
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Divider,
    Heading
} from "@chakra-ui/core";
import React, {useEffect, useRef, useState} from "react";
import PostLogin from "../components/Login/PostLogin";
import {AddContactModal} from "../components/ToDo/AddContactModal";
import AddTask from "../components/ToDo/AddTask";
import TaskItem from "../components/ToDo/TaskItem";
import {LoginContext} from "../types/LoginContext";
import {Task} from "../types/Task";
import {User} from "../types/User";

type Props = {
    loginContext: LoginContext,
    setLoginContext: Function
}

export default function ToDo({loginContext, setLoginContext}: Props) {
    let [users, setUsers] = useState([]);

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

    const finalRef = useRef();


    return (<Box ref={finalRef} bg="#FFA500" w="75%" p={4} color="white">
        <Heading>You're ToDuezies</Heading>
        <AddContactModal loadUsers={loadUsers} finalFocusRef={finalRef}/>
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
                            {user.tasks?.filter(task => task.status !== "DELETED").map((task: Task) => (
                                <TaskItem task={task} contactId={user.id} loadUsers={loadUsers}/>
                            ))}
                            <AddTask contactId={user.id} loadUsers={loadUsers}/>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
        <PostLogin formContext={loginContext} setContext={setLoginContext}/>
    </Box>)
}