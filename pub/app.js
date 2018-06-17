var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var testRouter = require('./routes/ddee');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/u', usersRouter);

app.use('/test', testRouter);

var router = express.Router

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404通った')
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('500通った')

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  // レスポンスステータスを設定
  res.status(500);
  // 対象へレンダリング
  res.render('user', { title: '500 error' });


});

module.exports = app;
