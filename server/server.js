const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


require("dotenv").config({ path: "./config.env" });
var port = process.env.PORT || 5000;

var db = mongoose.connection;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://mern:Password@merndemo.i6veu.mongodb.net/StemSpace")

app.use(require("./routes/record"));
app.use("/", require("./routes/userRoute"));

// get driver connection
var dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});