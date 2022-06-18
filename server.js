const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
var patientMiddleware = require("./middleware/patient_middleware");
var entryMiddleware = require("./middleware/entry_middleware");
var jwtMiddleware = require("./middleware/jwt_middleware");

//installing cors for the BE
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.json({ message: "Welcome to the backend env." });
});

//middleware
var userRoute = require("./routes/user");
app.use("/user", jwtMiddleware, userRoute);

var vacineRoute = require("./routes/vacine");
app.use("/vacine", jwtMiddleware, vacineRoute);

var patientRoute = require("./routes/patient");
app.use("/patient", jwtMiddleware, patientMiddleware, patientRoute);

var entryRoute = require("./routes/entry");
app.use("/entry", jwtMiddleware, entryMiddleware, entryRoute);
// create more routes

//authentication
var loginRouter = require("./auth/login");
app.use("/login", patientMiddleware, entryMiddleware, loginRouter);

const url = process.env.DB_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB is alive");
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
