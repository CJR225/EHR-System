import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { FaHome, FaPaperPlane, FaBook, FaFlask, FaMedkit, FaPencilAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import axios from "axios";

class PatientBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            selectedPatient: null,
        };
    }

    componentDidMount() {
        this.fetchPatients();
    }

    fetchPatients = () => {
        axios.get('http://localhost:3001/patients')
            .then(response => {
                const formattedPatients = response.data.map(patient => ({
                    ...patient,
                    dob: this.formatDate(patient.dob)
                }));
                this.setState({ patients: formattedPatients });
            })
            .catch(error => {
                console.error('There was an error fetching the patients:', error);
            });
    }

    formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
    
      handleSelectPatient = (event) => {
        const patientId = event.target.value;
        const patient = this.state.patients.find(
          (p) => p.id.toString() === patientId
        );
        this.setState({ selectedPatient: patient, allergies: [] });
        this.fetchAllergies(patientId);
      };

      fetchAllergies = (patientId) => {
        axios
          .get(`http://localhost:3001/patients/${patientId}/allergies`)
          .then((response) => {
            this.setState({ allergies: response.data });
          })
          .catch((error) => {
            console.error("There was an error fetching the allergies:", error);
          });
      };

    render() {
        const { patients, selectedPatient, allergies } = this.state;
        
        return (
            <nav className="flex-column" style={{ background: "#a3c2c2", color: "black", height: "13.5vh" }}>
                    <div style={{ flex: 1 }}>
                        <CgProfile style={{ fontSize: '4vw', marginLeft: '3vw' }} />
                        <select style={{ marginTop: '3vh', marginLeft: '4vh' }} onChange={this.handleSelectPatient} value={selectedPatient?.id || ""}>
                            <option value="">Select a patient</option>
                            {patients.map(patient => (
                                <option key={patient.id} value={patient.id}>
                                    Name: {patient.fname} {patient.lname}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedPatient && (
                        <div style={{ flex: 10, display: 'flex', justifyContent: 'space-around', marginTop: '1vh' }}>
                            <span>Medical Record #: {selectedPatient.id}</span><span>|</span>
                            <span>Patient Name: {selectedPatient.fname} {selectedPatient.lname}</span><span>|</span>
                            <span>Date of Birth: {selectedPatient.dob}</span><span>|</span>
                            <span>Height: {selectedPatient.height} cm</span><span>|</span>
                            <span>Weight: {selectedPatient.weight} kg</span><span>|</span>
                            <span>Allergies:
                                {allergies.map(allergy => (
                                    <span key={allergy.allergy_id}>{allergy.name}</span>
                                ))}
                            </span>
                        </div>
                    )}
                </nav>
        );
    }
}

export default PatientBanner;