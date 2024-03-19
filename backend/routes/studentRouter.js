const express = require('express');
const router = express.Router();
const Student = require('../models/Student.js');

// Define your routes
router.post('/login', async (req, res) => {
  try {
    const data = req.body;
    // Save data to the database using Sequelize4
    await Student.create(data);
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;