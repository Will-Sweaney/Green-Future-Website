import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
// pages for this kit
import Index from "views/Index.js";
import LoginPage from "views/login/LoginPage.js";
import SignupPage from "views/login/SignUp.js"
import LandingPage from "views/pages/LandingPage.js";
import CarbonCalc from "views/pages/CarbonCalc.js"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/signup-page" element={<SignupPage />} />
      <Route path="/carbon-footprint-calculator" element={<CarbonCalc />} />

      <Route path="*" element={<Navigate to="/index" replace />} />
    </Routes>
  </BrowserRouter>
);
