import {Server} from "miragejs"
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
                    taskId: 1,
                    description: "Send Email",
                    parentId: 2,
                    status: "OPEN",
                }, {
                    taskId: 2,
                    description: "Schedule Meeting",
                    parentId: 2,
                    status: "OPEN",
                }]
            },
            {
                id: 3,
                name: "Matt",
                tasks: [{
                    taskId: 1,
                    description: "eat lunch",
                    parentId: 3,
                    status: "OPEN"
                }]
            }
        ]
    }

    let nextUserId = 4;
    let nextTaskId = 4;

    let server = new Server();
    // @ts-ignore
    // server.post("login", (schema, request) => {
    //     let login = JSON.parse(request.requestBody)
    //     if (login.email === "admin@test.com" && login.password === "tVF!n@UiAS9K6Ly")
    //         return new Response(200);
    //     if (login.email === "test@test.com" && login.password === "passw0rd")
    //         return new Response(200);
    //     return new Response(400);
    // });

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
        if (!task.taskId) {
            task.taskId = nextTaskId++;
            task.status = "OPEN"
            mockUsers.users
                .find(user => user.id === task.parentId)?.tasks?.push(task)
        } else {
            mockUsers.users.find(user => user.id === task.parentId)?.tasks?.find(t => t.taskId === task.taskId)?.description?.replace(/\*/, task.description);
        }
        return task
    });
    //@ts-ignore
    server.delete("/api/tasks", (schema, request) => {
        let taskToDelete: Task = JSON.parse(request.requestBody);
        console.log(taskToDelete)
        if (taskToDelete.taskId && taskToDelete.parentId) {
            const userIndex = mockUsers.users.findIndex(user => user.id === taskToDelete.parentId)
            let task;
            if (userIndex)
                task = mockUsers.users[userIndex].tasks?.find(t => t.taskId === taskToDelete.taskId)
            if (task)
                task.status = "DELETED"

            console.log(`logged from delete ${mockUsers}`)
        }
    });
    //@ts-ignore
    server.put("/api/tasks", (schema, request) => {
        let taskToDelete: Task = JSON.parse(request.requestBody);
        console.log(taskToDelete)
        if (taskToDelete.taskId && taskToDelete.parentId) {
            const userIndex = mockUsers.users.findIndex(user => user.id === taskToDelete.parentId)
            let task;
            if (userIndex)
                task = mockUsers.users[userIndex].tasks?.find(t => t.taskId === taskToDelete.taskId)
            if (task)
                task.status = "COMPLETE"

            console.log(`logged from delete ${mockUsers}`)
        }
    });
}

export {mockApiServer}