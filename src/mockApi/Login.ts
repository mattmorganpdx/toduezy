import {Server, Response} from "miragejs"

function mockApiServer() {
    let server = new Server();
    // @ts-ignore
    server.post("login", (schema, request) => {
        let login = JSON.parse(request.requestBody)
        if (login.email === "admin@test.com" && login.password === "tVF!n@UiAS9K6Ly")
            return new Response(200);
        return new Response(400);
    });
}

export {mockApiServer}