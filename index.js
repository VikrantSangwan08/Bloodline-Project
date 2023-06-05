const express = require("express");
const mongoose = require("mongoose");
const app = express();
// middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("./assets"));
app.use(express.json());
const port = 8000;
const connectDB = require("./config/mongoose");
connectDB();

//use express router
app.use("/", require("./routes"));

//setup the view engine
app.set("view engine", "ejs");
app.set("views", "views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error : ${err}`);
  }
  console.log(`Server is running in the port: ${port}`);
});
