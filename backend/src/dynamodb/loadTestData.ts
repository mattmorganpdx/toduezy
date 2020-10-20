const {db} = require('./dynamodb.ts')

db('put',
    {
        TableName: 'toduezy_users',
        Item: {
            'user_id': '3f5c076d-2355-4759-bfc0-4750d71d8a9b',
            'user_email': 'admin@toduezy.mattmorgan.dev'
        }
    }).then(request => request.send())


db('get',
    {
        TableName: 'toduezy_users',
        Key: {
            'user_id': '3f5c076d-2355-4759-bfc0-4750d71d8a9b',
        }
    }).then(r => r.promise()
        .then(u => console.log(u)))

