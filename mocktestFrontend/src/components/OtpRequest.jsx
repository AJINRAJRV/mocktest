import { useState } from "react";
import axios from "axios";

const OtpRequest = ({ setShowOtpForm }) => {
  const [email, setEmail] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/send-otp", { email });
      localStorage.setItem("email", email); // Store email for verification step
      setShowOtpForm(true);
    } catch (error) {
      alert("Error sending OTP");
    }
  };

  return (
    <form onSubmit={sendOtp}>
      <label>Email:</label>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Send OTP</button>
    </form>
  );
};

export default OtpRequest;
