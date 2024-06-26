import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../PatientDash.module.css";
import PatientDemographics from "./PatientDemographics";
import PatientMedRec from "./PatientMedRec";
import PatientHistory from "./PatientHistory";
import PatientOrders from "./PatientOrders";
import PatientMAR from "./PatientMAR";
import PatientWaldo from "./PatientWaldo";
import PatientVitals from "./PatientVitals";
import PatientIOandADL from "./PatientIOandADL";
import PatientLabValues from "./PatientLabValues";
import PatientNotes from "./PatientNotes";
import PatientADL from "./PatientADL";
import { useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation(); // Access navigation state

  //Christopher Rocco
  //Senior Capstone - SER492
  //5-08-24
  const handleLogout = async () => {
    try {
      // Make a GET request to the logout endpoint
      await axios.get("http://localhost:3001/auth/logout");
      // Redirect the user to the homepage ("/")
      window.location.href = "/";
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  //Christopher Rocco
  //Senior Capstone - SER492
  //5-08-24
  //This useEffect is when instructor comes from sectiondash and displays the patient info
  useEffect(() => {
    const { patient, sectionId } = location.state || {};

    if (patient) {
      setSelectedPatient(patient);
      fetchAllergies(patient.id);

      console.log(`Received section ID: ${sectionId}`);
    }
  }, [location]);

  //Allergies for display in patient banner
  const fetchAllergies = async (patientId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/patients/${patientId}/allergies`
      );
      setAllergies(response.data);
    } catch (error) {
      console.error("There was an error fetching the patients:", error);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  //Christopher Rocco
  //Senior Capstone - SER492
  //5-08-24
  //This useEffect is when a student navigates to patientDash
  useEffect(() => {
    const isStudent = sessionStorage.getItem("role") === "student";

    if (isStudent) {
      const studentSectionId = sessionStorage.getItem("sectionId");
      console.log("Fetched section ID from session storage:", studentSectionId);
      console.log(
        `[PatientDash] Mounted. Fetched sectionId from sessionStorage: ${studentSectionId}`
      );

      if (studentSectionId) {
        console.log(
          `[PatientDash] Fetching data for sectionId: ${studentSectionId}`
        );
        axios
          .get(
            `http://localhost:3001/patients/section/${studentSectionId}/patients`
          )
          .then((response) => {
            console.log(
              `[PatientDash] Data fetched for sectionId ${studentSectionId}:`,
              response.data
            );
            setPatients(response.data);
            if (response.data.length > 0) {
              setSelectedPatient(response.data[0]); // Automatically select the first patient
            } else {
              console.log("No patients found for this section.");
            }
            console.log("Patients data:", response.data);
          })
          .catch((error) => {
            console.error("Failed to fetch assigned patients:", error);
            console.error(
              `[PatientDash] Error fetching data for sectionId ${studentSectionId}:`,
              error
            );
          });
      } else {
        console.log("No section ID found in session storage.");
      }
    }
  }, []);

  //Sidebar creation --> main sidebar with all icons
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
        icon: (
          <div
            title="Labs"
            onClick={() => setActiveTab("Labs")}
            style={{ cursor: "pointer" }}
          >
            <FaFlask />
          </div>
        ),
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
      {
        name: "Notes",
        icon: (
          <div
            title="Notes"
            onClick={() => setActiveTab("Notes")}
            style={{ cursor: "pointer" }}
          >
            <FaPencilAlt />
          </div>
        ),
      },
      {
        name: "Logout",
        icon: (
          <TbLogout2
            onClick={handleLogout} // Attach the onClick event handler here
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
  //This "sidebar" is the first icon with 3 subtabs
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
  //This is the second "sidebar" housing 4 subtabs
  const PCSidebar = ({ children }) => {
    const menuItem = [
      { name: "ADL" },
      { name: "WALDO" },
      { name: "Vital Signs" },
      { name: "Intake & Output" },
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
                    background: "#397eb3",
                    color: "white",
                    fontSize: "12pt",
                    height: "15vh",
                    outline: "5px solid #184a7e",
                    boxShadow: "0px 15px 10px white",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <CgProfile style={{ fontSize: "4vw", marginLeft: "3vw" }} />
                  </div>
                  {selectedPatient && (
                    <div
                      style={{
                        flex: 10,
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "2vh",
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

                  {activeTab === "Labs" && selectedPatient && (
                    <PatientLabValues selectedPatient={selectedPatient} />
                  )}

                  {activeTab === "ADL" && selectedPatient && (
                    <PatientADL
                      selectedPatient={selectedPatient}
                      activeTab={activeTab}
                    />
                  )}

                  {activeTab === "WALDO" && selectedPatient && (
                    <PatientWaldo
                      selectedPatient={selectedPatient}
                      activeTab={activeTab}
                    />
                  )}

                  {activeTab === "Vital Signs" && selectedPatient && (
                    <PatientVitals
                      selectedPatient={selectedPatient}
                      activeTab={activeTab}
                    />
                  )}

                  {activeTab === "Intake & Output" && selectedPatient && (
                    <PatientIOandADL
                      selectedPatient={selectedPatient}
                      activeTab={activeTab}
                    />
                  )}

                  {activeTab === "Notes" && selectedPatient && (
                    <PatientNotes selectedPatient={selectedPatient} />
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
