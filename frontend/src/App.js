import { useState, React, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import PatientDash from "./components/patientDashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginForm} />
        <Route path="/dashboard" component={PatientDash} />
        <Route path="/register" exact component={RegisterForm} />
        <Route path="/logout" element={<Logout />} />
      </Switch>
    </Router>
  );
}

export default App;
