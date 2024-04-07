const express = require('express');
const router = express.Router();
const { models } = require('./database.js'); 
const { Patient } = models;

// Route: Get patient demographics by id
router.get('/:id/demographics', async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findByPk(id, {
      attributes: ['fname', 'lname', 'dob', 'religion', 'gender', 'insurance']
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



module.exports = router;
