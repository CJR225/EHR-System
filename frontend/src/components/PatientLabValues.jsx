import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css'; // Ensure this path is correct
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';


function PatientLabValues({ selectedPatient }) {
    const [labValues, setLabValues] = useState([]);
    const [labValuesOpen, setLabValuesOpen] = useState(false);

    useEffect(() => {

        if (selectedPatient) {
            // Set an interval for polling
            const intervalId = setInterval(() => {
                fetchLabValues(selectedPatient.id);
            }, 5000); // Polling every 5 seconds

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [selectedPatient]);


    const fetchLabValues = async (patientId) => {
        try {
            console.log(`Fetching lab values for patient ID: ${selectedPatient.id}`);

            const response = await axios.get(`http://localhost:3001/patients/${patientId}/labvalues`);
            console.log('Lab values fetched:', response.data);
            console.log('Lab values fetched:', JSON.stringify(response.data, null, 2));


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
            {/* Apply the scrollable table container style */}
            <div className={`${styles.tableContainer} ${labValuesOpen ? 'active' : ''} scrollable-table-container`}> 
               <table className={styles.table + ' inverted-table'}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>pH</th>
                                <th>PaCO2</th>
                                <th>PaO2</th>
                                <th>HCO3</th>
                                <th>CO2</th>
                                <th>WBC</th>
                                <th>RBC</th>
                                <th>Hemoglobin</th>
                                <th>Hematocrit</th>
                                <th>Platelets</th>
                                <th>A1C</th>
                                <th>Sodium</th>
                                <th>Potassium</th>
                                <th>Chloride</th>
                                <th>Magnesium</th>
                                <th>Glucose</th>
                                <th>Calcium</th>
                                <th>BUN</th>
                                <th>Creatinine</th>
                                <th>Albumin</th>
                                <th>PreAlbumin</th>
                                <th>BNP</th>
                                <th>Digoxin Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {labValues.map((labValue, index) => (
                                <tr key={index}>
                                    <td>{new Date(labValue.timedate).toLocaleDateString()}</td>
                                    <td>{labValue.pH}</td>
                                    <td>{labValue.PaCO2}</td>
                                    <td>{labValue.PaO2}</td>
                                    <td>{labValue.HCO3}</td>
                                    <td>{labValue.CO2}</td>
                                    <td>{labValue.WBC}</td>
                                    <td>{labValue.RBC}</td>
                                    <td>{labValue.Hemoglobin}</td>
                                    <td>{labValue.Hematocrit}</td>
                                    <td>{labValue.Platelets}</td>
                                    <td>{labValue.Hemoglobin_A1c}</td>
                                    <td>{labValue.Sodium}</td>
                                    <td>{labValue.Potassium}</td>
                                    <td>{labValue.Chloride}</td>
                                    <td>{labValue.Magnesium}</td>
                                    <td>{labValue.Glucose}</td>
                                    <td>{labValue.Calcium}</td>
                                    <td>{labValue.BUN}</td>
                                    <td>{labValue.Creatinine}</td>
                                    <td>{labValue.Albumin}</td>
                                    <td>{labValue.PreAlbumin}</td>
                                    <td>{labValue.BNP}</td>
                                    <td>{labValue.Digoxin_Level}</td>
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
