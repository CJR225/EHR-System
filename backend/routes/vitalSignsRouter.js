const express = require('express');
const router = express.Router();
const { models } = require('./database.js');
const { Patient, VitalSigns } = models;



// Endpoint to get vitals for a patient by ID
router.get('/vitals/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const vitals = await VitalSigns.findAll({
      where: { patient_id: patientId }
    });

    if (!vitals.length) {
      return res.status(404).json({ message: 'No vital signs found for this patient' });
    }
    res.json(vitals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient vitals', error });
  }
});


// PUT Endpoint to update patient vitals
router.put('/vitals/:patientId', async (req, res) => {
  try {
    const { body, params: { patientId } } = req;
    let patient = await Patient.findByPk(patientId);

    if (patient) {
      await patient.update(body);
      res.status(200).json({ message: 'Patient vitals updated successfully', patient });
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient vitals', error });
  }
});


// DELETE Endpoint to delete a patient's vital sign by ID
router.delete('/:patientId/:vitalId/vitals', async (req, res) => {
  console.log("Requested patientId:", req.params.patientId);  // Debugging output
  console.log("Requested vitalId:", req.params.vitalId);      // Debugging output

  try {
    const { patientId, vitalId } = req.params;
    const vital = await VitalSigns.findByPk(vitalId);

    if (!vital) {
      return res.status(404).json({ message: 'Vital sign not found' });
    }

    if (vital.patient_id.toString() !== patientId) {
      return res.status(404).json({ message: 'Vital sign does not belong to the specified patient' });
    }

    await vital.destroy();
    res.status(200).json({ message: 'Vital sign deleted successfully' });
  } catch (error) {
    console.error('Error deleting vital sign:', error);
    res.status(500).json({ message: 'Error deleting vital sign', error });
  }
});


router.post('/:patientId/vitals', async (req, res) => {
  const patientId = req.params.patientId;

  // Verify the patient exists
  const patient = await Patient.findByPk(patientId);
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  // Check if the request body is an array of new vitals
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: 'Expected an array of vital signs' });
  }

  // Prepare the vital signs data with the patientId included
  const vitalSignsData = req.body.map(vital => ({ ...vital, patient_id: patientId }));

  try {
    // Insert each vital sign record individually
    const results = await Promise.all(
      vitalSignsData.map(vital => VitalSigns.create(vital))
    );
    res.status(201).json(results);
  } catch (error) {
    console.error('Error adding vital signs:', error);
    res.status(500).json({ message: 'Failed to add vital signs', error: error.errors || error });
  }
});



module.exports = router;
