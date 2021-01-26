// npx ts-node load.ts
import * as dynamoose from "dynamoose";
import {v4 as uuidV4} from 'uuid';
import Contact from "../models/Contacts"
import User from "../models/Users"
import Task from "../models/Tasks"

// Create new DynamoDB instance
dynamoose.aws.sdk.config.update({
    "accessKeyId": "local",
    "secretAccessKey": "local",
    "region": "us-east-1"
});

dynamoose.aws.ddb.local();

// Create User
async function createUser() {
    const user = new User({email: "admin@test.com", displayName: "Matt Morgan"});
    user["setPassword"]("tVF!n@UiAS9K6Ly");
    try {
        await user.save();
        const userFromDB = await User.get({email: "admin@test.com"});
        return userFromDB["userId"]
    } catch (e) {

    }
    return
}

async function createContact(userUuid, displayName) {
    const contactId = uuidV4();
    const contact = new Contact({parentId: userUuid, contactId: contactId, displayName: displayName});
    try {
        await contact.save();
        const contactFromDB = await Contact.get({parentId: userUuid, contactId: contactId})
        return contactFromDB["contactId"]
    } catch (e) {

    }
    return
}

async function createTask(contactUuid, displayName) {
    const taskId = uuidV4();

    const task = new Task({parentId: contactUuid, taskId: taskId, displayName: displayName})
    try {
        await task.save();
        const taskFromDB = await Task.get({parentId: contactUuid, taskId: taskId})
        return taskFromDB["taskId"]
    } catch (e) {

    }
}

async function create() {
    const userId = await createUser();
    console.log(`created user ${userId}`);
    const charlieId = await createContact(userId, "charlie");
    const steveId = await createContact(userId, "steve");
    const adamId = await createContact(userId, "adam");
    console.log(`created charlie: ${charlieId}, steve: ${steveId}, adam: ${adamId}`)
    const contacts = await Contact.query({parentId: userId}).exec();
    contacts.forEach(c => console.log(c))
    const task = await Task["createTask"](userId, charlieId)
    await task.save()
    console.log(task)
    const ctasks = await Task.query({parentId: userId}).exec()

}

create().then(() => console.log("creation complete"))

// Create Contacts


// Create Tasks

