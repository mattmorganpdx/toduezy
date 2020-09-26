import React, {useEffect, useState} from 'react';
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
    ThemeProvider,
} from '@chakra-ui/core';
import {mockApiServer} from './mockApi/Users';
import {User} from "./types/User";

mockApiServer();

export default function App() {
    let [users, setUsers] = useState([])

    useEffect(() => {
        fetch("/api/users")
            .then((res) => res.json())
            .then((json) => {
                setUsers(json.users)
            })
    }, [])

    return (
        <ThemeProvider>
            <CSSReset/>
            <Box bg="#FFA500" w="75%" p={4} color="white">
                <Heading>You're ToDuezies</Heading>
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
                                    <List styleType="disc">
                                        {user.tasks?.map((task: any) => (
                                            <ListItem key={task.id}>{task.description}</ListItem>
                                        ))}
                                    </List>
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Box>
            </Box>
        </ThemeProvider>
    )
}


