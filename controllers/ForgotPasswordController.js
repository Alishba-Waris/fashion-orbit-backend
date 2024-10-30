const nodemailer = require("nodemailer");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const sendOTP = async (req, res) => {
  console.log("sendOTP endpoint was hit");
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

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
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #007bff; text-align: center;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Please use the following OTP code to reset your password:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #007bff;">${otp}</span>
        </div>
        <p>This OTP code is valid for <strong>10 minutes</strong>. If you did not request this password reset, please ignore this email or contact our support team if you have any concerns.</p>
        <p>Thank you!</p>
        <p style="font-size: 14px; color: #999; text-align: center;">
          FashionOrbit Support Team
          <br>
          <a href="https://yourwebsite.com" style="color: #007bff;">www.FashionOrbit.com</a>
        </p>
      </div>
    ,`,
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const ResetPassword = async (req, res) => {
  console.log("ResetPassword endpoint was hit");
const { email, otp, newPassword } = req.body;

try {
  const user = await User.findOne({ email });

  if (!user || user.resetOtp !== otp || Date.now() > user.otpExpiry) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOtp = null;     
  user.otpExpiry = null;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
} catch (error) {
  res.status(500).json({ message: "Server error", error });
}
};

module.exports = {sendOTP, ResetPassword};
