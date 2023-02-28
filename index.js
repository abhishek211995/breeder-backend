// Express Router

const express = require("express");
const app = express();
// Port
var PORT = process.env.PORT || 3000;

//Mysql connection
var connection = require("./database/Connection");

// Routes import
var userRouter = require("./routes/userRouter");
var masterRouter = require("./routes/masterRouter");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", userRouter);
app.use("/", masterRouter);


// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
