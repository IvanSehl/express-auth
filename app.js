const express = require('express');
const expressLayouts = require('express-ejs-layouts');
// const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const { Sequelize, DataTypes } = require('sequelize');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB config
// const sequelize = new Sequelize('postgres://ldbpqiwx:s0715VRAqwhk7z7Zvfuox11OJfG077XW@hattie.db.elephantsql.com:5432/ldbpqiwx');
// const sequelize = new Sequelize('postgres://postgres:1@localhost:5678/postgres');


// async () => await User.sync();
// console.log("The table for the User model was just (re)created!");

// const db = require('./config/keys').postgres;

// Connect to Mongo
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected.....'))
//   .catch(err => console.log(err));

// Connect to Postgre
try {
  async () => await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));