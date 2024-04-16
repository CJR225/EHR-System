import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';

function PatientWaldo({ selectedPatient, activeTab }) {
    // State to store the array of IV lines
    const [ivLines, setIvLines] = useState([]);

    // Fetch IV lines based on selected patient and active tab
    useEffect(() => {
        if (selectedPatient && activeTab === "IV Lines") {
            axios.get(`http://localhost:3001/ivandlines/${selectedPatient.id}`)
                .then(response => {
                    setIvLines(response.data); // Update state with fetched data
                })
                .catch(error => {
                    console.error("Failed to fetch IV/Lines:", error);
                    toast.error("Failed to fetch IV/Lines."); // Notify user of the error
                });
        }
    }, [selectedPatient, activeTab]); // React to changes in selectedPatient or activeTab

    // State for storing and managing input data for a new IV line
    const [ivLineData, setIvLineData] = useState({
        patient_id: '',
        iv_id: '',
        Type: "",
        size: "",
        CDI: "",
        location: "",
        rate: "",
        patent: ""
    });

    // Set patient_id in ivLineData when selectedPatient changes
    useEffect(() => {
        if (selectedPatient) {
            setIvLineData(ivData => ({
                ...ivData,
                patient_id: selectedPatient.id  // Set patient_id automatically
            }));
        }
    }, [selectedPatient]);

    // Handle form submission for adding a new IV line
    const handleAddIvLine = async (event) => {
        event.preventDefault();
        if (!selectedPatient) {
            toast.error("No patient selected.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3001/patients/ivandlines`, {
                ...ivLineData,
                patient_id: selectedPatient.id  // Ensure correct patient_id is sent
            });

            if (response.data && response.data.ivandlines) {
                setIvLines(prevIvLines => [...prevIvLines, response.data.ivandlines]); // Update IV lines list
                toast.success("IV/Line added successfully!");
                // Reset form data after successful addition
                setIvLineData({
                    patient_id: selectedPatient.id,
                    iv_id: '',
                    Type: "",
                    size: "",
                    CDI: "",
                    location: "",
                    rate: "",
                    patent: ""
                });
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.error("Error adding IV/Line:", error);
            toast.error("Failed to add IV/Line.");
        }
    };

    // Update ivLineData state as the user types in the form inputs
    const handleIvLineChange = (event) => {
        const { name, value } = event.target;
        setIvLineData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle the deletion of an IV line
    const handleDeleteIvLine = (patientId, ivId) => {
        axios.delete(`http://localhost:3001/patients/ivandlines/${patientId}/${ivId}`)
            .then(() => {
                toast.success("IV/Line deleted successfully!");
                // Remove the deleted IV line from state
                setIvLines(currentIvLines => currentIvLines.filter(line => line.iv_id !== ivId));
            })
            .catch(error => {
                console.error("Failed to delete IV/Line:", error);
                toast.error("Failed to delete IV/Line.");
            });
    };

    return (
        <div className={styles.tabContent}>
            <h2 className={styles.tabHeading}>
                Wounds and Drains
            </h2>
            {/* Form for adding wound and drain information */}
            <form onSubmit={handleAddIvLine} className={styles.marForm}>
                {/* Text areas for various types of wounds */}
                <div className={styles.formRow}>
                    {/* Each field for input is wrapped in a styled div */}
                    <div className={styles.inputWrapper}>
                        <label htmlFor="swound">Surgical Wound</label>
                        <textarea
                            className={styles.formTextarea}
                            name="swound"
                            id="swound"
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="psore">Pressure Sore</label>
                        <textarea
                            className={styles.formTextarea}
                            name="psore"
                            id="psore"
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="twound">Trauma Wound</label>
                        <textarea
                            className={styles.formTextarea}
                            name="twound"
                            id="twound"
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="dnotes">Drain Notes</label>
                        <textarea
                            className={styles.formTextarea}
                            name="dnotes"
                            id="dnotes"
                        />
                    </div>
                </div>
                <button className={styles.formButton} type="submit">
                    Add Wound
                </button>
            </form>
            <h2 className={styles.tabHeading}>
                IV's and Lines
            </h2>
            {/* Form for adding IV lines */}
            <form onSubmit={handleAddIvLine} className={styles.marForm}>
                <div className={styles.formRow}>
                    {/* Input fields for details about the IV lines */}
                    <div className={styles.inputWrapper}>
                        <label htmlFor="type_line">Type</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="Type"
                            id="type_line"
                            value={ivLineData.Type}
                            onChange={handleIvLineChange}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="size">Size</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="size"
                            id="size"
                            value={ivLineData.size}
                            onChange={handleIvLineChange}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="cdi">CDI</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="CDI"
                            id="cdi"
                            value={ivLineData.CDI}
                            onChange={handleIvLineChange}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="location">Location</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="location"
                            id="location"
                            value={ivLineData.location}
                            onChange={handleIvLineChange}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="rate">Fluid or Med and Rate</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="rate"
                            id="rate"
                            value={ivLineData.rate}
                            onChange={handleIvLineChange}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="patent">Patent</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="patent"
                            id="patent"
                            value={ivLineData.patent}
                            onChange={handleIvLineChange}
                        />
                    </div>
                </div>
                <button className={styles.formButton} type="submit">
                    Add IV/Line
                </button>
            </form>

            {/* Displaying current IV lines in a table */}
            <div>
                <h3>Current IV/Lines</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Size</th>
                            <th>CDI</th>
                            <th>Location</th>
                            <th>Rate</th>
                            <th>Patent</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ivLines.map(line => (
                            <tr key={`${line.patient_id}-${line.iv_id}`}>
                                <td>{line.Type}</td>
                                <td>{line.size}</td>
                                <td>{line.CDI}</td>
                                <td>{line.location}</td>
                                <td>{line.rate}</td>
                                <td>{line.patent}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteIvLine(line.patient_id, line.iv_id)}
                                        className={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PatientWaldo;
