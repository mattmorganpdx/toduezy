import * as dynamoose from "dynamoose";
import { v4 as uuidV4 } from 'uuid';

const TasksSchema = new dynamoose.Schema(
    {
        parentID: {
            hashKey: true,
            type: String
        },
        taskId: {
            rangeKey: true,
            type: String,
            required: true,
            default: uuidV4,
            forceDefault: true
        },
        displayName: String
    }, {
        "saveUnknown": true,
        "timestamps": true
    }
);

const Task = dynamoose.model("Task", TasksSchema, {"create": true});

export default Task

