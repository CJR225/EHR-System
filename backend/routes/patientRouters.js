const express = require('express');
const router = express.Router();
const { models } = require('./database.js'); 
const { medicine_patient } = models;
const { Patient } = models;
const { Medicine } = models;
const { Patient_Allergy } = models;
const { Allergies } = models;


// Define your routes using Patient model
router.get('/', async (req, res) => {
    try {
      console.log(medicine_patient); // Check if it's undefined
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route: Update patient by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Patient.update(req.body, { where: { id } });

    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const updatedPatient = await Patient.findByPk(id);
    res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Patient.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


// GET route to retrieve a patient's details by ID
router.get('/:patientId', async (req, res) => {
  try {
    const patient = await getPatientById(req.params.patientId);
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
    } else {
      res.json(patient);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve patient details", error: error.message });
  }
});





// Route: Input a new medication into the DB
router.post('/medicine', async (req, res) => {
  const { id, name } = req.body;

  try {
    const medicine = await Medicine.create({ id, name });
    res.status(201).json(medicine);
  } catch (error) {
    console.error('Error adding new medicine:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route: Get all allergies in the DB
router.get('/allergies', async (req, res) => {
  try {
    const allergies = await Allergies.findAll();
    res.status(200).json(allergies);
  } catch (error) {
    console.error('Error fetching allergies:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route: Input a new patient allergy 
router.post('/patient-allergies', async (req, res) => {
  const { patient_id, allergy_id } = req.body;

  try {
    const patientAllergy = await Patient_Allergy.create({ patient_id, allergy_id });
    res.status(201).json(patientAllergy);
  } catch (error) {
    console.error('Error assigning allergy to patient:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


// Route: Get all allergies for one patient 
router.get('/:patient_id/allergies', async (req, res) => {
  const { patient_id } = req.params;

  try {
    const allergies = await Patient_Allergy.findAll({
      include: [{
        model: Allergies,
        as: 'allergy', // Corrected alias to match the association definition
        required: true
      }],
      where: { patient_id }
    });

    res.status(200).json(allergies);
  } catch (error) {
    console.error('Error fetching patient allergies:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


module.exports = router;
