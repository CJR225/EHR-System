import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/signin", {
        username,
        password,
      });

      console.log("Login Successful:", response.data);
      if (
        response.status === 200 &&
        response.data.message === "Login successful"
      ) {
        // Handle successful registration, e.g., redirect to dashboard
        navigate("/patient-dashboard");
      } else if ((response.data.message = "Username does not exist")) {
        setErrorMessage(response.data.message);
      } else if ((response.data.message = "Incorrect password.")) {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Registration Error:", error.response.data);
      setErrorMessage(error.response.data.message);
      // Handle registration error, e.g., display error message to user
    }
  };

  return (
    <body id="loginBody">
      <div class="background">
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

        <main class="pt-0">
          <div class="container py-5 h-10">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  class="card text-white"
                  styles="border-radius: 1rem;"
                  id="cardlogin"
                >
                  <div class="card-body p-5 text-center">
                    <div class="mb-md-4 mt-md-2">
                      <h2 class="fw-bold mb-2 pb-2" id="loginTitle">
                        Quinnipiac Nursing
                      </h2>
                      <h5 class="fw-light mb-2 pb-2" id="loginLowerTitle">
                        Electronic Healthcare System
                      </h5>

                      <p class="pb-2" id="loginDesc">
                        Please Sign In!
                      </p>

                      <div class="form-outline form-white mb-0">
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
                          <div>
                            <label>Password</label>
                            <input
                              className="form-control mb-2 mt-1"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          {errorMessage && (
                            <div
                              className="alert alert-danger mt-2 p-2"
                              role="alert"
                            >
                              {errorMessage}
                            </div>
                          )}
                          <div className="mt-5">
                            <button
                              type="submit"
                              className="btn btn-outline-light btn-lg px-5"
                            >
                              Sign In
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="mt-5">
                        <button
                          className="btn btn-outline-light btn-md px-3"
                          onClick={() => navigate("/register")}
                        >
                          Don't have an account? Sign up
                        </button>
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
          &copy; Quinnipiac 2024
          </div>
        </footer>
      </div>
    </body>
  );
}

export default LoginForm;
