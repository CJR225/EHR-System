import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';

function PatientADLRecords({ selectedPatient, activeTab }) {
    const [adlRecords, setAdlRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({
        oral: '',
        bathing: '',
        foley_care: '',
        reposition: '',
        elimination: '',
        meal: '',
        meal_consumed: 0
    });

    useEffect(() => {
        if (selectedPatient && activeTab === "ADL") {
            fetchAdlRecords();
        }
    }, [selectedPatient, activeTab]);

    const fetchAdlRecords = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/patients/${selectedPatient.id}/adl`);
            setAdlRecords(response.data);
        } catch (error) {
            toast.error("Error fetching ADL records: " + error.message);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewRecord(prev => ({ ...prev, [name]: value }));
    };

    const handleAddRecord = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3001/patients/${selectedPatient.id}/adl`, newRecord);
            setAdlRecords([...adlRecords, response.data]);
            setNewRecord({ oral: '', bathing: '', foley_care: '', reposition: '', elimination: '', meal: '', meal_consumed: 0 });
            toast.success("New ADL record added successfully!");
        } catch (error) {
            console.error("Error adding ADL record:", error.response || error);
            toast.error("Error adding ADL record: " + (error.response ? error.response.data.message : error.message));
        }
    };

    const handleDeleteRecord = async (adlId) => {
        try {
            await axios.delete(`http://localhost:3001/patients/${selectedPatient.id}/adl/${adlId}`);
            setAdlRecords(adlRecords.filter(record => record.IOandADL_id !== adlId));
            toast.success("ADL record deleted successfully!");
        } catch (error) {
            toast.error("Error deleting ADL record: " + error.message);
        }
    };

    return (
        <div className={styles.outerContainer}>
            <h2 className={styles.tabHeading}>Activities of Daily Living Records</h2>
            <form onSubmit={handleAddRecord} className={styles.form}>
                {Object.entries(newRecord).map(([key, value]) => (
                    <div className={styles.formGroup} key={key}>
                        <label htmlFor={key} className={styles.label}>{key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}:</label>
                        <input
                            type={key === "meal_consumed" ? "number" : "text"}
                            id={key}
                            name={key}
                            value={value}
                            onChange={handleInputChange}
                            className={styles.formInput}
                        />
                    </div>
                ))}
                <button type="submit" className={styles.formButton}>Add Record</button>
            </form>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Oral Care</th>
                        <th>Bathing</th>
                        <th>Foley Care</th>
                        <th>Reposition</th>
                        <th>Elimination</th>
                        <th>Meal</th>
                        <th>Meal Consumed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {adlRecords.map(record => (
                        <tr key={record.IOandADL_id}>
                            <td>{record.time}</td>
                            <td>{record.oral}</td>
                            <td>{record.bathing}</td>
                            <td>{record.foley_care}</td>
                            <td>{record.reposition}</td>
                            <td>{record.elimination}</td>
                            <td>{record.meal}</td>
                            <td>{record.meal_consumed}</td>
                            <td>
                                <button onClick={() => handleDeleteRecord(record.IOandADL_id)} className={`${styles.formButton} ${styles.delete}`}>
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

export default PatientADLRecords;
