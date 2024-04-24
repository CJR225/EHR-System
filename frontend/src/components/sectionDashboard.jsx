import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbLogout2 } from "react-icons/tb";

const SectionDashboard = () => {
  const [sections, setSections] = useState([]);
  const [patients, setPatients] = useState([]); // Holds the list of patients
  const [allergies, setAllergies] = useState([]); // Holds patient allergies
  const [isAssigned, setIsAssigned] = useState({});
  const [selectedPatients, setSelectedPatients] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "" });

  // Handles the selection of a patient from the dropdown menu specific to each section
  const handleSelectPatient = (sectionId) => (event) => {
    const patientId = event.target.value;
    const patient = patients.find((p) => p.id.toString() === patientId);

    // Set the selected patient for the specific section
    setSelectedPatients((prev) => ({
      ...prev,
      [sectionId]: patient
        ? {
            ...patient,
            dob: formatDate(patient.dob),
          }
        : null,
    }));
  };

  const handleAssignPatient = (sectionId) => {
    if (selectedPatients[sectionId]) {
      // Assuming an API call or logic to assign the patient
      console.log(
        `Assigning patient ${selectedPatients[sectionId].id} to section ${sectionId}`
      );

      // Show alert
      setAlert({ show: true, message: "Patient assigned to section" });

      // Set a timeout to hide the alert after 5 seconds
      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 5000); // 5000 milliseconds = 5 seconds

      // Update the assignment status
      setIsAssigned((prev) => ({
        ...prev,
        [sectionId]: true,
      }));
    }
  };

  // useEffect for fetching allergies might need adjustment to fetch based on all selectedPatients
  useEffect(() => {
    Object.keys(selectedPatients).forEach((sectionId) => {
      const patient = selectedPatients[sectionId];
      if (patient && patient.id) {
        axios
          .get(`http://localhost:3001/patients/${patient.id}/allergies`)
          .then((response) => {
            setAllergies((prev) => ({ ...prev, [patient.id]: response.data }));
          })
          .catch((error) => console.error("Error fetching allergies:", error));
      }
    });
  }, [selectedPatients]);

  useEffect(() => {
    // Fetch the section data when the component mounts
    axios
      .get("http://localhost:3001/patients/section-list") // Update the URL based on your actual setup
      .then((response) => {
        setSections(response.data); // Set the sections data to state
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  }, []);

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

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

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

        {alert.show && <div className="alertStyles">{alert.message}</div>}

        <main class="pt-0">
          <div class="container py-5 h-10">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-8 col-lg-6 col-xl-10">
                <div
                  class="card text-white"
                  styles="border-radius: 1rem;"
                  id="cardlogin"
                >
                  <div class="card-body p-5 text-left">
                    <div class="mb-md-4 mt-md-2">
                      <h2
                        class="fw-bold mb-2 pb-2"
                        id="loginTitle"
                        style={{ borderBottom: "3px solid #418FDE" }}
                      >
                        Sections
                      </h2>
                      <div class="form-outline form-white mb-0 text-left">
                        <div>
                          {sections.map((section) => (
                            <div
                              className="pb-3"
                              key={section.section_id}
                              style={{ borderBottom: "3px dotted #418FDE" }}
                            >
                              <h3
                                class="fw-bold mb-1 pb-3 mt-3"
                                id="loginTitle"
                                style={{
                                  fontSize: 25,
                                }}
                              >
                                Section {section.section_id} - Instructor:{" "}
                                {section.instructor.first_name}{" "}
                                {section.instructor.last_name || "Not assigned"}
                              </h3>

                              <div className="row gap-2">
                                <select
                                  className="col btn btn-outline-light btn-md-6 px-3"
                                  onChange={handleSelectPatient(
                                    section.section_id
                                  )}
                                  value={
                                    selectedPatients[section.section_id]?.id ||
                                    ""
                                  }
                                >
                                  <option value="">Select a patient</option>
                                  {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>
                                      Name: {patient.fname} {patient.lname}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  id="assign-btn"
                                  type="button" // Assuming this is not submitting a form
                                  className="col btn btn-outline-light btn-md px-4"
                                  onClick={() =>
                                    handleAssignPatient(section.section_id)
                                  } // Call assign function on click
                                >
                                  Assign Patient
                                </button>
                                <button
                                  id="go-section-btn"
                                  type="submit"
                                  className="col btn btn-outline-light btn-md px-4"
                                  disabled={!isAssigned[section.section_id]} // Button is disabled unless patient is assigned
                                >
                                  Go to section
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="logout-button">
        <button
          type="submit"
          className="btn btn-lg px-2"
          onClick={handleLogout}
          style={{
            position: "fixed",
            left: 20,
            bottom: 20,
            cursor: "pointer",
            color: "white",
            border: 0,
          }}
        >
          <TbLogout2 size={50} />
        </button>
      </div>
    </body>
  );
};

export default SectionDashboard;
