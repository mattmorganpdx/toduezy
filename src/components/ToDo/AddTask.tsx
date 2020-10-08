import {IconButton} from "@chakra-ui/core";
import React, {useState} from "react";

type Props = {
    contactId: number,
    loadUsers: Function,
}

export default function AddTask({contactId, loadUsers}: Props) {
    let [adding, setAdding] = useState(false);

    const addTask = async (id: number): Promise<void> => {
        setAdding(true);
        await fetch("api/tasks", {method: "POST", body: JSON.stringify({description: "", parent: id})})
            .then(() => loadUsers());
        setAdding(false);
    }

    return (<IconButton
        key={contactId}
        icon="add"
        aria-label={"add item"}
        variant={"ghost"}
        variantColor="cyan"
        size="xs"
        isRound={true}
        isLoading={adding}
        onClick={(e: React.MouseEvent<any>) => {
            e.preventDefault();
            addTask(contactId).then();
        }}
        children={null}
    />)
}