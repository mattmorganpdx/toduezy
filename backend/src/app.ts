import createError from 'http-errors'
import * as express from 'express'
import * as path from 'path'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import * as dynamoose from "dynamoose";
import * as cors from "cors";

// Create new DynamoDB instance
dynamoose.aws.sdk.config.update({
  "accessKeyId": "local",
  "secretAccessKey": "local",
  "region": "us-east-1"
});

// Set DynamoDB instance to the Dynamoose DDB instance
/*dynamoose.aws.ddb.set(ddb);*/

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

dynamoose.aws.ddb.local();

require('./models/Users');
require('./config/passport');
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: err });
  next();
});

module.exports = app;
