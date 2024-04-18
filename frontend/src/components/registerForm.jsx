import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [sectionID, setSectionID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);
  const navigate = useNavigate();

  const schema = {
    username: Joi.string()
      .required()
      .regex(/^(?=.*[A-Z])(?=.*[0-9])/)
      .label("Username")
      .error(() => "Username must contain a number & capital letter"),
    password: Joi.string()
      .required()
      .min(5)
      .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
      .label("Password")
      .error(() => "Must have length of 8, capital letter, and a number"),
    fname: Joi.string()
      .required()
      .label("First Name")
      .error(() => "First Name is required"),
    lname: Joi.string()
      .required()
      .label("Last Name")
      .error(() => "Last Name is required"),
    sectionID: Joi.number()
      .required()
      .label("Section ID")
      .error(() => "Section ID is required"),
  };

  const isFormValid = () => {
    const { error } = Joi.validate(
      { username, password, fname, lname, sectionID },
      schema
    );
    return (
      !error &&
      username.trim() !== "" &&
      password.trim() !== "" &&
      fname.trim() !== "" &&
      lname.trim() !== "" &&
      sectionID.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/signup", {
        username,
        password,
        fname,
        lname,
        sectionID,
      });

      console.log("Login Successful:", response.data);

      if (response.data.message === "That username is already taken") {
        setErrorMessage(response.data.message);
      } else if (
        response.status === 200 &&
        response.data.message === "User created successfully"
      ) {
        navigate("/patient-dashboard");
      }
    } catch (error) {
      console.error("Registration Error:", error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [errorMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "fname") {
      setFname(value);
    } else if (name === "lname") {
      setLname(value);
    } else if (name === "sectionID") {
      setSectionID(value);
    }

    const validationResult = Joi.validate(
      { username, password, fname, lname },
      schema
    );
    setIsValidForm(!validationResult.error);
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
          <div className="container py-5 h-10">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card text-white"
                  id="cardlogin"
                  styles="border-radius: 1rem;"
                >
                  <div className="card-body p-5 pb-2 text-center">
                    <div className="mb-md-5 mt-md-2">
                      <h2 class="fw-bold mb-2 pb-2" id="loginTitle">
                        QU Nursing
                      </h2>
                      <h5 class="fw-light mb-2 pb-2" id="loginLowerTitle">
                        Electronic Healthcare System
                      </h5>

                      <div className="form-outline form-white mb-4">
                        <form onSubmit={handleSubmit}>
                          <div>
                            <label>Username</label>
                            <input
                              className="form-control mb-2 mt-1"
                              type="text"
                              value={username}
                              label="Username"
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            {schema.username.validate(username).error && (
                              <div
                                className="alert alert-danger mt-2 p-2"
                                role="alert"
                              >
                                {
                                  schema.username.validate(username).error
                                    .message
                                }
                              </div>
                            )}
                          </div>
                          <div>
                            <label>Password</label>
                            <input
                              className="form-control mb-2 mt-1"
                              type="password"
                              value={password}
                              label="Password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            {schema.password.validate(password).error && (
                              <div
                                className="alert alert-danger mt-2 p-2"
                                role="alert"
                              >
                                {
                                  schema.password.validate(password).error
                                    .message
                                }
                              </div>
                            )}
                            {errorMessage && (
                              <div
                                className="alert alert-danger mt-2 p-2"
                                role="alert"
                              >
                                {errorMessage}
                              </div>
                            )}
                          </div>

                          <div className="row">
                            <div className="col">
                              <label>First Name</label>
                              <input
                                className="form-control mb-2 mt-1"
                                type="text"
                                value={fname}
                                label="Fname"
                                onChange={(e) => setFname(e.target.value)}
                              />
                            </div>

                            <div className="col">
                              <label>Last Name</label>
                              <input
                                className="form-control mb-2 mt-1"
                                type="text"
                                value={lname}
                                label="Lname"
                                onChange={(e) => setLname(e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <label>Section ID</label>
                            <input
                              className="form-control mb-2 mt-1"
                              type="number"
                              value={sectionID}
                              onChange={(e) => setSectionID(e.target.value)}
                            />
                          </div>
                          <div className="mt-3">
                            <button
                              type="submit"
                              className="btn btn-outline-light btn-lg px-5"
                              disabled={!isFormValid()}
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
          <div class="text-center fixed-bottom pb-3" id="loginFooter">
            Chris Rocco, Matt Nova, Billy Siri &copy; Quinnipiac 2024
          </div>
        </footer>
      </div>
    </body>
  );
}

export default RegisterForm;
