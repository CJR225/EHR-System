
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

// Route: Fetch an instructor by ID
router.get('/instructor/:id', async (req, res) => {
  const instructorId = req.params.id;

  try {
    const instructor = await Instructor.findByPk(instructorId);
    if (instructor) {
      res.status(200).json(instructor);
    } else {
      res.status(404).json({ message: 'Instructor not found' });
    }
  } catch (error) {
    console.error('Error fetching instructor:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route: Get all instructors
router.get('/instructors', async (req, res) => {
  try {
      const instructors = await Instructor.findAll();
      res.status(200).json(instructors);
  } catch (error) {
      console.error('Error fetching instructors:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;