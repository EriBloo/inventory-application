const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const mongoDBkey = require('./mongoDBkey');
const mongoDB = process.env.MONGODB_URI || mongoDBkey;

require('./models/item');
require('./models/comment');
require('./models/subcategory');
const Category = require('./models/category');
const Manufacturer = require('./models/manufacturer');

const indexRouter = require('./routes/index');
const itemRouter = require('./routes/items');
const categoryRouter = require('./routes/categories');
const manufacturerRouter = require('./routes/manufacturers');
const adminRouter = require('./routes/admin');

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'cdn.jsdelivr.net'],
        styleSrc: ["'self'", 'cdn.jsdelivr.net'],
        fontSrc: ["'self'", 'cdn.jsdelivr.net'],
      },
    },
  }),
);
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  Category.find()
    .sort([['name', 'ascending']])
    .exec(function (err, result) {
      if (err) {
        next(err);
      }
      res.locals.categories = result;
      next();
    });
});

app.use(function (req, res, next) {
  Manufacturer.find()
    .sort([['name', 'ascending']])
    .exec(function (err, result) {
      if (err) {
        next(err);
      }
      res.locals.manufacturers = result;
      next();
    });
});

app.use('/', indexRouter);
app.use('/items', itemRouter);
app.use('/categories', categoryRouter);
app.use('/manufacturer', manufacturerRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
