import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PatientDash() {
  // State variables to manage patient data
  const [patients, setPatients] = useState([]); // Holds the list of patients
  const [selectedPatient, setSelectedPatient] = useState(null); // Holds the selected patient
  const [activeTab, setActiveTab] = useState('Demographics'); // Tracks active tab
  const [showSubTabs, setShowSubTabs] = useState(false); // Controls visibility of sub-tabs
  const [demographics, setDemographics] = useState(null); // Holds patient demographics
  const [medications, setMedications] = useState([]); // Holds patient medications
  const [allergies, setAllergies] = useState([]); // Holds patient allergies



  // Fetches medications for the selected patient when the active tab is 'MR'
  useEffect(() => {
    if (selectedPatient && activeTab === 'MR') {
      axios.get(`http://localhost:3001/patients/${selectedPatient.id}/medications`)
        .then(response => {
          console.log(response.data); // Log to see the structure and data
          setMedications(response.data);
        })
        .catch(error => {
          console.error('Error fetching medications for patient:', error);
        });
    }
  }, [selectedPatient, activeTab]);

  // Fetches all patients when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/patients')
      .then(response => {
        // Formats patient data (e.g., date of birth) before setting state
        const formattedPatients = response.data.map(patient => ({
          ...patient,
          dob: formatDate(patient.dob)
        }));
        setPatients(formattedPatients);
      })
      .catch(error => {
        console.error('There was an error fetching the patients:', error);
      });
  }, []);

  // Fetches patient allergies when the selected patient changes
  useEffect(() => {
    if (selectedPatient) {
      axios.get(`http://localhost:3001/patients/${selectedPatient.id}/allergies`)
        .then(response => {
          setAllergies(response.data);

        })
        .catch(error => {
          console.error('There was an error fetching the patients:', error);
        });
    }
  }, [selectedPatient]);

  // Fetches patient demographics when the selected patient or active tab changes
  useEffect(() => {
    if (selectedPatient && activeTab === 'Demographics') {
      axios.get(`http://localhost:3001/patients/${selectedPatient.id}/demographics`)
        .then(response => {
          setDemographics(response.data);
        })
        .catch(error => {
          console.error('Error fetching patient demographics:', error);
        });
    }
  }, [selectedPatient, activeTab]);






  // Function to format date string to a specified format
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Handles the selection of a patient from the dropdown menu
  const handleSelectPatient = (event) => {
    const patientId = event.target.value;
    const patient = patients.find(p => p.id.toString() === patientId);

    // Format the DOB of the selected patient before updating the state
    const formattedPatient = {
      ...patient,
      dob: patient ? formatDate(patient.dob) : ''
    };
    setSelectedPatient(patient);
  };

  // Handles the click event on tabs to switch between different views
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Deletes all medication entries for the selected patient
  const deleteAllMedications = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete ALL medication entries? This action cannot be undone.");
    if (isConfirmed) {
      try {
        await axios.delete('http://localhost:3001/patients/medicine-patient/all');
        toast.success('All medication entries deleted successfully');
        setMedications([]); // Clear medications from state
      } catch (error) {
        console.error('Error deleting all medications:', error);
        toast.error('Failed to delete medication entries.');
      }
    }
  };

  // Handles the submission of a new medication entry form
  const handleAddMedication = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Add the selectedPatient.id to the data
    data.patient_id = selectedPatient.id;

    try {
      const response = await axios.post('http://localhost:3001/patients/medicine-patient', data);
      toast.success('Medication added successfully!');
      console.log('Medication added', response.data);

      // Re-fetch medications for the current patient
      fetchMedications();

      // fetch and update the medication list for the patient
    } catch (error) {
      console.error('Error adding medication:', error);
      toast.error('Failed to add medication.');
    }
  };

  // Fetches medications for the selected patient
  const fetchMedications = async () => {
    if (selectedPatient && selectedPatient.id) {
      try {
        const response = await axios.get(`http://localhost:3001/patients/${selectedPatient.id}/medications`);
        setMedications(response.data);
      } catch (error) {
        console.error('Error fetching medications for patient:', error);
      }
    }
  };

  // Calls fetchMedications inside useEffect when selectedPatient or activeTab changes
  useEffect(() => {
    fetchMedications();
  }, [selectedPatient, activeTab]);

  return (
    <header className="mb-10">
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-1 vh-100" style={{ backgroundColor: '#9dbbc4' }}>
              <nav className="nav nav-underline flex-column" style={{ padding: 20, alignContent: "center" }}>

                <div className="nav-link" onClick={() => setShowSubTabs(!showSubTabs)}>Home</div>
                {showSubTabs && (
                  <div style={{ paddingLeft: 20 }}>
                    <button className="nav-link" onClick={() => handleTabClick('Demographics')}>Demographics</button>
                    <button className="nav-link" onClick={() => handleTabClick('MR')}>Medication Reconciliation (MR)</button>
                  </div>
                )}
                <a className="nav-link" href="#">Orders</a>
                <a className="nav-link" href="#">MAR</a>
                <a className="nav-link" href="#">Labs</a>
                <a className="nav-link" href="#">Patient Care</a>
                <a className="nav-link" href="#">Notes</a>
              </nav>
            </div>
            <div id="patientDash" className="col-lg-11 vh-100" style={{ margin: 0, padding: 0, backgroundColor: '#d7dfe0' }}>

              <nav className="navbar bg-body-tertiary">
                <div style={{ flex: 1 }}>
                  <select onChange={handleSelectPatient} value={selectedPatient?.id || ""}>
                    <option value="">Select a patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id} >
                        Name: {patient.fname} {patient.lname}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedPatient && (
                  <div style={{ flex: 8, display: 'flex', justifyContent: 'space-around' }}>
                    <span>Medical Record #: {selectedPatient.id}</span>
                    <span>Patient Name: {selectedPatient.fname} {selectedPatient.lname}</span>
                    <span>Date of Birth: {selectedPatient.dob}</span>
                    <span>Height: {selectedPatient.height} cm</span>
                    <span>Weight: {selectedPatient.weight} kg</span>
                    <span>Allergies:
                      {allergies.length > 0 ? (
                        allergies.map((allergyItem, index) => ( // Ensure parameters are defined here
                          <span key={allergyItem.allergy_id || index}>{allergyItem.allergy.name}</span>
                        ))
                      ) : (
                        <span>No allergies</span>
                      )}
                    </span>
                  </div>
                )}


              </nav>

              {/* Render content based on the active tab */}
              {activeTab === 'Demographics' && demographics && (
                <div>
                  <h3>Patient Demographics</h3>
                  <p><strong>Name:</strong> {demographics.fname} {demographics.lname}</p>
                  <p><strong>Date of Birth:</strong> {formatDate(demographics.dob)}</p>
                  <p><strong>Religion:</strong> {demographics.religion}</p>
                </div>
              )}

              {activeTab === 'MR' && (
                <div>
                  <h3>Medication Reconciliation</h3>


                  <form onSubmit={handleAddMedication}>
                    <label>Medication ID: <input type="number" name="med_id" required /></label>
                    <label>Dosage: <input type="number" name="dosage" /></label>
                    <label>Route: <input type="text" name="route" /></label>
                    <label>Frequency: <input type="text" name="frequency" /></label>
                    <label>Last Taken: <input type="datetime-local" name="taken_last" /></label>
                    <label>Administered At: <input type="datetime-local" name="administered_at" required /></label>
                    <button type="submit">Add Medication</button>
                  </form>
                  <button onClick={deleteAllMedications} style={{ background: 'red', color: 'white' }}>
                    Delete All Medications
                  </button>


                  {medications.length > 0 && (
                    <div>
                      <h4>Previous Medications</h4>
                      <table style={{ width: '100%', marginTop: '20px' }}>
                        <thead>
                          <tr>
                            <th>Medication ID</th>
                            <th>Name</th>
                            <th>Dosage</th>
                            <th>Route</th>
                            <th>Frequency</th>
                            <th>Last Taken</th>
                            <th>Administered At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medications.map((med, index) => (
                            <tr key={index}>
                              <td>{med.id}</td>
                              <td>{med.name}</td>
                              <td>{med.medicine_patient.dosage}</td>
                              <td>{med.medicine_patient.route}</td>
                              <td>{med.medicine_patient.frequency}</td>
                              <td>{med.medicine_patient.taken_last ? new Date(med.medicine_patient.taken_last).toLocaleString() : 'N/A'}</td>
                              <td>{med.medicine_patient.administered_at ? new Date(med.medicine_patient.administered_at).toLocaleString() : 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}



            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default PatientDash;
