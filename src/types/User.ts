export interface User {
    id: number,
    name: string,
    tasks?: {
        id: number,
        description: string
    }[]
}

export interface UserList {
    users: User[]
}
