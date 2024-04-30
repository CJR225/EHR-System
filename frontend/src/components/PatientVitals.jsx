import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css'; // Ensure this path matches
import { IoIosArrowForward } from "react-icons/io";

function PatientVitals({ selectedPatient }) {
    const [vitalsData, setVitalsData] = useState([]);
    const [newVital, setNewVital] = useState({
        temperature: '',
        heart_rate: '',
        bps: '',
        bpd: '',
        blood_oxygen: '',
        resting_respiratory: '',
        pain: ''
    });
    const [vitalsOpen, setVitalsOpen] = useState(false);

    useEffect(() => {
        if (selectedPatient) {
            fetchVitalsData();
        }
    }, [selectedPatient]);

    const fetchVitalsData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/patients/vitals/${selectedPatient.id}`);
            setVitalsData(response.data);
        } catch (error) {
            console.error("Error fetching patient vitals:", error);
            toast.error("Failed to fetch patient vitals.");
        }
    };

    const handleNewVitalChange = (event) => {
        const { name, value } = event.target;
        setNewVital(prev => ({ ...prev, [name]: value }));
    };

    const handleAddVital = async (event) => {
        event.preventDefault();
        try {
            const vitalData = { ...newVital, patient_id: selectedPatient.id }; // Ensure it's structured correctly
            await axios.post(`http://localhost:3001/patients/${selectedPatient.id}/vitals`, [vitalData]); // Send as an array
            toast.success("New vital sign added successfully!");
            setNewVital({
                temperature: '',
                heart_rate: '',
                bps: '',
                bpd: '',
                blood_oxygen: '',
                resting_respiratory: '',
                pain: ''
            }); // Reset form
            fetchVitalsData(); // Reload vitals
        } catch (error) {
            console.error("Error adding new vital signs:", error);
            toast.error("Failed to add new vital signs.");
        }
    };

    const handleDeleteVital = async (vitalId) => {
        try {
            await axios.delete(`http://localhost:3001/patients/${selectedPatient.id}/${vitalId}/vitals`);
            toast.success("Vital sign deleted successfully!");
            fetchVitalsData(); // Reload vitals
        } catch (error) {
            console.error("Error deleting vital signs:", error);
            toast.error("Failed to delete vital signs.");
        }
    };

    return (
        <div className={styles.outerContainer}>
            <div onClick={() => setVitalsOpen(!vitalsOpen)} style={{ cursor: 'pointer' }}>
                <h2 className={styles.tabHeading}>
                    Vital Signs
                    <IoIosArrowForward
                        className={vitalsOpen ? styles.condenseIconOpen : styles.condenseIcon}
                    ></IoIosArrowForward>
                </h2>
            </div>
            <div style={{ display: vitalsOpen ? 'block' : 'none' }}>
                <form onSubmit={handleAddVital} className={styles.marForm}>
                    <div className={styles.formRow}>
                        {Object.keys(newVital).map(key => (
                            <div className={styles.inputWrapper} key={key}>
                                <label htmlFor={key}>
                                    {key.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} ({units[key]})
                                </label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    name={key}
                                    id={key}
                                    value={newVital[key]}
                                    onChange={handleNewVitalChange}
                                />
                            </div>
                        ))}
                        <button className={styles.formButton} type="submit">Add Vital Sign</button>
                    </div>
                </form>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {Object.keys(newVital).map(key => (
                                <th key={key}>{key.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} ({units[key]})</th>
                            ))}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vitalsData.map((vital, index) => (
                            <tr key={index}>
                                {Object.keys(newVital).map(key => (
                                    <td key={key}>{vital[key]}</td>
                                ))}
                                <td>
                                    <button onClick={() => handleDeleteVital(vital.id)} className={`${styles.formButton} ${styles.delete}`}>
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

// Units mapping for vital signs
const units = {
    temperature: '°C',
    heart_rate: 'bpm',
    bps: 'mmHg',
    bpd: 'mmHg',
    blood_oxygen: '%',
    resting_respiratory: 'breaths/min',
    pain: 'scale'
};

export default PatientVitals;
