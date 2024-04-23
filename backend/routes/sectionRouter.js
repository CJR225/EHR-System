
const express = require('express');
const router = express.Router();
const { models } = require('./database.js');
const { Sections, Instructor, Student } = models;

// Route: Create a section 
router.post('/add-section', async (req, res) => {
    const { instructor_id, section_id } = req.body;

    try {
        const section = await Sections.create({ instructor_id, section_id });
        res.status(201).json({ message: 'Section added successfully', sectionId: section.section_id });
    } catch (error) {
        console.error('Error adding new section:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.get('/section-list', async (req, res) => {
    try {
        const sections = await Sections.findAll({
            include: [
                {
                    model: Instructor,
                    as: 'instructor',  // Ensures this matches the alias in your model association
                    attributes: ['username', 'role']
                },
                {
                    model: Student,
                    as: 'Students',  // Ensures this matches the alias in your model association
                    attributes: ['user_id', 'username', 'fname', 'lname']
                }
            ],
            attributes: ['section_id', 'instructor_id']
        });
        res.status(200).json(sections);
    } catch (error) {
        console.error('Error fetching sections:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});



module.exports = router;