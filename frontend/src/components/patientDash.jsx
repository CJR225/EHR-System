import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CgProfile } from "react-icons/cg";
import MainNavBar from "./mainNavBar";
import PatientBanner from "./patientBanner";

class PatientDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      selectedPatient: null,
      allergies: []
    };
  }

  render() {
    const { selectedPatient } = this.state;

    return (
      <React.Fragment>
        <MainNavBar />
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <header className="mb-10">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-1 vh-100">
                <nav className="nav nav-underline flex-column" style={{ padding: 20, alignContent: "center" }}>
                  {/* Your navigation items */}
                </nav>
              </div>
              <div className="col-lg-11 vh-100" style={{ margin: 0, padding: 0, backgroundColor: '#d7dfe0' }}>
                <PatientBanner patient={selectedPatient} />
                {/* Your main content */}
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default PatientDash;

