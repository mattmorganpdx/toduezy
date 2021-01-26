import {Next, Requst, Response} from "express"
import Contact from "../models/Contacts";
import Task from "../models/Tasks";

const router = require('express').Router();
const auth = require('./auth');

type TaskType = {
    id?: number,
    description?: string
    parent: number
    status?: "OPEN" | "COMPLETE" | "DELETED"
}

async function getContacts(userId: string) {
    try {
        const contacts = await Contact.query({parentId: userId}).exec();
        const tasks = await Task.query({parentId: userId}).exec();
        return contacts.map(doc => {
            return {
                id: doc["contactId"],
                name: doc["displayName"],
                tasks: tasks.filter(task => task.taskId.startsWith(doc["contactId"]))
            }
        })
    } catch (e) {

    }
    return
}

router.get('/', auth.required, (req: Requst, res: Response, next: Next) => {
    res.status(200)
    const {payload: {id}} = req;
    console.log(id)
    getContacts(id).then(contacts => {
        return res.json({
                users: contacts
            }
        )
    });
    /*return res.json({users: [
            {id: 1, name: "Bob", tasks: []},
            {
                id: 2,
                name: "Alice",
                tasks: [{
                    id: 1,
                    description: "Send Email",
                    parent: 2,
                    status: "OPEN",
                }, {
                    id: 2,
                    description: "Schedule Meeting",
                    parent: 2,
                    status: "OPEN",
                }]
            },
            {
                id: 3,
                name: "Matt",
                tasks: [{
                    id: 1,
                    description: "eat lunch",
                    parent: 3,
                    status: "OPEN"
                }]
            }
        ]})*/
})

module.exports = router;