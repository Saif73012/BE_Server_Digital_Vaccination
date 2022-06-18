const User = require("../models/users.model");

async function getAllUsers() {
  var result = await User.find({}).exec();
  return result;
}

async function getSpesficUser(id) {
  var result = await User.findById(id, {}).exec();
  return result;
}

async function findByEmail(emailbody) {
  var result = await User.findOne({ email: emailbody }).exec();
  return result;
}

async function createUser(user) {
  var result = await user.save();
  return result;
}

async function updateUser(id, body) {
  var result = await User.findByIdAndUpdate(id, body).exec();
  return result;
}

async function delteUserbyId(id) {
  var result = await User.findByIdAndDelete(id).exec();
  return result;
}

exports.findByEmail = findByEmail;
exports.getAllUsers = getAllUsers;
exports.getSpesficUser = getSpesficUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.delteUserbyId = delteUserbyId;
