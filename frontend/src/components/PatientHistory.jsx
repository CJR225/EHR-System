import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css'; // Importing CSS module for styling

function PatientHistory({ selectedPatient }) {
  // State for storing patient history data, initially an empty object
  const [historyInfo, setHistoryInfo] = useState({});

  // useEffect to fetch history when selectedPatient changes
  useEffect(() => {
    // Check if a patient is selected
    if (selectedPatient) {
      // Asynchronous function to fetch patient's history
      const fetchHistory = async () => {
        try {
          // Sending GET request to the server for patient's history
          const response = await axios.get(`http://localhost:3001/patients/patient-history/${selectedPatient.id}`);
          // Setting the fetched history data to state
          setHistoryInfo(response.data);
        } catch (error) {
          // Log and show error if the request fails
          console.error("Error fetching patient history:", error);
          toast.error("Failed to fetch patient history.");
        }
      };

      // Call the fetchHistory function
      fetchHistory();
    }
  }, [selectedPatient]); // Dependency array includes selectedPatient

  // Render a message if no history information is available
  if (!historyInfo) return <p>No history available.</p>;

  // Main return block rendering the history details of the selected patient
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
          <h3
            style={{
              borderBottom: "2px solid #007bff",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            Patient History
          </h3>

          {/* Each section of patient history (presenting problem, past medical history, family history) */}
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
  )
}

// Exporting the component for use in other parts of the application
export default PatientHistory;
