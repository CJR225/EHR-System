import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbLogout2 } from "react-icons/tb";

const SectionDashboard = () => {
  const [sections, setSections] = useState([]);

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
                      <h2 class="fw-bold mb-3 pb-2" id="loginTitle" style={{borderBottom: "2px solid #418FDE"}}>
                        Sections
                      </h2>
                      <div class="form-outline form-white mb-0">
                        <div>
                          {sections.map((section) => (
                            <div key={section.section_id}>
                              <h3 class="fw-bold mb-2 pb-2" id="loginTitle" style={{ fontSize: 25}}>
                                Section {section.section_id} - Instructor:{" "}
                                {section.instructor.first_name}{" "}
                                {section.instructor.last_name || "Not assigned"}
                              </h3>
                              <h3 class="fw-light" id="loginTitle" style={{ fontSize: 20}}>Students:</h3>
                              <ul>
                                {section.Students &&
                                section.Students.length > 0 ? (
                                  section.Students.map((student) => (
                                    <li key={student.user_id}>
                                      {student.fname} {student.lname} -{" "}
                                      {student.username}
                                    </li>
                                  ))
                                ) : (
                                  <li>No students assigned</li>
                                )}
                              </ul>
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
