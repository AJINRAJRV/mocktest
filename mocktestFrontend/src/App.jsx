import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import OtpRequest from "./components/OtpRequest";
import OtpVerification from "./components/OtpVerification";
import Welcome from "./components/Welcome";

const App = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);

  return (
    <Routes>
      <Route path="/" element={showOtpForm ? <OtpVerification /> : <OtpRequest setShowOtpForm={setShowOtpForm} />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
};

export default App;

