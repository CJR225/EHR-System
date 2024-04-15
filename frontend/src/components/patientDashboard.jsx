import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import styles from "../PatientDash.module.css";

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
  const [demographics, setDemographics] = useState(null); // Holds patient demographics
  const [wounds, setWounds] = useState([]);
  const [medications, setMedications] = useState([]); // Holds patient medications
  const [allergies, setAllergies] = useState([]); // Holds patient allergies
  const [historyInfo, setHistoryInfo] = useState({});
  const [orders, setOrders] = useState([]);

  //get orders by patient
  useEffect(() => {
    if (activeTab === "Orders" && selectedPatient) {
      axios
        .get(`http://localhost:3001/patients/${selectedPatient.id}/orders`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the orders:", error);
        });
    }
  }, [activeTab, selectedPatient]);

  //fetches patient history
  useEffect(() => {
    const fetchHistoryInfo = async () => {
      // Check if we have a selected patient and the active tab is 'History'
      if (selectedPatient && activeTab === "History") {
        // Clear existing history information to ensure UI does not display outdated information
        setHistoryInfo({}); // Assuming historyInfo is an object. Adjust if it's a different structure.

        try {
          const historyResponse = await axios.get(
            `http://localhost:3001/patients/patient-history/${selectedPatient.id}`
          );
          setHistoryInfo(historyResponse.data);
        } catch (error) {
          console.error("Error fetching patient history:", error);
          // Optionally, you can provide feedback to the user that an error occurred.
          // This could be a toast notification, log message, or some other form of error handling.
        }
      }
    };

    fetchHistoryInfo();
  }, [selectedPatient, activeTab]); // Dependencies ensure this runs when either the selectedPatient or activeTab changes.

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

  // Fetches patient demographics when the selected patient or active tab changes
  useEffect(() => {
    if (selectedPatient && activeTab === "Demographics") {
      axios
        .get(
          `http://localhost:3001/patients/${selectedPatient.id}/demographics`
        )
        .then((response) => {
          setDemographics(response.data);
        })
        .catch((error) => {
          console.error("Error fetching patient demographics:", error);
        });
    }
  }, [selectedPatient, activeTab]);

  useEffect(() => {
    const fetchMedications = async () => {
      if (selectedPatient && (activeTab === "Med Rec" || activeTab === "MAR")) {
        // Include 'MAR' tab in condition
        setMedications([]); // Clear existing medications data to avoid showing stale data
        try {
          const response = await axios.get(
            `http://localhost:3001/patients/${selectedPatient.id}/medications`
          );
          setMedications(response.data);
        } catch (error) {
          console.error("Error fetching patient medications:", error);
        }
      }
    };

    fetchMedications();
  }, [selectedPatient, activeTab]); // This useEffect depends on selectedPatient and activeTab

  //function for adding medication to patient
  const handleAddMedication = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const medicationData = Object.fromEntries(formData.entries());

    try {
      // Add the medication
      await axios.post(
        `http://localhost:3001/patients/${selectedPatient.id}/medicines`,
        medicationData
      );
      toast.success("Medication added successfully!");

      // Fetch the updated list of medications immediately after adding a new one
      const response = await axios.get(
        `http://localhost:3001/patients/${selectedPatient.id}/medications`
      );
      setMedications(response.data); // Update the state with the new medication list
    } catch (error) {
      console.error("Error adding medication:", error);
      toast.error("Failed to add medication.");
    }
  };

  //function to delete medications from patient
  const handleDeleteMedication = async (medicationId) => {
    try {
      await axios.delete(
        `http://localhost:3001/patients/${selectedPatient.id}/medicines/${medicationId}`
      );
      toast.success("Medication deleted successfully!");
      // Remove the deleted medication from the state
      setMedications(medications.filter((med) => med.id !== medicationId));
    } catch (error) {
      console.error("Failed to delete medication:", error);
      toast.error("Failed to delete medication.");
    }
  };

  // Handles the selection of a patient from the dropdown menu
  const handleSelectPatient = (event) => {
    const patientId = event.target.value;
    const patient = patients.find((p) => p.id.toString() === patientId);

    // Clear medications state when a new patient is selected
    setMedications([]);

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
      { name: "Input & Output" },
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
                className="col-lg-11 vh-100"
                style={{ margin: 0, padding: 0, backgroundColor: "#d7dfe0" }}
              >
                <nav
                  className="flex-column"
                  style={{
                    background: "#a3c2c2",
                    color: "black",
                    height: "13.5vh",
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
                {activeTab === "Demographics" && demographics && (
                  <div
                    style={{
                      padding: "20px",
                      backgroundColor: "#f5f5f5",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <h3
                      style={{
                        borderBottom: "2px solid #418FDE",
                        color: "#333",
                        paddingBottom: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      Patient Demographics
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <p>
                        <strong>Name:</strong> {demographics.fname}{" "}
                        {demographics.lname}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong>{" "}
                        {formatDate(demographics.dob)}
                      </p>
                      <p>
                        <strong>Height:</strong> {selectedPatient.height} cm
                      </p>
                      <p>
                        <strong>Weight:</strong> {selectedPatient.weight} kg
                      </p>
                      <p>
                        <strong>Religion:</strong> {demographics.religion}
                      </p>
                      <p>
                        <strong>Gender:</strong> {demographics.gender}
                      </p>
                      <p>
                        <strong>Gender at Birth:</strong>{" "}
                        {demographics.gender_at_birth}
                      </p>
                      <p>
                        <strong>Emergency Contact:</strong>{" "}
                        {demographics.emergency_contact_name}
                      </p>
                      <p>
                        <strong>Emergency Contact Phone:</strong>{" "}
                        {demographics.emergency_contact_number}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "Med Rec" && (
                  <div
                    style={{
                      margin: "4vh",
                      padding: "20px",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <h3
                      style={{
                        borderBottom: "2px solid #418FDE", // Updated this line
                        paddingBottom: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      Medication Reconciliation
                    </h3>

                    <div style={{ overflowX: "auto" }}>
                      <table
                        style={{
                          width: "100%",
                          marginTop: "3vh",
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      >
                        <thead
                          style={{ backgroundColor: "#418FDE", color: "white" }}
                        >
                          <tr>
                            <th style={{ padding: "10px", textAlign: "Left" }}>
                              Medication
                            </th>
                            <th style={{ textAlign: "Left" }}>Dose</th>
                            <th style={{ textAlign: "Left" }}>Route</th>
                            <th style={{ textAlign: "Left" }}>Frequency</th>
                            <th style={{ textAlign: "Left" }}>Last Taken</th>
                          </tr>
                        </thead>

                        <tbody>
                          {medications.map((med, index) => (
                            <tr
                              key={index}
                              style={{
                                borderBottom: "1px solid #ddd",
                                backgroundColor:
                                  index % 2 === 0 ? "#f9f9f9" : "white",
                              }}
                            >
                              <td style={{ padding: "10px" }}>{med.name}</td>
                              <td>{med.medicine_patient.dosage}</td>
                              <td>{med.medicine_patient.route}</td>
                              <td>
                                {med.medicine_patient.taken_last
                                  ? new Date(
                                      med.medicine_patient.taken_last
                                    ).toLocaleString()
                                  : "N/A"}
                              </td>
                              <td>
                                {med.medicine_patient.time_taken
                                  ? new Date(
                                      med.medicine_patient.time_taken
                                    ).toLocaleString()
                                  : "N/A"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "History" && historyInfo && (
                  <div
                    style={{
                      margin: "4vh",
                      backgroundColor: "#f5f5f5",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <h3
                      style={{
                        borderBottom: "2px solid #007bff",
                        paddingBottom: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      Patient History
                    </h3>

                    <div
                      style={{
                        marginBottom: "15px",
                        padding: "10px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
                      }}
                    >
                      <strong>History of Presenting Problem:</strong>
                      <p style={{ marginTop: "5px" }}>
                        {historyInfo.history_of_presenting_problem}
                      </p>
                    </div>

                    <div
                      style={{
                        marginBottom: "15px",
                        padding: "10px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
                      }}
                    >
                      <strong>Past Medical History:</strong>
                      <p style={{ marginTop: "5px" }}>
                        {historyInfo.past_medical_history}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "10px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
                      }}
                    >
                      <strong>Family History:</strong>
                      <p style={{ marginTop: "5px" }}>
                        {historyInfo.family_history}
                      </p>
                    </div>
                  </div>
                )}
                <div className={styles.someClassName}>
                  {activeTab === "Orders" && (
                    <div
                      style={{
                        margin: "4vh",
                        padding: "20px",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <h3
                        style={{
                          borderBottom: "2px solid #007bff",
                          paddingBottom: "10px",
                          marginBottom: "20px",
                        }}
                      >
                        Patient Orders
                      </h3>

                      {orders.length > 0 ? (
                        <div>
                          {orders.map((order) => (
                            <div
                              key={order.order_id}
                              style={{
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 4px rgba(0,0,0,.1)",
                              }}
                            >
                              <h6>Order ID: {order.order_id}</h6>
                              <p>
                                <strong>Description:</strong>{" "}
                                {order.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No orders found for this patient.</p>
                      )}
                    </div>
                  )}

                  {activeTab === "MAR" && (
                    <div className={styles.tabContent}>
                      <h2 className={styles.tabHeading}>
                        Medication Administration Record (MAR)
                      </h2>
                      <form
                        onSubmit={handleAddMedication}
                        className={styles.marForm}
                      >
                        <div className={styles.formRow}>
                          <div className={styles.inputWrapper}>
                            <label htmlFor="med_id">Med ID</label>
                            <input
                              className={styles.formInput}
                              type="text"
                              name="med_id"
                              id="med_id"
                            />
                          </div>
                          <div className={styles.inputWrapper}>
                            <label htmlFor="dosage">Dosage</label>
                            <input
                              className={styles.formInput}
                              type="number"
                              name="dosage"
                              id="dosage"
                            />
                          </div>
                          <div className={styles.inputWrapper}>
                            <label htmlFor="route">Route</label>
                            <input
                              className={styles.formInput}
                              type="text"
                              name="route"
                              id="route"
                            />
                          </div>
                          <div className={styles.inputWrapper}>
                            <label htmlFor="frequency">Frequency</label>
                            <input
                              className={styles.formInput}
                              type="text"
                              name="frequency"
                              id="frequency"
                            />
                          </div>
                          <div className={styles.inputWrapper}>
                            <label htmlFor="taken_last">Last Taken</label>
                            <input
                              className={styles.formInput}
                              type="datetime-local"
                              name="taken_last"
                              id="taken_last"
                            />
                          </div>
                          <div className={styles.inputWrapper}>
                            <label htmlFor="time_taken">Time Taken</label>
                            <input
                              className={styles.formInput}
                              type="datetime-local"
                              name="time_taken"
                              id="time_taken"
                            />
                          </div>
                          <div className={styles.inputWrapper}>
                            <label htmlFor="administered_at">
                              Administered At
                            </label>
                            <input
                              className={styles.formInput}
                              type="datetime-local"
                              name="administered_at"
                              id="administered_at"
                              required
                            />
                          </div>
                        </div>
                        <button className={styles.formButton} type="submit">
                          Add Medication
                        </button>
                      </form>

                      <table className={styles.table}>
                        <thead>
                          <tr>
                            {/* Other headers */}
                            <th>Name</th>
                            <th>Dosage</th>
                            <th>Route</th>
                            <th>Frequency</th>
                            <th>Last Taken</th>
                            <th>Time Taken</th>
                            <th>Administered At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medications.map((med) => (
                            <tr key={med.id}>
                              <td>{med.name}</td>
                              <td>{med.medicine_patient.dosage}</td>
                              <td>{med.medicine_patient.route}</td>
                              <td>{med.medicine_patient.frequency}</td>
                              <td>
                                {med.medicine_patient.taken_last
                                  ? new Date(
                                      med.medicine_patient.taken_last
                                    ).toLocaleString()
                                  : "N/A"}
                              </td>
                              <td>
                                {med.medicine_patient.time_taken
                                  ? new Date(
                                      med.medicine_patient.time_taken
                                    ).toLocaleString()
                                  : "N/A"}
                              </td>
                              <td>
                                {med.medicine_patient.administered_at
                                  ? new Date(
                                      med.medicine_patient.administered_at
                                    ).toLocaleString()
                                  : "N/A"}
                              </td>

                              <td>
                                <button
                                  onClick={() => handleDeleteMedication(med.id)}
                                  className={`${styles.formButton} ${styles.delete}`}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

{activeTab === "WALDO" && wounds && (
  <div className={styles.tabContent}>
    <h2 className={styles.tabHeading}>
      Wounds and Drains
    </h2>
    <form onSubmit={handleAddMedication} className={styles.marForm}>
      <div className={styles.formRow}>
        <div className={styles.inputWrapper}>
          <label htmlFor="swound">Surgical Wound</label>
          <textarea
            className={styles.formTextarea} // Adjust the className to style the text area appropriately
            name="swound"
            id="swound"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="psore">Pressure Sore</label>
          <textarea
            className={styles.formTextarea} // Adjust the className to style the text area appropriately
            name="psore"
            id="psore"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="twound">Trauma Wound</label>
          <textarea
            className={styles.formTextarea} // Adjust the className to style the text area appropriately
            name="twound"
            id="twound"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="dnotes">Drain Notes</label>
          <textarea
            className={styles.formTextarea} // Adjust the className to style the text area appropriately
            name="dnotes"
            id="dnotes"
          />
        </div>
      </div>
      <button className={styles.formButton} type="submit">
        Add Wound
      </button>
    </form>
    <h2 className={styles.tabHeading}>
      IV's and Lines
    </h2>
    <form onSubmit={handleAddMedication} className={styles.marForm}>
      <div className={styles.formRow}>
        <div className={styles.inputWrapper}>
          <label htmlFor="type_line">Type</label>
          <input
            className={styles.formInput}
            type="text"
            name="type_line"
            id="type_line"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="size">Size</label>
          <input
            className={styles.formInput}
            type="text"
            name="size"
            id="size"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="cdi">CDI</label>
          <input
            className={styles.formInput}
            type="text"
            name="cdi"
            id="cdi"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="location">Location</label>
          <input
            className={styles.formInput}
            type="text"
            name="location"
            id="location"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="medrate">Fluid or Med and Rate</label>
          <input
            className={styles.formInput}
            type="text"
            name="medrate"
            id="medrate"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="patent">Patent</label>
          <input
            className={styles.formInput}
            type="text"
            name="patent"
            id="patent"
          />
        </div>
      </div>
      <button className={styles.formButton} type="submit">
        Add IV/Line
      </button>
    </form>
  </div>
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
