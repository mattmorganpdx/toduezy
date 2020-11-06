import * as dynamoose from "dynamoose";

const ContactsSchema = new dynamoose.Schema(
    {
        parentId: {
            hashKey: true,
            type: String
        },
        contactId: {
            rangeKey: true,
            type: String,
            required: true,
        },
        displayName: String
    }, {
        "saveUnknown": true,
        "timestamps": true
    }
);

const Contact = dynamoose.model("Contact", ContactsSchema, {"create": true});

export default Contact