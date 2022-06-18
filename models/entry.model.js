const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientController = require("../controller/patientController");
const Entry = Schema({
  date: {
    type: Date,
    required: true,
  },
  expireDate: {
    type: Date,
    required: false,
  },
  user_Id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patient_Id: {
    type: Schema.Types.ObjectId,
    ref: "Pateint",
  },
  vacine_Id: {
    type: Schema.Types.ObjectId,
    ref: "Vacine",
    required: true,
  },
});

Entry.post("save", async function (doc, next) {
  var patientID = doc.patient_Id;
  var getAllEntriesFromPatient = [];
  var entry = await patientController.getSpesficPatient(patientID);
  getAllEntriesFromPatient = entry.entries;
  var resultArray = [];
  for (const entry of getAllEntriesFromPatient) {
    let obj = JSON.stringify(entry);
    obj = JSON.parse(obj);
    if (!resultArray.includes(obj)) resultArray.push(obj);
  }

  var string2obj = JSON.stringify(doc._id);
  string2obj = JSON.parse(string2obj);
  if (!resultArray.includes(string2obj)) resultArray.push(string2obj);

  var resultObj = new Object();
  resultObj.entries = resultArray;
  resultObj = JSON.parse(JSON.stringify(resultObj));
  next();
});

module.exports = mongoose.model("Entry", Entry);
