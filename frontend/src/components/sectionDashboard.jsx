
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SectionDashboard = () => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        // Fetch the section data when the component mounts
        axios.get('http://localhost:3001/patients/section-list')  // Update the URL based on your actual setup
            .then(response => {
                setSections(response.data);  // Set the sections data to state
            })
            .catch(error => {
                console.error('Error fetching sections:', error);
            });
    }, []);

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
              <div class="col-12 col-md-8 col-lg-6 col-xl-8">
                <div
                  class="card text-white"
                  styles="border-radius: 1rem;"
                  id="cardlogin"
                >
                  <div class="card-body p-5 text-left">
                    <div class="mb-md-4 mt-md-2">
                      <h2 class="fw-bold mb-2 pb-2" id="loginTitle">
                        Sections
                      </h2>
                      <div class="form-outline form-white mb-0">
                      <div>
            {sections.map(section => (
                <div key={section.section_id}>
                    <h3 class="fw-bold mb-2 pb-2" id="loginTitle">Section {section.section_id} - Instructor: {section.instructor?.username || 'Not assigned'}</h3>
                    <h3>Students:</h3>
                    <ul>
                        {section.Students && section.Students.length > 0 ? (
                            section.Students.map(student => (
                                <li key={student.user_id}>
                                    {student.fname} {student.lname} - {student.username}
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

        <footer>
          <div class="text-center fixed-bottom pb-3" id="loginFooter">
            Chris Rocco, Matt Nova, Billy Siri &copy; Quinnipiac 2024
          </div>
        </footer>
      </div>
    </body>
  );
};

export default SectionDashboard;
