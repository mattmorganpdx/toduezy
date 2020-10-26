import * as passport from 'passport'
const router = require('express').Router();
const auth = require('./auth');
import {Requst, Response, Next} from "express"

router.get('/', auth.required, (req: Requst, res: Response, next: Next) => {
    res.status(200)
    return res.json({users: [
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
        ]})
})

module.exports = router;