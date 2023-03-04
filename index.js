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
var animalRouter = require("./routes/animalRouter");
var breederRouter = require("./routes/breederRouter");
// cors
const cors = require("cors");
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", userRouter);
app.use("/", masterRouter);
app.use("/", animalRouter);
app.use("/", breederRouter);
// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
