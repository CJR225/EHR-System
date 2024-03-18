import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/signup", {
        username,
        password,
      });

      console.log("Login Successful:", response.data);

      if (
        response.status === 200 &&
        response.data.message === "User created successfully"
      ) {
        // Handle successful registration, e.g., redirect to dashboard
        navigate("/patient-dashboard");
      } else {
        // Handle other successful responses or errors
        // Display a message or perform other actions as needed
        if (response.data.message === "That username is already taken") {
          setErrorMessage(response.data.message); // Set error message
        }
      }
    } catch (error) {
      console.error("Registration Error:", error.response.data);
      setErrorMessage(error.response.data.message);
      // Handle registration error, e.g., display error message to user
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
          <div className="container py-5 h-10">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card text-white"
                  id="cardlogin"
                  styles="border-radius: 1rem;"
                >
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-2">
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
                            <label>Username</label>
                            <input
                              className="form-control mb-2 mt-1"
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          {errorMessage && (
                            <div className="alert alert-danger mt-2" role="alert">
                              {errorMessage}
                            </div>
                          )}
                          <div>
                            <label>Password</label>
                            <input
                              className="form-control mb-2 mt-1"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="mt-5">
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
        <div class="text-center fixed-bottom pb-3" id="loginFooter">
            Chris Rocco - 
          </div>
        </footer>
      </div>
    </body>
  );
}

export default RegisterForm;
