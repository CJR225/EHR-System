import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';

function PatientMedRec({ selectedPatient }) {
    // State to store medication data, initialized as an empty array
    const [medications, setMedications] = useState([]);

    // useEffect hook to fetch medications data when selectedPatient changes
    useEffect(() => {
        if (selectedPatient) {
            fetchMedications();
        }
    }, [selectedPatient]); // Dependency array includes selectedPatient

    // Asynchronous function to fetch medication details for the selected patient
    const fetchMedications = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/patients/${selectedPatient.id}/medications`);
            setMedications(response.data); // Updating state with fetched data
        } catch (error) {
            console.error("Error fetching patient medications:", error);
            toast.error("Failed to fetch medications."); // Display error notification
        }
    };

    // Handler function to delete a specific medication
    const handleDeleteMedication = async (medicationId) => {
        try {
            await axios.delete(`http://localhost:3001/patients/${selectedPatient.id}/medicines/${medicationId}`);
            toast.success("Medication deleted successfully!"); // Success notification
            // Update medications state by filtering out the deleted medication
            setMedications(meds => meds.filter(med => med.id !== medicationId));
        } catch (error) {
            console.error("Failed to delete medication:", error);
            toast.error("Failed to delete medication."); // Error notification
        }
    };

    // Component rendering
    return (
        <div style={{
            margin: "4vh",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}>
            <h3 style={{
                borderBottom: "2px solid #418FDE",
                paddingBottom: "10px",
                marginBottom: "20px",
            }}>
                Medication Reconciliation
            </h3>

            <div style={{ overflowX: "auto" }}>
                <table style={{
                    width: "100%",
                    marginTop: "3vh",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}>
                    <thead style={{ backgroundColor: "#418FDE", color: "white" }}>
                        <tr>
                            <th style={{ padding: "10px", textAlign: "Left" }}>Medication</th>
                            <th style={{ textAlign: "Left" }}>Dose</th>
                            <th style={{ textAlign: "Left" }}>Route</th>
                            <th style={{ textAlign: "Left" }}>Frequency</th>
                            <th style={{ textAlign: "Left" }}>Last Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medications.map((med, index) => (
                            <tr key={index} style={{
                                borderBottom: "1px solid #ddd",
                                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                            }}>
                                <td style={{ padding: "10px" }}>{med.name}</td>
                                <td>{med.medicine_patient.dosage}</td>
                                <td>{med.medicine_patient.route}</td>
                                <td>{med.medicine_patient.frequency}</td>
                                <td>{med.medicine_patient.taken_last
                                    ? new Date(med.medicine_patient.taken_last).toLocaleString()
                                    : "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// Exporting the component for use in other parts of the application
export default PatientMedRec;
