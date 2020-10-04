export interface Task {
    id?: number,
    description?: string
    parent: number
    status?: "OPEN" | "COMPLETE" | "DELETED"
}
