const express = require('express');
const router = express.Router();
const { models } = require('./database.js');
const { Patient } = models;

// Endpoint to get vitals for a patient by ID
router.get('/vitals/:patientId', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
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

// Endpoint to clear patient vitals
router.delete('/vitals/:patientId', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Set the vitals to null or their default values
    await patient.update({
      temperature: null,
      heart_rate: null,
      bps: null,
      bpd: null,
      blood_oxygen: null,
      resting_respiratory: null,
      pain: null
    });

    res.status(200).json({ message: 'Patient vitals cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing patient vitals', error });
  }
});

module.exports = router;
