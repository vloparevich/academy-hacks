// const session = require('express-session');

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// Session settings: allows our app to maintain the sessions and our users in it
// app.use(
//   session({
//     secret: "some secret goes here",
//     resave: true,
//     saveUninitialized: false,
//   })
// );

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

const projectName = 'prog-lang-tutor-server';
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

app.use((req, res, next) => {
  console.log('HITTING THE ACCES-CONTROL...');
  res.header(
    'Access-Control-Allow-Origin',
    'https://the-academy-hacks.netlify.app'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  next();
});

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// const studentRoutes = require('./routes/student.routes');
// app.use('/api/student', studentRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/user', userRoutes);

// To be used for reinitializing the DB after it is dropped
app.use('/api/seed', require('./routes/seed.routes'));

app.use('/api/booking', require('./routes/booking.routes'));

app.use('/api/profile', require('./routes/profile.routes'));

app.use('/api/lesson', require('./routes/lesson.routes'));

app.use('/api/review', require('./routes/tutorReview.routes'));

// app.use('/student', require('./routes/student.routes'));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
