import {Server} from "miragejs"
import {UserList} from "../types/User";
import {Task} from "../types/Task";

function mockApiServer() {
    let mockUsers: UserList = {
        users: [
            {id: 1, name: "Bob"},
            {
                id: 2,
                name: "Alice",
                tasks: [{
                    id: 1,
                    description: "Send Email",
                    parent: 2,
                }, {
                    id: 2,
                    description: "Schedule Meeting",
                    parent: 2,
                }]
            },
            {
                id: 3,
                name: "Matt",
                tasks: [{
                    id: 1,
                    description: "eat lunch",
                    parent: 3
                }]
            }
        ]
    }

    let nextId = 4;

    let server = new Server();
    // @ts-ignore
    server.get("/api/users", mockUsers);
    // @ts-ignore
    server.post("/api/tasks", (schema, request) => {
        let task: Task = JSON.parse(request.requestBody);
        if (!task.id) {
            task.id = nextId++;
            mockUsers.users
                .find(user => user.id === task.parent)?.tasks?.push(task)
        } else {
            mockUsers.users.find(user => user.id === task.parent)?.tasks?.find(t => t.id === task.id)?.description.replace(/\*/, task.description);
        }
        return task
    });
}

export {mockApiServer}