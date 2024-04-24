import React from "react";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import SectionDash from "./components/sectionDashboard";
import PatientDash from "./components/patientDashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/patient-dashboard" element={<PatientDash />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/sectionDash" element={<SectionDash />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;