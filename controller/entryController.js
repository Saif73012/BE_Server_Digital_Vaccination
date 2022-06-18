const Entry = require("../models/entry.model");

async function getAllEntries(isRouter) {
  if (isRouter) {
    var result = await Entry.find({})
      .populate("user_Id")
      .populate("patient_Id")
      .populate("vacine_Id")
      .exec();
    return result;
  } else {
    var result = await Entry.find({}).exec();
    return result;
  }
}

async function getSpesficEntryfiltered(id, isRouter) {
  if (isRouter) {
    var result = await Entry.find({ patient_Id: id })
      .sort("-date")
      .limit(3)
      .populate("user_Id")
      .populate("patient_Id")
      .populate("vacine_Id")
      .exec();
    return result;
  } else {
    var result = await Entry.find({ patient_Id: id })
      .sort("-date")
      .limit(3)
      .exec();
    return result;
  }
}

async function getSpesficEntryfromPatientId(id, isRouter) {
  if (isRouter) {
    var result = await Entry.find({ patient_Id: id })
      .sort("-date")
      .populate("user_Id")
      .populate("patient_Id")
      .populate("vacine_Id")
      .exec();
    return result;
  } else {
    var result = await Entry.find({ patient_Id: id })
      .sort("-date")
      .limit(3)
      .exec();
    return result;
  }
}

async function getSpesficEntry(id, isRouter) {
  if (isRouter) {
    var result = await Entry.findById(id, {})
      .populate("user_Id")
      .populate("patient_Id")
      .populate("vacine_Id")
      .exec();
    return result;
  } else {
    var result = await Entry.findById(id, {}).exec();
    return result;
  }
}

async function createEntry(entry) {
  var result = await entry.save();
  return result;
}

async function updateEntry(id, body) {
  var result = await Entry.findByIdAndUpdate(id, body).exec();
  return result;
}

async function delteEntrybyId(id) {
  var result = await Entry.findByIdAndDelete(id).exec();
  return result;
}

exports.getAllEntries = getAllEntries;
exports.getSpesficEntry = getSpesficEntry;
exports.getSpesficEntryfromPatientId = getSpesficEntryfromPatientId;
exports.getSpesficEntryfiltered = getSpesficEntryfiltered;
exports.createEntry = createEntry;
exports.updateEntry = updateEntry;
exports.delteEntrybyId = delteEntrybyId;
