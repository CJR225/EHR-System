import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';
import { useUser } from '../contexts/UserContext.js';

function PatientMedRec({ selectedPatient }) {
    const { user } = useUser();
    const [medRecs, setMedRecs] = useState([]);
    const [newMedRec, setNewMedRec] = useState({
        medicationName: '',
        dose: '',
        route: '',
        frequency: '',
        lastTaken: ''
    });

    const isInstructor = user.role === 'instructor';

    useEffect(() => {
        if (selectedPatient) {
            fetchMedRecs();
        }
    }, [selectedPatient]);

    const fetchMedRecs = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/patients/${selectedPatient.id}/medications`);
            setMedRecs(response.data);
        } catch (error) {
            console.error("Error fetching patient medrecs:", error);
            toast.error("Failed to fetch medrecs.");
        }
    };

    const handleNewMedRecChange = (event) => {
        const { name, value } = event.target;
        setNewMedRec(prev => ({ ...prev, [name]: value }));
    };

    const handleAddMedRec = async (event) => {
        event.preventDefault();
        if (!isInstructor) {
            toast.error("Only instructors are allowed to add medication records.");
            return;
        }
        try {
            const medRecData = { ...newMedRec, patient_id: selectedPatient.id };
            await axios.post(`http://localhost:3001/patients/${selectedPatient.id}/medications`, medRecData);
            toast.success("New medication record added successfully!");
            setNewMedRec({ medicationName: '', dose: '', route: '', frequency: '', lastTaken: '' });
            fetchMedRecs();
        } catch (error) {
            console.error("Error adding new medication record:", error);
            toast.error("Failed to add new medication record.");
        }
    };

    const handleDeleteMedRec = async (medRecId) => {
        if (!isInstructor) {
            toast.error("Only instructors are allowed to delete medication records.");
            return;
        }
        try {
            await axios.delete(`http://localhost:3001/patients/${selectedPatient.id}/medications/${medRecId}`);
            toast.success("Medication record deleted successfully!");
            fetchMedRecs();
        } catch (error) {
            console.error("Error deleting medication record:", error);
            toast.error("Failed to delete medication record.");
        }
    };

    const formatHeader = (key) => {
        return key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
    };

    return (
        <div className={styles.outerContainer}>
            <h3 className={styles.sectionHeading}>Medication Reconciliation</h3>
            {isInstructor && (
                <form onSubmit={handleAddMedRec} className={styles.marForm}>
                    {Object.keys(newMedRec).map(key => (
                        <div className={styles.inputWrapper} key={key}>
                            <label htmlFor={key}>{formatHeader(key)}</label>
                            <input
                                type="text"
                                className={styles.formInput}
                                name={key}
                                id={key}
                                value={newMedRec[key]}
                                onChange={handleNewMedRecChange}
                            />
                        </div>
                    ))}
                    <button className={styles.formButton} type="submit">Add Medication Record</button>
                </form>
            )}
            <table className={styles.table}>
                <thead>
                    <tr>
                        {Object.keys(newMedRec).map(key => (
                            <th key={key}>{formatHeader(key)}</th>
                        ))}
                        {isInstructor && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {medRecs.map((medRec, index) => (
                        <tr key={index}>
                            <td>{medRec.medicationName}</td>
                            <td>{medRec.dose}</td>
                            <td>{medRec.route}</td>
                            <td>{medRec.frequency}</td>
                            <td>{medRec.lastTaken ? new Date(medRec.lastTaken).toLocaleString() : "N/A"}</td>
                            {isInstructor && (
                                <td>
                                    <button onClick={() => handleDeleteMedRec(medRec.id)} className={`${styles.formButton} ${styles.delete}`}>
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientMedRec;
