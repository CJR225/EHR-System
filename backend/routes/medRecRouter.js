const express = require('express');
const router = express.Router();
const { models } = require('./database.js');
const { Patient, MedRec } = models;  // Updated to include the MedRec model

// Route: get a patient's Medication Reconciliation history
 // Correcting the alias in the route
// Route: get a patient's Medication Reconciliation history
router.get('/:id/medications', async (req, res) => {
  const { id } = req.params;

  try {
      const patientWithMedications = await Patient.findByPk(id, {
          include: [{
              model: MedRec,
              as: 'MedRec',  // Corrected alias to match the model definition
              required: true
          }]
      });

      if (patientWithMedications && patientWithMedications.MedRec) { // Changed from MedRecs to MedRec
          res.status(200).json(patientWithMedications.MedRec);
      } else {
          res.status(404).json({ message: 'No medication records found for the specified patient' });
      }
  } catch (error) {
      console.error('Error fetching medications for patient:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


// Route: Add a medication record to a patient
router.post('/:id/medications', async (req, res) => {
  const { id } = req.params;
  const { medicationName, dose, route, frequency, lastTaken } = req.body;

  try {
    // First, find the patient to ensure they exist
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Create a new medication record associated with the patient
    const newMedRec = await MedRec.create({
      patientId: id,
      medicationName,
      dose,
      route,
      frequency,
      lastTaken
    });

    // Respond with the created record
    res.status(201).json(newMedRec);
  } catch (error) {
    console.error('Error adding medication record:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route: Delete a medication record
router.delete('/:patientId/medications/:medRecId', async (req, res) => {
  const { patientId, medRecId } = req.params;

  try {
      const medRec = await MedRec.findOne({ where: { id: medRecId, patientId: patientId } });
      if (!medRec) {
          return res.status(404).json({ message: 'Medication record not found' });
      }

      await medRec.destroy();
      res.status(200).json({ message: 'Medication record deleted successfully' });
  } catch (error) {
      console.error('Error deleting medication record:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


module.exports = router;
