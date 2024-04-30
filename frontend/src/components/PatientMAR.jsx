

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';
import { IoIosArrowForward } from "react-icons/io";

function PatientMAR({ selectedPatient }) {
  // State to hold the list of medications, initialized as an empty array
  const [medications, setMedications] = useState([]);
  const [medicationOptions, setMedicationOptions] = useState([]);

  // Effect to fetch medications whenever the selectedPatient changes
  useEffect(() => {
    if (selectedPatient) {
      fetchMedications();
      fetchMedicationOptions();
    }
  }, [selectedPatient]);

  // Asynchronous function to fetch medications for the selected patient
  const fetchMedications = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/patients/${selectedPatient.id}/medicine`);
      setMedications(response.data);
    } catch (error) {
      console.error("Error fetching patient medications:", error);
      toast.error("Failed to fetch medications.");
    }
  };

  const fetchMedicationOptions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/patients/medicines'); // Update with the correct endpoint
      setMedicationOptions(response.data);
    } catch (error) {
      console.error("Error fetching medication options:", error);
      toast.error("Failed to fetch medication options.");
    }
  };
  // Inside your handleAddMedication function
  const handleAddMedication = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target);
    const medicationData = Object.fromEntries(formData.entries());

    // Adjust the keys in medicationData to match your backend expectations
    const adjustedMedicationData = {
      med_id: medicationData.med_id, // assuming the backend expects med_id
      dosage: medicationData.dosage,
      route: medicationData.route,
      frequency: medicationData.frequency,
      taken_last: medicationData.taken_last,
      time_taken: medicationData.time_taken,
      administered_at: medicationData.administered_at,
    };

    try {
      // Send a POST request to add a medication
      const response = await axios.post(
        `http://localhost:3001/patients/${selectedPatient.id}/medicines`,
        adjustedMedicationData
      );
      if (response.status === 201) {
        toast.success("Medication added successfully!");
        fetchMedications(); // This should be the correct endpoint for fetching medications
      } else {
        throw new Error('Failed to add the medication');
      }
    } catch (error) {
      console.error("Error adding medication:", error);
      toast.error("Failed to add medication.");
    }
  };


  // Handler for deleting medication entries
  const handleDeleteMedication = async (medicationId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/patients/${selectedPatient.id}/medicines/${medicationId}`);
      if (response.status === 200) {
        const updatedMedications = medications.filter(med => med.id !== medicationId);
        setMedications(updatedMedications);
        toast.success("Medication deleted successfully!");
      } else {
        throw new Error('Failed to delete the medication');
      }
    } catch (error) {
      console.error("Failed to delete medication:", error);
      toast.error("Failed to delete medication.");
    }
  };


  const [MAROpen, setMAROpen] = useState(false);
  const [PRNOpen, setPRNOpen] = useState(false);

  // Rendering the component
  return (
    <div>
      {/* MAR Content */}
      <div className={styles.outerContainer}>
        <view onClick={() => setMAROpen(!MAROpen)} style={{ cursor: 'pointer' }}>
          <h2 className={styles.tabHeading}>
            Medication Administration Record (MAR)
            <IoIosArrowForward
              className={MAROpen ? styles.condenseIcon : styles.condenseIconOpen}
            ></IoIosArrowForward>
          </h2>
        </view>
        <div style={{ display: MAROpen ? 'contents' : 'none' }}>
          {/* Form for adding new medications */}
          <form onSubmit={handleAddMedication} className={styles.marForm}>
            <div className={styles.formRow}>
              {["med_id", "dosage", "route", "frequency", "taken_last", "time_taken", "administered_at"].map(field => (
                <div className={styles.inputWrapper} key={field}>
                  <label htmlFor={field}>
                    {field === 'med_id' ? 'Medication' :
                      field.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </label>
                  {field === 'med_id' ? (
                    <select className={styles.formInput} name={field} id={field} required>
                      {medicationOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className={styles.formInput}
                      type={["taken_last", "time_taken", "administered_at"].includes(field) ? "datetime-local" : "text"}
                      name={field}
                      id={field}
                      placeholder={field === 'med_id' ? 'Enter Medication' : ''}
                      required={field === 'administered_at'}
                    />
                  )}
                </div>
              ))}
              <button className={styles.formButton} type="submit">Add Medication</button>
            </div>
          </form>

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
                  <td>{med.Medicine?.name}</td>
                  <td>{med.dosage}</td>
                  <td>{med.route}</td>
                  <td>{med.frequency}</td>
                  <td>{med.taken_last ? new Date(med.taken_last).toLocaleString() : "N/A"}</td>
                  <td>{med.time_taken ? new Date(med.time_taken).toLocaleString() : "N/A"}</td>
                  <td>{med.administered_at ? new Date(med.administered_at).toLocaleString() : "N/A"}</td>
                  <td>
                    <button onClick={() => handleDeleteMedication(med.id)} className={`${styles.formButton} ${styles.delete}`}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
      {/* PRN Content */}
<div className={styles.outerContainer}>
  <view onClick={() => setPRNOpen(!PRNOpen)} style={{ cursor: 'pointer' }}>
    <h2 className={styles.tabHeading}>
      Medication As Needed (PRN)
      <IoIosArrowForward
        className={PRNOpen ? styles.condenseIcon : styles.condenseIconOpen}
      ></IoIosArrowForward>
    </h2>
  </view>
  <div style={{ display: PRNOpen ? 'contents' : 'none' }}>
    {/* Form for adding new PRN medications */}
    <form onSubmit={handleAddMedication} className={styles.marForm}>
      <div className={styles.formRow}>
        {["med_id", "dosage", "route", "frequency", "taken_last", "time_taken", "administered_at"].map(field => (
          <div className={styles.inputWrapper} key={field}>
            <label htmlFor={field}>
              {field === 'med_id' ? 'Medication' :
                field.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            {field === 'med_id' ? (
              <select className={styles.formInput} name={field} id={field} required>
                <option value="">Select Medication</option>
                {medicationOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className={styles.formInput}
                type={["taken_last", "time_taken", "administered_at"].includes(field) ? "datetime-local" : "text"}
                name={field}
                id={field}
                placeholder={field.replace('_', ' ').charAt(0).toUpperCase() + field.slice(1)}
                required={field === 'administered_at'}
              />
            )}
          </div>
        ))}
        <button className={styles.formButton} type="submit">Add Medication</button>
      </div>
    </form>
    {/* Table displaying the list of PRN medications */}
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th><th>Dosage</th><th>Route</th><th>Frequency</th>
          <th>Last Taken</th><th>Time Taken</th><th>Administered At</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        {medications.map((med) => (
          <tr key={med.id}>
            <td>{med.Medicine?.name || "Unknown Medication"}</td>
            <td>{med.dosage}</td>
            <td>{med.route}</td>
            <td>{med.frequency}</td>
            <td>{med.taken_last ? new Date(med.taken_last).toLocaleString() : "N/A"}</td>
            <td>{med.time_taken ? new Date(med.time_taken).toLocaleString() : "N/A"}</td>
            <td>{med.administered_at ? new Date(med.administered_at).toLocaleString() : "N/A"}</td>
            <td>
              <button onClick={() => handleDeleteMedication(med.id)} className={`${styles.formButton} ${styles.delete}`}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}

// Exporting the component for use elsewhere in the application
export default PatientMAR;