const express = require("express");
const {sendOTP, resetPassword} = require("../controllers/ForgotPasswordController.js");

const router = express.Router();

router.post('/forgot-password', sendOTP);  
router.post('/reset-password', resetPassword);

module.exports = router;
