// Packages used for authentication (Session & Passport)
const session = require("express-session");
const passport = require("passport");

// Passport initial setup
require("./config/passport");

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// Session settings: allows our app to maintain the sessions and our users in it
app.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: false,
  })
);

// To allow our app to use passport for auth
app.use(passport.initialize());
app.use(passport.session());

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const projectName = "prog-lang-tutor-server";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

// const studentRoutes = require('./routes/student.routes');
// app.use('/api/student', studentRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api/user", userRoutes);

// To be used for reinitializing the DB after it is dropped
app.use("/seed", require("./routes/seeds/seed-route"));

app.use("/api/booking", require("./routes/booking.routes"));

app.use("/api", require("./routes/picture.routes"));

// app.use('/student', require('./routes/student.routes'));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
