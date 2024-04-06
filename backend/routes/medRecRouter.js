const express = require('express');
const router = express.Router();
const { models } = require('./database.js'); 
const { Patient, Medicine } = models;

// Route: get a patients Medication Reconciliation history
router.get('/:id/medications', async (req, res) => {
  const { id } = req.params;

  try {
    const patientWithMedications = await Patient.findByPk(id, {
      include: [{
        model: Medicine,
        as: 'med_id_Medicines', // Correct alias as defined in your association
        required: true
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

module.exports = router;
