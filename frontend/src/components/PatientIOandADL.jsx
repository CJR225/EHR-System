import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css'; 


function PatientIORecords({ selectedPatient, activeTab }) {
    const [ioRecords, setIoRecords] = useState([]);
    const [cumulativeIntake, setCumulativeIntake] = useState(0);
    const [cumulativeOutput, setCumulativeOutput] = useState(0);
    const [newRecord, setNewRecord] = useState({ intake: '', output: '' });

    useEffect(() => {
        if (selectedPatient && activeTab === "Intake & Output") {
            fetchIoRecords();
        }
    }, [selectedPatient, activeTab]);

    const fetchIoRecords = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/patients/${selectedPatient.id}/io`);
            if (response.data) {
                console.log("Received data:", response.data);  // Log to check the received data
                setIoRecords(response.data);
                calculateCumulativeTotals(response.data);
            }
        } catch (error) {
            console.error("Error fetching IO records:", error);
            toast.error("Error fetching IO records: " + error.message);
        }
    };


    const calculateCumulativeTotals = (records) => {
        const totalIntake = records.reduce((acc, record) => acc + parseInt(record.intake || 0), 0);
        const totalOutput = records.reduce((acc, record) => acc + parseInt(record.output || 0), 0);
        setCumulativeIntake(totalIntake);
        setCumulativeOutput(totalOutput);
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
            calculateCumulativeTotals([...ioRecords, response.data]); // Moved inside try
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
        const updatedRecords = ioRecords.filter(record => record.IOandADL_id !== recordId);
        calculateCumulativeTotals(updatedRecords);
    };

    return (
        <div className={styles.outerContainer}>
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

                <label>Intake Type:</label>
                <input
                    type="text"
                    name="intake_type"
                    value={newRecord.intake_type || ''}
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

                <label>Output Type:</label>
                <input
                    type="text"
                    name="output_type"
                    value={newRecord.output_type || ''}
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
                        <th>Intake Type</th>
                        <th>Output</th>
                        <th>Output Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ioRecords.map((record, index) => (
                        <React.Fragment key={record.IOandADL_id}>
                            <tr className={index === ioRecords.length - 1 ? styles.cumulativeTotalRow : ''}>
                                <td>{new Date(record.time).toLocaleTimeString()}</td>
                                <td>{record.intake}</td>
                                <td>{record.intake_type}</td>
                                <td>{record.output}</td>
                                <td>{record.output_type}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteRecord(record.IOandADL_id)}
                                        className={`${styles.formButton} ${styles.delete}`}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            {/* Render cumulative totals only for the last record */}
                            {index === ioRecords.length - 1 && (
                                <tr className={styles.cumulativeTotalRow}>
                                    <td>Cumulative Total</td>
                                    <td>{cumulativeIntake}</td>
                                    <td></td>
                                    <td>{cumulativeOutput}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}

                </tbody>


            </table>
        </div>
    );
}

export default PatientIORecords;
