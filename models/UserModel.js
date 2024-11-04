const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
    },
    name: {
        type: String,
        required: true,  
    },
    email: {
        type: String,
        required: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true, 
    },
    resetOtp: { 
        type: String, 
        default: null,
    },
    otpExpiry: { 
        type: Date, 
        default: null,
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
