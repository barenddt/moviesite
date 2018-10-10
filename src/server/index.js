//Imports
const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const debug = require("debug")("app");
const apiRouter = require("./Routes/apiRouter");
const mongoose = require("mongoose");
const { mongodb } = require("./config");
const path = require("path");

//Initialize Express
const app = express();

//Connect to MongoDB
mongoose.connect(
  `mongodb://${mongodb.user}:${
    mongodb.passw
  }@ds125953.mlab.com:25953/betacritic`,
  { useNewUrlParser: true }
);

//Middleware
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api", apiRouter);

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

//Listen on PORT
app.listen(process.env.PORT || 8080, () =>
  debug(`Listening on PORT ${chalk.blue(process.env.PORT || 8080)}`)
);
