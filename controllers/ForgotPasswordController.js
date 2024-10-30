const nodemailer = require("nodemailer");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const sendOTP = async (req, res) => {
    console.log("sendOTP endpoint was hit");
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) 
        return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000); 
    const otpExpiry = Date.now() + 600000;

    user.resetOtp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {  
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Password Reset OTP",
        text: `Use this OTP to reset your password: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = sendOTP;
