const express = require('express');
const router = express.Router();
const { models } = require('./database.js'); 
const { Patient, Medicine,medicine_patient } = models;

router.get('/:id/medicine', async (req, res) => {
    const { id } = req.params;
  
    try {
      const medications = await models.medicine_patient.findAll({
        where: { patient_id: id },
        include: [{
          model: models.Medicine,
          as: 'Medicine',  // Make sure this alias matches the one defined in your association
          attributes: ['name']
        }]
      });
  
      if (medications.length > 0) {
        res.status(200).json(medications);
      } else {
        res.status(404).json({ message: 'No medications found for this patient.' });
      }
    } catch (error) {
      console.error('Error fetching medications:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  


router.post('/:patientId/medicines', async (req, res) => {
    const { patientId } = req.params;
    const { med_id, dosage, route } = req.body;

    // Basic validation
    if (!med_id) {
        return res.status(400).json({ error: 'Missing required field: med_id' });
    }
    if (!dosage) {
        return res.status(400).json({ error: 'Missing required field: dosage' });
    }
    if (!route) {
        return res.status(400).json({ error: 'Missing required field: route' });
    }

    // Prepare data for insertion
    const medicationData = {
        patient_id: patientId,
        med_id,
        dosage,
        route,
        frequency: req.body.frequency,
        taken_last: req.body.taken_last,
        time_taken: req.body.time_taken,
        administered_at: req.body.administered_at
    };

    try {
        // Create medication record in the database
        const newMedicationRecord = await models.medicine_patient.create(medicationData);
        res.status(201).json(newMedicationRecord);
    } catch (error) {
        console.error('Error adding medication record:', error);
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ error: 'Invalid patient or medicine ID' });
        }
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


router.delete('/:patientId/medicines/:entryId', async (req, res) => {
    const { patientId, entryId } = req.params; // Changed medId to entryId for clarity

    try {
        console.log(`Attempting to delete medication entry with ID ${entryId} for patient ${patientId}`);
        
        // Find the medication entry by its primary key (id) rather than med_id
        const record = await models.medicine_patient.findByPk(entryId, {
            where: {
                patient_id: patientId
            }
        });

        if (!record) {
            console.log(`No medication record found for ID ${entryId} and patient ID ${patientId}`);
            return res.status(404).json({ message: 'No medication record found for the given ID' });
        }

        // If the record is found, proceed to delete it
        await record.destroy();
        console.log(`Medication entry deleted successfully for ID ${entryId}`);
        res.status(200).json({ message: 'Medication record deleted successfully' });
    } catch (error) {
        console.error('Error deleting medication record:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
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


// Route: Get all medicines from the Medicine table
// This is for the dropdown menu in the frontend to select a medicine
router.get('/medicines', async (req, res) => {
    try {
        const medicines = await Medicine.findAll();
        res.status(200).json(medicines);
    } catch (error) {
        console.error('Error fetching all medicines:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;
