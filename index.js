// Express Router

const express = require("express");
const app = express();
// Port
var PORT = process.env.PORT || 3000;

//Mysql connection
var connection = require("./database/Connection");
const { createRole } = require("./Models/master_data");

// Routes import
var userRouter = require("./routes/userRouter");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/auth/register", userRouter.register);
app.use("/auth/login", userRouter.login);

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
