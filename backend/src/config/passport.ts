import * as dynamoose from "dynamoose";
const passport = require('passport')

const LocalStrategy = require('passport-local');

import User from "../models/Users";


passport.use('passport-local', new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, async (email, password, done) => {
    try {
        const user = await User.get({email: email})
        if (!user || !user["validatePassword"](password)) {
            return done(null, false, {errors: {'email or password': 'is invalid'}});
        }
        return done(null, user);
    } catch (e) {
        return done(null, false, {errors: {e}});
    }
}));