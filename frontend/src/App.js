import { useState, React, useEffect } from "react";


import { Route, Routes, Navigate } from "react-router-dom";

import NotFound from "./components/notFound";
import { BrowserRouter } from "react-router-dom";
import AddCourse from "./components/addCourse";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import Logout from "./components/logout";
import CourseHome from "./components/courseHome";
import AssignmentList from "./components/assignmentList";
import FileUploadForm from "./components/assignment";
import FileUploadFormProfessor from "./components/AssignmentProfessor";
import AssignmentListProfessor from "./components/assignmentListProfessor";
import AssignmentForm from "./components/createAssignment";
import CourseHomeProfessor from "./components/courseHomeProfessor";
import Test from "./components/test";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = auth.getCurrentUser();
    console.log(user);
    setUser(user);
  }, []);

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
