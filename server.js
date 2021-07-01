const { json } = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI =
  "mongodb+srv://nafismolla:Pass2005@chat-app.l6jef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const routes = require("./routes/api");

//mongoDB stuff
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("database has been connected");
});

app.use(cors());
app.use(express.json()); //parses every json
app.use(express.urlencoded({ extended: false }));

//http logger
app.use(morgan("tiny"));

app.use("/", routes);

app.listen(PORT, console.log(`server is starting ${PORT}`));
