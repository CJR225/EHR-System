import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import styles from '../PatientDash.module.css';

// The PatientDemographics component, using destructuring to get the selectedPatient prop directly
const PatientDemographics = ({ selectedPatient }) => {
  // State for storing the demographic data of the selected patient
  const [demographics, setDemographics] = useState(null);

  // useEffect hook to react to changes in selectedPatient
  useEffect(() => {
    // Fetch demographics if a patient is selected
    if (selectedPatient) {
      fetchDemographics(selectedPatient.id);
    }
  }, [selectedPatient]); // Dependency array includes selectedPatient to trigger effect when it changes

  // Asynchronous function to fetch demographics using axios
  const fetchDemographics = async (patientId) => {
    try {
      // Sending GET request to server for the patient's demographic data
      const response = await axios.get(`http://localhost:3001/patients/${patientId}/demographics`);
      // Updating state with the fetched data
      setDemographics(response.data);
    } catch (error) {
      // Logging and showing error if the request fails
      console.error("Error fetching patient demographics:", error);
      toast.error("Failed to fetch patient demographics.");
    }
  };

  // Render a message if no patient is selected
  if (!selectedPatient) {
    return <p>Please select a patient to view their demographics.</p>;
  }

  // Main return block rendering the demographic details of the selected patient
  return (
    <div 
      style={{
        margin: "4vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ borderBottom: "2px solid #418FDE", color: "#333", paddingBottom: "10px", marginBottom: "20px" }}>
        Patient Demographics
      </h3>
      {demographics ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* Rendering demographic data conditionally if it is available */}
          <p><strong>Name:</strong> {demographics.fname} {demographics.lname}</p>
          <p><strong>Date of Birth:</strong> {demographics.dob}</p>
          <p><strong>Height:</strong> {demographics.height} cm</p>
          <p><strong>Weight:</strong> {demographics.weight} kg</p>
          <p><strong>Religion:</strong> {demographics.religion}</p>
          <p><strong>Gender:</strong> {demographics.gender}</p>
          <p><strong>Gender at Birth:</strong> {demographics.gender_at_birth}</p>
          <p><strong>Emergency Contact:</strong> {demographics.emergency_contact_name}</p>
          <p><strong>Emergency Contact Phone:</strong> {demographics.emergency_contact_number}</p>
        </div>
      ) : (
        // Display a loading message while the data is being fetched
        <p>Loading demographics...</p>
      )}
      {/* ToastContainer component to manage notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

// Exporting the component for use in other parts of the application
export default PatientDemographics;
