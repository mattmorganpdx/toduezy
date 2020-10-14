export const addUser = (name: string): void => {
    fetch("api/users", {method: "POST", body: JSON.stringify({name: name})})
        .then()
}