// can change "vars" to "const" based on needs
var express = require("express");
var app = express();
var cors = require("cors");

require("dotenv").config({ path: "./config.env" });
var port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// get driver connection
var dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});