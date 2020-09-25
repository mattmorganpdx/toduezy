import React, {useEffect, useState} from 'react';
import {
    ThemeProvider,
    CSSReset,
    List,
    ListItem,
    ListIcon,
    Box,
    Heading,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/core'


import {Server} from "miragejs"


interface user {
    id: number,
    name: string,
    tasks?: {
        id: number,
        description: string
    }[]
}

interface userList {
    users: user[]
}

const mockUsers: userList = {
    users: [
        {id: 1, name: "Bob"},
        {id: 2, name: "Alice", tasks: [{id: 1, description: "Send Email"}, {id: 2, description: "Schedule Meeting"}]},
        {id: 33, name: "Matt", tasks: [{id: 1, description: "eat lunch"}]}
    ]
}

let server = new Server()
// @ts-ignore
server.get("/api/users", mockUsers)

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
                        {users.map((user: user) => (
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


