const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;
const connectDB = require("./config/mongoose");
connectDB();
const mongoose = require("mongoose");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongodb-session")(session);
const app = express();
// middleware
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// app.use(express.json());

//setup the view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Configure express-session
app.use(
  session({
    name: "BloodLine",
    // TODO: Change the secret before deployment into production mode
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100
    },
    store: new MongoStore(
      {
        uri: "mongodb+srv://vikrant:vikrant123@bloodline.afkfsqe.mongodb.net/",
        AutoRemove: "disabled"
      },
      function (err) {
        console.log(err || "connect mongodb setup is ok");
      }
    )
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Move passport.setAuthenticatedUser middleware here
app.use(passport.setAuthenticatedUser);

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error : ${err}`);
  }
  console.log(`Server is running in the port: ${port}`);
});
