const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const cookieParser = require("cookie-parser");
const app = express();


app.use(cookieParser());

require("dotenv").config();
const fs = require("fs");
const mongoose = require("./config/mogoose_config");

app.use(express.json({ limit: "20mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:5173", // Change this to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Specify allowed headers
  })
);

//routes autoloading
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);

app.listen(process.env.PORT, (_) => console.log("server running"));
