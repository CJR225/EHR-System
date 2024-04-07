const express = require('express');
const router = express.Router();
const { models } = require('./database.js'); 
const { Patient, Medicine } = models;

// Route: get a patients Medication History
router.get('/:id/medicines', async (req, res) => {
    const { id } = req.params;

    try {
        const patientWithMedications = await Patient.findByPk(id, {
            include: [{
                model: Medicine,
                as: 'med_id_Medicines', required: true
            }]
        });

        if (patientWithMedications && patientWithMedications.med_id_Medicines) {
            res.status(200).json(patientWithMedications.med_id_Medicines);
        } else {
            res.status(404).json({ message: 'No medication records found for the specified patient' });
        }
    } catch (error) {
        console.error('Error fetching medications for patient:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.post('/:patientId/medicines', async (req, res) => {
    const { patientId } = req.params;
    const { med_id } = req.body;
    
    if (!med_id) {
        return res.status(400).json({ error: 'Missing required field: med_id' });
    }

    const medicationData = {
        patient_id: patientId,
        ...req.body
    };

    try {
        const newMedicationRecord = await models.medicine_patient.create(medicationData);
        res.status(201).json(newMedicationRecord);
    } catch (error) {
        console.error('Error adding medication record:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.delete('/:patientId/medicines/:medId', async (req, res) => {
    const { patientId, medId } = req.params;

    try {
        const result = await models.medicine_patient.destroy({
            where: {
                patient_id: patientId,
                med_id: medId
            }
        });

        if (result > 0) {
            res.status(200).send('Medication record deleted successfully');
        } else {
            res.status(404).send('No medication record found with the given IDs');
        }
    } catch (error) {
        console.error('Error deleting medication record:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.put('/:patientId/medicines/:medId', async (req, res) => {
    const { patientId, medId } = req.params;
    const updateData = req.body; // This assumes your request body only includes fields that need to be updated.

    try {
        const [numberOfAffectedRows] = await models.medicine_patient.update(updateData, {
            where: {
                patient_id: patientId,
                med_id: medId
            }
        });

        if (numberOfAffectedRows > 0) {
            res.status(200).send('Medication record updated successfully');
        } else {
            res.status(404).send('No medication record found with the given IDs');
        }
    } catch (error) {
        console.error('Error updating medication record:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
