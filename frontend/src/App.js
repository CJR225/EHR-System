import React from "react";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import TempPatientDash from "./components/patientDash";
import PatientDash from "./components/patientDashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/patient-dashboard" element={<TempPatientDash />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;