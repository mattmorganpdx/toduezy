import {Task} from "./Task";

export interface UserModel {
    name: string,
}

export interface User extends UserModel{
    id: number,
    tasks?: Task[]
}

export interface UserList {
    users: User[]
}
