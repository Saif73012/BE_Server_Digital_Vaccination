const Patient = require("../models/patient.model");

async function getAllPatients() {
  var result = await Patient.find({}).exec();
  return result;
}

async function getSpesficPatient(id) {
  var result = await Patient.findById(id, {}).exec();
  return result;
}

async function createPatient(patient) {
  var result = await patient.save();
  return result;
}

async function updatePatient(id, body) {
  var result = await Patient.findByIdAndUpdate(id, body).exec();
  return result;
}

async function deltePatientbyId(id) {
  var result = await Patient.findByIdAndDelete(id).exec();
  return result;
}

exports.getAllPatients = getAllPatients;
exports.getSpesficPatient = getSpesficPatient;
exports.createPatient = createPatient;
exports.updatePatient = updatePatient;
exports.deltePatientbyId = deltePatientbyId;
