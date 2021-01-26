import * as dynamoose from "dynamoose";
import {v4 as uuidV4} from 'uuid';

const TasksSchema = new dynamoose.Schema(
    {
        parentId: {
            hashKey: true,
            type: String
        },
        taskId: {
            rangeKey: true,
            type: String,
            required: true,
        },
        description: String
    }, {
        "saveUnknown": true,
        "timestamps": true
    }
);

const Task = dynamoose.model("Task", TasksSchema, {"create": true});

Task.methods.set("createTask",  function (userId, contactId) {
    const taskId = uuidV4()
    console.log(`hello ${taskId}`)
    return new Task({
        parentId: userId,
        taskId: `${contactId}#${taskId}`,
        description: "test item xxx"
    }).save()


})

export default Task

