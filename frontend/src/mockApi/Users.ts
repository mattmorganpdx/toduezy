import {Response, Server} from "miragejs"
import {User, UserList, UserModel} from "../types/User";
import {Task} from "../types/Task";

function mockApiServer() {
    let mockUsers: UserList = {
        users: [
            {id: 1, name: "Bob", tasks: []},
            {
                id: 2,
                name: "Alice",
                tasks: [{
                    id: 1,
                    description: "Send Email",
                    parent: 2,
                    status: "OPEN",
                }, {
                    id: 2,
                    description: "Schedule Meeting",
                    parent: 2,
                    status: "OPEN",
                }]
            },
            {
                id: 3,
                name: "Matt",
                tasks: [{
                    id: 1,
                    description: "eat lunch",
                    parent: 3,
                    status: "OPEN"
                }]
            }
        ]
    }

    let nextUserId = 4;
    let nextTaskId = 4;

    let server = new Server();
    // @ts-ignore
    server.post("login", (schema, request) => {
        let login = JSON.parse(request.requestBody)
        if (login.email === "admin@test.com" && login.password === "tVF!n@UiAS9K6Ly")
            return new Response(200);
        if (login.email === "test@test.com" && login.password === "passw0rd")
            return new Response(200);
        return new Response(400);
    });

    // @ts-ignore
    server.get("/api/users", mockUsers);
    // @ts-ignore
    server.post("/api/users", (schema, request) => {
        let newUser: UserModel = JSON.parse(request.requestBody);
        let user: User = {
            id: nextUserId++,
            name: newUser.name,
            tasks: []
        };
        mockUsers.users.push(user);
    });
    // @ts-ignore
    server.post("/api/tasks", (schema, request) => {
        let task: Task = JSON.parse(request.requestBody);
        if (!task.description)
            task.description = "";
        if (!task.id) {
            task.id = nextTaskId++;
            task.status = "OPEN"
            mockUsers.users
                .find(user => user.id === task.parent)?.tasks?.push(task)
        } else {
            mockUsers.users.find(user => user.id === task.parent)?.tasks?.find(t => t.id === task.id)?.description?.replace(/\*/, task.description);
        }
        return task
    });
    //@ts-ignore
    server.delete("/api/tasks", (schema, request) => {
        let taskToDelete: Task = JSON.parse(request.requestBody);
        console.log(taskToDelete)
        if (taskToDelete.id && taskToDelete.parent) {
            const userIndex = mockUsers.users.findIndex(user => user.id === taskToDelete.parent)
            let task;
            if (userIndex)
                task = mockUsers.users[userIndex].tasks?.find(t => t.id === taskToDelete.id)
            if (task)
                task.status = "DELETED"

            console.log(`logged from delete ${mockUsers}`)
        }
    });
    //@ts-ignore
    server.put("/api/tasks", (schema, request) => {
        let taskToDelete: Task = JSON.parse(request.requestBody);
        console.log(taskToDelete)
        if (taskToDelete.id && taskToDelete.parent) {
            const userIndex = mockUsers.users.findIndex(user => user.id === taskToDelete.parent)
            let task;
            if (userIndex)
                task = mockUsers.users[userIndex].tasks?.find(t => t.id === taskToDelete.id)
            if (task)
                task.status = "COMPLETE"

            console.log(`logged from delete ${mockUsers}`)
        }
    });
}

export {mockApiServer}