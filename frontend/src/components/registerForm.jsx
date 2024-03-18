import React, { useState } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/signup", formData);
      console.log("Data sent successfully");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <body id="loginBody">
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

        <main>
          <div className="container py-4 h-100" style={{}}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card text-white"
                  id="cardlogin"
                  styles="border-radius: 1rem;"
                >
                  <div className="card-body p-5 pb-2 pt-3 text-center">
                    <div className="mb-md-1 mt-md-1">
                      <h2 class="fw-bold mb-2 pb-2" id="loginTitle">
                        Quinnipiac Nursing
                      </h2>
                      <h5 class="fw-light mb-2 pb-2" id="loginLowerTitle">
                        Electronic Healthcare System
                      </h5>

                      <p className="pb-1" id="loginDesc">
                        Please fill in the following to Sign Up!
                      </p>

                      <div className="form-outline form-white mb-4">
                        <form onSubmit={handleSubmit}>
                          <div>
                            <input
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <input
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mt-3">
                            <button
                              type="submit"
                              className="btn btn-outline-light btn-lg px-5"
                            >
                              Sign Up
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer>
          <div className="text-center fixed-bottom pb-2" id="loginFooter">
            footer placeholder
          </div>
        </footer>
      </div>
    </body>
  );
};

export default RegisterForm;
