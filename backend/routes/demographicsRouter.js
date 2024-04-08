const express = require('express');
const router = express.Router();
const { models } = require('./database.js'); 
const { Patient } = models;

// Route: Get patient demographics by id
router.get('/:id/demographics', async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findByPk(id, {
      attributes: ['fname', 'lname', 'dob', 'religion', 'gender', 'insurance','gender_at_birth','emergency_contact_name','emergency_contact_number']
    });

    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error('Error fetching patient demographics:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route: Update patient information for gender, gender at birth, emergency contact name, and emergency contact number
router.put('/:id/update-info', async (req, res) => {
  const { id } = req.params;
  const { gender, gender_at_birth, emergency_contact_name, emergency_contact_number } = req.body;

  try {
    // Find the patient by ID
    const patient = await Patient.findByPk(id);

    // Check if the patient exists
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Update the patient information
    await patient.update({
      gender,
      gender_at_birth,
      emergency_contact_name,
      emergency_contact_number
    });

    // Respond with the updated patient information
    res.status(200).json({
      message: 'Patient information updated successfully',
      patient: {
        gender: patient.gender,
        gender_at_birth: patient.gender_at_birth,
        emergency_contact_name: patient.emergency_contact_name,
        emergency_contact_number: patient.emergency_contact_number
      }
    });
  } catch (error) {
    console.error('Error updating patient information:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});



module.exports = router;
