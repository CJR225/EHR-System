import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';

function PatientWaldo({ selectedPatient, activeTab }) {
    const [woundsDrains, setWoundsDrains] = useState([]);
    const [ivLines, setIvLines] = useState([]);

    useEffect(() => {
        if (selectedPatient && activeTab === "WALDO") {
            fetchWoundsDrains();
        }
    }, [selectedPatient, activeTab]);

    //Wounds
    const [woundDrainData, setWoundDrainData] = useState({
        patient_id: selectedPatient ? selectedPatient.id : '',
        surgical_wound: '',
        pressure_sore: '',
        trauma_wound: '',
        drain_notes: ''
    });


    const fetchWoundsDrains = () => {
        if (selectedPatient && activeTab === "WALDO") { // Adjust the activeTab check accordingly
            axios.get(`http://localhost:3001/patients/wounds/${selectedPatient.id}`)
                .then(response => {
                    setWoundsDrains(response.data);
                })
                .catch(error => {
                    console.error("Failed to fetch Wounds/Drains:", error);
                    toast.error("Failed to fetch Wounds/Drains.");
                });
        }
    };

    useEffect(() => {
        if (selectedPatient) {
            setWoundDrainData(prevData => ({
                ...prevData,
                patient_id: selectedPatient.id,
            }));
        }
    }, [selectedPatient]);


    useEffect(() => {
        fetchWoundsDrains();
    }, [selectedPatient, activeTab]);

    const handleAddWoundDrain = async (event) => {
        event.preventDefault();
        if (!selectedPatient) {
            toast.error("No patient selected.");
            return;
        }

        console.log("Posting data to server:", woundDrainData); // Ensure all data looks correct here

        try {
            const response = await axios.post(`http://localhost:3001/patients/wounds`, woundDrainData);
            if (response.data) { // Assuming response.data directly contains the new entry
                setWoundsDrains(prev => [...prev, response.data]); // Ensure this matches the expected format
                toast.success("Wound/Drain added successfully!");
                fetchWoundsDrains();
                resetWoundDrainData();
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.error("Error adding Wound/Drain:", error);
            toast.error(`Failed to add Wound/Drain: ${error.response?.data?.error || error.message}`);
        }
    };




    const handleDeleteWoundDrain = (entryId) => {
        if (!entryId) {
            toast.error("Invalid entry ID.");
            return;
        }

        axios.delete(`http://localhost:3001/patients/wounds/${selectedPatient.id}/${entryId}`)
            .then(() => {
                toast.success("Wound/Drain deleted successfully!");
                fetchWoundsDrains();
                setWoundsDrains(current => current.filter(item => item.id !== entryId));
            })
            .catch(error => {
                console.error("Failed to delete Wound/Drain:", error);
                toast.error("Failed to delete Wound/Drain.");
            });
    };

    const resetWoundDrainData = () => {
        setWoundDrainData({
            patient_id: selectedPatient ? selectedPatient.id : '',
            surgical_wound: '',
            pressure_sore: '',
            trauma_wound: '',
            drain_notes: ''
        });
    };

    // When setting state, ensure the keys exactly match the backend expected keys
    const handleWoundDrainChange = (event) => {
        const { name, value } = event.target;
        const backendKey = name.replace(/([A-Z])/g, '_$1').toLowerCase(); // Converts camelCase to snake_case
        setWoundDrainData(prevData => ({
            ...prevData,
            [backendKey]: value
        }));
    };


    //IV Lines
    // Fetch IV lines whenever the selectedPatient or activeTab changes, specifically checking if the active tab is 'IV Lines'
    useEffect(() => {
        if (selectedPatient && activeTab === "WALDO") {
            fetchIvLines();
        }
    }, [selectedPatient, activeTab]);

    const fetchIvLines = () => {
        axios.get(`http://localhost:3001/patients/ivandlines/${selectedPatient.id}`)
            .then(response => {
                console.log("API response data:", response.data); // This should show the expected array of IV lines.
                setIvLines(response.data);


            })

            .catch(error => {
                console.error("Failed to fetch IV/Lines:", error);
                toast.error("Failed to fetch IV/Lines.");
            });
    };

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

    useEffect(() => {
        if (selectedPatient) {
            setIvLineData(prevData => ({
                ...prevData,
                patient_id: selectedPatient.id
            }));
        }
    }, [selectedPatient]);

    const handleAddIvLine = async (event) => {
        event.preventDefault();
        if (!selectedPatient) {
            toast.error("No patient selected.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3001/patients/ivandlines`, ivLineData);
            if (response.data && response.data.ivandlines) {
                setIvLines(prevIvLines => [...prevIvLines, response.data.ivandlines]);
                toast.success("IV/Line added successfully!");
                resetIvLineData();
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.error("Error adding IV/Line:", error);
            toast.error("Failed to add IV/Line.");
        }
    };

    const resetIvLineData = () => {
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
    };

    const handleIvLineChange = (event) => {
        const { name, value } = event.target;
        setIvLineData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDeleteIvLine = (ivId) => {
        console.log("Deleting IV Line for Patient ID:", selectedPatient.id, "and IV ID:", ivId); // Debugging output
        console.log("IV Lines Data:", ivLines);
        axios.delete(`http://localhost:3001/patients/ivandlines/${selectedPatient.id}/${ivId}`)
            .then(() => {
                toast.success("IV/Line deleted successfully!");
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
            <form onSubmit={handleAddWoundDrain} className={styles.marForm}>
    <div className={styles.formRow}>
        <div className={styles.inputWrapper}>
            <label htmlFor="surgicalWound">Surgical Wound</label>
            <input
                type="text"
                className={styles.formInput}
                name="surgicalWound"
                id="surgicalWound"
                value={woundDrainData.surgicalWound}
                onChange={handleWoundDrainChange}
            />
        </div>
        <div className={styles.inputWrapper}>
            <label htmlFor="pressureSore">Pressure Sore</label>
            <input
                type="text"
                className={styles.formInput}
                name="pressureSore"
                id="pressureSore"
                value={woundDrainData.pressureSore}
                onChange={handleWoundDrainChange}
            />
        </div>
        <div className={styles.inputWrapper}>
            <label htmlFor="traumaWound">Trauma Wound</label>
            <input
                type="text"
                className={styles.formInput}
                name="traumaWound"
                id="traumaWound"
                value={woundDrainData.traumaWound}
                onChange={handleWoundDrainChange}
            />
        </div>
        <div className={styles.inputWrapper}>
            <label htmlFor="drainNotes">Drain Notes</label>
            <input
                type="text"
                className={styles.formInput}
                name="drainNotes"
                id="drainNotes"
                value={woundDrainData.drainNotes}
                onChange={handleWoundDrainChange}
            />
        </div>
    </div>
    <button className={styles.formButton} type="submit">
        Add Wound/Drain
    </button>
</form>


            {/* Displaying current IV lines in a table */}
            <div>
                <h3>Current Wounds and Drains</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Surgical Wound</th>
                            <th>Pressure Sore</th>
                            <th>Trauma Wound</th>
                            <th>Drain Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {woundsDrains.map((item, index) => (
                            <tr key={index}>  {/* Not recommended unless no mutations occur */}
                                <td>{item.surgical_wound}</td>
                                <td>{item.pressure_sore}</td>
                                <td>{item.trauma_wound}</td>
                                <td>{item.drain_notes}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteWoundDrain(item.wound_id)}
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
                                        onClick={() => handleDeleteIvLine(line.iv_id)}
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
        </div>
    )
}

export default PatientWaldo;
