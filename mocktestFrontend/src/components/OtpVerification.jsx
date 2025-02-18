import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const verifyOtp = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email"); // Get stored email

    try {
      await axios.post("https://mocktest-backend-imod.onrender.com/auth/verify-otp", { email, otp });
      navigate("/welcome"); // Redirect on success
    } catch (error) {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <form onSubmit={verifyOtp}>
      <label>Enter OTP:</label>
      <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button type="submit">Verify OTP</button>
    </form>
  );
};

export default OtpVerification;
