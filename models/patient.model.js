const mongoose = require("mongoose");
const hash = require('../auth/hash');

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
    // baustelle --> ObjectIDS type --> cast funktioniert nicht
    // look here https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
    entries:[{
        type: Schema.Types.ObjectId,
        ref: "Entry",
    }],
    token: { 
        type: String 
    }
    

})

module.exports = mongoose.model("Pateint",Patient);