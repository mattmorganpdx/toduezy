import {Editable, EditableInput, EditablePreview, IconButton, SimpleGrid} from "@chakra-ui/core";
import React from "react";
import {Task} from "../../types/Task";

type Props = {
    task: Task,
    contactId: number,
    loadUsers: Function
}

export default function TaskItem({task, contactId, loadUsers}: Props) {

    const deleteTask = async (parentId: number, taskId: number | undefined): Promise<void> => {
        await fetch("api/tasks", {method: "DELETE", body: JSON.stringify({id: taskId, parent: parentId})})
            .then(() => loadUsers());
    }

    const completeTask = async (parentId: number, taskId: number | undefined): Promise<void> => {
        await fetch("api/tasks", {method: "PUT", body: JSON.stringify({id: taskId, parent: parentId})})
            .then(() => loadUsers());
    }

    const onUpdate = (id: number | undefined, parent: number, text: string) => {
        fetch("api/tasks", {method: "POST", body: JSON.stringify({id: id, description: text, parent: parent})})
            .then(() => loadUsers())
    }

    return (<SimpleGrid key={`${task.taskId}-grid`} columns={2} spacing={10}>
            <Editable key={`${task.taskId}-task`} defaultValue={task.description}
                      onSubmit={e => onUpdate(task.taskId, contactId, e)}>
                <EditablePreview
                    textDecoration={task.status === "COMPLETE" ? "line-through" : ""}/>
                <EditableInput/>
            </Editable>
            <SimpleGrid key={`${task.taskId}-grid-inner`} columns={2} spacing={5}>
                <IconButton
                    key={`${task.taskId}-complete`}
                    icon={"check"}
                    aria-label={"complete item"}
                    variant={"ghost"}
                    variantColor="cyan"
                    size="xs"
                    isRound={true}
                    onClick={(e: React.MouseEvent<any>) => {
                        e.preventDefault();
                        completeTask(contactId, task.taskId).then()
                    }}
                    children={null}
                />
                <IconButton
                    key={`${task.taskId}-delete`}
                    icon={"delete"}
                    aria-label={"delete item"}
                    variant={"ghost"}
                    variantColor="cyan"
                    size="xs"
                    isRound={true}
                    onClick={(e: React.MouseEvent<any>) => {
                        e.preventDefault();
                        deleteTask(contactId, task.taskId).then()
                    }}
                    children={null}
                />
            </SimpleGrid>
        </SimpleGrid>
    )
}
