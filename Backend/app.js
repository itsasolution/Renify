var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
const session = require('express-session');
// const passport = require('passport');
const flash = require("connect-flash");
const cors = require("cors")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

// const FRONTEND_ORIGIN = 'http://localhost:3000';
// const FRONTEND_ORIGIN = 'https://renify.vercel.app';

// app.use(cors({
//   origin: FRONTEND_ORIGIN,
//   credentials: true // This ensures cookies are included in the requests
// }));

// ___________________________________________________________________________


// ________________________________________
//always write sessions before logger 
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "Astronomer"
}))

// app.use(passport.initialize())
// app.use(passport.session())
// //serialize the user's unique identifier (like user ID) into the session, allowing Passport to later retrieve the user details when needed.
// passport.serializeUser(usersModel.serializeUser())

// // The counterpart to serializeUser is deserializeUser, which allows you to retrieve the full user object based on the serialized data stored in the session.
// passport.deserializeUser(usersModel.deserializeUser())

app.use(flash())

// _____________________________________
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(4000)

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
