export interface Task {
    taskId?: number,
    description?: string
    parentId: number
    status?: "OPEN" | "COMPLETE" | "DELETED"
}
