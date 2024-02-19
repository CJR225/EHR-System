import React, { useState } from "react";
import Button from "react";

function PatientDash() {
  return (
     <header class="mb-10">
      <section class="">

        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-1 vh-100" style={{backgroundColor:'#9dbbc4'}}>
            <nav class="nav nav-underline flex-column" style={{padding:20, alignContent:"center"}}>
                <a class="nav-link" aria-current="page" href="#">Home</a>
                <a class="nav-link" href="#">Orders</a>
                <a class="nav-link" href="#">MAR</a>
                <a class="nav-link" href="#">Labs</a>
                <a class="nav-link" href="#">Patient Care</a>
                <a class="nav-link" href="#">Notes</a>
              </nav>
            </div>
            <div id="patientDash" class="col-lg-11 vh-100" style={{margin:0, padding:0, backgroundColor:'#d7dfe0'}}>
            <nav class="navbar bg-body-tertiary">
              <div class="container-fluid" style={{margin:0, height:150, backgroundColor:'#808687'}}>
                <span class="navbar-brand mb-0 h1 " style={{margin:0, padding:0}}>
                  (Patient info)
                </span>
              </div>
            </nav>
            </div>
          </div>
        </div>

      </section>
     </header>
  );
}

export default PatientDash;