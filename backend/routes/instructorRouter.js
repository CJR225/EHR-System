
const express = require('express');
const router = express.Router();
const { models } = require('./database.js');
const { Instructor } = models;

// Route: Create an instructor 
router.post('/add-instructor', async (req, res) => {
    const { instructor_id, username, password, role } = req.body;
  
    try {
      const instructor = await Instructor.create({
        instructor_id,
        username,
        password,
        role
      });
      res.status(201).json({ message: 'Instructor added successfully', instructorId: instructor.instructor_id });
    } catch (error) {
      console.error('Error adding new instructor:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  
module.exports = router;