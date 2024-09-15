const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
const fs = require("fs");
const mongoose = require('./config/mogoose_config')

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//routes autoloading
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);

app.listen(process.env.PORT,_=>console.log("server running"));
