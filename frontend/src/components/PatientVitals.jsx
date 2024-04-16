import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css'; // Ensure this path is correct

function PatientVitals({ selectedPatient, activeTab }) {
    const [vitalsData, setVitalsData] = useState({
        temperature: '',
        heart_rate: '',
        bps: '',
        bpd: '',
        blood_oxygen: '',
        resting_respiratory: '',
        pain: '' // Added pain to the vitals list
    });

    const [retakeData, setRetakeData] = useState({
        temperature: '',
        heart_rate: '',
        bps: '',
        bpd: '',
        blood_oxygen: '',
        resting_respiratory: '',
        pain: '' // Added pain to the retake list
    });

    useEffect(() => {
        if (selectedPatient && activeTab === "Vital Signs") {
            fetchVitalsData();
        }
    }, [selectedPatient, activeTab]);

    const fetchVitalsData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/patients/vitals/${selectedPatient.id}`);
            setVitalsData(response.data);
        } catch (error) {
            console.error("Error fetching patient vitals:", error);
            toast.error("Failed to fetch patient vitals.");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name.endsWith('_retake')) {
            setRetakeData(prev => ({ ...prev, [name.replace('_retake', '')]: value }));
        } else {
            setVitalsData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSaveVitals = async (event) => {
        event.preventDefault();
        // Only overwrite current vitals with non-empty retake values
        const updatedVitals = { ...vitalsData, ...Object.fromEntries(Object.entries(retakeData).filter(([_, v]) => v)) };

        try {
            await axios.put(`http://localhost:3001/patients/vitals/${selectedPatient.id}`, updatedVitals);
            toast.success("Patient vitals updated successfully!");
            setVitalsData(updatedVitals);
            setRetakeData({
                temperature: '',
                heart_rate: '',
                bps: '',
                bpd: '',
                blood_oxygen: '',
                resting_respiratory: '',
                pain: ''
            });
        } catch (error) {
            console.error("Error updating patient vitals:", error);
            toast.error("Failed to update patient vitals.");
        }
    };

    const vitalSignsToShow = ['temperature', 'heart_rate', 'bps', 'bpd', 'blood_oxygen', 'resting_respiratory', 'pain'];

    return (
        <div className={styles.tabContent}>
            <h2 className={styles.tabHeading}>Vital Signs</h2>
            <form onSubmit={handleSaveVitals}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Vital Sign</th>
                            <th>Current</th>
                            <th>Retake</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vitalSignsToShow.map((key) => (
                            <tr key={key}>
                                <td>{key.replace(/_/g, ' ').toUpperCase()}</td>
                                <td>
                                    <input
                                        type="text"
                                        name={key}
                                        value={vitalsData[key] || ''}
                                        onChange={handleInputChange}
                                        className={styles.formInput}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name={`${key}_retake`}
                                        value={retakeData[key] || ''}
                                        onChange={handleInputChange}
                                        className={styles.formInput}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit" className={styles.formButton}>
                    Save Vitals
                </button>
            </form>
        </div>
    );
}

export default PatientVitals;
