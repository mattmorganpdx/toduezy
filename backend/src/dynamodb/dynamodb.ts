//const AWS = require('aws-sdk')
import * as AWS from 'aws-sdk'

const dynamodbOfflineOptions = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'local',
        secretAccessKey: 'local'
    },
    isOffline = () => true //process.env.IS_OFFLINE

const client = isOffline()
    ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions)
    : new AWS.DynamoDB.DocumentClient()

// add callback?
const db = async (method: string, params: any): Promise<AWS.Request<string, object>> => {
    return await client[method](params) ;
};

module.exports = {db}