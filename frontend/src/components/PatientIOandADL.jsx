import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css'; // Ensure this path is correct

function PatientIORecords({ selectedPatient, activeTab }) {
    const [ioRecords, setIoRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({ intake: '', output: '' });

    useEffect(() => {
        if (selectedPatient && activeTab === "Intake & Output") {
            fetchIoRecords();
        }
    }, [selectedPatient, activeTab]);

    const fetchIoRecords = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/patients/${selectedPatient.id}/io`);
            setIoRecords(response.data);
        } catch (error) {
            toast.error("Error fetching IO records: " + error.message);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewRecord(prev => ({ ...prev, [name]: value }));
    };

    const handleAddRecord = async (event) => {
        event.preventDefault();
        const recordWithTime = {
            ...newRecord,
            time: new Date().toISOString() // Adds current time to new record
        };

        try {
            const response = await axios.post(`http://localhost:3001/patients/${selectedPatient.id}/io`, recordWithTime);
            setIoRecords([...ioRecords, response.data]);
            setNewRecord({ intake: '', output: '' }); // Reset form fields
            toast.success("New IO record added successfully!");
        } catch (error) {
            console.error("Error adding IO record:", error.response || error);
            toast.error("Error adding IO record: " + (error.response ? error.response.data.message : error.message));
        }
    };



    const handleDeleteRecord = async (recordId) => {
        try {
            await axios.delete(`http://localhost:3001/patients/${selectedPatient.id}/io/${recordId}`);
            setIoRecords(ioRecords.filter(record => record.IOandADL_id !== recordId));
            toast.success("IO record deleted successfully!");
        } catch (error) {
            toast.error("Error deleting IO record: " + error.message);
        }
    };

    return (
        <div className={styles.tabContent}>
            <h2 className={styles.tabHeading}>Intake and Output Records</h2>
            <form onSubmit={handleAddRecord}>
                {/* Form for new IO record */}
                <label>Intake:</label>
                <input
                    type="text"
                    name="intake"
                    value={newRecord.intake}
                    onChange={handleInputChange}
                    className={styles.formInput}
                />

                <label>Output:</label>
                <input
                    type="text"
                    name="output"
                    value={newRecord.output}
                    onChange={handleInputChange}
                    className={styles.formInput}
                />

                <button type="submit" className={styles.formButton}>
                    Add Record
                </button>
            </form>

            {/* Table for existing IO records */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Intake</th>
                        <th>Output</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ioRecords.map((record) => (
                        <tr key={record.IOandADL_id}>
                            <td>{new Date(record.time).toLocaleTimeString()}</td>
                            <td>{record.intake}</td>
                            <td>{record.output}</td>
                            <td>
                                <button
                                    onClick={() => handleDeleteRecord(record.IOandADL_id)}
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
    );
}

export default PatientIORecords;
