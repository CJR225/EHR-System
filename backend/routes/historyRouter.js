const express = require('express');
const router = express.Router();
const { models } = require('./database.js');
const { PatientHistory, Immunizations, Patient_Immunization } = models;

// Get patient history by patient_id
router.get('/patient-history/:patientId', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const patientHistory = await PatientHistory.findOne({ where: { patient_id: patientId } });
        if (patientHistory) {
            res.json(patientHistory);
        } else {
            res.status(404).send('Patient history not found');
        }
    } catch (error) {
        console.error('Error fetching patient history:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/patient-history', async (req, res) => {
    try {
        const newHistoryData = req.body;
        const newHistory = await PatientHistory.create(newHistoryData);
        res.status(201).json(newHistory);
    } catch (error) {
        console.error('Error creating patient history:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Fetch all immunizations for a specific patient
router.get('/:patientId/immunizations', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const immunizations = await Patient_Immunization.findAll({
            where: { patient_id: patientId },
            include: [{
                model: Immunizations,
                as: 'immunizationDetails' 
            }]
        });
        res.json(immunizations);
    } catch (error) {
        console.error('Error fetching immunizations:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add a new immunization record for a patient
router.post('/:patientId/immunizations', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const { immunization_id, timedate } = req.body; 
        const newImmunizationRecord = await Patient_Immunization.create({
            patient_id: patientId,
            immunzation_id: immunization_id, 
            timedate
        });
        res.status(201).json(newImmunizationRecord);
    } catch (error) {
        console.error('Error adding immunization record:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;