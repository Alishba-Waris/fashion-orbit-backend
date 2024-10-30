const express = require("express");
const {sendOTP, ResetPassword} = require("../controllers/ForgotPasswordController.js");

const router = express.Router();

router.post('/forgot-password', sendOTP);  
router.post('/reset-password', ResetPassword);

module.exports = router;
