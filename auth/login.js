var express = require("express");
var jwt = require("jsonwebtoken");

const hash = require("./hash");
const patientController = require("../controller/patientController");
const User = require("../models/users.model");
const Patient = require("../models/patient.model");

const userController = require("../controller/userController");
var router = express.Router();

router.post("/user", async (req, res) => {
  console.log("user router PostCALL");
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    adress: req.body.adress,
    officeName: req.body.officeName,
    isCheckedByAdmin: req.body.isCheckedByAdmin,
  });
  try {
    let result = await userController.createUser(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
  console.log("user router PostCALL done");
});

router.post("/patient", async (req, res) => {
  console.log("user router PostCALL");

  const patient = new Patient({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  try {
    let result = await patientController.createPatient(patient);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
  console.log("user router PostCALL done");
});

router.post("/", async function (req, res) {
  var user;
  var pw;
  var searchdoc = await User.findOne({ email: req.body.email }).exec();
  var searchpatient = await Patient.findOne({ email: req.body.email }).exec();
  var searchpatient2 = await Patient.findOne({
    username: req.body.username,
  }).exec();
  if (searchdoc) {
    user = searchdoc;
    pw = searchdoc.password;
  } else if (searchpatient) {
    user = searchpatient;
    pw = searchpatient.password;
  } else if (searchpatient2) {
    user = searchpatient2;
    pw = searchpatient2.password;
  } else {
    user = null;
  }
  if (user === null) {
    res
      .status(403)
      .send({ success: false, msg: "Authentication Failed, User not found" });
  } else {
    var isPw = await hash.compare(req.body.password, pw);
    if (isPw) {
      const token = jwt.sign(
        { user: user },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        },
        { algorithm: "RS256" }
      );
      res.json({ success: true, token: token });
    } else {
      res
        .status(403)
        .send({ success: false, msg: "Authentication Failed, PW is wrong" });
    }
  }
});

module.exports = router;
