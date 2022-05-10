var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cron = require('node-cron');
const job = require("./cron-jobs");
const db = require("./config/database");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
  res.render('error');
});

// cron-jobs

  // cron.schedule('*/2 * * * *', () => {
  //   console.log('running a task every two minutes');
  // });

  // cron.schedule('* * * January,September Sunday', () => {
  //   console.log('running on Sundays of January and September');
  // });

  // cron.schedule('0 1 * * *', () => {
  //   console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
  // }, {
  //   scheduled: true,
  //   timezone: "America/Sao_Paulo"
  // });

  var XLSX = require('xlsx')
  var workbook = XLSX.readFile("./master.xlsx");
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  console.log(xlData);

/// events
var events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}

//Assign the eventhandler to an event:
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream');



module.exports = app;
