const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./routes/api');

const app = express();

// dev
app.use(cors({origin: 'http://localhost:8081'}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// env
app.set('env', 'production');

if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/', api);
} else if (app.get('env') === 'development') {
  app.use('/', api);
} else {
  next();
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({
      error: {},
      message: err.message
  });
});

module.exports = app;
