import React, { useState } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", firstname: "", lastname: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    firstname: Joi.string().required().label("Firstname"),
    lastname: Joi.string().required().label("Lastname"),
  };

  doSubmit = async () => {

    try {
      //console.log(this.state.data);
      const response = await userService.signup(this.state.data);
      auth.loginWithJwt(response.headers["x-access-token"]);
      window.location = "/student/courseHome";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    console.log("this is the registration form");
    return (
      <body id="loginBody" onSubmit={this.handleSubmit}>
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
            <div className="container py-4 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div
                    className="card text-white" id="cardlogin"
                    styles="border-radius: 1rem;"
                  >
                    <div className="card-body p-5 pb-2 pt-3 text-center">
                      <div className="mb-md-1 mt-md-1">
                        <h2 className="fw-bold mb-2 pb-2" id="loginTitle">
                          Welcome to Auto Grader
                        </h2>

                        <p className="pb-1" id="loginDesc">
                          Please fill in the following to Sign Up!
                        </p>

                        <div className="form-outline form-white mb-4">
                          <form styles="{{}}" onSubmit={this.handleSubmit}>
                            {this.renderInput("username", "Username")}
                            {this.renderInput("password","Password","password")}
                            {this.renderInput("firstname", "First Name")}
                            {this.renderInput("lastname", "Last Name")}
                            <div className="mt-3">{this.renderButton("Sign Up")}</div>
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
  }
}

export default RegisterForm;
