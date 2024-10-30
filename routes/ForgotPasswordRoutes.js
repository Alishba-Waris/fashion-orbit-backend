const express = require("express");
const sendOTP = require("../controllers/ForgotPasswordController.js");

const router = express.Router();

router.post('/forgot-password', sendOTP);    

module.exports = router;
