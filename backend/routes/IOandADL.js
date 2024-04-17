const express = require('express');
const router = express.Router();
const { IOandADL } = require('./database.js').models;

// Get IO records for a patient by ID
router.get('/:patientId/io', async (req, res) => {
  try {
    const records = await IOandADL.findAll({
      where: { patient_id: req.params.patientId },
      order: [['time', 'ASC']]
    });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching IO records', error });
  }
});

// Add a new IO record
router.post('/:patientId/io', async (req, res) => {
    try {
      const newRecord = await IOandADL.create({ ...req.body, patient_id: req.params.patientId });
      res.status(201).json(newRecord);
    } catch (error) {
      console.error("Server error creating new IO record:", error);
      res.status(500).json({ message: 'Server error creating new IO record', error: error.toString() });
    }
  });
  
  

// Update an IO record
router.put('/:patientId/io/:recordId', async (req, res) => {
  try {
    const updatedRecord = await IOandADL.update(req.body, {
      where: {
        patient_id: req.params.patientId,
        IOandADL_id: req.params.recordId
      }
    });
    if (updatedRecord) {
      res.status(200).json({ message: 'IO record updated successfully' });
    } else {
      res.status(404).json({ message: 'IO record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating IO record', error });
  }
});

// Delete an IO record
router.delete('/:patientId/io/:recordId', async (req, res) => {
  try {
    const result = await IOandADL.destroy({
      where: {
        patient_id: req.params.patientId,
        IOandADL_id: req.params.recordId
      }
    });
    if (result > 0) {
      res.status(200).json({ message: 'IO record deleted successfully' });
    } else {
      res.status(404).json({ message: 'IO record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting IO record', error });
  }
});

module.exports = router;
