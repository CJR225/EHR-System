import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

function formatTestName(name) {
    return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function PatientLabValues({ selectedPatient }) {
    const [labValues, setLabValues] = useState([]);
    const [labValuesOpen, setLabValuesOpen] = useState(false);

    useEffect(() => {
        if (selectedPatient) {
            fetchLabValues(selectedPatient.id);
            const intervalId = setInterval(() => {
                fetchLabValues(selectedPatient.id);
            }, 5000); // Adjusted to every 5 seconds, was 500 ms which is very frequent

            return () => clearInterval(intervalId);
        }
    }, [selectedPatient]);

    const fetchLabValues = async (patientId) => {
        try {
            const response = await axios.get(`http://localhost:3001/patients/${patientId}/labvalues`);
            setLabValues(response.data);
        } catch (error) {
            console.error("Error fetching patient lab values:", error);
            toast.error("Failed to fetch lab values.");
        }
    };

    return (
        <div className={styles.outerContainer}>
            <div onClick={() => setLabValuesOpen(!labValuesOpen)} style={{ cursor: 'pointer' }}>
                <h2 className={styles.tabHeading}>
                    Patient Lab Values
                    {labValuesOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </h2>
            </div>

            <div id="labValuesTable" style={{ display: labValuesOpen ? 'block' : 'none' }}>
                <div className={`${styles.tableContainer} ${labValuesOpen ? 'active' : ''} ${styles.scrollableTable}`}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Lab Test</th>
                                {labValues.map((labValue, index) => (
                                    <th key={index}>{new Date(labValue.timedate).toLocaleDateString()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {labValues.length > 0 && Object.keys(labValues[0]).filter(key => key !== 'timedate' && key !== 'patient_id').map((test, index) => (
                                <tr key={index}>
                                    <td>{formatTestName(test)}</td>
                                    {labValues.map((labValue, subIndex) => (
                                        <td key={subIndex}>{labValue[test]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}

export default PatientLabValues;
