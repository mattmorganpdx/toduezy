import {Server} from "miragejs"
import {UserList} from "../types/User";

function mockApiServer() {
    const mockUsers: UserList = {
        users: [
            {id: 1, name: "Bob"},
            {
                id: 2,
                name: "Alice",
                tasks: [{id: 1, description: "Send Email"}, {id: 2, description: "Schedule Meeting"}]
            },
            {id: 33, name: "Matt", tasks: [{id: 1, description: "eat lunch"}]}
        ]
    }

    let server = new Server()
// @ts-ignore
    server.get("/api/users", mockUsers)
}

export {mockApiServer}