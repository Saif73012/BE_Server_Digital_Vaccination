const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const Vacine = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    abbrevation:{
        type: String,
        required:true,
    },
    information:{
        type: String,
        required:true,
    },
    url:{
        type: String,
        required:true,
    }
})

module.exports = mongoose.model("Vacine",Vacine);