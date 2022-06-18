const mongoose = require("mongoose");
const hash = require("../auth/hash");

const Schema = mongoose.Schema;

const User = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  officeName: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  isCheckedByAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

User.pre("save", async function (next) {
  try {
    let hashedpw = await hash.generate(this.password);
    this.password = hashedpw;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", User);
