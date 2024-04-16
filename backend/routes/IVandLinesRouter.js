const express = require('express');
const router = express.Router();
const { models } = require('./database.js'); 
const { IVandLines } = models;

// Function to add a new IV/Line with auto-incremented iv_id
async function addNewIVLine(patientId, ivLineData) {
  try {
    // Fetch the highest iv_id for the given patient_id
    const lastIvLine = await IVandLines.findOne({
      where: { patient_id: patientId },
      order: [['iv_id', 'DESC']],
    });

    const newIvId = lastIvLine ? lastIvLine.iv_id + 1 : 1; // Start from 1 if no records exist

    // Create new IV/Line record
    const newIvLine = await IVandLines.create({
      patient_id: patientId,
      iv_id: newIvId,
      ...ivLineData
    });

    return newIvLine;
  } catch (error) {
    console.error('Error adding new IV/Line:', error);
    throw error;
  }
}

// Route: Add a new IV or line for a specific patient
router.post('/ivandlines', async (req, res) => {
  const { patient_id, Type, size, CDI, location, rate, patent } = req.body;

  try {
    const newIVLine = await addNewIVLine(patient_id, {
      Type,
      size,
      CDI,
      location,
      rate,
      patent
    });

    res.status(201).json({
      message: 'IV/Line added successfully',
      ivandlines: newIVLine
    });
  } catch (error) {
    console.error('Error adding new IV/Line:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route: Get all IV/Lines for a specific patient
router.get('/ivandlines/:patient_id', async (req, res) => {
    const { patient_id } = req.params;
  
    try {
      const ivLines = await IVandLines.findAll({
        where: { patient_id }
      });
  
      res.json(ivLines);
    } catch (error) {
      console.error('Error fetching IV/Lines:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  
// Route: Delete a specific IV/Line
router.delete('/ivandlines/:patient_id/:iv_id', async (req, res) => {
    const { patient_id, iv_id } = req.params;
  
    try {
      const result = await IVandLines.destroy({
        where: { patient_id, iv_id }
      });
  
      if (result > 0) {
        res.status(200).json({ message: 'IV/Line deleted successfully' });
      } else {
        res.status(404).json({ error: 'IV/Line not found' });
      }
    } catch (error) {
      console.error('Error deleting IV/Line:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  
  
module.exports = router;
