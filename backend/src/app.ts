import createError from 'http-errors'
import * as express from 'express'
import * as path from 'path'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import * as dynamoose from "dynamoose";

// Create new DynamoDB instance
dynamoose.aws.sdk.config.update({
  "accessKeyId": "local",
  "secretAccessKey": "local",
  "region": "us-east-1"
});

// Set DynamoDB instance to the Dynamoose DDB instance
/*dynamoose.aws.ddb.set(ddb);*/

dynamoose.aws.ddb.local();

require('./models/Users');
require('./config/passport');
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error', { error: err });
});

module.exports = app;
