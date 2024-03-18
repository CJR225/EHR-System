import React, { useState } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import axios from "axios";


class LoginForm extends Form {
  
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };
 
  
  

  render() {
     //console.log("this is the login form");
    return (
      <body id="loginBody" >
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
                <div class="card text-white" styles="border-radius: 1rem;" id="cardlogin">
                  <div class="card-body p-5 text-center">
                    <div class="mb-md-5 mt-md-2">
                      <h2 class="fw-bold mb-2 pb-2" id="loginTitle">
                        Quinnipiac Nursing
                      </h2>
                      <h5 class="fw-light mb-2 pb-2" id="loginLowerTitle">
                        Electronic Healthcare System
                      </h5>

                      <p class="pb-2" id="loginDesc">Please Sign In!</p>

                      <div class="form-outline form-white mb-0">
                        <form>
                          {this.renderInput("username", "Username")}
                          {this.renderInput(
                            "password",
                            "Password",
                            "password"
                          )}
                          <div className="mt-5">{this.renderButton("Sign In")}</div>
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
}

export default LoginForm;
