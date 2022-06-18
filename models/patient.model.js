const mongoose = require("mongoose");
const hash = require("../auth/hash");

const Schema = mongoose.Schema;

const Patient = Schema({
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
    unique: true,
  },
  entries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Entry",
    },
  ],
});

Patient.pre("save", async function (next) {
  try {
    let hashedpw = await hash.generate(this.password);
    this.password = hashedpw;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Pateint", Patient);
