const express = require('express');
const router = express.Router();
const { models } = require('./database.js'); 
const { LabValues } = models;

// GET lab values for a specific patient
router.get('/:patientId/labvalues', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const labValues = await LabValues.findAll({
      where: { patient_id: patientId }
    });
    res.json(labValues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error fetching lab values');
  }
});

// POST a new lab value with manual ID handling
router.post('/:patientId/labvalues', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const allIds = await LabValues.findAll({
            attributes: ['lab_id'],
            order: ['lab_id']
        });

        // Create an array of existing IDs
        const existingIds = allIds.map(item => item.lab_id);
        let newId = 1;

        // Find the lowest missing ID in the existing sequence
        while (existingIds.includes(newId)) {
            newId++;
        }

        // Include newId in the lab data
        const labData = {
            lab_id: newId, // Set the found ID
            patient_id: patientId,
            ...req.body
        };

        const newLabValue = await LabValues.create(labData);
        res.status(201).json(newLabValue);
    } catch (error) {
        console.error('Server error creating lab value:', error);
        res.status(500).send('Server error creating lab value');
    }
});


  

// PUT update a lab value
router.put('/:patientId/labvalues/:labId', async (req, res) => {
  try {
    const { patientId, labId } = req.params;
    const { value, timedate } = req.body;
    const updatedLabValue = await LabValues.update(
      { value, timedate },
      {
        where: {
          patient_id: patientId,
          lab_id: labId
        }
      }
    );
    if (updatedLabValue) {
      res.json({ message: 'Lab value updated successfully' });
    } else {
      res.status(404).send('Lab value not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error updating lab value');
  }
});

// DELETE a lab value
router.delete('/:patientId/labvalues/:labId', async (req, res) => {
  try {
    const { patientId, labId } = req.params;
    const result = await LabValues.destroy({
      where: {
        patient_id: patientId,
        lab_id: labId
      }
    });
    if (result) {
      res.json({ message: 'Lab value deleted successfully' });
    } else {
      res.status(404).send('Lab value not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error deleting lab value');
  }
});

module.exports = router;
 