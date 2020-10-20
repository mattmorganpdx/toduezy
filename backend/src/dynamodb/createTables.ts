import * as AWS from "aws-sdk";
//const AWS = require('aws-sdk')

const dynamodbOfflineOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: 'local',
    secretAccessKey: 'local'
}


const dynamodb = new AWS.DynamoDB(dynamodbOfflineOptions);

const table_params = [
    {
        TableName: "toduezy_contacts",
        KeySchema: [
            {AttributeName: "contact_id", KeyType: "HASH"},  //Partition key
        ],
        AttributeDefinitions: [
            {AttributeName: "contact_id", AttributeType: "S"},
            {AttributeName: "user_id", AttributeType: "S"}
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    },
    {
        TableName: "toduezy_tasks",
        KeySchema: [
            {AttributeName: "task_id", KeyType: "HASH"},  //Partition key
        ],
        AttributeDefinitions: [
            {AttributeName: "task_id", AttributeType: "S",},
            {AttributeName: "contact_id", AttributeType: "S",},
            {AttributeName: "user_id", AttributeType: "S",}
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    },
    {
        TableName: "toduezy_users",
        KeySchema: [
            {AttributeName: "user_id", KeyType: "HASH"},  //Partition key
        ],
        AttributeDefinitions: [
            {AttributeName: "user_id", AttributeType: "S",}
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }
];
table_params.forEach(param =>
    dynamodb.createTable(param, function (err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    })
);