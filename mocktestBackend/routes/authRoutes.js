const express = require("express");
const router = express.Router();
const User = require("../model/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Set in .env file
    pass: process.env.EMAIL_PASSWORD, // Set in .env file
  },
});

// Route to send a simple test email
router.get("/send-test-email", async (req, res) => {
  try {
    console.log("Sending test email...");
    console.log("From:", process.env.EMAIL);
    console.log("To: rajajin944@gmail.com");

    // Send a test email to a specified recipient (replace with your email or a valid recipient)
    await transporter.sendMail({
      from: process.env.EMAIL, // Your email
      to: 'rajajin944@gmail.com', // Change this to a valid recipient's email
      subject: 'Test Email',
      text: 'This is a test email sent from your application.',
    });

    console.log("Test email sent successfully.");
    res.json({ message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'Failed to send test email' });
  }
});

// Route to generate and send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  console.log("Received email for OTP generation:", email);

  if (!email) {
    console.log("Error: Email is required");
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 mins

    console.log("Generated OTP:", otp);
    console.log("OTP expires at:", otpExpires);

    // Save OTP to DB (update if email already exists)
    await User.findOneAndUpdate(
      { email },
      { otp, otpExpires },
      { upsert: true, new: true }
    );

    // Send OTP email
    console.log("Sending OTP email to:", email);
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    });

    console.log("OTP sent successfully to:", email);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  console.log("Received OTP verification request for email:", email);

  if (!email || !otp) {
    console.log("Error: Missing fields");
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < new Date()) {
      console.log("Error: Invalid or expired OTP");
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // OTP is correct, delete OTP from DB after verification
    await User.deleteOne({ email });

    console.log("OTP verified successfully for email:", email);
    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

  


