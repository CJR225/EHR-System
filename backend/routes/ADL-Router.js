const express = require('express');
const router = express.Router();
const { models } = require('./database.js'); 
const { IOandADL } = models;

// GET ADL records for a specific patient
router.get('/:patientId/adl', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const adlRecords = await IOandADL.findAll({
      where: { patient_id: patientId },
      attributes: ['IOandADL_id', 'time', 'oral', 'bathing', 'foley_care', 'reposition', 'elimination', 'meal', 'meal_consumed']
    });
    res.json(adlRecords);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error fetching ADL records');
  }
});

// POST a new ADL record
router.post('/:patientId/adl', async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // Find the smallest available ID
    const existingIds = await IOandADL.findAll({
      attributes: ['IOandADL_id'],
      order: [['IOandADL_id', 'ASC']]
    });

    let newId = 1; // Start checking from ID 1
    const idArray = existingIds.map(item => item.IOandADL_id);

    // Increment newId until we find a missing number in the sequence
    while (idArray.includes(newId)) {
      newId++;
    }

    const adlData = {
      IOandADL_id: newId,  // Use the smallest available ID
      patient_id: patientId,
      time: new Date(), // Assuming the current time should be used
      ...req.body
    };
    const newAdlRecord = await IOandADL.create(adlData);
    res.status(201).json(newAdlRecord);
  } catch (error) {
    console.error('Server error creating ADL record:', error);
    res.status(500).send('Server error creating ADL record');
  }
});

// PUT update an ADL record
router.put('/:patientId/adl/:adlId', async (req, res) => {
  try {
    const { patientId, adlId } = req.params;
    const updateData = {
      ...req.body
    };
    const [updated] = await IOandADL.update(updateData, {
      where: {
        patient_id: patientId,
        IOandADL_id: adlId
      }
    });
    if (updated) {
      const updatedAdlRecord = await IOandADL.findByPk(adlId);
      res.json(updatedAdlRecord);
    } else {
      res.status(404).send('ADL record not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error updating ADL record');
  }
});

// DELETE an ADL record
router.delete('/:patientId/adl/:adlId', async (req, res) => {
  try {
    const { patientId, adlId } = req.params;
    const result = await IOandADL.destroy({
      where: {
        patient_id: patientId,
        IOandADL_id: adlId
      }
    });
    if (result) {
      res.json({ message: 'ADL record deleted successfully' });
    } else {
      res.status(404).send('ADL record not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error deleting ADL record');
  }
});

module.exports = router;
