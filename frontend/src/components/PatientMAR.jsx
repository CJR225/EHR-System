import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';

function PatientMAR({ selectedPatient }) {
  // State to hold the list of medications, initialized as an empty array
  const [medications, setMedications] = useState([]);

  // Effect to fetch medications whenever the selectedPatient changes
  useEffect(() => {
    if (selectedPatient) {
      fetchMedications();
    }
  }, [selectedPatient]);

  // Asynchronous function to fetch medications for the selected patient
  const fetchMedications = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/patients/${selectedPatient.id}/medications`);
      setMedications(response.data);
    } catch (error) {
      console.error("Error fetching patient medications:", error);
      toast.error("Failed to fetch medications.");
    }
  };

  // Handler for adding new medication entries
  const handleAddMedication = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target);
    const medicationData = Object.fromEntries(formData.entries());

    try {
      // Send a POST request to add a medication
      await axios.post(`http://localhost:3001/patients/${selectedPatient.id}/medicines`, medicationData);
      toast.success("Medication added successfully!");
      // Refetch medications to update the list after adding a new one
      const response = await axios.get(`http://localhost:3001/patients/${selectedPatient.id}/medications`);
      setMedications(response.data);
    } catch (error) {
      console.error("Error adding medication:", error);
      toast.error("Failed to add medication.");
    }
  };

  // Handler for deleting medication entries
  const handleDeleteMedication = async (medicationId) => {
    try {
      await axios.delete(`http://localhost:3001/patients/${selectedPatient.id}/medicines/${medicationId}`);
      toast.success("Medication deleted successfully!");
      // Update the medications list by filtering out the deleted item
      setMedications(meds => meds.filter(med => med.id !== medicationId));
    } catch (error) {
      console.error("Failed to delete medication:", error);
      toast.error("Failed to delete medication.");
    }
  };

  // Rendering the component
  return (
    <div className={styles.tabContent}>
      <div className={styles.tabContent}>
        <h2 className={styles.tabHeading}>
          Medication Administration Record (MAR)
        </h2>
        {/* Form for adding new medications */}
        <form onSubmit={handleAddMedication} className={styles.marForm}>
          <div className={styles.formRow}>
            { // Input fields for medication details
              ["med_id", "dosage", "route", "frequency", "taken_last", "time_taken", "administered_at"].map(field => (
                <div className={styles.inputWrapper} key={field}>
                  <label htmlFor={field}>{field.replace('_', ' ').charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    className={styles.formInput}
                    type={field.includes('date') ? "datetime-local" : "text"}
                    name={field}
                    id={field}
                    required={field === 'administered_at'}
                  />
                </div>
              ))
            }
            <button className={styles.formButton} type="submit">
              Add Medication
            </button>
          </div>
        </form>
        {/* Table displaying the list of medications */}
        <table className={styles.table}>
          <thead>
            <tr>
              {/* Table headers for medication details */}
              <th>Name</th><th>Dosage</th><th>Route</th><th>Frequency</th>
              <th>Last Taken</th><th>Time Taken</th><th>Administered At</th><th></th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med) => (
              <tr key={med.id}>
                {/* Medication data rendered in table rows */}
                <td>{med.name}</td>
                <td>{med.medicine_patient.dosage}</td>
                <td>{med.medicine_patient.route}</td>
                <td>{med.medicine_patient.frequency}</td>
                <td>{med.medicine_patient.taken_last ? new Date(med.medicine_patient.taken_last).toLocaleString() : "N/A"}</td>
                <td>{med.medicine_patient.time_taken ? new Date(med.medicine_patient.time_taken).toLocaleString() : "N/A"}</td>
                <td>{med.medicine_patient.administered_at ? new Date(med.medicine_patient.administered_at).toLocaleString() : "N/A"}</td>
                {/* Delete button for each medication entry */}
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
    </div>
  );
}

// Exporting the component for use elsewhere in the application
export default PatientMAR;
