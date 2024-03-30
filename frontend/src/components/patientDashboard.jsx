import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

import {
  FaHome,
  FaPaperPlane,
  FaBook,
  FaFlask,
  FaMedkit,
  FaPencilAlt
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";


function PatientDash() {
  // State variables to manage patient data
  const [patients, setPatients] = useState([]); // Holds the list of patients
  const [selectedPatient, setSelectedPatient] = useState(null); // Holds the selected patient
  const [activeTab, setActiveTab] = useState('Demographics'); // Tracks active tab
  const [showSubTabs, setShowSubTabs] = useState(false); // Controls visibility of sub-tabs
  const [demographics, setDemographics] = useState(null); // Holds patient demographics
  const [medications, setMedications] = useState([]); // Holds patient medications
  const [allergies, setAllergies] = useState([]); // Holds patient allergies



  // Fetches medications for the selected patient when the active tab is 'Med Rec'
useEffect(() => {
  if (selectedPatient && activeTab === 'Med Rec') {
    axios.get(`http://localhost:3001/patients/${selectedPatient.id}/medications`)
      .then(response => {
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

  //Sidebar creation
  const [homeOpen, setHomeOpen] = useState(false);
  const [PCOpen, setPCOpen] = useState(false);
  const Sidebar = ({children}) => {
  const menuItem=[
      { name:"Dashboard", icon:
      <view style={{flexDirection:'col',display:'flex', marginTop:'3vh', marginLeft:'2.3vw'}} onClick={() => setHomeOpen(!homeOpen)}>
        <FaHome></FaHome>
        <IoIosArrowForward className={homeOpen ? "sidebarIcon open active" : "sidebarIcon"} style={{fontSize:'2vw', marginTop:'2.5vh'}}></IoIosArrowForward>
      </view> },
      { name:"Orders", icon:<FaPaperPlane/> },
      { name:"MAR", icon:<FaBook/> },
      { name:"Labs", icon:<FaFlask/> },
      { name:"Patient Care", icon:
      <view style={{flexDirection:'col',display:'flex', marginTop:'3vh', marginLeft:'2.3vw'}} onClick={() => setPCOpen(!PCOpen)}>
        <FaMedkit></FaMedkit>
        <IoIosArrowForward className={PCOpen ? "sidebarIcon open active" : "sidebarIcon"} style={{fontSize:'2vw', marginTop:'2.5vh'}}></IoIosArrowForward>
      </view> },
      { name:"Notes", icon:<FaPencilAlt/> },
      { name:"Logout", path: "/" , icon:<TbLogout2 style={{marginTop:'25vh', position:'fixed',marginLeft:'-2.4vw'}}></TbLogout2>}
    ]
    return (
      <div className="sidebarContainer">
        <div className="sidebar">
          {
            menuItem.map((item, index)=>(
              <NavLink to={item.path} key={index} className="sidebarLink">
                <div onClick={setActiveTab} className="sidebarIcon active">{item.icon}</div>
              </NavLink>
            ))
          }
        </div>
        <div className="sidebarMain">{children}</div>
      </div>
    );
  };
  const HomeSidebar = ({children}) => {
    const menuItem=[
      { name:'Demographics' },
      { name:'Med Rec' },
      { name:"History" }
    ]
    return (
      <div className="homeSidebarContainer">
        <div style={{width: homeOpen ? "18vw" : "8.3vw"}} className="homeSidebar">
        {
          menuItem.map((item, index)=>(
            <NavLink to={item.path} key={index} className="homeLink" activeclassName="active" onClick={() => handleTabClick(item.name)}>
              <div style={{display: homeOpen ? "fixed" : "none", marginLeft:'9vw'}} className="homeLink_text">{item.name}</div>
            </NavLink>
          ))
        }
        </div>
        <div className="homeMain">{children}</div>
      </div>
    );
  }
  const PCSidebar = ({children}) => {
    const menuItem=[
      { name:"WALDO" },
      { name:"Vital Signs" },
      { name:"Input & Output" },
      { name:"Blood Admin"}
    ]
    return (
      <div className="PCSidebarContainer">
        <div style={{width: PCOpen ? "18vw" : "8.3vw"}} className="PCSidebar">
        {
          menuItem.map((item, index)=>(
            <NavLink to={item.path} key={index} className="PCLink" activeclassName="active" onClick={() => handleTabClick(item.name)}>
              <div style={{display: PCOpen ? "fixed" : "none", marginLeft:'9vw'}} className="PCLink_text">{item.name}</div>
            </NavLink>
          ))
        }
        </div>
        <div className="PCMain">{children}</div>
      </div>
    );
  }
  return (
    <>
      <HomeSidebar></HomeSidebar>
      <PCSidebar></PCSidebar>
      <Sidebar></Sidebar>
      <header className="mb-10">
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-1 vh-100">
              <nav className="nav nav-underline flex-column" style={{ padding: 20, alignContent: "center" }}>
              </nav>
            </div>
            <div id="patientDash" className="col-lg-11 vh-100" style={{ margin: 0, padding: 0, backgroundColor: '#d7dfe0' }}>

              <nav className="flex-column" style={{background:"#818589", color:"black", height:"10vh"}}>
                <div style={{ flex: 1 }}>
                  <select style={{marginTop:'1.8vh', marginLeft:'4vh'}} onChange={handleSelectPatient} value={selectedPatient?.id || ""}>
                    <option value="">Select a patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        Name: {patient.fname} {patient.lname}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedPatient && (
                  <div style={{ flex: 8, display: 'flex', justifyContent: 'space-around', marginTop:'1vh'}}>
                    <span>Medical Record #: {selectedPatient.id}</span>
                    <span>Patient Name: {selectedPatient.fname} {selectedPatient.lname}</span>
                    <span>Date of Birth: {selectedPatient.dob}</span>
                    <span>Height: {selectedPatient.height} cm</span>
                    <span>Weight: {selectedPatient.weight} kg</span>
                    <span>Allergies:
                    {allergies.map(allergy => (
                      <span key={allergy.allergy_id}>{allergy.name}</span>
                    ))}</span>
                  </div>
                )}


              </nav>
              {/* Render content based on the active tab */}
              {activeTab === 'Demographics' && demographics && (
                <div style={{marginTop:'4vh', marginLeft:'4vh'}}>
                  <h3>Patient Demographics</h3>
                  <p><strong>Name:</strong> {demographics.fname} {demographics.lname}</p>
                  <p><strong>Date of Birth:</strong> {formatDate(demographics.dob)}</p>
                  <p><strong>Religion:</strong> {demographics.religion}</p>
                </div>
              )}

              {activeTab === 'Med Rec' && (
                <div style={{margin:'4vh'}}>
                  <h3>Medication Reconciliation</h3>


                  <form onSubmit={handleAddMedication} style={{marginTop:'1.8vh' }}>
                    <label className="MRLabels">Medication ID: <input type="number" name="med_id" required /></label>
                    <label className="MRLabels">Dosage: <input type="number" name="dosage" /></label>
                    <label className="MRLabels">Route: <input type="text" name="route" /></label>
                    <label className="MRLabels">Frequency: <input type="text" name="frequency" /></label>
                    <label className="MRLabels">Last Taken: <input type="datetime-local" name="taken_last" /></label>
                    <label className="MRLabels">Administered At: <input type="datetime-local" name="administered_at" required /></label>
                    <button type="submit" className="MRLabels">Add Medication</button>
                  </form>
                  <button onClick={deleteAllMedications} style={{ background: 'red', color: 'white' , marginBottom:'3vh'}}>
                    Delete All Medications
                  </button>

                 
                  {medications.length > 0 && (
                    <div>
                      <h4>Previous Medications</h4>
                      <table style={{ width: '100%', marginTop: '3vh', background:'lightgrey' }}>
                        <thead>
                          <tr>
                            <th>Medication id</th>
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
                              <td>{med.med_id}</td>
                              <td>{med.dosage}</td>
                              <td>{med.route}</td>
                              <td>{med.frequency}</td>
                              <td>{new Date(med.taken_last).toLocaleString()}</td>
                              <td>{new Date(med.administered_at).toLocaleString()}</td>
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
    </header></>
  );
}

export default PatientDash;
