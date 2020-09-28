import {Task} from "./Task";

export interface User {
    id: number,
    name: string,
    tasks?: Task[]
}

export interface UserList {
    users: User[]
}
