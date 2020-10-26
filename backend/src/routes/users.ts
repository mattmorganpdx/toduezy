import * as passport from 'passport'
const router = require('express').Router();
const auth = require('./auth');
import {Requst, Response, Next} from "express"
import User from "../models/Users";

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req: Requst, res: Response, next: Next) => {
  const { body: { user } } = req;

  if(!user) {
    return res.status(422).send({
      errors: {
        user: 'is required',
      },
    });
  }

  if(!user.email) {
    return res.status(422).send({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).send({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new User(user);
  finalUser["setPassword"](user.password);
  return finalUser.save()
      .then(async () => res.json({ user: await finalUser["toAuthJSON"]() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req: Requst, res: Response, next: Next) => {
  const { body: { user } } = req;
  console.log(req.body)

  if(!user || !user.email) {
    return res.status(422).send({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).send({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('passport-local', { session: false }, async (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      res.cookie('token', await passportUser.generateJWT(), {
        maxAge: 1000000000,
        secure: false, // set to true if your using https
        httpOnly: true,
      })
      return res.status(204).send()
    }

    return res.status(400).send(info);
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req: Requst, res: Response, next: Next) => {
  const { payload: { email } } = req;

  return User.get({email: email})
      .then(async (user) => {
        if(!user) {
          return res.sendStatus(400);
        }

        return res.json({ user: await user["toAuthJSON"]() });
      });
});

module.exports = router;