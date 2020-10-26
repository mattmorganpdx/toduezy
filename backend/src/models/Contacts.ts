import * as dynamoose from "dynamoose";
import { v4 as uuidV4 } from 'uuid';

const ContactsSchema = new dynamoose.Schema(
    {
        parentID: {
            hashKey: true,
            type: String
        },
        contactId: {
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

const Contact = dynamoose.model("Contact", ContactsSchema, {"create": true});

export default Task