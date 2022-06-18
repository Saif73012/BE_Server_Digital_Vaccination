const bcrypt = require("bcrypt");

const saltRounds = 10;

async function generate(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function compare(password, hash) {
  return await bcrypt.compare(password, hash);
}

exports.generate = generate;
exports.compare = compare;
