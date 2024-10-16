const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userID: {
        type: String
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true    
    },
    password: {
        type: String,
        require: true
    }
})

const User = mongoose.model("User", UserSchema)
module.exports = User;

