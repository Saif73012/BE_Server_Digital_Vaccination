const Vacine = require("../models/vacine.model");

async function getAllVacines() {
  var result = await Vacine.find({}).exec();
  return result;
}

async function getSpesficVacine(id) {
  var result = await Vacine.findById(id, {}).exec();
  return result;
}

async function createVacine(vacine) {
  var result = await vacine.save();
  return result;
}

async function updateVacine(id, body) {
  var result = await Vacine.findByIdAndUpdate(id, body).exec();
  return result;
}

async function delteVacinebyId(id) {
  var result = await Vacine.findByIdAndDelete(id).exec();
  return result;
}

exports.getAllVacines = getAllVacines;
exports.getSpesficVacine = getSpesficVacine;
exports.createVacine = createVacine;
exports.updateVacine = updateVacine;
exports.delteVacinebyId = delteVacinebyId;
