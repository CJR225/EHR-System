import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import styles from "../PatientDash.module.css";

import PatientDemographics from './PatientDemographics';
import PatientMedRec from './PatientMedRec';
import PatientHistory from './PatientHistory';
import PatientOrders from './PatientOrders';
import PatientMAR from './PatientMAR';
import PatientWaldo from './PatientWaldo';
import PatientVitals from "./PatientVitals";
import PatientIOandADL from "./PatientIOandADL";

//react icons
import {
  FaHome,
  FaPaperPlane,
  FaBook,
  FaFlask,
  FaMedkit,
  FaPencilAlt,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";


function PatientDash() {
  // State variables to manage patient data
  const [patients, setPatients] = useState([]); // Holds the list of patients
  const [selectedPatient, setSelectedPatient] = useState(null); // Holds the selected patient
  const [activeTab, setActiveTab] = useState("Demographics"); // Tracks active tab
  const [wounds, setWounds] = useState([]);
  const [medications, setMedications] = useState([]); // Holds patient medications
  const [allergies, setAllergies] = useState([]); // Holds patient allergies




  // Fetches all patients when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3001/patients")
      .then((response) => {
        // Formats patient data (e.g., date of birth) before setting state
        const formattedPatients = response.data.map((patient) => ({
          ...patient,
          dob: formatDate(patient.dob),
        }));
        setPatients(formattedPatients);
      })
      .catch((error) => {
        console.error("There was an error fetching the patients:", error);
      });
  }, []);

  // Fetches patient allergies when the selected patient changes
  useEffect(() => {
    if (selectedPatient) {
      axios
        .get(`http://localhost:3001/patients/${selectedPatient.id}/allergies`)
        .then((response) => {
          setAllergies(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the patients:", error);
        });
    }
  }, [selectedPatient]);


  // Handles the selection of a patient from the dropdown menu
  const handleSelectPatient = (event) => {
    const patientId = event.target.value;
    const patient = patients.find((p) => p.id.toString() === patientId);



    // Format the DOB of the selected patient before updating the state
    const formattedPatient = {
      ...patient,
      dob: patient ? formatDate(patient.dob) : "",
    };
    setSelectedPatient(formattedPatient);
  };

  // Handles the click event on tabs to switch between different views
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };


  // Function to format date string to a specified format
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  //Sidebar creation
  const [homeOpen, setHomeOpen] = useState(false);
  const [PCOpen, setPCOpen] = useState(false);
  const Sidebar = ({ children }) => {
    const menuItem = [
      {
        name: "Dashboard",
        icon: (
          <view
            style={{
              flexDirection: "col",
              display: "flex",
              marginTop: "3vh",
              marginLeft: "2.3vw",
            }}
            onClick={() => setHomeOpen(!homeOpen)}
          >
            <FaHome></FaHome>
            <IoIosArrowForward
              className={homeOpen ? "sidebarIcon open active" : "sidebarIcon"}
              style={{ fontSize: "2vw", marginTop: "2.5vh" }}
            ></IoIosArrowForward>
          </view>
        ),
      },
      {
        name: "Orders",
        icon: (
          <div
            title="Orders"
            onClick={() => setActiveTab("Orders")}
            style={{ cursor: "pointer" }}
          >
            <FaPaperPlane />
          </div>
        ),
      },
      {
        name: "MAR",
        icon: (
          <div
            title="MAR"
            onClick={() => setActiveTab("MAR")}
            style={{ cursor: "pointer" }}
          >
            <FaBook />
          </div>
        ),
      },
      {
        name: "Labs",
        icon: <FaFlask />,
      },
      {
        name: "Patient Care",
        icon: (
          <view
            style={{
              flexDirection: "col",
              display: "flex",
              marginTop: "3vh",
              marginLeft: "2.3vw",
            }}
            onClick={() => setPCOpen(!PCOpen)}
          >
            <FaMedkit></FaMedkit>
            <IoIosArrowForward
              className={PCOpen ? "sidebarIcon open active" : "sidebarIcon"}
              style={{ fontSize: "2vw", marginTop: "2.5vh" }}
            ></IoIosArrowForward>
          </view>
        ),
      },
      { name: "Notes", icon: <FaPencilAlt /> },
      {
        name: "Logout",
        path: "/",
        icon: (
          <TbLogout2
            style={{
              marginTop: "25vh",
              position: "fixed",
              marginLeft: "-2.4vw",
            }}
          ></TbLogout2>
        ),
      },
    ];
    return (
      <div className="sidebarContainer">
        <div className="sidebar">
          {menuItem.map((item, index) => (
            <NavLink to={item.path || "#"} key={index} className="sidebarLink">
              <div onClick={item.onClick} className="sidebarIcon active">
                {item.icon}
              </div>
            </NavLink>
          ))}
        </div>
        <div className="sidebarMain">{children}</div>
      </div>
    );
  };
  const HomeSidebar = ({ children }) => {
    const menuItem = [
      { name: "Demographics" },
      { name: "Med Rec" },
      { name: "History" },
    ];
    return (
      <div className="homeSidebarContainer">
        <div
          style={{ width: homeOpen ? "18vw" : "8.3vw" }}
          className="homeSidebar"
        >
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="homeLink"
              activeClassName="active"
              onClick={() => handleTabClick(item.name)}
            >
              <div
                style={{
                  display: homeOpen ? "fixed" : "none",
                  marginLeft: "9vw",
                }}
                className="homeLink_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <div className="homeMain">{children}</div>
      </div>
    );
  };
  const PCSidebar = ({ children }) => {
    const menuItem = [
      { name: "WALDO" },
      { name: "Vital Signs" },
      { name: "Intake & Output" },
      { name: "Blood Admin" },
    ];
    return (
      <div className="PCSidebarContainer">
        <div style={{ width: PCOpen ? "18vw" : "8.3vw" }} className="PCSidebar">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="PCLink"
              activeClassName="active"
              onClick={() => handleTabClick(item.name)}
            >
              <div
                style={{
                  display: PCOpen ? "fixed" : "none",
                  marginLeft: "9vw",
                }}
                className="PCLink_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <div className="PCMain">{children}</div>
      </div>
    );
  };
  return (
    <>
      <HomeSidebar></HomeSidebar>
      <PCSidebar></PCSidebar>
      <Sidebar></Sidebar>
      <header className="mb-10">
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <section>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-1 vh-100">
                <nav
                  className="nav nav-underline flex-column"
                  style={{ padding: 20, alignContent: "center" }}
                ></nav>
              </div>
              <div
                id="patientDash"
                className="col-lg-11 vh-1000"
                style={{ margin: 0, padding: 0, backgroundColor: "#d7dfe0" }}
              >
                <nav
                  className="flex-column"
                  style={{
                    background: "#0973E4",
                    color: "white",
                    fontSize: "12pt",
                    height: "15vh",
                    outline: "5px solid #184a7e",
                    boxShadow: "0px 15px 10px white"
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <CgProfile style={{ fontSize: "4vw", marginLeft: "3vw" }} />
                    <select
                      style={{ marginTop: "3vh", marginLeft: "4vh" }}
                      onChange={handleSelectPatient}
                      value={selectedPatient?.id || ""}
                    >
                      <option value="">Select a patient</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          Name: {patient.fname} {patient.lname}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedPatient && (
                    <div
                      style={{
                        flex: 10,
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "1vh",
                      }}
                    >
                      <span>Medical Record #: {selectedPatient.id}</span>
                      <span>|</span>
                      <span>
                        Patient Name: {selectedPatient.fname}{" "}
                        {selectedPatient.lname}
                      </span>
                      <span>|</span>
                      <span>Date of Birth: {selectedPatient.dob}</span>
                      <span>|</span>
                      <span>Height: {selectedPatient.height} cm</span>
                      <span>|</span>
                      <span>Weight: {selectedPatient.weight} kg</span>
                      <span>|</span>
                      <span>
                        Allergies:
                        {allergies.map((allergy) => (
                          <span key={allergy.allergy_id}>{allergy.name}</span>
                        ))}
                      </span>
                    </div>
                  )}
                </nav>
                {activeTab === "Demographics" && selectedPatient && (
                  <PatientDemographics selectedPatient={selectedPatient} />
                )}

                {activeTab === "Med Rec" && selectedPatient && (
                  <PatientMedRec selectedPatient={selectedPatient} />
                )}
                {activeTab === "History" && selectedPatient && (
                  <PatientHistory selectedPatient={selectedPatient} />
                )}
                <div className={styles.someClassName}>
                  {activeTab === "Orders" && selectedPatient && (
                    <PatientOrders selectedPatient={selectedPatient} />
                  )}

                  {activeTab === "MAR" && selectedPatient && (
                    <PatientMAR selectedPatient={selectedPatient} />
                  )}

                  {activeTab === "WALDO" && selectedPatient && (
                    <PatientWaldo selectedPatient={selectedPatient} activeTab={activeTab} />

                  )}

                  {activeTab === "Vital Signs" && selectedPatient && (
                    <PatientVitals selectedPatient={selectedPatient} activeTab={activeTab} />

                  )}

                  {activeTab === "Intake & Output" && selectedPatient && (
                    <PatientIOandADL selectedPatient={selectedPatient} activeTab={activeTab} />

                  )}


                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  );
}

export default PatientDash;
