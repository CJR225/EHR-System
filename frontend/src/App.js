import { useState, React, useEffect } from "react";


import { Route, Routes, Navigate } from "react-router-dom";

import NotFound from "./components/notFound"
import { BrowserRouter } from "react-router-dom";

import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import Test from "./components/test";

function App() {

  return (
    <div>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/test" element={<Test />} />
          <Route path="/register" element={<RegisterForm />} />       
          <Route path="/logout" element={<Logout />} />
          <Route path="/not-found" element={<NotFound />} />
          
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
