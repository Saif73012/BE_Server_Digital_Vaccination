const mongoose = require("mongoose");
const hash = require('../auth/hash');

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
    isDoctor:{
        type: Boolean,
        required: true,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false,
    },
    isCheckedByAdmin:{
        type: Boolean,
        required: true,
        default: false,
    },
    token: { 
        type: String 
    }
})

User.pre("save", async  function(next){
    try {
        let hashedpw = await hash.generate(this.password)
        this.password = hashedpw
        next()
    } catch (error) {
        next(error)
    }
})


module.exports = mongoose.model("User",User);